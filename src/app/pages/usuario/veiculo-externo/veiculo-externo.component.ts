import { AfterViewInit, Component } from '@angular/core';
import { ComboOptions, Item } from 'src/app/@theme/components/form/combobox/service/combobox.service';
import { InputLabel } from 'src/app/@theme/components/form/input-label/service/input-label.service';
import { VeiculoTipo, Status, AbordagemTipo } from 'src/app/@core/enum';
import { ActionButtomService } from 'src/app/@theme/components/grid/action-buttom/service/action-button.service';
import { Filter, Find, ListViewGrid, rowSelect } from 'src/app/@theme/components/grid/list-view/service/list-view.service';
import { BoxPanel } from 'src/app/@theme/layouts';
import { Buttons, CardTabsOptions } from 'src/app/@theme/layouts/card-tabs/service/cart-tabs.service';
import { TabsService } from 'src/app/@theme/layouts/tabs/service/tabs.service';
import { FilterPessoaModal } from 'src/app/@theme/modals/pessoa-interna/service/pessoa-modal.service';
import { SortOperationKind } from 'src/app/@core/api/generic-graphql';
import { AlertServiceComponent } from 'src/app/@theme/components/form/alert-card/service/alert-card.service';
import { read_VeiculoModeloGrupo, VeiculoModeloGrupo, VeiculoModeloGrupoData, VeiculoModeloGrupoSort } from 'src/app/@core/data/grupo-veiculo-modelo';
import { read_VeiculoGrupo, VeiculoGrupo, VeiculoGrupoData, VeiculoGrupoFilter, VeiculoGrupoSort } from 'src/app/@core/data/grupo-veiculo';
import { PessoaExternaUsuario, PessoaExternaUsuarioFilter } from 'src/app/@core/data/usuario-pessoa-externa';
import { PessoaExternaModalService } from 'src/app/@theme/modals/pessoa-externa/service/pessoa-modal.service';
import {
  create_VeiculoExternoUsuario,
  delete_VeiculoExternoUsuario,
  read_VeiculoExternoUsuario,
  update_VeiculoExternoUsuario,
  VeiculoExternoUsuario,
  VeiculoExternoUsuarioData,
  VeiculoExternoUsuarioFilter,
  VeiculoExternoUsuarioSort
} from 'src/app/@core/data/usuario-veiculo-externo';
import { TextareaLabel } from 'src/app/@theme/components';
import { EmpresaReparticao, EmpresaReparticaoData, EmpresaReparticaoFilter, EmpresaReparticaoSort, read_EmpresaReparticao } from 'src/app/@core/data/reparticao-empresa';
import { EstacionamentoVaga } from 'src/app/@core/data/reparticao-vaga-estacionamento';

export enum CardTabID {
  Veiculo = 1,
  Condutor = 2,
  Abordagem = 3
}

@Component({
  selector: 'nex-veiculo-externo',
  templateUrl: './veiculo-externo.component.html',
  host: { '(window:resize)': 'onResize()' },
  styleUrls: ['./veiculo-externo.component.scss']
})
export class VeiculoExternoComponent implements AfterViewInit {

  id: number;
  veiculoExterno: VeiculoExternoUsuario;
  idCondutor: number;

  //  ------------ inicio primeiro grid --------
  tipoVeiculo_Options: ComboOptions = new ComboOptions();
  idVeiculo_Text: InputLabel = new InputLabel();
  modeloVeiculo_Options: ComboOptions = new ComboOptions();
  corVeiculo_Options: ComboOptions = new ComboOptions();
  grupoVeiculo_Options: ComboOptions = new ComboOptions();
  caracteristicaVeiculo_Text: InputLabel = new InputLabel();
  observacaoVeiculo_Text: InputLabel = new InputLabel();
  //  ------------ fim primeiro grid --------

  //  ------------ inicio identificacao --------
  pesoVeiculo_Text: InputLabel = new InputLabel();
  empresa_Text: ComboOptions = new ComboOptions();
  //  ------------ fim identificacao --------

  // ----------- inicio complemento -----------
  complemento1_Text: InputLabel = new InputLabel();
  complemento2_Text: InputLabel = new InputLabel();
  complemento3_Text: InputLabel = new InputLabel();
  complemento4_Text: InputLabel = new InputLabel();
  // ----------- fim complemento -----------

