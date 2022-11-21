
import { ListViewGrid, Find, Filter, rowSelect } from 'src/app/@theme/components/grid/list-view/service/list-view.service';
import { ConcentradorDispositivoData, ConcentradorDispositivoFilter } from 'src/app/@core/data/dispositivo-concentrador';
import { ActionButtomService } from 'src/app/@theme/components/grid/action-buttom/service/action-button.service';
import { TextareaLabel } from '../../../@theme/components/form/textarea-label/service/textarea-label.service';
import { InputMultiLabel } from 'src/app/@theme/components/form/input-multi-label/service/input-multi-label';
import { AlertServiceComponent } from 'src/app/@theme/components/form/alert-card/service/alert-card.service';
import { LeitorModalService } from 'src/app/@theme/modals/controladora-leitor/service/leitor-modal.service';
import { OptionsGroup } from 'src/app/@theme/components/form/select-group/service/select-group.service';
import { ComboOptions, Item } from 'src/app/@theme/components/form/combobox/service/combobox.service';
import { InputLabel } from 'src/app/@theme/components/form/input-label/service/input-label.service';
import { EdModalService } from 'src/app/@theme/modals/controladora-ed/service/ed-modal.service';
import { TreeviewService } from 'src/app/@theme/layouts/treeview/service/treeview.service';
import { RadioOptions } from 'src/app/@theme/components/form/radio/service/radio.service';
import { ConfigStorage, SiteConfig } from 'src/app/@core/storage/config/config';
import { TabsService } from 'src/app/@theme/layouts/tabs/service/tabs.service';
import { TreeView } from 'src/app/@theme/layouts/treeview/service/treeview';
import { SortOperationKind } from 'src/app/@core/api/generic-graphql';
import { NavigationEnd, Router, RouterEvent } from '@angular/router';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { filter } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
import { create_ControladoraDispositivo, 
         read_ControladoraDispositivo, 
         update_ControladoraDispositivo, 
         delete_ControladoraDispositivo,
         ControladoraDispositivoData, 
         ControladoraDispositivo,           
         ControladoraDispositivoSort, 
         ControladoraDispositivoFilter, 
         ControladoraDispositivoLeitor} from 'src/app/@core/data/dispositivo-controladora';
import { SelecaoBloqueioControladoraModalService } from 'src/app/@theme/modals/selecao-bloqueio-controladora/service/selecao-bloqueio-controladora-modal.service';

import { DispositivoStatus, StatusColor, TipoBloqueio } from 'src/app/@core/enum';

@Component({ selector: 'nex-controladora-dispositivo',
             templateUrl: './controladora.component.html',
             styleUrls: ['./controladora.component.scss'] })

export class ControladoraDispositivoComponent implements OnInit, OnDestroy {
  
  id: number = 0;
  configLeitor: string;
  leitores: any[] = [];
  tipoLeitores: {id?: number, leitor: string, tipo: number, propriedades?: ControladoraDispositivoLeitor }[];
  ip_Text: InputLabel = new InputLabel();
  nome_Text: InputLabel = new InputLabel();
  rele_Text: InputLabel = new InputLabel();
  senha_Mult: InputMultiLabel = new InputMultiLabel();
  local_Text: InputLabel = new InputLabel();                     
  login_Mult: InputMultiLabel = new InputMultiLabel(); 
  tipo_Option: ComboOptions = new ComboOptions();
  alertService: AlertServiceComponent = new AlertServiceComponent();   
  mascara_Text: InputLabel = new InputLabel();
  gateway_Text: InputLabel = new InputLabel();
  estado_Options: RadioOptions = new RadioOptions;  
  edModalService: EdModalService = new EdModalService();
  displayMsg_Text: InputLabel = new InputLabel();
  observacao_Text: TextareaLabel = new TextareaLabel();
  validacao_Option: ComboOptions = new ComboOptions();
  biocheck_Options: OptionsGroup = new OptionsGroup();
  orientacao_Option: ComboOptions = new ComboOptions();
  autenticar_Option: ComboOptions = new ComboOptions();
  leitorModalService: LeitorModalService = new LeitorModalService(); 
  selecaoBloqueioControladoraModalService: SelecaoBloqueioControladoraModalService = new SelecaoBloqueioControladoraModalService();
  bloqueioTipo_Option: ComboOptions = new ComboOptions();            
  displayIdioma_Option: ComboOptions = new ComboOptions(); 
  listView_Controladora: ListViewGrid = new ListViewGrid(); 
  tabsControladora_Option: TabsService = new TabsService();
                       
