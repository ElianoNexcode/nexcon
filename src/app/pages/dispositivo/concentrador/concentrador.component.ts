import { Component, OnInit } from '@angular/core';

import { ListViewGrid, Find, Filter, rowSelect } from 'src/app/@theme/components/grid/list-view/service/list-view.service';
import { AlertServiceComponent } from 'src/app/@theme/components/form/alert-card/service/alert-card.service';
import { ActionButtomService } from 'src/app/@theme/components/grid/action-buttom/service/action-button.service';
import { InputLabel } from 'src/app/@theme/components/form/input-label/service/input-label.service';
import { TextareaLabel } from '../../../@theme/components/form/textarea-label/service/textarea-label.service';
import { SortOperationKind } from 'src/app/@core/api/generic-graphql';
import { RadioOptions } from 'src/app/@theme/components/form/radio/service/radio.service';
import { Item } from 'src/app/@theme/components/form/combobox/service/combobox.service';
import { InputMultiLabel } from 'src/app/@theme/components/form/input-multi-label/service/input-multi-label';
import { BehaviorSubject } from 'rxjs';
import { ConfigStorage, SiteConfig } from 'src/app/@core/storage/config/config';
import {
  create_ConcentradorDispositivo,
  read_ConcentradorDispositivo,
  update_ConcentradorDispositivo,
  delete_ConcentradorDispositivo,
  ConcentradorDispositivoData,
  ConcentradorDispositivo,
  ConcentradorDispositivoSort,
  ConcentradorDispositivoFilter
} from 'src/app/@core/data/dispositivo-concentrador';

import { DispositivoStatus, StatusColor } from 'src/app/@core/enum';

import { NavigationEnd, Router, RouterEvent } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'nex-concentrador-dispositivo',
  templateUrl: './concentrador.component.html',
  styleUrls: ['./concentrador.component.scss']
})

export class ConcentradorDispositivoComponent implements OnInit {

  id: number = 0;

  nome_Text: InputLabel = new InputLabel();
  local_Text: InputLabel = new InputLabel();
  ip_Text: InputLabel = new InputLabel();
  porta_TCP_Control_Text: InputLabel = new InputLabel();
  porta_TCP_Device_Text: InputLabel = new InputLabel();
  observacao_Text: TextareaLabel = new TextareaLabel();
  estado_Options: RadioOptions = new RadioOptions;

  order_by: ConcentradorDispositivoSort = { nome: SortOperationKind.ASC };

  filter: ConcentradorDispositivoFilter;
  filterGrid: ConcentradorDispositivoFilter;

  settings: BehaviorSubject<any>;

  listView_Concentrador: ListViewGrid = new ListViewGrid();

  showSpinner: boolean = false;

  concentradorDispositivo: ConcentradorDispositivo;

  alertService: AlertServiceComponent = new AlertServiceComponent();

  editable: boolean;

