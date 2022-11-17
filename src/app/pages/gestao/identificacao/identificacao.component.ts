import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import { ListViewGrid, rowSelect } from 'src/app/@theme/components/grid/list-view/service/list-view.service';
import { AlertServiceComponent } from 'src/app/@theme/components/form/alert-card/service/alert-card.service';
import { ActionButtomService } from 'src/app/@theme/components/grid/action-buttom/service/action-button.service';
import { InputLabel } from 'src/app/@theme/components/form/input-label/service/input-label.service';
import { ComboOptions, Item } from 'src/app/@theme/components/form/combobox/service/combobox.service';
import { OptionsGroup } from 'src/app/@theme/components/form/select-group/service/select-group.service';
import { TabsService } from 'src/app/@theme/layouts/tabs/service/tabs.service';
import { Stimulsoft } from 'stimulsoft-reports-js/Scripts/stimulsoft.viewer';

import { GestaoIdentificacao,
         GestaoIdentificacaoData,
         GestaoRelatorioGraficoFilter,
         read_GestaoRelatorioConsolidado,
         read_GestaoRelatorioGrafico,Report } from 'src/app/@core/data/gestao-identificacao';

import { FiltroIdentificacao } from 'src/app/@core/enum';
import { BehaviorSubject } from 'rxjs';
import { TreeviewService } from 'src/app/@theme/layouts/treeview/service/treeview.service';

import { read_VeiculoModeloGrupo,
         VeiculoModeloGrupo,
         VeiculoModeloGrupoData } from 'src/app/@core/data/grupo-veiculo-modelo';

import { read_VeiculoGrupo, 
         VeiculoGrupo, 
         VeiculoGrupoData, 
         VeiculoGrupoSort } from 'src/app/@core/data/grupo-veiculo';

import { IdentificacaoControle,
         IdentificacaoControleArqFilter,
         IdentificacaoControleData,
         IdentificacaoControleFilter,
         IdentificacaoControleSort,
         read_IdentificacaoControle,
         read_IdentificacaoControleArq } from 'src/app/@core/data/controle-identificacao';

import { SortOperationKind } from 'src/app/@core/api/generic-graphql';
import { DateOperator } from 'src/app/@theme/components/miscellaneous/date-operator/date-operator';

import { ConfigStorage,
         OrganizacaoConfig,
         PlataformaConfig,
         SiteConfig } from 'src/app/@core/storage/config/config';

import { PessoaGrupo,
         PessoaGrupoData,
         PessoaGrupoSort,
         read_PessoaGrupo } from 'src/app/@core/data/grupo-pessoa';

import { read_Site,
         Site,
         SiteData } from 'src/app/@core/data/reparticao-site';

import { read_RecepcaoReparticao,
         RecepcaoData,
         RecepcaoReparticao,
         RecepcaoReparticaoSort } from 'src/app/@core/data/reparticao-recepcao';

import { NivelOperacaoData,
         NivelOperacaoEx,
         Operador } from 'src/app/@core/data/operador-nivel-operacao';

import { OperadorConfiguracao,
         OperadorConfiguracaoData,
         OperadorConfiguracaoFilter,
         OperadorConfiguracaoSort,
         read_OperadorConfiguracao } from 'src/app/@core/data/configuracao-operador-operador';

import { IdentificacaoGrupo,
         IdentificacaoGrupoData,
         IdentificacaoGrupoFilter,
         IdentificacaoGrupoSort,
         read_IdentificacaoGrupo } from 'src/app/@core/data/grupo-identificacao';

import { PessoaInternaModalService } from 'src/app/@theme/modals/pessoa-interna/service/pessoa-modal.service';
import { PessoaInternaUsuario } from 'src/app/@core/data/usuario-pessoa-interna';
import { PessoaExternaModalService } from 'src/app/@theme/modals/pessoa-externa/service/pessoa-modal.service';
import { PessoaExternaUsuario } from 'src/app/@core/data/usuario-pessoa-externa';

import { AreaReparticao, 
         AreaReparticaoData, 
         AreaReparticaoFilter, 
         AreaReparticaoSort, 
         read_AreaReparticao } from 'src/app/@core/data/reparticao-area';

import { CentroCustoGrupo, 
         CentroCustoGrupoData, 
         CentroCustoGrupoSort, 
         read_CentroCustoGrupo } from 'src/app/@core/data/grupo-centro-custo';

import { EstacionamentoVaga, 
         EstacionamentoVagaData, 
         EstacionamentoVagaFilter, 
         EstacionamentoVagaSort, 
         read_EstacionamentoVaga } from 'src/app/@core/data/reparticao-vaga-estacionamento';

enum Periodo {
  "dia" = 0,
  "mes" = 1,
  "ano" = 2,
  "periodo" = 3
}

@Component({
  selector: 'nex-gestao-identificacao',
  templateUrl: 'identificacao.component.html',
  styleUrls: ['identificacao.component.scss'],
  host: { '(window:resize)': 'onResize()' }
})
export class GestaoIdentificacaoComponent implements AfterViewInit, OnDestroy {

  dateOperator: DateOperator = new DateOperator();

  id: number = 0;
  siteId: number;
  siteNome: string;
  reportSelect: string;
  pessoaId: number = 0;
  operadorId: number = 0;
  visitadoId: number = 0;
  autorizanteId: number = 0;




  // filtro
  identificacaoSite_Option: ComboOptions = new ComboOptions();
  identificacaoTipo_Option: ComboOptions = new ComboOptions();
  identificacaoOrigem_Option: ComboOptions = new ComboOptions();
  identificacaoLocal_Option: ComboOptions = new ComboOptions();
  identificacaoOperador_Text: InputLabel = new InputLabel();
  identificacaoMotivo_Option: ComboOptions = new ComboOptions();
  identificacaoId_Text: InputLabel = new InputLabel();
  pessoaTipo_Option: ComboOptions = new ComboOptions();
  pessoaNome_Text: InputLabel = new InputLabel();
  pessoaDocumento_Text: InputLabel = new InputLabel();
  pessoaGrupo_Option: ComboOptions = new ComboOptions();
  pessoaEntidade_Text: InputLabel = new InputLabel();
  pessoaComplemento1_Text: InputLabel = new InputLabel();
  pessoaComplemento2_Text: InputLabel = new InputLabel();
  pessoaComplemento3_Text: InputLabel = new InputLabel();
  pessoaComplemento4_Text: InputLabel = new InputLabel();
  veiculoTipo_Option: ComboOptions = new ComboOptions();
  veiculoClasse_Option: ComboOptions = new ComboOptions();
  veiculoIdPlaca_Text: InputLabel = new InputLabel();
  veiculoModelo_Option: ComboOptions = new ComboOptions();
  veiculoCor_Option: ComboOptions = new ComboOptions();
  veiculoGrupo_Option: ComboOptions = new ComboOptions();
  veiculoComplemento1_Text: InputLabel = new InputLabel();
  veiculoComplemento2_Text: InputLabel = new InputLabel();
  veiculoComplemento3_Text: InputLabel = new InputLabel();
  veiculoComplemento4_Text: InputLabel = new InputLabel();
  visitadoNome_Text: InputLabel = new InputLabel();
  visitadoArea_Option: ComboOptions = new ComboOptions();
  visitadoCentroCusto_Option: ComboOptions = new ComboOptions();
  autorizanteNome_Text: InputLabel = new InputLabel();
  estacionamentoNome_Option: ComboOptions = new ComboOptions();
  estacionamentoVaga_Option: ComboOptions = new ComboOptions();
  areaReservada_Option: ComboOptions = new ComboOptions();
  observacao_Text: InputLabel = new InputLabel();
  valorIdentico_Options: OptionsGroup = new OptionsGroup();
  // final filtro

  // periodo
  periodo_Options: ComboOptions = new ComboOptions();
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
  listView_Identificacao: ListViewGrid = new ListViewGrid();
  gestaoIdentificacao: GestaoIdentificacao;
  tabsGestaoIdentificacao_Option: TabsService = new TabsService();

  relatorioTipo: string;
  dataAtual: Date = new Date();

  showReport: boolean = false;
  gridElement: HTMLElement;
  formElement: HTMLElement;

  settings: BehaviorSubject<any>;

  plataforma: PlataformaConfig;
  organizacao: OrganizacaoConfig;

  pessoaOperadorModalService: PessoaInternaModalService = new PessoaInternaModalService();
  pessoaInternaModalService: PessoaInternaModalService = new PessoaInternaModalService();
  pessoaVisitadoModalService: PessoaInternaModalService = new PessoaInternaModalService();
  pessoaAutorizanteModalService: PessoaInternaModalService = new PessoaInternaModalService();
  pessoaExternaModalService: PessoaExternaModalService = new PessoaExternaModalService();
  
  modeloRelatorio: string;

  filtroGrafico: GestaoRelatorioGraficoFilter = {};
  headerAgrupamento: string;
  headerInformacao: string;

  reportPath: string;

  alertService: AlertServiceComponent = new AlertServiceComponent();