  filter: ControladoraDispositivoFilter;
  order_by: ControladoraDispositivoSort = { nome: SortOperationKind.ASC };
  settings: BehaviorSubject<any>;
  filterGrid: ControladoraDispositivoFilter;   
  showSpinner: boolean = false;
  treeviewItem: BehaviorSubject<any>;
  savedCondition: boolean = false ;
  controladoraDispositivo: ControladoraDispositivo;

  editable: boolean;

  constructor( public actionbuttomService: ActionButtomService,
               private config: ConfigStorage,
               private controladoraDispositivoService: ControladoraDispositivoData,
               private concetradorDispositivoService: ConcentradorDispositivoData,
               private treeviewService: TreeviewService,
               private router: Router ) {
                            
    this.tabsControladora_Option.add("tabConexao", "Conexão", true);
    this.tabsControladora_Option.add("tabControle", "Controle", false, "block");
    this.tabsControladora_Option.add("tabLeitor", "Leitor", false, "block");
    this.tabsControladora_Option.add("tabEd", "ED", false, "block");
    this.tabsControladora_Option.add("tabObservacao", "Observação", false, "block");


    this.settings = this.config.siteSubject();
    this.treeviewItem = this.treeviewService.itemSubject();
    
    this.actionbuttomService.relationGrid = "lstControladora";

    this.actionbuttomService.recurso = "23";
    this.actionbuttomService.top_action_buttons = [{"id": 0, "text": "forms.buttons.create", "visibled": false, "enabled": true,  "condition": "always", "openForm": true,  "editable": "new",},
                                                   {"id": 1, "text": "forms.buttons.update", "visibled": false, "enabled": false, "condition": "select", "openForm": true,  "editable": "yes",},
                                                   {"id": 2, "text": "forms.buttons.read", "visibled": false, "enabled": false, "condition": "select", "openForm": true,  "editable": "no",},
                                                   {"id": 3, "text": "forms.buttons.delete", "visibled": false, "enabled": false, "condition": "multi",  "openForm": false, "question": "forms.questions.delete"}]
                                                   
    this.listView_Controladora.name  = "lstControladora";
    this.listView_Controladora.colorField = "status";
    this.listView_Controladora.colorEnum = StatusColor;
    this.listView_Controladora.title = "Lista de Controladoras";
    this.listView_Controladora.grid  = [{"header": "Nome", "field": "nome", "width":  20, "align": "left"},
                                        {"header": "Tipo", "field": "tipo", "width":  15, "align": "left" , "enum": TipoBloqueio},
                                        {"header": "Localização", "field": "localizacao", "width":  15, "align": "left"},
                                        {"header": "IP", "field": "redeIP", "width":  15, "align": "left"},
                                        {"header": "Status", "field": "status", "width": 15, "align": "left", "enum": DispositivoStatus},
                                        {"header": "Observação", "field": "observacao", "width":  20, "align": "left"}];

    // inicio da parte de conexão
    this.nome_Text.name      = "txtNome";
    this.nome_Text.rules     = "uppercase";
    this.nome_Text.maxLength = 30;
    this.nome_Text.minLength = 1;

    this.tipo_Option.name = "cbTipo";
    this.tipo_Option.add("CONNEX", "1", 1, true);
    this.tipo_Option.add("CONNEX EXP 1", "2", 2, false);
    this.tipo_Option.add("CONNEX EXP 2", "3", 3, false);
    this.tipo_Option.add("CONNEX EXP 3", "4", 4, false);
    this.tipo_Option.add("CONNEX EXP 4", "5", 5, false);
    this.tipo_Option.add("CONNEX EXP 5", "6", 6, false);
    this.tipo_Option.add("CONNEX EXP 6", "7", 7, false);
    this.tipo_Option.add("CONNEX EXP 7", "8", 14, false);
    this.tipo_Option.add("CONNEX EXP 8", "8", 8, false);
    this.tipo_Option.add("IPLOCK P200", "9", 9, false);
    this.tipo_Option.add("IPLOCK P300", "2", 10, false);
    this.onBloqueioTipo_Selected();

    this.local_Text.name      = "txtLocal";
    this.local_Text.rules     = "uppercase";
    this.local_Text.maxLength = 30;
    this.local_Text.minLength = 1;

    this.ip_Text.name      = "txtRedeIP";
    this.ip_Text.rules     = "ip";
    this.ip_Text.maxLength = 15;
    this.ip_Text.minLength = 12;

    this.mascara_Text.name      = "txtMascara";
    this.mascara_Text.rules     = "mask";
    this.mascara_Text.maxLength = 15;
    this.mascara_Text.minLength = 12;

    this.gateway_Text.name      = "txtGateway";
    this.gateway_Text.rules     = "ip";
    this.gateway_Text.maxLength = 15;
    this.gateway_Text.minLength = 12;
  
    this.login_Mult.name = "txtLogin";
    this.login_Mult.rules = "";
    this.login_Mult.maxLength = 10;
    this.login_Mult.minLength = 1;

    this.senha_Mult.name = "txtSenha";
    this.senha_Mult.label = "Senha";
    this.senha_Mult.rules = "onlynumbers";
    this.senha_Mult.type = "password"
    this.senha_Mult.maxLength = 6;
    this.senha_Mult.minLength = 1;

    this.estado_Options.name = "cbEstado";
    this.estado_Options.add(1, "Habilitado", "habilitado", true);
    this.estado_Options.add(0, "Desabilitado", "desabilitado");
    // fim da parte de conexão

    // parte de controle
    
    this.orientacao_Option.name = "cbControleControladora";
    this.orientacao_Option.add("ENTRADA", "entrada", 1, false);
    this.orientacao_Option.add("SAÍDA", "saida", 2, false);
    this.orientacao_Option.add("ENTRADA E SAÍDA", "entradaSaida", 3, true);

    this.validacao_Option.name = "cbValidacaoControladora";
    this.validacao_Option.add("PLACA", "placa", 1, false);
    this.validacao_Option.add("CONCENTRADOR", "concentrador", 2, false);
    this.validacao_Option.add("PLACA/CONCENTRADOR", "placaConcentrador", 3, false);
    this.validacao_Option.add("CONCENTRADOR/PLACA", "concentradorPlaca", 4, true);

    this.biocheck_Options.add(1, "Validar Biometria no Servidor", "validarBiometriaServidor");
    
    this.autenticar_Option.name = "cbAutenticarControladora";
    this.autenticar_Option.add("", "default", 1, true);
    this.autenticar_Option.add("CONCENTRADOR", "concentrador", 2, false);
    this.autenticar_Option.add("SENHA", "senha", 3, false);
    this.autenticar_Option.add("CONCENTRADOR E SENHA", "concentradorSenha", 4, false);
   
    this.displayIdioma_Option.name = "cbDisplayIdiomaControladora";
    this.displayIdioma_Option.add("PORTUGUÊS", "portugues", 1, true);
    this.displayIdioma_Option.add("ESPANHOL", "espanhol", 2, false);
    this.displayIdioma_Option.add("INGLÊS", "ingles", 3, false);
  
    this.displayMsg_Text.name      = "txtDisplay";
    this.displayMsg_Text.rules     = "uppercase";
    this.displayMsg_Text.maxLength = 16;
    this.displayMsg_Text.minLength = 1;

    this.rele_Text.name      = "txtRele";
    this.rele_Text.rules     = "onlynumbers";
    this.rele_Text.maxLength = 5;
    this.rele_Text.minLength = 1;
    // fim da parte de controle

    this.leitores.push({id: 1, leitor:"TTL 1", tipo: 511 },
                       {id: 2, leitor:"TTL 2", tipo: 511},
                       {id: 3, leitor:"TTL 3 (EXP)", tipo: 30},
                       {id: 4, leitor:"TTL 4 (EXP)", tipo: 8},
                       {id: 5, leitor:"Serial 1", tipo: 511},
                       {id: 6, leitor:"Serial 2", tipo: 511},
                       {id: 7, leitor:"Serial 3 (EXP)", tipo: 30},
                       {id: 8, leitor:"Serial 4 (EXP)", tipo: 14},
                       {id: 9, leitor:"Teclado", tipo: 505},
                       {id: 10,leitor:"Leitor EXP01(Cofre)"});
                       
    this.onBloqueioTipo_Selected();

    // parte de observacao
    this.observacao_Text.name = "txtObservacao";
    this.observacao_Text.maxLength = 100;
    this.observacao_Text.regex = "noFilter";
    // fim da parte de observacao

    const find = null;
    const filter = {select: "Nome", field: "nome", value: ""};

    this.settings
      .subscribe((site: SiteConfig) => {
        if(site != null) {
          this.leitorModalService.defineSite(site);
          this.edModalService.defineSite(site);
          const filterSite: ConcentradorDispositivoFilter = {siteId: {eq: site.id}};
          this.treeviewPopulate(filterSite);
        }
      });


    this.treeviewItem
     .subscribe((concentradorId: string) => {
          if(concentradorId != null) {
            this.filter = { concentradorId: {eq: parseInt(concentradorId)} };
            this.update_Grid();
            this.actionbuttomService.top_action_buttons.forEach(topButton => {
              topButton.visibled = true;
            });
          }
      });
  }

