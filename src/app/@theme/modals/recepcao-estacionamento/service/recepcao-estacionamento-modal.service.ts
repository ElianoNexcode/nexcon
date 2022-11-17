import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { ModalService } from '../../service/modal.service';

@Injectable({
    providedIn: 'root'
})
export class RecepcaoEstacionamentoModalService {

    showModal: boolean = false;

    showSubject: BehaviorSubject<boolean> = new BehaviorSubject(false);

    siteId: number;
    estacionamentoList: Array<number>;

    modalService: ModalService = new ModalService();

    show(siteId: number, paramList?: Array<number>) {
        this.siteId = siteId;
        this.estacionamentoList = paramList;

        this.modalService.show();
        this.showModal = this.modalService.showModal;
        this.showSubject.next(this.showModal);
    }

    hide() {
        this.modalService.hide();
        this.showModal = this.modalService.showModal;
    }
    
}
