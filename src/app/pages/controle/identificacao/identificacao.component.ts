import { Component, OnDestroy, OnInit } from '@angular/core';

import { ListViewGrid, Find, Filter, Grid, rowSelect } from 'src/app/@theme/components/grid/list-view/service/list-view.service';
import { AlertServiceComponent } from 'src/app/@theme/components/form/alert-card/service/alert-card.service';
import { ActionButtomService } from 'src/app/@theme/components/grid/action-buttom/service/action-button.service';
import { InputLabel } from 'src/app/@theme/components/form/input-label/service/input-label.service';
import { ComboOptions, Item } from 'src/app/@theme/components/form/combobox/service/combobox.service';
import { RadioOptions } from 'src/app/@theme/components/form/radio/service/radio.service';

import {
  PessoaExternaUsuarioData,
  PessoaExternaUsuario,
  read_PessoaExternaUsuario,
  PessoaExternaUsuarioSort,
  PessoaExternaUsuarioFilter
} from 'src/app/@core/data/usuario-pessoa-externa';

import { SortOperationKind } from 'src/app/@core/api/generic-graphql';
import { ModalService } from 'src/app/@theme/modals/service/modal.service';

import {
  create_IdentificacaoControle,
  read_IdentificacaoControle,
  update_IdentificacaoControle,
  read_IdentificacaoControleArq,
  suspend_IdentificacaoControle,
  cancel_IdentificacaoControle,
  end_IdentificacaoControle,
  IdentificacaoControleData,
  IdentificacaoControle,
  filterSchema,
  IdentificacaoControleFilter,
  IdentificacaoControleArqFilter,
} from 'src/app/@core/data/controle-identificacao';

import { AbordagemTipo, StateGrid, Identificacao, Registro, IniciaCadastro, PessoaTipo, VeiculoTipo } from 'src/app/@core/enum';

import { TextareaLabel } from 'src/app/@theme/components';
import { BehaviorSubject, Subscription } from 'rxjs';
import { ConfigStorage, SiteConfig } from 'src/app/@core/storage/config/config';
import { DocumentoGrupo, DocumentoGrupoData, DocumentoGrupoFilter, DocumentoGrupoSort, read_DocumentoGrupo } from 'src/app/@core/data/grupo-documento';
import { read_RecepcaoReparticao, RecepcaoData, RecepcaoReparticao, RecepcaoReparticaoFilter, RecepcaoReparticaoSort } from 'src/app/@core/data/reparticao-recepcao';

import { PessoaGrupo, PessoaGrupoData, PessoaGrupoFilter, PessoaGrupoSort, read_PessoaGrupo } from 'src/app/@core/data/grupo-pessoa';
import { EmpresaReparticao, EmpresaReparticaoData, EmpresaReparticaoFilter, EmpresaReparticaoSort, read_EmpresaReparticao } from 'src/app/@core/data/reparticao-empresa';
import { Buttons, CardTabsOptions } from 'src/app/@theme/layouts/card-tabs/service/cart-tabs.service';
import { IdentificacaoGrupo, IdentificacaoGrupoData, IdentificacaoGrupoFilter, IdentificacaoGrupoSort, read_IdentificacaoGrupo } from 'src/app/@core/data/grupo-identificacao';
import { TreeviewService } from 'src/app/@theme/layouts/treeview/service/treeview.service';
import { ErrosModalService } from 'src/app/@theme/modals/erros/service/erros-modal.service';
import { DateFormated, DateOperator } from 'src/app/@theme/components/miscellaneous/date-operator/date-operator';
import { CaptureModalService } from 'src/app/@theme/modals/capture/service/capture-modal.service';
import { VeiculoGrupo, VeiculoGrupoData } from 'src/app/@core/data/grupo-veiculo';
import { read_VeiculoModeloGrupo, VeiculoModeloGrupo, VeiculoModeloGrupoData, VeiculoModeloGrupoFilter, VeiculoModeloGrupoSort } from 'src/app/@core/data/grupo-veiculo-modelo';
import { ControleVisitaAgenda, ControleVisitaAgendaData, ControleVisitaAgendaFilter, read_ControleVisitaAgenda } from 'src/app/@core/data/controle-visita-agenda';
import { VisitaAgendaModalService } from 'src/app/@theme/modals/agendamento/service/agendamento-modal.service';
import { AbordagemModal, AbordagemModalService } from 'src/app/@theme/modals/abordagem/service/abordagem-modal.service';
import { PessoaExternaModalService } from 'src/app/@theme/modals/pessoa-externa/service/pessoa-modal.service';
import { VeiculoExternoUsuario } from 'src/app/@core/data/usuario-veiculo-externo';
import { IdentificacaoConsecutivaModalService } from 'src/app/@theme/modals/identificacao-consecutiva/service/consecutiva.service';
import { NivelOperacaoService } from 'src/app/pages/configuracao/operador/nivel-operacao/service/nivel-operacao.service';
import { Operador } from 'src/app/@core/data/operador-nivel-operacao';
import { BoxPanel } from 'src/app/@theme/layouts';
import { Endereco, PessoaInternaUsuario, PessoaInternaUsuarioData, PessoaInternaUsuarioFilter, PessoaInternaUsuarioSort, read_PessoaInternaUsuario } from 'src/app/@core/data/usuario-pessoa-interna';
import { EstacaoDispositivo, EstacaoDispositivoData, EstacaoDispositivoFilter, EstacaoDispositivoSort, read_EstacaoDispositivo } from 'src/app/@core/data/dispositivo-estacao';
import { PessoaInternaModalService } from 'src/app/@theme/modals/pessoa-interna/service/pessoa-modal.service';
import { RegistroMaterialModalService } from 'src/app/@theme/modals/identificacao-registro-material/service/registro-material-modal.service';
import { IdentificacaoComplementoPessoaModalComponent } from 'src/app/@theme/modals';

@Component({
  selector: 'nex-identificacao',
  templateUrl: './identificacao.component.html',
  styleUrls: ['./identificacao.component.scss']
})
export class IdentificacaoComponent implements OnDestroy {

  registroVisita_Option: ComboOptions = new ComboOptions();
  processoVisita_Option: ComboOptions = new ComboOptions();

  complementoPessoaModal: IdentificacaoComplementoPessoaModalComponent = new IdentificacaoComplementoPessoaModalComponent();

  operador: Operador;
  nivelOperacaoService: NivelOperacaoService = new NivelOperacaoService(null);

  pessoaDocNumero_Pesquisa: boolean;

  id: number;
  identificador: number = 0;
  identificacaoControle: IdentificacaoControle;
  visitaAgendaId: number;
  pessoaVeiculos: VeiculoExternoUsuario[];
  estacao_Option: ComboOptions = new ComboOptions();

  pessoaDocTipo_Option: ComboOptions = new ComboOptions();
  pessoaDocNumero_Text: InputLabel = new InputLabel();
  pessoaNome_Text: InputLabel = new InputLabel();
  pessoaGrupo_Option: ComboOptions = new ComboOptions();
  pessoaTelefone_Text: InputLabel = new InputLabel();
  pessoaEmpresa_Option: ComboOptions = new ComboOptions();
  pessoaEmail_Text: InputLabel = new InputLabel();
  pessoaCargo_Text: InputLabel = new InputLabel();
  pessoaComplemento_Text: InputLabel = new InputLabel();

  pessoaVeiculo_Option: ComboOptions = new ComboOptions();
  pessoaVeiculo_Find: InputLabel = new InputLabel();
  pessoaVeiculoIdentificacao_Option: ComboOptions = new ComboOptions();
  pessoaVeiculoModelo_Option: ComboOptions = new ComboOptions();
  pessoaVeiculoCor_Option: ComboOptions = new ComboOptions();

  pessoaComplementos: {
    complemento?: {
      telefoneMovel?: string
      cargo?: string
      complemento2?: string
      complemento3?: string
      complemento4?: string
    }
    controle?: {
      nascimento?: string
      contratacaoInicio?: string
      contratacaoFim?: string
      integracaoInicio?: string
      integracaoFim?: string
      segurancaFim?: string
      segurancaInicio?: string
      exameMedicoInicio?: string
      exameMedicoFim?: string  
    }
    endereco?: Endereco
    observacao?: string
  }

  veiculoComplementos: { 
    complemento?: {
      grupo: VeiculoGrupo
      complemento1?: string
      complemento2?: string
      complemento3?: string
      complemento4?: string
    }
    observacao?: string
  }

  pessoaExternaAbordagem: any;

  identificacaoID_Text: InputLabel = new InputLabel();

  visitadoId: number = 0;
  visitadoAreaId: number = 0;
  visitadoAreaNome: string;
  visitadoImagem: any;
  visitadoComplemento: string;
  visitadoEmail: string;
  visitadoNome_Text: InputLabel = new InputLabel();
  visitadoGrupo_Text: InputLabel = new InputLabel();
  visitadoSetor_Text: InputLabel = new InputLabel();
  visitadoLocalizacao_Text: InputLabel = new InputLabel();
  visitadoTelefone_Text: InputLabel = new InputLabel();

  identificacaoMotivo_Option: ComboOptions = new ComboOptions();
  acessoValidadeFinal_Text: InputLabel = new InputLabel()
  acessoValidadeHoraFinal_Text: InputLabel = new InputLabel()
  identificacaoRecepcao_Option: ComboOptions = new ComboOptions();
  identificacaoObservacao_Text: InputLabel = new InputLabel();

  identificacaoCadastro_Text: InputLabel = new InputLabel();
  identificacaoEntrada_Text: InputLabel = new InputLabel();
  identificacaoSaida_Text: InputLabel = new InputLabel();

  acessoValidadeInicial_Text: InputLabel = new InputLabel()
  acessoValidadeHoraInicial_Text: InputLabel = new InputLabel();

  estado_Options: RadioOptions = new RadioOptions();

  abordagemInformativa_Text: TextareaLabel = new TextareaLabel();
  abordagemAdvertida_Text: TextareaLabel = new TextareaLabel();
  abordagemRestritiva_Text: TextareaLabel = new TextareaLabel();

  listView_Identificacao: ListViewGrid = new ListViewGrid();
  listView_IdentificacaoMaterial: ListViewGrid = new ListViewGrid();
  listView_PessoaGrid: Grid[];

  siteId: number;
  siteNome: string;
  recepcao: RecepcaoReparticao;
  periodoId: string;

  pessoaId: number;
  pessoaTipo: number;
  pessoaImagem: Array<number>;

  centroCustoId: number = 0;
  centroCustoNome: string;

  settings: BehaviorSubject<any>;
  savedCondition: boolean = false;
  treeviewItem: BehaviorSubject<any>;
  excludeSelect: string;
  dateOperator: DateOperator = new DateOperator();

  filterSchema: filterSchema;
  filterPessoaInterna: PessoaInternaUsuarioFilter;
  filterPessoaExterna: PessoaExternaUsuarioFilter;

  filterVisitaAgendada: ControleVisitaAgendaFilter;
  filterGrid: IdentificacaoControleFilter;

  cardTabs_Options: CardTabsOptions = new CardTabsOptions();

  pessoaModalService: PessoaInternaModalService = new PessoaInternaModalService();
  pessoaExternaModalService: PessoaExternaModalService = new PessoaExternaModalService();
  visitaAgendadaModalService: VisitaAgendaModalService = new VisitaAgendaModalService();
  errosModalService: ErrosModalService = new ErrosModalService();
  captureModalService: CaptureModalService = new CaptureModalService();
  abordagemModalService: AbordagemModalService = new AbordagemModalService();
  identificacaoConsecutivaModalService: IdentificacaoConsecutivaModalService = new IdentificacaoConsecutivaModalService();
  registroMaterialModalService: RegistroMaterialModalService = new RegistroMaterialModalService();

  modalService: ModalService = new ModalService();

  identificacaoComplementoPessoaModal: IdentificacaoComplementoPessoaModalComponent = new IdentificacaoComplementoPessoaModalComponent();

  agendaButtonDisabled: boolean = false;
  cameraButtonDisabled: boolean = false;
  captureDone: boolean = false;

  boxButton: BoxPanel = new BoxPanel();

  gridSubscribe: Subscription;

  showSpinner: boolean = false;

  textMaskChar: string = "***************************************";
  cancelaIdentificacao: boolean = false;

  pessoaEmpresaLabel: string = "Empresa";

  alertService: AlertServiceComponent = new AlertServiceComponent();