  constructor(public actionbuttomService: ActionButtomService,
    private identificacaoControleService: IdentificacaoControleData,
    private gestaoIdentificacaoService: GestaoIdentificacaoData,
    private veiculoModeloGrupoService: VeiculoModeloGrupoData,
    private areaReparticaoService: AreaReparticaoData,
    private pessoaGrupoService: PessoaGrupoData,
    private veiculoGrupoService: VeiculoGrupoData,
    private siteReparticaoService: SiteData,
    private recepcaoReparticaoService: RecepcaoData,
    private estacionamentoVagaService: EstacionamentoVagaData,
    private areaService: AreaReparticaoData,
    private identificacaoMotivoService: IdentificacaoGrupoData,
    private nivelOperacao: NivelOperacaoData,
    private operador: OperadorConfiguracaoData,
    private centroCustoService: CentroCustoGrupoData,
    private treeviewService: TreeviewService,
    private configStorage: ConfigStorage,) {

    this.settings = this.configStorage.siteSubject();
    this.treeviewItem = this.treeviewService.itemSubject();

    this.tabsGestaoIdentificacao_Option.add("tabFiltro", "Filtro", true);
    this.tabsGestaoIdentificacao_Option.add("tabPeriodo", "Tempo", false, "block");

    this.actionbuttomService.recurso = "3A";
    this.actionbuttomService.relationGrid = "lstGestaoIdentificacao";
    this.actionbuttomService.top_action_buttons = [{ "id": 0, "text": "forms.buttons.issue", "enabled": false, "visibled": false, "condition": "select", "openForm": true, "editable": "yes" }]

    this.listView_Identificacao.name = "lstGestaoIdentificacao";
    this.listView_Identificacao.title = "Lista de Relatórios de Identificação";
    this.listView_Identificacao.grid = [{ "header": "Código", "field": "codigo", "width": 10, "align": "left" },
    { "header": "Estilo", "field": "estilo", "width": 10, "align": "left" },
    { "header": "Informações", "field": "informacoes", "width": 80, "align": "left" }];

    this.pessoaOperadorModalService.name = "pessoaModal";
    this.pessoaOperadorModalService.pesquisaPessoa_Option.name = "cbPesquisaPessoaInterna";

    this.pessoaOperadorModalService.grid = [{ "header": "Nome", "field": "nome", "width": 50, "align": "left" },
    { "header": "Área", "entity": "area", "field": "nome", "width": 25, "align": "left" },
    { "header": "Setor", "entity": ["area", "setor"], "field": "nome", "width": 25, "align": "left" }];


    this.pessoaInternaModalService.name = "pessoaModal";
    this.pessoaInternaModalService.pesquisaPessoa_Option.name = "cbPesquisaPessoaInterna";

    this.pessoaInternaModalService.grid = [{ "header": "Nome", "field": "nome", "width": 50, "align": "left" },
    { "header": "Área", "entity": "area", "field": "nome", "width": 25, "align": "left" },
    { "header": "Setor", "entity": ["area", "setor"], "field": "nome", "width": 25, "align": "left" }];


    this.pessoaAutorizanteModalService.name = "pessoaModal";
    this.pessoaAutorizanteModalService.pesquisaPessoa_Option.name = "cbPesquisaPessoaInterna";

    this.pessoaAutorizanteModalService.grid = [{ "header": "Nome", "field": "nome", "width": 50, "align": "left" },
    { "header": "Área", "entity": "area", "field": "nome", "width": 25, "align": "left" },
    { "header": "Setor", "entity": ["area", "setor"], "field": "nome", "width": 25, "align": "left" }];


    this.pessoaVisitadoModalService.name = "pessoaModal";
    this.pessoaVisitadoModalService.pesquisaPessoa_Option.name = "cbPesquisaPessoaInterna";

    this.pessoaVisitadoModalService.grid = [{ "header": "Nome", "field": "nome", "width": 50, "align": "left" },
    { "header": "Área", "entity": "area", "field": "nome", "width": 25, "align": "left" },
    { "header": "Setor", "entity": ["area", "setor"], "field": "nome", "width": 25, "align": "left" }];


    this.pessoaExternaModalService.name = "pessoaModal";
    this.pessoaExternaModalService.pesquisaPessoa_Option.name = "cbPesquisaPessoaExterna";    

    this.pessoaExternaModalService.grid = [
      { "header": "Nome", "field": "nome", "width": 25, "align": "left" },
      { "header": "Grupo", "entity": "grupo", "field": "pessoaGrupo", "width": 25, "align": "left" },
      { "header": "Telefone Fixo", "field": "telefoneFixo", "width": 25, "align": "left" },
      { "header": "Email", "field": "email", "width": 25, "align": "left" }];



    // inicio Filtro

    this.identificacaoSite_Option.name = "cbIdentificacaoSite";

    this.settings
    .subscribe((site: SiteConfig) => {
      if (site != null) {
        this.siteId = site.id;
        this.siteNome = site.nome;
      }
    });

    this.siteReparticaoService.orderBy = { nome: SortOperationKind.ASC };
    this.siteReparticaoService.where = null;

    this.siteReparticaoService.read()
      .subscribe(({ reparticaoSite }: read_Site) => {

        const operador: Operador = this.nivelOperacao.getOperadorNome();
        const siteCount: number = reparticaoSite.totalCount;

        if (operador.id == 0) {

          this.identificacaoSite_Option.add("", null, 0);

          const siteNodes: Site[] = reparticaoSite.nodes;
          siteNodes.forEach(site => {
            this.identificacaoSite_Option.add(site.nome, site.nome, site.id);
          })

        } else {

          const operadorOrder: OperadorConfiguracaoSort = null;
          const operadorFilter: OperadorConfiguracaoFilter = { operadorPessoaId: { eq: operador.id } };
          this.operador.readOperadorConfiguracaos(operadorOrder, operadorFilter)
            .subscribe(({ operador }: read_OperadorConfiguracao) => {

              const operadorLogin: OperadorConfiguracao = operador.nodes[0];
              const nivelOperacaoEx: NivelOperacaoEx[] = operadorLogin.nivelOperacao.nivelOperacaoEx

              if (nivelOperacaoEx.length == siteCount)
                this.identificacaoSite_Option.add("", null, 0);

              nivelOperacaoEx.forEach(nivelOperacao => {
                this.identificacaoSite_Option.add(nivelOperacao.site.nome, nivelOperacao.site.nome, nivelOperacao.site.id);
              })
            })
        }

      })

    this.identificacaoTipo_Option.name = "cbIdentificacaoTipo";
    this.identificacaoTipo_Option.add("", null, 0, true);
    this.identificacaoTipo_Option.add("VISITA", "visita", 1, false);
    this.identificacaoTipo_Option.add("P.SERVIÇOS", "prestacaoServicos", 2, false);
    this.identificacaoTipo_Option.add("PROVISÓRIO", "provisorio", 3, false);

    this.identificacaoOrigem_Option.name = "cbIdentificacaoOrigem";
    this.identificacaoOrigem_Option.add("", null, 0, true);
    this.identificacaoOrigem_Option.add("NEXCON", "nexcon", 1, false);
    this.identificacaoOrigem_Option.add("NEXNOTE", "nexnote", 2, false);
    this.identificacaoOrigem_Option.add("NEXIUN", "nexiun", 3, false);
    this.identificacaoOrigem_Option.add("NEXFLOW", "nexflow", 4, false);
    this.identificacaoOrigem_Option.add("NEXMOVE", "nexmove", 5, false);
    this.identificacaoOrigem_Option.add("INTEGRATION", "integration", 6, false);

    this.identificacaoLocal_Option.name = "cbIdentificacaoLocal";
    this.identificacaoLocal_Option.add("", null, 0, true);

    const sortRecepcao: RecepcaoReparticaoSort = {nome: SortOperationKind.ASC};

    this.recepcaoReparticaoService.readRecepcaoReparticao(sortRecepcao, null)
      .subscribe(({reparticaoRecepcao}: read_RecepcaoReparticao) =>{
        const recepcaoReparticaoNodes: RecepcaoReparticao [] = reparticaoRecepcao.nodes;
        recepcaoReparticaoNodes.forEach(recepcao => {
          this.identificacaoLocal_Option.add(recepcao.nome,recepcao.nome,recepcao.id);
        })
      })

    this.identificacaoOperador_Text.name = "txtIdentificacaoOperador";
    this.identificacaoOperador_Text.rules = "uppercase";
    this.identificacaoOperador_Text.maxLength = 50;
    this.identificacaoOperador_Text.minLength = 0;
    this.identificacaoOperador_Text.disable();


    this.identificacaoMotivo_Option.name = "cbIdentificacaoMotivo";
    this.identificacaoMotivo_Option.add("", null, 0, true);

    const identificacaoMotivoSort: IdentificacaoGrupoSort = { motivo: SortOperationKind.ASC };
    const identificacaoMotivoFilter: IdentificacaoGrupoFilter = null;

    this.identificacaoMotivoService.readIdentificacaoGrupos(identificacaoMotivoSort, identificacaoMotivoFilter)
      .subscribe(({ grupoIdentificacaoMotivo }: read_IdentificacaoGrupo) => {
        const grupoIdentificacaoMotivoNodes: IdentificacaoGrupo[] = grupoIdentificacaoMotivo.nodes;
        grupoIdentificacaoMotivoNodes.forEach(grupoIdentificacaoMotivo => {
          this.identificacaoMotivo_Option.add(grupoIdentificacaoMotivo.motivo, grupoIdentificacaoMotivo.motivo, grupoIdentificacaoMotivo.id);
        })
      });

    this.identificacaoId_Text.name = "txtIdentificacaoId";
    this.identificacaoId_Text.rules = "onlynumbers";
    this.identificacaoId_Text.maxLength = 50;
    this.identificacaoId_Text.minLength = 0;

    this.pessoaTipo_Option.name = "cbPessoaTipo";
    this.pessoaTipo_Option.add("", null, 0, true);
    this.pessoaTipo_Option.add("INTERNA", "interna", 1, false);
    this.pessoaTipo_Option.add("EXTERNA", "externa", 2, false);
    if(this.pessoaTipo_Option.itemSelected.id == 0){
      this.pessoaNome_Text.findButtonDisabled = true;
    }

    this.pessoaNome_Text.name = "txtPessoaNome";
    this.pessoaNome_Text.rules = "uppercase";
    this.pessoaNome_Text.maxLength = 50;
    this.pessoaNome_Text.minLength = 0;
    this.pessoaNome_Text.disable();

    this.pessoaDocumento_Text.name = "txtPessoaDocumento";
    this.pessoaDocumento_Text.rules = "uppercase";
    this.pessoaDocumento_Text.maxLength = 50;
    this.pessoaDocumento_Text.minLength = 0;

    this.pessoaGrupo_Option.name = "cbPessoaGrupo";
    this.pessoaGrupo_Option.add("", null, 0, true);

    const grupoOrder: PessoaGrupoSort = { pessoaGrupo: SortOperationKind.ASC };

    this.pessoaGrupoService.readPessoaGrupos(grupoOrder, null)
      .subscribe(({ grupoPessoa }: read_PessoaGrupo) => {
        const grupoPessoasNodes: PessoaGrupo[] = grupoPessoa.nodes;
        grupoPessoasNodes.forEach(grupoPessoa => {
          this.pessoaGrupo_Option.add(grupoPessoa.pessoaGrupo, grupoPessoa.pessoaGrupo, grupoPessoa.id);
        })
      })

    this.pessoaEntidade_Text.name = "txtPessoaEntidade";
    this.pessoaEntidade_Text.rules = "uppercase";
    this.pessoaEntidade_Text.maxLength = 50;
    this.pessoaEntidade_Text.minLength = 0;

    this.pessoaComplemento1_Text.name = "txtPessoaComplemento1";
    this.pessoaComplemento1_Text.rules = "uppercase";
    this.pessoaComplemento1_Text.maxLength = 50;
    this.pessoaComplemento1_Text.minLength = 0;

    this.pessoaComplemento2_Text.name = "txtPessoaComplemento2";
    this.pessoaComplemento2_Text.rules = "uppercase";
    this.pessoaComplemento2_Text.maxLength = 50;
    this.pessoaComplemento2_Text.minLength = 0;

    this.pessoaComplemento3_Text.name = "txtPessoaComplemento3";
    this.pessoaComplemento3_Text.rules = "uppercase";
    this.pessoaComplemento3_Text.maxLength = 50;
    this.pessoaComplemento3_Text.minLength = 0;

    this.pessoaComplemento4_Text.name = "txtPessoaComplemento4";
    this.pessoaComplemento4_Text.rules = "uppercase";
    this.pessoaComplemento4_Text.maxLength = 50;
    this.pessoaComplemento4_Text.minLength = 0;

    this.veiculoTipo_Option.name = "cbVeiculoTipo";
    this.veiculoTipo_Option.add("", null, 0, true);
    this.veiculoTipo_Option.add("INTERNO", "interna", 1, false);
    this.veiculoTipo_Option.add("EXTERNO", "externa", 2, false);

    this.veiculoClasse_Option.name = "cbVeiculoClasse";
    this.veiculoClasse_Option.add("", null, 0, true);
    this.veiculoClasse_Option.addRange<Item>(this.veiculoGrupoService.veiculoTipo);

    this.veiculoIdPlaca_Text.name = "veiculoIdPlaca";
    this.veiculoIdPlaca_Text.rules = "uppercase";
    this.veiculoIdPlaca_Text.maxLength = 10;
    this.veiculoIdPlaca_Text.minLength = 0;

    this.veiculoModelo_Option.name = "cbVeiculoModelo";
    this.veiculoModelo_Option.add("", null, 0, true);

    this.veiculoModeloGrupoService.readVeiculoModeloGrupos({ veiculoModelo: SortOperationKind.ASC })
      .subscribe(({ grupoVeiculoModelo }: read_VeiculoModeloGrupo) => {
        const veiculoModeloGrupos: VeiculoModeloGrupo[] = grupoVeiculoModelo.nodes;
        veiculoModeloGrupos.forEach(veiculoModelo => {
          this.veiculoModelo_Option.add(veiculoModelo.veiculoModelo, veiculoModelo.veiculoModelo, veiculoModelo.id);
        })
      })

    this.veiculoCor_Option.name = "cbVeiculoCor";
    this.veiculoCor_Option.add("", null, 0, true);
    this.veiculoCor_Option.addRange<Item>(this.veiculoGrupoService.veiculoCor);

    this.veiculoGrupo_Option.name = "cbVeiculoGrupo";
    this.veiculoGrupo_Option.clear();
    this.veiculoGrupo_Option.add("", null, 0, true);

    const sortVeiculoGrupo: VeiculoGrupoSort = { veiculoGrupo: SortOperationKind.ASC }

    this.veiculoGrupoService.readVeiculoGrupos(sortVeiculoGrupo, null)
    .subscribe(({ grupoVeiculo }: read_VeiculoGrupo) => {
      const nodes: VeiculoGrupo[] = grupoVeiculo.nodes;
      nodes.forEach((node: VeiculoGrupo) => {
        this.veiculoGrupo_Option.add(node.veiculoGrupo, node.veiculoGrupo, node.id)
      })

    });

    this.veiculoComplemento1_Text.name = "txtVeiculoComplemento1";
    this.veiculoComplemento1_Text.rules = "uppercase";
    this.veiculoComplemento1_Text.maxLength = 50;
    this.veiculoComplemento1_Text.minLength = 0;

    this.veiculoComplemento2_Text.name = "txtVeiculoComplemento2";
    this.veiculoComplemento2_Text.rules = "uppercase";
    this.veiculoComplemento2_Text.maxLength = 50;
    this.veiculoComplemento2_Text.minLength = 0;

    this.veiculoComplemento3_Text.name = "txtVeiculoComplemento3";
    this.veiculoComplemento3_Text.rules = "uppercase";
    this.veiculoComplemento3_Text.maxLength = 50;
    this.veiculoComplemento3_Text.minLength = 0;

    this.veiculoComplemento4_Text.name = "txtVeiculoComplemento4";
    this.veiculoComplemento4_Text.rules = "uppercase";
    this.veiculoComplemento4_Text.maxLength = 50;
    this.veiculoComplemento4_Text.minLength = 0;

    this.visitadoNome_Text.name = "txtVisitadoNome";
    this.visitadoNome_Text.rules = "uppercase";
    this.visitadoNome_Text.maxLength = 50;
    this.visitadoNome_Text.minLength = 0;
    this.visitadoNome_Text.disable();


    this.visitadoArea_Option.name = "cbVisitadoArea";
    this.visitadoArea_Option.clear();
    this.visitadoArea_Option.add("","", 0);

    const sortArea: AreaReparticaoSort = {nome: SortOperationKind.ASC};
    const filterArea: AreaReparticaoFilter = {setor:{siteId:{eq: this.siteId}}};

    this.areaReparticaoService.readAreaReparticao(sortArea,filterArea)
      .subscribe(({reparticaoArea}: read_AreaReparticao) => {
       const areaReparticaoNodes: AreaReparticao[] = reparticaoArea.nodes;
       areaReparticaoNodes.forEach(areaNode => {
        this.visitadoArea_Option.add(areaNode.nome,areaNode.nome,areaNode.id);
       }); 
      });

    this.visitadoCentroCusto_Option.name = "cbVeiculoCentroCusto";
    this.visitadoCentroCusto_Option.clear();
    this.visitadoCentroCusto_Option.add("", null, 0, true);

    const centroCustoVeiculoOrder: CentroCustoGrupoSort = { centroCusto: SortOperationKind.ASC };

    this.centroCustoService.readCentroCustoGrupos(centroCustoVeiculoOrder, null)
      .subscribe(({ grupoCentroCusto }: read_CentroCustoGrupo) => {
        const centroCustoNodes: CentroCustoGrupo[] = grupoCentroCusto.nodes;
        centroCustoNodes.forEach(centroCusto => {
          this.visitadoCentroCusto_Option.add(centroCusto.centroCusto, centroCusto.centroCusto, centroCusto.id);
        })
      })

    this.autorizanteNome_Text.name = "txtAutorizanteNome";
    this.autorizanteNome_Text.rules = "uppercase";
    this.autorizanteNome_Text.maxLength = 50;
    this.autorizanteNome_Text.minLength = 0;
    this.autorizanteNome_Text.disable();

    this.valorIdentico_Options.add(0, "Valor Idêntico", "valorIdentico");

    this.estacionamentoNome_Option.name = "cbEstacionamentoNome";

    this.estacionamentoNome_Option.clear();
    this.estacionamentoNome_Option.add("", "", 0, true);

    const areaEstacionamentoSort: AreaReparticaoSort = { nome: SortOperationKind.ASC };
    const areaEstacionamentoFilter: AreaReparticaoFilter = { setor: { siteId: { eq: this.siteId } }, tipo: { eq: 3 } };

    this.areaService.readAreaReparticao(areaEstacionamentoSort, areaEstacionamentoFilter)
      .subscribe(({ reparticaoArea }: read_AreaReparticao) => {
        const reparticaoAreaNodes: AreaReparticao[] = reparticaoArea.nodes;
        reparticaoAreaNodes.forEach(areaReparticao => {
          this.estacionamentoNome_Option.add(areaReparticao.nome, areaReparticao.nome, areaReparticao.id)
        })
        this.onGaragem_Click();
      });



    this.estacionamentoVaga_Option.name = "cbEstacionamentoVaga";
    this.estacionamentoVaga_Option.add("", null, 0, true);



    this.areaReservada_Option.name = "cbAreaReservada";
    this.areaReservada_Option.clear();
    this.areaReservada_Option.add("", null, 0, true);

    const areaReservadaSort: AreaReparticaoSort = { nome: SortOperationKind.ASC };
    const areaReservadaFilter: AreaReparticaoFilter = { setor: { siteId: { eq: this.siteId } }, tipo: { eq: 2 } };

    this.areaService.readAreaReparticao(areaReservadaSort, areaReservadaFilter)
    .subscribe(({ reparticaoArea }: read_AreaReparticao) => {
      const reparticaoAreaNodes: AreaReparticao[] = reparticaoArea.nodes;
      reparticaoAreaNodes.forEach(areaReparticao => {
        this.areaReservada_Option.add(areaReparticao.nome, areaReparticao.nome, areaReparticao.id)
      });
    });


    this.observacao_Text.name = "txtObservacao";
    this.observacao_Text.rules = "uppercase";
    this.observacao_Text.maxLength = 50;
    this.observacao_Text.minLength = 0;

    // Filtro

    // Inicio periodo

    this.periodo_Options.add("Dia", "dia", 0);
    this.periodo_Options.add("Mês", "mes", 1);
    this.periodo_Options.add("Ano", "ano", 2);
    this.periodo_Options.add("Período", "periodo", 3);


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

    this.horaFinal_Text.name = "txtHoraFinal";
    this.horaFinal_Text.rules = "time";
    this.horaFinal_Text.regex = "time";
    this.horaFinal_Text.maxLength = 5;

    //Fim Periodo

    this.ordenacao_Option.name = "cbOrdenacaoRelatorio";
    this.ordenacao_Option.add("Data/Hora da Identificação", "identificacao", 1, true);

    this.plataforma = <PlataformaConfig>this.configStorage.getConfig("plataforma");
    this.organizacao = <OrganizacaoConfig>this.configStorage.getConfig("organizacao");



    this.treeviewItem
      .subscribe((relatorioTipo: string) => {
        switch (relatorioTipo) {

          case FiltroIdentificacao.vigenteSimples:

            this.relatorioTipo = "jr4lCO2Oc0";
            this.listView_Identificacao.title = "Lista de Relatórios de Eventos de Identificação";
            this.actionbuttomService.showHideButton(1);

            const reportEstiloVigente: string = (relatorioTipo == FiltroIdentificacao.vigenteSimples) ? "Simples" : "Agrupado";
            this.update_Grid(reportEstiloVigente);
            break;

          case FiltroIdentificacao.expiradaSimples:

            this.relatorioTipo = "Vz3eGqB+xk";
            this.listView_Identificacao.title = "Lista de Relatórios de Eventos de Identificação";
            this.actionbuttomService.showHideButton(1);

            const reportEstiloExpirado: string = (relatorioTipo == FiltroIdentificacao.expiradaSimples) ? "Simples" : "Agrupado";
            this.update_Grid(reportEstiloExpirado);
            break;


          case FiltroIdentificacao.suspensaSimples:

            this.relatorioTipo = "QRDlsnoUrk";
            this.listView_Identificacao.title = "Lista de Relatórios de Eventos de Identificação";
            this.actionbuttomService.showHideButton(1);

            const reportEstiloSuspensa: string = (relatorioTipo == FiltroIdentificacao.suspensaSimples) ? "Simples" : "Agrupado";
            this.update_Grid(reportEstiloSuspensa);
            break;


          case FiltroIdentificacao.provisoriaSimples:

            this.relatorioTipo = "3IICDLaBZU";
            this.listView_Identificacao.title = "Lista de Relatórios de Eventos de Identificação";
            this.actionbuttomService.showHideButton(1);

            const reportEstiloProvisorio: string = (relatorioTipo == FiltroIdentificacao.provisoriaSimples) ? "Simples" : "Agrupado";
            this.update_Grid(reportEstiloProvisorio);
            break;


          case FiltroIdentificacao.canceladaSimples:
            this.relatorioTipo = "Zl7IgvPOpk";
            this.listView_Identificacao.title = "Lista de Relatórios de Eventos de Identificação";
            this.actionbuttomService.showHideButton(1);

            const reportEstiloCancelada: string = (relatorioTipo == FiltroIdentificacao.canceladaSimples) ? "Simples" : "Agrupado";
            this.update_Grid(reportEstiloCancelada);
            break;


          case FiltroIdentificacao.encerradaSimples:
            this.relatorioTipo = "qZTQiqA8/U";
            this.listView_Identificacao.title = "Lista de Relatórios de Eventos de Identificação";
            this.actionbuttomService.showHideButton(1);

            const reportEstiloEncerrada: string = (relatorioTipo == FiltroIdentificacao.encerradaSimples) ? "Simples" : "Agrupado";
            this.update_Grid(reportEstiloEncerrada);
            break;

          case FiltroIdentificacao.historicoSimples:
            this.relatorioTipo = "Yw9zuvFZJU";
            this.listView_Identificacao.title = "Lista de Relatórios de Eventos de Identificação";
            this.actionbuttomService.showHideButton(1);

            const reportEstiloHistorico: string = (relatorioTipo == FiltroIdentificacao.historicoSimples) ? "Simples" : "Agrupado";
            this.update_Grid(reportEstiloHistorico);
            break;



          // case FiltroIdentificacao.vigenteConsolidado:
          // case FiltroIdentificacao.expiradaConsolidado:
          // case FiltroIdentificacao.suspensaConsolidado:
          // case FiltroIdentificacao.provisoriaConsolidado:
          // case FiltroIdentificacao.canceladaConsolidado:
          // case FiltroIdentificacao.encerradaConsolidado:
          // case FiltroIdentificacao.historicoConsolidado:
          //   this.periodoId = periodoId;
          //   this.listView_Identificacao.title = "Lista de Relatórios Consolidados";
          //   this.actionbuttomService.showHideButton(1);
          //   this.update_Grid("Consolidado");            
          //   break;

          // case FiltroIdentificacao.vigenteGrafico:
          // case FiltroIdentificacao.expiradaGrafico:
          // case FiltroIdentificacao.suspensaGrafico:
          // case FiltroIdentificacao.provisoriaGrafico:
          // case FiltroIdentificacao.canceladaGrafico:
          // case FiltroIdentificacao.encerradaGrafico:
          // case FiltroIdentificacao.historicoSGrafico:
          //   this.periodoId = periodoId;
          //   this.listView_Identificacao.title = "Lista de Relatórios Gráficos";
          //   this.actionbuttomService.showHideButton(1);
          //   this.update_Grid("Grafico");            
          //   break;

          default:
            this.relatorioTipo = null;
            this.actionbuttomService.showHideButton(0);
            this.listView_Identificacao.title = "Identificação";
            this.listView_Identificacao.clear();
            break;
        }
      });
  }

