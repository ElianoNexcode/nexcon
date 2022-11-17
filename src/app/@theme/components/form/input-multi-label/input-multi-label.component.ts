import { Component, ViewChild, Input, Output, EventEmitter, ElementRef, OnInit, AfterViewInit } from '@angular/core';
import { DateFormated, DateOperator } from '../../miscellaneous/date-operator/date-operator';

const custonMasks = [
    {"maskName": "telefone", "mask": ""},
    {"maskName": "cep", "mask": "00000-000"},
    {"maskName": "uppercase", "mask": "", "case": "upper"},
    {"maskName": "lowercase", "mask": "", "case": "lower"},
    {"maskName": "CPF_CNPJ", "mask": "CPF_CNPJ"},
    {"maskName": "date", "mask": "00/00/0000", "case": null},
    {"maskName": "time", "mask": "00:00"},
    {"maskName": "onlynumbers", "mask": "00000000000000000000", "case": null },
    {"maskName": "onlyletters", "mask": "SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS",  "case": "upper"},
    {"maskName": "ip", "mask": "IP", "case": null},
]

@Component({
    selector: 'nex-input-multi-label',
    templateUrl: './input-multi-label.component.html',
    styleUrls: ['./input-multi-label.component.scss']
})
export class InputMultiLabelComponent implements OnInit, AfterViewInit {

    @ViewChild('inputMaskLeft') inputElLeft: ElementRef;
    @ViewChild('inputMaskRight') inputElRight: ElementRef;

    @Input() text?: string;
    @Input() labelMinWidth: number;
    @Input() inputLeft: any;
    @Input() inputRight: any;
      
    @Input() disabled: boolean;
    @Input() display: boolean = true;
    @Input() focus: boolean;

    @Output() eventChange = new EventEmitter<any>();

    customMaskLeft: any;
    customMaskRight: any;

    dateOperador: DateOperator = new DateOperator();

    public onlyNumbers = { '0': { pattern: new RegExp('\[0-9\]') } };

    ngOnInit() {
        
        this.customMaskLeft = custonMasks.find(msk => msk.maskName == this.inputLeft.rules);
        if(this.inputLeft.maxLength && !this.inputLeft.rules.indexOf("case")) {
            this.customMaskLeft.mask = this.customMaskLeft.mask + "{" + this.inputLeft.maxLength + "}";
        };

        this.customMaskRight = custonMasks.find(msk => msk.maskName == this.inputRight.rules);
        if(this.inputRight.maxLength && !this.inputRight.rules.indexOf("case")) {
            this.customMaskRight.mask = this.customMaskRight.mask + "{" + this.inputRight.maxLength + "}";
        };
    }

    ngAfterViewInit() {
        if(this.focus == true) {
            this.inputElLeft.nativeElement.classList.add("inputFocus")
        }
    };

    onChangedLeft() {

        this.inputLeft.textMasked = (this.inputLeft.textMasked == null || this.inputLeft.textMasked.length <= this.inputLeft.maxLength)? 
                            this.inputElLeft.nativeElement.value:
                            this.inputLeft.textMasked;
        
        switch (this.inputLeft.rules) {
            case "date":
                this.inputLeft.validated = false;
                const dateFormated: DateFormated = this.dateOperador.formatDate(this.inputLeft.textMasked, null, this.inputLeft.maxLength);                  
                this.inputLeft.validated = dateFormated.dateValided;
                this.inputLeft.formated = dateFormated.dateFormated;    
                break;

            case "time":
                this.inputLeft.validated = false;
                const timeFormated: DateFormated = this.dateOperador.formatTime(this.inputLeft.textMasked);    
                this.inputLeft.validated = timeFormated.dateValided;
                this.inputLeft.formated = timeFormated.timeFormated;    
                break;

            case "timeFull":
                this.inputLeft.validated = false;
                const timeFormatedFull: DateFormated = this.dateOperador.formatTime(this.inputLeft.textMasked, true);    
                this.inputLeft.validated = timeFormatedFull.dateValided;
                this.inputLeft.formated = timeFormatedFull.timeFormated;    
                break;
    
            case "email":
                this.inputLeft.validated = false;
                const arroba: number = this.inputLeft.text.indexOf("@");
                const length: number = this.inputLeft.text.length;

                if(this.inputLeft.text != null && this.inputLeft.text != "") {
                    if(length >= 6 && arroba >= 0 && arroba <= (length - 3)) {
                        const dominio: string = this.inputLeft.text.substr(arroba);
                        const dot: number = dominio.indexOf(".");
    
                        if(dot > 0 && dot < (dominio.length - 2)) this.inputLeft.validated = true;
                        
                    } else {
                        this.inputLeft.validated = false;
                    }    
                } else {
                    this.inputLeft.validated = true;
                }
                break;

            case "CPF":
                this.inputLeft.validated = false;
                if(this.inputLeft.textMasked != null && this.inputLeft.textMasked != ""){

                    this.inputLeft.textMasked = this.inputLeft.textMasked.replace(/[^0-9\.\-]+/g, "");
    
                    const length: number = this.inputLeft.text.length;
                    if(length == 11) {
                        let cpf = this.inputLeft.text;
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
                            this.inputLeft.validated = false;
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
                                this.inputLeft.validated = true;
                            }
    
                        }
                    }

                } else {
                    this.inputLeft.validated = true;
                }
                break;

