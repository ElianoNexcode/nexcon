import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Grid } from 'src/app/@theme/components';
import { ComboOptions } from 'src/app/@theme/components/form/combobox/service/combobox.service';
import { ModalService } from '../../service/modal.service';

export class FilterPessoaModal {
    type: string
    text: string
}

@Injectable({
    providedIn: 'root'
})
export class PessoaInternaModalService {

    name: string;
    filterField: string;
    grid: Grid[];

    tipoPessoa: string;
    areaId: number;
    siteId: number;
    isOperador: boolean;

    event: string;
    pessoaLista: Array<any>;

    filterTextSubject: BehaviorSubject<FilterPessoaModal> = new BehaviorSubject(null);
    showModalSubject: BehaviorSubject<boolean> = new BehaviorSubject(false);

    pesquisaPessoa_Option: ComboOptions = new ComboOptions();
    showModal: boolean = false;

    modalService: ModalService = new ModalService();

    show(tipoPessoa?: string, paramList?: Array<any>, siteId?: number, areaId?: number, isOpeador: boolean = false) {
        this.pessoaLista = paramList;
        this.siteId = siteId;
        this.areaId = areaId;
        this.isOperador = isOpeador;
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
        const filter: FilterPessoaModal = {type: filterType, text: filterText}
        this.pesquisaPessoa_Option.text = filter.text;
        this.filterTextSubject.next(filter);
    }
}
