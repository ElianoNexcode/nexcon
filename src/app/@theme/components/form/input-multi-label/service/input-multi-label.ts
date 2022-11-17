import { Injectable } from '@angular/core';
import { DateFormated, DateOperator } from '../../../miscellaneous/date-operator/date-operator';

@Injectable({
    providedIn: "root"
})
export class InputMultiLabel {

    name: string = "";
    text: string = "";
    label: string = "";
    textMasked: string = "";
    rules: string = "";
    regex: string | "noFilter" | "email" | "numeric" | undefined;
    minLength: number = 0;
    maxLength: number = 999;
    validated: boolean = true;
    formated: string;
    minWidth: number;
    type: string;
    textAlign: string = "left";

    dateOperador: DateOperator = new DateOperator();
  
    clear() {
      this.text = "";
      this.textMasked = "";
      this.formated = undefined;
      this.validated = true;
    }
  
    focus(select: boolean = false) {
      let inputEl: HTMLInputElement = (document.getElementById(this.name) as HTMLInputElement);
      inputEl.focus();
  
      if(select) {
        inputEl.selectionStart = 0;
        inputEl.selectionEnd = inputEl.value.length;
      }
  
    }
  
    condition():boolean {
      let condition: boolean = false;
  
      switch (this.rules) {
        case "time":
          if(this.textMasked?.length > 0) {
            if(this.textMasked.length == 5) {
              const dateCheck: any = new Date("1970-01-01T" + this.textMasked);
              if(dateCheck != "Invalid Date") condition = true;
            }
          } else {
            condition = (this.minLength == 0);
          }            
          break;

        case "date": 
          if(this.textMasked?.length > 0) {
            if(this.textMasked.length == 10) {
              const dateCheck: any = new Date(this.formated);
              if(dateCheck != "Invalid Date") condition = true;
            }
          } else {
            condition = (this.minLength == 0);
          }
          break;

        default:
          if(this.text != null) {
            condition = this.text.length >= this.minLength;
          };
          break;

      }
      return condition;
    }
  
    setTextWithMask(text: string) {
      this.text = text;
  
      switch (this.rules) {
        case "date":
          const dateFormated: DateFormated = this.dateOperador.formatDate(this.text, false, this.maxLength);                        
          this.text = dateFormated.dateLocale;
          this.textMasked = dateFormated.dateLocale;
          this.validated = dateFormated.dateValided;
          this.formated = dateFormated.dateFormated;              
          break;

        case "time":
          const timeFormated: DateFormated = this.dateOperador.formatTime(this.text);
          this.text = text;
          this.textMasked = text;
          this.formated = timeFormated.timeFormated;
          this.validated = timeFormated.dateValided;
          break;

        case "timeFull":
          const timeFormatedFull: DateFormated = this.dateOperador.formatTime(this.text, true);
          this.text = text;
          this.textMasked = text;
          this.formated = timeFormatedFull.timeFormated;
          this.validated = timeFormated.dateValided;
          break;
  
        case "ip":
          this.textMasked = text;
          this.validated = true;
          this.formated = text;  
          break;

      }
    };
  
  }
  