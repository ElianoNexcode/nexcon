import { Component, Input, AfterViewInit } from '@angular/core';

@Component({
    selector: 'nex-form-group',
    template: `<div [id]="name" [ngClass]="{'grid': display == 'grid'}">
                    <ng-content></ng-content>
               </div>`,
    styleUrls: ['./form-group.component.scss']
})
export class FormGroupComponent implements AfterViewInit {

    @Input() name!: string;
    @Input() display: string = "block";
    @Input() minWidthFix: number = 0;

    ngAfterViewInit() {        
        let elemGroup: HTMLElement = document.getElementById(this.name) as HTMLElement;
        let elemEl: Array<HTMLElement> = Array.from(elemGroup.getElementsByClassName("labelBox")) as HTMLElement[];
        let widthDefault: number = elemEl?.slice().sort((a, b) => b.clientWidth - a.clientWidth)[0].clientWidth;

        elemEl?.forEach((elem: HTMLElement) => {
            if(elem.style.minWidth == "") {
                elem.style.minWidth = (this.minWidthFix == 0)? (widthDefault + 1).toString() + "px": (parseInt(this.minWidthFix.toString()) + 1).toString() + "px";
            }            
        })
        let elemEl1: Array<HTMLElement> = Array.from(elemGroup.getElementsByClassName("sufixo")) as HTMLElement[];
        let widthDefault1: number = elemEl1?.slice().sort((a, b) => b?.clientWidth - a?.clientWidth)[0]?.clientWidth;
        
        elemEl1?.forEach((elem: HTMLElement) => {
            if(elem.style.minWidth == "") {
                elem.style.minWidth = (this.minWidthFix == 0)? (widthDefault1 + 1).toString() + "px": (parseInt(this.minWidthFix.toString()) + 1).toString() + "px";
            }            
        })
    }
}