import { Component, OnInit } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { SortOperationKind } from "src/app/@core/api/generic-graphql";
import {
  create_EstacaoDispositivo,
  read_EstacaoDispositivo,
  update_EstacaoDispositivo,
  delete_EstacaoDispositivo,
  EstacaoDispositivo,
  EstacaoDispositivoData,
  EstacaoDispositivoFilter,
  EstacaoDispositivoSort
} from "src/app/@core/data/dispositivo-estacao";
import { StatusColor } from "src/app/@core/enum";
import { ConfigStorage, SiteConfig } from "src/app/@core/storage/config/config";
import { AlertServiceComponent } from "src/app/@theme/components/form/alert-card/service/alert-card.service";
import { ComboOptions, Item } from "src/app/@theme/components/form/combobox/service/combobox.service";
import { InputLabel } from "src/app/@theme/components/form/input-label/service/input-label.service";
import { RadioOptions } from "src/app/@theme/components/form/radio/service/radio.service";
import { ActionButtomService } from "src/app/@theme/components/grid/action-buttom/service/action-button.service";
import { Filter, Find, ListViewGrid, rowSelect } from "src/app/@theme/components/grid/list-view/service/list-view.service";
import { EstacaoCameraModalService } from "src/app/@theme/modals/estacao-camera/service/estacao-camera-modal.service";
import { EstacaoImpressoraModalService } from "src/app/@theme/modals/estacao-impressora/service/estacao-impressora-modal.service";
import { TipoRecepcao } from "src/app/@core/enum";
import {
  read_RecepcaoReparticao,
  RecepcaoData,
  RecepcaoReparticao,
  RecepcaoReparticaoSort
} from "src/app/@core/data/reparticao-recepcao";
import { CameraDispositivo, CameraDispositivoData, CameraDispositivoFilter, CameraDispositivoSort, read_CameraDispositivo } from "src/app/@core/data/dispositivo-camera";





@Component({
  selector: 'nex-estacao-component',
  templateUrl: './estacao.component.html',
  styleUrls: ['./estacao.component.scss']
})
export class EstacaoDispositivoComponent {

  id: number = 0;
  cameraSelectGroup: any[];
  cameraP: number = 0;
  cameraV: number = 0;
  modalShow: number;

  nome_Text: InputLabel = new InputLabel();
  tipo_Options: RadioOptions = new RadioOptions;
  recepcao_Options: ComboOptions = new ComboOptions();
  ip_Text: InputLabel = new InputLabel();
  cameraP_Text: InputLabel = new InputLabel();
  cameraV_Text: InputLabel = new InputLabel();
  impressora_Text: InputLabel = new InputLabel();
  observacao_Text: InputLabel = new InputLabel();
  estado_Options: RadioOptions = new RadioOptions;

  estacaoDispositivo: EstacaoDispositivo;
  cameraDispositivo: CameraDispositivo;

  showSpinner: boolean = false;

  order_by: EstacaoDispositivoSort = { nome: SortOperationKind.ASC };
  listView_Estacao: ListViewGrid = new ListViewGrid();
  alertService: AlertServiceComponent = new AlertServiceComponent();
  estacaoCameraModalService: EstacaoCameraModalService = new EstacaoCameraModalService();
  estacaoImpressoraModalService: EstacaoImpressoraModalService = new EstacaoImpressoraModalService();
  savedCondition: boolean = false;
  settings: BehaviorSubject<any>;

  filter: EstacaoDispositivoFilter;
  filterGrid: EstacaoDispositivoFilter;

  editable: boolean;

