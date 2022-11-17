import { Component, OnDestroy } from '@angular/core';
import { ListViewGrid, rowSelect } from 'src/app/@theme/components/grid/list-view/service/list-view.service';
import { AlertServiceComponent } from 'src/app/@theme/components/form/alert-card/service/alert-card.service';
import { ActionButtomService } from 'src/app/@theme/components/grid/action-buttom/service/action-button.service';
import { InputLabel } from 'src/app/@theme/components/form/input-label/service/input-label.service';
import { ComboOptions } from 'src/app/@theme/components/form/combobox/service/combobox.service';
import { TabsService } from 'src/app/@theme/layouts/tabs/service/tabs.service';

import { Stimulsoft } from 'stimulsoft-reports-js/Scripts/stimulsoft.viewer';

import { BehaviorSubject, Subscription } from 'rxjs';
import { TreeviewService } from 'src/app/@theme/layouts/treeview/service/treeview.service';
import { RadioOptions } from 'src/app/@theme/components/form/radio/service/radio.service';
import { SortOperationKind } from 'src/app/@core/api/generic-graphql';

import { DateOperator } from 'src/app/@theme/components/miscellaneous/date-operator/date-operator';

import { PessoaGrupo, 
         PessoaGrupoData, 
         PessoaGrupoSort, 
         read_PessoaGrupo } from 'src/app/@core/data/grupo-pessoa';

import { ConfigStorage, 
         OrganizacaoConfig, 
         PlataformaConfig } from 'src/app/@core/storage/config/config';

import { GestaoAcesso, 
         GestaoAcessoData, 
         Report } from 'src/app/@core/data/gestao-acesso';

import { FiltroAcesso } from 'src/app/@core/enum';


import { IdentificacaoControleArqFilter, 
         IdentificacaoControleData, 
         IdentificacaoControleSort, 
         read_IdentificacaoControleArq } from 'src/app/@core/data/controle-identificacao';

enum Periodo {
  "dia" = 0,
  "mes" = 1,
  "ano" = 2,
  "periodo" = 3
}

@Component({
    selector: 'nex-gestao-acesso',
    templateUrl: 'acesso.component.html',
    styleUrls: ['acesso.component.scss']
})
export class GestaoAcessoComponent implements OnDestroy {
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
  unidade_Text: InputLabel = new InputLabel();
  siteCode_Text: InputLabel = new InputLabel();
  bloqueio_Option: ComboOptions = new ComboOptions();
  areaEntrada_Option: ComboOptions = new ComboOptions();
  areaSaida_Option: ComboOptions = new ComboOptions();
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
  listView_Acesso: ListViewGrid = new ListViewGrid();
  gestaoAcesso: GestaoAcesso;
  tabsGestaoAcesso_Option: TabsService = new TabsService();

  listaId: string;
  dataAtual: Date = new Date();

  plataforma: PlataformaConfig;
  organizacao: OrganizacaoConfig;

  showReport: boolean = false;
  gridElement: HTMLElement;
  formElement: HTMLElement;

  modeloRelatorio: string;

  softwareConfiguracaoSubscription: Subscription;

  alertService: AlertServiceComponent = new AlertServiceComponent();

