import { Component, OnDestroy, OnInit } from '@angular/core';

import { ListViewGrid, Find, Filter, rowSelect } from 'src/app/@theme/components/grid/list-view/service/list-view.service';
import { ActionButtomService } from 'src/app/@theme/components/grid/action-buttom/service/action-button.service';
import { OptionsGroup } from 'src/app/@theme/components/form/select-group/service/select-group.service';
import { ComboOptions, Item } from 'src/app/@theme/components/form/combobox/service/combobox.service';
import { InputLabel } from 'src/app/@theme/components/form/input-label/service/input-label.service'

import { AlertServiceComponent } from 'src/app/@theme/components/form/alert-card/service/alert-card.service';
import { SortOperationKind } from 'src/app/@core/api/generic-graphql';

import { EmpresaReparticao, 
         EmpresaReparticaoSort,
         EmpresaReparticaoData,
         create_EmpresaReparticao, 
         read_EmpresaReparticao, 
         update_EmpresaReparticao, 
         delete_EmpresaReparticao, 
         EmpresaReparticaoFilter } from 'src/app/@core/data/reparticao-empresa';

import { Classificacao, AbordagemTipo } from 'src/app/@core/enum';

import { TreeView } from 'src/app/@theme/layouts/treeview/service/treeview';
import { TreeviewService } from 'src/app/@theme/layouts/treeview/service/treeview.service';
import { EmpresaGrupoData, EmpresaGrupoFilter } from 'src/app/@core/data/grupo-empresa';
import { BehaviorSubject } from 'rxjs';
import { read_Site ,Site,SiteData } from 'src/app/@core/data/reparticao-site';
import { CardTabsOptions } from 'src/app/@theme/layouts/card-tabs/service/cart-tabs.service';
import { NavigationEnd, Router, RouterEvent } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'nex-empresa',
  templateUrl: './empresa.component.html',
  host: { '(window:resize)': 'onResize()' },
  styleUrls: ['./empresa.component.scss']
})

export class EmpresaReparticaoComponent implements OnInit, OnDestroy {
    
  id: number = 0;
  nome_Text: InputLabel = new InputLabel();
  gestor_Text: InputLabel = new InputLabel();
  telefone1_Text: InputLabel = new InputLabel();
  telefone2_Text: InputLabel = new InputLabel();
  email_Text: InputLabel = new InputLabel();
  observacao_Text: InputLabel = new InputLabel();

  editable: boolean;

  // PARTE DE DOCUMENTO
  razaoSocial_Text: InputLabel = new InputLabel();
  cnpj_Text: InputLabel = new InputLabel();
  ie_Text: InputLabel = new InputLabel();
  complemento1_Text: InputLabel = new InputLabel();
  complemento2_Text: InputLabel = new InputLabel();
  classificacao_Options: ComboOptions = new ComboOptions();

  // PARTE DE ENDEREÇO
  enderecoLogradouro_Text: InputLabel = new InputLabel();
  enderecoNumero_Text: InputLabel = new InputLabel();
  enderecoComplemento_Text: InputLabel = new InputLabel();
  enderecoBairro_Text: InputLabel = new InputLabel();
  enderecoCEP_Text: InputLabel = new InputLabel();
  enderecoCidade_Text: InputLabel = new InputLabel();
  enderecoEstado_Text: InputLabel = new InputLabel();
  enderecoPais_Text: InputLabel = new InputLabel();
  sites_Options: OptionsGroup = new OptionsGroup();

  listView_Empresa: ListViewGrid = new ListViewGrid();
  
  order_by: EmpresaReparticaoSort = { nome: SortOperationKind.ASC }
  filter: EmpresaReparticaoFilter;
  filterGrid: EmpresaReparticaoFilter;


  showSpinner: boolean = false;

  treeviewItem: BehaviorSubject<any>;
  cardTabs_Options: CardTabsOptions = new CardTabsOptions();

  empresaReparticao: EmpresaReparticao;

  alertService: AlertServiceComponent = new AlertServiceComponent();

