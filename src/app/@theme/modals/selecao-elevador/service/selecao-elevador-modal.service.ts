import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Item } from 'src/app/@theme/components/form/combobox/service/combobox.service';
import { ModalService } from '../../service/modal.service';

@Injectable({
    providedIn: 'root'
})
export class SelecaoElevadorModalService {
    
    showModal: boolean = false;
    modalService: ModalService = new ModalService();

    areaId: number;
    showSubject: BehaviorSubject<boolean> = new BehaviorSubject(false);

    paramList: any[];

    show(areaId: number, paramList?: Array<number>) {
        this.areaId = areaId;
        this.paramList = paramList;

        this.modalService.show(true);
        this.showModal = this.modalService.showModal;
        this.showSubject.next(this.showModal)
    }

    hide() {
        this.modalService.hide(true);
        this.showModal = this.modalService.showModal;
    }
}
