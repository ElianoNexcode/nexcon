import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { ListViewGrid, Find, Filter, rowSelect } from 'src/app/@theme/components/grid/list-view/service/list-view.service';
import { AlertServiceComponent } from 'src/app/@theme/components/form/alert-card/service/alert-card.service';
import { ActionButtomService } from 'src/app/@theme/components/grid/action-buttom/service/action-button.service';
import { InputLabel } from 'src/app/@theme/components/form/input-label/service/input-label.service';
import { ComboOptions, Item } from 'src/app/@theme/components/form/combobox/service/combobox.service';
import { InputMultiLabel } from 'src/app/@theme/components/form/input-multi-label/service/input-multi-label';
import { TextareaLabel } from 'src/app/@theme/components/form/textarea-label/service/textarea-label.service';
import { OptionsGroup } from 'src/app/@theme/components/form/select-group/service/select-group.service';
import { SortOperationKind } from 'src/app/@core/api/generic-graphql';
import {
  PessoaGrupo,
  PessoaGrupoData,
  PessoaGrupoFilter,
  PessoaGrupoSort,
  read_PessoaGrupo
} from 'src/app/@core/data/grupo-pessoa';
import {
  DocumentoGrupo,
  DocumentoGrupoData,
  DocumentoGrupoFilter,
  DocumentoGrupoSort,
  read_DocumentoGrupo
} from 'src/app/@core/data/grupo-documento';
import {
  AmbienteData,
  AmbienteSistema,
  read_AmbienteSistema
} from 'src/app/@core/data/sistema-ambiente';
import { TabsService } from 'src/app/@theme/layouts/tabs/service/tabs.service';
import { DateOperator } from 'src/app/@theme/components/miscellaneous/date-operator/date-operator';
import { Buttons, CardTabsOptions } from 'src/app/@theme/layouts/card-tabs/service/cart-tabs.service';
import { ConfigStorage, SiteConfig } from 'src/app/@core/storage/config/config';
import { NivelOperacaoService } from '../../configuracao/operador/nivel-operacao/service/nivel-operacao.service';
import { Abordagem, PessoaInternaUsuarioMutation, Responsavel } from 'src/app/@core/data/usuario-pessoa-interna';
import {
  create_PessoaInternaUsuario,
  read_PessoaInternaUsuario,
  update_PessoaInternaUsuario,
  delete_PessoaInternaUsuario,
  PessoaInternaUsuarioData,
  PessoaInternaUsuario,
  PessoaInternaUsuarioSort,
  PessoaInternaUsuarioFilter
} from 'src/app/@core/data/usuario-pessoa-interna';

import { StateGrid, AbordagemTipo, Status, VeiculoTipo, StatusColor, } from 'src/app/@core/enum';

import {
  read_Site,
  Site,
  SiteData,
  SiteFilter,
  SiteSort
} from 'src/app/@core/data/reparticao-site';

import {
  read_SetorReparticao,
  SetorReparticao,
  SetorReparticaoData,
  SetorReparticaoFilter,
  SetorReparticaoSort
} from 'src/app/@core/data/reparticao-setor';
import {
  read_AreaReparticao,
  AreaReparticao,
  AreaReparticaoData,
  AreaReparticaoFilter,
  AreaReparticaoSort
} from 'src/app/@core/data/reparticao-area';
import {
  read_EmpresaReparticao,
  EmpresaReparticao,
  EmpresaReparticaoData,
  EmpresaReparticaoFilter,
  EmpresaReparticaoSort
} from 'src/app/@core/data/reparticao-empresa';
import {
  read_CentroCustoGrupo,
  CentroCustoGrupo,
  CentroCustoGrupoData,
  CentroCustoGrupoFilter,
  CentroCustoGrupoSort
} from 'src/app/@core/data/grupo-centro-custo';
import { FilterPessoaModal, PessoaInternaModalService } from 'src/app/@theme/modals/pessoa-interna/service/pessoa-modal.service';
import { BoxPanel } from 'src/app/@theme/layouts';
import { TreeView } from 'src/app/@theme/layouts/treeview/service/treeview';
import { TreeviewService } from 'src/app/@theme/layouts/treeview/service/treeview.service';
import { BehaviorSubject } from 'rxjs';
import { CaptureModalService } from 'src/app/@theme/modals/capture/service/capture-modal.service';
import { FilterVeiculoModal, VeiculoInternoModalService } from 'src/app/@theme/modals/veiculo-interno/service/veiculo-interno-modal.service';
import { VeiculoInternoUsuario, VeiculoInternoUsuarioFilter } from 'src/app/@core/data/usuario-veiculo-interno';
import { UsuarioNivelAcessoModalService } from 'src/app/@theme/modals/usuario-nivel-acesso/service/usuario-nivel-acesso-modal.service';
import { VeiculoModeloGrupo } from 'src/app/@core/data/grupo-veiculo-modelo';

export enum CardTabID {
  Pessoa = 1,
  Veiculo = 2,
  Acesso = 3,
  Responsavel = 4,
  Abordagem = 5
}
@Component({
  selector: 'nex-pessoa-interna',
  templateUrl: './pessoa-interna.component.html',
  host: { '(window:resize)': 'onResize()' },
  styleUrls: ['./pessoa-interna.component.scss']
})

export class PessoaInternaComponent implements OnInit, AfterViewInit ,OnDestroy {

  listView_PessoaInterna: ListViewGrid = new ListViewGrid();
  captureModalService: CaptureModalService = new CaptureModalService();

  tabsConfiguracao_Option: TabsService = new TabsService();
  tabsValidade_Option: TabsService = new TabsService();
  tabsNivelAcesso_Option: TabsService = new TabsService();

  boxButton: BoxPanel = new BoxPanel();

  id?: number;
  pessoaImagem?: Array<number>;
  pessoaNome_Text: InputLabel = new InputLabel();
  pessoaGrupo_Option: ComboOptions = new ComboOptions();
  pessoaTelefoneFixo_Text: InputLabel = new InputLabel();
  pessoaTelefoneMovel_Text: InputLabel = new InputLabel();
  pessoaEmail_Text: InputLabel = new InputLabel();
  pessoaObservacao_Text: InputLabel = new InputLabel();

  identificacaoId_Text: InputLabel = new InputLabel();
  identificacaoDocTipo_Option: ComboOptions = new ComboOptions();
  identificacaoDocNumero_Text: InputLabel = new InputLabel();
  identificacaoCognome_Text: InputLabel = new InputLabel();
  identificacaoNascimento_Text: InputLabel = new InputLabel();
  identificacaoHabilitacao_Text: InputLabel = new InputLabel();
  identificacaoCategoria_Text: InputLabel = new InputLabel();
  identificacaoValidade_Text: InputLabel = new InputLabel();
  identificacaoCargo_Option: ComboOptions = new ComboOptions();
  identificacaoSupervisor_Text: InputLabel = new InputLabel();

  reparticaoSite_Option: ComboOptions = new ComboOptions();
  reparticaoSetor_Option: ComboOptions = new ComboOptions();
  reparticaoArea_Option: ComboOptions = new ComboOptions();
  reparticaoLocalizacao_Option: ComboOptions = new ComboOptions();
  reparticaoEntidadeExterna_Option: ComboOptions = new ComboOptions();

  complementoLabel1: string = "Complemento 1";
  complementoLabel2: string = "Complemento 2";
  complementoLabel3: string = "Complemento 3";
  complementoLabel4: string = "Complemento 4";

  complemento1_Text: InputLabel = new InputLabel();
  complemento2_Text: InputLabel = new InputLabel();
  complemento3_Text: InputLabel = new InputLabel();
  complemento4_Text: InputLabel = new InputLabel();
  complementoCentroCusto_Option: ComboOptions = new ComboOptions();

  enderecoLogradouro_Text: InputLabel = new InputLabel();
  enderecoNumero_Text: InputLabel = new InputLabel();
  enderecoComplemento_Text: InputLabel = new InputLabel();
  enderecoBairro_Text: InputLabel = new InputLabel();
  enderecoCEP_Text: InputLabel = new InputLabel();
  enderecoCidade_Text: InputLabel = new InputLabel();
  enderecoEstado_Text: InputLabel = new InputLabel();
  enderecoPais_Text: InputLabel = new InputLabel();

  validadeEstado_Options: ComboOptions = new ComboOptions();
  contratacaoInicio_Text: InputMultiLabel = new InputMultiLabel();
  contratacaoFim_Text: InputMultiLabel = new InputMultiLabel();
  integracaoInicio_Text: InputMultiLabel = new InputMultiLabel();
  integracaoFim_Text: InputMultiLabel = new InputMultiLabel();
  segurancaInicio_Text: InputMultiLabel = new InputMultiLabel();
  segurancaFim_Text: InputMultiLabel = new InputMultiLabel();
  exameInicio_Text: InputMultiLabel = new InputMultiLabel();
  exameFim_Text: InputMultiLabel = new InputMultiLabel();

  feriasInicio_Text: InputMultiLabel = new InputMultiLabel();
  feriasFim_Text: InputMultiLabel = new InputMultiLabel();
  afastamentoInicio_Text: InputMultiLabel = new InputMultiLabel();
  afastamentoFim_Text: InputMultiLabel = new InputMultiLabel();

  visita_Options: OptionsGroup = new OptionsGroup();

  listView_PessoaVeiculo: ListViewGrid = new ListViewGrid();
  listView_VagaGaragem: ListViewGrid = new ListViewGrid();

  idVeiculo?: number;
  pessoaVeiculoModalService: VeiculoInternoModalService = new VeiculoInternoModalService();
  filterVeiculoInterno?: VeiculoInternoUsuarioFilter;

  cartaoOficial_Text: InputLabel = new InputLabel();
  cartaoProvisorio_Text: InputLabel = new InputLabel();
  creditoAcesso_Text: InputLabel = new InputLabel();
  senha_Text: InputLabel = new InputLabel();

  listView_NivelAcessoPermanente: ListViewGrid = new ListViewGrid();  
  idNivelAcessoPermanente?: number;
  listView_NivelAcessoRotativo: ListViewGrid = new ListViewGrid();
  idNivelAcessoRotativo?: number;
  controle_Options: OptionsGroup = new OptionsGroup();