  constructor(public actionbuttomService: ActionButtomService,
    private identificacaoControleService: IdentificacaoControleData,
    private documentoGrupoService: DocumentoGrupoData,
    private motivoGrupoService: IdentificacaoGrupoData,
    private recepcaoService: RecepcaoData,
    private pessoaGrupoService: PessoaGrupoData,
    private veiculoGrupoService: VeiculoGrupoData,
    private veiculoModeloService: VeiculoModeloGrupoData,
    private reparticaoEmpresaService: EmpresaReparticaoData,
    private pessoaExternaService: PessoaExternaUsuarioData,
    private pessoaInternaService: PessoaInternaUsuarioData,
    private controleVisitaAgenda: ControleVisitaAgendaData,
    private config: ConfigStorage,
    private estacaoDispositvoService: EstacaoDispositivoData,
    private treeviewService: TreeviewService) {

    this.captureModalService.name = "captureModal";

    this.boxButton.add("btInsert", "insert", false);
    this.boxButton.add("btDelete", "delete", false);

    this.operador = this.nivelOperacaoService.getOperadorNome();

    this.cardTabs_Options.add({ id: 1, name: 'pessoa', text: 'Pessoa' });
    this.cardTabs_Options.add({ id: 2, name: 'material', text: 'Material' });
    this.cardTabs_Options.add({ id: 4, name: 'abordagem', text: 'Abordagem' });
    this.cardTabs_Options.selectButtonByID(1);

    this.settings = this.config.siteSubject();
    this.treeviewItem = this.treeviewService.itemSubject();

    this.pessoaModalService.name = "pessoaModal";
    this.pessoaModalService.pesquisaPessoa_Option.name = "cbPesquisa";
    this.pessoaModalService.grid = [
      { "header": "Nome", "field": "nome", "width": 50, "align": "left" },
      { "header": "Área", "entity": "area", "field": "nome", "width": 25, "align": "left" },
      { "header": "Setor", "entity": ["area", "setor"], "field": "nome", "width": 25, "align": "left" }];

    this.pessoaExternaModalService.name = "pessoaExternaModal";
    this.pessoaExternaModalService.pesquisaPessoa_Option.name = "cbPesquisaExterna";
    this.pessoaExternaModalService.grid = [{ "header": "Nome", "field": "nome", "width": 42, "align": "left" },
      { "header": "Documento", "field": "documentoNumero", "width": 18, "align": "left" },
      { "header": "Telefone", "field": "telefoneFixo", "width": 20, "align": "left" },
      { "header": "E-mail", "field": "email", "width": 20, "align": "left" },];

    this.visitaAgendadaModalService.name = "visitaAgendaModal";
    this.visitaAgendadaModalService.pesquisaVisitaAgenda_Option.name = "cbPesquisaAgenda";
    this.visitaAgendadaModalService.grid = [{ "header": "Nome", "field": "pessoaNome", "width": 45, "align": "left" },
      { "header": "CPF", "field": "pessoaCPF", "width": 15, "align": "left" },
      { "header": "Documento", "field": "pessoaDocNumero", "width": 25, "align": "left" },
      { "header": "Validade Agendamento", "field": "agendamentoValidadeFinal", "width": 30, "align": "left", "pipe": "dd/MM/yyyy HH:mm" },
      { "header": "Cadastro Agendamento", "field": "agendamentoDataHora", "width": 30, "align": "left", "pipe": "dd/MM/yyyy HH:mm" },
      { "header": "Grupo", "field": "pessoaGrupo", "width": 20, "align": "left" },
      { "header": "Veículo Modelo", "field": "veiculoModelo", "width": 25, "align": "left" },
      { "header": "Veículo Placa", "field": "veiculoIdentificacao", "width": 15, "align": "left" },
      { "header": "Veículo Cor", "field": "veiculoCor", "width": 15, "align": "left" },
      { "header": "Motivo do Acesso", "field": "motivo", "width": 35, "align": "left" },
      { "header": "Nome do Visitado", "field": "visitadoNome", "width": 40, "align": "left" },
      { "header": "Empresa Visitado", "field": "visitadoAreaNome", "width": 40, "align": "left" },
      { "header": "Localização Visitado", "field": "visitadoLocalizacao", "width": 30, "align": "left" },
      { "header": "Central Visitado", "field": "visitadoComplemento", "width": 35, "align": "left" },
      { "header": "Observação", "field": "observacao", "width": 35, "align": "left" }];

    this.errosModalService.relationGrid = "lstSite";

    this.abordagemModalService.name = "abordagemModal";

    let actionButtonsVisibles: {
      create: boolean, update: boolean, read: boolean,
      suspend: boolean, cancel: boolean, end: boolean
    } = {
      create: true, update: true,
      read: true, suspend: true, cancel: true, end: true
    };

    this.filterGrid = null;

    this.actionbuttomService.recurso = "56";
    this.actionbuttomService.relationGrid = "lstIdentificacao";
    this.actionbuttomService.top_action_buttons = [{ "id": 0, "text": "forms.buttons.create", "enabled": actionButtonsVisibles.create, "visibled": false, "condition": "always", "openForm": true, "maximized": true, "editable": "new" },
      { "id": 1, "text": "forms.buttons.update", "enabled": actionButtonsVisibles.update, "visibled": false, "condition": "multi", "openForm": true, "maximized": true, "editable": "yes" },
      { "id": 2, "text": "forms.buttons.read", "enabled": actionButtonsVisibles.read, "visibled": false, "condition": "select", "openForm": true, "maximized": true, "editable": "no" },
      { "id": 3, "text": "forms.buttons.suspend", "enabled": actionButtonsVisibles.suspend, "visibled": false, "condition": "select", "openForm": false, "maximized": false, "editable": "no", "question": "forms.questions.suspend" },
      { "id": 4, "text": "forms.buttons.cancel", "enabled": actionButtonsVisibles.cancel, "visibled": false, "condition": "select", "openForm": false, "maximized": false, "editable": "no", "question": "forms.questions.cancel" },
      { "id": 5, "text": "forms.buttons.end", "enabled": actionButtonsVisibles.end, "visibled": false, "condition": "select", "openForm": false, "maximized": false, "editable": "no", "question": "forms.questions.end" }]

    this.listView_Identificacao.name = "lstIdentificacao";
    this.listView_Identificacao.title = "Identificação";
    this.listView_Identificacao.grid = [{ "header": "Visitante", "field": "pessoaNome", "width": 25, "align": "left" },
      { "header": "Visitado", "field": "visitadoNome", "width": 25, "align": "left" },
      { "header": "Visita", "field": "identificacaoDataHora", "width": 17, "align": "left", "pipe": "dd/MM/yyyy HH:mm:ss" },
      { "header": "Entrada", "field": "acessoDataHoraEntrada", "width": 13, "align": "left", "pipe": "dd/MM/yyyy HH:mm:ss" },
      { "header": "Área", "field": "acessoLocalEntrada", "width": 20, "align": "left" }];

    this.listView_IdentificacaoMaterial.name = "lstIdentificacaoMaterial";
    this.listView_IdentificacaoMaterial.gridOnly = true;
    this.listView_IdentificacaoMaterial.noPaging = true;
    this.listView_IdentificacaoMaterial.noBorder = true;
    this.listView_IdentificacaoMaterial.grid = [{ "header": "Material", "field": "material", "width": 30, "align": "left" },
      { "header": "Quantidade", "field": "quantidade", "width": 10, "align": "left" },
      { "header": "Nota Fiscal", "field": "notaFiscal", "width": 15, "align": "left" },
      { "header": "Observação", "field": "observacao", "width": 45, "align": "left" },]

    this.registroVisita_Option.name = "cbRegistroVisita";
    this.registroVisita_Option.addRange<Item>(identificacaoControleService.registro);

    this.processoVisita_Option.name = "cbProcessoVisita";
    this.processoVisita_Option.addRange<Item>(identificacaoControleService.processo);


    this.identificacaoID_Text.name = "txtIdentificacaoID";
    this.identificacaoID_Text.rules = "lettersNumbers";
    this.identificacaoID_Text.maxLength = 15;
    this.identificacaoID_Text.minLength = 1;

    this.estacao_Option.name = "cbEstacaoIdentificacao";

    this.pessoaDocTipo_Option.name = "cbPessoaDocumento";

    this.pessoaDocNumero_Text.name = "txtPessoaDocNumero";
    this.pessoaDocNumero_Text.rules = "lettersNumbers";
    this.pessoaDocNumero_Text.maxLength = 15;
    this.pessoaDocNumero_Text.minLength = 1;

    this.pessoaNome_Text.name = "txtPessoaNome"
    this.pessoaNome_Text.rules = "uppercase";
    this.pessoaNome_Text.maxLength = 50;
    this.pessoaNome_Text.minLength = 3;

    this.pessoaGrupo_Option.name = "cbPessoaGrupo";
    this.grupoPopulate();

    this.pessoaTelefone_Text.name = "txtPessoaTelefone";
    this.pessoaTelefone_Text.rules = "telfixo";
    this.pessoaTelefone_Text.regex = "noFilter";
    this.pessoaTelefone_Text.maxLength = 15;

    this.pessoaEmpresa_Option.name = "cbPessoaEmpresa";
    this.pessoaEmpresa_Option.maxLength = 30;

    this.pessoaEmail_Text.name = "txtPessoaEmail";
    this.pessoaEmail_Text.rules = "email";
    this.pessoaEmail_Text.regex = "email";
    this.pessoaEmail_Text.maxLength = 50;

    this.pessoaCargo_Text.name = "txtPessoaCargo";
    this.pessoaCargo_Text.rules = "uppercase";
    this.pessoaCargo_Text.minLength = 1;
    this.pessoaCargo_Text.maxLength = 20;

    this.pessoaComplemento_Text.name = "txtPessoaComplemento"
    this.pessoaComplemento_Text.rules = "uppercase";
    this.pessoaComplemento_Text.maxLength = 50;

    // Dados do Veículo

    this.pessoaVeiculo_Option.name = "cbPessoaVeiculo";
    this.pessoaVeiculo_Option.add("", "", 0);
    this.pessoaVeiculo_Option.addRange<Item>(this.veiculoGrupoService.veiculoTipo);

    this.pessoaVeiculoIdentificacao_Option.name = "cbPessoaVeiculoIdentificacao";
    this.pessoaVeiculoIdentificacao_Option.maxLength = 7;

    this.pessoaVeiculoModelo_Option.name = "cbPessoaVeiculoModelo";

    this.pessoaVeiculoCor_Option.name = "cbPessoaVeiculoCor";
    this.pessoaVeiculoCor_Option.add("", "5", 0);
    this.pessoaVeiculoCor_Option.addRange<Item>(this.veiculoGrupoService.veiculoCor);

    // Dados do Visitado

    this.visitadoNome_Text.name = "txtVistadoNome";
    this.visitadoNome_Text.maxLength = 50;
    this.visitadoNome_Text.minLength = 3;
    this.visitadoNome_Text.rules = "uppercase";

    this.visitadoGrupo_Text.name = "txtVisitadoGrupo";
    this.visitadoGrupo_Text.rules = "uppercase";
    this.visitadoGrupo_Text.disabled = true;

    this.visitadoLocalizacao_Text.name = "txtVisitadoLocalizacao";
    this.visitadoLocalizacao_Text.rules = "uppercase";
    this.visitadoLocalizacao_Text.disabled = true;

    this.visitadoSetor_Text.name = "txtVisitadoSetor";
    this.visitadoSetor_Text.rules = "uppercase";
    this.visitadoSetor_Text.disabled = true;

    this.visitadoTelefone_Text.name = "txtVisitadoTelefone";
    this.visitadoTelefone_Text.rules = "uppercase";
    this.visitadoTelefone_Text.disabled = true;

    // Dados da Visita

    this.identificacaoMotivo_Option.name = "cbMotivo";
    this.identificacaoMotivo_Option.maxLength = 30;
    this.identificacaoMotivo_Option.add("", "", 0);

    this.identificacaoCadastro_Text.name = "txtIdenfiticacaoCadastro";
    this.identificacaoCadastro_Text.rules = "string";
    this.identificacaoCadastro_Text.disable();

    this.identificacaoEntrada_Text.name = "txtIdentificaoEntrada";
    this.identificacaoEntrada_Text.disable();

    this.identificacaoSaida_Text.name = "txtIdentificaoSaida"
    this.identificacaoSaida_Text.disable();

    this.acessoValidadeFinal_Text.name = "txtAcessoValidadeFinal";
    this.acessoValidadeFinal_Text.maxLength = 10;
    this.acessoValidadeFinal_Text.rules = "date";
    this.acessoValidadeFinal_Text.regex = "date";
    this.acessoValidadeFinal_Text.textAlign = "center";

    this.acessoValidadeHoraFinal_Text.name = "txtAcessoValidadeHoraFinal";
    this.acessoValidadeHoraFinal_Text.maxLength = 5;
    this.acessoValidadeHoraFinal_Text.rules = "time";
    this.acessoValidadeHoraFinal_Text.regex = "time";
    this.acessoValidadeHoraFinal_Text.textAlign = "center";

    this.identificacaoRecepcao_Option.name = "cbRecepcao";

    this.identificacaoObservacao_Text.name = "txtObservacao";
    this.identificacaoObservacao_Text.maxLength = 250;
    this.identificacaoObservacao_Text.rules = "uppercase";

    this.acessoValidadeInicial_Text.name = "txtAcessoValidadeFinal";
    this.acessoValidadeInicial_Text.maxLength = 10;
    this.acessoValidadeInicial_Text.rules = "date";
    this.acessoValidadeInicial_Text.regex = "date";
    this.acessoValidadeInicial_Text.textAlign = "center";

    this.acessoValidadeHoraInicial_Text.name = "txtAcessoValidadeHoraInicial";
    this.acessoValidadeHoraInicial_Text.maxLength = 5;
    this.acessoValidadeHoraInicial_Text.rules = "time";
    this.acessoValidadeHoraInicial_Text.regex = "time";
    this.acessoValidadeHoraInicial_Text.textAlign = "center";

    // Dados da Abordagem

    this.abordagemInformativa_Text.name = "txtAbordagemInformativa";
    this.abordagemInformativa_Text.maxLength = 500;

    this.abordagemAdvertida_Text.name = "txtAbordagemAdvertida";
    this.abordagemAdvertida_Text.maxLength = 500;
    this.abordagemAdvertida_Text.disabled = true;


    this.abordagemRestritiva_Text.name = "txtAbordagemRestritiva";
    this.abordagemRestritiva_Text.maxLength = 500;
    this.abordagemRestritiva_Text.disabled = true;

    this.estado_Options.name = "rdEstado";
    this.estado_Options.add(StateGrid.LIVRE, 'Livre', StateGrid[StateGrid.LIVRE].toUpperCase(), true);
    this.estado_Options.add(StateGrid.BLOQUEADA, 'Bloqueado', StateGrid[StateGrid.BLOQUEADA].toUpperCase(), false);
    this.estado_Options.disable();

    this.settings
      .subscribe((data: SiteConfig) => {
        if (data != null) {
          sessionStorage.removeItem("recepcao");
          this.siteId = data.id;
          this.siteNome = data.nome;

          this.filterSchema = this.identificacaoControleService
            .getFilterSchema(this.periodoId, this.siteId, this.operador.id);
          this.filterSchema.first = 128;

          if (this.filterSchema.filter) this.update_Grid();
          if (this.filterSchema.filterArq) this.updateArq_Grid();

          this.recepcaoPopulate();
        }
      });

    this.treeviewItem
      .subscribe((periodoId: string) => {
        switch (periodoId) {
          case Identificacao.recente:
          case Identificacao.vigente:
          case Identificacao.provisoria:
            this.actionbuttomService.showHideButton(63);
            break;

          case Identificacao.expirada:
            this.actionbuttomService.showHideButton(60);
            break;

          case Identificacao.suspensa:
            this.actionbuttomService.showHideButton(52);
            break;

          case Identificacao.cancelada_dia:
          case Identificacao.cancelada_semana:
          case Identificacao.cancelada_mes:
          case Identificacao.cancelada_periodo:
          case Identificacao.encerrada_dia:
          case Identificacao.encerrada_semana:
          case Identificacao.encerrada_mes:
          case Identificacao.encerrada_periodo:
          case Identificacao.historico_dia:
          case Identificacao.historico_semana:
          case Identificacao.historico_mes:
          case Identificacao.historico_periodo:
            this.actionbuttomService.showHideButton(4);
            break;

          default:
            periodoId = null;
            this.actionbuttomService.showHideButton(0);
            this.listView_Identificacao.title = "Identificação";
            // this.listView_Identificacao.clear();
            break;

        }
        this.periodoId = periodoId;
        this.filterSchema = this.identificacaoControleService.getFilterSchema(this.periodoId, this.siteId, this.operador.id)
        if (this.filterSchema.filter) this.update_Grid();
        if (this.filterSchema.filterArq) this.updateArq_Grid();
        if (this.filterSchema.filter || this.filterSchema.filterArq) this.listView_Identificacao.title = this.filterSchema.title;
      });

  }

