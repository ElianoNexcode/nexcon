import { Component, Input, Output, EventEmitter, OnInit, AfterContentInit } from '@angular/core';
import { BoxPanel } from './service/box.service';

interface box {
    item: string
    title: string
}

@Component({
    selector: 'nex-box',
    templateUrl: './box.component.html',
    styleUrls: ['./box.component.scss']
})
export class BoxComponent implements OnInit {

    @Input() name: string = 'defalut';
    @Input() title: string;
    @Input() titleAlign: string = 'center';
    @Input() boxPanel: BoxPanel;
    @Input() padding: boolean = false;
    @Input() noPadding: boolean = false;
    @Input() showFooter: boolean = false;
    @Input() marginTop: number = 9;
    @Input() fullHeight: boolean = false;
    @Input() fullHeightButton: boolean = false;
    @Input() fullHeightMargin: boolean = false;
    @Input() middleHeightMargin: boolean = false;
    @Input() background: string = '#222b45';
    @Input() minPadding: boolean = false;
    @Input() checkButton: boolean = false;
    @Input() noBorder: boolean = false;
    @Input() scrollBar: boolean = false;

    @Output() eventButtonClick: EventEmitter<any> = new EventEmitter();


    ngOnInit() { }

    onButtonClick(type: string) {
        this.eventButtonClick.emit(type);
    }

}