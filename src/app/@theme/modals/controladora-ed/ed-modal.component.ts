import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { EdModalService } from './service/ed-modal.service';
import { InputLabel } from 'src/app/@theme/components/form/input-label/service/input-label.service';
import { OptionsGroup } from 'src/app/@theme/components/form/select-group/service/select-group.service';
import { ComboOptions, Item } from 'src/app/@theme/components/form/combobox/service/combobox.service';
import { TabsService } from 'src/app/@theme/layouts/tabs/service/tabs.service';
import { InputMultiLabel } from '../../components/form/input-multi-label/service/input-multi-label';
import { SelecaoBloqueioControladoraModalService } from '../selecao-bloqueio-controladora/service/selecao-bloqueio-controladora-modal.service';
import { SiteConfig } from 'src/app/@core/storage/config/config';
import { SelecaoElevadorControladoraModalService } from '../selecao-elevador-controladora/service/selecao-elevador-controladora-modal.service';

import { ControladoraDispositivo, 
         ControladoraDispositivoData, 
         ControladoraDispositivoFilter, 
         ControladoraDispositivoSort, 
         read_ControladoraDispositivo } from 'src/app/@core/data/dispositivo-controladora';
import { SortOperationKind } from 'src/app/@core/api/generic-graphql';
import { TextareaLabel } from '../../components/form/textarea-label/service/textarea-label.service';
import { comboTypes } from 'src/app/@core/enum';