  constructor(public actionbuttomService: ActionButtomService,
              private empresaReparticaoService: EmpresaReparticaoData,
              private empresaGrupoService: EmpresaGrupoData,
              private treeviewService: TreeviewService,
              private siteService: SiteData,
              private router: Router) {


    this.cardTabs_Options.add({id: 1, text: 'Cadastro', name: 'empresa'});
    this.cardTabs_Options.add({id: 2, text: 'Visibilidade', name: 'visibilidade'});

    this.cardTabs_Options.selectButtonByID(1);

    this.treeviewItem = this.treeviewService.itemSubject();

    this.actionbuttomService.relationGrid = "lstEmpresa";

    this.actionbuttomService.recurso = "1E";
    this.actionbuttomService.top_action_buttons = [{"id": 0, "text": "forms.buttons.create", "visibled": false, "enabled": true, "condition": "always", "maximized": true, "openForm": true,  "editable": "new",},
                                                   {"id": 1, "text": "forms.buttons.update", "visibled": false, "enabled": false, "condition": "select", "maximized": true, "openForm": true,  "editable": "yes",},
                                                   {"id": 2, "text": "forms.buttons.read", "visibled": false, "enabled": false, "condition": "select", "maximized": true, "openForm": true,  "editable": "no",},
                                                   {"id": 3, "text": "forms.buttons.delete", "visibled": false, "enabled": false, "condition": "multi",  "openForm": false, "question": "forms.questions.delete"}]
                                                   

    this.listView_Empresa.name  = "lstEmpresa";
    this.listView_Empresa.title = "Lista de Empresas";
    this.listView_Empresa.grid  = [{"header": "Nome",          "field": "nome",          "width": 21, "align": "left",},
                                   {"header": "Gestor",        "field": "gestor",        "width": 21, "align": "left"},
                                   {"header": "Telefone",      "field": "telefone1",     "width": 21, "align": "left"},
                                   {"header": "Email",         "field": "email",         "width": 27, "align": "left"},
                                   {"header": "Classificação", "field": "classificacao", "width": 10, "align": "center"}];

    this.nome_Text.name = "txtNome";
    this.nome_Text.maxLength = 20;
    this.nome_Text.minLength = 1;
    this.nome_Text.rules = "uppercase";

    this.gestor_Text.name = "txtGestor";
    this.gestor_Text.maxLength = 30;
    this.gestor_Text.rules = "uppercase";

    this.email_Text.name = "txtEmail";
    this.email_Text.maxLength = 50;    
    this.email_Text.rules = "email";
    this.email_Text.regex = "email";

    this.telefone1_Text.name = "txtTelefone1";
    this.telefone1_Text.maxLength = 15;
    this.telefone1_Text.rules = "onlynumbers";

    this.telefone2_Text.name = "txtTelefone2";
    this.telefone2_Text.maxLength = 15;
    this.telefone2_Text.rules = "onlynumbers";

    this.observacao_Text.name = "txtObservacao";
    this.observacao_Text.maxLength = 100;
    this.observacao_Text.rules = "uppercase";
    this.observacao_Text.regex = "noFilter";

    // PARTE DE DOCUMENTO
    this.razaoSocial_Text.name = "txtRazaoSocial";
    this.razaoSocial_Text.maxLength = 30;
    this.razaoSocial_Text.rules = "uppercase";

    this.cnpj_Text.name = "txtCNPJ";
    this.cnpj_Text.maxLength = 18;
    this.cnpj_Text.rules = "cnpj";
    this.cnpj_Text.regex = "noFilter";

    this.ie_Text.name = "txtIE";
    this.ie_Text.maxLength = 9;
    this.ie_Text.rules = "onlynumbers";

    this.complemento1_Text.name = "txtComplemento1";
    this.complemento1_Text.maxLength = 30;
    this.complemento1_Text.rules = "uppercase";

    this.complemento2_Text.name = "txtComplemento2";
    this.complemento2_Text.maxLength = 30;
    this.complemento2_Text.rules = "uppercase";

    this.classificacao_Options.name = "cbClassificacao";
    this.classificacao_Options.scrollFrom = 3;
    this.classificacao_Options.add("", null, Classificacao.vazio, true)
    this.classificacao_Options.add("1 - PÉSSIMA",             null, Classificacao.pessimo);
    this.classificacao_Options.add("2 - RUIM",          null, Classificacao.ruim);
    this.classificacao_Options.add("3 - BOA",              null, Classificacao.boa);
    this.classificacao_Options.add("4 - MUITO BOA",        null, Classificacao.muitoBoa);
    this.classificacao_Options.add("5 - EXCELENTE",        null, Classificacao.excelente);

    // PARTE DE ENDEREÇO
    this.enderecoLogradouro_Text.name = "txtEndereco";
    this.enderecoLogradouro_Text.maxLength = 30;
    this.enderecoLogradouro_Text.rules = "uppercase";

    this.enderecoNumero_Text.name = "txtNumero";
    this.enderecoNumero_Text.maxLength = 6;
    this.enderecoNumero_Text.rules = "onlynumbers";

    this.enderecoComplemento_Text.name = "txtComplemento";
    this.enderecoComplemento_Text.maxLength = 20;
    this.enderecoComplemento_Text.rules = "uppercase";

    this.enderecoBairro_Text.name = "txtBairro";
    this.enderecoBairro_Text.maxLength = 20;
    this.enderecoBairro_Text.rules = "uppercase";

    this.enderecoCEP_Text.name = "txtCEP";
    this.enderecoCEP_Text.maxLength = 9;
    this.enderecoCEP_Text.rules = "cep";

    this.enderecoCidade_Text.name = "txtCidade";
    this.enderecoCidade_Text.maxLength = 30;
    this.enderecoCidade_Text.rules = "uppercase";

    this.enderecoEstado_Text.name = "txtEstado";
    this.enderecoEstado_Text.maxLength = 20;
    this.enderecoEstado_Text.rules = "uppercase";

    this.enderecoPais_Text.name = "txtPais";
    this.enderecoPais_Text.maxLength = 20;
    this.enderecoPais_Text.rules = "uppercase";

    this.siteService.read()
      .subscribe(({ reparticaoSite }: read_Site) => {
          const nodes = reparticaoSite.nodes;
          nodes.forEach((site: Site) => {
            this.sites_Options.add(site.id, site.nome)
          })
      });

    const filterSite: EmpresaGrupoFilter = null;
    this.treeviewPopulate(filterSite);

    this.treeviewItem
      .subscribe((grupoId: string) => {
        if(grupoId != null) {
          this.filter = { grupoId: {eq: parseInt(grupoId) }};
          this.update_Grid(null, {select: "Nome", field: "nome", value: ""});
          this.actionbuttomService.top_action_buttons.forEach(topButton => {
            topButton.visibled = true;
          });
        }
      });
    
  }

