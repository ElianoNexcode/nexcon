import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { ListViewGrid, Find, Filter, rowSelect } from 'src/app/@theme/components/grid/list-view/service/list-view.service';
import { AlertServiceComponent } from 'src/app/@theme/components/form/alert-card/service/alert-card.service';
import { ConfigStorage, SetorConfig, SiteConfig } from 'src/app/@core/storage/config/config';
import { ActionButtomService } from 'src/app/@theme/components/grid/action-buttom/service/action-button.service';
import { InputMultiLabel, TextareaLabel } from 'src/app/@theme/components';
import { InputLabel } from 'src/app/@theme/components/form/input-label/service/input-label.service';
import { ComboOptions, Item } from 'src/app/@theme/components/form/combobox/service/combobox.service';
import { SortOperationKind } from 'src/app/@core/api/generic-graphql';
import { TipoAreaSigla } from 'src/app/@core/enum';
import { BehaviorSubject } from 'rxjs';
import { NavigationEnd, Router, RouterEvent } from '@angular/router';
import { filter } from 'rxjs/operators';
import { TabsService } from 'src/app/@theme/layouts/tabs/service/tabs.service';
import { OptionsGroup } from 'src/app/@theme/components/form/select-group/service/select-group.service';
import { BoxPanel } from 'src/app/@theme/layouts';
import { AreaInterligacaoModalService } from 'src/app/@theme/modals/area-interligacao-modal/service/area-interligacao-modal.service';
import { AreaControleVisitaModalService } from 'src/app/@theme/modals/area-controle-visita-modal/service/area-controle-visita-modal.service';
import { AreaAcessoModalService } from 'src/app/@theme/modals/area-acesso-modal/service/area-acesso-modal.service';
import { SetorReparticao, SetorReparticaoData, SetorReparticaoFilter } from 'src/app/@core/data/reparticao-setor';
import { TreeviewService } from 'src/app/@theme/layouts/treeview/service/treeview.service';
import { TreeView } from 'src/app/@theme/layouts/treeview/service/treeview';
import { SetorReparticaoService } from '../setor/service/setor.service';
import {
  create_AreaReparticao,
  read_AreaReparticao,
  update_AreaReparticao,
  delete_AreaReparticao,
  AreaReparticaoData,
  AreaReparticao,
  AreaReparticaoSort,
  AreaReparticaoFilter,
  AreaInterligacao,
  AreaControleVisita,
  AreaNivelRotativo
} from 'src/app/@core/data/reparticao-area';
import { DatePipe } from '@angular/common';
import { DateOperator } from 'src/app/@theme/components/miscellaneous/date-operator/date-operator';

@Component({
  selector: 'nex-area',
  templateUrl: './area.component.html',
  styleUrls: ['./area.component.scss'],
  host: { '(window:resize)': 'onResize()' },
  providers: [DatePipe]
})

export class AreaReparticaoComponent implements OnInit, AfterViewInit, OnDestroy {

  id: number = null;
  siteId: number;

  nome_Text: InputLabel = new InputLabel();
  tipo_Option: ComboOptions = new ComboOptions();
  localizacao_Text?: InputLabel = new InputLabel();
  observacao_Text?: TextareaLabel = new TextareaLabel();
  areaMae_Option: ComboOptions = new ComboOptions();

  order_by: AreaReparticaoSort = { nome: SortOperationKind.ASC }
  filter: AreaReparticaoFilter;
  filterGrid: AreaReparticaoFilter;

  listView_Area: ListViewGrid = new ListViewGrid();
  listView_AreaInterligada: ListViewGrid = new ListViewGrid();
  listView_AreaVisita: ListViewGrid = new ListViewGrid();
  listView_AreaAcesso: ListViewGrid = new ListViewGrid();

  tabsArea_Options: TabsService = new TabsService();
  controle_OptionsGroup: OptionsGroup = new OptionsGroup();

  volume_Text: InputLabel = new InputLabel();
  temporizacao_Text: InputLabel = new InputLabel();
  idadeMin: InputMultiLabel = new InputMultiLabel();
  idadeMax: InputMultiLabel = new InputMultiLabel();

  boxButton: BoxPanel = new BoxPanel();

  areasInterligacao: AreaInterligacao;
  areaControleVisitas: AreaControleVisita;
  areaNivelRotativo: AreaNivelRotativo