  constructor(public actionbuttomService: ActionButtomService,
    private config: ConfigStorage,
    private concentradorDispositivoService: ConcentradorDispositivoData,
    private router: Router) {

    this.settings = this.config.siteSubject();
    this.actionbuttomService.relationGrid = "lstConcentrador";

    this.actionbuttomService.recurso = "22";
    this.actionbuttomService.top_action_buttons = [
      { "id": 0, "text": "forms.buttons.create", "visibled": false, "enabled": true, "condition": "always", "openForm": true, "editable": "new", },
      { "id": 1, "text": "forms.buttons.update", "visibled": false, "enabled": false, "condition": "select", "openForm": true, "editable": "yes", },
      { "id": 2, "text": "forms.buttons.read", "visibled": false, "enabled": false, "condition": "select", "openForm": true, "editable": "no", },
      { "id": 3, "text": "forms.buttons.delete", "visibled": false, "enabled": false, "condition": "multi", "openForm": false, "question": "forms.questions.delete" }
    ]

    this.listView_Concentrador.name = "lstConcentrador";
    this.listView_Concentrador.colorField = "status";
    this.listView_Concentrador.colorEnum = StatusColor;
    this.listView_Concentrador.title = "Lista de Concentradores";
    this.listView_Concentrador.grid = [
      { "header": "Nome", "field": "nome", "width": 15, "align": "left" },
      { "header": "Localização", "field": "localizacao", "width": 15, "align": "left" },
      { "header": "Versão", "field": "versao", "width": 10},
      { "header": "IP", "field": "redeIP", "width": 15, "align": "left" }, 
      { "header": "Status", "field": "status", "width": 10, "align": "left", "enum": DispositivoStatus },
      { "header": "Observação", "field": "observacao", "width": 35, "align": "left" }
    ];

    this.nome_Text.name = "txtNome";
    this.nome_Text.rules = "uppercase";
    this.nome_Text.maxLength = 20;
    this.nome_Text.minLength = 1;

    this.local_Text.name = "txtLocal";
    this.local_Text.rules = "uppercase";
    this.local_Text.maxLength = 30;
    this.local_Text.minLength = 1;

    this.ip_Text.name = "txtRedeIP";
    this.ip_Text.rules = "ip";
    this.ip_Text.maxLength = 15;
    this.ip_Text.minLength = 7;

    this.porta_TCP_Control_Text.name = "txtTCP_Controls";
    this.porta_TCP_Control_Text.maxLength = 5;
    this.porta_TCP_Control_Text.minLength = 4;
    this.porta_TCP_Control_Text.rules = "onlynumbers";

    this.porta_TCP_Device_Text.name = "txtTCP_Device";
    this.porta_TCP_Device_Text.maxLength = 5;
    this.porta_TCP_Device_Text.minLength = 4;
    this.porta_TCP_Device_Text.rules = "onlynumbers";

    this.observacao_Text.name = "txtObservacao";
    this.observacao_Text.regex = "noFilter";
    this.observacao_Text.maxLength = 100;
    this.observacao_Text.regex = "noFilter";

    this.estado_Options.name = "cbEstado";
    this.estado_Options.add(1, "Habilitado", "habilitado", true);
    this.estado_Options.add(0, "Desabilitado", "desabilitado");

    const find = null;
    const filter = { select: "Nome", field: "nome", value: "" };

    this.settings
      .subscribe((site: SiteConfig) => {
        if (site != null) {
          this.filter = { siteId: { eq: site.id } };
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
    switch (actionButtomSelect.text) {
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

    const filter: ConcentradorDispositivoFilter = { id: { eq: this.id } };
    this.concentradorDispositivoService.readConcentradorDispositivos(this.order_by, filter)
      .subscribe(({ dispositivoConcentrador }: read_ConcentradorDispositivo) => {
        this.concentradorDispositivo = dispositivoConcentrador.nodes[0];
        this.nome_Text.text = this.concentradorDispositivo.nome;
        this.local_Text.text = this.concentradorDispositivo.localizacao;
        this.ip_Text.setTextWithMask(this.concentradorDispositivo.redeIP);
        this.observacao_Text.text = this.concentradorDispositivo.observacao;
        this.porta_TCP_Control_Text.text = this.concentradorDispositivo.redePorta1.toString();
        this.porta_TCP_Device_Text.text = (this.concentradorDispositivo.redePorta2.toString())
        this.estado_Options.select(this.concentradorDispositivo.status ? 1 : 0);

        this.showSpinner = false;
      });
  }

  onListView_Change(rowSelect?: rowSelect) {
    if (rowSelect.registro) {
      this.id = rowSelect.id;
    } else {
      if (rowSelect.exclude == "yes") {
        this.concentradorDispositivoService.deleteConcentradorDispositivo(rowSelect.id)
          .subscribe(({ data }: delete_ConcentradorDispositivo) => {
            if (data.dispositivoConcentrador_Excluir.sucesso == true) {
              const find = { field: "id", value: rowSelect.id, type: "DEL" }
              this.update_Grid(find)

            } else {
              const objeto = JSON.parse(data.dispositivoConcentrador_Excluir.objeto);
              this.alertService.show(data.dispositivoConcentrador_Excluir.mensagemTipo,
                data.dispositivoConcentrador_Excluir.mensagem,
                objeto);
            }
          })
      }
    }
  }

  onSave_Click() {
    this.nome_Text.validated = (this.nome_Text.text.length >= this.nome_Text.minLength);
    this.ip_Text.validated = this.ip_Text.validated && (this.ip_Text.textMasked.length >= this.ip_Text.minLength);
    this.porta_TCP_Control_Text.validated = ((parseInt(this.porta_TCP_Control_Text.text) >= 1111) && (parseInt(this.porta_TCP_Control_Text.text) <= 65536) );
    this.porta_TCP_Device_Text.validated = ((parseInt(this.porta_TCP_Device_Text.text) >= 1111) && (parseInt(this.porta_TCP_Device_Text.text) <= 65536) );

    const portaTCP_Control_Device: boolean = !(this.porta_TCP_Control_Text.text == this.porta_TCP_Device_Text.text);

    if (!this.nome_Text.validated || !this.ip_Text.validated) {
      this.alertService.show("ERRO",
        "Existem campos obrigatórios não preenchidos ou preenchidos de forma incorreta. Verifique!", null);

    } else if(!this.porta_TCP_Control_Text.validated || !this.porta_TCP_Device_Text.validated){
      
      this.alertService.show("ERRO",
        "Não foi possivel incluir o cadastro! PortaTCP deve estar entre 1111 a 65536. Verifique!", null);

    }else if(!portaTCP_Control_Device){
      this.porta_TCP_Control_Text.validated = false;
      this.porta_TCP_Device_Text.validated = false;
      this.alertService.show("ERRO",
        "As portas TCP Nexcode Access Control e TCP Nexcode Access Device devem ser diferentes. Verifique!",null);
    } else {

      this.showSpinner = true;

      const concentradorDispositivo: ConcentradorDispositivo = {
        id: this.id,
        siteId: <number>this.filter.siteId.eq,
        nome: this.nome_Text.text,
        localizacao: this.local_Text.text,
        redeIP: this.ip_Text.formated,
        redePorta1: parseInt(this.porta_TCP_Control_Text.text),
        redePorta2: parseInt(this.porta_TCP_Device_Text.text),
        observacao: this.observacao_Text.text,
        status: (this.estado_Options.itemSelected.id == 1) ? true : false
      }

      if (concentradorDispositivo.id) {
        this.concentradorDispositivoService.updateConcentradorDispositivo(concentradorDispositivo)
          .subscribe(({ data }: update_ConcentradorDispositivo) => {
            const objeto: any = JSON.parse(data.dispositivoConcentrador_Alterar.objeto);
            if (data.dispositivoConcentrador_Alterar.sucesso == true) {
              const find = { field: "id", value: objeto.Id }
              this.onClose_Click();
              this.update_Grid(find);
            } else {
              this.alertService.show(data.dispositivoConcentrador_Alterar.mensagemTipo,
                data.dispositivoConcentrador_Alterar.mensagem,
                objeto);
            }
            this.showSpinner = false;
          })
      } else {
        this.concentradorDispositivoService.createConcentradorDispositivo(concentradorDispositivo)
          .subscribe(({ data }: create_ConcentradorDispositivo) => {
            const objeto: any = JSON.parse(data.dispositivoConcentrador_Inserir.objeto);
            if (data.dispositivoConcentrador_Inserir.sucesso == true) {
              const find = { field: "id", value: objeto.Id };
              this.onClose_Click(false);
              this.update_Grid(find);
            } else {
              this.alertService.show(data.dispositivoConcentrador_Inserir.mensagemTipo,
                data.dispositivoConcentrador_Inserir.mensagem,
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
    this.porta_TCP_Device_Text.clear();
    this.porta_TCP_Control_Text.clear();
    this.observacao_Text.clear();

    this.estado_Options.select(1);
    if (hideForm == true) {
      this.actionbuttomService.hideForm()
    } else {
      this.nome_Text.focus();
    }
  }

  // Método utilizado para filtrar o Grid
  onFilter_Change(filterSelect: Item) {
    switch (filterSelect.text) {
      case "Nome":
        this.filterGrid = { nome: { contains: filterSelect.value } };
        break;

      case "Versão":
        this.filterGrid = { versao: {contains: filterSelect.value } };
        break;

      case "Localização":
        this.filterGrid = { localizacao: { contains: filterSelect.value } };
        break;

      case "IP":
        this.filterGrid = { redeIP: { contains: filterSelect.value } };
        break;

      case "Estado":
        if (DispositivoStatus[filterSelect.value] != null) {
          this.filterGrid = { status: { eq: (DispositivoStatus[filterSelect.value] == 1) } };
        } else {
          this.filterGrid = undefined;
        }
        break;

      case "Observação":
        this.filterGrid = { observacao: { contains: filterSelect.value } };
        break;

    }
    this.update_Grid();
  }

  update_Grid(find?: Find, filter?: Filter) {
    const filterGrid: ConcentradorDispositivoFilter = { ...this.filter, ...this.filterGrid };
    this.listView_Concentrador.processingShow();
    this.concentradorDispositivoService.readConcentradorDispositivos(this.order_by, filterGrid)
      .subscribe(({ dispositivoConcentrador }: read_ConcentradorDispositivo) => {
        this.actionbuttomService.enableButtons(0);
        this.listView_Concentrador.gridUpdate(dispositivoConcentrador.nodes, find, filter);
      });
  }

}