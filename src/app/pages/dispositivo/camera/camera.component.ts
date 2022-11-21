import { Component, OnInit } from '@angular/core';

import { ListViewGrid, Find, Filter, rowSelect } from 'src/app/@theme/components/grid/list-view/service/list-view.service';
import { AlertServiceComponent } from 'src/app/@theme/components/form/alert-card/service/alert-card.service';
import { ActionButtomService } from 'src/app/@theme/components/grid/action-buttom/service/action-button.service';
import { InputLabel } from 'src/app/@theme/components/form/input-label/service/input-label.service';
import { TextareaLabel } from '../../../@theme/components/form/textarea-label/service/textarea-label.service';
import { SortOperationKind } from 'src/app/@core/api/generic-graphql';
import { RadioOptions } from 'src/app/@theme/components/form/radio/service/radio.service';
import { ComboOptions, Item } from 'src/app/@theme/components/form/combobox/service/combobox.service';
import { InputMultiLabel } from 'src/app/@theme/components/form/input-multi-label/service/input-multi-label';
import { BehaviorSubject } from 'rxjs';
import { ConfigStorage, SiteConfig } from 'src/app/@core/storage/config/config';
import { create_CameraDispositivo,
         read_CameraDispositivo,
         update_CameraDispositivo,
         delete_CameraDispositivo,
         CameraDispositivoData,
         CameraDispositivo,
         CameraDispositivoSort,
         CameraDispositivoFilter} from 'src/app/@core/data/dispositivo-camera';

import { StatusColor, IntegracaoCamera, DispositivoStatus } from 'src/app/@core/enum';

import { NavigationEnd, Router, RouterEvent } from '@angular/router';
import { filter } from 'rxjs/operators';
         
@Component({ selector: 'nex-camera-dispositivo',
          templateUrl: './camera.component.html',
            styleUrls: ['./camera.component.scss'] })

export class CameraDispositivoComponent implements OnInit {
  
  id: number = 0;
  nome_Text: InputLabel = new InputLabel();
  local_Text: InputLabel = new InputLabel();
  ip_Text: InputMultiLabel = new InputMultiLabel();
  porta_Text: InputMultiLabel = new InputMultiLabel();
  login_Text: InputLabel = new InputLabel();
  senha_Text: InputLabel = new InputLabel();
  url_Text: InputLabel = new InputLabel();
  observacao_Text: TextareaLabel = new TextareaLabel();
  estado_Options: RadioOptions = new RadioOptions;
  integracao_Option: ComboOptions = new ComboOptions();
  fps_Option: ComboOptions = new ComboOptions();

  order_by: CameraDispositivoSort = { nome: SortOperationKind.ASC };

  filter: CameraDispositivoFilter;
  filterGrid: CameraDispositivoFilter;
  settings: BehaviorSubject<any>;

  listView_Camera: ListViewGrid = new ListViewGrid();

  cameraDispositivo: CameraDispositivo;
  showSpinner: boolean = false;

  alertService: AlertServiceComponent = new AlertServiceComponent();

  editable: boolean;

