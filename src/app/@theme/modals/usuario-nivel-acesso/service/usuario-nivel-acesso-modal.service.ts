import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { ModalService } from '../../service/modal.service';

@Injectable({
    providedIn: 'root'
})
export class UsuarioNivelAcessoModalService {

    showModal: boolean = false;
    showSubject: BehaviorSubject<boolean> = new BehaviorSubject(false);

    nivelAcessoList: Array<number>;
    tipo: number;

    modalService: ModalService = new ModalService();

    show(paramList?: Array<number>, tipo?: number) {
        this.nivelAcessoList = paramList;
        this.tipo = tipo;

        this.modalService.show();
        this.showModal = this.modalService.showModal;
        this.showSubject.next(this.showModal);
    }

    hide() {
        this.modalService.hide();
        this.showModal = this.modalService.showModal;
    }
    
}