  ngOnInit() {
    this.router.events
    .pipe(filter((event) => event instanceof NavigationEnd))
    .subscribe(() => {
      this.update_Grid();
    });
  }

  onActionButtom_Click(actionButtomSelect: any) {
    this.savedCondition = false;
    switch(actionButtomSelect.text) {
      case "forms.buttons.create":
        this.id = undefined;
        this.nome_Text.focus();
        this.editable = true;
        break;
      
      case "forms.buttons.update":
        this.updateDataLoad();
        this.nome_Text.focus(true);
        this.editable = true;
        break;
      
      case "forms.buttons.read":
        this.updateDataLoad();
        this.editable = false;
        break;
    }
  }
  
  updateDataLoad() {
    this.showSpinner = true;

    const filter: ControladoraDispositivoFilter = {id: {eq: this.id}};
    this.leitorModalService.obtemIdControladora(filter);
    this.controladoraDispositivoService.readControladoraDispositivos(this.order_by, filter)
    .subscribe(({ dispositivoControladora }: read_ControladoraDispositivo) => {
      this.controladoraDispositivo = dispositivoControladora.nodes[0];
      // Inicio Conexão //
      this.nome_Text.text = this.controladoraDispositivo.nome;
      this.tipo_Option.select(this.controladoraDispositivo.tipo); 
      this.local_Text.text = this.controladoraDispositivo.localizacao;
      this.ip_Text.text = this.controladoraDispositivo.redeIP;
      this.mascara_Text.text = this.controladoraDispositivo.redeMascara;
      this.gateway_Text.text = this.controladoraDispositivo.redeGateway;
      this.login_Mult.text = this.controladoraDispositivo.login;
      this.senha_Mult.text = this.controladoraDispositivo.senha;
      this.estado_Options.select(this.controladoraDispositivo.status? 1: 0);
      // Fim //
      
      //  Inicio Controle //
      this.bloqueioTipo_Option.select(this.controladoraDispositivo.bloqueioTipo);
      this.orientacao_Option.select(this.controladoraDispositivo.bloqueioOrientacao);
      this.validacao_Option.select(this.controladoraDispositivo.validacao);
      this.biocheck_Options.check(1,(this.controladoraDispositivo.biometria == 1));
      this.autenticar_Option.select(this.controladoraDispositivo.autenticacao);
      this.displayIdioma_Option.select(this.controladoraDispositivo.displayIdioma);
      this.displayMsg_Text.text = this.controladoraDispositivo.displayMsg;
      this.rele_Text.text = this.controladoraDispositivo.rele.toString();
      // Fim //

      this.onBloqueioTipo_Selected();
      this.onSaved_Condition();
      this.showSpinner = false;
    });
  }