  ngOnInit() {
    this.router.events
      .pipe(filter((event: RouterEvent) => event instanceof NavigationEnd))
        .subscribe(() => {

          this.update_Grid(null, {select: "Nome", field: "nome", value: ""});

        });
  }

  onActionButtom_Click(actionButtomSelect: any) {
    switch(actionButtomSelect.text) {
      case "forms.buttons.create": {
        this.id = undefined;
        this.editable = true;
        this.nome_Text.focus();
        break;
      }
      case "forms.buttons.update": {
        this.editable = true;
        this.updateDataLoad();
        this.nome_Text.focus(true);
        break;
      }
      case "forms.buttons.read": {
        this.editable = false;
        this.updateDataLoad();
        break;
      }
    }
  }

  updateDataLoad() {
    this.showSpinner = true;

    const filter: EmpresaReparticaoFilter = {id: {eq: this.id}};
    this.empresaReparticaoService.readEmpresaReparticaos(this.order_by, filter)
      .subscribe(({ reparticaoEmpresa }: read_EmpresaReparticao) => {
        this.empresaReparticao = reparticaoEmpresa.nodes[0];
        this.nome_Text.text = this.empresaReparticao.nome;

        this.gestor_Text.text = this.empresaReparticao.gestor;
        this.telefone1_Text.text = this.empresaReparticao.telefone1;
        this.telefone2_Text.text = this.empresaReparticao.telefone2;
        this.email_Text.text = this.empresaReparticao.email;
        this.observacao_Text.text = this.empresaReparticao.observacao;
        this.classificacao_Options.select(this.empresaReparticao.classificacao);

        this.razaoSocial_Text.text = this.empresaReparticao.razaoSocial;
        this.cnpj_Text.setTextWithMask(this.empresaReparticao.cnpj);
        this.ie_Text.text = this.empresaReparticao.ie;
        this.complemento1_Text.text = this.empresaReparticao.complemento1;
        this.complemento2_Text.text = this.empresaReparticao.complemento2;

        this.enderecoLogradouro_Text.text = this.empresaReparticao.enderecoLogradouro;
        this.enderecoNumero_Text.text = this.empresaReparticao.enderecoNumero;
        this.enderecoComplemento_Text.text = this.empresaReparticao.enderecoComplemento;
        this.enderecoBairro_Text.text = this.empresaReparticao.enderecoBairro;
        this.enderecoCEP_Text.text = this.empresaReparticao.enderecoCep;
        this.enderecoCidade_Text.text = this.empresaReparticao.enderecoCidade;
        this.enderecoEstado_Text.text = this.empresaReparticao.enderecoEstado;
        this.enderecoPais_Text.text = this.empresaReparticao.enderecoPais;

        this.empresaReparticao.sites.forEach((site: any) => {
          this.sites_Options.check(site.siteId);
        })
        
        this.showSpinner = false;
      });
  }

