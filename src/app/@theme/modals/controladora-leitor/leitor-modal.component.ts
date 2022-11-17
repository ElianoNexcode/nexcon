import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { LeitorModalService } from './service/leitor-modal.service';
import { InputLabel } from 'src/app/@theme/components/form/input-label/service/input-label.service';
import { OptionsGroup } from 'src/app/@theme/components/form/select-group/service/select-group.service';
import { ComboOptions, Item } from 'src/app/@theme/components/form/combobox/service/combobox.service';
import { TabsService } from 'src/app/@theme/layouts/tabs/service/tabs.service';
import { InputMultiLabel } from '../../components/form/input-multi-label/service/input-multi-label';
import { SelecaoBloqueioControladoraModalService } from '../selecao-bloqueio-controladora/service/selecao-bloqueio-controladora-modal.service';
import { Site } from 'src/app/@core/data/reparticao-site';
import { SiteConfig } from 'src/app/@core/storage/config/config';
import { SelecaoElevadorControladoraModalService } from '../selecao-elevador-controladora/service/selecao-elevador-controladora-modal.service';
import { SelecaoTerminalControladoraModalService } from '../selecao-terminal-controladora/service/selecao-terminal-controladora-modal.service';
import { ControladoraDispositivo, 
         ControladoraDispositivoData, 
         ControladoraDispositivoFilter, 
         ControladoraDispositivoSort, 
         read_ControladoraDispositivo } from 'src/app/@core/data/dispositivo-controladora';
import { SortOperationKind } from 'src/app/@core/api/generic-graphql';

