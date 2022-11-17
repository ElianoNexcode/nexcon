import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { DateFormated, DateOperator } from '../../../miscellaneous/date-operator/date-operator';

export interface Input {
  text: string,
}

@Injectable({
  providedIn: 'root'
})
export class InputLabel {

  name: string;
  text: string = "";
  textMasked: string = "";
  textAlign: string = "left";
  rules: string;  
  regex: string | "noFilter" | "email" | "numeric" | undefined;
  type: string;
  minLength: number;
  maxLength: number;
  disabled: boolean = false;
  findButtonDisabled: boolean = false;
  actionButtonDisabled: boolean = false;
  readOnly: boolean = false;
  validated: boolean = true;
  formated: string;

  dateOperador: DateOperator = new DateOperator();

  ruleBehavior: BehaviorSubject<string>;
  activeRules: string;

  clear(enable: boolean = false) {
    this.text = "";
    this.textMasked = "";
    this.formated = undefined;
    this.validated = true;
    if(enable) this.enable();
  }

  setRule(rule: string) {
    setTimeout(() => {
      this.ruleBehavior.next(rule);
    }, 300);      
  }

  ruleSubject(): BehaviorSubject<string> {
    if(!this.ruleBehavior) this.ruleBehavior = new BehaviorSubject(null);
    return this.ruleBehavior;
  }

  focus(select: boolean = false) {
    const inputEl: HTMLInputElement = (document.getElementById(this.name) as HTMLInputElement);
    setTimeout(() => inputEl?.focus(), 50); 

    if(select) {
      inputEl.selectionStart = 0;
      inputEl.selectionEnd = inputEl.value.length;
    }
  }

  condition():boolean {
    let condition: boolean = false;
    switch (this.rules) {      
      case "time":
      case "timefull":
        if(this.textMasked != null && this.textMasked?.length > 0) {
          if(this.textMasked.length == 5 || this.textMasked.length == 8) {
            const dateCheck: any = new Date("1970-01-01T" + this.textMasked);
            if(dateCheck != "Invalid Date") condition = true;
          }
        } else {
          condition = (this.minLength == 0);
        }
        break;

      case "date": 
        if(this.textMasked != null && this.textMasked != "") {
          if(this.textMasked.length == 10) {
            const yearDate = parseInt(this.textMasked.substr(6, 4));
            const mouthDate = parseInt(this.textMasked.substr(3, 2)) - 1;
            const dayDate = parseInt(this.textMasked.substr(0, 2));
            const dateCheck: any = new Date(yearDate, mouthDate, dayDate);
            if(dateCheck != "Invalid Date") condition = true;
          }
        } else {
          condition = true;
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

  enable(readOnly: boolean = false) {
    this.disabled = false;
    this.readOnly = readOnly;
  }

  buttonEnable() {
    this.actionButtonDisabled = false;
    this.findButtonDisabled = false;
  }

  disable(clear: boolean = false, readOnly: boolean = true) {
    if(clear) this.clear();
    this.disabled = true;
    this.readOnly = readOnly;
  }

  buttonDisable(){
    this.actionButtonDisabled = true;
    this.findButtonDisabled = true;
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

      case "dateTime":
        const dateTimeFormated: DateFormated = this.dateOperador.formatDate(this.text, true, this.maxLength);                      
        this.text = dateTimeFormated.dateLocale + " " + dateTimeFormated.timeFormated;
        this.textMasked = dateTimeFormated.dateLocale + " " + dateTimeFormated.timeFormated;
        this.validated = dateTimeFormated.dateValided;
        this.formated = dateTimeFormated.dateFormated;            
        break;
  
      case "time":
        const timeFormated: DateFormated = this.dateOperador.formatTime(this.text);
        this.textMasked = this.text;
        this.validated = timeFormated.dateValided;
        this.formated = timeFormated.timeFormated;  
        break;

      case "timeFull":
        const timeFullFormated: DateFormated = this.dateOperador.formatTime(this.text, true);
        this.textMasked = this.text;
        this.validated = timeFullFormated.dateValided;
        this.formated = timeFullFormated.timeFormated;
        break;
  
      case "ip":
        this.textMasked = text;
        this.validated = true;
        this.formated = text;
        break;

      case "CPF":
        this.textMasked = text;
        this.validated = true;
        this.formated = text;
        break;

      case "cnpj":
        this.textMasked = text;
        this.validated = true;
        this.formated = text;  
        break;

      case "telfixo":
        this.textMasked = text;
        this.validated = true;
        this.formated = text;  
        break;

      case "telmovel":
        this.textMasked = text;
        this.validated = true;
        this.formated = text;    
        break;
      
    }

  };

  checkValue() {
    this.validated = false;
    if(this.textMasked != null && this.textMasked != ""){

        this.textMasked = this.textMasked.replace(/[^0-9\.\-]+/g, "");

        const length: number = this.text.length;
        if(length == 11) {
            let cpf = this.text;
            if ((cpf == '00000000000') || 
                (cpf == '11111111111') || 
                (cpf == '22222222222') || 
                (cpf == '33333333333') || 
                (cpf == '44444444444') || 
                (cpf == '55555555555') || 
                (cpf == '66666666666') || 
                (cpf == '77777777777') || 
                (cpf == '88888888888') || 
                (cpf == '99999999999')) {
                this.validated = false;
            } else {
                let numero: number = 0;
                let caracter: string = '';
                let numeros: string = '0123456789';
                let j: number = 10;
                let somatorio: number = 0;
                let resto: number = 0;
                let digito1: number = 0;
                let digito2: number = 0;
                let cpfAux: string = '';
                let seqErro: boolean = true;
                cpfAux = cpf.substring(0, 9);
                for (let i: number = 0; i < 9; i++) {
                    caracter = cpfAux.charAt(i);
                    if (numeros.search(caracter) == -1) {
                        seqErro = false;
                    }
                    numero = Number(caracter);
                    somatorio = somatorio + (numero * j);
                    j--;
                }
                resto = somatorio % 11;
                digito1 = 11 - resto;
                if (digito1 > 9) {
                    digito1 = 0;
                }
                j = 11;
                somatorio = 0;
                cpfAux = cpfAux + digito1;
                for (let i: number = 0; i < 10; i++) {
                    caracter = cpfAux.charAt(i);
                    numero = Number(caracter);
                    somatorio = somatorio + (numero * j);
                    j--;
                }
                resto = somatorio % 11;
                digito2 = 11 - resto;
                if (digito2 > 9) {
                    digito2 = 0;
                }
                cpfAux = cpfAux + digito2;
                if (cpf == cpfAux && seqErro == true) {
                    this.validated = true;
                }

            }
        }

    } else {
        this.validated = true;
    }
  }

}
