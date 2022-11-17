import { Injectable } from '@angular/core';

@Injectable({
    providedIn: "root",
})
export class AlertServiceComponent {

    msgType: string = "inf";
    msgTitle?: string;
    alert: {title: string | null, message: string | null} = {title: null, message: null};
    name!: string;
    width?: number;
    position?: string;

    clickOut = () => this.clickout(event);

    show(type: string, message: string, reasons: Array<any>){
        if(this.position) {
            const button: HTMLElement = document.getElementById(this.position) as HTMLElement;
            const top: number = button.offsetTop;
            const left: number = button.offsetLeft;

            const alertCard: HTMLElement = document.getElementById(this.name) as HTMLLIElement;
            alertCard.style.left = (left - 95) + 'px';
            alertCard.style.bottom = (top - alertCard.clientHeight) + 'px';
        }

        switch (type) {
            case 'INFORMATIVA': 
                this.msgType = "inf";
                this.msgTitle = "INFORMAÇÃO";
                break;
            case 'ADVERTENCIA':
                this.msgType = "adv";
                this.msgTitle = "ADVERTÊNCIA";
                break;
            case 'ERRO':
                this.msgType = "err";
                this.msgTitle = "ATENÇÃO!";
                break;
            default:  
                this.msgType = "inf";
                this.msgTitle = "INFORMAÇÃO";
                break;
        }
        let msgBody: string = message;
        reasons?.forEach((reason: any) => {
            msgBody += " " + reason.Message;
        })

        this.alert.title = this.msgTitle;
        this.alert.message = msgBody;

        setTimeout(() => {
            this.clickOut();
        }, 7000);

        document.addEventListener('click', this.clickOut, true);

    }

    clickout(event?: any) {
        this.alert.message = null;
        document.removeEventListener('click', this.clickOut, true); 
    }

}