  dataForm_Clean(focus: boolean = true) {
    const dateInicial = new Date().toLocaleDateString("pt-br");
    const HoraInicial = new Date().toTimeString().substr(0, 5);

    this.captureDone = false;

    this.pessoaId = 0;
    this.pessoaTipo = PessoaTipo.externa;
    this.pessoaImagem = null;

    this.visitadoId = 0;
    this.visitadoImagem = null;
    this.visitadoNome_Text.clear(true);
    this.visitadoGrupo_Text.clear();
    this.visitadoLocalizacao_Text.clear();
    this.visitadoSetor_Text.clear();
    this.visitadoTelefone_Text.clear();
    this.visitadoAreaId = 0;
    this.visitadoAreaNome = null;
    this.visitaAgendaId = 0;
    this.visitadoEmail = null;
    this.visitadoComplemento = null;

    this.centroCustoId = 0;
    this.centroCustoNome = "";
    this.identificador = null;

    this.id = undefined;
    this.pessoaNome_Text.clear(true);

    if (focus) {
      this.documentoPopulate();
      this.pessoaDocTipo_Option.enable();
      this.pessoaDocNumero_Text.clear(true);
      this.registroVisita_Option.select(Registro.visita);
      this.registroVisita_Option.enable();
    } else {
      this.registroVisita_Option.disable();
    }

    this.pessoaTelefone_Text.clear(true);
    this.pessoaEmpresa_Option.clear(true);
    this.pessoaEmail_Text.clear(true);
    this.pessoaCargo_Text.clear(true);
    this.pessoaComplemento_Text.clear(true);

    this.pessoaVeiculo_Option.select(VeiculoTipo.CARRO);
    this.pessoaVeiculoIdentificacao_Option.clear(true);

    this.modeloVeiculoPopulate();
    this.pessoaVeiculoCor_Option.select(0);

    this.motivoPopulate();
    this.identificacaoObservacao_Text.clear();

    this.identificacaoCadastro_Text.clear();
    this.identificacaoEntrada_Text.clear();
    this.identificacaoSaida_Text.clear();

    this.acessoValidadeInicial_Text.setTextWithMask(dateInicial);
    this.acessoValidadeFinal_Text.setTextWithMask(dateInicial);
    this.acessoValidadeHoraInicial_Text.setTextWithMask(HoraInicial);
    this.acessoValidadeHoraFinal_Text.setTextWithMask("23:59");

    this.cardTabs_Options.selectButtonByID(1);

    this.abordagemInformativa_Text.clear();
    this.abordagemAdvertida_Text.clear();
    this.abordagemRestritiva_Text.clear();

    this.listView_IdentificacaoMaterial.clear();

    this.pessoaExternaAbordagem = { mensagemInformativa: "", mensagemAdvertida: "", mensagemRestritiva: "" };
    this.estado_Options.select(StateGrid.LIVRE);

    this.cardTabs_Options.setCondition('abordagem', AbordagemTipo.nenhum);

    const recepcao: Item = JSON.parse(sessionStorage.getItem("recepcao"));
    if (recepcao == null) {
      this.getRecepcao();
    } else {
      this.getRecepcao(focus);
    }

    this.onSaved_Condition();

  }

  dataForm_EnableAll() {
    this.pessoaGrupo_Option.enable();
    this.pessoaTelefone_Text.enable();
    this.pessoaEmpresa_Option.enable();
    this.pessoaEmail_Text.enable();
    this.pessoaCargo_Text.enable();
    this.pessoaComplemento_Text.enable();
  }

  async empresaPopulate(selectId?: number, selectValue?: string, tipoPessoa?: number, pessoaGrupo?: string) {
    this.pessoaEmpresa_Option.clear();

    if (this.registroVisita_Option.itemSelected.id == Registro.prestadorServico &&
      tipoPessoa != PessoaTipo.interna && pessoaGrupo != "PRESTADOR EVENTUAL") {
      const sortEmpresaReparticao: EmpresaReparticaoSort = { nome: SortOperationKind.ASC };
      const filterEmpresaReparticao: EmpresaReparticaoFilter = null;

      this.pessoaEmpresa_Option.add("", null, 0);

      await this.reparticaoEmpresaService.readEmpresaReparticaos(sortEmpresaReparticao, filterEmpresaReparticao)
        .subscribe(({ reparticaoEmpresa }: read_EmpresaReparticao) => {
          const nodes: EmpresaReparticao[] = reparticaoEmpresa.nodes;
          nodes.forEach((node: EmpresaReparticao) => {
            this.pessoaEmpresa_Option.add(node.nome, node.nome, node.id);
          });

          if (selectId || selectValue)
            this.pessoaEmpresa_Option.select(selectId, selectValue);

        })
    } else {

      if (selectValue) {
        this.pessoaEmpresa_Option.add(selectValue, null, 0);
        this.pessoaEmpresa_Option.select(0);
      }
    }
  }

  recepcaoPopulate() {
    const sortRecepcao: RecepcaoReparticaoSort = { nome: SortOperationKind.ASC };
    const filterRecepcao: RecepcaoReparticaoFilter = { siteId: { eq: this.siteId } }

    this.recepcaoService.readRecepcaoReparticao(sortRecepcao, filterRecepcao)
      .subscribe(({ reparticaoRecepcao }: read_RecepcaoReparticao) => {
        const nodes: RecepcaoReparticao[] = reparticaoRecepcao.nodes;
        this.identificacaoRecepcao_Option.clear();
        this.identificacaoRecepcao_Option.addRange(nodes.map(recepcao => {
          return { id: recepcao.id, text: recepcao.nome, value: recepcao.nome }
        }));

        this.estacaoPopulate();
      });

  }

  estacaoPopulate() {
    const recepcaoId: number = this.identificacaoRecepcao_Option.itemSelected.id;
    const estacaoFilter: EstacaoDispositivoFilter = {
      or: [{ recepcao: { id: { eq: recepcaoId } } },
      { tipo: { eq: 1 }, siteId: { eq: this.siteId } }]
    };
    const estacaoSort: EstacaoDispositivoSort = { nome: SortOperationKind.ASC };
    this.estacaoDispositvoService.readEstacaoDispositivo(estacaoSort, estacaoFilter)
      .subscribe(({ dispositivoEstacao }: read_EstacaoDispositivo) => {
        this.estacao_Option.clear();
        const nodes: EstacaoDispositivo[] = dispositivoEstacao.nodes;
        nodes.forEach((node: EstacaoDispositivo) => {
          this.estacao_Option.add(node.nome, node.nome, node.id);
        })
      });
  }

  getRecepcao(focus: boolean = false) {
    const recepcaoSelect: Item = this.identificacaoRecepcao_Option.itemSelected;

    sessionStorage.setItem("recepcao", JSON.stringify(recepcaoSelect));
    const sortRecepcao: RecepcaoReparticaoSort = { nome: SortOperationKind.ASC };
    const filterRecepcao: RecepcaoReparticaoFilter = { id: { eq: recepcaoSelect.id } }

    this.recepcaoService.readRecepcaoReparticao(sortRecepcao, filterRecepcao)
      .subscribe(({ reparticaoRecepcao }: read_RecepcaoReparticao) => {
        const recepcao: RecepcaoReparticao = reparticaoRecepcao.nodes[0];

        this.dataForm_EnableAll();

        this.recepcao = recepcao;

        this.captureModalService.required = (this.recepcao.capturarImagem >= 1 && !this.captureDone);
        this.pessoaComplemento_Text.disabled = !this.recepcao.campoComplemento;
        this.pessoaEmpresa_Option.disabled = !this.recepcao.campoEmpresa;
        this.pessoaEmail_Text.disabled = !this.recepcao.campoEmail;
        this.pessoaTelefone_Text.disabled = !this.recepcao.campoTelefone;
        this.identificacaoMotivo_Option.disabled = !this.recepcao.campoMotivo;
        this.identificacaoObservacao_Text.disabled = !this.recepcao.campoObservacao;

        switch (this.registroVisita_Option.itemSelected.id) {
          case Registro.visita:

            if (focus) this.pessoaDocTipo_Option.select(this.recepcao.visitanteTipoDocId);
            if (this.visitaAgendaId == 0) this.identificacaoMotivo_Option.select(this.recepcao.visitanteMotivoId);

            if (focus) {
              this.documentoPopulate(this.recepcao.visitanteTipoDocId);
              this.empresaPopulate();
              this.pessoaGrupo_Option.select(this.recepcao.visitanteGrupoId);
              this.agendaButtonDisabled = false;
              this.cameraButtonDisabled = false;

              if (this.visitaAgendaId == 0) this.motivoPopulate(this.recepcao.visitanteMotivoId);
            }

            this.pessoaCargo_Text.disable();

            break;
          case Registro.prestadorServico:

            if (focus) this.pessoaDocTipo_Option.select(this.recepcao.prestadorTipoDocId);
            if (this.visitaAgendaId == 0) this.identificacaoMotivo_Option.select(this.recepcao.prestadorMotivoId);

            if (focus) {
              this.documentoPopulate(this.recepcao.prestadorTipoDocId);
              this.empresaPopulate();
              this.pessoaGrupo_Option.select(this.recepcao.prestadorGrupoId);
              this.agendaButtonDisabled = false;
              this.cameraButtonDisabled = false;

              if (this.visitaAgendaId == 0) this.motivoPopulate(this.recepcao.prestadorMotivoId);

            }

            if (this.pessoaTipo == PessoaTipo.interna || this.visitaAgendaId > 0) {
              this.pessoaGrupo_Option.disable();
              this.pessoaTelefone_Text.disable();
              this.pessoaEmpresa_Option.disable();
              this.pessoaEmail_Text.disable();
              this.pessoaComplemento_Text.disable();

              if (this.visitaAgendaId > 0) {
                this.pessoaDocTipo_Option.disable();
                this.pessoaDocNumero_Text.disable();
                this.pessoaNome_Text.disable();
              }

              if (this.visitaAgendaId > 0 || this.pessoaTipo == 1) {
                this.pessoaCargo_Text.disable();
              } 
            }

            break;
          case Registro.provisorio:

            this.identificacaoMotivo_Option.select(this.recepcao.internoMotivoId);
            if (focus) this.pessoaDocTipo_Option.select(this.recepcao.internoTipoDocId);

            if (focus) {
              this.documentoPopulate(this.recepcao.internoTipoDocId);
              this.pessoaEmpresa_Option.disable(null, focus);
              this.grupoPopulate();
              this.motivoPopulate(this.recepcao.internoMotivoId);
            }

            this.pessoaGrupo_Option.disable();
            this.pessoaEmpresa_Option.disable();

            this.pessoaTelefone_Text.disable();
            this.pessoaEmail_Text.disable();
            this.pessoaCargo_Text.disable();
            this.pessoaComplemento_Text.disable();

            this.agendaButtonDisabled = true;
            this.cameraButtonDisabled = true;

            break;
        }

        this.identificador = recepcao.identificador;
        if (focus) {
          switch (recepcao.iniciarCadastro) {
            case IniciaCadastro.documento:
              this.pessoaDocNumero_Text.focus();
              break;
            case IniciaCadastro.nomePessoa:
              this.pessoaNome_Text.focus();
              break;
          };
        }
      });
  }

