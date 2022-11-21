import { Component, OnDestroy, OnInit } from '@angular/core';

import { ListViewGrid, Find, Filter, rowSelect } from 'src/app/@theme/components/grid/list-view/service/list-view.service';
import { InputLabel } from 'src/app/@theme/components/form/input-label/service/input-label.service';
import { AlertServiceComponent } from 'src/app/@theme/components/form/alert-card/service/alert-card.service';
import { TextareaLabel } from 'src/app/@theme/components/form/textarea-label/service/textarea-label.service';
import { RadioOptions } from 'src/app/@theme/components/form/radio/service/radio.service';
import { SortOperationKind } from 'src/app/@core/api/generic-graphql';
import { TabsService } from 'src/app/@theme/layouts/tabs/service/tabs.service';
import { ComboOptions, Item } from 'src/app/@theme/components/form/combobox/service/combobox.service';
import { read_Site, Site, SiteData, SiteFilter, SiteSort } from 'src/app/@core/data/reparticao-site';
import {
  read_AreaReparticao,
  AreaReparticao,
  AreaReparticaoData,
  AreaReparticaoFilter,
  AreaReparticaoSort
} from 'src/app/@core/data/reparticao-area';

import { ActionButtomService } from 'src/app/@theme/components/grid/action-buttom/service/action-button.service';
import {
  EstacionamentoVagaData,
  EstacionamentoVaga,
  create_EstacionamentoVaga,
  read_EstacionamentoVaga,
  update_EstacionamentoVaga,
  EstacionamentoVagaFilter,
  delete_EstacionamentoVaga,
  EstacionamentoVagaSort
} from 'src/app/@core/data/reparticao-vaga-estacionamento';

import { TipoVagaEstacionamento, TipoAreaSigla, TipoUsuario } from 'src/app/@core/enum';

import { PessoaInternaModalService } from 'src/app/@theme/modals/pessoa-interna/service/pessoa-modal.service';
import { PessoaInternaUsuario, PessoaInternaUsuarioFilter } from 'src/app/@core/data/usuario-pessoa-interna';
import { BehaviorSubject } from 'rxjs';
import { TreeviewService } from 'src/app/@theme/layouts/treeview/service/treeview.service';
import { ConfigStorage, SiteConfig } from 'src/app/@core/storage/config/config';
import { TreeView } from 'src/app/@theme/layouts/treeview/service/treeview';
import { NavigationEnd, Router, RouterEvent } from '@angular/router';
import { filter } from 'rxjs/operators';
import { read_SetorReparticao, SetorReparticao, SetorReparticaoData, SetorReparticaoFilter, SetorReparticaoSort } from 'src/app/@core/data/reparticao-setor';
import { VeiculoInternoUsuario, VeiculoInternoUsuarioFilter } from 'src/app/@core/data/usuario-veiculo-interno';
import { VeiculoInternoModalService } from 'src/app/@theme/modals/veiculo-interno/service/veiculo-interno-modal.service';


@Component({
  selector: 'nex-estacionamento',
  templateUrl: './estacionamento.component.html',
  styleUrls: ['./estacionamento.component.scss']
})

export class EstacionamentoVagaComponent implements OnInit, OnDestroy {

  id: number = 0;
  nomeEstacionamento_Text: InputLabel = new InputLabel();
  tipo_Option: ComboOptions = new ComboOptions();
  localizacao_Text: InputLabel = new InputLabel();
  observacao_Text: TextareaLabel = new TextareaLabel();
  site_Option: ComboOptions = new ComboOptions();
  tipoUsuario_Options: RadioOptions = new RadioOptions;
  setor_Option: ComboOptions = new ComboOptions();
  area_Option: ComboOptions = new ComboOptions();
  pessoa_Text: InputLabel = new InputLabel();
  usuarioVinculado: string;

  usuarioVinculadoId: number = 0;

  ultimoAcesso_Text: InputLabel = new InputLabel();

  pessoaModalService: PessoaInternaModalService = new PessoaInternaModalService();
  veiculoModalService: VeiculoInternoModalService = new VeiculoInternoModalService();

