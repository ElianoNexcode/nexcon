import { Injectable } from '@angular/core';
import { AbordagemTipo } from 'src/app/@core/enum';

export interface Buttons {
    id: number,
    name: string,
    text: string,
}

@Injectable({
    providedIn: "root"
})
export class CardTabsOptions {

    buttons: Buttons[] = [];
    selectCard: Buttons;
    cardIndex: number;

    add(button: Buttons) {
        this.buttons.push(button);
    }

    selectButtonByID(buttonId: number) {
        const index: number = this.buttons.findIndex(btn => btn.id == buttonId);
        if(index >= 0) {
            this.cardIndex = buttonId;
            this.selectCard = this.buttons[index];
        }
    }

    setCondition(tab: string, abordagemTipo: number) {
        const cardElement: HTMLElement = document.getElementById('cardTabButton-' + tab);
        cardElement.classList.forEach(element => {
            if(element != "btn" && element != "button") {
                cardElement.classList.remove(element);
            }
        });
        cardElement.classList.add(AbordagemTipo[abordagemTipo]);
    }

}