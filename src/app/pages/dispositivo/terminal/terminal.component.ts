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
import {
  create_TerminalDispositivo,
  read_TerminalDispositivo,
  update_TerminalDispositivo,
  delete_TerminalDispositivo,
  TerminalDispositivoData,
  TerminalDispositivo,
  TerminalDispositivoSort,
  TerminalDispositivoFilter
} from 'src/app/@core/data/dispositivo-terminal';

import { TipoTerminal, DispositivoStatus, StatusColor } from 'src/app/@core/enum';

import { NavigationEnd, Router, RouterEvent } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'nex-terminal-dispositivo',
  templateUrl: './terminal.component.html',
  styleUrls: ['./terminal.component.scss']
})

export class TerminalDispositivoComponent implements OnInit {

  id: number = 0;

  nome_Text: InputLabel = new InputLabel();
  tipo_Option: ComboOptions = new ComboOptions();
  local_Text: InputLabel = new InputLabel();
  ip_Text: InputMultiLabel = new InputMultiLabel();
  porta_Text: InputMultiLabel = new InputMultiLabel();
  login_Text: InputLabel = new InputLabel();
  senha_Text: InputLabel = new InputLabel();
  observacao_Text: TextareaLabel = new TextareaLabel();
  estado_Options: RadioOptions = new RadioOptions;

  order_by: TerminalDispositivoSort = { nome: SortOperationKind.ASC };

  filter: TerminalDispositivoFilter;
  filterGrid: TerminalDispositivoFilter;

  settings: BehaviorSubject<any>;

  listView_Terminal: ListViewGrid = new ListViewGrid();

  terminalDispositivo: TerminalDispositivo;

  showSpinner: boolean = false;

  alertService: AlertServiceComponent = new AlertServiceComponent();

  editable: boolean;

  constructor(public actionbuttomService: ActionButtomService,
    private config: ConfigStorage,
    private terminalDispositivoService: TerminalDispositivoData,
    private router: Router) {

    this.settings = this.config.siteSubject();
    this.actionbuttomService.relationGrid = "lstTerminal";

    this.actionbuttomService.recurso = "25";
    this.actionbuttomService.top_action_buttons = [
      { "id": 0, "text": "forms.buttons.create", "visibled": false, "enabled": true, "condition": "always", "openForm": true, "editable": "new", },
      { "id": 1, "text": "forms.buttons.update", "visibled": false, "enabled": false, "condition": "select", "openForm": true, "editable": "yes", },
      { "id": 2, "text": "forms.buttons.read", "visibled": false, "enabled": false, "condition": "select", "openForm": true, "editable": "no", },
      { "id": 3, "text": "forms.buttons.delete", "visibled": false, "enabled": false, "condition": "multi", "openForm": false, "question": "forms.questions.delete" }
    ]

    this.listView_Terminal.name = "lstTerminal";
    this.listView_Terminal.title = "Lista de Terminais";
    this.listView_Terminal.colorField = "status";
    this.listView_Terminal.colorEnum = StatusColor;
    this.listView_Terminal.grid = [
      { "header": "Nome", "field": "nome", "width": 12, "align": "left" },
      { "header": "Tipo", "field": "tipo", "width": 12, "align": "left", "enum": TipoTerminal },
      { "header": "Localização", "field": "localizacao", "width": 17, "align": "left" },
      { "header": "IP", "field": "redeIP", "width": 12, "align": "left" },
      { "header": "Status", "field": "status", "width": 12, "align": "left", "enum": DispositivoStatus },
      { "header": "Observação", "field": "observacao", "width": 35, "align": "left" }
    ];

    this.nome_Text.name = "txtNome";
    this.nome_Text.rules = "uppercase";
    this.nome_Text.maxLength = 30;
    this.nome_Text.minLength = 1;

    this.tipo_Option.name = "cbTipoTerminal";
    this.tipo_Option.add("FACIAL CONTROL ID", "controlId", 1, true);
    this.tipo_Option.add("FACIAL HIKVISION", "hikvision", 2, false);
    this.tipo_Option.add("FACIAL ZKTECO", "zkteco", 3, false);

    this.local_Text.name = "txtLocal";
    this.local_Text.rules = "uppercase";
    this.local_Text.maxLength = 30;
    this.local_Text.minLength = 0;

    this.ip_Text.name = "txtRedeIp";
    this.ip_Text.rules = "ip";
    this.ip_Text.maxLength = 15;
    this.ip_Text.minLength = 7;
    this.ip_Text.minWidth = 140;

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

    this.observacao_Text.name = "txtObservacao";
    this.observacao_Text.regex = "noFilter";
    this.observacao_Text.maxLength = 100;
    
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

    const filter: TerminalDispositivoFilter = { id: { eq: this.id } };
    this.terminalDispositivoService.readTerminalDispositivos(this.order_by, filter)
      .subscribe(({ dispositivoTerminal }: read_TerminalDispositivo) => {
        this.terminalDispositivo = dispositivoTerminal.nodes[0];
        this.nome_Text.text = this.terminalDispositivo.nome;
        this.tipo_Option.select(this.terminalDispositivo.tipo);
        this.local_Text.text = this.terminalDispositivo.localizacao;
        this.ip_Text.setTextWithMask(this.terminalDispositivo.redeIP);
        this.porta_Text.text = this.terminalDispositivo.redePorta.toString();
        this.login_Text.text = this.terminalDispositivo.login;
        this.senha_Text.text = this.terminalDispositivo.senha;
        this.observacao_Text.text = this.terminalDispositivo.observacao;
        this.estado_Options.select(this.terminalDispositivo.status ? 1 : 0);

        this.showSpinner = false;
      });
  }