  onListView_Change(rowSelect?: rowSelect) {
    if(rowSelect.registro) {
      this.id = rowSelect.id;
    } else {
      if(rowSelect.exclude == "yes") {          
        this.empresaReparticaoService.deleteEmpresaReparticao(rowSelect.id)
        .subscribe(({ data }: delete_EmpresaReparticao)  => {
          if(data.reparticaoEmpresa_Excluir.sucesso == true) {
            const find = {field: "id", value: rowSelect.id, type: "DEL"}
            this.update_Grid(find)
            
          } else {
            const objeto = JSON.parse(data.reparticaoEmpresa_Excluir.objeto);
            this.alertService.show(data.reparticaoEmpresa_Excluir.mensagemTipo,
                                   data.reparticaoEmpresa_Excluir.mensagem,
                                   objeto);
          }
        })
      }
    }
  }

  onListView_Filter(filterSelect: Item) {
    switch (filterSelect.text) {
      case "Nome":
        this.filterGrid = {nome: {contains: filterSelect.value}};
        break;
      case "Gestor":
        this.filterGrid = {gestor: {contains: filterSelect.value}};
        break;  
      case "Telefone":
        this.filterGrid = {telefone1: {contains: filterSelect.value}};
        break;
      case "Email":
        this.filterGrid = {email: {contains: filterSelect.value}};
        break;
      case "Classificação":
        if(isNaN(parseInt(filterSelect.value)) == false ) {
          this.filterGrid = {classificacao: {eq: parseInt(filterSelect.value)}};
        }else {
          this.filterGrid = undefined;
        }
        break;
    }
    if(filterSelect.value != "nome" && 
       filterSelect.value != "gestor" &&
       filterSelect.value != "telefone1" && filterSelect.value != "email" && 
       filterSelect.value != "classificacao") {
        this.update_Grid();
    }
  }


  dataForm_Clean() {
    this.cardTabs_Options.selectButtonByID(1);
    this.nome_Text.focus();
  }
    
