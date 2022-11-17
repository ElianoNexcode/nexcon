import { Component, OnDestroy } from '@angular/core';
import { ListViewGrid, rowSelect } from 'src/app/@theme/components/grid/list-view/service/list-view.service';
import { AlertServiceComponent } from 'src/app/@theme/components/form/alert-card/service/alert-card.service';
import { ActionButtomService } from 'src/app/@theme/components/grid/action-buttom/service/action-button.service';
import { InputLabel } from 'src/app/@theme/components/form/input-label/service/input-label.service';
import { ComboOptions } from 'src/app/@theme/components/form/combobox/service/combobox.service';
import { TabsService } from 'src/app/@theme/layouts/tabs/service/tabs.service';

import { Stimulsoft } from 'stimulsoft-reports-js/Scripts/stimulsoft.viewer';

import { GestaoArea, 
         GestaoAreaData, 
         Report } from 'src/app/@core/data/gestao-area';
import { BehaviorSubject, Subscription } from 'rxjs';
import { TreeviewService } from 'src/app/@theme/layouts/treeview/service/treeview.service';
import { SortOperationKind } from 'src/app/@core/api/generic-graphql';

import { Filtro } from 'src/app/@core/enum';

import { DateOperator } from 'src/app/@theme/components/miscellaneous/date-operator/date-operator';
import { PessoaGrupo, 
         PessoaGrupoData, 
         PessoaGrupoSort, 
         read_PessoaGrupo } from 'src/app/@core/data/grupo-pessoa';

import { ConfigStorage, 
         OrganizacaoConfig, 
         PlataformaConfig } from 'src/app/@core/storage/config/config';
import { AreaReparticao, AreaReparticaoData, read_AreaReparticao } from 'src/app/@core/data/reparticao-area';

enum Periodo {
  "dia" = 0,
  "mes" = 1,
  "ano" = 2,
  "periodo" = 3
}

@Component({
    selector: 'nex-gestao-area',
    templateUrl: 'area.component.html',
    styleUrls: ['area.component.scss']
})
export class GestaoAreaComponent implements OnDestroy {

  dateOperator: DateOperator = new DateOperator();

  id: number = 0;
  reportSelect: string;

  // filtro
  nome_Text: InputLabel = new InputLabel();
  grupo_Option: ComboOptions = new ComboOptions();
  documento_Text: InputLabel = new InputLabel();
  matricula_Text: InputLabel = new InputLabel();
  cartao_Text: InputLabel = new InputLabel();
  contrato_Text: InputLabel = new InputLabel();
  cargo_Text: InputLabel = new InputLabel();
  central_Text: InputLabel = new InputLabel();
  localizacao_Text: InputLabel = new InputLabel();
  empresa_Option: ComboOptions = new ComboOptions();
  siteCode_Text: InputLabel = new InputLabel();
  area1_Option: ComboOptions = new ComboOptions();
  area2_Option: ComboOptions = new ComboOptions();
  // final filtro

  ordenacao_Option: ComboOptions = new ComboOptions();
  
  treeviewItem: BehaviorSubject<any>;
  showSpinner: boolean = false;
  listView_Area: ListViewGrid = new ListViewGrid();
  gestaoArea: GestaoArea;
  tabsGestaoArea_Option: TabsService = new TabsService();

  listaId: string;
  dataAtual: Date = new Date();

  plataforma: PlataformaConfig;
  organizacao: OrganizacaoConfig;

  showReport: boolean = false;
  gridElement: HTMLElement;
  formElement: HTMLElement;

  alertService: AlertServiceComponent = new AlertServiceComponent();