  onListView_Change(rowSelect?: rowSelect) {
    if(rowSelect.registro) {
      this.id = rowSelect.id;
    } else {
      if(rowSelect.exclude == "yes") {          
        this.controladoraDispositivoService.deleteControladoraDispositivo(rowSelect.id)
        .subscribe(({ data }: delete_ControladoraDispositivo)  => {
          if(data.dispositivoControladora_Excluir.sucesso == true) {
            const find = {field: "id", value: rowSelect.id, type: "DEL"}
            this.update_Grid(find)
            
          } else {
            const objeto = JSON.parse(data.dispositivoControladora_Excluir.objeto);
            this.alertService.show(data.dispositivoControladora_Excluir.mensagemTipo,
                                   data.dispositivoControladora_Excluir.mensagem,
                                   objeto);
          }
        });
      }
    }
  }

  onBloqueioTipo_Selected(){

    this.bloqueioTipo_Option.name = "cbBloqueioControladora";

    this.leitorModalService.obtemIdTipoControladora(this.tipo_Option.itemSelected.id);
    
    switch (this.tipo_Option.itemSelected.value){
      case "1":
        this.bloqueioTipo_Option.clear();
        this.bloqueioTipo_Option.add("PORTA", "porta", 1, false);
        this.bloqueioTipo_Option.add("PORTÃO DE PEDESTRE", "portaoPedestre", 2, false);
        this.bloqueioTipo_Option.add("PORTÃO DE VEÍCULO", "portaoVeiculo", 3, false);
        this.bloqueioTipo_Option.add("CANCELA", "cancela", 4, false);
        break;

      case  "2":
        this.bloqueioTipo_Option.clear();
        this.bloqueioTipo_Option.add("CATRACA PEDESTAL WOLPAC", "catracaPedestalWolpac", 5, false);
        this.bloqueioTipo_Option.add("CATRACA BALCÃO WOLPAC", "catracaBalcaoWolpac", 6, false);
        this.bloqueioTipo_Option.add("CATRACA PNE WOLPAC", "catracaPneWolpac", 7, false); 
        this.bloqueioTipo_Option.add("TORNIQUETE WOLPAC", "torniqueteWolpac", 8, false);
        this.bloqueioTipo_Option.add("CATRACA PEDESTAL DIGICON", "catracaPedestalDigicon", 9, false);
        this.bloqueioTipo_Option.add("CATRACA BALCÃO DIGICON", "catracaBalcaoDigicon", 10, false);
        this.bloqueioTipo_Option.add("CATRACA PNE DIGICON", "catracaPneDigicon", 11, false);
        this.bloqueioTipo_Option.add("TORNIQUETE DIGICON", "torniqueteDigicon", 12, false);
        this.bloqueioTipo_Option.add("CATRACA MILLENIUM", "catracaMillenium", 13, false);
        break;

      case "3":
        this.bloqueioTipo_Option.clear();
        this.bloqueioTipo_Option.add("BARREIRA DE VIDRO WOLPAC", "barreiraVidroWolpac", 14, false);
        this.bloqueioTipo_Option.add("BARREIRA DE VIDRO DIGICON", "barreiraVidroDigicon", 15, false);
        break;

      case "4":
        this.bloqueioTipo_Option.clear();
        this.bloqueioTipo_Option.add("PORTA", "porta", 1, false);
        this.bloqueioTipo_Option.add("PORTÃO DE PEDESTRE", "portaoPedestre", 2, false);
        this.bloqueioTipo_Option.add("PORTÃO DE VEÍCULO", "portaoVeiculo", 3, false);
        this.bloqueioTipo_Option.add("CANCELA", "cancela", 4, false);
        break;

      case "5":
        this.bloqueioTipo_Option.clear();
        this.bloqueioTipo_Option.add("PORTA", "porta", 1, false);
        this.bloqueioTipo_Option.add("PORTÃO DE PEDESTRE", "portaoPedestre", 2, false);
        this.bloqueioTipo_Option.add("PORTÃO DE VEÍCULO", "portaoVeiculo", 3, false);
        this.bloqueioTipo_Option.add("CANCELA", "cancela", 4, false);
        break;
  
      case "6":
        this.bloqueioTipo_Option.clear();
        this.bloqueioTipo_Option.add("PORTA", "porta", 1, false);
        this.bloqueioTipo_Option.add("PORTÃO DE PEDESTRE", "portaoPedestre", 2, false);
        this.bloqueioTipo_Option.add("PORTÃO DE VEÍCULO", "portaoVeiculo", 3, false);
        this.bloqueioTipo_Option.add("CANCELA", "cancela", 4, false);
        break;

      case "7":
        this.bloqueioTipo_Option.clear();
        this.bloqueioTipo_Option.add("ELEVADOR", "elevador", 16, false);
        break;

      case "8":
        this.bloqueioTipo_Option.clear();
        this.bloqueioTipo_Option.add("INDETERMINADO", "indeterminado", 17, false)
        this.bloqueioTipo_Option.add("PORTA", "porta", 1, false);
        this.bloqueioTipo_Option.add("PORTÃO DE PEDESTRE", "portaoPedestre", 2, false);
        this.bloqueioTipo_Option.add("PORTÃO DE VEÍCULO", "portaoVeiculo", 3, false);
        this.bloqueioTipo_Option.add("CANCELA", "cancela", 4, false);
        break;

      case "9":
        this.bloqueioTipo_Option.clear();
        this.bloqueioTipo_Option.add("PORTA", "porta", 1, false);
        this.bloqueioTipo_Option.add("PORTÃO DE PEDESTRE", "portaoPedestre", 2, false);
        this.bloqueioTipo_Option.add("PORTÃO DE VEÍCULO", "portaoVeiculo", 3, false);
        this.bloqueioTipo_Option.add("CANCELA", "cancela", 4, false);
        break;
  
    }

    this.tipoLeitores = this.leitores.filter(prt => (2**(parseInt(this.tipo_Option.itemSelected.value)-1)) & prt.tipo)
  
  }

