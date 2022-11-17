import { Component, OnInit } from '@angular/core';

import { ListViewGrid, Find, Filter, rowSelect } from 'src/app/@theme/components/grid/list-view/service/list-view.service';
import { AlertServiceComponent } from 'src/app/@theme/components/form/alert-card/service/alert-card.service';
import { ActionButtomService } from 'src/app/@theme/components/grid/action-buttom/service/action-button.service';
import { OptionsGroup } from 'src/app/@theme/components/form/select-group/service/select-group.service';
import { InputLabel } from 'src/app/@theme/components/form/input-label/service/input-label.service';

import { SortOperationKind } from 'src/app/@core/api/generic-graphql';
import { Item } from 'src/app/@theme/components/form/combobox/service/combobox.service';

import {
  create_PessoaGrupo,
  read_PessoaGrupo,
  update_PessoaGrupo,
  delete_PessoaGrupo,
  PessoaGrupoData,
  PessoaGrupo,
  PessoaGrupoSort,
  PessoaGrupoFilter
} from 'src/app/@core/data/grupo-pessoa';
import { NavigationEnd, Router, RouterEvent } from '@angular/router';
import { filter } from 'rxjs/operators';

import { YesNo } from 'src/app/@core/enum';

@Component({
  selector: 'nex-pessoa',
  templateUrl: './pessoa.component.html',
  styleUrls: ['./pessoa.component.scss']
})

export class PessoaGrupoComponent implements OnInit {

  id: number = 0;
  nomeGrupo_Text: InputLabel = new InputLabel();
  classificacao_Options: OptionsGroup = new OptionsGroup();

  listView_Pessoa: ListViewGrid = new ListViewGrid();
  pessoaGrupo: PessoaGrupo;

  order_by: PessoaGrupoSort = { pessoaGrupo: SortOperationKind.ASC };
  filter: PessoaGrupoFilter;

  showSpinner: boolean = false;

  alertService: AlertServiceComponent = new AlertServiceComponent();

  constructor(public actionbuttomService: ActionButtomService,
    private pessoaGrupoService: PessoaGrupoData,
    private router: Router) {

    this.actionbuttomService.relationGrid = "lstPessoa";

    this.actionbuttomService.recurso = "7";
    this.actionbuttomService.top_action_buttons = [{ "id": 0, "text": "forms.buttons.create", "enabled": true, "condition": "always", "openForm": true, "editable": "new", },
    { "id": 1, "text": "forms.buttons.update", "enabled": false, "condition": "select", "openForm": true, "editable": "yes", },
    { "id": 2, "text": "forms.buttons.read", "enabled": false, "condition": "select", "openForm": true, "editable": "no", },
    { "id": 3, "text": "forms.buttons.delete", "enabled": false, "condition": "multi", "openForm": false, "question": "forms.questions.delete" }]


    this.listView_Pessoa.name = "lstPessoa";
    this.listView_Pessoa.title = "Lista de Grupos de Pessoas";
    this.listView_Pessoa.grid = [{ "header": "Nome", "field": "pessoaGrupo", "width": 18, "align": "left" },
    { "header": "Interno", "field": "pessoaInterna", "width": 10, "align": "center", "enum": YesNo },
    { "header": "Prestador", "field": "pessoaPrestador", "width": 10, "align": "center", "enum": YesNo },
    { "header": "Visitante", "field": "pessoaVisitante", "width": 10, "align": "center", "enum": YesNo }];

    this.nomeGrupo_Text.name = "txtNomeGrupo";
    this.nomeGrupo_Text.rules = "uppercase";
    this.nomeGrupo_Text.maxLength = 20;
    this.nomeGrupo_Text.minLength = 1;

    this.classificacao_Options.add(0, "Interno", "pessoaInterna");
    this.classificacao_Options.add(1, "Prestador", "pessoaPrestador");
    this.classificacao_Options.add(2, "Visitante", "pessoaVisitante");

    this.update_Grid(null, { select: "Nome", field: "pessoaGrupo", value: "" });

  }

