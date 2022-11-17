import { Component, OnInit } from '@angular/core';
import { TextareaLabel } from '../../../@theme/components/form/textarea-label/service/textarea-label.service';

import { ListViewGrid, Find, Filter, rowSelect } from 'src/app/@theme/components/grid/list-view/service/list-view.service';
import { AlertServiceComponent } from 'src/app/@theme/components/form/alert-card/service/alert-card.service';
import { ActionButtomService } from 'src/app/@theme/components/grid/action-buttom/service/action-button.service';
import { InputLabel } from 'src/app/@theme/components/form/input-label/service/input-label.service';

import { SortOperationKind } from 'src/app/@core/api/generic-graphql';
import { Item } from 'src/app/@theme/components/form/combobox/service/combobox.service';

import {
  create_TelefonesUteisComunicacao,
  read_TelefonesUteisComunicacao,
  update_TelefonesUteisComunicacao,
  delete_TelefonesUteisComunicacao,
  TelefonesUteisComunicacaoData,
  TelefonesUteisComunicacao,
  TelefonesUteisComunicacaoSort,
  TelefonesUteisComunicacaoFilter
} from 'src/app/@core/data/comunicacao-telefones-uteis';

import { BehaviorSubject } from 'rxjs';
import { ConfigStorage, SiteConfig } from 'src/app/@core/storage/config/config';
import { NavigationEnd, Router, RouterEvent } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'nex-telefones-uteis',
  templateUrl: './telefones-uteis.component.html',
  styleUrls: ['./telefones-uteis.component.scss']
})

export class TelefonesUteisComunicacaoComponent implements OnInit {

  id: number = 0;
  nomeTelefoneUteis_Text: InputLabel = new InputLabel();
  telefone1_Text: InputLabel = new InputLabel();
  telefone2_Text: InputLabel = new InputLabel();
  emailTelefoneUteis_Text: InputLabel = new InputLabel();
  observacao_Text: TextareaLabel = new TextareaLabel();

  order_by: TelefonesUteisComunicacaoSort = { nome: SortOperationKind.ASC };
  filter: TelefonesUteisComunicacaoFilter;
  filterGrid: TelefonesUteisComunicacaoFilter;

  listView_TelefonesUteis: ListViewGrid = new ListViewGrid();
  telefonesUteisComunicacao: TelefonesUteisComunicacao;
  settings: BehaviorSubject<any>;

  first: number = 360;

  showSpinner: boolean = false;

  alertService: AlertServiceComponent = new AlertServiceComponent();

  editable: boolean;

