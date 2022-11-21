import { Component } from '@angular/core';
import { ActionButtomService } from '../../../../@theme/components/grid/action-buttom/service/action-button.service';
import { InputLabel } from '../../../../@theme/components/form/input-label/service/input-label.service';
import { Find, Filter, ListViewGrid, rowSelect } from '../../../../@theme/components/grid/list-view/service/list-view.service';
import { ServidorData, Servidor, read_ServidorSistema, update_ServidorEmail, ServidorSistema } from '../../../../@core/data/sistema-servidor';
import { OptionsGroup } from 'src/app/@theme/components/form/select-group/service/select-group.service';
import { ComboOptions } from 'src/app/@theme/components/form/combobox/service/combobox.service';
import { NavigationEnd, Router, RouterEvent } from '@angular/router';
import { filter } from 'rxjs/operators';
import { AlertServiceComponent } from 'src/app/@theme/components/form/alert-card/service/alert-card.service';

enum Modulos {
  "email" = 0,
  "sms" = 1
}

@Component({
  selector: 'nex-servidor',
  templateUrl: './servidor.component.html',
  styleUrls: ['./servidor.component.scss']
})

export class ServidorComponent {

  id: number = 0;
  find: Find;
  alias: string = "";
  filter: Filter;
  showSpinner: boolean = false;
  alertService: AlertServiceComponent = new AlertServiceComponent();
  listView_Servidor: ListViewGrid = new ListViewGrid();
  nomeServidorEmail_Text: InputLabel = new InputLabel();
  portaServidorEmail_Text: InputLabel = new InputLabel();
  senhaServidorEmail_Text: InputLabel = new InputLabel();
  oficialServidoremail_Text: InputLabel = new InputLabel();
  usuarioServidorEmail_Text: InputLabel = new InputLabel();
  autenticacaoEmail_Options: OptionsGroup = new OptionsGroup();
  tentativaEnvioEmail_Options: ComboOptions = new ComboOptions();

