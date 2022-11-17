import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Grid } from 'src/app/@theme/components';
import { ComboOptions } from 'src/app/@theme/components/form/combobox/service/combobox.service';
import { ModalService } from '../../service/modal.service';

export class FilterVeiculoModal {
    type: string
    text: string
}

@Injectable({
    providedIn: 'root'
})
export class VeiculoInternoModalService {

    name: string;
    filterField: string;
    grid: Grid[];

    tipoVeiculo: string;
    areaId: number;

    event: string;
    veiculoLista: Array<any>;

    filterTextSubject: BehaviorSubject<FilterVeiculoModal> = new BehaviorSubject(null);
    showModalSubject: BehaviorSubject<boolean> = new BehaviorSubject(false);

    pesquisaVeiculo_Option: ComboOptions = new ComboOptions();
    showModal: boolean = false;

    modalService: ModalService = new ModalService();

    show(tipoVeiculo?: string, paramList?: Array<any>, areaId?: number) {
        this.areaId = areaId;
        this.veiculoLista = paramList;
        this.tipoVeiculo = tipoVeiculo;

        this.modalService.show()

        this.showModal = this.modalService.showModal;
        this.showModalSubject.next(this.showModal);
    }

    hide() {
        this.modalService.hide();        
        this.showModal = this.modalService.showModal;
    }

    setFilter(filterText: string, filterType: string = "Nome") {
        const filter: FilterVeiculoModal = {type: filterType, text: filterText}
        this.pesquisaVeiculo_Option.text = filter.text;
        this.filterTextSubject.next(filter);
    }
}
