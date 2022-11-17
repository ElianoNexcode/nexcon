import { AfterViewInit, Component, Input } from '@angular/core';
import { AlertServiceComponent } from './service/alert-card.service';

@Component({
    selector: 'nex-alert-card',
    template: `<div [id]="name" class="card card-info advertencia {{alertService.msgType}}" 
                    [ngStyle]="{'visibility': (alertService.alert.message != null? 'visible': 'hidden'),
                                'left.px': left}" 
                    [ngClass]="{'noShadow': (shadow == false)}">
                    <div class="card-header">
                        {{ alertService.alert.title }}
                    </div>
                    <div class="card-body">
                        {{ alertService.alert.message }}
                    </div>
               </div>`,
    styleUrls: ['./alert-card.component.scss']
})
export class AlertCardComponent implements AfterViewInit { 

    width: number = window.innerWidth;

    @Input() alertService: AlertServiceComponent;
    @Input() name: string = "card-message";
    @Input() position: string;
    @Input() shadow: boolean = true;

    left: number;

    ngAfterViewInit() {
        this.alertService.name = this.name
        this.alertService.position = this.position;
        this.alertService.width = this.width;
    }

}