  // ----------- inicio validade -----------
  validadeEstado_Options: ComboOptions = new ComboOptions();
  //  ------------ fim validade --------

  // ----------- inicio estacionamento -----------
  vaga_Text: InputLabel = new InputLabel();
  estacionamento_Text: InputLabel = new InputLabel();
  site_Text: InputLabel = new InputLabel();
  // ----------- fim estacionamento -----------

  listView_VeiculoCondutor: ListViewGrid = new ListViewGrid();

  tabsConfiguracao_Options: TabsService = new TabsService();
  tabsValidade_Options: TabsService = new TabsService();
  cardTabs_Options: CardTabsOptions = new CardTabsOptions();

  pessoaCondutorModalService: PessoaExternaModalService = new PessoaExternaModalService();
  filterPessoaExterna: PessoaExternaUsuarioFilter;

  order_by: VeiculoExternoUsuarioSort = { placa: SortOperationKind.ASC };
  filter: VeiculoExternoUsuarioFilter;

  showSpinner: boolean = false;
  alertService: AlertServiceComponent = new AlertServiceComponent();
  boxButton: BoxPanel = new BoxPanel();
  listView_VeiculoExterno: ListViewGrid = new ListViewGrid();

  abordagemInformativa_Text: TextareaLabel = new TextareaLabel();
  abordagemAdvertida_Text: TextareaLabel = new TextareaLabel();
  abordagemRestritiva_Text: TextareaLabel = new TextareaLabel();

  empresaSelect: string

  editable: boolean;

