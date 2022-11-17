import { Component, Output, OnInit, EventEmitter } from '@angular/core';
import { ActionButtomService } from './service/action-button.service';
import { TranslateService } from '@ngx-translate/core'

@Component({
    selector: 'nex-actionbuttom',
    templateUrl: './action-buttom.component.html',
    styleUrls: ['./action-buttom.component.scss'],
})
export class ActionButtomComponent implements OnInit {
    
    @Output() eventClick = new EventEmitter<any>();

    constructor(public actionButtomService: ActionButtomService,
                public translate: TranslateService) {
    }

    ngOnInit() {
        this.actionButtomService.eventEmitter = this.eventClick;
    }

    onEvent(event: any, indice: number): void {

        let element: any = (event.target as Element);
        this.actionButtomService.selectActived(element.id, indice);

        this.actionButtomService.setEditable(this.actionButtomService.top_action_buttons[indice].editable);

        if(this.actionButtomService.top_action_buttons[indice].openForm == true) {
            this.actionButtomService.showForm(this.actionButtomService.top_action_buttons[indice].maximized == true);
        }
        
        if(this.actionButtomService.top_action_buttons[indice].question) {
            let cardElement: HTMLElement = (document.getElementsByClassName("card-footer")[0] as HTMLElement);
            cardElement.getElementsByTagName("nex-paging")[0]?.classList.add("hidePaging");
            this.actionButtomService.innerQuestion = true;
        }

        let actionSelect = this.actionButtomService.top_action_buttons[indice];
        this.eventClick.emit(actionSelect);
    }
  
}
