import { Component } from '@angular/core';
import { Menu, MenuService, SubMenu } from 'src/app/@theme/layouts/menu/service/menu.service';
import { ListViewGrid, Find, Filter } from 'src/app/@theme/components/grid/list-view/service/list-view.service';
import { AlertServiceComponent } from 'src/app/@theme/components/form/alert-card/service/alert-card.service';
import { ActionButtomService } from 'src/app/@theme/components/grid/action-buttom/service/action-button.service';
import { Options, OptionsGroup } from 'src/app/@theme/components/form/select-group/service/select-group.service';
import { InputLabel } from 'src/app/@theme/components/form/input-label/service/input-label.service';
import { ComboOptions, Item } from '../../../../@theme/components/form/combobox/service/combobox.service';

import { SortOperationKind } from 'src/app/@core/api/generic-graphql';

import { create_NivelOperacao, 
         read_NivelOperacao, 
         update_NivelOperacao, 
         delete_NivelOperacao,
         NivelOperacaoData, 
         NivelOperacao,           
         NivelOperacaoSort,
         NivelOperacaoQuery,
         NivelOperacaoFilter, } from 'src/app/@core/data/operador-nivel-operacao';
import { Buttons, CardTabsOptions } from 'src/app/@theme/layouts/card-tabs/service/cart-tabs.service';
import { TreeView, Item as TreeviewItem, Operation } from 'src/app/@theme/layouts/treeview/service/treeview';
import { read_Site, Site, SiteData } from 'src/app/@core/data/reparticao-site';
import { ErrosModalService } from 'src/app/@theme/modals/erros/service/erros-modal.service';

@Component({
  selector: 'nex-nivel-operacao',
  templateUrl: './nivel-operacao.component.html',
  styleUrls: ['./nivel-operacao.component.scss']
})

export class NivelOperacaoComponent {
    
  id: number;  
  showSpinner: boolean = false;
  nomeOperador_Text: InputLabel = new InputLabel();
  sitePrivilegio_Options: ComboOptions = new ComboOptions();
  site_Options: OptionsGroup = new OptionsGroup();
  observacao_Text: InputLabel = new InputLabel();
  classificacao_Options: OptionsGroup = new OptionsGroup();
  conjunto_Options: OptionsGroup = new OptionsGroup();
  unidade_Options: OptionsGroup = new OptionsGroup();
  recurso_Options: OptionsGroup = new OptionsGroup();
  funcao_Options: OptionsGroup = new OptionsGroup();
  operacao_Options: OptionsGroup = new OptionsGroup();
  interface_Options: OptionsGroup = new OptionsGroup();

  cardTabs_Options: CardTabsOptions = new CardTabsOptions();

  order_by: NivelOperacaoSort = { nome: SortOperationKind.ASC };
  filter: Filter;

  listView_NivelOperacao: ListViewGrid = new ListViewGrid();

  recursos: SubMenu[];
  funcoes: TreeviewItem[];
  nivelOperacao: NivelOperacaoQuery;

  savedCondition: boolean = false;

  menuSelect: Menu[] = [];
  recursoSelect: SubMenu[] = [];
  funcaoSelect: TreeviewItem[] = [];
  operacaoSelect: Operation[] = [];
  privilegios: string;

  errosModalService: ErrosModalService = new ErrosModalService();

  alertService: AlertServiceComponent = new AlertServiceComponent();

