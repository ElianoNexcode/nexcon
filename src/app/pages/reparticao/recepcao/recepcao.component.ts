import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import { ListViewGrid, Find, Filter, rowSelect } from 'src/app/@theme/components/grid/list-view/service/list-view.service';
import { ActionButtomService } from 'src/app/@theme/components/grid/action-buttom/service/action-button.service';
import { InputLabel } from 'src/app/@theme/components/form/input-label/service/input-label.service';
import { InputMultiLabel} from 'src/app/@theme/components/form/input-multi-label/service/input-multi-label';
import { OptionsGroup } from 'src/app/@theme/components/form/select-group/service/select-group.service';
import { ComboOptions, Item } from 'src/app/@theme/components/form/combobox/service/combobox.service';
import { ConfigStorage, Config, SiteConfig } from 'src/app/@core/storage/config/config';

import { RecepcaoData, 
         RecepcaoReparticao, 
         create_RecepcaoReparticao, 
         read_RecepcaoReparticao, 
         update_RecepcaoReparticao, 
         delete_RecepcaoReparticao, 
         RecepcaoReparticaoSort,
         RecepcaoReparticaoFilter, 
         RecepcaoNivelAcesso} from 'src/app/@core/data/reparticao-recepcao';

import { IniciaCadastro, YesNo } from 'src/app/@core/enum';

import { DocumentoGrupo,
         DocumentoGrupoData,
         DocumentoGrupoFilter,
         DocumentoGrupoSort,
         read_DocumentoGrupo } from 'src/app/@core/data/grupo-documento';

import { IdentificacaoGrupo,
         IdentificacaoGrupoData,
         IdentificacaoGrupoFilter,
         IdentificacaoGrupoSort,
         read_IdentificacaoGrupo } from 'src/app/@core/data/grupo-identificacao';

import { BehaviorSubject } from 'rxjs';
import { SortOperationKind } from 'src/app/@core/api/generic-graphql';
import { AlertServiceComponent } from 'src/app/@theme/components/form/alert-card/service/alert-card.service';
import { PessoaGrupo,
         PessoaGrupoData,
         PessoaGrupoFilter,
         PessoaGrupoSort,
         read_PessoaGrupo } from 'src/app/@core/data/grupo-pessoa';

import { TabsService } from 'src/app/@theme/layouts/tabs/service/tabs.service';
import { BoxPanel } from 'src/app/@theme/layouts/box/service/box.service';
import { RecepcaoEstacionamentoModalService } from 'src/app/@theme/modals/recepcao-estacionamento/service/recepcao-estacionamento-modal.service';
import { RecepcaoNivelAcessoModalService } from 'src/app/@theme/modals/recepcao-nivel-acesso/service/recepcao-nivel-acesso-modal.service';
import { NivelAcessoConcessao } from 'src/app/@core/data/concessao-nivel-acesso';

@Component({
    selector: 'nex-recepcao',
    templateUrl: './recepcao.component.html',
    host: { '(window:resize)': 'onResize()' },
    styleUrls: ['./recepcao.component.scss']
})
export class RecepcaoComponent implements AfterViewInit, OnDestroy {
       
    id: number = null;
    siteId: number;
    idNivelAcesso: number;
    estacionamentoSelectGroup: any[];
    listView_Recepcao: ListViewGrid = new ListViewGrid();
    listView_NivelAcesso: ListViewGrid = new ListViewGrid();

    nome_Text: InputLabel = new InputLabel();
    localizacao_Text: InputLabel = new InputLabel();
    telefone1_Text: InputLabel = new InputLabel();
    telefone2_Text: InputLabel = new InputLabel();
    email_Text: InputLabel = new InputLabel();
    observacao_Text: InputLabel = new InputLabel();

    campos_Group: OptionsGroup = new OptionsGroup();
    
    controle_Option: ComboOptions = new ComboOptions();
    iniciarCadastro_Option: ComboOptions = new ComboOptions();
    capturarImagem_Option: ComboOptions = new ComboOptions();
    identificador_Option: ComboOptions = new ComboOptions();

    NotificacaoMenor_Text: InputMultiLabel = new InputMultiLabel();
    NotificacaoMaior_Text: InputMultiLabel = new InputMultiLabel();

    documentoInterno_Option: ComboOptions = new ComboOptions();
    grupoInterno_Option: ComboOptions = new ComboOptions();
    motivoInterno_Option: ComboOptions = new ComboOptions();

    autorizacaoInterno_Option: ComboOptions = new ComboOptions();
    autorizacaoPrestador_Option: ComboOptions = new ComboOptions();
    autorizacaoVisitante_Option: ComboOptions = new ComboOptions();

    ingressoInterno_Text: InputLabel = new InputLabel();
    ingressoInterno_Options: OptionsGroup = new OptionsGroup();

    ingressoPrestador_Text: InputLabel = new InputLabel();
    ingressoPrestador_Options: OptionsGroup = new OptionsGroup();

    ingressoVisitante_Text: InputLabel = new InputLabel();
    ingressoVisitante_Options: OptionsGroup = new OptionsGroup();

    crachaInterno_Option: ComboOptions = new ComboOptions();    

    documentoPrestador_Option: ComboOptions = new ComboOptions();
    grupoPrestador_Option: ComboOptions = new ComboOptions();
    motivoPrestador_Option: ComboOptions = new ComboOptions();
   
    crachaPrestador_Option: ComboOptions = new ComboOptions();    

    documentoVisitante_Option: ComboOptions = new ComboOptions();
    grupoVisitante_Option: ComboOptions = new ComboOptions();
    motivoVisitante_Option: ComboOptions = new ComboOptions();
    crachaVisitante_Option: ComboOptions = new ComboOptions();    