  inteligacaoAreaId: number;
  pessoaGrupoId: number;
  nivelAcessoId: number;

  settings: BehaviorSubject<any>;

  reparticaoArea: AreaReparticao;

  showSpinner: boolean = false;

  alertService: AlertServiceComponent = new AlertServiceComponent();

  areaInterligacaoModalService: AreaInterligacaoModalService = new AreaInterligacaoModalService();
  areaControleVisitaModalService: AreaControleVisitaModalService = new AreaControleVisitaModalService();
  areaAcessoModalService: AreaAcessoModalService = new AreaAcessoModalService();

  treeviewItem: BehaviorSubject<any>;

  dateOperator: DateOperator = new DateOperator();

  editable: boolean;

  constructor( public actionbuttomService: ActionButtomService,
               private areaReparticaoService: AreaReparticaoData,
               private config: ConfigStorage,
               private router: Router,
               private treeviewService: TreeviewService,
               private setorReparticaoService: SetorReparticaoData,
               private datePipe: DatePipe ) {

    this.settings = this.config.siteSubject();
    this.treeviewItem = this.treeviewService.itemSubject();

    this.boxButton.add("btOpen", "insert", false);
    this.boxButton.add("btClose", "delete", false);

    this.tabsArea_Options.add("tabOrdem", "Ordem", true);
    this.tabsArea_Options.add("tabLigacao", "Ligação");
    this.tabsArea_Options.add("tabControle", "Controle");
    this.tabsArea_Options.add("tabVisita", "Visita");
    this.tabsArea_Options.add("tabAcesso", "Acesso");

    this.actionbuttomService.relationGrid = "lstArea";

    this.actionbuttomService.recurso = "1B";
    this.actionbuttomService.top_action_buttons = [
      { "id": 0, "text": "forms.buttons.create", "visibled": false, "enabled": true, "condition": "always", "openForm": true, "editable": "new", },
      { "id": 1, "text": "forms.buttons.update", "visibled": false, "enabled": false, "condition": "select", "openForm": true, "editable": "yes", },
      { "id": 2, "text": "forms.buttons.read", "visibled": false, "enabled": false, "condition": "select", "openForm": true, "editable": "no", },
      { "id": 3, "text": "forms.buttons.delete", "visibled": false, "enabled": false, "condition": "multi", "openForm": false, "question": "forms.questions.delete"}
    ]

    this.listView_Area.name = "lstArea";
    this.listView_Area.title = 'Lista de Áreas';
    this.listView_Area.grid = [
      { "header": "Nome", "field": "nome", "width": 15, "align": "left" },
      { "header": "Tipo", "field": "tipo", "width": 15, "align": "left", "enum": TipoAreaSigla },
      { "header": "Localização", "field": "localizacao", "width": 15, "align": "left" },
      { "header": "Observação", "field": "observacao", "width": 55, "align": "left" }
    ];

    this.listView_AreaInterligada.name = "lstAreaInterligada";
    this.listView_AreaInterligada.gridOnly = true;
    this.listView_AreaInterligada.noPaging = true;
    this.listView_AreaInterligada.noBorder = true;
    this.listView_AreaInterligada.grid = [
      { "header": "Área Interligada", "entity": 'interligacaoArea', "field": "nome", "width": 60, "align": "left" },
      { "header": "Setor", "entity": 'interligacaoSetor', "field": "nome", "width": 40, "align": "left" },
      { "header": "", "field": "interligacaoAreaId", "width": 0, "align": "left", "visible": false },
      { "header": "", "field": "interligacaoSetorId", "width": 0, "align": "left", "visible": false }
      
    ];

    this.listView_AreaVisita.name = "lstAreaVisita";
    this.listView_AreaVisita.gridOnly = true;
    this.listView_AreaVisita.noPaging = true;
    this.listView_AreaVisita.noBorder = true;
    this.listView_AreaVisita.grid = [
      { "header": "", "field": "pessoaGrupoId", "width": 0, "visible": false },
      { "header": "Grupo", "entity": "pessoaGrupo", "field": "pessoaGrupo", "width": 80, "align": "left" },
      { "header": "Qtde", "field": "quantidade", "width": 20, "align": "center" }
    ];

    this.listView_AreaAcesso.name = "lstAcesso";
    this.listView_AreaAcesso.gridOnly = true;
    this.listView_AreaAcesso.noPaging = true;
    this.listView_AreaAcesso.noBorder = true;
    this.listView_AreaAcesso.grid = [
      { "header": "Nível de Acesso Rotativo", "entity": "nivelAcesso", "field": "nome", "width": 100, "align": "left" },
      { "header": "", "field": "nivelAcessoId", "width": 0, "align": "left", "visible": false }
    ];

    //nome
    this.nome_Text.name = "txtNome";
    this.nome_Text.rules = "uppercase"
    this.nome_Text.maxLength = 20;
    this.nome_Text.minLength = 1;

    // tipo (Tratar configuração do Aplicativo)
    this.tipo_Option.name = "cbTipo";
    this.tipo_Option.add(TipoAreaSigla[1], "areaComum", 1, true);
    this.tipo_Option.add(TipoAreaSigla[2], "areaReservada", 2);
    this.tipo_Option.add(TipoAreaSigla[3], "areaEstacionamento", 3);
    this.tipo_Option.add(TipoAreaSigla[4], "areaEmergencia", 4);

    //localizacao
    this.localizacao_Text.name = "txtLocalizacao";
    this.localizacao_Text.rules = "uppercase"
    this.localizacao_Text.maxLength = 30;
    this.localizacao_Text.minLength = 1;
    this.localizacao_Text.rules = "uppercase"

    //observacao
    this.observacao_Text.name = "txtObservacao";
    this.observacao_Text.maxLength = 100;

    // volume
    this.volume_Text.name = "txtVolume";
    this.volume_Text.rules = "onlynumbers";
    this.volume_Text.textAlign = "center";
    this.volume_Text.maxLength = 4;
    this.volume_Text.minLength = 1;

    // temporizacao
    this.temporizacao_Text.name = "txtTemporizacao";
    this.temporizacao_Text.textAlign = "center";
    this.temporizacao_Text.maxLength = 8;
    this.temporizacao_Text.minLength = 0;
    this.temporizacao_Text.rules = "timefull";
    this.temporizacao_Text.regex = "time";

    //idade Minima
    this.idadeMin.name = "txtIdadeMinima";
    this.idadeMin.label = "Mínima";
    this.idadeMin.textAlign = "center";
    this.idadeMin.minLength = 0;
    this.idadeMin.maxLength = 3;
    this.idadeMin.rules = "onlynumbers";

    //idade Maxima
    this.idadeMax.name = "txtIdadeMaxima";
    this.idadeMax.label = "Máxima";
    this.idadeMax.textAlign = "center";
    this.idadeMax.minLength = 0;
    this.idadeMax.maxLength = 3;
    this.idadeMax.rules = "onlynumbers";

    // Tab Área + 
    this.areaMae_Option.name = "cbAreaMae";
    this.areaMae_Option.add("", "", 0);
    const sortArea: AreaReparticaoSort = { nome: SortOperationKind.ASC };
    this.areaReparticaoService.readAreaReparticao(sortArea, null)
      .subscribe(({ reparticaoArea }: read_AreaReparticao) => {
        const nodes: AreaReparticao[] = reparticaoArea.nodes;
        nodes.forEach((node: AreaReparticao) => {
          this.areaMae_Option.add(node.nome, node.nome, node.id)
        })
      });

    this.controle_OptionsGroup.name = "controleOptionsGroup";

    this.controle_OptionsGroup.add(0, "Arquivar registro de identificação na saída", "arquivarIdentificacao", false, false, false, 1);
    this.controle_OptionsGroup.add(1, "Controlar direção", "controlarDirecao", false, false, false, 2);
    this.controle_OptionsGroup.add(2, "Controlar rota", "controlarRota", false, false, false, 3);
    this.controle_OptionsGroup.add(3, "Recolher cartão rotativo", "recolherCartao", false, false, false, 4);
    this.controle_OptionsGroup.add(4, "Temporizar passagem", "temporizarAcesso", false, false, false, 5);
    this.controle_OptionsGroup.add(5, "Validação externa (integração de software)", "validacaoExterna", false, false, false, 6);
    this.controle_OptionsGroup.add(6, "Validar acesso a garagem", "validarGaragem", false, false, false, 7);
    this.controle_OptionsGroup.add(7, "Validar afastamento", "validarAfastamento", false, false, false, 8);
    this.controle_OptionsGroup.add(8, "Validar contratação", "validarContratacao", false, false, false, 9);
    this.controle_OptionsGroup.add(9, "Validar e computar crédito", "validarCredito", false, false, false, 10);
    this.controle_OptionsGroup.add(10, "Validar exame médico", "validarExameMedico", false, false, false, 11);
    this.controle_OptionsGroup.add(11, "Validar férias", "validarFerias", false, false, false, 12);
    this.controle_OptionsGroup.add(12, "Validar habilitação", "validarHabilitacao", false, false, false, 13);
    this.controle_OptionsGroup.add(13, "Validar identificador", "validarIdentificador", false, false, false, 14);
    this.controle_OptionsGroup.add(14, "Validar integração", "validarIntegracao", false, false, false, 15);
    this.controle_OptionsGroup.add(15, "Validar licenciamento do veículo", "validarLicenciamento", false, false, false, 16);
    this.controle_OptionsGroup.add(16, "Validar segurança", "validarSeguranca", false, false, false, 17);

    const find = null;
    const filter = { select: "Nome", field: "nome", value: "" };

    this.settings
      .subscribe((site: SiteConfig) => {
        if (site != null) {
          this.siteId = site.id;
          const filterSite: SetorReparticaoFilter = { siteId: { eq: this.siteId } };
          this.treeviewPopulate(filterSite);
        }
      });

    this.treeviewItem
      .subscribe((setorId: string) => {
        if (setorId != null) {
          this.filter = { setorId: { eq: parseInt(setorId) } };
          this.update_Grid(null, { select: "Nome", field: "nome", value: "" });
          this.actionbuttomService.top_action_buttons.forEach(topButton => {
            topButton.visibled = true;
          });
        }
      });
  }