  constructor( public actionbuttomService: ActionButtomService,
               private pessoaGrupoService: PessoaGrupoData,
               private gestaoAreaService: GestaoAreaData,
               private treeviewService: TreeviewService,
               private areaReparticaoService: AreaReparticaoData,
               private configStorage: ConfigStorage ) {

    this.treeviewItem = this.treeviewService.itemSubject();

    this.tabsGestaoArea_Option.add("tabFiltro", "Filtro", true);

    this.actionbuttomService.recurso = "47";
    this.actionbuttomService.relationGrid = "lstGestaoArea";
    this.actionbuttomService.top_action_buttons = [{"id": 0, "text": "forms.buttons.issue", "enabled": false, "visibled": false, "condition": "select", "openForm": true, "editable": "yes"}]

    this.listView_Area.name = "lstGestaoArea";
    this.listView_Area.title = "Lista de Relatórios de Área";
    this.listView_Area.grid = [{"header": "Código", "field": "codigo", "width": 15, "align": "left"},
                               {"header": "Informações", "field": "informacoes", "width": 85, "align": "left"}];
    
    // inicio Filtro
    this.nome_Text.name      = "txtNome";
    this.nome_Text.rules     = "uppercase";
    this.nome_Text.maxLength = 50;
    this.nome_Text.minLength = 0;

    this.grupo_Option.name   = "cbGrupo";
    this.grupo_Option.add("", null, 0, true);

    this.documento_Text.name      = "txtDocumento";
    this.documento_Text.rules     = "uppercase";
    this.documento_Text.maxLength = 50;
    this.documento_Text.minLength = 0;

    this.contrato_Text.name      = "txtContrato";
    this.contrato_Text.rules     = "uppercase";
    this.contrato_Text.maxLength = 50;
    this.contrato_Text.minLength = 0;

    this.cargo_Text.name      = "txtCargo";
    this.cargo_Text.rules     = "uppercase";
    this.cargo_Text.maxLength = 50;
    this.cargo_Text.minLength = 0;

    this.central_Text.name      = "txtCentral";
    this.central_Text.rules     = "uppercase";
    this.central_Text.maxLength = 50;
    this.central_Text.minLength = 0;

    this.localizacao_Text.name      = "txtLocalizacao";
    this.localizacao_Text.rules     = "uppercase";
    this.localizacao_Text.maxLength = 50;
    this.localizacao_Text.minLength = 0;

    this.empresa_Option.name = "cbEmpresa";
    this.empresa_Option.add("", null, 0, true);

    this.matricula_Text.name      = "txtMatricula";
    this.matricula_Text.rules     = "uppercase";
    this.matricula_Text.maxLength = 50;
    this.matricula_Text.minLength = 0;

    this.documento_Text.name      = "txtDocumento";
    this.documento_Text.rules     = "uppercase";
    this.documento_Text.maxLength = 50;
    this.documento_Text.minLength = 0;

    this.cartao_Text.name      = "txtCartao";
    this.cartao_Text.rules     = "uppercase";
    this.cartao_Text.maxLength = 50;
    this.cartao_Text.minLength = 0;

    this.siteCode_Text.name  = "txtSiteCode";
    this.siteCode_Text.rules     = "uppercase";
    this.siteCode_Text.maxLength = 30;
    this.siteCode_Text.minLength = 0;

    this.area1_Option.name = "cbArea1";
    this.area1_Option.add("", null, 0 , true);

    this.area2_Option.name = "cbArea2";
    this.area2_Option.add("", null, 0 , true);
   
    // Fim Filtro

    this.ordenacao_Option.name = "cbOrdenacaoRelatorio";

    this.plataforma = <PlataformaConfig>this.configStorage.getConfig("plataforma");
    this.organizacao = <OrganizacaoConfig>this.configStorage.getConfig("organizacao");

    this.treeviewItem
      .subscribe((listaId: string) => {
        switch (listaId) {
          case Filtro.Simples:
            this.listaId = listaId
          
            this.listView_Area.title = "Lista de Relatórios de Área";
            this.actionbuttomService.showHideButton(1);

            this.grupo_Option.clear();
            this.grupo_Option.add("", null, 0, true);
        
            const grupoOrder: PessoaGrupoSort = { pessoaGrupo: SortOperationKind.ASC };

            this.pessoaGrupoService.readPessoaGrupos(grupoOrder, null)
              .subscribe(({ grupoPessoa }: read_PessoaGrupo) => {
                const grupoPessoasNodes: PessoaGrupo[] = grupoPessoa.nodes;
                grupoPessoasNodes.forEach(grupoPessoa => {
                  this.grupo_Option.add(grupoPessoa.pessoaGrupo, grupoPessoa.pessoaGrupo, grupoPessoa.id);
                })
              })

            const reportEstilo: string = (this.listaId == Filtro.Simples)? "Simples": "Agrupado";
            this.update_Grid(reportEstilo);            
            break;
          
          default:
            this.actionbuttomService.showHideButton(0);
            this.listaId = null;
            this.listView_Area.title = "Lista de Relatórios";
            break;
        }
      });   

  }

  onActionButtom_Click(actionButtomSelect: any) {
    switch(actionButtomSelect.text) {
      case "forms.buttons.issue": {
        break;
      }
    }
  }    