    funcoes_Group: OptionsGroup = new OptionsGroup();

    order_by: RecepcaoReparticaoSort = { nome: SortOperationKind.ASC }
    filter: RecepcaoReparticaoFilter;
    filterGrid: RecepcaoReparticaoFilter;

    settings: BehaviorSubject<any>;

    reparticaoRecepcao: RecepcaoReparticao;

    tabsConfiguracao_Option: TabsService = new TabsService();
    tabsPessoa_Option: TabsService = new TabsService();

    boxEstacionamento: BoxPanel = new BoxPanel();
    boxNivelAcesso: BoxPanel = new BoxPanel();

    showSpinner: boolean = false;

    alertService: AlertServiceComponent = new AlertServiceComponent();

    recepcaoEstacionamentoModalService: RecepcaoEstacionamentoModalService = new RecepcaoEstacionamentoModalService();
    recepcaoNivelAcessoModalService: RecepcaoNivelAcessoModalService = new RecepcaoNivelAcessoModalService();

    editable: boolean;

    constructor(public actionbuttomService: ActionButtomService,
                private config: ConfigStorage,
                private recepcaoService: RecepcaoData,
                private documentoService: DocumentoGrupoData,
                private pessoaGrupoService: PessoaGrupoData,
                private identificacaoMotivoService: IdentificacaoGrupoData) {

        this.tabsConfiguracao_Option.add("tabIdentificacao", "Identificação", true);
        this.tabsConfiguracao_Option.add("tabCampos", "Campos", false, "block", "#192038");
        this.tabsConfiguracao_Option.add("tabFuncoes", "Funções", false, "block", "#192038");
        this.tabsConfiguracao_Option.add("tabEstacionamento", "Estacionamento", false, "block", "#192038");

        this.tabsPessoa_Option.add("tabInterno", "Interno", true);
        this.tabsPessoa_Option.add("tabPrestador", "Prestador");
        this.tabsPessoa_Option.add("tabVisitante", "Visitante");
        this.tabsPessoa_Option.add("tabNivelAcesso","Nível de Acesso");

        this.settings = this.config.siteSubject();

        this.actionbuttomService.relationGrid = "lstRecepcao";

        this.actionbuttomService.recurso = "1D";
        this.actionbuttomService.top_action_buttons = [{"id": 0, "text": "forms.buttons.create", "visibled": false, "enabled": true,  "condition": "always", "openForm": true, "maximized": true, "editable": "new",},
                                                       {"id": 1, "text": "forms.buttons.update", "visibled": false, "enabled": false, "condition": "select", "openForm": true, "maximized": true, "editable": "yes",},
                                                       {"id": 2, "text": "forms.buttons.read", "visibled": false, "enabled": false, "condition": "select", "openForm": true, "maximized": true, "editable": "no",},
                                                       {"id": 3, "text": "forms.buttons.delete", "visibled": false, "enabled": false, "condition": "multi",  "openForm": false, "question": "forms.questions.delete"}]
                                                       
        
        this.listView_Recepcao.name = "lstRecepcao";
        this.listView_Recepcao.title = "Lista de Recepção";
        this.listView_Recepcao.grid = [{"header": "Nome",       "field": "nome",       "width": 20, "align": "left"},
                                       {"header": "Telefone",   "field": "telefone1",  "width": 15, "align": "left"},
                                       {"header": "Email",      "field": "email",      "width": 20, "align": "left"},
                                       {"header": "Observação", "field": "observacao", "width": 45, "align": "left"}];

        this.listView_NivelAcesso.name = "lstNivelAcessoSelected";
        this.listView_NivelAcesso.gridOnly = true;
        this.listView_NivelAcesso.noPaging = true;
        this.listView_NivelAcesso.noBorder = true;
        this.listView_NivelAcesso.grid = [{"header": "", "width": 1, "type": "check","index":0, "align": "center"},
                                          { "header": "", "entity": "nivelAcesso", "field": "nome", "width": 100,}]                               
                                 
        this.nome_Text.name = "txtNome";
        this.nome_Text.rules = "uppercase";
        this.nome_Text.maxLength = 20;
        this.nome_Text.minLength = 1;

        this.localizacao_Text.name = "txtLocalizacao";
        this.localizacao_Text.rules = "uppercase";
        this.localizacao_Text.maxLength = 20;

        this.telefone1_Text.name = "txtTelefone1";
        this.telefone1_Text.rules = "onlynumbers";
        this.telefone1_Text.maxLength = 20;
        
        this.telefone2_Text.name = "txtTelefone2";
        this.telefone2_Text.rules = "onlynumbers";
        this.telefone2_Text.maxLength = 20;

        this.email_Text.name = "txtEmail";
        this.email_Text.rules = "email";
        this.email_Text.regex = "email";
        this.email_Text.maxLength = 50;

        this.observacao_Text.name = "txtObservacao";
        this.observacao_Text.rules = "uppercase";
        this.observacao_Text.regex = "noFilter";
        this.observacao_Text.maxLength = 100;        
        
        this.NotificacaoMenor_Text.name = "txtNotificacaoMaior";
        this.NotificacaoMenor_Text.label = "Idade Menor";
        this.NotificacaoMenor_Text.rules = "onlynumber";
        this.NotificacaoMenor_Text.textAlign = "center";
        this.NotificacaoMenor_Text.maxLength = 2;
        this.NotificacaoMenor_Text.minLength = 0;
        this.NotificacaoMenor_Text.text = "0";

        this.NotificacaoMaior_Text.name = "txtNotificacaoMenor";
        this.NotificacaoMaior_Text.label = "Idade Maior";
        this.NotificacaoMaior_Text.rules = "onlynumber";
        this.NotificacaoMaior_Text.textAlign = "center";
        this.NotificacaoMaior_Text.maxLength = 2;
        this.NotificacaoMenor_Text.minLength = 0;
        this.NotificacaoMaior_Text.text = "0";

        this.campos_Group.add(0, "EMPRESA", "campoEmpresa", true, false, true);
        this.campos_Group.add(1, "TELEFONE", "campoTelefone", true, false, true);
        this.campos_Group.add(2, "EMAIL", "campoEmail", true, false, true);
        this.campos_Group.add(3, "COMPLEMENTO", "campoComplemento", true, false, true);
        this.campos_Group.add(4, "MOTIVO", "campoMotivo", true, false, true);
        this.campos_Group.add(5, "OBSERVAÇÃO", "campoObservacao", true, false, true);

        this.controle_Option.name = "cbControle";
        this.controle_Option.add("PESSOA", "pessoa", 0);
        this.controle_Option.add("PESSOA E VEÍCULO", "veiculo", 1);
        this.controle_Option.add("PESSOA E MATERIAL", "pessaoMaterial", 2);
        this.controle_Option.add("PESSOA, VEÍCULO E MATERIAL", "pessoaVeiculoMaterial", 3, true);

        this.iniciarCadastro_Option.name = "cbIniciaCadastro";
        this.iniciarCadastro_Option.add("PELO DOCUMENTO", "documento", IniciaCadastro.documento, true);
        this.iniciarCadastro_Option.add("PELO NOME", "nomePessoa", IniciaCadastro.nomePessoa);
        this.iniciarCadastro_Option.add("PELA PLACA DO VEÍCULO", "placaVeiculo", IniciaCadastro.placaVeiculo);
        this.iniciarCadastro_Option.add("PELO IDENTIFICADOR", "identificador", IniciaCadastro.identificador);
        this.iniciarCadastro_Option.add("PELA BIOMETRIA", "biometria", IniciaCadastro.biometria);

        this.capturarImagem_Option.name = "cbCapturarImagem";
        this.capturarImagem_Option.add("NÃO OBRIGATÓRIO", "naoObrigatorio", 0, true);
        this.capturarImagem_Option.add("SE NÃO EXISTIR", "seNãoExistir", 1);
        this.capturarImagem_Option.add("SEMPRE", "sempre", 2);

        this.identificador_Option.name = "cbIdentificador";
        this.identificador_Option.add("NÃO UTILIZAR", "naoUtilizado", 0);
        this.identificador_Option.add("NÃO OBRIGATÓRIO", "naoObrigatorio", 1, true);
        this.identificador_Option.add("OBRIGATÓRIO", "obrigatorio", 2);
        this.identificador_Option.add("GERAR ID AUTOMATICAMENTE (QR CODE)", "automaticamente", 3)
        this.identificador_Option.add("SELECIONAR ID JÁ CADASTRADO (QR CODE)", "idCadastrado", 4)
        this.identificador_Option.add("GERAR ID A PARTIR DA PLACA DO VEÍCULO", "placaVeiculo", 5)

        this.documentoInterno_Option.name = "cbDocumentoInterno";
        this.documentoPrestador_Option.name = "cbDocumentoPrestador";
        this.documentoVisitante_Option.name = "cbDocumentoVisitante";

        const documentoOrder: DocumentoGrupoSort = {id: SortOperationKind.ASC};
        const documentoFilter: DocumentoGrupoFilter = null;
        this.documentoService.readDocumentoGrupos(documentoOrder, documentoFilter)
           .subscribe(({ grupoDocumento }: read_DocumentoGrupo) => {
               const nodes: DocumentoGrupo[] = grupoDocumento.nodes;
               nodes.forEach(documento => {
                    if(documento.interno    == true) this.documentoInterno_Option.add(documento.tipo, null, documento.id);
                    if(documento.prestador  == true) this.documentoPrestador_Option.add(documento.tipo, null, documento.id);
                    if(documento.visitante  == true) this.documentoVisitante_Option.add(documento.tipo, null, documento.id);
               });
            }) 

        this.grupoInterno_Option.name = "cbGrupoInterno";
        this.grupoInterno_Option.add("", null, 0);
        this.grupoInterno_Option.disabled = true;

        this.grupoPrestador_Option.name = "cbGrupoPrestador";
        this.grupoPrestador_Option.add("", null, 0);

        this.grupoVisitante_Option.name = "cbGrupoVisitante";
        this.grupoVisitante_Option.add("", null, 0);

        const grupoOrder: PessoaGrupoSort = {pessoaGrupo: SortOperationKind.ASC};
        const grupoFilter: PessoaGrupoFilter = {or: [{pessoaPrestador: {eq: true}},
                                                     {pessoaVisitante: {eq: true}}]};
        this.pessoaGrupoService.readPessoaGrupos(grupoOrder, grupoFilter)
           .subscribe(({ grupoPessoa }: read_PessoaGrupo) => {
               const nodes: PessoaGrupo[] = grupoPessoa.nodes;
               nodes.forEach(pessoa => {
                    if(pessoa.pessoaPrestador  == true) this.grupoPrestador_Option.add(pessoa.pessoaGrupo, null, pessoa.id);
                    if(pessoa.pessoaVisitante  == true) this.grupoVisitante_Option.add(pessoa.pessoaGrupo, null, pessoa.id);
               });
            }) 

        this.motivoInterno_Option.name = "cbMotivoInterno";
        this.motivoPrestador_Option.name = "cbMotivoPrestador";
        this.motivoVisitante_Option.name = "cbMotivoVisitante";

        const motivoOrder: IdentificacaoGrupoSort = { motivo : SortOperationKind.ASC};
        const motivoFilter: IdentificacaoGrupoFilter = null;
        this.identificacaoMotivoService.readIdentificacaoGrupos(motivoOrder, motivoFilter)
            .subscribe(({ grupoIdentificacaoMotivo }: read_IdentificacaoGrupo  ) => {
                const nodes: IdentificacaoGrupo[] = grupoIdentificacaoMotivo.nodes;

                this.motivoInterno_Option.add("", null, 0);
                this.motivoPrestador_Option.add("", null, 0);
                this.motivoVisitante_Option.add("", null, 0);

                nodes.forEach(identificacao => {
                    if(identificacao.interno    == true) this.motivoInterno_Option.add(identificacao.motivo, null, identificacao.id);
                    if(identificacao.prestador  == true) this.motivoPrestador_Option.add(identificacao.motivo, null, identificacao.id);
                    if(identificacao.visitante  == true) this.motivoVisitante_Option.add(identificacao.motivo, null, identificacao.id);
                });
            }) 
    
        this.autorizacaoInterno_Option.name = "cbAutorizacaoInterno";
        this.autorizacaoInterno_Option.add("ENTRADA", "entrada", 0);
        this.autorizacaoInterno_Option.add("SAÍDA", "saida", 1);
        this.autorizacaoInterno_Option.add("ENTRADA E SAÍDA","entradaSaida",2,true);

        this.autorizacaoPrestador_Option.name = "cbAutorizacaoPrestador";
        this.autorizacaoPrestador_Option.add("ENTRADA", "entrada", 0);
        this.autorizacaoPrestador_Option.add("SAÍDA", "saida", 1);
        this.autorizacaoPrestador_Option.add("ENTRADA E SAÍDA","entradaSaida",2,true);

        this.autorizacaoVisitante_Option.name = "cbAutorizacaoVisitante";
        this.autorizacaoVisitante_Option.add("ENTRADA", "entrada", 0);
        this.autorizacaoVisitante_Option.add("SAÍDA", "saida", 1);
        this.autorizacaoVisitante_Option.add("ENTRADA E SAÍDA","entradaSaida",2,true);

        this.ingressoInterno_Text.name = "txtIngressoInterno";
        this.ingressoInterno_Text.rules = "onlynumber";
        this.ingressoInterno_Text.textAlign = "center";
        this.ingressoInterno_Text.maxLength = 2;
        this.ingressoInterno_Text.text = "1";

        this.ingressoInterno_Options.add(-1, "Ignorar Controle","ignorarControle");

        this.ingressoPrestador_Text.name = "txtIngressoPrestador";
        this.ingressoPrestador_Text.rules = "onlynumber";
        this.ingressoPrestador_Text.textAlign = "center";
        this.ingressoPrestador_Text.maxLength = 2;
        this.ingressoPrestador_Text.text = "1";

        this.ingressoPrestador_Options.add(-1, "Ignorar Controle","ignorarControle");

        this.ingressoVisitante_Text.name = "txtIngressoVisitante";
        this.ingressoVisitante_Text.rules = "onlynumber";
        this.ingressoVisitante_Text.textAlign = "center";
        this.ingressoVisitante_Text.maxLength = 2;
        this.ingressoVisitante_Text.text = "1";

        this.ingressoVisitante_Options.add(-1, "Ignorar Controle","ignorarControle");

        this.crachaInterno_Option.name = "cbCrachaInterno";
        this.crachaInterno_Option.add("", null, 0);
        this.crachaInterno_Option.disabled = true;

        this.crachaPrestador_Option.name = "cbCrachaPrestador";
        this.crachaPrestador_Option.add("", null, 0);
        this.crachaPrestador_Option.disabled = true;

        this.crachaVisitante_Option.name = "cbCrachaVisitante";
        this.crachaVisitante_Option.add("", null, 0);
        this.crachaVisitante_Option.disabled = true;

        this.funcoes_Group.add( 0, "Apresentar mensagem de felicitação", "apresentarFelicitacao");
        this.funcoes_Group.add( 1, "Apresentar o último visitado", "apresentaUltimoVisitado", true, false, true);
        this.funcoes_Group.add( 2, "Arquivar o registro ao concluir a identificação", "arquivarRegistro");
        this.funcoes_Group.add( 3, "Habilitar exclusão automática de cadastro de prestador", "ativarExclusaoPrestador");
        this.funcoes_Group.add( 4, "Habilitar exclusão automática de cadastro de visitante", "ativarExclusaoVisitante");
        this.funcoes_Group.add( 5, "Imprimir etiqueta automaticamente", "imprimirCracha");
        this.funcoes_Group.add( 6, "Informar se visitado esta presente", "informarPresencaVisitado");
        this.funcoes_Group.add( 7, "Tornar obrigatório a identificação da garagem", "identificarGaragem");
        this.funcoes_Group.add( 8, "Tornar obrigatório a identificação do veículo", "identificarVeiculo", false, true);
        this.funcoes_Group.add( 9, "Tornar obrigatório a seleção de autorizante", "identificarAutorizante");
        
        this.settings
            .subscribe((site: SiteConfig) => {
                if(site != null) {
                    this.filter = {siteId: {eq: site.id}};
                    this.siteId = site.id;
                    this.actionbuttomService.top_action_buttons.forEach(topButton => {
                      topButton.visibled = true;
                    });
                    this.update_Grid();
                }
            });

        this.boxEstacionamento.add("btCheck", "check", false);        
        this.boxNivelAcesso.add("btInsert", "insert", false);
        this.boxNivelAcesso.add("btDelete", "delete", false);
        
    }

