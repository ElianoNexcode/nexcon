import { Component, OnInit } from '@angular/core';

import { ListViewGrid, Find, Filter, rowSelect } from 'src/app/@theme/components/grid/list-view/service/list-view.service';
import { AlertServiceComponent } from 'src/app/@theme/components/form/alert-card/service/alert-card.service';
import { ActionButtomService } from 'src/app/@theme/components/grid/action-buttom/service/action-button.service';
import { InputLabel } from 'src/app/@theme/components/form/input-label/service/input-label.service';

import { SortOperationKind } from 'src/app/@core/api/generic-graphql';

import {
  create_CentroCustoGrupo,
  read_CentroCustoGrupo,
  update_CentroCustoGrupo,
  delete_CentroCustoGrupo,
  CentroCustoGrupoData,
  CentroCustoGrupo,
  CentroCustoGrupoSort,
  CentroCustoGrupoFilter
} from 'src/app/@core/data/grupo-centro-custo';

import { Item } from 'src/app/@theme/components/form/combobox/service/combobox.service';
import { NavigationEnd, Router, RouterEvent } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'nex-centro-custo',
  templateUrl: './centro-custo.component.html',
  styleUrls: ['./centro-custo.component.scss']
})

export class CentroCustoGrupoComponent implements OnInit {

  id: number = 0;
  nomeGrupo_Text: InputLabel = new InputLabel();
  listView_CentroCusto: ListViewGrid = new ListViewGrid();
  centroCustoGrupo: CentroCustoGrupo;

  order_by: CentroCustoGrupoSort = { centroCusto: SortOperationKind.ASC };
  filter: CentroCustoGrupoFilter;

  showSpinner: boolean = false;
  alertService: AlertServiceComponent = new AlertServiceComponent();

  constructor(public actionbuttomService: ActionButtomService,
    private centroCustoGrupoService: CentroCustoGrupoData,
    private router: Router) {

    this.actionbuttomService.relationGrid = "lstCentroCusto";

    this.actionbuttomService.recurso = "7";
    this.actionbuttomService.top_action_buttons = [
      { "id": 0, "text": "forms.buttons.create", "enabled": true, "condition": "always", "openForm": true, "editable": "new", },
      { "id": 1, "text": "forms.buttons.update", "enabled": false, "condition": "select", "openForm": true, "editable": "yes", },
      { "id": 2, "text": "forms.buttons.read", "enabled": false, "condition": "select", "openForm": true, "editable": "no", },
      { "id": 3, "text": "forms.buttons.delete", "enabled": false, "condition": "multi", "openForm": false, "question": "forms.questions.delete" }
    ]


    this.listView_CentroCusto.name = "lstCentroCusto";
    this.listView_CentroCusto.title = "Lista de Centros de Custos";
    this.listView_CentroCusto.grid = [
      { "header": "Nome", "field": "centroCusto", "width": 100, "align": "left" }
    ];

    this.nomeGrupo_Text.name = "txtCentroCusto";
    this.nomeGrupo_Text.rules = "uppercase";
    this.nomeGrupo_Text.maxLength = 20;
    this.nomeGrupo_Text.minLength = 1;

    this.update_Grid(null, { select: "Nome", field: "centroCusto", value: "" });

  }

  ngOnInit() {
    this.router.events
      .pipe(filter((event: RouterEvent) => event instanceof NavigationEnd))
      .subscribe(() => {

        this.update_Grid(null, { select: "Nome", field: "centroCusto", value: "" });

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
        break;

      }
    }
  }

  updateDataLoad() {
    this.showSpinner = true;

    const filter: CentroCustoGrupoFilter = { id: { eq: this.id } };
    this.centroCustoGrupoService.readCentroCustoGrupos(this.order_by, filter)
      .subscribe(({ grupoCentroCusto }: read_CentroCustoGrupo) => {
        this.centroCustoGrupo = grupoCentroCusto.nodes[0];;
        this.nomeGrupo_Text.text = this.centroCustoGrupo.centroCusto;

        this.showSpinner = false;
      });
  }

  onListView_Change(rowSelect?: rowSelect) {
    if (rowSelect.registro) {
      this.id = rowSelect.id;
    } else {
      if (rowSelect.exclude == "yes") {
        this.centroCustoGrupoService.deleteCentroCustoGrupo(rowSelect.id)
          .subscribe(({ data }: delete_CentroCustoGrupo) => {
            if (data.grupoCentroCusto_Excluir.sucesso == true) {
              const find = { field: "id", value: rowSelect.id, type: "DEL" }
              this.update_Grid(find)

            } else {
              const objeto = JSON.parse(data.grupoCentroCusto_Excluir.objeto);
              this.alertService.show(data.grupoCentroCusto_Excluir.mensagemTipo,
                data.grupoCentroCusto_Excluir.mensagem,
                objeto);
            }
          })
      }
    }
  }

  onSave_Click() {
    this.nomeGrupo_Text.validated = (this.nomeGrupo_Text.text.length >= this.nomeGrupo_Text.minLength);

    if (!this.nomeGrupo_Text.validated) {
      this.alertService.show("ERRO",
        "Existem campos obrigatórios não preenchidos ou preenchidos de forma incorreta. Verifique!",
        null);
    } else {

      this.showSpinner = true;

      const centroCustoGrupo: CentroCustoGrupo = {
        id: this.id,
        centroCusto: this.nomeGrupo_Text.text,
      }

      if (centroCustoGrupo.id) {
        this.centroCustoGrupoService.updateCentroCustoGrupo(centroCustoGrupo)
          .subscribe(({ data }: update_CentroCustoGrupo) => {
            const objeto: any = JSON.parse(data.grupoCentroCusto_Alterar.objeto);
            if (data.grupoCentroCusto_Alterar.sucesso == true) {
              const find = { field: "id", value: objeto.Id }
              this.onClose_Click();
              this.update_Grid(find);
            } else {
              this.alertService.show(data.grupoCentroCusto_Alterar.mensagemTipo,
                data.grupoCentroCusto_Alterar.mensagem,
                objeto);
            }

            this.showSpinner = false;

          })
      } else {
        this.centroCustoGrupoService.createCentroCustoGrupo(centroCustoGrupo)
          .subscribe(({ data }: create_CentroCustoGrupo) => {
            const objeto: any = JSON.parse(data.grupoCentroCusto_Inserir.objeto);
            if (data.grupoCentroCusto_Inserir.sucesso == true) {
              const find = { field: "id", value: objeto.Id };
              this.onClose_Click(false);
              this.update_Grid(find);
            } else {
              this.alertService.show(data.grupoCentroCusto_Inserir.mensagemTipo,
                data.grupoCentroCusto_Inserir.mensagem,
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
        this.filter = { centroCusto: { contains: filterSelect.value } };
        break;
    }
    this.update_Grid();

  }

  update_Grid(find?: Find, filter?: Filter) {
    this.listView_CentroCusto.processingShow();
    this.centroCustoGrupoService.readCentroCustoGrupos(this.order_by, this.filter)
      .subscribe(({ grupoCentroCusto }: read_CentroCustoGrupo) => {
        this.actionbuttomService.enableButtons(0);
        this.listView_CentroCusto.gridUpdate(grupoCentroCusto.nodes, find, filter);
      });
  }

  onClose_Click(hideForm: boolean = true) {
    this.nomeGrupo_Text.clear();
    if (hideForm == true) {
      this.actionbuttomService.hideForm()
    } else {
      this.nomeGrupo_Text.focus();
    }
  }

}