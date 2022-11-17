import { Component } from '@angular/core';

import { OptionsGroup } from 'src/app/@theme/components/form/select-group/service/select-group.service';
import { ListViewGrid, Find, Filter } from 'src/app/@theme/components/grid/list-view/service/list-view.service';
import { ActionButtomService } from 'src/app/@theme/components/grid/action-buttom/service/action-button.service';
import { InputMultiLabel } from 'src/app/@theme/components/form/input-multi-label/service/input-multi-label';
import { ComboOptions } from 'src/app/@theme/components/form/combobox/service/combobox.service';
import { RadioOptions } from 'src/app/@theme/components/form/radio/service/radio.service';
import { InputLabel } from 'src/app/@theme/components/form/input-label/service/input-label.service';
import { TabsService } from 'src/app/@theme/layouts/tabs/service/tabs.service';
import {
  Software,
  SoftwareSistema,
  update_SoftwarePlataforma,
  update_SoftwareRegistry,
  update_SoftwareNotification,
  update_SoftwareUtility,
  update_SoftwareMobile,
  update_SoftwareIntegration,
  read_SoftwareSistema
} from 'src/app/@core/data/sistema-software';
import { SoftwareService } from './service/software.service';
import { AlertServiceComponent } from 'src/app/@theme/components/form/alert-card/service/alert-card.service';

import { Modulos, Programacao, DispositivoStatus, ConnectionStatusColor } from 'src/app/@core/enum';

@Component({
  selector: 'nex-software',
  templateUrl: './software.component.html',
  host: { '(window:resize)': 'onResize()' },
  styleUrls: ['./software.component.scss']
})

export class SoftwareComponent {

  id: number = 0;
  alias: string = "";

  ip_Text: InputLabel = new InputLabel();
  local_Text: InputLabel = new InputLabel();
  ipExt_Text: InputLabel = new InputLabel();
  portaTCP_Text: InputLabel = new InputLabel();
  portaTCP_Mult: InputMultiLabel = new InputMultiLabel();
  portaUDP_Mult: InputMultiLabel = new InputMultiLabel();
  backupGeracao_Option: ComboOptions = new ComboOptions();
  backupHora_Text: InputLabel = new InputLabel();
  backupLocal_Text: InputLabel = new InputLabel();
  BackupRetencao_Option: ComboOptions = new ComboOptions();
  limpezaGeracao_Option: ComboOptions = new ComboOptions();
  limpezaHora_Text: InputLabel = new InputLabel();
  login_Text: InputLabel = new InputLabel();
  senha_Text: InputLabel = new InputLabel();
  tabsSoftware_Option: TabsService = new TabsService();
  estado_Option: RadioOptions = new RadioOptions();

  eventoAgenda_Options: OptionsGroup = new OptionsGroup();
  eventoIdentificacao_Options: OptionsGroup = new OptionsGroup();
  eventoAlarme_Options: OptionsGroup = new OptionsGroup();
  eventoAcesso_Options: OptionsGroup = new OptionsGroup();
  eventoEmail_Options: OptionsGroup = new OptionsGroup();
  eventoLogOperacao_Options: OptionsGroup = new OptionsGroup();
  eventoLogSistema_Options: OptionsGroup = new OptionsGroup();

  retencaoAgenda_Text: InputLabel = new InputLabel();
  retencaoIdentificacao_Text: InputLabel = new InputLabel();
  retencaoAlarme_Text: InputLabel = new InputLabel();
  retencaoAcesso_Text: InputLabel = new InputLabel();
  retencaoEmail_Text: InputLabel = new InputLabel();
  retencaoLogOperacao_Text: InputLabel = new InputLabel();
  retencaoLogSistema_Text: InputLabel = new InputLabel();

  listView_Software: ListViewGrid = new ListViewGrid();

  alertService: AlertServiceComponent = new AlertServiceComponent();

  showSpinner: boolean = false;
  onFormOpen: boolean = false;

  editable: boolean;

