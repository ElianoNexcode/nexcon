import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { TreeviewService } from 'src/app/@theme/layouts/treeview/service/treeview.service';
import { TextareaLabel } from 'src/app/@theme/components/form/textarea-label/service/textarea-label.service';

import { ListViewGrid, Find, Filter, rowSelect } from 'src/app/@theme/components/grid/list-view/service/list-view.service';
import { AlertServiceComponent } from 'src/app/@theme/components/form/alert-card/service/alert-card.service';
import { ActionButtomService } from 'src/app/@theme/components/grid/action-buttom/service/action-button.service';
import { InputLabel } from 'src/app/@theme/components/form/input-label/service/input-label.service';

import { SortOperationKind } from 'src/app/@core/api/generic-graphql';

import { SiteData, Site, create_Site, read_Site, 
         update_Site, delete_Site, SiteSort, SiteFilter, Supervisao } from 'src/app/@core/data/reparticao-site';
import { ErrosModalService } from 'src/app/@theme/modals/erros/service/erros-modal.service';
import { Item } from 'src/app/@theme/components/form/combobox/service/combobox.service';
import { NavigationEnd, Router, RouterEvent } from '@angular/router';
import { filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { TabsService } from 'src/app/@theme/layouts/tabs/service/tabs.service';
import { BoxPanel } from 'src/app/@theme/layouts';
import { PessoaInternaModalService } from 'src/app/@theme/modals/pessoa-interna/service/pessoa-modal.service';
import { PessoaInternaUsuario } from 'src/app/@core/data/usuario-pessoa-interna';

@Component({
  selector: 'nex-site',
  templateUrl: './site.component.html',
  styleUrls: ['./site.component.scss'],
  host: {'(window:resize)': 'onResize()'}
})

export class SiteComponent implements OnInit, AfterViewInit {

  id: number = 0;
  nomeSite_Text: InputLabel = new InputLabel();
  nivelAcessoRotativo_Text: number = 0;
  observacao_Text: TextareaLabel = new TextareaLabel();

  order_by: SiteSort = { nome: SortOperationKind.ASC }
  filter: SiteFilter = { nome: { contains: "" } };

  boxButton: BoxPanel = new BoxPanel();

  listView_Site: ListViewGrid = new ListViewGrid();
  listView_Site_Supervisor: ListViewGrid = new ListViewGrid();
  listView_Site_Vigilante: ListViewGrid = new ListViewGrid();

  tabsConfiguracao_Options: TabsService = new TabsService();

  pessoaInternaModalService: PessoaInternaModalService = new PessoaInternaModalService();

  pessoaId: number;

  showSpinner: boolean = false;

  errosModalService: ErrosModalService = new ErrosModalService();

  site: Site;

  readSites: Subscription;
  deleteSite: Subscription;
  updateSite: Subscription;
  createSite: Subscription;

  alertService: AlertServiceComponent = new AlertServiceComponent();

  filterPessoaInterna: any;

  editable: boolean;

  constructor(public actionbuttomService: ActionButtomService,
    private siteService: SiteData,
    private treeviewService: TreeviewService,
    private router: Router) {

    this.boxButton.add("btOpen", "insert", false);
    this.boxButton.add("btClose", "delete", false);

    this.tabsConfiguracao_Options.add("tabSupervisor", "Supervisor", true);
    this.tabsConfiguracao_Options.add("tabVigilante", "Vigilante");

    this.pessoaInternaModalService.name = "pessoaInternaModal";
    this.pessoaInternaModalService.pesquisaPessoa_Option.name = "cbPesquisaSupervisor";

    this.pessoaInternaModalService.grid = [
      { "header": "Pessoa", "field": "nome", "width": 50, "align": "left" },
      { "header": "Área", "entity": "area", "field": "nome", "width": 25, "align": "left" },
      { "header": "Setor", "entity": ["area", "setor"], "field": "nome", "width": 25, "align": "left" }
    ];

    this.listView_Site_Supervisor.name = "lstSiteSupervisor";
    this.listView_Site_Supervisor.gridOnly = true;
    this.listView_Site_Supervisor.noPaging = true;
    this.listView_Site_Supervisor.noBorder = true;
    this.listView_Site_Supervisor.grid = [{ "header": "", "field": "nome", align: "left" }];

    this.listView_Site_Vigilante.name = "lstSiteVigilante";
    this.listView_Site_Vigilante.gridOnly = true;
    this.listView_Site_Vigilante.noPaging = true;
    this.listView_Site_Vigilante.noBorder = true;
    this.listView_Site_Vigilante.grid = [{ "header": "", "field": "nome", align: "left" }];

    this.errosModalService.relationGrid = "lstSite";

    this.actionbuttomService.relationGrid = "lstSite";

    this.actionbuttomService.recurso = "18";
    this.actionbuttomService.top_action_buttons = [
      { "id": 0, "text": "forms.buttons.create", "enabled": true, "condition": "always", "openForm": true, "editable": "new", },
      { "id": 1, "text": "forms.buttons.update", "enabled": false, "condition": "select", "openForm": true, "editable": "yes", },
      { "id": 3, "text": "forms.buttons.read", "enabled": false, "condition": "select", "openForm": true, "editable": "no", },
      { "id": 2, "text": "forms.buttons.delete", "enabled": false, "condition": "multi", "openForm": false, "question": "forms.questions.delete" }
    ]

    this.listView_Site.name = "lstSite";
    this.listView_Site.title = "Lista de Sites";
    this.listView_Site.grid = [
      { "header": "Nome", "field": "nome", "width": 25, "align": "left" },
      { "header": "Observação", "field": "observacao", "width": 75, "align": "left" }
    ];

    this.nomeSite_Text.name = "txtNome";
    this.nomeSite_Text.maxLength = 20;
    this.nomeSite_Text.minLength = 1;
    this.nomeSite_Text.rules = "uppercase";

    this.observacao_Text.name = "txtObservacao";
    this.observacao_Text.maxLength = 100;

    this.update_Grid(null, { select: "Nome", field: "nome", value: "" });
  }

  ngOnInit() {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.update_Grid(null, { select: "Nome", field: "nome", value: "" });
      });    
  }

  ngAfterViewInit(): void {
    this.onResize();
  }

  onActionButtom_Click(actionButtomSelect: any) {
    switch (actionButtomSelect.text) {
      case "forms.buttons.create":
        this.id = undefined;
        this.nomeSite_Text.focus();
        this.tabsConfiguracao_Options.select("tabSupervisor");
        this.editable = true;
        break;

      case "forms.buttons.update":
        this.updateDataLoad();
        this.nomeSite_Text.focus(true);
        this.tabsConfiguracao_Options.select("tabSupervisor");
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

    this.siteService.orderBy = this.order_by;
    this.siteService.where = { id: { eq: this.id } };
    this.readSites = this.siteService.read(false, false)
      .subscribe(({ reparticaoSite }: read_Site) => {
        this.site = reparticaoSite.nodes[0];;
        this.nomeSite_Text.text = this.site.nome;
        this.observacao_Text.text = this.site.observacao;

        const supervisor: { id: number, nome: string }[] = this.site.supervisao
          .filter(supervisao => supervisao.tipo == 1)
          .map(supervisao => {
            return { id: supervisao.pessoaInterna.id, nome: supervisao.pessoaInterna.nome }
          });

        const vigilante: { id: number, nome: string }[] = this.site.supervisao
          .filter(supervisao => supervisao.tipo == 2)
          .map(supervisao => {
            return { id: supervisao.pessoaInterna.id, nome: supervisao.pessoaInterna.nome }
          });

        this.listView_Site_Supervisor.gridUpdate(supervisor);
        this.listView_Site_Vigilante.gridUpdate(vigilante);

        this.showSpinner = false;
      });
  }

  onListView_Change(rowSelect?: rowSelect) {
    if (rowSelect.registro) {
      this.id = rowSelect.id;
    } else {
      if (rowSelect.exclude == "yes") {
        this.deleteSite = this.siteService.deleteSite(rowSelect.id)
          .subscribe(({ data }: delete_Site) => {
            if (data.reparticaoSite_Excluir.sucesso == true) {
              const find = { field: "id", value: rowSelect.id, type: "DEL" };
              this.update_Grid(find);

            } else {
              this.errosModalService.show(data.reparticaoSite_Excluir.mensagemTipo,
                                          data.reparticaoSite_Excluir.mensagem);
              const objeto = JSON.parse(data.reparticaoSite_Excluir.objeto);
              this.alertService.show(data.reparticaoSite_Excluir.mensagemTipo,
                                     data.reparticaoSite_Excluir.mensagem,
                                     objeto);
            }
          });
      }
    }
  }

  onListView_Filter(filterSelect: Item) {
    switch (filterSelect.text) {
      case "Nome":
        this.filter = { nome: { contains: filterSelect.value } };
        break;
      case "Observação":
        this.filter = { observacao: { contains: filterSelect.value } };
        break;
    }
    if (filterSelect.value != "nome" && filterSelect.value != "observacao") {
      this.update_Grid();
    }
  }

  update_Grid(find?: any, filter?: any) {
    this.siteService.orderBy = { nome: SortOperationKind.ASC };
    this.siteService.where = this.filter;

    this.readSites = this.siteService.read(true)
      .subscribe(({ reparticaoSite }: read_Site) => {
        this.actionbuttomService.enableButtons(0);
        this.treeviewService.siteBehavior.next(reparticaoSite.nodes);
        this.listView_Site.gridUpdate(reparticaoSite.nodes, find, filter);
      });
  }

  ngOnDestroy() {
    this.readSites?.unsubscribe();
    this.deleteSite?.unsubscribe();
    this.updateSite?.unsubscribe();
    this.createSite?.unsubscribe();
  }

  pessoaInternaModalSelect(pessoaSelect: PessoaInternaUsuario) {
    if(pessoaSelect != null) {
      if(this.tabsConfiguracao_Options.tabNameActive == "tabSupervisor") {
        const supervisores = (this.listView_Site_Supervisor.dataGridBehavior.value || []);
        supervisores.push(pessoaSelect);
        this.listView_Site_Supervisor.gridUpdate(supervisores);
      } else {
        const vigilantes = (this.listView_Site_Vigilante.dataGridBehavior.value || []);
        vigilantes.push(pessoaSelect);
        this.listView_Site_Vigilante.gridUpdate(vigilantes);
      }
    }
  }

  onlistViewTab_Change(rowSelect?: rowSelect) {
    if (rowSelect.registro) {
      this.pessoaId = rowSelect.registro.id;
    }
  }

  onSupervisor_Button_Click(type: any) {
    const supervisores = this.listView_Site_Supervisor.dataGridBehavior.value;
    switch (type) {
      case "insert":
        const pessoaLista: Array<number> = this.listView_Site_Supervisor.dataGridBehavior
          .value?.map(supervisor => {return supervisor.id});
        this.pessoaInternaModalService.show("Supervisor", pessoaLista);
        break;

      case "delete":
        const index = supervisores.findIndex(supervisor => supervisor.id == this.pessoaId);
        if (index >= 0) {
          supervisores.splice(index, 1);
          this.listView_Site_Supervisor.gridUpdate(supervisores);
        }
        break;
    }
  }

  onVigilante_Button_Click(type: any) {
    const vigilantes = this.listView_Site_Vigilante.dataGridBehavior.value;
    switch (type) {
      case "insert":
        const pessoaLista: Array<number> = this.listView_Site_Vigilante.dataGridBehavior
          .value?.map(supervisor => {return supervisor.id});
        this.pessoaInternaModalService.show("Vigilante", pessoaLista);
        break;

      case "delete":
        const index = vigilantes.findIndex(vigilante => vigilante.id == this.pessoaId)
        if (index >= 0) {
          vigilantes.splice(index, 1);
          this.listView_Site_Vigilante.gridUpdate(vigilantes)
        }
        break;
    }
  }

  onSave_Click() {
    this.nomeSite_Text.validated = (this.nomeSite_Text.text.length >= this.nomeSite_Text.minLength);

    if (!this.nomeSite_Text.validated) {
      this.alertService.show("ERRO",
        "Existem campos obrigatórios não preenchidos ou preenchidos de forma incorreta. Verifique!",
        null);
    } else {

      this.showSpinner = true;

      const supervisao: Supervisao[] = [... (this.listView_Site_Supervisor.dataGridBehavior.value?.map(supervisor => { return { tipo: 1, pessoaId: supervisor.id } }) || []),
      ... (this.listView_Site_Vigilante.dataGridBehavior.value?.map(vigilante => { return { tipo: 2, pessoaId: vigilante.id } }) || [])];

      const site: Site = {
        id: this.id,
        nome: this.nomeSite_Text.text,
        observacao: this.observacao_Text.text,
        supervisao: supervisao
      };

      if (site.id) {
        this.updateSite = this.siteService.updateSite(site)
          .subscribe(({ data }: update_Site) => {
            const objeto: any = JSON.parse(data.reparticaoSite_Alterar.objeto);
            if (data.reparticaoSite_Alterar.sucesso == true) {
              const find = { field: "id", value: objeto.Id }
              this.onClose_Click();
              this.update_Grid(find);
            } else {
              this.alertService.show(data.reparticaoSite_Alterar.mensagemTipo,
                                     data.reparticaoSite_Alterar.mensagem,
                                     objeto);
            }
            this.showSpinner = false;
          });
      } else {
        this.createSite = this.siteService.createSite(site)
          .subscribe(({ data }: create_Site) => {
            const objeto: any = JSON.parse(data.reparticaoSite_Inserir.objeto);
            if (data.reparticaoSite_Inserir.sucesso == true) {
              const find = { field: "id", value: objeto.Id };
              this.onClose_Click(false);
              this.update_Grid(find);
            } else {
              this.alertService.show(data.reparticaoSite_Inserir.mensagemTipo,
                data.reparticaoSite_Inserir.mensagem,
                objeto);
            }
            this.showSpinner = false;
          });
      }
    }
  }

  onResize() {
    const maxHeightSupervisor = document.getElementById(this.listView_Site_Vigilante.name)?.clientHeight - 212;
    const maxHeightVigilante = document.getElementById(this.listView_Site_Vigilante.name)?.clientHeight - 212;

    this.listView_Site_Supervisor.maxHeight = maxHeightSupervisor;
    this.listView_Site_Vigilante.maxHeight = maxHeightVigilante;
  }

  onClose_Click(hideForm: boolean = true) {
    this.nomeSite_Text.clear();
    this.observacao_Text.clear();
    this.listView_Site_Supervisor.clear();
    this.listView_Site_Vigilante.clear();
    if (hideForm == true) {
      this.actionbuttomService.hideForm()
      this.tabsConfiguracao_Options.select("tabSupervisor")
    } else {
      this.nomeSite_Text.focus();
      this.tabsConfiguracao_Options.select("tabSupervisor")
    }
  }

}