import { Component } from '@angular/core';

import { ListViewGrid, Find, Filter, rowSelect } from 'src/app/@theme/components/grid/list-view/service/list-view.service';
import { AlertServiceComponent } from 'src/app/@theme/components/form/alert-card/service/alert-card.service';
import { ActionButtomService } from 'src/app/@theme/components/grid/action-buttom/service/action-button.service';
import { OptionsGroup } from 'src/app/@theme/components/form/select-group/service/select-group.service';
import { InputLabel } from 'src/app/@theme/components/form/input-label/service/input-label.service';
import { TextareaLabel } from '../../../@theme/components/form/textarea-label/service/textarea-label.service';
import { SortOperationKind } from 'src/app/@core/api/generic-graphql';
import { Item } from 'src/app/@theme/components/form/combobox/service/combobox.service';
import { InputMultiLabel } from 'src/app/@theme/components/form/input-multi-label/service/input-multi-label';
import { BehaviorSubject } from 'rxjs';
import { DateOperator } from 'src/app/@theme/components/miscellaneous/date-operator/date-operator';
import { ConfigStorage } from 'src/app/@core/storage/config/config';

import {
  create_FaixaHorariaConcessao,
  read_FaixaHorariaConcessao,
  update_FaixaHorariaConcessao,
  delete_FaixaHorariaConcessao,
  FaixaHorariaConcessaoData,
  FaixaHorariaConcessao,
  FaixaHorariaSort,
  FaixaHorariaFilter
} from 'src/app/@core/data/concessao-faixa-horaria';

import { YesNo } from 'src/app/@core/enum';

@Component({
  selector: 'nex-faixa-horaria',
  templateUrl: './faixa-horaria.component.html',
  styleUrls: ['./faixa-horaria.component.scss']
})

export class FaixaHorariaConcessaoComponent {

  dateOperator: DateOperator = new DateOperator();

  id: number = 0;
  nome_Text: InputLabel = new InputLabel();
  inicial_Mult: InputMultiLabel = new InputMultiLabel();
  final_Mult: InputMultiLabel = new InputMultiLabel();
  dias_Options: OptionsGroup = new OptionsGroup();
  validacao_Options: OptionsGroup = new OptionsGroup();
  observacao_Text: TextareaLabel = new TextareaLabel();

  settings: BehaviorSubject<any>;
  listView_FaixaHoraria: ListViewGrid = new ListViewGrid();
  faixaHorariaConcessao: FaixaHorariaConcessao;

  showSpinner: boolean = false;
  alertService: AlertServiceComponent = new AlertServiceComponent();

  order_by: FaixaHorariaSort = { nome: SortOperationKind.ASC };
  filter: FaixaHorariaFilter;

  editable: boolean;