  constructor(
    public actionbuttomService: ActionButtomService,
    private veiculoExternoService: VeiculoExternoUsuarioData,
    private veiculoModeloGrupoService: VeiculoModeloGrupoData,
    private veiculoGrupoService: VeiculoGrupoData,
    private reparticaoEmpresaService: EmpresaReparticaoData) {

    this.boxButton.add("btOpen", "insert", false);
    this.boxButton.add("btClose", "delete", false);

    this.tabsConfiguracao_Options.add("tabIdentificacao", "Identificação", true);
    this.tabsConfiguracao_Options.add("tabComplemento", "Complemento");

    this.tabsValidade_Options.add("tabValidade", "Validade", true);
    this.tabsValidade_Options.add("tabEstacionamento", "Estacionamento");

    this.cardTabs_Options.add({ id: CardTabID.Veiculo, text: 'Veículo', name: 'veiculo' });
    this.cardTabs_Options.add({ id: CardTabID.Condutor, text: 'Condutor', name: 'condutor' });
    this.cardTabs_Options.add({ id: CardTabID.Abordagem, text: 'Abordagem', name: 'abordagem' });

    this.cardTabs_Options.selectButtonByID(CardTabID.Veiculo);

    this.pessoaCondutorModalService.name = "pessoaCondutorlModal";
    this.pessoaCondutorModalService.pesquisaPessoa_Option.name = "cbPesquisaCondutor";

    this.pessoaCondutorModalService.grid = [
      { "header": "Nome", "field": "nome", "width": 25, "align": "left" },
      { "header": "Grupo", "entity": "grupo", "field": "pessoaGrupo", "width": 25, "align": "left" },
      { "header": "Telefone Fixo", "field": "telefoneFixo", "width": 25, "align": "left" },
      { "header": "Email", "field": "email", "width": 25, "align": "left" }];

    this.actionbuttomService.relationGrid = "lstVeiculoExterno";
    this.actionbuttomService.recurso = "2E";
    this.actionbuttomService.top_action_buttons = [
      { "id": 0, "text": "forms.buttons.create", "enabled": true, "condition": "always", "maximized": true, "openForm": true, "editable": "new", },
      { "id": 1, "text": "forms.buttons.update", "enabled": false, "condition": "select", "maximized": true, "openForm": true, "editable": "yes", },
      { "id": 2, "text": "forms.buttons.read", "enabled": false, "condition": "select", "maximized": true, "openForm": true, "editable": "no", },
      { "id": 3, "text": "forms.buttons.delete", "enabled": false, "condition": "multi", "openForm": false, "question": "forms.questions.delete" }]

    this.listView_VeiculoExterno.name = "lstVeiculoExterno";
    this.listView_VeiculoExterno.status = "status";
    this.listView_VeiculoExterno.title = "Lista de Veículos Externos";
    this.listView_VeiculoExterno.grid = [
      { "header": "", "entity": "veiculo.svg", "field": "imagem", "width": 3, "align": "center", "type": "image" },
      { "header": "Veículo ID", "field": "placa", "width": 10, "align": "left" },
      { "header": "Tipo", "field": "tipo", "width": 10, "align": "left", "enum": VeiculoTipo },
      { "header": "Modelo", "entity": "modelo", "field": "veiculoModelo", "width": 25, "align": "left" },
      { "header": "Cor", "field": "cor", "width": 15, "align": "left" },
      { "header": "Grupo", "entity": "grupo", "field": "veiculoGrupo", "width": 30, "align": "left" },
      { "header": "Status", "field": "status", "width": 10, "align": "left", "enum": Status }];

    this.listView_VeiculoCondutor.name = "lstVeiculoCondutor";
    this.listView_VeiculoCondutor.gridOnly = true;
    this.listView_VeiculoCondutor.noPaging = true;
    this.listView_VeiculoCondutor.noBorder = true;
    this.listView_VeiculoCondutor.grid = [
      { "header": "", "field": "pessoaId", "width": 0, "visible": false },
      { "header": "Nome", "field": "nome", "width": 25, "align": "left" },
      { "header": "Grupo", "field": "grupo", "width": 25, "align": "left" },
      { "header": "Telefone", "field": "telefoneFixo", "width": 25, "align": "left" },
      { "header": "E-mail", "field": "email", "width": 25, "align": "left" }];


    //  ------------ inicio primeiro grid --------                                                       
    this.tipoVeiculo_Options.name = "cbVeiculoTipo";
    this.tipoVeiculo_Options.addRange<Item>(this.veiculoGrupoService.veiculoTipo);
    this.tipoVeiculo_Options.select(VeiculoTipo.CARRO);

    this.idVeiculo_Text.name = "txtVeiculoID";
    this.idVeiculo_Text.rules = "lettersNumbers";
    this.idVeiculo_Text.maxLength = 7;
    this.idVeiculo_Text.minLength = 7;

    this.modeloVeiculo_Options.name = "cbVeiculoModelo";    
    this.modeloVeiculo_Options.maxLength = 30;

    this.corVeiculo_Options.name = "cbVeiculoCor";
    this.corVeiculo_Options.add("", "", 0);
    this.corVeiculo_Options.addRange<Item>(this.veiculoGrupoService.veiculoCor);

    this.grupoVeiculo_Options.name = "cbVeiculoGrupo";
    this.grupoVeiculo_Options.add("", "", 0);

    const sortVeiculoGrupo: VeiculoGrupoSort = { veiculoGrupo: SortOperationKind.ASC }
    const filterVeiculoGrupo: VeiculoGrupoFilter = { veiculoExterno: { eq: true } }

    this.veiculoGrupoService.readVeiculoGrupos(sortVeiculoGrupo, filterVeiculoGrupo)
      .subscribe(({ grupoVeiculo }: read_VeiculoGrupo) => {
        const nodes: VeiculoGrupo[] = grupoVeiculo.nodes;
        nodes.forEach((node: VeiculoGrupo) => {
          this.grupoVeiculo_Options.add(node.veiculoGrupo, node.veiculoGrupo, node.id)
        })

      });

    this.caracteristicaVeiculo_Text.name = "txtVeiculoCaracteristica"
    this.caracteristicaVeiculo_Text.rules = "uppercase";
    this.caracteristicaVeiculo_Text.maxLength = 30;

    this.observacaoVeiculo_Text.name = "txtVeiculoObservacao"
    this.observacaoVeiculo_Text.rules = "uppercase";
    this.observacaoVeiculo_Text.maxLength = 100;
    //  ------------ fim primeiro grid --------


    //  ------------ inicio identificacao --------
    this.pesoVeiculo_Text.name = "txtPesoVeiculo";
    this.pesoVeiculo_Text.rules = "onlynumbers";
    this.pesoVeiculo_Text.maxLength = 6;

    this.empresa_Text.name = "txtEmpresa";
    this.empresa_Text.maxLength = 30;

    //  ------------ fim identificacao --------

    // ---------------- inicio complemento --------------
    this.complemento1_Text.name = "txtComplemento1";
    this.complemento1_Text.rules = "uppercase";
    this.complemento1_Text.maxLength = 30;

    this.complemento2_Text.name = "txtComplemento2";
    this.complemento2_Text.rules = "uppercase";
    this.complemento2_Text.maxLength = 30;

    this.complemento3_Text.name = "txtComplemento3";
    this.complemento3_Text.rules = "uppercase";
    this.complemento3_Text.maxLength = 30;

    this.complemento4_Text.name = "txComplemento4";
    this.complemento4_Text.rules = "uppercase";
    this.complemento4_Text.maxLength = 30;

    // ---------------- fim complemento --------------


    // ----------- inicio validade -----------
    this.validadeEstado_Options.name = "cbValidade"
    this.validadeEstado_Options.add("LIVRE", "livre", 1);
    this.validadeEstado_Options.add("BLOQUEADO", "bloqueado", 0);
    //  ------------ fim validade --------

    this.abordagemInformativa_Text.name = "txtAbordagemInformativa";
    this.abordagemInformativa_Text.maxLength = 1000;
    this.abordagemInformativa_Text.regex = "noFilter";

    this.abordagemAdvertida_Text.name = "txtAbordagemAdvertida";
    this.abordagemAdvertida_Text.maxLength = 1000;
    this.abordagemAdvertida_Text.regex = "noFilter";

    this.abordagemRestritiva_Text.name = "txtAbordagemRestritiva";
    this.abordagemRestritiva_Text.maxLength = 1000;
    this.abordagemRestritiva_Text.regex = "noFilter";

    this.vaga_Text.name = "txtVaga";
    this.vaga_Text.disabled = true;

    this.estacionamento_Text.name = "txtEstacionamento";
    this.estacionamento_Text.disabled = true;

    this.site_Text.name = "txtSite";
    this.site_Text.disabled = true;

    const find = null;
    const filter = { select: "Veículo ID", field: "placa", value: "" };

    this.update_Grid();

  }