@Component({
    selector: 'nex-ed-modal',
    templateUrl: './ed-modal.component.html',
    styleUrls: ['./ed-modal.component.scss']
  })
  export class EdModalComponent implements OnInit , AfterViewInit {

    @Input() title: string;
    @Input() edModal: EdModalService;
    
    
    id: number = 0;

    tabsEdControladoraModal_Option: TabsService = new TabsService();

    bloqueioModal_Option: ComboOptions = new ComboOptions();
  
    
    controleModal_Option: ComboOptions = new ComboOptions();
    estado_Options: ComboOptions = new ComboOptions();
    temporizacao_Text: InputLabel = new InputLabel();
    rele_Options: ComboOptions = new ComboOptions();
    buzzer_Options: OptionsGroup = new OptionsGroup();
    texto_Text: TextareaLabel = new TextareaLabel();
    
  
    eD1_Option: ComboOptions = new ComboOptions();
    eD2_Option: ComboOptions = new ComboOptions();
    eD3_Option: ComboOptions = new ComboOptions();
    eD4_Option: ComboOptions = new ComboOptions();
    

    atuarModal_Option: ComboOptions = new ComboOptions();
    inicial_Mult: InputMultiLabel = new InputMultiLabel();
    final_Mult: InputMultiLabel = new InputMultiLabel();

    filter: ControladoraDispositivoFilter;
    order_by: ControladoraDispositivoSort = { nome: SortOperationKind.ASC };

    controladoraDispositivo: ControladoraDispositivo;
   

    selecaoBloqueioControladoraModalService: SelecaoBloqueioControladoraModalService = new SelecaoBloqueioControladoraModalService();
    selecaoElevadorControladoraModalService: SelecaoElevadorControladoraModalService = new SelecaoElevadorControladoraModalService();
  

    constructor(private controladoraDispositivoService: ControladoraDispositivoData) {

      this.tabsEdControladoraModal_Option.add("tabControleModal", "Controle", true);
      this.tabsEdControladoraModal_Option.add("tabProgramcaoModal", "Programação", false, "block");
      this.tabsEdControladoraModal_Option.add("tabProcedimentoModal", "Procedimento", false, "block");
    
      this.controleModal_Option.name = "cbControleModal";
      this.controleModal_Option.add("", "default", 0, true);
      this.controleModal_Option.add("ENTRADA POR BOTOEIRA", "entradaBotoeira", 1, false);
      this.controleModal_Option.add("SAÍDA POR BOTOEIRA", "saidaBotoeira", 2, false);
      this.controleModal_Option.add("ACESSO POR BOTOEIRA", "acessoBotoeira", 3, false);
      this.controleModal_Option.add("LIBERAÇÃO DE EMERGÊNCIA", "liberacaoEmergencia", 4, false);
      this.controleModal_Option.add("VIOLAÇÃO", "violacao", 5, false);
      this.controleModal_Option.add("PORTA ABERTA", "liberacaoPorta", 6, false);
      this.controleModal_Option.add("VIOLAÇÃO OU PORTA ABERTA", "violacaoPorta", 7, false);
      this.controleModal_Option.add("PRESENÇA", "presenca", 8, false);
      this.controleModal_Option.add("FALTA DE PRESENÇA", "faltaPresenca", 9, false);
      this.controleModal_Option.add("INTEGRAÇÃO", "integracao", 10, false);
      this.controleModal_Option.add("INTERTRAVAMENTO", "intertravamento",11, false);
      this.controleModal_Option.add("CONFIRMAÇÃO DE ACESSO", "confirmacaoAcesso", 12, false);


      this.estado_Options.name = "cbEstado";
      this.estado_Options.add("NA","na", 0);
      this.estado_Options.add("NF","nf", 1);

      this.temporizacao_Text.name = "txtTemporizacao";
      this.temporizacao_Text.text = "0";
      this.temporizacao_Text.maxLength = 2;
      this.temporizacao_Text.minLength = 0;

      this.rele_Options.name = "cbRele";
      this.rele_Options.add("NÃO ACIONAR","naoAcionar", 0);
      this.rele_Options.add("ACIONAR EM MODO PROGRAMADO","acionarProgramado", 1);
      this.rele_Options.add("ACIONAR EM MODO CONTÍNUO","acionarContinuo",2);

      this.buzzer_Options.add(0, "Acionar buzzer da placa", "acionarBuzzer");


      this.bloqueioModal_Option.name = "cbBloqueioElevador";
      this.bloqueioModal_Option.add("Bloqueio","bloqueio", 1, true);
      this.bloqueioModal_Option.add("Elevador","elevador", 2, false);
      this.bloqueioModal_Option.add("Local", "local",3,false,false,null,comboTypes.input);
      this.bloqueioModal_Option.disabled = true;

      this.atuarModal_Option.name = "cbAtuarModal";
      this.atuarModal_Option.add("DENTRO DA PROGRAMAÇÃO", "dentroProgramacao", 1, true);
      this.atuarModal_Option.add("FORA DA PROGRAMAÇÃO", "foraProgramacao", 2, false);

      this.inicial_Mult.name = "inicial_Mult";
      this.inicial_Mult.label = "Inicial";
      this.inicial_Mult.rules = "time";
      this.inicial_Mult.regex = "time";
      this.inicial_Mult.minLength = 4;
      this.inicial_Mult.maxLength = 5;
      this.inicial_Mult.setTextWithMask("00:00")


      this.final_Mult.name = "final_Mult";
      this.final_Mult.label = "Final";
      this.final_Mult.rules = "time";
      this.final_Mult.regex = "time";
      this.final_Mult.minLength = 4;
      this.final_Mult.maxLength = 5
      this.final_Mult.setTextWithMask("23:59")


      this.eD1_Option.name = "cbeD1"
      this.eD1_Option.add("", "default", 1, true)
      this.eD1_Option.add("0", "0", 2, false )
      this.eD1_Option.add("1", "1", 3, false)

      this.eD2_Option.name = "cbeD2"
      this.eD2_Option.add("", "default", 1, true)
      this.eD2_Option.add("0", "0", 2, false )
      this.eD2_Option.add("1", "1", 3, false)

      this.eD3_Option.name = "cbeD3"
      this.eD3_Option.add("", "default", 1, true)
      this.eD3_Option.add("0", "0", 2, false )
      this.eD3_Option.add("1", "1", 3, false)

      this.eD4_Option.name = "cbeD4"
      this.eD4_Option.add("", "default", 1, true)
      this.eD4_Option.add("0", "0", 2, false )
      this.eD4_Option.add("1", "1", 3, false)


      this.texto_Text.name = "txtTexto";
      this.texto_Text.maxLength = 100;
      this.texto_Text.regex = "noFilter";
    
      

    }

    ngOnInit(): void {

      this.edModal?.siteSubject
      .subscribe((site: SiteConfig) => {
        this.selecaoBloqueioControladoraModalService.siteSubject.next(site);
        this.selecaoElevadorControladoraModalService.siteSubject.next(site);
      })     
    }

    ngAfterViewInit(): void {
      this.edModal?.IdSubject
      .subscribe((filter: ControladoraDispositivoFilter) => {
        this.filter = filter;
        this.updateDataLoad();
      }) 
    }




      updateDataLoad(){
        this.controladoraDispositivoService.readControladoraDispositivos(this.order_by,this.filter)
        .subscribe(({ dispositivoControladora }: read_ControladoraDispositivo) => {
          this.controladoraDispositivo = dispositivoControladora.nodes[0];
   
        })

      }

      
  



      onBloqueioSelect(itemSelect?: Item){
        this.bloqueioModal_Option.text = itemSelect.text;
      }

      onElevadorSelect(itemSelect?: Item){
        this.bloqueioModal_Option.text = itemSelect.text;
        
      }





    onBloqueio_Click(event: any) {

      switch (this.bloqueioModal_Option.itemSelected.id) {

        case 1:
          this.selecaoBloqueioControladoraModalService.show();
        break;

        case 2:
          this.selecaoElevadorControladoraModalService.show();
        break;

        case 3:
          this.bloqueioModal_Option.focus();
        break;

      }

    }


  onOK_Click() {

  }

  onClose_Click(itemSelect?: Item) {
    this.edModal.hide();       
  }
}
  