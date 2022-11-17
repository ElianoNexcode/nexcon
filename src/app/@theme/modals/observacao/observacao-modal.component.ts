import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

import { ObservacaoModalService } from './service/observacao-modal.service';

@Component({
    selector: 'nex-observacao-modal',
    templateUrl: './observacao-modal.component.html',
    styleUrls: ['./observacao-modal.component.scss']
})
export class ObservacaoModalComponent implements OnInit {
    
    @Input() observacaoModal: ObservacaoModalService;
    @Input() title: string;

    @Output() eventChange: EventEmitter<any> = new EventEmitter(null);
    
    constructor() {
    }

    ngOnInit() {

    }

    onOK_Click() {
        this.onClose_Click(this.observacaoModal.observacao_Text);
    }

    onClose_Click(text?: string) {
        this.eventChange.emit(text);
        this.observacaoModal.hide();
    }
}