  constructor(
    public actionbuttomService: ActionButtomService,
    private softwareService: SoftwareService) {

    this.tabsSoftware_Option.add("tabBackup", "Backup", true);
    this.tabsSoftware_Option.add("tabLimpeza", "Limpeza", false, "block");

    this.actionbuttomService.relationGrid = "lstSoftware";

    this.actionbuttomService.recurso = "1";
    this.actionbuttomService.top_action_buttons = [
      { "id": 0, "text": "forms.buttons.update", "enabled": false, "condition": "select", "openForm": true, "editable": "yes", },
      { "id": 1, "text": "forms.buttons.read", "enabled": false, "condition": "select", "openForm": true, "editable": "no", }
    ]

    this.listView_Software.colorField = "status";
    this.listView_Software.colorEnum = ConnectionStatusColor;
    this.listView_Software.name = "lstSoftware";
    this.listView_Software.title = "Configuração de Software";
    this.listView_Software.grid = [
      { "header": "Software", "field": "software", "width": 20, "align": "left" },
      { "header": "Relevância", "field": "relevancia", "width": 12, "align": "left" },
      { "header": "Versão", "field": "versao", "width": 8, "align": "center" },
      { "header": "Início Operação", "field": "start", "width": 15, "align": "left", "pipe": "dd/MM/yyyy HH:mm:ss" },
      { "header": "Status", "field": "estado", "width": 10, "align": "left", "enum": DispositivoStatus },
      { "header": "Observação", "field": "observacao", "width": 40, "align": "left"},
      { "header": "Status", "field": "status", "visible": false }
    ];

    this.ip_Text.name = "ip_Text";
    this.ip_Text.maxLength = 15;
    this.ip_Text.minLength = 7;
    this.ip_Text.rules = "ip";

    this.retencaoAgenda_Text.name = "txtRetencaoAgenda";
    this.retencaoAgenda_Text.textAlign = "center";
    this.retencaoAgenda_Text.maxLength = 4;
    this.retencaoAgenda_Text.minLength = 2;
    this.retencaoAgenda_Text.rules = "onlynumbers";

    this.retencaoIdentificacao_Text.name = "txtRetencaoIdentificacao";
    this.retencaoIdentificacao_Text.textAlign = "center";
    this.retencaoIdentificacao_Text.maxLength = 4;
    this.retencaoIdentificacao_Text.minLength = 2;
    this.retencaoIdentificacao_Text.rules = "onlynumbers";

    this.retencaoAlarme_Text.name = "txtRetencaoAlarme";
    this.retencaoAlarme_Text.textAlign = "center";
    this.retencaoAlarme_Text.maxLength = 4;
    this.retencaoAlarme_Text.minLength = 2;
    this.retencaoAlarme_Text.rules = "onlynumbers";

    this.retencaoAcesso_Text.name = "txtRetencaoAcesso";
    this.retencaoAcesso_Text.textAlign = "center";
    this.retencaoAcesso_Text.maxLength = 4;
    this.retencaoAcesso_Text.minLength = 2;
    this.retencaoAcesso_Text.rules = "onlynumbers";

    this.retencaoEmail_Text.name = "txtRetencaoEmail";
    this.retencaoEmail_Text.textAlign = "center";
    this.retencaoEmail_Text.maxLength = 4;
    this.retencaoEmail_Text.minLength = 2;
    this.retencaoEmail_Text.rules = "onlynumbers";

    this.retencaoLogOperacao_Text.name = "txtRetencaoLogOperacao";
    this.retencaoLogOperacao_Text.textAlign = "center";
    this.retencaoLogOperacao_Text.maxLength = 4;
    this.retencaoLogOperacao_Text.minLength = 2;
    this.retencaoLogOperacao_Text.rules = "onlynumbers";

    this.retencaoLogSistema_Text.name = "txtRetencaoLogSistema";
    this.retencaoLogSistema_Text.textAlign = "center";
    this.retencaoLogSistema_Text.maxLength = 4;
    this.retencaoLogSistema_Text.minLength = 2;
    this.retencaoLogSistema_Text.rules = "onlynumbers";

    this.eventoAgenda_Options.add(1, "Agenda de Visita", "agendaVisita");
    this.eventoIdentificacao_Options.add(2, "Identificação", "identificacao");
    this.eventoAlarme_Options.add(3, "Alarme", "alarme");
    this.eventoAcesso_Options.add(4, "Acesso", "acesso");
    this.eventoEmail_Options.add(5, "E-mail", "email");
    this.eventoLogOperacao_Options.add(6, "Log de Operação", "logOperacao");
    this.eventoLogSistema_Options.add(7, "Log de Sistema", "logSistema");

    this.ipExt_Text.name = "ext_Text";
    this.ipExt_Text.maxLength = 30;
    this.ipExt_Text.minLength = 0;
    this.ipExt_Text.rules = "lowercase";

    this.portaTCP_Text.name = "portaTCP_Text";
    this.portaTCP_Text.rules = "onlynumbers";
    this.portaTCP_Mult.regex = "number";
    this.portaTCP_Text.maxLength = 5;
    this.portaTCP_Text.minLength = 2;

    this.portaTCP_Mult.name = "portaTCP_Mult";
    this.portaTCP_Mult.rules = "onlynumbers";
    this.portaTCP_Mult.maxLength = 5;
    this.portaTCP_Mult.minLength = 2;

    this.portaUDP_Mult.name = "portaUDP_Mult";
    this.portaUDP_Mult.label = "Porta UDP";
    this.portaUDP_Mult.rules = "onlynumbers";
    this.portaUDP_Mult.maxLength = 5;
    this.portaUDP_Mult.minLength = 2;

    this.backupGeracao_Option.name = "cbBackupGeracao";
    this.backupGeracao_Option.add("MANUAL", "manual", 0, true);
    this.backupGeracao_Option.add("AUTOMÁTICO", "automatico", 1);

    this.backupLocal_Text.name = "txtBackupLocal_Text";
    this.backupLocal_Text.maxLength = 100;
    this.backupLocal_Text.minLength = 1;
    this.backupLocal_Text.rules = "uppercase";
    this.backupLocal_Text.regex = "path";

    this.backupHora_Text.name = "txtBackupHora";
    this.backupHora_Text.maxLength = 5;
    this.backupHora_Text.minLength = 0;
    this.backupHora_Text.rules = "time";
    this.backupHora_Text.regex = "time";
    this.backupHora_Text.textAlign = "center";

    this.BackupRetencao_Option.name = "cbRetencao";
    this.BackupRetencao_Option.add("01", "01", 1, true);

    for (let diasBackup = 2; diasBackup <= 99; diasBackup++) {
      const diaBackup = ("00" + diasBackup.toString()).slice(-2);
      this.BackupRetencao_Option.add(diaBackup, diaBackup, diasBackup);
    }

    this.backupGeracao_Option.name = "cbLimpezaGeracao";
    this.limpezaGeracao_Option.add("MANUAL", "manual", 0, true);
    this.limpezaGeracao_Option.add("AUTOMÁTICO", "automatico", 1);

    this.limpezaHora_Text.name = "txtLimpezaHora";
    this.limpezaHora_Text.maxLength = 5;
    this.limpezaHora_Text.minLength = 0;
    this.limpezaHora_Text.rules = "time";
    this.limpezaHora_Text.regex = "time";
    this.limpezaHora_Text.textAlign = "center";

    this.login_Text.name = "login_Text";
    this.login_Text.maxLength = 20;
    this.login_Text.minLength = 3;
    this.login_Text.rules = "uppercase";
    this.login_Text.regex = "email";

    this.senha_Text.name = "senha_Text";
    this.senha_Text.maxLength = 20;
    this.senha_Text.minLength = 4;
    this.senha_Text.type = "password";
    this.senha_Text.regex = "noFilter";

    this.estado_Option.add(1, 'Habilitado', 'habilitado');
    this.estado_Option.add(0, 'Desabilitado', 'desabilitado');

    const find = null;
    const filter = { select: "Software", field: "software", value: "" };

    this.update_Grid(true);
  }

