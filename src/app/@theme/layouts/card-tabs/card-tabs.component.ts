import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CardTabsOptions, Buttons } from './service/cart-tabs.service';

@Component({
    selector: 'nex-card-tabs',
    template:   `<div class="card-tabs">
                    <button type="button" *ngFor="let button of options?.buttons" class="btn button" [id]="'cardTabButton-' + button.name" [ngClass]="{'select': (button.id == options.cardIndex)}" (click)="onButton_Click(button)">
                        {{button.text}}
                    </button>
                 </div>`,
    styleUrls: ['./card-tabs.component.scss']
})
export class CardTabsComponent {

    @Input() options: CardTabsOptions
    @Output() eventClick: EventEmitter<Buttons> = new EventEmitter();

    constructor() { }

    onButton_Click(button: Buttons) {
        this.options.selectButtonByID(button.id);
        this.eventClick.emit(button);
    }
}