  onListView_Change(rowSelect?: rowSelect) {
    if(rowSelect.registro) {
      this.id = rowSelect.id;

      const reportPath: string = "./assets/reports/area/";
      this.reportSelect = reportPath + rowSelect.registro.codigo + ".mrt";
      
      this.ordenacao_Option.clear();
      
      switch (rowSelect.registro.codigo) {
        case "R1AR-1001":  
          this.ordenacao_Option.add("Cartão", "identificador", 0);
          this.ordenacao_Option.add("Site Code", "siteCode", 1);
          this.ordenacao_Option.add("Área", "area", 2);
          break;
        case "R1AR-1002":  
          this.ordenacao_Option.add("Nome", "nome", 0);
          this.ordenacao_Option.add("Central", "departamento", 1);
          this.ordenacao_Option.add("Cargo", "cargo", 2);
          this.ordenacao_Option.add("Documento", "documentoNumero", 3);
          this.ordenacao_Option.add("Cartão", "identificador", 4);
          this.ordenacao_Option.add("Site Code", "siteCode", 5);
          this.ordenacao_Option.add("Área", "area", 6);
          break;
        case "R1AR-1003": 
          this.ordenacao_Option.add("Grupo", "grupo", 0);
          this.ordenacao_Option.add("Nome", "nome", 1);
          this.ordenacao_Option.add("Cargo", "cargo", 2);
          this.ordenacao_Option.add("Doc/Mat/Crt", "documentoNumero", 3);
          this.ordenacao_Option.add("Cartão", "identificador", 4);
          this.ordenacao_Option.add("Site Code", "siteCode", 5);
          this.ordenacao_Option.add("Área", "area", 6);
          break; 
      }
    }
  }
  
  dataForm_Clean() {
    this.nome_Text.focus();
  }

 
  onPrint_Click() {

    this.gridElement = document.getElementById("grid");
    this.formElement = document.getElementById("form");

    var reportTitulo: string  = "Relatório de Área";
    var subtitulo: string = "";

    this.showSpinner = true;
   
    if(this.grupo_Option.itemSelected.text == "VISITANTE" ||
       this.grupo_Option.itemSelected.text == "PRESTADOR EVENTUAL") {
      subtitulo == ""? subtitulo = "Filtrado pelo ": subtitulo += ", pelo ";  
      subtitulo += "Grupo (" + this.grupo_Option.itemSelected.text + ")";
    } else {
      if(this.grupo_Option.itemSelected.id > 0) {
        subtitulo == ""? subtitulo = "Filtrado pelo ": subtitulo += ", pelo ";  
        subtitulo += "Grupo (" + this.grupo_Option.itemSelected.text + ")";
      }  
    }

    if(this.nome_Text.text.length > 0) {
      subtitulo = "Filtrado pelo Nome (" + this.nome_Text.text + ")";
    }

    if(this.documento_Text.text.length > 0) {
      subtitulo == ""? subtitulo = "Filtrado pelo ": subtitulo += ", pelo ";        
      subtitulo += "Documento (" + this.documento_Text.text + ")";
    }

    if(this.matricula_Text.text.length > 0) {
      subtitulo == ""? subtitulo = "Filtrado pela ": subtitulo += ", pela ";        
      subtitulo += "Matricula (" + this.matricula_Text.text + ")";
    }

    if(this.contrato_Text.text.length > 0) {
      subtitulo == ""? subtitulo = "Filtrado pelo ": subtitulo += ", pelo ";        
      subtitulo += "Contrato (" + this.contrato_Text.text + ")";
    }

    if(this.cargo_Text.text.length > 0) {
      subtitulo == ""? subtitulo = "Filtrado pelo ": subtitulo += ", pelo ";        
      subtitulo += "Cargo (" + this.cargo_Text.text + ")";
    }

    if(this.central_Text.text.length > 0) {
      subtitulo == ""? subtitulo = "Filtrado pelo ": subtitulo += ", pelo ";        
      subtitulo += "Departamento (" + this.central_Text.text + ")";
    }

    if(this.localizacao_Text.text.length > 0) {
      subtitulo == ""? subtitulo = "Filtrado pelo ": subtitulo += ", pelo ";        
      subtitulo += "Localizacao (" + this.localizacao_Text.text + ")";
    }


    if(this.area1_Option.itemSelected.text.length > 0 && this.area2_Option.itemSelected.text.length == 0) {
      subtitulo == ""? subtitulo = "Filtrado pela ": subtitulo += ", pela "; 
      subtitulo += "Area 1 (" + this.area1_Option.itemSelected.text + ")";
    }

    if(this.area2_Option.itemSelected.text.length > 0 && this.area1_Option.itemSelected.text.length == 0) {
      subtitulo == ""? subtitulo = "Filtrado pela ": subtitulo += ", pela ";        
      subtitulo += "Area 2 (" + this.area2_Option.itemSelected.text + ")";
    }
    
    if(this.area1_Option.itemSelected.text.length > 0 && this.area2_Option.itemSelected.text.length > 0) {
      subtitulo == ""? subtitulo = "Filtrado pela ": subtitulo += ", pela ";        
      subtitulo += "Area 1 (" + this.area1_Option.itemSelected.text + ") ou pela Area 2 (" + this.area2_Option.itemSelected.text + ")";
    }

    if(this.empresa_Option.itemSelected.id > 0) {
      subtitulo == ""? subtitulo = "Filtrado pela ": subtitulo += ", pela ";        
      subtitulo += "Unidade (" + this.empresa_Option.itemSelected.text + ")";
    }

    if(this.cartao_Text.text.length > 0) {
      try {
      } catch {
        console.log("Try/Catch: Identificador não numérico");
      }        
      subtitulo == ""? subtitulo = "Filtrado pelo ": subtitulo += ", pelo ";        
      subtitulo += "Cartão (" + this.cartao_Text.text + ")";
    }

    if(this.siteCode_Text.text.length > 0) {
      try {

      } catch {
        console.log("Try/Catch: SiteCode não numérico")
      }        
      subtitulo == ""? subtitulo = "Filtrado pelo ": subtitulo += ", pelo ";        
      subtitulo += "Site Code (" + this.siteCode_Text.text + ")";
    }

    subtitulo += " ordernado por " + this.ordenacao_Option.itemSelected.text;

        var dataset = new Stimulsoft.System.Data.DataSet("JSON");

        if(this.reportSelect) {

          var report = new Stimulsoft.Report.StiReport();
          var options = new Stimulsoft.Viewer.StiViewerOptions();

          options.appearance.showTooltips = false;
          options.toolbar.showOpenButton = false;
          options.toolbar.showAboutButton = false;

          options.appearance.backgroundColor = Stimulsoft.System.Drawing.Color.white;
          options.appearance.pageBorderColor = "#151930"; 
          options.appearance.showPageShadow = false;                              
          options.toolbar.backgroundColor = "#222b45";          
          options.toolbar.borderColor = "#222b45";          
          options.toolbar.fontColor = "#d2d3d5";
          options.toolbar.fontFamily = "Roboto";


          options.appearance.htmlRenderMode = Stimulsoft.Report.Export.StiHtmlExportMode.Div;
          options.width = "100%";
          options.height = "100%";
          options.appearance.scrollbarsMode = true;
          
          var viewer = new Stimulsoft.Viewer.StiViewer(options, 'StiViewer', false);
          
          report.loadFile(this.reportSelect);

          report.dictionary.databases.clear();
          report.regData(dataset.dataSetName, "", dataset);

          viewer.report = report;
          viewer.renderHtml('viewer');

          this.showReport = true;

          report.dictionary.databases.clear();
          report = null;
          

        }

  }

