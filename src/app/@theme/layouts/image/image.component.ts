import { Component, Input } from '@angular/core';

@Component({
    selector: 'nex-image',
    template: `<div class="image" [ngClass]="class">
                  <img class="src" [src]=src [width]=width [height]=height [ngClass]="{'border': border == true }">
                  <span *ngIf ="sizeText == true">
                    Tamanho em Pixel: {{height}} x {{width}}
                  </span>
               </div>`,
    styleUrls: ['./image.component.scss']
})
export class ImageComponent {

    @Input() src: string;
    @Input() width: number;
    @Input() height: number;
    @Input() border: boolean = false;
    @Input() sizeText: boolean = false;
    @Input() class: string;
}