  constructor(public actionbuttomService: ActionButtomService,
                     private menuService: MenuService,
            private nivelOperacaoService: NivelOperacaoData,
                  private siteReparticao: SiteData) {

    this.errosModalService.relationGrid = "lstSite";

    this.cardTabs_Options.add({id: 1, name: 'privilegio', text: 'Privilégio'});
    this.cardTabs_Options.add({id: 2, name: 'visibilidade', text: 'Visibilidade'});
    // this.cardTabs_Options.add({id: 3, text: 'Avançado', name: 'avancado'});
    this.cardTabs_Options.selectButtonByID(1);

    this.actionbuttomService.relationGrid = "lstOperador";

    this.actionbuttomService.recurso = "5";
    this.actionbuttomService.top_action_buttons = [{"id": 0, "text": "forms.buttons.create", "enabled": true,  "condition": "always", "openForm": true, "maximized": true, "editable": "new",},
                                                   {"id": 1, "text": "forms.buttons.update", "enabled": false, "condition": "select", "openForm": true, "maximized": true, "editable": "yes",},
                                                   {"id": 2, "text": "forms.buttons.read",   "enabled": false, "condition": "select", "openForm": true,  "maximized": true, "editable": "no",},
                                                   {"id": 3, "text": "forms.buttons.delete", "enabled": false, "condition": "multi",  "openForm": false, "question": "forms.questions.delete"}]
                                                   


    this.listView_NivelOperacao.name  = "lstOperador";
    this.listView_NivelOperacao.title = "Lista de Níveis de Operação";
    this.listView_NivelOperacao.grid = [{"header": "Nome", "field": "nome", "width": 25, "align": "left"},
                                        {"header": "Tipo", "value": "GLOBAL", "width": 20, "align": "left"},
                                        {"header": "Observação", "field": "observacao", "width": 55, "align": "left"}];

    this.nomeOperador_Text.name = "nomeOperador";
    this.nomeOperador_Text.maxLength = 20;
    this.nomeOperador_Text.minLength = 1;
    this.nomeOperador_Text.rules = "uppercase";

    this.sitePrivilegio_Options.name = "cbSites";
    this.sitePrivilegio_Options.add("NEXCODE", null, 0);

    this.site_Options.clear();
    this.siteReparticao.read()
      .subscribe(({reparticaoSite}: read_Site) => {
        const nodes: Site[] = reparticaoSite.nodes;
        nodes.forEach((site: Site) => {
          this.site_Options.add(site.id, site.nome, site.nome)
        })
      })

    this.observacao_Text.name = "observacao";
    this.observacao_Text.maxLength = 100;
    this.observacao_Text.rules = "uppercase";

    this.classificacao_Options.add(0, "Ignorar Justificativa na Liberação de Acesso Remoto",   "justificativaliberacaoremoto");
    this.classificacao_Options.add(1, "Ignorar Senha na Liberação de Acesso Remoto", "senhaliberacaoremoto");
    this.classificacao_Options.add(2, "Ignorar Justificativa no reconhecimento de Alarmes", "justificativareconhecimento");
    this.classificacao_Options.add(3, "Ignorar Senha no reconhecimento de Alarmes", "senhareconhecimento");
    
    this.conjunto_Options.add(0, "BLOCO 1",   "bloco1");
    this.conjunto_Options.add(1, "BLOCO 2",   "bloco2");

    this.unidade_Options.add(0, "ADMINISTRAÇÃO", "administracao");
    this.unidade_Options.add(1, "COMERCIAL", "comercial");
    this.unidade_Options.add(2, "SISTEMA", "sistema");
    this.unidade_Options.add(3, "TÉCNICO", "tecnico");

    this.interface_Options.add(0, "Permitir mudança de estilo de Interface",   "interface");

    const find: Find = null;
    const filter: Filter = null;
    this.update_Grid(find, filter);
  }

