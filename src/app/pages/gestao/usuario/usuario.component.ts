import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import { ListViewGrid, rowSelect } from 'src/app/@theme/components/grid/list-view/service/list-view.service';
import { AlertServiceComponent } from 'src/app/@theme/components/form/alert-card/service/alert-card.service';
import { ActionButtomService } from 'src/app/@theme/components/grid/action-buttom/service/action-button.service';
import { InputLabel } from 'src/app/@theme/components/form/input-label/service/input-label.service';
import { ComboOptions, Item } from 'src/app/@theme/components/form/combobox/service/combobox.service';
import { TabsService } from 'src/app/@theme/layouts/tabs/service/tabs.service';
import { Stimulsoft } from 'stimulsoft-reports-js/Scripts/stimulsoft.viewer';
import {
         GestaoUsuario,
         GestaoUsuarioData,
         Report
} from 'src/app/@core/data/gestao-usuario';
import { FiltroUsuario, 
         Periodo, 
         TipoAreaSigla, 
         TipoVagaEstacionamento, 
         TipoVeiculo, 
         VeiculoTipo } from 'src/app/@core/enum';

import { BehaviorSubject } from 'rxjs';
import { TreeviewService } from 'src/app/@theme/layouts/treeview/service/treeview.service';
import { SortOperationKind } from 'src/app/@core/api/generic-graphql';
import { DateOperator } from 'src/app/@theme/components/miscellaneous/date-operator/date-operator';

import {
         PessoaExternaUsuario,
         PessoaExternaUsuarioData,
         PessoaExternaUsuarioFilter,
         PessoaExternaUsuarioSort,
         read_PessoaExternaUsuario
} from 'src/app/@core/data/usuario-pessoa-externa';

import {
         PessoaInternaUsuarioFilter,
         PessoaInternaUsuarioSort
} from 'src/app/@core/data/usuario-pessoa-interna';

import {
         PessoaGrupo,
         PessoaGrupoData,
         PessoaGrupoFilter,
         PessoaGrupoSort,
         read_PessoaGrupo
} from 'src/app/@core/data/grupo-pessoa';

import { PessoaTipo } from 'src/app/@core/enum';

import {
         ConfigStorage,
         OrganizacaoConfig,
         PlataformaConfig,
         SiteConfig
} from 'src/app/@core/storage/config/config';

import { PessoaInternaUsuario, 
         PessoaInternaUsuarioData, 
         read_PessoaInternaUsuario } from 'src/app/@core/data/usuario-pessoa-interna';

import { SiteData } from 'src/app/@core/data/reparticao-site';
import { OptionsGroup } from 'src/app/@theme/components/form/select-group/service/select-group.service';
 
import { SetorReparticao, 
         SetorReparticaoData, 
         SetorReparticaoFilter, 
         SetorReparticaoSort,
         read_SetorReparticao } from 'src/app/@core/data/reparticao-setor';

import { AreaReparticao, 
         AreaReparticaoData, 
         AreaReparticaoFilter, 
         AreaReparticaoSort, 
         read_AreaReparticao } from 'src/app/@core/data/reparticao-area';

import { CentroCustoGrupo,
         CentroCustoGrupoData,
         CentroCustoGrupoSort, 
         read_CentroCustoGrupo } from 'src/app/@core/data/grupo-centro-custo';

import { VeiculoGrupo, 
         VeiculoGrupoData, 
         VeiculoGrupoFilter, 
         VeiculoGrupoSort,
         read_VeiculoGrupo } from 'src/app/@core/data/grupo-veiculo';
  
import { VeiculoModeloGrupo, 
         VeiculoModeloGrupoData, 
         VeiculoModeloGrupoSort,
         read_VeiculoModeloGrupo, } from 'src/app/@core/data/grupo-veiculo-modelo';
  
import { VeiculoExternoUsuario, 
         VeiculoExternoUsuarioData, 
         VeiculoExternoUsuarioFilter, 
         VeiculoExternoUsuarioSort,
         read_VeiculoExternoUsuario } from 'src/app/@core/data/usuario-veiculo-externo';
  
import { VeiculoInternoUsuario, 
         VeiculoInternoUsuarioData, 
         VeiculoInternoUsuarioFilter, 
         VeiculoInternoUsuarioSort,
         read_VeiculoInternoUsuario } from 'src/app/@core/data/usuario-veiculo-interno';

import { EmpresaReparticao, 
         EmpresaReparticaoData, 
         EmpresaReparticaoFilter, 
         EmpresaReparticaoSort, 
         read_EmpresaReparticao } from 'src/app/@core/data/reparticao-empresa';

import { EmpresaGrupo, 
         EmpresaGrupoData,
         EmpresaGrupoSort, 
         read_EmpresaGrupo } from 'src/app/@core/data/grupo-empresa';

import { EstacionamentoVaga, 
         EstacionamentoVagaData, 
         EstacionamentoVagaFilter, 
         EstacionamentoVagaSort, 
         read_EstacionamentoVaga } from 'src/app/@core/data/reparticao-vaga-estacionamento';
import { NivelAcessoConcessao, NivelAcessoConcessaoData, NivelAcessoFilter, NivelAcessoSort, read_NivelAcessoConcessao } from 'src/app/@core/data/concessao-nivel-acesso';


@Component({
  selector: 'nex-gestao-usuario',
  templateUrl: 'usuario.component.html',
  styleUrls: ['usuario.component.scss'],
  host: { '(window:resize)': 'onResize()' }
})
export class GestaoUsuarioComponent implements AfterViewInit, OnDestroy {

  dateOperator: DateOperator = new DateOperator();

  id: number = 0;
  siteId: number;
  siteNome: string;

  // filtro Pessoa

  site_Options: ComboOptions = new ComboOptions;
  setor_Options: ComboOptions = new ComboOptions;
  area_Options: ComboOptions = new ComboOptions;
  nome_Text: InputLabel = new InputLabel();
  complemento1_Text: InputLabel = new InputLabel();
  complemento2_Text: InputLabel = new InputLabel();
  complemento3_Text: InputLabel = new InputLabel();
  complemento4_Text: InputLabel = new InputLabel();
  grupo_Option: ComboOptions = new ComboOptions();
  documento_Text: InputLabel = new InputLabel();
  contrato_Text: InputLabel = new InputLabel();
  centroCusto_Option: ComboOptions = new ComboOptions();
  id_Text: InputLabel = new InputLabel();
  observacao_Text: InputLabel = new InputLabel();
  localizacao_Text: InputLabel = new InputLabel();
  empresa_Option: ComboOptions = new ComboOptions();
  empresa_Text: InputLabel = new InputLabel();
  cartao_Text: InputLabel = new InputLabel();
  supervisor_Text: InputLabel = new InputLabel();
  siteCode_Text: InputLabel = new InputLabel();
  status_Option: ComboOptions = new ComboOptions();
  valorIdentico_Options: OptionsGroup = new OptionsGroup();
  filterPessoaInternaCargo: string;

  // final filtro Pessoa


  // Inicio filtro Veículo

  veiculoID_Text: InputLabel = new InputLabel();
  tipoVeiculo_Option: ComboOptions = new ComboOptions;
  modeloVeiculo_Option: ComboOptions = new ComboOptions;
  corVeiculo_Option: ComboOptions = new ComboOptions;
  grupoVeiculo_Option: ComboOptions = new ComboOptions();
  caracteristicaVeiculo_Text: InputLabel = new InputLabel();
  tagVeiculo_Text: InputLabel = new InputLabel();
  abordagem_Option: ComboOptions = new ComboOptions();

  // Inicio filtro 

  grupoEmpresa_Option: ComboOptions = new ComboOptions();
  tipoArea_Option: ComboOptions = new ComboOptions();
  estacionamento_Option: ComboOptions = new ComboOptions();
  garagem_Option: ComboOptions = new ComboOptions();
  tipoGaragem_Option: ComboOptions = new ComboOptions();
  nivel_Text: InputLabel = new InputLabel();
  restrito_Option: ComboOptions = new ComboOptions();



  // periodo
  periodo_Options: ComboOptions = new ComboOptions();
  dia_Option: ComboOptions = new ComboOptions();
  mes_Option: ComboOptions = new ComboOptions();
  ano_Option: ComboOptions = new ComboOptions();
  dataInicial_Text: InputLabel = new InputLabel();
  dataFinal_Text: InputLabel = new InputLabel();
  horaInicial_Text: InputLabel = new InputLabel();
  horaFinal_Text: InputLabel = new InputLabel();
  // final periodo

  ordenacao_Option: ComboOptions = new ComboOptions();

  treeviewItem: BehaviorSubject<any>;
  showSpinner: boolean = false;
  listView_Usuario: ListViewGrid = new ListViewGrid();
  gestaoIdentificacao: GestaoUsuario;
  tabsGestaoUsuario_Option: TabsService = new TabsService();

  reportSelect: string;

  relatorioTipo: number = 1;
  dataAtual: Date = new Date();

  showReport: boolean = false;
  gridElement: HTMLElement;
  formElement: HTMLElement;

  plataforma: PlataformaConfig;
  organizacao: OrganizacaoConfig;

  setorFilter: SetorReparticaoFilter;
  setorSort: SetorReparticaoSort

  settings: BehaviorSubject<any>;

  alertService: AlertServiceComponent = new AlertServiceComponent();

