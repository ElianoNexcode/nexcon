import { AfterViewInit, Component, OnInit } from '@angular/core';

import { ListViewGrid, Find, Filter, rowSelect } from 'src/app/@theme/components/grid/list-view/service/list-view.service';
import { AlertServiceComponent } from 'src/app/@theme/components/form/alert-card/service/alert-card.service';
import { ActionButtomService } from 'src/app/@theme/components/grid/action-buttom/service/action-button.service';
import { InputLabel } from 'src/app/@theme/components/form/input-label/service/input-label.service';
import { ComboOptions, Item } from 'src/app/@theme/components/form/combobox/service/combobox.service';
import { InputMultiLabel } from 'src/app/@theme/components/form/input-multi-label/service/input-multi-label';
import { TextareaLabel } from 'src/app/@theme/components/form/textarea-label/service/textarea-label.service';

import { SortOperationKind } from 'src/app/@core/api/generic-graphql';

import { PessoaGrupo, PessoaGrupoData, PessoaGrupoFilter, PessoaGrupoSort, read_PessoaGrupo } from 'src/app/@core/data/grupo-pessoa';
import { DocumentoGrupo, DocumentoGrupoData, DocumentoGrupoFilter, DocumentoGrupoSort, read_DocumentoGrupo } from 'src/app/@core/data/grupo-documento';
import { EmpresaReparticao, EmpresaReparticaoData, EmpresaReparticaoFilter, EmpresaReparticaoSort, read_EmpresaReparticao } from 'src/app/@core/data/reparticao-empresa';

import {
  create_PessoaExternaUsuario,
  read_PessoaExternaUsuario,
  update_PessoaExternaUsuario,
  delete_PessoaExternaUsuario,
  PessoaExternaUsuarioData,
  PessoaExternaUsuario,
  PessoaExternaUsuarioSort,
  PessoaExternaUsuarioFilter,
  Veiculo
} from 'src/app/@core/data/usuario-pessoa-externa';

import { AbordagemTipo, State, StateGrid, StatusColor, VeiculoTipo } from 'src/app/@core/enum';

import { TabsService } from 'src/app/@theme/layouts/tabs/service/tabs.service';
import { DateOperator } from 'src/app/@theme/components/miscellaneous/date-operator/date-operator';
import { Buttons, CardTabsOptions } from 'src/app/@theme/layouts/card-tabs/service/cart-tabs.service';
import { ErrosModalService } from 'src/app/@theme/modals/erros/service/erros-modal.service';
import { ConfigStorage } from 'src/app/@core/storage/config/config';
import { NivelOperacaoService } from '../../configuracao/operador/nivel-operacao/service/nivel-operacao.service';
import { Abordagem } from 'src/app/@core/data/usuario-pessoa-interna';
import { VeiculoExternoUsuario, VeiculoExternoUsuarioFilter } from 'src/app/@core/data/usuario-veiculo-externo';
import { FilterVeiculoModal } from 'src/app/@theme/modals/veiculo-interno/service/veiculo-interno-modal.service';
import { VeiculoExternoModalService } from 'src/app/@theme/modals/veiculo-externo/service/veiculo-externo-modal.service';
import { BoxPanel } from 'src/app/@theme/layouts';
import { CaptureModalService } from 'src/app/@theme/modals/capture/service/capture-modal.service';
import { AvatarService } from 'src/app/@theme/components/form/avatar/service/avatar.service';
import { AmbienteData, AmbienteSistema, read_AmbienteSistema } from 'src/app/@core/data/sistema-ambiente';

export enum CardTabID {
  Pessoa = 1,
  Veiculo = 2,
  Abordagem = 3
}

@Component({
  selector: 'nex-pessoa-externa',
  templateUrl: './pessoa-externa.component.html',
  host: { '(window:resize)': 'onResize()' },
  styleUrls: ['./pessoa-externa.component.scss']
})

export class PessoaExternaComponent implements AfterViewInit, OnInit {

  dateOperator: DateOperator = new DateOperator();

  id: number;
  pessoaImagem: Array<number>;

  idVeiculo: number;

  showSpinner: boolean = false;

  pessoaNome_Text: InputLabel = new InputLabel();
  pessoaGrupo_Option: ComboOptions = new ComboOptions();
  pessoaTelefoneFixo_Text: InputLabel = new InputLabel();
  pessoaTelefoneMovel_Text: InputLabel = new InputLabel();
  pessoaEmail_Text: InputLabel = new InputLabel();
  pessoaObservacao_Text: InputLabel = new InputLabel();

  identificacaoDocTipo_Option: ComboOptions = new ComboOptions();
  identificacaoDocNumero_Text: InputLabel = new InputLabel();
  identificacaoNascimento_Text: InputLabel = new InputLabel();
  identificacaoCargo_Option: ComboOptions = new ComboOptions();
  identificacaoEmpresa_Option: ComboOptions = new ComboOptions();