  onActionButtom_Click(actionButtomSelect: any) {
    this.savedCondition = false;
    switch(actionButtomSelect.text) {
      case "forms.buttons.create": {
        this.id = undefined;
        this.nomeOperador_Text.focus();
        this.menuPopulate(false);
        this.menuService.menuSelect(1);
        break;
      }
      case "forms.buttons.update": {
        this.updateDataLoad();
        this.nomeOperador_Text.focus(true);
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

    const filter: NivelOperacaoFilter = {id: {eq: this.id}};
    this.nivelOperacaoService.readNivelOperacao(this.order_by, filter)
      .subscribe(({ operadorNivelOperacao }: read_NivelOperacao) => {

        const nivelOperacao: NivelOperacaoQuery = operadorNivelOperacao.nodes[0];
        this.nivelOperacao = nivelOperacao;  

        this.nomeOperador_Text.text = nivelOperacao.nome;
        this.observacao_Text.text = nivelOperacao.observacao;
        this.classificacao_Options.populate(nivelOperacao);
        this.privilegios = (nivelOperacao.privilegios?.length == 105)? 
                            nivelOperacao.privilegios:
                            "0".repeat(105);

        this.site_Options.reset();
        nivelOperacao.nivelOperacaoEx.forEach(site => {
          this.site_Options.check(site.siteId);
        });
        // this.site_Options.populate(nivelOperacao.sites);
        this.menuPopulate(true);

        this.menuService.menuSelect(1);

        this.onSaved_Condition();
        this.showSpinner = false;
      });
  }

  onListView_Change(rowSelect?: any) {
    if(rowSelect.registro) {
      this.id = rowSelect.registro.id;
    } else {      
      if(rowSelect.exclude == "yes") {          
        this.nivelOperacaoService.deleteNivelOperacao(rowSelect.id)
          .subscribe(({ data }: delete_NivelOperacao)  => {
            if(data.operadorNivelOperacao_Excluir.sucesso == true) {
              const find = {field: "id", value: rowSelect.id, type: "DEL"}
              this.update_Grid(find);
            } else {
              this.errosModalService.show(data.operadorNivelOperacao_Excluir.mensagemTipo,
                                          data.operadorNivelOperacao_Excluir.mensagem)
            }
          });
      }
    }
  }

  onCardTabs_Click(cardSelected: Buttons) {
    this.cardTabs_Options.selectButtonByID(cardSelected.id);
  }
  
  onFuncaoOptions_Change(funcaoSelected: SubMenu) {
    const index: number = this.funcaoSelect.findIndex((funcao: TreeviewItem) => funcao.id == funcaoSelected.id);

    if(index >= 0) {
      this.funcaoSelect[index].checked = funcaoSelected.checked;
    }
  }

  onFuncaoOptions_Select(id: any) {
    this.operacao_Options.clear();
    this.operacaoSelect.filter((operacao: Operation) => operacao.itemId == id)
      .forEach((operacao: Operation) => {
        this.operacao_Options.add(operacao.id, operacao.text, operacao.itemId, operacao.checked, false, false);
        this.onOperacaoOptions_Change({id: operacao.id, text: operacao.text, alias: operacao.itemId, checked: operacao.checked});
      })
    
    this.operacao_Options.select(this.operacao_Options.itens[0]?.id);
  }

  onMenuItem_Click(menuId: any) {
    this.recurso_Options.clear();
    this.recursoSelect.filter((recurso: SubMenu) => recurso.menuId == menuId)
      .forEach((recurso: SubMenu) => {
        this.recurso_Options.add(recurso.id, recurso.text.toUpperCase(), null, recurso.checked, true, false);
        this.recurso_Options.itemIndeterminate(recurso.id, recurso.indetermined);
        this.onRecursoOptions_Select(recurso.id);
      })

    this.recurso_Options.select(this.recurso_Options.itens[0]?.id);
    this.onRecursoOptions_Select(this.recurso_Options.itens[0]?.id);
  }

  onOperacaoOptions_Change(operacaoSelected: Options) {
    const index: number = this.operacaoSelect.findIndex(
      (operacao: Operation) => operacao.id == operacaoSelected.id &&
                               operacao.itemId == operacaoSelected.alias);
    
    if(index >= 0) {
      this.operacaoSelect[index].checked = operacaoSelected.checked;
      const posPriv: number = this.nivelOperacaoService.nivelPos(this.operacaoSelect[index].itemId);      
      const indexFuncao: number = this.funcaoSelect.findIndex(
            (funcao: TreeviewItem) => funcao.id == this.operacaoSelect[index].itemId);

      if(operacaoSelected.alias == "b16b3az464" && operacaoSelected.id == 0 &&
        operacaoSelected.checked == true) {
        this.operacao_Options.check(1);
      }

      if(operacaoSelected.alias == "b16b3az464" && operacaoSelected.id == 1 &&
        operacaoSelected.checked == false) {
        this.operacao_Options.uncheck(0);
      }

      if(operacaoSelected.alias == "ba309b{66f" && operacaoSelected.id == 0 &&
        operacaoSelected.checked == true) {
        this.operacao_Options.check(1);
      }

      if(operacaoSelected.alias == "ba309b{66f" && operacaoSelected.id == 1 &&
        operacaoSelected.checked == false) {
        this.operacao_Options.uncheck(0);
      }

      if(operacaoSelected.alias == "a8ea17|4ca" && operacaoSelected.id == 0 &&
        operacaoSelected.checked == true) {
        this.operacao_Options.check(1);
      }

      if(operacaoSelected.alias == "a8ea17|4ca" && operacaoSelected.id == 1 &&
        operacaoSelected.checked == false) {
        this.operacao_Options.uncheck(0);
      }

      this.funcao_Options.itemIndeterminate(this.operacaoSelect[index].itemId, 
        this.operacao_Options.indeterminate);

      if(this.operacao_Options.selectAll_Options.checked) {
        this.funcao_Options.check(this.operacaoSelect[index].itemId);
      } else {
        this.funcao_Options.uncheck(this.operacaoSelect[index].itemId);
      }

      this.recurso_Options.itemIndeterminate(this.funcaoSelect[indexFuncao].treeViewId, 
                                             this.funcao_Options.indeterminate);

      if(this.funcao_Options.selectAll_Options.checked) {
        this.recurso_Options.check(this.funcaoSelect[indexFuncao].treeViewId);
      } else {
        this.recurso_Options.uncheck(this.funcaoSelect[indexFuncao].treeViewId);
      }

      const operLength: number = (this.operacao_Options.itens.length > 4)? 2: 1;
      this.privilegios =  this.nivelOperacaoService
                              .setPrivilegio(this.operacao_Options.valueHEXOf_All(operLength), 
                                             posPriv, 
                                             this.privilegios);

      this.onSaved_Condition();
    }
  }

  onRecursoOptions_Change(recursoSelected: SubMenu) {
    const index: number = this.recursoSelect.findIndex((recurso: SubMenu) => recurso.id == recursoSelected.id);
    if(index >= 0) {
      this.recursoSelect[index].checked = recursoSelected.checked;
    }
  }

  onRecursoOptions_Select(id: any) {
    this.funcao_Options.clear();
    this.funcaoSelect.filter((funcao: TreeviewItem) => funcao.treeViewId == id)
      .forEach((funcao: TreeviewItem) => {
        this.funcao_Options.add(funcao.id, funcao.text.toUpperCase(), null, funcao.checked, true, false);
        this.funcao_Options.itemIndeterminate(funcao.id, funcao.indetermined);
        this.onFuncaoOptions_Select(funcao.id);
      })

    this.funcao_Options.select(this.funcao_Options.itens[0]?.id);
    this.onFuncaoOptions_Select(this.funcao_Options.itens[0]?.id);
  }

  onSave_Click() {
    this.nomeOperador_Text.validated = (this.nomeOperador_Text.text.length >= this.nomeOperador_Text.minLength);

    if(!this.nomeOperador_Text.validated) {
      this.alertService.show("ERRO",
                              "Existem campos obrigatórios não preenchidos ou preenchidos de forma incorreta. Verifique!",
                              null);
    }
  
    if(this.savedCondition == true) {

      this.savedCondition = false;
      this.showSpinner = true;

      const nivelOperacao: NivelOperacao = { id: this.id,
                                             nome: this.nomeOperador_Text.text,
                                             observacao: this.observacao_Text.text,
                                             privilegios: this.privilegios,
                                             nivelOperacaoEx: this.site_Options.valueArray_All(),
                                             siteId: 0 }
      if(nivelOperacao.id) {
        this.nivelOperacaoService.updateNivelOperacao(nivelOperacao)
          .subscribe(({ data }: update_NivelOperacao)  => {
            const objeto: any = JSON.parse(data.operadorNivelOperacao_Alterar.objeto);
            if(data.operadorNivelOperacao_Alterar.sucesso == true) {
              const find = {field: "id", value: objeto.Id}
              this.onClose_Click();
              this.update_Grid(find);
            } else {
              this.alertService.show(data.operadorNivelOperacao_Alterar.mensagemTipo,
                                     data.operadorNivelOperacao_Alterar.mensagem,
                                     objeto);
            }
            this.showSpinner = false;
          })
      } else {
        this.nivelOperacaoService.createNivelOperacao(nivelOperacao)
          .subscribe(({ data }: create_NivelOperacao) => {
            const objeto: any = JSON.parse(data.operadorNivelOperacao_Inserir.objeto);
            if(data.operadorNivelOperacao_Inserir.sucesso == true) {
              const find = {field: "id", value: objeto.Id};
              this.onClose_Click(false);
              this.update_Grid(find);
            } else {            
              this.alertService.show(data.operadorNivelOperacao_Inserir.mensagemTipo,
                                     data.operadorNivelOperacao_Inserir.mensagem,
                                     objeto);
            }
            this.showSpinner = false;
          })
      }
    }
  }

  onSaved_Condition() {
    this.savedCondition = this.nomeOperador_Text.text.length >= this.nomeOperador_Text.minLength;
  }

  update_Grid(find?: Find, filter?: Filter) {
    this.listView_NivelOperacao.processingShow();
    this.nivelOperacaoService.readNivelOperacao(this.order_by)
      .subscribe(({ operadorNivelOperacao }: read_NivelOperacao) => {
        this.actionbuttomService.enableButtons(0);
        this.listView_NivelOperacao.gridUpdate(operadorNivelOperacao.nodes, find, filter);
      });
  }

  menuPopulate(check: boolean) {

    this.menuSelect = [];
    this.recursoSelect = [];
    this.operacaoSelect = [];
    this.funcaoSelect = [];

    this.menuService.getMenu()
      .subscribe((result: Menu[]) => {    
        const menuFilter = result.filter(menu => menu.visible == true && 
                                                 menu.enable == true &&
                                                 menu.solucaoIntegrada == undefined)
        menuFilter.forEach((menu: Menu) => {
          this.menuSelect.push({id: menu.id, menu: menu.menu, icon: menu.icon});

          menu.submenu
            .filter((submenu: SubMenu) => submenu.solucaoIntegrada == undefined &&
                                          submenu.enable == true &&
                                          submenu.visible == true)
              .forEach((submenu: SubMenu) => {

                submenu.treeview
                  .filter((treeview: TreeView) => treeview.solucaoIntegrada == undefined)
                    .forEach((treeview: TreeView) => {
                      if(treeview.item) {
                        const item = treeview.item.filter((item: TreeviewItem) => item.isFunction == true && item.adminAccess != true);
                        if(item.length > 0) {
                          item.forEach((item: TreeviewItem) => {                                                        
                            item.operation.forEach((operation: Operation) => {
                              operation.itemId = item.id;
                              operation.checked = (!check)? false: this.nivelOperacaoService.checkNivelOperacao(item.id, operation.id, this.privilegios);
                              this.operacaoSelect.push({id: operation.id, itemId: item.id, text: operation.text, checked: operation.checked});
                            });
                            const operationSelectAll: number = this.operationSelectAll(item.operation);
                            this.funcaoSelect.push({id: item.id, 
                                            treeViewId: submenu.id, 
                                                  text: item.text, 
                                               checked: operationSelectAll > 0,
                                          indetermined: operationSelectAll < 0});
                          });
                        } else {
                          treeview.operation.forEach((operation: Operation) => {
                            operation.checked = (!check)? false: this.nivelOperacaoService.checkNivelOperacao(treeview.id, operation.id, this.privilegios);
                            this.operacaoSelect.push({id: operation.id, itemId: treeview.id, text: operation.text, checked: operation.checked});
                          });
                          const operationSelectAll: number = this.operationSelectAll(treeview.operation);
                          this.funcaoSelect.push({id: treeview.id,
                                          treeViewId: submenu.id,
                                                text: treeview.text,
                                             checked: operationSelectAll > 0,
                                        indetermined: operationSelectAll < 0});
                        }
                      } else {
                        treeview.operation?.forEach((operation: Operation) => {
                          operation.checked = (!check)? false: this.nivelOperacaoService.checkNivelOperacao(treeview.id, operation.id, this.privilegios);
                          this.operacaoSelect.push({id: operation.id, itemId: treeview.id, text: operation.text, checked: operation.checked});
                        });
                        const operationSelectAll: number = this.operationSelectAll(treeview.operation);
                        this.funcaoSelect.push({id: treeview.id,
                                        treeViewId: submenu.id,
                                              text: treeview.text,
                                           checked: operationSelectAll > 0,
                                      indetermined: operationSelectAll < 0});  
                      }
                  });
                const funcaoSelect: TreeviewItem[] = this.funcaoSelect.filter((funcao: TreeviewItem) => funcao.treeViewId == submenu.id); 
                const operationSelectAll: number = this.operationSelectAll(funcaoSelect);
                this.recursoSelect.push({id: submenu.id,
                                     menuId: menu.id,
                                       text: submenu.text,
                                    checked: operationSelectAll > 0,
                               indetermined: operationSelectAll < 0});

              });
        })
      })
  }

  operationSelectAll(itens: Operation[]): number  {
    const itemCheked: Operation[] = itens.filter((item: Operation) => item.checked == true);
    if(itemCheked.length == 0) return 0;
    if(itemCheked.length == itens.length) return 1;
    if(itemCheked.length != itens.length) return -1;
    return -1;
  }

  onClose_Click(hideForm: boolean = true) {

    this.nomeOperador_Text.clear();
    this.observacao_Text.clear();

    this.sitePrivilegio_Options.clearSelect();
    
    this.site_Options.reset();
    this.conjunto_Options.reset();
    this.unidade_Options.reset();

    this.classificacao_Options.reset();

    this.recurso_Options.reset();
    this.funcao_Options.reset();
    this.operacao_Options.reset();

    this.interface_Options.reset();

    this.menuPopulate(false);

    if(hideForm == true) {
      this.actionbuttomService.hideForm(true);
      this.cardTabs_Options.selectButtonByID(1);
    } else {
      this.nomeOperador_Text.focus();
      this.onSaved_Condition();
    }

  }

}
