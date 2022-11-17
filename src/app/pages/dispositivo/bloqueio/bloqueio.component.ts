import { Component, OnDestroy, OnInit } from '@angular/core';

import { ListViewGrid, Find, Filter, rowSelect } from 'src/app/@theme/components/grid/list-view/service/list-view.service';
import { AlertServiceComponent } from 'src/app/@theme/components/form/alert-card/service/alert-card.service';
import { ActionButtomService } from 'src/app/@theme/components/grid/action-buttom/service/action-button.service';
import { InputLabel } from 'src/app/@theme/components/form/input-label/service/input-label.service';
import { TextareaLabel } from '../../../@theme/components/form/textarea-label/service/textarea-label.service';
import { ComboOptions, Item } from 'src/app/@theme/components/form/combobox/service/combobox.service';
import { ConfigStorage, SiteConfig } from 'src/app/@core/storage/config/config';
import { BehaviorSubject } from 'rxjs';
import { SortOperationKind } from 'src/app/@core/api/generic-graphql';
import { AreaReparticaoData, AreaReparticaoFilter } from 'src/app/@core/data/reparticao-area';
import { TreeviewService } from 'src/app/@theme/layouts/treeview/service/treeview.service';
import { TreeView } from 'src/app/@theme/layouts/treeview/service/treeview';
import { BoxPanel } from 'src/app/@theme/layouts';
import { CamerasModalService } from 'src/app/@theme/modals/cameras/service/cameras-modal.service';

import {
  create_BloqueioDispositivo,
  read_BloqueioDispositivo,
  update_BloqueioDispositivo,
  delete_BloqueioDispositivo,
  BloqueioDispositivoData,
  BloqueioDispositivo,
  BloqueioDispositivoSort,
  BloqueioDispositivoFilter
} from 'src/app/@core/data/dispositivo-bloqueio';

import { transitoBloqueio } from 'src/app/@core/enum';

import { NavigationEnd, Router, RouterEvent } from '@angular/router';
import { filter } from 'rxjs/operators';
import { TabsService } from 'src/app/@theme/layouts/tabs/service/tabs.service';

@Component({
  selector: 'nex-bloqueio-dispositivo',
  templateUrl: './bloqueio.component.html',
  styleUrls: ['./bloqueio.component.scss']
})

export class BloqueioDispositivoComponent implements OnInit, OnDestroy {

  tabBloqueio: TabsService = new TabsService();

  id: number = 0;
  siteId: number = 0;
  
  nome_Text: InputLabel = new InputLabel();
  transito_Option: ComboOptions = new ComboOptions();
  local_Text: InputLabel = new InputLabel();
  listView_Camera: ListViewGrid = new ListViewGrid();

  elevadorTerminalNumero_Text: InputLabel = new InputLabel();
  elevadorTerminalSigla_Text: InputLabel = new InputLabel();

  observacao_Text: TextareaLabel = new TextareaLabel();

  settings: BehaviorSubject<any>;
  treeviewItem: BehaviorSubject<any>;

  editable: boolean;

  order_by: BloqueioDispositivoSort = { nome: SortOperationKind.ASC };

  filter: BloqueioDispositivoFilter;
  filterGrid: BloqueioDispositivoFilter;

  listView_Bloqueio: ListViewGrid = new ListViewGrid();

  bloqueioDispositivo: BloqueioDispositivo;
  boxCamera: BoxPanel = new BoxPanel();

  showSpinner: boolean = false;

  camerasModalService: CamerasModalService = new CamerasModalService();

  alertService: AlertServiceComponent = new AlertServiceComponent();

