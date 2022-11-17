import { Component, OnInit } from '@angular/core';

import { ListViewGrid, Find, Filter, rowSelect } from 'src/app/@theme/components/grid/list-view/service/list-view.service';
import { AlertServiceComponent } from 'src/app/@theme/components/form/alert-card/service/alert-card.service';
import { ActionButtomService } from 'src/app/@theme/components/grid/action-buttom/service/action-button.service';
import { InputLabel } from 'src/app/@theme/components/form/input-label/service/input-label.service';

import { SortOperationKind } from 'src/app/@core/api/generic-graphql';

import { Item } from 'src/app/@theme/components/form/combobox/service/combobox.service';

import {
  create_EmpresaGrupo,
  read_EmpresaGrupo,
  update_EmpresaGrupo,
  delete_EmpresaGrupo,
  EmpresaGrupoData,
  EmpresaGrupo,
  EmpresaGrupoFilter,
  EmpresaGrupoSort
} from 'src/app/@core/data/grupo-empresa';
import { NavigationEnd, Router, RouterEvent } from '@angular/router';
import { filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { ErrosModalService } from 'src/app/@theme/modals/erros/service/erros-modal.service';

@Component({
  selector: 'nex-empresa',
  templateUrl: './empresa.component.html',
  styleUrls: ['./empresa.component.scss']
})

export class EmpresaComponent implements OnInit {

  deleteEmpresaGrupo: Subscription;

  id: number = 0;
  nomeGrupo_Text: InputLabel = new InputLabel();

  order_by: EmpresaGrupoSort = { empresaGrupo: SortOperationKind.ASC };

  listView_Empresa: ListViewGrid = new ListViewGrid();

  empresaGrupo: EmpresaGrupo;

  filter: EmpresaGrupoFilter;

  showSpinner: boolean = false;

  alertService: AlertServiceComponent = new AlertServiceComponent();

  errosModalService: ErrosModalService = new ErrosModalService();

  constructor(public actionbuttomService: ActionButtomService,
    private empresaGrupoService: EmpresaGrupoData,
    private router: Router) {

    this.actionbuttomService.relationGrid = "lstEmpresa";

    this.actionbuttomService.recurso = "12";
    this.actionbuttomService.top_action_buttons = [
      { "id": 0, "text": "forms.buttons.create", "enabled": true, "condition": "always", "openForm": true, "editable": "new", },
      { "id": 1, "text": "forms.buttons.update", "enabled": false, "condition": "select", "openForm": true, "editable": "yes", },
      { "id": 2, "text": "forms.buttons.read", "enabled": false, "condition": "select", "openForm": true, "editable": "no", },
      { "id": 3, "text": "forms.buttons.delete", "enabled": false, "condition": "multi", "openForm": false, "question": "forms.questions.delete" }
    ]


    this.listView_Empresa.name = "lstEmpresa";
    this.listView_Empresa.title = "Lista de Grupo de Empresas";
    this.listView_Empresa.grid = [
      { "header": "Nome", "field": "empresaGrupo", "width": 100, "align": "left" }
    ];

    // Inicialização do componente nex-input-label para nomeGrupo_Text.
    this.nomeGrupo_Text.name = "txtNomeGrupo";
    this.nomeGrupo_Text.rules = "uppercase";
    this.nomeGrupo_Text.maxLength = 20;
    this.nomeGrupo_Text.minLength = 1;

    this.update_Grid(null, { select: "Nome", field: "empresaGrupo", value: "" });

  }

  ngOnInit() {
    this.router.events
      .pipe(filter((event: RouterEvent) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.update_Grid(null, { select: "Nome", field: "empresaGrupo", value: "" });
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

    const filter: EmpresaGrupoFilter = { id: { eq: this.id } };
    this.empresaGrupoService.readEmpresaGrupos(this.order_by, filter)
      .subscribe(({ grupoEmpresa }: read_EmpresaGrupo) => {
        this.empresaGrupo = grupoEmpresa.nodes[0];
        this.nomeGrupo_Text.text = this.empresaGrupo.empresaGrupo;

        this.showSpinner = false;
      });
  }

  onListView_Change(rowSelect?: rowSelect) {
    if (rowSelect.registro) {
      this.id = rowSelect.id;
    } else {
      if (rowSelect.exclude == "yes") {
        this.deleteEmpresaGrupo = this.empresaGrupoService.deleteEmpresaGrupo(rowSelect.id)
          .subscribe(({ data }: delete_EmpresaGrupo) => {
            if (data.grupoEmpresa_Excluir.sucesso == true) {
              const find = { field: "id", value: rowSelect.id, type: "DEL" };
              this.update_Grid(find);

            } else {
              this.errosModalService.show(data.grupoEmpresa_Excluir.mensagemTipo,
                data.grupoEmpresa_Excluir.mensagem);
              const objeto = JSON.parse(data.grupoEmpresa_Excluir.objeto);
              this.alertService.show(data.grupoEmpresa_Excluir.mensagemTipo,
                data.grupoEmpresa_Excluir.mensagem,
                objeto);
            }
            this.deleteEmpresaGrupo.unsubscribe();
          });
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

      const empresaGrupo: EmpresaGrupo = {
        id: this.id,
        empresaGrupo: this.nomeGrupo_Text.text,
      }

      if (empresaGrupo.id) {
        this.empresaGrupoService.updateEmpresaGrupo(empresaGrupo)
          .subscribe(({ data }: update_EmpresaGrupo) => {
            const objeto: any = JSON.parse(data.grupoEmpresa_Alterar.objeto);
            if (data.grupoEmpresa_Alterar.sucesso == true) {
              const find = { field: "id", value: objeto.Id }
              this.onClose_Click();
              this.update_Grid(find);
            } else {
              this.alertService.show(data.grupoEmpresa_Alterar.mensagemTipo,
                data.grupoEmpresa_Alterar.mensagem,
                objeto);
            }
            this.showSpinner = false;
          });
      } else {
        this.empresaGrupoService.createEmpresaGrupo(empresaGrupo)
          .subscribe(({ data }: create_EmpresaGrupo) => {
            const objeto: any = JSON.parse(data.grupoEmpresa_Inserir.objeto);
            if (data.grupoEmpresa_Inserir.sucesso == true) {
              const find = { field: "id", value: objeto.Id };
              this.onClose_Click(false);
              this.update_Grid(find);
            } else {
              this.alertService.show(data.grupoEmpresa_Inserir.mensagemTipo,
                data.grupoEmpresa_Inserir.mensagem,
                objeto);
            }
            this.showSpinner = false;
          });
      }
    }
  }

  onFilter_Change(filterSelect: Item) {
    switch (filterSelect.text) {
      case "Nome":
        this.filter = { empresaGrupo: { contains: filterSelect.value } };
        break;
    }
    this.update_Grid();

  }

  update_Grid(find?: Find, filter?: Filter) {
    this.listView_Empresa.processingShow();
    this.empresaGrupoService.readEmpresaGrupos(this.order_by, this.filter)
      .subscribe(({ grupoEmpresa }: read_EmpresaGrupo) => {
        this.actionbuttomService.enableButtons(0);
        this.listView_Empresa.gridUpdate(grupoEmpresa.nodes, find, filter);
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