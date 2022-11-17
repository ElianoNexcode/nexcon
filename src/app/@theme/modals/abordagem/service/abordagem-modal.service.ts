import { Injectable } from '@angular/core';
import { ModalService } from '../modal.service';
import { NivelOperacaoService } from 'src/app/pages/configuracao/operador/nivel-operacao/service/nivel-operacao.service';

export interface AbordagemModal {
    title: string
    message: string
    color: string
}

@Injectable({
    providedIn: 'root'
})
export class AbordagemModalService {

    modalService: ModalService = new ModalService();

    name: string;
    title: string;
    relationGrid: string;
    abordagem: AbordagemModal[];
    focus: string;

    showModal: boolean = false;

    nivelOperacaoService: NivelOperacaoService = new NivelOperacaoService(null);

    constructor() { }

    show(title: string, abordagens: AbordagemModal[], focus?: string) {

        this.title = title;
        this.abordagem = [];

        const AbordagemVisualNivel: { "Informativa": boolean, "Advertida": boolean, "Restritiva": boolean } = 
                                    { "Informativa": false, "Advertida": false, "Restritiva": false };

        AbordagemVisualNivel.Informativa = this.nivelOperacaoService.checkAcessRights("67", 1);
        AbordagemVisualNivel.Advertida = this.nivelOperacaoService.checkAcessRights("68", 1);
        AbordagemVisualNivel.Restritiva =  this.nivelOperacaoService.checkAcessRights("69", 1);

        abordagens
            .forEach(abordagem => {
                if(!AbordagemVisualNivel[abordagem.title]) {
                    abordagem.message = "***************************************";
                }
                this.abordagem.push(abordagem);
            });
        this.focus = focus;
        
        setTimeout(() => {
            this.modalService.lockScreen;
        }, 350);
        this.showModal = true;
    }

    hide() {
        this.modalService.unlockScreen();
        this.showModal = false;
    }
}