    ngAfterViewInit(): void {
        this.onResize();
    }
    
    cbDocumentoInterno_onChanged(indice: number) {
        //
    }

    cbControle_onChanged(selected?: any) {
        const controleVeiculo: boolean = this.controle_Option.itens[selected.id].text.indexOf("VEÍCULO") > 0;
        this.funcoes_Group.itens.filter(fngrp => (fngrp.alias == "identificarVeiculo"))
            .forEach(funcao => {
                if(controleVeiculo == true) {
                    this.funcoes_Group.enable(funcao.alias);
                    this.iniciarCadastro_Option.enable(2);
                } else {
                    this.funcoes_Group.disable(funcao.alias, true);
                    this.iniciarCadastro_Option.disable(2);
                }
            })
    }

    cbIniciarCadastro_onChanged(selected: Item) {
        if(selected.id > 0) {
            this.documentoInterno_Option.disable();
            this.documentoPrestador_Option.disable();
            this.documentoVisitante_Option.disable();
        } else {
            this.documentoInterno_Option.enable();
            this.documentoPrestador_Option.enable();
            this.documentoVisitante_Option.enable();
        }
    }

    onListView_Change(rowSelect?: rowSelect) {
        if(rowSelect.registro) {
          this.id = rowSelect.id;
        } else {
          if(rowSelect.exclude == "yes") {          
            this.recepcaoService.deleteRecepcaoReparticao(rowSelect.id)
            .subscribe(({ data }: delete_RecepcaoReparticao)  => {
              if(data.reparticaoRecepcao_Excluir.sucesso == true) {
                const find = {field: "id", value: rowSelect.id, type: "DEL"}
                this.update_Grid(find)
                
              } else {
                const objeto = JSON.parse(data.reparticaoRecepcao_Excluir.objeto);
                this.alertService.show(data.reparticaoRecepcao_Excluir.mensagemTipo,
                                       data.reparticaoRecepcao_Excluir.mensagem,
                                       objeto);
              }
            })
          }
        }
      }

