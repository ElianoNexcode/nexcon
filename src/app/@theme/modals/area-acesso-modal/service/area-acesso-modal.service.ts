import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Item } from 'src/app/@theme/components/form/combobox/service/combobox.service';
import { ModalService } from '../../service/modal.service';

@Injectable({
    providedIn: 'root'
})
export class AreaAcessoModalService {

    showModal: boolean = false;
    nivelAcessoLista: Array<any>;

    modalService: ModalService = new ModalService();
    areaSubject: BehaviorSubject<Item> = new BehaviorSubject(null);

    setAreaItem(area: Item){
        this.areaSubject.next(area);
    }

    show(paramList?: Array<any>) {
        this.nivelAcessoLista = paramList;

        this.modalService.show();
        this.showModal = this.modalService.showModal;
    }

    hide() {
        this.modalService.hide();
        this.showModal = this.modalService.showModal;
    }
    
}