  constructor(public actionbuttomService: ActionButtomService,
              private config: ConfigStorage,
              private telefonesUteisService: TelefonesUteisComunicacaoData,
              private router: Router) {

    this.settings = this.config.siteSubject();

    this.actionbuttomService.recurso = "54";
    this.actionbuttomService.relationGrid = "lstTelefonesUteisComunicacao";
    this.actionbuttomService.top_action_buttons = [{ "id": 0, "text": "forms.buttons.create", "visibled": false, "enabled": true, "condition": "always", "openForm": true, "editable": "new", },
                                                   { "id": 1, "text": "forms.buttons.update", "visibled": false, "enabled": false, "condition": "select", "openForm": true, "editable": "yes", },
                                                   { "id": 2, "text": "forms.buttons.delete", "visibled": false, "enabled": false, "condition": "multi", "openForm": false, "question": "forms.questions.delete" },
                                                   { "id": 3, "text": "forms.buttons.read", "visibled": false, "enabled": false, "condition": "select", "openForm": true, "editable": "no" }]

    this.listView_TelefonesUteis.name = "lstTelefonesUteisComunicacao";
    this.listView_TelefonesUteis.title = "Lista de Telefones Úteis";
    this.listView_TelefonesUteis.grid = [{ "header": "Nome", "field": "nome", "width": 20, "align": "left" },
                                         { "header": "Telefone", "field": "telefone1", "width": 15, "align": "left" },
                                         { "header": "Telefone Móvel", "field": "telefone2", "width": 15, "align": "left" },
                                         { "header": "Email", "field": "email", "width": 20, "align": "left"},
                                         { "header": "Observacao", "field": "observacao", "width": 30, "align": "left" }];

    this.nomeTelefoneUteis_Text.name = "txtNome";
    this.nomeTelefoneUteis_Text.rules = "uppercase";
    this.nomeTelefoneUteis_Text.maxLength = 30;
    this.nomeTelefoneUteis_Text.minLength = 1;

    this.telefone1_Text.name = "txtTelefone1";
    this.telefone1_Text.rules = "uppercase";
    this.telefone1_Text.maxLength = 15;
    this.telefone1_Text.minLength = 1;

    this.telefone2_Text.name = "txtTelefone2";
    this.telefone2_Text.rules = "uppercase";
    this.telefone2_Text.maxLength = 15;
    this.telefone2_Text.minLength = 1;

    this.emailTelefoneUteis_Text.name = "txtEmail";
    this.emailTelefoneUteis_Text.maxLength = 50;
    this.emailTelefoneUteis_Text.minLength = 1;
    this.emailTelefoneUteis_Text.rules = "email";
    this.emailTelefoneUteis_Text.regex = "email";

    this.observacao_Text.name = "txtObservacao";
    this.observacao_Text.maxLength = 100;

    const find = null;
    const filter = { select: "Nome", field: "nome", value: "" };

    this.settings
      .subscribe((site: SiteConfig) => {
        if (site != null) {
          this.filter = { siteId: { eq: site.id } };          
          this.actionbuttomService.top_action_buttons.forEach(topButton => {
            topButton.visibled = true;
          });

          this.listView_TelefonesUteis.clearFilter();
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
        this.nomeTelefoneUteis_Text.focus();
        this.id = undefined;
        this.editable = true;
        break;

      case "forms.buttons.update":
        this.updateDataLoad();
        this.nomeTelefoneUteis_Text.focus(true);
        this.editable = true;
        break;

      case "forms.buttons.read":
        this.updateDataLoad();
        this.editable = true;
        break;

    }
  }

  updateDataLoad() {
    this.showSpinner = true;

    const filter: TelefonesUteisComunicacaoFilter = { id: { eq: this.id } };
    this.telefonesUteisService.readTelefonesUteisComunicacaos(this.order_by, filter)
      .subscribe(({ comunicacaoTelefonesUteis }: read_TelefonesUteisComunicacao) => {
        this.telefonesUteisComunicacao = comunicacaoTelefonesUteis.nodes[0];
        this.nomeTelefoneUteis_Text.text = this.telefonesUteisComunicacao.nome;
        this.telefone1_Text.text = this.telefonesUteisComunicacao.telefone1;
        this.telefone2_Text.text = this.telefonesUteisComunicacao.telefone2;
        this.emailTelefoneUteis_Text.text = this.telefonesUteisComunicacao.email;
        this.observacao_Text.text = this.telefonesUteisComunicacao.observacao;

        this.showSpinner = false;
      });
  }

  onListView_Change(rowSelect?: rowSelect) {
    if (rowSelect.registro) {
      this.id = rowSelect.id;
    } else {
      if (rowSelect.exclude == "yes") {
        this.telefonesUteisService.deleteTelefonesUteisComunicacao(rowSelect.id)
          .subscribe(({ data }: delete_TelefonesUteisComunicacao) => {
            if (data.comunicacaoTelefonesUteis_Excluir.sucesso == true) {
              const find = { field: "id", value: rowSelect.id, type: "DEL" }
              this.update_Grid(find);
            } else {
              const objeto = JSON.parse(data.comunicacaoTelefonesUteis_Excluir.objeto);
              this.alertService.show(data.comunicacaoTelefonesUteis_Excluir.mensagemTipo,
                data.comunicacaoTelefonesUteis_Excluir.mensagem,
                objeto);
            }
          });
      }
    }
  }

  onSave_Click() {
    this.nomeTelefoneUteis_Text.validated = (this.nomeTelefoneUteis_Text.text.length >= this.nomeTelefoneUteis_Text.minLength);
    this.telefone1_Text.validated = (this.telefone1_Text.text.length >= this.telefone1_Text.minLength);

    if (!this.nomeTelefoneUteis_Text.validated || !this.telefone1_Text.validated) {
      this.alertService.show("ERRO",
        "Existem campos obrigatórios não preenchidos ou preenchidos de forma incorreta. Verifique!",
        null);
    } else {

      this.showSpinner = true;

      const telefonesUteisComunicacao: TelefonesUteisComunicacao = {
        id: this.id,
        siteId: <number>this.filter.siteId.eq,
        nome: this.nomeTelefoneUteis_Text.text,
        telefone1: this.telefone1_Text.text,
        telefone2: this.telefone2_Text.text,
        email: this.emailTelefoneUteis_Text.text,
        observacao: this.observacao_Text.text
      }

      if (telefonesUteisComunicacao.id) {
        this.telefonesUteisService.updateTelefonesUteisComunicacao(telefonesUteisComunicacao)
          .subscribe(({ data }: update_TelefonesUteisComunicacao) => {

            this.showSpinner = false;

            const objeto: any = JSON.parse(data.comunicacaoTelefonesUteis_Alterar.objeto);
            if (data.comunicacaoTelefonesUteis_Alterar.sucesso == true) {
              const find = { field: "id", value: objeto.Id }
              this.onClose_Click();
              this.update_Grid(find);
            } else {
              this.alertService.show(data.comunicacaoTelefonesUteis_Alterar.mensagemTipo,
                data.comunicacaoTelefonesUteis_Alterar.mensagem,
                objeto);
            }
          });
      } else {
        this.telefonesUteisService.createTelefonesUteisComunicacao(telefonesUteisComunicacao)
          .subscribe(({ data }: create_TelefonesUteisComunicacao) => {

            this.showSpinner = false;

            const objeto: any = JSON.parse(data.comunicacaoTelefonesUteis_Inserir.objeto);
            if (data.comunicacaoTelefonesUteis_Inserir.sucesso == true) {
              const find = { field: "id", value: objeto.Id };
              this.onClose_Click(false);
              this.update_Grid(find);
            } else {
              this.alertService.show(data.comunicacaoTelefonesUteis_Inserir.mensagemTipo,
                data.comunicacaoTelefonesUteis_Inserir.mensagem,
                objeto);
            }
          });
      }
    }
  }

  // Método utilizado para filtrar o Grid
  onListView_Filter(filterSelect: Item) {
    switch (filterSelect.text) {
      case "Nome":
        this.filterGrid = { nome: { contains: filterSelect.value } };
        break;
      case "Telefone":
        this.filterGrid = { telefone1: { contains: filterSelect.value } };
        break;
      case "Telefone Móvel":
        this.filterGrid = { telefone2: { contains: filterSelect.value } };
        break;
      case "Email":
        this.filterGrid = { email: { contains: filterSelect.value } };
        break;
      case "Observacao":
        this.filterGrid = { observacao: { contains: filterSelect.value } };
        break;
    }

    if (filterSelect.value != "nome" && filterSelect.value != "telefone1" &&
      filterSelect.value != "telefone2" && filterSelect.value != "email" &&
      filterSelect.value != "observacao") {
      this.update_Grid();
    }
  }

  update_Grid(find?: Find, filter?: Filter) {
    const filterGrid: TelefonesUteisComunicacaoFilter = { ...this.filter, ...this.filterGrid }
    this.listView_TelefonesUteis.processingShow();
    this.telefonesUteisService.readTelefonesUteisComunicacaos(this.order_by, filterGrid, this.first)
      .subscribe(({ comunicacaoTelefonesUteis }: read_TelefonesUteisComunicacao) => {
        this.actionbuttomService.enableButtons(0);
        this.listView_TelefonesUteis.gridUpdate(comunicacaoTelefonesUteis.nodes, find, filter);
      });
  }

  onClose_Click(hideForm: boolean = true) {
    this.nomeTelefoneUteis_Text.clear();
    this.telefone1_Text.clear();
    this.telefone2_Text.clear();
    this.emailTelefoneUteis_Text.clear();
    this.observacao_Text.clear();
    if (hideForm == true) {
      this.actionbuttomService.hideForm()
    } else {
      this.nomeTelefoneUteis_Text.focus();
    }
  }

}