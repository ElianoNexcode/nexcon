import { Component, Output, EventEmitter, Input } from '@angular/core';
import {TranslateService} from '@ngx-translate/core';

@Component({
    selector: "nex-card-question",
    templateUrl: "./card-question.component.html",
    styleUrls: ["./card-question.component.scss"]
})
export class CardQuestionComponent {    

    @Input() question: string;
    @Output() eventClick = new EventEmitter<string>();

    constructor(public translate: TranslateService) {

    }

    onClick(selectOption: string) {
        this.eventClick.emit(selectOption);
    }

}