  async grupoPopulate(selectId: number = null, grupo: string = null) {
    const sortGrupoPessoa: PessoaGrupoSort = { id: SortOperationKind.ASC };

    let filterGrupoPessoa: PessoaGrupoFilter;
    if (this.pessoaTipo == PessoaTipo.interna) {
      if (grupo != null) {
        filterGrupoPessoa = { pessoaGrupo: { eq: grupo } };
        await this.pessoaGrupoService.readPessoaGrupos(sortGrupoPessoa, filterGrupoPessoa)
          .subscribe(({ grupoPessoa }: read_PessoaGrupo) => {
            const nodes: PessoaGrupo[] = grupoPessoa.nodes;
            if (nodes.length > 0) {
              this.pessoaGrupo_Option.clear()
              nodes.forEach((node: PessoaGrupo) => {
                this.pessoaGrupo_Option.add(node.pessoaGrupo, node.pessoaGrupo, node.id);
              })

              if (grupo != null) this.pessoaGrupo_Option.selectbyValue(grupo);

            } else {
              this.errosModalService.show("Identificação de " + this.registroVisita_Option.itemSelected.text,
                "Pessoa interna com inconsistência no cadastro. Verifique! [GRUPO INVÁLIDO]", "clear");
            }
          });
      } else {
        this.pessoaGrupo_Option.add("", null, 0);
        this.pessoaGrupo_Option.select(0);
      }

    } else {
      const registroSelectId: number = this.registroVisita_Option.itemSelected.id;
      filterGrupoPessoa = (registroSelectId == Registro.visita) ? { pessoaVisitante: { eq: true } } :
        { pessoaPrestador: { eq: true } };

      this.pessoaGrupoService.readPessoaGrupos(sortGrupoPessoa, filterGrupoPessoa)
        .subscribe(({ grupoPessoa }: read_PessoaGrupo) => {
          const nodes: PessoaGrupo[] = grupoPessoa.nodes;
          if (nodes.length > 0) {
            this.pessoaGrupo_Option.clear()
            nodes.forEach((node: PessoaGrupo) => {
              this.pessoaGrupo_Option.add(node.pessoaGrupo, node.pessoaGrupo, node.id);
            })

            if (selectId != null) {
              this.pessoaGrupo_Option.select(selectId);
            } else {
              if (grupo != null) this.pessoaGrupo_Option.selectbyValue(grupo);
            }
          }
        });
    }

  }

  async modeloVeiculoPopulate(selectModelo?: string) {
    const sortModeloVeiculoGrupo: VeiculoModeloGrupoSort = { veiculoModelo: SortOperationKind.ASC };
    const filterModeloVeiculoGrupo: VeiculoModeloGrupoFilter = null;

    await this.veiculoModeloService.readVeiculoModeloGrupos(sortModeloVeiculoGrupo, filterModeloVeiculoGrupo)
      .subscribe(({ grupoVeiculoModelo }: read_VeiculoModeloGrupo) => {
        const nodes: VeiculoModeloGrupo[] = grupoVeiculoModelo.nodes;
        this.pessoaVeiculoModelo_Option.clear()
        this.pessoaVeiculoModelo_Option.add("", "", 0);
        nodes.forEach((node: VeiculoModeloGrupo) => {
          this.pessoaVeiculoModelo_Option.add(node.veiculoModelo, node.veiculoModelo, node.id);
        })
        if (selectModelo) {
          this.pessoaVeiculoModelo_Option.selectbyValue(selectModelo);
          if (this.pessoaVeiculoModelo_Option.itemSelected.id = 0) {
            this.pessoaVeiculoModelo_Option.itemSelected.text = selectModelo;
            this.pessoaVeiculoModelo_Option.itemSelected.value = selectModelo;
          }
        } else {
          this.pessoaVeiculoModelo_Option.select(0);
        }
      });

  }

  async documentoPopulate(selectId?: number, filter?: string) {
    const sortDocumentoGrupo: DocumentoGrupoSort = { id: SortOperationKind.ASC };
    let filterDocumentoGrupo: DocumentoGrupoFilter;

    console.log(filter, this.registroVisita_Option.itemSelected.id);

    switch (this.registroVisita_Option.itemSelected.id) {
      case Registro.visita:
        filterDocumentoGrupo = { visitante: { eq: true } };
        break;
      case Registro.prestadorServico:
        filterDocumentoGrupo = { prestador: { eq: true } };
        break;
      case Registro.provisorio:
        filterDocumentoGrupo = { interno: { eq: true } };
        break;
    }

    this.documentoGrupoService.readDocumentoGrupos(sortDocumentoGrupo, filterDocumentoGrupo)
      .subscribe(({ grupoDocumento }: read_DocumentoGrupo) => {
        const nodes: DocumentoGrupo[] = grupoDocumento.nodes;
        this.pessoaDocTipo_Option.clear()
        nodes.forEach((node: DocumentoGrupo) => {
          this.pessoaDocTipo_Option.add(node.tipo, node.tipo, node.id);

          if (selectId) {
            this.pessoaDocTipo_Option.select(selectId);
          } else {
            if (filter) {
              this.pessoaDocTipo_Option.selectbyValue(filter);
            }
          }
        });
      });

  }

  async motivoPopulate(selectId?: number, filter?: string) {
    const sortMotivoGrupo: IdentificacaoGrupoSort = { motivo: SortOperationKind.ASC };
    let filterMotivoGrupo: IdentificacaoGrupoFilter;

    switch (this.registroVisita_Option.itemSelected.id) {
      case Registro.visita:
        filterMotivoGrupo = { visitante: { eq: true } };
        break;
      case Registro.prestadorServico:
        filterMotivoGrupo = { prestador: { eq: true } };
        break;
      case Registro.provisorio:
        filterMotivoGrupo = { interno: { eq: true } };
        break;
    }

    await this.motivoGrupoService.readIdentificacaoGrupos(sortMotivoGrupo, filterMotivoGrupo)
      .subscribe(({ grupoIdentificacaoMotivo }: read_IdentificacaoGrupo) => {
        const nodes: IdentificacaoGrupo[] = grupoIdentificacaoMotivo.nodes;

        this.identificacaoMotivo_Option.clear()
        nodes.forEach((node: IdentificacaoGrupo) => {
          this.identificacaoMotivo_Option.add(node.motivo, node.tempoPrimeiroAcesso.toString(), node.id);
        });

        if (selectId) {
          this.identificacaoMotivo_Option.select(selectId);
        } else {
          if (filter) {
            const index: number = this.identificacaoMotivo_Option.itens.findIndex(motivo => motivo.text == filter);
            if (index >= 0) {
              this.identificacaoMotivo_Option.selectbyValue(filter)
            } else {
              this.identificacaoMotivo_Option.select(0);
              this.identificacaoMotivo_Option.itemSelected.text = filter;
              this.identificacaoMotivo_Option.itemSelected.value = "5";
            }
          }
        }
      });
  }

  onAbordagem_Alert(abordagemMensagens: any, focus: string, showAbordagem: boolean = true) {
    if (abordagemMensagens) {

      this.abordagemInformativa_Text.text = (this.nivelOperacaoService.checkAcessRights("67", 1)) ?
        abordagemMensagens.mensagemInformativa : abordagemMensagens.mensagemInformativa.length > 0 ?
          "***************************************" : "";
      this.abordagemAdvertida_Text.text = (this.nivelOperacaoService.checkAcessRights("68", 1)) ?
        abordagemMensagens.mensagemAdvertida : abordagemMensagens.mensagemAdvertida.length > 0 ?
          "***************************************" : "";
      this.abordagemRestritiva_Text.text = (this.nivelOperacaoService.checkAcessRights("69", 1)) ?
        abordagemMensagens.mensagemRestritiva : abordagemMensagens.mensagemRestritiva.length > 0 ?
          "***************************************" : "";

      this.abordagemInformativa_Text.disabled = !this.nivelOperacaoService.checkAcessRights("67", 0);

      let abordagens: AbordagemModal[] = [];

      if (abordagemMensagens.mensagemInformativa.length > 0) {
        this.cardTabs_Options.setCondition('abordagem', AbordagemTipo.informativa);
        abordagens.push({ title: "Informativa", message: abordagemMensagens.mensagemInformativa, color: "green" });
      }

      if (abordagemMensagens.mensagemAdvertida.length > 0) {
        this.cardTabs_Options.setCondition('abordagem', AbordagemTipo.advertida);
        abordagens.push({ title: "Advertida", message: abordagemMensagens.mensagemAdvertida, color: "yellow" });
      }

      if (abordagemMensagens.mensagemRestritiva.length > 0) {
        this.cardTabs_Options.setCondition('abordagem', AbordagemTipo.restritiva);
        abordagens.push({ title: "Restritiva", message: abordagemMensagens.mensagemRestritiva, color: "red" });
      }

      if (showAbordagem) this.abordagemModalService.show("Abordagens", abordagens, focus);

    }

  }

  onActionButtom_Click(actionButtomSelect: any) {
    this.savedCondition = true;
    this.cancelaIdentificacao = false;
    switch (actionButtomSelect.text) {
      case "forms.buttons.create": 
        this.dataForm_Clean();
        break;
      
      case "forms.buttons.update": 
        this.updateDataLoad();
        this.pessoaPopulate(false);
        if (this.pessoaTipo == 1) {
          this.visitadoNome_Text.disable();
        } else {
          this.onVisitado_FocusOut();
        }
        this.onRegistroVisita_Change(null, false);
        this.nextFocus();
        break;
      
      case "forms.buttons.read": 
        this.updateDataLoad();
        this.pessoaPopulate(false);
        this.onVisitado_FocusOut();
        this.actionbuttomService.lockScreen();
        break;
      
      default:
        this.excludeSelect = actionButtomSelect.text;
        break;
    }
  }

  onCapture_Click(event: any) {
    this.captureModalService.show();
  }

  onCardTabs_Click(cardSelected: Buttons) {
    this.cardTabs_Options.selectButtonByID(cardSelected.id);
  }

  onError_Click(error: { button: string, focus: string }) {
    if (error.focus != null) {
      switch (error.focus) {
        case "nextFocus":
          this.nextFocus()
          break;
        case "veiculo":
          this.pessoaVeiculo_Option.focus();
          break;
        case "documento":
          this.pessoaDocNumero_Text.focus();
          break;
        case "nome":
          this.pessoaNome_Text.focus();
          break;
        case "visitante":
          this.registroVisita_Option.select(Registro.visita);
          this.onRegistroVisita_Change(null, false);
          break;
        case "visitanteProvisorio":
          this.pessoaId = 0;
          this.pessoaTipo = PessoaTipo.externa;

          if (this.registroVisita_Option.itemSelected.id == Registro.provisorio) {
            this.registroVisita_Option.select(Registro.visita);
            this.onRegistroVisita_Change(null, false);
          }

          const grupo: string = this.pessoaGrupo_Option.itemSelected.text;
          this.pessoaGrupo_Option.clear();

          this.motivoPopulate();

          this.pessoaGrupo_Option.select(0);
          this.visitadoNome_Text.enable();
          this.nextFocus();
          break;
        case "prestador":
          this.registroVisita_Option.select(Registro.prestadorServico);
          this.onRegistroVisita_Change(null, false);
          this.pessoaNome_Text.focus();
          break;
        case "clear":
          this.dataForm_Clean();
          this.onRegistroVisita_Change();
          break;
        case "abordagem":
          this.errosModalService.show("Identificação de " + this.registroVisita_Option.itemSelected.text,
            "Pessoa bloqueada no Sistema!", "clear");
          break;
      }
    }

  }

  onIdentificacaoRecepcao_Change(recepcao: Item) {
    this.estacaoPopulate();
    this.getRecepcao(true);
  }

  onIdentificacaoMotivo_Change(motivo: Item) {

  }

  onFind_Click(event: any) {
    this.pessoaModalService.show("onFind_Click");
  }
 
