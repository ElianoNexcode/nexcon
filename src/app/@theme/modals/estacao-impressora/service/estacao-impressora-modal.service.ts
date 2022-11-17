import { Injectable } from '@angular/core';
import { ModalService } from '../../service/modal.service';

@Injectable({
    providedIn: 'root'
})
export class EstacaoImpressoraModalService {

    modalService: ModalService = new ModalService();
    showModal: boolean = false;


    show() {
        this.modalService.show();
        this.showModal = this.modalService.showModal;
    }

    hide() {
        this.modalService.hide();
        this.showModal = this.modalService.showModal;
    }
    
}
