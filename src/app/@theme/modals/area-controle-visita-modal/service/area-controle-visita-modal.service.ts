import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Item } from 'src/app/@theme/components/form/combobox/service/combobox.service';
import { ModalService } from '../../service/modal.service';

@Injectable({
    providedIn: 'root'
})
export class AreaControleVisitaModalService {

    modalService: ModalService = new ModalService();
    showModal: boolean = false;

    areaSubject: BehaviorSubject<Item> = new BehaviorSubject(null);

    pessoaGrupoLista: Array<any>;

    setAreaItem(area: Item){
        this.areaSubject.next(area);
    }

    show(paramList?: Array<any>) {
        this.pessoaGrupoLista = paramList;

        this.modalService.show();
        this.showModal = this.modalService.showModal;
    }

    hide() {
        this.modalService.hide();
        this.showModal = this.modalService.showModal;
    }
    
}