  updateDataLoad() {
    this.showSpinner = true;

    const filter: IdentificacaoControleFilter = { id: { eq: this.id } };
    this.identificacaoControleService.readIdentificacaoControles(null, filter)
      .subscribe(({ controleIdentificacao }: read_IdentificacaoControle) => {
        
        const identificacaoControle: IdentificacaoControle = controleIdentificacao.nodes[0];
        this.identificacaoControle = identificacaoControle;

        this.identificacaoRecepcao_Option.selectbyValue(identificacaoControle.identificacaoRecepcao);

        switch (identificacaoControle.identificacaoRegistro) {
          case 1:
            this.registroVisita_Option.select(Registro.visita);
            break;
          case 2:
            this.registroVisita_Option.select(Registro.prestadorServico);
            break;
          case 3:
            this.registroVisita_Option.select(Registro.provisorio);
            break;
        }

        if (identificacaoControle.pessoaExterna) {
          if (identificacaoControle.pessoaExterna.imagem) {
            this.pessoaImagem = identificacaoControle.pessoaExterna?.imagem?.imagem;
          } else {
            this.pessoaImagem = null;
          }

          this.pessoaTelefone_Text.text = (identificacaoControle.pessoaExterna.telefoneFixo != "") ? identificacaoControle.pessoaExterna.telefoneFixo : identificacaoControle.pessoaExterna.telefoneMovel;
          this.pessoaEmail_Text.text = identificacaoControle.pessoaExterna.email;
          if (identificacaoControle.pessoaExterna.abordagem) {
            this.pessoaExternaAbordagem = identificacaoControle.pessoaExterna.abordagem;

            this.abordagemInformativa_Text.text = (this.nivelOperacaoService.checkAcessRights("67", 1)) ?
              this.pessoaExternaAbordagem.mensagemInformativa : this.textMaskChar;
            this.abordagemAdvertida_Text.text = (this.nivelOperacaoService.checkAcessRights("68", 1)) ?
              this.pessoaExternaAbordagem.mensagemAdvertida : this.textMaskChar;
            this.abordagemRestritiva_Text.text = (this.nivelOperacaoService.checkAcessRights("69", 1)) ?
              this.pessoaExternaAbordagem.mensagemRestritiva : this.textMaskChar;

            if (this.pessoaExternaAbordagem.mensagemInformativa.length > 0)
              this.cardTabs_Options.setCondition('abordagem', AbordagemTipo.informativa);

            if (this.pessoaExternaAbordagem.mensagemAdvertida.length > 0)
              this.cardTabs_Options.setCondition('abordagem', AbordagemTipo.advertida);

            if (this.pessoaExternaAbordagem.mensagemRestritiva.length > 0)
              this.cardTabs_Options.setCondition('abordagem', AbordagemTipo.restritiva);

          } else {
            this.abordagemInformativa_Text.clear();
            this.abordagemAdvertida_Text.clear();
            this.abordagemRestritiva_Text.clear();

            this.pessoaExternaAbordagem = {
              mensagemInformativa: "",
              mensagemAdvertida: "",
              mensagemRestritiva: ""
            };

            this.cardTabs_Options.setCondition('abordagem', AbordagemTipo.nenhum);

          }

          this.abordagemInformativa_Text.disabled = !this.nivelOperacaoService.checkAcessRights("67", 0);

        } else {
          this.pessoaTelefone_Text.clear();
          this.pessoaEmail_Text.clear();
          this.pessoaImagem = null;
        }

        this.id = identificacaoControle.id;
        this.pessoaTipo = identificacaoControle.pessoaTipo;
        this.pessoaId = identificacaoControle.pessoaId;
        this.documentoPopulate(undefined, identificacaoControle.pessoaDocTipo);
        this.pessoaDocNumero_Text.text = identificacaoControle.pessoaDocNumero;
        this.pessoaNome_Text.text = identificacaoControle.pessoaNome;

        this.grupoPopulate(null, identificacaoControle.pessoaGrupo);
        this.empresaPopulate(identificacaoControle.pessoaEmpresaId, identificacaoControle.pessoaReparticao,
                             identificacaoControle.pessoaTipo,
                             identificacaoControle.pessoaGrupo);
        this.visitaAgendaId = identificacaoControle.agendamentoId;

        this.pessoaDocTipo_Option.disable();
        this.pessoaDocNumero_Text.disable();

        this.agendaButtonDisabled = true;
        this.cameraButtonDisabled = true;

        this.pessoaCargo_Text.text = identificacaoControle.pessoaCargo;
        this.pessoaComplemento_Text.text = identificacaoControle.pessoaComplemento1;

        this.pessoaVeiculo_Option.select(identificacaoControle.veiculoTipo);

        this.pessoaVeiculoIdentificacao_Option.clear();
        this.pessoaVeiculoIdentificacao_Option.add(identificacaoControle.veiculoPlaca, identificacaoControle.veiculoPlaca, 0);

        this.modeloVeiculoPopulate(identificacaoControle.veiculoModelo as string);
        this.pessoaVeiculoCor_Option.selectbyValue(identificacaoControle.veiculoCor);

        this.visitadoId = identificacaoControle.visitadoId;
        this.visitadoAreaId = identificacaoControle.visitado?.area?.id;
        this.visitadoAreaNome = identificacaoControle.visitado?.area?.nome;

        this.visitadoNome_Text.text = identificacaoControle.visitadoNome;
        this.visitadoGrupo_Text.text = identificacaoControle.visitado?.grupo?.pessoaGrupo;
        this.visitadoLocalizacao_Text.text = identificacaoControle.visitado?.localizacao;
        this.visitadoSetor_Text.text = identificacaoControle.visitado?.area?.setor?.nome;
        this.visitadoTelefone_Text.text = identificacaoControle.visitado?.telefoneFixo;
        this.visitadoNome_Text.disable();

        this.centroCustoNome = identificacaoControle.visitadoCentroCusto;

        if (identificacaoControle.pessoaTipo == 1) {
          if (identificacaoControle.pessoaGrupo == "PRESTADOR" ||
            identificacaoControle.pessoaGrupo == "PESSOA JURIDICA") {
            this.registroVisita_Option.select(Registro.prestadorServico);
          } else {
            this.registroVisita_Option.select(Registro.provisorio);
          }
        } else {
          if (identificacaoControle.pessoaEmpresaId > 0) {
            this.registroVisita_Option.select(Registro.provisorio);
          } else {
            this.registroVisita_Option.select(Registro.visita);
          }
        }


        this.registroVisita_Option.disable();
        this.motivoPopulate(undefined, identificacaoControle.motivo)

        this.identificacaoID_Text.text = identificacaoControle.identificador.toString();
        this.identificacaoObservacao_Text.text = identificacaoControle.observacao;

        const validadeAcessoInicial: DateFormated = this.dateOperator.formatDate(identificacaoControle.identificacaoValidadeInicial, true)
        const validadeAcessoFinal: DateFormated = this.dateOperator.formatDate(identificacaoControle.identificacaoValidadeFinal, true)
        const identificacaoCadastro: DateFormated = this.dateOperator.formatDate(identificacaoControle.identificacaoDataHora.toString(), true)

        this.identificacaoCadastro_Text.text = (identificacaoCadastro.dateLocale + " " + identificacaoCadastro.timeFormated);

        const identificacaoMateriais =  identificacaoControle.identificacaoMateriais;
        this.listView_IdentificacaoMaterial.gridUpdate(identificacaoMateriais);

        if (identificacaoControle.acessoLocalEntrada) {
          const identificacaoEntrada: DateFormated = this.dateOperator.formatDate(identificacaoControle.acessoDataHoraEntrada?.toString(), true);
          this.identificacaoEntrada_Text.text = identificacaoControle.acessoLocalEntrada + " - " +
            identificacaoEntrada.dateLocale + " " +
            identificacaoEntrada.timeFormated;
        } else {
          this.identificacaoEntrada_Text.clear();
        }

        if (identificacaoControle.statusFinalDataHora) {
          const identicacaoSaida: DateFormated = this.dateOperator.formatDate(identificacaoControle.statusFinalDataHora?.toString(), true);
          this.identificacaoSaida_Text.text = identificacaoControle.statusFinalLocal + " - " +
            identicacaoSaida.dateLocale + " " +
            identicacaoSaida.timeFormated;
        } else {
          this.identificacaoSaida_Text.clear();
        }

        this.acessoValidadeInicial_Text.setTextWithMask(validadeAcessoInicial?.dateLocale);
        this.acessoValidadeHoraInicial_Text.setTextWithMask(validadeAcessoInicial?.timeFormated);
        this.acessoValidadeFinal_Text.setTextWithMask(validadeAcessoFinal?.dateLocale);
        this.acessoValidadeHoraFinal_Text.setTextWithMask(validadeAcessoFinal?.timeFormated);

        if (this.actionbuttomService.editable == "no") {
          this.pessoaDocNumero_Text.focus();
        }

        this.showSpinner = false;
      });
  }

  onListView_Change(rowSelect?: rowSelect) {
    if (rowSelect.registro) {
      this.id = rowSelect.id;
    } else {
      if (rowSelect.exclude == "yes") {
        switch (this.excludeSelect) {
          case "forms.buttons.suspend":
            this.identificacaoControleService.suspendIdentificacaoControle(rowSelect.id, this.operador.id, this.operador.nome, "")
              .subscribe(({ data }: suspend_IdentificacaoControle) => {
                if (data.controleIdentificacao_Suspender.sucesso == true) {
                  const find = { field: "id", value: rowSelect.id, type: "DEL" }
                  this.update_Grid(find)

                } else {
                  const objeto = JSON.parse(data.controleIdentificacao_Suspender.objeto);
                  this.errosModalService.show(data.controleIdentificacao_Suspender.mensagemTipo,
                    data.controleIdentificacao_Suspender.mensagem)
                }
              });
            break;

          case "forms.buttons.cancel":
            this.identificacaoControleService.cancelIdentificacaoControle(rowSelect.id, this.operador.id, this.operador.nome, this.identificacaoRecepcao_Option.itemSelected.text, "")
              .subscribe(({ data }: cancel_IdentificacaoControle) => {
                if (data.controleIdentificacao_Cancelar.sucesso == true) {
                  const find = { field: "id", value: rowSelect.id, type: "DEL" }
                  this.update_Grid(find)

                } else {
                  const objeto = JSON.parse(data.controleIdentificacao_Cancelar.objeto);
                  this.errosModalService.show(data.controleIdentificacao_Cancelar.mensagemTipo,
                    data.controleIdentificacao_Cancelar.mensagem)
                }
              });
            break;

          case "forms.buttons.end":
            this.identificacaoControleService.endIdentificacaoControle(rowSelect.id, this.operador.id, this.operador.nome, this.identificacaoRecepcao_Option.itemSelected.text, "")
              .subscribe(({ data }: end_IdentificacaoControle) => {
                if (data.controleIdentificacao_Encerrar.sucesso == true) {
                  const find = { field: "id", value: rowSelect.id, type: "DEL" }
                  this.update_Grid(find)

                } else {
                  const objeto = JSON.parse(data.controleIdentificacao_Encerrar.objeto);
                  this.errosModalService.show(data.controleIdentificacao_Encerrar.mensagemTipo,
                    data.controleIdentificacao_Encerrar.mensagem)
                }
              });
            break;
            
        }
      }
    }
  }

  onListView_Filter(filterSelect: Item) {
    const date: Date = new Date();

    let dataInicioDia: string;
    let dataFinalDia: string;

    if (filterSelect.text == "Visita" || filterSelect.text == "Entrada") {
      dataInicioDia = this.dateOperator.formatDate(filterSelect.value).dateFormated + " 00:00:00 -00:00";
      dataFinalDia = this.dateOperator.formatDate(filterSelect.value).dateFormated + " 23:59:59 -00:00";
    }

    switch (filterSelect.text) {
      case "Visitante":
        this.filterGrid = { pessoaNome: { startsWith: filterSelect.value } };
        break;
      case "Visitado":
        this.filterGrid = { visitadoNome: { startsWith: filterSelect.value } };
        break;
      case "Visita":
        this.filterGrid = {identificacaoDataHora: {
                            gte: dataInicioDia,
                            lte: dataFinalDia}
                          };
        break;
      case "Entrada":
        this.filterGrid = {
          acessoDataHoraEntrada: {
            gt: dataInicioDia,
            lt: dataFinalDia
          }
        };
        break;
      case "Área":
        this.filterGrid = { acessoLocalEntrada: { startsWith: filterSelect.value } };
        break;
    }

    if (filterSelect.value != "identificacaoDataHora" &&
      filterSelect.value != "acessoDataHoraEntrada" &&
      filterSelect.value != "pessoaNome" &&
      filterSelect.value != "visitadoNome" &&
      filterSelect.value != "acessoLocalEntrada") {
      if (this.filterSchema.filter) this.update_Grid();
      if (this.filterSchema.filterArq) this.updateArq_Grid();
    }

  }

  onPessoaDocNumero_Change() {
    this.pessoaDocNumero_Pesquisa = true;
    this.onSaved_Condition();
  }

