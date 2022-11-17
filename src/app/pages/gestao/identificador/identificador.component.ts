import { Component, OnDestroy } from '@angular/core';
import { ListViewGrid, rowSelect } from 'src/app/@theme/components/grid/list-view/service/list-view.service';
import { AlertServiceComponent } from 'src/app/@theme/components/form/alert-card/service/alert-card.service';
import { ActionButtomService } from 'src/app/@theme/components/grid/action-buttom/service/action-button.service';
import { InputLabel } from 'src/app/@theme/components/form/input-label/service/input-label.service';
import { ComboOptions } from 'src/app/@theme/components/form/combobox/service/combobox.service';
import { TabsService } from 'src/app/@theme/layouts/tabs/service/tabs.service';

import { Stimulsoft } from 'stimulsoft-reports-js/Scripts/stimulsoft.viewer';

import { GestaoIdentificador, 
         GestaoIdentificadorData, 
         Report } from 'src/app/@core/data/gestao-identificador';

import { FiltroIdentificador } from 'src/app/@core/enum';

import { BehaviorSubject } from 'rxjs';
import { TreeviewService } from 'src/app/@theme/layouts/treeview/service/treeview.service';
import { RadioOptions } from 'src/app/@theme/components/form/radio/service/radio.service';
import { SortOperationKind } from 'src/app/@core/api/generic-graphql';

import { DateOperator } from 'src/app/@theme/components/miscellaneous/date-operator/date-operator';
import { PessoaInternaUsuarioData } from 'src/app/@core/data/usuario-pessoa-interna';

import { PessoaGrupo, 
         PessoaGrupoData, 
         PessoaGrupoSort, 
         read_PessoaGrupo } from 'src/app/@core/data/grupo-pessoa';

import { ConfigStorage, 
         OrganizacaoConfig, 
         PlataformaConfig } from 'src/app/@core/storage/config/config';

enum Periodo {
  "dia" = 0,
  "mes" = 1,
  "ano" = 2,
  "periodo" = 3
}

@Component({
    selector: 'nex-gestao-identificador',
    templateUrl: 'identificador.component.html',
    styleUrls: ['identificador.component.scss']
})
export class GestaoIdentificadorComponent implements OnDestroy {

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
  unidade_Text: InputLabel = new InputLabel();
  localizacao_Text: InputLabel = new InputLabel();
  empresa_Option: ComboOptions = new ComboOptions();
  siteCode_Text: InputLabel = new InputLabel();
  // final filtro

  // periodo
  periodo_Options: RadioOptions = new RadioOptions();
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
  listView_Identificador: ListViewGrid = new ListViewGrid();
  gestaoIdentificador: GestaoIdentificador;
  tabsGestaoIdentificador_Option: TabsService = new TabsService();

  listaId: string;
  dataAtual: Date = new Date();

  plataforma: PlataformaConfig;
  organizacao: OrganizacaoConfig;

  showReport: boolean = false;
  gridElement: HTMLElement;
  formElement: HTMLElement;

  alertService: AlertServiceComponent = new AlertServiceComponent();

