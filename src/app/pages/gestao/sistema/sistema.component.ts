import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import { ListViewGrid, rowSelect } from 'src/app/@theme/components/grid/list-view/service/list-view.service';
import { AlertServiceComponent } from 'src/app/@theme/components/form/alert-card/service/alert-card.service';
import { ActionButtomService } from 'src/app/@theme/components/grid/action-buttom/service/action-button.service';
import { InputLabel } from 'src/app/@theme/components/form/input-label/service/input-label.service';
import { ComboOptions, Item } from 'src/app/@theme/components/form/combobox/service/combobox.service';
import { TabsService } from 'src/app/@theme/layouts/tabs/service/tabs.service';

import { Stimulsoft } from 'stimulsoft-reports-js/Scripts/stimulsoft.viewer';

import { GestaoSistema, 
         GestaoSistemaData, 
         Report } from 'src/app/@core/data/gestao-sistema';

import { FiltroSistema} from 'src/app/@core/enum';

import { BehaviorSubject } from 'rxjs';
import { TreeviewService } from 'src/app/@theme/layouts/treeview/service/treeview.service';


import { DateOperator } from 'src/app/@theme/components/miscellaneous/date-operator/date-operator';
import { ConfigStorage,
         OrganizacaoConfig,
         PlataformaConfig, 
         SiteConfig} from 'src/app/@core/storage/config/config';

import { LogSistemaFilter,
         LogSistemaSort,
         LogSistema,
         read_LogSistema, SoftwareData } from 'src/app/@core/data/sistema-software';
import { OptionsGroup } from 'src/app/@theme/components/form/select-group/service/select-group.service';
import { SortOperationKind } from 'src/app/@core/api/generic-graphql';


enum Periodo {
  "dia" = 0,
  "mes" = 1,
  "ano" = 2,
  "periodo" = 3
}

@Component({
    selector: 'nex-gestao-sistema',
    templateUrl: 'sistema.component.html',
    styleUrls: ['sistema.component.scss'],
    host: { '(window:resize)': 'onResize()' }
})
export class GestaoSistemaComponent implements OnDestroy, AfterViewInit  {

  dateOperator: DateOperator = new DateOperator();

  id: number = 0;

  reportSelect: string;

  // filtro
  evento_Option: ComboOptions = new ComboOptions();
  sistema_Option: ComboOptions = new ComboOptions();
  descricao_Text: InputLabel = new InputLabel();
  
  // final filtro

  // periodo
  tempo_Options: ComboOptions = new ComboOptions();
  dia_Option: ComboOptions = new ComboOptions();
  mes_Option: ComboOptions = new ComboOptions();
  ano_Option: ComboOptions = new ComboOptions();
  dataInicial_Text: InputLabel = new InputLabel();
  dataFinal_Text: InputLabel = new InputLabel();
  horaInicial_Text: InputLabel = new InputLabel();
  horaFinal_Text: InputLabel = new InputLabel();
  ordenacao_Option: ComboOptions = new ComboOptions();
  // final periodo

  treeviewItem: BehaviorSubject<any>;
  showSpinner: boolean = false;
  listView_Sistema: ListViewGrid = new ListViewGrid();
  gestaoSistema: GestaoSistema;
  tabsGestaoSistema_Option: TabsService = new TabsService();
  valorIdentico_Options: OptionsGroup = new OptionsGroup();

  listaId: string;
  dataAtual: Date = new Date();

  plataforma: PlataformaConfig;
  organizacao: OrganizacaoConfig;

  showReport: boolean = false;
  gridElement: HTMLElement;
  formElement: HTMLElement;

  alertService: AlertServiceComponent = new AlertServiceComponent();
  