  complementoLabel1: string = "Complemento 1";
  complementoLabel2: string = "Complemento 2";
  complementoLabel3: string = "Complemento 3";
  complementoLabel4: string = "Complemento 4";

  complemento1_Text: InputLabel = new InputLabel();
  complemento2_Text: InputLabel = new InputLabel();
  complemento3_Text: InputLabel = new InputLabel();
  complemento4_Text: InputLabel = new InputLabel();

  enderecoLogradouro_Text: InputLabel = new InputLabel();
  enderecoNumero_Text: InputLabel = new InputLabel();
  enderecoComplemento_Text: InputLabel = new InputLabel();
  enderecoBairro_Text: InputLabel = new InputLabel();
  enderecoCEP_Text: InputLabel = new InputLabel();
  enderecoCidade_Text: InputLabel = new InputLabel();
  enderecoEstado_Text: InputLabel = new InputLabel();
  enderecoPais_Text: InputLabel = new InputLabel();

  integracaoInicio_Text: InputMultiLabel = new InputMultiLabel();
  integracaoFim_Text: InputMultiLabel = new InputMultiLabel();

  segurancaInicio_Text: InputMultiLabel = new InputMultiLabel();
  segurancaFim_Text: InputMultiLabel = new InputMultiLabel();

  exameInicio_Text: InputMultiLabel = new InputMultiLabel();
  exameFim_Text: InputMultiLabel = new InputMultiLabel();

  estado_Options: ComboOptions = new ComboOptions();

  abordagemInformativa_Text: TextareaLabel = new TextareaLabel();
  abordagemAdvertida_Text: TextareaLabel = new TextareaLabel();
  abordagemRestritiva_Text: TextareaLabel = new TextareaLabel();

  tabsConfiguracao_Option: TabsService = new TabsService();
  tabsValidade_Option: TabsService = new TabsService();

  order_by: PessoaExternaUsuarioSort = { nome: SortOperationKind.ASC };
  filter: PessoaExternaUsuarioFilter;

  pessoaVeiculoModalService: VeiculoExternoModalService = new VeiculoExternoModalService();
  filterVeiculoExterno: VeiculoExternoUsuarioFilter;

  listView_PessoaExterna: ListViewGrid = new ListViewGrid();
  listView_PessoaVeiculo: ListViewGrid = new ListViewGrid();

  pessoaExterna: PessoaExternaUsuario;
  savedCondition: boolean = false;

  cardTabs_Options: CardTabsOptions = new CardTabsOptions();
  errosModalService: ErrosModalService = new ErrosModalService();

  estado: number;

  nivelOperacaoService: NivelOperacaoService = new NivelOperacaoService(null);

  textMaskChar: string = "***************************************";

  alertService: AlertServiceComponent = new AlertServiceComponent();
  boxButton: BoxPanel = new BoxPanel();

  captureModalService: CaptureModalService = new CaptureModalService();

  editable: boolean;