  usuarioNivelAcessoModalService: UsuarioNivelAcessoModalService = new UsuarioNivelAcessoModalService();

  listView_PessoaResponsavel: ListViewGrid = new ListViewGrid();
  pessoaModalService: PessoaInternaModalService = new PessoaInternaModalService();
  idResponsavel?: number;

  abordagemInformativa_Text: TextareaLabel = new TextareaLabel();
  abordagemAdvertida_Text: TextareaLabel = new TextareaLabel();
  abordagemRestritiva_Text: TextareaLabel = new TextareaLabel();

  pessoaInterna?: PessoaInternaUsuario;
  dateOperator: DateOperator = new DateOperator();
  showSpinner: boolean = false;
  order_by: PessoaInternaUsuarioSort = { nome: SortOperationKind.ASC };
  filter?: PessoaInternaUsuarioFilter;
  filterGrid?: PessoaInternaUsuarioFilter;
  filterPessoaInterna?: PessoaInternaUsuarioFilter;
  supervisorId?: number;

  cardTabs_Options: CardTabsOptions = new CardTabsOptions();
  
  estado?: number;

  nivelOperacaoService: NivelOperacaoService | null = new NivelOperacaoService(null);

  textMaskChar: string = "***************************************";
  pessoaInternaAbordagem?: Abordagem;

  settings: BehaviorSubject<any>;
  treeviewItem: BehaviorSubject<any>;

  siteId: number = 0;
  setorId: number = 0;
  areaId: number = 0;

  alertService: AlertServiceComponent = new AlertServiceComponent();

  editable?: boolean;