  constructor( public actionbuttomService: ActionButtomService,
               private gestaoSistemaService: GestaoSistemaData,
               private treeviewService: TreeviewService,
               private softwareSistemaService: SoftwareData,
               private configStorage: ConfigStorage ) {

    this.treeviewItem = this.treeviewService.itemSubject();


    this.tabsGestaoSistema_Option.add("tabFiltro", "Filtro", true);
    this.tabsGestaoSistema_Option.add("tabPeriodo", "Período", false, "block");

    this.actionbuttomService.recurso = "44";
    this.actionbuttomService.relationGrid = "lstGestaoSistema";
    this.actionbuttomService.top_action_buttons = [{"id": 0, "text": "forms.buttons.issue", "enabled": false, "visibled": false, "condition": "select", "openForm": true, "editable": "yes"}]

    this.listView_Sistema.name = "lstGestaoSistema";
    this.listView_Sistema.title = "Lista de Relatórios de Log de Sistema";
    this.listView_Sistema.grid = [{"header": "Código", "field": "codigo", "width": 15, "align": "left"},
                                  {"header": "Informações", "field": "informacoes", "width": 85, "align": "left"}];
    
    // inicio Filtro
    this.evento_Option.name = "cbEventos";
    this.evento_Option.add("", null, 0, true);
    this.evento_Option.add("INICIALIZAÇÃO","inicializacao", 1);
    this.evento_Option.add("FINILIZAÇÃO","finalizacao", 2);
    this.evento_Option.add("COMUNICAÇÃO","comunicacao", 3);
    this.evento_Option.add("BANCO DE DADOS","banco de dados", 4);
    this.evento_Option.add("DISCO RÍGIDO","discoRigido", 5);
    this.evento_Option.add("SOFTWARE","software", 6);

    this.sistema_Option.name = "cbSistema";
    this.sistema_Option.add("", null, 0, true);
    this.sistema_Option.add("NEXCON", "nexcon", 1, false);
    this.sistema_Option.add("NEXNOTE", "note", 2, false);
    this.sistema_Option.add("NEXCESS", "nexcess", 3, false);
    this.sistema_Option.add("NEXIUN", "nexiun", 4, false);
    this.sistema_Option.add("NEXVIEW", "nexview",5, false);
    this.sistema_Option.add("NEXFLOW", "nexflow", 6, false);
    this.sistema_Option.add("NEXMOVE", "nexmove", 7, false);
    this.sistema_Option.add("NEXCODE REGISTRY", "nexcodeRegistry", 8, false);
    this.sistema_Option.add("NEXCODE NOTIFICATION", "nexcodeNotification", 9, false);
    this.sistema_Option.add("NEXCODE UTILITY", "nexcodeUtility", 10, false);
    this.sistema_Option.add("NEXCODE MOBILE", "nexcode", 11, false);
    this.sistema_Option.add("NEXCODE INTEGRATION", "nexcodeIntegration", 12, false);
    this.sistema_Option.add("NEXCODE ACESS", "nexcodeAcess", 13, false);
    this.sistema_Option.add("BANCO DE DADOS", "bancoDados", 14, false);


    this.descricao_Text.name = "txtDescricao";
    this.descricao_Text.maxLength = 50;
    this.descricao_Text.minLength = 0;
    this.descricao_Text.rules = "uppercase"
    
    // Fim Filtro

    // Inicio periodo
    
    this.tempo_Options.add("Dia", "dia", 0 , true);
    this.tempo_Options.add("Mês", "mes", 1);
    this.tempo_Options.add("Ano", "ano", 2);
    this.tempo_Options.add("Período", "periodo", 3);

    this.dia_Option.name = "cbDiaRelatorio";
    this.dia_Option.add("", null, 0, true);
    for (let dia: number = 1; dia <= 31; dia++) {
      const strDia = ("0" + dia.toString()).slice(-2);
      this.dia_Option.add(strDia, strDia, dia, false);
    }

    this.mes_Option.name = "cbMesRelatorio";
    this.mes_Option.add("", null, 0, true);
    this.mes_Option.add("JANEIRO", "01", 1, false);
    this.mes_Option.add("FEVEREIRO", "02", 2, false);
    this.mes_Option.add("MARÇO", "03", 3, false);
    this.mes_Option.add("ABRIL", "04", 4, false);
    this.mes_Option.add("MAIO", "05", 5, false);
    this.mes_Option.add("JUNHO", "06", 6, false);
    this.mes_Option.add("JULHO", "07", 7, false);
    this.mes_Option.add("AGOSTO", "08", 8, false);
    this.mes_Option.add("SETEMBRO", "09", 9, false);
    this.mes_Option.add("OUTUBRO", "10", 10, false);
    this.mes_Option.add("NOVEMBRO", "11", 11, false);
    this.mes_Option.add("DEZEMBRO", "12", 12, false);

    this.ano_Option.name = "cbAnoRelatorio";
    this.ano_Option.add("", null, 0, true);
    for (let ano = 2007; ano < 2050; ano++) {
      this.ano_Option.add(ano.toString(), ano.toString(), ano, false);
    }

    this.dataInicial_Text.name = "txtDataInicial";
    this.dataInicial_Text.rules = "date";
    this.dataInicial_Text.regex = "date";
    this.dataInicial_Text.maxLength = 10;
    this.dataInicial_Text.disable();

    this.dataFinal_Text.name = "txtDataFinal";
    this.dataFinal_Text.rules = "date";
    this.dataFinal_Text.regex = "date";
    this.dataFinal_Text.maxLength = 10;
    this.dataFinal_Text.disable();

    this.horaInicial_Text.name = "txtHoraInicial";
    this.horaInicial_Text.rules = "time";
    this.horaInicial_Text.regex = "time";
    this.horaInicial_Text.maxLength = 5;
    this.horaInicial_Text.minLength = 0;

    this.horaFinal_Text.name      = "txtHoraFinal";
    this.horaFinal_Text.rules     = "time";
    this.horaFinal_Text.regex = "time";
    this.horaFinal_Text.maxLength = 5;

    this.valorIdentico_Options.add(0, "Valor Idêntico", "valorIdentico");


    // fim periodo


    this.ordenacao_Option.name = "cbOrdenacaoRelatorio";
    this.ordenacao_Option.add("Data/Hora da Identificação", "dataHora", 1, true);
   
    this.plataforma = <PlataformaConfig>this.configStorage.getConfig("plataforma");
    this.organizacao = <OrganizacaoConfig>this.configStorage.getConfig("organizacao");

    this.treeviewItem
      .subscribe((listaId: string) => {
        switch (listaId) {
          case FiltroSistema.Simples:
            this.listaId = listaId;
            this.listView_Sistema.title = "Lista de Relatórios de Log de Sistema";
            this.actionbuttomService.showHideButton(1);

            const reportEstilo: string = (this.listaId == FiltroSistema.Simples)? "Simples": "Agrupado";
            this.update_Grid(reportEstilo);            
            break;
          
          default:
            this.actionbuttomService.showHideButton(0);
            this.listaId = null;
            this.listView_Sistema.title = "Lista de Relatórios";
            break;
        }
      });
  }