  constructor(public actionbuttomService: ActionButtomService,
    private config: ConfigStorage,
    private treeviewService: TreeviewService,
    private areaReparticaoService: AreaReparticaoData,
    private bloqueioDispositivoService: BloqueioDispositivoData,
    private router: Router) {

    this.settings = this.config.siteSubject();

    this.tabBloqueio.add("tabBloqueio", "Bloqueio", true);
    this.tabBloqueio.add("tabCamera", "Câmera", false);

    this.boxCamera.add("btCheck", "check", false);

    this.treeviewItem = this.treeviewService.itemSubject();

    this.actionbuttomService.relationGrid = "lstBloqueio";
    this.actionbuttomService.recurso = "21";
    this.actionbuttomService.top_action_buttons = [{ "id": 0, "text": "forms.buttons.create", "enabled": true, "visibled": false, "condition": "always", "openForm": true, "editable": "new", },
    { "id": 1, "text": "forms.buttons.update", "enabled": false, "visibled": false, "condition": "select", "openForm": true, "editable": "yes", },
    { "id": 2, "text": "forms.buttons.read", "enabled": false, "visibled": false, "condition": "select", "openForm": true, "editable": "no", },
    { "id": 3, "text": "forms.buttons.delete", "enabled": false, "visibled": false, "condition": "multi", "openForm": false, "question": "forms.questions.delete" },]

    this.listView_Bloqueio.name = "lstBloqueio";
    this.listView_Bloqueio.title = "Lista de Bloqueios";
    this.listView_Bloqueio.grid = [{ "header": "Nome", "field": "nome", "width": 25, "align": "left" },
    { "header": "Trânsito", "field": "transito", "width": 15, "align": "left", "enum": transitoBloqueio },
    { "header": "Localização", "field": "localizacao", "width": 20, "align": "left" },
    { "header": "Observação", "field": "observacao", "width": 40, "align": "left" }];

    this.listView_Camera.name = "lstCameraBloqueio";
    this.listView_Camera.gridOnly = true;
    this.listView_Camera.noPaging = true;
    this.listView_Camera.noBorder = true;
    this.listView_Camera.maxHeight = 270;
    this.listView_Camera.grid = [{"header": "Câmeras Associadas", "field": "nome", "width": 50, "align": "left"}];

    this.nome_Text.name = "txtNome";
    this.nome_Text.rules = "uppercase";
    this.nome_Text.maxLength = 30;
    this.nome_Text.minLength = 1;

    this.transito_Option.name = "cbTransito";
    this.transito_Option.add("PEDESTRE", "pedestre", 1, true);
    this.transito_Option.add("VEÍCULO", "VEICULO", 2, false);

    this.local_Text.name = "txtLocal";
    this.local_Text.rules = "uppercase";
    this.local_Text.maxLength = 30;
    this.local_Text.minLength = 1;

    this.elevadorTerminalNumero_Text.name = "txtNumeroTerminal";
    this.elevadorTerminalNumero_Text.rules = "onlynumbers";
    this.elevadorTerminalNumero_Text.textAlign = "center";
    this.elevadorTerminalNumero_Text.maxLength = 2;
    this.elevadorTerminalNumero_Text.minLength = 1;

    this.elevadorTerminalSigla_Text.name = "txtSiglaTerminal";
    this.elevadorTerminalSigla_Text.rules = "uppercase";
    this.elevadorTerminalSigla_Text.textAlign = "center";
    this.elevadorTerminalSigla_Text.maxLength = 2;
    this.elevadorTerminalSigla_Text.minLength = 1;

    this.observacao_Text.name = "txtObservacao"
    this.observacao_Text.maxLength = 100;
    this.observacao_Text.regex = "noFilter";

    this.settings
      .subscribe((site: SiteConfig) => {
        if (site != null) {
          this.siteId = site.id;
          const filterSite: AreaReparticaoFilter = { setor: {siteId: { eq: this.siteId }} };
          this.treeviewPopulate(filterSite);
        }
      });

    this.treeviewItem
      .subscribe((areaId: string) => {
        if (areaId != null) {
          if (!this.filter) {
            this.actionbuttomService.top_action_buttons.forEach(topButton => {
              topButton.visibled = true;
            })
          }
          this.filter = { areaId: { eq: parseInt(areaId) } };
          this.listView_Bloqueio.clearFilter();
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

  onActionButtom_Click(actionButtomSelect: any) {
    switch (actionButtomSelect.text) {
      case "forms.buttons.create": 
        this.id = undefined;
        this.editable = true;
        this.nome_Text.focus();
        break;
      
      case "forms.buttons.update": 
        this.editable = true;
        this.updateDataLoad();
        this.nome_Text.focus(true);
        break;
    
      case "forms.buttons.read": 
        this.editable = false;
        this.updateDataLoad();
        break
      
    }
  }

  updateDataLoad() {
    this.showSpinner = true;

    const filter: BloqueioDispositivoFilter = { id: { eq: this.id } };
    this.bloqueioDispositivoService.readBloqueioDispositivos(this.order_by, filter)
      .subscribe(({ dispositivoBloqueio }: read_BloqueioDispositivo) => {
        this.showSpinner = false;

        this.bloqueioDispositivo = dispositivoBloqueio.nodes[0];

        this.nome_Text.text = this.bloqueioDispositivo.nome;
        this.transito_Option.select(this.bloqueioDispositivo.transito);
        this.local_Text.text = this.bloqueioDispositivo.localizacao;
        this.elevadorTerminalNumero_Text.text = this.bloqueioDispositivo.elevadorTerminalNumero?.toString();
        this.elevadorTerminalSigla_Text.text = this.bloqueioDispositivo.elevadorTerminalSigla;
        this.observacao_Text.text = this.bloqueioDispositivo.observacao;
        this.listView_Camera.gridUpdate(this.bloqueioDispositivo.cameras.map(cameras => {return cameras.camera}));
      });
  }

  onListView_Change(rowSelect?: rowSelect) {
    if (rowSelect.registro) {
      this.id = rowSelect.id;
    } else {
      if (rowSelect.exclude == "yes") {
        this.bloqueioDispositivoService.deleteBloqueioDispositivo(rowSelect.id)
          .subscribe(({ data }: delete_BloqueioDispositivo) => {
            if (data.dispositivoBloqueio_Excluir.sucesso == true) {
              const find = { field: "id", value: rowSelect.id, type: "DEL" }
              this.update_Grid(find)

            } else {
              const objeto = JSON.parse(data.dispositivoBloqueio_Excluir.objeto);
              this.alertService.show(data.dispositivoBloqueio_Excluir.mensagemTipo,
                data.dispositivoBloqueio_Excluir.mensagem,
                objeto);
            }
          })
      }
    }
  }

  onSave_Click() {
    this.nome_Text.validated = (this.nome_Text.text.length >= this.nome_Text.minLength);

    if (!this.nome_Text.validated) {
      this.alertService.show("ERRO",
        "Existem campos obrigatórios não preenchidos ou preenchidos de forma incorreta. Verifique!",
        null);
    } else {

      this.showSpinner = true;

      const bloqueioDispositivo: BloqueioDispositivo = {
        id: this.id,
        areaId: <number>this.filter.areaId.eq,
        nome: this.nome_Text.text,
        transito: this.transito_Option.itemSelected.id,
        localizacao: this.local_Text.text,
        elevadorTerminalNumero: Number.parseInt(this.elevadorTerminalNumero_Text.text),
        elevadorTerminalSigla: this.elevadorTerminalSigla_Text.text,
        observacao: this.observacao_Text.text,
        cameras: this.listView_Camera.dataGridBehavior.value?.map(cameras => {
          return {cameraId: cameras.id}
        })
      }

      if (bloqueioDispositivo.id) {
        this.bloqueioDispositivoService.updateBloqueioDispositivo(bloqueioDispositivo)
          .subscribe(({ data }: update_BloqueioDispositivo) => {
            const objeto: any = JSON.parse(data.dispositivoBloqueio_Alterar.objeto);
            if (data.dispositivoBloqueio_Alterar.sucesso == true) {
              const find = { field: "id", value: objeto.Id }
              this.onClose_Click();
              this.update_Grid(find);
            } else {
              this.alertService.show(data.dispositivoBloqueio_Alterar.mensagemTipo,
                data.dispositivoBloqueio_Alterar.mensagem,
                objeto);
            }
            this.showSpinner = false;
          })
      } else {
        this.bloqueioDispositivoService.createBloqueioDispositivo(bloqueioDispositivo)
          .subscribe(({ data }: create_BloqueioDispositivo) => {
            const objeto: any = JSON.parse(data.dispositivoBloqueio_Inserir.objeto);
            if (data.dispositivoBloqueio_Inserir.sucesso == true) {
              const find = { field: "id", value: objeto.Id };
              this.onClose_Click(false);
              this.update_Grid(find);
            } else {
              this.alertService.show(data.dispositivoBloqueio_Inserir.mensagemTipo,
                data.dispositivoBloqueio_Inserir.mensagem,
                objeto);
            }
            this.showSpinner = false;
          })
      }
    }
  }

  // Método utilizado para filtrar o Grid
  onListView_Filter(filterSelect: Item) {
    switch (filterSelect.text) {
      case "Nome":
        this.filterGrid = { nome: { contains: filterSelect.value } };
        break;

      case "Trânsito":
        if (transitoBloqueio[filterSelect.value] != null) {
          this.filterGrid = { transito: { eq: transitoBloqueio[filterSelect.value] } };
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

  treeviewPopulate(filter: AreaReparticaoFilter) {
    this.filter = undefined;
    this.treeviewService.getTreeview()
      .subscribe((treeview: TreeView[]) => {
        treeview[0].item = this.areaReparticaoService.getAreaReparticaoTreeView(filter);
        this.treeviewService.setTreeview(treeview);
      });
  }

  onCameraSelectGroup(itensSelected: any[]) {
    const camerasAssociadas = itensSelected;
    this.listView_Camera.gridUpdate(camerasAssociadas);
  }

  onBoxCamera_Click(type: any) {
    const paramList: Array<number> = this.listView_Camera.dataGridBehavior
      .value?.map(cameras => {
        return cameras.id
      });
    this.camerasModalService.show(this.siteId, paramList);
  }

  update_Grid(find?: Find, filter?: Filter) {
    const filterGrid: BloqueioDispositivoFilter = { ...this.filter, ...this.filterGrid };
    this.listView_Bloqueio.processingShow();
    this.bloqueioDispositivoService.readBloqueioDispositivos(this.order_by, filterGrid)
      .subscribe(({ dispositivoBloqueio }: read_BloqueioDispositivo) => {
        this.actionbuttomService.enableButtons(0);
        this.listView_Bloqueio.gridUpdate(dispositivoBloqueio.nodes, find, filter);
      });
  }

  onClose_Click(hideForm: boolean = true) {
    this.nome_Text.clear();
    this.transito_Option.select(1);
    this.local_Text.clear();
    this.observacao_Text.clear();
    this.elevadorTerminalNumero_Text.clear();
    this.elevadorTerminalSigla_Text.clear();
    this.listView_Camera.clear();
    
    if (hideForm == true) {
      this.actionbuttomService.hideForm()
      this.tabBloqueio.select("tabBloqueio");

    } else {
      this.tabBloqueio.select("tabBloqueio");
      this.nome_Text.focus();
    }
  }

  ngOnDestroy(): void {
    this.settings?.unsubscribe();
    this.treeviewItem?.unsubscribe();
  }


}