  constructor(public actionbuttomService: ActionButtomService,
    private config: ConfigStorage,
    private estacaoDispositivoService: EstacaoDispositivoData,
    private cameraDispositivoService: CameraDispositivoData,
    private recepcaoReparticaoService: RecepcaoData) {

    this.settings = this.config.siteSubject();

    this.actionbuttomService.relationGrid = "lstEstacao";
    this.actionbuttomService.recurso = "26";
    this.actionbuttomService.top_action_buttons = [
      { "id": 0, "text": "forms.buttons.create", "visibled": false, "enabled": true, "condition": "always", "openForm": true, "editable": "new", },
      { "id": 1, "text": "forms.buttons.update", "visibled": false, "enabled": false, "condition": "select", "openForm": true, "editable": "yes", },
      { "id": 2, "text": "forms.buttons.read", "visibled": false, "enabled": false, "condition": "select", "openForm": true, "editable": "no", },
      { "id": 3, "text": "forms.buttons.delete", "visibled": false, "enabled": false, "condition": "multi", "openForm": false, "question": "forms.questions.delete" }]

    this.listView_Estacao.name = "lstEstacao";
    this.listView_Estacao.colorField = "status";
    this.listView_Estacao.colorEnum = StatusColor;
    this.listView_Estacao.title = "Lista de Estações";
    this.listView_Estacao.grid = [
      { "header": "Nome", "field": "nome", width: 20, "align": "left" },
      { "header": "Tipo", "field": "tipo", width: 10, "align": "left", "enum": TipoRecepcao },
      { "header": "Recepção", "entity": "recepcao", "field": "nome", width: 15, "align": "left" },
      { "header": "Observação", "field": "observacao", width: 55, "align": "left" }]

    this.nome_Text.name = "nome";
    this.nome_Text.rules = "uppercase";
    this.nome_Text.maxLength = 20;
    this.nome_Text.minLength = 1;

    this.tipo_Options.name = "rdTipoRecepcao"
    this.tipo_Options.add(0, "Física", "fisica", true);
    this.tipo_Options.add(1, "Virtual", "virtual");

    this.recepcao_Options.name = "cbRecepcao";

    const sortRecepcao: RecepcaoReparticaoSort = { nome: SortOperationKind.ASC };

    this.recepcaoReparticaoService.readRecepcaoReparticao(sortRecepcao, null)
      .subscribe(({ reparticaoRecepcao }: read_RecepcaoReparticao) => {
        const nodes: RecepcaoReparticao[] = reparticaoRecepcao.nodes;
        nodes.forEach((node: RecepcaoReparticao) => {
          this.recepcao_Options.add(node.nome, node.nome, node.id);
        })
      })

    this.ip_Text.name = "redeIP";
    this.ip_Text.rules = "ip";
    this.ip_Text.maxLength = 15;
    this.ip_Text.minLength = 7;

    this.cameraP_Text.disable();

    this.cameraV_Text.disable();

    this.impressora_Text.disable();

    this.observacao_Text.name = "txtObservacao";
    this.observacao_Text.maxLength = 100;
    this.observacao_Text.regex = "noFilter";

    this.estado_Options.name = "rdEstadoRecepcao"
    this.estado_Options.add(1, "Habilitado", "habilitado", true);
    this.estado_Options.add(0, "Desabilitado", "desabilitado");

    this.settings
      .subscribe((site: SiteConfig) => {
        if (site != null) {
          this.filter = { siteId: { eq: site.id } };
          this.actionbuttomService.top_action_buttons.forEach(topButton => {
            topButton.visibled = true;
          });

          this.listView_Estacao.clearFilter();
        }
      });

  }