  constructor(
    public actionbuttomService: ActionButtomService,
    public treeviewService: TreeviewService,
    private pessoaInternaService: PessoaInternaUsuarioData,
    private pessoaGrupoService: PessoaGrupoData,
    private documentoGrupoService: DocumentoGrupoData,
    private reparticaoEmpresaService: EmpresaReparticaoData,
    private centroCustoService: CentroCustoGrupoData,
    private siteService: SiteData,
    private setorReparticaoService: SetorReparticaoData,
    private areaReparticaoService: AreaReparticaoData,
    private config: ConfigStorage,
    private ambienteService: AmbienteData) {

    this.settings = this.config.siteSubject();
    this.treeviewItem = this.treeviewService.itemSubject();

    this.actionbuttomService.relationGrid = "lstPessoaInterna";
    this.actionbuttomService.recurso = "2E";
    this.actionbuttomService.top_action_buttons = [
      { "id": 0, "text": "forms.buttons.create", "enabled": true, "condition": "always", "maximized": true, "visibled": false, "openForm": true, "editable": "new", },
      { "id": 1, "text": "forms.buttons.update", "enabled": false, "condition": "select", "maximized": true, "visibled": false, "openForm": true, "editable": "yes", },
      { "id": 2, "text": "forms.buttons.read", "enabled": false, "condition": "select", "maximized": true, "visibled": false, "openForm": true, "editable": "no", },
      { "id": 3, "text": "forms.buttons.delete", "enabled": false, "condition": "multi", "openForm": false, "visibled": false, "question": "forms.questions.delete" }];      

    this.listView_PessoaInterna.name = "lstPessoaInterna";
    this.listView_PessoaInterna.colorField = "status";
    this.listView_PessoaInterna.colorEnum = StatusColor;
    this.listView_PessoaInterna.title = "Lista de Pessoas Internas";
    this.listView_PessoaInterna.grid = [
      { "header": "", "entity": "imagem", "field": "imagem", "width": 3, "align": "center", "type": "image" },
      { "header": "Nome", "field": "nome", "width": 30, "align": "left" },
      { "header": "Grupo", "entity": "grupo", "field": "pessoaGrupo", "width": 14, "align": "left" },
      { "header": "Telefone", "field": "telefoneFixo", "width": 17, "align": "left" },
      { "header": "E-mail", "field": "email", "width": 25, "align": "left" },
      { "header": "Status", "field": "status", "width": 11, "align": "left", enum: StateGrid }];

    this.pessoaModalService.name = "pessoaModal";
    this.pessoaModalService.pesquisaPessoa_Option.name = "cbPesquisaSupervisor";
    this.pessoaModalService.grid = [
      { "header": "Nome", "field": "nome", "width": 20, "align": "left" },
      { "header": "Grupo", "entity": "grupo", "field": "pessoaGrupo", "width": 20, "align": "left" },
      { "header": "Localização", "field": "localizacao", "width": 20, "align": "left" },
      { "header": "Telefone Fixo", "field": "telefoneFixo", "width": 20, "align": "left" },
      { "header": "Email", "field": "email", "width": 20, "align": "left" }];
  
    this.pessoaVeiculoModalService.name = "pessoaVeiculoModal";
    this.pessoaVeiculoModalService.pesquisaVeiculo_Option.name = "cbPesquisaVeiculo";
    this.pessoaVeiculoModalService.grid = [
      { "header": "Veículo ID", "field": "placa", "width": 15, "align": "left" },
      { "header": "Tipo", "field": "tipo", "width": 15, "align": "left", "enum": VeiculoTipo },
      { "header": "Modelo", "entity": "modelo", "field": "veiculoModelo", "width": 25, "align": "left" },
      { "header": "Cor", "field": "cor", "width": 45, "align": "left" }];      
  
    this.cardTabs_Options.add({ id: CardTabID.Pessoa, text: 'Pessoa', name: 'pessoa' });
    this.cardTabs_Options.add({ id: CardTabID.Veiculo, text: 'Veículo', name: 'veiculo' });
    this.cardTabs_Options.add({ id: CardTabID.Acesso, text: 'Acesso', name: 'acesso' });
    this.cardTabs_Options.add({ id: CardTabID.Responsavel, text: 'Responsável', name: 'responsavel' });
    this.cardTabs_Options.add({ id: CardTabID.Abordagem, text: 'Abordagem', name: 'abordagem' });
    this.cardTabs_Options.selectButtonByID(CardTabID.Pessoa);
  
    this.boxButton.add("btOpen", "insert", false);
    this.boxButton.add("btClose", "delete", false);

    this.tabsConfiguracao_Option.add("tabIdentificacao", "Identificação", true);
    this.tabsConfiguracao_Option.add("tabReparticao", "Repartição");
    this.tabsConfiguracao_Option.add("tabComplemento", "Complemento");
    this.tabsConfiguracao_Option.add("tabEndereco", "Endereço");

    this.tabsValidade_Option.add("tabValidade", "Validade", true);
    this.tabsValidade_Option.add("tabLicenca", "Licença", false);
    this.tabsValidade_Option.add("tabVisita", "Visita", false, "block", "#192038");

    this.tabsNivelAcesso_Option.add("tabNivelAcessoPermanente", "Nível Acesso Permanente", true);
    this.tabsNivelAcesso_Option.add("tabNivelAcessoRotativo", "Nível Acesso Rotativo", false);
    this.tabsNivelAcesso_Option.add("tabControles", "Controles", false, "block", "#192038");

    // ------ inicio cadastro básico --------    
    this.pessoaNome_Text.name = "txtNome";
    this.pessoaNome_Text.rules = "uppercase";
    this.pessoaNome_Text.minLength = 3;
    this.pessoaNome_Text.maxLength = 50;

    this.pessoaGrupo_Option.name = "cbGrupoPessoa";
    this.pessoaGrupo_Option.add("", null, 0);

    const sortPessoaGrupo: PessoaGrupoSort = { pessoaGrupo: SortOperationKind.ASC };
    const filterPessoaGrupo: PessoaGrupoFilter = { pessoaInterna: { eq: true } };
    this.pessoaGrupoService.readPessoaGrupos(sortPessoaGrupo, filterPessoaGrupo)
      .subscribe(({ grupoPessoa }: read_PessoaGrupo) => {
        const nodes: PessoaGrupo[] = grupoPessoa.nodes;
        this.pessoaGrupo_Option.addRange(nodes.map(grupo => {
          return {id: grupo.id, text: grupo.pessoaGrupo, value: null}
        }));
      });

    this.pessoaTelefoneFixo_Text.name = "txtTelefoneFixo";
    this.pessoaTelefoneFixo_Text.rules = "telfixo";
    this.pessoaTelefoneFixo_Text.regex = "noFilter";
    this.pessoaTelefoneFixo_Text.maxLength = 15;

    this.pessoaTelefoneMovel_Text.name = "txtTelefoneMovel";
    this.pessoaTelefoneMovel_Text.rules = "telmovel";
    this.pessoaTelefoneMovel_Text.regex = "noFilter"
    this.pessoaTelefoneMovel_Text.maxLength = 15;

    this.pessoaEmail_Text.name = "txtEmail";
    this.pessoaEmail_Text.rules = "email";
    this.pessoaEmail_Text.regex = "email";
    this.pessoaEmail_Text.maxLength = 50;

    this.pessoaObservacao_Text.name = "txtObservacao";
    this.pessoaObservacao_Text.rules = "uppercase";
    this.pessoaObservacao_Text.regex = "noFilter";
    this.pessoaObservacao_Text.maxLength = 100;
    // -------- fim cadastro básico ---------

    // ------- inicio identificação ---------
    this.identificacaoId_Text.name = "txtId";
    this.identificacaoId_Text.rules = "onlynumbers";
    this.identificacaoId_Text.maxLength = 15;

    this.identificacaoDocTipo_Option.name = "cbPessoaInternaTipoDocumento";
    this.identificacaoDocTipo_Option.input = this.identificacaoDocNumero_Text;
    const sortDocumentoGrupo: DocumentoGrupoSort = { id: SortOperationKind.ASC };
    const filterDocumentoGrupo: DocumentoGrupoFilter = { interno: {eq: true }};
    this.documentoGrupoService.readDocumentoGrupos(sortDocumentoGrupo, filterDocumentoGrupo)
      .subscribe(({ grupoDocumento }: read_DocumentoGrupo) => {
        const nodes: DocumentoGrupo[] = grupoDocumento.nodes;
        this.identificacaoDocTipo_Option.addRange(nodes.map(documento => {
          return {id: documento.id, text: documento.tipo, value: documento.tipo}
        }));
      });

    this.identificacaoDocNumero_Text.name = "txtDocNumero";
    this.identificacaoDocNumero_Text.rules = "lettersNumbers";
    this.identificacaoDocNumero_Text.maxLength = 15;
    this.identificacaoDocNumero_Text.minLength = 0;

    this.identificacaoCognome_Text.name = "txtCognome";
    this.identificacaoCognome_Text.rules = "uppercase";
    this.identificacaoCognome_Text.maxLength = 16;

    this.identificacaoNascimento_Text.name = "txtNascimento";
    this.identificacaoNascimento_Text.textAlign = "center";
    this.identificacaoNascimento_Text.rules = "date";
    this.identificacaoNascimento_Text.regex = "date";
    this.identificacaoNascimento_Text.maxLength = 10;

    this.identificacaoHabilitacao_Text.name = "txtHabilitacao";
    this.identificacaoHabilitacao_Text.rules = "onlynumbers";
    this.identificacaoHabilitacao_Text.regex = "numeric";
    this.identificacaoHabilitacao_Text.maxLength = 11;

    this.identificacaoCategoria_Text.name = "txtCategoria";
    this.identificacaoCategoria_Text.textAlign = "center";
    this.identificacaoCategoria_Text.rules = "lettersNumbers";
    this.identificacaoCategoria_Text.maxLength = 3;
    
    this.identificacaoValidade_Text.name = "txtValidade";
    this.identificacaoValidade_Text.textAlign = "center";
    this.identificacaoValidade_Text.rules = "date";
    this.identificacaoValidade_Text.regex = "date";
    this.identificacaoValidade_Text.maxLength = 10;

    this.identificacaoCargo_Option.name = "cbCargo";
    this.identificacaoCargo_Option.maxLength = 30;

    this.identificacaoSupervisor_Text.name = "txtSupervisor";
    this.identificacaoSupervisor_Text.rules = "uppercase";    
    this.identificacaoSupervisor_Text.maxLength = 100;
    this.identificacaoSupervisor_Text.disable();
    // -------- fim identificação -----------

    // -------- inicio repartição -----------
    this.reparticaoSite_Option.name = "cbSite";
    this.reparticaoSite_Option.disable();
    this.reparticaoSite_Option.maxLength = 20;

    this.reparticaoSetor_Option.name = "cbSetor";
    this.reparticaoSetor_Option.disable();
    this.reparticaoSetor_Option.maxLength = 30;

    this.reparticaoArea_Option.name = "cbArea";
    this.reparticaoArea_Option.disable();
    this.reparticaoArea_Option.maxLength = 30;

    this.reparticaoLocalizacao_Option.name = "cbLocalizacao";
    this.reparticaoLocalizacao_Option.maxLength = 30;

    this.reparticaoEntidadeExterna_Option.name = "cbEntidadeExterna";
    this.reparticaoEntidadeExterna_Option.maxLength = 30;
    // ----------- fim repartição -----------

    // --------- inicio complemento ---------
    this.complemento1_Text.name = "txtComplemento1";
    this.complemento1_Text.rules = "uppercase";
    this.complemento1_Text.maxLength = 30;

    this.complemento2_Text.name = "txtComplemento2";
    this.complemento2_Text.rules = "uppercase";
    this.complemento2_Text.maxLength = 30;

    this.complemento3_Text.name = "txtComplemento3";
    this.complemento3_Text.rules = "uppercase";
    this.complemento3_Text.maxLength = 30;

    this.complemento4_Text.name = "txComplemento4";
    this.complemento4_Text.rules = "uppercase";
    this.complemento4_Text.maxLength = 30;

    this.complementoCentroCusto_Option.name = "cbCentroCusto";
    this.complementoCentroCusto_Option.maxLength = 30;
    // ---------- fim complemento -----------

    // ---------- inicio endereço -----------
    this.enderecoLogradouro_Text.name = "txtLogradouro";
    this.enderecoLogradouro_Text.rules = "uppercase";
    this.enderecoLogradouro_Text.maxLength = 30;

    this.enderecoNumero_Text.name = "txtNumero";
    this.enderecoNumero_Text.rules = "uppercase";
    this.enderecoNumero_Text.maxLength = 6;

    this.enderecoComplemento_Text.name = "txtComplemento";
    this.enderecoComplemento_Text.rules = "uppercase";
    this.enderecoComplemento_Text.maxLength = 20;

    this.enderecoBairro_Text.name = "txtBairro";
    this.enderecoBairro_Text.rules = "uppercase";
    this.enderecoBairro_Text.maxLength = 20;

    this.enderecoCEP_Text.name = "txtCEP";
    this.enderecoCEP_Text.rules = "cep";
    this.enderecoCEP_Text.maxLength = 9;

    this.enderecoCidade_Text.name = "txtCidade";
    this.enderecoCidade_Text.rules = "uppercase";
    this.enderecoCidade_Text.maxLength = 30;

    this.enderecoEstado_Text.name = "txtEstado";
    this.enderecoEstado_Text.rules = "uppercase";
    this.enderecoEstado_Text.maxLength = 20;

    this.enderecoPais_Text.name = "txtPais";
    this.enderecoPais_Text.rules = "uppercase";
    this.enderecoPais_Text.maxLength = 20;
    // ----------- fim endereço -------------

    // ---------- inicio validade -----------
    this.validadeEstado_Options.name = "cbValidades"
    this.validadeEstado_Options.add(Status[Status.LIVRE], "livre", Status.LIVRE);
    this.validadeEstado_Options.add(Status[Status.BLOQUEADO], "bloqueado", Status.BLOQUEADO);

    this.contratacaoInicio_Text.name = "txtContratacaoInicio";
    this.contratacaoInicio_Text.label = "Início";
    this.contratacaoInicio_Text.rules = "date";
    this.contratacaoInicio_Text.regex = "date";
    this.contratacaoInicio_Text.maxLength = 10;

    this.contratacaoFim_Text.name = "txtContratacaoFim";
    this.contratacaoFim_Text.label = "Fim";
    this.contratacaoFim_Text.rules = "date";
    this.contratacaoFim_Text.regex = "date";
    this.contratacaoFim_Text.maxLength = 10;

    this.integracaoInicio_Text.name = "txtIntegracaoInicio";
    this.integracaoInicio_Text.label = "Início";
    this.integracaoInicio_Text.rules = "date";
    this.integracaoInicio_Text.regex = "date";
    this.integracaoInicio_Text.maxLength = 10;

    this.integracaoFim_Text.name = "txtIntegracaoFim";
    this.integracaoFim_Text.label = "Fim";
    this.integracaoFim_Text.rules = "date";
    this.integracaoFim_Text.regex = "date";
    this.integracaoFim_Text.maxLength = 10;

    this.segurancaInicio_Text.name = "txtSegurancaInicio";
    this.segurancaInicio_Text.label = "Início";
    this.segurancaInicio_Text.rules = "date";
    this.segurancaInicio_Text.regex = "date";
    this.segurancaInicio_Text.maxLength = 10;

    this.segurancaFim_Text.name = "txtSegurancaFim";
    this.segurancaFim_Text.label = "Fim";
    this.segurancaFim_Text.rules = "date";
    this.segurancaFim_Text.regex = "date";
    this.segurancaFim_Text.maxLength = 10;

    this.exameInicio_Text.name = "txtExameInicio";
    this.exameInicio_Text.label = "Início";
    this.exameInicio_Text.rules = "date";
    this.exameInicio_Text.regex = "date";
    this.exameInicio_Text.maxLength = 10;

    this.exameFim_Text.name = "txtExameFim";
    this.exameFim_Text.label = "Fim";
    this.exameFim_Text.rules = "date";
    this.exameFim_Text.regex = "date";
    this.exameFim_Text.maxLength = 10;
    // ------------ fim validade ------------

    // ---------- inicio licença ------------
    this.feriasInicio_Text.name = "txtFeriasInicio";
    this.feriasInicio_Text.label = "Início";
    this.feriasInicio_Text.rules = "date";
    this.feriasInicio_Text.regex = "date";
    this.feriasInicio_Text.maxLength = 10;

    this.feriasFim_Text.name = "txtFeriasFim";
    this.feriasFim_Text.label = "Fim";
    this.feriasFim_Text.rules = "date";
    this.feriasFim_Text.regex = "date";
    this.feriasFim_Text.maxLength = 10;

    this.afastamentoInicio_Text.name = "txtAfastamentoInicio";
    this.afastamentoInicio_Text.label = "Início";
    this.afastamentoInicio_Text.rules = "date";
    this.afastamentoInicio_Text.regex = "date";
    this.afastamentoInicio_Text.maxLength = 10;

    this.afastamentoFim_Text.name = "txtAfastamentoFim";
    this.afastamentoFim_Text.label = "Fim";
    this.afastamentoFim_Text.rules = "date";
    this.afastamentoFim_Text.regex = "date";
    this.afastamentoFim_Text.maxLength = 10;
    // ------------ fim licença -------------

    // ----------- inicio visita ------------
    this.visita_Options.add(0, "Não pode receber visitas", "recebeVisita");
    this.visita_Options.add(1, "Não pode autorizar visitas", "autorizaVisita");
    // ------------ fim visita --------------
    
    // ---------- inicio veiculo ------------
    this.listView_PessoaVeiculo.name = "lstPessoaVeiculo";
    this.listView_PessoaVeiculo.gridOnly = true;
    this.listView_PessoaVeiculo.noPaging = true;
    this.listView_PessoaVeiculo.noBorder = true;
    this.listView_PessoaVeiculo.grid = [
      { "header": "Veículo ID", "field": "placa", "width": 25, "align": "left" },
      { "header": "Tipo", "field": "tipo", "width": 20, "align": "left", "enum": VeiculoTipo },
      { "header": "Modelo", "field": "veiculoModelo", "width": 30, "align": "left" },
      { "header": "Cor", "field": "cor", "width": 25, "align": "left" }];

    this.listView_VagaGaragem.name = "lstVagaGaragem";
    this.listView_VagaGaragem.gridOnly = true;
    this.listView_VagaGaragem.noPaging = true;
    this.listView_VagaGaragem.noBorder = true;
    this.listView_VagaGaragem.grid = [
      { "header": "Vaga", "field": "garagem", "width": 20, "align": "left" },
      { "header": "Estacionamento", "field": "estacionamento", "width": 40, "align": "left" },
      { "header": "Site", "field": "site", "width": 40, "align": "left" }];
    // ------------ fim veiculo -------------

    // ---------- início acesso -------------
    this.cartaoOficial_Text.name = "txtCartaoOficial";
    this.cartaoOficial_Text.rules = "onlynumbers";
    this.cartaoOficial_Text.maxLength = 15;

    this.cartaoProvisorio_Text.name = "txtCartaoProvisorio";
    this.cartaoProvisorio_Text.rules = "onlynumbers";
    this.cartaoProvisorio_Text.maxLength = 15;
    this.cartaoProvisorio_Text.disable();
    
    this.senha_Text.name = "txtSenha";
    this.senha_Text.rules = "password";
    this.senha_Text.maxLength = 6;
    this.senha_Text.disable();

    this.creditoAcesso_Text.name = "txtCreditoAcesso";
    this.creditoAcesso_Text.rules = "onlynumbers";
    this.creditoAcesso_Text.maxLength = 4;

    this.listView_NivelAcessoPermanente.name = "lstNivelAcessoPermanente";
    this.listView_NivelAcessoPermanente.gridOnly = true;
    this.listView_NivelAcessoPermanente.noPaging = true;
    this.listView_NivelAcessoPermanente.noBorder = true;
    this.listView_NivelAcessoPermanente.grid = [
      { "header": "", "field": "nivelAcessoId", "width": 0, "align": "left", "visible": false},
      { "header": "Nível de Acesso", "field": "nivelAcesso", "width": 50, "align": "left" },
      { "header": "Site", "field": "site", "width": 50, "align": "left" }];

    this.listView_NivelAcessoRotativo.name = "lstNivelAcessoRotativo";
    this.listView_NivelAcessoRotativo.gridOnly = true;
    this.listView_NivelAcessoRotativo.noPaging = true;
    this.listView_NivelAcessoRotativo.noBorder = true;
    this.listView_NivelAcessoRotativo.grid = [
      { "header": "", "field": "nivelAcessoId", "width": 0, "align": "left", "visible": false},
      { "header": "Nível de Acesso", "field": "nivelAcesso", "width": 50, "align": "left" },
      { "header": "Site", "field": "site", "width": 50, "align": "left" }];
  
    this.controle_Options.name = "cbControle";
    this.controle_Options.add(0, "Ignorar controle de direção", "ignorarDirecao");
    this.controle_Options.add(1, "Ignorar controle de rota", "ignorarRota");
    this.controle_Options.add(2, "Ignorar temporização de passagem", "ignorarTemporizacao");
    this.controle_Options.add(3, "Ignorar validação biométrica (1:1)", "ignorarBiometria");
    this.controle_Options.add(4, "Ignorar validação e computação de crédito", "ignorarCredito");
    this.controle_Options.add(5, "Ignorar validação externa", "ignorarValidacaoExterna");
    this.controle_Options.add(6, "Liberar saída se validade expirada", "liberarSaidaExpirada");

    // ------------ fim acesso --------------

    // --------- inicio responsavel ---------
    this.listView_PessoaResponsavel.name = "lstPessoaResponsavel";
    this.listView_PessoaResponsavel.gridOnly = true;
    this.listView_PessoaResponsavel.noPaging = true;
    this.listView_PessoaResponsavel.noBorder = true;
    this.listView_PessoaResponsavel.grid = [
      { "header": "Nome", "field": "nome", "width": 30, "align": "left" },
      { "header": "Grupo", "field": "grupo", "width": 20, "align": "left" },
      { "header": "Área", "field": "area", "width": 20, "align": "left" },
      { "header": "Telefone Fixo", "field": "telefoneFixo", "width": 15, "align": "left" },
      { "header": "Telefone Móvel", "field": "telefoneMovel", "width": 15, "align": "left" }];
    // ---------- fim responsavel -----------

    // --------- inicio abordagem -----------
    this.abordagemInformativa_Text.name = "txtAbordagemInformativa";
    this.abordagemInformativa_Text.maxLength = 1000;

    this.abordagemAdvertida_Text.name = "txtAbordagemAdvertida";
    this.abordagemAdvertida_Text.maxLength = 1000;

    this.abordagemRestritiva_Text.name = "txtAbordagemRestritiva";
    this.abordagemRestritiva_Text.maxLength = 1000;
    // ---------- fim abordagem -------------

    const find = null;
    const filter = { select: "Nome", field: "pessoaInterna", value: "" };

    this.settings
      .subscribe((site: SiteConfig) => {
        if (site != null) {
          this.siteId = site.id;
          this.filter = undefined;
          const filterSite: SetorReparticaoFilter = { siteId: { eq: site.id } };
          this.treeviewPopulate(filterSite);
        }
      });
 
    this.treeviewItem
      .subscribe((areaId: string) => {
        if (areaId != null) {
          this.areaId = parseInt(areaId);
          this.filter = { areaId: { eq: this.areaId } };

          const AreaFilter: AreaReparticaoFilter = { id: { eq: this.areaId} };
          this.areaReparticaoService.readAreaReparticao(null, AreaFilter)
            .subscribe(({reparticaoArea}: read_AreaReparticao) => {
              const areaReparticao: AreaReparticao = reparticaoArea.nodes[0];
              this.setorId = areaReparticao?.setorId;

              this.onSitePopulate({id: this.siteId});
              
            });

          this.update_Grid(null, { select: "nome", field: "nome", value: "" });
          this.actionbuttomService.top_action_buttons.forEach(topButton => {
            topButton.visibled = true;
          });
        }

      });
  }

