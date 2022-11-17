import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { ModalService } from '../../service/modal.service';

@Injectable({
    providedIn: 'root'
})
export class NivelAcessoModalService {

    showModal: boolean = false;
    showSubject: BehaviorSubject<boolean> = new BehaviorSubject(false);
    
    nivelAcesso: any;
    editable: boolean;

    modalService: ModalService = new ModalService();

    show(nivelAcesso?: any, editable: boolean = true) {
        this.nivelAcesso = nivelAcesso;
        this.editable = editable;
        this.modalService.show();
        this.showModal = this.modalService.showModal;
        this.showSubject.next(this.showModal);
    }

    hide() {
        this.modalService.hide();
        this.showModal = this.modalService.showModal;
    }
    
}