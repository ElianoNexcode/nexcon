import { Component, OnDestroy, OnInit } from '@angular/core';
import { TextareaLabel } from '../../../@theme/components/form/textarea-label/service/textarea-label.service';
import { ListViewGrid, Find, Filter, rowSelect } from 'src/app/@theme/components/grid/list-view/service/list-view.service';
import { AlertServiceComponent } from 'src/app/@theme/components/form/alert-card/service/alert-card.service';
import { ActionButtomService } from 'src/app/@theme/components/grid/action-buttom/service/action-button.service';
import { InputLabel } from 'src/app/@theme/components/form/input-label/service/input-label.service';
import { SortOperationKind } from 'src/app/@core/api/generic-graphql';
import { Item } from 'src/app/@theme/components/form/combobox/service/combobox.service';
import { BehaviorSubject } from 'rxjs';
import { ConfigStorage, SiteConfig } from 'src/app/@core/storage/config/config';
import { NavigationEnd, Router, RouterEvent } from '@angular/router';
import { filter } from 'rxjs/operators';
import { ContatoComunicacao, 
         ContatoComunicacaoData, 
         ContatoComunicacaoFilter, 
         ContatoComunicacaoSort, 
         create_ContatoComunicacao, 
         delete_ContatoComunicacao, 
         read_ContatoComunicacao, 
         update_ContatoComunicacao } from 'src/app/@core/data/comunicacao-contato';
import { ContatoGrupo, ContatoGrupoData, ContatoGrupoFilter } from 'src/app/@core/data/grupo-contato';
import { TreeviewService } from 'src/app/@theme/layouts/treeview/service/treeview.service';
import { TreeView } from 'src/app/@theme/layouts/treeview/service/treeview';
import { OptionsGroup } from 'src/app/@theme/components/form/select-group/service/select-group.service';

@Component({
  selector: 'nex-contato-comunicacao',
  templateUrl: './contato-comunicacao.component.html',
  styleUrls: ['./contato-comunicacao.component.scss']
})

export class ContatoComunicacaoComponent implements OnInit, OnDestroy {

  id: number = 0;
  siteId: number = 0;
  nomeContato_Text: InputLabel = new InputLabel();
  telefoneFixo_Text: InputLabel = new InputLabel();
  telefoneMovel_Text: InputLabel = new InputLabel();
  emailContato_Text: InputLabel = new InputLabel();
  observacao_Text: TextareaLabel = new TextareaLabel();
  whatsApp_Options: OptionsGroup = new OptionsGroup();

  order_by: ContatoComunicacaoSort = { nome: SortOperationKind.ASC };
  filter: ContatoComunicacaoFilter;
  filterGrid: ContatoComunicacaoFilter;

  listView_Contato: ListViewGrid = new ListViewGrid();
  contatoComunicacao: ContatoComunicacao;
  settings: BehaviorSubject<any>;
  treeviewItem: BehaviorSubject<any>;
  
  first: number = 360;

  showSpinner: boolean = false;

  alertService: AlertServiceComponent = new AlertServiceComponent();
  editable: boolean;

