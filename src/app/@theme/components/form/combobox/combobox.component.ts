import {
  Component,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  ElementRef,
  AfterViewInit,
  OnChanges,
  SimpleChanges
} from '@angular/core';
import { Options, ComboOptions, Item } from './service/combobox.service';
import { delay } from 'rxjs/operators';

import { InputLabel } from '../input-label/service/input-label.service';

@Component({
  selector: 'nex-combobox',
  templateUrl: './combobox.component.html',
  styleUrls: ['./combobox.component.scss']
})
export class ComboboxComponent implements AfterViewInit, OnChanges {

  @Input() options!: ComboOptions;
  @Input() display: boolean = true;
  @Input() type!: string;
  @Input() class?: string;
  @Input() label?: string;
  @Input() textFilter?: string;
  @Input() readonly: boolean = false;
  @Input() onlyComplete: boolean = false;
  @Input() showIcon: boolean = false;
  @Input() findIcon: string = "find";
  @Input() labelMaxWidth?: number;
  @Input() labelMinWidth?: number;
  @Input() marginTop: number = 9;
  @Input() placeholder: string = "";
  @Input() toUp: boolean = false;
  @Input() dynamic: boolean = false;
  @Input() inputLabel?: InputLabel;

  @Output() public eventClick = new EventEmitter();
  @Output() public eventChange = new EventEmitter<any>();
  @Output() public eventFindClick = new EventEmitter<any>();
  @Output() public eventFocusOut = new EventEmitter();
  @Output() public eventKeyEnter = new EventEmitter();
  @Output() public eventMouseOut = new EventEmitter();
  @Output() public inputChange = new EventEmitter();

  @ViewChild("inputRef") inputEl!: ElementRef<HTMLInputElement>;
  @ViewChild("completeRef") completeEl!: ElementRef<HTMLElement>;

  zeroElement: Options = { text: "", value: "", id: 0 };
  optionsVisible: boolean = false;
  clickInOut: boolean = false;

  itemSelected: Item | null = null;
  indexOfOption: number = 0;
  itemSelectID: number | null = null;

  clickOut = () => this.clickout(event);

  ngAfterViewInit() {
    document.getElementById(this.options.name + '_Select')?.classList.remove('no-after');
    if (this.options.itens.length <= 1) {
      document.getElementById(this.options.name + '_Select')?.classList.add('no-after');
    }

    this.options.itemSelectedSubject
      .pipe(delay(0))
      .subscribe(data => {
        this.itemSelected = data;
      })
  }

  ngOnChanges(changes: SimpleChanges): void {
      
  }

  onOptions_Click() {
    if (this.toUp) {
      const comboItens: HTMLElement = document.getElementById("itens_" + this.options.name) as HTMLElement;
      const comboItensHeight: number = comboItens.offsetHeight;
      comboItens.style.top = ((comboItensHeight + 3) * -1).toString() + "px";
    }

    this.optionsVisible = !this.optionsVisible;
    if (this.optionsVisible == true) {
      this.clickInOut = false;
      document.addEventListener('click', this.clickOut, true);
    } else {
      this.clickOut();
    }

    if (this.dynamic) this.eventClick.emit();
  }

  onOptions_Select(index?: number) {
    if (index != undefined) {
      const optionFilter: ComboOptions = this.options;
      const id: number = optionFilter.itens[index].id;

      if(this.options.itemSelected && (id != this.options.itemSelected?.id && this.type == "doc")) {
        this.options.itemSelected.value = this.inputLabel?.text;
      }

      this.options.select(id);
      this.optionsVisible = false;
      this.eventChange.emit(optionFilter.itemSelected);
    }
  }

  onOptions_Over(index: number) {
    this.indexOfOption = index;
    this.itemSelectID = this.options.itens[this.indexOfOption].id;
  }

  clickout(event?: any) {
    this.optionsVisible = false;
    document.removeEventListener('click', this.clickOut, true);
    this.clickInOut = true;
  }

