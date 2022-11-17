import { Component, Input, Output, EventEmitter } from '@angular/core';
import { RadioOptions } from './service/radio.service';

@Component({
    selector: 'nex-radio',
    template: `<div class="nex-radio-group" [ngStyle]="{'margin-top.px': (text == undefined && marginTop == false)? 0: 9}">
                    <div class="radioGroup" [ngClass]="{'inBox': text == undefined}" [ngStyle]="{'margin-top.px': (text == undefined)? 0: 9}">
                        <div class="labelBox" *ngIf="text">
                            {{text}}
                        </div>
                        <div class="inputbox {{ inputClass }}" [ngClass]="{'disabled': options.disabled == true}" [ngStyle]="{'display': display, 'background-color': background}">
                            <div class="radioOptions" *ngFor="let option of options.itens">
                                <input type="radio" [id]="'id_' + options.name + '_' + option.id" [name]="options.name" [value]="option.value" [(ngModel)]="options.value" (change)="onOption_Change()" autocomplete="none">
                                <label [for]="'id_' + options.name + '_' + option.id" [ngStyle]="{'color': option.color}">{{option.text}}</label>
                            </div>
                        </div>
                    </div>
               </div>`,
    styleUrls: ['./radio.component.scss'],
})
export class RadioComponent {

    @Input() options: RadioOptions;
    @Input() text: string;
    @Input() display: string = "flex";
    @Input() background: string;
    @Input() inputClass: string;
    @Input() marginTop: boolean = false;

    @Output() eventChange: EventEmitter<any> = new EventEmitter();

    constructor() { }

    onOption_Change() {
        this.options.updateSelect();
        this.eventChange.emit(this.options.itemSelected);
    }
}