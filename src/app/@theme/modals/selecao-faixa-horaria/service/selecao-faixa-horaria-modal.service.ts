import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ModalService } from '../../service/modal.service';

@Injectable({
    providedIn: 'root'
})
export class SelecaoFaixaHorariaModalService {

    faixaHorariaBehaviour: BehaviorSubject<number> = new BehaviorSubject(null);

    showModal: boolean = false;
    modalService: ModalService = new ModalService();

    showSubject: BehaviorSubject<boolean> = new BehaviorSubject(false);
    
    paramList: any[];

    show(paramList: any[]) {
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
