import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Item } from 'src/app/@theme/components/form/combobox/service/combobox.service';
import { ModalService } from '../../service/modal.service';

@Injectable({
    providedIn: 'root'
})
export class AreaInterligacaoModalService {

    modalService: ModalService = new ModalService();
    showModal: boolean = false;

    areaInterligadaLista: Array<any>;
    areaId: number;
    siteId: number;

    showSubject: BehaviorSubject<boolean> = new BehaviorSubject(false);

    show(paramList: Array<any>, areaId: number, siteId: number) {
        this.areaInterligadaLista = paramList;
        this.areaId = areaId;
        this.siteId = siteId;

        this.modalService.show();

        this.showModal = this.modalService.showModal;
        this.showSubject.next(this.showModal);
    }

    hide() {
        this.modalService.hide();
        this.showModal = this.modalService.showModal;
    }
    
}
