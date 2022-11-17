import { Component, OnInit } from '@angular/core';
import { TextareaLabel } from 'src/app/@theme/components/form/textarea-label/service/textarea-label.service';

import { ListViewGrid, Find, Filter, rowSelect } from 'src/app/@theme/components/grid/list-view/service/list-view.service';
import { AlertServiceComponent } from 'src/app/@theme/components/form/alert-card/service/alert-card.service';
import { ActionButtomService } from 'src/app/@theme/components/grid/action-buttom/service/action-button.service';
import { InputLabel } from 'src/app/@theme/components/form/input-label/service/input-label.service';

import { SortOperationKind } from 'src/app/@core/api/generic-graphql';

import { Item } from 'src/app/@theme/components/form/combobox/service/combobox.service';
import { BehaviorSubject } from 'rxjs';
import { ConfigStorage, SiteConfig } from 'src/app/@core/storage/config/config';

import {
  create_SetorReparticao,
  read_SetorReparticao,
  update_SetorReparticao,
  delete_SetorReparticao,
  SetorReparticaoData,
  SetorReparticao,
  SetorReparticaoSort,
  SetorReparticaoFilter
} from 'src/app/@core/data/reparticao-setor';
import { NavigationEnd, Router, RouterEvent } from '@angular/router';
import { filter } from 'rxjs/operators';
import { ErrosModalService } from 'src/app/@theme/modals/erros/service/erros-modal.service';

@Component({
  selector: 'nex-setor',
  templateUrl: './setor.component.html',
  styleUrls: ['./setor.component.scss']
})

export class SetorReparticaoComponent implements OnInit {

  id: number = 0;

  nome_Text: InputLabel = new InputLabel();
  observacao_Text: TextareaLabel = new TextareaLabel();
  setorReparticao: SetorReparticao;

  settings: BehaviorSubject<any>;
  listView_Setor: ListViewGrid = new ListViewGrid();

  showSpinner: boolean = false;
  alertService: AlertServiceComponent = new AlertServiceComponent();
  errosModalService: ErrosModalService = new ErrosModalService();

  order_by: SetorReparticaoSort = { nome: SortOperationKind.ASC };
  filter: SetorReparticaoFilter;
  filterGrid: SetorReparticaoFilter;

  editable: boolean;