  ngOnInit() {
    // this.router.events
    //   .pipe(filter((event: RouterEvent) => event instanceof NavigationEnd))
    //   .subscribe(() => {
    //     this.update_Grid(null, { select: "Nome", field: "nome", value: "" });
    //   });
  }

  ngAfterViewInit(): void {
    this.onResize();
  }

  onActionButtom_Click(actionButtomSelect: any) {
    switch (actionButtomSelect.text) {
      case "forms.buttons.create": {
        this.id = undefined;
        this.editable = true;
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
        break;
      }
    }
  }

  updateDataLoad() {
    this.showSpinner = true;

    const filter: AreaReparticaoFilter = { id: { eq: this.id } };
    this.areaReparticaoService.readAreaReparticao(this.order_by, filter)
      .subscribe(
        ({ reparticaoArea }: read_AreaReparticao) => {
        this.reparticaoArea = reparticaoArea.nodes[0];;
        this.nome_Text.text = this.reparticaoArea.nome;
        this.tipo_Option.select(this.reparticaoArea.tipo as number);
        this.localizacao_Text.text = this.reparticaoArea.localizacao;
        this.observacao_Text.text = this.reparticaoArea.observacao;
        this.areaMae_Option.select(this.reparticaoArea.areaMaeId);
        this.areaMae_Option.enableAll();
        this.areaMae_Option.disable(this.id);
        this.volume_Text.text = this.reparticaoArea.volumePermitido?.toString();
        this.temporizacao_Text.setTextWithMask(this.reparticaoArea.temporizacaoAcesso);
        this.idadeMax.text = this.reparticaoArea.idadeMaxima?.toString();
        this.idadeMin.text = this.reparticaoArea.idadeMinima?.toString();
        this.listView_AreaInterligada.gridUpdate(this.reparticaoArea.areasInterligadas);
        this.listView_AreaVisita.gridUpdate(this.reparticaoArea.controleVisitas);
        this.listView_AreaAcesso.gridUpdate(this.reparticaoArea.niveisRotativos);

        this.controle_OptionsGroup.populate(this.reparticaoArea);

        this.showSpinner = false;
      });
  }

