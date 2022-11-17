import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Grid } from 'src/app/@theme/components';
import { ComboOptions } from 'src/app/@theme/components/form/combobox/service/combobox.service';
import { ModalService } from '../../service/modal.service';

@Injectable({
    providedIn: 'root'
})
export class TempoExpiradoModalService {

    name: string;
    filterField: string;
    grid: Grid[];

    event: string;

    filterTextSubject: BehaviorSubject<string> = new BehaviorSubject(null);
    pesquisaPessoa_Option: ComboOptions = new ComboOptions();

    showModal: boolean = false;
    modalService: ModalService = new ModalService();

    show(event: string = null) {
        this.event = event;
        this.modalService.show();
        this.showModal = this.modalService.showModal;
    }

    hide() {
        this.modalService.hide();
        this.showModal = this.modalService.showModal;
    }

    setFilter(filterText: string) {
        this.pesquisaPessoa_Option.text = filterText;
        this.filterTextSubject.next(filterText);
    }
}
