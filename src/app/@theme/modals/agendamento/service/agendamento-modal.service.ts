import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ControleVisitaAgendaFilter } from 'src/app/@core/data/controle-visita-agenda';
import { Grid } from 'src/app/@theme/components';
import { ComboOptions } from 'src/app/@theme/components/form/combobox/service/combobox.service';
import { ModalService } from '../../service/modal.service';

export interface FilterModal {
    filterType: string
    filterValue: string
}

@Injectable({
    providedIn: 'root'
})
export class VisitaAgendaModalService {

    name: string;
    filterField: ControleVisitaAgendaFilter;
    grid: Grid[];

    filterTextSubject: BehaviorSubject<FilterModal> = new BehaviorSubject(null);

    pesquisaVisitaAgenda_Option: ComboOptions = new ComboOptions();

    showModal: boolean = false;
    modalService: ModalService = new ModalService();

    constructor() {
        this.pesquisaVisitaAgenda_Option.name = "cbPesquisaVistaAgenda";
    }

    show() {
        this.modalService.show();
        this.showModal = this.modalService.showModal;
    }

    hide() {
        this.modalService.hide();
        this.showModal = this.modalService.showModal;
    }

    setFilter(filterType?: string, filterValue?: string) {
        const filterModal: FilterModal = { filterType: filterType,
                                           filterValue: filterValue };
        this.filterTextSubject.next(filterModal);
    }
}
