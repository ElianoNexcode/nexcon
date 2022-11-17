import { Injectable, EventEmitter } from '@angular/core';
import { NivelOperacaoData } from 'src/app/@core/data/operador-nivel-operacao';
import { ListViewGrid } from '../../list-view/service/list-view.service';

interface TopActionButtom {
    id: number
    text: string
    enabled?: boolean
    visibled?: boolean
    condition: string
    openForm: boolean
    maximized?: boolean
    editable?: string
    question?: string,}

export enum KeyPress {
    "Delete" = "forms.buttons.delete",
    "Enter"  = "forms.buttons.update",
    "forms.buttons.delete" = "Delete",
    "forms.buttons.update" = "Enter"
}

@Injectable({
    providedIn: 'root'
})
export class ActionButtomService {

    editable: string = "no";
    indice: number;
    
    panelActive: boolean = false;
    
    recurso: string;
    top_action_buttons: TopActionButtom[];
    innerQuestion: boolean;
    relationGrid: string;

    flipped = false;

    eventEmitter = new EventEmitter<any>();

    constructor(private listviewGrid: ListViewGrid,
        private nivelOperacaoService: NivelOperacaoData) { }


    setEditable(param: string) {
        this.editable = param;
    }

    getEditable(): string {
        return this.editable;
    }

    enableButtons(countCheck: number) {
        this.top_action_buttons
            .forEach(buttom => {  
                buttom.enabled = (this.nivelOperacaoService.checkAcessRights(this.recurso, buttom.id) &&
                                 (buttom.condition == "always" || 
                                 ((buttom.condition == "multi" || 
                                   buttom.condition == "select") && (countCheck > 0)) ||
                                   buttom.condition == "variable" && buttom.enabled == true));
            })
    }

    disableButtons() {
        this.top_action_buttons
            .forEach(buttom => {
                (buttom.condition == "always" && 
                 this.nivelOperacaoService.checkAcessRights(this.recurso, buttom.id))? 
                    buttom.enabled = true: buttom.enabled = false 
            })    
    }

    showHideButton(value: number) {
        let index: number = 0;
        this.top_action_buttons.forEach(buttom => {
            buttom.visibled = ((2 ** index & value) == 2 ** index);
            index++;
        });
    }

    selectActived(elementId?: string, indice?: number) {

        this.selectClear();
        if(elementId) {
            document.getElementById(elementId).classList.add("actived")
            this.indice = indice;
        }
        this.lockScreen()
        
    }

    selectClear() {
        let gridRow = Array.from(document.getElementsByClassName("actionButtom"));
        gridRow.forEach(row => {
          row.classList.remove("actived");
        })
    }
   
    showForm(maximized?: boolean) {

        if(maximized && maximized == true) {
            this.flipIt();
        } else {
            if(document.getElementById("gridFilter")) document.getElementById("gridFilter").style.display = "none";
            document.getElementById("grid").classList.add("gridMaxWidth");
            document.getElementById("form").classList.add("formMaxWidth");
            document.getElementById("form").style.visibility = "visible";
        }

        if(document.getElementsByClassName("inputFocus") && this.editable == "new") {
            this.listviewGrid.clearSelect(this.relationGrid);
            this.enableButtons(0);
            (<HTMLInputElement>document.getElementsByClassName("inputFocus")[0])?.focus();
        }        
    }
    
    hideForm(maximized?: boolean) {
        
        if(maximized && maximized == true) {
            this.flipIt();
        } else {
            if(document.getElementById("gridFilter")) document.getElementById("gridFilter").style.display = "block";
            document.getElementById("form").style.visibility = "hidden";
            document.getElementById("form").classList.remove("formMaxWidth");
            document.getElementById("grid").classList.remove("gridMaxWidth");
        }
        this.unlockScreen();
    }

    
    lockScreen() {

        let documentButtons: HTMLElement = document.getElementById("buttons");
        let documentGrid: HTMLElement = document.getElementById("grid");
        let documentForm: HTMLElement = document.getElementById("form");
        let documentMenu: HTMLElement = document.getElementById("treeview");
        let documentTreeView: HTMLElement = document.getElementById("menu");
        let documentInfo: HTMLElement = document.getElementById("inf_1599");

        documentButtons.classList.add("disabled");            
        documentGrid.classList.add("disabled");
        documentMenu.classList.add("disabled");
        documentTreeView.classList.add("disabled");
        documentInfo.classList.add("disabled");

        if(this.top_action_buttons[this.indice].openForm) {
            if(!this.top_action_buttons[this.indice].editable || this.top_action_buttons[this.indice].editable == "no") {
                this.formDisable();
            }
            documentForm.getElementsByClassName("card-footer")[0]?.classList.add("enabled");
            documentGrid.getElementsByClassName("card-footer")[0]?.classList.remove("enabled");
        } else {
            documentGrid.getElementsByClassName("card-footer")[0]?.classList.add("enabled");
        }        
    }

    unlockScreen() {
        let documentButtons: HTMLElement = document.getElementById("buttons");
        let documentGrid: HTMLElement = document.getElementById("grid");
        let documentMenu: HTMLElement = document.getElementById("treeview");
        let documentTreeView: HTMLElement = document.getElementById("menu");
        let documentInfo: HTMLElement = document.getElementById("inf_1599");

        documentButtons.classList.remove("disabled");
        documentGrid.classList.remove("disabled");
        documentMenu.classList.remove("disabled");
        documentTreeView.classList.remove("disabled");
        documentInfo.classList.remove("disabled");

        this.formEnable();

        this.selectClear();
    }

    flipIt() {
        this.flipped = !this.flipped;
    }
    
    getIndice(text: string): number {
        const indice: number = this.top_action_buttons.findIndex(btn => btn.text == text)
        if(indice >= 0) {
            return indice;
        }
        return undefined;
    }

    formDisable(opacity?: boolean, progress?: boolean) {
        let documentForm: HTMLElement = document.getElementById("form");

        documentForm.classList.add("disabled");
        if(opacity) {
            documentForm.style.opacity = "0.75";
        }

        if(progress) {
            documentForm.style.cursor = "progress";
        }
    }

    formEnable() {
        let documentForm: HTMLElement = document.getElementById("form");

        documentForm.classList.remove("disabled");
        documentForm.style.opacity = "1";
        documentForm.style.cursor = "default";
    }

    onExecute_Action(action: string) {
        const elButton: HTMLElement = document.getElementById(action);
        if(elButton) {
            const indice = this.getIndice(KeyPress[KeyPress[action]]);
            if(indice) {

                this.selectActived(elButton.id, indice)
                this.setEditable(this.top_action_buttons[indice].editable);

                if(this.top_action_buttons[indice].openForm == true) {
                    this.showForm(this.top_action_buttons[indice].maximized == true);
                }
                
                if(this.top_action_buttons[indice].question) {
                    let cardElement: HTMLElement = (document.getElementsByClassName("card-footer")[0] as HTMLElement);
                    cardElement.getElementsByTagName("nex-paging")[0].classList.add("hidePaging");
                    this.innerQuestion = true;
                }
        
                let actionSelect = this.top_action_buttons[indice];

                this.eventEmitter.emit(actionSelect);
            }
        }
    }
}