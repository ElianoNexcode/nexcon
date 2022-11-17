import { Component, OnDestroy } from '@angular/core';
import { ListViewGrid, Find, Filter } from 'src/app/@theme/components/grid/list-view/service/list-view.service';
import { AlertServiceComponent } from 'src/app/@theme/components/form/alert-card/service/alert-card.service';
import { ActionButtomService } from 'src/app/@theme/components/grid/action-buttom/service/action-button.service';
import { InputLabel } from 'src/app/@theme/components/form/input-label/service/input-label.service';
import { TextareaLabel } from '../../../../@theme/components/form/textarea-label/service/textarea-label.service';
import { ComboOptions, Item } from '../../../../@theme/components/form/combobox/service/combobox.service';
import { RadioOptions } from 'src/app/@theme/components/form/radio/service/radio.service';
import { PessoaInternaModalService } from 'src/app/@theme/modals/pessoa-interna/service/pessoa-modal.service';
import { SortOperationKind } from 'src/app/@core/api/generic-graphql';
import {
  create_OperadorConfiguracao,
  read_OperadorConfiguracao,
  update_OperadorConfiguracao,
  delete_OperadorConfiguracao,
  OperadorConfiguracaoData,
  OperadorConfiguracao,
  OperadorConfiguracaoSort,
  OperadorConfiguracaoFilter
} from 'src/app/@core/data/configuracao-operador-operador';
import { TabsService } from 'src/app/@theme/layouts/tabs/service/tabs.service';
import { DateFormated, DateOperator } from 'src/app/@theme/components/miscellaneous/date-operator/date-operator';
import {
  NivelOperacaoData,
  NivelOperacaoFilter,
  NivelOperacaoQuery,
  NivelOperacaoSort,
  Operador,
  read_NivelOperacao
} from 'src/app/@core/data/operador-nivel-operacao';
import { ConfigStorage } from 'src/app/@core/storage/config/config';
import { BoxPanel } from 'src/app/@theme/layouts';
import { BehaviorSubject } from 'rxjs';
import { TreeviewService } from 'src/app/@theme/layouts/treeview/service/treeview.service';
import { TreeView } from 'src/app/@theme/layouts/treeview/service/treeview';
import {
  AmbienteData,
  AmbienteSistema,
  read_AmbienteSistema
} from 'src/app/@core/data/sistema-ambiente';
import { SistemaConfig } from 'src/app/@core/storage/config/config';
import { State, StatusColor } from 'src/app/@core/enum';
import { PessoaInternaUsuario } from 'src/app/@core/data/usuario-pessoa-interna';

@Component({
  selector: 'nex-operador-configuracao',
  templateUrl: './operador-configuracao.component.html',
  styleUrls: ['./operador-configuracao.component.scss']
})

export class OperadorConfiguracaoComponent implements OnDestroy {

  pessoaInternaModalService: PessoaInternaModalService = new PessoaInternaModalService();
  nivelOperacao_Options: ComboOptions = new ComboOptions();
  login_Text: InputLabel = new InputLabel();
  senha_Text: InputLabel = new InputLabel();
  observacao_Text: TextareaLabel = new TextareaLabel();
  status_Options: RadioOptions = new RadioOptions;
  operadorConfiguracao: OperadorConfiguracao;
  cadastro_Text: InputLabel = new InputLabel();

  tabConfiguracao: TabsService = new TabsService();

  listView_Operador: ListViewGrid = new ListViewGrid();

  filter: OperadorConfiguracaoFilter;
  filterGrid: OperadorConfiguracaoFilter;
  order_by: OperadorConfiguracaoSort = { operadorPessoa: { nome: SortOperationKind.ASC } }

  savedCondition: boolean = true;

  operadorPessoaId: number = 0;
  imagemOperador: string;
  nomeOperador: string;
  cargoOperador: string;
  emailOperador: string;

  operadorSenha: string = "";

  treeviewItem: BehaviorSubject<any>;

  boxButton: BoxPanel = new BoxPanel();

  loginDigitos: number = 6;
  loginSenhaDigitos: number = 6;
  loginSenhaCaracter: number = 0;