  onActionButtom_Click(actionButtomSelect: any) {
    this.onFormOpen = true;
    switch (actionButtomSelect.text) {
      case "forms.buttons.update":
        this.editable = true;
        this.updateDataLoad();
        this.ip_Text.focus(true);
        break;

      case "forms.buttons.read":
        this.editable = false;
        this.updateDataLoad();
        break;

    }
  }

  updateDataLoad() {
    this.showSpinner = true;

    this.softwareService.readSoftwareSistema()
      .subscribe(({ sistemaSoftware }: read_SoftwareSistema) => {
        const nodes: SoftwareSistema = sistemaSoftware.nodes[0];
        this.softwareService.readSoftware(nodes)
          .subscribe((sistemaSoftware: Software[]) => {
            this.showSpinner = false;
            const softwares: Software[] = sistemaSoftware.filter(software => software.id == this.id);
            const software: Software = softwares[0];
            switch (software.id) {
              case Modulos.controls:
                this.ip_Text.setTextWithMask(software.plataformaIP);
                this.ipExt_Text.text = software.plataformaExt;
                this.portaTCP_Text.text = software.plataformaPorta?.toString();
                this.estado_Option.select(software.estado);
                break;

              case Modulos.registry:
                this.ip_Text.setTextWithMask(software.registryIP);
                this.portaTCP_Text.text = software.registryPorta?.toString();
                this.estado_Option.select(software.estado);
                break;

              case Modulos.notification:
                this.ip_Text.setTextWithMask(software.notificationIP);
                this.portaTCP_Mult.text = software.notificationPorta1?.toString();
                this.portaUDP_Mult.text = software.notificationPorta2?.toString();
                this.estado_Option.select(software.estado);
                break;

              case Modulos.utility:
                this.ip_Text.setTextWithMask(software.utilityIP);
                this.portaTCP_Text.text = software.utilityPorta?.toString();

                this.backupGeracao_Option.select(software.utilBackupTipo);
                this.backupLocal_Text.text = software.utilBackupDiretorio;
                this.backupHora_Text.setTextWithMask(software.utilBackupHora);
                this.BackupRetencao_Option.select(software.utilBackupRetencao);
                this.onBackupGeracao_Change(software.utilBackupHora);

                this.limpezaGeracao_Option.select(software.utilLimpezaTipo);
                this.limpezaHora_Text.setTextWithMask(software.utilLimpezaHora);
                this.onLimpezaGeracao_Change(software.utilLimpezaHora);

                if (software.utilLimpezaVisitaAgenda > 0) {
                  this.eventoAgenda_Options.check(1);
                  this.retencaoAgenda_Text.text = software.utilLimpezaVisitaAgenda.toString();
                }

                if (software.utilLimpezaIdentificacao > 0) {
                  this.eventoIdentificacao_Options.check(2);
                  this.retencaoIdentificacao_Text.text = software.utilLimpezaIdentificacao.toString();
                }

                if (software.utilLimpezaAlarme > 0) {
                  this.eventoAlarme_Options.check(3);
                  this.retencaoAlarme_Text.text = software.utilLimpezaAlarme.toString();
                }

                if (software.utilLimpezaAcesso > 0) {
                  this.eventoAcesso_Options.check(4);
                  this.retencaoAcesso_Text.text = software.utilLimpezaAcesso.toString();
                }

                if (software.utilLimpezaEmail > 0) {
                  this.eventoEmail_Options.check(5);
                  this.retencaoEmail_Text.text = software.utilLimpezaEmail.toString();
                }

                if (software.utilLimpezaLogOperador > 0) {
                  this.eventoLogOperacao_Options.check(6);
                  this.retencaoLogOperacao_Text.text = software.utilLimpezaLogOperador.toString();
                }

                if (software.utilLimpezaLogSistema > 0) {
                  this.eventoLogSistema_Options.check(7);
                  this.retencaoLogSistema_Text.text = software.utilLimpezaLogSistema.toString();
                }

                this.retencaoAgenda_Text.enable(!this.eventoAgenda_Options.valueOf("agendaVisita"));
                this.retencaoIdentificacao_Text.enable(!this.eventoIdentificacao_Options.valueOf("identificacao"));
                this.retencaoAlarme_Text.enable(!this.eventoAlarme_Options.valueOf("alarme"));
                this.retencaoAcesso_Text.enable(!this.eventoAcesso_Options.valueOf("acesso"));
                this.retencaoEmail_Text.enable(!this.eventoEmail_Options.valueOf("email"));
                this.retencaoLogOperacao_Text.enable(!this.eventoLogOperacao_Options.valueOf("logOperacao"));
                this.retencaoLogSistema_Text.enable(!this.eventoLogSistema_Options.valueOf("logSistema"));

                this.estado_Option.select(software.estado);
                this.tabsSoftware_Option.select("tabBackup");

                break;

              case Modulos.mobile:
                this.ip_Text.setTextWithMask(software.mobileIP);
                this.portaTCP_Mult.text = software.mobilePorta1?.toString();
                this.portaUDP_Mult.text = software.mobilePorta2?.toString();
                this.estado_Option.select(software.estado);
                break;

              case Modulos.integration:
                this.ip_Text.setTextWithMask(software.integrationIP);
                this.portaTCP_Text.text = software.integrationPorta?.toString();

                this.login_Text.text = software.integrationLogin;
                this.senha_Text.text = software.integrationSenha;

                this.estado_Option.select(software.estado);
                break;
            }
          });
      });
  }