    onListView_Filter(filterSelect: Item) {
        switch (filterSelect.text) {
            case "Nome":
                this.filterGrid = {nome: {contains: filterSelect.value}};
                break;
            case "Telefone":
                this.filterGrid = {telefone1: {contains: filterSelect.value}};
                break;
            case "Email":
                this.filterGrid = {email: {contains: filterSelect.value}};
                break;
            case "Observação":
                this.filterGrid = {observacao: {contains: filterSelect.value}};
                break;
        }

        this.update_Grid();
    }

    onActionButtom_Click(actionButtomSelect: any) {
        switch(actionButtomSelect.text) {
          case "forms.buttons.create": {
            this.id = undefined;
            this.editable = true;
            this.estacionamentoSelectGroup = [];
            this.nome_Text.focus();            
            break;
          }
          case "forms.buttons.update": {
            this.editable = true;
            this.updateDataLoad();
            this.nome_Text.focus(true);
            break;
          }
          case "forms.buttons.read": {
            this.editable = false;
            this.updateDataLoad();
          }
        }
      }
    
    updateDataLoad() {
        this.showSpinner = true;

        const filter: RecepcaoReparticaoFilter = {id: {eq: this.id}};
        this.recepcaoService.readRecepcaoReparticao(this.order_by, filter)
            .subscribe(({ reparticaoRecepcao }: read_RecepcaoReparticao) => {
                this.reparticaoRecepcao = reparticaoRecepcao.nodes[0];;
                this.nome_Text.text = this.reparticaoRecepcao.nome;

                this.localizacao_Text.text = this.reparticaoRecepcao.localizacao;
                this.telefone1_Text.text = this.reparticaoRecepcao.telefone1;
                this.telefone2_Text.text = this.reparticaoRecepcao.telefone2;
                this.email_Text.text = this.reparticaoRecepcao.email;
                this.observacao_Text.text = this.reparticaoRecepcao.observacao;

                this.campos_Group.populate(this.reparticaoRecepcao);
                this.funcoes_Group.populate(this.reparticaoRecepcao);

                this.controle_Option.select(this.reparticaoRecepcao.controle);
                this.iniciarCadastro_Option.select(this.reparticaoRecepcao.iniciarCadastro);
                this.capturarImagem_Option.select(this.reparticaoRecepcao.capturarImagem);
                this.identificador_Option.select(this.reparticaoRecepcao.identificador);

                this.NotificacaoMenor_Text.text = this.reparticaoRecepcao.notificarMenor.toString();
                this.NotificacaoMaior_Text.text = this.reparticaoRecepcao.notificarMaior.toString();

                this.documentoInterno_Option.select(this.reparticaoRecepcao.internoTipoDocId);
                this.documentoPrestador_Option.select(this.reparticaoRecepcao.prestadorTipoDocId);
                this.documentoVisitante_Option.select(this.reparticaoRecepcao.visitanteTipoDocId);

                this.grupoPrestador_Option.select(this.reparticaoRecepcao.prestadorGrupoId);
                this.grupoVisitante_Option.select(this.reparticaoRecepcao.visitanteGrupoId);

                this.motivoInterno_Option.select(this.reparticaoRecepcao.internoMotivoId);
                this.motivoPrestador_Option.select(this.reparticaoRecepcao.prestadorMotivoId);
                this.motivoVisitante_Option.select(this.reparticaoRecepcao.visitanteMotivoId);

                this.autorizacaoInterno_Option.select(this.reparticaoRecepcao.internoAutorizacao);
                this.autorizacaoPrestador_Option.select(this.reparticaoRecepcao.prestadorAutorizacao);
                this.autorizacaoVisitante_Option.select(this.reparticaoRecepcao.visitanteAutorizacao);

                if(this.reparticaoRecepcao.internoIngresso == 0){
                    this.ingressoInterno_Options.check(-1);
                    this.ingressoInterno_Text.clear();
                    this.ingressoInterno_Text.disabled = true;
                } else {
                    this.ingressoInterno_Text.text = this.reparticaoRecepcao.internoIngresso.toString();
                }

                if(this.reparticaoRecepcao.prestadorIngresso == 0){
                    this.ingressoPrestador_Options.check(-1);
                    this.ingressoPrestador_Text.clear();
                    this.ingressoPrestador_Text.disabled = true;
                } else {
                    this.ingressoPrestador_Text.text = this.reparticaoRecepcao.prestadorIngresso.toString();
                }

                if(this.reparticaoRecepcao.visitanteIngresso == 0){
                    this.ingressoVisitante_Options.check(-1);
                    this.ingressoVisitante_Text.clear();
                    this.ingressoVisitante_Text.disabled = true;
                } else {
                    this.ingressoVisitante_Text.text = this.reparticaoRecepcao.visitanteIngresso.toString();
                }

                this.estacionamentoSelectGroup = [];
                this.reparticaoRecepcao.estacionamentos.forEach( estacionamentos => {
                    this.estacionamentoSelectGroup.push(estacionamentos.estacionamento)
                });

                const niveis = this.reparticaoRecepcao.niveisAcessos
                    .map(recepcao => {
                        return { id: recepcao.nivelAcesso.id,
                                 nome: recepcao.nivelAcesso.nome,
                                 checked: [recepcao.nivelAcessoPadrao]
                                }
                    });

                this.listView_NivelAcesso.gridUpdate(niveis);
                this.cbControle_onChanged({id: this.reparticaoRecepcao.controle});

                this.onIgnorarControleInterno_Change();
                this.onIgnorarControlePrestador_Change();
                this.onIgnorarControleVisitante_Change();

                this.showSpinner = false;
            });
    }
    
