import { Injectable } from '@angular/core';

@Injectable({
    providedIn: "root"
})
export class ModalService {
    
    showModal: boolean = false;

    show(isModal: boolean = false) {
        this.lockScreen(isModal);
        this.showModal = true;
    }

    hide(isModal: boolean = false) {
        this.unlockScreen(isModal);
        this.showModal = false;
    }

    private lockScreen(isModal: boolean) {
        const lockModal: HTMLElement = document.getElementById("classModal");
        lockModal.style.zIndex = isModal? '200': '100';
    }

    private unlockScreen(isModal: boolean) {
        const lockModal: HTMLElement = document.getElementById("classModal");
        lockModal.style.zIndex = (isModal)? '100': '-1';
    }

}