@Component({
    selector: 'nex-leitor-modal',
    templateUrl: './leitor-modal.component.html',
    styleUrls: ['./leitor-modal.component.scss']
  })
  export class LeitorModalComponent implements OnInit , AfterViewInit {

    @Input() title: string;
    @Input() leitorModal: LeitorModalService;
    

    

    id: number = 0;
    IdControladoraTipo: number = 0;

    tabsControladoraModal_Option: TabsService = new TabsService();
    
    controleModal_Option: ComboOptions = new ComboOptions();
    validacaoModal_Option: ComboOptions = new ComboOptions();
    releituraModal_Text: InputLabel = new InputLabel();
    bloqueioModal_Option: ComboOptions = new ComboOptions();
    terminalModal_Text: InputLabel = new InputLabel();

    protocoloModal_Option: ComboOptions = new ComboOptions();
    botaoCrModal_Option: ComboOptions = new ComboOptions();
    gerarEventoModal_Option: ComboOptions = new ComboOptions();
    buzzerModal_Option: ComboOptions = new ComboOptions();
    cofreModal_Options: OptionsGroup = new OptionsGroup();
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
    selecaoTerminalControladoraModalService: SelecaoTerminalControladoraModalService = new SelecaoTerminalControladoraModalService();

    constructor(private controladoraDispositivoService: ControladoraDispositivoData) {

      this.tabsControladoraModal_Option.add("tabControleModal", "Controle", true);
      this.tabsControladoraModal_Option.add("tabProtocoloModal", "Protocolo", false, "block");
      this.tabsControladoraModal_Option.add("tabProgramacaoModal", "Programação", false, "block");
    
      this.controleModal_Option.name = "cbControleModal";
      this.controleModal_Option.add("", "default", 0, true);
      this.controleModal_Option.add("ENTRADA", "entrada", 1, false);
      this.controleModal_Option.add("SAÍDA", "saida", 2, false);
      this.controleModal_Option.add("ACESSO", "acesso", 3, false);

     

      
      this.releituraModal_Text.name      = "releitura";
      this.releituraModal_Text.rules     = "onlynumbers";
      this.releituraModal_Text.maxLength = 2;
      this.releituraModal_Text.minLength = 1;


      this.bloqueioModal_Option.name = "cbbloqueioModal";
      this.bloqueioModal_Option.add("Bloqueio","bloqueio", 1, true);
      this.bloqueioModal_Option.add("Elevador","elevador", 2, false);
      this.bloqueioModal_Option.disabled = true;
    
      
     

      this.terminalModal_Text.disabled = true;



      this.protocoloModal_Option.add("BIOMÉTRICO CONTROL ID (26)", "biometricoControlId26", 12, false);
      this.protocoloModal_Option.add("BIOMÉTRICO CONTROL ID (32/34)", "biometricoControlId3234", 13, false);
      this.protocoloModal_Option.add("BIOMÉTRICO NITGEN FIM 5060/6060 ", "biometricoNitgen", 14, false);
      this.protocoloModal_Option.add("CÓDIGO DE BARRAS", "codigoDeBarras", 15, false);
      this.protocoloModal_Option.add("CONTROLE REMOTO NEXCODE", "coontroleNexcode", 16, false);
      this.protocoloModal_Option.add("LPR PUMATRONIX", "pulmatronix", 16, false);
      this.protocoloModal_Option.add("MIFARE ACURA AM10/AM11", "acuraMifare", 17, false);
      this.protocoloModal_Option.add("QR CODE ACUSCAN-02", "qRCodeAcuscan", 18, false);
      this.protocoloModal_Option.add("QR CODE NEXCODE (32 e 34)", "qRCodeNexcode3234", 19, false);
      this.protocoloModal_Option.add("QR CODE NEXCODE (34 e 26)", "qRCodeNexcode3426", 20, false);

      this.protocoloModal_Option.add("IDENTIFICADOR OCULTO", "iDOculto", 21, false);
      this.protocoloModal_Option.add("IDENTIFICADOR VISÍVEL", "iDVisivel", 22, false);
      this.protocoloModal_Option.add("IDENTIFICADOR OCULTO", "iDOculto", 23, false);
      this.protocoloModal_Option.add("SENHA OCULTA", "senhaOculta", 24, false);
      this.protocoloModal_Option.add("SENHA VISIVEL", "senhaVisivel", 25, false);







      this.botaoCrModal_Option.name = "cbBotaoCrModal";
      this.botaoCrModal_Option.add("1", "1", 1, true);
      this.botaoCrModal_Option.add("2", "2", 2, false);
      this.botaoCrModal_Option.add("3", "3", 3, false);
      this.botaoCrModal_Option.add("4", "4", 4, false);

      this.gerarEventoModal_Option.name = "cbGerarEventoModal";
      this.gerarEventoModal_Option.add("SEM CONFIRMAÇÃO", "default", 1, true);
      this.gerarEventoModal_Option.add("CONFIRMAÇÃO DA ED 1", "confirmacaoEd1", 2, false);
      this.gerarEventoModal_Option.add("CONFIRMAÇÃO DA ED 2", "confirmacaoEd2", 3, false);
      this.gerarEventoModal_Option.add("CONFIRMAÇÃO DA ED 3", "confirmacaoEd3", 4, false);
      this.gerarEventoModal_Option.add("CONFIRMAÇÃO DA ED 4", "confirmacaoEd4", 5, false);

      this.buzzerModal_Option.name = "cbBuzzerModal";
      this.buzzerModal_Option.add("", "default", 1, true);
      this.buzzerModal_Option.add("ACIONAR NO LEITOR", "acionarLeitor", 2, false);
      this.buzzerModal_Option.add("ACIONAR NA CONTROLADORA", "acionarControladora", 3, false);


      this.cofreModal_Options.add(0, "Adicionar cofre coletor de cartão", "adicionarCofreColetorDeCartao")
     
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

    }

    ngOnInit(): void {

      this.onValidacao_Selected();

      this.leitorModal?.siteSubject
      .subscribe((site: SiteConfig) => {
        this.selecaoBloqueioControladoraModalService.siteSubject.next(site);
        this.selecaoElevadorControladoraModalService.siteSubject.next(site);
        this.selecaoTerminalControladoraModalService.siteSubject.next(site);
      })     
    }

    ngAfterViewInit(): void {

      this.leitorModal?.IdSubject
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

      
      onValidacao_Selected(){
        this.validacaoModal_Option.name = "cbvalidacaoModal";

        this.leitorModal?.IdTipoControladoraSubject
        .subscribe((id: number) =>{
          this.IdControladoraTipo = id;
        })
 
        switch (this.IdControladoraTipo){

          case 1:
            this.validacaoModal_Option.clear();
            this.validacaoModal_Option.add("", "default", 1, true);
            this.validacaoModal_Option.add("VALIDAR SENHA", "validarSenha", 2, false);
            this.validacaoModal_Option.add("VALIDAR BIOMETRIA NA SERIAL 1", "validarBiometriaSerial1", 3, false);
            this.validacaoModal_Option.add("VALIDAR BIOMETRIA NA SERIAL 2", "validarBiometriaSerial2", 4, false);
            this.validacaoModal_Option.add("CONFIRMAÇÃO NO LEITOR TTL 1", "confirmacaoLeitorTTL1", 5, false);
            this.validacaoModal_Option.add("CONFIRMAÇÃO NO LEITOR TTL 2", "confirmacaoLeitorTTL2", 6, false);
            this.validacaoModal_Option.add("CONFIRMAÇÃO NO LEITOR SERIAL 1", "confirmacaoLeitorSerialTTL1", 7, false);
            this.validacaoModal_Option.add("CONFIRMAÇÃO NO LEITOR SERIAL 2", "confirmacaoLeitorSerialTTL2", 8, false);
            this.validacaoModal_Option.add("CONFIRMAÇÃO EM OUTRO LEITOR", "confirmacaoEmOutroLeitor", 9, false);
            break;

          case 2:
            this.validacaoModal_Option.clear();
            this.validacaoModal_Option.add("", "default", 1, true);
            this.validacaoModal_Option.add("VALIDAR SENHA", "validarSenha", 2, false);
            this.validacaoModal_Option.add("VALIDAR BIOMETRIA NA SERIAL 1", "validarBiometriaSerial1", 3, false);
            this.validacaoModal_Option.add("VALIDAR BIOMETRIA NA SERIAL 2", "validarBiometriaSerial2", 4, false);
            this.validacaoModal_Option.add("VALIDAR BIOMETRIA NA SERIAL 3 (EXP)", "validarBiometriaSerial3", 5, false);
            this.validacaoModal_Option.add("VALIDAR BIOMETRIA NA SERIAL 4 (EXP)", "validarBiometriaSerial4", 6, false);
            this.validacaoModal_Option.add("CONFIRMAÇÃO NO LEITOR TTL 1", "confirmacaoLeitorTTL1", 7, false);
            this.validacaoModal_Option.add("CONFIRMAÇÃO NO LEITOR TTL 2", "confirmacaoLeitorTTL2", 8, false);
            this.validacaoModal_Option.add("CONFIRMAÇÃO NO LEITOR TTL 3 (EXP)", "confirmacaoLeitorTTL3", 9, false);
            this.validacaoModal_Option.add("CONFIRMAÇÃO NO LEITOR SERIAL 1", "confirmacaoLeitorSerialTTL1", 10, false);
            this.validacaoModal_Option.add("CONFIRMAÇÃO NO LEITOR SERIAL 2", "confirmacaoLeitorSerialTTL2", 11, false);
            this.validacaoModal_Option.add("CONFIRMAÇÃO NO LEITOR SERIAL 3 (EXP)", "confirmacaoLeitorSerialTTL3", 12, false);
            this.validacaoModal_Option.add("CONFIRMAÇÃO NO LEITOR SERIAL 4 (EXP)", "confirmacaoLeitorSerialTTL4", 13, false);
            this.validacaoModal_Option.add("CONFIRMAÇÃO EM OUTRO LEITOR", "confirmacaoEmOutroLeitor", 14, false);
            break;

          case 3:
            this.validacaoModal_Option.clear();
            this.validacaoModal_Option.add("", "default", 1, true);
            this.validacaoModal_Option.add("VALIDAR SENHA", "validarSenha", 2, false);
            this.validacaoModal_Option.add("VALIDAR BIOMETRIA NA SERIAL 1", "validarBiometriaSerial1", 3, false);
            this.validacaoModal_Option.add("VALIDAR BIOMETRIA NA SERIAL 2", "validarBiometriaSerial2", 4, false);
            this.validacaoModal_Option.add("VALIDAR BIOMETRIA NA SERIAL 3 (EXP)", "validarBiometriaSerial3", 5, false);
            this.validacaoModal_Option.add("VALIDAR BIOMETRIA NA SERIAL 4 (EXP)", "validarBiometriaSerial4", 6, false);
            this.validacaoModal_Option.add("CONFIRMAÇÃO NO LEITOR TTL 1", "confirmacaoLeitorTTL1", 7, false);
            this.validacaoModal_Option.add("CONFIRMAÇÃO NO LEITOR TTL 2", "confirmacaoLeitorTTL2", 8, false);
            this.validacaoModal_Option.add("CONFIRMAÇÃO NO LEITOR TTL 3 (EXP)", "confirmacaoLeitorTTL3", 9, false);
            this.validacaoModal_Option.add("CONFIRMAÇÃO NO LEITOR SERIAL 1", "confirmacaoLeitorSerialTTL1", 10, false);
            this.validacaoModal_Option.add("CONFIRMAÇÃO NO LEITOR SERIAL 2", "confirmacaoLeitorSerialTTL2", 11, false);
            this.validacaoModal_Option.add("CONFIRMAÇÃO NO LEITOR SERIAL 3 (EXP)", "confirmacaoLeitorSerialTTL3", 12, false);
            this.validacaoModal_Option.add("CONFIRMAÇÃO NO LEITOR SERIAL 4 (EXP)", "confirmacaoLeitorSerialTTL4", 13, false);
            this.validacaoModal_Option.add("CONFIRMAÇÃO EM OUTRO LEITOR", "confirmacaoEmOutroLeitor", 14, false);
            break;


          case 4:
            this.validacaoModal_Option.clear();
            this.validacaoModal_Option.add("", "default", 1, true);
            this.validacaoModal_Option.add("VALIDAR SENHA", "validarSenha", 2, false);
            this.validacaoModal_Option.add("VALIDAR BIOMETRIA NA SERIAL 1", "validarBiometriaSerial1", 3, false);
            this.validacaoModal_Option.add("VALIDAR BIOMETRIA NA SERIAL 2", "validarBiometriaSerial2", 4, false);
            this.validacaoModal_Option.add("VALIDAR BIOMETRIA NA SERIAL 3 (EXP)", "validarBiometriaSerial3", 5, false);
            this.validacaoModal_Option.add("VALIDAR BIOMETRIA NA SERIAL 4 (EXP)", "validarBiometriaSerial4", 6, false);
            this.validacaoModal_Option.add("CONFIRMAÇÃO NO LEITOR TTL 1", "confirmacaoLeitorTTL1", 7, false);
            this.validacaoModal_Option.add("CONFIRMAÇÃO NO LEITOR TTL 2", "confirmacaoLeitorTTL2", 8, false);
            this.validacaoModal_Option.add("CONFIRMAÇÃO NO LEITOR TTL 3 (EXP)", "confirmacaoLeitorTTL3", 9, false);
            this.validacaoModal_Option.add("CONFIRMAÇÃO NO LEITOR TTL 4 (EXP)", "confirmacaoLeitorTTL4", 10, false);
            this.validacaoModal_Option.add("CONFIRMAÇÃO NO LEITOR SERIAL 1", "confirmacaoLeitorSerialTTL1", 11, false);
            this.validacaoModal_Option.add("CONFIRMAÇÃO NO LEITOR SERIAL 2", "confirmacaoLeitorSerialTTL2", 12, false);
            this.validacaoModal_Option.add("CONFIRMAÇÃO NO LEITOR SERIAL 3 (EXP)", "confirmacaoLeitorSerialTTL3", 13, false);
            this.validacaoModal_Option.add("CONFIRMAÇÃO NO LEITOR SERIAL 4 (EXP)", "confirmacaoLeitorSerialTTL4", 14, false);
            this.validacaoModal_Option.add("CONFIRMAÇÃO EM OUTRO LEITOR", "confirmacaoEmOutroLeitor", 15, false);
            break;


          case 5:
            this.validacaoModal_Option.clear();
            this.validacaoModal_Option.add("", "default", 1, true);
            this.validacaoModal_Option.add("VALIDAR SENHA", "validarSenha", 2, false);
            this.validacaoModal_Option.add("VALIDAR BIOMETRIA NA SERIAL 1", "validarBiometriaSerial1", 3, false);
            this.validacaoModal_Option.add("VALIDAR BIOMETRIA NA SERIAL 2", "validarBiometriaSerial2", 4, false);
            this.validacaoModal_Option.add("CONFIRMAÇÃO NO LEITOR TTL 1", "confirmacaoLeitorTTL1", 5, false);
            this.validacaoModal_Option.add("CONFIRMAÇÃO NO LEITOR TTL 2", "confirmacaoLeitorTTL2", 6, false);
            this.validacaoModal_Option.add("CONFIRMAÇÃO NO LEITOR SERIAL 1", "confirmacaoLeitorSerialTTL1", 7, false);
            this.validacaoModal_Option.add("CONFIRMAÇÃO NO LEITOR SERIAL 2", "confirmacaoLeitorSerialTTL2", 8, false);
            this.validacaoModal_Option.add("CONFIRMAÇÃO EM OUTRO LEITOR", "confirmacaoEmOutroLeitor", 9, false);
            break;

          case 6:
            this.validacaoModal_Option.clear();
            this.validacaoModal_Option.add("", "default", 1, true);
            this.validacaoModal_Option.add("VALIDAR SENHA", "validarSenha", 2, false);
            this.validacaoModal_Option.add("VALIDAR BIOMETRIA NA SERIAL 1", "validarBiometriaSerial1", 3, false);
            this.validacaoModal_Option.add("VALIDAR BIOMETRIA NA SERIAL 2", "validarBiometriaSerial2", 4, false);
            this.validacaoModal_Option.add("CONFIRMAÇÃO NO LEITOR TTL 1", "confirmacaoLeitorTTL1", 5, false);
            this.validacaoModal_Option.add("CONFIRMAÇÃO NO LEITOR TTL 2", "confirmacaoLeitorTTL2", 6, false);
            this.validacaoModal_Option.add("CONFIRMAÇÃO NO LEITOR SERIAL 1", "confirmacaoLeitorSerialTTL1", 7, false);
            this.validacaoModal_Option.add("CONFIRMAÇÃO NO LEITOR SERIAL 2", "confirmacaoLeitorSerialTTL2", 8, false);
            this.validacaoModal_Option.add("CONFIRMAÇÃO EM OUTRO LEITOR", "confirmacaoEmOutroLeitor", 9, false);
            break;


          case 7:
            this.validacaoModal_Option.clear();
            this.validacaoModal_Option.add("", "default", 1, true);
            this.validacaoModal_Option.add("VALIDAR SENHA", "validarSenha", 2, false);
            this.validacaoModal_Option.add("VALIDAR BIOMETRIA NA SERIAL 1", "validarBiometriaSerial1", 3, false);
            this.validacaoModal_Option.add("VALIDAR BIOMETRIA NA SERIAL 2", "validarBiometriaSerial2", 4, false);
            this.validacaoModal_Option.add("CONFIRMAÇÃO NO LEITOR TTL 1", "confirmacaoLeitorTTL1", 5, false);
            this.validacaoModal_Option.add("CONFIRMAÇÃO NO LEITOR TTL 2", "confirmacaoLeitorTTL2", 6, false);
            this.validacaoModal_Option.add("CONFIRMAÇÃO NO LEITOR SERIAL 1", "confirmacaoLeitorSerialTTL1", 7, false);
            this.validacaoModal_Option.add("CONFIRMAÇÃO NO LEITOR SERIAL 2", "confirmacaoLeitorSerialTTL2", 8, false);
            this.validacaoModal_Option.add("CONFIRMAÇÃO EM OUTRO LEITOR", "confirmacaoEmOutroLeitor", 9, false);
            break;

          case 8:
            this.validacaoModal_Option.clear();
            this.validacaoModal_Option.add("", "default", 1, true);
            this.validacaoModal_Option.add("VALIDAR SENHA", "validarSenha", 2, false);
            this.validacaoModal_Option.add("VALIDAR BIOMETRIA NA SERIAL 1", "validarBiometriaSerial1", 3, false);
            this.validacaoModal_Option.add("VALIDAR BIOMETRIA NA SERIAL 2", "validarBiometriaSerial2", 4, false);
            this.validacaoModal_Option.add("CONFIRMAÇÃO NO LEITOR TTL 1", "confirmacaoLeitorTTL1", 5, false);
            this.validacaoModal_Option.add("CONFIRMAÇÃO NO LEITOR TTL 2", "confirmacaoLeitorTTL2", 6, false);
            this.validacaoModal_Option.add("CONFIRMAÇÃO NO LEITOR SERIAL 1", "confirmacaoLeitorSerialTTL1", 7, false);
            this.validacaoModal_Option.add("CONFIRMAÇÃO NO LEITOR SERIAL 2", "confirmacaoLeitorSerialTTL2", 8, false);
            this.validacaoModal_Option.add("CONFIRMAÇÃO EM OUTRO LEITOR", "confirmacaoEmOutroLeitor", 9, false);
            break;

        }
      }


      onProtocolo_Selected(){
        this.protocoloModal_Option.name = "cbProtocoloModal";
        this.protocoloModal_Option.clear();
        this.protocoloModal_Option.add("", "default", 1, true);
        this.protocoloModal_Option.add("ABA TRACK 2", "aba", 2, false);
        this.protocoloModal_Option.add("WIEGAND 26", "wiegand26", 3, false);
        this.protocoloModal_Option.add("WIEGAND 32", "wiegand32", 4, false);
        this.protocoloModal_Option.add("WIEGAND 34", "wiegand34", 5, false);
        this.protocoloModal_Option.add("WIEGAND 34 KP-ID", "wiegand34KpId", 6, false);
        this.protocoloModal_Option.add("WIEGAND 34 KP-PW", "wiegand34KpPw", 7, false);
        this.protocoloModal_Option.add("WIEGAND 34-26", "wiegand3426", 8, false);
        this.protocoloModal_Option.add("WIEGAND 34-26 KP-ID", "wiegand3426KpId", 9, false);
        this.protocoloModal_Option.add("WIEGAND 34-26 KP-PW", "wiegand3426KpPw", 10, false);
        this.protocoloModal_Option.add("WIEGAND 35", "wiegand35", 11, false);
 
      }



      onBloqueioSelect(itemSelect?: Item){
        this.bloqueioModal_Option.text = itemSelect.text;
      }

      onElevadorSelect(itemSelect?: Item){
        this.bloqueioModal_Option.text = itemSelect.text;
        
      }

      onTerminalSelect(itemSelect?: Item){
        this.terminalModal_Text.text = itemSelect.text;
      }



    onBloqueio_Click(event: any) {
      if(this.bloqueioModal_Option.itemSelected.id == 1){
          this.selecaoBloqueioControladoraModalService.show();
      } else{
          this.selecaoElevadorControladoraModalService.show();
      } 
    }

    onTerminal_Click(event: any){
      this.selecaoTerminalControladoraModalService.show();
    }


  onOK_Click() {
    

  }

  onClose_Click(itemSelect?: Item) {
    this.leitorModal.hide();
    this.validacaoModal_Option.clearSelect();
    
        
  }
}
  