  alertService: AlertServiceComponent = new AlertServiceComponent();
  showSpinner: boolean = false;

  editable: boolean;

  constructor(public actionbuttomService: ActionButtomService,
    private operadorConfiguracaoService: OperadorConfiguracaoData,
    private nivelOperacaoService: NivelOperacaoData,
    private ambienteService: AmbienteData,
    private dateOperador: DateOperator,
    private treeviewService: TreeviewService,
    private config: ConfigStorage) {

    const nexconStorage = JSON.parse(localStorage.getItem("nexcon"));
    const sessionStorage: SistemaConfig = nexconStorage?.sistema;

    this.tabConfiguracao.add("tabLogin", "Login", true, "block");
    this.tabConfiguracao.add("tabObservacao", "Observação", false, "block");

    this.boxButton.add("btOpen", "open", true);

    this.ambienteService.readAmbienteSistema()
      .subscribe(({ sistemaConfiguracao }: read_AmbienteSistema) => {
        const sistemaAmbienteNodes: AmbienteSistema = sistemaConfiguracao.nodes[0];
        this.loginDigitos = parseInt(sistemaAmbienteNodes.loginDigitos);
        this.loginSenhaDigitos = parseInt(sistemaAmbienteNodes.loginSenhaDigitos);
        this.loginSenhaCaracter = sistemaAmbienteNodes.loginSenhaCaracter;
      });

    this.treeviewItem = this.treeviewService.itemSubject();

    this.actionbuttomService.relationGrid = "lstOperador";

    this.actionbuttomService.recurso = "6";
    this.actionbuttomService.top_action_buttons = [
      { "id": 0, "text": "forms.buttons.create", "enabled": true, visibled: false, "condition": "always", "openForm": true, "editable": "new", },
      { "id": 1, "text": "forms.buttons.update", "enabled": false, visibled: false, "condition": "select", "openForm": true, "editable": "yes", },
      { "id": 2, "text": "forms.buttons.read", "enabled": false, visibled: false, "condition": "select", "openForm": true, "editable": "no", },
      { "id": 3, "text": "forms.buttons.delete", "enabled": false, visibled: false, "condition": "multi", "openForm": false, "question": "forms.questions.delete" }];


    this.listView_Operador.name = "lstOperador";
    this.listView_Operador.title = "Lista de Operadores";
    this.listView_Operador.colorEnum = StatusColor;
    this.listView_Operador.grid = [
      { "header": "", "entity": "imagem", "field": "imagem", "width": 3, "align": "center", "type": "image" },
      { "header": "Operador", "field": "nome", "width": 30, "align": "left" },
      { "header": "Site", "field": "site", "width": 20, "align": "left" },
      { "header": "Setor", "field": "setor", "width": 20, "align": "left" },
      { "header": "Área", "field": "area", "width": 20, "align": "left" },
      { "header": "Status", "field": "status", "width": 10, "align": "left", "enum": State }];

    this.pessoaInternaModalService.name = "pessoaInternaModal";
    this.pessoaInternaModalService.pesquisaPessoa_Option.name = "cbPesquisaPessoaInterna";

    this.pessoaInternaModalService.grid = [
      { "header": "Nome", "field": "nome", "width": 60, "align": "left" },
      { "header": "Área", "entity": "area", "field": "nome", "width": 40, "align": "left" }];

    this.login_Text.name = "txtLogin";
    this.login_Text.maxLength = 20;
    this.login_Text.minLength = this.loginDigitos;
    this.login_Text.rules = "uppercase";

    this.senha_Text.name = "txtSenha";
    this.senha_Text.maxLength = 20;
    this.senha_Text.minLength = 1;
    this.senha_Text.type = "password";
    this.senha_Text.regex = "noFilter"

    this.nivelOperacao_Options.name = "cbNivel";

    const nivelOperacaoFilter: NivelOperacaoFilter = null;
    const nivelOperacaoSort: NivelOperacaoSort = { nome: SortOperationKind.ASC };

    this.nivelOperacao_Options.clear();
    this.nivelOperacaoService.readNivelOperacao(nivelOperacaoSort, nivelOperacaoFilter)
      .subscribe(({ operadorNivelOperacao }: read_NivelOperacao) => {
        const nodes: NivelOperacaoQuery[] = operadorNivelOperacao.nodes;
        nodes.forEach((nivelOperacao: NivelOperacaoQuery) => {
          this.nivelOperacao_Options.add(nivelOperacao.nome, nivelOperacao.nome, nivelOperacao.id);
        })
      })

    this.observacao_Text.name = "txtObservacao";
    this.observacao_Text.maxLength = 100;
    this.observacao_Text.minLength = 0;

    this.cadastro_Text.name = "txtCadastro";
    this.cadastro_Text.rules = "uppercase";
    this.cadastro_Text.disable();

    this.status_Options.add(1, "Liberado", "liberado", true);
    this.status_Options.add(0, "Bloqueado", "bloqueado");

    const filterNivel: NivelOperacaoFilter = null;

    this.treeviewPopulate(filterNivel);

    this.treeviewItem
      .subscribe((nivelOperacaoId: string) => {
        if (nivelOperacaoId != null) {

          if (!this.filter) {
            this.actionbuttomService.top_action_buttons.forEach(topButton => {
              topButton.visibled = true;
            })
          }

          this.filter = { nivelOperacaoId: { eq: parseInt(nivelOperacaoId) } };
          this.update_Grid();
        }
      });
  }

