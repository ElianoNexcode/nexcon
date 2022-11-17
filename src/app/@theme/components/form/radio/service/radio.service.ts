import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Radio {
        id: number
      text: string
     value: string
   checked: boolean
     color: string
}

@Injectable({
    providedIn: "root"
})
export class RadioOptions {

  id: number;
  text: string;
  value: string;
  name: string;
  disabled: boolean = false;

  itens: Radio[] = [];
  itemSelected: Radio;

  add(id: number, text: string, value?: string, checked: boolean = false, color: string = "#a9abae") {
    this.itens.push({id: id,
                   text: text,
                  value: value,
                checked: checked,
                  color: color});

    if(checked == true) {
      this.select(id);
    }

  }

  select(id: number) {
    const index = this.itens.findIndex(opt => opt.id == id);
    if(index >= 0) {
        this.itemSelected = this.itens[index];
        this.value = this.itemSelected.value;
    }
  }

  updateSelect() {
    const index = this.itens.findIndex(opt => opt.value == this.value);
    if(index >= 0) {
        this.itemSelected = this.itens[index];
    }
  }

  enable() {
    this.disabled = false;
  }

  disable() {
    this.disabled = true;
  }

}