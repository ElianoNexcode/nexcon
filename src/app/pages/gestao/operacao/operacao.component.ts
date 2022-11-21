import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import { ListViewGrid, rowSelect } from 'src/app/@theme/components/grid/list-view/service/list-view.service';
import { AlertServiceComponent } from 'src/app/@theme/components/form/alert-card/service/alert-card.service';
import { ActionButtomService } from 'src/app/@theme/components/grid/action-buttom/service/action-button.service';
import { InputLabel } from 'src/app/@theme/components/form/input-label/service/input-label.service';
import { ComboOptions } from 'src/app/@theme/components/form/combobox/service/combobox.service';
import { TabsService } from 'src/app/@theme/layouts/tabs/service/tabs.service';

import { Stimulsoft } from 'stimulsoft-reports-js/Scripts/stimulsoft.viewer';

import { GestaoOperacao, 
         GestaoOperacaoData, 
         Report } from 'src/app/@core/data/gestao-operacao';

import { FiltroOperacao } from 'src/app/@core/enum';         

import { BehaviorSubject } from 'rxjs';
import { TreeviewService } from 'src/app/@theme/layouts/treeview/service/treeview.service';
import { SortOperationKind } from 'src/app/@core/api/generic-graphql';

import { DateOperator } from 'src/app/@theme/components/miscellaneous/date-operator/date-operator';
import { LogOperacao, LogOperacaoFilter,
         LogOperacaoSort,
         read_LogOperacao,
         SoftwareData } from 'src/app/@core/data/sistema-software';

import { ConfigStorage,
         OrganizacaoConfig,
         PlataformaConfig, 
         SiteConfig} from 'src/app/@core/storage/config/config';

import { OptionsGroup } from 'src/app/@theme/components/form/select-group/service/select-group.service';

import { OperadorConfiguracaoData, 
         OperadorConfiguracaoSort, 
         read_OperadorConfiguracao } from 'src/app/@core/data/configuracao-operador-operador';

enum Periodo {
  "dia" = 0,
  "mes" = 1,
  "ano" = 2,
  "periodo" = 3
}

@Component({
    selector: 'nex-gestao-operacao',
    templateUrl: 'operacao.component.html',
    styleUrls: ['operacao.component.scss'],
    host: { '(window:resize)': 'onResize()' }
})
export class GestaoOperacaoComponent implements OnDestroy , AfterViewInit {

  dateOperator: DateOperator = new DateOperator();

  id: number = 0;
  siteId: number;
  siteNome: string;

  // filtro
  operador_Option: ComboOptions = new ComboOptions();
  sistema_Option: ComboOptions = new ComboOptions();
  evento_Option: ComboOptions = new ComboOptions();
  operacao_Option: ComboOptions = new ComboOptions();
  valorIdentico_Options: OptionsGroup = new OptionsGroup();
  
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
  listView_Operacao: ListViewGrid = new ListViewGrid();
  gestaoOperacao: GestaoOperacao;
  tabsGestaoOperacao_Option: TabsService = new TabsService();

  operacaoId: number;
  dataAtual: Date = new Date();
  reportSelect: string;

  showReport: boolean = false;
  gridElement: HTMLElement;
  formElement: HTMLElement;

  plataforma: PlataformaConfig;
  organizacao: OrganizacaoConfig;

  alertService: AlertServiceComponent = new AlertServiceComponent();

