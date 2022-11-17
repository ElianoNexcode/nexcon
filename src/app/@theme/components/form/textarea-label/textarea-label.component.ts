import { Component, Input, OnInit, Output, EventEmitter} from '@angular/core';

@Component({
    selector: 'nex-textarea-label',
    template: `
        <div class="textarea-label" [ngStyle]="{'margin-top': marginTop + 'px'}">
            <div class="label" *ngIf="noLabel == false || noLabel == undefined">
                {{label}}
            </div>
            <div style="display: grid; height: 100%">
                <textarea [id]="textarea.name"
                          [ngStyle]="{'height.px': height, 
                                      'color': color,
                                      'font-weight': fontWeight,
                                      'font-size': fontSize + 'px'}"
                          [ngClass]="{'fullHeight': fullHeight == true}"
                          [case]="'upper'"
                          [regex]="textarea.regex"
                          [maxlength]="textarea.maxLength"
                          [(ngModel)]="textarea.text"
                          (ngModelChange)="onChanged()"
                          [readonly]="!editable"
                          [disabled]="textarea.disabled"
                          
                          autocomplete="off">
                </textarea>
            </div>
        </div>`,
    styleUrls: ['./textarea-label.component.scss']
})
export class TextareaLabelComponent implements OnInit {

    @Input() label: string;
    @Input() textarea: any;
    @Input() name: string;
    @Input() noLabel: boolean;
    @Input() height: number = 51;
    @Input() color: string = "#96989A";
    @Input() fontWeight: string = "normal";
    @Input() fontSize: string = "11";
    @Input() marginTop: number = 9;
    @Input() fullHeight: boolean = false;
    @Input() editable: boolean = true;

    @Output() eventChange = new EventEmitter<any>();

    ngOnInit() {

    }

    onChanged() {
        this.eventChange.emit(this.textarea);
    }

}