    onClose_Click(hideForm: boolean = true) {
        this.nome_Text.clear();
        this.localizacao_Text.clear();
        this.telefone1_Text.clear();
        this.telefone2_Text.clear();
        this.email_Text.clear();
        this.observacao_Text.clear();

        this.campos_Group.reset();
        this.funcoes_Group.reset();

        this.controle_Option.select(3);
        this.iniciarCadastro_Option.select(0);
        this.capturarImagem_Option.select(0);

        this.NotificacaoMenor_Text.text = "0";
        this.NotificacaoMaior_Text.text = "0";

        this.documentoInterno_Option.select(0);
        this.documentoPrestador_Option.select(0);
        this.documentoVisitante_Option.select(0);

        this.grupoPrestador_Option.select(0);
        this.grupoVisitante_Option.select(0);

        this.motivoInterno_Option.select(0);
        this.motivoPrestador_Option.select(0);
        this.motivoVisitante_Option.select(0);

        this.ingressoInterno_Text.text = "1";
        this.ingressoInterno_Text.disabled = false;
        this.ingressoInterno_Options.uncheck(-1);

        this.ingressoPrestador_Text.text = "1";
        this.ingressoPrestador_Text.disabled = false;
        this.ingressoPrestador_Options.uncheck(-1);

        this.ingressoVisitante_Text.text = "1";
        this.ingressoVisitante_Text.disabled = false;
        this.ingressoVisitante_Options.uncheck(-1);
        



        this.estacionamentoSelectGroup = [];
        this.idNivelAcesso = undefined;

        const niveis = [];
        this.listView_NivelAcesso.gridUpdate(niveis);

        this.ingressoPrestador_Options.select(0);
        this.ingressoVisitante_Options.select(0);
        if(hideForm == true) {
          this.actionbuttomService.hideForm(true);
          this.tabsConfiguracao_Option.select("tabIdentificacao");
          this.tabsPessoa_Option.select("tabInterno");
        } else {
          this.nome_Text.focus();
          this.tabsConfiguracao_Option.select("tabIdentificacao");
          this.tabsPessoa_Option.select("tabInterno");
        }
    }

