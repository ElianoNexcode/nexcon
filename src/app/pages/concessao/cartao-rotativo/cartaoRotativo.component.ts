import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import { Item } from 'src/app/@theme/components/form/combobox/service/combobox.service';

import { ListViewGrid, Find, Filter, rowSelect } from 'src/app/@theme/components/grid/list-view/service/list-view.service';
import { AlertServiceComponent } from 'src/app/@theme/components/form/alert-card/service/alert-card.service';
import { ActionButtomService } from 'src/app/@theme/components/grid/action-buttom/service/action-button.service';
import { InputLabel } from 'src/app/@theme/components/form/input-label/service/input-label.service';
import { SortOperationKind } from 'src/app/@core/api/generic-graphql';
import { RadioOptions } from 'src/app/@theme/components/form/radio/service/radio.service';
import { BehaviorSubject } from 'rxjs';
import { ConfigStorage, SiteConfig } from 'src/app/@core/storage/config/config';
import { ErrosModalService } from 'src/app/@theme/modals/erros/service/erros-modal.service';

import {
  CartaoRotativo,
  CartaoRotativoData,
  CartaoRotativoSort,
  create_CartaoRotativo,
  read_CartaoRotativo,
  update_CartaoRotativo,
  delete_CartaoRotativo,
  CartaoRotativoFilter
} from 'src/app/@core/data/concessao-cartaoRotativo';

import { PessoaTipo, PessoaTipoColor, PessoaTipoSigla, Status, StatusColor } from 'src/app/@core/enum';

@Component({
  selector: 'nex-cartaoRotativo',
  templateUrl: './cartaoRotativo.component.html',
  styleUrls: ['./cartaoRotativo.component.scss'],
})

export class CartaoRotativoComponent implements AfterViewInit, OnDestroy {

  id: number = 0;
  identificador_Text: InputLabel = new InputLabel();
  cartao_Text: InputLabel = new InputLabel();
  status_Options: RadioOptions = new RadioOptions;

  listView_CartaoRotativo: ListViewGrid = new ListViewGrid();

  order_by: CartaoRotativoSort = { identificador: SortOperationKind.ASC };
  filter: CartaoRotativoFilter;
  filterGrid: CartaoRotativoFilter;

  alertService: AlertServiceComponent = new AlertServiceComponent();
  settings: BehaviorSubject<any>;
  cartaoRotativo: CartaoRotativo;
  showSpinner: boolean = false;

  errosModalService: ErrosModalService = new ErrosModalService();

  constructor(public actionbuttomService: ActionButtomService,
              private cartaoRotativoService: CartaoRotativoData,
              private config: ConfigStorage) {

    this.settings = this.config.siteSubject();

    this.actionbuttomService.relationGrid = "lstCartaoRotativo";
    this.actionbuttomService.recurso = "26";

    this.actionbuttomService.top_action_buttons = [{ "id": 0, "text": "forms.buttons.create", "visibled": false, "enabled": true, "condition": "always", "openForm": true, "editable": "new", },
                                                   { "id": 1, "text": "forms.buttons.update", "visibled": false, "enabled": false, "condition": "select", "openForm": true, "editable": "yes", },
                                                   { "id": 2, "text": "forms.buttons.read", "visibled": false, "enabled": false, "condition": "select", "openForm": true, "editable": "no" },
                                                   { "id": 3, "text": "forms.buttons.delete", "visibled": false, "enabled": false, "condition": "multi", "openForm": false, "question": "forms.questions.delete" }]

    this.listView_CartaoRotativo.name = "lstCartaoRotativo";
    this.listView_CartaoRotativo.status = "status";
    this.listView_CartaoRotativo.colorEntity = "identificacao";
    this.listView_CartaoRotativo.colorField = "pessoaTipo";
    this.listView_CartaoRotativo.colorEnum = PessoaTipoColor;
    this.listView_CartaoRotativo.title = "Lista de Cartões Rotativos";
    this.listView_CartaoRotativo.grid = [{ "header": "ID", "field": "identificador", "width": 15, "align": "left" },
                                         { "header": "Cartão", "field": "cartao", "width": 15, "align": "left" },
                                         { "header": "Usuário", "entity": "identificacao", "field": "pessoaNome", "width": 20, "align": "left" },
                                         { "header": "Tipo", "entity": "identificacao", "field": "pessoaTipo", "width": 20, "align": "center", "enum": PessoaTipoSigla },
                                         { "header": "Status", "field": "status", "width": 30, "align": "left", "enum": Status }];

    this.errosModalService.relationGrid = "lstCartaoRotativo";

    this.identificador_Text.name = "txtIdentificador";
    this.identificador_Text.rules = "onlynumbers";
    this.identificador_Text.minLength = 1
    this.identificador_Text.maxLength = 15

    this.cartao_Text.name = "txtCartao";
    this.cartao_Text.rules = "onlynumbers";
    this.cartao_Text.minLength = 1;
    this.cartao_Text.maxLength = 15;

    this.status_Options.add(1, "Livre", "livre", true);
    this.status_Options.add(0, "Bloqueado", "bloqueado");

    const find = null;
    const filter = { select: "Identificador", field: "identificador", value: "" };

  }

