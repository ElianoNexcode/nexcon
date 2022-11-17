import { Injectable } from '@angular/core';
import { ModalService } from '../../service/modal.service';

@Injectable({
    providedIn: 'root'
})
export class ErrosModalService {

    name: string;
    title: string;
    relationGrid: string;
    message: string;
    focus: string;
    log: string;

    filterField: string;
    filterText: string;

    showModal: boolean = false;

    modalService: ModalService = new ModalService();

    show(title: string, message: string, focus?: string, log?: string) {

        let msgTitle: string;
        switch (title) {
            case 'INFORMATIVA': 
                msgTitle = "INFORMAÇÃO";
                break;
            case 'ADVERTENCIA':
                msgTitle = "ADVERTÊNCIA";
                break;
            case 'ERRO':
                msgTitle = "ERRO";
                break;
            default:  
                msgTitle = title;
                break;
        }

        this.title = msgTitle;
        this.message = message;
        this.focus = focus;
        this.log = log;
        
        this.modalService.show();
        this.showModal = this.modalService.showModal;
    }

    hide() {
        this.modalService.hide();
        this.showModal = this.modalService.showModal;
    }
}