  ngAfterViewInit(): void {
    this.onResize();
  }

  onActionButtom_Click(actionButtomSelect: any) {
    switch(actionButtomSelect.text) {
      case "forms.buttons.issue": {
        this.onPeriodo_Change();
        break;
      }
    }
  }    

  onListView_Change(rowSelect?: rowSelect) {
    if(rowSelect.registro) {
      this.id = rowSelect.id;

      const reportPath: string = "./assets/reports/sistema/";
      this.reportSelect = reportPath + rowSelect.registro.codigo + ".mrt";
      
      this.ordenacao_Option.clear();
      
      switch (rowSelect.registro.codigo) {
        case "R1LS-1001":  
          this.ordenacao_Option.add("Data/Hora", "dataHora", 0);
          this.ordenacao_Option.add("Sistema", "sistema", 1);
          this.ordenacao_Option.add("Evento","evento", 2);
          this.ordenacao_Option.add("Descrição", "descricao", 3);  
          break;
      
      }
    }
  }
  
  dataForm_Clean() {
    this.dia_Option.focus();
  }

  onEventoOption_Change() {

  }

  onPeriodo_Change() {

    if(this.dia_Option.itemSelected.id == 0) 
       this.dia_Option.select(this.dataAtual.getDate());
    if(this.mes_Option.itemSelected.id == 0)
       this.mes_Option.select(this.dataAtual.getMonth() + 1);
    if(this.ano_Option.itemSelected.id == 0)
       this.ano_Option.select(this.dataAtual.getFullYear());

    switch (this.tempo_Options.itemSelected.id) {  

      case Periodo.dia:
        this.dia_Option.enable();
        this.mes_Option.enable();
        this.ano_Option.enable();

        this.dataInicial_Text.setTextWithMask(this.dia_Option.itemSelected.text + "/" +
                                              this.mes_Option.itemSelected.value + "/" +
                                              this.ano_Option.itemSelected.text);
        this.horaInicial_Text.setTextWithMask("00:00");
        this.dataFinal_Text.setTextWithMask(this.dia_Option.itemSelected.text + "/" + 
                                            this.mes_Option.itemSelected.value + "/" + 
                                            this.ano_Option.itemSelected.text);
        this.horaFinal_Text.setTextWithMask("23:59");

        this.dataInicial_Text.disable();
        this.dataFinal_Text.disable();
        break;
        
      case Periodo.mes:
        this.dia_Option.select(0);

        this.dia_Option.disable();
        this.mes_Option.enable();
        this.ano_Option.enable();

        this.dataInicial_Text.setTextWithMask("01/" +
                                              this.mes_Option.itemSelected.value + "/" +
                                              this.ano_Option.itemSelected.text);
        this.horaInicial_Text.setTextWithMask("00:00");

        switch (this.mes_Option.itemSelected.id) {
          case 1: case 3: case 5: case 7:
          case 8: case 10: case 12:
            this.dataFinal_Text.setTextWithMask("31/" + 
                                                this.mes_Option.itemSelected.value + "/" + 
                                                this.ano_Option.itemSelected.text);
            this.horaFinal_Text.setTextWithMask("23:59");
            break;

          case 4: case 6: case 9: case 11:
            this.dataFinal_Text.setTextWithMask("30/" + 
                                                this.mes_Option.itemSelected.value + "/" + 
                                                this.ano_Option.itemSelected.text);
            this.horaFinal_Text.setTextWithMask("23:59");
            break;

          case 2:
            this.dataFinal_Text.setTextWithMask("28/" + 
                                       this.mes_Option.itemSelected.value + "/" + 
                                       this.ano_Option.itemSelected.text);
            this.horaFinal_Text.text = "23:59";
            break;
        }

        this.dataInicial_Text.disable();
        this.dataFinal_Text.disable();
        break;

      case Periodo.ano:
        this.dia_Option.select(0);
        this.mes_Option.select(0);

        this.dia_Option.disable();
        this.mes_Option.disable();
        this.ano_Option.enable();

        this.dataInicial_Text.setTextWithMask("01/01/" + this.ano_Option.itemSelected.text);
        this.horaInicial_Text.setTextWithMask("00:00");
        this.dataFinal_Text.setTextWithMask("31/12/" + this.ano_Option.itemSelected.text);
        this.horaFinal_Text.setTextWithMask("23:59");
        this.dataInicial_Text.disable();
        this.dataFinal_Text.disable();
        break;

      case Periodo.periodo:
        this.dia_Option.select(0);
        this.mes_Option.select(0);
        this.ano_Option.select(0);
        this.dia_Option.disable();
        this.mes_Option.disable();
        this.ano_Option.disable();

        this.dataInicial_Text.enable();
        this.dataFinal_Text.enable();

        this.dataInicial_Text.setTextWithMask(this.dataAtual.toLocaleDateString());
        this.dataFinal_Text.setTextWithMask(this.dataAtual.toLocaleDateString());
        this.horaInicial_Text.setTextWithMask("00:00");
        this.horaFinal_Text.setTextWithMask("23:59");

        break;  
    }
  }

