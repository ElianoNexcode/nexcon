import { Component, OnInit } from '@angular/core';

import { ListViewGrid, Find, Filter, rowSelect } from 'src/app/@theme/components/grid/list-view/service/list-view.service';
import { AlertServiceComponent } from 'src/app/@theme/components/form/alert-card/service/alert-card.service';
import { ActionButtomService } from 'src/app/@theme/components/grid/action-buttom/service/action-button.service';
import { OptionsGroup } from 'src/app/@theme/components/form/select-group/service/select-group.service';
import { InputLabel } from 'src/app/@theme/components/form/input-label/service/input-label.service';

import { SortOperationKind } from 'src/app/@core/api/generic-graphql';
import { Item } from 'src/app/@theme/components/form/combobox/service/combobox.service';

import {
  create_IdentificacaoGrupo,
  read_IdentificacaoGrupo,
  update_IdentificacaoGrupo,
  delete_IdentificacaoGrupo,
  IdentificacaoGrupoData,
  IdentificacaoGrupo,
  IdentificacaoGrupoSort,
  IdentificacaoGrupoFilter
} from 'src/app/@core/data/grupo-identificacao';
import { NavigationEnd, Router, RouterEvent } from '@angular/router';
import { filter } from 'rxjs/operators';

import { YesNo } from 'src/app/@core/enum';

@Component({
  selector: 'nex-identificacao-motivo',
  templateUrl: './identificacao-motivo.component.html',
  styleUrls: ['./identificacao-motivo.component.scss']
})

export class IdentificacaoComponent implements OnInit {

  id: number = 0;
  motivo_Text: InputLabel = new InputLabel();
  classificacao_Options: OptionsGroup = new OptionsGroup();
  classificacaoAplicativo_Options: OptionsGroup = new OptionsGroup();
  tempoPrimeiroAcesso_Text: InputLabel = new InputLabel();
  tempoPermanencia_Text: InputLabel = new InputLabel();

  order_by: IdentificacaoGrupoSort = { motivo: SortOperationKind.ASC };
  filter: IdentificacaoGrupoFilter;

  listView_Identificacao: ListViewGrid = new ListViewGrid();

  tempoPermanenciaMaximo: number = 7200;
  tempoPrimeiroAcessoMaximo: number = 1440;

  identificacaoGrupo: IdentificacaoGrupo;

  showSpinner: boolean = false;

  alertService: AlertServiceComponent = new AlertServiceComponent();

  constructor(public actionbuttomService: ActionButtomService,
    private identificacaoGrupoService: IdentificacaoGrupoData,
    private router: Router) {

    this.actionbuttomService.relationGrid = "lstIdentificacao";

    this.actionbuttomService.recurso = "A";
    this.actionbuttomService.top_action_buttons = [
      { "id": 0, "text": "forms.buttons.create", "enabled": true, "condition": "always", "openForm": true, "editable": "new", },
      { "id": 1, "text": "forms.buttons.update", "enabled": false, "condition": "select", "openForm": true, "editable": "yes", },
      { "id": 2, "text": "forms.buttons.read", "enabled": false, "condition": "select", "openForm": true, "editable": "no", },
      { "id": 3, "text": "forms.buttons.delete", "enabled": false, "condition": "multi", "openForm": false, "question": "forms.questions.delete" }
    ]


    // Tratar colunas conforme Aplicativo
    this.listView_Identificacao.name = "lstIdentificacao";
    this.listView_Identificacao.title = "Lista de Motivos de Identificação";
    this.listView_Identificacao.grid = [
      { "header": "Motivo", "field": "motivo", "width": 25, "align": "left" },
      { "header": "Interno", "field": "interno", "width": 15, "align": "center", "enum": YesNo },
      { "header": "Prestador", "field": "prestador", "width": 15, "align": "center", "enum": YesNo },
      { "header": "Visitante", "field": "visitante", "width": 15, "align": "center", "enum": YesNo },
      { "header": "Primeiro Acesso", "field": "tempoPrimeiroAcesso", "width": 15, "align": "right" },
      { "header": "Permanência (min)", "field": "tempoPermanencia", "width": 15, "align": "center" }
    ];

    // Inicialização do componente nex-input-label para motivo_Text.
    this.motivo_Text.name = "txtMotivo";
    this.motivo_Text.rules = "uppercase";
    this.motivo_Text.maxLength = 30;
    this.motivo_Text.minLength = 1;

    this.tempoPrimeiroAcesso_Text.name = "txtPrimeiroAcesso";
    this.tempoPrimeiroAcesso_Text.rules = "onlynumbers";
    this.tempoPrimeiroAcesso_Text.textAlign = "center";
    this.tempoPrimeiroAcesso_Text.maxLength = 4;
    this.tempoPrimeiroAcesso_Text.minLength = 0;
    this.tempoPrimeiroAcesso_Text.text = "0";

    this.tempoPermanencia_Text.name = "txtTempoPermanencia";
    this.tempoPermanencia_Text.rules = "onlynumbers";
    this.tempoPermanencia_Text.textAlign = "center";
    this.tempoPermanencia_Text.maxLength = 4;
    this.tempoPermanencia_Text.minLength = 0;
    this.tempoPermanencia_Text.text = "0";

    // Inicialização das opções do componente <nex-select-group> para classificacao_Options.
    this.classificacao_Options.add(0, "Interno", "interno");
    this.classificacao_Options.add(1, "Prestador", "prestador");
    this.classificacao_Options.add(2, "Visitante", "visitante");

    this.classificacaoAplicativo_Options.add(0, "NEXIUN", "nexiun");
    this.classificacaoAplicativo_Options.add(1, "NEXFLOW", "nexflow");
    this.classificacaoAplicativo_Options.add(2, "NEXMOVE", "nexmove");
    this.classificacaoAplicativo_Options.add(3, "NEXTOT", "nextot");

    this.update_Grid(null, { select: "Nome", field: "motivo", value: "" });

  }