  onActionButtom_Click(actionButtomSelect: any) {
    switch (actionButtomSelect.text) {
      case "forms.buttons.create":
        this.boxButton.enable("btOpen");
        this.nivelOperacao_Options.select(<number>this.filter.nivelOperacaoId.eq);
        this.login_Text.focus();
        this.editable = true;
        break;

      case "forms.buttons.update":
        this.onListView_Change({ registr: this.operadorConfiguracao });
        this.updateDataLoad();
        this.login_Text.focus(true);
        this.editable = true;
        break;

      case "forms.buttons.read":
        this.onListView_Change({ registr: this.operadorConfiguracao });
        this.updateDataLoad();
        this.editable = false;
        break;

    }
  }

  onButton_Click(type: any) {
    switch (type) {
      case "open":
        this.pessoaInternaModalService.show("Operador");
        break;
    }
  }

  onStatus_Change(event: any) { }

  updateDataLoad() {
    this.showSpinner = true;

    const filter: OperadorConfiguracaoFilter = { login: { eq: this.operadorConfiguracao.login } };
    this.operadorConfiguracaoService.readOperadorConfiguracaos(this.order_by, filter)
      .subscribe(({ operador }: read_OperadorConfiguracao) => {
        this.operadorConfiguracao = operador.nodes[0];
        this.imagemOperador = this.config.converteImagemBase64(this.operadorConfiguracao?.operadorPessoa?.imagem?.imagem);
        this.nomeOperador = this.operadorConfiguracao?.operadorPessoa.nome;
        this.cargoOperador = this.operadorConfiguracao?.operadorPessoa.cargo;
        this.emailOperador = this.operadorConfiguracao?.operadorPessoa.email;
        this.operadorPessoaId = this.operadorConfiguracao.operadorPessoaId;
        this.nivelOperacao_Options.select(this.operadorConfiguracao.nivelOperacaoId);
        this.login_Text.text = this.operadorConfiguracao.login;
        this.senha_Text.text = "@@@@@@@@@";
        this.operadorSenha = this.operadorConfiguracao.senha;
        this.observacao_Text.text = this.operadorConfiguracao.observacao;
        this.status_Options.select(this.operadorConfiguracao.status ? 1 : 0);
        const CadastroData: DateFormated = this.dateOperador.formatDate(this.operadorConfiguracao.cadastroData?.toString(), true);
        this.cadastro_Text.text = CadastroData.dateLocale + " " + CadastroData.timeFormated;


        this.showSpinner = false;
      });

  }