  ngOnInit() {
    this.router.events
      .pipe(filter((event: RouterEvent) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.update_Grid(null, { select: "Nome", field: "pessoaGrupo", value: "" });
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

    const filter: PessoaGrupoFilter = { id: { eq: this.id } };
    this.pessoaGrupoService.readPessoaGrupos(this.order_by, filter)
      .subscribe(({ grupoPessoa }: read_PessoaGrupo) => {
        this.pessoaGrupo = grupoPessoa.nodes[0];;
        this.nomeGrupo_Text.text = this.pessoaGrupo.pessoaGrupo;
        this.classificacao_Options.populate(this.pessoaGrupo);

        this.showSpinner = false;
      });
  }

  onListView_Change(rowSelect?: rowSelect) {
    if (rowSelect.registro) {
      this.id = rowSelect.id;
    } else {
      if (rowSelect.exclude == "yes") {
        this.pessoaGrupoService.deletePessoaGrupo(rowSelect.id)
          .subscribe(({ data }: delete_PessoaGrupo) => {
            if (data.grupoPessoa_Excluir.sucesso == true) {
              const find = { field: "id", value: rowSelect.id, type: "DEL" };
              this.update_Grid(find);
            } else {
              const objeto = JSON.parse(data.grupoPessoa_Excluir.objeto);
              this.alertService.show(data.grupoPessoa_Excluir.mensagemTipo,
                data.grupoPessoa_Excluir.mensagem,
                objeto);
            }
          });
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
    } else if (this.classificacao_Options.count(true) == 0) {
      this.alertService.show("ERRO",
        "Selecione ao menos uma classificação para este Grupo de Pessoas.",
        null);
    } else {

      this.showSpinner = true;

      const pessoaGrupo: PessoaGrupo = {
        id: this.id,
        pessoaGrupo: this.nomeGrupo_Text.text,
        pessoaInterna: this.classificacao_Options.valueOf("pessoaInterna"),
        pessoaPrestador: this.classificacao_Options.valueOf("pessoaPrestador"),
        pessoaVisitante: this.classificacao_Options.valueOf("pessoaVisitante")
      }

      if (pessoaGrupo.id) {
        this.pessoaGrupoService.updatePessoaGrupo(pessoaGrupo)
          .subscribe(({ data }: update_PessoaGrupo) => {
            const objeto: any = JSON.parse(data.grupoPessoa_Alterar.objeto);
            if (data.grupoPessoa_Alterar.sucesso == true) {
              const find = { field: "id", value: objeto.Id };
              this.onClose_Click();
              this.update_Grid(find);
            } else {
              this.alertService.show(data.grupoPessoa_Alterar.mensagemTipo,
                data.grupoPessoa_Alterar.mensagem,
                objeto);
            }
            this.showSpinner = false;
          });
      } else {
        this.pessoaGrupoService.createPessoaGrupo(pessoaGrupo)
          .subscribe(({ data }: create_PessoaGrupo) => {
            const objeto: any = JSON.parse(data.grupoPessoa_Inserir.objeto);
            if (data.grupoPessoa_Inserir.sucesso == true) {
              const find = { field: "id", value: objeto.Id };
              this.onClose_Click(false);
              this.update_Grid(find);
            } else {
              this.alertService.show(data.grupoPessoa_Inserir.mensagemTipo,
                data.grupoPessoa_Inserir.mensagem,
                objeto);
            }
            this.showSpinner = false;
          });
      }
    }
  }

  onFilter_Change(filterSelect: Item) {
    let pessoaGrupoSelect: string = "SIM";
    switch (filterSelect.text) {
      case "Nome":
        this.filter = { pessoaGrupo: { contains: filterSelect.value } };
        break;

      case "Interno":
        pessoaGrupoSelect = filterSelect.value;
        this.filter = { pessoaInterna: { eq: (filterSelect.value == "SIM") } };
        break;

      case "Prestador":
        pessoaGrupoSelect = filterSelect.value;
        this.filter = { pessoaPrestador: { eq: (filterSelect.value == "SIM") } };
        break;

      case "Visitante":
        pessoaGrupoSelect = filterSelect.value;
        this.filter = { pessoaVisitante: { eq: (filterSelect.value == "SIM") } };
        break;
    }

    if ((filterSelect.text == "Interno" || filterSelect.text == "Prestador" || filterSelect.text == "Visitante") &&
      (filterSelect.value != "SIM" && filterSelect.value != "NÃO")) {
      this.listView_Pessoa.clear();
    } else {
      this.update_Grid();
    }
  }

  update_Grid(find?: Find, filter?: Filter) {
    this.listView_Pessoa.processingShow();
    this.pessoaGrupoService.readPessoaGrupos(this.order_by, this.filter)
      .subscribe(({ grupoPessoa }: read_PessoaGrupo) => {
        this.actionbuttomService.enableButtons(0);
        this.listView_Pessoa.gridUpdate(grupoPessoa.nodes, find, filter);
      });
  }

  onClose_Click(hideForm: boolean = true) {
    this.nomeGrupo_Text.clear();
    this.classificacao_Options.reset();
    if (hideForm == true) {
      this.actionbuttomService.hideForm();
    } else {
      this.nomeGrupo_Text.focus();
    }
  }

}