  ngAfterViewInit(): void {
      this.empresaPopulate();
      this.veiculoModeloPopulate();
      this.onResize();
  }

  onActionButtom_Click(actionButtomSelect: any) {
    switch (actionButtomSelect.text) {
      case "forms.buttons.create": {
        this.idVeiculo_Text.focus();
        this.id = undefined;
        this.editable = true;
        break;
      }
      case "forms.buttons.update": {
        this.updateDataLoad();
        this.idVeiculo_Text.focus();
        this.editable = true;
        break;
      }
      case "forms.buttons.read": {
        this.updateDataLoad();
        this.editable = false;
        break;
      }
    }
  }

  updateDataLoad() {
    this.showSpinner = true;

    const filter: VeiculoExternoUsuarioFilter = { id: { eq: this.id } };
    this.veiculoExternoService.readVeiculoExternoUsuario(this.order_by, filter)
      .subscribe(({ usuarioVeiculoExterno }: read_VeiculoExternoUsuario) => {
        this.veiculoExterno = usuarioVeiculoExterno.nodes[0];

        this.tipoVeiculo_Options.select(this.veiculoExterno.tipo as number);
        this.id = this.veiculoExterno.id;
        this.idVeiculo_Text.text = this.veiculoExterno.placa;
        this.modeloVeiculo_Options.select(this.veiculoExterno.modeloId);
        this.corVeiculo_Options.selectbyValue(this.veiculoExterno.cor.toLocaleLowerCase());
        this.grupoVeiculo_Options.select(this.veiculoExterno.grupoId);
        this.caracteristicaVeiculo_Text.text = this.veiculoExterno.caracteristica;
        this.observacaoVeiculo_Text.text = this.veiculoExterno.observacao;
        this.pesoVeiculo_Text.text = this.veiculoExterno.peso.toString();
        if (this.veiculoExterno.empresaId == 0) {
          this.empresa_Text.itemSelected.text = this.veiculoExterno.entidadeNome;
        } else {
          this.empresa_Text.select(this.veiculoExterno.empresaId);
        }

        this.complemento1_Text.text = this.veiculoExterno.complemento1;
        this.complemento2_Text.text = this.veiculoExterno.complemento2;
        this.complemento3_Text.text = this.veiculoExterno.complemento3;
        this.complemento4_Text.text = this.veiculoExterno.complemento4;

        this.validadeEstado_Options.select(this.veiculoExterno.status ? 1 : 0);
        const estacionamento: EstacionamentoVaga = this.veiculoExterno.garagens[0];
        this.vaga_Text.text = estacionamento?.garagem;
        this.estacionamento_Text.text = estacionamento?.estacionamento?.nome;
        this.site_Text.text = estacionamento?.estacionamento?.setor?.site?.nome;

        const condutores = this.veiculoExterno.condutores?.map(veiculoCondutor => {
          return {
            id: veiculoCondutor.pessoaId,
            pessoaId: veiculoCondutor.pessoaId,
            nome: veiculoCondutor.pessoaExterna?.nome,
            grupo: veiculoCondutor.pessoaExterna?.grupo?.pessoaGrupo,
            telefoneFixo: veiculoCondutor.pessoaExterna?.telefoneFixo,
            email: veiculoCondutor.pessoaExterna?.email
          }
        });
        this.listView_VeiculoCondutor.gridUpdate(condutores);

        this.abordagemInformativa_Text.text = this.veiculoExterno.abordagem?.mensagemInformativa;
        this.abordagemAdvertida_Text.text = this.veiculoExterno.abordagem?.mensagemAdvertida;
        this.abordagemRestritiva_Text.text = this.veiculoExterno.abordagem?.mensagemRestritiva;

        if (this.abordagemInformativa_Text.text?.length > 0) {
          this.cardTabs_Options.setCondition('abordagem', AbordagemTipo.informativa);
        }          
        if (this.abordagemAdvertida_Text.text?.length > 0) {
          this.cardTabs_Options.setCondition('abordagem', AbordagemTipo.advertida);
        }
        if (this.abordagemRestritiva_Text.text?.length > 0) {
          this.cardTabs_Options.setCondition('abordagem', AbordagemTipo.restritiva);
        }

        this.showSpinner = false;
      });

  }

