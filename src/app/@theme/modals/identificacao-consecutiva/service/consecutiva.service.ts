import { Injectable } from '@angular/core';
import { ModalService } from '../../service/modal.service';

@Injectable({
    providedIn: 'root'
})
export class IdentificacaoConsecutivaModalService {
    name: string;
    title: string;
    relationGrid: string;
    message: string;
    focus: string;

    filterField: string;
    filterText: string;

    showModal: boolean = false;
    modalService: ModalService = new ModalService();

    show(message: string, focus?: string) {
        this.message = message;
        this.focus = focus;
        
        this.modalService.show();
        this.showModal = this.modalService.showModal;
    }

    hide() {
        this.modalService.hide();
        this.showModal = this.modalService.showModal;
    }
}
