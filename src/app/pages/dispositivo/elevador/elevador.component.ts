import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { ListViewGrid, Find, Filter, rowSelect } from 'src/app/@theme/components/grid/list-view/service/list-view.service';
import { ActionButtomService } from 'src/app/@theme/components/grid/action-buttom/service/action-button.service';
import { TextareaLabel } from '../../../@theme/components/form/textarea-label/service/textarea-label.service';
import { AlertServiceComponent } from 'src/app/@theme/components/form/alert-card/service/alert-card.service';
import { ComboOptions, Item } from 'src/app/@theme/components/form/combobox/service/combobox.service';
import { CamerasModalService } from 'src/app/@theme/modals/cameras/service/cameras-modal.service';
import { InputLabel } from 'src/app/@theme/components/form/input-label/service/input-label.service';
import { AreaReparticaoData, AreaReparticaoFilter } from 'src/app/@core/data/reparticao-area'
import { TreeviewService } from 'src/app/@theme/layouts/treeview/service/treeview.service';
import { ConfigStorage, SiteConfig } from 'src/app/@core/storage/config/config';
import { TabsService } from 'src/app/@theme/layouts/tabs/service/tabs.service';
import { TreeView } from 'src/app/@theme/layouts/treeview/service/treeview';

import { StatusColor } from 'src/app/@core/enum';

import { SortOperationKind } from 'src/app/@core/api/generic-graphql';
import { BoxPanel } from 'src/app/@theme/layouts';
import {
  create_ElevadorDispositivo,
  read_ElevadorDispositivo,
  update_ElevadorDispositivo,
  delete_ElevadorDispositivo,
  ElevadorDispositivoData,
  ElevadorDispositivo,
  ElevadorDispositivoSort,
  ElevadorDispositivoFilter
} from 'src/app/@core/data/dispositivo-elevador';
import { NavigationEnd, Router, RouterEvent } from '@angular/router';
import { filter } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';

export interface Parada {
  botao: number
  andar: InputLabel
  restrito: ComboOptions
}

@Component({
  selector: 'nex-elevador-component',
  templateUrl: 'elevador.component.html',
  host: {'(window:resize)': 'onResize($event)'},
  styleUrls: ['elevador.component.scss']
})
export class ElevadorDispositvoComponent implements OnInit, AfterViewInit, OnDestroy {

  id: number = 0;
  siteId: number = 0;
  parada: Parada[] = [];
  paradaItem: Parada
  nome_Text: InputLabel = new InputLabel();
  local_Text: InputLabel = new InputLabel();
  boxCamera: BoxPanel = new BoxPanel();
  observacao_Text: TextareaLabel = new TextareaLabel();
  listView_Camera: ListViewGrid = new ListViewGrid();

  filter: ElevadorDispositivoFilter;
  order_by: ElevadorDispositivoSort = { nome: SortOperationKind.ASC };
  settings: BehaviorSubject<any>;
  filterGrid: ElevadorDispositivoFilter;
  showSpinner: boolean = false;
  alertService: AlertServiceComponent = new AlertServiceComponent();
  treeviewItem: BehaviorSubject<any>;
  listView_Elevador: ListViewGrid = new ListViewGrid();
  camerasModalService: CamerasModalService = new CamerasModalService();
  elevadorDispositivo: ElevadorDispositivo;
  tabsConfiguracao_Option: TabsService = new TabsService();

  editable: boolean;