  ngOnInit() {
    this.router.events
      .pipe(filter((event: RouterEvent) => event instanceof NavigationEnd))
      .subscribe(() => {

        this.update_Grid(null, { select: "Nome", field: "motivo", value: "" });

      });
  }

  onActionButtom_Click(actionButtomSelect: any) {
    switch (actionButtomSelect.text) {
      case "forms.buttons.create": {
        this.id = undefined;
        this.motivo_Text.focus();

        break;
      }
      case "forms.buttons.update": {
        this.updateDataLoad();
        this.motivo_Text.focus(true);

        break;
      }
      case "forms.buttons.read": {
        this.updateDataLoad();
      }
    }
  }

  updateDataLoad() {
    this.showSpinner = true;

    const filter: IdentificacaoGrupoFilter = { id: { eq: this.id } };
    this.identificacaoGrupoService.readIdentificacaoGrupos(this.order_by, filter)
      .subscribe(({ grupoIdentificacaoMotivo }: read_IdentificacaoGrupo) => {
        this.identificacaoGrupo = grupoIdentificacaoMotivo.nodes[0];;
        this.motivo_Text.text = this.identificacaoGrupo.motivo;
        this.classificacao_Options.populate(this.identificacaoGrupo);
        this.classificacaoAplicativo_Options.populate(this.identificacaoGrupo);
        this.tempoPrimeiroAcesso_Text.text = this.identificacaoGrupo.tempoPrimeiroAcesso.toString();
        this.tempoPermanencia_Text.text = this.identificacaoGrupo.tempoPermanencia.toString();

        this.showSpinner = false;
      });
  }

  onListView_Change(rowSelect?: rowSelect) {
    if (rowSelect.registro) {
      this.id = rowSelect.id;
    } else {
      if (rowSelect.exclude == "yes") {
        this.identificacaoGrupoService.deleteIdentificacaoGrupo(rowSelect.id)
          .subscribe(({ data }: delete_IdentificacaoGrupo) => {
            if (data.grupoIdentificacao_Excluir.sucesso == true) {
              const find = { field: "id", value: rowSelect.id, type: "DEL" }
              this.update_Grid(find)

            } else {
              const objeto = JSON.parse(data.grupoIdentificacao_Excluir.objeto);
              this.alertService.show(data.grupoIdentificacao_Excluir.mensagemTipo,
                data.grupoIdentificacao_Excluir.mensagem,
                objeto);
            }
          })
      }
    }
  }

