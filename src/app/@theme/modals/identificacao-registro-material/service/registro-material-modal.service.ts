import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { SiteConfig } from 'src/app/@core/storage/config/config';
import { ModalService } from '../../service/modal.service';

@Injectable({
    providedIn: 'root'
})
export class RegistroMaterialModalService {

    siteSubject: BehaviorSubject<SiteConfig> = new BehaviorSubject(null);

    showModal: boolean = false;
    modalService: ModalService = new ModalService();    

    show() {
        this.modalService.show();
        this.showModal = this.modalService.showModal;
    }

    hide() {
        this.modalService.hide();
        this.showModal = this.modalService.showModal;
    }

    setSiteItem(site: SiteConfig){
        this.siteSubject.next(site);
    }
}
