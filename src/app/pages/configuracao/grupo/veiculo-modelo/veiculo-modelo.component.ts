import { Component, OnInit } from '@angular/core';

import { ListViewGrid, Find, Filter, rowSelect } from 'src/app/@theme/components/grid/list-view/service/list-view.service';
import { AlertServiceComponent } from 'src/app/@theme/components/form/alert-card/service/alert-card.service';
import { ActionButtomService } from 'src/app/@theme/components/grid/action-buttom/service/action-button.service';
import { InputLabel } from 'src/app/@theme/components/form/input-label/service/input-label.service';

import { SortOperationKind } from 'src/app/@core/api/generic-graphql';

import { Item } from 'src/app/@theme/components/form/combobox/service/combobox.service';

import {
  create_VeiculoModeloGrupo,
  read_VeiculoModeloGrupo,
  update_VeiculoModeloGrupo,
  delete_VeiculoModeloGrupo,
  VeiculoModeloGrupoData,
  VeiculoModeloGrupo,
  VeiculoModeloGrupoFilter,
  VeiculoModeloGrupoSort
} from 'src/app/@core/data/grupo-veiculo-modelo';
import { NavigationEnd, Router, RouterEvent } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'nex-veiculo-modelo',
  templateUrl: './veiculo-modelo.component.html',
  styleUrls: ['./veiculo-modelo.component.scss']
})

export class VeiculoModeloGrupoComponent implements OnInit {

  id: number = 0;
  nomeGrupo_Text: InputLabel = new InputLabel();

  order_by: VeiculoModeloGrupoSort = { veiculoModelo: SortOperationKind.ASC };
  filter: VeiculoModeloGrupoFilter;

  listView_VeiculoModelo: ListViewGrid = new ListViewGrid();

  veiculoModeloGrupo: VeiculoModeloGrupo;

  showSpinner: boolean = false;

  alertService: AlertServiceComponent = new AlertServiceComponent();

  constructor(public actionbuttomService: ActionButtomService,
    private veiculoModeloGrupoService: VeiculoModeloGrupoData,
    private router: Router) {

    this.actionbuttomService.relationGrid = "lstVeiculoModelo";

    this.actionbuttomService.recurso = "14";
    this.actionbuttomService.top_action_buttons = [
      { "id": 0, "text": "forms.buttons.create", "enabled": true, "condition": "always", "openForm": true, "editable": "new", },
      { "id": 1, "text": "forms.buttons.update", "enabled": false, "condition": "select", "openForm": true, "editable": "yes", },
      { "id": 2, "text": "forms.buttons.read", "enabled": false, "condition": "select", "openForm": true, "editable": "no", },
      { "id": 3, "text": "forms.buttons.delete", "enabled": false, "condition": "multi", "openForm": false, "question": "forms.questions.delete" }
    ]


    this.listView_VeiculoModelo.name = "lstVeiculoModelo";
    this.listView_VeiculoModelo.title = "Lista de Modelos de Veículos";
    this.listView_VeiculoModelo.grid = [
      { "header": "Nome", "field": "veiculoModelo", "width": 100, "align": "left" }
    ];

    this.nomeGrupo_Text.name = "txtNomeGrupo";
    this.nomeGrupo_Text.rules = "uppercase";
    this.nomeGrupo_Text.maxLength = 30;
    this.nomeGrupo_Text.minLength = 1;

    this.update_Grid(null, { select: "Nome", field: "veiculoModelo", value: "" });
  }

  ngOnInit() {
    this.router.events
      .pipe(filter((event: RouterEvent) => event instanceof NavigationEnd))
      .subscribe(() => {

        this.update_Grid(null, { select: "Nome", field: "veiculoModelo", value: "" });

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

    const filter: VeiculoModeloGrupoFilter = { id: { eq: this.id } };
    this.veiculoModeloGrupoService.readVeiculoModeloGrupos(this.order_by, filter)
      .subscribe(({ grupoVeiculoModelo }: read_VeiculoModeloGrupo) => {
        this.veiculoModeloGrupo = grupoVeiculoModelo.nodes[0];;
        this.nomeGrupo_Text.text = this.veiculoModeloGrupo.veiculoModelo;

        this.showSpinner = false;
      });
  }

  onListView_Change(rowSelect?: rowSelect) {
    if (rowSelect.registro) {
      this.id = rowSelect.id;
    } else {
      if (rowSelect.exclude == "yes") {
        this.veiculoModeloGrupoService.deleteVeiculoModeloGrupo(rowSelect.id)
          .subscribe(({ data }: delete_VeiculoModeloGrupo) => {
            if (data.grupoVeiculoModelo_Excluir.sucesso == true) {
              const find = { field: "id", value: rowSelect.id, type: "DEL" }
              this.update_Grid(find)

            } else {
              const objeto = JSON.parse(data.grupoVeiculoModelo_Excluir.objeto);
              this.alertService.show(data.grupoVeiculoModelo_Excluir.mensagemTipo,
                data.grupoVeiculoModelo_Excluir.mensagem,
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

      const veiculoModelo: VeiculoModeloGrupo = {
        id: this.id,
        veiculoModelo: this.nomeGrupo_Text.text,
      }

      if (veiculoModelo.id) {
        this.veiculoModeloGrupoService.updateVeiculoModeloGrupo(veiculoModelo)
          .subscribe(({ data }: update_VeiculoModeloGrupo) => {
            const objeto: any = JSON.parse(data.grupoVeiculoModelo_Alterar.objeto);
            if (data.grupoVeiculoModelo_Alterar.sucesso == true) {
              const find = { field: "id", value: objeto.Id }
              this.onClose_Click();
              this.update_Grid(find);
            } else {
              this.alertService.show(data.grupoVeiculoModelo_Alterar.mensagemTipo,
                data.grupoVeiculoModelo_Alterar.mensagem,
                objeto);
            }

            this.showSpinner = false;

          })
      } else {
        this.veiculoModeloGrupoService.createVeiculoModeloGrupo(veiculoModelo)
          .subscribe(({ data }: create_VeiculoModeloGrupo) => {
            const objeto: any = JSON.parse(data.grupoVeiculoModelo_Inserir.objeto);
            if (data.grupoVeiculoModelo_Inserir.sucesso == true) {
              const find = { field: "id", value: objeto.Id };
              this.onClose_Click(false);
              this.update_Grid(find);
            } else {
              this.alertService.show(data.grupoVeiculoModelo_Inserir.mensagemTipo,
                data.grupoVeiculoModelo_Inserir.mensagem,
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
        this.filter = { veiculoModelo: { contains: filterSelect.value } };
        break;
    }
    this.update_Grid();

  }

  update_Grid(find?: Find, filter?: Filter) {
    this.listView_VeiculoModelo.processingShow();
    this.veiculoModeloGrupoService.readVeiculoModeloGrupos(this.order_by, this.filter)
      .subscribe(({ grupoVeiculoModelo }: read_VeiculoModeloGrupo) => {
        this.actionbuttomService.enableButtons(0);
        this.listView_VeiculoModelo.gridUpdate(grupoVeiculoModelo.nodes, find, filter);
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