  constructor( public actionbuttomService: ActionButtomService,
               private gestaoOperacaoService: GestaoOperacaoData,
               private softwareService: SoftwareData,
               private treeviewService: TreeviewService,
               private operadorService: OperadorConfiguracaoData,
               private configStorage: ConfigStorage ) {

    this.treeviewItem = this.treeviewService.itemSubject();

    this.tabsGestaoOperacao_Option.add("tabFiltro", "Filtro", true);
    this.tabsGestaoOperacao_Option.add("tabTempo", "Tempo", false, "block");

    this.actionbuttomService.recurso = "43";
    this.actionbuttomService.relationGrid = "lstGestaoOperacao";
    this.actionbuttomService.top_action_buttons = [{"id": 0, "text": "forms.buttons.issue", "enabled": false, "visibled": false, "condition": "select", "openForm": true, "editable": "yes"}]

    this.listView_Operacao.name = "lstGestaoOperacao";
    this.listView_Operacao.title = "Lista de Relatórios de Operação";
    this.listView_Operacao.grid = [{"header": "Código", "field": "codigo", "width": 10, "align": "left"},
                                   { "header": "Estilo", "field": "estilo", "width": 10, "align": "left" },
                                   {"header": "Informações", "field": "informacoes", "width": 80, "align": "left"}];
    
    // inicio Filtro

    this.operador_Option.name = "cbOperador";
    this.operador_Option.clear();
    this.operador_Option.add("", null, 0, true);

    const orderOperador: OperadorConfiguracaoSort = {operadorPessoa:{nome : SortOperationKind.ASC}};

    this.operadorService.readOperadorConfiguracaos(orderOperador, null)
        .subscribe(({ operador}: read_OperadorConfiguracao) => {
          const operadorNodes = operador.nodes.map(operadores => {
            return { operadorPessoa: operadores.operadorPessoa?.nome,
                     operadorPessoaId: operadores.operadorPessoaId}
          });
          operadorNodes.forEach(configOperador => {
            this.operador_Option.add(configOperador.operadorPessoa,configOperador.operadorPessoa,configOperador.operadorPessoaId)
          });
        });


    this.valorIdentico_Options.add(0, "Valor Idêntico", "valorIdentico");

    this.sistema_Option.name = "cbSistema";
    this.sistema_Option.add("", null, 0, true);
    this.sistema_Option.add("NEXCON", "nexcon", 1, false);
    this.sistema_Option.add("NEXNOTE", "nexnote", 2, false);
    this.sistema_Option.add("NEXCESS", "nexcess", 3, false);
    this.sistema_Option.add("NEXIUN", "nexiun", 4, false);
    this.sistema_Option.add("NEXVIEW", "nexview", 5, false);
    this.sistema_Option.add("NEXFLOW", "nexflow", 6, false);
    this.sistema_Option.add("NEXMOVE", "nexmove", 7, false);
    this.sistema_Option.add("NEXCODE INTEGRATION", "nexcodeIntegration", 8, false);

    this.evento_Option.name = "cbEvento";
    this.evento_Option.add("", null, 0, true);

    this.operacao_Option.name = "cbOperacao";
    this.operacao_Option.add("", null, 0, true);
    this.operacao_Option.add("INCLUSÃO", "inclusao", 1, false);
    this.operacao_Option.add("ALTERAÇÃO", "alteracao", 2, false);
    this.operacao_Option.add("EXCLUSÃO", "exclusao", 3, false);


    
    // Fim Filtro
    
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


    this.ordenacao_Option.name = "cbOrdenacaoRelatorio";
    this.ordenacao_Option.add("Data/Hora da Operação", "dataHora", 1, true);

    this.plataforma = <PlataformaConfig>this.configStorage.getConfig("plataforma");
    this.organizacao = <OrganizacaoConfig>this.configStorage.getConfig("organizacao");
 

    this.treeviewItem
      .subscribe((operacaoId: string) => {
        switch (operacaoId) {

          case FiltroOperacao.Simples:
            this.operacaoId = 1;
            this.listView_Operacao.title = "Lista de Relatórios de Operação";
            this.actionbuttomService.showHideButton(1);

            const reportEstilo: string = (operacaoId == FiltroOperacao.Simples)? "Simples": "Agrupado";
            this.update_Grid(reportEstilo);            
            break;

          default:
            this.actionbuttomService.showHideButton(0);
            this.operacaoId = null;
            this.listView_Operacao.title = "Lista de Relatórios";
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

      const reportPath: string = "./assets/reports/operacao/";
      this.reportSelect = reportPath + rowSelect.registro.codigo + ".mrt";
      
      this.ordenacao_Option.clear();

      this.ordenacao_Option.add("Data/Hora", "dataHora", 0);
      this.ordenacao_Option.add("Operador", "operadorPessoaNome", 1);

      switch (rowSelect.registro.codigo) {
        case "R1LO-1001": 
          this.ordenacao_Option.add("Nível de Operação", "operadorNivelOperacao", 2);
          this.ordenacao_Option.add("Sistema", "sistema", 3);
          this.ordenacao_Option.add("Evento", "evento", 4);
          this.ordenacao_Option.add("Operação", "operacao", 5);
          break;
        case "R1LO-1002": 
          this.ordenacao_Option.add("Sistema", "sistema", 2);
          this.ordenacao_Option.add("Evento", "evento", 3);
          this.ordenacao_Option.add("Descrição", "descricao", 4);
          break;
      }
    }
  }

  dataForm_Clean() {
    this.dia_Option.focus();
  }

  onEventoOption_Change() {

    // this.operacao_Option.clear();
    // this.operacao_Option.add("", null, 0, true);

    // switch (this.recurso_Option.itemSelected.value) {
    //   case "configuracao":
    //     this.operacao_Option.add("ALTERAÇÃO", "alteracao", 2, false);
    //     break;    
    //   default:
    //     this.operacao_Option.add("INCLUSÃO", "inclusao", 1, false);
    //     this.operacao_Option.add("ALTERAÇÃO", "alteracao", 2, false);
    //     this.operacao_Option.add("EXCLUSÃO", "exclusao", 3, false);    
    //     break;
    // }
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

    var filtro: LogOperacaoFilter = {};
    var order: LogOperacaoSort = {};

    var reportTitulo: string  = "Relatório de Log Operação";
    var subtitulo: string = "";

    this.showSpinner = true;

    let reportPeriodo: string = "Tempo: " + 
                                  this.dataInicial_Text.textMasked + " " + this.horaInicial_Text.textMasked + " - " +
                                  this.dataFinal_Text.textMasked   + " " + this.horaFinal_Text.textMasked;

        filtro.and = [{ dataHora: { gte: (this.dataInicial_Text.formated + "T" + this.horaInicial_Text.textMasked + ":00-00:00") } },
                      { dataHora: { lte: (this.dataFinal_Text.formated + "T"+ this.horaFinal_Text.textMasked + ":59-00:00") } }];

    if(this.operador_Option.itemSelected.id > 0) {
      filtro.operadorPessoaNome = {eq: this.operador_Option.itemSelected.text}  
      subtitulo = "Filtrado pelo Operador (" + this.operador_Option.itemSelected.text + ")";

      if (this.valorIdentico_Options.valueOf("valorIdentico")) {
        filtro.operadorPessoaNome = {eq: this.operador_Option.itemSelected.text} ; 
      } 
    }

    if(this.sistema_Option.itemSelected.id > 0) {
      filtro.sistema = {eq: this.sistema_Option.itemSelected.text}
      subtitulo == ""? subtitulo = "Filtrado pelo ": subtitulo += ", pelo ";        
      subtitulo += "Sistema (" + this.sistema_Option.itemSelected.text + ")";

      if (this.valorIdentico_Options.valueOf("valorIdentico")) {
        filtro.sistema = {eq: this.sistema_Option.itemSelected.text};  
      } 
    }

    if(this.operacao_Option.itemSelected.id > 0) {
      filtro.operacao = {eq:this.operacao_Option.itemSelected.text};
      subtitulo == ""? subtitulo = "Filtrado pela ": subtitulo += ", pela ";        
      subtitulo += "Operação (" + this.operacao_Option.itemSelected.text + ")";

      if (this.valorIdentico_Options.valueOf("valorIdentico")) {
        filtro.operacao = {eq:this.operacao_Option.itemSelected.text};
      } 
    }

    subtitulo += " ordernado por " + this.ordenacao_Option.itemSelected.text;


    if(this.operador_Option.itemSelected.id == 0 &&
      this.operador_Option.itemSelected.id == 0 &&
      this.operacao_Option.itemSelected.id == 0 ){
      subtitulo = " Ordernado por " + this.ordenacao_Option.itemSelected.text;
    }

    order[this.ordenacao_Option.itemSelected.value] = SortOperationKind.ASC;


    switch (this.ordenacao_Option.itemSelected.value) {


      case "dataHora":
        order = { dataHora: SortOperationKind.ASC };
        break;

      case "operadorPessoaNome":
        order = { operadorPessoaNome: SortOperationKind.ASC }; // query com problema
        break;

      case "operadorNivelOperacao":
        order = { operadorNivelOperacao: SortOperationKind.ASC };
        break;

      case "sistema":
        order = { sistema: SortOperationKind.ASC };
        break;

      case "evento":
        order = { evento: SortOperationKind.ASC };
        break;

      case "operacao":
        order = { operacao: SortOperationKind.ASC };
        break;

      case "descricao":
        order = { descricao: SortOperationKind.ASC };
        break;
    }



    if (Object.keys(filtro).length == 0) filtro = null;


    this.softwareService.readLogOperacao(order, filtro)
      .subscribe(({ logOperacao }: read_LogOperacao) => {
        const operacaoLogNodes: LogOperacao[] = logOperacao?.nodes;
        this.showSpinner = false;

        const reportTotalCount = logOperacao?.totalCount;

        const jsonFile =  { 
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
            "logOperacao": {
              "nodes": operacaoLogNodes
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
          options.appearance.pageBorderColor = Stimulsoft.System.Drawing.Color.fromName("#151930");
          options.appearance.showPageShadow = false;                              
          options.toolbar.backgroundColor = Stimulsoft.System.Drawing.Color.fromName("#222b45");
          options.toolbar.borderColor = Stimulsoft.System.Drawing.Color.fromName("#222b45");
          options.toolbar.fontColor = Stimulsoft.System.Drawing.Color.fromName("#d2d3d5");
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
    this.listView_Operacao.processingShow();
    this.gestaoOperacaoService.getReports(estilo)
      .subscribe((report: Report[]) => {
        this.actionbuttomService.enableButtons(0);
        this.listView_Operacao.gridUpdate(report);
      });
  }

  onClose_Click() {
    this.actionbuttomService.hideForm();
    this.tempo_Options.select(0);
    this.operador_Option.select(0);
    this.sistema_Option.select(0);
    this.evento_Option.select(0);
    this.operacao_Option.select(0);
    this.dia_Option.select(0);
    this.mes_Option.select(0);
    this.ano_Option.select(0);
    this.dataInicial_Text.clear();
    this.dataFinal_Text.clear();
    this.horaInicial_Text.clear();
    this.horaFinal_Text.clear();
    this.valorIdentico_Options.reset();
    this.tabsGestaoOperacao_Option.select("tabFiltro");
  }

  onResize() {
    const maxHeightPanel = document.getElementById('gestaoOperacao_Panel')?.clientHeight;
    const maxHeightTab = maxHeightPanel - 135;

    const tabFiltroOperacao = document.getElementById('tabFiltroOperacao');

    tabFiltroOperacao.style.maxHeight = maxHeightTab + 'px';

  }

  ngOnDestroy(): void {
    this.treeviewItem?.unsubscribe();
  }

}