  ngAfterViewInit(): void {
    this.onResize();
  }

  onEstacionamento_Click() {
    if (this.estacionamentoNome_Option.itemSelected.id >= 0) {
        this.estacionamentoVaga_Option.clear();
        this.estacionamentoVaga_Option.add("", "", 0);
      }
  }

  onEstacionamento_Populate() {
    this.estacionamentoNome_Option.clear();
    this.estacionamentoNome_Option.add("", "", 0, true);

    this.estacionamentoNome_Option.itemSelected.text = "Aguarde! Carregando...";

    const areaEstacionamentoSort: AreaReparticaoSort = { nome: SortOperationKind.ASC };
    const areaEstacionamentoFilter: AreaReparticaoFilter = { setor: { siteId: { eq: this.siteId } }, tipo: { eq: 3 } };

    this.areaService.readAreaReparticao(areaEstacionamentoSort, areaEstacionamentoFilter)
      .subscribe(({ reparticaoArea }: read_AreaReparticao) => {
        const reparticaoAreaNodes: AreaReparticao[] = reparticaoArea.nodes;

        this.estacionamentoNome_Option.itemSelected.text = "";

        reparticaoAreaNodes.forEach(areaReparticao => {
          this.estacionamentoNome_Option.add(areaReparticao.nome, areaReparticao.nome, areaReparticao.id)
        });
        this.onGaragem_Click();
      });
  }