  onListView_Change(rowSelect?: rowSelect) {
    if (rowSelect.registro) {
      this.id = rowSelect.id;
    } else {
      if (rowSelect.exclude == "yes") {
        this.areaReparticaoService.deleteAreaReparticao(rowSelect.id)
          .subscribe(({ data }: delete_AreaReparticao) => {
            if (data.reparticaoArea_Excluir.sucesso == true) {
              const find = { field: "id", value: rowSelect.id, type: "DEL" }
              this.update_Grid(find)

            } else {
              const objeto = JSON.parse(data.reparticaoArea_Excluir.objeto);
              this.alertService.show(data.reparticaoArea_Excluir.mensagemTipo,
                data.reparticaoArea_Excluir.mensagem,
                objeto);
            }
          })
      }
    }
  }

  onSave_Click() {
    this.nome_Text.validated = (this.nome_Text.text.length >= this.nome_Text.minLength);
    this.temporizacao_Text.validated = this.temporizacao_Text.condition();
    this.idadeMin.validated = (this.idadeMin.text.length == this.idadeMin.minLength) || (parseInt(this.idadeMin.text, 10) <= 145);
    this.idadeMax.validated = (this.idadeMax.text.length == this.idadeMax.minLength) || (parseInt(this.idadeMax.text, 10) <= 145);

    const idadeMinMax: boolean = (parseInt(this.idadeMax.text) - parseInt(this.idadeMin.text) >= 0);
    const idadeMinMaxValidacao: boolean = ( this.idadeMin.text != "" && this.idadeMax.text != "");

    if(!this.nome_Text.validated) {
      this.alertService.show("ERRO",
        "Existem campos obrigatórios não preenchidos ou preenchidos de forma incorreta. Verifique!",
        null);
    } else if(!this.temporizacao_Text.validated) {
      this.alertService.show("ERRO",
        "Atenção! Existem campos preenchidos de forma incorreta. Verifique!",
        null);
    } else if(!this.idadeMin.validated || !this.idadeMax.validated) {
      this.alertService.show("ERRO",
        "Atenção! Campo de Idade superior a 145 anos. Verifique!",
        null);
    } else if(!idadeMinMax && idadeMinMaxValidacao) {
      this.idadeMin.validated = this.idadeMax.validated = false;
      this.alertService.show("ERRO",
        "Atenção! Idade Mínima não pode ser superior a idade Máxima!",
        null);
    } else {

      this.showSpinner = true;

      const reparticaoArea: AreaReparticao = {
        id: this.id,
        setorId: <number>this.filter.setorId.eq,
        nome: this.nome_Text.text,
        tipo: this.tipo_Option.itemSelected.id,
        localizacao: this.localizacao_Text.text,
        areaMaeId: this.areaMae_Option.itemSelected.id,
        volumePermitido: parseInt(this.volume_Text.text),
        temporizacaoAcesso: this.temporizacao_Text.textMasked,
        idadeMaxima: parseInt(this.idadeMax.text),
        idadeMinima: parseInt(this.idadeMin.text),
        arquivarIdentificacao: this.controle_OptionsGroup.valueOf("arquivarIdentificacao"),
        controlarDirecao: this.controle_OptionsGroup.valueOf("controlarDirecao"),
        controlarRota: this.controle_OptionsGroup.valueOf("controlarRota"),
        recolherCartao: this.controle_OptionsGroup.valueOf("recolherCartao"),
        temporizarAcesso: this.controle_OptionsGroup.valueOf("temporizarAcesso"),
        validacaoExterna: this.controle_OptionsGroup.valueOf("validacaoExterna"),
        validarGaragem: this.controle_OptionsGroup.valueOf("validarGaragem"),
        validarAfastamento: this.controle_OptionsGroup.valueOf("validarAfastamento"),
        validarContratacao: this.controle_OptionsGroup.valueOf("validarContratacao"),
        validarCredito: this.controle_OptionsGroup.valueOf("validarCredito"),
        validarExameMedico: this.controle_OptionsGroup.valueOf("validarExameMedico"),
        validarFerias: this.controle_OptionsGroup.valueOf("validarFerias"),
        validarHabilitacao: this.controle_OptionsGroup.valueOf("validarHabilitacao"),
        validarIdentificador: this.controle_OptionsGroup.valueOf("validarIdentificador"),
        validarIntegracao: this.controle_OptionsGroup.valueOf("validarIntegracao"),
        validarLicenciamento: this.controle_OptionsGroup.valueOf("validarLicenciamento"),
        validarSeguranca: this.controle_OptionsGroup.valueOf("validarSeguranca"),
        observacao: this.observacao_Text.text,
        areasInterligadas: this.listView_AreaInterligada.dataGridBehavior.value?.map(item => {
          return {
            interligacaoAreaId: item.interligacaoAreaId,
            interligacaoSetorId: item.interligacaoSetorId
          }
        }) || [],
        controleVisitas: this.listView_AreaVisita.dataGridBehavior.value?.map(item => {
          return {
            pessoaGrupoId: item.pessoaGrupoId,
            quantidade: item.quantidade
          }
        }) || [],
        niveisRotativos: this.listView_AreaAcesso.dataGridBehavior.value?.map(item => {
          return {
            nivelAcessoId: item.nivelAcessoId,
          }
        }) || [],
      }

      if (reparticaoArea.id) {
        this.areaReparticaoService.updateAreaReparticao(reparticaoArea)
          .subscribe(({ data }: update_AreaReparticao) => {
            const objeto: any = JSON.parse(data.reparticaoArea_Alterar.objeto);
            if (data.reparticaoArea_Alterar.sucesso == true) {
              const find = { field: "id", value: objeto.Id }
              this.onClose_Click();
              this.update_Grid(find);
            } else {
              this.alertService.show(data.reparticaoArea_Alterar.mensagemTipo,
                data.reparticaoArea_Alterar.mensagem,
                objeto);
            }
            this.showSpinner = false;
          })
      } else {
        this.areaReparticaoService.createAreaReparticao(reparticaoArea)
          .subscribe(({ data }: create_AreaReparticao) => {
            const objeto: any = JSON.parse(data.reparticaoArea_Inserir.objeto);
            if (data.reparticaoArea_Inserir.sucesso == true) {
              const find = { field: "id", value: objeto.Id };
              this.onClose_Click(false);
              this.update_Grid(find);
            } else {
              this.alertService.show(data.reparticaoArea_Inserir.mensagemTipo,
                data.reparticaoArea_Inserir.mensagem,
                objeto);
            }
            this.showSpinner = false;
          })
      }
    }
  }