  constructor(public actionbuttomService: ActionButtomService,
    private pessoaExternaService: PessoaExternaUsuarioData,
    private pessoaGrupoService: PessoaGrupoData,
    private documentoGrupoService: DocumentoGrupoData,
    private reparticaoEmpresaService: EmpresaReparticaoData,
    private config: ConfigStorage,
    private ambienteService: AmbienteData) {

    this.boxButton.add("btOpen", "insert", false);
    this.boxButton.add("btClose", "delete", false);
  
    this.tabsConfiguracao_Option.add("tabIdentificacao", "Identificação", true);
    this.tabsConfiguracao_Option.add("tabComplemento", "Complemento");
    this.tabsConfiguracao_Option.add("tabEndereco", "Endereço");

    this.tabsValidade_Option.add("tabValidade", "Validade", true);

    this.cardTabs_Options.add({ id: CardTabID.Pessoa, text: 'Pessoa', name: 'pessoa' });
    this.cardTabs_Options.add({ id: CardTabID.Veiculo, text: 'Veículo', name: 'veiculo' });
    this.cardTabs_Options.add({ id: CardTabID.Abordagem, text: 'Abordagem', name: 'abordagem' });

    this.cardTabs_Options.selectButtonByID(CardTabID.Pessoa);

    this.actionbuttomService.relationGrid = "lstPessoaExterna";
    
    this.actionbuttomService.recurso = "2E";
    this.actionbuttomService.top_action_buttons = [
      { "id": 0, "text": "forms.buttons.create", "enabled": true, "condition": "always", "maximized": true, "openForm": true, "editable": "new", },
      { "id": 1, "text": "forms.buttons.update", "enabled": false, "condition": "select", "maximized": true, "openForm": true, "editable": "yes", },
      { "id": 2, "text": "forms.buttons.read", "enabled": false, "condition": "select", "maximized": true, "openForm": true, "editable": "no", },
      { "id": 3, "text": "forms.buttons.delete", "enabled": false, "condition": "multi", "openForm": false, "question": "forms.questions.delete" }]

    this.pessoaVeiculoModalService.name = "pessoaVeiculoModal";
    this.pessoaVeiculoModalService.pesquisaVeiculo_Option.name = "cbPesquisaVeiculo";
    this.pessoaVeiculoModalService.grid = [
      { "header": "Veículo ID", "field": "placa", "width": 15, "align": "left" },
      { "header": "Tipo", "field": "tipo", "width": 15, "align": "left", "enum": VeiculoTipo },
      { "header": "Modelo", "entity": "modelo", "field": "veiculoModelo", "width": 25, "align": "left" },
      { "header": "Cor", "field": "cor", "width": 45, "align": "left" }];

    this.listView_PessoaExterna.name = "lstPessoaExterna";
    this.listView_PessoaExterna.colorField = "status";
    this.listView_PessoaExterna.colorEnum = StatusColor;
    this.listView_PessoaExterna.title = "Lista de Pessoas Externas";
    this.listView_PessoaExterna.grid = [
      { "header": "", "entity": "imagem", "field": "imagem", "width": 3, "align": "center", "type": "image" },
      { "header": "Nome", "field": "nome", "width": 30, "align": "left" },
      { "header": "Grupo", "entity": "grupo", "field": "pessoaGrupo", "width": 19, "align": "left" },
      { "header": "Telefone", "field": "telefoneFixo", "width": 17, "align": "left" },
      { "header": "E-mail", "field": "email", "width": 20, "align": "left" },
      { "header": "Status", "field": "status", "width": 11, "align": "left", enum: StateGrid }];

    this.pessoaNome_Text.name = "txtNome";
    this.pessoaNome_Text.rules = "uppercase";
    this.pessoaNome_Text.minLength = 3;
    this.pessoaNome_Text.maxLength = 50;

    this.pessoaGrupo_Option.name = "cbGrupoPessoa";
    this.pessoaGrupo_Option.add("", null, 0);

    const sortPessoaGrupo: PessoaGrupoSort = { pessoaGrupo: SortOperationKind.ASC };
    const filterPessoaGrupo: PessoaGrupoFilter = {or: [{ pessoaPrestador: { eq: true } },
                                                       {pessoaVisitante: { eq: true } }]};

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
    this.pessoaTelefoneMovel_Text.regex = "noFilter";
    this.pessoaTelefoneMovel_Text.maxLength = 15;

    this.pessoaEmail_Text.name = "txtEmail";
    this.pessoaEmail_Text.rules = "email";
    this.pessoaEmail_Text.regex = "email";
    this.pessoaEmail_Text.maxLength = 50;

    this.pessoaObservacao_Text.name = "txtObservacao";
    this.pessoaObservacao_Text.rules = "uppercase";
    this.pessoaObservacao_Text.regex = "noFilter";
    this.pessoaObservacao_Text.maxLength = 100;

    this.abordagemInformativa_Text.name = "txtAbordagemInformativa";
    this.abordagemInformativa_Text.maxLength = 1000;
    this.abordagemInformativa_Text.regex = "noFilter";

    this.abordagemAdvertida_Text.name = "txtAbordagemAdvertida";
    this.abordagemAdvertida_Text.maxLength = 1000;
    this.abordagemAdvertida_Text.regex = "noFilter";

    this.abordagemRestritiva_Text.name = "txtAbordagemRestritiva";
    this.abordagemRestritiva_Text.maxLength = 1000;
    this.abordagemRestritiva_Text.regex = "noFilter";

    this.identificacaoDocNumero_Text.name = "txtDocNumero";
    this.identificacaoDocNumero_Text.rules = "lettersNumbers";
    this.identificacaoDocNumero_Text.maxLength = 15;
    this.identificacaoDocNumero_Text.minLength = 0;

    this.identificacaoDocTipo_Option.name = "cbPessoaExternaTipoDocumento";

    const sortDocumentoGrupo: DocumentoGrupoSort = { id: SortOperationKind.ASC };
    const filterDocumentoGrupo: DocumentoGrupoFilter = {or: [{ prestador: { eq: true } },
                                                             { visitante: { eq: true } }]};
    this.documentoGrupoService.readDocumentoGrupos(sortDocumentoGrupo, filterDocumentoGrupo)
      .subscribe(({ grupoDocumento }: read_DocumentoGrupo) => {
        const nodes: DocumentoGrupo[] = grupoDocumento.nodes;
        this.identificacaoDocTipo_Option.addRange(nodes.map(documento => {
          return {id: documento.id, text: documento.tipo, value: documento.tipo}
        }))
      });

    this.identificacaoCargo_Option.name = "cbIdentificacaoCargo";
    this.identificacaoCargo_Option.add("", "", 0);
    this.identificacaoCargo_Option.maxLength = 30;

    this.onCargoPopulate();

    this.identificacaoNascimento_Text.name = "txtNascimento";
    this.identificacaoNascimento_Text.rules = "date";
    this.identificacaoNascimento_Text.regex = "date";
    this.identificacaoNascimento_Text.textAlign = "center";
    this.identificacaoNascimento_Text.maxLength = 10;

    this.identificacaoEmpresa_Option.name = "cbEmpresa";
    this.identificacaoEmpresa_Option.maxLength = 30;

    this.complemento1_Text.name = "txtComplemento1";
    this.complemento1_Text.rules = "uppercase";
    this.complemento1_Text.regex = "noFilter";
    this.complemento1_Text.maxLength = 30;

    this.complemento2_Text.name = "txtComplemento2";
    this.complemento2_Text.rules = "uppercase";
    this.complemento2_Text.regex = "noFilter";
    this.complemento2_Text.maxLength = 30;

    this.complemento3_Text.name = "txtComplemento3";
    this.complemento3_Text.rules = "uppercase";
    this.complemento3_Text.regex = "noFilter";
    this.complemento3_Text.maxLength = 30;

    this.complemento4_Text.name = "txComplemento4";
    this.complemento4_Text.rules = "uppercase";
    this.complemento4_Text.regex = "noFilter";
    this.complemento4_Text.maxLength = 30;

    this.enderecoLogradouro_Text.name = "txtLogradouro";
    this.enderecoLogradouro_Text.rules = "uppercase";
    this.enderecoLogradouro_Text.maxLength = 30;

    this.enderecoNumero_Text.name = "txtNumero";
    this.enderecoNumero_Text.rules = "onlynumbers";
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

    this.integracaoFim_Text.name = "txtIntegracaoInicio";
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

    this.estado_Options.name = "cbEstado";
    this.estado_Options.add("LIVRE", "livre", 1);
    this.estado_Options.add("BLOQUEADO", "bloqueado", 0);

    this.listView_PessoaVeiculo.name = "lstPessoaVeiculo";
    this.listView_PessoaVeiculo.gridOnly = true;
    this.listView_PessoaVeiculo.noPaging = true;
    this.listView_PessoaVeiculo.noBorder = true;
    this.listView_PessoaVeiculo.identificador = "veiculoId";
    this.listView_PessoaVeiculo.grid = [
      { "header": "Veículo ID", "field": "placa", "width": 15, "align": "left" },
      { "header": "Tipo", "field": "tipo", "width": 15, "align": "left", "enum": VeiculoTipo },
      { "header": "Modelo", "entity": "modelo", "field": "veiculoModelo", "width": 25, "align": "left" },
      { "header": "Cor", "field": "cor", "width": 45, "align": "left" },
    ];
    
    const find = null;
    const filter = { select: "Nome", field: "pessoaExterna", value: "" };
    
    this.update_Grid(find, filter);

  }

