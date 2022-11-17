import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SortOperationKind } from 'src/app/@core/api/generic-graphql';
import { CameraDispositivoData, CameraDispositivoFilter, CameraDispositivoSort, read_CameraDispositivo } from 'src/app/@core/data/dispositivo-camera';
import { Filter, Find, ListViewGrid } from '../../components';
import { CamerasModalService } from './service/cameras-modal.service';

@Component({
    selector: 'nex-cameras-modal',
    templateUrl: 'cameras-modal.component.html',
    styleUrls: ['cameras-modal.component.scss']
})
export class CamerasModalComponent implements OnInit {

    @Input() title: string;
    @Input() camerasModal: CamerasModalService;
    @Output() eventSelectGroup: EventEmitter<any> = new EventEmitter(null);

    listView_Cameras: ListViewGrid = new ListViewGrid();
    filter: CameraDispositivoFilter;
    order: CameraDispositivoSort = {nome: SortOperationKind.ASC};

    constructor(private cameraDispositivoService: CameraDispositivoData) {

        this.listView_Cameras.name = "lstCamerasModal";
        this.listView_Cameras.grid = [{"header": "", "width": 1, "type": "check","index": 0, "align": "center"},
                                      {"header": "Câmera", "field": "nome", "width": 40, "align": "left"},
                                      {"header": "Localização", "field": "localizacao", "width": 60, "align": "left"}];
        this.listView_Cameras.gridOnly = true;
        this.listView_Cameras.noBorder = true;
        this.listView_Cameras.noPaging = true;
        this.listView_Cameras.maxHeight = 217;

        this.update_Grid();
    }

    ngOnInit(): void {
        this.camerasModal.showSuject
            .subscribe(() => {
                this.filter =  {siteId: {eq: this.camerasModal.siteId}}
                this.update_Grid();
            })
    }

    update_Grid(find?: Find, filter?: Filter) {
        this.listView_Cameras.processingShow();
        this.cameraDispositivoService.readCameraDispositivos(this.order, this.filter)
          .subscribe(({ dispositivoCamera }: read_CameraDispositivo) => {
            const dispositivoCameraNodes = dispositivoCamera?.nodes
                .map(camera => {
                    return {
                        'checked':[(this.camerasModal?.cameraList?.findIndex(item => item == camera.id) >= 0)],
                        'id': camera.id,
                        'nome': camera.nome,
                        'localizacao': camera.localizacao
                    }
                });
            this.listView_Cameras.gridUpdate(dispositivoCameraNodes, find, filter);
          });
      }

    onOK_Click(){
        this.eventSelectGroup.emit(this.listView_Cameras.dataGridBehavior
            .value?.filter(item => item.checked[0] == true));
        this.onClose_Click();
    }


    onClose_Click(cancel: boolean = false) {
        this.camerasModal.hide();
        this.listView_Cameras.clear();
        this.update_Grid();
    }
}