  onPrint_Click() {

    if(!this.dateOperator.compareDateGT(this.dataInicial_Text.textMasked,this.dataFinal_Text.textMasked)){
      this.alertService.show("ERRO",
      "Data Final não pode ser menor que a Data Inicial. Verifique!",
      null);
    } else {

    this.gridElement = document.getElementById("grid");
    this.formElement = document.getElementById("form");

    var filtro: LogSistemaFilter = {};
    var order: LogSistemaSort = {};

    var reportTitulo: string  = "Relatório de Log Sistema";
    var subtitulo: string =  "";

    this.showSpinner = true;

    let reportPeriodo: string = "Tempo: " + 
                                  this.dataInicial_Text.textMasked + " " + this.horaInicial_Text.textMasked + " - " +
                                  this.dataFinal_Text.textMasked   + " " + this.horaFinal_Text.textMasked;

         filtro.and = [{ dataHora: { gte: (this.dataInicial_Text.formated + "T" + this.horaInicial_Text.textMasked + ":00-00:00") } },
                       { dataHora: { lte: (this.dataFinal_Text.formated + "T"+ this.horaFinal_Text.textMasked + ":59-00:00") } }];

    if(this.sistema_Option.itemSelected.id > 0) {
      filtro.sistema = {eq: this.sistema_Option.itemSelected.text};
      subtitulo == ""? subtitulo = "Filtrado pelo ": subtitulo += ", pelo ";  
      subtitulo += "Sistema (" + this.sistema_Option.itemSelected.text + ")";
    }

    if(this.descricao_Text.text.length > 0) {
      filtro.descricao = {contains: this.descricao_Text.text};
      subtitulo == ""? subtitulo = "Filtrado pelo ": subtitulo += ", pelo ";  
      subtitulo += "Descrição (" + this.descricao_Text.text + ")";

      if (this.valorIdentico_Options.valueOf("valorIdentico")) {
        filtro.descricao = {eq: this.descricao_Text.text};
      }
    }

    subtitulo += " ordernado por " + this.ordenacao_Option.itemSelected.text;

    if(this.sistema_Option.itemSelected.id == 0 &&
       this.descricao_Text.text.length == 0){
       subtitulo = " Ordernado por " + this.ordenacao_Option.itemSelected.text;
    }


    order[this.ordenacao_Option.itemSelected.value] = SortOperationKind.ASC;

    switch (this.ordenacao_Option.itemSelected.value) {

      case "dataHora":
        order = { dataHora: SortOperationKind.ASC };
        break;

      case "sistema":
        order = { sistema: SortOperationKind.ASC };
        break;

      case "evento":
        order = { evento: SortOperationKind.ASC };
        break;

      case "descricao":
        order = { descricao: SortOperationKind.ASC };
        break;
    }                   
    
    if (Object.keys(filtro).length == 0) filtro = null;

    this.softwareSistemaService.readLogSistema(order, filtro)
      .subscribe(({ logSistema }: read_LogSistema) => {
        const sistemaLogNodes: LogSistema[] = logSistema?.nodes;
        this.showSpinner = false;

        const reportTotalCount = logSistema?.totalCount;

        var jsonFile =  { 
          "header": {              
            "titulo": reportTitulo,
            "subtitulo": subtitulo,
            "periodo": reportPeriodo,
            "organizacao": this.organizacao.organizacaoNome,
            "contador": "Total de registros: " + reportTotalCount,
            "logoAplicacao": sessionStorage.getItem("logoApp"),
            "logoOrganizacao": this.organizacao.organizacaoLogo
          },
          "data": {
            "logSistema": {
              "nodes": sistemaLogNodes
            }
          }
        };

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

          dataset.readJson(jsonFile);
          report.dictionary.databases.clear();
          report.regData(dataset.dataSetName, "", dataset);

          viewer.report = report;
          viewer.renderHtml('viewer');

          this.showReport = true;


        }

      }, (error: any) => {        
        this.showSpinner = false;
        this.alertService.show("ERRO", "Ocorreu um erro na consulta do relatório. Tente Novamente!", [])
      });
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
    this.listView_Sistema.processingShow();
    this.gestaoSistemaService.getReports(estilo)
      .subscribe((report: Report[]) => {
        this.actionbuttomService.enableButtons(0);
        this.listView_Sistema.gridUpdate(report);
      });
  }

  onClose_Click() {
    this.actionbuttomService.hideForm();
    this.tempo_Options.select(0);
    this.dia_Option.select(0);
    this.mes_Option.select(0);
    this.ano_Option.select(0);
    this.dataInicial_Text.clear();
    this.sistema_Option.select(0);
    this.evento_Option.select(0);
    this.descricao_Text.clear();
    this.dataFinal_Text.clear();
    this.horaInicial_Text.clear();
    this.horaFinal_Text.clear();
    this.evento_Option.select(0);
    this.valorIdentico_Options.reset();
    this.tabsGestaoSistema_Option.select("tabFiltro");
  }


  onResize() {
    const maxHeightPanel = document.getElementById('gestaoSistema_Panel')?.clientHeight;
    const maxHeightTab = maxHeightPanel - 135;

    const tabFiltroSistema = document.getElementById('tabFiltroSistema');

    tabFiltroSistema.style.maxHeight = maxHeightTab + 'px';

  }  

  ngOnDestroy(): void {
    this.treeviewItem?.unsubscribe();
  }


}