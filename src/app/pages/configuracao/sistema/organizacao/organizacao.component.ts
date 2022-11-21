import { Component } from '@angular/core';

import { ListViewGrid, Find, Filter, rowSelect } from 'src/app/@theme/components/grid/list-view/service/list-view.service';
import { ActionButtomService } from 'src/app/@theme/components/grid/action-buttom/service/action-button.service';
import { InputLabel } from 'src/app/@theme/components/form/input-label/service/input-label.service';

import {
  OrganizacaoData,
  Organizacao,
  read_Organizacao,
  update_Organizacao
} from 'src/app/@core/data/sistema-organizacao';

import { AlertServiceComponent } from 'src/app/@theme/components/form/alert-card/service/alert-card.service';
import { ConfigStorage, OrganizacaoConfig } from 'src/app/@core/storage/config/config';
import { TreeviewService } from 'src/app/@theme/layouts/treeview/service/treeview.service';
import { BoxPanel } from 'src/app/@theme/layouts';

import { Estrutura } from 'src/app/@core/enum';
import { ComboOptions } from 'src/app/@theme/components/form/combobox/service/combobox.service';

@Component({
  selector: 'nex-organizacao',
  templateUrl: './organizacao.component.html',
  styleUrls: ['./organizacao.component.scss']
})

export class OrganizacaoComponent {

  id: number = 0;
  organizacaoNome_Text: InputLabel = new InputLabel();
  organizacaoEstrutura_Options: ComboOptions = new ComboOptions();
  organizacaoImagem: string;

  listView_Organizacao: ListViewGrid = new ListViewGrid();
  showSpinner: boolean = false;
  organizacao: Organizacao;
  boxButton: BoxPanel = new BoxPanel();

  alertService: AlertServiceComponent = new AlertServiceComponent();

  constructor(public actionbuttomService: ActionButtomService,
    private organizacaoService: OrganizacaoData,
    private configService: ConfigStorage,
    private treeviewService: TreeviewService) {

    this.boxButton.add("btOpen", "open", false);
    this.boxButton.add("btClear", "clear", false);

    this.actionbuttomService.relationGrid = "lstOrganizacao";

    this.actionbuttomService.recurso = "3";
    this.actionbuttomService.top_action_buttons = [
      { "id": 0, "text": "forms.buttons.update", "enabled": false, "condition": "select", "openForm": true, "editable": "yes", },
      { "id": 1, "text": "forms.buttons.read", "enabled": false, "condition": "select", "openForm": true, "editable": "no", }
    ]

    this.listView_Organizacao.name = "lstOrganizacao";
    this.listView_Organizacao.title = "Configuração da Organização";
    this.listView_Organizacao.grid = [
      { "header": "Organização", "field": "organizacaoNome", "width": 25, "align": "left" },
      { "header": "Estrutura", "field": "organizacaoEstrutura", "width": 75, "align": "left", "enum": Estrutura }
    ];

    this.organizacaoNome_Text.name = "txtOrganizacaoNome";
    this.organizacaoNome_Text.maxLength = 20;
    this.organizacaoNome_Text.minLength = 3;
    this.organizacaoNome_Text.rules = "uppercase";

    this.organizacaoEstrutura_Options.name = "cbOrganizacaoEstrutura";
    this.organizacaoEstrutura_Options.add("SITE - ÁREA", "siteArea", 0);
    this.organizacaoEstrutura_Options.add("SITE - SETOR - ÁREA", "siteSetorArea", 1);

    const find = null;
    const filter = { select: "Nome", field: "nomeOrganizacao", value: "" };

    this.update_Grid(find, filter);
  }