  constructor(
    public actionbuttomService: ActionButtomService,
    private pessoaExternaService: PessoaExternaUsuarioData,
    private pessoaInternaService: PessoaInternaUsuarioData,
    private config: ConfigStorage,
    private setorService: SetorReparticaoData,
    private areaService: AreaReparticaoData,
    private pessoaGrupoService: PessoaGrupoData,
    private veiculoGrupoService: VeiculoGrupoData,
    private nivelAcessoService: NivelAcessoConcessaoData,
    private empresaGrupoService: EmpresaGrupoData,
    private empresaReparticaoService: EmpresaReparticaoData,
    private areaReparticaoService: AreaReparticaoData,
    private estacionamentoService: EstacionamentoVagaData,
    private veiculoModeloGrupoService: VeiculoModeloGrupoData,
    private centroCustoService: CentroCustoGrupoData,
    private gestaoUsuarioService: GestaoUsuarioData,
    private treeviewService: TreeviewService,
    private configStorage: ConfigStorage,
    private veiculoExternoService: VeiculoExternoUsuarioData,
    private veiculoInternoService: VeiculoInternoUsuarioData) {

    this.settings = this.config.siteSubject();
    this.treeviewItem = this.treeviewService.itemSubject();

    this.tabsGestaoUsuario_Option.add("tabFiltro", "Filtro", true);
    this.tabsGestaoUsuario_Option.add("tabTempo", "Tempo", false, "block");

    this.actionbuttomService.recurso = "45";
    this.actionbuttomService.relationGrid = "lstGestaoIdentificacao";
    this.actionbuttomService.top_action_buttons = [{ "id": 0, "text": "forms.buttons.issue", "enabled": false, "visibled": false, "condition": "select", "openForm": true, "editable": "yes" }]

    this.listView_Usuario.name = "lstGestaoIdentificacao";
    this.listView_Usuario.title = "Lista de Relatórios de Identificação";
    this.listView_Usuario.grid = [{ "header": "Código", "field": "codigo", "width": 10, "align": "left" },
                                  { "header": "Estilo", "field": "estilo", "width": 10, "align": "left" },
                                  { "header": "Informações", "field": "informacoes", "width": 80, "align": "left" }];

    // inicio Filtro
    this.site_Options.name = "cbSite";

    this.setor_Options.name = "cbSetor";

    this.area_Options.name = "cbArea";

    this.nome_Text.name = "txtNome";
    this.nome_Text.rules = "uppercase";
    this.nome_Text.maxLength = 50;
    this.nome_Text.minLength = 0;

    this.nivel_Text.name = "txtNome";
    this.nivel_Text.rules = "uppercase";
    this.nivel_Text.maxLength = 50;
    this.nivel_Text.minLength = 0;

    this.complemento1_Text.name = "txtComplemento1";
    this.complemento1_Text.rules = "uppercase";
    this.complemento1_Text.maxLength = 50;
    this.complemento1_Text.minLength = 0;

    this.complemento2_Text.name = "txtComplemento2";
    this.complemento2_Text.rules = "uppercase";
    this.complemento2_Text.maxLength = 50;
    this.complemento2_Text.minLength = 0;

    this.complemento3_Text.name = "txtComplemento3";
    this.complemento3_Text.rules = "uppercase";
    this.complemento3_Text.maxLength = 50;
    this.complemento3_Text.minLength = 0;

    this.complemento4_Text.name = "txtComplemento4";
    this.complemento4_Text.rules = "uppercase";
    this.complemento4_Text.maxLength = 50;
    this.complemento4_Text.minLength = 0;

    this.grupo_Option.name = "cbGrupo";

    this.observacao_Text.name = "txtObservacao";
    this.observacao_Text.rules = "uppercase";
    this.observacao_Text.maxLength = 50;
    this.observacao_Text.minLength = 0;

    this.localizacao_Text.name = "txtObservacao";
    this.localizacao_Text.rules = "uppercase";
    this.localizacao_Text.maxLength = 50;
    this.localizacao_Text.minLength = 0;

    this.caracteristicaVeiculo_Text.name = "txtObservacao";
    this.caracteristicaVeiculo_Text.rules = "uppercase";
    this.caracteristicaVeiculo_Text.maxLength = 50;
    this.caracteristicaVeiculo_Text.minLength = 0;

    this.documento_Text.name = "txtDocumento";
    this.documento_Text.rules = "uppercase";
    this.documento_Text.maxLength = 50;
    this.documento_Text.minLength = 0;

    this.contrato_Text.name = "txtContrato";
    this.contrato_Text.rules = "uppercase";
    this.contrato_Text.maxLength = 50;
    this.contrato_Text.minLength = 0;

    this.empresa_Text.name = "txtEmpresas";
    this.empresa_Text.rules = "uppercase";
    this.empresa_Text.maxLength = 50;
    this.empresa_Text.minLength = 0;

    this.tipoArea_Option.name = "cbTipoArea";
    this.tipoArea_Option.add("", "", 0, true)
    this.tipoArea_Option.add(TipoAreaSigla[1], "areaComum", 1);
    this.tipoArea_Option.add(TipoAreaSigla[2], "areaReservada", 2);
    this.tipoArea_Option.add(TipoAreaSigla[3], "areaEstacionamento", 3);
    this.tipoArea_Option.add(TipoAreaSigla[4], "areaEmergencia", 4);


    this.tipoGaragem_Option.name = "cbTipoGaragem";
    this.tipoGaragem_Option.add("", "", 0, true)
    this.tipoGaragem_Option.add("PERMANENTE", "permanente", 1);
    this.tipoGaragem_Option.add("COMPARTILHADA", "compartilhada", 2);
    this.tipoGaragem_Option.add("ROTATIVA VINCULADA", "vinculada", 3);
    this.tipoGaragem_Option.add("ROTATIVA NÃO VINCULADA", "naoVinculada", 4);

    this.restrito_Option.add("","", 2, true);
    this.restrito_Option.add("SIM","sim", 1);
    this.restrito_Option.add("NÃO","nao", 0);

    this.centroCusto_Option.name = "cbCentroCusto";

    this.id_Text.name = "txtID";
    this.id_Text.rules = "uppercase";
    this.id_Text.maxLength = 50;
    this.id_Text.minLength = 0;

    this.veiculoID_Text.name = "txtVeiculoId";
    this.veiculoID_Text.rules = "uppercase";
    this.veiculoID_Text.maxLength = 50;
    this.veiculoID_Text.minLength = 0;

    this.cartao_Text.name = "txtCartao";
    this.cartao_Text.rules = "uppercase";
    this.cartao_Text.maxLength = 50;
    this.cartao_Text.minLength = 0;

    this.supervisor_Text.name = "txtSupervisor";
    this.supervisor_Text.rules = "uppercase";
    this.supervisor_Text.maxLength = 50;
    this.supervisor_Text.minLength = 0;

    this.siteCode_Text.name = "txtSiteCode";
    this.siteCode_Text.rules = "uppercase";
    this.siteCode_Text.maxLength = 30;
    this.siteCode_Text.minLength = 0;

    this.abordagem_Option.name = "cbAbordagem";
    this.abordagem_Option.add("", null, 0, true);
    this.abordagem_Option.add("INFORMATIVA", "informativa", 1, false);
    this.abordagem_Option.add("ADVERTIDA", "advertida", 3, false);
    this.abordagem_Option.add("RESTRITIVA", "restritiva", 4, false);

    this.status_Option.name = "cbStatus";
    this.status_Option.add("", null, 2, true);
    this.status_Option.add("LIVRE", "livre", 1, false);
    this.status_Option.add("BLOQUEADO", "bloqueado", 0, false);

    // Filtro

    this.periodo_Options.add("Indeterminado", "indeterminado", 0, true);
    this.periodo_Options.add("Dia", "dia", 1);
    this.periodo_Options.add("Mês", "mes", 2);
    this.periodo_Options.add("Ano", "ano", 3);
    this.periodo_Options.add("Período", "periodo", 4);

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

    this.horaFinal_Text.name = "txtHoraFinal";
    this.horaFinal_Text.rules = "time";
    this.horaFinal_Text.regex = "time";
    this.horaFinal_Text.maxLength = 5;
    this.horaFinal_Text.minLength = 0;

    // fim Filtro

    this.valorIdentico_Options.add(0, "Valor Idêntico", "valorIdentico");
    this.ordenacao_Option.name = "cbOrdenacaoRelatorio";

    var grupoOrder: PessoaGrupoSort;
    var grupoFilter: PessoaGrupoFilter;

    var grupoVeiculoOrder: VeiculoGrupoSort;
    var grupoVeiculoFilter: VeiculoGrupoFilter;

    var grupoEmpresaOrder: EmpresaGrupoSort;


    this.plataforma = <PlataformaConfig>this.configStorage.getConfig("plataforma");
    this.organizacao = <OrganizacaoConfig>this.configStorage.getConfig("organizacao");


    this.settings
      .subscribe((site: SiteConfig) => {
        if (site != null) {
          this.siteId = site.id;
          this.siteNome = site.nome;
          this.setorFilter = { siteId: { eq: this.siteId } };
        }
      });

    this.setor_Options.add("", "", 0, true);
    this.area_Options.add("", "", 0, true);

    // filtro modelo veículo //

    this.modeloVeiculo_Option.name = "cbModeloVeiculoInterno";
    this.modeloVeiculo_Option.add("", "", 0);

    const sortVeiculoModelo: VeiculoModeloGrupoSort = { veiculoModelo: SortOperationKind.ASC };

    this.veiculoModeloGrupoService.readVeiculoModeloGrupos(sortVeiculoModelo, null)
      .subscribe(({ grupoVeiculoModelo }: read_VeiculoModeloGrupo) => {
        const nodes: VeiculoModeloGrupo[] = grupoVeiculoModelo.nodes;
        nodes.forEach((node: VeiculoModeloGrupo) => {
          this.modeloVeiculo_Option.add(node.veiculoModelo, node.veiculoModelo, node.id);
        })
      })

    // filtro cor veículo //

    this.corVeiculo_Option.name = "cbVeiculoCor";
    this.corVeiculo_Option.add("", "", 0);
    this.corVeiculo_Option.addRange<Item>(this.veiculoGrupoService.veiculoCor);

    // filtro grupo de veículo //

    this.grupoVeiculo_Option.clear();
    this.grupoVeiculo_Option.add("", null, 0, true);

    grupoVeiculoOrder = { veiculoGrupo: SortOperationKind.ASC };
    grupoVeiculoFilter = { veiculoInterno: { eq: true } };

    this.veiculoGrupoService.readVeiculoGrupos(grupoVeiculoOrder, grupoVeiculoFilter)
      .subscribe(({ grupoVeiculo }: read_VeiculoGrupo) => {
        const grupoVeiculoNodes: VeiculoGrupo[] = grupoVeiculo.nodes;
        grupoVeiculoNodes.forEach(grupoVeiculo => {
          this.grupoVeiculo_Option.add(grupoVeiculo.veiculoGrupo, grupoVeiculo.veiculoGrupo, grupoVeiculo.id);
        })
      });

    // filtro grupo de empresa //

    this.grupoEmpresa_Option.clear();
    this.grupoEmpresa_Option.add("", null, 0, true);

    grupoEmpresaOrder = { empresaGrupo: SortOperationKind.ASC };

    this.empresaGrupoService.readEmpresaGrupos(grupoEmpresaOrder, null)
      .subscribe(({ grupoEmpresa }: read_EmpresaGrupo) => {
        const grupoEmpresaNodes: EmpresaGrupo[] = grupoEmpresa.nodes;
        grupoEmpresaNodes.forEach(grupoEmpresas => {
          this.grupoEmpresa_Option.add(grupoEmpresas.empresaGrupo, grupoEmpresas.empresaGrupo, grupoEmpresas.id);
        });
      })

    // filtro centro de custo //     

    this.centroCusto_Option.clear();
    this.centroCusto_Option.add("", null, 0, true);

    const centroCustoVeiculoOrder: CentroCustoGrupoSort = { centroCusto: SortOperationKind.ASC };

    this.centroCustoService.readCentroCustoGrupos(centroCustoVeiculoOrder, null)
      .subscribe(({ grupoCentroCusto }: read_CentroCustoGrupo) => {
        const centroCustoNodes: CentroCustoGrupo[] = grupoCentroCusto.nodes;
        centroCustoNodes.forEach(centroCusto => {
          this.centroCusto_Option.add(centroCusto.centroCusto, centroCusto.centroCusto, centroCusto.id);
        })
      })

    // filtro empresa //

    this.empresa_Option.clear();
    this.empresa_Option.add("", null, 0, true);

    const empresaOrder: EmpresaReparticaoSort = { nome: SortOperationKind.ASC };

    this.empresaReparticaoService.readEmpresaReparticaos(empresaOrder, null)
      .subscribe(({ reparticaoEmpresa }: read_EmpresaReparticao) => {
        const reparticaoEmpresaNodes: EmpresaReparticao[] = reparticaoEmpresa.nodes;
        reparticaoEmpresaNodes.forEach(empresa => {
          this.empresa_Option.add(empresa.nome, empresa.nome, empresa.id);
        })
      })

    // filtro estacionamento //

    this.estacionamento_Option.clear();
    this.estacionamento_Option.add("", "", 0, true);

    const areaEstacionamentoSort: AreaReparticaoSort = { nome: SortOperationKind.ASC };
    const areaEstacionamentoFilter: AreaReparticaoFilter = { setor: { siteId: { eq: this.siteId } }, tipo: { eq: 3 } };

    this.areaService.readAreaReparticao(areaEstacionamentoSort, areaEstacionamentoFilter)
      .subscribe(({ reparticaoArea }: read_AreaReparticao) => {
        const reparticaoAreaNodes: AreaReparticao[] = reparticaoArea.nodes;
        reparticaoAreaNodes.forEach(areaReparticao => {
          this.estacionamento_Option.add(areaReparticao.nome, areaReparticao.nome, areaReparticao.id)
        })
        this.onGaragem_Click();
      });

    // filtro setor //

    this.setor_Options.clear();
    this.setor_Options.add("", "", 0, true);

    this.setorSort = { nome: SortOperationKind.ASC };
    this.setorService.readSetorReparticao(this.setorSort, this.setorFilter)
      .subscribe(({ reparticaoSetor }: read_SetorReparticao) => {
        const reparticaoSetorNodes: SetorReparticao[] = reparticaoSetor.nodes;

        reparticaoSetorNodes.forEach(setorReparticao => {
          this.setor_Options.add(setorReparticao.nome, setorReparticao.nome, setorReparticao.id)
        })
        this.onArea_Click();
      })

    // filtro grupo pessoa //

    this.grupo_Option.clear();
    this.grupo_Option.add("", null, 0, true);

    grupoOrder = { pessoaGrupo: SortOperationKind.ASC };
    grupoFilter = { pessoaInterna: { eq: true } };

    this.pessoaGrupoService.readPessoaGrupos(grupoOrder, grupoFilter)
      .subscribe(({ grupoPessoa }: read_PessoaGrupo) => {
        const grupoPessoasNodes: PessoaGrupo[] = grupoPessoa.nodes;
        grupoPessoasNodes.forEach(grupoPessoa => {
          this.grupo_Option.add(grupoPessoa.pessoaGrupo, grupoPessoa.pessoaGrupo, grupoPessoa.id);
        })
      });

    // filtro tipo veículo //

    this.tipoVeiculo_Option.name = "cbVeiculosTipos";
    this.tipoVeiculo_Option.add("", "", 0);
    this.tipoVeiculo_Option.addRange<Item>(this.veiculoGrupoService.veiculoTipo);

    this.treeviewItem
      .subscribe((relatorioTipo: string) => {
        switch (relatorioTipo) {

          // Inicio Filtro Pessoa Interna //

          case FiltroUsuario.PessoaInterna:

            this.tabsGestaoUsuario_Option.showTab({ title: "Tempo" });

            this.relatorioTipo = PessoaTipo.interna;
            this.listView_Usuario.title = "Lista de Relatórios de Cadastro de Pessoa Interna";
            this.actionbuttomService.showHideButton(1);

            const reportEstilo: string = (relatorioTipo == FiltroUsuario.PessoaInterna) ? "Simples" : "Agrupado";
            this.update_Grid(reportEstilo);
            break;

          //  Inicio Filtro Pessoa Externa //

          case FiltroUsuario.PessoaExterna:

            this.tabsGestaoUsuario_Option.showTab({ title: "Tempo" });

            this.relatorioTipo = PessoaTipo.externa;
            this.listView_Usuario.title = "Lista de Relatórios de Cadastro de Pessoa Externa";
            this.actionbuttomService.showHideButton(1);

            this.update_Grid("Simples");
            break;

          // Inicio Filtro Veiculo Interno //

          case FiltroUsuario.VeiculoInterno:

            this.tabsGestaoUsuario_Option.showTab({ title: "Tempo" });

            this.relatorioTipo = TipoVeiculo.interno
            this.listView_Usuario.title = "Lista de Relatórios de Cadastro de Veículo Interno";
            this.actionbuttomService.showHideButton(1);

            const reportEstilos: string = (relatorioTipo == FiltroUsuario.VeiculoInterno) ? "Simples" : "Agrupado";
            this.update_Grid(reportEstilos);
            break;

          // Inicio Filtro Veiculo Externo //

          case FiltroUsuario.VeiculoExterno:

            this.tabsGestaoUsuario_Option.showTab({ title: "Tempo" });

            this.relatorioTipo = TipoVeiculo.externo;
            this.listView_Usuario.title = "Lista de Relatórios de Cadastro de Veículo Externo";
            this.actionbuttomService.showHideButton(1);

            const reportEstiloVeiculo: string = (relatorioTipo == FiltroUsuario.VeiculoExterno) ? "Simples" : "Agrupado";
            this.update_Grid(reportEstiloVeiculo);
            break;

          // Filtro Empresa //

          case FiltroUsuario.Empresa:

            this.tabsGestaoUsuario_Option.showTab({ title: "Tempo" });

            this.relatorioTipo = 6;
            this.listView_Usuario.title = "Lista de Relatórios de Cadastro de Empresa";
            this.actionbuttomService.showHideButton(1);
            this.update_Grid("Simples");
            break;

          // Filtro Área //            

          case FiltroUsuario.Area:

            this.tabsGestaoUsuario_Option.hideTab({ title: "Tempo" });

            this.relatorioTipo = 7;
            this.listView_Usuario.title = "Lista de Relatórios de Cadastro de Área";
            this.actionbuttomService.showHideButton(1);
            this.update_Grid("Simples");
            break;

          // Filtro Estacionamento //

          case FiltroUsuario.Estacionamento:

            this.tabsGestaoUsuario_Option.hideTab({ title: "Tempo" });

            this.relatorioTipo = 8;
            this.listView_Usuario.title = "Lista de Relatórios de Cadastro de Estacionamento e Vagas de Garagem";
            this.actionbuttomService.showHideButton(1);
            this.update_Grid("Simples");
            break;

          // Filtro Estacionamento //

          case FiltroUsuario.NivelAcesso:

            this.tabsGestaoUsuario_Option.hideTab({ title: "Tempo" });

            this.relatorioTipo = 9;
            this.listView_Usuario.title = "Lista de Relatórios de Cadastro de Nível de Acesso";
            this.actionbuttomService.showHideButton(1);
            this.update_Grid("Simples");
            break;


          default:
            this.relatorioTipo = 1;
            this.actionbuttomService.showHideButton(0);
            this.listView_Usuario.title = "Lista de Relatórios";
            break;

        }
      });
  }

  ngAfterViewInit(): void {
    this.onResize();
  }

  onSetor_Click() {
    if (this.setor_Options.itemSelected.id >= 0) {
      this.area_Options.clear();
      this.area_Options.add("", "", 0);
    }

  }

  onSetor_Populate() {
    this.setor_Options.clear();

    this.setor_Options.add("", "", 0, true);
    this.setorSort = { nome: SortOperationKind.ASC };

    this.setor_Options.itemSelected.text = "Aguarde! Carregando...";

    this.setorService.readSetorReparticao(this.setorSort, this.setorFilter)
      .subscribe(({ reparticaoSetor }: read_SetorReparticao) => {
        const reparticaoSetorNodes: SetorReparticao[] = reparticaoSetor.nodes;

        this.setor_Options.itemSelected.text = "";

        reparticaoSetorNodes.forEach(setorReparticao => {
          this.setor_Options.add(setorReparticao.nome, setorReparticao.nome, setorReparticao.id)
        });
        this.onArea_Click();
      });
  }

  onArea_Click() {
    this.area_Options.clear();
    this.area_Options.add("", "", 0);

    const areaSort: AreaReparticaoSort = { nome: SortOperationKind.ASC };
    const areaFilter: AreaReparticaoFilter = { setorId: { eq: this.setor_Options.itemSelected.id } };

    this.areaService.readAreaReparticao(areaSort, areaFilter)
      .subscribe(({ reparticaoArea }: read_AreaReparticao) => {
        const reparticaoAreaNodes: AreaReparticao[] = reparticaoArea.nodes;
        reparticaoAreaNodes.forEach(areaReparticao => {
          this.area_Options.add(areaReparticao.nome, areaReparticao.nome, areaReparticao.id)
        });
      });
  }

  onEstacionamento_Click() {
    if (this.estacionamento_Option.itemSelected.id >= 0) {
      this.garagem_Option.clear();
      this.garagem_Option.add("", "", 0);
    }
  }

  onEstacionamento_Populate() {
    this.estacionamento_Option.clear();
    this.estacionamento_Option.add("", "", 0, true);

    this.estacionamento_Option.itemSelected.text = "Aguarde! Carregando...";

    const areaEstacionamentoSort: AreaReparticaoSort = { nome: SortOperationKind.ASC };
    const areaEstacionamentoFilter: AreaReparticaoFilter = { setor: { siteId: { eq: this.siteId } }, tipo: { eq: 3 } };

    this.areaService.readAreaReparticao(areaEstacionamentoSort, areaEstacionamentoFilter)
      .subscribe(({ reparticaoArea }: read_AreaReparticao) => {
        const reparticaoAreaNodes: AreaReparticao[] = reparticaoArea.nodes;

        this.estacionamento_Option.itemSelected.text = "";

        reparticaoAreaNodes.forEach(areaReparticao => {
          this.estacionamento_Option.add(areaReparticao.nome, areaReparticao.nome, areaReparticao.id)
        });
        this.onGaragem_Click();
      });
  }

  onGaragem_Click() {
    this.garagem_Option.clear();
    this.garagem_Option.add("", "", 0, true);

    const garagemSort: EstacionamentoVagaSort = { garagem: SortOperationKind.ASC };
    const garagemFilter: EstacionamentoVagaFilter = { estacionamentoId: { eq: this.estacionamento_Option.itemSelected.id } };

    this.estacionamentoService.readEstacionamentoVagas(garagemSort, garagemFilter)
      .subscribe(({ reparticaoEstacionamentoVaga }: read_EstacionamentoVaga) => {
        const estacionamentoNodes: EstacionamentoVaga[] = reparticaoEstacionamentoVaga.nodes;
        estacionamentoNodes.forEach(estacionamento => {
          this.garagem_Option.add(estacionamento.garagem, estacionamento.garagem, estacionamento.id);
        });
      });
  }

  onActionButtom_Click(actionButtomSelect: any) {
    switch (actionButtomSelect.text) {
      case "forms.buttons.issue": {
        this.onPeriodo_Change();
        this.centroCusto_Option.clear();
        this.centroCusto_Option.add("", null, 0, true);
        const centroCustoOrder: CentroCustoGrupoSort = { centroCusto: SortOperationKind.ASC };
        this.centroCustoService.readCentroCustoGrupos(centroCustoOrder, null)
          .subscribe(({ grupoCentroCusto }: read_CentroCustoGrupo) => {
            const centroCustoNodes: CentroCustoGrupo[] = grupoCentroCusto.nodes;
            centroCustoNodes.forEach(centroCusto => {
              this.centroCusto_Option.add(centroCusto.centroCusto, centroCusto.centroCusto, centroCusto.id);
            });
          });

        break;
      }
    }
  }