  onSaved_Condition() {
    this.savedCondition = this.nome_Text.text.length >= this.nome_Text.minLength &&
                          this.ip_Text.text.length >= this.ip_Text.minLength &&
                          this.mascara_Text.text.length >= this.mascara_Text.minLength &&
                          this.gateway_Text.text.length >= this.gateway_Text.minLength;
                         
    if(!this.ip_Text.validated) {
      this.savedCondition = false;
    } else{
      this.savedCondition = this.savedCondition && true;
    }
  }
    
  onSave_Click() {
                                            

  }

  onStatus_Change(optionSelect: any) {
    this.onSaved_Condition();
  }

  onLeitor_Click(id:number) {
    switch (id){
      case 1:
        this.configLeitor = "Configuração do Leitor - TTL 1"
        this.leitorModalService.show();
        break;

      case 2:
        this.configLeitor = "Configuração do Leitor - TTL 2"
        this.leitorModalService.show();
        break; 

      case 3:
        this.configLeitor = "Configuração do Leitor - TTL 3(EXP)"
        this.leitorModalService.show();
        break;
        
      case 4:
        this.configLeitor = "Configuração do Leitor - TTL 4(EXP)"
        this.leitorModalService.show();
        break;
          
      case 5:
        this.configLeitor = "Configuração do Leitor - Serial 1"
        this.leitorModalService.show();
        break;

      case 6:
        this.configLeitor = "Configuração do Leitor - Serial 2"
        this.leitorModalService.show();
        break;

      case 7:
        this.configLeitor = "Configuração do Leitor - Serial 3(EXP)"
        this.leitorModalService.show();
        break;

      case 8:
        this.configLeitor = "Configuração do Leitor - Serial 4(EXP)"
        this.leitorModalService.show();
        break;

      case 9:
        this.configLeitor = "Configuração do Leitor - Teclado"
        this.leitorModalService.show();
        break;

    }

  }