  ngAfterViewInit(): void {
    this.settings
      .subscribe((site: SiteConfig) => {
        if (site != null) {
          this.filter = { siteId: { eq: site.id } };          
          this.actionbuttomService.top_action_buttons.forEach(topButton => {
            topButton.visibled = true;
          });

          this.listView_CartaoRotativo.clearFilter();
        }
      });
  }

  onActionButtom_Click(actionButtomSelect: any) {
    switch (actionButtomSelect.text) {
      case "forms.buttons.create": {
        this.id = undefined;
        this.identificador_Text.enable(false);
        this.identificador_Text.focus();
        break;
      }
      case "forms.buttons.update": {
        this.updateDataLoad();
        this.identificador_Text.disable(false, true);
        this.cartao_Text.focus(true);
        break;
      }
      case "forms.buttons.read": {
        this.updateDataLoad();
        break;
      }
    }
  }

  updateDataLoad() {
    this.showSpinner = true;

    const filter: CartaoRotativoFilter = { identificador: { eq: this.id } };
    this.cartaoRotativoService.readCartaoRotativo(this.order_by, filter)
      .subscribe(({ concessaoCartaoRotativo }: read_CartaoRotativo) => {
        this.cartaoRotativo = concessaoCartaoRotativo.nodes[0];
        this.cartao_Text.text = this.cartaoRotativo.cartao.toString();
        this.identificador_Text.text = this.cartaoRotativo.identificador.toString();
        this.status_Options.select(this.cartaoRotativo.status ? 1 : 0);

        this.showSpinner = false;
      });
  }

  onListView_Change(rowSelect?: rowSelect) {
    if (rowSelect.registro) {
      this.id = rowSelect.id;
    } else {
      if (rowSelect.exclude == "yes") {
        this.cartaoRotativoService.deleteCartaoRotativo(rowSelect.id)
          .subscribe(({ data }: delete_CartaoRotativo) => {
            if (data.concessaoCartaoRotativo_Excluir.sucesso == true) {
              const find = { field: "id", value: rowSelect.id, type: "DEL" }
              this.update_Grid(find)

            } else {
              this.errosModalService.show(data.concessaoCartaoRotativo_Excluir.mensagemTipo,
                data.concessaoCartaoRotativo_Excluir.mensagem);
              const objeto = JSON.parse(data.concessaoCartaoRotativo_Excluir.objeto);
              this.alertService.show(data.concessaoCartaoRotativo_Excluir.mensagemTipo,
                data.concessaoCartaoRotativo_Excluir.mensagem,
                objeto);
            }
          });
      }
    }
  }

