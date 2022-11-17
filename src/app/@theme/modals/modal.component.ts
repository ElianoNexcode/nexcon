import { animate, state, style, transition, trigger } from "@angular/animations";
import { Component, EventEmitter, Input, Output } from "@angular/core";
import { ModalService } from "./service/modal.service";

@Component({
    selector: "nex-modal",
    animations: [trigger('modalForm', [
                    state('top', style([{top: '-350px'}, {opacity: 0}])),
                    state('bottom', style([{top: '67px'}, {opacity: 1}])),
                    transition('top => bottom', [animate('300ms ease-in')]),
                    transition('bottom => top', [animate('300ms ease-out')])]
                )],
    template:   `<div [@modalForm]="!modal.showModal? 'top' : 'bottom'" class="modalForm noselect" id="modalForm" >
                    <div class="card-form" class="card">
                        <div class="card-header" style="border-radius: 0 !important;">
                            {{ title }}
                        </div>
                        <div class="card-body">
                            <ng-content></ng-content>
                        </div>
                        <div class="card-footer">
                            <div class="buttons">
                                <button type="button" class="btn btn-dark bt-card greenBorder"  (click)="onOk_Click()">OK</button>
                                <button type="button" class="btn btn-dark bt-card redBorder"    (click)="onClose_Click()">Cancelar</button>
                            </div>
                        </div>
                    </div>
                </div>`,
    styleUrls: ['modal.component.scss']
})
export class ModalComponent {

    @Input() modal: ModalService;
    @Input() title: string = "MODAL";
    @Output() eventClick: EventEmitter<any> = new EventEmitter(null);

    ngOnInit() { }

    onButton_Click(button?: string) {

        // this.eventClick.emit({button: button, focus: this.abordagemModal.focus});
        // this.abordagemModal.hide();
    }

    onOk_Click() {

    }

    onClose_Click() {
        this.modal.hide();
    }
}

