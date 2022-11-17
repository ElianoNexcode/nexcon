import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { InputLabel, InputLabelComponent, ListViewGrid } from '../../components';

import { IdentificacaoConsecutivaModalService } from './service/consecutiva.service';

@Component({
    selector: 'nex-consecutiva-modal',
    templateUrl: './consecutiva.component.html',
    styleUrls: ['./consecutiva.component.scss']
})
export class IdentificacaoConsecutivaModalComponent implements OnInit {
    
    @Input() identificacaoConsecutivaModal: IdentificacaoConsecutivaModalService;
    @Output() eventClick: EventEmitter<any> = new EventEmitter(null);

    txtSupervisor_Text: InputLabel = new InputLabel();
    txtSupervisorPW_Text: InputLabel = new InputLabel()
    
    constructor(private listviewGrid: ListViewGrid) {
        this.txtSupervisor_Text.name = "txtSupervisor";
        this.txtSupervisor_Text.rules = "uppercase";
        this.txtSupervisor_Text.minLength = 6;

        this.txtSupervisorPW_Text.name = "txtSupervisorPW";
        this.txtSupervisorPW_Text.rules = "senha";
        this.txtSupervisorPW_Text.minLength = 6;
     }

    ngOnInit() {


    }

    onButton_Click(button?: string) {
        
        if(this.identificacaoConsecutivaModal.relationGrid) {
            this.listviewGrid.clearSelect(this.identificacaoConsecutivaModal.relationGrid);
        }

        this.eventClick.emit({button: button, focus: this.identificacaoConsecutivaModal.focus});
        this.identificacaoConsecutivaModal.hide();
    }

    onText_Change(event: any) {

    }
}