  onGaragem_Click() {
    this.estacionamentoVaga_Option.clear();
    this.estacionamentoVaga_Option.add("", "", 0, true);

    const garagemSort: EstacionamentoVagaSort = { garagem: SortOperationKind.ASC };
    const garagemFilter: EstacionamentoVagaFilter = { estacionamentoId: { eq: this.estacionamentoNome_Option.itemSelected.id } };

    this.estacionamentoVagaService.readEstacionamentoVagas(garagemSort, garagemFilter)
      .subscribe(({ reparticaoEstacionamentoVaga }: read_EstacionamentoVaga) => {
        const estacionamentoNodes: EstacionamentoVaga[] = reparticaoEstacionamentoVaga.nodes;
        estacionamentoNodes.forEach(estacionamento => {
          this.estacionamentoVaga_Option.add(estacionamento.garagem, estacionamento.garagem, estacionamento.id);
        });
      });
  }


  onPessoaTipo_Change(){
    if(this.pessoaTipo_Option.itemSelected.id != 0){
      this.pessoaNome_Text.clear();
      this.pessoaId = 0;
      this.pessoaNome_Text.findButtonDisabled = false;
    } else {
      this.pessoaNome_Text.clear();
      this.pessoaId = 0;
      this.pessoaNome_Text.findButtonDisabled = true;
    }
  }

  onActionButtom_Click(actionButtomSelect: any) {
    switch (actionButtomSelect.text) {
      case "forms.buttons.issue": {
        this.onPeriodo_Change();
        break;
      }
    }
  }