  ngOnInit() {
    this.ambienteService.readAmbienteSistema()
      .subscribe(({ sistemaConfiguracao }: read_AmbienteSistema) => {
        const nodes: AmbienteSistema = sistemaConfiguracao.nodes[0];
        if (nodes.pessoaComplemento1?.length > 0) this.complementoLabel1 = nodes.pessoaComplemento1;
        if (nodes.pessoaComplemento2?.length > 0) this.complementoLabel2 = nodes.pessoaComplemento2;
        if (nodes.pessoaComplemento3?.length > 0) this.complementoLabel3 = nodes.pessoaComplemento3;
        if (nodes.pessoaComplemento4?.length > 0) this.complementoLabel4 = nodes.pessoaComplemento4;
      });
  }

  ngAfterViewInit(): void {
    this.onResize();   
  }

  onActionButtom_Click(actionButtomSelect: any) {
    switch (actionButtomSelect.text) {
      case "forms.buttons.create":
        this.id = undefined;
        this.pessoaNome_Text.focus();
        this.editable = true;
        break;

      case "forms.buttons.update":
        this.updateDataLoad();
        this.tabsValidade_Option.select("tabValidade");
        this.tabsConfiguracao_Option.select("tabIdentificacao");
        this.pessoaNome_Text.focus(true);
        this.editable = true;
        break;

      case "forms.buttons.read":
        this.updateDataLoad();
        this.editable = false;
        break;

    }
  }

