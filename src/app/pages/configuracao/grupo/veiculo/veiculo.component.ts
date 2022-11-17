import { Item } from 'src/app/@theme/components/form/combobox/service/combobox.service';

import { Component, OnInit } from '@angular/core';

import { ListViewGrid, Find, Filter, rowSelect } from 'src/app/@theme/components/grid/list-view/service/list-view.service';
import { AlertServiceComponent } from 'src/app/@theme/components/form/alert-card/service/alert-card.service';
import { ActionButtomService } from 'src/app/@theme/components/grid/action-buttom/service/action-button.service';
import { OptionsGroup } from 'src/app/@theme/components/form/select-group/service/select-group.service';
import { InputLabel } from 'src/app/@theme/components/form/input-label/service/input-label.service';

import { SortOperationKind } from 'src/app/@core/api/generic-graphql';

import {
  create_VeiculoGrupo,
  read_VeiculoGrupo,
  update_VeiculoGrupo,
  delete_VeiculoGrupo,
  VeiculoGrupoData,
  VeiculoGrupo,
  VeiculoGrupoFilter,
  VeiculoGrupoSort
} from 'src/app/@core/data/grupo-veiculo';
import { NavigationEnd, Router, RouterEvent } from '@angular/router';
import { filter } from 'rxjs/operators';

import { YesNo } from 'src/app/@core/enum';

@Component({
  selector: 'nex-veiculo',
  templateUrl: './veiculo.component.html',
  styleUrls: ['./veiculo.component.scss']
})

export class VeiculoGrupoComponent implements OnInit {

  id: number = 0;
  nomeGrupo_Text: InputLabel = new InputLabel();
  classificacao_Options: OptionsGroup = new OptionsGroup();

  listView_Veiculo: ListViewGrid = new ListViewGrid();

  order: VeiculoGrupoSort = { veiculoGrupo: SortOperationKind.ASC };
  filter: VeiculoGrupoFilter;

  veiculoGrupo: VeiculoGrupo;

  showSpinner: boolean = false;

  alertService: AlertServiceComponent = new AlertServiceComponent();

  constructor(public actionbuttomService: ActionButtomService,
    private veiculoGrupoService: VeiculoGrupoData,
    private router: Router) {

    this.actionbuttomService.relationGrid = "lstVeiculo";

    this.actionbuttomService.recurso = "8";
    this.actionbuttomService.top_action_buttons = [
      { "id": 0, "text": "forms.buttons.create", "enabled": true, "condition": "always", "openForm": true, "editable": "new", },
      { "id": 1, "text": "forms.buttons.update", "enabled": false, "condition": "select", "openForm": true, "editable": "yes", },
      { "id": 2, "text": "forms.buttons.read", "enabled": false, "condition": "select", "openForm": true, "editable": "no", },
      { "id": 3, "text": "forms.buttons.delete", "enabled": false, "condition": "multi", "openForm": false, "question": "forms.questions.delete" }
    ]


    this.listView_Veiculo.name = "lstVeiculo";
    this.listView_Veiculo.title = "Lista de Grupos de Veículos";
    this.listView_Veiculo.grid = [
      { "header": "Nome", "field": "veiculoGrupo", "width": 18, "align": "left" },
      { "header": "Interno", "field": "veiculoInterno", "width": 10, "align": "center", "enum": YesNo },
      { "header": "Externo", "field": "veiculoExterno", "width": 10, "align": "center", "enum": YesNo }
    ];

    this.nomeGrupo_Text.name = "txtNomeGrupo";
    this.nomeGrupo_Text.rules = "uppercase";
    this.nomeGrupo_Text.maxLength = 20;
    this.nomeGrupo_Text.minLength = 1;

    this.classificacao_Options.add(0, "Interno", "veiculoInterno", false);
    this.classificacao_Options.add(1, "Externo", "veiculoExterno", false);

    this.update_Grid(null, { select: "Nome", field: "veiculoGrupo", value: "" });
  }

  ngOnInit() {
    this.router.events
      .pipe(filter((event: RouterEvent) => event instanceof NavigationEnd))
      .subscribe(() => {

        this.update_Grid(null, { select: "Nome", field: "veiculoGrupo", value: "" });

      });
  }

  onActionButtom_Click(actionButtomSelect: any) {
    switch (actionButtomSelect.text) {
      case "forms.buttons.create": {
        this.id = undefined;
        this.nomeGrupo_Text.focus();

        break;
      }
      case "forms.buttons.update": {
        this.updateDataLoad();
        this.nomeGrupo_Text.focus(true);

        break;
      }
      case "forms.buttons.read": {
        this.updateDataLoad();
      }
    }
  }

  updateDataLoad() {
    this.showSpinner = true;

    const filter: VeiculoGrupoFilter = { id: { eq: this.id } };
    this.veiculoGrupoService.readVeiculoGrupos(this.order, filter)
      .subscribe(({ grupoVeiculo }: read_VeiculoGrupo) => {
        this.veiculoGrupo = grupoVeiculo.nodes[0];;
        this.nomeGrupo_Text.text = this.veiculoGrupo.veiculoGrupo;
        this.classificacao_Options.populate(this.veiculoGrupo);

        this.showSpinner = false;
      });
  }

