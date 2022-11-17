import { AfterViewInit, Component, EventEmitter, Input, Output } from "@angular/core";
import { SortOperationKind } from "src/app/@core/api/generic-graphql";
import { read_TerminalDispositivo, TerminalDispositivo, TerminalDispositivoData, TerminalDispositivoSort } from "src/app/@core/data/dispositivo-terminal";
import { SiteConfig } from "src/app/@core/storage/config/config";
import { InputLabel } from "../../components";
import { ComboOptions, Item } from "../../components/form/combobox/service/combobox.service";
import { SelecaoTerminalControladoraModalService } from "./service/selecao-terminal-controladora-modal.service";


@Component({
    selector: 'nex-selecao-terminal-controladora-modal',
    templateUrl: './selecao-terminal-controladora-modal.component.html',
    styleUrls: ['./selecao-terminal-controladora-modal.component.scss']
  })
  export class SelecaoTerminalControladoraModalComponent  implements AfterViewInit{

    @Input() title: string;
    @Input() selecaoTerminalModal: SelecaoTerminalControladoraModalService;
    @Output() eventSelect: EventEmitter<any> = new EventEmitter(null);


    id: number = 0;
    site: SiteConfig

    site_Text: InputLabel = new InputLabel();
    terminal_Options: ComboOptions = new ComboOptions();

    

    constructor(private dispositivoTerminalService: TerminalDispositivoData){

     

      this.site_Text.name = "txtSite";
      this.site_Text.disable();
      
      
    
      this.terminal_Options.name = "cbTerminal"

      const sortTerminal: TerminalDispositivoSort = { nome: SortOperationKind.ASC};
      this.dispositivoTerminalService.readTerminalDispositivos(sortTerminal,null)
        .subscribe(({ dispositivoTerminal }: read_TerminalDispositivo) => {
            this.terminal_Options.add("","",0)
            const nodes: TerminalDispositivo[] = dispositivoTerminal.nodes;
            nodes.forEach((node: TerminalDispositivo) => {
                this.terminal_Options.add(node.nome,node.nome,node.id);
            })
        })



    }


    ngAfterViewInit(): void {
      this.selecaoTerminalModal?.siteSubject
      .subscribe((site: SiteConfig) => {
        this.site = site;
    
      })
      this.siteNome();

    }


    siteNome(){
        this.site_Text.text = this.site.nome;

    }


    onElevadorSelect(itemSelect?: Item){
        this.eventSelect.emit(itemSelect);
    }



    onOK_Click() {
        this.onElevadorSelect(this.terminal_Options.itemSelected);
        this.onClose_Click();
    }


    onClose_Click() {
      this.selecaoTerminalModal.hide();
      
    }

}