  onSelecao_Click(type: any) {
    
    this.selecaoBloqueioControladoraModalService.show();
  }


  onEd_Click(type: any) {
    this.edModalService.show();
  }

  treeviewPopulate(filter:ConcentradorDispositivoFilter){
    this.treeviewService.getTreeview()
      .subscribe((treeview: TreeView[]) => {
        treeview[0].item = this.concetradorDispositivoService.getConcentradorDispositivoTreeView(filter);
        this.treeviewService.setTreeview(treeview);
      });
  }

  // Método utilizado para filtrar o Grid
  onFilter_Change(filterSelect: Item) {

    switch (filterSelect.text) {
      case "Nome":
        this.filterGrid = {nome: {contains: filterSelect.value}};
        break;

      case "Tipo":
        // this.filterGrid = {tipo: TipoBloqueio[filterSelect.value]}
        break;

      case "Localização":
        this.filterGrid = {localizacao: {contains: filterSelect.value}};
        break;

      case "IP":
        this.filterGrid = {redeIp: {contains: filterSelect.value}};
        break;

      case "Estado":
        if (DispositivoStatus[filterSelect.value] != null){
          this.filterGrid = {status: DispositivoStatus[filterSelect.value]}
        }else{
          this.filter = {status: {eq: 0}};
        }
        break;

      case "Observação":
        this.filterGrid = {observacao: {contains: filterSelect.value}};
        break;

    }

    this.update_Grid();

  }