  async onPessoaDocNumero_FocusOut() {
    if (this.pessoaDocNumero_Text.text.length > 0 && this.pessoaDocNumero_Pesquisa) {

      this.pessoaDocNumero_Pesquisa = false;

      let visitaCorrenteFilter: IdentificacaoControleFilter;
      visitaCorrenteFilter = {
        pessoaDocTipo: { eq: this.pessoaDocTipo_Option.itemSelected?.text },
        pessoaDocNumero: { eq: this.pessoaDocNumero_Text.text }
      }

      this.showSpinner = true;
      console.log(visitaCorrenteFilter);
      this.identificacaoControleService.readIdentificacaoControles(null, visitaCorrenteFilter, 1)
        .subscribe(({ controleIdentificacao }: read_IdentificacaoControle) => {
          if (controleIdentificacao.totalCount == 0) {
            const pessoaInternaSort: PessoaInternaUsuarioSort = null;
            let pessoaInternaFilter: PessoaInternaUsuarioFilter;

            pessoaInternaFilter = {
              documentoTipo: { eq: this.pessoaDocTipo_Option.itemSelected?.text },
              documentoNumero: { eq: this.pessoaDocNumero_Text.text }
            };

            this.pessoaInternaService.readPessoaInternaUsuarios(pessoaInternaSort, pessoaInternaFilter)
              .subscribe(({ usuarioPessoaInterna }: read_PessoaInternaUsuario) => {

                if (this.cancelaIdentificacao == true) {
                  this.showSpinner = false;
                  return;
                }

                if (usuarioPessoaInterna.totalCount >= 1) {
                  let pessoaInterna: PessoaInternaUsuario = usuarioPessoaInterna.nodes[0];
                  usuarioPessoaInterna.nodes
                    .forEach((pessoa: PessoaInternaUsuario) => {
                      if (pessoa.status) {
                        pessoaInterna = pessoa;
                      }
                    });

                  this.pessoaId = pessoaInterna.id;
                  this.pessoaTipo = PessoaTipo.interna;
                  this.pessoaImagem = pessoaInterna?.imagem?.imagem;
                  this.pessoaNome_Text.text = pessoaInterna.nome;

                  this.agendaButtonDisabled = true;
                  this.cameraButtonDisabled = true;

                  this.pessoaDocNumero_Text.text = pessoaInterna.documentoNumero;

                  this.grupoPopulate(null, pessoaInterna.grupo.pessoaGrupo);
                  this.pessoaGrupo_Option.selectbyValue(pessoaInterna.grupo.pessoaGrupo);

                  this.pessoaTelefone_Text.setTextWithMask((pessoaInterna.telefoneFixo != "") ? pessoaInterna.telefoneFixo : pessoaInterna.telefoneMovel);

                  this.empresaPopulate(0, pessoaInterna.area.nome, PessoaTipo.interna);

                  this.pessoaEmail_Text.text = pessoaInterna.email;
                  this.pessoaComplemento_Text.text = pessoaInterna.complemento1;
                  this.pessoaComplemento_Text.disable();
                  this.pessoaVeiculo_Option.select(VeiculoTipo.CARRO);
                  this.pessoaVeiculoIdentificacao_Option.clear();

                  this.modeloVeiculoPopulate();
                  this.pessoaVeiculoCor_Option.select(0);


                  this.visitadoGrupo_Text.clear();
                  this.visitadoLocalizacao_Text.clear();
                  this.visitadoSetor_Text.clear();
                  this.visitadoTelefone_Text.clear();
                  this.visitadoComplemento = null;
                  this.visitadoEmail = null;

                  this.estado_Options.select(pessoaInterna.status ? 1 : 0);

                  this.pessoaDocTipo_Option.disable();
                  this.pessoaDocNumero_Text.disable();
                  this.pessoaNome_Text.disable();

                  this.pessoaPopulate()
                    .then((abordagemRestritiva) => {
                      if (abordagemRestritiva == true) {

                        this.errosModalService.show("Identificação de " + this.registroVisita_Option.itemSelected.text,
                          "PESSOA BLOQUEADA NO SISTEMA!", "clear");

                      } else {
                        if (pessoaInterna.status == true) {
                          this.errosModalService.show("Identificação de " + this.registroVisita_Option.itemSelected.text,
                            "USUÁRIO COM CRACHÁ DESABILITADO NO SISTEMA!", "visitanteProvisorio");

                        } else {

                          const dataAtual = new Date().toLocaleDateString("pt-br");
                          const HoraAtual = new Date().toTimeString().substr(0, 5);
                          const dataHoraAtual = dataAtual + " " + HoraAtual;

                          this.pessoaCargo_Text.text = pessoaInterna.cargo;

                          if (this.registroVisita_Option.itemSelected.id != Registro.provisorio ||
                            pessoaInterna.grupo.pessoaGrupo == "PRESTADOR" || pessoaInterna.grupo.pessoaGrupo == "PESSOA JURIDICA") {

                            if ((this.registroVisita_Option.itemSelected.id != Registro.prestadorServico) &&
                              (pessoaInterna.grupo.pessoaGrupo == "PRESTADOR" || pessoaInterna.grupo.pessoaGrupo == "PESSOA JURIDICA")) {
                              this.registroVisita_Option.select(Registro.prestadorServico);
                              this.errosModalService.show("Identificação de " + this.registroVisita_Option.itemSelected.text,
                                "Pessoa possui registro de Prestador de Serviços no sistema, não podendo ser registrada no tipo de registro selecionado.", "veiculo");
                            }

                            if (pessoaInterna.grupo.pessoaGrupo != "PRESTADOR" && pessoaInterna.grupo.pessoaGrupo != "PESSOA JURIDICA") {
                              this.registroVisita_Option.select(Registro.provisorio);
                              this.errosModalService.show("Identificação de " + this.registroVisita_Option.itemSelected.text,
                                "Pessoa possui registro Interno no sistema, não podendo ser registrada no tipo de registro selecionado.", "veiculo");
                            }
                          } else {

                            this.nextFocus();
                          }

                          this.onRegistroVisita_Change(null, false);

                        }

                        this.registroVisita_Option.disable();
                        this.visitadoNome_Text.disable(true);

                      }

                      this.showSpinner = false;

                    });
                  this.showSpinner = false;
                } else {

                  if (this.registroVisita_Option.itemSelected.id == Registro.provisorio) {

                    this.errosModalService.show("Identificação de " + this.registroVisita_Option.itemSelected.text,
                                                "Pessoa não encontrada na base de dados do Sistema!", "documento")
                    this.dataForm_Clean();
                    this.showSpinner = false;

                  } else {

                    if (this.registroVisita_Option.itemSelected.id == Registro.visita ||
                      this.registroVisita_Option.itemSelected.id == Registro.prestadorServico) {

                      const pessoaExternaSort: PessoaExternaUsuarioSort = { status: SortOperationKind.DESC };
                      let pessoaExternaFilter: PessoaExternaUsuarioFilter;

                      pessoaExternaFilter = {
                        documentoTipo: { eq: this.pessoaDocTipo_Option.itemSelected.text },
                        documentoNumero: { eq: this.pessoaDocNumero_Text.text }
                      };

                      this.pessoaExternaService.readPessoaExternaUsuarios(pessoaExternaSort, pessoaExternaFilter, 1)
                        .subscribe(({ usuarioPessoaExterna }: read_PessoaExternaUsuario) => {

                          if (this.cancelaIdentificacao == true) {
                            this.showSpinner = false;
                            return;
                          }

                          if (usuarioPessoaExterna.nodes.length == 1) {
                            this.pessoaTipo = PessoaTipo.externa;

                            const pessoaExterna: PessoaExternaUsuario = usuarioPessoaExterna.nodes[0];
                            this.pessoaId = pessoaExterna.id;
                            this.pessoaImagem = (!this.captureDone)? pessoaExterna?.imagem?.imagem || null: this.pessoaImagem;

                            this.grupoPopulate(pessoaExterna.grupoId, null);

                            this.pessoaDocTipo_Option.selectbyValue(pessoaExterna.documentoTipo);
                            this.pessoaDocNumero_Text.text = pessoaExterna.documentoNumero;

                            this.pessoaNome_Text.text = pessoaExterna.nome;
                            this.pessoaTelefone_Text.setTextWithMask((pessoaExterna.telefoneFixo != "") ? pessoaExterna.telefoneFixo : pessoaExterna.telefoneMovel);

                            this.empresaPopulate(pessoaExterna.empresaId, pessoaExterna.entidadeNome, PessoaTipo.externa, pessoaExterna.grupoPessoa?.pessoaGrupo);
                            this.pessoaEmpresa_Option.enable();

                            this.pessoaEmail_Text.text = pessoaExterna.email;
                            this.pessoaCargo_Text.text = pessoaExterna.cargo;
                            this.pessoaComplemento_Text.text = pessoaExterna.complemento1;

                            this.pessoaComplementos = {
                              complemento: {
                                telefoneMovel: pessoaExterna.telefoneMovel,
                                cargo: pessoaExterna.cargo,
                                complemento2: pessoaExterna.complemento2,
                                complemento3: pessoaExterna.complemento3,
                                complemento4: pessoaExterna.complemento4},
                              controle: {
                                nascimento: pessoaExterna.nascimento,
                                integracaoInicio: pessoaExterna.integracaoInicio,
                                integracaoFim: pessoaExterna.integracaoFim,
                                segurancaInicio: pessoaExterna.segurancaInicio,
                                segurancaFim: pessoaExterna.segurancaFim,
                                exameMedicoInicio: pessoaExterna.exameMedicoInicio,
                                exameMedicoFim: pessoaExterna.exameMedicoFim},
                              endereco: pessoaExterna.endereco,
                              observacao: pessoaExterna.observacao
                            }

                            this.pessoaVeiculos = [{id: 0, grupoId: 0, tipo: 1, placa: "", cor: ""}];
                            if (pessoaExterna.veiculos) {
                              this.pessoaVeiculoIdentificacao_Option.clear();
                              this.pessoaVeiculoIdentificacao_Option.add("", "", 0);
                              pessoaExterna.veiculos
                                .forEach(veiculo => {
                                  this.pessoaVeiculoIdentificacao_Option.add(veiculo.veiculoExterno.placa,
                                    veiculo.veiculoExterno.placa,
                                    veiculo.veiculoExterno.id);
                                  this.pessoaVeiculos.push({
                                    id: veiculo.veiculoExterno.id,
                                    grupoId: veiculo.veiculoExterno.grupoId,
                                    grupo: veiculo.veiculoExterno.grupo,
                                    tipo: veiculo.veiculoExterno.tipo,
                                    placa: veiculo.veiculoExterno.placa,
                                    modeloId: veiculo.veiculoExterno.modeloId,
                                    modelo: veiculo.veiculoExterno.modelo,
                                    cor: veiculo.veiculoExterno.cor,
                                    complemento1: veiculo.veiculoExterno.complemento1,
                                    complemento2: veiculo.veiculoExterno.complemento2,
                                    complemento3: veiculo.veiculoExterno.complemento3,
                                    complemento4: veiculo.veiculoExterno.complemento4,
                                    observacao: veiculo.veiculoExterno.observacao
                                  })
                                })
                              this.pessoaVeiculo_Option.select(VeiculoTipo.CARRO)
                            }

                            this.registroVisita_Option.disable();

                            if (pessoaExterna.empresaId > 0 && this.registroVisita_Option.itemSelected.id != Registro.prestadorServico) {
                              this.registroVisita_Option.select(Registro.prestadorServico);
                              this.errosModalService.show("Identificação de " + this.registroVisita_Option.itemSelected.text,
                                "Pessoa relacionada com uma empresa parceira e será identificada como Prestador!", "prestador");
                            }

                            this.onRegistroVisita_Change(null, false);

                            const focus: string = (pessoaExterna.status == false) ? "abordagem" : "nextFocus";
                            this.onAbordagem_Alert(pessoaExterna.abordagem, focus)

                            this.estado_Options.select((pessoaExterna.status == true)? 1: 0);

                            if (pessoaExterna.status == false) {

                              this.errosModalService.show("Identificação de " + this.registroVisita_Option.itemSelected.text,
                                                          "Pessoa bloqueada no Sistema!", "clear");
                              this.showSpinner = false;

                            } else {

                              if (this.pessoaImagem != null) {
                                if (this.recepcao.capturarImagem == 2 && !this.captureDone) {
                                  this.captureModalService.show();
                                } else {
                                  this.captureDone = true;
                                  this.captureModalService.required = false;
                                }
                              } else {
                                if (this.recepcao.capturarImagem >= 1 && !this.captureDone) {
                                  this.captureModalService.show();
                                } else {
                                  this.captureModalService.required = false;
                                }
                              }

                              if (this.recepcao.apresentaUltimoVisitado == true) {
                                this.getUltimoVisitado(pessoaExterna.ultimoVisitadoId);
                              }

                              if (this.visitaAgendaId == 0 && false) {
                                const date: Date = new Date();
                                const dataInicioDia = this.dateOperator.formatDate(date.toLocaleDateString("pt-br")).dateFormated + " 00:00:00 -00:00";
                                const dataFinalDia = this.dateOperator.formatDate(date.toLocaleDateString("pt-br")).dateFormated + " 23:59:59 -00:00";
                                const visitaAgendaFilter: ControleVisitaAgendaFilter = {
                                                            pessoaDocNumero: { eq: this.pessoaDocNumero_Text.text },
                                                            siteId: { eq: this.siteId },
                                                            agendamentoValidadeInicial: {gt: dataInicioDia,
                                                                                        lt: dataFinalDia}};
                                this.controleVisitaAgenda.readControleVisitaAgenda(null, visitaAgendaFilter)
                                  .subscribe(({ controleVisitaAgenda }: read_ControleVisitaAgenda) => {
                                    if (controleVisitaAgenda.totalCount > 0) {
                                      this.visitaAgendadaModalService.setFilter("Documento", <string>visitaAgendaFilter.pessoaDocNumero.eq);
                                      this.visitaAgendadaModalService.show();
                                    }
                                    this.showSpinner = false;
                                    this.nextFocus();
                                  });
                              } else {
                                this.showSpinner = false;
                                this.nextFocus();
                              }
                            }

                          } else {

                            this.dataForm_Clean(false);
                            this.nextFocus();
                            this.showSpinner = false;

                            if (this.recepcao.capturarImagem >= 1 && !this.captureDone) {
                              this.captureModalService.show();
                            }

                          }
                        });
                    }
                  }
                }

              });

          } else {
            if (this.id == undefined) {

              const nodes = controleIdentificacao.nodes;
              let tipoIdentificacao: string = "vigente";

              if (nodes[0].suspensoDataHora != null) {
                tipoIdentificacao = "suspensa";
              }

              this.errosModalService.show("Identificação de " + this.registroVisita_Option.itemSelected.text,
                "Pessoa com identificação " + tipoIdentificacao + " no site: " + nodes[0].siteNome, "clear");
              this.showSpinner = false;
            }
          }
        });
    }
  }

  onPessoaImage_Capture(image: string) {
    this.pessoaImagem = this.config.converteImagemArray(image)
    this.captureDone = true;
    this.captureModalService.required = false;
    this.nextFocus();
    this.onSaved_Condition();
  }

  onPessoaNome_FindClick() {
    if (this.actionbuttomService.editable == "new") {
      switch (this.registroVisita_Option.itemSelected.id) {
        case Registro.provisorio:
          this.pessoaModalService.pesquisaPessoa_Option.select(0);
          this.pessoaModalService.setFilter(this.pessoaNome_Text.text);
          this.pessoaModalService.show("Pessoa Interna", null);
          break;

        case Registro.prestadorServico:
          this.pessoaExternaModalService.pesquisaPessoa_Option.select(0);
          this.pessoaExternaModalService.setFilter(this.pessoaNome_Text.text);
          this.pessoaExternaModalService.show("Prestador");
          break;

        case Registro.visita:
          this.pessoaExternaModalService.pesquisaPessoa_Option.select(0);
          this.pessoaExternaModalService.setFilter(this.pessoaNome_Text.text);
          this.pessoaExternaModalService.show("Visitante");
          break;
      }
    }
  }

  onPessoaNome_KeyEnter() {
    if (this.pessoaId == 0) {
      switch (this.registroVisita_Option.itemSelected.id) {
        case Registro.provisorio:
        case Registro.prestadorServico:
          this.pessoaModalService.pesquisaPessoa_Option.select(0);
          this.pessoaModalService.setFilter(this.pessoaNome_Text.text);
          this.pessoaModalService.show("onPessoaNome_KeyEnter");
          break;

        case Registro.visita:
          this.pessoaExternaModalService.pesquisaPessoa_Option.select(0);
          this.pessoaExternaModalService.setFilter(this.pessoaNome_Text.text);
          this.pessoaExternaModalService.show("Visitante");
          break;
      }
    }
  }