  constructor(public actionbuttomService: ActionButtomService,
    private config: ConfigStorage,
    private elevadorDispositivoService: ElevadorDispositivoData,
    private areaReparticaoService: AreaReparticaoData,
    private treeviewService: TreeviewService,
    private router: Router) {

    this.tabsConfiguracao_Option.add("tabElevador", "Elevador", true);
    this.tabsConfiguracao_Option.add("tabParada", "Parada", false, "grid", "#222b45");
    this.tabsConfiguracao_Option.add("tabCâmera", "Câmera", false, "block", "#222b45");
    this.boxCamera.add("btCheck", "check", false);

    this.settings = this.config.siteSubject();
    this.treeviewItem = this.treeviewService.itemSubject();
    
    this.actionbuttomService.relationGrid = "lstElevador";

    this.actionbuttomService.recurso = "26";
    this.actionbuttomService.top_action_buttons = [
      { "id": 0, "text": "forms.buttons.create", "visibled": false, "enabled": true, "condition": "always", "openForm": true, "editable": "new", },
      { "id": 1, "text": "forms.buttons.update", "visibled": false, "enabled": false, "condition": "select", "openForm": true, "editable": "yes", },
      { "id": 2, "text": "forms.buttons.read", "visibled": false, "enabled": false, "condition": "select", "openForm": true, "editable": "no", },
      { "id": 3, "text": "forms.buttons.delete", "visibled": false, "enabled": false, "condition": "multi", "openForm": false, "question": "forms.questions.delete" }
    ];

    this.listView_Elevador.name = "lstElevador";
    this.listView_Elevador.colorField = "status";
    this.listView_Elevador.colorEnum = StatusColor;
    this.listView_Elevador.title = "Lista de Elevadores";
    this.listView_Elevador.grid = [
      { "header": "Nome", "field": "nome", "width": 25, "align": "left" },
      { "header": "Localização", "field": "localizacao", "width": 25, "align": "left" },
      { "header": "Observação", "field": "observacao", "width": 50, "align": "left" }
    ];

    this.listView_Camera.name = "lstCameraElevador";
    this.listView_Camera.gridOnly = true;
    this.listView_Camera.noPaging = true;
    this.listView_Camera.noBorder = true;
    this.listView_Camera.grid = [{ "header": "Câmeras Associadas", "field": "nome", "width": 50, "align": "left" }];

    this.nome_Text.name = "txtNome";
    this.nome_Text.rules = "uppercase";
    this.nome_Text.maxLength = 30;
    this.nome_Text.minLength = 1;

    this.local_Text.name = "txtLocal";
    this.local_Text.rules = "uppercase";
    this.local_Text.maxLength = 30;
    this.local_Text.minLength = 1;

    this.observacao_Text.name = "txtObservacao";
    this.observacao_Text.regex = "noFilter";
    this.observacao_Text.maxLength = 100;

    let adicionarZero: any;
    for (let numeroAndar: number = 1; numeroAndar <= 48; numeroAndar++) {
      adicionarZero = ('00' + numeroAndar).slice(-2);
      this.paradaItem = { "botao": adicionarZero, "andar": new InputLabel(), "restrito": new ComboOptions() };

      this.paradaItem.andar.name = "txtAndar" + numeroAndar;
      this.paradaItem.andar.rules = "uppercase";
      this.paradaItem.andar.maxLength = 20;
      this.paradaItem.andar.minLength = 1;
      this.paradaItem.andar.disabled = (numeroAndar != 1);

      this.paradaItem.restrito.name = "cbRestrito" + numeroAndar;
      this.paradaItem.restrito.add("NÃO", "nao", 0, true);
      this.paradaItem.restrito.add("SIM", "sim", 1);
      this.paradaItem.restrito.disabled = (numeroAndar != 1);
      this.parada.push(this.paradaItem)

    }

    this.settings
      .subscribe((site: SiteConfig) => {
        if (site != null) {
          this.siteId = site.id;
          const filterSite: AreaReparticaoFilter = { setor: {siteId:{ eq: this.siteId }} };
          this.treeviewPopulate(filterSite);
        }
      });

    this.treeviewItem
      .subscribe((areaId: string) => {
        if (areaId != null) {
          if (!this.filter){
            this.actionbuttomService.top_action_buttons.forEach(topButton => {
              topButton.visibled = true;
            })
          }
          this.filter = { areaId: { eq: parseInt(areaId) } };
          this.listView_Elevador.clearFilter();
        }
      });
  }

  ngOnInit() {
    this.router.events
      .pipe(filter((event: RouterEvent) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.update_Grid(null, { select: "Nome", field: "nome", value: "" });
      });
  }

  ngAfterViewInit(): void {
      this.onResize();
  }

