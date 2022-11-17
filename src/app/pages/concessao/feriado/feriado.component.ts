import { Component } from '@angular/core';

import { ListViewGrid, Find, Filter, rowSelect } from 'src/app/@theme/components/grid/list-view/service/list-view.service';
import { AlertServiceComponent } from 'src/app/@theme/components/form/alert-card/service/alert-card.service';
import { ActionButtomService } from 'src/app/@theme/components/grid/action-buttom/service/action-button.service';
import { InputLabel } from 'src/app/@theme/components/form/input-label/service/input-label.service';
import { TextareaLabel } from '../../../@theme/components/form/textarea-label/service/textarea-label.service';
import { SortOperationKind } from 'src/app/@core/api/generic-graphql';
import { ComboOptions, Item } from 'src/app/@theme/components/form/combobox/service/combobox.service';
import { BehaviorSubject } from 'rxjs';
import { ConfigStorage } from 'src/app/@core/storage/config/config';
import {
  create_FeriadoConcessao,
  read_FeriadoConcessao,
  update_FeriadoConcessao,
  delete_FeriadoConcessao,
  FeriadoConcessaoData,
  FeriadoConcessao,
  FeriadoSort,
  FeriadoFilter
} from 'src/app/@core/data/concessao-feriado';

import { Mounth } from 'src/app/@core/enum';

@Component({
  selector: 'nex-feriado',
  templateUrl: './feriado.component.html',
  styleUrls: ['./feriado.component.scss']
})

export class FeriadoConcessaoComponent {

  id: number = 0;
  nome_Text: InputLabel = new InputLabel();
  dia_Option: ComboOptions = new ComboOptions();
  mes_Option: ComboOptions = new ComboOptions();
  observacao_Text: TextareaLabel = new TextareaLabel();

  settings: BehaviorSubject<any>;

  listView_Feriado: ListViewGrid = new ListViewGrid();
  feriadoConcessao: FeriadoConcessao;

  showSpinner: boolean = false;
  alertService: AlertServiceComponent = new AlertServiceComponent();

  order_by: FeriadoSort = { nome: SortOperationKind.ASC };
  filter: FeriadoFilter;

  editable: boolean;

  constructor( public actionbuttomService: ActionButtomService,
               private config: ConfigStorage,
               private feriadoConcessaoService: FeriadoConcessaoData ) {

    this.settings = this.config.siteSubject();
    this.actionbuttomService.relationGrid = "lstFeriado";

    this.actionbuttomService.recurso = "28";

    this.actionbuttomService.top_action_buttons = [
      { "id": 0, "text": "forms.buttons.create", "enabled": true, "condition": "always", "openForm": true, "editable": "new", },
      { "id": 1, "text": "forms.buttons.update", "enabled": false, "condition": "select", "openForm": true, "editable": "yes", },
      { "id": 2, "text": "forms.buttons.read", "enabled": false, "condition": "select", "openForm": true, "editable": "no", },
      { "id": 3, "text": "forms.buttons.delete", "enabled": false, "condition": "multi", "openForm": false, "question": "forms.questions.delete" }
    ]

    this.listView_Feriado.name = "lstFeriado";
    this.listView_Feriado.title = "Lista de Feriados";
    this.listView_Feriado.grid = [
      { "header": "Feriado", "field": "nome", "width": 25, "align": "left" },
      { "header": "Dia", "field": "dia", "width": 15, "align": "left" },
      { "header": "Mês", "field": "mes", "width": 15, "align": "left", "enum": Mounth },
      { "header": "Observação", "field": "observacao", "width": 45, "align": "left" }
    ];

    this.nome_Text.name = "txtNome";
    this.nome_Text.rules = "uppercase";
    this.nome_Text.maxLength = 30;
    this.nome_Text.minLength = 1;

    this.dia_Option.name = "cbDiaFeriado";
    this.dia_Option.textAlign = "center";
    for (let dia: number = 1; dia <= 31; dia++) {
      const strDia = ("0" + dia.toString()).slice(-2);
      this.dia_Option.add(strDia, strDia, dia, true);
    }

    this.mes_Option.name = "cbMesFeriado";
    this.mes_Option.add("JANEIRO", "janeiro", 1, true);
    this.mes_Option.add("FEVEREIRO", "fevereiro", 2, false);
    this.mes_Option.add("MARÇO", "marco", 3, false);
    this.mes_Option.add("ABRIL", "abril", 4, false);
    this.mes_Option.add("MAIO", "maio", 5, false);
    this.mes_Option.add("JUNHO", "junho", 6, false);
    this.mes_Option.add("JULHO", "julho", 7, false);
    this.mes_Option.add("AGOSTO", "agosto", 8, false);
    this.mes_Option.add("SETEMBRO", "setembro", 9, false);
    this.mes_Option.add("OUTUBRO", "outubro", 10, false);
    this.mes_Option.add("NOVEMBRO", "novembro", 11, false);
    this.mes_Option.add("DEZEMBRO", "dezembro", 12, false);

    this.observacao_Text.name = "txtObservacao";
    this.observacao_Text.maxLength = 100;

    const find = null;
    const filter = { select: "Nome", field: "nome", value: "" };
    this.update_Grid(find, filter);

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

    const filter: FeriadoFilter = { id: { eq: this.id } };
    this.feriadoConcessaoService.readFeriadoConcessaos(this.order_by, filter)
      .subscribe(({ concessaoFeriado }: read_FeriadoConcessao) => {
        this.feriadoConcessao = concessaoFeriado.nodes[0];
        this.nome_Text.text = this.feriadoConcessao.nome;
        this.observacao_Text.text = this.feriadoConcessao.observacao;
        this.dia_Option.select(this.feriadoConcessao.dia);
        this.mes_Option.select(this.feriadoConcessao.mes);

        this.showSpinner = false;
      });
  }

