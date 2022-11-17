import { Component, OnInit } from '@angular/core';

import { ListViewGrid, Find, Filter, rowSelect } from 'src/app/@theme/components/grid/list-view/service/list-view.service';
import { AlertServiceComponent } from 'src/app/@theme/components/form/alert-card/service/alert-card.service';
import { ActionButtomService } from 'src/app/@theme/components/grid/action-buttom/service/action-button.service';
import { InputLabel } from 'src/app/@theme/components/form/input-label/service/input-label.service';
import { SortOperationKind } from 'src/app/@core/api/generic-graphql';



import { Item } from 'src/app/@theme/components/form/combobox/service/combobox.service';
import { NavigationEnd, Router, RouterEvent } from '@angular/router';
import { filter } from 'rxjs/operators';
import { ContatoGrupo, 
         ContatoGrupoData, 
         ContatoGrupoFilter, 
         ContatoGrupoSort, 
         create_ContatoGrupo, 
         delete_ContatoGrupo, 
         read_ContatoGrupo, 
         update_ContatoGrupo } from 'src/app/@core/data/grupo-contato';

@Component({
    selector: 'nex-contato',
    templateUrl: './contato.component.html',
    styleUrls: ['./contato.component.scss']
})

export class ContatoGrupoComponent implements OnInit {

    id: number = 0;
    nomeContato_Text: InputLabel = new InputLabel();
    listView_Contato: ListViewGrid = new ListViewGrid();
    contatoGrupo: ContatoGrupo;

    order_by: ContatoGrupoSort = { contatoGrupo: SortOperationKind.ASC };
    filter: ContatoGrupoFilter;
    showSpinner: boolean = false;
    alertService: AlertServiceComponent = new AlertServiceComponent();



    constructor(public actionbuttomService: ActionButtomService,
                private router: Router,
                private contatoGrupoService: ContatoGrupoData) {

        this.actionbuttomService.relationGrid = "lstContatoGrupo";

        this.actionbuttomService.recurso = "7";
        this.actionbuttomService.top_action_buttons = [{ "id": 0, "text": "forms.buttons.create", "enabled": true, "condition": "always", "openForm": true, "editable": "new", },
                                                       { "id": 1, "text": "forms.buttons.update", "enabled": false, "condition": "select", "openForm": true, "editable": "yes", },
                                                       { "id": 2, "text": "forms.buttons.read", "enabled": false, "condition": "select", "openForm": true, "editable": "no", },
                                                       { "id": 3, "text": "forms.buttons.delete", "enabled": false, "condition": "multi", "openForm": false, "question": "forms.questions.delete" }]


        this.listView_Contato.name = "lstContatoGrupo";
        this.listView_Contato.title = "Lista de Grupos de Contato";
        this.listView_Contato.grid = [{ "header": "Nome", "field": "contatoGrupo", "width": 100, "align": "left" }];

        this.nomeContato_Text.name = "txtContatos";
        this.nomeContato_Text.rules = "uppercase";
        this.nomeContato_Text.maxLength = 20;
        this.nomeContato_Text.minLength = 1;



    }

    ngOnInit() {
        this.router.events
            .pipe(filter((event: RouterEvent) => event instanceof NavigationEnd))
            .subscribe(() => {

                this.update_Grid(null, { select: "Nome", field: "centroCusto", value: "" });

            });
    }

    onActionButtom_Click(actionButtomSelect: any) {
        switch (actionButtomSelect.text) {
            case "forms.buttons.create": {
                this.id = undefined;
                this.nomeContato_Text.focus();
                break;

            }
            case "forms.buttons.update": {
                this.updateDataLoad();
                this.nomeContato_Text.focus(true);
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

        const filter: ContatoGrupoFilter = {id: { eq: this.id} };
        this.contatoGrupoService.readContatoGrupos(this.order_by,filter)
            .subscribe(({ grupoContato }: read_ContatoGrupo) => {
               this.contatoGrupo = grupoContato.nodes[0];
               this.nomeContato_Text.text = this.contatoGrupo.contatoGrupo;
            })
        this.showSpinner = false;
    }

    onListView_Change(rowSelect?: rowSelect) {
        if (rowSelect.registro) {
            this.id = rowSelect.id;
          } else {
            if (rowSelect.exclude == "yes") {
              this.contatoGrupoService.deleteContatoGrupo(rowSelect.id)
                .subscribe(({ data }: delete_ContatoGrupo) => {
                  if (data.grupoContato_Excluir.sucesso == true) {
                    const find = { field: "id", value: rowSelect.id, type: "DEL" }
                    this.update_Grid(find)
      
                  } else {
                    const objeto = JSON.parse(data.grupoContato_Excluir.objeto);
                    this.alertService.show(data.grupoContato_Excluir.mensagemTipo,
                      data.grupoContato_Excluir.mensagem,
                      objeto);
                  }
                })
            }
          }

    }

    onSave_Click() {
        this.nomeContato_Text.validated = (this.nomeContato_Text.text.length >= this.nomeContato_Text.minLength);

        if (!this.nomeContato_Text.validated) {
          this.alertService.show("ERRO",
            "Existem campos obrigatórios não preenchidos ou preenchidos de forma incorreta. Verifique!",
            null);
        } else {
    
          this.showSpinner = true;
    
          const contatoGrupo: ContatoGrupo = {
            id: this.id,
            contatoGrupo: this.nomeContato_Text.text,
          }

    
          if (contatoGrupo.id) {
            this.contatoGrupoService.updateContatoGrupo(contatoGrupo)
              .subscribe(({ data }: update_ContatoGrupo) => {
                const objeto: any = JSON.parse(data.grupoContato_Alterar.objeto);
                if (data.grupoContato_Alterar.sucesso == true) {
                  const find = { field: "id", value: objeto.Id }
                  this.onClose_Click();
                  this.update_Grid(find);
                } else {
                  this.alertService.show(data.grupoContato_Alterar.mensagemTipo,
                    data.grupoContato_Alterar.mensagem,
                    objeto);
                }
    
                this.showSpinner = false;
    
              })
          } else {
            this.contatoGrupoService.createContatoGrupo(contatoGrupo)
              .subscribe(({ data }: create_ContatoGrupo) => {
                const objeto: any = JSON.parse(data.grupoContato_Inserir.objeto);
                if (data.grupoContato_Inserir.sucesso == true) {
                  const find = { field: "id", value: objeto.Id };
                  this.onClose_Click(false);
                  this.update_Grid(find);
                } else {
                  this.alertService.show(data.grupoContato_Inserir.mensagemTipo,
                    data.grupoContato_Inserir.mensagem,
                    objeto);
                }
    
                this.showSpinner = false;
    
              })
          }
        }
    }

    onFilter_Change(filterSelect: Item) {
        switch (filterSelect.text) {
            case "Nome":

                break;
        }
        this.update_Grid();

    }

    update_Grid(find?: Find, filter?: Filter) {
        this.listView_Contato.processingShow();
        this.contatoGrupoService.readContatoGrupos(this.order_by, this.filter)
          .subscribe(({ grupoContato }: read_ContatoGrupo) => {
            this.actionbuttomService.enableButtons(0);
            this.listView_Contato.gridUpdate(grupoContato.nodes, find, filter);
          });
      }

    onClose_Click(hideForm: boolean = true) {
        this.nomeContato_Text.clear();
        if (hideForm == true) {
            this.actionbuttomService.hideForm()
        } else {
            this.nomeContato_Text.focus();
        }
    }
}

