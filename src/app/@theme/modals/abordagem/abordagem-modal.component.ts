import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { AbordagemModalService } from './service/abordagem-modal.service';

@Component({
    selector: 'nex-abordagem-modal',
    templateUrl: './abordagem-modal.component.html',
    styleUrls: ['./abordagem-modal.component.scss']
})
export class AbordagemModalComponent implements OnInit {
    
    @Input() abordagemModal: AbordagemModalService;
    @Output() eventClick: EventEmitter<any> = new EventEmitter(null);

    ngOnInit() { }

    onButton_Click(button?: string) {
        
        this.eventClick.emit({button: button, focus: this.abordagemModal.focus});
        this.abordagemModal.hide();
    }
}