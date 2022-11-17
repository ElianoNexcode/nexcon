import { Component, OnInit } from '@angular/core';

import { ListViewGrid, Find, Filter, rowSelect } from 'src/app/@theme/components/grid/list-view/service/list-view.service';
import { AlertServiceComponent } from 'src/app/@theme/components/form/alert-card/service/alert-card.service';
import { ActionButtomService } from 'src/app/@theme/components/grid/action-buttom/service/action-button.service';
import { InputLabel } from 'src/app/@theme/components/form/input-label/service/input-label.service';

import { SortOperationKind } from 'src/app/@core/api/generic-graphql';

import { Item } from 'src/app/@theme/components/form/combobox/service/combobox.service';

import {
  create_EmergenciaGrupo,
  read_EmergenciaGrupo,
  update_EmergenciaGrupo,
  delete_EmergenciaGrupo,
  EmergenciaGrupoData,
  EmergenciaGrupo,
  EmergenciaGrupoFilter,
  EmergenciaGrupoSort
} from 'src/app/@core/data/grupo-emergencia';
import { NavigationEnd, Router, RouterEvent } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'nex-emergencia',
  templateUrl: './emergencia.component.html',
  styleUrls: ['./emergencia.component.scss']
})

export class EmergenciaComponent implements OnInit {

  id: number = 0;
  nomeGrupo_Text: InputLabel = new InputLabel();
  order_by: EmergenciaGrupoSort = { emergenciaGrupo: SortOperationKind.ASC }
  listView_Emergencia: ListViewGrid = new ListViewGrid();
  emergenciaGrupo: EmergenciaGrupo;

  filter: EmergenciaGrupoFilter;
  showSpinner: boolean = false;
  alertService: AlertServiceComponent = new AlertServiceComponent();

  constructor(public actionbuttomService: ActionButtomService,
    private emergenciaGrupoService: EmergenciaGrupoData,
    private router: Router) {

    this.actionbuttomService.relationGrid = "lstEmergencia";

    this.actionbuttomService.recurso = "15";
    this.actionbuttomService.top_action_buttons = [
      { "id": 0, "text": "forms.buttons.create", "enabled": true, "condition": "always", "openForm": true, "editable": "new", },
      { "id": 1, "text": "forms.buttons.update", "enabled": false, "condition": "select", "openForm": true, "editable": "yes", },
      { "id": 2, "text": "forms.buttons.read", "enabled": false, "condition": "select", "openForm": true, "editable": "no", },
      { "id": 3, "text": "forms.buttons.delete", "enabled": false, "condition": "multi", "openForm": false, "question": "forms.questions.delete" }
    ]


    this.listView_Emergencia.name = "lstEmergencia";
    this.listView_Emergencia.title = "Lista de Grupos de Emergência";
    this.listView_Emergencia.grid = [
      { "header": "Nome", "field": "emergenciaGrupo", "width": 100, "align": "left" }
    ];

    // Inicialização do componente nex-input-label para nomeGrupo_Text.
    this.nomeGrupo_Text.name = "txtEmergenciaGrupo";
    this.nomeGrupo_Text.rules = "uppercase";
    this.nomeGrupo_Text.minLength = 1;
    this.nomeGrupo_Text.maxLength = 20;

    this.update_Grid(null, { select: "Nome", field: "emergenciaGrupo", value: "" });

  }

  ngOnInit() {
    this.router.events
      .pipe(filter((event: RouterEvent) => event instanceof NavigationEnd))
      .subscribe(() => {

        this.update_Grid(null, { select: "Nome", field: "emergenciaGrupo", value: "" });

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

    const filter: EmergenciaGrupoFilter = { id: { eq: this.id } };
    this.emergenciaGrupoService.readEmergenciaGrupos(this.order_by, filter)
      .subscribe(({ grupoEmergencia }: read_EmergenciaGrupo) => {
        this.emergenciaGrupo = grupoEmergencia.nodes[0];;
        this.nomeGrupo_Text.text = this.emergenciaGrupo.emergenciaGrupo;

        this.showSpinner = false;
      });
  }

  onListView_Change(rowSelect?: rowSelect) {
    if (rowSelect.registro) {
      this.id = rowSelect.id;
    } else {
      if (rowSelect.exclude == "yes") {
        this.emergenciaGrupoService.deleteEmergenciaGrupo(rowSelect.id)
          .subscribe(({ data }: delete_EmergenciaGrupo) => {
            if (data.grupoEmergencia_Excluir.sucesso == true) {
              const find = { field: "id", value: rowSelect.id, type: "DEL" }
              this.update_Grid(find)

            } else {
              const objeto = JSON.parse(data.grupoEmergencia_Excluir.objeto);
              this.alertService.show(data.grupoEmergencia_Excluir.mensagemTipo,
                data.grupoEmergencia_Excluir.mensagem,
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

      const emergenciaGrupo: EmergenciaGrupo = {
        id: this.id,
        emergenciaGrupo: this.nomeGrupo_Text.text,
      }

      if (emergenciaGrupo.id) {
        this.emergenciaGrupoService.updateEmergenciaGrupo(emergenciaGrupo)
          .subscribe(({ data }: update_EmergenciaGrupo) => {
            const objeto: any = JSON.parse(data.grupoEmergencia_Alterar.objeto);
            if (data.grupoEmergencia_Alterar.sucesso == true) {
              const find = { field: "id", value: objeto.Id }
              this.onClose_Click();
              this.update_Grid(find);
            } else {
              this.alertService.show(data.grupoEmergencia_Alterar.mensagemTipo,
                data.grupoEmergencia_Alterar.mensagem,
                objeto);
            }

            this.showSpinner = false;

          })
      } else {
        this.emergenciaGrupoService.createEmergenciaGrupo(emergenciaGrupo)
          .subscribe(({ data }: create_EmergenciaGrupo) => {
            const objeto: any = JSON.parse(data.grupoEmergencia_Inserir.objeto);
            if (data.grupoEmergencia_Inserir.sucesso == true) {
              const find = { field: "id", value: objeto.Id };
              this.onClose_Click(false);
              this.update_Grid(find);
            } else {
              this.alertService.show(data.grupoEmergencia_Inserir.mensagemTipo,
                data.grupoEmergencia_Inserir.mensagem,
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
        this.filter = { emergenciaGrupo: { contains: filterSelect.value } };
        break;
    }
    this.update_Grid();
  }

  update_Grid(find?: Find, filter?: Filter) {
    this.listView_Emergencia.processingShow();
    this.emergenciaGrupoService.readEmergenciaGrupos(this.order_by, this.filter)
      .subscribe(({ grupoEmergencia }: read_EmergenciaGrupo) => {
        this.actionbuttomService.enableButtons(0);
        this.listView_Emergencia.gridUpdate(grupoEmergencia.nodes, find, filter);
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