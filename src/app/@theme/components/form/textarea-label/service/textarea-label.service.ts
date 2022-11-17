import { Injectable } from '@angular/core';

export interface Textarea {
  text: string,
}

@Injectable({
  providedIn: 'root'
})
export class TextareaLabelService {

}

export class TextareaLabel {
  name: string = "";
  text: string = "";
  minLength: number = 0;
  maxLength: number = 999;
  regex: string | "noFilter" | "email" | "numeric" | undefined;

  disabled: boolean = false;

  focus() {
    let textareaEl: HTMLTextAreaElement = (document.getElementById(this.name) as HTMLTextAreaElement);
    textareaEl.focus();
  }

  clear() {
    this.text = "";
  }

  condition():boolean {
    let condition: boolean = false;

    if(this.text.length >= this.minLength) {
      condition = true;
    };

    return condition;
  }


}
