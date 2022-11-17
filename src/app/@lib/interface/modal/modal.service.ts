import { Injectable } from '@angular/core';

@Injectable({
    providedIn: "root"
})
export class ModalManager {

    private globalConfig: ModalConfig = {
        size: "md"
    }

    set defaults(config: ModalConfig) {
        this.globalConfig = Object.assign(this.globalConfig, config);
    }

    open(modalInstance, settings?) {
        console.log(modalInstance, typeof modalInstance);
        let config = settings || {};
        if (typeof modalInstance === "object") {
            modalInstance.init(config);
            modalInstance.open();
            return modalInstance;
        }
    }
}


export interface ModalConfig {
    title?: string,
    size?: string
}