  onSave_Click() {
    this.nome_Text.validated = (this.nome_Text.text.length >= this.nome_Text.minLength);
    
    if(!this.nome_Text.validated) {
      this.alertService.show("ERRO",
                             "Existem campos obrigatórios não preenchidos ou preenchidos de forma incorreta. Verifique!",
                             null);
    }else if(this.sites_Options.count(true) == 0){
        this.cardTabs_Options.setCondition("visibilidade", AbordagemTipo.restritiva);
        this.alertService.show("ERRO",
                               "A visibilidade é obrigatória em pelo menos um site. Verifique na aba Visibilidade!",
                               null);
      } else {
     
      this.cardTabs_Options.setCondition("visibilidade", AbordagemTipo.nenhum);

      this.showSpinner = true;

      const empresaReparticao: EmpresaReparticao = { id: this.id,
                                                     grupoId: <number>this.filter.grupoId.eq,
                                                     nome: this.nome_Text.text,
                                                     gestor: this.gestor_Text.text,
                                                     telefone1: this.telefone1_Text.text,
                                                     telefone2: this.telefone2_Text.text,
                                                     email: this.email_Text.text,
                                                     observacao: this.observacao_Text.text,
                                                     razaoSocial: this.razaoSocial_Text.text,
                                                     cnpj: this.cnpj_Text.textMasked,
                                                     ie: this.ie_Text.text,
                                                     complemento1: this.complemento1_Text.text,
                                                     complemento2: this.complemento2_Text.text,
                                                     enderecoLogradouro: this.enderecoLogradouro_Text.text,
                                                     enderecoNumero: this.enderecoNumero_Text.text,
                                                     enderecoComplemento: this.enderecoComplemento_Text.text,
                                                     enderecoBairro: this.enderecoBairro_Text.text,
                                                     enderecoCep: this.enderecoCEP_Text.text,
                                                     enderecoCidade: this.enderecoCidade_Text.text,
                                                     enderecoEstado: this.enderecoEstado_Text.text,
                                                     enderecoPais: this.enderecoPais_Text.text,
                                                     classificacao: this.classificacao_Options.itemSelected.id,
                                                     sites: this.sites_Options.valueArray_All()}
      
      if(empresaReparticao.id) {
        this.empresaReparticaoService.updateEmpresaReparticao(empresaReparticao)
          .subscribe(({ data }: update_EmpresaReparticao)  => {
            const objeto: any = JSON.parse(data.reparticaoEmpresa_Alterar.objeto);
            if(data.reparticaoEmpresa_Alterar.sucesso == true) {
              const find = {field: "id", value: objeto.Id}
              this.onClose_Click();
              this.update_Grid(find);
            } else {
              this.alertService.show(data.reparticaoEmpresa_Alterar.mensagemTipo,
                                    data.reparticaoEmpresa_Alterar.mensagem,
                                    objeto);
            }
            this.showSpinner = false;
          })
      } else {
        this.empresaReparticaoService.createEmpresaReparticao(empresaReparticao)
        .subscribe(({ data }: create_EmpresaReparticao) => {
          const objeto: any = JSON.parse(data.reparticaoEmpresa_Inserir.objeto);
          if(data.reparticaoEmpresa_Inserir.sucesso == true) {
            const find = {field: "id", value: objeto.Id};
            this.onClose_Click(false);
            this.update_Grid(find);
            this.nome_Text.focus();
          } else {            
            this.alertService.show(data.reparticaoEmpresa_Inserir.mensagemTipo,
                                  data.reparticaoEmpresa_Inserir.mensagem,
                                  objeto);
          }
          this.showSpinner = false;
        })
      }
    }
  }

  onCardTabs_Click(cardSelected: any) {
    this.cardTabs_Options.selectCard = cardSelected;
  }

  update_Grid(find?: Find, filter?: Filter) {
    const filterGrid: EmpresaReparticaoFilter = {...this.filter, ...this.filterGrid};
    this.listView_Empresa.processingShow();
    this.empresaReparticaoService.readEmpresaReparticaos(this.order_by, filterGrid)
      .subscribe(({ reparticaoEmpresa }: read_EmpresaReparticao) => {
        this.actionbuttomService.enableButtons(0);
        this.listView_Empresa.gridUpdate(reparticaoEmpresa.nodes, find, filter);
      });
  }

  treeviewPopulate(filter: EmpresaGrupoFilter) {
    this.treeviewService.getTreeview()
      .subscribe((treeview: TreeView[]) => {  
          treeview[0].item = this.empresaGrupoService.getEmpresaGrupoTreeView(filter);
          this.treeviewService.setTreeview(treeview);
      });
   }

   onClose_Click(hideForm: boolean = true) {
    this.cardTabs_Options.selectButtonByID(1);
    this.nome_Text.clear();
    this.gestor_Text.clear();
    this.telefone1_Text.clear();
    this.telefone2_Text.clear();
    this.email_Text.clear();
    this.observacao_Text.clear();

    // parte de documento
    this.razaoSocial_Text.clear();
    this.cnpj_Text.clear();
    this.ie_Text.clear();
    this.complemento1_Text.clear();
    this.complemento2_Text.clear();
    this.classificacao_Options.select(Classificacao.vazio);

    // parte de endereço
    this.enderecoLogradouro_Text.clear();
    this.enderecoNumero_Text.clear();
    this.enderecoComplemento_Text.clear();
    this.enderecoBairro_Text.clear();
    this.enderecoCEP_Text.clear();
    this.enderecoCidade_Text.clear();
    this.enderecoEstado_Text.clear();
    this.enderecoPais_Text.clear();
    this.sites_Options.reset();
    setTimeout(() => {
    this.cardTabs_Options.setCondition("visibilidade", AbordagemTipo.nenhum);
    }, 300);
    
    if(hideForm == true) { 
      this.actionbuttomService.hideForm(true);
    } else {
      this.nome_Text.focus();
    }
  }

  onResize() {
    const maxHeightPanel = document.getElementById('empresaComponent_Panel')?.clientHeight;

    console.log(maxHeightPanel);
  }

  ngOnDestroy() {
    this.treeviewItem?.unsubscribe();
  }

}