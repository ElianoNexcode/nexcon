import { Component } from '@angular/core';

@Component({
    selector: 'nex-info-card',
    template: `
        <button type="button" class="btn button-round" (mouseover)="onMouseOver($event)" (mouseleave)="onMouseLeave($event)">i</button>
        <div id="cardInfomessage" class="card card-info">
            <div class="card-header">Informação!</div>
            <div class="card-body">
                <span>
                    <ng-content></ng-content>
                </span>
            </div>
        </div>
    `,
    styleUrls: ['./info-card.component.scss'],
})
export class InfoCardComponent {
    
    onMouseOver(event: any) {
        document.getElementById("cardInfomessage").style.display = "block";
    }

    onMouseLeave(event: any) {
        document.getElementById("cardInfomessage").style.display = "none";
    }
}