  update_Grid(find?: Find, filter?: Filter) {
    const filterGrid: ControladoraDispositivoFilter = {...this.filter, ...this.filterGrid};
    this.listView_Controladora.processingShow();
    this.controladoraDispositivoService.readControladoraDispositivos(this.order_by, filterGrid)
      .subscribe(({ dispositivoControladora }: read_ControladoraDispositivo) => {
        this.actionbuttomService.enableButtons(0);
        this.listView_Controladora?.gridUpdate(dispositivoControladora?.nodes, find, filter);
      });
  }

  onClose_Click(hideForm: boolean = true) {
    // parte de conexao
    this.nome_Text.clear();
    this.tipo_Option.select(1);
    this.local_Text.clear();
    this.ip_Text.clear();
    this.mascara_Text.clear();
    this.gateway_Text.clear();
    this.login_Mult.clear();
    this.senha_Mult.clear();
    this.estado_Options.select(1);
    // fim da parte de conexao

    // parte de controle
    this.bloqueioTipo_Option.select(1);
    this.orientacao_Option.select(1);
    this.validacao_Option.select(1);
    this.biocheck_Options.reset();
    this.autenticar_Option.select(1);
    this.displayIdioma_Option.select(1);
    this.displayMsg_Text.clear();
    this.rele_Text.clear();
    // fim da parte de controle

    // inicio da parte de observacao
    this.observacao_Text.clear();
    // fim da parte de observacao

    if(hideForm == true) {
      this.actionbuttomService.hideForm();
      this.tabsControladora_Option.select("tabIdentificacao");
    } else {
      this.nome_Text.focus();
      this.onSaved_Condition();
    }

  }

  ngOnDestroy(): void {
    this.settings?.unsubscribe();
    this.treeviewItem?.unsubscribe();
  }


}