import { Component, Input, Output, EventEmitter, OnInit, ViewChild, ElementRef, AfterViewInit, OnChanges, SimpleChanges, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { DateFormated, DateOperator } from '../../miscellaneous/date-operator/date-operator';
import { InputLabel } from './service/input-label.service';

const customMasks = [
    { "maskName": "telfixo", "mask": "(00) 0000-0000" },
    { "maskName": "telmovel", "mask": "(00) 00000-0000" },
    { "maskName": "cep", "mask": "00000-000" },
    { "maskName": "cnpj", "mask": "00.000.000/0000-00" },
    { "maskName": "uppercase", "mask": "", "case": "upper" },
    { "maskName": "lowercase", "mask": "", "case": "lower" },
    { "maskName": "email", "mask": "", "case": "lower" },
    { "maskName": "lettersNumbers", "mask": "AAAAAAAAAAAAAAAAAAAA", "case": "upper" },
    { "maskName": "CPF_CNPJ", "mask": "CPF_CNPJ", "case": null },
    { "maskName": "CPF", "mask": "000.000.000-00", "case": null },
    { "maskName": "time", "mask": "00:00", "case": null },
    { "maskName": "timefull", "mask": "00:00:00", "case": null },
    { "maskName": "date", "mask": "00/00/0000", "case": null },
    { "maskName": "dateTime", "mask": "00/00/0000 00:00", "case": null },
    { "maskName": "onlynumbers", "mask": "00000000000000000000", "case": null },
    { "maskName": "onlyletters", "mask": "SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS", "case": "upper" },
    { "maskName": "ip", "mask": "IP", "case": null }]

@Component({
    selector: 'nex-input-label',
    styleUrls: ['./input-label.component.scss'],
    template: `
        <div [id]="input?.name + '-box'" class="inputGroup" [ngClass]="class" [ngStyle]="{'display': ( display == true )? 'flex': 'none', 'margin-top.px': marginTop}">
            <div class="labelBox" *ngIf="text" [ngStyle]="{'min-width.px': labelMinWidth}">
                {{text}}
            </div>
            <div class="labelBox" *ngIf="icon">
                <i class='fa fa-{{icon}}' style='font-size: 15px;margin-top: -4px'></i>
            </div>
            <div class="inputbox" [ngClass]="{'disabled': input?.disabled == true}"
                                  [ngStyle]="{'min-width.px': 'calc(100% - 137px)'}">
                <input #inputMask [id]="input?.name" 
                       [placeholder]="placeholder"
                       [maxlength]="input?.maxLength" 
                       [case]="customMask?.case" 
                       [mask]="customMask?.mask" 
                       [regex]="input?.regex"
                       [(ngModel)]="input.text" 
                       (ngModelChange)="onChanged()"
                       [type]="input?.type"
                       (keyup.enter)="onKeyEnter_Press($event)"
                       (keydown)="onFocusOut($event)"
                       (focusout)="onMouseOut()"
                       autocomplete="off"
                       [ngClass]="{'disable': input?.disabled, 'error': input?.validated == false}"
                       [ngStyle]="{'text-align': input?.textAlign}"
                       [readonly]="input?.readOnly"
                       [disabled]="input?.disabled" />
            </div>
            <div *ngIf="findButton" class="icon" [ngClass]="{'disabled': input?.findButtonDisabled == true}" (click)="onFind_Click()">
                <svg class="bi bi-search" width="13px" height="13px" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" d="M10.442 10.442a1 1 0 011.415 0l3.85 3.85a1 1 0 01-1.414 1.415l-3.85-3.85a1 1 0 010-1.415z" clip-rule="evenodd" />
                    <path fill-rule="evenodd" d="M6.5 12a5.5 5.5 0 100-11 5.5 5.5 0 000 11zM13 6.5a6.5 6.5 0 11-13 0 6.5 6.5 0 0113 0z" clip-rule="evenodd" />
                </svg>
            </div>

            <div *ngIf="clearButton" class="icon" [ngClass]="{'disabled': input?.findButtonDisabled == true}" (click)="onClear_Click()">
                <img src='./assets/icons/clear.svg' />
            </div>

            <div *ngIf="findIcon" class="icon_2" [ngClass]="{'disabled': input?.findButtonDisabled == true}" (click)="onFind_Click()">
                <i *ngIf="findIcon == 'plus'" class="fa fa-plus" aria-hidden="true"></i>
                <i *ngIf="findIcon == 'refresh'" class="fa fa-refresh" aria-hidden="true"></i>
            </div>

            <div *ngIf="actionButton" class="icon" [ngClass]="{'disabled': input?.actionButtonDisabled == true}" (click)="onFind_Click()">
                ...
            </div>
            
            <div *ngIf="sufixo" class="sufixo" (click)="onSufixo_Click()">
                {{ sufixo }}
            </div>
        </div>
    `,
})
export class InputLabelComponent implements OnInit, AfterViewInit, OnDestroy {

    @ViewChild('inputMask') inputEl: ElementRef;

    @Input() input: InputLabel;

    @Input() text: string;
    @Input() sufixo: string;
    @Input() display: boolean = true;
    @Input() findButton: boolean;
    @Input() clearButton: Boolean;
    @Input() marginTop: number = 9;
    @Input() icon: string;
    @Input() placeholder: string = "";
    @Input() class: string;
    @Input() classInput: string;
    @Input() labelMinWidth: number;
    @Input() actionButton: boolean;
    @Input() findIcon: string = "";

    @Output() eventChange = new EventEmitter<any>();
    @Output() eventFocusOut = new EventEmitter();
    @Output() eventMouseOut = new EventEmitter();
    @Output() onSufixoClick = new EventEmitter<any>();
    @Output() onFindClick = new EventEmitter<any>();
    @Output() onClearClick = new EventEmitter();
    @Output() onKeyEnter = new EventEmitter();

    dateOperador = new DateOperator();

    customMask: any;
    ruleSubscription: Subscription;

    public onlyNumbers = { '0': { pattern: new RegExp('\[0-9\]') } };

    ngOnInit() {
        this.customMask = customMasks.find(msk => msk.maskName == this.input?.rules);
        if (this.input?.maxLength && !this.input?.rules?.indexOf("case") && this.customMask) {
            this.customMask.mask = this.customMask.mask + "{" + this.input?.maxLength + "}";
        }

        this.ruleSubscription = this.input?.ruleSubject()?.subscribe((rule: string) => {
            if(rule != null) {
                this.input.activeRules = rule;
                this.customMask = customMasks.find(msk => msk.maskName == rule);
            }
        });

    }

    ngAfterViewInit() {
        if(!this.input.activeRules) this.input.activeRules = this.input.rules;
        if (this.input?.rules == "time") {
            document.getElementById(this.input?.name + '-box').classList.add("time");
        }
    };
    
    onChanged() {
        if (this.input) {
            if(this.input.text.length == 0) {
                this.input.textMasked = this.input.text
            } else {
                this.input.textMasked = (this.input.textMasked == null || this.input.textMasked.length <= this.input.maxLength) ?
                this.inputEl.nativeElement.value :
                this.input.textMasked;
            }

            switch (this.input.activeRules) {
                case "date":
                    this.input.validated = false;
                    const dateFormated: DateFormated = this.dateOperador.formatDate(this.input.textMasked, null, this.input.maxLength);
                    this.input.validated = dateFormated.dateValided;
                    this.input.formated = dateFormated.dateFormated;
                    break;

                case "time":
                    this.input.validated = false;
                    const timeFormated: DateFormated = this.dateOperador.formatTime(this.input.textMasked);
                    this.input.validated = timeFormated.dateValided;
                    this.input.formated = timeFormated.timeFormated;
                    break;

                case "timefull":
                    this.input.validated = false;
                    const timeFormatedFull: DateFormated = this.dateOperador.formatTime(this.input.textMasked, true);
                    this.input.validated = timeFormatedFull.dateValided;
                    this.input.formated = timeFormatedFull.timeFormated;
                    break;

                case "telfixo":
                    this.input.maxLength = 14;
                    this.input.validated = (this.input.textMasked.length == (this.input.minLength | 0) || 
                                            this.input.textMasked.length == this.input.maxLength);
                    break;

                case "telmovel":
                    this.input.maxLength = 15;
                    this.input.validated = (this.input.textMasked.length == (this.input.minLength | 0) || 
                                            this.input.textMasked.length == this.input.maxLength);
                    break;

                case "email":
                    this.input.validated = false;

                    const arroba: number = this.input.text.indexOf("@");
                    const length: number = this.input.text.length;

                    if (this.input.text != null && this.input.text != "") {
                        if (length >= 6 && arroba >= 0 && arroba <= (length - 3)) {
                            const dominio: string = this.input.text.substr(arroba);
                            const dot: number = dominio.indexOf(".");

                            if (dot > 0 && dot < (dominio.length - 2)) this.input.validated = true;

                        } else {
                            this.input.validated = false;
                        }
                    } else {
                        this.input.validated = true;
                    }
                    break;

                case "CPF":
                    this.input.validated = false;
                    if (this.input.textMasked != null && this.input.textMasked != "") {

                        this.input.textMasked = this.input.textMasked.replace(/[^0-9\.\-]+/g, "");

                        const length: number = this.input.text.length;
                        if (length == 11) {
                            let cpf = this.input.text;
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
                                this.input.validated = false;
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
                                    this.input.validated = true;
                                }

                            }
                        }

                    } else {
                        this.input.validated = true;
                    }
                    break;

                case "ip":
                    this.input.validated = false;
                    if (this.input.textMasked != null && this.input.textMasked != "") {
                        const length: number = this.input.textMasked.length;
                        if (length >= 7) {
                            const classA_End = this.input.textMasked.indexOf('.');
                            if (classA_End > 0) {
                                const classB_End = this.input.textMasked.indexOf('.', classA_End + 1);
                                if (classB_End > 0) {
                                    const classC_End = this.input.textMasked.indexOf('.', classB_End + 1);
                                    if (classC_End > 0) {
                                        const class_A: number = parseInt(this.input.textMasked.substr(0, classA_End));
                                        const class_B: number = parseInt(this.input.textMasked.substr(classA_End + 1, (classB_End - classA_End) - 1));
                                        const class_C: number = parseInt(this.input.textMasked.substr(classB_End + 1, (classC_End - classB_End) - 1));
                                        const class_D: number = parseInt(this.input.textMasked.substr(classC_End + 1));
                                        if ((class_A <= 254 && class_B <= 254 && class_C <= 254 && class_D <= 254) &&
                                            (class_A > 0 && class_D > 0) &&
                                            (class_A + class_B + class_C + class_D > 0)) {
                                            this.input.validated = true;
                                            this.input.formated = class_A + "." + class_B + "." + class_C + "." + class_D;
                                        }
                                    }
                                }
                            }
                        }
                    } else {
                        this.input.validated = true;
                    }
                    break;

                default:
                    this.input.validated = (!this.input.minLength || (this.input.text.length >= this.input.minLength));
                    break;
            }


        }
        this.eventChange.emit(this.input);    
    }

    onFind_Click() {
        this.onFindClick.emit();
    }

    onClear_Click() {
        this.onClearClick.emit();
    }

    onKeyEnter_Press(event: KeyboardEvent) {
        event.preventDefault()
        this.onKeyEnter.emit();
    }

    onFocusOut(event: KeyboardEvent) {
        if (event.key === "Tab") {
            this.eventFocusOut.emit();
        }
    }

    onMouseOut() {
        this.eventMouseOut.emit();
    }

    onSufixo_Click() {
        this.onSufixoClick.emit();
    }

    ngOnDestroy(): void {
        this.ruleSubscription?.unsubscribe();
    }
}