  onListView_Change(rowSelect?: rowSelect) {
    if (rowSelect.registro) {
      this.id = rowSelect.id;
    } else {
      if (rowSelect.exclude == "yes") {
        this.terminalDispositivoService.deleteTerminalDispositivo(rowSelect.id)
          .subscribe(({ data }: delete_TerminalDispositivo) => {
            if (data.dispositivoTerminal_Excluir.sucesso == true) {
              const find = { field: "id", value: rowSelect.id, type: "DEL" }
              this.update_Grid(find)

            } else {
              const objeto = JSON.parse(data.dispositivoTerminal_Excluir.objeto);
              this.alertService.show(data.dispositivoTerminal_Excluir.mensagemTipo,
                data.dispositivoTerminal_Excluir.mensagem,
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

    if (!this.nome_Text.validated || !this.ip_Text.validated || !this.porta_Text.validated ||
        !this.login_Text.validated || !this.senha_Text.validated ) {
      this.alertService.show("ERRO",
        "Existem campos obrigatórios não preenchidos ou preenchidos de forma incorreta. Verifique!",
        null);
    } else {

      this.showSpinner = true;

      const terminalDispositivo: TerminalDispositivo = {
        id: this.id,
        siteId: <number>this.filter.siteId.eq,
        nome: this.nome_Text.text,
        localizacao: this.local_Text.text,
        redeIP: this.ip_Text.formated,
        redePorta: parseInt(this.porta_Text.text),
        tipo: this.tipo_Option.itemSelected.id,
        login: this.login_Text.text,
        senha: this.senha_Text.text,
        observacao: this.observacao_Text.text,
        status: (this.estado_Options.itemSelected.id == 1 ? true : false)
      }

      if (terminalDispositivo.id) {
        this.terminalDispositivoService.updateTerminalDispositivo(terminalDispositivo)
          .subscribe(({ data }: update_TerminalDispositivo) => {
            const objeto: any = JSON.parse(data.dispositivoTerminal_Alterar.objeto);
            if (data.dispositivoTerminal_Alterar.sucesso == true) {
              const find = { field: "id", value: objeto.Id }
              this.onClose_Click();
              this.update_Grid(find);
            } else {
              this.alertService.show(data.dispositivoTerminal_Alterar.mensagemTipo,
                data.dispositivoTerminal_Alterar.mensagem,
                objeto);
            }
            this.showSpinner = false;
          })
      } else {
        this.terminalDispositivoService.createTerminalDispositivo(terminalDispositivo)
          .subscribe(({ data }: create_TerminalDispositivo) => {
            const objeto: any = JSON.parse(data.dispositivoTerminal_Inserir.objeto);
            if (data.dispositivoTerminal_Inserir.sucesso == true) {
              const find = { field: "id", value: objeto.Id };
              this.onClose_Click(false);
              this.update_Grid(find);
            } else {
              this.alertService.show(data.dispositivoTerminal_Inserir.mensagemTipo,
                data.dispositivoTerminal_Inserir.mensagem,
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
    this.senha_Text.clear();
    this.login_Text.clear();
    this.observacao_Text.clear();
    this.estado_Options.select(1);
    this.tipo_Option.select(1);

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

      case "Tipo":
        if (TipoTerminal[filterSelect.value] != null) {
          this.filterGrid = { tipo: { eq: TipoTerminal[filterSelect.value]} };
        } else {
          this.filterGrid = undefined;
        }
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
    const filterGrid: TerminalDispositivoFilter = { ...this.filter, ...this.filterGrid };
    this.listView_Terminal.processingShow();
    this.terminalDispositivoService.readTerminalDispositivos(this.order_by, filterGrid)
      .subscribe(({ dispositivoTerminal }: read_TerminalDispositivo) => {
        this.actionbuttomService.enableButtons(0);
        this.listView_Terminal.gridUpdate(dispositivoTerminal.nodes, find, filter);
      });
  }

}