  constructor( public actionbuttomService: ActionButtomService,
               private identificacaoControleService: IdentificacaoControleData,
               private pessoaGrupoService: PessoaGrupoData,
               private gestaoAcessoService: GestaoAcessoData,
               private treeviewService: TreeviewService,
               private configStorage: ConfigStorage ) {

    this.treeviewItem = this.treeviewService.itemSubject();

    this.tabsGestaoAcesso_Option.add("tabFiltro", "Filtro", true);
    this.tabsGestaoAcesso_Option.add("tabPeriodo", "Período", false, "block");

    this.actionbuttomService.recurso = "39";
    this.actionbuttomService.relationGrid = "lstGestaoAcesso";
    this.actionbuttomService.top_action_buttons = [{"id": 0, "text": "forms.buttons.issue", "enabled": false, "visibled": false, "condition": "select", "openForm": true, "editable": "yes"}]

    this.listView_Acesso.name = "lstGestaoAcesso";
    this.listView_Acesso.title = "Lista de Relatórios de Acesso";
    this.listView_Acesso.grid = [{"header": "Código", "field": "codigo", "width": 15, "align": "left"},
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

      this.matricula_Text.name      = "txtMatricula";
      this.matricula_Text.rules     = "uppercase";
      this.matricula_Text.maxLength = 16;
      this.matricula_Text.minLength = 0;
  
      this.contrato_Text.name      = "txtContrato";
      this.contrato_Text.rules     = "uppercase";
      this.contrato_Text.maxLength = 50;
      this.contrato_Text.minLength = 0;
  
      this.cargo_Text.name      = "txtCargo";
      this.cargo_Text.rules     = "uppercase";
      this.cargo_Text.maxLength = 32;
      this.cargo_Text.minLength = 0;

      this.central_Text.name      = "txtCentral";
      this.central_Text.rules     = "uppercase";
      this.central_Text.maxLength = 32;
      this.central_Text.minLength = 0;

      this.localizacao_Text.name      = "txtLocalizacao";
      this.localizacao_Text.rules     = "uppercase";
      this.localizacao_Text.maxLength = 16;
      this.localizacao_Text.minLength = 0;

      this.unidade_Text.name      = "txtUnidade";
      this.unidade_Text.rules     = "uppercase";
      this.unidade_Text.maxLength = 40;
      this.unidade_Text.minLength = 0;
  
      this.cartao_Text.name      = "txtCartao";
      this.cartao_Text.rules     = "uppercase";
      this.cartao_Text.maxLength = 50;
      this.cartao_Text.minLength = 0;

      this.siteCode_Text.name  = "txtSiteCode";
      this.siteCode_Text.rules     = "uppercase";
      this.siteCode_Text.maxLength = 30;
      this.siteCode_Text.minLength = 0;

      this.bloqueio_Option.name = "cbBloqueio";
      this.bloqueio_Option.add("", null, 0 , true);

      this.areaEntrada_Option.name = "cbArea1";
      this.areaEntrada_Option.add("", null, 0 , true);

      this.areaSaida_Option.name = "cbArea2";
      this.areaSaida_Option.add("", null, 0 , true);
     
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
  
      // this.onPeriodo_Change()
  
      this.ordenacao_Option.name = "cbOrdenacaoRelatorio";
  
      this.plataforma = <PlataformaConfig>this.configStorage.getConfig("plataforma");
      this.organizacao = <OrganizacaoConfig>this.configStorage.getConfig("organizacao");

      this.treeviewItem
        .subscribe((listaId: string) => {
          switch (listaId) {
            case FiltroAcesso.Simples:
            case FiltroAcesso.Agrupado:
              this.listaId = listaId
            
              this.listView_Acesso.title = "Lista de Relatórios de Acesso";
              this.actionbuttomService.showHideButton(1);

              const reportEstilo: string = (this.listaId == FiltroAcesso.Simples)? "Simples": "Agrupado";
              this.update_Grid(reportEstilo);            
              break;
            
            default:
              this.actionbuttomService.showHideButton(0);
              this.listaId = null;
              this.listView_Acesso.title = "Lista de Relatórios";
              break;
          }
        });
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

      this.modeloRelatorio = rowSelect.registro.codigo;
      const reportPath: string = "./assets/reports/acesso/";
      this.reportSelect = reportPath + this.modeloRelatorio + ".mrt";
      
      this.ordenacao_Option.clear();
      if(this.modeloRelatorio != "R1EA-1005") {
        this.ordenacao_Option.add("Data/Hora", "eventoDataHora", 0);
      } else {
        this.ordenacao_Option.add("Data/Hora", "identificacaoDataHora", 0);
      }
      
      this.grupo_Option.clear();          
      const grupoOrder: PessoaGrupoSort = { pessoaGrupo: SortOperationKind.ASC };

      this.pessoaGrupoService.readPessoaGrupos(grupoOrder, null)
        .subscribe(({ grupoPessoa }: read_PessoaGrupo) => {
          const grupoPessoasNodes: PessoaGrupo[] = grupoPessoa.nodes;
          grupoPessoasNodes.forEach(grupoPessoa => {
            if(this.modeloRelatorio != "R1EA-1005" && grupoPessoa.pessoaInterna == true ) {
              if(this.grupo_Option.itens.length == 0) this.grupo_Option.add("", null, 0);
              this.grupo_Option.add(grupoPessoa.pessoaGrupo, grupoPessoa.pessoaGrupo, grupoPessoa.id)
            }

            if(this.modeloRelatorio == "R1EA-1005" && (grupoPessoa.pessoaVisitante == true ||
               grupoPessoa.pessoaPrestador == true)) {
              this.grupo_Option.add(grupoPessoa.pessoaGrupo, grupoPessoa.pessoaGrupo, grupoPessoa.id)
            }
          })
        })
      
      switch (this.modeloRelatorio) {
        case "R1EA-1001":
          this.ordenacao_Option.add("Nome", "pessoaNome", 1);
          this.ordenacao_Option.add("Documento", "pessoaDocumento", 2);
          this.ordenacao_Option.add("Central", "pessoaDepartamento", 3);
          this.ordenacao_Option.add("Cartão", "eventoIdentificador", 4);
          this.ordenacao_Option.add("Site Code", "eventoSiteCode", 5);
          this.ordenacao_Option.add("Área", "eventoArea", 6);
          this.ordenacao_Option.add("Bloqueio", "eventoBloqueio", 7);    
          break;      
        case "R1EA-1002":
          this.ordenacao_Option.add("Nome", "pessoaNome", 1);
          this.ordenacao_Option.add("Matrícula", "pessoaMatricula", 2);
          this.ordenacao_Option.add("Central", "pessoaDepartamento", 3);
          this.ordenacao_Option.add("Cartão", "eventoIdentificador", 4);
          this.ordenacao_Option.add("Site Code", "eventoSiteCode", 5);
          this.ordenacao_Option.add("Área", "eventoArea", 6);
          this.ordenacao_Option.add("Bloqueio", "eventoBloqueio", 7);
          break;
        case "R1EA-1003":
          this.ordenacao_Option.add("Nome", "pessoaNome", 1);
          this.ordenacao_Option.add("Contrato", "pessoaDocumento", 2);
          this.ordenacao_Option.add("Central", "pessoaDepartamento", 3);
          this.ordenacao_Option.add("Cartão", "eventoIdentificador", 4);
          this.ordenacao_Option.add("Site Code", "eventoSiteCode", 5);
          this.ordenacao_Option.add("Área", "eventoArea", 6);
          this.ordenacao_Option.add("Bloqueio", "eventoBloqueio", 7);
          break;        
        case "R1EA-1004":   
          this.ordenacao_Option.add("Grupo", "pessoaGrupo", 1);
          this.ordenacao_Option.add("Nome", "pessoaNome", 2);
          this.ordenacao_Option.add("Documento", "pessoaDocumento", 3);
          this.ordenacao_Option.add("Central", "pessoaDepartamento", 4);
          this.ordenacao_Option.add("Cartão", "eventoIdentificador", 5);
          this.ordenacao_Option.add("Site Code", "eventoSiteCode", 6);
          this.ordenacao_Option.add("Área", "eventoArea", 7);
          this.ordenacao_Option.add("Bloqueio", "eventoBloqueio", 8);
          break;
        case "R1EA-1005":
          this.ordenacao_Option.add("Nome", "pessoaNome", 1);
          this.ordenacao_Option.add("Documento", "pessoaDocNumero", 2);
          this.ordenacao_Option.add("Empresa", "pessoaEntidade", 3);
          this.ordenacao_Option.add("Cartão", "identificador", 4);
          this.ordenacao_Option.add("Site Code", "siteCode", 5);
          this.ordenacao_Option.add("Área", "identificacaoLocalNome", 7);
          break;
        case "R2EA-1001":
          this.ordenacao_Option.add("Nome", "pessoaNome", 1);
          this.ordenacao_Option.add("Documento", "pessoaDocumento", 2);
          this.ordenacao_Option.add("Central", "pessoaDepartamento", 3);
          this.ordenacao_Option.add("Cartão", "eventoIdentificador", 4);
          this.ordenacao_Option.add("Site Code", "eventoSiteCode", 5);
          this.ordenacao_Option.add("Área", "eventoArea", 6);
          this.ordenacao_Option.add("Bloqueio", "eventoBloqueio", 7);      
          break;      
        case "R2EA-1002":
          this.ordenacao_Option.add("Nome", "pessoaNome", 1);
          this.ordenacao_Option.add("Matrícula", "pessoaMatricula", 2);
          this.ordenacao_Option.add("Central", "pessoaDepartamento", 3);
          this.ordenacao_Option.add("Cartão", "eventoIdentificador", 4);
          this.ordenacao_Option.add("Site Code", "eventoSiteCode", 5);
          this.ordenacao_Option.add("Área", "eventoArea", 6);
          this.ordenacao_Option.add("Bloqueio", "eventoBloqueio", 7);
          break;
        case "R2EA-1003":
          this.ordenacao_Option.add("Nome", "pessoaNome", 1);
          this.ordenacao_Option.add("Contrato", "pessoaDocumento", 2);
          this.ordenacao_Option.add("Central", "pessoaDepartamento", 3);
          this.ordenacao_Option.add("Cartão", "eventoIdentificador", 4);
          this.ordenacao_Option.add("Site Code", "eventoSiteCode", 5);
          this.ordenacao_Option.add("Área", "eventoArea", 6);
          this.ordenacao_Option.add("Bloqueio", "eventoBloqueio", 7);
          break;        
        case "R2EA-1004":    
          this.ordenacao_Option.add("Nome", "pessoaNome", 1);
          this.ordenacao_Option.add("Grupo", "pessoaGrupo", 2);
          this.ordenacao_Option.add("Documento", "pessoaMatricula", 3);
          this.ordenacao_Option.add("Central", "pessoaDepartamento", 4);
          this.ordenacao_Option.add("Cartão", "eventoIdentificador", 5);
          this.ordenacao_Option.add("Site Code", "eventoSiteCode", 6);
          break;
        case "R2EA-1005":  
          this.ordenacao_Option.add("Nome", "pessoaNome", 1);
          this.ordenacao_Option.add("Grupo", "pessoaGrupo", 2);
          this.ordenacao_Option.add("Matrícula", "pessoaMatricula", 3);
          this.ordenacao_Option.add("Central", "pessoaDepartamento", 4);
          this.ordenacao_Option.add("Cartão", "eventoIdentificador", 5);
          this.ordenacao_Option.add("Site Code", "eventoSiteCode", 6);
          break;
        case "R2EA-1006":   
          this.ordenacao_Option.add("Nome", "pessoaNome", 1);
          this.ordenacao_Option.add("Grupo", "pessoaGrupo", 2);
          this.ordenacao_Option.add("Contrato", "pessoaDocumento", 3);
          this.ordenacao_Option.add("Central", "pessoaDepartamento", 4);
          this.ordenacao_Option.add("Cartão", "eventoIdentificador", 5);
          this.ordenacao_Option.add("Site Code", "eventoSiteCode", 6);
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

    if(this.softwareConfiguracaoSubscription) {
      this.softwareConfiguracaoSubscription.unsubscribe();
    }

    this.gridElement = document.getElementById("grid");
    this.formElement = document.getElementById("form");

    let filtroIdentificacao: IdentificacaoControleArqFilter = {};
    let orderIdentificacao: IdentificacaoControleSort = {};

    let reportTitulo: string  = "Relatório de Acesso";
    let subtitulo: string = "";

    this.showSpinner = true;
    const reportPeriodo: string = "Período: " + 
                                  this.dataInicial_Text.textMasked + " " + this.horaInicial_Text.textMasked + " - " +
                                  this.dataFinal_Text.textMasked   + " " + this.horaFinal_Text.textMasked;

    filtroIdentificacao.identificacaoDataHora.gte = this.dataInicial_Text.formated + " " + this.horaInicial_Text.textMasked + ":00 -00:00";
    filtroIdentificacao.identificacaoDataHora.lte = this.dataFinal_Text.formated   + " " + this.horaFinal_Text.textMasked + ":59 -00:00";  

    if(this.grupo_Option.itemSelected.id > 0) {
      filtroIdentificacao.pessoaGrupo.eq = this.grupo_Option.itemSelected.text;
      subtitulo = "Filtrado pelo Grupo (" + this.grupo_Option.itemSelected.text + ")";  
    }

    if(this.nome_Text.text.length > 0) {
      filtroIdentificacao.pessoaNome.contains = this.nome_Text.text;
      subtitulo == ""? subtitulo = "Filtrado pelo ": subtitulo += ", pelo ";        
      subtitulo += "Nome (" + this.nome_Text.text + ")";
    }

    if(this.documento_Text.text.length > 0) {
      filtroIdentificacao.pessoaDocNumero.eq = this.documento_Text.text;
      subtitulo == ""? subtitulo = "Filtrado pelo ": subtitulo += ", pelo ";        
      subtitulo += "Documento (" + this.documento_Text.text + ")";
    }

    if(this.matricula_Text.text.length > 0) {
      filtroIdentificacao.pessoaDocTipo.eq = "MATR";
      filtroIdentificacao.pessoaDocNumero.eq = this.matricula_Text.text;
      subtitulo == ""? subtitulo = "Filtrado pela ": subtitulo += ", pela ";        
      subtitulo += "Matricula (" + this.matricula_Text.text + ")";
    }

    if(this.contrato_Text.text.length > 0) {
      filtroIdentificacao.pessoaDocNumero.eq = this.contrato_Text.text;
      subtitulo == ""? subtitulo = "Filtrado pelo ": subtitulo += ", pelo ";        
      subtitulo += "Contrato (" + this.contrato_Text.text + ")";
    }

    if(this.cargo_Text.text.length > 0) {
      filtroIdentificacao.pessoaCargo.contains = this.cargo_Text.text;
      subtitulo == ""? subtitulo = "Filtrado pelo ": subtitulo += ", pelo ";        
      subtitulo += "Cargo (" + this.cargo_Text.text + ")";
    }

    if(this.central_Text.text.length > 0) { // <--
      subtitulo == ""? subtitulo = "Filtrado pela ": subtitulo += ", pela ";        
      subtitulo += "Central (" + this.central_Text.text + ")";
    }

    if(this.localizacao_Text.text.length > 0) { 
      subtitulo == ""? subtitulo = "Filtrado pela ": subtitulo += ", pela ";        
      subtitulo += "Localizacao (" + this.localizacao_Text.text + ")";
    }

    if(this.unidade_Text.text.length > 0) {
      subtitulo == ""? subtitulo = "Filtrado pela ": subtitulo += ", pela ";        
      subtitulo += "Unidade (" + this.unidade_Text.text + ")";
    }

    //       filtroIdentificacao.pessoaEmpresaId = this.unidade_Text.id;


    if(this.cartao_Text.text.length > 0) {
      try {
        filtroIdentificacao.identificador.eq = parseInt(this.cartao_Text.text);
      } catch {
        console.log("Try/Catch: Identificador não numérico");
      }        
      subtitulo == ""? subtitulo = "Filtrado pelo ": subtitulo += ", pelo ";        
      subtitulo += "Cartão (" + this.cartao_Text.text + ")";
    }

    if(this.siteCode_Text.text.length > 0) {
      try {
        filtroIdentificacao.siteCode.eq = parseInt(this.siteCode_Text.text);
      } catch {
        console.log("Try/Catch: SiteCode não numérico")
      }        
      subtitulo == ""? subtitulo = "Filtrado pelo ": subtitulo += ", pelo ";        
      subtitulo += "Site Code (" + this.siteCode_Text.text + ")";
    }

    if(this.bloqueio_Option.itemSelected.text.length > 0) {
      subtitulo == ""? subtitulo = "Filtrado pelo ": subtitulo += ", pelo ";        
      subtitulo += "Bloqueio (" + this.bloqueio_Option.itemSelected.text + ")";
    }

    if(this.areaEntrada_Option.itemSelected.text.length > 0) {
      filtroIdentificacao.acessoLocalEntrada.contains = this.areaEntrada_Option.itemSelected.text.substr(0, 25);
      subtitulo == ""? subtitulo = "Filtrado pela ": subtitulo += ", pela ";        
      subtitulo += "Área Entrada (" + this.areaEntrada_Option.itemSelected.text + ")";
    }

    if(this.areaSaida_Option.itemSelected.text.length > 0) {
      filtroIdentificacao.statusFinalLocal.contains = this.areaSaida_Option.itemSelected.text.substr(0, 25);
      subtitulo == ""? subtitulo = "Filtrado pela ": subtitulo += ", pela ";        
      subtitulo += "Área Saída (" + this.areaSaida_Option.itemSelected.text + ")";
    }

    subtitulo += " ordernado por " + this.ordenacao_Option.itemSelected.text;

    orderIdentificacao[this.ordenacao_Option.itemSelected.value] = SortOperationKind.ASC;
    if(this.ordenacao_Option.itemSelected.value != "identificacaoDataHora")
      orderIdentificacao.identificacaoDataHora = SortOperationKind.ASC;
      
      
    this.softwareConfiguracaoSubscription = this.identificacaoControleService.readIdentificacaoControlesArqRelat(orderIdentificacao, filtroIdentificacao)
      .subscribe(({ controleIdentificacaoArq }: read_IdentificacaoControleArq) => {

        this.showSpinner = false;
        const reportTotalCount = controleIdentificacaoArq.totalCount;

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
            "controleIdentificacaoHistorico": {
              "nodes": controleIdentificacaoArq.nodes
            }
          }
        };

        let dataset = new Stimulsoft.System.Data.DataSet("JSON");

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

          jsonFile = null;
          report.dictionary.databases.clear();
          report = null;  

          }

      }, (error: any) => {    
        this.showSpinner = false;
        this.alertService.show("ERRO", "Ocorreu um erro na consulta do relatório. Tente Novamente!", [])
      });
  }

  onBloqueio_Click() {
    if(this.bloqueio_Option.itens.length == 1) {
      this.bloqueio_Option.itemSelected.text = "Aguarde! Carregando...";
    }
  }

  onAreaOption_Click(area?: number) {
    if(this.areaEntrada_Option.itens.length == 1) {
      if(area == 1) {
        this.areaEntrada_Option.itemSelected.text = "Aguarde! Carregando...";
      } else {
        this.areaSaida_Option.itemSelected.text = "Aguarde! Carregando...";
      } 
    }
  }

  onReportClose_Click() {
    this.showReport = false;

    let viewerElement: HTMLElement;
    const stiViewerElement: HTMLElement = document.getElementById("StiViewer");

    viewerElement = document.getElementById("viewer");

    viewerElement.removeChild(stiViewerElement);
    viewerElement.appendChild(this.gridElement);
    viewerElement.appendChild(this.formElement);

  }

  update_Grid(estilo: string) {
    this.listView_Acesso.processingShow();
    this.gestaoAcessoService.getReports(estilo)
      .subscribe((report: Report[]) => {
        this.actionbuttomService.enableButtons(0);
        this.listView_Acesso.gridUpdate(report);
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