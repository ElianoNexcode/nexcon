import { Injectable } from '@angular/core';
import { ModalService } from '../../service/modal.service';

export interface Senha {
        senhaAntiga: string
        senhaNova: string
        Verificacao: string
}

@Injectable({
    providedIn: "root"
})
export class SenhaModalService {

    showModal: boolean = false;
    event: string;

    modaService: ModalService = new ModalService();

    show(event: string = null) {
        this.event = event;
        this.modaService.show()
        this.showModal = this.modaService.showModal;
    }

    hide() {
        this.modaService.hide();
        this.showModal = this.modaService.showModal;
    }

}