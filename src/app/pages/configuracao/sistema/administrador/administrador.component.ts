import { Component, OnInit } from '@angular/core';
import { ActionButtomService } from 'src/app//@theme/components/grid/action-buttom/service/action-button.service';
import { ListViewGrid, Find, Filter, rowSelect } from 'src/app/@theme/components/grid/list-view/service/list-view.service';
import { InputLabel } from 'src/app/@theme/components/form/input-label/service/input-label.service';
import { AlertServiceComponent } from 'src/app/@theme/components/form/alert-card/service/alert-card.service';

import {
  AdministradorData,
  Administrador,
  read_Administrador,
  update_Administrador
} from 'src/app/@core/data/sistema-administrador';
import { NavigationEnd, Router, RouterEvent } from '@angular/router';
import { filter } from 'rxjs/operators';
import { Senha, SenhaModalService } from 'src/app/@theme/modals/senha/service/senha-modal.service';

@Component({
  selector: 'nex-administrador',
  templateUrl: './administrador.component.html',
  styleUrls: ['./administrador.component.scss']
})

export class AdministradorComponent implements OnInit {

  id: number;
  administradorLogin_Text: InputLabel = new InputLabel();

  senha_Text: InputLabel = new InputLabel();

  descricao: string = "CONFIGURAÇÃO DE LOGIN E SENHA DO ADMINISTRADOR GERAL DO SISTEMA";

  listView_Administrador: ListViewGrid = new ListViewGrid();

  administrador: Administrador;
  showSpinner: boolean = false;
  alertService: AlertServiceComponent = new AlertServiceComponent();
  senhaModal: SenhaModalService = new SenhaModalService();
  senha: Senha;

  constructor(public actionbuttomService: ActionButtomService,
    private administradorService: AdministradorData,
    private router: Router) {

    this.actionbuttomService.relationGrid = "lstAdministrador";

    this.actionbuttomService.recurso = "0"
    this.actionbuttomService.top_action_buttons = [
      { "id": 0, "text": "forms.buttons.update", "enabled": false, "condition": "select", "openForm": true, "editable": "yes", },
      { "id": 1, "text": "forms.buttons.read", "enabled": false, "condition": "select", "openForm": true, "editable": "no", }
    ]

    this.listView_Administrador.name = "lstAdministrador";
    this.listView_Administrador.title = "Configuração do Administrador do Sistema";
    this.listView_Administrador.grid = [
      { "header": "Administrador", "field": "administradorLogin", "width": 25, "align": "left" },
      { "header": "Descrição", "value": this.descricao, "width": 75, "align": "left" }
    ];

    this.administradorLogin_Text.name = "administradorLogin";
    this.administradorLogin_Text.maxLength = 20;
    this.administradorLogin_Text.minLength = 3;
    this.administradorLogin_Text.rules = "uppercase"

    this.senha_Text.name = "txtSenha";
    this.senha_Text.maxLength = 20;
    this.senha_Text.minLength = 4;
    this.senha_Text.type = "password";
    this.senha_Text.disable();

    this.update_Grid();

  }

  ngOnInit() {
    this.router.events
      .pipe(filter((event: RouterEvent) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.update_Grid();
      });
  }

  onActionButtom_Click(actionButtomSelect: any) {

    switch (actionButtomSelect.text) {
      case "forms.buttons.update": {
        this.updateDataLoad();
        this.administradorLogin_Text.focus();
        this.senha = undefined;
        break;

      }
      case "forms.buttons.read": {
        this.updateDataLoad();
        break;
        
      }
    }
  }

  updateDataLoad() {
    this.showSpinner = true;
    this.administradorService.readAdministrador()
      .subscribe(({ sistemaAdministrador }: read_Administrador) => {
        this.administrador = sistemaAdministrador.nodes[0];

        this.administradorLogin_Text.text = this.administrador.administradorLogin;

        this.senha_Text.text = "Nexcode Systems";
        this.showSpinner = false;

      });
  }

  onListView_Change(rowSelect?: rowSelect) {
    if (rowSelect.registro) {
      this.id = rowSelect.id;
    };
  }

  onSave_Click() {
    this.administradorLogin_Text.validated = (this.administradorLogin_Text.text.length >= this.administradorLogin_Text.minLength);

    if (!this.administradorLogin_Text.validated) {
      this.alertService.show("ERRO",
        "Existem campos obrigatórios não preenchidos ou preenchidos de forma incorreta. Verifique!",
        null);
    } else {

      this.showSpinner = true;

      const administrador: Administrador = {
        id: this.id,
        administradorLogin: this.administradorLogin_Text.text
      }

      this.administradorService.updateAdministrador(administrador)
        .subscribe(({ data }: update_Administrador) => {

          this.showSpinner = false;

          const objeto: any = JSON.parse(data.sistemaAdministrador_Alterar.objeto);
          if (data.sistemaAdministrador_Alterar.sucesso == true) {
            const find = { field: "id", value: objeto.Id }

            if (this.senha) {

              this.showSpinner = true;

              const administradorSenha: Administrador = {
                id: this.id,
                administradorSenha: this.senha.senhaNova,
                administradorSenhaAntiga: this.senha.senhaAntiga
              }

              this.administradorService.updateAdministrador(administradorSenha)
                .subscribe(({ data }: update_Administrador) => {

                  this.showSpinner = false;

                  const objeto: any = JSON.parse(data.sistemaAdministrador_Alterar.objeto);
                  if (data.sistemaAdministrador_Alterar.sucesso == true) {
                    this.onClose_Click();
                    this.update_Grid(find);
                  } else {
                    this.alertService.show(data.sistemaAdministrador_Alterar.mensagemTipo,
                      data.sistemaAdministrador_Alterar.mensagem,
                      objeto);
                  }
                });
            } else {
              this.onClose_Click();
              this.update_Grid(find);
            }

          } else {
            this.alertService.show(data.sistemaAdministrador_Alterar.mensagemTipo,
              data.sistemaAdministrador_Alterar.mensagem,
              objeto);
          }
        });
    }
  }

  onSenha_FindClick() {
    this.senha = undefined;
    this.senhaModal.show();
  }

  onChangePassSave_Click(senha: Senha) {
    this.senha = senha;
  }

  update_Grid(find?: Find, filter?: Filter) {
    this.listView_Administrador.processingShow();
    this.administradorService.readAdministrador()
      .subscribe(({ sistemaAdministrador }: read_Administrador) => {
        this.actionbuttomService.enableButtons(0);
        this.listView_Administrador.gridUpdate(sistemaAdministrador.nodes, find, filter);
      });
  }

  onClose_Click() {
    this.actionbuttomService.hideForm()
  }

}