  onListView_Change(rowSelect?: rowSelect) {
    if (rowSelect.registro) {
      this.id = rowSelect.id;
    } else {
      if (rowSelect.exclude == "yes") {
        this.feriadoConcessaoService.deleteFeriadoConcessao(rowSelect.id)
          .subscribe(({ data }: delete_FeriadoConcessao) => {
            if (data.concessaoFeriado_Excluir.sucesso == true) {
              const find = { field: "id", value: rowSelect.id, type: "DEL" }
              this.update_Grid(find)

            } else {
              const objeto = JSON.parse(data.concessaoFeriado_Excluir.objeto);
              this.alertService.show(data.concessaoFeriado_Excluir.mensagemTipo,
                data.concessaoFeriado_Excluir.mensagem,
                objeto);
            }
          })
      }
    }
  }

  onMesOption_Change() {
    switch (this.mes_Option.itemSelected.id) {
      case 1: case 3: case 5:
      case 7: case 8: case 10:
      case 12:
        this.dia_Option.enable(30);
        this.dia_Option.enable(31);
        break;

      case 2:
        this.dia_Option.disable(30);
        this.dia_Option.disable(31);
        if (this.dia_Option.itemSelected.id > 29) {
          this.dia_Option.select(29);
        }
        break;

      default:
        this.dia_Option.enable(30);
        this.dia_Option.disable(31);
        if (this.dia_Option.itemSelected.id == 31) {
          this.dia_Option.select(30);
        }
        break;
        
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

      const feriadoConcessao: FeriadoConcessao = {
        id: this.id,
        nome: this.nome_Text.text,
        dia: this.dia_Option.itemSelected.id,
        mes: this.mes_Option.itemSelected.id,
        observacao: this.observacao_Text.text,
      }

      if (feriadoConcessao.id) {
        this.feriadoConcessaoService.updateFeriadoConcessao(feriadoConcessao)
          .subscribe(({ data }: update_FeriadoConcessao) => {
            const objeto: any = JSON.parse(data.concessaoFeriado_Alterar.objeto);
            if (data.concessaoFeriado_Alterar.sucesso == true) {
              const find = { field: "id", value: objeto.Id }
              this.onClose_Click();
              this.update_Grid(find);
            } else {
              this.alertService.show(data.concessaoFeriado_Alterar.mensagemTipo,
                data.concessaoFeriado_Alterar.mensagem,
                objeto);
            }
            this.showSpinner = false;
          })
      } else {
        this.feriadoConcessaoService.createFeriadoConcessao(feriadoConcessao)
          .subscribe(({ data }: create_FeriadoConcessao) => {
            const objeto: any = JSON.parse(data.concessaoFeriado_Inserir.objeto);
            if (data.concessaoFeriado_Inserir.sucesso == true) {
              const find = { field: "id", value: objeto.Id };
              this.onClose_Click(false);
              this.update_Grid(find);
            } else {
              this.alertService.show(data.concessaoFeriado_Inserir.mensagemTipo,
                data.concessaoFeriado_Inserir.mensagem,
                objeto);
            }
            this.showSpinner = false;
          })
      }
    }
  }

  onFilter_Change(filterSelect: Item) {
    switch (filterSelect.text) {
      case "Feriado":
        this.filter = { nome: { contains: filterSelect.value } };
        break;
      case "Dia":
        this.filter = { dia: { eq: parseInt(filterSelect.value) } };
        break;
      case "Mês":
        if (Mounth[filterSelect.value] != null) {
          this.filter = { mes: { eq: Mounth[filterSelect.value] } };
        } else {
          this.filter = { mes: { eq: 0 } };
        }
        break;
      case "Observação":
        this.filter = { observacao: { contains: filterSelect.value } };
        break;
    }
    this.update_Grid();
  }

  update_Grid(find?: Find, filter?: Filter) {
    this.listView_Feriado.processingShow();
    this.feriadoConcessaoService.readFeriadoConcessaos(this.order_by, this.filter)
      .subscribe(({ concessaoFeriado }: read_FeriadoConcessao) => {
        this.actionbuttomService.enableButtons(0);
        this.listView_Feriado.gridUpdate(concessaoFeriado.nodes, find, filter);
      });
  }

  onClose_Click(hideForm: boolean = true) {
    this.nome_Text.clear();
    this.observacao_Text.clear();
    this.dia_Option.select(1);
    this.mes_Option.select(1);
    if (hideForm == true) {
      this.actionbuttomService.hideForm()
    } else {
      this.nome_Text.focus();
    }
  }


}