  async onPessoaNome_FocusOut(idFind: boolean = false) {
    if (this.pessoaDocNumero_Text.text.length == 0) {
      switch (this.registroVisita_Option.itemSelected.id) {
        case Registro.provisorio:
        case Registro.prestadorServico:

          const filter: PessoaInternaUsuarioFilter = (idFind) ? { id: { eq: this.pessoaId } } :
            {
              nome: { contains: this.pessoaNome_Text.text },
              status: { eq: true }
            };

          const pessoaInternaSort: PessoaInternaUsuarioSort = null;
          const pessoaInternaFilter: PessoaInternaUsuarioFilter = filter;
          await this.pessoaInternaService.readPessoaInternaUsuarios(pessoaInternaSort, pessoaInternaFilter)
            .subscribe(({ usuarioPessoaInterna }: read_PessoaInternaUsuario) => {

              if (usuarioPessoaInterna.totalCount == 1) {

                const pessoaInterna: PessoaInternaUsuario = usuarioPessoaInterna.nodes[0];
                this.pessoaId = pessoaInterna.id;
                this.pessoaDocTipo_Option.selectbyValue(pessoaInterna.documentoTipo);
                this.pessoaDocNumero_Text.text = pessoaInterna.documentoNumero;

                this.pessoaDocNumero_Pesquisa = true;

                this.onPessoaDocNumero_FocusOut();

              } else {

                this.pessoaId = 0;
                if (usuarioPessoaInterna.totalCount > 1) {
                  this.pessoaModalService.pesquisaPessoa_Option.select(0);
                  this.pessoaModalService.setFilter(this.pessoaNome_Text.text);
                  this.pessoaModalService.show("onPessoaNome_FocusOut");

                } else {
                  this.pessoaDocNumero_Text.focus();
                }

              }

              this.onSaved_Condition();

            })
          break;

        case Registro.visita:
          const filterVisita: PessoaExternaUsuarioFilter = (idFind) ? { id: { eq: this.pessoaId } } :
            { nome: { contains: this.pessoaNome_Text.text } };

          const pessoaExteraSort: PessoaExternaUsuarioSort = null;
          const pessoaExternaFilter: PessoaExternaUsuarioFilter = filterVisita;
          await this.pessoaExternaService.readPessoaExternaUsuarios(pessoaExteraSort, pessoaExternaFilter)
            .subscribe(({ usuarioPessoaExterna }: read_PessoaExternaUsuario) => {
              if (usuarioPessoaExterna.totalCount == 1) {

                const pessoaExterna: PessoaExternaUsuario = usuarioPessoaExterna.nodes[0];
                this.pessoaId = pessoaExterna.id;
                this.pessoaDocTipo_Option.selectbyValue(pessoaExterna.documentoTipo);
                this.pessoaDocNumero_Text.text = pessoaExterna.documentoNumero;

                this.pessoaDocNumero_Pesquisa = true;

                this.onPessoaDocNumero_FocusOut();

              } else {

                this.pessoaId = 0;

                if (usuarioPessoaExterna.totalCount > 1) {
                  this.pessoaModalService.pesquisaPessoa_Option.select(0);
                  this.pessoaModalService.setFilter(this.pessoaNome_Text.text);
                  this.pessoaModalService.show("onPessoaNome_FocusOut");

                } else {
                  this.pessoaDocNumero_Text.focus();
                }

              }

              this.onSaved_Condition();

            })

          break;
      }
    }
  }

  onPessoaVeiculoIdentificacao_Change(veiculoSelect: Item) {
    this.pessoaVeiculos?.filter(veiculo => veiculo.id == veiculoSelect.id)
      .forEach(veiculo => {
        this.pessoaVeiculo_Option.select(veiculo.tipo as number);
        this.pessoaVeiculoModelo_Option.select(veiculo.modeloId);
        this.pessoaVeiculoCor_Option.selectbyValue(veiculo.cor);

        this.veiculoComplementos = {
          complemento: {
            grupo: veiculo.grupo,
            complemento1: veiculo.complemento1,
            complemento2: veiculo.complemento2,
            complemento3: veiculo.complemento3,
            complemento4: veiculo.complemento4},          
          observacao: veiculo.observacao
        }
      });
    this.onSaved_Condition();
  }

  onRegistroVisita_Change(registroSelect?: Item, focus: boolean = true) {
    if (registroSelect) {
      if (registroSelect.id == Registro.provisorio) {
        this.pessoaTipo = PessoaTipo.interna;
        this.pessoaEmpresaLabel = "Setor";
      } else {
        this.pessoaTipo = PessoaTipo.externa;
        this.pessoaEmpresaLabel = "Empresa";
      }
    }
    this.getRecepcao(focus);
  }

  onSave_Click() {

    this.savedCondition = true;
    if (this.savedCondition == true) {

      this.savedCondition = false;
      this.showSpinner = true;

      const date: Date = new Date();
      const HoraAtual: string = date.toTimeString().substr(0, 5);
      const dataAtual: DateFormated = this.dateOperator.formatDate(date.toLocaleDateString("pt-br") + " " + HoraAtual, true);

      const dateTimeValidade: Date = new Date(dataAtual.dateUTC + (parseInt(this.identificacaoMotivo_Option.itemSelected.value) * 60000))
      const dataValidade: DateFormated = this.dateOperator.formatDate(dateTimeValidade.toLocaleDateString() + " " + dateTimeValidade.toTimeString().substr(0, 5), true)

      const validadeInicial: string = dataValidade.dateFormated + " " + dataValidade.timeFormated;
      const validadeFinal: string = this.acessoValidadeFinal_Text.formated + " " +
        this.acessoValidadeHoraFinal_Text.textMasked.substr(0, this.acessoValidadeHoraFinal_Text.maxLength);

      const identificador: number = 0;

      if (this.abordagemInformativa_Text.text != this.textMaskChar &&
        this.abordagemInformativa_Text.text != this.pessoaExternaAbordagem.mensagemInformativa) {
        this.pessoaExternaAbordagem.mensagemInformativa = this.abordagemInformativa_Text.text;
      }

      const identificacaoControle: IdentificacaoControle = {
        id: this.id,
        agendamentoId: 0,
        identificacaoOrigem: "NEXCON",
        identificacaoRegistro: this.registroVisita_Option.itemSelected.id,
        identificacaoProcesso: this.processoVisita_Option.itemSelected.id,
        identificacaoRecepcao: this.identificacaoRecepcao_Option.itemSelected.value,
        identificacaoEstacao: this.estacao_Option.itemSelected.value,
        identificacaoDataHora: dataAtual.dateFormated + " " + dataAtual.timeFormated,
        identificacaoOperadorId: this.operador.id,
        identificacaoOperadorNome: this.operador.nome,
        identificacaoValidadeInicial: validadeInicial,
        identificacaoValidadeFinal: validadeFinal,
        siteId: this.siteId,
        siteNome: this.siteNome,
        motivo: this.identificacaoMotivo_Option.itemSelected.text,
        identificadorTipo: 1,
        identificador: parseInt(this.identificacaoID_Text.text),
        acessoCartao: parseInt(this.identificacaoID_Text.text),
        acessoEntradaPessoaNome: "",
        acessoEntradaAutorizada: true,        
        acessoEntradaPessoaId: 0,
        acessoSaidaPessoaNome: "",
        acessoSaidaAutorizada: true,        
        acessoSaidaPessoaId: 0,
        acessoSaidaForaValidade: true,
        acessoIngressoAtribuido: 0,
        acessoIngressoCorrente: 0,
        acessoIngressoIgnorar: false,
        acessoCreditoAtribuido: 0,
        acessoCreditoCorrente: 0,
        acessoCreditoIgnorar: true,
        acessoSenha: "",
        acessoSenhaIgnorar: true,
        acessoBiometriaIgnorar: true,
        acessoNivel1: 0,
        acessoNivel2: 0,
        acessoNivel3: 0,
        acessoNivel4: 0,
        acessoNivel5: 0,
        acessoNivel6: 0,
        acessoNivel7: 0,
        acessoNivel8: 0,
        acessoNivel9: 0,
        acessoNivel10: 0,
        estacionamentoId: 0,
        estacionamentoNome: "",
        garagemTipo: 0,
        garagemVaga: "",
        areaReservadaId: 0,
        areaReservadaNome: "",
        integracao: "integracao",
        observacao: this.identificacaoObservacao_Text.text,
        pessoaTipo: 2,
        pessoaExterna: {
          id: this.pessoaId,
          nome: this.pessoaNome_Text.text,
          documentoTipo: this.pessoaDocTipo_Option.itemSelected.text,
          documentoNumero: this.pessoaDocNumero_Text.text,
          imagem: {
            imagem: this.pessoaImagem || []
          },
          abordagem: {
            mensagemInformativa: this.abordagemInformativa_Text.text,
            mensagemAdvertida: this.abordagemAdvertida_Text.text,
            mensagemRestritiva: this.abordagemRestritiva_Text.text,
          },
          endereco: this.pessoaComplementos?.endereco,
          grupo: {
            id: this.pessoaGrupo_Option.itemSelected.id,
            pessoaGrupo: this.pessoaGrupo_Option.itemSelected.text
          },
          empresaId: this.pessoaEmpresa_Option.itemSelected.id,
          entidadeNome: this.pessoaEmpresa_Option.itemSelected.text,
          telefoneFixo: this.pessoaTelefone_Text.text,
          email: this.pessoaEmail_Text.text,
          complemento1: this.pessoaComplemento_Text.text,

          telefoneMovel: this.pessoaComplementos?.complemento?.telefoneMovel,
          cargo: this.pessoaComplementos?.complemento?.cargo,
          complemento2: this.pessoaComplementos?.complemento?.complemento2,
          complemento3: this.pessoaComplementos?.complemento?.complemento3,
          complemento4: this.pessoaComplementos?.complemento?.complemento4,

          nascimento: this.pessoaComplementos?.controle?.nascimento,
          integracaoInicio: this.pessoaComplementos?.controle?.integracaoInicio,
          integracaoFim: this.pessoaComplementos?.controle?.integracaoFim,
          segurancaInicio: this.pessoaComplementos?.controle?.segurancaInicio,
          segurancaFim: this.pessoaComplementos?.controle?.segurancaFim,
          exameMedicoInicio: this.pessoaComplementos?.controle?.exameMedicoInicio,
          exameMedicoFim: this.pessoaComplementos?.controle?.exameMedicoFim,
          observacao: this.pessoaComplementos?.observacao
        },
        pessoaInterna: null,
        visitado: {
          id: this.visitadoId,
          nome: this.visitadoNome_Text.text,
          area: { id: this.visitadoAreaId, nome: this.visitadoAreaNome },
          centroCusto: { centroCusto: this.centroCustoNome }
        },
        veiculoTipo: this.pessoaTipo,
        veiculoExterno: (this.pessoaVeiculoIdentificacao_Option.itemSelected?.text?.length == 0)? undefined: {
          id: this.pessoaVeiculoIdentificacao_Option.itemSelected.id,
          tipo: this.pessoaVeiculo_Option.itemSelected.id,
          placa: this.pessoaVeiculoIdentificacao_Option.itemSelected.text,
          modeloId: this.pessoaVeiculoModelo_Option.itemSelected.id,
          modelo: this.pessoaVeiculoModelo_Option.itemSelected.text,
          cor: this.pessoaVeiculoCor_Option.itemSelected.text,
          grupo: this.veiculoComplementos?.complemento?.grupo,
          complemento1: this.veiculoComplementos?.complemento?.complemento1,
          complemento2: this.veiculoComplementos?.complemento?.complemento2,
          complemento3: this.veiculoComplementos?.complemento?.complemento3,
          complemento4: this.veiculoComplementos?.complemento?.complemento4
        },
        identificacaoMateriais: this.listView_IdentificacaoMaterial.dataGridBehavior?.value?.map(item => {
          return { material: item.material,
                   quantidade: Number.parseInt(item.quantidade),
                   notaFiscal: item.notaFiscal,
                   observacao: item.observacao }
        })
      };

      if (identificacaoControle.id) {
        this.identificacaoControleService.updateIdentificacaoControle(identificacaoControle)
          .subscribe(({ data }: update_IdentificacaoControle) => {

            this.showSpinner = false;

            const objeto: any = JSON.parse(data.controleIdentificacao_Alterar.objeto);
            if (data.controleIdentificacao_Alterar.sucesso == true) {
              const find = { field: "id", value: objeto.Id }
              this.onClose_Click();
              this.update_Grid(find);
            } else {
              this.savedCondition = true;
              this.alertService.show(data.controleIdentificacao_Alterar.mensagemTipo,
                data.controleIdentificacao_Alterar.mensagem,
                objeto);
            }
          })
      } else {
        this.identificacaoControleService.createIdentificacaoControle(identificacaoControle)
          .subscribe(({ data }: create_IdentificacaoControle) => {

            this.showSpinner = false;

            const objeto: any = JSON.parse(data.controleIdentificacao_Inserir.objeto);
            if (data.controleIdentificacao_Inserir.sucesso == true) {
              const find = { field: "id", value: objeto.Id };
              this.update_Grid(find);
              this.errosModalService.show("Atenção",
                "Identificação incluída com Sucesso!", "clear");

            } else {
              this.savedCondition = true;
              this.alertService.show(data.controleIdentificacao_Inserir.mensagemTipo,
                data.controleIdentificacao_Inserir.mensagem,
                objeto);
            }
          })
      }
    }
  }

  onSaved_Condition() {

    if (this.actionbuttomService.editable != "no") {
      this.savedCondition = (this.pessoaDocNumero_Text.text?.length >= this.pessoaDocNumero_Text.minLength) &&
        (this.pessoaNome_Text.text?.length >= this.pessoaNome_Text.minLength) &&
        (this.visitadoId > 0 || this.visitaAgendaId > 0 || this.pessoaTipo == 1) &&
        (this.identificador < 2 || (this.identificador == 2));

      if (!this.acessoValidadeInicial_Text.validated || !this.acessoValidadeFinal_Text.validated ||
          !this.acessoValidadeHoraInicial_Text.validated || !this.acessoValidadeHoraFinal_Text.validated ||
          !this.pessoaEmail_Text.validated) {
        this.savedCondition = false;
        //
      } else {
        const dataAtual = new Date().toLocaleDateString("pt-br");
        const HoraAtual = new Date().toTimeString().substr(0, 5);
        const dataHoraAtual = dataAtual + " " + HoraAtual;
        const validadeFinal = this.acessoValidadeFinal_Text.textMasked + " " + this.acessoValidadeHoraFinal_Text.textMasked;

        if (!this.dateOperator.compareDateGT(dataHoraAtual, validadeFinal)) {
          this.savedCondition = false;
        } else {

          if (!this.visitadoNome_Text.validated && this.visitadoNome_Text.disabled == true) {
            //
          } else {
            this.savedCondition = this.savedCondition && true;
          }
        }
      }
    } else {
      this.savedCondition = true;
    }
  }

