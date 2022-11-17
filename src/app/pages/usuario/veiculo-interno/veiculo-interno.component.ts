import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import { ComboOptions, Item } from 'src/app/@theme/components/form/combobox/service/combobox.service';
import { InputLabel } from 'src/app/@theme/components/form/input-label/service/input-label.service';
import { InputMultiLabel } from 'src/app/@theme/components/form/input-multi-label/service/input-multi-label';
import { ActionButtomService } from 'src/app/@theme/components/grid/action-buttom/service/action-button.service';
import { Filter, Find, ListViewGrid, rowSelect } from 'src/app/@theme/components/grid/list-view/service/list-view.service';
import { BoxPanel } from 'src/app/@theme/layouts';
import { Buttons, CardTabsOptions } from 'src/app/@theme/layouts/card-tabs/service/cart-tabs.service';
import { TabsService } from 'src/app/@theme/layouts/tabs/service/tabs.service';
import { FilterPessoaModal, PessoaInternaModalService } from 'src/app/@theme/modals/pessoa-interna/service/pessoa-modal.service';
import { PessoaInternaUsuario, } from 'src/app/@core/data/usuario-pessoa-interna';
import { OptionsGroup } from 'src/app/@theme/components/form/select-group/service/select-group.service';
import {
  create_VeiculoInternoUsuario,
  delete_VeiculoInternoUsuario,
  read_VeiculoInternoUsuario,
  update_VeiculoInternoUsuario,
  VeiculoInternoCondutor,
  VeiculoInternoUsuario,
  VeiculoInternoUsuarioData,
  VeiculoInternoUsuarioFilter,
  VeiculoInternoUsuarioSort
} from 'src/app/@core/data/usuario-veiculo-interno';
import { SortOperationKind } from 'src/app/@core/api/generic-graphql';
import { AbordagemTipo, Status, VeiculoTipo } from 'src/app/@core/enum';
import {
  read_VeiculoGrupo,
  VeiculoGrupo,
  VeiculoGrupoData,
  VeiculoGrupoFilter,
  VeiculoGrupoSort
} from 'src/app/@core/data/grupo-veiculo';
import {
  read_VeiculoModeloGrupo,
  VeiculoModeloGrupo,
  VeiculoModeloGrupoData,
  VeiculoModeloGrupoSort
} from 'src/app/@core/data/grupo-veiculo-modelo';
import { AlertServiceComponent } from 'src/app/@theme/components/form/alert-card/service/alert-card.service';
import { read_Site, Site, SiteData, SiteFilter, SiteSort } from 'src/app/@core/data/reparticao-site';
import {
  SetorReparticao,
  SetorReparticaoData,
  SetorReparticaoFilter,
  SetorReparticaoSort,
  read_SetorReparticao
} from 'src/app/@core/data/reparticao-setor';
import {
  read_AreaReparticao,
  AreaReparticao,
  AreaReparticaoData,
  AreaReparticaoFilter,
  AreaReparticaoSort
} from 'src/app/@core/data/reparticao-area';
import {
  CentroCustoGrupo,
  CentroCustoGrupoData,
  CentroCustoGrupoFilter,
  CentroCustoGrupoSort,
  read_CentroCustoGrupo
} from 'src/app/@core/data/grupo-centro-custo';
import {
  EmpresaReparticao,
  EmpresaReparticaoData,
  EmpresaReparticaoFilter,
  EmpresaReparticaoSort,
  read_EmpresaReparticao
} from 'src/app/@core/data/reparticao-empresa';
import { DateOperator } from 'src/app/@theme/components/miscellaneous/date-operator/date-operator';
import { ConfigStorage, SiteConfig } from 'src/app/@core/storage/config/config';
import { BehaviorSubject } from 'rxjs';
import { TreeviewService } from 'src/app/@theme/layouts/treeview/service/treeview.service';
import { TreeView } from 'src/app/@theme/layouts/treeview/service/treeview';
import { TextareaLabel } from 'src/app/@theme/components';
import { UsuarioNivelAcessoModalService } from 'src/app/@theme/modals/usuario-nivel-acesso/service/usuario-nivel-acesso-modal.service';

export enum CardTabID {
  Veiculo = 1,
  Condutor = 2,
  Acesso = 3,
  Abordagem = 4
}

@Component({
  selector: 'nex-veiculo-interno',
  templateUrl: './veiculo-interno.component.html',
  styleUrls: ['./veiculo-interno.component.scss'],
  host: { '(window:resize)': 'onResize()' },
})

export class VeiculoInternoComponent implements AfterViewInit, OnDestroy {

  id!: number | undefined;
  idCondutor!: number;
  idAcesso!: number;
  veiculoInterno!: VeiculoInternoUsuario;
  supervisorId: number;

  dateOperator: DateOperator = new DateOperator();

  //  ------------ inicio primeiro grid --------
  tipoVeiculo_Options: ComboOptions = new ComboOptions();
  idVeiculo_Text: InputLabel = new InputLabel();
  modeloVeiculo_Options: ComboOptions = new ComboOptions();
  corVeiculo_Options: ComboOptions = new ComboOptions();
  grupoVeiculo_Options: ComboOptions = new ComboOptions();
  caracteristicaVeiculo_Text: InputLabel = new InputLabel();
  observacaoVeiculo_Text: InputLabel = new InputLabel();
  //  ------------ fim primeiro grid --------

  //  ------------ inicio identificacao --------
  pesoVeiculo_Text: InputLabel = new InputLabel();
  licenciamentoVeiculo_Text: InputLabel = new InputLabel();
  combustivelVeiculo_Options: ComboOptions = new ComboOptions();
  supervisor_Text: InputLabel = new InputLabel();
  //  ------------ fim identificacao --------

  //  ------------ inicio reparticao --------
  reparticaoSite_Option: ComboOptions = new ComboOptions();
  reparticaoSetor_Option: ComboOptions = new ComboOptions();
  reparticaoArea_Option: ComboOptions = new ComboOptions();
  veiculoInternoLocalizacao_Options: ComboOptions = new ComboOptions();
  //  ------------ fim reparticao --------