  updateDataLoad() {
    this.showSpinner = true;

    const filter: PessoaInternaUsuarioFilter = { id: { eq: this.id } };
    this.pessoaInternaService.readPessoaInternaUsuarios(this.order_by, filter)
      .subscribe(({ usuarioPessoaInterna }: read_PessoaInternaUsuario) => {
        this.pessoaInterna = usuarioPessoaInterna?.nodes[0];
        if(this.pessoaInterna) {
          this.id = this.pessoaInterna.id;

          this.pessoaImagem = this.pessoaInterna.imagem?.imagem || null;
  
          this.pessoaNome_Text.text = this.pessoaInterna.nome;
          this.pessoaGrupo_Option.select(this.pessoaInterna.grupoId);
  
          this.onSitePopulate({id: this.siteId});
  
          this.reparticaoSite_Option.enable();
          this.reparticaoSetor_Option.enable();
          this.reparticaoArea_Option.enable();
          this.reparticaoEntidadeExterna_Option.select(this.pessoaInterna.empresaId);
  
          this.pessoaTelefoneFixo_Text.setTextWithMask(this.pessoaInterna.telefoneFixo);
          this.pessoaTelefoneMovel_Text.setTextWithMask(this.pessoaInterna.telefoneMovel);
          this.pessoaEmail_Text.text = this.pessoaInterna.email;
          this.pessoaObservacao_Text.text = this.pessoaInterna.observacao;
  
          this.identificacaoId_Text.text = this.pessoaInterna.identificador;
          this.identificacaoCognome_Text.text = this.pessoaInterna.cognome;
          this.identificacaoDocTipo_Option.selectbyValue(this.pessoaInterna.documentoTipo);
          this.onTipoDoc_Change(this.pessoaInterna.documentoNumero);
          this.identificacaoNascimento_Text.setTextWithMask(this.pessoaInterna.nascimento);
          this.identificacaoHabilitacao_Text.text = this.pessoaInterna.habilitacaoRegistro;
          this.identificacaoCategoria_Text.text = this.pessoaInterna.habilitacaoCategoria;
          this.identificacaoValidade_Text.setTextWithMask(this.pessoaInterna.habilitacaoValidade);
          
          this.supervisorId = this.pessoaInterna.supervisorId;
          this.identificacaoSupervisor_Text.text = (this.pessoaInterna.supervisor?.nome || '');
  
          this.onEmpresaPopulate(this.pessoaInterna.empresaId);

          this.onCentroCustoPopulate(this.pessoaInterna.centroCustoId);
  
          if (this.pessoaInterna.cargo?.length == 0) {
            this.onCargoPopulate();
          } else {
            this.onCargoPopulate(this.pessoaInterna.cargo);
          }
  
          this.onEmpresaPopulate(this.pessoaInterna.empresaId || 0);
          this.onCentroCustoPopulate(this.pessoaInterna.centroCustoId || 0);
  
          if (this.pessoaInterna.localizacao?.length == 0) {
            this.onLocalizacaoPopulate();
          } else {
            this.onLocalizacaoPopulate(this.pessoaInterna.localizacao);
          }
  
          this.complemento1_Text.text = this.pessoaInterna.complemento1;
          this.complemento2_Text.text = this.pessoaInterna.complemento2;
          this.complemento3_Text.text = this.pessoaInterna.complemento3;
          this.complemento4_Text.text = this.pessoaInterna.complemento4;
  
          if (this.pessoaInterna.endereco) {
            this.enderecoLogradouro_Text.text = this.pessoaInterna.endereco.logradouro;
            this.enderecoNumero_Text.text = this.pessoaInterna.endereco.numero;
            this.enderecoComplemento_Text.text = this.pessoaInterna.endereco.complemento;
            this.enderecoBairro_Text.text = this.pessoaInterna.endereco.bairro;
            this.enderecoCEP_Text.text = this.pessoaInterna.endereco.cep;
            this.enderecoCidade_Text.text = this.pessoaInterna.endereco.cidade;
            this.enderecoEstado_Text.text = this.pessoaInterna.endereco.estado;
            this.enderecoPais_Text.text = this.pessoaInterna.endereco.pais;
          }
  
          this.validadeEstado_Options.select(this.pessoaInterna.status? 1: 0);
          this.contratacaoInicio_Text.setTextWithMask(this.pessoaInterna.contratacaoInicio);
          this.contratacaoFim_Text.setTextWithMask(this.pessoaInterna.contratacaoFim);
          this.integracaoInicio_Text.setTextWithMask(this.pessoaInterna.integracaoInicio);
          this.integracaoFim_Text.setTextWithMask(this.pessoaInterna.integracaoFim);
          this.segurancaInicio_Text.setTextWithMask(this.pessoaInterna.segurancaInicio);
          this.segurancaFim_Text.setTextWithMask(this.pessoaInterna.segurancaFim);
          this.exameInicio_Text.setTextWithMask(this.pessoaInterna.exameMedicoInicio);
          this.exameFim_Text.setTextWithMask(this.pessoaInterna.exameMedicoFim);
  
          this.feriasInicio_Text.setTextWithMask(this.pessoaInterna.feriasInicio);
          this.feriasFim_Text.setTextWithMask(this.pessoaInterna.feriasFim);
          this.afastamentoInicio_Text.setTextWithMask(this.pessoaInterna.afastamentoInicio);
          this.afastamentoFim_Text.setTextWithMask(this.pessoaInterna.afastamentoFim);
  
          this.visita_Options.populate(this.pessoaInterna); 
          
          const vagaGaragens = this.pessoaInterna.garagens?.map(vaga => {
            return {
              id: vaga.id,
              garagem: vaga.garagem,
              estacionamento: vaga.estacionamento?.nome,
              site: vaga.estacionamento?.setor?.site?.nome
            }
          });
          this.listView_VagaGaragem.gridUpdate(vagaGaragens);

          const pessoaVeiculos = this.pessoaInterna.veiculos?.map(veiculo => {
            return {id: veiculo?.veiculoId,
                    placa: veiculo?.veiculoInterno?.placa,
                    tipo: veiculo?.veiculoInterno?.tipo,
                    veiculoModelo: (veiculo?.veiculoInterno?.modelo as VeiculoModeloGrupo)?.veiculoModelo,
                    cor: veiculo?.veiculoInterno?.cor}
          });
          this.listView_PessoaVeiculo.gridUpdate(pessoaVeiculos);
  
          this.creditoAcesso_Text.text = this.pessoaInterna.acessoCredito;
          this.cartaoOficial_Text.text = this.pessoaInterna.acessoCartao;
          this.senha_Text.text = this.pessoaInterna.acessoSenha;
  
          const nivelAcessoPermanente = this.pessoaInterna?.niveisAcessoPermanente?.map(nivel => {
            return {
              id: nivel.id,
              nivelAcessoId: nivel.nivelAcesso?.id,
              nivelAcesso: nivel.nivelAcesso?.nome,
              siteId: (nivel.nivelAcesso?.areas)? nivel.nivelAcesso?.areas[0]?.area?.setor?.siteId: 0,
              site: (nivel.nivelAcesso?.areas)? nivel.nivelAcesso?.areas[0]?.area?.setor?.site?.nome: ''
            }
          });
          this.listView_NivelAcessoPermanente.gridUpdate(nivelAcessoPermanente);

          const nivelAcessoRotativo = this.pessoaInterna?.niveisAcessoRotativo?.map(nivel => {
            return {
              id: nivel.id,
              nivelAcessoId: nivel.nivelAcesso?.id,
              nivelAcesso: nivel.nivelAcesso?.nome,
              siteId: (nivel.nivelAcesso?.areas)? nivel.nivelAcesso?.areas[0]?.area?.setor?.siteId: 0,
              site: (nivel.nivelAcesso?.areas)? nivel.nivelAcesso?.areas[0]?.area?.setor?.site?.nome: ''
            }
          });
          this.listView_NivelAcessoRotativo.gridUpdate(nivelAcessoRotativo);
          this.controle_Options.populate(this.pessoaInterna);

          const pessoaInternaResponsaveis = this.pessoaInterna.responsaveis?.map(pessoaInterna => {
            return {id: pessoaInterna?.responsavelId,
                    nome: pessoaInterna.responsavel?.nome,
                    grupo: pessoaInterna.responsavel?.grupo?.pessoaGrupo,
                    area: pessoaInterna.responsavel?.area?.nome,
                    telefoneFixo: pessoaInterna.responsavel?.telefoneFixo,
                    telefoneMovel: pessoaInterna.responsavel?.telefoneMovel}
          });
          this.listView_PessoaResponsavel.gridUpdate(pessoaInternaResponsaveis);      
  
          if (this.pessoaInterna.abordagem) {
  
            this.pessoaInternaAbordagem = {
              mensagemInformativa: this.pessoaInterna.abordagem.mensagemInformativa,
              mensagemAdvertida: this.pessoaInterna.abordagem.mensagemAdvertida,
              mensagemRestritiva: this.pessoaInterna.abordagem.mensagemRestritiva
            };
  
            if (this.nivelOperacaoService.checkAcessRights("67", 1)) {
              this.abordagemInformativa_Text.text = this.pessoaInterna.abordagem.mensagemInformativa;
            } else {
              this.abordagemInformativa_Text.text = this.textMaskChar;
            }
  
            if (this.nivelOperacaoService.checkAcessRights("68", 1)) {
              this.abordagemAdvertida_Text.text = this.pessoaInterna.abordagem.mensagemAdvertida;
            } else {
              this.abordagemAdvertida_Text.text = this.textMaskChar;
            }
  
            if (this.nivelOperacaoService.checkAcessRights("69", 1)) {
              this.abordagemRestritiva_Text.text = this.pessoaInterna.abordagem.mensagemRestritiva;
            } else {
              this.abordagemRestritiva_Text.text = this.textMaskChar;
            }
  
            if (this.pessoaInterna.abordagem.mensagemInformativa?.length > 0)
              this.cardTabs_Options.setCondition('abordagem', AbordagemTipo.informativa);
  
            if (this.pessoaInterna.abordagem.mensagemAdvertida?.length > 0)
              this.cardTabs_Options.setCondition('abordagem', AbordagemTipo.advertida);
  
            if (this.pessoaInterna.abordagem.mensagemRestritiva?.length > 0)
              this.cardTabs_Options.setCondition('abordagem', AbordagemTipo.restritiva);
  
          } else {
  
            this.abordagemInformativa_Text.clear();
            this.abordagemAdvertida_Text.clear();
            this.abordagemRestritiva_Text.clear()
  
            this.pessoaInternaAbordagem = {
              mensagemInformativa: "",
              mensagemAdvertida: "",
              mensagemRestritiva: ""
            }
          }
  
          this.abordagemInformativa_Text.disabled = !this.nivelOperacaoService.checkAcessRights("67", 0);
          this.abordagemAdvertida_Text.disabled = !this.nivelOperacaoService.checkAcessRights("68", 0);
          this.abordagemRestritiva_Text.disabled = !this.nivelOperacaoService.checkAcessRights("69", 0);
  
          // this.onAbodagemRestritiva_Change(pessoaInterna.status);
  
        }
        this.showSpinner = false;

      });
  }

  onButton_Click(type: any) {
    const cardIndex = this.cardTabs_Options.selectCard.id;
    switch (cardIndex) {
      case CardTabID.Veiculo:
        switch (type) {
          case "insert":
            const veiculoLista: Array<number> = this.listView_PessoaVeiculo.dataGridBehavior
              .value?.map(veiculo => {return veiculo.id});
            this.pessoaVeiculoModalService.show('Veículos', veiculoLista, this.areaId);
            break;
    
          case "delete":
            const indexId = this.listView_PessoaVeiculo.dataGridBehavior
              .value?.findIndex(veiculo => veiculo.id == this.idVeiculo);
            if (indexId >= 0) {
              this.listView_PessoaVeiculo.dataGridBehavior.value?.splice(indexId, 1);
            }
            break;
        }            
        break;

      case CardTabID.Acesso:
        if(this.tabsNivelAcesso_Option.tabNameActive == "tabNivelAcessoPermanente") {
          switch (type) {
            case "insert":
              const nivelAcessoPermanente: Array<number> = this.listView_NivelAcessoPermanente.dataGridBehavior
                .value?.map(nivel => {return nivel.nivelAcessoId});
              this.usuarioNivelAcessoModalService.show(nivelAcessoPermanente, 2);
              break;
      
            case "delete":
              const indexId = this.listView_NivelAcessoPermanente.dataGridBehavior
                .value?.findIndex(nivel => nivel.id == this.idNivelAcessoPermanente);
              if (indexId >= 0) {
                this.listView_NivelAcessoPermanente.dataGridBehavior.value?.splice(indexId, 1);
              }
              break;
          }
        } else {
          switch (type) {
            case "insert":
              const nivelAcessoRotativo: Array<number> = this.listView_NivelAcessoRotativo.dataGridBehavior
                .value?.map(nivel => {return nivel.nivelAcessoId});
              this.usuarioNivelAcessoModalService.show(nivelAcessoRotativo, 0);
              break;
      
            case "delete":
              const indexId = this.listView_NivelAcessoRotativo.dataGridBehavior
                .value?.findIndex(nivel => nivel.id == this.idNivelAcessoRotativo);
              if (indexId >= 0) {
                this.listView_NivelAcessoRotativo.dataGridBehavior.value?.splice(indexId, 1);
              }
              break;
          }
        }
        break;

      case CardTabID.Responsavel:
        switch (type) {
          case "insert":
            const pessoaLista: Array<number> = this.listView_PessoaResponsavel.dataGridBehavior
              .value?.map(responsavel => {return responsavel.id});
            this.pessoaModalService.show('Responsáveis', pessoaLista);
            break;
    
          case "delete":
            const indexId = this.listView_PessoaResponsavel.dataGridBehavior
              .value?.findIndex(pessoa => pessoa.id == this.idResponsavel);
            if (indexId >= 0) {
              this.listView_PessoaResponsavel.dataGridBehavior.value?.splice(indexId, 1);
            }
            break;
        }
        break;
          
    }
  }