  onModal_Click() {
    this.identificacaoComplementoPessoaModal.show();
  }

  async onVisitado_FocusOut() {
    if (this.visitaAgendaId == 0 &&
      (this.visitadoNome_Text.text?.length > 0 || this.visitadoId > 0)) {
      const filter: PessoaInternaUsuarioFilter = (this.visitadoId > 0) ? 
        { id: { eq: this.visitadoId }, status: { eq: true } } :
        { nome: { contains: this.visitadoNome_Text.text }, status: { eq: true } };

      const pessoaInternaSort: PessoaInternaUsuarioSort = null;
      const pessoaInternaFilter: PessoaInternaUsuarioFilter = filter;
      await this.pessoaInternaService.readPessoaInternaUsuarios(pessoaInternaSort, pessoaInternaFilter)
        .subscribe(({ usuarioPessoaInterna }: read_PessoaInternaUsuario) => {

          if (usuarioPessoaInterna.totalCount == 1) {

            const pessoaInterna: PessoaInternaUsuario = usuarioPessoaInterna.nodes[0];
            this.visitadoId = pessoaInterna.id;
            this.visitadoNome_Text.text = pessoaInterna.nome;
            this.visitadoImagem = pessoaInterna.imagem?.imagem;
            this.visitadoAreaId = pessoaInterna.area?.id;
            this.visitadoAreaNome = pessoaInterna.area?.nome;
            this.visitadoGrupo_Text.text = pessoaInterna.grupo?.pessoaGrupo;
            this.visitadoLocalizacao_Text.text = pessoaInterna.localizacao;
            this.visitadoSetor_Text.text = pessoaInterna.area?.setor?.nome;
            this.visitadoTelefone_Text.text = (pessoaInterna.telefoneFixo != "") ? pessoaInterna.telefoneFixo : pessoaInterna.telefoneMovel;
            this.visitadoEmail = pessoaInterna.email;
            this.centroCustoNome = pessoaInterna.centroCusto.centroCusto;

            this.visitadoNome_Text.validated = true;

          } else {

            this.visitadoId = 0;
            this.visitadoNome_Text.validated = (this.actionbuttomService.editable == "no" || this.pessoaTipo == 1 || this.visitaAgendaId != 0);
            this.visitadoImagem = null;
            this.visitadoAreaId = 0;
            this.visitadoAreaNome = null;
            this.visitadoGrupo_Text.clear();
            this.visitadoLocalizacao_Text.clear();
            this.visitadoSetor_Text.clear();
            this.visitadoTelefone_Text.clear();
            this.visitadoEmail = null;
            this.centroCustoNome = "";

            if (this.actionbuttomService.editable != "no") this.identificacaoMotivo_Option.focus();

          }
          this.onSaved_Condition();
        })
    }
  }

  onVisitado_Change() {
    this.visitadoId = 0;
    this.onSaved_Condition();
  }

  onVisitado_FindClick() {
    this.pessoaModalService.pesquisaPessoa_Option.select(0);
    this.pessoaModalService.setFilter(this.visitadoNome_Text.text);
    this.pessoaModalService.show("Visitado");
  }

  onVisitado_KeyEnter() {
    if (this.visitadoId == 0) {
      this.pessoaModalService.pesquisaPessoa_Option.select(0);
      this.pessoaModalService.setFilter(this.visitadoNome_Text.text);
      this.pessoaModalService.show("Visitado");
    }
  }

  pessoaExternaModalSelect(pessoaSelect: PessoaExternaUsuario) {
    if (pessoaSelect != null) {
      this.pessoaId = pessoaSelect.id;
      this.pessoaDocTipo_Option.selectbyValue(pessoaSelect.documentoTipo);
      this.pessoaDocNumero_Text.text = pessoaSelect.documentoNumero;
      this.pessoaNome_Text.text = pessoaSelect.nome;

      this.pessoaDocNumero_Pesquisa = true;

      this.onPessoaDocNumero_FocusOut();
    } else {
      this.pessoaId = 0;
      this.pessoaDocNumero_Text.focus();
    }
  }

  pessoaModalSelect(pessoaSelect: PessoaInternaUsuario) {

    switch (this.pessoaModalService.tipoPessoa) {
      case "Visitante":
        if (pessoaSelect != null) {
          this.pessoaId = pessoaSelect.id;
          this.pessoaDocTipo_Option.selectbyValue(pessoaSelect.documentoTipo);
          this.pessoaDocNumero_Text.text = pessoaSelect.documentoNumero;
          this.pessoaNome_Text.text = pessoaSelect.nome;

          this.pessoaDocNumero_Pesquisa = true;

          this.onPessoaDocNumero_FocusOut();
        } else {
          this.pessoaId = 0;
          this.pessoaDocNumero_Text.focus();
        }
        break;

      case "Visitado":
        if (pessoaSelect != null) {
          this.visitadoId = pessoaSelect.id;
          this.onVisitado_FocusOut();
          this.identificacaoMotivo_Option.focus();
        } else {
          this.visitadoId = 0;
          this.visitadoNome_Text.clear();
          this.visitadoImagem = null;
          this.visitadoGrupo_Text.clear();
          this.visitadoLocalizacao_Text.clear();
          this.visitadoSetor_Text.clear();
          this.visitadoTelefone_Text.clear();

          this.visitadoNome_Text.focus();
        }
        break;
    }

    this.onSaved_Condition();
  }

  pessoaPopulate(showAbordagem: boolean = true) {
    return new Promise(async (resolve, rejects) => {

      if (this.pessoaTipo == PessoaTipo.interna) {
        const pessoaInternaFilter: PessoaInternaUsuarioFilter = { id: { eq: this.pessoaId } }
        await this.pessoaInternaService.readPessoaInternaUsuarios(null, pessoaInternaFilter)
          .subscribe(({ usuarioPessoaInterna }: read_PessoaInternaUsuario) => {
            if (usuarioPessoaInterna.totalCount > 0) {
              const node: PessoaInternaUsuario = usuarioPessoaInterna.nodes[0];
              this.pessoaImagem = node.imagem?.imagem;
              this.pessoaEmail_Text.text = node.email;
              this.pessoaTelefone_Text.text = node.telefoneFixo;
              this.visitadoComplemento = node.complemento1;
              this.visitadoEmail = node.email;

              // const pessoaInternaAbordagemFilter: PessoaInternaAbordagemFilter = { pessoaId: { eq: this.pessoaId } }
              // this.pessoaInternaService.readPessoaInternaAbordagem(null, pessoaInternaAbordagemFilter)
              //   .subscribe(({ usuarioPessoaInternaAbordagem }: read_PessoaInternaAbordagem) => {
              //     if (usuarioPessoaInternaAbordagem.totalCount > 0) {
              //       const node: PessoaInternaAbordagem = usuarioPessoaInternaAbordagem.nodes[0];
              //       this.abordagemInformativa_Text.text = node.mensagemInformativa;
              //       this.abordagemAdvertida_Text.text = node.mensagemAdvertida;
              //       this.abordagemRestritiva_Text.text = node.mensagemRestritiva;

              //       const abordagem: AbordagemMensagens = {
              //         mensagemInformativa: this.abordagemInformativa_Text.text,
              //         mensagemAdvertida: this.abordagemAdvertida_Text.text,
              //         mensagemRestritiva: this.abordagemRestritiva_Text.text
              //       }

              //       this.onAbordagem_Alert(abordagem, "nome", showAbordagem);

              //       if (this.nivelOperacaoService.checkAcessRights("67", 1)) {
              //         this.abordagemInformativa_Text.text = node.mensagemInformativa;
              //       } else {
              //         this.abordagemInformativa_Text.text = "***************************************";
              //       }

              //       if (this.nivelOperacaoService.checkAcessRights("68", 1)) {
              //         this.abordagemAdvertida_Text.text = node.mensagemAdvertida;
              //       } else {
              //         this.abordagemAdvertida_Text.text = "***************************************";
              //       }

              //       if (this.nivelOperacaoService.checkAcessRights("69", 1)) {
              //         this.abordagemRestritiva_Text.text = node.mensagemRestritiva;
              //       } else {
              //         this.abordagemRestritiva_Text.text = "***************************************";
              //       }

              //       this.abordagemInformativa_Text.disabled = !this.nivelOperacaoService.checkAcessRights("67", 0);

              //       if (node.mensagemAdvertida && node.mensagemAdvertida.length > 0 ||
              //         node.mensagemRestritiva && node.mensagemRestritiva.length > 0) {
              //         resolve(true);
              //       } else {
              //         resolve(false);
              //       }

              //     } else {
              //       this.abordagemInformativa_Text.clear();
              //       this.abordagemAdvertida_Text.clear();
              //       this.abordagemRestritiva_Text.clear();

              //       this.abordagemInformativa_Text.disabled = !this.nivelOperacaoService.checkAcessRights("67", 0);

              //       this.cardTabs_Options.setCondition('abordagem', AbordagemTipo.nenhum);
              //       resolve(false);
              //     }
              //   })
            }
          })
      }
    })
  }

  async updateArq_Grid(find?: Find, filter?: Filter) {
    if (!find) this.listView_Identificacao.clear();
    const filterGridArq: IdentificacaoControleArqFilter = { ...this.filterGrid, ...this.filterSchema.filterArq };

    this.listView_Identificacao.processingShow();
    await this.identificacaoControleService.readIdentificacaoControlesArq(this.filterSchema.order, filterGridArq, this.filterSchema.first)
      .subscribe(({ controleIdentificacaoArq }: read_IdentificacaoControleArq) => {
        this.actionbuttomService.enableButtons(0);
        this.listView_Identificacao.gridUpdate(controleIdentificacaoArq.nodes, find, filter);
      });
  }

  async update_Grid(find?: Find, filter?: Filter) {
    if (!find) this.listView_Identificacao.clear();
    const filterGrid: IdentificacaoControleFilter = { ...this.filterGrid, ...this.filterSchema.filter };
    this.listView_Identificacao.processingShow();
    this.gridSubscribe = await this.identificacaoControleService.readIdentificacaoControles(this.filterSchema.order, filterGrid, this.filterSchema.first)
      .subscribe(({ controleIdentificacao }: read_IdentificacaoControle) => {
        this.actionbuttomService.enableButtons(0);
        this.listView_Identificacao.gridUpdate(controleIdentificacao.nodes, find, filter);
      }, (error: any) => {
        this.listView_Identificacao.errorShow("Falha ao processar requisição da consulte. Tente Novamente!");
      });
  }

  getUltimoVisitado(visitadoId: number) {
    this.visitadoId = visitadoId;
    this.onVisitado_FocusOut();
  }

  nextFocus() {
    if (this.actionbuttomService.editable == "new" ||
      this.actionbuttomService.editable == "yes") {

      if (this.pessoaDocNumero_Text.disabled == false &&
        (this.pessoaDocNumero_Text.text?.length == 0 &&
          (this.actionbuttomService.editable == "new" ||
            this.actionbuttomService.editable == "yes"))) {
        this.pessoaDocNumero_Text.focus();
        return;
      }

      if (this.pessoaNome_Text.disabled == false &&
        (this.pessoaNome_Text.text?.length == 0 && this.actionbuttomService.editable == "new") ||
        (this.pessoaNome_Text.text?.length > 0 && this.actionbuttomService.editable == "yes")) {
        this.pessoaNome_Text.focus();
        return;
      }

      if (this.pessoaGrupo_Option.disabled == false && this.pessoaGrupo_Option.itemSelected.text?.length == 0) {
        this.pessoaGrupo_Option.focus();
        return;
      }

      if (this.pessoaTelefone_Text.disabled == false && this.pessoaTelefone_Text.text?.length == 0) {
        this.pessoaTelefone_Text.focus();
        return;
      }

      if (this.pessoaEmpresa_Option.disabled == false && this.pessoaEmpresa_Option.itemSelected.text?.length == 0) {
        this.pessoaEmpresa_Option.focus();
        return;
      }

      if (this.pessoaEmail_Text.disabled == false && this.pessoaEmail_Text.text?.length == 0) {
        this.pessoaEmail_Text.focus();
        return;
      }

      if (this.pessoaComplemento_Text.disabled == false && this.pessoaComplemento_Text.text?.length == 0) {
        this.pessoaComplemento_Text.focus();
        return;
      }

      if (this.pessoaVeiculoIdentificacao_Option.disabled == false && this.pessoaVeiculoIdentificacao_Option.itemSelected.text?.length == 0) {
        this.pessoaVeiculoIdentificacao_Option.focus();
        return;
      }

      if (this.identificacaoMotivo_Option.disabled == false && this.identificacaoMotivo_Option.itemSelected.text?.length == 0) {
        this.identificacaoMotivo_Option.focus();
        return;
      }

    }
  }

  onButton_Click(type: any) {
    switch (type) {
      case "insert":
        this.registroMaterialModalService.show();
        break;

      case "delete":
        break;
    }
  }

  onRegistroMaterialSelect(itemSelected: any) {
    const materiais = this.listView_IdentificacaoMaterial.dataGridBehavior?.value || [];
    materiais.push(itemSelected);
    this.listView_IdentificacaoMaterial.gridUpdate(materiais);    
  }

  onClose_Click() {

    this.cancelaIdentificacao = true;

    this.pessoaDocNumero_Text.clear();

    this.pessoaModalService.hide();
    this.errosModalService.hide();
    this.captureModalService.hide();
    this.pessoaExternaModalService.hide();

    this.cardTabs_Options.selectButtonByID(1);
    this.actionbuttomService.hideForm(true);
  }

  ngOnDestroy(): void {
    this.gridSubscribe?.unsubscribe();
    this.settings?.unsubscribe();
    this.treeviewItem?.unsubscribe();
  }

}