  // ----------- inicio complemento -----------
  complemento1_Text: InputLabel = new InputLabel();
  complemento2_Text: InputLabel = new InputLabel();
  complemento3_Text: InputLabel = new InputLabel();
  complemento4_Text: InputLabel = new InputLabel();

  complementoLabel1: string = "Complemento 1";
  complementoLabel2: string = "Complemento 2";
  complementoLabel3: string = "Complemento 3";
  complementoLabel4: string = "Complemento 4";
  veiculoInternoCentroCusto_Option: ComboOptions = new ComboOptions();
  // ----------- fim complemento -----------

  // ----------- inicio validade -----------
  validadeEstado_Options: ComboOptions = new ComboOptions();
  contratoInicio_Text: InputMultiLabel = new InputMultiLabel();
  contratoFim_Text: InputMultiLabel = new InputMultiLabel();
  //  ------------ fim validade --------

  // ----------- inicio estacionamento -----------
  vaga_Text: InputLabel = new InputLabel();
  estacionamento_Text: InputLabel = new InputLabel();
  site_Text: InputLabel = new InputLabel();
  // ----------- fim estacionamento -----------

  listView_VeiculoCondutor: ListViewGrid = new ListViewGrid();
  listView_VeiculoVagaVinculada: ListViewGrid = new ListViewGrid();
  listView_VeiculoAcesso: ListViewGrid = new ListViewGrid();

  tabsConfiguracao_Options: TabsService = new TabsService();

  tabsAcesso_Veiculo_Options: TabsService = new TabsService();

  tagOficial_Text: InputLabel = new InputLabel();
  tagProvisoria_Text: InputLabel = new InputLabel();
  creditoAcesso_Text: InputLabel = new InputLabel();
  senha_Text: InputLabel = new InputLabel();

  tabsValidade_Options: TabsService = new TabsService();
  cardTabs_Options: CardTabsOptions = new CardTabsOptions();

  controle_Options: OptionsGroup = new OptionsGroup();

  abordagemInformativa_Text: TextareaLabel = new TextareaLabel();
  abordagemAdvertida_Text: TextareaLabel = new TextareaLabel();
  abordagemRestritiva_Text: TextareaLabel = new TextareaLabel();

  pessoaModalService: PessoaInternaModalService = new PessoaInternaModalService();
  usuarioNivelAcessoModalService: UsuarioNivelAcessoModalService = new UsuarioNivelAcessoModalService();

  filterPessoaInterna!: FilterPessoaModal;

  showSpinner: boolean = false;
  alertService: AlertServiceComponent = new AlertServiceComponent();
  boxButton: BoxPanel = new BoxPanel();
  listView_VeiculoInterno: ListViewGrid = new ListViewGrid();
  savedCondition: boolean = false;

  condutores: VeiculoInternoCondutor[] = [];

  order_by: VeiculoInternoUsuarioSort = { placa: SortOperationKind.ASC };
  filter!: VeiculoInternoUsuarioFilter;
  filterGrid!: VeiculoInternoUsuarioFilter;

  settings: BehaviorSubject<any>;
  treeviewItem: BehaviorSubject<any>;

  siteId: number = 0;
  setorId: number = 0;
  areaId: number = 0;

  editable!: boolean;