  onActionButtom_Click(actionButtomSelect: any) {
    switch (actionButtomSelect.text) {
      case "forms.buttons.update": {
        this.updateDataLoad();
        this.organizacaoNome_Text.focus(true);
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

    this.organizacaoService.readOrganizacoes()
      .subscribe(({ sistemaOrganizacao }: read_Organizacao) => {
        this.organizacao = sistemaOrganizacao.nodes[0];;
        this.organizacaoNome_Text.text = this.organizacao.organizacaoNome;
        this.organizacaoImagem = this.configService.converteImagemBase64(this.organizacao.organizacaoImagem);
        this.organizacaoEstrutura_Options.select(this.organizacao.organizacaoEstrutura);

        this.showSpinner = false;
      });
  }

  onListView_Change(rowSelect?: rowSelect) {
    if (rowSelect.registro) {
      this.id = rowSelect.id;
    }
  }

  onSave_Click() {
    this.organizacaoNome_Text.validated = (this.organizacaoNome_Text.text.length >= this.organizacaoNome_Text.minLength);

    if (!this.organizacaoNome_Text.validated) {
      this.alertService.show("ERRO",
        "Existem campos obrigatórios não preenchidos ou preenchidos de forma incorreta. Verifique!",
        null);
    } else {

      this.showSpinner = true;

      const organizacao: Organizacao = {
        id: this.id,
        organizacaoNome: this.organizacaoNome_Text.text,
        organizacaoEstrutura: this.organizacaoEstrutura_Options.itemSelected.id,
        organizacaoImagem: this.configService.converteImagemArray(this.organizacaoImagem)
      };

      this.organizacaoService.updateOrganizacao(organizacao)
        .subscribe(({ data }: update_Organizacao) => {

          this.showSpinner = false;

          const objeto = JSON.parse(data.sistemaOrganizacao_Alterar.objeto);
          if (data.sistemaOrganizacao_Alterar.sucesso == true) {
            const find = { field: "id", value: objeto.Id }

            const organizacao: OrganizacaoConfig = {
              organizacaoNome: this.organizacaoNome_Text.text,
              organizacaoLogo: this.organizacaoImagem
            };

            this.configService.setConfig<OrganizacaoConfig>(organizacao, "organizacao");

            this.onClose_Click();
            this.update_Grid(find);
          } else {
            this.alertService.show(data.sistemaOrganizacao_Alterar.mensagemTipo,
              data.sistemaOrganizacao_Alterar.mensagem,
              objeto);

          }
        }, (error) => {
          // Tratar subscribe ...
        })
    }
  }

  update_Grid(find?: Find, filter?: Filter) {
    this.listView_Organizacao.processingShow();
    this.organizacaoService.readOrganizacoes()
      .subscribe(({ sistemaOrganizacao }: read_Organizacao) => {
        this.actionbuttomService.enableButtons(0);
        this.treeviewService.organizacaoBehavior.next(sistemaOrganizacao.nodes);
        this.listView_Organizacao.gridUpdate(sistemaOrganizacao.nodes, find);
      });
  }

  onButton_Click(type: any) {
    const fileselector: HTMLInputElement = (document.getElementById('fileselector')) as HTMLInputElement;
    switch (type) {
      case "open":
        fileselector.click();
        break;

      case "clear":
        fileselector.value = "";
        this.imgFileLoad("./assets/images/ghostLogo.png");
        break;

      }
  }

  getImage_Change(event) {
    const imgPath = URL.createObjectURL(event.target.files[0]);
    this.imgFileLoad(imgPath)
  }

  imgFileLoad(path: string) {
    this.convertDataUrl(path)
      .then((img) => {
        this.organizacaoImagem = img as string;
      })
  }

  convertDataUrl(url) {
    return new Promise((resolve, reject) => {
      var xhr = new XMLHttpRequest();
      xhr.onload = function () {
        var reader = new FileReader();
        reader.onloadend = function () {
          resolve(reader.result);
        }
        reader.readAsDataURL(xhr.response);
      };
      xhr.open('GET', url);
      xhr.responseType = 'blob';
      xhr.send();
    })
  }

  onClose_Click() {
    this.actionbuttomService.hideForm()

    this.organizacaoNome_Text.clear();
    this.organizacaoEstrutura_Options.select(0);
    this.imgFileLoad("./assets/images/ghostLogo.png");
  };


}
