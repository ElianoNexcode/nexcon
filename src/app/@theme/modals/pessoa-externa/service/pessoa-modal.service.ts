import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Grid } from 'src/app/@theme/components';
import { ComboOptions } from 'src/app/@theme/components/form/combobox/service/combobox.service';
import { ModalService } from '../../service/modal.service';

@Injectable({
    providedIn: 'root'
})
export class PessoaExternaModalService {

    name: string;
    filterField: string;
    grid: Grid[];

    tipoPessoa: string;
    pessoaLista: Array<any>;

    filterTextSubject: BehaviorSubject<any> = new BehaviorSubject(null);
    showModalSubject: BehaviorSubject<boolean> = new BehaviorSubject(false);

    pesquisaPessoa_Option: ComboOptions = new ComboOptions();
    showModal: boolean = false;
    
    modalService: ModalService = new ModalService();

    show(tipoPessoa?: string, paramList?: Array<any>) {
        this.pessoaLista = paramList;
        this.tipoPessoa = tipoPessoa;

        this.modalService.show();
        this.showModal = this.modalService.showModal;
        this.showModalSubject.next(this.showModal);

        setTimeout(() => {
            this.pesquisaPessoa_Option.focus();
        }, 350);
    }

    hide() {
        this.modalService.hide();
        this.showModal = this.modalService.showModal;
    }

    setFilter(filterText: string, filterType: string = "Nome") {
        const filter: any = {type: filterType, text: filterText}
        this.pesquisaPessoa_Option.text = filter.text;
        this.filterTextSubject.next(filter);
    }
}