  constructor(
    public actionbuttomService: ActionButtomService,
    private veiculoInternoService: VeiculoInternoUsuarioData,
    private veiculoGrupoService: VeiculoGrupoData,
    private veiculoModeloGrupoService: VeiculoModeloGrupoData,
    private siteService: SiteData,
    private setorService: SetorReparticaoData,
    private setorReparticaoService: SetorReparticaoData,
    private areaReparticaoService: AreaReparticaoData,
    private reparticaoEmpresaService: EmpresaReparticaoData,
    private centroCustoService: CentroCustoGrupoData,
    private treeviewService: TreeviewService,
    private config: ConfigStorage) {

    this.settings = this.config.siteSubject();
    this.treeviewItem = this.treeviewService.itemSubject();

    this.cardTabs_Options.add({ id: CardTabID.Veiculo, text: 'Veículo', name: 'veiculo' });
    this.cardTabs_Options.add({ id: CardTabID.Condutor, text: 'Condutor', name: 'condutor' });
    this.cardTabs_Options.add({ id: CardTabID.Acesso, text: 'Acesso', name: 'acesso' });
    this.cardTabs_Options.add({ id: CardTabID.Abordagem, text: 'Abordagem', name: 'abordagem' });

    this.cardTabs_Options.selectButtonByID(CardTabID.Veiculo);

    this.boxButton.add("btOpen", "insert", false);
    this.boxButton.add("btClose", "delete", false);

    this.tabsConfiguracao_Options.add("tabIdentificacao", "Identificação", true);
    this.tabsConfiguracao_Options.add("tabReparticao", "Repartição");
    this.tabsConfiguracao_Options.add("tabComplemento", "Complemento");

    this.tabsValidade_Options.add("tabValidade", "Validade", true);
    this.tabsValidade_Options.add("tabEstacionamento", "Estacionamento");

    this.tabsAcesso_Veiculo_Options.add("tabNivelAcesso", "Nivel de Acesso Permanente", true);
    this.tabsAcesso_Veiculo_Options.add("tabControle", "Controle", false, "block", "#192038");

    this.pessoaModalService.name = "pessoaModal";
    this.pessoaModalService.pesquisaPessoa_Option.name = "cbPesquisaSupervisor";

    this.pessoaModalService.grid = [
      { "header": "Pessoa", "field": "nome", "width": 50, "align": "left" },
      { "header": "Área", "entity": "area", "field": "nome", "width": 25, "align": "left" },
      { "header": "Setor", "entity": ["area", "setor"], "field": "nome", "width": 25, "align": "left" }
    ];
  
    this.actionbuttomService.relationGrid = "lstVeiculoInterno";
    this.actionbuttomService.recurso = "2E";
    this.actionbuttomService.top_action_buttons = [
      { "id": 0, "text": "forms.buttons.create", "enabled": true, "condition": "always", "maximized": true, "visibled": false, "openForm": true, "editable": "new", },
      { "id": 1, "text": "forms.buttons.update", "enabled": false, "condition": "select", "maximized": true, "visibled": false, "openForm": true, "editable": "yes", },
      { "id": 2, "text": "forms.buttons.read", "enabled": false, "condition": "select", "maximized": true, "visibled": false, "openForm": true, "editable": "no", },
      { "id": 3, "text": "forms.buttons.delete", "enabled": false, "condition": "multi", "openForm": false, "visibled": false, "question": "forms.questions.delete" }]

    this.listView_VeiculoInterno.name = "lstVeiculoInterno";
    this.listView_VeiculoInterno.status = "status";
    this.listView_VeiculoInterno.title = "Lista de Veículos Internos";
    this.listView_VeiculoInterno.grid = [
      { "header": "", "entity": "imagem", "field": "imagem", "width": 3, "align": "center", "type": "image", "avatar": "veiculo" },
      { "header": "Veículo ID", "field": "placa", "width": 10, "align": "left" },
      { "header": "Tipo", "field": "tipo", "width": 10, "align": "left", "enum": VeiculoTipo },
      { "header": "Modelo", "entity": "modelo", "field": "veiculoModelo", "width": 25, "align": "left" },
      { "header": "Cor", "field": "cor", "width": 15, "align": "left" },
      { "header": "Grupo", "entity": "grupo", "field": "veiculoGrupo", "width": 30, "align": "left" },
      { "header": "Status", "field": "status", "width": 10, "align": "left", "enum": Status }
    ];

    this.listView_VeiculoCondutor.name = "lstVeiculoCondutor";
    this.listView_VeiculoCondutor.gridOnly = true;
    this.listView_VeiculoCondutor.noPaging = true;
    this.listView_VeiculoCondutor.noBorder = true;
    this.listView_VeiculoCondutor.grid = [
      { "header": "Nome", "field": "nome", "width": 65, "align": "left" },
      { "header": "Area", "field": "area", "width": 35, "align": "left" }];

    this.listView_VeiculoVagaVinculada.name = "lstVeiculoVagaVinculada";
    this.listView_VeiculoVagaVinculada.gridOnly = true;
    this.listView_VeiculoVagaVinculada.noPaging = true;
    this.listView_VeiculoVagaVinculada.noBorder = true;
    this.listView_VeiculoVagaVinculada.grid = [
      { "header": "Vaga", "field": "garagem", "width": 20, "align": "left" },
      { "header": "Estacionamento", "field": "estacionamento", "width": 40, "align": "left" },
      { "header": "Site", "field": "site", "width": 40, "align": "left" }];
  
    this.listView_VeiculoAcesso.name = "lstAcessoVeiculo";
    this.listView_VeiculoAcesso.gridOnly = true;
    this.listView_VeiculoAcesso.noPaging = true;
    this.listView_VeiculoAcesso.noBorder = true;
    this.listView_VeiculoAcesso.grid = [
      { "header": "", "field": "nivelAcessoId", "width": 0, "align": "left", "visible": false},
      { "header": "Nível de Acesso", "field": "nivelAcesso", "width": 50, "align": "left" },
      { "header": "Site", "field": "site", "width": 50, "align": "left" }];

    //  ------------ inicio primeiro grid --------                                                       
    this.tipoVeiculo_Options.name = "cbVeiculoTipos";
    this.tipoVeiculo_Options.addRange<Item>(this.veiculoGrupoService.veiculoTipo);
    this.tipoVeiculo_Options.select(VeiculoTipo.CARRO);

    this.idVeiculo_Text.name = "txtVeiculoIDs";
    this.idVeiculo_Text.rules = "lettersNumbers";
    this.idVeiculo_Text.maxLength = 7;
    this.idVeiculo_Text.minLength = 7;

    this.modeloVeiculo_Options.name = "cbVeiculoInternoModelo";
    this.modeloVeiculo_Options.maxLength = 30;

    this.corVeiculo_Options.name = "cbVeiculoCor";
    this.corVeiculo_Options.add("", "", 0);
    this.corVeiculo_Options.addRange<Item>(this.veiculoGrupoService.veiculoCor);

    this.grupoVeiculo_Options.name = "cbVeiculoGrupos";
    this.grupoVeiculo_Options.add("", "", 0);

    const sortVeiculoGrupo: VeiculoGrupoSort = { veiculoGrupo: SortOperationKind.ASC }
    const filterVeiculoGrupo: VeiculoGrupoFilter = { veiculoInterno: { eq: true } }
    this.veiculoGrupoService.readVeiculoGrupos(sortVeiculoGrupo, filterVeiculoGrupo)
      .subscribe(({ grupoVeiculo }: read_VeiculoGrupo) => {
        const nodes: VeiculoGrupo[] = grupoVeiculo.nodes;
        nodes.forEach((node: VeiculoGrupo) => {
          this.grupoVeiculo_Options.add(node.veiculoGrupo, node.veiculoGrupo, node.id)
        });
      });

    this.caracteristicaVeiculo_Text.name = "txtveiculoCaracteristica"
    this.caracteristicaVeiculo_Text.rules = "uppercase";
    this.caracteristicaVeiculo_Text.maxLength = 30;

    this.observacaoVeiculo_Text.name = "txtveiculoObservacao"
    this.observacaoVeiculo_Text.rules = "uppercase";
    this.observacaoVeiculo_Text.maxLength = 100;
    //  ------------ fim primeiro grid --------


    //  ------------ inicio identificacao --------
    this.pesoVeiculo_Text.name = "txtPesoVeiculo";
    this.pesoVeiculo_Text.rules = "onlynumbers";
    this.pesoVeiculo_Text.maxLength = 6;

    this.licenciamentoVeiculo_Text.name = "txtLicenciamentos";
    this.licenciamentoVeiculo_Text.rules = "date";
    this.licenciamentoVeiculo_Text.regex = "date";
    this.licenciamentoVeiculo_Text.maxLength = 10;

    this.combustivelVeiculo_Options.name = "cbCombustivelVeiculo";
    this.combustivelVeiculo_Options.add("", "", 0);
    this.combustivelVeiculo_Options.addRange<Item>(this.veiculoGrupoService.veiculoCombustivel);

    this.supervisor_Text.name = "txtSupervisor";
    this.supervisor_Text.rules = "uppercase";
    this.supervisor_Text.maxLength = 100;
    this.supervisor_Text.disable();
    //  ------------ fim identificacao --------

    // ----------- inicio validade -----------
    this.validadeEstado_Options.name = "cbValidades"
    this.validadeEstado_Options.add(Status[Status.LIVRE], "livre", Status.LIVRE);
    this.validadeEstado_Options.add(Status[Status.BLOQUEADO], "bloqueado", Status.BLOQUEADO);
    //  ------------ fim validade --------

    this.abordagemInformativa_Text.name = "txtAbordagemInformativa";
    this.abordagemInformativa_Text.maxLength = 1000;

    this.abordagemAdvertida_Text.name = "txtAbordagemAdvertida";
    this.abordagemAdvertida_Text.maxLength = 1000;

    this.abordagemRestritiva_Text.name = "txtAbordagemRestritiva";
    this.abordagemRestritiva_Text.maxLength = 1000;


    //  ------------ inicio reparticao --------
    this.reparticaoSite_Option.name = "cbSite";
    this.reparticaoSite_Option.disable();
    this.reparticaoSite_Option.maxLength = 20;

    this.reparticaoSetor_Option.name = "cbSetor";
    this.reparticaoSetor_Option.disable();
    this.reparticaoSetor_Option.maxLength = 30;

    this.reparticaoArea_Option.name = "cbArea";
    this.reparticaoArea_Option.disable();
    this.reparticaoArea_Option.maxLength = 30;

    this.veiculoInternoLocalizacao_Options.name = "cbLocalizacoe";
    this.veiculoInternoLocalizacao_Options.maxLength = 30;

    //  ------------ fim reparticao --------

    // ---------------- inicio complemento --------------
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

    this.veiculoInternoCentroCusto_Option.name = "cbCentroCustos";
    this.veiculoInternoCentroCusto_Option.maxLength = 30;

    // ---------------- fim complemento --------------

    // ----------- inicio validade -----------
    this.contratoInicio_Text.name = "txtContratacaosInicial";
    this.contratoInicio_Text.label = "Início";
    this.contratoInicio_Text.rules = "date";
    this.contratoInicio_Text.regex = "date";
    this.contratoInicio_Text.maxLength = 10;

    this.contratoFim_Text.name = "txtContratacaosFinal";
    this.contratoFim_Text.label = "Fim";
    this.contratoFim_Text.rules = "date";
    this.contratoFim_Text.regex = "date";
    this.contratoFim_Text.maxLength = 10;
    //  ------------ fim validade --------

    this.vaga_Text.name = "txtVaga";
    this.vaga_Text.disabled = true;

    this.estacionamento_Text.name = "txtEstacionamento";
    this.estacionamento_Text.disabled = true;

    this.site_Text.name = "txtSite";
    this.site_Text.disabled = true;

    this.tagOficial_Text.name = "txtCartaoOficial";
    this.tagOficial_Text.rules = "onlynumbers";
    this.tagOficial_Text.maxLength = 15;
    this.tagOficial_Text.minLength = 0;

    this.creditoAcesso_Text.name = "txtCartaoAcesso"
    this.creditoAcesso_Text.rules = "onlynumbers";
    this.creditoAcesso_Text.maxLength = 4;
    this.creditoAcesso_Text.minLength = 1;

    this.tagProvisoria_Text.name = "txtTagProvisorio";
    this.tagProvisoria_Text.rules = "onlynumbers";
    this.tagProvisoria_Text.maxLength = 15;
    this.tagProvisoria_Text.minLength = 0;

    this.tagProvisoria_Text.disable();

    this.senha_Text.name = "txtSenha";
    this.senha_Text.type = "password";
    this.senha_Text.maxLength = 6;
    this.senha_Text.disable();

    this.controle_Options.name = "cbControle";
    this.controle_Options.add(0, "Ignorar controle de direção", "ignorarDirecao");
    this.controle_Options.add(1, "Ignorar controle de rota", "ignorarRota");
    this.controle_Options.add(2, "Ignorar temporização de passagem", "ignorarTemporizacao");
    this.controle_Options.add(3, "Ignorar validação e computação de crédito", "ignorarCredito");
    this.controle_Options.add(4, "Ignorar validação externa", "ignorarValidacaoExterna");
    this.controle_Options.add(5, "Liberar saída se validade expirada", "liberarSaidaExpirada");

    this.tabsConfiguracao_Options.select("tabIdentificacao");
    this.tabsValidade_Options.select("tabValidade");

    this.supervisorId = 0;

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

  ngAfterViewInit(): void {
    this.veiculoModeloPopulate();
    this.onCentroCustoPopulate();
    this.onResize();
  }

  onActionButtom_Click(actionButtomSelect: any) {
    this.savedCondition = false;
    switch (actionButtomSelect.text) {
      case "forms.buttons.create": 
        this.id = undefined;
        this.idVeiculo_Text.focus();
        this.editable = true;        
        break;

      case "forms.buttons.update":
        this.updateDataLoad();
        this.tabsValidade_Options.select("tabValidade");
        this.tabsConfiguracao_Options.select("tabIdentificacao");
        this.editable = true;
        break;

      case "forms.buttons.read": {
        this.updateDataLoad();
        this.editable = false;
        break;
        
      }
    }
  }

  updateDataLoad() {
    this.showSpinner = true;

    const filter: VeiculoInternoUsuarioFilter = { id: { eq: this.id } };
    const sort: VeiculoInternoUsuarioSort = { placa: SortOperationKind.ASC };
    this.veiculoInternoService.readVeiculoInternoUsuario(sort, filter)
      .subscribe(({ usuarioVeiculoInterno }: read_VeiculoInternoUsuario) => {
        this.veiculoInterno = usuarioVeiculoInterno.nodes[0];

        this.id = this.veiculoInterno.id;
        this.tipoVeiculo_Options.select(this.veiculoInterno.tipo as number);
        this.idVeiculo_Text.text = this.veiculoInterno.placa;
        this.modeloVeiculo_Options.select(this.veiculoInterno.modeloId);
        this.corVeiculo_Options.selectbyValue(this.veiculoInterno.cor.toLocaleLowerCase());
        this.grupoVeiculo_Options.select(this.veiculoInterno.grupoId);
        this.caracteristicaVeiculo_Text.text = this.veiculoInterno.caracteristica;
        this.observacaoVeiculo_Text.text = this.veiculoInterno.observacao;

        this.pesoVeiculo_Text.text = this.veiculoInterno.peso.toString();        
        this.licenciamentoVeiculo_Text.setTextWithMask(this.veiculoInterno.licenciamento);
        this.combustivelVeiculo_Options.selectbyText(this.veiculoInterno.combustivel);
        if (this.veiculoInterno.supervisorId == 0) {
          this.supervisorId = 0;
          this.supervisor_Text.clear();
        } else {
          this.supervisorId = this.veiculoInterno.supervisorId;
          this.supervisor_Text.text = this.veiculoInterno.supervisor.nome;
        }

        this.onSitePopulate({id: this.siteId});

        this.reparticaoSite_Option.enable();
        this.reparticaoSetor_Option.enable();
        this.reparticaoArea_Option.enable();

        this.onLocalizacaoPopulate(this.veiculoInterno.localizacao);

        this.complemento1_Text.text = this.veiculoInterno.complemento1;
        this.complemento2_Text.text = this.veiculoInterno.complemento2;
        this.complemento3_Text.text = this.veiculoInterno.complemento3;
        this.complemento4_Text.text = this.veiculoInterno.complemento4;
        this.onCentroCustoPopulate(this.veiculoInterno.centroCusto?.id);

        this.validadeEstado_Options.select(this.veiculoInterno.status ? 1 : 0);
        this.contratoInicio_Text.setTextWithMask(this.veiculoInterno.validadeCadastroInicio);
        this.contratoFim_Text.setTextWithMask(this.veiculoInterno.validadeCadastroFim);

        this.tagOficial_Text.text = this.veiculoInterno.acessoCartao.toString();
        this.creditoAcesso_Text.text = this.veiculoInterno.acessoCredito.toString();
        const condutores = this.veiculoInterno.condutores.map(veiculoCondutor => {
          return {
            id: veiculoCondutor.pessoaId,
            nome: veiculoCondutor.pessoaInterna?.nome,
            area: veiculoCondutor.pessoaInterna?.area?.nome
          }
        });
        this.listView_VeiculoCondutor.gridUpdate(condutores);      

        const vagasVinculadas = this.veiculoInterno.garagens.map(vaga => {
          return {
            id: vaga.id,
            garagem: vaga.garagem,
            estacionamento: vaga.estacionamento?.nome,
            site: vaga.estacionamento?.setor?.site?.nome
          }
        });
        this.listView_VeiculoVagaVinculada.gridUpdate(vagasVinculadas);

        const nivelAcessoPermanente = this.veiculoInterno?.niveisAcessoPermanente?.map(nivel => {
          return {
            id: nivel.id,
            nivelAcessoId: nivel.nivelAcesso?.id,
            nivelAcesso: nivel.nivelAcesso?.nome,
            siteId: (nivel.nivelAcesso?.areas)? nivel.nivelAcesso?.areas[0]?.area?.setor?.siteId: 0,
            site: (nivel.nivelAcesso?.areas)? nivel.nivelAcesso?.areas[0]?.area?.setor?.site?.nome: ''
          }
        });
        this.listView_VeiculoAcesso.gridUpdate(nivelAcessoPermanente);

        this.controle_Options.populate(this.veiculoInterno);

        this.abordagemInformativa_Text.text = this.veiculoInterno.abordagem?.mensagemInformativa;
        this.abordagemAdvertida_Text.text = this.veiculoInterno.abordagem?.mensagemAdvertida;
        this.abordagemRestritiva_Text.text = this.veiculoInterno.abordagem?.mensagemRestritiva;

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
      })
  }

  onlistView_Change(rowSelect?: rowSelect) {
    if (rowSelect.registro) {
      this.id = rowSelect.id;
    } else {
      if (rowSelect.exclude == "yes") {
        this.veiculoInternoService.deleteVeiculoInternoUsuario(rowSelect.id)
          .subscribe(({ data }: delete_VeiculoInternoUsuario) => {
            if (data.usuarioVeiculoInterno_Excluir.sucesso == true) {
              const find = { field: "id", value: rowSelect.id, type: "DEL" };
              this.update_Grid(find);
            } else {
              const objeto = JSON.parse(data.usuarioVeiculoInterno_Excluir.objeto);
              this.alertService.show(data.usuarioVeiculoInterno_Excluir.mensagemTipo,
                data.usuarioVeiculoInterno_Excluir.mensagem,
                objeto);
            }
          });
      }
    }
  }

  onButton_Click(type: any) {
    const cardIndex = this.cardTabs_Options.selectCard.id;
    switch (cardIndex) {
      case CardTabID.Condutor:
        switch (type) {
          case "insert":
            const condutorLista: Array<number> = this.listView_VeiculoCondutor.dataGridBehavior
              .value?.map(veiculo => {return veiculo.id});
            this.pessoaModalService.show('Condutores', condutorLista, this.areaId);
            break;
    
          case "delete":
            const indexId = this.listView_VeiculoCondutor.dataGridBehavior
              .value?.findIndex(condutor => condutor.id == this.idCondutor);
            if (indexId >= 0) {
              this.listView_VeiculoCondutor.dataGridBehavior.value?.splice(indexId, 1);
            }
            break;
        }            
        break;

      case CardTabID.Acesso:
        switch (type) {
          case "insert":
            const nivelAcessoPermanente: Array<number> = this.listView_VeiculoAcesso.dataGridBehavior
              .value?.map(nivel => {return nivel.nivelAcessoId});
            this.usuarioNivelAcessoModalService.show(nivelAcessoPermanente, 2);
            break;
    
          case "delete":
            const indexId = this.listView_VeiculoAcesso.dataGridBehavior
              .value?.findIndex(nivel => nivel.id == this.idAcesso);
            if (indexId >= 0) {
              this.listView_VeiculoAcesso.dataGridBehavior.value?.splice(indexId, 1);
            }
            break;
        }
        break;          
    }
  }

  dataForm_Clean() {

    this.tipoVeiculo_Options.select(VeiculoTipo.CARRO);
    this.idVeiculo_Text.clear();
    this.modeloVeiculo_Options.clearSelect();
    this.corVeiculo_Options.clearSelect();
    this.grupoVeiculo_Options.clearSelect();
    this.caracteristicaVeiculo_Text.clear();
    this.observacaoVeiculo_Text.clear();

    this.pesoVeiculo_Text.clear();
    this.licenciamentoVeiculo_Text.clear();
    this.combustivelVeiculo_Options.clearSelect();
    this.supervisor_Text.clear();
    this.supervisorId = 0;

    this.reparticaoSite_Option.disable();
    this.reparticaoSetor_Option.disable();
    this.reparticaoArea_Option.disable();

    this.veiculoInternoLocalizacao_Options.clearSelect();

    this.complemento1_Text.clear();
    this.complemento2_Text.clear();
    this.complemento3_Text.clear();
    this.complemento4_Text.clear();    
    this.veiculoInternoCentroCusto_Option.clearSelect();

    this.validadeEstado_Options.select(Status.LIVRE);
    this.contratoInicio_Text.clear();
    this.contratoFim_Text.clear();

    this.vaga_Text.clear();
    this.estacionamento_Text.clear();
    this.site_Text.clear();

    this.listView_VeiculoCondutor.clear();
    this.listView_VeiculoVagaVinculada.clear();

    this.tagOficial_Text.clear();
    this.tagProvisoria_Text.clear();
    this.senha_Text.clear();
    this.creditoAcesso_Text.clear();

    this.listView_VeiculoAcesso.clear();
    this.controle_Options.reset();

    this.abordagemInformativa_Text.clear();
    this.abordagemAdvertida_Text.clear();
    this.abordagemRestritiva_Text.clear();   
    
    this.cardTabs_Options.setCondition('abordagem', AbordagemTipo.nenhum);

    this.cardTabs_Options.selectButtonByID(CardTabID.Veiculo);    
    this.tabsConfiguracao_Options.select("tabIdentificacao");
    this.tabsValidade_Options.select("tabValidade");
    this.tabsAcesso_Veiculo_Options.select("tabNivelAcesso");
    
  }

  treeviewPopulate(filter: AreaReparticaoFilter) {
    this.treeviewService.getTreeview()
      .subscribe((treeview: TreeView[]) => {
        treeview[0].item = this.setorReparticaoService.getSetorReparticaoTreeView(filter, true);
        this.treeviewService.setTreeview(treeview);
      });
  }

  onlistViewVeiculoCondutor_Change(rowSelect?: rowSelect) {
    if (rowSelect.registro) {
      this.idCondutor = rowSelect.registro.id;
    }
  }

  onlistViewVeiculoAcesso_Change(rowSelect?: rowSelect) {
    if (rowSelect.registro) {
      this.idAcesso = rowSelect.registro.id;
    }
  }

  pessoaModalSelect(pessoaSelect: PessoaInternaUsuario) {
    if (pessoaSelect != null) {
      const cardIndex: number = this.cardTabs_Options.buttons.findIndex(card => card.id == this.cardTabs_Options.cardIndex)
      const pessoa: any = {
        id: pessoaSelect.id,
        nome: pessoaSelect.nome,
        area: pessoaSelect.area?.nome,
      };
  
      switch (this.cardTabs_Options.buttons[cardIndex].name) {
        case "veiculo":
          this.supervisorId = pessoa.id
          this.supervisor_Text.text = pessoa.nome;
          break;

        case "condutor":
          const condutores = this.listView_VeiculoCondutor.dataGridBehavior?.value || [];
          condutores.push(pessoa)
          this.listView_VeiculoCondutor.gridUpdate(condutores);
          break;
      }
    }
  }

  onCardTabs_Click(cardSelected: Buttons) {
    this.cardTabs_Options.selectButtonByID(cardSelected.id);
    if (cardSelected.id == CardTabID.Veiculo) {
      this.tabsConfiguracao_Options.select("tabIdentificacao");
      this.tabsValidade_Options.select("tabValidade");
    }
    if (cardSelected.id == CardTabID.Acesso) this.tabsAcesso_Veiculo_Options.select("tabNivelAcesso");
  }

  onSupervisorFind_Click() {
    this.pessoaModalService.setFilter(this.supervisor_Text.text);
    this.pessoaModalService.show('Supervisores');
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

  onLocalizacaoPopulate(localizacao?: string, clean: boolean = true) {
    if (clean) this.veiculoInternoLocalizacao_Options.clear();
    this.veiculoInternoService.readVeiculoInternoLocalizacoes()
      .subscribe((localizacoes: any) => {
        this.veiculoInternoLocalizacao_Options.itemSelected.text = "";
        localizacoes.usuarioVeiculoInternoLocalizacao.forEach((localizacao: string, index: number = 0) => {
          this.veiculoInternoLocalizacao_Options.add(localizacao, localizacao, index);
          index++
        });
        if (localizacao) this.veiculoInternoLocalizacao_Options.selectbyValue(localizacao);
      });
  }

  onCentroCustoPopulate(id?: number, clean: boolean = true) {
    if (clean) this.veiculoInternoCentroCusto_Option.clear();

    this.veiculoInternoCentroCusto_Option.add("", null, 0);
    const sortCentroCusto: CentroCustoGrupoSort = { centroCusto: SortOperationKind.ASC };
    const filterCentroCusto: CentroCustoGrupoFilter = null;
    this.centroCustoService.readCentroCustoGrupos(sortCentroCusto, filterCentroCusto)
      .subscribe(({ grupoCentroCusto }: read_CentroCustoGrupo) => {
        this.veiculoInternoCentroCusto_Option.itemSelected.text = "";
        const nodes: CentroCustoGrupo[] = grupoCentroCusto.nodes;
        nodes.forEach((node: CentroCustoGrupo) => {
          this.veiculoInternoCentroCusto_Option.add(node.centroCusto, null, node.id);
        });
        if (id) this.veiculoInternoCentroCusto_Option.select(id);
      }, (error => {
        // Tratar erro subscribe...
      }))
  }

  veiculoModeloPopulate() {
    this.modeloVeiculo_Options.clear();
    this.modeloVeiculo_Options.add("", "", 0);

    const sortVeiculoModelo: VeiculoModeloGrupoSort = { veiculoModelo: SortOperationKind.ASC };

    this.veiculoModeloGrupoService.readVeiculoModeloGrupos(sortVeiculoModelo, null)
    .subscribe(({ grupoVeiculoModelo }: read_VeiculoModeloGrupo) => {
      const nodes: VeiculoModeloGrupo[] = grupoVeiculoModelo.nodes;
      nodes.forEach((node: VeiculoModeloGrupo) => {
        this.modeloVeiculo_Options.add(node.veiculoModelo, node.veiculoModelo, node.id);
      })
    });
  }

  usuarioNivelAcessoModalSelect(nivelSelect: any) {
    const idNivelPermanente: number =  this.listView_VeiculoAcesso.dataGridBehavior?.value?.length + 1 || 1;
    const nivel: any = {
      id: idNivelPermanente,
      nivelAcessoId: nivelSelect?.nivelAcesso.id,
      nivelAcesso: nivelSelect.nivelAcesso?.nome,
      site: nivelSelect.site?.nome
    }

    const nivelAcessoPermanentes: any[] = this.listView_VeiculoAcesso.dataGridBehavior?.value || [];
    nivelAcessoPermanentes.push(nivel);
    this.listView_VeiculoAcesso.gridUpdate(nivelAcessoPermanentes);
  }

  onSave_Click() {

    this.idVeiculo_Text.validated = this.idVeiculo_Text.text.length >= this.idVeiculo_Text.minLength;
    const dataHoraAtual = new Date().toLocaleDateString("pt-br") + " 23:59";

    if (!this.idVeiculo_Text.validated || this.tipoVeiculo_Options.itemSelected.id == 0) {
      this.alertService
        .show("ERRO", "Existem campos obrigatórios não preenchidos ou preenchidos de forma incorreta. Verifique!", null);

    } else if (this.reparticaoSite_Option.itemSelected.id == 0) {
      this.alertService
        .show("ERRO", "Selecione ao menos uma classificação para Site de Veiculo Interno", null);

    } else if (this.reparticaoSetor_Option.itemSelected.id == 0) {
      this.alertService
        .show("ERRO", "Selecione ao menos uma classificação para este Setor de Veiculo Interno", null);

    } else if (this.reparticaoArea_Option.itemSelected.id == 0) {
      this.alertService
        .show("ERRO", "Selecione ao menos uma classificação para esta Área de Veiculo Interno", null);

    } else if (!this.licenciamentoVeiculo_Text.validated) {
      this.alertService
        .show("ERRO", "Atenção! A data de Licenciamento não é válida. Verifique!", null);
  
    } else if (!this.dateOperator.compareDateGT(this.licenciamentoVeiculo_Text.textMasked, dataHoraAtual)) {
      this.alertService
        .show("ERRO", "Atenção! A data de Licenciamento não pode ser maior que a data atual. Verifique!", null);

    } else if (!this.dateOperator.compareDateGT(this.contratoInicio_Text.textMasked, this.contratoFim_Text.textMasked)) {
      this.alertService
        .show("ERRO", "Atenção! A data de validade final não pode ser inferior a data de validade inicial. Verifique!", null);

    }
    else {

      this.showSpinner = true;

      const veiculoInterno: VeiculoInternoUsuario = {
        id: this.id,
        tipo: this.tipoVeiculo_Options.itemSelected.id,
        placa: this.idVeiculo_Text.text,
        modeloId: this.modeloVeiculo_Options.itemSelected.id,
        modelo: (this.modeloVeiculo_Options.itemSelected.id == 0)? this.modeloVeiculo_Options.itemSelected.text: undefined,
        cor: this.corVeiculo_Options.itemSelected.text,
        grupoId: this.grupoVeiculo_Options.itemSelected.id,
        caracteristica: this.caracteristicaVeiculo_Text.text,
        observacao: this.observacaoVeiculo_Text.text,
        peso: parseInt(this.pesoVeiculo_Text.text),
        licenciamento: this.licenciamentoVeiculo_Text.formated,
        combustivel: this.combustivelVeiculo_Options.itemSelected.text,
        supervisorId: this.supervisorId,
        areaId: this.reparticaoArea_Option.itemSelected.id,
        localizacao: this.veiculoInternoLocalizacao_Options?.itemSelected?.text,
        complemento1: this.complemento1_Text.text,
        complemento2: this.complemento2_Text.text,
        complemento3: this.complemento3_Text.text,
        complemento4: this.complemento4_Text.text,
        centroCustoId: this.veiculoInternoCentroCusto_Option.itemSelected?.id,
        status: (this.validadeEstado_Options.itemSelected.id == 1 ? true : false),
        validadeCadastroInicio: this.contratoInicio_Text.formated,
        validadeCadastroFim: this.contratoFim_Text.formated,
        condutores: this.listView_VeiculoCondutor.dataGridBehavior?.value?.map(condutor => {
          return { pessoaId: condutor.id }
        }),
        acessoCartao: parseInt(this.tagOficial_Text.text),
        acessoCredito: parseInt(this.creditoAcesso_Text.text),
        niveisAcessoPermanente: this.listView_VeiculoAcesso.dataGridBehavior?.value?.map(nivelAcesso => {
          return { id: nivelAcesso.id, nivelAcessoId: nivelAcesso.nivelAcessoId}
        }),
        ignorarDirecao: this.controle_Options.valueOf("ignorarDirecao"),
        ignorarRota: this.controle_Options.valueOf("ignorarRota"),
        ignorarTemporizacao: this.controle_Options.valueOf("ignorarTemporizacao"),
        ignorarCredito: this.controle_Options.valueOf("ignorarCredito"),
        ignorarValidacaoExterna: this.controle_Options.valueOf("ignorarValidacaoExterna"),
        liberarSaidaExpirada: this.controle_Options.valueOf("liberarSaidaExpirada"),
        abordagem: {
          mensagemInformativa: this.abordagemInformativa_Text.text || "", 
          mensagemAdvertida: this.abordagemAdvertida_Text.text || "",
          mensagemRestritiva: this.abordagemRestritiva_Text.text || ""
        },
      };

      if (veiculoInterno.id) {
        this.veiculoInternoService.updateVeiculoInternoUsuario(veiculoInterno)
          .subscribe(({ data }: update_VeiculoInternoUsuario) => {
            const objeto: any = JSON.parse(data.usuarioVeiculoInterno_Alterar.objeto);
            if (data.usuarioVeiculoInterno_Alterar.sucesso == true) {
              const find = { field: "id", value: objeto.Id }
              this.onClose_Click();
              this.update_Grid(find);
            } else {
              this.alertService.show(data.usuarioVeiculoInterno_Alterar.mensagemTipo,
                data.usuarioVeiculoInterno_Alterar.mensagem, objeto)
            }
            this.showSpinner = false;
          });
      } else {
        this.veiculoInternoService.createVeiculoInternoUsuario(veiculoInterno)
          .subscribe(({ data }: create_VeiculoInternoUsuario) => {
            const objeto: any = JSON.parse(data.usuarioVeiculoInterno_Inserir.objeto);
            if (data.usuarioVeiculoInterno_Inserir.sucesso == true) {
              const find = { field: "id", value: objeto.Id };
              this.dataForm_Clean();
              this.update_Grid(find);
            } else {
              this.alertService.show(data.usuarioVeiculoInterno_Inserir.mensagemTipo,
                data.usuarioVeiculoInterno_Inserir.mensagem, objeto);
            }
            this.showSpinner = false;
          })
      }
    }
  }

  onListView_Filter(filterSelect: Item) {

    switch (filterSelect.text) {
      case "Veículo ID":
        this.filterGrid = { placa: { startsWith: filterSelect.value } };
        break;

      case "Modelo":
        this.filterGrid = { modelo: { veiculoModelo: { contains: filterSelect.value } } }
        break;

      case "Tipo":
        if (VeiculoTipo[filterSelect.value] != null) {
          this.filterGrid = { tipo: { eq: VeiculoTipo[filterSelect.value] } };
        } else {
          this.filterGrid = undefined;
        }
        break;

      case "Cor":
        this.filterGrid = { cor: { contains: filterSelect.value } };
        break;

      case "Grupo":
        const grupoVeiculoIndex: number = this.grupoVeiculo_Options.getId(filterSelect.value);
        if (grupoVeiculoIndex) {
          const grupoId: number = this.grupoVeiculo_Options.itens[grupoVeiculoIndex].id;
          this.filterGrid = { grupoId: { eq: grupoId } };
        } else {
          this.filterGrid = undefined;
        }
        break;

      case "Estado":
        if (Status[filterSelect.value] != null) {
          this.filterGrid = { status: { eq: (Status[filterSelect.value] == 1) } };
        } else {
          this.filterGrid = undefined;
        }
        break;
    }

    if (filterSelect.value != "placa" && filterSelect.value != "tipo" &&
        filterSelect.value != "modelo" && filterSelect.value != "grupo" &&
        filterSelect.value != "cor" && filterSelect.value != "status") {
      this.update_Grid();
    }

  }

  update_Grid(find?: Find, filter?: Filter) {
    this.listView_VeiculoInterno.processingShow();
    const filterGrid: VeiculoInternoUsuarioFilter = { ...this.filter, ...this.filterGrid };
    this.veiculoInternoService.readVeiculoInternoUsuario(this.order_by, filterGrid)
      .subscribe(({ usuarioVeiculoInterno }: read_VeiculoInternoUsuario) => {
        this.actionbuttomService.enableButtons(0);
        this.listView_VeiculoInterno.gridUpdate(usuarioVeiculoInterno.nodes, find, filter);
      });
  }

  onResize() {
    const maxHeightPanel = document.getElementById('veiculoInternoComponent_Panel')?.clientHeight || 0;

    this.listView_VeiculoCondutor.maxHeight = maxHeightPanel - 122;
    this.listView_VeiculoVagaVinculada.maxHeight = maxHeightPanel - 122;
    this.listView_VeiculoAcesso.maxHeight = maxHeightPanel - 184;

  }

  onClose_Click(hideForm: boolean = true) {
    this.dataForm_Clean();
    this.actionbuttomService.hideForm(true);
  }

  ngOnDestroy(): void {
    this.settings?.unsubscribe();
    this.treeviewItem?.unsubscribe();
  }

}