  tabEstacionamento: TabsService = new TabsService();

  listView_VagaEstacionamento: ListViewGrid = new ListViewGrid();

  order_by: EstacionamentoVagaSort = { garagem: SortOperationKind.ASC }

  filterPessoaInterna: PessoaInternaUsuarioFilter;
  filterVeiculoInterno: VeiculoInternoUsuarioFilter;

  filter: EstacionamentoVagaFilter;
  filterGrid: EstacionamentoVagaFilter;

  estacionamentoVaga: EstacionamentoVaga;

  alertService: AlertServiceComponent = new AlertServiceComponent();

  settings: BehaviorSubject<any>;
  treeviewItem: BehaviorSubject<any>;
  showSpinner: boolean = false;

  siteId: number = 0;
  setorId: number = 0;
  areaId: number = 0;

  editable: boolean;

  constructor(
    public actionbuttomService: ActionButtomService,
    private estacionamentoVagaService: EstacionamentoVagaData,
    private treeviewService: TreeviewService,
    private siteService: SiteData,
    private setorService: SetorReparticaoData,
    private areaReparticaoService: AreaReparticaoData,
    private config: ConfigStorage,
    private router: Router) {

    this.settings = this.config.siteSubject();
    this.treeviewItem = this.treeviewService.itemSubject();

    this.tabEstacionamento.add("tabVinculo", "Vinculo", true, "block");
    this.tabEstacionamento.add("tabObservacao", "Observação", false, "block");

    this.actionbuttomService.relationGrid = "lstVagaEstacionamento";

    this.actionbuttomService.recurso = "1C";
    this.actionbuttomService.top_action_buttons = [
      { "id": 0, "text": "forms.buttons.create", "visibled": false, "enabled": true, "condition": "always", "openForm": true, "editable": "new", },
      { "id": 1, "text": "forms.buttons.update", "visibled": false, "enabled": false, "condition": "select", "openForm": true, "editable": "yes", },
      { "id": 2, "text": "forms.buttons.read", "visibled": false, "enabled": false, "condition": "select", "openForm": true, "editable": "no", },
      { "id": 3, "text": "forms.buttons.delete", "visibled": false, "enabled": false, "condition": "multi", "openForm": false, "question": "forms.questions.delete" }
    ]


    this.listView_VagaEstacionamento.name = "lstVagaEstacionamento";
    this.listView_VagaEstacionamento.title = "Lista Vagas do Estacionamento";
    this.listView_VagaEstacionamento.grid = [
      { "header": "Vaga", "field": "garagem", "width": 10, "align": "left" },
      { "header": "Tipo", "field": "tipoGaragem", "width": 20, "align": "left", "enum": TipoVagaEstacionamento },
      { "header": "Área Vinculada", "entity": "areaVinculada","field": "nome", "width": 25, "align": "left" },
      { "header": "Usuário Vinculado", "field": "usuarioVinculado", "width": 25, "align": "left" },
      { "header": "Usuário Tipo", "field": "usuarioTipo", "width": 20, "align": "left", "enum": TipoUsuario }
    ];

    this.pessoaModalService.name = "pessoaModal";
    this.pessoaModalService.pesquisaPessoa_Option.name = "cbPesquisa";

    this.veiculoModalService.name = "veiculosModals";
    this.veiculoModalService.pesquisaVeiculo_Option.name = "cbPesquisaVeiculo";

    this.pessoaModalService.grid = [
      { "header": "Nome", "field": "nome", "width": 50, "align": "left" },
      { "header": "Área", "entity": "area", "field": "nome", "width": 25, "align": "left" },
      { "header": "Setor", "entity": ["area", "setor"], "field": "nome", "width": 25, "align": "left" }
    ];

    this.veiculoModalService.grid = [
      { "header": "Placa", "field": "placa", "width": 15, "align": "left" },
      { "header": "Modelo", "entity": "modelo", "field": "veiculoModelo", "width": 15, "align": "left" },
      { "header": "Cor", "field": "cor", "width": 15, "align": "left" },
      { "header": "Setor", "entity": ["area", "setor"], "field": "nome", "width": 20, "align": "left" },
      { "header": "Área", "entity": "area", "field": "nome", "width": 20, "align": "left" }
      
    ];

    this.nomeEstacionamento_Text.name = "txtNome";
    this.nomeEstacionamento_Text.maxLength = 10;
    this.nomeEstacionamento_Text.minLength = 1;
    this.nomeEstacionamento_Text.rules = "uppercase"

    this.observacao_Text.name = "txtObservacao";
    this.observacao_Text.maxLength = 100;

    this.site_Option.name = "cbSite";
    this.setor_Option.name = "cbSetor"
    this.area_Option.name = "cbArea";

    this.pessoa_Text.name = "txtPessoa";
    this.pessoa_Text.disable();
    this.pessoa_Text.readOnly = true;
    this.pessoa_Text.findButtonDisabled = true;

    this.tipo_Option.name = "cbTipo";
    this.tipo_Option.add("PERMANENTE", "permanente", 1, true);
    this.tipo_Option.add("COMPARTILHADA", "compartilhada", 2);
    this.tipo_Option.add("ROTATIVA VINCULADA", "vinculada", 3);
    this.tipo_Option.add("ROTATIVA NÃO VINCULADA", "naoVinculada", 4);

    this.localizacao_Text.name = "txtLocalizacao";
    this.localizacao_Text.rules = "uppercase";
    this.localizacao_Text.maxLength = 30;

    this.ultimoAcesso_Text.name = "txtUltimoAcesso";
    this.ultimoAcesso_Text.disabled = true;
    this.ultimoAcesso_Text.rules = "date";

    this.tipoUsuario_Options.name = "cbTipoUsuario";
    this.tipoUsuario_Options.add(1, "Pessoa", "pessoa", true);
    this.tipoUsuario_Options.add(3, "Veículo", "veiculo");

    this.onUsuarioTipo_Change();

    this.settings
      .subscribe((site: SiteConfig) => {
        if (site != null) {
          this.siteId = site.id;
          const filterSite: AreaReparticaoFilter = { setor: { siteId: { eq: site.id } }, tipo: { eq: TipoAreaSigla.ESTACIONAMENTO } };
          this.treeviewPopulate(filterSite);
        }
      });

    this.treeviewItem
      .subscribe((estacionamentoId: string) => {
        if (estacionamentoId != null) {
          this.filter = { estacionamentoId: { eq: parseInt(estacionamentoId) } };
          this.update_Grid(null, { select: "garagem", field: "garagem", value: "" });
          this.actionbuttomService.top_action_buttons.forEach(topButton => {
            topButton.visibled = true;
          });
        }
      });

  }

