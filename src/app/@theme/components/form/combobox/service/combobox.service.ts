import { Injectable, Input } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { InputLabel } from '../../input-label/service/input-label.service';

export interface Options {
    id: number
    text: string
    value: string
    select?: boolean
    disabled?: boolean
    maxLength?: number
    minLength?: number
    visible?: boolean
    icon?: string
    type?: number
}

export interface Item {
    id: number,
    text?: string | null,
    value?: string | null,
    icon?: string | null,
    disabled?: boolean,
    type?: number
}

export interface Param {
    id: string,
    text: string,
    value: string,
    select: string,
    autoId?: boolean;
}
@Injectable({
    providedIn: 'root'
})
export class ComboOptions {
    public itens: Options[] = [];
    public itemSelected?: Item;
    public itensComplete?: Options[];
    public disabled: boolean = false;
    public name!: string;
    public scrollFrom: number = 6;
    public text: string = '';
    public textAlign: string = "left";
    public maxLength?: number;
    public minLength?: number;
    public input?: InputLabel;

    itemSelectedSubject: BehaviorSubject<any> = new BehaviorSubject(null);

    focus(select: boolean = false) {
        const inputEl: HTMLInputElement = (document.getElementById(this.name + "_Input") as HTMLInputElement);

        setTimeout(() => inputEl?.focus(), 50);
    
        if(select) {
            inputEl.selectionStart = 0;
            inputEl.selectionEnd = inputEl?.value.length;
        }
    }

    public add(text: string, value: string, id: number | 0, select?: boolean, disabled?: boolean, icon?: string, type: number = 0) {
        this.itens.push({ "text": text, "value": value, "id": id, "select": select, "disabled": disabled, "icon": icon, "type": type })
        if (this.itens.length == 1 || select == true) {
            this.itemSelected = { id: id, text: text, value: value, disabled: disabled, icon: icon, type: type }
            this.itemSelectedSubject.next(this.itemSelected);
        };

        this.itensComplete = Object.assign([], this.itens);
    }

    public addRange<Param>(range: Param[], param: Param = { id: "id", value: "value", text: "text", select: "select", autoId: false}) {
        var index: number = 0;
        range.forEach(item => {
            this.add(item[keyof Oparam.text], item[param.value], (param.autoId == true) ? index : item[param.id], item[param.select] || false)
        })
    }

    public disable(id: number| null, clear: boolean = false) {
        if (id != null) {
            const index = this.itens.findIndex((itn: Options) => itn.id == id);
            if (index >= 0) {
                this.itens[index].disabled = true;
            }
        } else {
            if (clear) this.clear();
            this.disabled = true;
        }
    }

    public enable(id?: number) {
        if (id) {
            const index = this.itens.findIndex((item: Options) => item.id == id);
            if (index >= 0) {
                this.itens[index].disabled = false;
            }
        } else {
            this.disabled = false;
        }
    }

    public enableAll() {
        if (this.itensComplete) {
            this.itens = Object.assign([], this.itensComplete)
        }
        this.disabled = false;
        this.itens.forEach(item => {
            item.disabled = false;
        })
    }

    public select(id: number | 0, value?: string) {
        if (id >= 0) {
            const index = this.itens.findIndex((itn: Options) => itn.id == id)
            if (index >= 0) {
                this.itemSelected = {"id": id,
                                     "text": this.itens[index].text,
                                     "value": this.itens[index].value,
                                     "disabled": this.itens[index].disabled,
                                     "icon": this.itens[index].icon,
                                     "type": this.itens[index].type};
                this.itemSelectedSubject.next(this.itemSelected);
            }
        } else {
            if (value) {
                this.selectbyValue(value);
            } else {
                for (let index = 0; index < this.itens.length; index++) {
                    if (this.itens[index].disabled == false) {
                        this.itemSelected = {"id": this.itens[index].id,
                                             "text": this.itens[index].text,
                                             "value": this.itens[index].value,
                                             "disabled": this.itens[index].disabled,
                                             "icon": this.itens[index].icon,
                                             "type": this.itens[index].type};
                        this.itemSelectedSubject.next(this.itemSelected);
                        break;
                    }
                }
            }
        }
    }

    public selectbyValue(value: string) {
        const index = this.itens.findIndex((item: Options) => item.value == value);
        if (index >= 0) {
            this.itemSelected = {"id": this.itens[index].id,
                                 "text": this.itens[index].text,
                                 "value": this.itens[index].value,
                                 "type": this.itens[index].type
            };
            this.itemSelectedSubject.next(this.itemSelected);
        }
    }

    public selectbyText(value: string) {
        const index = this.itens.findIndex((item: Options) => item.text == value);
        if (index >= 0) {
            this.itemSelected = {"id": this.itens[index].id,
                                 "text": this.itens[index].text,
                                 "value": this.itens[index].value,
                                 "type": this.itens[index].type
            };
            this.itemSelectedSubject.next(this.itemSelected);
        }
    }

    public clearSelect() {
        this.itemSelected = {"id": 0,
                             "text": null,
                             "value": null
        };
        this.itemSelectedSubject.next(this.itemSelected);
    }

    public clear(enable: boolean = false) {
        this.itens.splice(0, this.itens.length)
        this.clearSelect();

        if (enable) this.enable();
    }

    public getId(text: string): number | undefined {
        const index = this.itens.findIndex((itn: Options) => 
                        itn.text == text || itn.value == text);
        if (index >= 0) {
            return index
        }
        return;
    }

    public hideDisabled() {
        const itens: Options[] = this.itens.filter(item => item.disabled == false);
        this.itens = itens;
    }
}