  onListView_Change(rowSelect?: any) {

    if (rowSelect.registro) {
      const operadorConfiguracao: OperadorConfiguracao = rowSelect.registro;
      this.operadorConfiguracao = operadorConfiguracao;
    } else {
      if (rowSelect.exclude == "yes") {
        this.operadorConfiguracaoService.deleteOperadorConfiguracao(this.operadorConfiguracao.operadorPessoaId)
          .subscribe(({ data }: delete_OperadorConfiguracao) => {
            if (data.operador_Excluir.sucesso == true) {
              const find: Find = { field: "operadorPessoaId", value: this.operadorConfiguracao.operadorPessoaId, type: "DEL" }
              this.update_Grid(find)
            } else {
              const objeto = null;
              this.alertService.show(data.operador_Excluir.mensagemTipo,
                data.operador_Excluir.mensagem,
                objeto);
            }
          })
      }
    }
  }

  onSenha_change(senha: InputLabel) {
    if (senha.text.indexOf("@@@@@@@@@") >= 0) {
      senha.text.replace("@@@@@@@@@", this.operadorSenha)
    }
    this.operadorSenha = senha.text;
    this.onSaved_Condition();
  }

  onSaved_Condition() {
    this.savedCondition = this.operadorPessoaId > 0 &&
      this.login_Text.text.length >= this.loginDigitos &&
      this.operadorSenha.length >= this.loginSenhaDigitos;
  }

