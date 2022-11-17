import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { Options, OptionsGroup } from './service/select-group.service'

@Component({
    selector: 'nex-select-group',
    templateUrl: './select-group.component.html',
    styleUrls: ['./select-group.component.scss']
})

export class SelectGroupComponent implements OnChanges {
    
    @Input() text: string;
    @Input() options: OptionsGroup;
    @Input() border: string;

    @Input() displayInTab: boolean = false;

    @Input() selectAll: boolean = false;
    @Input() selectAllVisible: boolean = true;

    @Input() showSelect: boolean = false;

    @Input() horizontal: boolean = false;
    @Input() marginTop: number = 9;

    @Input() labelMaxWidth: number;
    @Input() labelMinWidth: number;

    @Input() class: string;
    
    @Input() editable: boolean = true; 
    
    @Output() eventChange = new EventEmitter<Options>();
    @Output() eventSelect = new EventEmitter<any>();    
    
    disabled: boolean = true;

    constructor() { }

    ngOnChanges(changes: SimpleChanges): void {
        if(changes.options) {
            this.options = changes.options.currentValue as OptionsGroup;
        }
    }
    
    onSelectChange(index: number, checked?: boolean) {
        if(checked != undefined) this.options.itens[index].checked = checked;
        this.options.selectAll_Status()
        this.eventChange.emit(this.options.itens[index]);
    }

    onSelectAllChange() {
        this.options.indeterminate = false;
        if(this.options.selectAll_Options.checked == true){
            this.options.itens.forEach(item => {
                this.options.check(item.id);
                this.eventChange.emit(item);
            })
        } else {
            this.options.itens.forEach(item => {
                this.options.uncheck(item.id);
                this.eventChange.emit(item);
            })
        }
    }

    onClick_Options(index: number, checked?: boolean) {
        this.options.activeOption = index;
        this.eventSelect.emit(this.options.itens[index].id);
        if(!this.showSelect || checked != undefined) {
            this.onSelectChange(index, (checked != undefined)? checked: !this.options.itens[index].checked);
        } 
    }

}