  treeviewPopulate(filter: SetorReparticaoFilter) {
    this.treeviewService.getTreeview()
      .subscribe((treeview: TreeView[]) => {
        treeview[0].item = this.setorReparticaoService.getSetorReparticaoTreeView(filter, false);
        this.treeviewService.setTreeview(treeview);
      });
  }

  // Método utilizado para filtrar o Grid
  onFilter_Change(filterSelect: Item) {
    switch (filterSelect.text) {
      case "Nome":
        this.filterGrid = { nome: { contains: filterSelect.value } };
        break;

      case "Tipo":
        if (TipoAreaSigla[filterSelect.value] != null) {
          this.filterGrid = { tipo: { eq: TipoAreaSigla[filterSelect.value] } };
        } else {
          this.filterGrid = undefined;
        }
        break;

      case "Localização":
        this.filterGrid = { localizacao: { contains: filterSelect.value } };
        break;

      case "Observação":
        this.filterGrid = { observacao: { contains: filterSelect.value } };
        break;
        
    }
    this.update_Grid();
  }

  onButtonInterligacao_Click(type: any) {
    switch (type) {
      case "insert":
        const paramList = this.listView_AreaInterligada.dataGridBehavior
          .value?.map(item => {return item.interligacaoAreaId});

        this.areaInterligacaoModalService.show(paramList, this.id, this.siteId);
        break;
      case "delete":
        const areasInterligacao: AreaInterligacao[] = this.listView_AreaInterligada.dataGridBehavior?.value;
        const indexId = areasInterligacao.findIndex(item => (item.interligacaoAreaId == this.inteligacaoAreaId))
        if (indexId >= 0) {
          areasInterligacao.splice(indexId, 1);
          this.listView_AreaInterligada.gridUpdate(areasInterligacao);
        }
        break;
    }
  }

