import { ComboOptions, Item } from 'src/app/@theme/components/form/combobox/service/combobox.service';

import { Component, OnInit } from '@angular/core';

import { ListViewGrid, Find, Filter, rowSelect } from 'src/app/@theme/components/grid/list-view/service/list-view.service';
import { AlertServiceComponent } from 'src/app/@theme/components/form/alert-card/service/alert-card.service';
import { ActionButtomService } from 'src/app/@theme/components/grid/action-buttom/service/action-button.service';
import { OptionsGroup } from 'src/app/@theme/components/form/select-group/service/select-group.service';

import { SortOperationKind } from 'src/app/@core/api/generic-graphql';

import {
  create_DocumentoGrupo,
  read_DocumentoGrupo,
  update_DocumentoGrupo,
  delete_DocumentoGrupo,
  DocumentoGrupoData,
  DocumentoGrupo,
  DocumentoGrupoFilter,
  DocumentoGrupoSort
} from 'src/app/@core/data/grupo-documento';
import { NavigationEnd, Router, RouterEvent } from '@angular/router';
import { filter } from 'rxjs/operators';

import { YesNo } from 'src/app/@core/enum';

@Component({
  selector: 'nex-documento',
  templateUrl: './documento.component.html',
  styleUrls: ['./documento.component.scss']
})

export class DocumentoGrupoComponent implements OnInit {

  id: number = 0;
  tipoDocumento_Options: ComboOptions = new ComboOptions();
  classificacao_Options: OptionsGroup = new OptionsGroup();
  classificacaoAplicativo_Options: OptionsGroup = new OptionsGroup();
  ordem: number = 1;
  listView_Documento: ListViewGrid = new ListViewGrid();
  totalCount: number;

  documentoGrupo: DocumentoGrupo;

  showSpinner: boolean = false;

  order_by: DocumentoGrupoSort = { id: SortOperationKind.ASC };
  filter: DocumentoGrupoFilter;

  alertService: AlertServiceComponent = new AlertServiceComponent();

  integracao: boolean = false;

  constructor(public actionbuttomService: ActionButtomService,
    private documentoGrupoService: DocumentoGrupoData,
    private router: Router) {

    this.actionbuttomService.relationGrid = "lstDocumento";

    this.actionbuttomService.recurso = "9";
    this.actionbuttomService.top_action_buttons = [
      { "id": 0, "text": "forms.buttons.create", "enabled": true, "condition": "variable", "openForm": true, "editable": "new", },
      { "id": 1, "text": "forms.buttons.update", "enabled": false, "condition": "select", "openForm": true, "editable": "yes", },
      { "id": 3, "text": "forms.buttons.read", "enabled": false, "condition": "select", "openForm": true, "editable": "no", },
      { "id": 2, "text": "forms.buttons.delete", "enabled": false, "condition": "multi", "openForm": false, "question": "forms.questions.delete" }
    ]

    this.listView_Documento.name = "lstDocumento";
    this.listView_Documento.title = "Lista de Tipos de Documento";
    this.listView_Documento.grid = [
      { "header": "Tipo", "field": "tipo", "width": 18, "align": "left" },
      { "header": "Interno", "field": "interno", "width": 10, "align": "center", "enum": YesNo },
      { "header": "Prestador", "field": "prestador", "width": 10, "align": "center", "enum": YesNo },
      { "header": "Visitante", "field": "visitante", "width": 10, "align": "center", "enum": YesNo }
    ];

    this.tipoDocumento_Options.name = "cbTipoDocumento";
    this.tipoDocumento_Options.add("ID", "ID", 0, true);
    this.tipoDocumento_Options.add("RG", "RG", 1);
    this.tipoDocumento_Options.add("CPF", "CPF", 2);
    this.tipoDocumento_Options.add("CNH", "CNH", 3);
    this.tipoDocumento_Options.add("CREA", "CREA", 4);
    this.tipoDocumento_Options.add("CRM", "CRM", 5);
    this.tipoDocumento_Options.add("OAB", "OAB", 6);
    this.tipoDocumento_Options.add("PAS (Passaport)", "PAS", 7)

    this.checkCreate();

    this.classificacao_Options.add(0, "Interno", "interno");
    this.classificacao_Options.add(1, "Prestador", "prestador");
    this.classificacao_Options.add(2, "Visitante", "visitante");

    this.classificacaoAplicativo_Options.add(0, "NEXIUN", "nexiun");
    this.classificacaoAplicativo_Options.add(1, "NEXFLOW", "nexflow");
    this.classificacaoAplicativo_Options.add(2, "NEXMOVE", "nexmove");
    this.classificacaoAplicativo_Options.add(3, "NEXTOT", "nextot");

    this.update_Grid(null, { select: "Nome", field: "tipo", value: "" });

  }

