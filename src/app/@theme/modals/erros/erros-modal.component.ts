import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { ListViewGrid } from '../../components';

import { ErrosModalService } from './service/erros-modal.service';

@Component({
    selector: 'nex-erros-modal',
    templateUrl: './erros-modal.component.html',
    styleUrls: ['./erros-modal.component.scss']
})
export class ErrosModalComponent implements OnInit {
    
    @Input() errosModal: ErrosModalService;
    @Output() eventClick: EventEmitter<any> = new EventEmitter(null);
    
    constructor(private listviewGrid: ListViewGrid) { }

    ngOnInit() {

    }

    onButton_Click(button?: string) {
        
        if(this.errosModal.relationGrid) {
            this.listviewGrid.clearSelect(this.errosModal.relationGrid);
        }

        this.eventClick.emit({button: button, focus: this.errosModal.focus});
        this.errosModal.hide();
    }
}