  ngAfterViewInit(): void {
    this.onResize();   
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

  onActionButtom_Click(actionButtomSelect: any) {
    this.savedCondition = false;
    switch (actionButtomSelect.text) {
      case "forms.buttons.create":
        this.empresaPopulate(0);
        this.pessoaNome_Text.focus();
        this.editable = true;
        break;
      
      case "forms.buttons.update":
        this.updateDataLoad();
        this.tabsValidade_Option.select("tabValidade");
        this.tabsConfiguracao_Option.select("tabIdentificacao");
        // this.onListView_Change({registro: this.pessoaInterna})
        this.pessoaNome_Text.focus();
        this.editable = true;
        break;
      
      case "forms.buttons.read":
        this.editable = false;
        this.updateDataLoad();
        break;
      
    }
  }

  empresaPopulate(id: number = 0, clean: boolean = true) {
    if (clean) this.identificacaoEmpresa_Option.clear();

    this.identificacaoEmpresa_Option.add("", null, 0);
    const sortEmpresaReparticao: EmpresaReparticaoSort = { nome: SortOperationKind.ASC };
    const filterEmpresaReparticao: EmpresaReparticaoFilter = null;

    this.reparticaoEmpresaService.readEmpresaReparticaos(sortEmpresaReparticao, filterEmpresaReparticao)
      .subscribe(({ reparticaoEmpresa }: read_EmpresaReparticao) => {
        const nodes: EmpresaReparticao[] = reparticaoEmpresa.nodes;
        nodes.forEach((node: EmpresaReparticao) => {
          this.identificacaoEmpresa_Option.add(node.nome, null, node.id);
        });

        this.identificacaoEmpresa_Option.select(id);
        if (id == 0) { 
          this.identificacaoEmpresa_Option.itemSelected.text = this.pessoaExterna?.entidadeNome || '';
        }

      }, (error => {
        // Tratar erro subscribe...
      }))
  }

  onCardTabs_Click(cardSelected: Buttons) {
    this.cardTabs_Options.selectButtonByID(cardSelected.id);
    if (cardSelected.id == CardTabID.Pessoa) this.tabsConfiguracao_Option.select("tabIdentificacao");
  }

  updateDataLoad() {
    this.showSpinner = true;

    const filter: PessoaExternaUsuarioFilter = { id: { eq: this.id } };
    this.pessoaExternaService.readPessoaExternaUsuarios(this.order_by, filter)
      .subscribe(({ usuarioPessoaExterna }: read_PessoaExternaUsuario) => {

        this.pessoaExterna = usuarioPessoaExterna.nodes[0];
        this.pessoaImagem = this.pessoaExterna.imagem?.imagem || null;

        this.identificacaoCargo_Option.selectbyText(this.pessoaExterna.cargo);

        this.empresaPopulate(this.pessoaExterna.empresaId);

        if (this.pessoaExterna.endereco) {
          this.enderecoLogradouro_Text.text = this.pessoaExterna.endereco.logradouro;
          this.enderecoNumero_Text.text = this.pessoaExterna.endereco.numero;
          this.enderecoComplemento_Text.text = this.pessoaExterna.endereco.complemento;
          this.enderecoBairro_Text.text = this.pessoaExterna.endereco.bairro;
          this.enderecoCEP_Text.text = this.pessoaExterna.endereco.cep;
          this.enderecoCidade_Text.text = this.pessoaExterna.endereco.cidade;
          this.enderecoEstado_Text.text = this.pessoaExterna.endereco.estado;
          this.enderecoPais_Text.text = this.pessoaExterna.endereco.pais;
        }

        this.pessoaNome_Text.text = this.pessoaExterna.nome;
        this.pessoaGrupo_Option.select(this.pessoaExterna.grupoId);
        this.pessoaTelefoneFixo_Text.setTextWithMask(this.pessoaExterna.telefoneFixo);
        this.pessoaTelefoneMovel_Text.setTextWithMask(this.pessoaExterna.telefoneMovel);
        this.pessoaEmail_Text.text = this.pessoaExterna.email;
        this.pessoaObservacao_Text.text = this.pessoaExterna.observacao;

        this.identificacaoDocTipo_Option.selectbyValue(this.pessoaExterna.documentoTipo);
        this.onTipoDoc_Change(this.pessoaExterna.documentoNumero);
        
        this.identificacaoNascimento_Text.setTextWithMask(this.pessoaExterna.nascimento);
        this.identificacaoCargo_Option.select(parseInt(this.pessoaExterna.cargo));
        this.estado_Options.select(this.pessoaExterna.status ? 1 : 0);
        this.integracaoInicio_Text.setTextWithMask(this.pessoaExterna.integracaoInicio);
        this.integracaoFim_Text.setTextWithMask(this.pessoaExterna.integracaoFim);
        this.segurancaInicio_Text.setTextWithMask(this.pessoaExterna.segurancaInicio);
        this.segurancaFim_Text.setTextWithMask(this.pessoaExterna.segurancaFim);
        this.exameInicio_Text.setTextWithMask(this.pessoaExterna.exameMedicoInicio);
        this.exameFim_Text.setTextWithMask(this.pessoaExterna.exameMedicoFim);

        this.cardTabs_Options.setCondition('abordagem', AbordagemTipo.nenhum);

        this.complemento1_Text.text = this.pessoaExterna.complemento1;
        this.complemento2_Text.text = this.pessoaExterna.complemento2;
        this.complemento3_Text.text = this.pessoaExterna.complemento3;
        this.complemento4_Text.text = this.pessoaExterna.complemento4;

        const veiculoPessoaExterna: VeiculoExternoUsuario[] = this.pessoaExterna.veiculos?.map(veiculos => {
          return {
            id: veiculos.veiculoExterno.id,
            placa: veiculos.veiculoExterno.placa,
            tipo: veiculos.veiculoExterno.tipo,
            modelo: veiculos.veiculoExterno.modelo,
            cor: veiculos.veiculoExterno.cor
          }
        });
        this.listView_PessoaVeiculo.gridUpdate(veiculoPessoaExterna);

        this.abordagemInformativa_Text.text = this.pessoaExterna.abordagem?.mensagemInformativa;
        this.abordagemAdvertida_Text.text = this.pessoaExterna.abordagem?.mensagemAdvertida;
        this.abordagemRestritiva_Text.text = this.pessoaExterna.abordagem?.mensagemRestritiva;

        if (this.abordagemInformativa_Text.text?.length > 0) {
          this.cardTabs_Options.setCondition('abordagem', AbordagemTipo.informativa);
        }          
        if (this.abordagemAdvertida_Text.text?.length > 0) {
          this.cardTabs_Options.setCondition('abordagem', AbordagemTipo.advertida);
        }
        if (this.abordagemRestritiva_Text.text?.length > 0) {
          this.cardTabs_Options.setCondition('abordagem', AbordagemTipo.restritiva);
        }

        this.showSpinner = false;
      });
  }

  onListView_Change(rowSelect?: rowSelect) {
    if (rowSelect.registro) {
      this.id = rowSelect.id;
    } else {
      if (rowSelect.exclude == "yes") {
        this.pessoaExternaService.deletePessoaExternaUsuario(rowSelect.id)
          .subscribe(({ data }: delete_PessoaExternaUsuario) => {
            if (data.usuarioPessoaExterna_Excluir.sucesso == true) {
              const find = { field: "id", value: rowSelect.id, type: "DEL" }
              this.update_Grid(find)

            } else {
              const objeto = JSON.parse(data.usuarioPessoaExterna_Excluir.objeto);
              this.alertService.show(data.usuarioPessoaExterna_Excluir.mensagemTipo,
                data.usuarioPessoaExterna_Excluir.mensagem,
                objeto);
            }
          })
      }
    }
  }

  onCargoPopulate(cargoSelect?: string, clean: boolean = true) {
    if (clean) this.identificacaoCargo_Option.clear();

    this.identificacaoCargo_Option.itemSelected.text = "Aguarde! Carregando...";
    this.pessoaExternaService.readPessoaExternaCargo()
      .subscribe((cargos: any) => {
        this.identificacaoCargo_Option.itemSelected.text = '';
        const cargoIndex: number = cargos.usuarioPessoaInternaCargo?.findIndex(cargo => cargo.length == 0);
        if(cargoIndex > 0) { 
          this.identificacaoCargo_Option.add('', '', 0, !cargoSelect);
        }
        cargos.usuarioPessoaExternaCargo.forEach((cargo: string, index: number = 1) => {
          this.identificacaoCargo_Option.add(cargo, cargo, index, cargo == (cargoSelect || null));
          index++
        });
      });
  }

  onlistViewPessoaVeiculo_Change(rowSelect?: rowSelect) {
    if (rowSelect.registro) {
      this.idVeiculo = rowSelect.registro.pessoaId;
    }
  }

  pessoaVeiculoModalSelect(veiculoSelect: VeiculoExternoUsuario) {
    if (veiculoSelect != null) {
      const condutor: any = {
        id: veiculoSelect.id,
        placa: veiculoSelect.placa,
        tipo: veiculoSelect.tipo,        
        modelo: veiculoSelect.modelo,
        cor: veiculoSelect.cor,
      }

      const condutores: any[] = this.listView_PessoaVeiculo.dataGridBehavior?.value || [];
      condutores.push(condutor);
      this.listView_PessoaVeiculo.gridUpdate(condutores);
    }
  }

  onListView_Filter(filterSelect: Item) {
    switch (filterSelect.text) {
      case "Nome":
        this.filter = { nome: { contains: filterSelect.value } };
        break;

      case "Grupo":
        if(filterSelect.value != "") {
          const grupoPessoaIndex: number = this.pessoaGrupo_Option.getId(filterSelect.value);
          if (grupoPessoaIndex) {
            const grupoId: number = this.pessoaGrupo_Option.itens[grupoPessoaIndex].id;
            this.filter = { grupoId: { eq: grupoId } };
          } else {
            this.filter = { grupoId: { eq: 0} };
          }  
        } else {
          this.filter = undefined;
        }
        break;

      case "Telefone":
        this.filter = { telefoneFixo: { contains: filterSelect.value } };
        break;

      case "E-mail":
        this.filter = { email: { contains: filterSelect.value } };
        break;

      case "Estado":
        if(filterSelect.value != "") {
          if (filterSelect.value == "LIVRE" || filterSelect.value == "BLOQUEADA") {
            const status: boolean = (filterSelect.value == "LIVRE");
            this.filter = { status: { eq: status } };
          } else {
            this.filter = { status: { eq: undefined} };
          }
        } else {
          this.filter = undefined;
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
    this.pessoaNome_Text.validated = (this.pessoaNome_Text.text.length >= this.pessoaNome_Text.minLength);

    const inicialFinalIntegracao: boolean = new DateOperator().compareDateGT(this.integracaoInicio_Text.textMasked, this.integracaoFim_Text.textMasked);
    const inicialFinalSeguranca: boolean = new DateOperator().compareDateGT(this.segurancaInicio_Text.textMasked, this.segurancaFim_Text.textMasked);
    const inicialFinalExame: boolean = new DateOperator().compareDateGT(this.exameInicio_Text.textMasked, this.exameFim_Text.textMasked);

    this.integracaoInicio_Text.validated = this.integracaoInicio_Text.condition() && inicialFinalIntegracao;
    this.integracaoFim_Text.validated = this.integracaoFim_Text.condition() && inicialFinalIntegracao;
    this.segurancaInicio_Text.validated = this.segurancaInicio_Text.condition() && inicialFinalSeguranca;
    this.segurancaFim_Text.validated = this.segurancaFim_Text.condition() && inicialFinalSeguranca;
    this.exameInicio_Text.validated = this.exameInicio_Text.condition() && inicialFinalExame;
    this.exameFim_Text.validated = this.exameFim_Text.condition() && inicialFinalExame;

    if (!this.pessoaNome_Text.validated) {
      this.alertService.show("ERRO",
        "Existem campos obrigatórios não preenchidos ou preenchidos de forma incorreta. Verifique!",
        null);
    } else if (this.pessoaGrupo_Option.itemSelected.id == 0) {
      this.alertService.show("ERRO",
        "Informe o Grupo a que pertence essa Pessoa.",
        null);
    } else if (!this.identificacaoNascimento_Text.validated) {
      this.alertService.show("ERRO",
        "Campo Nascimento deve ser uma data válida. Verifique!.",
        null);
    } else if (!this.identificacaoDocNumero_Text.validated) {
      this.alertService.show("ERRO",
        "Existem campos obrigatórios não preenchidos ou preenchidos de forma incorreta. Verifique!",
        null);
    } else if (!inicialFinalIntegracao) {
      this.alertService.show("ERRO",
        "Data de Integração Inicial, não pode ser maior que a data de Integração Final. Verifique!",
        null);
    } else if (!inicialFinalSeguranca) {
      this.alertService.show("ERRO",
        "Data de Segurança Inicial, não pode ser maior que a data de Segurança Final. Verifique!",
        null);
    } else if (!inicialFinalExame) {
      this.alertService.show("ERRO",
        "Data de Exame Médico Inicial, não pode ser maior que a data de Exame Médico Final. Verifique!",
        null);
    } else {

      this.showSpinner = true;

      const pessoaExterna: PessoaExternaUsuario = {
        id: this.id,
        nome: this.pessoaNome_Text.text,
        imagem: {
          imagem: this.pessoaImagem || []
        },
        grupoId: this.pessoaGrupo_Option.itemSelected.id,
        telefoneFixo: this.pessoaTelefoneFixo_Text.textMasked,
        telefoneMovel: this.pessoaTelefoneMovel_Text.textMasked,
        email: this.pessoaEmail_Text.text,
        observacao: this.pessoaObservacao_Text.text,
        documentoTipo: this.identificacaoDocTipo_Option.itemSelected.text,
        documentoNumero: (this.identificacaoDocTipo_Option.itemSelected.text == "CPF")? this.identificacaoDocNumero_Text.textMasked: this.identificacaoDocNumero_Text.text,
        cargo: this.identificacaoCargo_Option.itemSelected.text,
        nascimento: this.identificacaoNascimento_Text.formated,
        empresaId: this.identificacaoEmpresa_Option.itemSelected?.id || 0,
        entidadeNome: (this.identificacaoEmpresa_Option.itemSelected?.id == 0)? this.identificacaoEmpresa_Option.itemSelected?.text: undefined,
        complemento1: this.complemento1_Text.text,
        complemento2: this.complemento2_Text.text,
        complemento3: this.complemento3_Text.text,
        complemento4: this.complemento4_Text.text,
        integracaoInicio: this.integracaoInicio_Text.formated,
        integracaoFim: this.integracaoFim_Text.formated,
        segurancaInicio: this.segurancaInicio_Text.formated,
        segurancaFim: this.segurancaFim_Text.formated,
        exameMedicoInicio: this.exameInicio_Text.formated,
        exameMedicoFim: this.exameFim_Text.formated,
        endereco: {
          logradouro: this.enderecoLogradouro_Text.text,
          numero: this.enderecoNumero_Text.text,
          complemento: this.enderecoComplemento_Text.text,
          bairro: this.enderecoBairro_Text.text,
          cep: this.enderecoCEP_Text.text,
          pais: this.enderecoPais_Text.text,
          cidade: this.enderecoCidade_Text.text,
          estado: this.enderecoEstado_Text.text
        },
        veiculos: this.listView_PessoaVeiculo.dataGridBehavior.value?.map(veiculo => {
          return {id: veiculo.id}
        }),
        abordagem: {
          mensagemAdvertida: this.abordagemAdvertida_Text.text || "",
          mensagemInformativa: this.abordagemInformativa_Text.text || "",
          mensagemRestritiva: this.abordagemRestritiva_Text.text || ""
        },
        status: this.estado_Options.itemSelected.id == 1 ? true : false
      };
      if (pessoaExterna.id) {
        this.pessoaExternaService.updatePessoaExternaUsuario(pessoaExterna)
          .subscribe(({ data }: update_PessoaExternaUsuario) => {
            const objeto: any = JSON.parse(data.usuarioPessoaExterna_Alterar.objeto);
            if (data.usuarioPessoaExterna_Alterar.sucesso == true) {
              const find = { field: "id", value: objeto.Id }
              this.onClose_Click();
              this.update_Grid(find);
            } else {
              this.alertService.show(data.usuarioPessoaExterna_Alterar.mensagemTipo,
                data.usuarioPessoaExterna_Alterar.mensagem,
                objeto);
            }
            this.showSpinner = false;
          })
      } else {
        this.pessoaExternaService.createPessoaExternaUsuario(pessoaExterna)
          .subscribe(({ data }: create_PessoaExternaUsuario) => {
            const objeto: any = JSON.parse(data.usuarioPessoaExterna_Inserir.objeto);
            if (data.usuarioPessoaExterna_Inserir.sucesso == true) {
              const find = { field: "id", value: objeto.Id };
              this.onClose_Click(false);
              this.update_Grid(find);
            } else {
              this.alertService.show(data.usuarioPessoaExterna_Inserir.mensagemTipo,
                data.usuarioPessoaExterna_Inserir.mensagem,
                objeto);
            }
            this.showSpinner = false;
          })
      }
    }
  }

  onButton_Click(type: any) {
    switch (type) {
      case "insert":
        const pessoaLista: Array<number> = this.listView_PessoaVeiculo.dataGridBehavior
          .value?.map(condutor => {return condutor.id});
        this.pessoaVeiculoModalService.show('Veículos', pessoaLista);
        break;

      case "delete":
        const indexId = this.listView_PessoaVeiculo.dataGridBehavior
          .value?.findIndex(cdt => cdt.pessoaId == this.idVeiculo);
        if (indexId >= 0) {
          this.listView_PessoaVeiculo.dataGridBehavior.value?.splice(indexId, 1);
        }
        break;
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

  update_Grid(find?: Find, filter?: Filter) {
    this.listView_PessoaExterna.processingShow();
    this.pessoaExternaService.readPessoaExternaUsuarios(this.order_by, this.filter)
      .subscribe(({ usuarioPessoaExterna }: read_PessoaExternaUsuario) => {
        this.actionbuttomService.enableButtons(0);
        this.listView_PessoaExterna.gridUpdate(usuarioPessoaExterna?.nodes, find, filter);
      });
  }

  onImageCapture_Click(capture: boolean = false) {
    if(capture) {
      this.captureModalService.show();
    }
  }

  onImage_Captured(image: string) {
    this.pessoaImagem = this.config.converteImagemArray(image);
  }

  onResize() {
    const maxHeightPanel = document.getElementById('pessoaExternaComponent_Panel')?.clientHeight;
    this.listView_PessoaVeiculo.maxHeight = maxHeightPanel - 95;
  }

  onClose_Click(hideForm: boolean = true) {
    this.pessoaImagem = null;
    
    this.pessoaNome_Text.clear();
    this.pessoaGrupo_Option.select(0);
    this.pessoaTelefoneFixo_Text.clear();
    this.pessoaTelefoneMovel_Text.clear();   
    this.pessoaEmail_Text.clear();
    this.pessoaObservacao_Text.clear();

    this.identificacaoDocTipo_Option.selectbyText("RG");
    this.onTipoDoc_Change();
    this.identificacaoNascimento_Text.clear();
    this.identificacaoCargo_Option.clear();
    this.empresaPopulate(0);

    this.complemento1_Text.clear();
    this.complemento2_Text.clear();
    this.complemento3_Text.clear();
    this.complemento4_Text.clear();

    this.enderecoLogradouro_Text.clear();
    this.enderecoNumero_Text.clear();
    this.enderecoComplemento_Text.clear();
    this.enderecoBairro_Text.clear();
    this.enderecoCEP_Text.clear();
    this.enderecoCidade_Text.clear();
    this.enderecoEstado_Text.clear();
    this.enderecoPais_Text.clear();

    this.estado_Options.select(1);
    this.integracaoInicio_Text.clear()
    this.integracaoFim_Text.clear();
    this.segurancaInicio_Text.clear();
    this.segurancaFim_Text.clear();
    this.exameInicio_Text.clear();
    this.exameFim_Text.clear();

    this.listView_PessoaVeiculo.clear();

    this.abordagemInformativa_Text.clear();
    this.abordagemAdvertida_Text.clear();
    this.abordagemRestritiva_Text.clear();
    this.cardTabs_Options.setCondition('abordagem', AbordagemTipo.nenhum);

    this.cardTabs_Options.selectButtonByID(CardTabID.Pessoa);
    this.tabsConfiguracao_Option.select("tabIdentificacao");
    this.tabsValidade_Option.select("tabValidade");    

    if (hideForm == true) {
      this.actionbuttomService.hideForm(true);
    } else {
      this.pessoaNome_Text.focus();
    }

  }

}