  constructor( public actionbuttomService: ActionButtomService,
               private config: ConfigStorage,
               private treeviewService: TreeviewService,
               private contatoComunicacaoService: ContatoComunicacaoData,
               private router: Router ) {

    this.settings = this.config.siteSubject();
    this.treeviewItem = this.treeviewService.itemSubject();

    this.actionbuttomService.recurso = "54";
    this.actionbuttomService.relationGrid = "lstContatoComunicacao";
    this.actionbuttomService.top_action_buttons = [{ "id": 0, "text": "forms.buttons.create", "visibled": false, "enabled": true, "condition": "always", "openForm": true, "editable": "new", },
                                                   { "id": 1, "text": "forms.buttons.update", "visibled": false, "enabled": false, "condition": "select", "openForm": true, "editable": "yes", },
                                                   { "id": 3, "text": "forms.buttons.read", "visibled": false, "enabled": false, "condition": "select", "openForm": true, "editable": "no" },
                                                   { "id": 2, "text": "forms.buttons.delete", "visibled": false, "enabled": false, "condition": "multi", "openForm": false, "question": "forms.questions.delete" },]

    this.listView_Contato.name = "lstContatoComunicacao";
    this.listView_Contato.title = "Lista de Contatos";
    this.listView_Contato.grid = [{ "header": "Nome", "field": "nome", "width": 25, "align": "left" },
                                  { "header": "Telefone", "field": "telefoneFixo", "width": 15, "align": "left" },
                                  { "header": "Telefone Móvel", "field": "telefoneMovel", "width": 11, "align": "left" },
                                  { "header": "", "type": "icon", "icon": "whatsapp", "field": "whatsApp", "width": 3, "align": "left"},
                                  { "header": "Email", "field": "email", "width": 20, "align": "left" },
                                  { "header": "Observação", "field": "observacao", "width": 25, "align": "left" },];

    this.nomeContato_Text.name = "txtNome";
    this.nomeContato_Text.rules = "uppercase";
    this.nomeContato_Text.maxLength = 30;
    this.nomeContato_Text.minLength = 1;

    this.telefoneFixo_Text.name = "txtTelefoneFixo";
    this.telefoneFixo_Text.rules = "uppercase";
    this.telefoneFixo_Text.maxLength = 14;
    this.telefoneFixo_Text.minLength = 0;
    this.telefoneFixo_Text.regex = "noFilter";
    this.telefoneFixo_Text.rules = "telfixo"

    this.telefoneMovel_Text.name = "txtTelefoneMovel";
    this.telefoneMovel_Text.rules = "uppercase";
    this.telefoneMovel_Text.maxLength = 15;
    this.telefoneMovel_Text.minLength = 0;
    this.telefoneMovel_Text.regex = "noFilter";
    this.telefoneMovel_Text.rules = "telmovel";

    this.emailContato_Text.name = "txtEmail";
    this.emailContato_Text.maxLength = 50;
    this.emailContato_Text.minLength = 1;
    this.emailContato_Text.rules = "email";
    this.emailContato_Text.regex = "email";

    this.observacao_Text.name = "txtObservacao";
    this.observacao_Text.regex = "noFilter";
    this.observacao_Text.maxLength = 100;

    this.whatsApp_Options.add(1, "", "ativar", false, false, false, 0, 1, "whatsapp");
  
    this.settings
      .subscribe((site: SiteConfig) => {
        if (site != null) {
            this.siteId = site.id;
            this.treeviewPopulate(null)
        }
      });

    this.treeviewItem
      .subscribe((grupoId: string) => {
        if (grupoId != null) {
          if (!this.filter) {
            this.actionbuttomService.top_action_buttons.forEach(topButton => {
              topButton.visibled = true;
            })
          }
          this.filter = { grupoId: { eq: parseInt(grupoId) } };
          this.update_Grid(null, { select: "Nome", field: "nome", value: "" });
        }
      });
  }

  ngOnInit() {
    this.router.events
      .pipe(filter((event: RouterEvent) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.update_Grid();
      });
  }

  onActionButtom_Click(actionButtomSelect: any) {
    switch (actionButtomSelect.text) {
      case "forms.buttons.create":
        this.nomeContato_Text.focus();
        this.editable = true;
        this.id = undefined;
        break;
      
      case "forms.buttons.update":
        this.updateDataLoad();
        this.editable = true;
        this.nomeContato_Text.focus(true);
        break;
      
      case "forms.buttons.read":
        this.updateDataLoad();
        this.editable = false;
        break;
      
    }
  }

  updateDataLoad() {
    this.showSpinner = true;

    const filter: ContatoComunicacaoFilter = { id: { eq: this.id } };
    this.contatoComunicacaoService.readContatoComunicacao(this.order_by, filter)
      .subscribe(({ comunicacaoContato }: read_ContatoComunicacao) => {
        this.contatoComunicacao = comunicacaoContato.nodes[0];
        this.nomeContato_Text.text = this.contatoComunicacao.nome;
        this.telefoneFixo_Text.setTextWithMask(this.contatoComunicacao.telefoneFixo);
        this.telefoneMovel_Text.setTextWithMask(this.contatoComunicacao.telefoneMovel);
        this.emailContato_Text.text = this.contatoComunicacao.email;
        this.observacao_Text.text = this.contatoComunicacao.observacao;
        if (this.contatoComunicacao.whatsApp == true) {
            this.whatsApp_Options.check(1)
        } else {
            this.whatsApp_Options.uncheck(1)
        }

        this.showSpinner = false;
      });
  }

  onListView_Change(rowSelect?: rowSelect) {
    if (rowSelect.registro) {
      this.id = rowSelect.id;
    } else {
      if (rowSelect.exclude == "yes") {
        this.contatoComunicacaoService.deleteContatoComunicacao(rowSelect.id)
          .subscribe(({ data }: delete_ContatoComunicacao) => {
            if (data.comunicacaoContato_Excluir.sucesso == true) {
              const find = { field: "id", value: rowSelect.id, type: "DEL" }
              this.update_Grid(find);
            } else {
              const objeto = JSON.parse(data.comunicacaoContato_Excluir.objeto);
              this.alertService.show(data.comunicacaoContato_Excluir.mensagemTipo,
                data.comunicacaoContato_Excluir.mensagem,
                objeto);
            }
          });
      }
    }
  }

