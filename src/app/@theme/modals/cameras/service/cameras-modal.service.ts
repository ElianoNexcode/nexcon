import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Grid } from 'src/app/@theme/components';
import { ModalService } from '../../service/modal.service';

@Injectable({
    providedIn: 'root'
})
export class CamerasModalService {
 
    name: string;
    grid: Grid[];

    showModal: boolean = false;
    showSuject: BehaviorSubject<boolean> = new BehaviorSubject(false);

    cameraList: Array<number>;
    siteId: number;

    modalService: ModalService = new ModalService();

    show(siteId: number, paramList?: Array<number>) {

        this.cameraList = paramList;
        this.siteId = siteId;
        
        this.modalService.show();
        this.showModal = this.modalService.showModal;
        this.showSuject.next(this.showModal);
    }

    hide() {
        this.modalService.hide()
        this.showModal = this.modalService.showModal;
    }

}