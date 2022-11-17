import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { ControladoraDispositivoFilter } from 'src/app/@core/data/dispositivo-controladora';
import { SiteConfig } from 'src/app/@core/storage/config/config';
import { ModalService } from '../../service/modal.service';

@Injectable({
    providedIn: 'root'
})
export class LeitorModalService {

    showModal: boolean = false;
    siteSubject: BehaviorSubject<SiteConfig> = new BehaviorSubject(null);
    IdSubject: BehaviorSubject<ControladoraDispositivoFilter> = new BehaviorSubject(null);
    IdTipoControladoraSubject: BehaviorSubject<number> = new BehaviorSubject(null);

    modalService: ModalService = new ModalService();


    obtemIdTipoControladora(id: number){
        this.IdTipoControladoraSubject.next(id);
    }

    obtemIdControladora(filter: ControladoraDispositivoFilter){
        this.IdSubject.next(filter);
    }

    defineSite(site: SiteConfig){
        this.siteSubject.next(site);
    }

    show() {
        this.modalService.show();
        this.showModal = this.modalService.showModal;
    }

    hide() {
        this.modalService.hide();
        this.showModal = this.modalService.showModal;
    }
    
}
