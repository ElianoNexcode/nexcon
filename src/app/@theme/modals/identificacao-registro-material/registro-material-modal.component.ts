import { Component, EventEmitter, Input, Output } from "@angular/core";
import { Rules } from "src/app/@core/enum";
import { SiteConfig } from "src/app/@core/storage/config/config";
import { InputLabel, TextareaLabel } from "../../components";
import { RegistroMaterialModalService } from "./service/registro-material-modal.service";

import { AlertServiceComponent } from '../../components/form/alert-card/service/alert-card.service';
@Component({
    selector: 'nex-registro-material-modal',
    templateUrl: './registro-material-modal.component.html',
    styleUrls: ['./registro-material-modal.component.scss']
  })
  export class RegistroMaterialModalComponent  {

    @Input() title: string;
    @Input() registroMaterialModal: RegistroMaterialModalService;
    @Output() eventSelect: EventEmitter<any> = new EventEmitter(null);


    id: number = 0;
    site: SiteConfig

    material_Text: InputLabel = new InputLabel();
    quantidade_Text: InputLabel = new InputLabel();
    notaFiscal_Text: InputLabel = new InputLabel();
    observacao_Text: TextareaLabel = new TextareaLabel();

    alertService: AlertServiceComponent = new AlertServiceComponent();

    constructor( ) {
  
      this.material_Text.name = "txtMaterial";
      this.material_Text.rules = Rules.upperCase;
      this.material_Text.maxLength = 30;
      this.material_Text.minLength = 1;

      this.quantidade_Text.name = "txtQuantidade";
      this.quantidade_Text.rules = Rules.onlyNumbers;
      this.quantidade_Text.maxLength = 6;
      this.quantidade_Text.minLength = 1;

      this.notaFiscal_Text.name = "txtNotaFiscal";
      this.notaFiscal_Text.rules = Rules.lettersNumbers;
      this.notaFiscal_Text.maxLength = 15;
      this.notaFiscal_Text.minLength = 0;

      this.observacao_Text.name = "txtObservacao"
      this.observacao_Text.regex = "noFilter";
      this.observacao_Text.maxLength = 100;      

    }

    onOK_Click() {
      this.material_Text.validated = this.material_Text.condition();
      this.quantidade_Text.validated = this.quantidade_Text.condition();
      if(this.material_Text.validated && this.quantidade_Text.validated) {
        this.eventSelect.emit({material: this.material_Text.text,
          quantidade: this.quantidade_Text.text,
          notaFiscal: this.notaFiscal_Text.text,
          observacao: this.observacao_Text.text})
        this.onClose_Click();  
      } else {
        this.alertService.show("ERRO",
          "Existem campos obrigatórios não preenchidos ou preenchidos de forma incorreta. Verifique!",
          null);
      }
    }

    onClose_Click() {
      this.registroMaterialModal.hide();
    }

}