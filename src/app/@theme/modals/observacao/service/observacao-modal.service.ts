import { Injectable } from '@angular/core';
import { ModalService } from '../../service/modal.service';

@Injectable({
    providedIn: 'root'
})
export class ObservacaoModalService {

    name: string;
    observacao_Text: string;

    filterField: string;
    filterText: string;

    showModal: boolean = false;
    modalService: ModalService = new ModalService();

    show() {
        this.modalService.show();
        this.showModal = this.modalService.showModal;
    }

    hide() {
        this.modalService.hide();
        this.showModal = this.modalService.showModal;
    }
}
