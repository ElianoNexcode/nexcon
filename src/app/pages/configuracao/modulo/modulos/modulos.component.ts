import { Component } from '@angular/core';
import { ListViewGrid } from 'src/app/@theme/components';

@Component({
    selector: 'nex-modulos',
    templateUrl: 'modulos.component.html',
    styleUrls: ['modulos.component.scss']
})
export class ModulosComponent {
    listView_Grupo: ListViewGrid = new ListViewGrid();

    constructor() {
        this.listView_Grupo.title = "Módulos";
    }
}