  constructor( public actionbuttomService: ActionButtomService,
               private pessoaInternaService: PessoaInternaUsuarioData,
               private pessoaGrupoService: PessoaGrupoData,
               private gestaoIdentificadorService: GestaoIdentificadorData,
               private treeviewService: TreeviewService,
               private configStorage: ConfigStorage ) {

    this.treeviewItem = this.treeviewService.itemSubject();

    this.tabsGestaoIdentificador_Option.add("tabFiltro", "Filtro", true);
    this.tabsGestaoIdentificador_Option.add("tabPeriodo", "Período", false, "block");

    this.actionbuttomService.recurso = "46";
    this.actionbuttomService.relationGrid = "lstGestaoIdentificador";
    this.actionbuttomService.top_action_buttons = [{"id": 0, "text": "forms.buttons.issue", "enabled": false, "visibled": false, "condition": "select", "openForm": true, "editable": "yes"}]

    this.listView_Identificador.name = "lstGestaoIdentificador";
    this.listView_Identificador.title = "Lista de Relatórios de Identificação";
    this.listView_Identificador.grid = [{"header": "Código", "field": "codigo", "width": 15, "align": "left"},
                                        {"header": "Informações", "field": "informacoes", "width": 85, "align": "left"}];
    
    // inicio Filtro
    this.nome_Text.name      = "txtNome";
    this.nome_Text.rules     = "uppercase";
    this.nome_Text.maxLength = 50;
    this.nome_Text.minLength = 0;

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

    this.unidade_Text.name      = "txtUnidade";
    this.unidade_Text.rules     = "uppercase";
    this.unidade_Text.maxLength = 50;
    this.unidade_Text.minLength = 0;

    this.localizacao_Text.name      = "txtLocalizacao";
    this.localizacao_Text.rules     = "uppercase";
    this.localizacao_Text.maxLength = 50;
    this.localizacao_Text.minLength = 0;

    this.empresa_Option.name = "cbEmpresa";
    this.empresa_Option.add("", null, 0, true);

    this.grupo_Option.name   = "cbGrupo";
    this.grupo_Option.add("", null, 0, true);
    
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
   
    // Fim Filtro

    // Inicio periodo
    
    this.periodo_Options.add(Periodo.dia, "Dia", "dia", true);
    this.periodo_Options.add(Periodo.mes, "Mês", "mes");
    this.periodo_Options.add(Periodo.ano, "Ano", "ano");
    this.periodo_Options.add(Periodo.periodo, "Período", "periodo");

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

    this.dataInicial_Text.name      = "txtDataInicial";
    this.dataInicial_Text.rules     = "date";
    this.dataInicial_Text.maxLength = 10;
    this.dataInicial_Text.disable();

    this.dataFinal_Text.name      = "txtDataFinal";
    this.dataFinal_Text.rules     = "date";
    this.dataFinal_Text.maxLength = 10;
    this.dataFinal_Text.disable();

    this.horaInicial_Text.name      = "txtHoraInicial";
    this.horaInicial_Text.rules     = "time";
    this.horaInicial_Text.maxLength = 5;

    this.horaFinal_Text.name      = "txtHoraFinal";
    this.horaFinal_Text.rules     = "time";
    this.horaFinal_Text.maxLength = 5;

    this.ordenacao_Option.name = "cbOrdenacaoRelatorio";

    this.plataforma = <PlataformaConfig>this.configStorage.getConfig("plataforma");
    this.organizacao = <OrganizacaoConfig>this.configStorage.getConfig("organizacao");
   
    this.treeviewItem
      .subscribe((listaId: string) => {
        switch (listaId) {
          case FiltroIdentificador.Simples:
            this.listaId = listaId;
          
            this.listView_Identificador.title = "Lista de Relatórios de Identificador";
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

            const reportEstilo: string = (this.listaId == FiltroIdentificador.Simples)? "Simples": "Agrupado";
            this.update_Grid(reportEstilo);            
            break;
          
          default:
            this.actionbuttomService.showHideButton(0);
            this.listaId = null;
            this.listView_Identificador.title = "Lista de Relatórios";
            break;
        }
      });
  }

  onActionButtom_Click(actionButtomSelect: any) {
    switch(actionButtomSelect.text) {
      case "forms.buttons.issue": {
        this.onPeriodo_Change()
        break;
      }
    }
  }    