  onlistView_Change(rowSelect?: rowSelect) {
    if (rowSelect.registro) {
      this.id = rowSelect.id;
    } else {
      if (rowSelect.exclude == "yes") {
        this.veiculoExternoService.deleteVeiculoExternoUsuario(rowSelect.id)
          .subscribe(({ data }: delete_VeiculoExternoUsuario) => {
            if (data.usuarioVeiculoExterno_Excluir.sucesso == true) {
              const find = { field: "id", value: rowSelect.id, type: "DEL" };
              this.update_Grid(find);
            } else {
              const objeto = JSON.parse(data.usuarioVeiculoExterno_Excluir.objeto);
              this.alertService.show(data.usuarioVeiculoExterno_Excluir.mensagemTipo,
                data.usuarioVeiculoExterno_Excluir.mensagem,
                objeto);
            }
          });
      }
    }
  }

  onSave_Click() {

    this.idVeiculo_Text.validated = (this.idVeiculo_Text.text.length >= this.idVeiculo_Text.minLength);

    if (!this.idVeiculo_Text.validated) {
      this.alertService.show("ERRO",
        "Existem campos obrigatórios não preenchidos ou preenchidos de forma incorreta. Verifique!",
        null);

    } else {

      this.showSpinner = true;
      const veiculoExterno: VeiculoExternoUsuario = {
        id: this.id,
        tipo: this.tipoVeiculo_Options.itemSelected.id,
        placa: this.idVeiculo_Text.text,
        modeloId: this.modeloVeiculo_Options.itemSelected.id,
        modelo: (this.modeloVeiculo_Options.itemSelected.id == 0)? this.modeloVeiculo_Options.itemSelected.text: undefined,
        cor: this.corVeiculo_Options.itemSelected.text,
        grupoId: this.grupoVeiculo_Options.itemSelected.id,
        caracteristica: this.caracteristicaVeiculo_Text.text,
        observacao: this.observacaoVeiculo_Text.text,
        peso: parseInt(this.pesoVeiculo_Text.text),
        empresaId: this.empresa_Text.itemSelected.id,
        entidadeNome: (this.empresa_Text.itemSelected.id == 0)? this.empresa_Text.itemSelected.text: null,
        complemento1: this.complemento1_Text.text,
        complemento2: this.complemento2_Text.text,
        complemento3: this.complemento3_Text.text,
        complemento4: this.complemento4_Text.text,
        condutores: this.listView_VeiculoCondutor.dataGridBehavior?.value?.map(condutores => {
            return { pessoaId: condutores.pessoaId }
          }) || [],
        abordagem: {
          mensagemInformativa: this.abordagemInformativa_Text.text || "", 
          mensagemAdvertida: this.abordagemAdvertida_Text.text || "",
          mensagemRestritiva: this.abordagemRestritiva_Text.text || ""
        },
        status: this.validadeEstado_Options.itemSelected.id == 1 ? true : false
      }

      if (veiculoExterno.id) {

        this.veiculoExternoService.updateVeiculoExternoUsuario(veiculoExterno)
          .subscribe(({ data }: update_VeiculoExternoUsuario) => {
            const objeto: any = JSON.parse(data.usuarioVeiculoExterno_Alterar.objeto);
            if (data.usuarioVeiculoExterno_Alterar.sucesso == true) {
              const find = { field: "id", value: objeto.Id }
              this.onClose_Click();
              this.update_Grid(find);
            } else {
              this.alertService.show(data.usuarioVeiculoExterno_Alterar.mensagemTipo,
                data.usuarioVeiculoExterno_Alterar.mensagem, objeto)
            }
            this.showSpinner = false;
          })

      } else {
        this.veiculoExternoService.createVeiculoExternoUsuario(veiculoExterno)
          .subscribe(({ data }: create_VeiculoExternoUsuario) => {
            const objeto: any = JSON.parse(data.usuarioVeiculoExterno_Inserir.objeto);
            if (data.usuarioVeiculoExterno_Inserir.sucesso == true) {
              const find = { field: "id", value: objeto.Id };
              this.onClose_Click(false);
              this.update_Grid(find);
            } else {
              this.alertService.show(data.usuarioVeiculoExterno_Inserir.mensagemTipo,
                data.usuarioVeiculoExterno_Inserir.mensagem, objeto);
            }
            this.showSpinner = false;
          })
      }
    }

  }