  onListView_Change(rowSelect?: any) {
    if (rowSelect.registro) {
      const software: Software = rowSelect.registro;
      this.id = software.id;
      this.alias = software.alias;
      if(this.id == Modulos.utility) {
        setTimeout(() => {
          this.onResize();  
        }, 350);        
      }
    }
  }

  onBackupGeracao_Change(hora?: string) {
    let backupHora: string = (hora) ? hora : "00:00";
    this.backupHora_Text.enable();
    switch (this.backupGeracao_Option.itemSelected.id) {
      case Programacao.manual:
        backupHora = "";
        this.backupHora_Text.disable();
        break;
      case Programacao.automatica:
        this.backupHora_Text.enable();
        break;
    }
    this.backupHora_Text.text = backupHora;
    this.backupHora_Text.textMasked = backupHora;
  }

  onLimpezaGeracao_Change(hora?: string) {
    let limpezaHora: string = (hora) ? hora : "00:00";
    this.limpezaHora_Text.enable();
    switch (this.limpezaGeracao_Option.itemSelected.id) {
      case Programacao.manual:
        limpezaHora = "";
        this.limpezaHora_Text.disable();
        break;
      case Programacao.automatica:
        this.limpezaHora_Text.enable();
        break;
    }
    this.limpezaHora_Text.text = limpezaHora;
    this.limpezaHora_Text.textMasked = limpezaHora;
  }