  onListView_Change(rowSelect?: rowSelect) {
    if (rowSelect.registro) {
      this.id = rowSelect.id;

      const reportPath: string = "./assets/reports/usuario/";
      this.reportSelect = reportPath + rowSelect.registro.codigo + ".mrt";

      this.ordenacao_Option.clear();

      switch (rowSelect.registro.codigo) {

        case "R1PI-1001":
          this.ordenacao_Option.add("Nome", "nome", 1);
          this.ordenacao_Option.add("Grupo", "grupo", 2);
          this.ordenacao_Option.add("Setor", "setor", 3);
          this.ordenacao_Option.add("Área", "area", 4);
          this.ordenacao_Option.add("Site", "site", 5);
          break;

        case "R1PI-1002":
          this.ordenacao_Option.add("Nome", "nome", 1);
          this.ordenacao_Option.add("Grupo", "grupo", 2);
          this.ordenacao_Option.add("Setor", "setor", 4);
          this.ordenacao_Option.add("Área", "area", 3);
          this.ordenacao_Option.add("Site", "site", 5);
          this.ordenacao_Option.add("Status", "status", 6);
          break;

        case "R1PI-1003":
          this.ordenacao_Option.add("Nome", "nome", 1);
          this.ordenacao_Option.add("Grupo", "grupo", 2);
          this.ordenacao_Option.add("Setor", "setor", 4);
          this.ordenacao_Option.add("Área", "area", 3);
          this.ordenacao_Option.add("Site", "site", 5);
          this.ordenacao_Option.add("Data Cadastro", "dataCadastro", 6);
          break;

        case "R1PI-1004":
          this.ordenacao_Option.add("Nome", "nome", 1);
          this.ordenacao_Option.add("Grupo", "grupo", 2);
          this.ordenacao_Option.add("Setor", "setor", 4);
          this.ordenacao_Option.add("Área", "area", 3);
          this.ordenacao_Option.add("Site", "site", 5);
          this.ordenacao_Option.add("Supervisor", "supervisor", 6);
          break;

        case "R1PI-1005":
          this.ordenacao_Option.add("Nome", "nome", 1);
          this.ordenacao_Option.add("Grupo", "grupo", 2);
          this.ordenacao_Option.add("Área", "area", 3);
          this.ordenacao_Option.add("Cargo", "cargo", 4);
          this.ordenacao_Option.add("Telefone", "telefone", 5);
          this.ordenacao_Option.add("E-mail", "email", 6);
          break;

        case "R1PI-1006":
          this.ordenacao_Option.add("Nome", "nome", 1);
          this.ordenacao_Option.add("ID", "id", 2);
          this.ordenacao_Option.add("Cartão", "cartao", 3);
          this.ordenacao_Option.add("Grupo", "grupo", 4);
          this.ordenacao_Option.add("Área", "area", 5);
          this.ordenacao_Option.add("Site", "site", 6);
          break;

        case "R1PI-1007":
          this.ordenacao_Option.add("Nome", "nome", 1);
          this.ordenacao_Option.add("ID", "id", 2);
          this.ordenacao_Option.add("Grupo", "grupo", 3);
          this.ordenacao_Option.add("Área", "area", 4);
          this.ordenacao_Option.add("Localização", "localizacao", 5);
          this.ordenacao_Option.add("Site", "site", 6);
          break;

        case "R1PI-1008":
          this.ordenacao_Option.add("Nome", "nome", 1);
          this.ordenacao_Option.add("ID", "id", 2);
          this.ordenacao_Option.add("Grupo", "grupo", 3);
          this.ordenacao_Option.add("Área", "area", 4);
          this.ordenacao_Option.add("Site", "site", 5);
          this.ordenacao_Option.add("Centro de Custo", "centroCusto", 6);
          break;

        case "R1PI-1009":
          this.ordenacao_Option.add("Nome", "nome", 1);
          this.ordenacao_Option.add("ID", "id", 2);
          this.ordenacao_Option.add("Grupo", "grupo", 3);
          this.ordenacao_Option.add("Área", "area", 4);
          this.ordenacao_Option.add("Validade Contratação", "validadeContratacao", 5);
          break;

        case "R1PI-1010":
          this.ordenacao_Option.add("Nome", "nome", 1);
          this.ordenacao_Option.add("ID", "id", 2);
          this.ordenacao_Option.add("Grupo", "grupo", 3);
          this.ordenacao_Option.add("Área", "area", 4);
          this.ordenacao_Option.add("Validade Integração", "validadeIntegracao", 5);
          break;

        case "R1PI-1011":
          this.ordenacao_Option.add("Nome", "nome", 1);
          this.ordenacao_Option.add("ID", "id", 2);
          this.ordenacao_Option.add("Grupo", "grupo", 3);
          this.ordenacao_Option.add("Área", "area", 4);
          this.ordenacao_Option.add("Validade Segurança", "validadeSeguranca", 5);
          break;

        case "R1PI-1012":
          this.ordenacao_Option.add("Nome", "nome", 1);
          this.ordenacao_Option.add("ID", "id", 2);
          this.ordenacao_Option.add("Grupo", "grupo", 3);
          this.ordenacao_Option.add("Área", "area", 4);
          this.ordenacao_Option.add("Validade Exame Médico", "validadeExameMedico", 5);
          break;

        case "R1PI-1013":
          this.ordenacao_Option.add("Nome", "nome", 1);
          this.ordenacao_Option.add("ID", "id", 2);
          this.ordenacao_Option.add("Grupo", "grupo", 3);
          this.ordenacao_Option.add("Área", "area", 4);
          this.ordenacao_Option.add("Validade Férias", "validadeFerias", 5);
          break;

        case "R1PI-1014":
          this.ordenacao_Option.add("Nome", "nome", 1);
          this.ordenacao_Option.add("ID", "id", 2);
          this.ordenacao_Option.add("Grupo", "grupo", 3);
          this.ordenacao_Option.add("Área", "area", 4);
          this.ordenacao_Option.add("Validade Afastamento", "validadefastamento", 5);
          break;

        case "R1PI-1015":
          this.ordenacao_Option.add("Nome", "nome", 1);
          this.ordenacao_Option.add("ID", "id", 2);
          this.ordenacao_Option.add("Grupo", "grupo", 3);
          this.ordenacao_Option.add("Área", "area", 4);
          this.ordenacao_Option.add("Empresa", "empresa", 5);
          break;

        case "R1PI-1016":
          this.ordenacao_Option.add("Nome", "nome", 1);
          this.ordenacao_Option.add("ID", "id", 2);
          this.ordenacao_Option.add("Grupo", "grupo", 3);
          this.ordenacao_Option.add("Área", "area", 4);
          this.ordenacao_Option.add("Complemento 1", "complemento1", 5);
          break;

        case "R1PI-1017":
          this.ordenacao_Option.add("Nome", "nome", 1);
          this.ordenacao_Option.add("ID", "id", 2);
          this.ordenacao_Option.add("Grupo", "grupo", 3);
          this.ordenacao_Option.add("Área", "area", 4);
          this.ordenacao_Option.add("Complemento 2", "complemento2", 5);
          break;

        case "R1PI-1018":
          this.ordenacao_Option.add("Nome", "nome", 1);
          this.ordenacao_Option.add("ID", "id", 2);
          this.ordenacao_Option.add("Grupo", "grupo", 3);
          this.ordenacao_Option.add("Área", "area", 4);
          this.ordenacao_Option.add("Complemento 3", "complemento3", 5);
          break;

        case "R1PI-1019":
          this.ordenacao_Option.add("Nome", "nome", 1);
          this.ordenacao_Option.add("ID", "id", 2);
          this.ordenacao_Option.add("Grupo", "grupo", 3);
          this.ordenacao_Option.add("Área", "area", 4);
          this.ordenacao_Option.add("Complemento 4", "complemento4", 5);
          break;

        case "R1PI-1020":
          this.ordenacao_Option.add("Nome", "nome", 1);
          this.ordenacao_Option.add("ID", "id", 2);
          this.ordenacao_Option.add("Grupo", "grupo", 3);
          this.ordenacao_Option.add("Área", "area", 4);
          this.ordenacao_Option.add("Veículo Vinculado", "veiculoVinculado", 5);
          break;

        case "R1PI-1021":
          this.ordenacao_Option.add("Nome", "nome", 1);
          this.ordenacao_Option.add("ID", "id", 2);
          this.ordenacao_Option.add("Grupo", "grupo", 3);
          this.ordenacao_Option.add("Área", "area", 4);
          this.ordenacao_Option.add("Nível de Acesso", "nivelAcesso", 5);
          break;

        case "R1PI-1022":
          this.ordenacao_Option.add("Nome", "nome", 1);
          this.ordenacao_Option.add("ID", "id", 2);
          this.ordenacao_Option.add("Grupo", "grupo", 3);
          this.ordenacao_Option.add("Área", "area", 4);
          this.ordenacao_Option.add("Abordagens", "aboradagens", 5);
          break;

        case "R1PE-1001":
          this.ordenacao_Option.add("Nome", "nome", 1);
          this.ordenacao_Option.add("Grupo", "grupo", 2);
          this.ordenacao_Option.add("Empresa", "entidade", 3);
          break;

        case "R1PE-1002":
          this.ordenacao_Option.add("Nome", "nome", 1);
          this.ordenacao_Option.add("Grupo", "grupo", 2);
          this.ordenacao_Option.add("Empresa", "entidade", 3);
          this.ordenacao_Option.add("Status", "status", 4);;
          break;

        case "R1PE-1003":
          this.ordenacao_Option.add("Nome", "nome", 1);
          this.ordenacao_Option.add("Grupo", "grupo", 2);
          this.ordenacao_Option.add("Empresa", "entidade", 3);
          this.ordenacao_Option.add("Data de Cadastro", "dataCadastro", 4);
          break;

        case "R1PE-1004":
          this.ordenacao_Option.add("Nome", "nome", 1);
          this.ordenacao_Option.add("Grupo", "grupo", 2);
          this.ordenacao_Option.add("Empresa", "entidade", 3);
          this.ordenacao_Option.add("Telefone", "telefone", 4);
          this.ordenacao_Option.add("Email", "email", 5);
          break;

        case "R1PE-1005":
          this.ordenacao_Option.add("Nome", "nome", 1);
          this.ordenacao_Option.add("Grupo", "grupo", 2);
          this.ordenacao_Option.add("Empresa", "entidade", 3);
          this.ordenacao_Option.add("Validade Integração", "validadeIntegracao", 4);
          break;

        case "R1PE-1006":
          this.ordenacao_Option.add("Nome", "nome", 1);
          this.ordenacao_Option.add("Grupo", "grupo", 2);
          this.ordenacao_Option.add("Empresa", "entidade", 3);
          this.ordenacao_Option.add("Validade Segurança", "validadeSeguranca", 4);
          break;

        case "R1PE-1007":
          this.ordenacao_Option.add("Nome", "nome", 1);
          this.ordenacao_Option.add("Grupo", "grupo", 2);
          this.ordenacao_Option.add("Empresa", "entidade", 3);
          this.ordenacao_Option.add("Validade Exame Médico", "validadeExameMedico", 4);
          break;

        case "R1PE-1008":
          this.ordenacao_Option.add("Nome", "nome", 1);
          this.ordenacao_Option.add("Grupo", "grupo", 2);
          this.ordenacao_Option.add("Empresa", "empresa", 3);
          this.ordenacao_Option.add("Complemento 1", "complemento1", 4);
          break;

        case "R1PE-1009":
          this.ordenacao_Option.add("Nome", "nome", 1);
          this.ordenacao_Option.add("Grupo", "grupo", 2);
          this.ordenacao_Option.add("Empresa", "empresa", 3);
          this.ordenacao_Option.add("Complemento 2", "complemento2", 4);
          break;

        case "R1PE-1010":
          this.ordenacao_Option.add("Nome", "nome", 1);
          this.ordenacao_Option.add("Grupo", "grupo", 2);
          this.ordenacao_Option.add("Empresa", "empresa", 3);
          this.ordenacao_Option.add("Complemento 3", "complemento3", 4);
          break;

        case "R1PE-1011":
          this.ordenacao_Option.add("Nome", "nome", 1);
          this.ordenacao_Option.add("Grupo", "grupo", 2);
          this.ordenacao_Option.add("Empresa", "empresa", 3);
          this.ordenacao_Option.add("Complemento 4", "complemento4", 4);
          break;

        case "R1PE-1012":
          this.ordenacao_Option.add("Nome", "nome", 1);
          this.ordenacao_Option.add("Grupo", "grupo", 2);
          this.ordenacao_Option.add("Empresa", "empresa", 3);
          this.ordenacao_Option.add("Veículo Vinculado", "veiculoVinculado", 4);
          break;

        case "R1PE-1013":
          this.ordenacao_Option.add("Nome", "nome", 1);
          this.ordenacao_Option.add("Grupo", "grupo", 2);
          this.ordenacao_Option.add("Empresa", "empresa", 3);
          this.ordenacao_Option.add("Abordagens", "abordagens", 4);
          break;

        case "R1VI-1001":
          this.ordenacao_Option.add("Veículo ID", "veiculoID", 1);
          this.ordenacao_Option.add("Tipo", "tipo", 2);
          this.ordenacao_Option.add("Modelo", "modelo", 3);
          this.ordenacao_Option.add("Cor", "cor", 4);
          this.ordenacao_Option.add("Grupo", "grupo", 5);
          this.ordenacao_Option.add("Área", "area", 6);
          this.ordenacao_Option.add("Site", "site", 7);
          break;

        case "R1VI-1002":
          this.ordenacao_Option.add("Veículo ID", "veiculoID", 1);
          this.ordenacao_Option.add("Tipo", "tipo", 2);
          this.ordenacao_Option.add("Modelo", "modelo", 3);
          this.ordenacao_Option.add("Cor", "cor", 4);
          this.ordenacao_Option.add("Área", "area", 5);
          this.ordenacao_Option.add("Setor", "setor", 6);
          this.ordenacao_Option.add("Site", "site", 7)
          this.ordenacao_Option.add("Status", "status", 8);
          break;

        case "R1VI-1003":
          this.ordenacao_Option.add("Veículo ID", "veiculoID", 1);
          this.ordenacao_Option.add("Tipo", "tipo", 2);
          this.ordenacao_Option.add("Modelo", "modelo", 3);
          this.ordenacao_Option.add("Cor", "cor", 4);
          this.ordenacao_Option.add("Área", "area", 5);
          this.ordenacao_Option.add("Setor", "setor", 6);
          this.ordenacao_Option.add("Site", "site", 7)
          this.ordenacao_Option.add("Data Cadastro", "dataCadastro", 8);
          break;

        case "R1VI-1004":
          this.ordenacao_Option.add("Veículo ID", "veiculoID", 1);
          this.ordenacao_Option.add("Tipo", "tipo", 2);
          this.ordenacao_Option.add("Modelo", "modelo", 3);
          this.ordenacao_Option.add("Cor", "cor", 4);
          this.ordenacao_Option.add("Área", "area", 5);
          this.ordenacao_Option.add("Site", "site", 6);
          this.ordenacao_Option.add("Supervisor", "supervisor", 7);
          break;

        case "R1VI-1005":
          this.ordenacao_Option.add("Veículo ID", "veiculoID", 1);
          this.ordenacao_Option.add("Tipo", "tipo", 2);
          this.ordenacao_Option.add("Modelo", "modelo", 3);
          this.ordenacao_Option.add("Cor", "cor", 4);
          this.ordenacao_Option.add("Característica", "caracterisitica", 5);
          this.ordenacao_Option.add("Área", "area", 6);
          this.ordenacao_Option.add("Site", "site", 7);
          break;

        case "R1VI-1006":
          this.ordenacao_Option.add("Veículo ID", "veiculoID", 1);
          this.ordenacao_Option.add("Tipo", "tipo", 2);
          this.ordenacao_Option.add("Modelo", "modelo", 3);
          this.ordenacao_Option.add("Cor", "cor", 4);
          this.ordenacao_Option.add("Tag", "tag", 5);
          this.ordenacao_Option.add("Área", "area", 6);
          this.ordenacao_Option.add("Setor", "setor", 7);
          this.ordenacao_Option.add("Site", "site", 8);
          break;

        case "R1VI-1007":
          this.ordenacao_Option.add("Veículo ID", "veiculoID", 1);
          this.ordenacao_Option.add("Tipo", "tipo", 2);
          this.ordenacao_Option.add("Modelo", "modelo", 3);
          this.ordenacao_Option.add("Cor", "cor", 4);
          this.ordenacao_Option.add("Tag", "tag", 5);
          this.ordenacao_Option.add("Área", "area", 6);
          this.ordenacao_Option.add("Localização", "localizacao", 7);
          this.ordenacao_Option.add("Site", "site", 8);
          break;

        case "R1VI-1008":
          this.ordenacao_Option.add("Veículo ID", "veiculoID", 1);
          this.ordenacao_Option.add("Tipo", "tipo", 2);
          this.ordenacao_Option.add("Modelo", "modelo", 3);
          this.ordenacao_Option.add("Cor", "cor", 4);
          this.ordenacao_Option.add("Área", "area", 5);
          this.ordenacao_Option.add("Site", "site", 6);
          this.ordenacao_Option.add("Centro de Custo", "centroDeCusto", 7);
          break;

        case "R1VI-1009":
          this.ordenacao_Option.add("Veículo ID", "veiculoID", 1);
          this.ordenacao_Option.add("Tipo", "tipo", 2);
          this.ordenacao_Option.add("Modelo", "modelo", 3);
          this.ordenacao_Option.add("Cor", "cor", 4);
          this.ordenacao_Option.add("Área", "area", 5);
          this.ordenacao_Option.add("Site", "site", 6);
          this.ordenacao_Option.add("Complemento 1", "complemento1", 7);
          break;


        case "R1VI-1010":
          this.ordenacao_Option.add("Veículo ID", "veiculoID", 1);
          this.ordenacao_Option.add("Tipo", "tipo", 2);
          this.ordenacao_Option.add("Modelo", "modelo", 3);
          this.ordenacao_Option.add("Cor", "cor", 4);
          this.ordenacao_Option.add("Área", "area", 5);
          this.ordenacao_Option.add("Site", "site", 6);
          this.ordenacao_Option.add("Complemento 2", "complemento2", 7);
          break;

        case "R1VI-1011":
          this.ordenacao_Option.add("Veículo ID", "veiculoID", 1);
          this.ordenacao_Option.add("Tipo", "tipo", 2);
          this.ordenacao_Option.add("Modelo", "modelo", 3);
          this.ordenacao_Option.add("Cor", "cor", 4);
          this.ordenacao_Option.add("Área", "area", 5);
          this.ordenacao_Option.add("Site", "site", 6);
          this.ordenacao_Option.add("Complemento 3", "complemento3", 7);
          break;

        case "R1VI-1012":
          this.ordenacao_Option.add("Veículo ID", "veiculoID", 1);
          this.ordenacao_Option.add("Tipo", "tipo", 2);
          this.ordenacao_Option.add("Modelo", "modelo", 3);
          this.ordenacao_Option.add("Cor", "cor", 4);
          this.ordenacao_Option.add("Área", "area", 5);
          this.ordenacao_Option.add("Site", "site", 6);
          this.ordenacao_Option.add("Complemento 4", "complemento4", 7);
          break;

        case "R1VI-1013":
          this.ordenacao_Option.add("Veículo ID", "veiculoID", 1);
          this.ordenacao_Option.add("Tipo", "tipo", 2);
          this.ordenacao_Option.add("Modelo", "modelo", 3);
          this.ordenacao_Option.add("Cor", "cor", 4);
          this.ordenacao_Option.add("Área", "area", 5);
          this.ordenacao_Option.add("Site", "site", 6);
          this.ordenacao_Option.add("Observação", "observacao", 7);
          break;

        case "R1VI-1014":
          this.ordenacao_Option.add("Veículo ID", "veiculoID", 1);
          this.ordenacao_Option.add("Tipo", "tipo", 2);
          this.ordenacao_Option.add("Modelo", "modelo", 3);
          this.ordenacao_Option.add("Cor", "cor", 4);
          this.ordenacao_Option.add("Área", "area", 5);
          this.ordenacao_Option.add("Site", "site", 6);
          break;

        case "R1VI-1015":
          this.ordenacao_Option.add("Veículo ID", "veiculoID", 1);
          this.ordenacao_Option.add("Tipo", "tipo", 2);
          this.ordenacao_Option.add("Modelo", "modelo", 3);
          this.ordenacao_Option.add("Cor", "cor", 4);
          this.ordenacao_Option.add("Área", "area", 5);
          this.ordenacao_Option.add("Site", "site", 6);
          break;

        case "R1VI-1016":
          this.ordenacao_Option.add("Veículo ID", "veiculoID", 1);
          this.ordenacao_Option.add("Tipo", "tipo", 2);
          this.ordenacao_Option.add("Modelo", "modelo", 3);
          this.ordenacao_Option.add("Cor", "cor", 4);
          this.ordenacao_Option.add("Área", "area", 5);
          this.ordenacao_Option.add("Site", "site", 6);
          this.ordenacao_Option.add("Abordagem", "abordagem", 7);
          break;

        case "R1VE-1001":
          this.ordenacao_Option.add("Veículo ID", "veiculoID", 1);
          this.ordenacao_Option.add("Tipo", "tipo", 2);
          this.ordenacao_Option.add("Modelo", "modelo", 3);
          this.ordenacao_Option.add("Cor", "cor", 4);
          this.ordenacao_Option.add("Grupo", "grupo", 5);
          break;

        case "R1VE-1002":
          this.ordenacao_Option.add("Veículo ID", "veiculoID", 1);
          this.ordenacao_Option.add("Tipo", "tipo", 2);
          this.ordenacao_Option.add("Modelo", "modelo", 3);
          this.ordenacao_Option.add("Cor", "cor", 4);
          this.ordenacao_Option.add("Status", "status", 5);
          break;

        case "R1VE-1003":
          this.ordenacao_Option.add("Veículo ID", "veiculoID", 1);
          this.ordenacao_Option.add("Tipo", "tipo", 2);
          this.ordenacao_Option.add("Modelo", "modelo", 3);
          this.ordenacao_Option.add("Cor", "cor", 4);
          this.ordenacao_Option.add("Data Cadastro", "dataCadastro", 5);
          break;

        case "R1VE-1004":
          this.ordenacao_Option.add("Veículo ID", "veiculoID", 1);
          this.ordenacao_Option.add("Tipo", "tipo", 2);
          this.ordenacao_Option.add("Modelo", "modelo", 3);
          this.ordenacao_Option.add("Cor", "cor", 4);
          this.ordenacao_Option.add("Característica", "caracteristica", 5);
          break;

        case "R1VE-1005":
          this.ordenacao_Option.add("Veículo ID", "veiculoID", 1);
          this.ordenacao_Option.add("Tipo", "tipo", 2);
          this.ordenacao_Option.add("Modelo", "modelo", 3);
          this.ordenacao_Option.add("Cor", "cor", 4);
          this.ordenacao_Option.add("Empresa", "empresa", 5);
          break;

        case "R1VE-1006":
          this.ordenacao_Option.add("Veículo ID", "veiculoID", 1);
          this.ordenacao_Option.add("Tipo", "tipo", 2);
          this.ordenacao_Option.add("Modelo", "modelo", 3);
          this.ordenacao_Option.add("Cor", "cor", 4);
          this.ordenacao_Option.add("Complemento 1", "complemento1", 5);
          break;

        case "R1VE-1007":
          this.ordenacao_Option.add("Veículo ID", "veiculoID", 1);
          this.ordenacao_Option.add("Tipo", "tipo", 2);
          this.ordenacao_Option.add("Modelo", "modelo", 3);
          this.ordenacao_Option.add("Cor", "cor", 4);
          this.ordenacao_Option.add("Complemento 2", "complemento2", 5);
          break;

        case "R1VE-1008":
          this.ordenacao_Option.add("Veículo ID", "veiculoID", 1);
          this.ordenacao_Option.add("Tipo", "tipo", 2);
          this.ordenacao_Option.add("Modelo", "modelo", 3);
          this.ordenacao_Option.add("Cor", "cor", 4);
          this.ordenacao_Option.add("Complemento 3", "complemento3", 5);
          break;

        case "R1VE-1009":
          this.ordenacao_Option.add("Veículo ID", "veiculoID", 1);
          this.ordenacao_Option.add("Tipo", "tipo", 2);
          this.ordenacao_Option.add("Modelo", "modelo", 3);
          this.ordenacao_Option.add("Cor", "cor", 4);
          this.ordenacao_Option.add("Complemento 4", "complemento4", 5);
          break;

        case "R1VE-1010":
          this.ordenacao_Option.add("Veículo ID", "veiculoID", 1);
          this.ordenacao_Option.add("Tipo", "tipo", 2);
          this.ordenacao_Option.add("Modelo", "modelo", 3);
          this.ordenacao_Option.add("Cor", "cor", 4);
          this.ordenacao_Option.add("Observação", "observacao", 5);
          break;

        case "R1VE-1011":
          this.ordenacao_Option.add("Veículo ID", "veiculoID", 1);
          this.ordenacao_Option.add("Tipo", "tipo", 2);
          this.ordenacao_Option.add("Modelo", "modelo", 3);
          this.ordenacao_Option.add("Cor", "cor", 4);
          this.ordenacao_Option.add("Condutor", "condutor", 5);
          break;

        case "R1VE-1012":
          this.ordenacao_Option.add("Veículo ID", "veiculoID", 1);
          this.ordenacao_Option.add("Tipo", "tipo", 2);
          this.ordenacao_Option.add("Modelo", "modelo", 3);
          this.ordenacao_Option.add("Cor", "cor", 4);
          this.ordenacao_Option.add("Abordagem", "abordagem", 5);
          break;

        case "R1EP-1001":
          this.ordenacao_Option.add("Nome", "nome", 1);
          this.ordenacao_Option.add("Grupo", "grupo", 2);
          this.ordenacao_Option.add("Data Cadastro", "dataCadastro", 3);
          break;

        case "R1EP-1002":
          this.ordenacao_Option.add("Nome", "nome", 1);
          this.ordenacao_Option.add("Grupo", "grupo", 2);
          this.ordenacao_Option.add("Gestor", "gestor", 3);
          this.ordenacao_Option.add("Telefone", "telefone", 4);
          this.ordenacao_Option.add("E-mail", "email", 5);
          break;

        case "R1EP-1003":
          this.ordenacao_Option.add("Nome", "nome", 1);
          this.ordenacao_Option.add("Grupo", "grupo", 2);
          this.ordenacao_Option.add("Complemento 1", "complemento1", 3);
          this.ordenacao_Option.add("Complemento 2", "complemento2", 4);
          break;

        case "R1EP-1004":
          this.ordenacao_Option.add("Nome", "nome", 1);
          this.ordenacao_Option.add("Grupo", "grupo", 2);
          this.ordenacao_Option.add("Pessoa Interna Vinculada", "pessoaInternaVinculada", 3);
          this.ordenacao_Option.add("Pessoa Externa Vinculada", "pessoaExternaVinculada", 4);
          break;

        case "R1AR-1001":
          this.ordenacao_Option.add("Área", "area", 1);
          this.ordenacao_Option.add("Tipo", "tipo", 2);
          this.ordenacao_Option.add("Localização", "localizacao", 3);
          this.ordenacao_Option.add("Setor", "setor", 4);
          this.ordenacao_Option.add("Site", "site", 5);
          break;

        case "R1AR-1002":
          this.ordenacao_Option.add("Área", "area", 1);
          this.ordenacao_Option.add("Tipo", "tipo", 2);
          this.ordenacao_Option.add("Setor", "setor", 3);
          this.ordenacao_Option.add("Site", "site", 4);
          this.ordenacao_Option.add("Área Mãe", "areaMae", 5);
          break;

        case "R1AR-1003":
          this.ordenacao_Option.add("Área", "area", 1);
          this.ordenacao_Option.add("Tipo", "tipo", 2);
          this.ordenacao_Option.add("Setor", "setor", 3);
          this.ordenacao_Option.add("Site", "site", 4);
          break;

        case "R1AR-1004":
          this.ordenacao_Option.add("Área", "area", 1);
          this.ordenacao_Option.add("Tipo", "tipo", 2);
          this.ordenacao_Option.add("Setor", "setor", 3);
          this.ordenacao_Option.add("Site", "site", 4);
          break;

        case "R1AR-1005":
          this.ordenacao_Option.add("Área", "area", 1);
          this.ordenacao_Option.add("Tipo", "tipo", 2);
          this.ordenacao_Option.add("Setor", "setor", 3);
          this.ordenacao_Option.add("Site", "site", 4);
          break;

        case "R1AR-1006":
          this.ordenacao_Option.add("Área", "area", 1);
          this.ordenacao_Option.add("Tipo", "tipo", 2);
          this.ordenacao_Option.add("Setor", "setor", 3);
          this.ordenacao_Option.add("Site", "site", 4);
          this.ordenacao_Option.add("Lista de Veículos", "listaVeiculos", 5);
          break;


        case "R1ES-1001":
          this.ordenacao_Option.add("Estacionamento", "estacionamento", 1);
          this.ordenacao_Option.add("Localização", "localizacao", 2);
          this.ordenacao_Option.add("Setor", "setor", 3);
          this.ordenacao_Option.add("Site", "site", 4);
          break;

        case "R1ES-1002":
          this.ordenacao_Option.add("Estacionamento", "estacionamento", 1);
          this.ordenacao_Option.add("Setor", "setor", 2);
          this.ordenacao_Option.add("Site", "site", 3);
          this.ordenacao_Option.add("Área Mãe", "areaMae", 4);
          break;

        case "R1ES-1003":
          this.ordenacao_Option.add("Estacionamento", "estacionamento", 1);
          this.ordenacao_Option.add("Setor", "setor", 2);
          this.ordenacao_Option.add("site", "site", 3);
          this.ordenacao_Option.add("Volume Permitido", "volumePermitido", 4);
          break;

        case "R1ES-1004":
          this.ordenacao_Option.add("Estacionamento", "estacionamento", 1);
          this.ordenacao_Option.add("Setor", "setor", 2);
          this.ordenacao_Option.add("site", "site", 3);
          break;

        case "R1ES-1005":
          this.ordenacao_Option.add("Estacionamento", "estacionamento", 1);
          this.ordenacao_Option.add("Setor", "setor", 2);
          this.ordenacao_Option.add("site", "site", 3);
          break;

        case "R1ES-1006":
          this.ordenacao_Option.add("Estacionamento", "estacionamento", 1);
          this.ordenacao_Option.add("Tipo de Garagem", "tipoGaragem", 2);
          this.ordenacao_Option.add("Garagem", "garagens", 3);
          this.ordenacao_Option.add("Localização", "localizacao", 3);
          this.ordenacao_Option.add("Site", "site", 4);
          break;

        case "R1ES-1007":
          this.ordenacao_Option.add("Estacionamento", "estacionamento", 1);
          this.ordenacao_Option.add("Tipo de Garagem", "tipoGaragem", 2);
          this.ordenacao_Option.add("Garagem", "garagens", 3);
          this.ordenacao_Option.add("Área Vinculada", "areaVinculada", 4);
          break;

        case "R1ES-1008":
          this.ordenacao_Option.add("Estacionamento", "estacionamento", 1);
          this.ordenacao_Option.add("Tipo de Garagem", "tipoGaragem", 2);
          this.ordenacao_Option.add("Garagem", "garagens", 3);
          this.ordenacao_Option.add("Área Vinculada", "areaVinculada", 4);
          this.ordenacao_Option.add("Pessoa Vinculada", "pessoaVinculada", 5);
          break;

        case "R1ES-1009":
          this.ordenacao_Option.add("Estacionamento", "estacionamento", 1);
          this.ordenacao_Option.add("Tipo de Garagem", "tipoGaragem", 2);
          this.ordenacao_Option.add("Garagem", "garagens", 3);
          this.ordenacao_Option.add("Área Vinculada", "areaVinculada", 4);
          this.ordenacao_Option.add("Veículo Vinculado", "veiculoVinculado", 5);
          break;

        case "R1NA-1001":
          this.ordenacao_Option.add("Nível de Acesso", "nivelAcesso", 1);
          this.ordenacao_Option.add("Restrito", "restrito", 2);
          this.ordenacao_Option.add("Validade", "validade", 3);
          this.ordenacao_Option.add("Status", "status", 4);
          break;

        case "R1NA-1002":
          this.ordenacao_Option.add("Nível de Acesso", "nivelAcesso", 1);
          this.ordenacao_Option.add("Restrito", "restrito", 2);
          this.ordenacao_Option.add("Status", "status", 3);
          this.ordenacao_Option.add("Observação", "observacao", 4);
          break;

        case "R1NA-1003":
          this.ordenacao_Option.add("Nível de Acesso", "nivelAcesso", 1);
          this.ordenacao_Option.add("Restrito", "restrito", 2);
          this.ordenacao_Option.add("Status", "status", 3);
          break;

        case "R1NA-1004":
          this.ordenacao_Option.add("Nível de Acesso", "nivelAcesso", 1);
          this.ordenacao_Option.add("Restrito", "restrito", 2);
          this.ordenacao_Option.add("Status", "status", 3);
          break;

        case "R1NA-1005":
          this.ordenacao_Option.add("Nível de Acesso", "nivelAcesso", 1);
          this.ordenacao_Option.add("Restrito", "restrito", 2);
          this.ordenacao_Option.add("Status", "status", 3);
          break;
      }
    }
  }

