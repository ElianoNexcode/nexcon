import { Component, EventEmitter, Input, Output } from '@angular/core';
import { InputLabel } from '../../components';
import { SenhaModalService, Senha } from './service/senha-modal.service';

import { AlertServiceComponent } from 'src/app/@theme/components/form/alert-card/service/alert-card.service';

@Component({
    selector: "nex-senha-modal",
    templateUrl: "./senha-modal.component.html",
    styleUrls: ['./senha-modal.component.scss']
})
export class SenhaModalComponent {

    @Input() senhaModal: SenhaModalService;
    @Input() title: string;

    @Output() onChangePassword: EventEmitter<Senha> = new EventEmitter(null);

    senhaAntiga_Text: InputLabel = new InputLabel();
    senhaNova_Text: InputLabel = new InputLabel();
    verificacao_Text: InputLabel = new InputLabel();

    myColors = ['#DD2C00', '#FF6D00', '#FFD600', '#AEEA00', '#00C853'];

    changePassCondition: boolean = false;
    passFormatCondition: boolean = false;

    alertService: AlertServiceComponent = new AlertServiceComponent();

    constructor() {

        this.senhaAntiga_Text.name = "txtSenhaAntiga";
        this.senhaAntiga_Text.maxLength = 20;
        this.senhaAntiga_Text.minLength = 6;
        this.senhaAntiga_Text.type = "password";
        this.senhaAntiga_Text.regex = "noFilter";

        this.senhaNova_Text.name = "txtSenhaNova";
        this.senhaNova_Text.maxLength = 20;
        this.senhaNova_Text.minLength = 6;
        this.senhaNova_Text.type = "password";
        this.senhaNova_Text.regex = "noFilter"

        this.verificacao_Text.name = "txtVerificacao";
        this.verificacao_Text.maxLength = 20;
        this.verificacao_Text.minLength = 6;
        this.verificacao_Text.type = "password";
        this.verificacao_Text.regex = "noFilter";
    }

    onChangePass_Condition() {
        this.changePassCondition = this.senhaNova_Text.text == this.verificacao_Text.text;
        this.passFormatCondition = this.senhaNova_Text.text.length >= this.senhaNova_Text.minLength;
    }

    onChangePassSave_Click() {
        if (!this.changePassCondition) {
            this.alertService.show("ERRO",
                "Senha de Verificação não confere com Nova Senha!",
                null);
        } else if (!this.passFormatCondition) {
            this.alertService.show("ERRO",
                "Senha deve conter o mínimo de 6 caracteres. Verifique!",
                null);
        } else {
            const senha: Senha = {
                senhaAntiga: this.senhaAntiga_Text.text,
                senhaNova: this.senhaNova_Text.text,
                Verificacao: this.verificacao_Text.text
            };
            this.onChangePassword.emit(senha);

            this.onClose_Click();
        }
    }

    onClose_Click() {
        this.senhaAntiga_Text.clear();
        this.senhaNova_Text.clear();
        this.verificacao_Text.clear();
        this.senhaModal.hide();
    }


}