  onSave_Click() {

    this.ip_Text.validated = this.ip_Text.validated && (this.ip_Text.textMasked.length >= this.ip_Text.minLength);
    this.portaTCP_Text.validated = this.portaTCP_Text.text.length >= this.portaTCP_Text.minLength;
    this.ipExt_Text.validated = this.ipExt_Text.text.length >= this.ipExt_Text.minLength;
    this.portaTCP_Mult.validated = this.portaTCP_Mult.text.length >= this.portaTCP_Mult.minLength;
    this.portaUDP_Mult.validated = this.portaUDP_Mult.text.length >= this.portaUDP_Mult.minLength;

    const portaTCPUDP: boolean = !(this.portaTCP_Mult.text == this.portaUDP_Mult.text);

    switch (this.id) {
      case Modulos.controls:

        if (this.ip_Text.validated && this.portaTCP_Text.validated && this.ipExt_Text.validated) {
          const plataforma: SoftwareSistema = {
            id: this.id,
            plataformaIP: this.ip_Text.formated,
            plataformaPorta: parseInt(this.portaTCP_Text.text),
            plataformaExt: this.ipExt_Text.text
          };
          this.softwareService.updateSoftwarePlataforma(plataforma)
            .subscribe(({ data }: update_SoftwarePlataforma) => {
              const objeto: any = JSON.parse(data.sistemaSoftwarePlataforma_Alterar.objeto);
              if (data.sistemaSoftwarePlataforma_Alterar.sucesso == true) {
                const find = { field: "id", value: this.id };
                const filter = { select: "Software", field: "software", value: "" };
                this.update_Grid(false, find, filter);

                this.onClose_Click();
              } else {
                this.alertService.show(data.sistemaSoftwarePlataforma_Alterar.mensagemTipo,
                  data.sistemaSoftwarePlataforma_Alterar.mensagem,
                  objeto);
              }
            });
        } else {
          this.alertService.show("ERRO",
            "Existem campos obrigatórios não preenchidos ou preenchidos de forma incorreta. Verifique!",
            null);
        }
        break;

      case Modulos.registry:
        if (this.ip_Text.validated && this.portaTCP_Text.validated) {
          const registry: SoftwareSistema = {
            id: this.id,
            registryIP: this.ip_Text.formated,
            registryPorta: parseInt(this.portaTCP_Text.text)
          };
          this.softwareService.updateSoftwareRegistry(registry)
            .subscribe(({ data }: update_SoftwareRegistry) => {
              const objeto: any = JSON.parse(data.sistemaSoftwareRegistry_Alterar.objeto);
              if (data.sistemaSoftwareRegistry_Alterar.sucesso == true) {
                const find = { field: "id", value: this.id };
                const filter = { select: "Software", field: "software", value: "" };
                this.update_Grid(false, find, filter);

                this.onClose_Click();
              } else {
                this.alertService.show(data.sistemaSoftwareRegistry_Alterar.mensagemTipo,
                  data.sistemaSoftwareRegistry_Alterar.mensagem,
                  objeto);
              }
            });
        } else {
          this.alertService.show("ERRO",
            "Existem campos obrigatórios não preenchidos ou preenchidos de forma incorreta. Verifique!",
            null);
        }
        break;

      case Modulos.notification:
        if (this.ip_Text.validated && this.portaTCP_Mult.validated && this.portaUDP_Mult.validated && portaTCPUDP) {

          const notification: SoftwareSistema = {
            id: this.id,
            notificationIP: this.ip_Text.formated,
            notificationPorta1: parseInt(this.portaTCP_Mult.text),
            notificationPorta2: parseInt(this.portaUDP_Mult.text)
          };

          this.softwareService.updateSoftwareNotification(notification)
            .subscribe(({ data }: update_SoftwareNotification) => {
              const objeto: any = JSON.parse(data.sistemaSoftwareNotification_Alterar.objeto);
              if (data.sistemaSoftwareNotification_Alterar.sucesso == true) {
                const find = { field: "id", value: this.id };
                const filter = { select: "Software", field: "software", value: "" };
                this.update_Grid(false, find, filter);

                this.onClose_Click();
              } else {
                this.alertService.show(data.sistemaSoftwareNotification_Alterar.mensagemTipo,
                  data.sistemaSoftwareNotification_Alterar.mensagem,
                  objeto);
              }
            });
        } else if(!portaTCPUDP){
          this.portaTCP_Mult.validated = false;
          this.portaUDP_Mult.validated = false;
          this.alertService.show("ERRO",
            "As portas TCP e UDP devem ser diferentes. Verifique!",
            null);
        } else {
          this.alertService.show("ERRO",
            "Existem campos obrigatórios não preenchidos ou preenchidos de forma incorreta. Verifique!",
            null);
        }
        break;

      case Modulos.utility:

        this.backupHora_Text.validated = this.backupHora_Text.validated && (this.backupHora_Text.text.length >= this.backupHora_Text.minLength);
        this.limpezaHora_Text.validated = this.limpezaHora_Text.validated && (this.limpezaHora_Text.text.length >= this.limpezaHora_Text.minLength);

        this.retencaoAgenda_Text.validated = this.eventoRetencao(this.eventoAgenda_Options.valueOf("agendaVisita"),
          parseInt(this.retencaoAgenda_Text.text));
        this.retencaoIdentificacao_Text.validated = this.eventoRetencao(this.eventoIdentificacao_Options.valueOf("identificacao"),
          parseInt(this.retencaoIdentificacao_Text.text));
        this.retencaoAlarme_Text.validated = this.eventoRetencao(this.eventoAlarme_Options.valueOf("alarme"),
          parseInt(this.retencaoAlarme_Text.text))
        this.retencaoAcesso_Text.validated = this.eventoRetencao(this.eventoAcesso_Options.valueOf("acesso"),
          parseInt(this.retencaoAcesso_Text.text));
        this.retencaoEmail_Text.validated = this.eventoRetencao(this.eventoEmail_Options.valueOf("email"),
          parseInt(this.retencaoEmail_Text.text));
        this.retencaoLogOperacao_Text.validated = this.eventoRetencao(this.eventoLogOperacao_Options.valueOf("logOperacao"),
          parseInt(this.retencaoLogOperacao_Text.text));
        this.retencaoLogSistema_Text.validated = this.eventoRetencao(this.eventoLogSistema_Options.valueOf("logSistema"),
          parseInt(this.retencaoLogSistema_Text.text));

        if (this.ip_Text.validated && this.portaTCP_Text.validated &&
          this.backupHora_Text.validated &&
          this.limpezaHora_Text.validated &&
          this.retencaoAgenda_Text.validated &&
          this.retencaoIdentificacao_Text.validated &&
          this.retencaoAlarme_Text.validated &&
          this.retencaoAcesso_Text.validated && 
          this.retencaoEmail_Text.validated &&
          this.retencaoLogOperacao_Text.validated &&
          this.retencaoLogSistema_Text.validated) {
          const utility: SoftwareSistema = {
            id: this.id,
            utilityIP: this.ip_Text.formated,
            utilityPorta: parseInt(this.portaTCP_Text.text),
            utilBackupTipo: this.backupGeracao_Option.itemSelected.id,
            utilBackupDiretorio: this.backupLocal_Text.text,
            utilBackupHora: this.backupHora_Text.textMasked,
            utilBackupRetencao: this.BackupRetencao_Option.itemSelected.id,
            utilLimpezaTipo: this.limpezaGeracao_Option.itemSelected.id,
            utilLimpezaHora: this.limpezaHora_Text.textMasked,
            utilLimpezaVisitaAgenda: isNaN(parseInt(this.retencaoAgenda_Text.text)) ? null : parseInt(this.retencaoAgenda_Text.text),
            utilLimpezaIdentificacao: isNaN(parseInt(this.retencaoIdentificacao_Text.text)) ? null : parseInt(this.retencaoIdentificacao_Text.text),
            utilLimpezaAcesso: isNaN(parseInt(this.retencaoAcesso_Text.text)) ? null : parseInt(this.retencaoAcesso_Text.text),
            utilLimpezaAlarme: isNaN(parseInt(this.retencaoAlarme_Text.text)) ? null : parseInt(this.retencaoAlarme_Text.text),
            utilLimpezaEmail: isNaN(parseInt(this.retencaoEmail_Text.text)) ? null : parseInt(this.retencaoEmail_Text.text),
            utilLimpezaLogOperador: isNaN(parseInt(this.retencaoLogOperacao_Text.text)) ? null : parseInt(this.retencaoLogOperacao_Text.text),
            utilLimpezaLogSistema: isNaN(parseInt(this.retencaoLogSistema_Text.text)) ? null : parseInt(this.retencaoLogSistema_Text.text),
            utilityStatus: (this.estado_Option.itemSelected.id == 1 ? true : false)
          };

          this.softwareService.updateSoftwareUtility(utility)
            .subscribe(({ data }: update_SoftwareUtility) => {
              const objeto: any = JSON.parse(data.sistemaSoftwareUtility_Alterar.objeto);
              if (data.sistemaSoftwareUtility_Alterar.sucesso == true) {
                const find = { field: "id", value: this.id };
                const filter = { select: "Software", field: "software", value: "" };
                this.update_Grid(false, find, filter);

                this.onClose_Click();
              } else {
                this.alertService.show(data.sistemaSoftwareUtility_Alterar.mensagemTipo,
                  data.sistemaSoftwareUtility_Alterar.mensagem,
                  objeto);
              }
            });
        } else {
          if(this.retencaoAgenda_Text.validated &&
            this.retencaoIdentificacao_Text.validated &&
            this.retencaoAlarme_Text.validated &&
            this.retencaoAcesso_Text.validated && 
            this.retencaoEmail_Text.validated &&
            this.retencaoLogOperacao_Text.validated &&
            this.retencaoLogSistema_Text.validated) {
              this.alertService.show("ERRO",
              "Existem campos obrigatórios não preenchidos ou preenchidos de forma incorreta. Verifique!",
              null);  
          } else {
            this.alertService.show("ERRO",
            "Os valores preenchidos na coluna Retenção devem estar entre 90 e 3.650 dias. Verifique!",
            null);
          }
        }
        break;

      case Modulos.mobile:
        if (this.ip_Text.validated && this.portaTCP_Mult.validated && this.portaUDP_Mult.validated && portaTCPUDP) {
          const mobile: SoftwareSistema = {
            id: this.id,
            mobileIP: this.ip_Text.formated,
            mobilePorta1: parseInt(this.portaTCP_Mult.text),
            mobilePorta2: parseInt(this.portaUDP_Mult.text),
            mobileStatus: (this.estado_Option.itemSelected.id == 1 ? true : false)
          };

          this.softwareService.updateSoftwareMobile(mobile)
            .subscribe(({ data }: update_SoftwareMobile) => {
              const objeto: any = JSON.parse(data.sistemaSoftwareMobile_Alterar.objeto);
              if (data.sistemaSoftwareMobile_Alterar.sucesso == true) {
                const find = { field: "id", value: this.id };
                const filter = { select: "Software", field: "software", value: "" };
                this.update_Grid(false, find, filter);

                this.onClose_Click();
              } else {
                this.alertService.show(data.sistemaSoftwareMobile_Alterar.mensagemTipo,
                  data.sistemaSoftwareMobile_Alterar.mensagem,
                  objeto);
              }
            });
        } else if(!portaTCPUDP){
          this.portaTCP_Mult.validated = false;
          this.portaUDP_Mult.validated = false;
          this.alertService.show("ERRO",
            "As portas TCP e UDP devem ser diferentes. Verifique!",
            null);
        } else {
          this.alertService.show("ERRO",
            "Existem campos obrigatórios não preenchidos ou preenchidos de forma incorreta. Verifique!",
            null);
        }
        break;

      case Modulos.integration:
        if (this.ip_Text.validated && this.portaTCP_Text.validated &&
          this.login_Text.validated && this.senha_Text.validated) {
          const integration: SoftwareSistema = {
            id: this.id,
            integrationIP: this.ip_Text.formated,
            integrationPorta: parseInt(this.portaTCP_Text.text),
            integrationLogin: this.login_Text.text,
            integrationSenha: this.senha_Text.text,
            integrationStatus: (this.estado_Option.itemSelected.id == 1 ? true : false)
          };

          this.softwareService.updateSoftwareIntegration(integration)
            .subscribe(({ data }: update_SoftwareIntegration) => {
              const objeto: any = JSON.parse(data.sistemaSoftwareIntegration_Alterar.objeto);
              if (data.sistemaSoftwareIntegration_Alterar.sucesso == true) {
                const find = { field: "id", value: this.id };
                const filter = { select: "Software", field: "software", value: "" };
                this.update_Grid(false, find, filter);

                this.onClose_Click();
              } else {
                this.alertService.show(data.sistemaSoftwareIntegration_Alterar.mensagemTipo,
                  data.sistemaSoftwareIntegration_Alterar.mensagem,
                  objeto);
              }
            });
        } else {
          this.alertService.show("ERRO",
            "Existem campos obrigatórios não preenchidos ou preenchidos de forma incorreta. Verifique!",
            null);
        }
        break;
    }
  }