  constructor(
    public actionbuttomService: ActionButtomService,
    private config: ConfigStorage,
    private setorReparticaoService: SetorReparticaoData,
    private router: Router) {

    this.settings = this.config.siteSubject();
    this.actionbuttomService.relationGrid = "lstSetor";

    this.actionbuttomService.recurso = "2C";
    this.actionbuttomService.top_action_buttons = [
      { "id": 0, "text": "forms.buttons.create", "visibled": false, "enabled": true, "condition": "always", "openForm": true, "editable": "new", },
      { "id": 1, "text": "forms.buttons.update", "visibled": false, "enabled": false, "condition": "select", "openForm": true, "editable": "yes", },
      { "id": 2, "text": "forms.buttons.read", "visibled": false, "enabled": false, "condition": "select", "openForm": true, "editable": "no", },
      { "id": 3, "text": "forms.buttons.delete", "visibled": false, "enabled": false, "condition": "multi", "openForm": false, "question": "forms.questions.delete" }
    ]

    this.listView_Setor.name = "lstSetor";
    this.listView_Setor.title = "Lista de Setores";
    this.listView_Setor.grid = [
      { "header": "Nome", "field": "nome", "width": 40, "align": "left" },
      { "header": "Observação", "field": "observacao", "width": 60, "align": "left" }
    ];

    this.nome_Text.name = "txtNome";
    this.nome_Text.rules = "uppercase";
    this.nome_Text.maxLength = 20;
    this.nome_Text.minLength = 1;

    this.observacao_Text.name = "txtObservacao";
    this.observacao_Text.regex = "noFilter";
    this.observacao_Text.maxLength = 100;

    const find = null;
    const filter = { select: "Nome", field: "nome", value: "" };

    this.settings
      .subscribe((site: SiteConfig) => {
        if (site != null) {
          this.filter = { siteId: { eq: site.id } };
          this.update_Grid();
          this.actionbuttomService.top_action_buttons.forEach(topButton => {
            topButton.visibled = true;
          });
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
        this.id = undefined;
        this.nome_Text.focus();
        this.editable = true;
        break;

      case "forms.buttons.update":
        this.updateDataLoad();
        this.nome_Text.focus(true);
        this.editable = true;
        break;

      case "forms.buttons.read":
        this.updateDataLoad();
        this.editable = false;
        break;

    }
  }

  updateDataLoad() {
    this.showSpinner = true;

    const filter: SetorReparticaoFilter = { id: { eq: this.id } };
    this.setorReparticaoService.readSetorReparticao(this.order_by, filter)
      .subscribe(({ reparticaoSetor }: read_SetorReparticao) => {
        this.setorReparticao = reparticaoSetor.nodes[0];
        this.nome_Text.text = this.setorReparticao.nome;
        this.observacao_Text.text = this.setorReparticao.observacao;
        this.showSpinner = false;        
      });
  }

  onListView_Change(rowSelect?: rowSelect) {
    if (rowSelect.registro) {
      this.id = rowSelect.id;
    } else {
      if (rowSelect.exclude == "yes") {
        this.setorReparticaoService.deleteSetorReparticao(rowSelect.id)
          .subscribe(({ data }: delete_SetorReparticao) => {
            if (data.reparticaoSetor_Excluir.sucesso == true) {
              const find = { field: "id", value: rowSelect.id, type: "DEL" }
              this.update_Grid(find)

            } else {
              this.errosModalService.show(data.reparticaoSetor_Excluir.mensagemTipo,
                data.reparticaoSetor_Excluir.mensagem);
              const objeto = JSON.parse(data.reparticaoSetor_Excluir.objeto);
              this.alertService.show(data.reparticaoSetor_Excluir.mensagemTipo,
                data.reparticaoSetor_Excluir.mensagem,
                objeto);
            }
          })
      }
    }
  }

  onSave_Click() {
    this.nome_Text.validated = (this.nome_Text.text.length >= this.nome_Text.minLength);

    if (!this.nome_Text.validated) {
      this.alertService.show("ERRO",
        "Existem campos obrigatórios não preenchidos ou preenchidos de forma incorreta. Verifique!",
        null);
    } else {

      this.showSpinner = true;

      const setorReparticao: SetorReparticao = {
        id: this.id,
        siteId: <number>this.filter.siteId.eq,
        nome: this.nome_Text.text,
        observacao: this.observacao_Text.text
      }

      if (setorReparticao.id) {
        this.setorReparticaoService.updateSetorReparticao(setorReparticao)
          .subscribe(({ data }: update_SetorReparticao) => {
            const objeto: any = JSON.parse(data.reparticaoSetor_Alterar.objeto);
            if (data.reparticaoSetor_Alterar.sucesso == true) {
              const find = { field: "id", value: objeto.Id }
              this.onClose_Click();
              this.update_Grid(find);
            } else {
              this.alertService.show(data.reparticaoSetor_Alterar.mensagemTipo,
                data.reparticaoSetor_Alterar.mensagem,
                objeto);
            }
            this.showSpinner = false;
          })
      } else {
        this.setorReparticaoService.createSetorReparticao(setorReparticao)
          .subscribe(({ data }: create_SetorReparticao) => {
            const objeto: any = JSON.parse(data.reparticaoSetor_Inserir.objeto);
            if (data.reparticaoSetor_Inserir.sucesso == true) {
              const find = { field: "id", value: objeto.Id };
              this.onClose_Click(false);
              this.update_Grid(find);
            } else {
              this.alertService.show(data.reparticaoSetor_Inserir.mensagemTipo,
                data.reparticaoSetor_Inserir.mensagem,
                objeto);
            }
            this.showSpinner = false;
          })
      }
    }
  }

  onFilter_Change(filterSelect: Item) {
    switch (filterSelect.text) {
      case "Nome":
        this.filterGrid = { nome: { contains: filterSelect.value } };
        break;
      case "Observação":
        this.filterGrid = { observacao: { contains: filterSelect.value } };
        break;
    }
    this.update_Grid();
  }

  update_Grid(find?: Find, filter?: Filter) {
    const filterGrid: SetorReparticaoFilter = { ...this.filter, ...this.filterGrid };
    this.listView_Setor.processingShow();
    this.setorReparticaoService.readSetorReparticao(this.order_by, filterGrid)
      .subscribe(({ reparticaoSetor }: read_SetorReparticao) => {
        this.actionbuttomService.enableButtons(0);
        this.listView_Setor.gridUpdate(reparticaoSetor.nodes, find, filter);
      });
  }

  onClose_Click(hideForm: boolean = true) {
    this.nome_Text.clear();
    this.observacao_Text.clear();
    if (hideForm == true) {
      this.actionbuttomService.hideForm()
    } else {
      this.nome_Text.focus();
    }
  }


}