  onSave_Click() {
    this.identificador_Text.validated = (this.identificador_Text.text.length >= this.identificador_Text.minLength);
    this.cartao_Text.validated = (this.cartao_Text.text.length >= this.cartao_Text.minLength);

    if (!this.identificador_Text.validated || !this.cartao_Text.validated) {
      this.alertService.show("ERRO",
        "Existem campos obrigatórios não preenchidos ou preenchidos de forma incorreta. Verifique!",
        null);
    } else {

      this.showSpinner = true;
      const cartaoRotativo: CartaoRotativo = {
        identificador: parseInt(this.identificador_Text.text),
        siteId: <number>this.filter.siteId.eq,
        cartao: parseInt(this.cartao_Text.text),
        status: (this.status_Options.itemSelected.id == 1)
      };

      if (this.identificador_Text.disabled == true) {
        this.cartaoRotativoService.updateCartaoRotativo(cartaoRotativo)
          .subscribe(({ data }: update_CartaoRotativo) => {

            this.showSpinner = false;

            const objeto: any = JSON.parse(data.concessaoCartaoRotativo_Alterar.objeto);
            if (data.concessaoCartaoRotativo_Alterar.sucesso == true) {
              const find = { field: "identificador", value: parseInt(this.identificador_Text.text) };
              this.onClose_Click();
              this.update_Grid(find);
            } else {
              this.alertService.show(data.concessaoCartaoRotativo_Alterar.mensagemTipo,
                data.concessaoCartaoRotativo_Alterar.mensagem,
                objeto);
            }
          })
      } else {
        this.cartaoRotativoService.createCartaoRotativo(cartaoRotativo)
          .subscribe(({ data }: create_CartaoRotativo) => {

            this.showSpinner = false;

            const objeto: any = JSON.parse(data.concessaoCartaoRotativo_Inserir.objeto);
            if (data.concessaoCartaoRotativo_Inserir.sucesso == true) {
              const find = { field: "identificador", value: parseInt(this.identificador_Text.text) };
              this.onClose_Click(false);
              this.identificador_Text.focus();
              this.update_Grid(find);
            } else {
              this.alertService.show(data.concessaoCartaoRotativo_Inserir.mensagemTipo,
                data.concessaoCartaoRotativo_Inserir.mensagem,
                objeto);
            }
          })
      }
    }
  }

  onFilter_Change(filterSelect: Item) {
    if (filterSelect.value.length > 0) {
      switch (filterSelect.text) {
        case "ID":
          this.filterGrid = { identificador: { eq: parseInt(filterSelect.value) } };
          break;
        case "Cartão":
          this.filterGrid = { cartao: { eq: parseInt(filterSelect.value) } };
          break;
        case "Usuário":
            this.filterGrid = { identificacao: { pessoaNome: { contains: filterSelect.value } } };
            break;
        case "Tipo":
          this.filterGrid = { identificacao: { pessoaTipo: { eq: PessoaTipoSigla[filterSelect.value] } }};
          break;
        case "Estado":
          this.filterGrid = { status: { eq: (Status[filterSelect.value] == 1? true: Status[filterSelect.value] == 0? false: null) } };
          break;
      }
    } else {
      this.filterGrid = undefined;
    }
    this.update_Grid();
  }

  update_Grid(find?: Find, filter?: Filter) {
    const filterGrid: CartaoRotativoFilter = { ...this.filter, ...this.filterGrid };
    this.listView_CartaoRotativo.processingShow();
    this.cartaoRotativoService.readCartaoRotativo(this.order_by, filterGrid)
      .subscribe(({ concessaoCartaoRotativo }: read_CartaoRotativo) => {
        this.actionbuttomService.enableButtons(0);
        this.listView_CartaoRotativo.gridUpdate(concessaoCartaoRotativo?.nodes, find, filter, "identificador");
      });
  }

  onClose_Click(hideForm: boolean = true) {
    this.identificador_Text.clear();
    this.cartao_Text.clear();
    this.status_Options.select(1);
    if (hideForm == true) {
      this.actionbuttomService.hideForm()
    } else {
      this.identificador_Text.focus();
    }
  }

  ngOnDestroy() {
    this.settings.unsubscribe();
  }
}