            case "ip":
                this.inputLeft.validated = false;
                if(this.inputLeft.textMasked != null && this.inputLeft.textMasked != "") {
                    const length: number = this.inputLeft.textMasked.length;
                    if(length >= 7) {
                        const classA_End = this.inputLeft.textMasked.indexOf('.');
                        if(classA_End > 0) {
                            const classB_End = this.inputLeft.textMasked.indexOf('.', classA_End + 1);
                            if(classB_End > 0) {
                                const classC_End = this.inputLeft.textMasked.indexOf('.', classB_End + 1);
                                if(classC_End > 0) {
                                    const class_A: number = parseInt(this.inputLeft.textMasked.substr(0, classA_End));
                                    const class_B: number = parseInt(this.inputLeft.textMasked.substr(classA_End + 1, (classB_End - classA_End) - 1));
                                    const class_C: number = parseInt(this.inputLeft.textMasked.substr(classB_End + 1, (classC_End - classB_End) - 1));
                                    const class_D: number = parseInt(this.inputLeft.textMasked.substr(classC_End + 1));
                                    if((class_A <= 254 && class_B <= 254 && class_C <= 254 && class_D <= 254) &&
                                       (class_A > 0 && class_D > 0) &&
                                       (class_A + class_B + class_C + class_D > 0)) {
                                        this.inputLeft.validated = true;
                                        this.inputLeft.formated = class_A + "." + class_B + "." + class_C + "." + class_D;
                                    }            
                                }
                            }
                        }
                    }                    
                } else {
                    this.inputLeft.validated = true;
                }
                break;
        }
        
        this.eventChange.emit(this.inputLeft);

    }

    onChangedRight() {

        this.inputRight.textMasked = (this.inputRight.textMasked == null || this.inputRight.textMasked.length <= this.inputRight.maxLength)? 
                            this.inputElRight.nativeElement.value:
                            this.inputRight.textMasked;
        
        switch (this.inputRight.rules) {
            case "date":
                this.inputRight.validated = false;
                const dateFormated: DateFormated = this.dateOperador.formatDate(this.inputRight.textMasked, null, this.inputRight.maxLength);  
                
                this.inputRight.validated = dateFormated.dateValided;
                this.inputRight.formated = dateFormated.dateFormated;
    
                break;
            case "time":
                this.inputRight.validated = false;
                const timeFormated: DateFormated = this.dateOperador.formatTime(this.inputRight.textMasked);
    
                this.inputRight.validated = timeFormated.dateValided;
                this.inputRight.formated = timeFormated.timeFormated;
    
                break;
            case "email":
                this.inputRight.validated = false;

                const arroba: number = this.inputRight.text.indexOf("@");
                const length: number = this.inputRight.text.length;

                if(this.inputRight.text != null && this.inputRight.text != "") {
                    if(length >= 6 && arroba >= 0 && arroba <= (length - 3)) {
                        const dominio: string = this.inputRight.text.substr(arroba);
                        const dot: number = dominio.indexOf(".");
    
                        if(dot > 0 && dot < (dominio.length - 2)) this.inputRight.validated = true;
                        
                    } else {
                        this.inputRight.validated = false;
                    }    
                } else {
                    this.inputRight.validated = true;
                }

                break;
            case "CPF":
                this.inputRight.validated = false;
                if(this.inputRight.textMasked != null && this.inputRight.textMasked != ""){

                    this.inputRight.textMasked = this.inputRight.textMasked.replace(/[^0-9\.\-]+/g, "");
    
                    const length: number = this.inputRight.text.length;
                    if(length == 11) {
                        let cpf = this.inputRight.text;
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
                            this.inputRight.validated = false;
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
                                this.inputRight.validated = true;
                            }
    
                        }
                    }

                } else {
                    this.inputRight.validated = true;
                }
                break;
            case "ip":
                this.inputRight.validated = false;
                if(this.inputRight.textMasked != null && this.inputRight.textMasked != "") {
                    const length: number = this.inputRight.textMasked.length;
                    if(length >= 7) {
                        const classA_End = this.inputRight.textMasked.indexOf('.');
                        if(classA_End > 0) {
                            const classB_End = this.inputRight.textMasked.indexOf('.', classA_End + 1);
                            if(classB_End > 0) {
                                const classC_End = this.inputRight.textMasked.indexOf('.', classB_End + 1);
                                if(classC_End > 0) {
                                    const class_A: number = parseInt(this.inputRight.textMasked.substr(0, classA_End));
                                    const class_B: number = parseInt(this.inputRight.textMasked.substr(classA_End + 1, (classB_End - classA_End) - 1));
                                    const class_C: number = parseInt(this.inputRight.textMasked.substr(classB_End + 1, (classC_End - classB_End) - 1));
                                    const class_D: number = parseInt(this.inputRight.textMasked.substr(classC_End + 1));
                                    if((class_A <= 254 && class_B <= 254 && class_C <= 254 && class_D <= 254) &&
                                       (class_A > 0 && class_D > 0) &&
                                       (class_A && class_B && class_C && class_D > 0)) {
                                        this.inputRight.validated = true;
                                        this.inputLeft.formated = class_A + "." + class_B + "." + class_C + "." + class_D;
                                    }            
                                }
                            }
                        }
                    }                    
                } else {
                    this.inputRight.validated = true;
                }
                break;
        }
        this.eventChange.emit(this.inputRight);
    }

}