  dataForm_Clean() {

    this.pessoaImagem = null;

    this.pessoaNome_Text.clear();
    this.pessoaGrupo_Option.select(0);
    this.pessoaTelefoneFixo_Text.clear();
    this.pessoaTelefoneMovel_Text.clear();
    this.pessoaEmail_Text.clear();
    this.pessoaObservacao_Text.clear();

    this.identificacaoId_Text.clear();
    this.identificacaoDocTipo_Option.selectbyText("RG");
    this.onTipoDoc_Change();
    this.identificacaoCognome_Text.clear();
    this.identificacaoNascimento_Text.clear();
    this.identificacaoHabilitacao_Text.clear();
    this.identificacaoCategoria_Text.clear();
    this.identificacaoValidade_Text.clear();
    this.identificacaoCargo_Option.clear();

    this.supervisorId = 0;
    this.identificacaoSupervisor_Text.clear();

    this.reparticaoSite_Option.disable();
    this.reparticaoSetor_Option.disable();
    this.reparticaoArea_Option.disable();

    this.reparticaoLocalizacao_Option.clear();
    this.reparticaoEntidadeExterna_Option.clear();



    this.complemento1_Text.clear();
    this.complemento2_Text.clear();
    this.complemento3_Text.clear();
    this.complemento4_Text.clear();
    this.complementoCentroCusto_Option.clear();

    this.enderecoLogradouro_Text.clear();
    this.enderecoNumero_Text.clear();
    this.enderecoComplemento_Text.clear();
    this.enderecoBairro_Text.clear();
    this.enderecoCEP_Text.clear();
    this.enderecoCidade_Text.clear();
    this.enderecoEstado_Text.clear();
    this.enderecoPais_Text.clear();

    this.validadeEstado_Options.select(Status.LIVRE);
    this.contratacaoInicio_Text.clear();
    this.contratacaoFim_Text.clear();
    this.integracaoInicio_Text.clear()
    this.integracaoFim_Text.clear();
    this.segurancaInicio_Text.clear();
    this.segurancaFim_Text.clear();
    this.exameInicio_Text.clear();
    this.exameFim_Text.clear();

    this.feriasInicio_Text.clear();
    this.feriasFim_Text.clear();
    this.afastamentoInicio_Text.clear();
    this.afastamentoFim_Text.clear();

    this.visita_Options.select(0);
    this.identificacaoHabilitacao_Text.clear();
    this.identificacaoId_Text.clear();

    this.listView_PessoaVeiculo.clear();
    this.listView_VagaGaragem.clear();

    this.cartaoOficial_Text.clear();
    this.cartaoProvisorio_Text.clear();
    this.senha_Text.clear();
    this.creditoAcesso_Text.clear();

    this.listView_NivelAcessoPermanente.clear();
    this.listView_NivelAcessoRotativo.clear();
    this.controle_Options.reset();

    this.listView_PessoaResponsavel.clear();

    this.abordagemInformativa_Text.clear();
    this.abordagemAdvertida_Text.clear();
    this.abordagemRestritiva_Text.clear();

    this.cardTabs_Options.setCondition('abordagem', AbordagemTipo.nenhum);

    this.cardTabs_Options.selectButtonByID(CardTabID.Pessoa);
    this.tabsConfiguracao_Option.select("tabIdentificacao");
    this.tabsValidade_Option.select("tabValidade");
    this.tabsNivelAcesso_Option.select("tabNivelAcessoPermanente");

  }

  onEmpresaPopulate(id?: number, clean: boolean = true) {
    if (clean) this.reparticaoEntidadeExterna_Option.clear();

    this.reparticaoEntidadeExterna_Option.add("", null, 0);
    const sortEmpresaReparticao: EmpresaReparticaoSort = { nome: SortOperationKind.ASC };
    const filterEmpresaReparticao: EmpresaReparticaoFilter = null;

    this.reparticaoEntidadeExterna_Option.itemSelected.text = "Aguarde! Carregando...";

    this.reparticaoEmpresaService.readEmpresaReparticaos(sortEmpresaReparticao, filterEmpresaReparticao)
      .subscribe(({ reparticaoEmpresa }: read_EmpresaReparticao) => {

        this.reparticaoEntidadeExterna_Option.itemSelected.text = "";

        const nodes: EmpresaReparticao[] = reparticaoEmpresa.nodes;
        nodes.forEach((node: EmpresaReparticao) => {
          this.reparticaoEntidadeExterna_Option.add(node.nome, null, node.id);
        });
        if (id) this.reparticaoEntidadeExterna_Option.select(id);
      }, (error => {
        // Tratar erro subscribe...
      }))
  }

  onCargoPopulate(cargoSelect?: string, clean: boolean = true) {
    if (clean) this.identificacaoCargo_Option.clear();

    this.identificacaoCargo_Option.itemSelected.text = "Aguarde! Carregando...";
    this.pessoaInternaService.readPessoaInternaCargos()
      .subscribe((cargos: any) => {
        this.identificacaoCargo_Option.itemSelected.text = '';
        const cargoIndex: number = cargos.usuarioPessoaInternaCargo?.findIndex(cargo => cargo.length == 0);
        if(cargoIndex > 0) { 
          this.identificacaoCargo_Option.add('', '', 0, !cargoSelect);
        }
        cargos.usuarioPessoaInternaCargo?.forEach((cargo: string, index: number = 1) => {
          this.identificacaoCargo_Option.add(cargo, cargo, index, cargo == (cargoSelect || null));
          index++
        });
      }, (error => {
        // Tratar erro subscribe...
      }))
  }

  onCentroCustoPopulate(id?: number, clean: boolean = true) {
    if (clean) this.complementoCentroCusto_Option.clear();

    this.complementoCentroCusto_Option.add("", null, 0);
    const sortCentroCusto: CentroCustoGrupoSort = { centroCusto: SortOperationKind.ASC };
    const filterCentroCusto: CentroCustoGrupoFilter = null;

    this.complementoCentroCusto_Option.itemSelected.text = "Aguarde! Carregando...";

    this.centroCustoService.readCentroCustoGrupos(sortCentroCusto, filterCentroCusto)
      .subscribe(({ grupoCentroCusto }: read_CentroCustoGrupo) => {

        this.complementoCentroCusto_Option.itemSelected.text = "";

        const nodes: CentroCustoGrupo[] = grupoCentroCusto.nodes;
        nodes.forEach((node: CentroCustoGrupo) => {
          this.complementoCentroCusto_Option.add(node.centroCusto, null, node.id);
        });
        if (id) this.complementoCentroCusto_Option.select(id);
      }, (error => {
        // Tratar erro subscribe...
      }));
  }

  onLocalizacaoPopulate(localizacao?: string, clean: boolean = true) {
    if (clean) this.reparticaoLocalizacao_Option.clear();

    this.reparticaoLocalizacao_Option.itemSelected.text = "Aguarde! Carregando...";

    this.pessoaInternaService.readPessoaInternaLocalizacoes()
      .subscribe((localizacoes: any) => {

        this.reparticaoLocalizacao_Option.itemSelected.text = "";

        localizacoes.usuarioPessoaInternaLocalizacao.forEach((cargo: string, index: number = 0) => {
          this.reparticaoLocalizacao_Option.add(cargo, cargo, index);
          index++
        });
        if (localizacao) this.reparticaoLocalizacao_Option.selectbyValue(localizacao);
      }, (error => {
        // Tratar erro subscribe...
      }))
  }

  onSitePopulate(siteSelect: Item) {
    this.reparticaoSite_Option.clear();

    this.reparticaoSite_Option.itemSelected.text = "Aguarde! Carregando...";

    this.siteService.orderBy = { nome: SortOperationKind.ASC };
    this.siteService.where = null;

    this.siteService.read(true)
      .subscribe(({ reparticaoSite }: read_Site) => {

        this.reparticaoSite_Option.itemSelected.text = "";
        if(reparticaoSite.totalCount > 0) {
          const sites: Site[] = reparticaoSite.nodes;
          this.reparticaoSite_Option.addRange(sites.map(site => {
            return {id: site.id, text: site.nome, value: null, select: (site.id == siteSelect.id)}
          }))
          this.onSetorPopulate({id: siteSelect.id})  
        } else {
          this.reparticaoSite_Option.disable();
        }
      }, (error => {
        // Tratar erro subscribe...
      }));
  }

  onSetorPopulate(siteSelect: Item) {    
    this.reparticaoSetor_Option.clear();

    const SortSetor: SetorReparticaoSort = {nome: SortOperationKind.ASC};
    const FiltroSetor: SetorReparticaoFilter = {siteId: {eq: siteSelect.id}};

    this.setorReparticaoService.readSetorReparticao(SortSetor, FiltroSetor)
      .subscribe(({reparticaoSetor}: read_SetorReparticao) => {
        if(reparticaoSetor.totalCount > 0) {
          const setores: SetorReparticao[] = reparticaoSetor.nodes;
          this.reparticaoSetor_Option.addRange(setores.map(setor => {
            return {id: setor.id, text: setor.nome, value: null, select: (setor.id == this.setorId)};
          }));
          this.onAreaPopulate({id: this.setorId});
        } else {
          this.reparticaoSetor_Option.disable();
        }
      });  
  }