  eventoRetencao(evento: boolean, retencao: number): boolean {
    if (evento) {
      return (retencao >= 90 && retencao <= 3650)
    }
    return true;
  }

  onRetencao_Change(id: number) {

    switch (id) {
      case 1:
        if (!this.eventoAgenda_Options.valueOf("agendaVisita")) this.retencaoAgenda_Text.clear();
        this.retencaoAgenda_Text.enable(!this.eventoAgenda_Options.valueOf("agendaVisita"));
        break;

      case 2:
        if (!this.eventoIdentificacao_Options.valueOf("identificacao")) this.retencaoIdentificacao_Text.clear();
        this.retencaoIdentificacao_Text.enable(!this.eventoIdentificacao_Options.valueOf("identificacao"));
        break;

      case 3:
        if (!this.eventoAlarme_Options.valueOf("alarme")) this.retencaoAlarme_Text.clear();
        this.retencaoAlarme_Text.enable(!this.eventoAlarme_Options.valueOf("alarme"));
        break;

      case 4:
        if (!this.eventoAcesso_Options.valueOf("acesso")) this.retencaoAcesso_Text.clear();
        this.retencaoAcesso_Text.enable(!this.eventoAcesso_Options.valueOf("acesso"));
        break;

      case 5:
        if (!this.eventoEmail_Options.valueOf("email")) this.retencaoEmail_Text.clear();
        this.retencaoEmail_Text.enable(!this.eventoEmail_Options.valueOf("email"));
        break;

      case 6:
        if (!this.eventoLogOperacao_Options.valueOf("logOperacao")) this.retencaoLogOperacao_Text.clear();
        this.retencaoLogOperacao_Text.enable(!this.eventoLogOperacao_Options.valueOf("logOperacao"));
        break;

      case 7:
        if (!this.eventoLogSistema_Options.valueOf("logSistema")) this.retencaoLogSistema_Text.clear();
        this.retencaoLogSistema_Text.enable(!this.eventoLogSistema_Options.valueOf("logSistema"));
        break;
    }

  }