  onActionButtom_Click(actionbuttomSelect: any) {
    this.savedCondition = false;
    switch (actionbuttomSelect.text) {
      case "forms.buttons.create":
        this.id = undefined;
        this.nome_Text.focus();
        this.editable = true;
        break;

      case "forms.buttons.update":
        this.updateDataLoad();
        this.nome_Text.focus(true);
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

    const filter: EstacaoDispositivoFilter = { id: { eq: this.id } };
    this.estacaoDispositivoService.readEstacaoDispositivo(this.order_by, filter)
      .subscribe(({ dispositivoEstacao }: read_EstacaoDispositivo) => {
        this.estacaoDispositivo = dispositivoEstacao.nodes[0];
        this.nome_Text.text = this.estacaoDispositivo.nome;
        this.tipo_Options.select(this.estacaoDispositivo.tipo ? 1 : 0);
        this.recepcao_Options.select(this.estacaoDispositivo.recepcaoId);
        if (this.estacaoDispositivo.recepcaoId == 0) {
          this.recepcao_Options.clear();
          this.recepcao_Options.disabled = true;
        }
        this.ip_Text.setTextWithMask(this.estacaoDispositivo.redeIP);
        this.cameraP_Text.text = this.estacaoDispositivo.cameraPessoa?.nome
        this.cameraV_Text.text = this.estacaoDispositivo.cameraVeiculo?.nome
        this.observacao_Text.text = this.estacaoDispositivo.observacao;
        this.estado_Options.select(this.estacaoDispositivo.status ? 1 : 0);

        this.cameraP = this.estacaoDispositivo.cameraPessoaId;
        this.cameraV = this.estacaoDispositivo.cameraVeiculoId;

        this.onSaved_Condition();

        this.showSpinner = false;

      })

  }

  update_Grid(find?: Find, filter?: Filter) {
    const filterGrid: EstacaoDispositivoFilter = { ...this.filter, ...this.filterGrid };

    this.listView_Estacao.processingShow();
    this.estacaoDispositivoService.readEstacaoDispositivo(this.order_by, filterGrid)
      .subscribe(({ dispositivoEstacao }: read_EstacaoDispositivo) => {
        console.log(dispositivoEstacao.nodes);
        this.actionbuttomService.enableButtons(0);
        this.listView_Estacao.gridUpdate(dispositivoEstacao.nodes, find, filter);
      })


  }

  onListView_Change(rowSelect?: rowSelect) {
    if (rowSelect.registro) {
      this.id = rowSelect.id;
    } else {
      if (rowSelect.exclude == "yes") {
        this.estacaoDispositivoService.deleteEstacaoDispositivo(rowSelect.id)
          .subscribe(({ data }: delete_EstacaoDispositivo) => {
            if (data.dispositivoEstacao_Excluir.sucesso == true) {
              const find = { field: "id", value: rowSelect.id, type: "DEL" }
              this.update_Grid(find)
            } else {
              const objeto = JSON.parse(data.dispositivoEstacao_Excluir.objeto);
              this.alertService.show(data.dispositivoEstacao_Excluir.mensagemTipo,
                data.dispositivoEstacao_Excluir.mensagem, objeto);
            }
          })
      }
    }
  }

  onListView_Filter(filterSelect: Item) {
    switch (filterSelect.text) {
      case "Nome":
        this.filterGrid = { nome: { contains: filterSelect.value } };
        break;
      case "Tipo":
        if (TipoRecepcao[filterSelect.value] != null) {
          this.filterGrid = { tipo: { eq: TipoRecepcao[filterSelect.value] } }
        } else {
          this.filterGrid = undefined;
        }
        break;

      case "Recepção":
        this.filterGrid = { recepcao: { nome: { contains: filterSelect.value } } };

        break;
      case "Observação":
        this.filterGrid = { observacao: { contains: filterSelect.value } };
        break;
    }
    this.update_Grid();

  }

  onSaved_Condition() {
    this.savedCondition = this.nome_Text.text.length >= this.nome_Text.minLength &&
      this.ip_Text.text.length >= this.ip_Text.minLength;

    if (!this.ip_Text.validated) {
      this.savedCondition = false;
    } else {
      this.savedCondition = this.savedCondition && true;
    }
  }

  onSave_Click() {
    this.nome_Text.validated = (this.nome_Text.text.length >= this.nome_Text.minLength);
    this.ip_Text.validated = (this.ip_Text.text.length >= this.ip_Text.minLength);

    if (!this.nome_Text.validated || !this.ip_Text.validated) {
      this.alertService.show("ERRO",
        "Existem campos obrigatórios não preenchidos ou preenchidos de forma incorreta. Verifique!",
        null);


      if (this.ip_Text.text.length < this.ip_Text.minLength) {

        this.alertService.show("ERRO",
          "Existem campos obrigatórios não preenchidos ou preenchidos de forma incorreta. Verifique!",
          null);
      }
    }


    if (this.savedCondition == true) {

      this.savedCondition = false;
      this.showSpinner = true;


      const estacaoDispositivo: EstacaoDispositivo = {
        id: this.id,
        siteId: <number>this.filter.siteId.eq,
        nome: this.nome_Text.text,
        tipo: this.tipo_Options.itemSelected.id,
        redeIP: this.ip_Text.textMasked,
        cameraPessoaId: this.cameraP,
        cameraVeiculoId: this.cameraV,
        impressora: this.impressora_Text.text,
        recepcaoId: this.recepcao_Options.itemSelected.id,
        observacao: this.observacao_Text.text,
        status: this.estado_Options.itemSelected.id == 1 ? true : false,
      }
      if (estacaoDispositivo.id) {
        this.estacaoDispositivoService.updateEstacaoDispositivo(estacaoDispositivo)
          .subscribe(({ data }: update_EstacaoDispositivo) => {
            const objeto: any = JSON.parse(data.dispositivoEstacao_Alterar.objeto);
            if (data.dispositivoEstacao_Alterar.sucesso == true) {
              const find = { field: "id", value: objeto.Id }
              this.onClose_Click();
              this.update_Grid(find);
            } else {
              this.alertService.show(data.dispositivoEstacao_Alterar.mensagemTipo,
                data.dispositivoEstacao_Alterar.mensagem, objeto)
            }
            this.showSpinner = false;
          })

      } else {
        this.estacaoDispositivoService.createEstacaoDispositivo(estacaoDispositivo)
          .subscribe(({ data }: create_EstacaoDispositivo) => {
            const objeto: any = JSON.parse(data.dispositivoEstacao_Inserir.objeto);
            if (data.dispositivoEstacao_Inserir.sucesso == true) {
              const find = { field: "id", value: objeto.Id };
              this.onClose_Click(false);
              this.update_Grid(find);
            } else {
              this.alertService.show(data.dispositivoEstacao_Inserir.mensagemTipo,
                data.dispositivoEstacao_Inserir.mensagem, objeto);
            }
            this.showSpinner = false;
          })
      }
    }
  }

  onClose_Click(hideForm: boolean = true) {
    this.cameraP = undefined;
    this.cameraV = undefined;
    this.nome_Text.clear();
    this.ip_Text.clear();
    this.observacao_Text.clear();
    this.estado_Options.select(1);
    this.tipo_Options.select(0);
    this.recepcao_Options.clear();
    this.cameraP_Text.clear();
    this.cameraV_Text.clear();
    this.onTipoEstacao_Change();

    if (hideForm == true) {
      this.actionbuttomService.hideForm()
    } else {
      this.nome_Text.focus();
      this.onSaved_Condition();
    }
  }


  onListView_Change_Modal(rowSelect?: number) {
    if (this.modalShow == 0) {
      this.cameraP = rowSelect
      const cameraFilter: CameraDispositivoFilter = { id: { eq: this.cameraP } };
      this.cameraDispositivoService.readCameraDispositivos(this.order_by, cameraFilter)
        .subscribe(({ dispositivoCamera }: read_CameraDispositivo) => {
          this.cameraDispositivo = dispositivoCamera.nodes[0];
          this.cameraP_Text.text = this.cameraDispositivo.nome
        });
    } else {
      this.cameraV = rowSelect
      const cameraFilter: CameraDispositivoFilter = { id: { eq: this.cameraV } };
      this.cameraDispositivoService.readCameraDispositivos(this.order_by, cameraFilter)
        .subscribe(({ dispositivoCamera }: read_CameraDispositivo) => {
          this.cameraDispositivo = dispositivoCamera.nodes[0];
          this.cameraV_Text.text = this.cameraDispositivo.nome
        });
    }
  }

  onCameraP_Click(type: any) {
    this.modalShow = 0;
    this.estacaoCameraModalService.show();
  }

  onCameraP_Clear_Click(event: any) {
    this.cameraP_Text.clear();
    this.cameraP = 0;
  }


  onCameraV_Click(type: any) {
    this.modalShow = 1;
    this.estacaoCameraModalService.show();
  }

  onCameraV_Clear_Click(event: any) {
    this.cameraV_Text.clear();
    this.cameraV = 0;
  }

  onImpressora_Click(type: any) {
    this.estacaoImpressoraModalService.show();
  }

  onTipoEstacao_Change() {
    if (this.tipo_Options.itemSelected.id == 1) {
      this.recepcao_Options.clear();
      this.recepcao_Options.disabled = true;
    } else {
      this.recepcao_Options.disabled = false;
      const sortRecepcao: RecepcaoReparticaoSort = { nome: SortOperationKind.ASC };
      this.recepcaoReparticaoService.readRecepcaoReparticao(sortRecepcao, null)
        .subscribe(({ reparticaoRecepcao }: read_RecepcaoReparticao) => {
          const nodes: RecepcaoReparticao[] = reparticaoRecepcao.nodes;
          nodes.forEach((node: RecepcaoReparticao) => {
            this.recepcao_Options.add(node.nome, node.nome, node.id);
          })
        })
    }
  }


}