  onListView_Change(rowSelect?: rowSelect) {
    if (rowSelect.registro) {
      this.id = rowSelect.id;

      this.modeloRelatorio = rowSelect.registro.codigo;
      this.reportPath = "./assets/reports/identificacao/";

      this.reportSelect = this.reportPath + rowSelect.registro.codigo + ".mrt";

      this.ordenacao_Option.clear();
      this.ordenacao_Option.add("Data/Hora da Identificação", "identificacaoDataHora", 0);

      // if(rowSelect.registro.estilo != "Consolidado" && rowSelect.registro.estilo != "Grafico") {
      //   this.periodo_Options.itens = [];
      //   this.periodo_Options.add(Periodo.dia, "Dia", "dia", true);
      //   this.periodo_Options.add(Periodo.mes, "Mês", "mes");
      //   this.periodo_Options.add(Periodo.ano, "Ano", "ano");
      //   this.periodo_Options.add(Periodo.periodo, "Período", "periodo");    
      // } else {
      //   this.periodo_Options.itens = [];
      //   this.periodo_Options.add(Periodo.dia, "Dia", "dia", true);
      //   this.periodo_Options.add(Periodo.mes, "Mês", "mes");
      //   this.periodo_Options.add(Periodo.periodo, "Período", "periodo");    
      // }

      this.headerInformacao = null;

      switch (this.modeloRelatorio) {
        case "R1ID-1001":
          this.ordenacao_Option.add("Nome", "pessoaNome", 1);
          this.ordenacao_Option.add("Grupo", "pessoaGrupo", 2);
          this.ordenacao_Option.add("Empresa", "pessoaReparticao", 3);
          this.ordenacao_Option.add("Pessoa Visitada", "visitadoNome", 4);
          this.ordenacao_Option.add("Área Visitada", "visitadoAreaNome", 5);
          break;

        case "R1ID-1002":
          this.ordenacao_Option.add("Nome", "pessoaNome", 1);
          this.ordenacao_Option.add("Grupo", "pessoaGrupo", 2);
          this.ordenacao_Option.add("Identificador", "identificador", 3);
          this.ordenacao_Option.add("Pessoa Visitada", "visitadoNome", 4);
          this.ordenacao_Option.add("Área Visitada", "visitadoUnidadeNome", 5);
          break;

        case "R1ID-1003":
          this.ordenacao_Option.add("Nome", "pessoaNome", 1);
          this.ordenacao_Option.add("Empresa", "pessoaReparticao", 2);
          this.ordenacao_Option.add("Identificador", "identificador", 3);
          this.ordenacao_Option.add("Pessoa Visitada", "visitadoNome", 4);
          this.ordenacao_Option.add("Área Visitada", "visitadoUnidadeNome", 5);
          break;

        case "R1ID-1004":
          this.ordenacao_Option.add("Nome", "pessoaNome", 1);
          this.ordenacao_Option.add("Empresa", "pessoaReparticao", 2);
          this.ordenacao_Option.add("Pessoa Visitada", "visitadoNome", 3);
          this.ordenacao_Option.add("Área Visitada", "visitadoAreaNome", 4);
          this.ordenacao_Option.add("Autorizante", "autorizanteNome", 5);
          break;

        case "R1ID-1005":
          this.ordenacao_Option.add("Nome", "pessoaNome", 1);
          this.ordenacao_Option.add("Empresa", "pessoaReparticao", 2);
          this.ordenacao_Option.add("Pessoa Visitada", "visitadoNome", 3);
          this.ordenacao_Option.add("Área Visitada", "visitadoAreaNome", 4);
          this.ordenacao_Option.add("Motivo", "motivo", 5);
          break;

        case "R1ID-1006":
          this.ordenacao_Option.add("Nome", "pessoaNome", 1);
          this.ordenacao_Option.add("Empresa", "pessoaReparticao", 2);
          this.ordenacao_Option.add("Pessoa Visitada", "visitadoNome", 3);
          this.ordenacao_Option.add("Área Visitada", "visitadoAreaNome", 4);
          this.ordenacao_Option.add("Recepção", "identificacaoLocalNome", 5);
          break;

        case "R1ID-1007":
          this.ordenacao_Option.add("Nome", "pessoaNome", 1);
          this.ordenacao_Option.add("Empresa", "pessoaReparticao", 2);
          this.ordenacao_Option.add("Pessoa Visitada", "visitadoNome", 3);
          this.ordenacao_Option.add("Área Visitada", "visitadoAreaNome", 4);
          this.ordenacao_Option.add("Operador", "identificacaoOperadorNome", 5);
          break;

        case "R1ID-1008":
          this.ordenacao_Option.add("Nome", "pessoaNome", 1);
          this.ordenacao_Option.add("Empresa", "pessoaReparticao", 2);
          this.ordenacao_Option.add("Pessoa Visitada", "visitadoNome", 3);
          this.ordenacao_Option.add("Área Visitada", "visitadoAreaNome", 4);
          this.ordenacao_Option.add("Centro Custo", "visitadoCentroCusto", 5);
          break;

        case "R1ID-1009":
          this.ordenacao_Option.add("Nome", "pessoaNome", 1);
          this.ordenacao_Option.add("Empresa", "pessoaReparticao", 2);
          this.ordenacao_Option.add("Complemento 1", "pessoaComplemento1", 3);
          this.ordenacao_Option.add("Pessoa Visitada", "visitadoNome", 4);
          this.ordenacao_Option.add("Área Visitada", "visitadoAreaNome", 5);
          break;

        case "R1ID-1010":
          this.ordenacao_Option.add("Nome", "pessoaNome", 1);
          this.ordenacao_Option.add("Empresa", "pessoaReparticao", 2);
          this.ordenacao_Option.add("Complemento 2", "pessoaComplemento2", 3);
          this.ordenacao_Option.add("Pessoa Visitada", "visitadoNome", 4);
          this.ordenacao_Option.add("Área Visitada", "visitadoÁreaNome", 5);
          break;

        case "R1ID-1011":
          this.ordenacao_Option.add("Nome", "pessoaNome", 1);
          this.ordenacao_Option.add("Empresa", "pessoaReparticao", 2);
          this.ordenacao_Option.add("Complemento 3", "pessoaComplemento3", 3);
          this.ordenacao_Option.add("Pessoa Visitada", "visitadoNome", 4);
          this.ordenacao_Option.add("Área Visitada", "visitadoAreaNome", 5);
          break;

        case "R1ID-1012":
          this.ordenacao_Option.add("Nome", "pessoaNome", 1);
          this.ordenacao_Option.add("Empresa", "pessoaReparticao", 2);
          this.ordenacao_Option.add("Complemento 4", "pessoaComplemento4", 3);
          this.ordenacao_Option.add("Pessoa Visitada", "visitadoNome", 4);
          this.ordenacao_Option.add("Área Visitada", "visitadoAreaNome", 5);
          break;

        case "R1ID-1013":
          this.ordenacao_Option.add("Nome", "pessoaNome", 1);
          this.ordenacao_Option.add("Empresa", "pessoaReparticao", 2);
          this.ordenacao_Option.add("Veículo", "veiculo", 3);
          this.ordenacao_Option.add("Pessoa Visitada", "visitadoNome", 4);
          this.ordenacao_Option.add("Área Visitada", "visitadoAreaNome", 5);
          break;

        case "R1ID-1014":
          this.ordenacao_Option.add("Nome", "pessoaNome", 1);
          this.ordenacao_Option.add("Empresa", "pessoaReparticao", 2);
          this.ordenacao_Option.add("Veículo", "veiculo", 3);
          this.ordenacao_Option.add("Pessoa Visitada", "visitadoNome", 4);
          this.ordenacao_Option.add("Estacionamento", "estacionamento", 5);
          this.ordenacao_Option.add("Vaga", "garagemVaga", 6);

          break;

        case "R1ID-1015":
          this.ordenacao_Option.add("Nome", "pessoaNome", 1);
          this.ordenacao_Option.add("Empresa", "pessoaReparticao", 2);
          this.ordenacao_Option.add("Veículo", "veiculo", 3);
          this.ordenacao_Option.add("Área Visitada", "visitadoUnidadeNome", 4);
          this.ordenacao_Option.add("Estacionamento", "estacionamentoNome", 5);
          this.ordenacao_Option.add("Vaga", "garagemVaga", 6);
          break;

        case "R1ID-1016":
          this.ordenacao_Option.add("Nome", "pessoaNome", 1);
          this.ordenacao_Option.add("Empresa", "pessoaReparticao", 2);
          this.ordenacao_Option.add("Pessoa Visitada", "visitadoNome", 3);
          this.ordenacao_Option.add("Observação", "observacao", 4);
          break;

        case "R1ID-1017":
          this.ordenacao_Option.add("Nome", "pessoaNome", 1);
          this.ordenacao_Option.add("Complemento 1", "pessoaComplemento1", 2);
          this.ordenacao_Option.add("Complemento 2", "pessoaComplemento2", 3);
          this.ordenacao_Option.add("Complemento 3", "pessoaComplemento3", 4);
          this.ordenacao_Option.add("Complemento 4", "pessoaComplemento4", 5);
          break;

        case "R1ID-1018":
          this.ordenacao_Option.add("Recepção", "identificacaoLocalNome", 1);
          this.ordenacao_Option.add("ID", "id", 2);
          this.ordenacao_Option.add("Nome", "pessoaNome", 3);
          this.ordenacao_Option.add("Empresa", "pessoaReparticao", 5);
          this.ordenacao_Option.add("Pessoa Visitada", "visitadoNome", 6);
          this.ordenacao_Option.add("Área Visitada", "visitadoAreaNome", 7);
          break;

        case "R1ID-1019":
          this.ordenacao_Option.add("Recepção", "identificacaoLocalNome", 1);
          this.ordenacao_Option.add("Motivo", "motivo", 2);
          this.ordenacao_Option.add("Nome", "pessoaNome", 3);
          this.ordenacao_Option.add("Empresa", "pessoaReparticao", 4);
          this.ordenacao_Option.add("Pessoa Visitada", "visitadoNome", 5);
          break;

        case "R1ID-1020":
          this.ordenacao_Option.add("Recepção", "identificacaoLocalNome", 1);
          this.ordenacao_Option.add("Operador", "operador", 2);
          this.ordenacao_Option.add("ID", "id", 3);
          this.ordenacao_Option.add("Motivo", "motivo", 4);
          this.ordenacao_Option.add("Nome", "pessoaNome", 5);
          this.ordenacao_Option.add("Pessoa Visitada", "visitadoNome", 6);
          break;

        case "R1ID-1021":
          this.ordenacao_Option.add("Recepção", "identificacaoLocalNome", 1);
          this.ordenacao_Option.add("Operador", "operador", 2);
          this.ordenacao_Option.add("ID", "id", 3);
          this.ordenacao_Option.add("Nome", "pessoaNome", 4);
          this.ordenacao_Option.add("Veículo", "veiculo", 5);
          this.ordenacao_Option.add("Pessoa Visitada", "visitadoNome", 6);
          break;

          case "R1ID-1022":
          this.ordenacao_Option.add("Recepção", "identificacaoRecepcao", 1);
          this.ordenacao_Option.add("Estação", "identificacaoEstacao", 2);
          this.ordenacao_Option.add("Operador", "operador", 3);
          this.ordenacao_Option.add("Nome", "pessoaNome", 4);
          this.ordenacao_Option.add("Documento", "pessoaDocTipo", 5);
          this.ordenacao_Option.add("Grupo", "pessoaGrupo", 6);
          this.ordenacao_Option.add("Empresa", "empresaRepaticao", 7);
          this.ordenacao_Option.add("Pessoa Visitada", "visitadoNome", 8);
          this.ordenacao_Option.add("Área Visitada", "visitadoAreaNome", 9);
          this.ordenacao_Option.add("Centro Custo", "visitadoCentroCusto", 10);
          this.ordenacao_Option.add("Motivo", "motivo", 11);
          this.ordenacao_Option.add("Identificador", "identificador", 12);
          break;

        case "R1ID-0023":
          this.ordenacao_Option.add("Nome", "pessoaNome", 1);
          this.ordenacao_Option.add("Grupo", "pessoaGrupo", 2);
          this.ordenacao_Option.add("Empresa", "pessoaReparticao", 3);
          this.ordenacao_Option.add("Pessoa Visitada", "visitadoNome", 4);
          this.ordenacao_Option.add("Unidade Visitada", "visitadoUnidadeNome", 5);
          this.ordenacao_Option.add("Suspensão", "suspensoDataHora", 6);
          break;

        case "R1ID-0024":
          this.ordenacao_Option.add("Nome", "pessoaNome", 1);
          this.ordenacao_Option.add("Grupo", "pessoaGrupo", 2);
          this.ordenacao_Option.add("Empresa", "pessoaReparticao", 3);
          this.ordenacao_Option.add("Pessoa Visitada", "visitadoNome", 4);
          this.ordenacao_Option.add("Unidade Visitada", "visitadoUnidadeNome", 5);
          this.ordenacao_Option.add("Cancelamento", "statusFinalDataHora", 6);
          break;

        case "R1ID-0025":
          this.ordenacao_Option.add("Nome", "pessoaNome", 1);
          this.ordenacao_Option.add("Grupo", "pessoaGrupo", 2);
          this.ordenacao_Option.add("Empresa", "pessoaReparticao", 3);
          this.ordenacao_Option.add("Pessoa Visitada", "visitadoNome", 4);
          this.ordenacao_Option.add("Unidade Visitada", "visitadoUnidadeNome", 5);
          this.ordenacao_Option.add("Encerramento", "statusFinalDataHora", 6);
          break;



        case "R3ID-0001":
        case "R4ID-0001":
        case "R4ID-0002":
          this.headerAgrupamento = "GRUPO";
          this.headerInformacao = rowSelect.registro.informacoes;
          break;

        case "R3ID-0002":
        case "R4ID-0003":
        case "R4ID-0004":
          this.headerAgrupamento = "MOTIVO";
          this.headerInformacao = rowSelect.registro.informacoes;
          break;

        case "R3ID-0003":
        case "R4ID-0005":
        case "R4ID-0006":
          this.headerAgrupamento = "RECEPCAO";
          this.headerInformacao = rowSelect.registro.informacoes;
          break;

        case "R3ID-0004":
        case "R4ID-0007":
        case "R4ID-0008":
          this.headerAgrupamento = "UNIDADE";
          this.headerInformacao = rowSelect.registro.informacoes;
          break;

      }


    }

  }