  onlistViewVeiculoCondutor_Change(rowSelect?: rowSelect) {
    if (rowSelect.registro) {
      this.idCondutor = rowSelect.registro.pessoaId;
    }
  }

  pessoaCondutorModalSelect(pessoaSelect: PessoaExternaUsuario) {
    if (pessoaSelect != null) {
      const condutor: any = {
        id: pessoaSelect.id,
        pessoaId: pessoaSelect.id,        
        nome: pessoaSelect.nome,
        email: pessoaSelect.email,
        telefoneFixo: pessoaSelect.telefoneFixo,
        grupo: pessoaSelect.grupo.pessoaGrupo
      }

      const condutores: any[] = this.listView_VeiculoCondutor.dataGridBehavior?.value || [];
      condutores.push(condutor);
      this.listView_VeiculoCondutor.gridUpdate(condutores);
    }
  }

  onButton_Click(type: any) {
    switch (type) {
      case "insert":
        const pessoaLista: Array<number> = this.listView_VeiculoCondutor.dataGridBehavior
          .value?.map(condutor => {return condutor.id});
        this.pessoaCondutorModalService.show('Condutores', pessoaLista);
        break;

      case "delete":
        const indexId = this.listView_VeiculoCondutor.dataGridBehavior
          .value?.findIndex(cdt => cdt.pessoaId == this.idCondutor);
        if (indexId >= 0) {
          this.listView_VeiculoCondutor.dataGridBehavior.value?.splice(indexId, 1);
        }
        break;
    }
  }

  empresaPopulate(id?: number, clean: boolean = true) {
    if (clean) this.empresa_Text.clear();

    this.empresa_Text.add("", null, 0);
    const sortEmpresaReparticao: EmpresaReparticaoSort = { nome: SortOperationKind.ASC };
    const filterEmpresaReparticao: EmpresaReparticaoFilter = null;

    this.reparticaoEmpresaService.readEmpresaReparticaos(sortEmpresaReparticao, filterEmpresaReparticao)
      .subscribe(({ reparticaoEmpresa }: read_EmpresaReparticao) => {
        const nodes: EmpresaReparticao[] = reparticaoEmpresa.nodes;
        nodes.forEach((node: EmpresaReparticao) => {
          this.empresa_Text.add(node.nome, null, node.id);
        });
        if (id) this.empresa_Text.select(id);
      }, (error => {
        // Tratar erro subscribe...
      }));
  }

  veiculoModeloPopulate() {
    this.modeloVeiculo_Options.clear();
    this.modeloVeiculo_Options.add("", "", 0);

    const sortVeiculoModelo: VeiculoModeloGrupoSort = { veiculoModelo: SortOperationKind.ASC };

    this.veiculoModeloGrupoService.readVeiculoModeloGrupos(sortVeiculoModelo, null)
    .subscribe(({ grupoVeiculoModelo }: read_VeiculoModeloGrupo) => {
      const nodes: VeiculoModeloGrupo[] = grupoVeiculoModelo.nodes;
      nodes.forEach((node: VeiculoModeloGrupo) => {
        this.modeloVeiculo_Options.add(node.veiculoModelo, node.veiculoModelo, node.id);
      })
    });
  }