  constructor(public actionbuttomService: ActionButtomService,
    private servidorService: ServidorData,
    private router: Router) {

    this.actionbuttomService.relationGrid = "lstServidor";

    this.actionbuttomService.recurso = "";
    this.actionbuttomService.top_action_buttons = [
      { "id": 0, "text": "forms.buttons.update", "enabled": false, "condition": "select", "openForm": true, "editable": "yes", },
      { "id": 1, "text": "forms.buttons.read", "enabled": false, "condition": "select", "openForm": true, "editable": "no", }
    ]

    this.listView_Servidor.name = "lstServidor";
    this.listView_Servidor.title = "Configuração de Servidor";
    this.listView_Servidor.grid = [
      { "header": "Servidor", field: "servidor", "width": 25, "align": "left" },
      { "header": "Descrição", field: "descricao", "width": 75, "align": "left" }
    ];

    this.nomeServidorEmail_Text.name = "servidorEmail";
    this.nomeServidorEmail_Text.maxLength = 30;
    this.nomeServidorEmail_Text.minLength = 1;

    this.portaServidorEmail_Text.name = "portatcp";
    this.portaServidorEmail_Text.rules = "onlynumbers";
    this.portaServidorEmail_Text.maxLength = 5;
    this.portaServidorEmail_Text.minLength = 1;

    this.usuarioServidorEmail_Text.name = "usuarioNome";
    this.usuarioServidorEmail_Text.regex = "noFilter";
    this.usuarioServidorEmail_Text.maxLength = 20;
    this.usuarioServidorEmail_Text.minLength = 1;

    this.senhaServidorEmail_Text.name = "usuarioSenha";
    this.senhaServidorEmail_Text.type = "password";
    this.senhaServidorEmail_Text.regex = "noFilter";
    this.senhaServidorEmail_Text.maxLength = 20;
    this.senhaServidorEmail_Text.minLength = 1;

    this.oficialServidoremail_Text.name = "emailEndereco";
    this.oficialServidoremail_Text.rules = "email";
    this.oficialServidoremail_Text.regex = "email";
    this.oficialServidoremail_Text.maxLength = 30;

    this.autenticacaoEmail_Options.add(0, "Autenticação no Servidor de Saída", "servidorEmailAutenticacao");
    this.autenticacaoEmail_Options.add(1, "Validação de certificação", "servidorEmailCertificacao");
    this.autenticacaoEmail_Options.add(2, "Ativar SSL", "servidorEmailSSL");

    this.tentativaEnvioEmail_Options.name = "cbtentativaEnvioEmail";
    this.tentativaEnvioEmail_Options.textAlign = "center";
    this.tentativaEnvioEmail_Options.add("1", "1", 1, false);
    this.tentativaEnvioEmail_Options.add("2", "2", 2, false);
    this.tentativaEnvioEmail_Options.add("3", "3", 3, true);
    this.tentativaEnvioEmail_Options.add("4", "4", 4, false);
    this.tentativaEnvioEmail_Options.add("5", "5", 5, false);
    this.tentativaEnvioEmail_Options.add("6", "6", 6, false);
    this.tentativaEnvioEmail_Options.add("7", "7", 7, false);
    this.tentativaEnvioEmail_Options.add("8", "8", 8, false);
    this.tentativaEnvioEmail_Options.add("9", "9", 9, false);
    this.tentativaEnvioEmail_Options.add("10", "10", 10, false);

    this.update_Grid();

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
      case "forms.buttons.update":
        this.updateDataLoad();
        switch (this.id) {
          case Modulos.email:
            this.nomeServidorEmail_Text.focus();
            break;

        }
        break;

      case "forms.buttons.read":
        this.updateDataLoad();
        break;

    }
  }


  updateDataLoad() {

    this.showSpinner = true;
    this.servidorService.readServidorSistema()
      .subscribe(({ sistemaConfiguracao }: read_ServidorSistema) => {
        this.showSpinner = false;
        const sistemaServidorNodes: ServidorSistema = sistemaConfiguracao.nodes[0];
        switch (this.id) {
          case Modulos.email:
            this.nomeServidorEmail_Text.text = sistemaServidorNodes.servidorEmail;
            this.portaServidorEmail_Text.text = sistemaServidorNodes.servidorEmailPorta.toString();
            this.usuarioServidorEmail_Text.text = sistemaServidorNodes.servidorEmailUsuario;
            this.senhaServidorEmail_Text.text = sistemaServidorNodes.servidorEmailSenha;
            this.oficialServidoremail_Text.text = sistemaServidorNodes.servidorEmailOficial;
            this.autenticacaoEmail_Options.populate(sistemaServidorNodes);
            this.tentativaEnvioEmail_Options.select(sistemaServidorNodes.servidorEmailTentativas)
        }
      })
  }

  onListView_Change(rowSelect?: rowSelect) {
    if (rowSelect.registro) {
      this.id = rowSelect.id;
      this.alias = rowSelect.registro.alias;
    }
  }

  onSave_Click() {
    let find: any;
    switch (this.id) {
      case Modulos.email:
        const Email: ServidorSistema = {
          id: this.id,
          servidorEmail: this.nomeServidorEmail_Text.text,
          servidorEmailPorta: parseInt(this.portaServidorEmail_Text.text),
          servidorEmailUsuario: this.usuarioServidorEmail_Text.text,
          servidorEmailSenha: this.senhaServidorEmail_Text.text,
          servidorEmailOficial: this.oficialServidoremail_Text.text,
          servidorEmailAutenticacao: this.autenticacaoEmail_Options.valueOf("servidorEmailAutenticacao"),
          servidorEmailCertificacao: this.autenticacaoEmail_Options.valueOf("servidorEmailCertificacao"),
          servidorEmailSSL: this.autenticacaoEmail_Options.valueOf("servidorEmailSSL"),
          servidorEmailTentativas: this.tentativaEnvioEmail_Options.itemSelected.id
        }

        this.servidorService.updateServidorEmail(Email)
          .subscribe(({ data }: update_ServidorEmail) => {
            const objeto: any = JSON.parse(data.sistemaServidorEmail_Alterar.objeto);
            if (data.sistemaServidorEmail_Alterar.sucesso == true) {
              find = { field: "id", value: this.id };

              this.onClose_Click();
              this.update_Grid(find);
            } else {
              this.alertService.show(data.sistemaServidorEmail_Alterar.mensagemTipo,
                data.sistemaServidorEmail_Alterar.mensagem,
                objeto);

            }
          })

        break;
    }

  }


  onClose_Click() {
    this.actionbuttomService.hideForm()

    switch (this.id) {
      case Modulos.email:
        this.nomeServidorEmail_Text.clear();
        this.portaServidorEmail_Text.clear();
        this.usuarioServidorEmail_Text.clear();
        this.senhaServidorEmail_Text.clear();
        this.oficialServidoremail_Text.clear();
        break;
    }

  }

  update_Grid(find?: Find, filter?: Filter) {
    this.listView_Servidor.processingShow();
    this.servidorService.getServidor()
      .subscribe((servidores: Servidor[]) => {
        this.actionbuttomService.enableButtons(0);
        this.listView_Servidor.gridUpdate(servidores, find, filter);
      });
  }
}