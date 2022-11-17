import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { SortOperationKind } from 'src/app/@core/api/generic-graphql';
import { CameraDispositivoData, CameraDispositivoFilter, CameraDispositivoSort, read_CameraDispositivo } from 'src/app/@core/data/dispositivo-camera';
import { read_Site, Site, SiteData, SiteSort } from 'src/app/@core/data/reparticao-site';
import { ComboOptions } from '../../components/form/combobox/service/combobox.service';
import { Filter, Find, ListViewGrid, rowSelect } from '../../components/grid/list-view/service/list-view.service';
import { EstacaoCameraModalService } from './service/estacao-camera-modal.service';


@Component({
  selector: 'nex-estacao-camera-modal',
  templateUrl: './estacao-camera-modal.component.html',
  styleUrls: ['./estacao-camera-modal.component.scss']
})
export class EstacaoCameraModalComponent {

  @Input() title: string;
  @Input() estacaoCameraModal: EstacaoCameraModalService;
  @Output() eventCheck: EventEmitter<any> = new EventEmitter(null);
  @ViewChild('btModalSalvar') btModal: ElementRef<HTMLButtonElement>;


  id: number = 0;
  cameraId: number = 0;
  cameraRegistro: any;
  listView_Estacao: ListViewGrid = new ListViewGrid();
  site_Options: ComboOptions = new ComboOptions();
  order_by: CameraDispositivoSort = { nome: SortOperationKind.ASC };



  constructor(private siteService: SiteData,
    private cameraDispositivoService: CameraDispositivoData) {

    this.listView_Estacao.name = "lstEstacaoCamera";
    this.listView_Estacao.maxHeight = 150;
    this.listView_Estacao.gridOnly = true;
    this.listView_Estacao.noPaging = true;
    this.listView_Estacao.noBorder = true;

    this.listView_Estacao.grid = [{ "header": "Câmera", "field": "nome", "width": 100, "align": "left" },];

    this.site_Options.name = "cbSite";

    this.siteService.orderBy = { nome: SortOperationKind.ASC };

    this.siteService.read()
      .subscribe(({ reparticaoSite }: read_Site) => {
        const nodes: Site[] = reparticaoSite.nodes;
        nodes.forEach((node: Site) => {
          this.site_Options.add(node.nome, node.nome, node.id);
          this.update_Grid();
        })

      })

  }

  onSiteOption_Change(find?: Find, filter?: Filter) {
    this.btModal?.nativeElement.setAttribute('disabled', 'true');

    const cameraFilter: CameraDispositivoFilter = { siteId: { eq: this.site_Options.itemSelected.id } };
    this.cameraDispositivoService.readCameraDispositivos(this.order_by, cameraFilter)
      .subscribe(({ dispositivoCamera }: read_CameraDispositivo) => {
        this.listView_Estacao.gridUpdate(dispositivoCamera.nodes, find, filter);
      });
    this.cameraRegistro = undefined;
    this.update_Grid();
  }


  update_Grid(find?: Find, filter?: Filter) {
    this.listView_Estacao.processingShow();
    const cameraFilter: CameraDispositivoFilter = { siteId: { eq: this.site_Options.itemSelected.id } };
    this.cameraDispositivoService.readCameraDispositivos(this.order_by, cameraFilter)
      .subscribe(({ dispositivoCamera }: read_CameraDispositivo) => {
        this.listView_Estacao.gridUpdate(dispositivoCamera.nodes, find, filter);
      });
  }




  onOK_Click() {
    this.eventCheck.emit(this.cameraId);
    this.onClose_Click();

  }

  onListView_Change_Modal(rowSelect?: rowSelect) {
    if (rowSelect.registro) {  
      this.btModal?.nativeElement.removeAttribute('disabled');
      this.cameraId = rowSelect.id;
      this.cameraRegistro = rowSelect.registro;
      this.btModal?.nativeElement.focus();
    }
  }

  onClose_Click() {
    this.estacaoCameraModal.hide();
    this.btModal?.nativeElement.setAttribute('disabled', 'true');
    this.cameraRegistro = undefined;
    this.site_Options.clearSelect();
    this.update_Grid();
  }



}