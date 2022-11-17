import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { Grid } from "src/app/@theme/components";
import { ComboOptions } from "src/app/@theme/components/form/combobox/service/combobox.service";
import { ModalService } from "../../service/modal.service";

export class FilterEmpresaModal {
    type: string
    text: string
}

@Injectable({
    providedIn: 'root'
})


export class EmpresaModalService {

    name: string;
    filterField: string;
    grid: Grid[];

    event: string;

    filterTextSubject: BehaviorSubject<FilterEmpresaModal> = new BehaviorSubject(null);

    pesquisaEmpresa_Option: ComboOptions = new ComboOptions();
    showModal: boolean = false;

    modalService: ModalService = new ModalService();

    show(event:string = null){
        this.event = event;
        this.modalService.show();
        this.showModal = this.modalService.showModal;
    }
    
    hide() {
        this.modalService.hide();
        this.showModal = this.modalService.showModal;
    }

    setFilter(filterText: string, filterType: string = "Nome") {
        const filter: FilterEmpresaModal = {type: filterType, text: filterText}
        this.pesquisaEmpresa_Option.text = filter.text;
        this.filterTextSubject.next(filter);
    }

}