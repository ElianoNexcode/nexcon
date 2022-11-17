import { Component, Input, OnInit, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';

export enum ButtonType {
    "insert" = "fa fa-plus",
    "delete" = "fa fa-times",
    "clear" = "fa fa-times",
    "open" = "fas fa-external-link-alt",
    "camera" = "fa fa-camera",
    "biometria" = "fas fa-fingertype",
    "calendar" = "fa fa-calendar",
    "check" = "fa fa-check",
    "view" = "fa fa-eye",
    "refresh" = "fa fa-refresh",
    "search" = "fa fa-search",
    "edit" = "fas fa-pencil-alt"
}

@Component({
    selector: 'nex-mini-button',
    template: `
        <div [id]="id" style="height: 21px;align-items: center" [ngClass]="{'disabled': disabled == true}">
            <button type="button" class="btn btn-dark bt-card miniButton" [ngClass]="{'noMargin': (noMargin == true), 'smallButton': (smallButton == true), 'noBorder': (noBorder == true), 'mediumButton': (mediumButton == true)}" [ngStyle]="{'margin-top.px': marginTop}" (click)="onButton_Click()">
                <i class="{{ icon }}" aria-hidden="true"></i>
            </button>
        </div>
    `,
    styleUrls: ['./mini-button.component.scss']
})
export class MiniButtonComponent implements OnInit {

    icon: string;

    @Input() id: string;
    @Input() type: string;
    @Input() noMargin: boolean = false;
    @Input() marginTop: number = 0;
    @Input() smallButton: boolean = false;
    @Input() disabled: boolean = false;
    @Input() noBorder: boolean = false;
    @Input() mediumButton: boolean = false;

    @Output() eventClick: EventEmitter<any> = new EventEmitter();

    ngOnInit() {
        this.icon = ButtonType[this.type];
    }

    onButton_Click() {
        this.eventClick.emit(this.type);
    }

}