    onNotificacaoMenor_Change(inputLabel: InputLabel) {
        if(isNaN(parseInt(inputLabel.text))) {
            inputLabel.text = "0";
            inputLabel.focus(true);
        }
    }

    onSave_Click() {
        this.nome_Text.validated = (this.nome_Text.text.length >= this.nome_Text.minLength);
        this.NotificacaoMenor_Text.validated = (this.NotificacaoMenor_Text.text.length == this.NotificacaoMenor_Text.minLength) || (parseInt(this.NotificacaoMenor_Text.text, 10) <= 99);
        this.NotificacaoMaior_Text.validated = (this.NotificacaoMaior_Text.text.length == this.NotificacaoMaior_Text.minLength) || (parseInt(this.NotificacaoMaior_Text.text, 10) <= 99);
    
        const idadeMinMax: boolean = (parseInt(this.NotificacaoMaior_Text.text) - parseInt(this.NotificacaoMenor_Text.text) >= 0);
        const idadeMinMaxValidacao: boolean = (this.NotificacaoMenor_Text.text != "" && this.NotificacaoMaior_Text.text != "");

        if(!this.nome_Text.validated || !this.email_Text.validated) {
            this.alertService.show("ERRO",
                                    "Existem campos obrigatórios não preenchidos ou preenchidos de forma incorreta. Verifique!",
                                    null);
        } else if(!this.NotificacaoMenor_Text.validated || !this.NotificacaoMaior_Text.validated) {
            this.alertService.show("ERRO",
                                   "Atenção! Notifição de Idade superior a 99 anos. Verifique!",
                                   null);
        } else if(!idadeMinMax && idadeMinMaxValidacao) {
            this.NotificacaoMenor_Text.validated = this.NotificacaoMaior_Text.validated = false;
            this.alertService.show("ERRO",
                                   "Atenção! Notificação Idade Menor não pode ser superior a Idade Maior!",
                                   null);
        } else {
              
          this.showSpinner = true;
          const reparticaoRecepcao: RecepcaoReparticao = { 
            id: this.id,
            siteId: <number>this.filter.siteId.eq,
            nome: this.nome_Text.text,
            localizacao: this.localizacao_Text.text,
            telefone1: this.telefone1_Text.text,
            telefone2: this.telefone2_Text.text,
            email: this.email_Text.text,
            observacao: this.observacao_Text.text,

            campoComplemento: this.campos_Group.valueOf('campoComplemento'),
            campoEmpresa: this.campos_Group.valueOf('campoEmpresa'),
            campoEmail: this.campos_Group.valueOf('campoEmail'),
            campoTelefone: this.campos_Group.valueOf('campoTelefone'),
            campoMotivo: this.campos_Group.valueOf('campoMotivo'),
            campoObservacao: this.campos_Group.valueOf('campoObservacao'),
            campoVeiculo: this.campos_Group.valueOf('campoVeiculo'),

            apresentarFelicitacao: this.funcoes_Group.valueOf('apresentarFelicitacao'),
            apresentaUltimoVisitado: this.funcoes_Group.valueOf('apresentaUltimoVisitado'),
            arquivarRegistro: this.funcoes_Group.valueOf('arquivarRegistro'),            
            ativarExclusaoPrestador: this.funcoes_Group.valueOf('ativarExclusaoPrestador'),
            ativarExclusaoVisitante: this.funcoes_Group.valueOf('ativarExclusaoVisitante'),  
            imprimirCracha: this.funcoes_Group.valueOf('imprimirCracha'),
            informarPresencaVisitado: this.funcoes_Group.valueOf('informarPresencaVisitado'),
            identificarGaragem: this.funcoes_Group.valueOf('identificarGaragem'),
            identificarVeiculo: this.funcoes_Group.valueOf('identificarVeiculo'),
            identificarAutorizante: this.funcoes_Group.valueOf('identificarAutorizante'),

            internoIngresso: this.ingressoInterno_Options.valueOf_All() == 0? parseInt(this.ingressoInterno_Text.text): 0,
            prestadorIngresso: this.ingressoPrestador_Options.valueOf_All() == 0? parseInt(this.ingressoPrestador_Text.text): 0,
            visitanteIngresso: this.ingressoVisitante_Options.valueOf_All() == 0? parseInt(this.ingressoVisitante_Text.text): 0,

            internoCrachaId: 0,
            prestadorCrachaId: 0,
            visitanteCrachaId: 0,

            controle: this.controle_Option.itemSelected.id,
            iniciarCadastro: this.iniciarCadastro_Option.itemSelected.id,
            capturarImagem: this.capturarImagem_Option.itemSelected.id,
            identificador: this.identificador_Option.itemSelected.id,

            notificarMenor: parseInt(this.NotificacaoMenor_Text.text) || 0,
            notificarMaior: parseInt(this.NotificacaoMaior_Text.text) || 0,

            estacionamentos: this.estacionamentoSelectGroup
                .map(estacionamento => {return {'areaId': estacionamento.id}}),

            niveisAcessos: this.listView_NivelAcesso.dataGridBehavior
                .value?.map(item => { return { 'nivelAcessoId': item.id, 'nivelAcessoPadrao': item.checked[0]}}), 

            internoTipoDocId: this.documentoInterno_Option.itemSelected.id,
            prestadorTipoDocId: this.documentoPrestador_Option.itemSelected.id,
            visitanteTipoDocId: this.documentoVisitante_Option.itemSelected.id,

            prestadorGrupoId: this.grupoPrestador_Option.itemSelected.id,
            visitanteGrupoId: this.grupoVisitante_Option.itemSelected.id,

            internoMotivoId: this.motivoInterno_Option.itemSelected.id,
            prestadorMotivoId: this.motivoPrestador_Option.itemSelected.id,
            visitanteMotivoId: this.motivoVisitante_Option.itemSelected.id
        };

        if(reparticaoRecepcao.id) {
            this.recepcaoService.updateRecepcaoReparticao(reparticaoRecepcao)
                .subscribe(({ data }: update_RecepcaoReparticao)  => {
                    const objeto: any = JSON.parse(data.reparticaoRecepcao_Alterar.objeto);
                        if(data.reparticaoRecepcao_Alterar.sucesso == true) {
                            const find = {field: "id", value: objeto.Id}
                            this.onClose_Click();
                            this.update_Grid(find);
                            this.onIgnorarControleInterno_Change();
                            this.onIgnorarControlePrestador_Change();
                            this.onIgnorarControleVisitante_Change();
                        } else {
                            this.alertService.show(data.reparticaoRecepcao_Alterar.mensagemTipo,
                                                   data.reparticaoRecepcao_Alterar.mensagem,
                                                   objeto);
                        }
                        this.showSpinner = false;
                    })
            } else {
            this.recepcaoService.createRecepcaoReparticao(reparticaoRecepcao)
                .subscribe(({ data }: create_RecepcaoReparticao) => {
                    const objeto: any = JSON.parse(data.reparticaoRecepcao_Inserir.objeto);
                    if(data.reparticaoRecepcao_Inserir.sucesso == true) {
                        const find = {field: "id", value: objeto.Id};
                        this.onClose_Click(false);
                        this.update_Grid(find);
                    } else {            
                        this.alertService.show(data.reparticaoRecepcao_Inserir.mensagemTipo,
                                               data.reparticaoRecepcao_Inserir.mensagem,
                                               objeto);
                    }
                    this.showSpinner = false;
                })
            }
        }
    }