  ngOnInit() {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.update_Grid(null, { select: "Nome", field: "nomeEstacionamento", value: "" });
      });
  }


  onActionButtom_Click(actionButtomSelect: any) {
    switch (actionButtomSelect.text) {
      case "forms.buttons.create":
        this.id = undefined;
        this.dataForm_Clean();
        this.nomeEstacionamento_Text.focus();
        this.editable = true;
        break;

      case "forms.buttons.update":
        this.updateDataLoad();
        this.nomeEstacionamento_Text.focus(true);
        this.editable = true;
        break;

      case "forms.buttons.read":
        this.updateDataLoad();
        this.editable = false;
        break;

    }
  }

  onUsuarioTipo_Change(){
    if(this.tipoUsuario_Options.itemSelected.checked == true ){
      this.usuarioVinculado = "Pessoa";
      this.pessoa_Text.clear();
    }else{
      this.usuarioVinculado = "Veículo";
      this.pessoa_Text.clear();
    }
  }

  onTipo_Change(tipo: Item) {
    switch (tipo.id) {
      case 1:
        if(this.site_Option.disabled) {
          this.site_Option.enable();
          this.setor_Option.enable();
          this.area_Option.enable();
        }
        this.siteId = 0;
        this.site_Option.clear();
        this.setor_Option.clear();
        this.area_Option.clear();
        this.sitePopulate();
        this.tipoUsuario_Options.disable();
        this.tipoUsuario_Options.select(1);
        this.pessoa_Text.disable();
        this.pessoa_Text.clear();
        this.usuarioVinculadoId = 0;
        this.pessoa_Text.findButtonDisabled = true;
        this.tabEstacionamento.select("tabVinculo");  
        break;

      case 2:

        if(this.site_Option.disabled) {
          this.site_Option.enable();
          this.setor_Option.enable();
          this.area_Option.enable(); 
        }
        this.siteId = 0;
        this.site_Option.clear();
        this.setor_Option.clear();
        this.area_Option.clear();
        this.sitePopulate();
        this.tipoUsuario_Options.disable();
        this.tipoUsuario_Options.select(1);
        this.onUsuarioTipo_Change();
        this.pessoa_Text.clear(); 
        this.pessoa_Text.disable();
        this.usuarioVinculadoId = 0;
        this.pessoa_Text.findButtonDisabled = true;
        this.tabEstacionamento.select("tabVinculo");
        break;
        
      case 3:

        if(this.site_Option.disabled) {
          this.site_Option.enable();
          this.setor_Option.enable();
          this.area_Option.enable();   
        }
        this.siteId = 0;
        this.site_Option.clear();
        this.setor_Option.clear();
        this.area_Option.clear();
        this.sitePopulate();
        this.tipoUsuario_Options.disable();
        this.tipoUsuario_Options.select(1);
        this.onUsuarioTipo_Change();
        this.pessoa_Text.clear(); 
        this.pessoa_Text.disable();
        this.usuarioVinculadoId = 0;
        this.pessoa_Text.findButtonDisabled = true;
        this.tabEstacionamento.select("tabVinculo"); 
        break;

      case 4:
        this.site_Option.clear(); this.site_Option.disable();
        this.setor_Option.clear(); this.setor_Option.disable();
        this.area_Option.clear(); this.area_Option.disable();
        this.tipoUsuario_Options.select(1);
        this.onUsuarioTipo_Change();
        this.tipoUsuario_Options.disable();
        this.tabEstacionamento.select("tabVinculo");
        this.pessoa_Text.clear(); 
        this.pessoa_Text.disable(); 
        this.pessoa_Text.findButtonDisabled = true; 
        this.usuarioVinculadoId = 0;
        break;

    }
  }

  updateDataLoad() {
    this.showSpinner = true;

    const filter: EstacionamentoVagaFilter = { id: { eq: this.id } };
    this.estacionamentoVagaService.readEstacionamentoVagas(this.order_by, filter)
      .subscribe(({ reparticaoEstacionamentoVaga }: read_EstacionamentoVaga) => {
        this.estacionamentoVaga = reparticaoEstacionamentoVaga.nodes[0];
        this.id = this.estacionamentoVaga.id;
        this.nomeEstacionamento_Text.text = this.estacionamentoVaga.garagem;
        this.tipo_Option.select(this.estacionamentoVaga.tipoGaragem as number);
        this.localizacao_Text.text = this.estacionamentoVaga.localizacao;
        this.observacao_Text.text = this.estacionamentoVaga.observacao;
        this.tipoUsuario_Options.select(this.estacionamentoVaga.usuarioTipo);

        if(this.tipoUsuario_Options.itemSelected.checked == true ){
          this.pessoa_Text.text  = this.estacionamentoVaga.pessoaInterna?.nome;
        }else {
          this.pessoa_Text.text = this.estacionamentoVaga.veiculoInterno?.placa
        }
        
        this.siteId = this.estacionamentoVaga.areaVinculada?.setor?.siteId;
        this.setorId = this.estacionamentoVaga.areaVinculada?.setorId;
        this.areaId = this.estacionamentoVaga.areaVinculadaId;
       
        switch (this.estacionamentoVaga.tipoGaragem) {
          case 1: 
              this.sitePopulate();
              break;
          case 2:
              this.sitePopulate();  
              break;
          case 3:
              this.sitePopulate();   
              break;
          case 4:
              this.site_Option.clear(); this.site_Option.disable();
              this.setor_Option.clear(); this.setor_Option.disable();
              this.area_Option.clear(); this.area_Option.disable();
              this.tipoUsuario_Options.disable();
              this.pessoa_Text.clear(); this.pessoa_Text.disable(); this.pessoa_Text.findButtonDisabled = true; this.usuarioVinculadoId = 0;      
              break;
        }
     
        this.usuarioVinculadoId = this.estacionamentoVaga.pessoaInterna?.id;

        
        this.showSpinner = false;
      });
  }

  onListView_Change(rowSelect?: rowSelect) {
    if (rowSelect.registro) {
      this.id = rowSelect.id;
    } else {
      if (rowSelect.exclude == "yes") {
        this.estacionamentoVagaService.deleteEstacionamentoVaga(rowSelect.id)
          .subscribe(({ data }: delete_EstacionamentoVaga) => {
            if (data.reparticaoEstacionamentoVaga_Excluir.sucesso == true) {
              const find = { field: "id", value: rowSelect.id, type: "DEL" }
              this.update_Grid(find)

            } else {
              const objeto = JSON.parse(data.reparticaoEstacionamentoVaga_Excluir.objeto);
              this.alertService.show(data.reparticaoEstacionamentoVaga_Excluir.mensagemTipo,
                data.reparticaoEstacionamentoVaga_Excluir.mensagem,
                objeto);
            }
          })
      }
    }
  }

  dataForm_Clean() {
    this.nomeEstacionamento_Text.clear();
    this.area_Option.select(0);
    this.tipo_Option.select(1);
    this.localizacao_Text.clear();
    this.observacao_Text.clear();
    this.pessoa_Text.clear();
    this.usuarioVinculadoId = 0;
    this.pessoa_Text.findButtonDisabled = true;
    this.site_Option.enable();
    this.tipoUsuario_Options.enable();
    this.tipoUsuario_Options.select(1);
    this.usuarioVinculado = "Pessoa";


    this.siteId = 0;

    this.sitePopulate();
  }


  sitePopulate() {
    this.site_Option.clear();

    this.site_Option.add("", null, 0);

    this.site_Option.itemSelected.text = "Aguarde...";
    this.siteService.orderBy = { nome: SortOperationKind.ASC };
    this.siteService.where = undefined;

    this.siteService.read()
      .subscribe(({ reparticaoSite }: read_Site) => {

        this.site_Option.itemSelected.text = "";

        const sites: Site[] = reparticaoSite.nodes;
        sites.forEach((site: Site) => {
          this.site_Option.add(site.nome, null, site.id, (site.id == this.siteId));
        });

        this.setor_Option.clear();
        this.setor_Option.disable();
        this.siteSelect({ id: this.siteId, text: "", value: "" });
      }, (error => {
        // Tratar erro subscribe...
      }))
  }

  siteSelect(siteSelect: Item) {
    
    if (siteSelect.id > 0) {
      this.setor_Option.enable();
      this.setor_Option.itemSelected.text = "Aguarde...";

      const orderBy: SetorReparticaoSort = { nome: SortOperationKind.ASC };
      const where: SetorReparticaoFilter = { siteId: { eq: siteSelect.id } };

      this.setorService.readSetorReparticao(orderBy, where)
        .subscribe(({ reparticaoSetor }: read_SetorReparticao) => {

          this.setor_Option.clear();

          const setores: SetorReparticao[] = reparticaoSetor.nodes;
          setores.forEach((setor: SetorReparticao) => {
            this.setor_Option.add(setor.nome, null, setor.id, (setor.id == this.setorId))
          })
          
          if(setores.length == 0) {
            this.setor_Option.itemSelected.text = "";
            this.setor_Option.disable();
          }

          this.area_Option.clear();
          this.setorSelect(this.setor_Option.itemSelected);

        }, (error => {
          // Tratar erro subscribe...
        }))
    } else {
      this.setor_Option.clear();
      this.setor_Option.disable();
      this.setorId = 0;
      const item: Item = {id: 0, text: null, value: null};
      this.setorSelect(item);
    }

  }

  setorSelect(setorSelect: Item) {
    if (setorSelect.id > 0) {
      this.area_Option.enable();
      if (this.tipo_Option.itemSelected.id == 1) {
        this.pessoa_Text.findButtonDisabled = false;
        this.tipoUsuario_Options.enable();
      }
      this.area_Option.itemSelected.text = "Aguarde...";

      const orderBy: AreaReparticaoSort = { nome: SortOperationKind.ASC };
      const where: AreaReparticaoFilter = { setorId: { eq: setorSelect.id } };

      this.areaReparticaoService.readAreaReparticao(orderBy, where)
        .subscribe(({ reparticaoArea }: read_AreaReparticao) => {

          this.area_Option.clear();

          const areas: AreaReparticao[] = reparticaoArea.nodes;
          areas.forEach((area: AreaReparticao) => {
            this.area_Option.add(area.nome, null, area.id, (area.id == this.areaId));
          });

          if(areas.length == 0) {
            this.area_Option.itemSelected.text = "";
            this.area_Option.disable();
          }

        }, (error => {
          // Tratar erro subscribe...
        }))
    } else {
      this.area_Option.clear();
      this.area_Option.disable();
      this.areaId = 0;
    }
  }

  onSave_Click() {
    let tipoUsuarios: number
    if(this.usuarioVinculadoId > 0){
       tipoUsuarios = this.tipoUsuario_Options.itemSelected.id
    }
    this.nomeEstacionamento_Text.validated = (this.nomeEstacionamento_Text.text.length >= this.nomeEstacionamento_Text.minLength);

    if (!this.nomeEstacionamento_Text.validated) {
      this.alertService.show("ERRO",
        "Existem campos obrigatórios não preenchidos ou preenchidos de forma incorreta. Verifique!",
        null);
    } else {

      this.showSpinner = true;

      const estacionamentoVaga: EstacionamentoVaga = {
        id: this.id,
        estacionamentoId: <number>this.filter.estacionamentoId.eq,
        areaVinculadaId: this.area_Option.itemSelected.id,
        garagem: this.nomeEstacionamento_Text.text,
        tipoGaragem: this.tipo_Option.itemSelected.id,
        localizacao: this.localizacao_Text.text,
        usuarioVinculadoId: this.usuarioVinculadoId,
        usuarioTipo: tipoUsuarios,
        observacao: this.observacao_Text.text
      }

      if (estacionamentoVaga.id) {
        this.estacionamentoVagaService.updateEstacionamentoVaga(estacionamentoVaga)
          .subscribe(({ data }: update_EstacionamentoVaga) => {
            const objeto: any = JSON.parse(data.reparticaoEstacionamentoVaga_Alterar.objeto);
            if (data.reparticaoEstacionamentoVaga_Alterar.sucesso == true) {
              const find = { field: "id", value: objeto.Id }
              this.onClose_Click();
              this.update_Grid(find);
            } else {
              this.alertService.show(data.reparticaoEstacionamentoVaga_Alterar.mensagemTipo,
                data.reparticaoEstacionamentoVaga_Alterar.mensagem,
                objeto);
            }
          })

      } else {

        this.estacionamentoVagaService.createEstacionamentoVaga(estacionamentoVaga)
          .subscribe(({ data }: create_EstacionamentoVaga) => {
            const objeto: any = JSON.parse(data.reparticaoEstacionamentoVaga_Inserir.objeto);
            if (data.reparticaoEstacionamentoVaga_Inserir.sucesso == true) {
              const find = { field: "id", value: objeto.Id };
              this.onClose_Click(false);
              this.update_Grid(find);
            } else {
              this.alertService.show(data.reparticaoEstacionamentoVaga_Inserir.mensagemTipo,
                data.reparticaoEstacionamentoVaga_Inserir.mensagem,
                objeto);
            }
          }, error => {
            console.log(error);
          });
      }
    }
  }

  onUsuarioTipo_Click(event?: any) {
    if (this.tipoUsuario_Options.itemSelected.checked == true ){
      this.pessoaModalService.show("Pessoa", null, this.area_Option.itemSelected.id);
    } else {
      this.veiculoModalService.show("Veículos",null, this.area_Option.itemSelected.id);
    }  
  }

  onUsuarioTipoClear_Click(event: any) {
    this.pessoa_Text.clear();
    this.usuarioVinculadoId = 0;
  }


  onFilter_Change(filterSelect: Item) {
    switch (filterSelect.text) {
      case "Vaga":
        this.filterGrid = { garagem: { contains: filterSelect.value } };
        break;

      case "Tipo":
        if(TipoVagaEstacionamento[filterSelect.value] != null){
          this.filterGrid = {tipoGaragem: { eq: TipoVagaEstacionamento[filterSelect.value]}}
        }else {
          this.filterGrid = undefined;
        }
        break;

      case "Área Vinculada":
        this.filterGrid = { areaVinculada: {nome: {contains: filterSelect.value}}};
        break;

      case "Usuário Vinculado":
        this.filterGrid = { pessoaInterna: {nome: {contains: filterSelect.value}}};
        break;

      case "Usuário Tipo":
        if(TipoUsuario[filterSelect.value] != null){
          this.filterGrid = { usuarioTipo: { eq: TipoUsuario[filterSelect.value]}};
        }else{
          this.filterGrid = undefined;
        }
    }
    this.update_Grid();
  }

  onPessoaModalService_Select(pessoaSelect: PessoaInternaUsuario) {
    if(this.tipoUsuario_Options.itemSelected.checked == true ){
       this.usuarioVinculadoId = pessoaSelect?.id;
       this.pessoa_Text.text = pessoaSelect?.nome;
    }

  }

  onVeiculoModalService_Select(veiculoSelect: VeiculoInternoUsuario) {
    if(this.tipoUsuario_Options.itemSelected.checked == false ){
       this.usuarioVinculadoId = veiculoSelect?.id;
       this.pessoa_Text.text = veiculoSelect?.placa;
    }
  }

  treeviewPopulate(filter: AreaReparticaoFilter) {
    this.treeviewService.getTreeview()
      .subscribe((treeview: TreeView[]) => {
        treeview[0].item = this.areaReparticaoService.getAreaReparticaoTreeView(filter);
        this.treeviewService.setTreeview(treeview);
      });
  }

  update_Grid(find?: Find, filter?: Filter) {
    const filterGrid: EstacionamentoVagaFilter = { ...this.filter, ...this.filterGrid };
    this.listView_VagaEstacionamento.processingShow();
    this.estacionamentoVagaService.readEstacionamentoVagas(this.order_by, filterGrid)
      .subscribe(({ reparticaoEstacionamentoVaga }: read_EstacionamentoVaga) => {
        this.actionbuttomService.enableButtons(0);
        const estacionamentoVagaNodes = reparticaoEstacionamentoVaga?.nodes.map(
          estacionamento => {
            let usuarioVinculado: string;
            switch(estacionamento.usuarioTipo) {
              case TipoUsuario['PESSOA INTERNA']:
                usuarioVinculado = estacionamento.pessoaInterna?.nome;
                break;
              case TipoUsuario['PESSOA EXTERNA']:
                usuarioVinculado = estacionamento.pessoaExterna?.nome;
                break;
              case TipoUsuario['VEÍCULO INTERNO']:
                usuarioVinculado = estacionamento.veiculoInterno?.placa;
                break;
              case TipoUsuario['VEÍCULO EXTERNO']:
                usuarioVinculado = estacionamento.VeiculoExterno?.placa;
                break;
            }

            return { ... estacionamento, ... {'usuarioVinculado': usuarioVinculado}}
          }
        )
        this.listView_VagaEstacionamento.gridUpdate(estacionamentoVagaNodes, find, filter);
      });
  }

  onClose_Click(hideForm: boolean = true) {
    this.dataForm_Clean();
    this.nomeEstacionamento_Text.clear();
    this.localizacao_Text.clear();
    this.observacao_Text.clear();

    if (hideForm == true) {
      this.actionbuttomService.hideForm();
      this.tabEstacionamento.select("tabVinculo");
    } else {
      this.nomeEstacionamento_Text.focus();
      this.tabEstacionamento.select("tabVinculo");
    }
  }

  ngOnDestroy(): void {
    this.settings?.unsubscribe();
    this.treeviewItem?.unsubscribe();
  }

}