  onCardTabs_Click(cardSelected: Buttons) {
    this.cardTabs_Options.selectButtonByID(cardSelected.id);
    if (cardSelected.id == CardTabID.Veiculo) {
      this.tabsConfiguracao_Options.select("tabIdentificacao");
      this.tabsValidade_Options.select("tabValidade");
    }
  }

  onListView_Filter(filterSelect: Item) {

    switch (filterSelect.text) {
      case "Veículo ID":
        this.filter = { placa: { contains: filterSelect.value } };
        break;
      case "Modelo":
        this.filter = { modelo: { veiculoModelo: { contains: filterSelect.value } } };
        break;
      case "Tipo":
        if (VeiculoTipo[filterSelect.value] != null) {
          this.filter = { tipo: { eq: VeiculoTipo[filterSelect.value] } };
        } else {
          this.filter = undefined;
        }
        break;
      case "Cor":
        this.filter = { cor: { contains: filterSelect.value } };
        break;
      case "Grupo":
        const grupoVeiculoIndex: number = this.grupoVeiculo_Options.getId(filterSelect.value);
        if (grupoVeiculoIndex) {
          const grupoId: number = this.grupoVeiculo_Options.itens[grupoVeiculoIndex].id;
          this.filter = { grupoId: { eq: grupoId } };
        } else {
          this.filter = undefined;
        }
        break;
      case "Estado":
        if (Status[filterSelect.value] != null) {
          this.filter = { status: { eq: (Status[filterSelect.value] == 1) } };
        } else {
          this.filter = undefined;
        }
        break;
    }

    if (filterSelect.value != "placa" &&
      filterSelect.value != "tipo" &&
      filterSelect.value != "modelo" &&
      filterSelect.value != "grupo" &&
      filterSelect.value != "cor" &&
      filterSelect.value != "status") {
      this.update_Grid();
    }

  }

  update_Grid(find?: Find, filter?: Filter) {
    this.listView_VeiculoExterno.processingShow();
    this.veiculoExternoService.readVeiculoExternoUsuario(this.order_by, this.filter)
      .subscribe(({ usuarioVeiculoExterno }: read_VeiculoExternoUsuario) => {
        this.actionbuttomService.enableButtons(0);
        this.listView_VeiculoExterno.gridUpdate(usuarioVeiculoExterno.nodes, find, filter);
      })
  }

  onResize() {
    const maxHeightPanel = document.getElementById('veiculoExternoComponent_Panel')?.clientHeight;
    this.listView_VeiculoCondutor.maxHeight = maxHeightPanel - 95;
  }

  onClose_Click(hideForm: boolean = true) {

    this.tipoVeiculo_Options.select(VeiculoTipo.CARRO);
    this.idVeiculo_Text.clear();
    this.modeloVeiculo_Options.clearSelect();
    this.corVeiculo_Options.clearSelect();
    this.grupoVeiculo_Options.clearSelect();
    this.caracteristicaVeiculo_Text.clear();
    this.observacaoVeiculo_Text.clear();
    this.pesoVeiculo_Text.clear();
    this.empresaPopulate(0, true);

    this.vaga_Text.clear();
    this.estacionamento_Text.clear();
    this.site_Text.clear();

    this.complemento1_Text.clear();
    this.complemento2_Text.clear();
    this.complemento3_Text.clear();
    this.complemento4_Text.clear();

    this.listView_VeiculoCondutor.clear();

    this.abordagemInformativa_Text.clear();
    this.abordagemAdvertida_Text.clear();
    this.abordagemRestritiva_Text.clear();

    this.validadeEstado_Options.select(1);

    this.tabsConfiguracao_Options.select("tabIdentificacao");
    this.tabsValidade_Options.select("tabValidade");

    this.cardTabs_Options.setCondition('abordagem', AbordagemTipo.nenhum);    
    this.cardTabs_Options.selectButtonByID(CardTabID.Veiculo);

    if (hideForm == true) {
      this.actionbuttomService.hideForm(true);
    } else {
      this.idVeiculo_Text.focus();
    }

  }
}