  onSave_Click() {
    this.motivo_Text.validated = (this.motivo_Text.text.length >= this.motivo_Text.minLength);
    this.classificacao_Options.count(true) > 0;

    if (!this.motivo_Text.validated) {
      this.alertService.show("ERRO",
        "Existem campos obrigatórios não preenchidos ou preenchidos de forma incorreta. Verifique!",
        null);
    } else if (this.classificacao_Options.count(true) == 0) {
        this.alertService.show("ERRO",
          "Selecione ao menos uma classificação para este Grupo de Motivo de Identificação.",
          null);
    } else {

      this.showSpinner = true;

      const identificacaoGrupo: IdentificacaoGrupo = {
        id: this.id,
        motivo: this.motivo_Text.text,
        interno: this.classificacao_Options.valueOf("interno"),
        prestador: this.classificacao_Options.valueOf("prestador"),
        visitante: this.classificacao_Options.valueOf("visitante"),
        nexiun: this.classificacaoAplicativo_Options.valueOf("nexiun"),
        nexflow: this.classificacaoAplicativo_Options.valueOf("nexflow"),
        nexmove: this.classificacaoAplicativo_Options.valueOf("nexmove"),
        nextot: this.classificacaoAplicativo_Options.valueOf("nextot"),
        tempoPrimeiroAcesso: (this.tempoPrimeiroAcesso_Text.text.length == 0) ? 0 : parseInt(this.tempoPrimeiroAcesso_Text.text),
        tempoPermanencia: (this.tempoPermanencia_Text.text.length == 0) ? 0 : parseInt(this.tempoPermanencia_Text.text)
      }

      if (identificacaoGrupo.id) {
        this.identificacaoGrupoService.updateIdentificacaoGrupo(identificacaoGrupo)
          .subscribe(({ data }: update_IdentificacaoGrupo) => {
            const objeto: any = JSON.parse(data.grupoIdentificacao_Alterar.objeto);
            if (data.grupoIdentificacao_Alterar.sucesso == true) {
              const find = { field: "id", value: objeto.Id }
              this.onClose_Click();
              this.update_Grid(find);
            } else {
              this.alertService.show(data.grupoIdentificacao_Alterar.mensagemTipo,
                data.grupoIdentificacao_Alterar.mensagem,
                objeto);
            }

            this.showSpinner = false;

          })
      } else {
        this.identificacaoGrupoService.createIdentificacaoGrupo(identificacaoGrupo)
          .subscribe(({ data }: create_IdentificacaoGrupo) => {
            const objeto: any = JSON.parse(data.grupoIdentificacao_Inserir.objeto);
            if (data.grupoIdentificacao_Inserir.sucesso == true) {
              const find = { field: "id", value: objeto.Id };
              this.onClose_Click(false);
              this.update_Grid(find);
            } else {
              this.alertService.show(data.grupoIdentificacao_Inserir.mensagemTipo,
                data.grupoIdentificacao_Inserir.mensagem,
                objeto);
            }

            this.showSpinner = false;

          })
      }
    }
  }

  onFilter_Change(filterSelect: Item) {
    let identificacaoMotivoSelect: string = "SIM";
    switch (filterSelect.text) {
      case "Motivo":
        this.filter = { motivo: { contains: filterSelect.value } };
        break;
      case "Interno":
        identificacaoMotivoSelect = filterSelect.value;
        this.filter = { interno: { eq: (filterSelect.value == "SIM") } };
        break;
      case "Prestador":
        identificacaoMotivoSelect = filterSelect.value;
        this.filter = { prestador: { eq: (filterSelect.value == "SIM") } };
        break;
      case "Visitante":
        identificacaoMotivoSelect = filterSelect.value;
        this.filter = { visitante: { eq: (filterSelect.value == "SIM") } };
        break;
      case "Primeiro Acesso":
        this.filter = { tempoPrimeiroAcesso: { eq: parseInt(filterSelect.value) } }
        break;
      case "Permanência (min)":
        this.filter = { tempoPermanencia: { eq: parseInt(filterSelect.value) } };
        break;
    }

    if (filterSelect.value != "motivo" && filterSelect.value != "interno" &&
      filterSelect.value != "prestador" && filterSelect.value != "visitante" &&
      filterSelect.value != "tempoPrimeiroAcesso" && filterSelect.value != "tempoPermanencia") {
      if (identificacaoMotivoSelect == "SIM" || identificacaoMotivoSelect == "NÃO") {
        this.update_Grid();
      } else {
        this.listView_Identificacao.clear();
      }
    }
  }

  update_Grid(find?: Find, filter?: Filter) {
    this.listView_Identificacao.processingShow();
    this.identificacaoGrupoService.readIdentificacaoGrupos(this.order_by, this.filter)
      .subscribe(({ grupoIdentificacaoMotivo }: read_IdentificacaoGrupo) => {
        this.actionbuttomService.enableButtons(0);
        this.listView_Identificacao.gridUpdate(grupoIdentificacaoMotivo.nodes, find, filter);
      });
  }

  onClose_Click(hideForm: boolean = true) {
    this.motivo_Text.clear();
    this.classificacao_Options.reset();
    this.tempoPrimeiroAcesso_Text.clear();
    this.tempoPermanencia_Text.clear();
    this.classificacaoAplicativo_Options.reset();
    if (hideForm == true) {
      this.actionbuttomService.hideForm()
    } else {
      this.motivo_Text.focus();
    }
  }
}