import { Injectable } from '@angular/core';

export interface Options {
    id: number
    text: string
    alias?: string
    icon?: string
    checked?: boolean
    disabled?: boolean
    initial?: boolean
    indeterminate?: boolean
    column?: number
    row?: number
}

@Injectable({
  providedIn: 'root'
})
export class OptionsGroup {
  public name: string;
  
  public itens: Options[] = [];
  public activeOption: number = 0;
  public columns: number = 1;


  public maxHeight: number;

  public selectAll_Options: Options = {id: 0, text: null, checked: false};
  public indeterminate: boolean = false;

  public add(id: any, text: string, alias?: string, checked: boolean = false, disabled: boolean = false, initial: boolean = false, row: number = 0, column: number = 1, icon?: string) {    
    this.itens.push({id: id, text: text, alias: alias, checked: checked, disabled: disabled, initial: initial, row: row, column: column, icon: icon});

    this.selectAll_Status();
  }

  public clear() {
    this.itens = [];
    this.selectAll_Status();
  }

  public check(id: any, value: boolean = true) {
    let index: number = this.itens.findIndex(item => item.id == id);
    if(index >= 0) { 
      this.itens[index].checked = value;
    }

    this.selectAll_Status();
  }

  public uncheck(id: any) {
    let index: number = this.itens.findIndex(item => item.id == id);
    if(index >= 0) { 
      this.itens[index].checked = false;
    }

    this.selectAll_Status();
  }

  public itemIndeterminate(id: any, status: boolean = true) {
    let index: number = this.itens.findIndex(item => item.id == id);
    if(index >= 0) { 
      this.itens[index].indeterminate = status;
    }

    this.selectAll_Status();
  }


  public select(id: any) {
    let index: number = this.itens.findIndex(item => item.id == id);
    if(index >= 0) { 
      this.activeOption = index;
    }
  }

  public count(condition?: boolean): number {
    let count: number = 0;
    this.itens.forEach(item => {
        if(condition) {
          if(item.checked == condition) {
            count++
          }          
        } else {
          count++
        }
    })
    return count;
  }

  public populate(param: any) {
    this.itens.forEach((item: Options, index:number) => {
      if(param[item.alias] != undefined) {
        this.itens[index].checked = param[item.alias];
      }
    })

    this.selectAll_Status();
  }

  public reset() {
    this.itens.forEach(item => {
      item.checked = item.initial;
    })
    this.selectAll_Status();
  }
  
  public valueOf(key: string): boolean {
    let index: number = this.itens.findIndex(itn => itn.alias == key);
    if(index >= 0) {
      return this.itens[index].checked
    } else {
      return undefined
    }
  }

  public getItem(key: string): Options {
    let index: number = this.itens.findIndex(itn => itn.alias == key);
    if(index >= 0) {
      return this.itens[index];
    } else {
      return undefined;
    }  
  }

  public disable(key: string, reset: boolean = false) {
    let index: number = this.itens.findIndex(itn => itn.alias == key);
    if(index >= 0) {
      this.itens[index].disabled = true;

      if(reset == true) {
        this.itens[index].checked = false;

        this.selectAll_Status();
      }
    }
  }

  public enable(key: string) {
    let index: number = this.itens.findIndex(itn => itn.alias == key);
    if(index >= 0) {
      this.itens[index].disabled = false;
    }
  }

  public enableAll() {
    this.itens.forEach(item => {
      item.disabled = false;
    })
  }

  public disableAll(reset: boolean = false) {
    this.itens.forEach(item => {
      item.disabled = true;
      if(reset) {
        item.checked = false;

        this.selectAll_Status();
      }
    })
  }

  public valueOf_All(): number {
    let valueDec: number = 0;
    this.itens.sort((a,b) => a.id - b.id).forEach(item => {
      valueDec += (item.checked == true)? 2 ** item.id: 0;
    })
    return valueDec;
  }

  public valueHEXOf_All(length: number): string {
    let valueDec: number = 0;
    this.itens.sort((a,b) => a.id - b.id).forEach(item => {
      valueDec += (item.checked == true)? 2 ** item.id: 0;
    })
    return ("00" + valueDec.toString(16)).slice((length * -1)).toUpperCase();
  }

  public valueBINOf_All(): string {
    let value: string = "";
    this.itens.sort((a,b) => a.id - b.id).forEach(item => {
      value += (item.checked == true)? '1': '0';
    })
    return value;
  }

  public valueArray_All(): Array<number> {
    let selectedId: Array<number> = [];
    this.itens.filter(itn => itn.checked == true).forEach((item: Options) => {
      selectedId.push(item.id)
    })
    return selectedId;
  }

  public populateBy_DEC(value: number) {
    this.itens.forEach(item => {
      item.checked = ((2 ** item.id) & value) > 0;
    });
  }

  public populateBy_BIN(value: string) {
    this.itens.forEach((item, index) => {
      item.checked = (value?.substring(index, index + 1) == '1')? true: false;
    })
  }

  public selectAll_Status() {
    if(this.itens.filter(opt => opt.checked && !opt.indeterminate).length == this.itens.length) {
        this.selectAll_Options.checked = true;
        this.indeterminate = false;
    } else {
        if(this.itens.filter(opt => !opt.checked && !opt.indeterminate).length == this.itens.length) {
            this.selectAll_Options.checked = false;
            this.indeterminate = false;
        } else {
            this.indeterminate = true;
        }
    }
  }

}