  onButtonVisita_Click(type: any) {
    switch (type) {
      case "insert":
        const paramList = this.listView_AreaVisita.dataGridBehavior
          .value?.map(item => {return item.pessoaGrupoId});

        this.areaControleVisitaModalService.show(paramList);
        break;
      case "delete":
        const areaControleVisitas: AreaControleVisita[] = this.listView_AreaVisita.dataGridBehavior?.value;
        const indexId = areaControleVisitas.findIndex(item => item.pessoaGrupoId == this.pessoaGrupoId);
        if (indexId >= 0) {
          areaControleVisitas.splice(indexId, 1);
          this.listView_AreaVisita.gridUpdate(areaControleVisitas);
        }
        break;
    }
  }

  onButtonAcesso_Click(type: any) {
    switch (type) {
      case "insert":
        const paramList = this.listView_AreaAcesso.dataGridBehavior
          .value?.map(item => {return item.nivelAcessoId});
        this.areaAcessoModalService.show(paramList);
        break;
      case "delete":
        const areaNivelAcesso: AreaNivelRotativo[] = this.listView_AreaAcesso.dataGridBehavior?.value;
        const indexId = areaNivelAcesso.findIndex(item => item.nivelAcessoId == this.nivelAcessoId);
        if (indexId >= 0) {
          areaNivelAcesso.splice(indexId, 1);
          this.listView_AreaAcesso.gridUpdate(areaNivelAcesso);
        }
        break;
    }
  }

