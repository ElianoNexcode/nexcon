import { AfterViewInit, Component, Input, ViewChild } from "@angular/core";
import { ModalManager } from "src/app/@lib/interface/modal/modal.service";

@Component({
    selector: 'nex-complemento-pessoa',
    templateUrl: './complemento-pessoa.component.html',
    styleUrls: ['./complemento-pessoa.component.scss']
})
export class IdentificacaoComplementoPessoaModalComponent implements AfterViewInit {

    @ViewChild('modalInstance') modalInstance;

    modalManager: ModalManager = new ModalManager();

    constructor() {
        
    }

    ngAfterViewInit(): void {
        console.log(this.modalInstance);
    }

    show() {
        this.modalManager.open(this.modalInstance);
    }

}