    update_Grid(find?: Find, filter?: Filter) {
        const filterGrid: RecepcaoReparticaoFilter = {...this.filter, ...this.filterGrid};
        this.listView_Recepcao.processingShow();
        this.recepcaoService.readRecepcaoReparticao(this.order_by, filterGrid)
          .subscribe(({ reparticaoRecepcao }: read_RecepcaoReparticao) => {
            this.actionbuttomService.enableButtons(0);
            this.listView_Recepcao.gridUpdate(reparticaoRecepcao.nodes, find, filter);
          });
    }

    onRecepcaoEstacionamento_Click(type: any){
        const paramList: Array<number> = this.estacionamentoSelectGroup.map(estacionamento => {
            return estacionamento.id;
        })
        this.recepcaoEstacionamentoModalService.show(this.siteId, paramList);
    }

    onResize() {
        const maxHeightPanel = document.getElementById('recepcaoComponent_Panel')?.clientHeight;
        const estacionamentoItens = document.getElementById('estacionamentoItens');
    
        this.campos_Group.maxHeight = maxHeightPanel - 193;
        this.funcoes_Group.maxHeight = maxHeightPanel - 193;
        this.ingressoInterno_Options.maxHeight = maxHeightPanel - 193;
        this.ingressoPrestador_Options.maxHeight = maxHeightPanel - 193;

        const maxHeightListView = maxHeightPanel - 219;
        this.listView_NivelAcesso.maxHeight = maxHeightListView;
        estacionamentoItens.style.maxHeight = maxHeightListView + 'px';
        estacionamentoItens.style.height = maxHeightListView + 'px';
    }

