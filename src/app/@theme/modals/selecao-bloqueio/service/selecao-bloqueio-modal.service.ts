import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Item } from 'src/app/@theme/components/form/combobox/service/combobox.service';

import { ModalService } from '../../service/modal.service';

@Injectable({
    providedIn: 'root'
})
export class SelecaoBloqueioModalService {

    showModal: boolean = false;
    modalService: ModalService = new ModalService();

    showSubject: BehaviorSubject<boolean> = new BehaviorSubject(false);

    areaId: number;
    paramList: Array<number>;

    show(areaId: number, paramList?: Array<number>) {
        this.areaId = areaId;
        this.paramList = paramList;
        this.modalService.show(true);
        this.showModal = this.modalService.showModal;
        this.showSubject.next(this.showModal);
    }

    hide() {
        this.modalService.hide(true);
        this.showModal = this.modalService.showModal;
    }
    
}
