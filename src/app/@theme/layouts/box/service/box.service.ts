import { Injectable } from '@angular/core';

export interface BoxButton {
    name: string;
    type: string;
    disabled: boolean;
}

@Injectable()
export class BoxPanel {

    buttons: BoxButton[] = [];

    add(name: string, type: string, disable: boolean = false) {
        this.buttons.push({name: name, type: type, disabled: disable})
    }

    clear() {
        this.buttons.splice(0, this.buttons.length)
    }

    disable(name: string) {
        document.getElementById(name)?.classList.add('disabled');
    }

    enable(name: string) {
        document.getElementById(name)?.classList.remove('disabled');
    }

}