    onRecepcaoNivelAcesso_Click(type: any){
        switch (type) {
            case "insert":
                const paramList: Array<number> = this.listView_NivelAcesso
                    .dataGridBehavior.value?.map(nivel => {return nivel.id});
                this.recepcaoNivelAcessoModalService.show(this.siteId, paramList );
              break;
            case "delete": 
              const niveis: any[] = this.listView_NivelAcesso.dataGridBehavior.value || [];
              const indexId = niveis.findIndex(selecao => selecao.id == this.idNivelAcesso);
              if(indexId >= 0){
                niveis.splice(indexId,1);
                this.listView_NivelAcesso.gridUpdate(niveis);
              }
              break;
          } 
    }

    onEstacionamentoSelectGroup(itemSelected: any[]){
        this.estacionamentoSelectGroup = itemSelected.filter(item => item.checked[0] == true);
    }

    onNivelAcessoSelect(nivelAcessoSelect: RecepcaoReparticao){ 
        const niveis: any[] = this.listView_NivelAcesso.dataGridBehavior.value || [];
        const index: number = this.listView_NivelAcesso.dataGridBehavior.value?.findIndex(selecao => selecao.id == nivelAcessoSelect.id);

        if(index == undefined || index < 0 ){
            niveis.push({ checked: [false], ... 
                {id: nivelAcessoSelect.id, 
                 nome: nivelAcessoSelect.nome}})
            this.listView_NivelAcesso.gridUpdate(niveis);
        }
    }

    onListViewNivelAcesso_Change(rowSelect?: rowSelect){
        if(rowSelect.registro){
            this.idNivelAcesso = rowSelect.registro.id;
        }
    }

    onIgnorarControleInterno_Change(){
        if(this.ingressoInterno_Text.text == "-1"){
            this.ingressoInterno_Options.check(-1);
            this.ingressoInterno_Text.clear();
            this.ingressoInterno_Text.disabled = true;
        }else if(this.ingressoInterno_Options.valueOf("ignorarControle") == true){
            this.ingressoInterno_Options.check(-1);
            this,this.ingressoInterno_Text.clear();
            this.ingressoInterno_Text.disabled = true;
        }else {
            this.ingressoInterno_Text.disabled = false;
            this.ingressoInterno_Options.uncheck(-1);
            this.ingressoInterno_Text.text = this.ingressoInterno_Text.text == ""? "1": this.ingressoInterno_Text.text;
        }
    }

    onIgnorarControlePrestador_Change(){
        if(this.ingressoPrestador_Text.text == "-1"){
            this.ingressoPrestador_Options.check(-1);
            this.ingressoPrestador_Text.clear();
            this.ingressoPrestador_Text.disabled = true;
        }else if(this.ingressoPrestador_Options.valueOf("ignorarControle") == true){
            this.ingressoPrestador_Options.check(-1);
            this,this.ingressoPrestador_Text.clear();
            this.ingressoPrestador_Text.disabled = true;
        }else {
            this.ingressoPrestador_Text.disabled = false;
            this.ingressoPrestador_Options.uncheck(-1);
            this.ingressoPrestador_Text.text = this.ingressoPrestador_Text.text == ""? "1": this.ingressoPrestador_Text.text;
        }
    }

    onIgnorarControleVisitante_Change(){
        if(this.ingressoVisitante_Text.text == "-1"){
            this.ingressoVisitante_Options.check(-1);
            this.ingressoVisitante_Text.clear();
            this.ingressoVisitante_Text.disabled = true;
        }else if(this.ingressoVisitante_Options.valueOf("ignorarControle") == true){
            this.ingressoVisitante_Options.check(-1);
            this,this.ingressoVisitante_Text.clear();
            this.ingressoVisitante_Text.disabled = true;
        }else {
            this.ingressoVisitante_Text.disabled = false;
            this.ingressoVisitante_Options.uncheck(-1);
            this.ingressoVisitante_Text.text = this.ingressoVisitante_Text.text == ""? "1": this.ingressoVisitante_Text.text;
        }
    }

    ngOnDestroy() {
        this.settings?.unsubscribe();
    }
    
}