  onListView_Change(rowSelect?: rowSelect) {
    if(rowSelect.registro) {
      this.id = rowSelect.id;

      const reportPath: string = "./assets/reports/identificador/";
      this.reportSelect = reportPath + rowSelect.registro.codigo + ".mrt";
      
      this.ordenacao_Option.clear();
          
      switch (rowSelect.registro.codigo) {
        case "R1CE-1001": 
          this.ordenacao_Option.add("Cartão", "identificador", 0);
          this.ordenacao_Option.add("Site Code", "siteCode", 1);
          this.ordenacao_Option.add("Data Expiração", "identificadorValidade", 2);
          break;
        case "R1CE-1002": 
          this.ordenacao_Option.add("Nome", "nome", 0);
          this.ordenacao_Option.add("Grupo", "grupo", 1);
          this.ordenacao_Option.add("Documento", "documentoNumero", 2);
          this.ordenacao_Option.add("Cartão", "identificador", 3);
          this.ordenacao_Option.add("Site Code", "siteCode", 4);
          this.ordenacao_Option.add("Data Expiração", "identificadorValidade", 5);
          break;
        case "R1CE-1003": 
          this.ordenacao_Option.add("Nome", "nome", 0);
          this.ordenacao_Option.add("Grupo", "grupo", 1);
          this.ordenacao_Option.add("Matrícula", "matricula", 2);
          this.ordenacao_Option.add("Cartão", "identificador", 3);
          this.ordenacao_Option.add("Site Code", "siteCode", 4);
          this.ordenacao_Option.add("Data Expiração", "identificadorValidade", 5);          
          break;
        case "R1CE-1004": 
          this.ordenacao_Option.add("Nome", "nome", 0);
          this.ordenacao_Option.add("Grupo", "grupo", 1);
          this.ordenacao_Option.add("Contrato", "documentoNumero", 2);
          this.ordenacao_Option.add("Cartão", "identificador", 3);
          this.ordenacao_Option.add("Site Code", "siteCode", 4);
          this.ordenacao_Option.add("Data Expiração", "identificadorValidade", 5);          
          break;
        case "R1CE-1005": 
          this.ordenacao_Option.add("Nome", "nome", 0);
          this.ordenacao_Option.add("Grupo", "grupo", 1);
          this.ordenacao_Option.add("Doc/Mat/Ctr", "documentoNumero", 2);
          this.ordenacao_Option.add("Cartão", "identificador", 3);
          this.ordenacao_Option.add("Site Code", "siteCode", 4);
          this.ordenacao_Option.add("Data Expiração", "identificadorValidade", 5);          
          break;
      }
    }
  }
  
  dataForm_Clean() {
    this.dia_Option.focus();
  }

  onPeriodo_Change() {

    if(this.dia_Option.itemSelected.id == 0) 
       this.dia_Option.select(this.dataAtual.getDate());
    if(this.mes_Option.itemSelected.id == 0)
       this.mes_Option.select(this.dataAtual.getMonth() + 1);
    if(this.ano_Option.itemSelected.id == 0)
       this.ano_Option.select(this.dataAtual.getFullYear());

    switch (this.periodo_Options.itemSelected.id) {  

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

        break;  
    }
  }

  onPrint_Click() {

    this.gridElement = document.getElementById("grid");
    this.formElement = document.getElementById("form");

    var reportTitulo: string  = "Relatório de Identificador";
    var subtitulo: string = "";

    this.showSpinner = true;
    const reportPeriodo: string = "Período: " + 
                                  this.dataInicial_Text.textMasked + " " + this.horaInicial_Text.textMasked + " - " +
                                  this.dataFinal_Text.textMasked   + " " + this.horaFinal_Text.textMasked;

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

    if(this.unidade_Text.text.length > 0) {
      subtitulo == ""? subtitulo = "Filtrado pelo ": subtitulo += ", pelo ";        
      subtitulo += "Unidade (" + this.unidade_Text.text + ")";
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
    this.listView_Identificador.processingShow();
    this.gestaoIdentificadorService.getReports(estilo)
      .subscribe((report: Report[]) => {
        this.actionbuttomService.enableButtons(0);
        this.listView_Identificador.gridUpdate(report);
      });
  }

  onClose_Click() {
    this.actionbuttomService.hideForm()
    this.dia_Option.select(0);
    this.mes_Option.select(0);
    this.ano_Option.select(0);
    this.dataInicial_Text.clear();
    this.dataFinal_Text.clear();
    this.horaInicial_Text.clear();
    this.horaFinal_Text.clear();
  }

  ngOnDestroy(): void {
    this.treeviewItem?.unsubscribe();
  }


}