  onAreaInterligadaSelect(itemSelected: AreaReparticao) {
    const areaInterligadas: AreaInterligacao[] = this.listView_AreaInterligada.dataGridBehavior?.value || [];
    const areaInterligada: AreaInterligacao = {
      interligacaoAreaId: itemSelected.id,
      interligacaoArea: {nome: itemSelected.nome },
      interligacaoSetorId: itemSelected.setorId,
      interligacaoSetor: {nome: itemSelected.setor.nome}
    }
    areaInterligadas.push(areaInterligada);
    this.listView_AreaInterligada.gridUpdate(areaInterligadas);
  }

  onAreaVisitaSelect(itemSelected: AreaControleVisita) {
    const areaControleVisitas: AreaControleVisita[] = this.listView_AreaVisita.dataGridBehavior?.value || [];
    areaControleVisitas.push(itemSelected);
    this.listView_AreaVisita.gridUpdate(areaControleVisitas);
  }

  onAreaAcessoSelect(itemSelected: AreaReparticao) {
    const nivelAcesso: AreaNivelRotativo = {nivelAcessoId: itemSelected.id,
                                            nivelAcesso: {
                                              nome: itemSelected.nome
                                            }};
    const areaNiveisRotativo: AreaNivelRotativo[] = this.listView_AreaAcesso.dataGridBehavior?.value || [];
    areaNiveisRotativo.push(nivelAcesso);
    this.listView_AreaAcesso.gridUpdate(areaNiveisRotativo);
  }

  onListViewArea_Change(rowSelect?: rowSelect) {
    const registro: any = rowSelect.registro;
    this.inteligacaoAreaId = (registro.interligacaoAreaId)?? registro.interligacaoAreaId;
    this.pessoaGrupoId = (registro.pessoaGrupoId)?? registro.pessoaGrupoId;
    this.nivelAcessoId = (registro.nivelAcessoId)?? registro.nivelAcessoId;
  }

  update_Grid(find?: Find, filter?: Filter) {
    const filterGrid: AreaReparticaoFilter = { ...this.filter, ...this.filterGrid };
    this.listView_Area.processingShow();
    this.areaReparticaoService.readAreaReparticao(this.order_by, filterGrid)
      .subscribe(({ reparticaoArea }: read_AreaReparticao) => {
        this.actionbuttomService.enableButtons(0);
        this.listView_Area.gridUpdate(reparticaoArea.nodes, find, filter);
      });
  }

  onResize() {
    const maxHeightPanel = document.getElementById('areaComponent_Panel')?.clientHeight;

    this.controle_OptionsGroup.maxHeight = maxHeightPanel - 249;
    this.controle_OptionsGroup.maxHeight = maxHeightPanel - 249;

    const maxHeightListView = maxHeightPanel - 303;
    this.listView_AreaAcesso.maxHeight = maxHeightListView;
    this.listView_AreaInterligada.maxHeight = maxHeightListView;
    this.listView_AreaVisita.maxHeight = maxHeightListView;
  }

  onClose_Click(hideForm: boolean = true) {
    this.tabsArea_Options.select("tabOrdem");
    this.nome_Text.clear();
    this.tipo_Option.select(1);
    this.localizacao_Text.clear();
    this.observacao_Text.clear();
    this.areaMae_Option.clearSelect();
    this.volume_Text.clear();
    this.temporizacao_Text.clear();
    this.idadeMax.clear();
    this.idadeMin.clear();
    this.listView_AreaInterligada.clear();
    this.listView_AreaVisita.clear();
    this.listView_AreaAcesso.clear();
    this.controle_OptionsGroup.reset();
    if (hideForm == true) {
      this.actionbuttomService.hideForm()
    } else {
      this.nome_Text.focus();
    }
  }
  
  ngOnDestroy() {
    this.settings?.unsubscribe();
    this.treeviewItem?.unsubscribe();
  }


}