  onAreaOption_Click(area?: number) {
    if(this.area1_Option.itens.length == 1) {
      if(area == 1) {
        this.area1_Option.itemSelected.text = "Aguarde! Carregando...";
      } else {
        this.area2_Option.itemSelected.text = "Aguarde! Carregando...";
      } 
      this.areaReparticaoService.readAreaReparticao({nome: SortOperationKind.ASC})
        .subscribe(({ reparticaoArea }: read_AreaReparticao) => {
          if(area == 1) {
            this.area1_Option.itemSelected.text = "";
          } else {
            this.area2_Option.itemSelected.text = "";
          }
          this.area1_Option.clear();
          this.area1_Option.add("", null, 0, true);
          const areaReparticaoNodes: AreaReparticao[] = reparticaoArea.nodes;
          for (let index = 0; index < areaReparticaoNodes.length; index++) {
            const areaReparticao: AreaReparticao = areaReparticaoNodes[index];
            this.area1_Option.add(areaReparticao.nome, areaReparticao.nome, index + 1);
          }
        });
        this.area2_Option.itens = this.area1_Option.itens;
        this.area2_Option.select(0);
    }
  }

  
  onReportClose_Click() {
    this.showReport = false;

    var viewerElement: HTMLElement;
    const stiViewerElement: HTMLElement = document.getElementById("StiViewer");

    viewerElement = document.getElementById("viewer");

    viewerElement.removeChild(stiViewerElement);
    viewerElement.appendChild(this.gridElement);
    viewerElement.appendChild(this.formElement);

  }
  
  update_Grid(estilo: string) {
    this.listView_Area.processingShow();
    this.gestaoAreaService.getReports(estilo)
      .subscribe((report: Report[]) => {
        this.actionbuttomService.enableButtons(0);
        this.listView_Area.gridUpdate(report);
      });
  }

  onClose_Click() {
    this.actionbuttomService.hideForm();

    this.siteCode_Text.clear();
    this.grupo_Option.select(0);
    this.area1_Option.select(0);
    this.area2_Option.select(0);
    this.cartao_Text.clear();
    this.contrato_Text.clear();
    this.matricula_Text.clear();
    this.documento_Text.clear();
    this.nome_Text.clear();
    this.cargo_Text.clear();
    this.localizacao_Text.clear();
    this.central_Text.clear();
  }

  ngOnDestroy(): void {
    this.treeviewItem?.unsubscribe();
  }


}