  onActionButtom_Click(actionbuttomSelect: any) {
    switch (actionbuttomSelect.text) {
      case "forms.buttons.create":
        this.id = undefined;
        this.nome_Text.focus();
        this.editable = true;
        break;

      case "forms.buttons.update":
        this.updateDataLoad();
        this.nome_Text.focus(true);
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

    const filter: ElevadorDispositivoFilter = { id: { eq: this.id } };
    this.elevadorDispositivoService.readElevadorDispositivos(this.order_by, filter)
      .subscribe(({ dispositivoElevador }: read_ElevadorDispositivo) => {
        this.elevadorDispositivo = dispositivoElevador.nodes[0];
        this.nome_Text.text = this.elevadorDispositivo.nome;
        this.local_Text.text = this.elevadorDispositivo.localizacao;
        this.observacao_Text.text = this.elevadorDispositivo.observacao;
        this.parada.forEach((paradaItem, index) => {
          this.parada[index].andar.text = this.elevadorDispositivo["andar" + paradaItem.botao + "Nome"];
          this.parada[index].restrito.select(this.elevadorDispositivo["andar" + paradaItem.botao + "Restrito"]);

          this.parada[index].andar.disable();
          this.parada[index].restrito.disable();

          if(index >= 1 && this.parada[index - 1].andar.text.length > 0) {
            this.parada[index].andar.enable();
            this.parada[index].restrito.enable();
          } else if(index == 0) {
            this.parada[index].andar.enable();
            this.parada[index].restrito.enable();
          } else if(this.parada[index].andar.text.length > 0) {
            this.parada[index].andar.enable();
            this.parada[index].restrito.enable();
          }

        });
        this.listView_Camera.gridUpdate(this.elevadorDispositivo.cameras.map(cameras => { return cameras.camera }));

        this.showSpinner = false;

      });
  }

  onListView_Change(rowSelect?: rowSelect) {
    if (rowSelect.registro) {
      this.id = rowSelect.id;
    } else {
      if (rowSelect.exclude == "yes") {
        this.elevadorDispositivoService.deleteElevadorDispositivo(rowSelect.id)
          .subscribe(({ data }: delete_ElevadorDispositivo) => {
            if (data.dispositivoElevador_Excluir.sucesso == true) {
              const find = { field: "id", value: rowSelect.id, type: "DEL" }
              this.update_Grid(find)
            } else {
              const objeto = JSON.parse(data.dispositivoElevador_Excluir.objeto);
              this.alertService.show(data.dispositivoElevador_Excluir.mensagemTipo,
                data.dispositivoElevador_Excluir.mensagem,
                objeto);
            }
          })
      }
    }
  }

  onSave_Click() {
    this.nome_Text.validated = (this.nome_Text.text.length >= this.nome_Text.minLength);
    const paradaIntervalos: boolean = this.parada.filter(parada => parada.andar.validated == false).length > 0; 

    if (!this.nome_Text.validated) {
      this.alertService.show("ERRO",
        "Existem campos obrigatórios não preenchidos ou preenchidos de forma incorreta. Verifique!",
        null);
    } else if (paradaIntervalos) {
      this.alertService.show("ERRO",
        "Existem intervalo(s) não preenchido(s) na configuração dos andares. Verifique!",
        null);
    } else {
      this.showSpinner = true;

      const elevadorDispositivo: ElevadorDispositivo = {
        id: this.id,
        areaId: <number>this.filter.areaId.eq,
        nome: this.nome_Text.text,
        localizacao: this.local_Text.text,
        observacao: this.observacao_Text.text,
        cameras: this.listView_Camera.dataGridBehavior
          .value?.map(cameras => {
            return { cameraId: cameras.id }
          })
      };

      const Andares: Object = {};
      this.parada.forEach((paradaItem, index) => {
        Andares["andar" + paradaItem.botao + "Nome"] = this.parada[index].andar.text;
        Andares["andar" + paradaItem.botao + "Restrito"] = (this.parada[index].restrito.itemSelected.id == 1);
      });

      if (elevadorDispositivo.id) {
        this.elevadorDispositivoService.updateElevadorDispositivo({ ...elevadorDispositivo, ...Andares })
          .subscribe(({ data }: update_ElevadorDispositivo) => {
            const objeto: any = JSON.parse(data.dispositivoElevador_Alterar.objeto);
            if (data.dispositivoElevador_Alterar.sucesso == true) {
              const find = { field: "id", value: objeto.Id }
              this.onClose_Click();
              this.update_Grid(find);
            } else {
              this.alertService.show(data.dispositivoElevador_Alterar.mensagemTipo,
                data.dispositivoElevador_Alterar.mensagem,
                objeto);
            }
            this.showSpinner = false;
          });
      } else {
        this.elevadorDispositivoService.createElevadorDispositivo({ ...elevadorDispositivo, ...Andares })
          .subscribe(({ data }: create_ElevadorDispositivo) => {
            const objeto: any = JSON.parse(data.dispositivoElevador_Inserir.objeto);
            if (data.dispositivoElevador_Inserir.sucesso == true) {
              const find = { field: "id", value: objeto.Id };
              this.onClose_Click(false);
              this.update_Grid(find);
            } else {
              this.alertService.show(data.dispositivoElevador_Inserir.mensagemTipo,
                data.dispositivoElevador_Inserir.mensagem,
                objeto);
            }
            this.showSpinner = false;
          })
      }
    }
  }

  treeviewPopulate(filter: AreaReparticaoFilter) {
    this.filter = undefined;
    this.treeviewService.getTreeview()
      .subscribe((treeview: TreeView[]) => {
        treeview[0].item = this.areaReparticaoService.getAreaReparticaoTreeView(filter);
        this.treeviewService.setTreeview(treeview);
      });
  }

  onBoxCamera_Click(type: any) {
    const paramList: Array<number> = this.listView_Camera.dataGridBehavior
      .value?.map(cameras => {return cameras.id});
    this.camerasModalService.show(this.siteId, paramList);
  }

  onCameraSelectGroup(camerasAssociadas: any[]) {
    this.listView_Camera.gridUpdate(camerasAssociadas);
  }

  // Método utilizado para filtrar o Grid
  onListView_Filter(filterSelect: Item) {
    switch (filterSelect.text) {
      case "Nome":
        this.filterGrid = { nome: { contains: filterSelect.value } };
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

  update_Grid(find?: Find, filter?: Filter) {
    const filterGrid: ElevadorDispositivoFilter = { ...this.filter, ...this.filterGrid };
    this.listView_Elevador.processingShow();
    this.elevadorDispositivoService.readElevadorDispositivos(this.order_by, filterGrid)
      .subscribe(({ dispositivoElevador }: read_ElevadorDispositivo) => {
        this.actionbuttomService.enableButtons(0);
        this.listView_Elevador.gridUpdate(dispositivoElevador.nodes, find, filter);
      });
  }

  onResize() {
    const maxHeightPanel = document.getElementById('elevadorPanel')?.clientHeight;
    const paradaTabItens = document.getElementById('paradaTabItens');

    const maxHeightListView = maxHeightPanel - 142;
    const maxHeightDiv = maxHeightPanel - 115;

    this.listView_Camera.maxHeight = maxHeightListView;
    paradaTabItens.style.maxHeight = maxHeightDiv + 'px';
  }

  onParadaItemChange(item: InputLabel) {
    const andar: InputLabel[] = this.parada.map(parada => { return parada.andar});
    const index: number = andar.findIndex(andar => andar.name == item.name);
    if(item.text.length > 0) {
      this.parada[index].andar.validated = true;
      if(index >= 0 && index < 48) {
        this.parada[index + 1].andar.enable();
        this.parada[index + 1].restrito.enable();
      }
    } else {
      this.parada[index].restrito.select(0);
      if(index >= 0 && index < 48) {
        if(this.parada[index + 1].andar.text.length == 0) {
          this.parada[index + 1].andar.disable();
          this.parada[index + 1].restrito.disable();
        } else {
          this.parada[index + 1].andar.enable();
          this.parada[index + 1].restrito.enable();
          this.parada[index].andar.validated = false;
        }
      }
    };
  }

  onClose_Click(hideForm: boolean = true) {
    this.nome_Text.clear();
    this.local_Text.clear();
    this.observacao_Text.clear();
    this.listView_Camera.clear();
    this.parada.forEach((paradaItem, index) => {
      this.parada[index].andar.clear()
      this.parada[index].restrito.select(0)
    });

    if (hideForm == true) {
      this.actionbuttomService.hideForm()
      this.tabsConfiguracao_Option.select("tabElevador");
    } else {
      this.tabsConfiguracao_Option.select("tabElevador");
      this.nome_Text.focus();
    }
  }

  ngOnDestroy(): void {
    this.settings?.unsubscribe();
    this.treeviewItem?.unsubscribe();
  }
}