  onAreaPopulate(setorSelect: Item) {
    this.reparticaoArea_Option.clear();

    const SortArea: AreaReparticaoSort = {nome: SortOperationKind.ASC};
    const FiltroArea: AreaReparticaoFilter = {setorId: {eq: setorSelect.id}};

    this.areaReparticaoService.readAreaReparticao(SortArea, FiltroArea)
      .subscribe(({reparticaoArea}: read_AreaReparticao ) => {
        if(reparticaoArea.totalCount > 0) {
          const areas: AreaReparticao[] = reparticaoArea.nodes;
          this.reparticaoArea_Option.addRange(areas.map(area => {
            return {id: area.id, text: area.nome, value: null, select: (area.id == this.areaId)};
          }));
        } else {
          this.reparticaoArea_Option.disable();
        }
      });
  }

  pessoaVeiculoModalSelect(veiculoSelect: VeiculoInternoUsuario) {
    if (veiculoSelect != null) {
      const veiculo: any = {
        id: veiculoSelect.id,
        placa: veiculoSelect.placa,
        tipo: veiculoSelect.tipo,        
        veiculoModelo: (veiculoSelect.modelo as VeiculoModeloGrupo)?.veiculoModelo,
        cor: veiculoSelect.cor,
      }

      const veiculos: any[] = this.listView_PessoaVeiculo.dataGridBehavior?.value || [];
      veiculos.push(veiculo);
      this.listView_PessoaVeiculo.gridUpdate(veiculos);
    }
  }

  usuarioNivelAcessoModalSelect(nivelSelect: any) {
    if(this.tabsNivelAcesso_Option.tabNameActive == "tabNivelAcessoPermanente") {
      const idNivelPermanente: number =  this.listView_NivelAcessoPermanente.dataGridBehavior?.value?.length + 1 || 1;
      const nivel: any = {
        id: idNivelPermanente,
        nivelAcessoId: nivelSelect?.nivelAcesso.id,
        nivelAcesso: nivelSelect.nivelAcesso?.nome,
        site: nivelSelect.site?.nome
      }
  
      const nivelAcessoPermanentes: any[] = this.listView_NivelAcessoPermanente.dataGridBehavior?.value || [];
      nivelAcessoPermanentes.push(nivel);
      this.listView_NivelAcessoPermanente.gridUpdate(nivelAcessoPermanentes);
    } else {
      const idNivelRotativo: number =  this.listView_NivelAcessoRotativo.dataGridBehavior?.value?.length + 1 || 1;
      const nivel: any = {
        id: idNivelRotativo,
        nivelAcessoId: nivelSelect?.nivelAcesso.id,
        nivelAcesso: nivelSelect.nivelAcesso?.nome,
        site: nivelSelect.site?.nome
      }

      const nivelAcessoRotativo: any[] = this.listView_NivelAcessoRotativo.dataGridBehavior?.value || [];
      nivelAcessoRotativo.push(nivel);
      this.listView_NivelAcessoRotativo.gridUpdate(nivelAcessoRotativo);
    }
  }

  onSupervisorFind_Click() {
    this.pessoaModalService.setFilter(this.identificacaoSupervisor_Text.text);
    this.pessoaModalService.show("Supervisores");
  }

  pessoaModalSelect(pessoaSelect: PessoaInternaUsuario) {
    console.log(pessoaSelect);
    if (pessoaSelect != null) {
      const cardIndex = this.cardTabs_Options.selectCard.id;
      switch (cardIndex) {
        case CardTabID.Pessoa:
          this.supervisorId = pessoaSelect?.id || 0;
          this.identificacaoSupervisor_Text.text = pessoaSelect?.nome || '';      
          break;
        case CardTabID.Responsavel:
          const responsavel: any = {
            id: pessoaSelect.id,
            nome: pessoaSelect.nome,
            grupo: pessoaSelect.grupo?.pessoaGrupo,        
            area: pessoaSelect.area?.nome,
            telefoneFixo: pessoaSelect.telefoneFixo,
            telefoneMovel: pessoaSelect.telefoneMovel
          }    
          const responsaveis: any[] = this.listView_PessoaResponsavel.dataGridBehavior?.value || [];
          responsaveis.push(responsavel);
          this.listView_PessoaResponsavel.gridUpdate(responsaveis);
    
          break;
      }  
    }
  }

  onCardTabs_Click(cardSelected: Buttons) {
    this.cardTabs_Options.selectButtonByID(cardSelected.id);
    if (cardSelected.id == CardTabID.Pessoa) this.tabsConfiguracao_Option.select("tabIdentificacao");
    if (cardSelected.id == CardTabID.Acesso) this.tabsNivelAcesso_Option.select("tabNivelAcessoPermanente");
  }

  onListView_Change(rowSelect?: rowSelect) {
    if (rowSelect.registro) {
      this.id = rowSelect.id;
    } else {
      if (rowSelect.exclude == "yes") {
        this.pessoaInternaService.deletePessoaInternaUsuario(rowSelect.id)
          .subscribe(({ data }: delete_PessoaInternaUsuario) => {
            if (data.usuarioPessoaInterna_Excluir.sucesso == true) {
              const find = { field: "id", value: rowSelect.id, type: "DEL" }
              this.update_Grid(find)

            } else {
              const objeto = JSON.parse(data.usuarioPessoaInterna_Excluir.objeto);
              this.alertService.show(data.usuarioPessoaInterna_Excluir.mensagemTipo,
                data.usuarioPessoaInterna_Excluir.mensagem,
                objeto);
            }
          });
      }
    }
  }

  onImageCapture_Click(capture: boolean = false) {
    if(capture) {
      this.captureModalService.show();
    }
  }

  onImage_Captured(image: string) {
    this.pessoaImagem = this.config.converteImagemArray(image);
  }

  onlistViewPessoaVeiculo_Change(rowSelect?: rowSelect) {
    if (rowSelect.registro) {
      this.idVeiculo = rowSelect.id;
    }
  }

  onListView_NivelAcessoPermanente_Change(rowSelect?: rowSelect) {
    if (rowSelect.registro) {
      this.idNivelAcessoPermanente = rowSelect.id;
    }
  }

  onListView_NivelAcessoRotativo_Change(rowSelect?: rowSelect) {
    if (rowSelect.registro) {
      this.idNivelAcessoRotativo = rowSelect.id;
    }
  }

  onlistViewPessoaResponsavel_Change(rowSelect?: rowSelect) {
    if (rowSelect.registro) {
      this.idResponsavel = rowSelect.id;
    }
  }

  update_Grid(find?: Find, filter?: Filter) {
    this.listView_PessoaInterna.processingShow();
    const filterGrid: PessoaInternaUsuarioFilter = { ...this.filter, ...this.filterGrid };
    this.pessoaInternaService.readPessoaInternaUsuarios(this.order_by, filterGrid)
      .subscribe(({ usuarioPessoaInterna }: read_PessoaInternaUsuario) => {
        this.actionbuttomService.enableButtons(0);
        const usuarioPessoaInternaNodes: PessoaInternaUsuario[] = usuarioPessoaInterna.nodes;
        this.listView_PessoaInterna.gridUpdate(usuarioPessoaInternaNodes, find, filter);
      });
  }

  onListView_Filter(filterSelect: Item) {
    switch (filterSelect.text) {
      case "Nome":
        this.filterGrid = { nome: { startsWith: filterSelect.value } };
        break;

      case "Grupo":
        const grupoPessoaIndex: number = this.pessoaGrupo_Option.getId(filterSelect.value);
        if (grupoPessoaIndex) {
          const grupoId: number = this.pessoaGrupo_Option.itens[grupoPessoaIndex].id;
          this.filterGrid = { grupoId: { eq: grupoId } };
        }
        break;

      case "Telefone":
        this.filterGrid = { telefoneFixo: { contains: filterSelect.value } };
        break;

      case "E-mail":
        this.filterGrid = { email: { contains: filterSelect.value } };
        break;

      case "Estado":
        if (filterSelect.value == "LIVRE" || filterSelect.value == "BLOQUEADA") {
          this.filterGrid = { status: {eq: (filterSelect.value == "LIVRE")} };
        }
        break;
    }

    if (filterSelect.value != "nome" && filterSelect.value != "pessoaGrupo" &&
        filterSelect.value != "telefoneFixo" && filterSelect.value != "email" &&
        filterSelect.value != "status") {
      this.update_Grid();
    }

  }

