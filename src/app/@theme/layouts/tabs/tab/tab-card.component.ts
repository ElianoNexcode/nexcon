import { Component, Input } from '@angular/core';

@Component({
    selector: 'nex-tab',
    templateUrl: './tab-card.component.html',
    styleUrls: ['./tab-card.component.scss']
})
export class TabComponent {

    @Input() tabComponent: TabComponentClass;
    @Input() tabScroll: boolean = false;
    @Input() noPadding: boolean = false;
    @Input() maxWidth: boolean = false;
    @Input() tabComponentParent: TabComponentClass;
}

export class TabComponentClass {
    title: string;
    name: string;
    active: boolean = false;
    background: string = "#222b45";
    display: string = "grid";
}