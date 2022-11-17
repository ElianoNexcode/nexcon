import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { TabsService } from './service/tabs.service';

@Component({
  selector: 'nex-tabs-card',
  templateUrl: './tabs-card.component.html',
  styleUrls: ['./tabs-card.component.scss'],
  host: {'(window:resize)': 'tabsOptions.onResize()'}
})

export class TabsCardComponent implements AfterViewInit {

    @Input() tabsOptions: TabsService;
    @Input() multiTabs: boolean;
    @Input() fullWidth: boolean = false;
    @Input() mediumHeight: boolean = false;
    @Input() largeHeight: boolean = false;
    @Input() name: string;
    @Input() marginTop: number = 9;

    ngAfterViewInit() {
      this.tabsOptions.posInit = document.getElementById(this.name).offsetLeft;
    }

}