  onSave_Click() {
    
    const dataHoraAtual = new Date().toLocaleDateString("pt-br") + " 23:59";
    this.pessoaNome_Text.validated = this.pessoaNome_Text.text.length >= this.pessoaNome_Text.minLength;    

    if (!this.pessoaNome_Text.validated) {
      this.alertService
        .show("ERRO", "Existem campos obrigatórios não preenchidos ou preenchidos de forma incorreta.  Verifique!",null);
    } else if (this.pessoaGrupo_Option.itemSelected.id == 0) {
      this.alertService.show("ERRO", "Selecione ao menos uma classificação para este Grupo de Pessoa Interna.", null);
    } else if (this.reparticaoSite_Option.itemSelected?.id == 0) {
      this.alertService.show("ERRO", "Selecione ao menos uma classificação para Site de Pessoa Interna", null);
    } else if (this.reparticaoSetor_Option.itemSelected?.id == 0) {
      this.alertService.show("ERRO", "Selecione ao menos uma classificação para este Setor de Pessoa Interna", null);
    } else if (this.reparticaoArea_Option.itemSelected?.id == 0) {
      this.alertService.show("ERRO", "Selecione ao menos uma classificação para esta Área de Pessoa Interna", null);
    } else if (!this.identificacaoNascimento_Text.validated || 
               !this.exameInicio_Text.validated || !this.exameFim_Text.validated ||
               !this.integracaoInicio_Text.validated || !this.integracaoFim_Text.validated ||
               !this.segurancaInicio_Text.validated || !this.segurancaFim_Text.validated ||
               !this.pessoaEmail_Text.validated) {
      this.alertService.show("ERRO", "Existem campos preenchidos de forma incorreta. Verifique!", null);
    } else if (!this.dateOperator.compareDateGT(this.identificacaoNascimento_Text.textMasked, dataHoraAtual)) {
      this.alertService.show("ERRO", "Data de Nascimento não pode ser superior a data atual. Verifique!", null);
    } else if (!this.dateOperator.compareDateGT(this.contratacaoInicio_Text.textMasked,
                                                this.contratacaoFim_Text.textMasked)) {
      this.alertService.show("ERRO", "Data de Início do Contrato não pode ser maior que a data final. Verifique!", null);
    } else if (!this.dateOperator.compareDateGT(this.integracaoInicio_Text.textMasked,
                                                this.integracaoFim_Text.textMasked)) {
      this.alertService.show("ERRO", 
                             "Data de Início da Integração não pode ser maior que a data final. Verifique!",
                             null);
    } else if (!this.dateOperator.compareDateGT(this.segurancaInicio_Text.textMasked, 
                                                this.segurancaFim_Text.textMasked)) {
      this.alertService.show("ERRO",
                             "Data de Início da Segurança não pode ser maior que a data final. Verifique!",
                             null);
    } else if (!this.dateOperator.compareDateGT(this.exameInicio_Text.textMasked, this.exameFim_Text.textMasked)) {
      this.alertService.show("ERRO",
                             "Data de Início do Exame Médico não pode ser maior que a data final. Verifique!",
                             null);
    }  else {

      this.showSpinner = true;

      console.log(this.listView_NivelAcessoPermanente.dataGridBehavior?.value);
      console.log(this.listView_NivelAcessoRotativo.dataGridBehavior?.value);

      const pessoaInterna: PessoaInternaUsuarioMutation = {
        id: this.id,
        imagem: {
          imagem: this.pessoaImagem || []
        },
        nome: this.pessoaNome_Text.text,
        grupoId: this.pessoaGrupo_Option.itemSelected.id,
        telefoneFixo: this.pessoaTelefoneFixo_Text.text,
        telefoneMovel: this.pessoaTelefoneMovel_Text.text,
        email: this.pessoaEmail_Text.text,
        observacao: this.pessoaObservacao_Text.text,

        identificador: this.identificacaoId_Text.text,
        documentoTipo: this.identificacaoDocTipo_Option.itemSelected.text,
        documentoNumero: this.identificacaoDocNumero_Text.text,
        cognome: this.identificacaoCognome_Text.text,
        nascimento: this.identificacaoNascimento_Text.formated,
        habilitacaoRegistro: this.identificacaoHabilitacao_Text.text,
        habilitacaoCategoria: this.identificacaoCategoria_Text.text,
        habilitacaoValidade: this.identificacaoValidade_Text.formated,
        cargo: this.identificacaoCargo_Option.itemSelected?.text,
        supervisorId: this.supervisorId,

        areaId: this.reparticaoArea_Option.itemSelected.id,
        localizacao: this.reparticaoLocalizacao_Option.itemSelected?.text,
        empresaId: this.reparticaoEntidadeExterna_Option.itemSelected?.id,

        complemento1: this.complemento1_Text.text,
        complemento2: this.complemento2_Text.text,
        complemento3: this.complemento3_Text.text,
        complemento4: this.complemento4_Text.text,
        centroCustoId: this.complementoCentroCusto_Option.itemSelected?.id,

        endereco: {
          logradouro: this.enderecoLogradouro_Text.text,
          numero: this.enderecoNumero_Text.text,
          complemento: this.enderecoComplemento_Text.text,
          bairro: this.enderecoBairro_Text.text,
          cep: this.enderecoCEP_Text.text,
          cidade: this.enderecoCidade_Text.text,
          estado: this.enderecoEstado_Text.text,
          pais: this.enderecoPais_Text.text,  
        },

        status: (this.validadeEstado_Options.itemSelected.id == 1),
        contratacaoInicio: this.contratacaoInicio_Text.formated,
        contratacaoFim: this.contratacaoFim_Text.formated,
        integracaoInicio: this.integracaoInicio_Text.formated,
        integracaoFim: this.integracaoFim_Text.formated,
        segurancaInicio: this.segurancaInicio_Text.formated,
        segurancaFim: this.segurancaFim_Text.formated,
        exameMedicoInicio: this.exameInicio_Text.formated,
        exameMedicoFim: this.exameFim_Text.formated,

        feriasInicio: this.feriasInicio_Text.formated,
        feriasFim: this.feriasFim_Text.formated,
        afastamentoInicio: this.afastamentoInicio_Text.formated,
        afastamentoFim: this.afastamentoFim_Text.formated,

        autorizaVisita: this.visita_Options.valueOf("autorizaVisita"),
        recebeVisita: this.visita_Options.valueOf("recebeVisita"),

        veiculos: this.listView_PessoaVeiculo.dataGridBehavior?.value?.map(veiculo => {
          return {id: veiculo.id}
        }) || [],

        acessoCartao: this.cartaoOficial_Text.text,
        acessoSenha: this.senha_Text.text,
        acessoCredito: this.creditoAcesso_Text.text,        
        niveisAcessoPermanente: this.listView_NivelAcessoPermanente.dataGridBehavior?.value?.map(nivel => {
          return {id: nivel.id, nivelAcessoId: nivel.nivelAcessoId}
        }) || [],

        niveisAcessoRotativo: this.listView_NivelAcessoRotativo.dataGridBehavior?.value?.map(nivel => {
          return {id: nivel.id, nivelAcessoId: nivel.nivelAcessoId}
        }) || [],

        ignorarDirecao: this.controle_Options.valueOf("ignorarDirecao"),
        ignorarRota: this.controle_Options.valueOf("ignorarRota"),
        ignorarTemporizacao: this.controle_Options.valueOf("ignorarTemporizacao"),
        ignorarBiometria: this.controle_Options.valueOf("ignorarBiometria"),
        ignorarCredito: this.controle_Options.valueOf("ignorarCredito"),
        ignorarValidacaoExterna: this.controle_Options.valueOf("ignorarValidacaoExterna"),
        liberarSaidaExpirada: this.controle_Options.valueOf("liberarSaidaExpirada"),
    
        responsaveis: this.listView_PessoaResponsavel.dataGridBehavior?.value?.map(responsavel => {
          return {id: responsavel.id}
        }) || [],

        abordagem: {
          mensagemInformativa: this.abordagemInformativa_Text.text,
          mensagemAdvertida: this.abordagemAdvertida_Text.text,
          mensagemRestritiva: this.abordagemRestritiva_Text.text,  
        },
      };

      if (pessoaInterna.id) {
        this.pessoaInternaService.updatePessoaInternaUsuario(pessoaInterna)
          .subscribe(({ data }: update_PessoaInternaUsuario) => {
            const objeto: any = JSON.parse(data.usuarioPessoaInterna_Alterar.objeto);
            if (data.usuarioPessoaInterna_Alterar.sucesso == true) {
              const find = { field: "id", value: objeto.Id }
              this.onClose_Click();
              this.update_Grid(find);
            } else {
              this.alertService.show(data.usuarioPessoaInterna_Alterar.mensagemTipo,
                data.usuarioPessoaInterna_Alterar.mensagem,
                objeto);
            }
            this.showSpinner = false;
          });
      } else {
        this.pessoaInternaService.createPessoaInternaUsuario(pessoaInterna)
          .subscribe(({ data }: create_PessoaInternaUsuario) => {
            const objeto: any = JSON.parse(data.usuarioPessoaInterna_Inserir.objeto);
            if (data.usuarioPessoaInterna_Inserir.sucesso == true) {
              const find = { field: "id", value: objeto.Id };
              this.onClose_Click(false);
              this.update_Grid(find);
            } else {
              this.alertService.show(data.usuarioPessoaInterna_Inserir.mensagemTipo,
                data.usuarioPessoaInterna_Inserir.mensagem,
                objeto);
            }
            this.showSpinner = false;
          });
      }
    }
  }

  treeviewPopulate(filter: AreaReparticaoFilter) {
    this.treeviewService.getTreeview()
      .subscribe((treeview: TreeView[]) => {
        treeview[0].item = this.setorReparticaoService.getSetorReparticaoTreeView(filter, true);
        this.treeviewService.setTreeview(treeview);
      });
  }

  onAbodagemInformativa_Change() {
    this.pessoaInternaAbordagem.mensagemInformativa = this.abordagemInformativa_Text.text;
  }

  onAbodagemAdvertida_Change() {
    this.pessoaInternaAbordagem.mensagemAdvertida = this.abordagemAdvertida_Text.text;
    this.onAbodagemRestritiva_Change(this.validadeEstado_Options.itemSelected.id);
  }

  onAbodagemRestritiva_Change(estadoId?: number) {
    if (estadoId == undefined) this.pessoaInternaAbordagem.mensagemRestritiva = this.abordagemRestritiva_Text.text
    if (this.abordagemAdvertida_Text.text.length == 0 &&
      this.abordagemRestritiva_Text.text.length == 0) {
      if (estadoId != null) {
        this.validadeEstado_Options.select(estadoId);
      }
      this.validadeEstado_Options.enable();
    } else {
      this.validadeEstado_Options.select(Status.BLOQUEADO);
      this.validadeEstado_Options.disable();
    }
  }

  onTipoDoc_Change(docNum?: string) {
    if (this.identificacaoDocTipo_Option.itemSelected.text == "CPF") {
      this.identificacaoDocNumero_Text.setRule("CPF");
    } else {
      this.identificacaoDocNumero_Text.setRule(this.identificacaoDocNumero_Text.rules);
    }

    if(docNum) {
      this.identificacaoDocNumero_Text.text = docNum;
    } else {      
      this.identificacaoDocNumero_Text.clear();
      this.identificacaoDocNumero_Text.focus();
    }    
  }

  onResize() {
    const maxHeightPanel = document.getElementById('pessoaInternaComponent_Panel')?.clientHeight;    
    this.listView_PessoaVeiculo.maxHeight = maxHeightPanel - 122;
    this.listView_VagaGaragem.maxHeight = maxHeightPanel - 122;
    this.listView_NivelAcessoPermanente.maxHeight = maxHeightPanel - 184;
    this.listView_NivelAcessoRotativo.maxHeight = maxHeightPanel - 184;
    this.listView_PessoaResponsavel.maxHeight = maxHeightPanel - 95;
  }

  onClose_Click(hideForm: boolean = true) {
    this.dataForm_Clean();

    if (hideForm == true) {
      this.actionbuttomService.hideForm(true);
    } else {
      this.pessoaNome_Text.focus();
    }
  }

  ngOnDestroy(): void {
    this.settings?.unsubscribe();
    this.treeviewItem?.unsubscribe();
  }

}