  constructor(public actionbuttomService: ActionButtomService,
                          private config: ConfigStorage,
        private cameraDispositivoService: CameraDispositivoData,
                          private router: Router) {
                
    this.settings = this.config.siteSubject();
    this.actionbuttomService.relationGrid = "lstCamera";

    this.actionbuttomService.recurso = "24";
    this.actionbuttomService.top_action_buttons = [{"id": 0, "text": "forms.buttons.create", "visibled": false, "enabled": true,  "condition": "always", "openForm": true,  "editable": "new",},
                                                   {"id": 1, "text": "forms.buttons.update", "visibled": false, "enabled": false, "condition": "select", "openForm": true,  "editable": "yes",},
                                                   {"id": 2, "text": "forms.buttons.read", "visibled": false, "enabled": false, "condition": "select", "openForm": true,  "editable": "no",},
                                                   {"id": 3, "text": "forms.buttons.delete", "visibled": false, "enabled": false, "condition": "multi",  "openForm": false, "question": "forms.questions.delete"},]
                                                   
 
    this.listView_Camera.name  = "lstCamera";
    this.listView_Camera.title = "Lista de Câmeras";
    this.listView_Camera.colorField = "status";
    this.listView_Camera.colorEnum = StatusColor;
    this.listView_Camera.grid  = [{"header": "Nome", "field": "nome", "width": 15, "align": "left"},
                                    {"header": "Localização", "field": "localizacao", "width": 17, "align": "left"},
                                    {"header": "IP", "field": "redeIP", "width": 12, "align": "left"},
                                    {"header": "Integração", "field": "integracao", "width": 12, "align": "left" , "enum": IntegracaoCamera},
                                    {"header": "Status",  "field": "status", "width": 12, "align": "left", "enum": DispositivoStatus},
                                    {"header": "Observação", "field": "observacao", "width": 32, "align": "left"}];

    this.nome_Text.name = "txtNome";
    this.nome_Text.rules = "uppercase";
    this.nome_Text.maxLength = 30;
    this.nome_Text.minLength = 1;

    this.local_Text.name = "txtLocal";
    this.local_Text.rules = "uppercase";
    this.local_Text.maxLength = 30;
    this.local_Text.minLength = 0;

    this.ip_Text.name = "txtRedeIp";
    this.ip_Text.rules = "ip";
    this.ip_Text.maxLength = 15;
    this.ip_Text.minLength = 7;
    this.ip_Text.minWidth = 120;

    this.porta_Text.name = "txtRedePorta";
    this.porta_Text.label = "Porta";
    this.porta_Text.rules = "onlynumbers";
    this.porta_Text.textAlign = "center";
    this.porta_Text.maxLength = 5;
    this.porta_Text.minLength = 2;

    this.login_Text.name = "txtLogin";
    this.login_Text.regex = "noFilter";
    this.login_Text.maxLength = 30;
    this.login_Text.minLength = 0;

    this.senha_Text.name = "txtSenha";
    this.senha_Text.type = "password";
    this.senha_Text.regex = "noFilter";
    this.senha_Text.maxLength = 30;
    this.senha_Text.minLength = 0;    

    this.url_Text.name = "txtURL";
    this.url_Text.rules = "uppercase";
    this.url_Text.regex = "path";
    this.url_Text.maxLength = 250;
    this.url_Text.minLength = 0;

    this.integracao_Option.name = "cbIntegracaoCamera";
    this.integracao_Option.add("", "semIntegracao", 0, true);
    this.integracao_Option.add("DIGIFORT", "digifort", 1, false);
    this.integracao_Option.add("SEVENTH", "seventh", 2, false);

    this.fps_Option.name = "cbFPSCamera";
    this.fps_Option.add("15", "15", 1, true);

    this.observacao_Text.name = "txtObservacao";
    this.observacao_Text.regex = "noFilter";
    this.observacao_Text.maxLength = 100;  

    this.estado_Options.name = "cbEstado";
    this.estado_Options.add(1, "Habilitado", "habilitado", true);
    this.estado_Options.add(0, "Desabilitado", "desabilitado");
 
    const find = null;
    const filter = {select: "Nome", field: "nome", value: ""};

    this.settings
      .subscribe((site: SiteConfig) => {
        if(site != null) {
          this.filter = {siteId: {eq: site.id}};
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

    const filter: CameraDispositivoFilter = {id: {eq: this.id}};
    this.cameraDispositivoService.readCameraDispositivos(this.order_by, filter)
      .subscribe(({ dispositivoCamera }: read_CameraDispositivo) => {
        this.cameraDispositivo = dispositivoCamera.nodes[0];
        this.nome_Text.text = this.cameraDispositivo.nome;
        this.local_Text.text = this.cameraDispositivo.localizacao;
        this.login_Text.text = this.cameraDispositivo.login;
        this.senha_Text.text = this.cameraDispositivo.senha;
        this.url_Text.text = this.cameraDispositivo.url;
        this.ip_Text.setTextWithMask(this.cameraDispositivo.redeIP);
        this.porta_Text.text = this.cameraDispositivo.redePorta.toString();
        this.integracao_Option.select(this.cameraDispositivo.integracao);
        this.observacao_Text.text = this.cameraDispositivo.observacao;
        this.estado_Options.select(this.cameraDispositivo.status? 1: 0);
        this.showSpinner = false;
      });
  }

  onListView_Change(rowSelect?: rowSelect) {
    if(rowSelect.registro) {
      this.id = rowSelect.id;
    } else {
      if(rowSelect.exclude == "yes") {          
        this.cameraDispositivoService.deleteCameraDispositivo(rowSelect.id)
        .subscribe(({ data }: delete_CameraDispositivo)  => {
          if(data.dispositivoCamera_Excluir.sucesso == true) {
            const find = {field: "id", value: rowSelect.id, type: "DEL"}
            this.update_Grid(find)
            
          } else {
            const objeto = JSON.parse(data.dispositivoCamera_Excluir.objeto);
            this.alertService.show(data.dispositivoCamera_Excluir.mensagemTipo,
                                   data.dispositivoCamera_Excluir.mensagem,
                                   objeto);
          }
        })
      }
    }
  }
    
  onSave_Click() {
    this.nome_Text.validated = (this.nome_Text.text.length >= this.nome_Text.minLength);
    this.porta_Text.validated = (this.porta_Text.text.length >= this.porta_Text.minLength);
    this.ip_Text.validated = this.ip_Text.validated && (this.ip_Text.textMasked.length >= this.ip_Text.minLength);
    this.login_Text.validated = (this.login_Text.text.length >= this.login_Text.minLength);
    this.senha_Text.validated = (this.senha_Text.text.length >= this.senha_Text.minLength);
    this.url_Text.validated = (this.url_Text.text.length >= this.url_Text.minLength);

    if( !this.nome_Text.validated ||
        !this.porta_Text.validated ||
        !this.ip_Text.validated ||
        !this.login_Text.validated ||
        !this.senha_Text.validated ||
        !this.url_Text.validated) {  
      this.alertService.show("ERRO",
        "Existem campos obrigatórios não preenchidos ou preenchidos de forma incorreta. Verifique!",
        null);
    } else {

      this.showSpinner = true;

      const cameraDispositivo: CameraDispositivo = { id: this.id,
                                                     siteId: <number>this.filter.siteId.eq,
                                                     status: (this.estado_Options.itemSelected.id == 1? true: false),
                                                     nome: this.nome_Text.text,
                                                     localizacao: this.local_Text.text,
                                                     redeIP: this.ip_Text.formated,
                                                     redePorta: parseInt(this.porta_Text.text),
                                                     login: this.login_Text.text,
                                                     senha: this.senha_Text.text,
                                                     integracao: this.integracao_Option.itemSelected.id,
                                                     fps: this.fps_Option.itemSelected.id,
                                                     url: this.url_Text.text,
                                                     observacao: this.observacao_Text.text }
      
      if(cameraDispositivo.id) {
        this.cameraDispositivoService.updateCameraDispositivo(cameraDispositivo)
          .subscribe(({ data }: update_CameraDispositivo)  => {
            const objeto: any = JSON.parse(data.dispositivoCamera_Alterar.objeto);
            if(data.dispositivoCamera_Alterar.sucesso == true) {
              const find = {field: "id", value: objeto.Id}
              this.onClose_Click();
              this.update_Grid(find);
            } else {
              this.alertService.show(data.dispositivoCamera_Alterar.mensagemTipo,
                                    data.dispositivoCamera_Alterar.mensagem,
                                    objeto);
            }
            this.showSpinner = false;
          })
      } else {
        this.cameraDispositivoService.createCameraDispositivo(cameraDispositivo)
        .subscribe(({ data }: create_CameraDispositivo) => {
          const objeto: any = JSON.parse(data.dispositivoCamera_Inserir.objeto);
          if(data.dispositivoCamera_Inserir.sucesso == true) {
            const find = {field: "id", value: objeto.Id};
            this.onClose_Click(false);
            this.update_Grid(find);
          } else {            
            this.alertService.show(data.dispositivoCamera_Inserir.mensagemTipo,
                                    data.dispositivoCamera_Inserir.mensagem,
                                    objeto);
          }
          this.showSpinner = false;
        })
      }
    }
  }

  onClose_Click(hideForm: boolean = true) {
    this.nome_Text.clear();
    this.local_Text.clear();
    this.ip_Text.clear();
    this.porta_Text.clear();
    this.login_Text.clear();
    this.senha_Text.clear();
    this.url_Text.clear();
    this.observacao_Text.clear();
    this.integracao_Option.select(0);
    this.estado_Options.select(1);
    if(hideForm == true) {
      this.actionbuttomService.hideForm()
    } else {
      this.nome_Text.focus();
    }
  }

  // Método utilizado para filtrar o Grid
  onFilter_Change(filterSelect: Item) {

    switch (filterSelect.text) {
      case "Nome":
        this.filterGrid = {nome: {contains: filterSelect.value}};
        break;

      case "Localização":
        this.filterGrid = {localizacao: {contains: filterSelect.value}};
        break;

      case "IP":
        this.filterGrid = {redeIP: {contains: filterSelect.value}};
        break;

      case "Integração":
        if (IntegracaoCamera[filterSelect.value] != null) {
          this.filterGrid = {integracao:  {eq: IntegracaoCamera[filterSelect.value]} };
        } else {
          this.filterGrid = undefined;
        }
        break;

      case "Estado":
        if (DispositivoStatus[filterSelect.value] != null) {
          this.filterGrid = { status: { eq: (DispositivoStatus[filterSelect.value] == 1) } };
        } else {
          this.filterGrid = undefined;
        }
        break;

      case "Observação":
        this.filterGrid = {observacao: {contains: filterSelect.value}};
        break;
    }
    this.update_Grid();
  }

  update_Grid(find?: Find, filter?: Filter) {
    const filterGrid: CameraDispositivoFilter = {...this.filter, ...this.filterGrid};
    this.listView_Camera.processingShow();
    this.cameraDispositivoService.readCameraDispositivos(this.order_by, filterGrid)
      .subscribe(({ dispositivoCamera }: read_CameraDispositivo) => {
        this.actionbuttomService.enableButtons(0);
        this.listView_Camera.gridUpdate(dispositivoCamera.nodes, find, filter);
      });
  }

}