import { Component } from '@angular/core';
import { ListViewGrid } from 'src/app/@theme/components';
import { ActionButtomService } from 'src/app/@theme/components/grid/action-buttom/service/action-button.service';

@Component({
    selector: 'nex-grupos',
    templateUrl: 'grupos.component.html',
    styleUrls: ['grupos.component.scss']
})
export class GruposComponent {

    listView_Grupo: ListViewGrid = new ListViewGrid();

    constructor(private actionbuttomService: ActionButtomService) {

        this.actionbuttomService.top_action_buttons = []; 
        this.listView_Grupo.title = "Grupo";

    }
}