  onSave_Click() {
    this.nomeContato_Text.validated = (this.nomeContato_Text.text.length >= this.nomeContato_Text.minLength);
    this.telefoneFixo_Text.validated = (this.telefoneFixo_Text.textMasked.length >= this.telefoneFixo_Text.minLength &&
                                        this.telefoneFixo_Text.textMasked.length == 14) ||
                                        this.telefoneFixo_Text.textMasked.length == this.telefoneFixo_Text.minLength;

    this.telefoneMovel_Text.validated = (this.telefoneMovel_Text.textMasked.length >= this.telefoneMovel_Text.minLength &&
                                         this.telefoneMovel_Text.textMasked.length == 15) ||
                                         this.telefoneMovel_Text.textMasked.length == this.telefoneMovel_Text.minLength;

    if (!this.nomeContato_Text.validated || !this.telefoneFixo_Text.validated || !this.telefoneMovel_Text.validated) {
      this.alertService.show("ERRO",
        "Existem campos obrigatórios não preenchidos ou preenchidos de forma incorreta. Verifique!",
        null);
    } else {

      this.showSpinner = true;

      const contatoComunicacao: ContatoComunicacao = {
        id: this.id,
        siteId: <number>this.siteId,
        nome: this.nomeContato_Text.text,
        telefoneFixo: this.telefoneFixo_Text.textMasked,
        telefoneMovel: this.telefoneMovel_Text.textMasked,
        email: this.emailContato_Text.text,
        observacao: this.observacao_Text.text,
        grupoId: <number>this.filter.grupoId.eq,
        whatsApp: this.whatsApp_Options.valueOf("ativar")
         
      }

      if (contatoComunicacao.id) {
        this.contatoComunicacaoService.updateContatoComunicacao(contatoComunicacao)
          .subscribe(({ data }: update_ContatoComunicacao) => {

            this.showSpinner = false;

            const objeto: any = JSON.parse(data.comunicacaoContato_Alterar.objeto);
            if (data.comunicacaoContato_Alterar.sucesso == true) {
              const find = { field: "id", value: objeto.Id }
              this.onClose_Click();
              this.update_Grid(find);
            } else {
              this.alertService.show(data.comunicacaoContato_Alterar.mensagemTipo,
                data.comunicacaoContato_Alterar.mensagem,
                objeto);
            }
          });
      } else {
        this.contatoComunicacaoService.createContatoComunicacao(contatoComunicacao)
          .subscribe(({ data }: create_ContatoComunicacao) => {

            this.showSpinner = false;

            const objeto: any = JSON.parse(data.comunicacaoContato_Inserir.objeto);
            if (data.comunicacaoContato_Inserir.sucesso == true) {
              const find = { field: "id", value: objeto.Id };
              this.onClose_Click(false);
              this.update_Grid(find);
            } else {
              this.alertService.show(data.comunicacaoContato_Inserir.mensagemTipo,
                data.comunicacaoContato_Inserir.mensagem,
                objeto);
            }
          });
      }
    }
  }

  onListView_Filter(filterSelect: Item) {
    switch (filterSelect.text) {
      case "Nome":
        this.filterGrid = { nome: { contains: filterSelect.value } };
        break;
      case "Telefone":
        this.filterGrid = { telefoneFixo: { contains: filterSelect.value } };
        break;
      case "Telefone Móvel":
        this.filterGrid = { telefoneMovel: { contains: filterSelect.value } };
        break;
      case "Email":
        this.filterGrid = { email: { contains: filterSelect.value } };
        break;
      case "Observação":
        this.filterGrid = { observacao: { contains: filterSelect.value } };
        break;
    }

    if (filterSelect.value != "nome" && filterSelect.value != "telefoneFixo" &&
      filterSelect.value != "telefoneMovel" && filterSelect.value != "email" &&
      filterSelect.value != "observacao") {
      this.update_Grid();
    }
  }

  update_Grid(find?: Find, filter?: Filter) {
    const filterGrid: ContatoComunicacaoFilter = { ...this.filter, ...this.filterGrid }
    this.listView_Contato.processingShow();
    this.contatoComunicacaoService.readContatoComunicacao(this.order_by, filterGrid, this.first)
      .subscribe(({ comunicacaoContato }: read_ContatoComunicacao) => {
        this.actionbuttomService.enableButtons(0);
        this.listView_Contato.gridUpdate(comunicacaoContato.nodes, find, filter);
      });
  }

  treeviewPopulate(filter?: ContatoGrupoFilter) {
    this.treeviewService.getTreeview()
      .subscribe((treeview: TreeView[]) => {
        treeview[0].item = this.contatoComunicacaoService.getContatoGrupoTreeView(filter);
        this.treeviewService.setTreeview(treeview);
      });
  }

  onClose_Click(hideForm: boolean = true) {
    
    this.nomeContato_Text.clear();
    this.telefoneFixo_Text.clear();
    this.telefoneMovel_Text.clear();
    this.emailContato_Text.clear();
    this.observacao_Text.clear();
    this.whatsApp_Options.reset();
    if (hideForm == true) {
      this.actionbuttomService.hideForm()
    } else {
      this.nomeContato_Text.focus();
    }
  }

  ngOnDestroy(): void {
    this.settings?.unsubscribe();
    this.treeviewItem?.unsubscribe();
  }

}