  ngOnInit() {
    this.router.events
      .pipe(filter((event: RouterEvent) => event instanceof NavigationEnd))
      .subscribe(() => {

        this.update_Grid(null, { select: "Nome", field: "tipo", value: "" });

      });
  }

  onActionButtom_Click(actionButtomSelect: any) {
    switch (actionButtomSelect.text) {
      case "forms.buttons.create": {
        this.id = undefined;
        this.tiposInUse_Populate();
        this.tipoDocumento_Options.focus();
        break
      }
      case "forms.buttons.update": {
        this.updateDataLoad();
        this.tipoDocumento_Options.focus();
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

    const filter: DocumentoGrupoFilter = { id: { eq: this.id } };
    this.documentoGrupoService.readDocumentoGrupos(this.order_by, filter)
      .subscribe(({ grupoDocumento }: read_DocumentoGrupo) => {
        this.documentoGrupo = grupoDocumento.nodes[0];
        this.tiposInUse_Populate(this.documentoGrupo.tipo);
        this.classificacao_Options.populate(this.documentoGrupo);
        this.classificacaoAplicativo_Options.populate(this.documentoGrupo);

        this.showSpinner = false;
      });
  }

  onListView_Change(rowSelect?: rowSelect) {
    if (rowSelect.registro) {
      this.id = rowSelect.id;
    } else {
      if (rowSelect.exclude == "yes") {
        this.documentoGrupoService.deleteDocumentoGrupo(rowSelect.id)
          .subscribe(({ data }: delete_DocumentoGrupo) => {
            if (data.grupoDocumento_Excluir.sucesso == true) {
              const find = { field: "id", value: rowSelect.id, type: "DEL" };
              this.checkCreate()
                .then((result: boolean) => {
                  this.tiposInUse_Populate();
                  this.update_Grid(find);
                })
            } else {
              const objeto = JSON.parse(data.grupoDocumento_Excluir.objeto);
              this.alertService.show(data.grupoDocumento_Excluir.mensagemTipo,
                data.grupoDocumento_Excluir.mensagem,
                objeto);
            }
          })
      }
    }
  }

  onSave_Click() {
    this.classificacao_Options.count(true) > 0;

    if (this.classificacao_Options.count(true) == 0) {
      this.alertService.show("ERRO",
        "Selecione ao menos uma classificação para este Grupo de Tipo de Documento",
        null);
    } else {

      this.showSpinner = false;

      const documentoGrupo: DocumentoGrupo = {
        id: this.id,
        ordem: this.ordem,
        tipo: this.tipoDocumento_Options.itemSelected.value,
        interno: this.classificacao_Options.valueOf("interno"),
        prestador: this.classificacao_Options.valueOf("prestador"),
        visitante: this.classificacao_Options.valueOf("visitante"),
        nexiun: this.classificacaoAplicativo_Options.valueOf("nexiun"),
        nexflow: this.classificacaoAplicativo_Options.valueOf("nexflow"),
        nexmove: this.classificacaoAplicativo_Options.valueOf("nexmove"),
        nextot: this.classificacaoAplicativo_Options.valueOf("nextot")
      }

      if (documentoGrupo.id) {
        this.documentoGrupoService.updateDocumentoGrupo(documentoGrupo)
          .subscribe(({ data }: update_DocumentoGrupo) => {

            this.showSpinner = false;

            const objeto: any = JSON.parse(data.grupoDocumento_Alterar.objeto);
            if (data.grupoDocumento_Alterar.sucesso == true) {
              const find = { field: "id", value: objeto.Id }
              this.onClose_Click();
              this.update_Grid(find);
            } else {
              this.alertService.show(data.grupoDocumento_Alterar.mensagemTipo,
                data.grupoDocumento_Alterar.mensagem,
                objeto);
            }
          });
      } else {
        this.documentoGrupoService.createDocumentoGrupo(documentoGrupo)
          .subscribe(({ data }: create_DocumentoGrupo) => {
            const objeto: any = JSON.parse(data.grupoDocumento_Inserir.objeto);
            if (data.grupoDocumento_Inserir.sucesso == true) {

              this.showSpinner = false;

              const find = { field: "id", value: objeto.Id };
              this.onClose_Click(false);

              this.checkCreate()
                .then((result: boolean) => {
                  if (result == true) {
                    this.onClose_Click(false);
                    this.tiposInUse_Populate();
                  } else this.onClose_Click();
                })

              this.update_Grid(find);
            } else {
              this.alertService.show(data.grupoDocumento_Inserir.mensagemTipo,
                data.grupoDocumento_Inserir.mensagem,
                objeto);
            }
          });
      }
    }
  }

  onFilter_Change(filterSelect: Item) {
    let documentoSelect: string = "SIM";
    switch (filterSelect.text) {
      case "Tipo":
        this.filter = { tipo: { contains: filterSelect.value } };
        break;
      case "Interno":
        documentoSelect = filterSelect.value;
        this.filter = { interno: { eq: (filterSelect.value == "SIM") } };
        break;
      case "Prestador":
        documentoSelect = filterSelect.value;
        this.filter = { prestador: { eq: (filterSelect.value == "SIM") } };
        break;
      case "Visitante":
        documentoSelect = filterSelect.value;
        this.filter = { visitante: { eq: (filterSelect.value == "SIM") } };
        break;
    }

    if ((filterSelect.text == "Interno" || filterSelect.text == "Prestador" || filterSelect.text == "Visitante") && (filterSelect.value != "SIM" && filterSelect.value != "NÃO")) {
      this.listView_Documento.clear();
    } else {
      this.update_Grid();
    }

  }

  tiposInUse_Populate(tipo: string = null) {
    let idSelected: number;
    this.tipoDocumento_Options.enableAll();
    this.documentoGrupoService.readDocumentoGrupos()
      .subscribe(({ grupoDocumento }: read_DocumentoGrupo) => {
        grupoDocumento.nodes.forEach(doc => {
          const id: number = this.tipoDocumento_Options.getId(doc.tipo);
          if (tipo != null) {
            if (doc.tipo != tipo) {
              this.tipoDocumento_Options.disable(id);
            } else {
              this.tipoDocumento_Options.enable(id);
              idSelected = id;
            }
          } else {
            this.tipoDocumento_Options.disable(id);
          }
        });
        this.tipoDocumento_Options.hideDisabled();
        this.tipoDocumento_Options.select(idSelected);
      });
    this.tipoDocumento_Options.focus();
  }

  checkCreate() {
    return new Promise((resolve, reject) => {
      this.documentoGrupoService.countDocumentoGrupos()
        .subscribe(({ grupoDocumento }: read_DocumentoGrupo) => {
          if (grupoDocumento.totalCount == this.tipoDocumento_Options.itensComplete.length) {
            this.actionbuttomService.top_action_buttons[0].enabled = false;
          } else {
            this.actionbuttomService.top_action_buttons[0].enabled = true;
          }
          resolve(this.actionbuttomService.top_action_buttons[0].enabled);
        }, (error) => {
          reject(false)
        })
    });
  }

  update_Grid(find?: Find, filter?: Filter) {
    this.listView_Documento.processingShow();
    this.documentoGrupoService.readDocumentoGrupos(this.order_by, this.filter)
      .subscribe(({ grupoDocumento }: read_DocumentoGrupo) => {
        this.actionbuttomService.enableButtons(0);
        this.listView_Documento.gridUpdate(grupoDocumento.nodes, find, filter);
      });
  }

  onClose_Click(hideForm: boolean = true) {
    this.tipoDocumento_Options.select(0);
    this.classificacao_Options.reset();
    this.classificacaoAplicativo_Options.reset();
    if (hideForm == true) {
      this.actionbuttomService.hideForm()
    } else {
      this.tipoDocumento_Options.focus();
    }
  }

}