  getFolder_Change(event: any) {
    // Tratar chamada de método...
  }

  openLocalDialog(event: any) {
    const fileselector: any = document.getElementById('fileselector');
    fileselector.click();
  }

  update_Grid(reload: boolean, find?: Find, filter?: Filter) {
    if(!this.onFormOpen) {
      this.listView_Software.processingShow();
      this.softwareService.readSoftwareSistema()
        .subscribe(({ sistemaSoftware }: read_SoftwareSistema) => {
          const nodes: SoftwareSistema = sistemaSoftware.nodes[0];
          this.softwareService.readSoftware(nodes)
            .subscribe((data) => {
              this.actionbuttomService.enableButtons(0);
              this.listView_Software.gridUpdate(data, find, filter);
            });
        });  
    }

    setTimeout(() => {
      if(reload) {
        this.update_Grid(true);
      }      
    }, 30000);
  }

  onResize() {
    const maxHeightPanel = document.getElementById('softwarePanel')?.clientHeight - 264;
    const eventoRetencao = document.getElementById('itensEventoRetencao');

    eventoRetencao.style.maxHeight = maxHeightPanel + 'px';
  }

  onClose_Click() {
    this.onFormOpen = false;

    this.backupGeracao_Option.clearSelect();
    this.backupLocal_Text.clear();
    this.backupHora_Text.clear();
    this.limpezaGeracao_Option.clearSelect();
    this.limpezaHora_Text.clear();

    this.eventoAgenda_Options.uncheck(1);
    this.retencaoAgenda_Text.clear();
    this.eventoIdentificacao_Options.uncheck(2);
    this.retencaoIdentificacao_Text.clear();
    this.eventoAlarme_Options.uncheck(3);
    this.retencaoAlarme_Text.clear();
    this.eventoAcesso_Options.uncheck(4);
    this.retencaoAcesso_Text.clear();
    this.eventoEmail_Options.uncheck(5);
    this.retencaoEmail_Text.clear();
    this.eventoLogOperacao_Options.uncheck(6);
    this.retencaoLogOperacao_Text.clear();
    this.eventoLogSistema_Options.uncheck(7);
    this.retencaoLogSistema_Text.clear();
    this.login_Text.clear();
    this.senha_Text.clear();

    this.ip_Text.clear();
    this.ipExt_Text.clear();
    this.portaTCP_Text.clear();
    this.portaTCP_Mult.clear();
    this.portaUDP_Mult.clear();
    this.estado_Option.select(1);

    this.actionbuttomService.hideForm()
  };

}