  onListView_Change(rowSelect?: rowSelect) {
    if (rowSelect.registro) {
      this.id = rowSelect.id;
    } else {
      if (rowSelect.exclude == "yes") {
        this.veiculoGrupoService.deleteVeiculoGrupo(rowSelect.id)
          .subscribe(({ data }: delete_VeiculoGrupo) => {
            if (data.grupoVeiculo_Excluir.sucesso == true) {
              const find = { field: "id", value: rowSelect.id, type: "DEL" }
              this.update_Grid(find)

            } else {
              const objeto = JSON.parse(data.grupoVeiculo_Excluir.objeto);
              this.alertService.show(data.grupoVeiculo_Excluir.mensagemTipo,
                data.grupoVeiculo_Excluir.mensagem,
                objeto);
            }
          })
      }
    }
  }

  onSave_Click() {
    this.nomeGrupo_Text.validated = (this.nomeGrupo_Text.text.length >= this.nomeGrupo_Text.minLength);
    this.classificacao_Options.count(true) > 0;

    if (!this.nomeGrupo_Text.validated) {
      this.alertService.show("ERRO",
        "Existem campos obrigatórios não preenchidos ou preenchidos de forma incorreta. Verifique!",
        null);
    }
    else if (this.classificacao_Options.count(true) == 0) {
        this.alertService.show("ERRO",
          "Selecione ao menos uma classificação para este Grupo de Veículos.",
          null);
    } else {

      this.showSpinner = true;

      const veiculoGrupo: VeiculoGrupo = {
        id: this.id,
        veiculoGrupo: this.nomeGrupo_Text.text,
        veiculoInterno: this.classificacao_Options.valueOf("veiculoInterno"),
        veiculoExterno: this.classificacao_Options.valueOf("veiculoExterno")
      }

      if (veiculoGrupo.id) {
        this.veiculoGrupoService.updateVeiculoGrupo(veiculoGrupo)
          .subscribe(({ data }: update_VeiculoGrupo) => {
            const objeto: any = JSON.parse(data.grupoVeiculo_Alterar.objeto);
            if (data.grupoVeiculo_Alterar.sucesso == true) {
              const find = { field: "id", value: objeto.Id }
              this.onClose_Click();
              this.update_Grid(find);
            } else {
              this.alertService.show(data.grupoVeiculo_Alterar.mensagemTipo,
                data.grupoVeiculo_Alterar.mensagem,
                objeto);
            }

            this.showSpinner = false;

          })
      } else {
        this.veiculoGrupoService.createVeiculoGrupo(veiculoGrupo)
          .subscribe(({ data }: create_VeiculoGrupo) => {
            const objeto: any = JSON.parse(data.grupoVeiculo_Inserir.objeto);
            if (data.grupoVeiculo_Inserir.sucesso == true) {
              const find = { field: "id", value: objeto.Id };
              this.onClose_Click(false);
              this.update_Grid(find);
            } else {
              this.alertService.show(data.grupoVeiculo_Inserir.mensagemTipo,
                data.grupoVeiculo_Inserir.mensagem,
                objeto);
            }

            this.showSpinner = false;

          })
      }
    }
  }

  onFilter_Change(filterSelect: Item) {
    let veiculoGrupoSelect: string = YesNo[YesNo.SIM];
    switch (filterSelect.text) {
      case "Nome":
        this.filter = { veiculoGrupo: { contains: filterSelect.value } };
        break;
      case "Interno":
        veiculoGrupoSelect = filterSelect.value;
        this.filter = { veiculoInterno: { eq: (filterSelect.value == YesNo[YesNo.SIM]) } };
        break;
      case "Externo":
        veiculoGrupoSelect = filterSelect.value;
        this.filter = { veiculoExterno: { eq: (filterSelect.value == YesNo[YesNo.SIM]) } };
        break;
    }

    if ((filterSelect.text == "Interno" ||
      filterSelect.text == "Externo") &&
      (filterSelect.value != YesNo[YesNo.SIM] && filterSelect.value != YesNo[YesNo.NÃO])) {
      this.listView_Veiculo.clear();
    } else {
      this.update_Grid();
    }

  }

  update_Grid(find?: Find, filter?: Filter) {
    this.listView_Veiculo.processingShow();
    this.veiculoGrupoService.readVeiculoGrupos(this.order, this.filter)
      .subscribe(({ grupoVeiculo }: read_VeiculoGrupo) => {
        this.actionbuttomService.enableButtons(0);
        this.listView_Veiculo.gridUpdate(grupoVeiculo.nodes, find, filter);
      });
  }

  onClose_Click(hideForm: boolean = true) {
    this.nomeGrupo_Text.clear();
    this.classificacao_Options.reset();
    if (hideForm == true) {
      this.actionbuttomService.hideForm()
    } else {
      this.nomeGrupo_Text.focus();
    }
  }

}