  onDataFinal_Change() {
    const dateInicial: Date = new Date(this.dataInicial_Text.formated);
    const dateFinal: Date = new Date(this.dataFinal_Text.formated);

    const dateDiff: number = Math.ceil(Math.abs(dateFinal.getTime() - dateInicial.getTime())) / (1000 * 3600 * 24);

    if (this.dataFinal_Text.validated == true && dateDiff > 31) {
      this.alertService.show("ERRO", "PERÍODO NÃO DEVE SER MAIOR QUE 31 DIAS. VERIFIQUE!", null);
      this.dataFinal_Text.validated = false;
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

    switch (this.periodo_Options.itemSelected?.id) {

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

        this.filtroGrafico.periodo.eq = "dia";

        this.reportSelect = this.reportPath + this.modeloRelatorio + ".mrt";
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

        if (this.modeloRelatorio.substr(0, 4) == "R3ID" || this.modeloRelatorio.substr(0, 4) == "R4ID")
          this.reportSelect = this.reportPath + this.modeloRelatorio + "M.mrt";

        this.filtroGrafico.periodo.eq = "mes";
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

        if (this.modeloRelatorio.substr(0, 4) == "R3ID" || this.modeloRelatorio.substr(0, 4) == "R4ID")
          this.reportSelect = this.reportPath + this.modeloRelatorio + "M.mrt";

        break;
    }
  }



  onPrint_Click() {

    if (!this.dateOperator.compareDateGT(this.dataInicial_Text.textMasked, this.dataFinal_Text.textMasked)) {
      this.alertService.show("ERRO",
        "Data Final não pode ser menor que a Data Inicial. Verifique!",
        null);
    } else {


      this.gridElement = document.getElementById("grid");
      this.formElement = document.getElementById("form");

      var subtitulo: string = "Filtrado pelo Site (" + this.siteNome + ")";

      const filtro: IdentificacaoControleFilter = {siteId:{eq: this.siteId}};
      const filtroArq: IdentificacaoControleArqFilter = {};
      var order: IdentificacaoControleSort = {};

      // this.filtroGrafico.ordenacao.eq = "";
      // this.filtroGrafico.valorIdentico.eq = "0";

      var controleIdentificacaoNodes: IdentificacaoControle[];

      const date: Date = new Date();
      const timeAtual: string = date.toTimeString().substr(0, 5);

      const dataAtual: string = this.dateOperator.formatDate(date.toLocaleDateString("pt-br")).dateFormated + " " + timeAtual + ":59 -00:00";
      const dataInicio: string = this.dataInicial_Text.formated + " " + this.horaInicial_Text.textMasked + ":00-00:00";
      const dataFinal: string = this.dataFinal_Text.formated + " " + this.horaFinal_Text.textMasked + ":59-00:00";

      var periodoDescricao: string = "";

      switch (this.relatorioTipo) {
        
        case FiltroIdentificacao.vigenteSimples:

          periodoDescricao = "Vigente";
          filtro.suspensoDataHora = {eq: null};
          filtro.and = [{identificacaoDataHora:{gte: dataInicio}},
                        {identificacaoDataHora:{lte: dataFinal}}];

          // this.filtroGrafico.periodoInicial = {eq:dataInicio};
          // this.filtroGrafico.periodoFinal = {eq:dataFinal};
          // this.filtroGrafico.tipoRegistro = {eq:"Vigente"};


          if (this.ordenacao_Option.itemSelected.id == 0) order.identificacaoDataHora = SortOperationKind.ASC;





          break;

        case FiltroIdentificacao.expiradaSimples:

        // case FiltroIdentificacao.expiradaConsolidado:
        // case FiltroIdentificacao.expiradaGrafico:

          periodoDescricao = "Expirada";
          filtro.suspensoDataHora = {eq: null};
          filtro.and = [{identificacaoValidadeInicial: {gte: dataInicio}},
                        {identificacaoValidadeFinal: {lte: dataFinal}}];

          filtro.identificacaoValidadeFinal.gt = dataInicio;
          filtro.identificacaoValidadeFinal.lt = dataAtual;
          this.filtroGrafico.periodoInicial.eq = dataInicio;
          this.filtroGrafico.periodoFinal.eq = dataFinal;
          this.filtroGrafico.tipoRegistro.eq = "Expirada";
          if (this.ordenacao_Option.itemSelected.id == 0) order.identificacaoDataHora = SortOperationKind.ASC;
          break;
        // case FiltroIdentificacao.suspensaSimples:
        // case FiltroIdentificacao.suspensaConsolidado:
        // case FiltroIdentificacao.suspensaGrafico:
        //   periodoDescricao = "Suspensa";
        //   filtro.suspensoDataHora.not = null;
        //   filtro.suspensoDataHora.gte = dataInicio;
        //   filtro.suspensoDataHora.lte = dataFinal;
        //   this.filtroGrafico.periodoInicial.eq = dataInicio;
        //   this.filtroGrafico.periodoFinal.eq = dataFinal;
        //   this.filtroGrafico.tipoRegistro.eq = "Suspensa";
        //   if (this.ordenacao_Option.itemSelected.id == 0) order.identificacaoDataHora = SortOperationKind.ASC;
        //   break;
        // case FiltroIdentificacao.provisoriaSimples:
        // case FiltroIdentificacao.provisoriaConsolidado:
        // case FiltroIdentificacao.provisoriaGrafico:
        //   periodoDescricao = "Provisória";
        //   filtro.pessoaTipo.eq = 1;
        //   filtro.suspensoDataHora.eq = null;
        //   filtro.identificacaoDataHora.gte = dataInicio;
        //   filtro.identificacaoDataHora.lte = dataFinal;
        //   this.filtroGrafico.periodoInicial.eq = dataInicio;
        //   this.filtroGrafico.periodoFinal.eq = dataFinal;
        //   this.filtroGrafico.tipoRegistro.eq = "Provisoria";
        //   if (this.ordenacao_Option.itemSelected.id == 0) order.identificacaoDataHora = SortOperationKind.ASC;
        //   break;
        // case FiltroIdentificacao.canceladaSimples:
        // case FiltroIdentificacao.canceladaConsolidado:
        // case FiltroIdentificacao.canceladaGrafico:
        //   periodoDescricao = "Cancelada";
        //   filtroArq.statusFinal.eq = 2;
        //   filtroArq.statusFinalDataHora.gte = dataInicio;
        //   filtroArq.statusFinalDataHora.lte = dataFinal;
        //   this.filtroGrafico.periodoInicial.eq = dataInicio;
        //   this.filtroGrafico.periodoFinal.eq = dataFinal;
        //   this.filtroGrafico.tipoRegistro.eq = "Cancelada";
        //   if (this.ordenacao_Option.itemSelected.id == 0) order.identificacaoDataHora = SortOperationKind.ASC;
        //   break;
        // case FiltroIdentificacao.encerradaSimples:
        // case FiltroIdentificacao.encerradaConsolidado:
        // case FiltroIdentificacao.encerradaGrafico:
        //   periodoDescricao = "Encerrada";
        //   filtroArq.statusFinal.eq = 1;
        //   filtroArq.statusFinalDataHora.gte = dataInicio;
        //   filtroArq.statusFinalDataHora.lte = dataFinal;
        //   this.filtroGrafico.periodoInicial.eq = dataInicio;
        //   this.filtroGrafico.periodoFinal.eq = dataFinal;
        //   this.filtroGrafico.tipoRegistro.eq = "Encerrada";
        //   if (this.ordenacao_Option.itemSelected.id == 0) order.identificacaoDataHora = SortOperationKind.ASC;
        //   break;
        // case FiltroIdentificacao.historicoSimples:
        // case FiltroIdentificacao.historicoConsolidado:
        // case FiltroIdentificacao.historicoSGrafico:
        //   periodoDescricao = "Histórico";
        //   filtroArq.identificacaoDataHora.gte = dataInicio;
        //   filtroArq.identificacaoDataHora.lte = dataFinal;
        //   this.filtroGrafico.periodoInicial.eq = dataInicio;
        //   this.filtroGrafico.periodoFinal.eq = dataFinal;
        //   this.filtroGrafico.tipoRegistro.eq = "Historico";
        //   if (this.ordenacao_Option.itemSelected.id == 0) order.identificacaoDataHora = SortOperationKind.ASC;
        //   break;
      }


      if (this.identificacaoTipo_Option.itemSelected.id > 0) {
        filtro.identificacaoRegistro = {eq: this.identificacaoTipo_Option.itemSelected.id};
        subtitulo == "" ? subtitulo = "Filtrado pelo " : subtitulo += ", pelo ";
        subtitulo += "Tipo (" + this.identificacaoTipo_Option.itemSelected.text + ")";
      }

      if(this.identificacaoOrigem_Option.itemSelected.id > 0) {  
        filtro.identificacaoOrigem = {eq: this.identificacaoOrigem_Option.itemSelected.text}
        subtitulo == ""? subtitulo = "Filtrado pela ": subtitulo += ", pela ";        
        subtitulo += "Origem (" + this.identificacaoOrigem_Option.itemSelected.text + ")";
      }

      if (this.identificacaoLocal_Option.itemSelected.id > 0) {
        filtro.identificacaoRecepcao = {eq:this.identificacaoLocal_Option.itemSelected.text};
        subtitulo == "" ? subtitulo = "Filtrado pelo " : subtitulo += ", pelo ";
        subtitulo += "Local (" + this.identificacaoLocal_Option.itemSelected.text + ")";
      }

      if (this.identificacaoOperador_Text.text.length > 0) {
        filtro.identificacaoOperadorId = {eq: this.operadorId};
        subtitulo == "" ? subtitulo = "Filtrado pelo " : subtitulo += ", pelo ";
        subtitulo += "Operador (" + this.identificacaoOperador_Text.text + ")";
      }

      if (this.identificacaoMotivo_Option.itemSelected.id > 0) {
        filtro.motivo = {eq: this.identificacaoMotivo_Option.itemSelected.text};
        subtitulo == "" ? subtitulo = "Filtrado pelo " : subtitulo += ", pelo ";
        subtitulo += "Motivo (" + this.identificacaoMotivo_Option.itemSelected.text + ")";
      }

      if (this.identificacaoId_Text.text.length > 0) {
        try {
          filtro.identificador = {eq:parseInt(this.identificacaoId_Text.text)};
        } catch {
          console.log("Try/Catch: ID não numérico!");
        }
        subtitulo == "" ? subtitulo = "Filtrado pelo " : subtitulo += ", pelo ";
        subtitulo += "ID (" + this.identificacaoId_Text.text + ")";
      }

      if (this.pessoaTipo_Option.itemSelected.id > 0) {
        filtro.pessoaTipo = {eq:this.pessoaTipo_Option.itemSelected.id};
        subtitulo == "" ? subtitulo = "Filtrado pela " : subtitulo += ", pela ";
        subtitulo += "Pessoa Tipo (" + this.pessoaTipo_Option.itemSelected.text + ")";
      }

      if (this.pessoaNome_Text.text.length > 0) {
        filtro.pessoaId = {eq:this.pessoaId};
        subtitulo == "" ? subtitulo = "Filtrado pela " : subtitulo += ", pela ";
        subtitulo += "Pessoa Nome (" + this.pessoaNome_Text.text + ")";

        if (this.valorIdentico_Options.valueOf("valorIdentico")) {
          filtro.pessoaNome = { eq: this.pessoaNome_Text.text };
        }
      }

      if (this.pessoaDocumento_Text.text.length > 0) {
        filtro.pessoaDocNumero = {contains:this.pessoaDocumento_Text.text};
        subtitulo == "" ? subtitulo = "Filtrado pela " : subtitulo += ", pela ";
        subtitulo += "Pessoa Documento (" + this.pessoaDocumento_Text.text + ")";

        if (this.valorIdentico_Options.valueOf("valorIdentico")) {
          filtro.pessoaDocNumero = { eq: this.pessoaDocumento_Text.text };
        }
      }

      if (this.pessoaGrupo_Option.itemSelected.id > 0) {
        filtro.pessoaGrupo = {eq:this.pessoaGrupo_Option.itemSelected.text};
        subtitulo == "" ? subtitulo = "Filtrado pela " : subtitulo += ", pela ";
        subtitulo += "Pessoa Grupo (" + this.pessoaGrupo_Option.itemSelected.text + ")";
      }

      if (this.pessoaEntidade_Text.text.length > 0) {
        filtro.pessoaReparticao = {contains:this.pessoaEntidade_Text.text};
        subtitulo == "" ? subtitulo = "Filtrado pela " : subtitulo += ", pela ";
        subtitulo += "Pessoa Empresa (" + this.pessoaEntidade_Text.text + ")";

        if (this.valorIdentico_Options.valueOf("valorIdentico")) {
          filtro.pessoaReparticao = { eq: this.pessoaEntidade_Text.text };
        }
      }

      if (this.pessoaComplemento1_Text.text.length > 0) {
        filtro.pessoaComplemento1 = {contains:this.pessoaComplemento1_Text.text};
        subtitulo == "" ? subtitulo = "Filtrado pela " : subtitulo += ", pela ";
        subtitulo += "Pessoa Complemento 1 (" + this.pessoaComplemento1_Text.text + ")";

        if (this.valorIdentico_Options.valueOf("valorIdentico")) {
          filtro.pessoaComplemento1 = { eq: this.pessoaComplemento1_Text.text };
        }
      }

      if (this.pessoaComplemento2_Text.text.length > 0) {
        filtro.pessoaComplemento2 = {contains:this.pessoaComplemento2_Text.text};
        subtitulo == "" ? subtitulo = "Filtrado pela " : subtitulo += ", pela ";
        subtitulo += "Pessoa Complemento 2 (" + this.pessoaComplemento2_Text.text + ")";

        if (this.valorIdentico_Options.valueOf("valorIdentico")) {
          filtro.pessoaComplemento2 = { eq: this.pessoaComplemento2_Text.text };
        }
      }

      if (this.pessoaComplemento3_Text.text.length > 0) {
        filtro.pessoaComplemento3 = {contains:this.pessoaComplemento3_Text.text};
        subtitulo == "" ? subtitulo = "Filtrado pela " : subtitulo += ", pela ";
        subtitulo += "Pessoa Complemento 3 (" + this.pessoaComplemento3_Text.text + ")";

        if (this.valorIdentico_Options.valueOf("valorIdentico")) {
          filtro.pessoaComplemento3 = { eq: this.pessoaComplemento3_Text.text };
        }
      }

      if (this.pessoaComplemento4_Text.text.length > 0) {
        filtro.pessoaComplemento4 = {contains:this.pessoaComplemento4_Text.text};
        subtitulo == "" ? subtitulo = "Filtrado pela " : subtitulo += ", pela ";
        subtitulo += "Pessoa Complemento 4 (" + this.pessoaComplemento4_Text.text + ")";

        if (this.valorIdentico_Options.valueOf("valorIdentico")) {
          filtro.pessoaComplemento4 = { eq: this.pessoaComplemento4_Text.text };
        }
      }

      if (this.veiculoTipo_Option.itemSelected.id > 0) {
        filtro.veiculoTipo = {eq:this.veiculoTipo_Option.itemSelected.id};
        subtitulo == "" ? subtitulo = "Filtrado pelo " : subtitulo += ", pelo ";
        subtitulo += "Veículo Tipo (" + this.veiculoTipo_Option.itemSelected.text + ")";
      }

      if (this.veiculoClasse_Option.itemSelected.id > 0) {
        filtro.veiculoClasse = {eq:this.veiculoClasse_Option.itemSelected.id};
        subtitulo == "" ? subtitulo = "Filtrado pelo " : subtitulo += ", pelo ";
        subtitulo += "Veículo Classe (" + this.veiculoClasse_Option.itemSelected.text + ")";
      }

      if (this.veiculoIdPlaca_Text.text.length > 0) {
        filtro.veiculoPlaca = {contains:this.veiculoIdPlaca_Text.text};
        subtitulo == "" ? subtitulo = "Filtrado pelo " : subtitulo += ", pelo ";
        subtitulo += "Veículo ID (Placa) (" + this.veiculoIdPlaca_Text.text + ")";

        if (this.valorIdentico_Options.valueOf("valorIdentico")) {
          filtro.veiculoPlaca = { eq: this.pessoaComplemento1_Text.text };
        }
      }

      if (this.veiculoModelo_Option.itemSelected.id > 0) {
        filtro.veiculoModelo = {eq:this.veiculoModelo_Option.itemSelected.text};
        subtitulo == "" ? subtitulo = "Filtrado pelo " : subtitulo += ", pelo ";
        subtitulo += "Veículo Modelo (" + this.veiculoModelo_Option.itemSelected.text + ")";
      }

      if (this.veiculoCor_Option.itemSelected.id > 0) {
        filtro.veiculoCor = {eq:this.veiculoCor_Option.itemSelected.text};
        subtitulo == "" ? subtitulo = "Filtrado pelo " : subtitulo += ", pelo ";
        subtitulo += "Veículo Cor (" + this.veiculoCor_Option.itemSelected.text + ")";
      }

      if (this.veiculoGrupo_Option.itemSelected.id > 0) {
        filtro.veiculoGrupo = {eq:this.veiculoGrupo_Option.itemSelected.text};
        subtitulo == "" ? subtitulo = "Filtrado pelo " : subtitulo += ", pelo ";
        subtitulo += "Veículo Grupo (" + this.veiculoGrupo_Option.itemSelected.text + ")";
      }

      if (this.veiculoComplemento1_Text.text.length > 0) {
        filtro.veiculoComplemento1 = {contains:this.veiculoComplemento1_Text.text};
        subtitulo == "" ? subtitulo = "Filtrado pelo " : subtitulo += ", pelo ";
        subtitulo += "Veículo Complemento 1 (" + this.veiculoComplemento1_Text.text + ")";

        if (this.valorIdentico_Options.valueOf("valorIdentico")) {
          filtro.veiculoComplemento1 = { eq: this.veiculoComplemento1_Text.text };
        }
      }

      if (this.veiculoComplemento2_Text.text.length > 0) {
        filtro.veiculoComplemento2 = {contains:this.veiculoComplemento2_Text.text};
        subtitulo == "" ? subtitulo = "Filtrado pelo " : subtitulo += ", pelo ";
        subtitulo += "Veículo Complemento 2 (" + this.veiculoComplemento2_Text.text + ")";
        
        if (this.valorIdentico_Options.valueOf("valorIdentico")) {
          filtro.veiculoComplemento2 = { eq: this.veiculoComplemento2_Text.text };
        }
      }

      if (this.veiculoComplemento3_Text.text.length > 0) {
        filtro.veiculoComplemento3 = {contains:this.veiculoComplemento3_Text.text};
        subtitulo == "" ? subtitulo = "Filtrado pelo " : subtitulo += ", pelo ";
        subtitulo += "Veículo Complemento 3 (" + this.veiculoComplemento3_Text.text + ")";

        
        if (this.valorIdentico_Options.valueOf("valorIdentico")) {
          filtro.veiculoComplemento3 = { eq: this.veiculoComplemento3_Text.text };
        }
      }

      if (this.veiculoComplemento4_Text.text.length > 0) {
        filtro.veiculoComplemento4 = {contains:this.veiculoComplemento4_Text.text};
        subtitulo == "" ? subtitulo = "Filtrado pelo " : subtitulo += ", pelo ";
        subtitulo += "Veículo Complemento 4 (" + this.veiculoComplemento4_Text.text + ")";

        
        if (this.valorIdentico_Options.valueOf("valorIdentico")) {
          filtro.veiculoComplemento4 = { eq: this.veiculoComplemento4_Text.text };
        }
      }

      if (this.visitadoNome_Text.text.length > 0) {
        filtro.visitadoId = {eq: this.visitadoId};
        subtitulo == "" ? subtitulo = "Filtrado pelo " : subtitulo += ", pelo ";
        subtitulo += "Visitado Nome (" + this.visitadoNome_Text.text + ")";
      }

      if (this.visitadoArea_Option.itemSelected.id > 0) {
        filtro.visitadoAreaNome = {eq:this.visitadoArea_Option.itemSelected.text};
        subtitulo == "" ? subtitulo = "Filtrado pelo " : subtitulo += ", pelo ";
        subtitulo += "Visitado Área (" + this.visitadoArea_Option.itemSelected.text + ")";
      }

      if (this.visitadoCentroCusto_Option.itemSelected.id > 0) {
        filtro.visitadoCentroCusto = {eq:this.visitadoCentroCusto_Option.itemSelected.text};
        subtitulo == "" ? subtitulo = "Filtrado pelo " : subtitulo += ", pelo ";
        subtitulo += "Visitado Centro Custo (" + this.visitadoCentroCusto_Option.itemSelected.text + ")";
      }

      if(this.autorizanteNome_Text.text.length > 0) { 
        filtro.autorizanteId = {eq:this.autorizanteId};
        subtitulo == ""? subtitulo = "Filtrado pelo ": subtitulo += ", pelo ";        
        subtitulo += "Autorizante Nome (" + this.autorizanteNome_Text.text + ")";
      }

      if(this.estacionamentoNome_Option.itemSelected.id > 0) {
        filtro.estacionamentoId  = {eq:this.estacionamentoNome_Option.itemSelected.id};
        subtitulo == ""? subtitulo = "Filtrado pelo ": subtitulo += ", pelo ";        
        subtitulo += "Estacionamento Nome (" + this.estacionamentoNome_Option.itemSelected.text + ")";
      }

      if(this.estacionamentoVaga_Option.itemSelected.id > 0) {
        filtro.garagemTipo = {eq:this.estacionamentoVaga_Option.itemSelected.id};
        subtitulo == ""? subtitulo = "Filtrado pelo ": subtitulo += ", pelo ";        
        subtitulo += "Estacionamento Vaga (" + this.estacionamentoVaga_Option.itemSelected.text + ")";
      }

      if(this.areaReservada_Option.itemSelected.id > 0) {
        filtro.areaReservadaId = {eq:this.areaReservada_Option.itemSelected.id};
        subtitulo == ""? subtitulo = "Filtrado pelo ": subtitulo += ", pelo ";        
        subtitulo += "Área Reservada (" + this.areaReservada_Option.itemSelected.text + ")";
      }

      if (this.observacao_Text.text.length > 0) {
        filtro.observacao = {contains:this.observacao_Text.text};
        subtitulo == "" ? subtitulo = "Filtrado pelo " : subtitulo += ", pelo ";
        subtitulo += "Observação (" + this.observacao_Text.text + ")";

        if (this.valorIdentico_Options.valueOf("valorIdentico")) {
          filtro.observacao = { eq: this.observacao_Text.text };
        }
      }

      this.showSpinner = true;

      const reportPeriodo: string = "Tempo: " +
        this.dataInicial_Text.textMasked + " " + this.horaInicial_Text.textMasked + " - " +
        this.dataFinal_Text.textMasked + " " + this.horaFinal_Text.textMasked;

      order[this.ordenacao_Option.itemSelected.value] = SortOperationKind.ASC;
      if (this.ordenacao_Option.itemSelected.value != "identificacaoDataHora")
        order.identificacaoDataHora = SortOperationKind.ASC;

      subtitulo += " e ordernado por " + this.ordenacao_Option.itemSelected.text;


      order[this.ordenacao_Option.itemSelected.value] = SortOperationKind.ASC;

      switch (this.ordenacao_Option.itemSelected.value) {

        case "identificacao":
          order = {identificacaoDataHora: SortOperationKind.ASC}
          break;
      
        case "nome":
          order = {pessoaNome: SortOperationKind.ASC}
          break;

        case "grupo":
          order = {pessoaGrupo: SortOperationKind.ASC}
          break;

        case "pessoaReparticao":
          order = {pessoaRepaticao: SortOperationKind.ASC}
          break;

        case "visitadoNome":
          order = {visitadoNome: SortOperationKind.ASC}
          break;

        case "visitadoAreaNome":
          order = {visitadoAreaNome: SortOperationKind.ASC}
          break;

        case "identificador":
          order = {identificador: SortOperationKind.ASC}
          break;

        case "autorizanteNome":
          order = {autorizanteNome: SortOperationKind.ASC}
          break;

        case "motivo":
          order = {motivo: SortOperationKind.ASC}
          break;

        case "recepcao":
          order = {recepcao: SortOperationKind.ASC}
          break;

        case "operador":
          order = {operador: SortOperationKind.ASC}
          break;

        case "visitadoCentroCusto":
          order = {visitadoCentroCusto: SortOperationKind.ASC}
          break;

        case "pessoaComplemento1":
          order = {pessoaComplemento1: SortOperationKind.ASC}
          break;

        case "pessoaComplemento2":
          order = {pessoaComplemento2: SortOperationKind.ASC}
          break;

        case "pessoaComplemento3":
          order = {pessoaComplemento3: SortOperationKind.ASC}
          break;

        case "pessoaComplemento4":
          order = {pessoaComplemento4: SortOperationKind.ASC}
          break;

        case "veiculoComplemento1":
          order = {veiculoComplemento4: SortOperationKind.ASC}
          break;

        case "veiculoComplemento4":
          order = {veiculoComplemento4: SortOperationKind.ASC}
          break;

        case "veiculoComplemento4":
          order = {veiculoComplemento4: SortOperationKind.ASC}
          break;

        case "veiculoComplemento4":
          order = {veiculoComplemento4: SortOperationKind.ASC}
          break;

        case "veiculo":
          order = {veiculoPlaca: SortOperationKind.ASC}
          break;

        case "estacionamentoNome":
          order = {estacionamentoNome: SortOperationKind.ASC}
          break;

        case "garagemVaga":
          order = {garagemVaga: SortOperationKind.ASC}
          break;

        case "dadosIdentificacao":
          order = {garagemVaga: SortOperationKind.ASC}
          break;


      default:
      break;

      }


      switch (this.relatorioTipo) {

        case FiltroIdentificacao.canceladaSimples:
        case FiltroIdentificacao.encerradaSimples:
        case FiltroIdentificacao.historicoSimples:

          const filtroGeral = { ...filtroArq, ...filtro };

          this.identificacaoControleService.readIdentificacaoControlesArqRelat(order, filtroGeral)
            .subscribe(({ controleIdentificacaoArq }: read_IdentificacaoControleArq) => {
              controleIdentificacaoNodes = controleIdentificacaoArq.nodes;
              this.showSpinner = false;

              var jsonFile = {
                "header": {
                  "titulo": "Relatório de Identificação - " + periodoDescricao,
                  "subtitulo": subtitulo,
                  "periodo": reportPeriodo,
                  "organizacao": this.organizacao.organizacaoNome,
                  "contador": "Total de registros: " + controleIdentificacaoArq.totalCount,
                  "logoAplicacao": sessionStorage.getItem("logoApp"),
                  "logoOrganizacao": this.organizacao.organizacaoLogo
                },
                "data": {
                  "controleIdentificacao": {
                    "nodes": controleIdentificacaoNodes
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

          break;
        case FiltroIdentificacao.vigenteGrafico:
        case FiltroIdentificacao.expiradaGrafico:
        case FiltroIdentificacao.suspensaGrafico:
        case FiltroIdentificacao.provisoriaGrafico:
        case FiltroIdentificacao.canceladaGrafico:
        case FiltroIdentificacao.encerradaGrafico:
        case FiltroIdentificacao.historicoSGrafico:
          this.gestaoIdentificacaoService.getRelatorioGrafico(this.filtroGrafico, this.modeloRelatorio)
            .subscribe(({ gestaoRelatorioGrafico }: read_GestaoRelatorioGrafico) => {
              this.showSpinner = false;

              var jsonFile = {
                "header": {
                  "titulo": this.headerInformacao + " - " + periodoDescricao,
                  "subtitulo": subtitulo,
                  "periodo": reportPeriodo,
                  "contador": "Total de registros: " + gestaoRelatorioGrafico.totalCount,
                  "organizacao": this.organizacao.organizacaoNome,
                  "logoAplicacao": sessionStorage.getItem("logoApp"),
                  "logoOrganizacao": this.organizacao.organizacaoLogo,
                  "agrupamento": this.headerAgrupamento,
                },
                "data": {
                  "gestaoRelatorioGrafico": {
                    "nodes": gestaoRelatorioGrafico.nodes
                  }
                }
              };

              gestaoRelatorioGrafico = null;
              var dataset = new Stimulsoft.System.Data.DataSet("JSON");

              if (this.reportSelect) {

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
          break;

        case FiltroIdentificacao.vigenteConsolidado:
        case FiltroIdentificacao.expiradaConsolidado:
        case FiltroIdentificacao.suspensaConsolidado:
        case FiltroIdentificacao.provisoriaConsolidado:
        case FiltroIdentificacao.canceladaConsolidado:
        case FiltroIdentificacao.encerradaConsolidado:
        case FiltroIdentificacao.historicoConsolidado:
          this.gestaoIdentificacaoService.getRelatorioConsolidado(this.filtroGrafico, this.modeloRelatorio)
            .subscribe(({ gestaoRelatorioConsolidado }: read_GestaoRelatorioConsolidado) => {
              this.showSpinner = false;

              var jsonFile = {
                "header": {
                  "titulo": this.headerInformacao + " - " + periodoDescricao,
                  "subtitulo": subtitulo,
                  "periodo": reportPeriodo,
                  "contador": "Total de registros: " + gestaoRelatorioConsolidado.totalCount,
                  "organizacao": this.organizacao.organizacaoNome,
                  "logoAplicacao": sessionStorage.getItem("logoApp"),
                  "logoOrganizacao": this.organizacao.organizacaoLogo,
                  "agrupamento": this.headerAgrupamento,
                },
                "data": {
                  "gestaoRelatorioConsolidado": {
                    "nodes": gestaoRelatorioConsolidado.nodes
                  }
                }
              };

              gestaoRelatorioConsolidado = null;
              var dataset = new Stimulsoft.System.Data.DataSet("JSON");

              if (this.reportSelect) {

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
          break;

        default:
          this.identificacaoControleService.readIdentificacaoControlesRelat(order, filtro)
            .subscribe(({ controleIdentificacao }: read_IdentificacaoControle) => {
              this.showSpinner = false;
              
              var jsonFile = {
                "header": {
                  "titulo": "Relatório de Identificação - " + periodoDescricao,
                  "subtitulo": subtitulo,
                  "periodo": reportPeriodo,
                  "organizacao": this.organizacao.organizacaoNome,
                  "contador": "Total de registros: " + controleIdentificacao.totalCount,
                  "logoAplicacao": sessionStorage.getItem("logoApp"),
                  "logoOrganizacao": this.organizacao.organizacaoLogo
                },
                "data": {
                  "controleIdentificacao": {
                    "nodes": controleIdentificacao.nodes
                  }
                }
              };

              controleIdentificacao = null;

              var dataset = new Stimulsoft.System.Data.DataSet("JSON");

              if (this.reportSelect) {

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
          break;
      }

    }

  }



  onIdentificacaoOperadorFind_Click() {
    this.pessoaOperadorModalService.setFilter(this.identificacaoOperador_Text.text);
    this.pessoaOperadorModalService.show('Operador', undefined, undefined , undefined, true);
  }

  onVisitanteFind_Click() {
    this.pessoaVisitadoModalService.setFilter(this.visitadoNome_Text.text);
    this.pessoaVisitadoModalService.show("Visitado",undefined, this.siteId , undefined, false);
  }

  onAutorizanteFind_Click() {
    this.pessoaAutorizanteModalService.setFilter(this.autorizanteNome_Text.text);
    this.pessoaAutorizanteModalService.show("Autorizante",undefined, this.siteId , undefined, false);
  }  

  onPessoaNomeFind_Click() {
    if(this.pessoaTipo_Option.itemSelected.id == 1){
    this.pessoaInternaModalService.setFilter(this.pessoaNome_Text.text);
    this.pessoaInternaModalService.show("Pessoa Interna", undefined, this.siteId , undefined, false);
    } else if(this.pessoaTipo_Option.itemSelected.id == 2) {
      this.pessoaExternaModalService.show("Pessoa Externa");
    }

  }

  pessoaOperadorModalSelect(pessoaSelect: PessoaInternaUsuario) {
    this.identificacaoOperador_Text.text = pessoaSelect.nome;
    this.operadorId = pessoaSelect.id;
  }

  pessoaInternaModalSelect(pessoaSelect: PessoaInternaUsuario) {
    this.pessoaNome_Text.text = pessoaSelect.nome;
    this.pessoaId = pessoaSelect.id;
  }

  pessoaVisitadoModalSelect(pessoaSelect: PessoaInternaUsuario) {
    this.visitadoNome_Text.text = pessoaSelect.nome;
    this.visitadoId = pessoaSelect.id;
  }

  pessoaAutorizanteModalSelect(pessoaSelect: PessoaInternaUsuario) {
    this.autorizanteNome_Text.text = pessoaSelect.nome;
    this.autorizanteId = pessoaSelect.id;
  }

  pessoaExternaModalSelect(pessoaSelect: PessoaExternaUsuario) {
    this.pessoaNome_Text.text = pessoaSelect.nome;
    this.pessoaId = pessoaSelect.id;
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
    this.listView_Identificacao.processingShow();
    this.gestaoIdentificacaoService.getReports(this.relatorioTipo, estilo)
      .subscribe((report: Report[]) => {
        this.actionbuttomService.enableButtons(0);
        this.listView_Identificacao.gridUpdate(report);
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
    this.pessoaId = 0;
    this.autorizanteId = 0;
    this.visitadoId = 0;
    this.operadorId = 0;
    this.identificacaoTipo_Option.select(0);
    this.identificacaoOrigem_Option.select(0);
    this.identificacaoLocal_Option.select(0);
    this.identificacaoOperador_Text.clear();
    this.identificacaoMotivo_Option.select(0);
    this.identificacaoId_Text.clear();
    this.pessoaTipo_Option.select(0);
    this.pessoaNome_Text.clear();
    this.pessoaDocumento_Text.clear();
    this.pessoaGrupo_Option.select(0);
    this.pessoaEntidade_Text.clear();
    this.pessoaComplemento1_Text.clear();
    this.pessoaComplemento2_Text.clear();
    this.pessoaComplemento3_Text.clear();
    this.pessoaComplemento4_Text.clear();
    this.veiculoTipo_Option.select(0);
    this.veiculoClasse_Option.select(0);
    this.veiculoIdPlaca_Text.clear();
    this.veiculoModelo_Option.select(0);
    this.veiculoCor_Option.select(0);
    this.veiculoGrupo_Option.select(0);
    this.veiculoComplemento1_Text.clear();
    this.veiculoComplemento2_Text.clear();
    this.veiculoComplemento3_Text.clear();
    this.veiculoComplemento4_Text.clear();
    this.visitadoNome_Text.clear();
    this.visitadoArea_Option.select(0);
    this.visitadoCentroCusto_Option.select(0);
    this.autorizanteNome_Text.clear();
    this.estacionamentoNome_Option.select(0);
    this.estacionamentoVaga_Option.select(0);
    this.areaReservada_Option.select(0);
    this.observacao_Text.clear();
    this.valorIdentico_Options.reset();
    this.periodo_Options.select(0);
    this.tabsGestaoIdentificacao_Option.select("tabFiltro");
  }

  onResize() {
    const maxHeightPanel = document.getElementById('gestaoIdentificacao_Panel')?.clientHeight;
    const maxHeightTab = maxHeightPanel - 135;

    const tabFiltroIdentifcacao = document.getElementById('tabFiltroIdentificacao');

    tabFiltroIdentifcacao.style.maxHeight = maxHeightTab + 'px';
  }

  ngOnDestroy(): void {
    this.treeviewItem?.unsubscribe();
  }

}