  constructor( public actionbuttomService: ActionButtomService,
               private config: ConfigStorage,
               private faixaHorariaConcessaoService: FaixaHorariaConcessaoData ) {

    this.settings = this.config.siteSubject();
    this.actionbuttomService.relationGrid = "lstFaixaHoraria";

    this.actionbuttomService.recurso = "27";

    this.actionbuttomService.top_action_buttons = [
      { "id": 0, "text": "forms.buttons.create", "enabled": true, "condition": "always", "openForm": true, "editable": "new", },
      { "id": 1, "text": "forms.buttons.update", "enabled": false, "condition": "select", "openForm": true, "editable": "yes", },
      { "id": 2, "text": "forms.buttons.read", "enabled": false, "condition": "select", "openForm": true, "editable": "no", },
      { "id": 3, "text": "forms.buttons.delete", "enabled": false, "condition": "multi", "openForm": false, "question": "forms.questions.delete" }
    ]


    this.listView_FaixaHoraria.name = "lstFaixaHoraria";
    this.listView_FaixaHoraria.title = "Lista de Faixas Horárias";
    this.listView_FaixaHoraria.grid = [
      { "header": "Faixa Horária", "field": "nome", "width": 16, "align": "left" },
      { "header": "Hora Inicial", "field": "horaInicial", "width": 10, "align": "center" },
      { "header": "Hora Final", "field": "horaFinal", "width": 10, "align": "center" },
      { "header": "Domingo", "field": "domingo", "width": 8, "align": "center", "enum": YesNo },
      { "header": "Segunda", "field": "segunda", "width": 8, "align": "center", "enum": YesNo },
      { "header": "Terça", "field": "terca", "width": 8, "align": "center", "enum": YesNo },
      { "header": "Quarta", "field": "quarta", "width": 8, "align": "center", "enum": YesNo },
      { "header": "Quinta", "field": "quinta", "width": 8, "align": "center", "enum": YesNo },
      { "header": "Sexta", "field": "sexta", "width": 8, "align": "center", "enum": YesNo },
      { "header": "Sábado", "field": "sabado", "width": 8, "align": "center", "enum": YesNo },
      { "header": "Feriado", "field": "feriado", "width": 8, "align": "center", "enum": YesNo }
    ];

    this.nome_Text.name = "txtNome";
    this.nome_Text.rules = "uppercase";
    this.nome_Text.maxLength = 30;
    this.nome_Text.minLength = 1;

    this.inicial_Mult.name = "txtInical";
    this.inicial_Mult.label = "Inicial";
    this.inicial_Mult.rules = "time";
    this.inicial_Mult.regex = "time";
    this.inicial_Mult.textAlign = "center";
    this.inicial_Mult.minLength = 4;
    this.inicial_Mult.maxLength = 5;

    this.final_Mult.name = "txtFinal";
    this.final_Mult.label = "Final";
    this.final_Mult.rules = "time";
    this.final_Mult.regex = "time";
    this.final_Mult.textAlign = "center";
    this.final_Mult.minLength = 4;
    this.final_Mult.maxLength = 5

    this.dias_Options.columns = 2;
    this.dias_Options.add(0, "Segunda", "segunda", false, false, false, 1, 1);
    this.dias_Options.add(5, "Sábado", "sabado", false, false, false, 1, 2);
    this.dias_Options.add(1, "Terça", "terca", false, false, false, 2, 1);
    this.dias_Options.add(6, "Domingo", "domingo", false, false, false, 2, 2);
    this.dias_Options.add(2, "Quarta", "quarta", false, false, false, 3, 1);
    this.dias_Options.add(7, "Feriado", "feriado", false, false, false, 3, 2);
    this.dias_Options.add(3, "Quinta", "quinta", false, false, false, 4, 1);
    this.dias_Options.add(4, "Sexta", "sexta", false, false, false, 5, 1);

    this.validacao_Options.add(0, "Ignorar Validação Complementar", "ignorarValidacaoComplementar");

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
        this.editable = true;
        this.nome_Text.focus();
        break;
      
      case "forms.buttons.update":
        this.editable = true;
        this.updateDataLoad();
        this.nome_Text.focus(true);
        break;
      
      case "forms.buttons.read": 
        this.editable = false;
        this.updateDataLoad();
        break;
    }
  }

  updateDataLoad() {
    this.showSpinner = true;

    const filter: FaixaHorariaFilter = { id: { eq: this.id } };
    this.faixaHorariaConcessaoService.readFaixaHorariaConcessaos(this.order_by, filter)
      .subscribe(({ concessaoFaixaHoraria }: read_FaixaHorariaConcessao) => {
        this.faixaHorariaConcessao = concessaoFaixaHoraria.nodes[0];
        this.nome_Text.text = this.faixaHorariaConcessao.nome;
        this.inicial_Mult.setTextWithMask(this.faixaHorariaConcessao.horaInicial.toString());
        this.final_Mult.setTextWithMask(this.faixaHorariaConcessao.horaFinal.toString());
        this.dias_Options.populate(this.faixaHorariaConcessao);

        if (this.faixaHorariaConcessao.ignorarValidacao == true) {
          this.validacao_Options.check(0)
        } else {
          this.validacao_Options.uncheck(0)
        }

        this.observacao_Text.text = this.faixaHorariaConcessao.observacao;
        this.showSpinner = false;
      });
  }

  onListView_Change(rowSelect?: rowSelect) {
    if (rowSelect.registro) {
      this.id = rowSelect.id;
    } else {
      if (rowSelect.exclude == "yes") {
        this.faixaHorariaConcessaoService.deleteFaixaHorariaConcessao(rowSelect.id)
          .subscribe(({ data }: delete_FaixaHorariaConcessao) => {
            if (data.concessaoFaixaHoraria_Excluir.sucesso == true) {
              const find = { field: "id", value: rowSelect.id, type: "DEL" }
              this.update_Grid(find)

            } else {
              const objeto = JSON.parse(data.concessaoFaixaHoraria_Excluir.objeto);
              this.alertService.show(data.concessaoFaixaHoraria_Excluir.mensagemTipo,
                data.concessaoFaixaHoraria_Excluir.mensagem,
                objeto);
            }
          })
      }
    }
  }

  onSave_Click() {
    this.nome_Text.validated =  (this.nome_Text.text.length >= this.nome_Text.minLength);
    this.inicial_Mult.validated = this.inicial_Mult.validated? (this.inicial_Mult.text.length >= this.inicial_Mult.minLength): false;
    this.final_Mult.validated = this.final_Mult.validated? (this.final_Mult.text.length >= this.final_Mult.minLength): false;
    this.dias_Options.count(true) > 0;

    if (!this.nome_Text.validated) {
      this.alertService.show("ERRO",
        "Existem campos obrigatórios não preenchidos ou preenchidos de forma incorreta. Verifique!",
        null);
    } else if (!this.inicial_Mult.validated) {
      this.alertService.show("ERRO",
        "Existem campos obrigatórios não preenchidos ou preenchidos de forma incorreta. Verifique!",
        null);
    } else if (!this.final_Mult.validated) {
      this.alertService.show("ERRO",
        "Existem campos obrigatórios não preenchidos ou preenchidos de forma incorreta. Verifique!",
        null);
    } else if (!this.dateOperator.compareTimeGT(this.inicial_Mult.textMasked, this.final_Mult.textMasked)) {
      this.alertService.show("ERRO",
        "Atenção! A hora final não pode ser inferior a hora inicial.",
        null);
      this.final_Mult.validated = false;
    } else if (!this.dias_Options.count(true)) {
      this.alertService.show("ERRO",
        "Selecione ao menos um dia da semana.",
        null);
    } else {

      this.showSpinner = true;

      const faixaHorariaConcessao: FaixaHorariaConcessao = {
        id: this.id,
        segunda: this.dias_Options.valueOf("segunda"),
        terca: this.dias_Options.valueOf("terca"),
        quarta: this.dias_Options.valueOf("quarta"),
        quinta: this.dias_Options.valueOf("quinta"),
        sexta: this.dias_Options.valueOf("sexta"),
        sabado: this.dias_Options.valueOf("sabado"),
        domingo: this.dias_Options.valueOf("domingo"),
        feriado: this.dias_Options.valueOf("feriado"),
        nome: this.nome_Text.text,
        observacao: this.observacao_Text.text,
        horaInicial: this.inicial_Mult.textMasked,
        horaFinal: this.final_Mult.textMasked,
        ignorarValidacao: this.validacao_Options.valueOf("ignorarValidacaoComplementar"),
      }
      if (faixaHorariaConcessao.id) {
        this.faixaHorariaConcessaoService.updateFaixaHorariaConcessao(faixaHorariaConcessao)
          .subscribe(({ data }: update_FaixaHorariaConcessao) => {
            const objeto: any = JSON.parse(data.concessaoFaixaHoraria_Alterar.objeto);
            if (data.concessaoFaixaHoraria_Alterar.sucesso == true) {
              const find = { field: "id", value: objeto.Id }
              this.onClose_Click();
              this.update_Grid(find);
            } else {
              this.alertService.show(data.concessaoFaixaHoraria_Alterar.mensagemTipo,
                data.concessaoFaixaHoraria_Alterar.mensagem,
                objeto);
            }
            this.showSpinner = false;
          })
      } else {
        this.faixaHorariaConcessaoService.createFaixaHorariaConcessao(faixaHorariaConcessao)
          .subscribe(({ data }: create_FaixaHorariaConcessao) => {
            const objeto: any = JSON.parse(data.concessaoFaixaHoraria_Inserir.objeto);
            if (data.concessaoFaixaHoraria_Inserir.sucesso == true) {
              const find = { field: "id", value: objeto.Id };
              this.onClose_Click(false);
              this.update_Grid(find);
            } else {
              this.alertService.show(data.concessaoFaixaHoraria_Inserir.mensagemTipo,
                data.concessaoFaixaHoraria_Inserir.mensagem,
                objeto);
            }
            this.showSpinner = false;
          })
      }
    }
  }

  onClose_Click(hideForm: boolean = true) {
    this.nome_Text.clear();
    this.observacao_Text.clear();
    this.inicial_Mult.clear();
    this.final_Mult.clear();
    this.dias_Options.reset();
    this.validacao_Options.reset();

    if (hideForm == true) {
      this.actionbuttomService.hideForm()
    } else {
      this.nome_Text.focus();
    }
  }

  onFilter_Change(filterSelect: Item) {
    let faixaHorariaSelect: string = "SIM";
    switch (filterSelect.text) {
      case "Faixa Horária":
        this.filter = { nome: { contains: filterSelect.value } };
        break;
      case "Hora Inicial":
        this.filter = { horaInicial: { contains: filterSelect.value } };
        break;
      case "Hora Final":
        this.filter = { horaFinal: { contains: filterSelect.value } };
        break;
      case "Domingo":
        faixaHorariaSelect = filterSelect.value;
        this.filter = { domingo: { eq: (filterSelect.value == "SIM") } };
        break;
      case "Segunda":
        faixaHorariaSelect = filterSelect.value;
        this.filter = { segunda: { eq: (filterSelect.value == "SIM") } };
        break;
      case "Terça":
        faixaHorariaSelect = filterSelect.value;
        this.filter = { terca: { eq: (filterSelect.value == "SIM") } };
        break;
      case "Quarta":
        faixaHorariaSelect = filterSelect.value;
        this.filter = { quarta: { eq: (filterSelect.value == "SIM") } };
        break;
      case "Quinta":
        faixaHorariaSelect = filterSelect.value;
        this.filter = { quinta: { eq: (filterSelect.value == "SIM") } };
        break;
      case "Sexta":
        faixaHorariaSelect = filterSelect.value;
        this.filter = { sexta: { eq: (filterSelect.value == "SIM") } };
        break;
      case "Sábado":
        faixaHorariaSelect = filterSelect.value;
        this.filter = { sabado: { eq: (filterSelect.value == "SIM") } };
        break;
      case "Feriado":
        faixaHorariaSelect = filterSelect.value;
        this.filter = { feriado: { eq: (filterSelect.value == "SIM") } };
        break;
    }
    if ((filterSelect.text == "Domingo" || filterSelect.text == "Segunda" || filterSelect.text == "Terca" ||
         filterSelect.text == "Quarta" || filterSelect.text == "Quinta" ||
         filterSelect.text == "Sexta" || filterSelect.text == "Sabado" || filterSelect.text == "Feriado")
         && (filterSelect.value != "SIM" && filterSelect.value != "NÃO")) {
      this.listView_FaixaHoraria.clear();
    } else {
      this.update_Grid();
    }
  }

  update_Grid(find?: Find, filter?: Filter) {
    this.listView_FaixaHoraria.processingShow();
    this.faixaHorariaConcessaoService.readFaixaHorariaConcessaos(this.order_by, this.filter)
      .subscribe(({ concessaoFaixaHoraria }: read_FaixaHorariaConcessao) => {
        this.actionbuttomService.enableButtons(0);
        this.listView_FaixaHoraria.gridUpdate(concessaoFaixaHoraria.nodes, find, filter);
      });
  }

}