  onSave_Click() {
    var regexNumber = /(?=(?:.*?[0-9]){1})/
    var regexSpecial = /(?=(?:.*?[!@#$%*()_+^&}{:;?.]){1})(?!.*\s)[!@#;$%*(){}_+^&]/

    if (this.operadorPessoaId == 0) {
      this.alertService.show("ADVERTENCIA",
        "Não foi possível salvar este registro. Operador não foi informado!",
        null);
      return;
    } else {
      if (this.login_Text.text.length < this.loginDigitos) {
        this.alertService.show("ADVERTENCIA",
          "Não foi possível salvar este registro. Login deve conter pelo menos " + this.loginDigitos.toString() + " caracteres!",
          null);
        return;
      } else {
        if (this.operadorSenha.length < this.loginSenhaDigitos) {
          this.alertService.show("ADVERTENCIA",
            "Não foi possível salvar este cadastro. Senha deve conter pelo menos " + this.loginSenhaDigitos.toString() + " caracteres!",
            null);
          return;
        } else {
          if ((1 & this.loginSenhaCaracter) && regexNumber.exec(this.operadorSenha) == null) {
            this.alertService.show("ADVERTENCIA",
              "Não foi possível salvar o cadastro. Senha deve conter pelo menos um caracter numérico!",
              null);
            return;
          } else {
            if ((2 & this.loginSenhaCaracter) && regexSpecial.exec(this.operadorSenha) == null) {
              this.alertService.show("ADVERTENCIA",
                "Não foi possível salvar o cadastro. Senha deve conter pelo menos um caracter especial!",
                null);
              return;
            }
          }
        }
      }
    }

    if (this.savedCondition) {
      const operadorConfiguracao: OperadorConfiguracao = {
        interfaceDefinida: 1,
        operadorPessoaId: this.operadorPessoaId,

        nivelOperacaoId: this.nivelOperacao_Options.itemSelected.id,
        login: this.login_Text.text,
        senha: this.operadorSenha,
        observacao: this.observacao_Text.text,
        status: this.status_Options.itemSelected.id == 1 ? true : false
      };

      if (this.cadastro_Text.text.length > 0) {
        this.operadorConfiguracaoService.updateOperadorConfiguracao(operadorConfiguracao)
          .subscribe(({ data }: update_OperadorConfiguracao) => {
            const objeto: any = JSON.parse(data.operador_Alterar.objeto);
            if (data.operador_Alterar.sucesso == true) {
              const find = { field: "operadorPessoaId", value: objeto.operadorPessoaId }
              this.onClose_Click();
              this.update_Grid(find);
            } else {
              this.alertService.show(data.operador_Alterar.mensagemTipo,
                data.operador_Alterar.mensagem,
                objeto);
            }
          })
      } else {
        this.operadorConfiguracaoService.createOperadorConfiguracao(operadorConfiguracao)
          .subscribe(({ data }: create_OperadorConfiguracao) => {
            const objeto: any = JSON.parse(data.operador_Inserir.objeto);
            if (data.operador_Inserir.sucesso == true) {
              const find = { field: "operadorPessoaId", value: objeto.operadorPessoaId };
              this.onClose_Click(false);
              this.update_Grid(find);
            } else {
              this.alertService.show(data.operador_Inserir.mensagemTipo,
                data.operador_Inserir.mensagem,
                objeto);
            }
          })
      }
    }
  }


  pessoaInternaModalSelect(pessoaSelect: PessoaInternaUsuario) {
    if (pessoaSelect != null) {
      this.imagemOperador = this.config.converteImagemBase64(pessoaSelect.imagem?.imagem);
      this.operadorPessoaId = pessoaSelect.id;
      this.nomeOperador = pessoaSelect.nome;
      this.cargoOperador = pessoaSelect.cargo;
      this.emailOperador = pessoaSelect.email;
    } else {
      this.operadorPessoaId = 0;
      this.imagemOperador = null;
      this.nomeOperador = "";
      this.cargoOperador = "";
      this.emailOperador = "";
    }
    this.onSaved_Condition();
  }

  onListView_Filter(filterSelect: Item) {
    switch (filterSelect.text) {
      case "Operador":
        this.filterGrid = { operadorPessoa: { nome: { contains: filterSelect.value } } }
        break;
      case "Estado":
        if (State[filterSelect.value] != null) {
          this.filterGrid = { status: { eq: (State[filterSelect.value] == 1) } };
        } else {
          this.filterGrid = undefined;
        }
        break;
      case "Observação":
        this.filterGrid = { observacao: { contains: filterSelect.value } };
        break;
    }

    if (filterSelect.value != "login" && filterSelect.value != "status" && filterSelect.value != "observacao") {
      this.update_Grid();
    } else {
      this.listView_Operador.clearFilter();
    }

  }

  treeviewPopulate(filter: NivelOperacaoFilter) {
    this.treeviewService.getTreeview()
      .subscribe((treeview: TreeView[]) => {
        treeview[0].item = this.nivelOperacaoService.getNivelOperacaoTreeView(filter);
        this.treeviewService.setTreeview(treeview);
      });
  }

  update_Grid(find?: Find, filter?: Filter) {
    const filterGrid: OperadorConfiguracaoFilter = { ...this.filter, ...this.filterGrid }
    this.listView_Operador.processingShow();
    this.operadorConfiguracaoService.readOperadorConfiguracaos(this.order_by, filterGrid)
      .subscribe(({ operador }: read_OperadorConfiguracao) => {
        this.actionbuttomService.enableButtons(0);
        const nodes: OperadorConfiguracao[] = operador.nodes;
        const operadores = nodes.map(operador => {
          return {id: operador.operadorPessoaId,
                  imagem: operador.imagem?.imagem,
                  nome: operador.operadorPessoa?.nome,
                  login: operador.login,
                  site: operador.operadorPessoa?.area?.setor?.site?.nome,
                  setor: operador.operadorPessoa?.area?.setor?.nome,
                  area: operador.operadorPessoa?.area?.nome,
                  status: operador.status
                }});  
        this.listView_Operador.gridUpdate(operadores);
      });
  }

  onClose_Click(hideForm: boolean = true) {
    
    this.nivelOperacao_Options.select(<number>this.filter.nivelOperacaoId.eq);

    this.imagemOperador = null;
    this.nomeOperador = "";
    this.cargoOperador = "";
    this.emailOperador = "";
    this.operadorSenha = "";

    this.operadorPessoaId = 0;

    this.login_Text.clear();
    this.senha_Text.clear();
    this.observacao_Text.clear();
    this.cadastro_Text.clear();
    this.status_Options.select(State.LIBERADO);

    if (hideForm == true) {
      this.tabConfiguracao.select("tabLogin");
      this.actionbuttomService.hideForm();
    } else {
      this.login_Text.focus();
      this.onSaved_Condition();
    }
  }

  ngOnDestroy(): void {
    this.treeviewItem?.unsubscribe();
  }


}