  dataForm_Clean() {
    this.dia_Option.focus();
  }

  onPeriodo_Change() {

    if (this.dia_Option.itemSelected.id == 0)
      this.dia_Option.select(this.dataAtual.getDate());
    if (this.mes_Option.itemSelected.id == 0)
      this.mes_Option.select(this.dataAtual.getMonth() + 1);
    if (this.ano_Option.itemSelected.id == 0)
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

        this.dataInicial_Text.setTextWithMask(this.dataAtual.toLocaleDateString());
        this.dataFinal_Text.setTextWithMask(this.dataAtual.toLocaleDateString());
        this.horaInicial_Text.setTextWithMask("00:00");
        this.horaFinal_Text.setTextWithMask("23:59");

        break;

      case Periodo.indeterminado:
        this.dia_Option.disable();
        this.dia_Option.clearSelect();
        this.mes_Option.disable();
        this.mes_Option.clearSelect();
        this.ano_Option.disable();
        this.ano_Option.clearSelect();
        this.dataInicial_Text.disable();
        this.dataInicial_Text.clear();
        this.dataFinal_Text.clear();
        this.dataFinal_Text.disable();

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

    var filtroPessoaExterna: PessoaExternaUsuarioFilter = {};
    var filtroPessoaInterna: PessoaInternaUsuarioFilter = { area: { setor: { siteId: { eq: this.siteId } } } };
    var filtroVeiculoInterno: VeiculoInternoUsuarioFilter = { area: { setor: { siteId: { eq: this.siteId } } } };
    var filtroVeiculoExterno: VeiculoExternoUsuarioFilter = {};
    var filtroEmpresa: EmpresaReparticaoFilter = {};
    var filtroArea: AreaReparticaoFilter = { setor: { siteId: { eq: this.siteId } } };
    var filtroEstacionamento: EstacionamentoVagaFilter = { estacionamento: { setor: { siteId: { eq: this.siteId } } } };
    var filtroNivelAcesso: NivelAcessoFilter = {};

    var orderPessoaExterna: PessoaExternaUsuarioSort = {};
    var orderPessoaInterna: PessoaInternaUsuarioSort = {};
    var orderVeiculoInterno: VeiculoInternoUsuarioSort = {};
    var orderVeiculoExterno: VeiculoExternoUsuarioSort = {};
    var orderEmpresa: EmpresaReparticaoSort = {};
    var orderArea: AreaReparticaoSort = {};
    var orderEstacionamento: EstacionamentoVagaSort = {};
    var orderNivelAcesso: NivelAcessoSort = {};

    var reportTituloPessoa: string = "Relatório de Pessoa ";
    var reportTituloVeiculo: string = "Relatório de Veículo ";
    var reportTituloEmpresa: string = "Relatório de ";
    var reportTituloArea: string = "Relatório de ";
    var reportTituloEstacionamento: string = "Relatório de ";
    var reportTituloNivelAcesso: string = "Relatório de ";

    var subtitulo: string = "Filtrado pelo Site (" + this.siteNome + ")";

    switch (this.relatorioTipo) {
      case PessoaTipo.interna:
        reportTituloPessoa += "Interna";
        orderPessoaInterna = { nome: SortOperationKind.DESC };
        break;

      case PessoaTipo.externa:
        reportTituloPessoa += "Externa";
        orderPessoaExterna = { nome: SortOperationKind.DESC };
        break;


      case TipoVeiculo.interno:
        reportTituloVeiculo += "Interno";
        orderVeiculoInterno = { placa: SortOperationKind.ASC };
        break;

      case TipoVeiculo.externo:
        reportTituloVeiculo += "Externo";
        orderVeiculoExterno = { placa: SortOperationKind.ASC };
        break;

      case 6:
        reportTituloEmpresa += "Empresa";
        orderEmpresa = { nome: SortOperationKind.ASC };
        break;

      case 7:
        reportTituloArea += "Área";
        orderArea = { nome: SortOperationKind.ASC };
        break;

      case 8:
        reportTituloEstacionamento += "Estacionamento";
        orderEstacionamento = { garagem: SortOperationKind.ASC };
        break;

      case 9:
        reportTituloNivelAcesso += "Nível de Acesso";
        orderNivelAcesso = { nome: SortOperationKind.ASC };
        break;

      default:
        break;
    }

    this.showSpinner = true;
    let reportPeriodo = "Tempo: INDETERMINADO"


    if (this.relatorioTipo == PessoaTipo.interna) {

      if (this.periodo_Options.itemSelected.id != Periodo.indeterminado) {
        reportPeriodo = "Tempo: " +
          this.dataInicial_Text.textMasked + " " + this.horaInicial_Text.textMasked + " - " +
          this.dataFinal_Text.textMasked + " " + this.horaFinal_Text.textMasked;


        filtroPessoaInterna.and = [{ cadastroData: { gte: (this.dataInicial_Text.formated + "T" + this.horaInicial_Text.textMasked + ":00-00:00") } },
        { cadastroData: { lte: (this.dataFinal_Text.formated + "T" + this.horaFinal_Text.textMasked + ":59-00:00") } }];
      }

      if (this.nome_Text.text.length > 0) {
        filtroPessoaInterna.nome = { contains: this.nome_Text.text };
        subtitulo += ", pelo Nome (" + this.nome_Text.text + ")";

        if (this.valorIdentico_Options.valueOf("valorIdentico")) {
          filtroPessoaInterna.nome = { eq: this.nome_Text.text };
        }
      }

      if (this.grupo_Option.itemSelected.id > 0) {
        filtroPessoaInterna.grupoId = { eq: this.grupo_Option.itemSelected.id };
        subtitulo == "" ? subtitulo = "Filtrado pelo " : subtitulo += ", pelo ";
        subtitulo += "Grupo (" + this.grupo_Option.itemSelected.text + ")";
      }

      if (this.documento_Text.text.length > 0) {
        filtroPessoaInterna.documentoNumero = { contains: this.documento_Text.text };
        subtitulo == "" ? subtitulo = "Filtrado pelo " : subtitulo += ", pelo ";
        subtitulo += "Documento (" + this.documento_Text.text + ")";

        if (this.valorIdentico_Options.valueOf("valorIdentico")) {
          filtroPessoaInterna.documentoNumero = { eq: this.documento_Text.text };
        }
      }

      if (this.id_Text.text.length > 0) {
        filtroPessoaInterna.identificador = { contains: this.id_Text.text };
        subtitulo == "" ? subtitulo = "Filtrado pelo " : subtitulo += ", pelo ";
        subtitulo += "ID (" + this.id_Text.text + ")";

        if (this.valorIdentico_Options.valueOf("valorIdentico")) {
          filtroPessoaInterna.identificador = { eq: this.id_Text.text };
        }
      }

      if (this.cartao_Text.text.length > 0) {
        filtroPessoaInterna.acessoCartao = { contains: this.cartao_Text.text };
        subtitulo == "" ? subtitulo = "Filtrado pelo " : subtitulo += ", pelo ";
        subtitulo += "Cartão (" + this.cartao_Text.text + ")";

        if (this.valorIdentico_Options.valueOf("valorIdentico")) {
          filtroPessoaInterna.acessoCartao = { eq: this.cartao_Text.text };
        }
      }

      if (this.setor_Options.itemSelected.id > 0) {
        filtroPessoaInterna.area.setorId = { eq: this.setor_Options.itemSelected.id };
        subtitulo == "" ? subtitulo = "Filtrado pelo " : subtitulo += ", pelo ";
        subtitulo += "Setor (" + this.setor_Options.itemSelected.text + ")";
      }

      if ((this.setor_Options.itemSelected.id > 0) && (this.area_Options.itemSelected.id > 0)) {
        filtroPessoaInterna.areaId = { eq: this.area_Options.itemSelected.id };
        subtitulo == "" ? subtitulo = "Filtrado pelo " : subtitulo += ", pela ";
        subtitulo += "Área (" + this.area_Options.itemSelected.text + ")";
      }

      if (this.localizacao_Text.text.length > 0) {
        filtroPessoaInterna.localizacao = { contains: this.localizacao_Text.text };
        subtitulo == "" ? subtitulo = "Filtrado pelo " : subtitulo += ", pela ";
        subtitulo += "Localização (" + this.localizacao_Text.text + ")";

        if (this.valorIdentico_Options.valueOf("valorIdentico")) {
          filtroPessoaInterna.observacao = { eq: this.localizacao_Text.text };
        }
      }

      if (this.centroCusto_Option.itemSelected.id > 0) {
        filtroPessoaInterna.centroCustoId = { eq: this.centroCusto_Option.itemSelected.id };
        subtitulo == "" ? subtitulo = "Filtrado pelo " : subtitulo += ", pelo ";
        subtitulo += "Centro de Custo (" + this.centroCusto_Option.itemSelected.text + ")";
      }

      if (this.supervisor_Text.text.length > 0) {
        filtroPessoaInterna.supervisor = { nome: { contains: this.supervisor_Text.text } };
        subtitulo == "" ? subtitulo = "Filtrado pelo " : subtitulo += ", pelo ";
        subtitulo += "Supervisor (" + this.supervisor_Text.text + ")";

        if (this.valorIdentico_Options.valueOf("valorIdentico")) {
          filtroPessoaInterna.supervisor = { supervisor: { nome: { eq: this.supervisor_Text.text } } };
        }
      }

      if (this.empresa_Option.itemSelected.id > 0) {
        filtroPessoaInterna.empresa = { nome: { eq: this.empresa_Option.itemSelected.text } };
        subtitulo == "" ? subtitulo = "Filtrado pela " : subtitulo += ", pela ";
        subtitulo += "Empresa (" + this.empresa_Option.itemSelected.text + ")";
      }

      if (this.complemento1_Text.text.length > 0) {
        filtroPessoaInterna.complemento1 = { contains: this.complemento1_Text.text };
        subtitulo == "" ? subtitulo = "Filtrado pelo " : subtitulo += ", pelo ";
        subtitulo += "Complemento 1 (" + this.complemento1_Text.text + ")";

        if (this.valorIdentico_Options.valueOf("valorIdentico")) {
          filtroPessoaInterna.complemento1 = { eq: this.complemento1_Text.text };
        }
      }

      if (this.complemento2_Text.text.length > 0) {
        filtroPessoaInterna.complemento2 = { contains: this.complemento2_Text.text };
        subtitulo == "" ? subtitulo = "Filtrado pelo " : subtitulo += ", pelo ";
        subtitulo += "Complemento 2 (" + this.complemento2_Text.text + ")";

        if (this.valorIdentico_Options.valueOf("valorIdentico")) {
          filtroPessoaInterna.complemento2 = { eq: this.complemento2_Text.text };
        }
      }

      if (this.complemento3_Text.text.length > 0) {
        filtroPessoaInterna.complemento3 = { contains: this.complemento3_Text.text };
        subtitulo == "" ? subtitulo = "Filtrado pelo " : subtitulo += ", pelo ";
        subtitulo += "Complemento 3 (" + this.complemento3_Text.text + ")";

        if (this.valorIdentico_Options.valueOf("valorIdentico")) {
          filtroPessoaInterna.complemento3 = { eq: this.complemento3_Text.text };
        }
      }

      if (this.complemento4_Text.text.length > 0) {
        filtroPessoaInterna.complemento4 = { contains: this.complemento4_Text.text };
        subtitulo == "" ? subtitulo = "Filtrado pelo " : subtitulo += ", pelo ";
        subtitulo += "Complemento 4 (" + this.complemento4_Text.text + ")";

        if (this.valorIdentico_Options.valueOf("valorIdentico")) {
          filtroPessoaInterna.complemento4 = { eq: this.complemento4_Text.text };
        }
      }

      if (this.observacao_Text.text.length > 0) {
        filtroPessoaInterna.observacao = { contains: this.observacao_Text.text };
        subtitulo == "" ? subtitulo = "Filtrado pelo " : subtitulo += ", pela ";
        subtitulo += "Observação (" + this.observacao_Text.text + ")";

        if (this.valorIdentico_Options.valueOf("valorIdentico")) {
          filtroPessoaInterna.observacao = { eq: this.observacao_Text.text };
        }
      }

      if (this.siteCode_Text.text.length > 0) {
        try {
          filtroPessoaInterna.siteCode = { eq: parseInt(this.siteCode_Text.text) };
        } catch {
          console.log("Try/Catch: SiteCode não numérico")
        }
        subtitulo == "" ? subtitulo = "Filtrado pelo " : subtitulo += ", pelo ";
        subtitulo += "Site Code (" + this.siteCode_Text.text + ")";
      }

      if (this.status_Option.itemSelected.id < 2) {
        filtroPessoaInterna.status = { eq: this.status_Option.itemSelected.id == 1 ? true : false };
        subtitulo == "" ? subtitulo = "Filtrado pelo " : subtitulo += ", pelo ";
        subtitulo += "Status (" + this.status_Option.itemSelected.text + ")";
      }

      subtitulo += " e ordernado por " + this.ordenacao_Option.itemSelected.text;




      orderPessoaInterna[this.ordenacao_Option.itemSelected.value] = SortOperationKind.ASC;

      switch (this.ordenacao_Option.itemSelected.value) {

        case "nome":
          orderPessoaInterna = { nome: SortOperationKind.ASC };
          break;

        case "site":
          orderPessoaInterna = { area: { setor: { site: { nome: SortOperationKind.ASC } } } };
          break;

        case "setor":
          orderPessoaInterna = { area: { setor: { nome: SortOperationKind.ASC } } };
          break;

        case "area":
          orderPessoaInterna = { area: { nome: SortOperationKind.ASC } };
          break;

        case "grupo":
          orderPessoaInterna = { grupo: { pessoaGrupo: SortOperationKind.ASC } };
          break;

        case "status":
          orderPessoaInterna = { status: SortOperationKind.ASC };
          break;

        case "supervisor":
          orderPessoaInterna = { supervisor: { nome: SortOperationKind.ASC } };
          break;

        case "localizacao":
          orderPessoaInterna = { localizacao: SortOperationKind.ASC };
          break;

        case "telefone":
          orderPessoaInterna = { telefoneFixo: SortOperationKind.ASC };
          break;

        case "email":
          orderPessoaInterna = { email: SortOperationKind.ASC };
          break;

        case "dataCadastro":
          orderPessoaInterna = { cadastroData: SortOperationKind.ASC };
          break;

        case "cargo":
          orderPessoaInterna = { cargo: SortOperationKind.ASC };
          break;

        case "empresa":
          orderPessoaInterna = { empresa: { nome: SortOperationKind.ASC } };
          break;

        case "centroCusto":
          orderPessoaInterna = { centroCusto: { centroCusto: SortOperationKind.ASC } };
          break;

        case "validadeContratacao":
          orderPessoaInterna = { contratacaoInicio: SortOperationKind.ASC };
          break;

        case "validadeSeguranca":
          orderPessoaInterna = { segurancaInicio: SortOperationKind.ASC };
          break;

        case "ID":
          orderPessoaInterna = { identificador: SortOperationKind.ASC };
          break;

        case "cartao":
          orderPessoaInterna = { acessoCartao: SortOperationKind.ASC };
          break;

        case "complemento1":
          orderPessoaInterna = { complemento1: SortOperationKind.ASC };
          break;

        case "complemento2":
          orderPessoaInterna = { complemento2: SortOperationKind.ASC };
          break;

        case "complemento3":
          orderPessoaInterna = { complemento3: SortOperationKind.ASC };
          break;

        case "complemento4":
          orderPessoaInterna = { complemento4: SortOperationKind.ASC };
          break;

      }

      if (Object.keys(filtroPessoaInterna).length == 0) filtroPessoaInterna = null;

      this.pessoaInternaService.readPessoaInternaRelat(orderPessoaInterna, filtroPessoaInterna)
        .subscribe(({ usuarioPessoaInterna }: read_PessoaInternaUsuario) => {
          const pessoaInternaNodes: PessoaInternaUsuario[] = usuarioPessoaInterna.nodes;
          this.showSpinner = false;

          const reportTotalCount = usuarioPessoaInterna.totalCount;

          const jsonFile = {
            "header": {
              "titulo": reportTituloPessoa,
              "subtitulo": subtitulo,
              "periodo": reportPeriodo,
              "organizacao": this.organizacao.organizacaoNome,
              "contador": "Total de Registros: " + reportTotalCount,
              "logoAplicacao": sessionStorage.getItem("logoApp"),
              "logoOrganizacao": this.organizacao.organizacaoLogo
            },
            "data": {
              "usuarioPessoaInterna": {
                "nodes": pessoaInternaNodes
              }
            }
          };

          var dataset = new Stimulsoft.System.Data.DataSet("JSON");

          if (this.reportSelect) {

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

    } else if (this.relatorioTipo == PessoaTipo.externa) {

      subtitulo = "";

      if (this.periodo_Options.itemSelected.id != Periodo.indeterminado) {

        reportPeriodo = "Tempo: " +
          this.dataInicial_Text.textMasked + " " + this.horaInicial_Text.textMasked + " - " +
          this.dataFinal_Text.textMasked + " " + this.horaFinal_Text.textMasked;

        filtroPessoaExterna.and = [{ dataCadastro: { gte: (this.dataInicial_Text.formated + "T" + this.horaInicial_Text.textMasked + ":00-00:00") } },
        { dataCadastro: { lte: (this.dataFinal_Text.formated + "T" + this.horaFinal_Text.textMasked + ":59-00:00") } }];
      }


      if (this.nome_Text.text.length > 0) {
        filtroPessoaExterna.nome = { contains: this.nome_Text.text };
        subtitulo += "Filtrado pelo Nome (" + this.nome_Text.text + ")";

        if (this.valorIdentico_Options.valueOf("valorIdentico")) {
          filtroPessoaExterna.nome = { eq: this.nome_Text.text };
        }
      }

      if (this.grupo_Option.itemSelected.id > 0) {
        filtroPessoaExterna.grupoId = { eq: this.grupo_Option.itemSelected.id };
        subtitulo == "" ? subtitulo = "Filtrado pelo " : subtitulo += ", pelo ";
        subtitulo += "Grupo (" + this.grupo_Option.itemSelected.text + ")";
      }

      if (this.documento_Text.text.length > 0) {
        filtroPessoaExterna.documentoNumero = { contains: this.documento_Text.text };
        subtitulo == "" ? subtitulo = "Filtrado pelo " : subtitulo += ", pelo ";
        subtitulo += "Documento (" + this.documento_Text.text + ")";

        if (this.valorIdentico_Options.valueOf("valorIdentico")) {
          filtroPessoaExterna.documentoNumero = { eq: this.documento_Text.text };
        }
      }

      if (this.empresa_Text.text.length > 0) {
        filtroPessoaExterna.entidadeNome = { contains: this.empresa_Text.text };
        subtitulo == "" ? subtitulo = "Filtrado pelo " : subtitulo += ", pela ";
        subtitulo += "Empresa (" + this.empresa_Text.text + ")";

        if (this.valorIdentico_Options.valueOf("valorIdentico")) {
          filtroPessoaExterna.complemento1 = { eq: this.complemento1_Text.text };
        }
      }


      if (this.complemento1_Text.text.length > 0) {
        filtroPessoaExterna.complemento1 = { contains: this.complemento1_Text.text };
        subtitulo == "" ? subtitulo = "Filtrado pelo " : subtitulo += ", pelo ";
        subtitulo += "Complemento 1 (" + this.complemento1_Text.text + ")";

        if (this.valorIdentico_Options.valueOf("valorIdentico")) {
          filtroPessoaExterna.complemento1 = { eq: this.complemento1_Text.text };
        }
      }

      if (this.complemento2_Text.text.length > 0) {
        filtroPessoaExterna.complemento2 = { contains: this.complemento2_Text.text };
        subtitulo == "" ? subtitulo = "Filtrado pelo " : subtitulo += ", pelo ";
        subtitulo += "Complemento 2 (" + this.complemento2_Text.text + ")";

        if (this.valorIdentico_Options.valueOf("valorIdentico")) {
          filtroPessoaExterna.complemento2 = { eq: this.complemento2_Text.text };
        }
      }

      if (this.complemento3_Text.text.length > 0) {
        filtroPessoaExterna.complemento3 = { contains: this.complemento3_Text.text };
        subtitulo == "" ? subtitulo = "Filtrado pelo " : subtitulo += ", pelo ";
        subtitulo += "Complemento 3 (" + this.complemento3_Text.text + ")";

        if (this.valorIdentico_Options.valueOf("valorIdentico")) {
          filtroPessoaExterna.complemento3 = { eq: this.complemento3_Text.text };
        }
      }

      if (this.complemento4_Text.text.length > 0) {
        filtroPessoaExterna.complemento4 = { contains: this.complemento4_Text.text };
        subtitulo == "" ? subtitulo = "Filtrado pelo " : subtitulo += ", pelo ";
        subtitulo += "Complemento 4 (" + this.complemento4_Text.text + ")";

        if (this.valorIdentico_Options.valueOf("valorIdentico")) {
          filtroPessoaExterna.complemento4 = { eq: this.complemento4_Text.text };
        }
      }

      if (this.status_Option.itemSelected.id < 2) {
        filtroPessoaExterna.status = { eq: this.status_Option.itemSelected.id == 1 ? true : false };
        subtitulo == "" ? subtitulo = "Filtrado pelo " : subtitulo += ", pelo ";
        subtitulo += "Status (" + this.status_Option.itemSelected.text + ")";
      }

      subtitulo += " ordernado por " + this.ordenacao_Option.itemSelected.text;

      
      if( this.nome_Text.text.length == 0 &&
        this.grupo_Option.itemSelected.id == 0 &&
        this.documento_Text.text.length == 0 &&
        this.empresa_Text.text.length == 0 &&
        this.complemento1_Text.text.length == 0 &&
        this.complemento2_Text.text.length == 0 &&
        this.complemento3_Text.text.length == 0 &&
        this.complemento4_Text.text.length == 0 &&
        this.status_Option.itemSelected.id == 2){
      subtitulo = " Ordernado por " + this.ordenacao_Option.itemSelected.text;
    }

      orderPessoaExterna[this.ordenacao_Option.itemSelected.value] = SortOperationKind.ASC;

      switch (this.ordenacao_Option.itemSelected.value) {

        case "nome":
          orderPessoaExterna = { nome: SortOperationKind.ASC };
          break;

        case "entidade":
          orderPessoaExterna = { entidadeNome: SortOperationKind.ASC };
          break;

        case "grupo":
          orderPessoaExterna = { grupo: { pessoaGrupo: SortOperationKind.ASC } }
          break;

        case "status":
          orderPessoaExterna = { status: SortOperationKind.ASC };
          break;

        case "email":
          orderPessoaExterna = { email: SortOperationKind.ASC };
          break;

        case "telefone":
          orderPessoaExterna = { telefoneFixo: SortOperationKind.ASC };
          break;

        case "complemento1":
          orderPessoaExterna = { complemento1: SortOperationKind.ASC };
          break;

        case "complemento2":
          orderPessoaExterna = { complemento2: SortOperationKind.ASC };
          break;

        case "complemento3":
          orderPessoaExterna = { complemento3: SortOperationKind.ASC };
          break;

        case "complemento4":
          orderPessoaExterna = { complemento4: SortOperationKind.ASC };
          break;

        case "dataCadastro":
          orderPessoaExterna = { dataCadastro: SortOperationKind.ASC };
          break;

        case "validadeIntegracao":
          orderPessoaExterna = { integracaoInicio: SortOperationKind.ASC };
          break;

        case "validadeExameMedico":
          orderPessoaExterna = { exameMedicoInicio: SortOperationKind.ASC };
          break;

        case "validadeSeguranca":
          orderPessoaExterna = { segurancaInicio: SortOperationKind.ASC };
          break;

        case "veiculoVinculado":
          orderPessoaExterna = { integracaoInicio: SortOperationKind.ASC };
          break;
      }

      if (Object.keys(filtroPessoaExterna).length == 0) filtroPessoaExterna = null

      this.pessoaExternaService.readPessoaExternaRelat(orderPessoaExterna, filtroPessoaExterna)
        .subscribe(({ usuarioPessoaExterna }: read_PessoaExternaUsuario) => {
          const pessoaExternaNodes: PessoaExternaUsuario[] = usuarioPessoaExterna.nodes;
          this.showSpinner = false;

          const reportTotalCount = usuarioPessoaExterna.totalCount;

          const jsonFile = {
            "header": {
              "titulo": reportTituloPessoa,
              "subtitulo": subtitulo,
              "periodo": reportPeriodo,
              "organizacao": this.organizacao.organizacaoNome,
              "contador": "Total de Registros: " + reportTotalCount,
              "logoAplicacao": sessionStorage.getItem("logoApp"),
              "logoOrganizacao": this.organizacao.organizacaoLogo
            },
            "data": {
              "usuarioPessoaExterna": {
                "nodes": pessoaExternaNodes
              }
            }
          };

          var dataset = new Stimulsoft.System.Data.DataSet("JSON");

          if (this.reportSelect) {

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

    if (this.relatorioTipo == TipoVeiculo.interno) {

      if (this.periodo_Options.itemSelected.id != Periodo.indeterminado) {

        reportPeriodo = "Tempo: " +
          this.dataInicial_Text.textMasked + " " + this.horaInicial_Text.textMasked + " - " +
          this.dataFinal_Text.textMasked + " " + this.horaFinal_Text.textMasked;

        filtroVeiculoInterno.and = [{ cadastroData: { gte: (this.dataInicial_Text.formated + "T" + this.horaInicial_Text.textMasked + ":00-00:00") } },
        { cadastroData: { lte: (this.dataFinal_Text.formated + "T" + this.horaFinal_Text.textMasked + ":59-00:00") } }];
      }


      if (this.veiculoID_Text.text.length > 0) {
        filtroVeiculoInterno.placa = { contains: this.veiculoID_Text.text };
        subtitulo += ", pelo Veículo ID (" + this.veiculoID_Text.text + ")";

        if (this.valorIdentico_Options.valueOf("valorIdentico")) {
          filtroVeiculoInterno.placa = { eq: this.veiculoID_Text.text };
        }
      }

      if (this.tipoVeiculo_Option.itemSelected.id > 0) {
        filtroVeiculoInterno.tipo = { eq: this.modeloVeiculo_Option.itemSelected.id };
        subtitulo == "" ? subtitulo = "Filtrado pelo " : subtitulo += ", pelo ";
        subtitulo += "Tipo (" + this.tipoVeiculo_Option.itemSelected.text + ")";
      }

      if (this.modeloVeiculo_Option.itemSelected.id > 0) {
        filtroVeiculoInterno.modeloId = { eq: this.modeloVeiculo_Option.itemSelected.id };
        subtitulo == "" ? subtitulo = "Filtrado pelo " : subtitulo += ", pelo ";
        subtitulo += "Modelo (" + this.modeloVeiculo_Option.itemSelected.text + ")";
      }

      if (this.corVeiculo_Option.itemSelected.id > 0) {
        filtroVeiculoInterno = { cor: { contains: this.corVeiculo_Option.itemSelected.text } };
        subtitulo == "" ? subtitulo = "Filtrado pelo " : subtitulo += ", pela ";
        subtitulo += "Cor (" + this.corVeiculo_Option.itemSelected.text + ")";
      }

      if (this.grupoVeiculo_Option.itemSelected.id > 0) {
        filtroVeiculoInterno.grupoId = { eq: this.grupoVeiculo_Option.itemSelected.id };
        subtitulo == "" ? subtitulo = "Filtrado pelo " : subtitulo += ", pelo ";
        subtitulo += "Grupo (" + this.grupoVeiculo_Option.itemSelected.text + ")";
      }

      if (this.caracteristicaVeiculo_Text.text.length > 0) {
        filtroVeiculoInterno.caracteristica = { contains: this.caracteristicaVeiculo_Text.text };
        subtitulo == "" ? subtitulo = "Filtrado pela " : subtitulo += ", pela ";
        subtitulo += "Característica (" + this.caracteristicaVeiculo_Text.text + ")";

        if (this.valorIdentico_Options.valueOf("valorIdentico")) {
          filtroVeiculoInterno.placa = { eq: this.id_Text.text };
        }
      }

      if (this.tagVeiculo_Text.text.length > 0) {
        filtroVeiculoInterno.acessoCartao = { contains: this.tagVeiculo_Text.text };
        subtitulo == "" ? subtitulo = "Filtrado pela " : subtitulo += ", pela ";
        subtitulo += "Tag (" + this.tagVeiculo_Text.text + ")";

        if (this.valorIdentico_Options.valueOf("valorIdentico")) {
          filtroVeiculoInterno.placa = { eq: this.id_Text.text };
          subtitulo += "Tag (" + this.tagVeiculo_Text.text + ")";
        }
      }

      if (this.setor_Options.itemSelected.id > 0) {
        filtroVeiculoInterno.area.setorId = { eq: this.setor_Options.itemSelected.id };
        subtitulo == "" ? subtitulo = "Filtrado pelo " : subtitulo += ", pelo ";
        subtitulo += "Setor (" + this.setor_Options.itemSelected.text + ")";
      }

      if ((this.setor_Options.itemSelected.id > 0) && (this.area_Options.itemSelected.id > 0)) {
        filtroVeiculoInterno.areaId = { eq: this.area_Options.itemSelected.id };
        subtitulo == "" ? subtitulo = "Filtrado pelo " : subtitulo += ", pela ";
        subtitulo += "Área (" + this.area_Options.itemSelected.text + ")";
      }

      if (this.localizacao_Text.text.length > 0) {
        filtroVeiculoInterno.localizacao = { contains: this.localizacao_Text.text };
        subtitulo == "" ? subtitulo = "Filtrado pelo " : subtitulo += ", pela ";
        subtitulo += "Localização (" + this.localizacao_Text.text + ")";

        if (this.valorIdentico_Options.valueOf("valorIdentico")) {
          filtroVeiculoInterno.localizacao = { eq: this.localizacao_Text.text };
        }
      }

      if (this.centroCusto_Option.itemSelected.id > 0) {
        filtroVeiculoInterno.centroCustoId = { eq: this.centroCusto_Option.itemSelected.id };
        subtitulo == "" ? subtitulo = "Filtrado pelo " : subtitulo += ", pelo ";
        subtitulo += "Centro de Custo (" + this.centroCusto_Option.itemSelected.text + ")";
      }

      if (this.supervisor_Text.text.length > 0) {
        filtroVeiculoInterno.supervisor = { nome: { contains: this.supervisor_Text.text } };
        subtitulo == "" ? subtitulo = "Filtrado pelo " : subtitulo += ", pelo ";
        subtitulo += "Supervisor (" + this.supervisor_Text.text + ")";

        if (this.valorIdentico_Options.valueOf("valorIdentico")) {
          filtroVeiculoInterno.supervisor = { supervisor: { nome: { eq: this.supervisor_Text.text } } };
        }
      }

      if (this.empresa_Option.itemSelected.id > 0) {
        filtroVeiculoInterno.empresa = { nome: { eq: this.empresa_Option.itemSelected.text } };
        subtitulo == "" ? subtitulo = "Filtrado pela " : subtitulo += ", pela ";
        subtitulo += "Empresa (" + this.empresa_Option.itemSelected.text + ")";
      }

      if (this.complemento1_Text.text.length > 0) {
        filtroVeiculoInterno.complemento1 = { contains: this.complemento1_Text.text };
        subtitulo == "" ? subtitulo = "Filtrado pelo " : subtitulo += ", pelo ";
        subtitulo += "Complemento 1 (" + this.complemento1_Text.text + ")";

        if (this.valorIdentico_Options.valueOf("valorIdentico")) {
          filtroVeiculoInterno.complemento1 = { eq: this.complemento1_Text.text };
        }
      }

      if (this.complemento2_Text.text.length > 0) {
        filtroVeiculoInterno.complemento2 = { contains: this.complemento2_Text.text };
        subtitulo == "" ? subtitulo = "Filtrado pelo " : subtitulo += ", pelo ";
        subtitulo += "Complemento 2 (" + this.complemento2_Text.text + ")";

        if (this.valorIdentico_Options.valueOf("valorIdentico")) {
          filtroVeiculoInterno.complemento2 = { eq: this.complemento2_Text.text };
        }
      }

      if (this.complemento3_Text.text.length > 0) {
        filtroVeiculoInterno.complemento3 = { contains: this.complemento3_Text.text };
        subtitulo == "" ? subtitulo = "Filtrado pelo " : subtitulo += ", pelo ";
        subtitulo += "Complemento 3 (" + this.complemento3_Text.text + ")";

        if (this.valorIdentico_Options.valueOf("valorIdentico")) {
          filtroVeiculoInterno.complemento3 = { eq: this.complemento3_Text.text };
        }
      }

      if (this.complemento4_Text.text.length > 0) {
        filtroVeiculoInterno.complemento4 = { contains: this.complemento4_Text.text };
        subtitulo == "" ? subtitulo = "Filtrado pelo " : subtitulo += ", pelo ";
        subtitulo += "Complemento 4 (" + this.complemento4_Text.text + ")";

        if (this.valorIdentico_Options.valueOf("valorIdentico")) {
          filtroVeiculoInterno.complemento4 = { eq: this.complemento4_Text.text };
        }
      }

      if (this.observacao_Text.text.length > 0) {
        filtroVeiculoInterno.observacao = { contains: this.observacao_Text.text };
        subtitulo == "" ? subtitulo = "Filtrado pelo " : subtitulo += ", pela ";
        subtitulo += "Observação (" + this.observacao_Text.text + ")";

        if (this.valorIdentico_Options.valueOf("valorIdentico")) {
          filtroVeiculoInterno.observacao = { eq: this.observacao_Text.text };
        }
      }

      if (this.status_Option.itemSelected.id < 2) {
        filtroVeiculoInterno.status = { eq: this.status_Option.itemSelected.id == 1 ? true : false };
        subtitulo == "" ? subtitulo = "Filtrado pelo " : subtitulo += ", pelo ";
        subtitulo += "Status (" + this.status_Option.itemSelected.text + ")";
      }

      subtitulo += " ordernado por " + this.ordenacao_Option.itemSelected.text;

      orderVeiculoInterno[this.ordenacao_Option.itemSelected.value] = SortOperationKind.ASC;

      switch (this.ordenacao_Option.itemSelected.value) {


        case "veiculoID":
          orderVeiculoInterno = { placa: SortOperationKind.ASC };
          break;

        case "grupo":
          orderVeiculoInterno = { grupo: { veiculoInterno: SortOperationKind.ASC } };
          break;

        case "status":
          orderVeiculoInterno = { status: SortOperationKind.ASC };
          break;

        case "complemento1":
          orderVeiculoInterno = { complemento1: SortOperationKind.ASC };
          break;

        case "complemento2":
          orderVeiculoInterno = { complemento2: SortOperationKind.ASC };
          break;

        case "complemento3":
          orderVeiculoInterno = { complemento3: SortOperationKind.ASC };
          break;

        case "complemento4":
          orderVeiculoInterno = { complemento4: SortOperationKind.ASC };
          break;

        case "setor":
          orderVeiculoInterno = { setor: { setor: { nome: SortOperationKind.ASC } } };
          break;

        case "area":
          orderVeiculoInterno = { area: { nome: SortOperationKind.ASC } };
          break;

        case "tipo":
          orderVeiculoInterno = { tipo: SortOperationKind.ASC };
          break;

        case "modelo":
          orderVeiculoInterno = { modelo: { veiculoModelo: SortOperationKind.ASC } };
          break;

        case "cor":
          orderVeiculoInterno = { cor: SortOperationKind.ASC }
          break;


        case "tag":
          orderVeiculoInterno = { tag: SortOperationKind.ASC };
          break;

        case "supervisor":
          orderVeiculoInterno = { supervisor: SortOperationKind.ASC };
          break;

        case "localizacao":
          orderVeiculoInterno = { localizacao: SortOperationKind.ASC };
          break;

        case "observacao":
          orderVeiculoInterno = { observacao: SortOperationKind.ASC };
          break;

        case "site":
          orderVeiculoInterno = { area: { setor: { site: { nome: SortOperationKind.ASC } } } };
          break;

        case "abordagem":
          break;

      }

      if (Object.keys(filtroVeiculoInterno).length == 0) filtroVeiculoInterno = null

      this.veiculoInternoService.readVeiculoInternoUsuarioRelat(orderVeiculoInterno, filtroVeiculoInterno)
        .subscribe(({ usuarioVeiculoInterno }: read_VeiculoInternoUsuario) => {
          this.showSpinner = false;
          const veiculoInternoNodes: VeiculoInternoUsuario[] = usuarioVeiculoInterno.nodes.map(veiculoInterno => {
            const tipoveiculo: string = veiculoInterno.tipo + " " + VeiculoTipo[veiculoInterno.tipo]
            return { ...veiculoInterno, ...{ tipo: tipoveiculo } };
          });

          const reportTotalCount = usuarioVeiculoInterno.totalCount;

          const jsonFile = {
            "header": {
              "titulo": reportTituloVeiculo,
              "subtitulo": subtitulo,
              "periodo": reportPeriodo,
              "organizacao": this.organizacao.organizacaoNome,
              "contador": "Total de Registros: " + reportTotalCount,
              "logoAplicacao": sessionStorage.getItem("logoApp"),
              "logoOrganizacao": this.organizacao.organizacaoLogo
            },
            "data": {
              "usuarioVeiculoInterno": {
                "nodes": veiculoInternoNodes
              }
            }
          };

          var dataset = new Stimulsoft.System.Data.DataSet("JSON");

          if (this.reportSelect) {

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

        })
    }

    if (this.relatorioTipo == TipoVeiculo.externo) {

      subtitulo = "";

      if (this.periodo_Options.itemSelected.id != Periodo.indeterminado) {

        reportPeriodo = "Tempo: " +
          this.dataInicial_Text.textMasked + " " + this.horaInicial_Text.textMasked + " - " +
          this.dataFinal_Text.textMasked + " " + this.horaFinal_Text.textMasked;

        filtroVeiculoExterno.and = [{ cadastroData: { gte: (this.dataInicial_Text.formated + "T" + this.horaInicial_Text.textMasked + ":00-00:00") } },
        { cadastroData: { lte: (this.dataFinal_Text.formated + "T" + this.horaFinal_Text.textMasked + ":59-00:00") } }];
      }


      if (this.veiculoID_Text.text.length > 0) {
        filtroVeiculoExterno.placa = { contains: this.veiculoID_Text.text };
        subtitulo += "Filtrado pelo Veículo ID (" + this.veiculoID_Text.text + ")";

        if (this.valorIdentico_Options.valueOf("valorIdentico")) {
          filtroVeiculoExterno.placa = { eq: this.veiculoID_Text.text };
        }
      }

      if (this.tipoVeiculo_Option.itemSelected.id > 0) {
        filtroVeiculoExterno.tipo = { eq: this.modeloVeiculo_Option.itemSelected.id };
        subtitulo == "" ? subtitulo = "Filtrado pelo " : subtitulo += ", pelo ";
        subtitulo += "Tipo (" + this.tipoVeiculo_Option.itemSelected.text + ")";
      }

      if (this.modeloVeiculo_Option.itemSelected.id > 0) {
        filtroVeiculoExterno.modeloId = { eq: this.modeloVeiculo_Option.itemSelected.id };
        subtitulo == "" ? subtitulo = "Filtrado pelo " : subtitulo += ", pelo ";
        subtitulo += "Modelo (" + this.modeloVeiculo_Option.itemSelected.text + ")";
      }

      if (this.corVeiculo_Option.itemSelected.id > 0) {
        filtroVeiculoExterno = { cor: { contains: this.corVeiculo_Option.itemSelected.text } };
        subtitulo == "" ? subtitulo = "Filtrado pelo " : subtitulo += ", pela ";
        subtitulo += "Cor (" + this.corVeiculo_Option.itemSelected.text + ")";
      }

      if (this.grupoVeiculo_Option.itemSelected.id > 0) {
        filtroVeiculoExterno.grupoId = { eq: this.grupoVeiculo_Option.itemSelected.id };
        subtitulo == "" ? subtitulo = "Filtrado pelo " : subtitulo += ", pelo ";
        subtitulo += "Grupo (" + this.grupoVeiculo_Option.itemSelected.text + ")";
      }

      if (this.caracteristicaVeiculo_Text.text.length > 0) {
        filtroVeiculoExterno.caracteristica = { contains: this.caracteristicaVeiculo_Text.text };
        subtitulo == "" ? subtitulo = "Filtrado pela " : subtitulo += ", pela ";
        subtitulo += "Característica (" + this.caracteristicaVeiculo_Text.text + ")";

        if (this.valorIdentico_Options.valueOf("valorIdentico")) {
          filtroVeiculoExterno.placa = { eq: this.id_Text.text };
        }
      }

      if (this.empresa_Text.text.length > 0) {
        filtroVeiculoExterno.entidadeNome = { contains: this.empresa_Text.text };
        subtitulo == "" ? subtitulo = "Filtrado pelo " : subtitulo += ", pela ";
        subtitulo += "Empresa (" + this.empresa_Text.text + ")";


        if (this.valorIdentico_Options.valueOf("valorIdentico")) {
          filtroVeiculoExterno.complemento1 = { eq: this.complemento1_Text.text };
        }
      }

      if (this.complemento1_Text.text.length > 0) {
        filtroVeiculoExterno.complemento1 = { contains: this.complemento1_Text.text };
        subtitulo == "" ? subtitulo = "Filtrado pelo " : subtitulo += ", pelo ";
        subtitulo += "Complemento 1 (" + this.complemento1_Text.text + ")";

        if (this.valorIdentico_Options.valueOf("valorIdentico")) {
          filtroVeiculoExterno.complemento1 = { eq: this.complemento1_Text.text };
        }
      }

      if (this.complemento2_Text.text.length > 0) {
        filtroVeiculoExterno.complemento2 = { contains: this.complemento2_Text.text };
        subtitulo == "" ? subtitulo = "Filtrado pelo " : subtitulo += ", pelo ";
        subtitulo += "Complemento 2 (" + this.complemento2_Text.text + ")";

        if (this.valorIdentico_Options.valueOf("valorIdentico")) {
          filtroVeiculoExterno.complemento2 = { eq: this.complemento2_Text.text };
        }
      }

      if (this.complemento3_Text.text.length > 0) {
        filtroVeiculoExterno.complemento3 = { contains: this.complemento3_Text.text };
        subtitulo == "" ? subtitulo = "Filtrado pelo " : subtitulo += ", pelo ";
        subtitulo += "Complemento 3 (" + this.complemento3_Text.text + ")";

        if (this.valorIdentico_Options.valueOf("valorIdentico")) {
          filtroVeiculoExterno.complemento3 = { eq: this.complemento3_Text.text };
        }
      }

      if (this.complemento4_Text.text.length > 0) {
        filtroVeiculoExterno.complemento4 = { contains: this.complemento4_Text.text };
        subtitulo == "" ? subtitulo = "Filtrado pelo " : subtitulo += ", pelo ";
        subtitulo += "Complemento 4 (" + this.complemento4_Text.text + ")";

        if (this.valorIdentico_Options.valueOf("valorIdentico")) {
          filtroVeiculoExterno.complemento4 = { eq: this.complemento4_Text.text };
        }
      }

      if (this.observacao_Text.text.length > 0) {
        filtroVeiculoExterno.observacao = { contains: this.observacao_Text.text };
        subtitulo == "" ? subtitulo = "Filtrado pelo " : subtitulo += ", pela ";
        subtitulo += "Observação (" + this.observacao_Text.text + ")";

        if (this.valorIdentico_Options.valueOf("valorIdentico")) {
          filtroVeiculoExterno.observacao = { eq: this.observacao_Text.text };
        }
      }

      if (this.status_Option.itemSelected.id < 2) {
        filtroVeiculoExterno.status = { eq: this.status_Option.itemSelected.id == 1 ? true : false };
        subtitulo == "" ? subtitulo = "Filtrado pelo " : subtitulo += ", pelo ";
        subtitulo += "Status (" + this.status_Option.itemSelected.text + ")";
      }

      subtitulo += " ordernado por " + this.ordenacao_Option.itemSelected.text;


      if(this.veiculoID_Text.text.length == 0 &&
        this.tipoVeiculo_Option.itemSelected.id == 0 &&
        this.modeloVeiculo_Option.itemSelected.id == 0 &&
        this.corVeiculo_Option.itemSelected.id == 0 &&
        this.grupoVeiculo_Option.itemSelected.id == 0 &&
        this.caracteristicaVeiculo_Text.text.length == 0 &&
        this.tagVeiculo_Text.text.length == 0 &&
        this.setor_Options.itemSelected.id == 0 && 
        this.area_Options.itemSelected.id == 0 &&
        this.localizacao_Text.text.length == 0 &&
        this.centroCusto_Option.itemSelected.id == 0 &&
        this.supervisor_Text.text.length == 0 &&
        this.empresa_Option.itemSelected.id == 0 &&
        this.complemento1_Text.text.length == 0 &&
        this.complemento2_Text.text.length == 0 &&
        this.complemento3_Text.text.length == 0 &&
        this.complemento4_Text.text.length == 0 &&
        this.observacao_Text.text.length == 0 &&
        this.status_Option.itemSelected.id == 2){
          subtitulo = " Ordernado por " + this.ordenacao_Option.itemSelected.text;
      }

      orderVeiculoExterno[this.ordenacao_Option.itemSelected.value] = SortOperationKind.ASC;

      switch (this.ordenacao_Option.itemSelected.value) {


        case "veiculoID":
          orderVeiculoExterno = { placa: SortOperationKind.ASC };
          break;

        case "grupo":
          orderVeiculoExterno = { grupo: { veiculoInterno: SortOperationKind.ASC } };
          break;

        case "status":
          orderVeiculoExterno = { status: SortOperationKind.ASC };
          break;

        case "complemento1":
          orderVeiculoExterno = { complemento1: SortOperationKind.ASC };
          break;

        case "complemento2":
          orderVeiculoExterno = { complemento2: SortOperationKind.ASC };
          break;

        case "complemento3":
          orderVeiculoExterno = { complemento3: SortOperationKind.ASC };
          break;

        case "complemento4":
          orderVeiculoExterno = { complemento4: SortOperationKind.ASC };
          break;

        case "tipo":
          orderVeiculoExterno = { tipo: SortOperationKind.ASC };
          break;

        case "modelo":
          orderVeiculoExterno = { modelo: { veiculoModelo: SortOperationKind.ASC } };
          break;

        case "cor":
          orderVeiculoExterno = { cor: SortOperationKind.ASC }
          break;

        case "observacao":
          orderVeiculoExterno = { observacao: SortOperationKind.ASC };
          break;


        case "abordagem":
          break;

      }

      if (Object.keys(filtroVeiculoExterno).length == 0) filtroVeiculoExterno = null

      this.veiculoExternoService.readVeiculoExternoUsuarioRelat(orderVeiculoExterno, filtroVeiculoExterno)
        .subscribe(({ usuarioVeiculoExterno }: read_VeiculoExternoUsuario) => {
          this.showSpinner = false;
          const veiculoExternoNodes: VeiculoExternoUsuario[] = usuarioVeiculoExterno.nodes.map(veiculoExterno => {
            const tipoveiculo: string = veiculoExterno.tipo + " " + VeiculoTipo[veiculoExterno.tipo]
            return { ...veiculoExterno, ...{ tipo: tipoveiculo } };
          });

          const reportTotalCount = usuarioVeiculoExterno.totalCount;

          const jsonFile = {
            "header": {
              "titulo": reportTituloVeiculo,
              "subtitulo": subtitulo,
              "periodo": reportPeriodo,
              "organizacao": this.organizacao.organizacaoNome,
              "contador": "Total de Registros: " + reportTotalCount,
              "logoAplicacao": sessionStorage.getItem("logoApp"),
              "logoOrganizacao": this.organizacao.organizacaoLogo
            },
            "data": {
              "usuarioVeiculoExterno": {
                "nodes": veiculoExternoNodes
              }
            }
          };

          var dataset = new Stimulsoft.System.Data.DataSet("JSON");

          if (this.reportSelect) {

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

        })
    }

    if (this.relatorioTipo == 6) {

      subtitulo = "";

      if (this.periodo_Options.itemSelected.id != Periodo.indeterminado) {

        reportPeriodo = "Tempo: " +
          this.dataInicial_Text.textMasked + " " + this.horaInicial_Text.textMasked + " - " +
          this.dataFinal_Text.textMasked + " " + this.horaFinal_Text.textMasked;

        filtroEmpresa.and = [{ dataCadastro: { gte: (this.dataInicial_Text.formated + "T" + this.horaInicial_Text.textMasked + ":00-00:00") } },
        { dataCadastro: { lte: (this.dataFinal_Text.formated + "T" + this.horaFinal_Text.textMasked + ":59-00:00") } }];
      }

      if (this.nome_Text.text.length > 0) {
        filtroEmpresa.nome = { contains: this.nome_Text.text };
        subtitulo += "Filtrado pelo Nome (" + this.nome_Text.text + ")";

        if (this.valorIdentico_Options.valueOf("valorIdentico")) {
          filtroEmpresa.nome = { eq: this.nome_Text.text };
        }
      }

      if (this.grupoEmpresa_Option.itemSelected.id > 0) {
        filtroEmpresa.grupoId = { eq: this.grupoEmpresa_Option.itemSelected.id };
        subtitulo == "" ? subtitulo = "Filtrado pelo " : subtitulo += ", pelo ";
        subtitulo += "Grupo (" + this.grupoEmpresa_Option.itemSelected.text + ")";
      }

      if (this.complemento1_Text.text.length > 0) {
        filtroEmpresa.complemento1 = { contains: this.complemento1_Text.text };
        subtitulo == "" ? subtitulo = "Filtrado pelo " : subtitulo += ", pelo ";
        subtitulo += "Complemento 1 (" + this.complemento1_Text.text + ")";

        if (this.valorIdentico_Options.valueOf("valorIdentico")) {
          filtroEmpresa.complemento1 = { eq: this.complemento1_Text.text };
        }
      }

      if (this.complemento2_Text.text.length > 0) {
        filtroEmpresa.complemento2 = { contains: this.complemento2_Text.text };
        subtitulo == "" ? subtitulo = "Filtrado pelo " : subtitulo += ", pelo ";
        subtitulo += "Complemento 2 (" + this.complemento2_Text.text + ")";

        if (this.valorIdentico_Options.valueOf("valorIdentico")) {
          filtroEmpresa.complemento2 = { eq: this.complemento2_Text.text };
        }
      }

      subtitulo += " ordernado por " + this.ordenacao_Option.itemSelected.text;

      if(this.nome_Text.text.length == 0 &&
        this.grupoEmpresa_Option.itemSelected.id == 0 &&
        this.complemento1_Text.text.length == 0 &&
        this.complemento2_Text.text.length == 0 ){
          subtitulo = " Ordernado por " + this.ordenacao_Option.itemSelected.text;
      }

      switch (this.ordenacao_Option.itemSelected.value) {

        case "nome":
          orderEmpresa = { nome: SortOperationKind.ASC };
          break;

        case "grupo":
          orderEmpresa = { empresaGrupo: { empresaGrupo: SortOperationKind.ASC } };
          break;

        case "complemento1":
          orderEmpresa = { complemento1: SortOperationKind.ASC };
          break;

        case "complemento2":
          orderEmpresa = { complemento2: SortOperationKind.ASC };
          break;

        case "dataCadastro":
          orderEmpresa = { dataCadastro: SortOperationKind.ASC };
          break;

        case "gestor":
          orderEmpresa = { gestor: SortOperationKind.ASC };
          break;

        case "telefone":
          orderEmpresa = { telefone1: SortOperationKind.ASC };
          break;

        case "email":
          orderEmpresa = { email: SortOperationKind.ASC };
          break;

        case "pessoaInternaVinculada":
          orderEmpresa = { pessoaInterna: { nome: SortOperationKind.ASC } };
          break;
      }

      if (Object.keys(filtroEmpresa).length == 0) filtroEmpresa = null;

      this.empresaReparticaoService.readEmpresaReparticaoRelat(orderEmpresa, filtroEmpresa)
        .subscribe(({ reparticaoEmpresa }: read_EmpresaReparticao) => {
          const reparticaoEmpresaNodes: EmpresaReparticao[] = reparticaoEmpresa.nodes;

          this.showSpinner = false;

          const reportTotalCount = reparticaoEmpresa.totalCount;

          const jsonFile = {
            "header": {
              "titulo": reportTituloEmpresa,
              "subtitulo": subtitulo,
              "periodo": reportPeriodo,
              "organizacao": this.organizacao.organizacaoNome,
              "contador": "Total de Registros: " + reportTotalCount,
              "logoAplicacao": sessionStorage.getItem("logoApp"),
              "logoOrganizacao": this.organizacao.organizacaoLogo
            },
            "data": {
              "reparticaoEmpresa": {
                "nodes": reparticaoEmpresaNodes
              }
            }
          };

          var dataset = new Stimulsoft.System.Data.DataSet("JSON");

          if (this.reportSelect) {

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
        })
    }

    if (this.relatorioTipo == 7) {

      if (this.tipoArea_Option.itemSelected.id > 0) {
        filtroArea.tipo = { eq: this.tipoArea_Option.itemSelected.id };
        subtitulo == "" ? subtitulo = "Filtrado pelo " : subtitulo += ", pelo ";
        subtitulo += "Tipo de Área (" + this.tipoArea_Option.itemSelected.text + ")";
      }

      if (this.setor_Options.itemSelected.id > 0) {
        filtroArea.setorId = { eq: this.setor_Options.itemSelected.id };
        subtitulo == "" ? subtitulo = "Filtrado pelo " : subtitulo += ", pelo ";
        subtitulo += "Setor (" + this.setor_Options.itemSelected.text + ")";
      }

      if ((this.setor_Options.itemSelected.id > 0) && (this.area_Options.itemSelected.id > 0)) {
        filtroArea.id = { eq: this.area_Options.itemSelected.id };
        subtitulo == "" ? subtitulo = "Filtrado pelo " : subtitulo += ", pela ";
        subtitulo += "Área (" + this.area_Options.itemSelected.text + ")";
      }

      subtitulo += " ordernado por " + this.ordenacao_Option.itemSelected.text;

      orderArea[this.ordenacao_Option.itemSelected.value] = SortOperationKind.ASC;

      switch (this.ordenacao_Option.itemSelected.value) {

        case "tipo":
          orderArea = { tipo: SortOperationKind.ASC };
          break;

        case "setor":
          orderArea = { setor: { nome: SortOperationKind.ASC } };
          break;

        case "area":
          orderArea = { nome: SortOperationKind.ASC };
          break;

        case "localizacao":
          orderArea = { localizacao: SortOperationKind.ASC };
          break;

        case "site":
          orderArea = { setor: { site: { nome: SortOperationKind.ASC } } };
          break;

        case "volumePermitido":
          orderArea = { volumePermitido: SortOperationKind.ASC };
          break;

      }

      if (Object.keys(filtroArea).length == 0) filtroArea = null;

      this.areaReparticaoService.readAreaReparticaoRelat(orderArea, filtroArea)
        .subscribe(({ reparticaoArea }: read_AreaReparticao) => {
          this.showSpinner = false;
          const reparticaoAreaNodes: AreaReparticao[] = reparticaoArea.nodes.map(areaTipo => {
            const tipoArea: string = areaTipo.tipo + " " + TipoAreaSigla[areaTipo.tipo]
            return { ...areaTipo, ...{ tipo: tipoArea } }
          });

          const reportTotalCount = reparticaoArea.totalCount;

          const jsonFile = {
            "header": {
              "titulo": reportTituloArea,
              "subtitulo": subtitulo,
              "periodo": reportPeriodo,
              "organizacao": this.organizacao.organizacaoNome,
              "contador": "Total de Registros: " + reportTotalCount,
              "logoAplicacao": sessionStorage.getItem("logoApp"),
              "logoOrganizacao": this.organizacao.organizacaoLogo
            },
            "data": {
              "reparticaoArea": {
                "nodes": reparticaoAreaNodes
              }
            }
          };

          var dataset = new Stimulsoft.System.Data.DataSet("JSON");

          if (this.reportSelect) {

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
        })

    }

    if (this.relatorioTipo == 8) {

      if (this.estacionamento_Option.itemSelected.id > 0) {
        filtroEstacionamento.estacionamentoId = { eq: this.estacionamento_Option.itemSelected.id };
        subtitulo == "" ? subtitulo = "Filtrado pelo " : subtitulo += ", pelo ";
        subtitulo += "Estacionamento (" + this.estacionamento_Option.itemSelected.text + ")";
      }

      if (this.garagem_Option.itemSelected.id > 0) {
        filtroEstacionamento.garagem = { eq: this.garagem_Option.itemSelected.text };
        subtitulo == "" ? subtitulo = "Filtrado pelo " : subtitulo += ", pela ";
        subtitulo += "Garagem (" + this.garagem_Option.itemSelected.text + ")";
      }

      if ((this.tipoGaragem_Option.itemSelected.id > 0) && (this.tipoGaragem_Option.itemSelected.id > 0)) {
        filtroEstacionamento.tipoGaragem = { eq: this.tipoGaragem_Option.itemSelected.id };
        subtitulo == "" ? subtitulo = "Filtrado pelo " : subtitulo += ", pelo ";
        subtitulo += "Tipo de Garagem (" + this.tipoGaragem_Option.itemSelected.text + ")";
      }

      switch (this.ordenacao_Option.itemSelected.value) {

        case "estacionamento":
          orderEstacionamento = { estacionamento: {nome: SortOperationKind.ASC }};
          break;

        case "setor":
          orderEstacionamento = { estacionamento:{setor:{nome:SortOperationKind.ASC}}};
          break;

        case "site":
          orderEstacionamento = { estacionamento:{setor:{site:{nome: SortOperationKind.ASC}}}};
          break;

        case "localizacao":
          orderEstacionamento = { localizacao: SortOperationKind.ASC };
          break;

        case "areaVinculada":
          orderEstacionamento = { areaVinculada:{nome: SortOperationKind.ASC} };
          break;

        case "tipoGaragem":
          orderEstacionamento = { tipoGaragem: SortOperationKind.ASC };
          break;

        case "garagem":
          orderEstacionamento = { garagem: SortOperationKind.ASC };
          break;

        case "pessoaVinculada":
          orderEstacionamento = { pessoaInterna:{nome: SortOperationKind.ASC } };
          break;

        case "veiculoVinculado":
          orderEstacionamento = { veiculoInterno:{placa: SortOperationKind.ASC } };
          break;


      }

      if (Object.keys(filtroEstacionamento).length == 0) filtroEstacionamento = null;

      this.estacionamentoService.readEstacionamentoVagasRelat(orderEstacionamento, filtroEstacionamento)
        .subscribe(({ reparticaoEstacionamentoVaga }: read_EstacionamentoVaga) => {
          this.showSpinner = false;
          const reparticaoEstacionamentoNodes: EstacionamentoVaga[] = reparticaoEstacionamentoVaga.nodes.map(garagemTipo => {
            const tipoGaragem: string = garagemTipo.tipoGaragem + " " + TipoVagaEstacionamento[garagemTipo.tipoGaragem]
            return { ...garagemTipo, ...{ tipoGaragem: tipoGaragem } }
          });

          const reportTotalCount = reparticaoEstacionamentoVaga.totalCount;

          const jsonFile = {
            "header": {
              "titulo": reportTituloEstacionamento,
              "subtitulo": subtitulo,
              "periodo": reportPeriodo,
              "organizacao": this.organizacao.organizacaoNome,
              "contador": "Total de Registros: " + reportTotalCount,
              "logoAplicacao": sessionStorage.getItem("logoApp"),
              "logoOrganizacao": this.organizacao.organizacaoLogo
            },
            "data": {
              "reparticaoEstacionamentoVaga": {
                "nodes": reparticaoEstacionamentoNodes
              }
            }
          };

          var dataset = new Stimulsoft.System.Data.DataSet("JSON");

          if (this.reportSelect) {

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

    if (this.relatorioTipo == 9){

      if (this.nivel_Text.text.length > 0) {
        filtroNivelAcesso.nome = { contains: this.nivel_Text.text };
        subtitulo += ", pelo Nível  (" + this.nivel_Text.text + ")";

        if (this.valorIdentico_Options.valueOf("valorIdentico")) {
          filtroNivelAcesso.nome = { eq: this.nivel_Text.text };
        }
      }

      if (this.restrito_Option.itemSelected.id < 2) {
        filtroNivelAcesso.tipo = { eq: this.restrito_Option.itemSelected.id };
        subtitulo == "" ? subtitulo = "Filtrado pelo " : subtitulo += ", pelo ";
        subtitulo += "Restrito (" + this.restrito_Option.itemSelected.text + ")";
      }

      if (this.observacao_Text.text.length > 0) {
        filtroNivelAcesso.observacao = { contains: this.observacao_Text.text };
        subtitulo += ", pela Observação  (" + this.observacao_Text.text + ")";

        if (this.valorIdentico_Options.valueOf("valorIdentico")) {
          filtroNivelAcesso.observacao = { eq: this.observacao_Text.text };
        }
      }

        if (this.status_Option.itemSelected.id < 2) {
        filtroNivelAcesso.status = { eq: this.status_Option.itemSelected.id == 1 ? true : false };
        subtitulo == "" ? subtitulo = "Filtrado pelo " : subtitulo += ", pelo ";
        subtitulo += "Status (" + this.status_Option.itemSelected.text + ")";
      }

      switch (this.ordenacao_Option.itemSelected.value) {

        case "nivelAcesso":
          orderNivelAcesso = {nome: SortOperationKind.ASC };
          break;

        case "restrito":
          orderNivelAcesso = { tipo: SortOperationKind.ASC};
          break;

        case "validade":
          orderNivelAcesso = { validadeInicial: SortOperationKind.ASC , validadeFinal: SortOperationKind.ASC};
          break;

        case "status":
          orderNivelAcesso = { status: SortOperationKind.ASC };
          break;

        case "observacao":
          orderNivelAcesso = {observacao: SortOperationKind.ASC};
          break;

      }


      if (Object.keys(filtroNivelAcesso).length == 0) filtroNivelAcesso = null;
      
      this.nivelAcessoService.readNivelAcessoConcessaoRelat(orderNivelAcesso, filtroNivelAcesso)
        .subscribe(({ concessaoNivelAcesso }: read_NivelAcessoConcessao) => {
          this.showSpinner = false;
          const concessaoNivelAcessoNodes : NivelAcessoConcessao[] = concessaoNivelAcesso.nodes;


          const reportTotalCount = concessaoNivelAcesso.totalCount;

          const jsonFile = {
            "header": {
              "titulo": reportTituloNivelAcesso,
              "subtitulo": subtitulo,
              "periodo": reportPeriodo,
              "organizacao": this.organizacao.organizacaoNome,
              "contador": "Total de Registros: " + reportTotalCount,
              "logoAplicacao": sessionStorage.getItem("logoApp"),
              "logoOrganizacao": this.organizacao.organizacaoLogo
            },
            "data": {
              "concessaoNivelAcesso": {
                "nodes": concessaoNivelAcessoNodes
              }
            }
          };

          var dataset = new Stimulsoft.System.Data.DataSet("JSON");

          if (this.reportSelect) {

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
    this.listView_Usuario.processingShow();
    this.gestaoUsuarioService.getReports(this.relatorioTipo, estilo)
      .subscribe((report: Report[]) => {
        this.actionbuttomService.enableButtons(0);
        this.listView_Usuario.gridUpdate(report);
      });
  }

  onResize() {
    const maxHeightPanel = document.getElementById('gestaoUsuario_Panel')?.clientHeight;
    const maxHeightTab = maxHeightPanel - 135;

    const tabFiltroPessoaInterna = document.getElementById('tabFiltroPessoaInterna');
    const tabFiltroPessoaExterna = document.getElementById('tabFiltroPessoaExterna');
    const tabFiltroVeiculoInterno = document.getElementById('tabFiltroVeiculoInterno');
    const tabFiltroVeiculoExterno = document.getElementById('tabFiltroVeiculoExterno');
    const tabFiltroEmpresa = document.getElementById('tabFiltroEmpresa');

    tabFiltroPessoaInterna.style.maxHeight = maxHeightTab + 'px';
    tabFiltroPessoaExterna.style.maxHeight = maxHeightTab + 'px';
    tabFiltroVeiculoInterno.style.maxHeight = maxHeightTab + 'px';
    tabFiltroVeiculoExterno.style.maxHeight = maxHeightTab + 'px';
    tabFiltroEmpresa.style.maxHeight = maxHeightTab + 'px';
  }


  onClose_Click() {
    this.actionbuttomService.hideForm()
    this.nome_Text.clear();
    this.nivel_Text.clear();
    this.documento_Text.clear();
    this.contrato_Text.clear();
    this.localizacao_Text.clear();
    this.cartao_Text.clear();
    this.id_Text.clear();
    this.veiculoID_Text.clear();
    this.observacao_Text.clear();
    this.siteCode_Text.clear();
    this.tagVeiculo_Text.clear();
    this.tipoVeiculo_Option.select(0);
    this.tipoArea_Option.select(0);
    this.restrito_Option.select(2);
    this.tipoGaragem_Option.select(0);
    this.modeloVeiculo_Option.select(0);
    this.corVeiculo_Option.select(0);
    this.caracteristicaVeiculo_Text.clear();
    this.localizacao_Text.clear();
    this.setor_Options.select(0);
    this.area_Options.select(0);
    this.grupo_Option.select(0);
    this.grupoVeiculo_Option.select(0);
    this.grupoEmpresa_Option.select(0);
    this.abordagem_Option.select(0);
    this.complemento1_Text.clear();
    this.complemento2_Text.clear();
    this.complemento3_Text.clear();
    this.complemento4_Text.clear();
    this.estacionamento_Option.select(0);
    this.garagem_Option.select(0);
    this.status_Option.select(2);
    this.empresa_Option.select(0);
    this.empresa_Text.clear();
    this.supervisor_Text.clear();
    this.dia_Option.select(0);
    this.mes_Option.select(0);
    this.ano_Option.select(0);
    this.dataInicial_Text.clear();
    this.dataFinal_Text.clear();
    this.horaInicial_Text.clear();
    this.horaFinal_Text.clear();
    this.centroCusto_Option.select(0);
    this.periodo_Options.select(0);
    this.valorIdentico_Options.reset();
    this.tabsGestaoUsuario_Option.select("tabFiltro");
  }

  ngOnDestroy(): void {
    this.treeviewItem?.unsubscribe();
  }

}