  onKeyUp(event: KeyboardEvent) {
    console.log(event.key);

    switch (event.key) {
      case "ArrowDown":
        if (!this.optionsVisible) {
          this.indexOfOption = 0;
          this.optionsVisible = true;
          //this.inputEl.nativeElement.readOnly = true;
        } else {
          if (this.indexOfOption < (this.options.itens.length - 1)) this.indexOfOption += 1;
        }
        this.itemSelectID = this.options.itens[this.indexOfOption].id;
        break;

      case "ArrowUp":
        if (this.optionsVisible) {
          if (this.indexOfOption > 0) this.indexOfOption -= 1;
          this.itemSelectID = this.options.itens[this.indexOfOption].id;
        }
        break;

      case "Enter":
        event.preventDefault();

        if (this.optionsVisible && this.itemSelectID != null) {
          this.inputEl.nativeElement.value = this.options.itens[this.indexOfOption].text;
          if (this.completeEl) this.completeEl.nativeElement.innerText = this.inputEl.nativeElement.value;
          this.optionsVisible = false;
        } else {
          if (this.options.itemSelected && (this.completeEl && this.completeEl.nativeElement.innerText?.length > 0)) {
            this.options.itemSelected.text = this.completeEl.nativeElement.innerText;
            //this.inputEl.nativeElement.value = this.completeEl.nativeElement.innerText;
          }            
        }
        break;

      case "Escape":
        this.optionsVisible = false;
        this.indexOfOption = 0;
        this.itemSelectID = null;
        if (this.type == "input") {
          this.inputEl.nativeElement.readOnly = false;
        }
        break;

      default:
        if (this.optionsVisible) this.optionsVisible = false;
        let val: string = this.inputEl.nativeElement.value;

        if (val == '') {
          if (this.completeEl) this.completeEl.nativeElement.innerText = '';
          return;
        }
        break;

    };

    if(this.type == 'input' && this.options.itemSelected) {
      const index: number = this.options.itens.findIndex(item => item.text == this.itemSelected?.text);
      if(index >= 0) {
        this.options.itemSelected.id = this.options.itens[index].id;
      } else {
        this.options.itemSelected.id = 0;
      }
    }

    const names: Options[] = this.options.itens;
    let name: string = '';

    let val: string = this.inputEl.nativeElement.value;

    var find: boolean = false;
    var pos: number = 0;
    for (var i: number = 0; i < names.length; i++) {
      name = names[i].text;
      if (name.indexOf(val) === 0) {
        //if(i > 0) this.onOptions_Select(i);
        find = true;
        pos = i;
        break;
      } else {
        name = '';
      }
    }

    if (find === true) {
      const comboItens: HTMLElement = document.getElementById("itens_" + this.options.name) as HTMLElement;
      comboItens.scroll(0, 20 * pos);
      if (this.completeEl) this.completeEl.nativeElement.innerText = name;
    } else {
      if (this.completeEl) this.completeEl.nativeElement.innerText = '';
    }
  }

  onText_Change(event: any) {
    this.eventChange.emit(this.options.itemSelected);
  }

  onTextInput_Change(event: any) {
    if(this.options.itemSelected) {
      this.options.itemSelected.value = this.inputLabel?.text;
      this.inputChange.emit(this.options.itemSelected);  
    }
  }

  onTextInput_Keyup(event: KeyboardEvent) {
    event.preventDefault();
    if (event.keyCode == 13) {
      this.onFilter_Find();
    }
  }

  onFocus(event: any) {
    event.preventDefault();
    this.completeEl.nativeElement.innerText = this.inputEl.nativeElement.value;
    this.completeEl.nativeElement.style.visibility = 'visible';
  }

  onFocusOut(event: any) {
    event.preventDefault();

    //this.options.itemSelected.text = this.inputEl.nativeElement.innerHTML;

    if (this.optionsVisible && this.itemSelectID != null) {
      if (this.options.itens[this.indexOfOption].text.indexOf(this.inputEl.nativeElement.value) >= 0) {
        this.inputEl.nativeElement.value = this.options.itens[this.indexOfOption].text;
      } else {
        this.indexOfOption = 0;
      }
      if (this.completeEl) this.completeEl.nativeElement.innerText = this.inputEl.nativeElement.value;
      this.optionsVisible = false;
    } else {
      if (this.completeEl && this.completeEl.nativeElement.innerText?.length > 0) {
        //this.inputEl.nativeElement.value = this.completeEl.nativeElement.innerText;
        //this.itemSelected.text = this.inputEl.nativeElement.value;
      }
    }

    if (this.optionsVisible) this.optionsVisible = false;
    if (this.completeEl) this.completeEl.nativeElement.style.visibility = 'hidden';

    //this.eventChange.emit(this.options.itemSelected);

  }

  onFilter_Change() {
    let optionFilter: Item = Object.assign([], this.options.itemSelected);
    optionFilter.text = optionFilter.text;
    optionFilter.value = (this.options.text == null) ? "" : this.options.text;
    this.eventChange.emit(optionFilter);
  }

  onFilter_Find() {
    let optionFilter: Item = Object.assign([], this.options.itemSelected);
    optionFilter.text = optionFilter.text;
    optionFilter.value = (this.options.text == null) ? "" : this.options.text;
    this.eventFindClick.emit(optionFilter);
  }

  onInputLabel_FocusOut() {
    this.eventFocusOut.emit();
  }

  onInputLabel_MouseOut() {
    this.eventMouseOut.emit();
  }

  onInputLabel_KeyEnter() {
    this.eventKeyEnter.emit()
  }
}
