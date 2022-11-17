import { Component, OnDestroy } from '@angular/core';
import { SortOperationKind } from 'src/app/@core/api/generic-graphql';
import { create_NivelAcessoConcessao, delete_NivelAcessoConcessao, NivelAcessoConcessao, 
         NivelAcessoConcessaoData, 
         NivelAcessoFilter, NivelAcessoSort, 
         read_NivelAcessoConcessao, 
         update_NivelAcessoConcessao} from 'src/app/@core/data/concessao-nivel-acesso';
import { AlertServiceComponent } from 'src/app/@theme/components/form/alert-card/service/alert-card.service';
import { Item } from 'src/app/@theme/components/form/combobox/service/combobox.service';
import { InputLabel } from 'src/app/@theme/components/form/input-label/service/input-label.service';
import { InputMultiLabel } from 'src/app/@theme/components/form/input-multi-label/service/input-multi-label';
import { RadioOptions } from 'src/app/@theme/components/form/radio/service/radio.service';
import { OptionsGroup } from 'src/app/@theme/components/form/select-group/service/select-group.service';
import { ActionButtomService } from 'src/app/@theme/components/grid/action-buttom/service/action-button.service';
import { Filter, Find, ListViewGrid ,rowSelect} from 'src/app/@theme/components/grid/list-view/service/list-view.service';
import { BoxPanel } from 'src/app/@theme/layouts/box/service/box.service';
import { TabsService } from 'src/app/@theme/layouts/tabs/service/tabs.service';
import { NivelAcessoModalService } from 'src/app/@theme/modals/nivel-acesso/service/nivel-acesso-modal.service';
import { YesNo,DispositivoStatus, StatusColor } from 'src/app/@core/enum';
import { DatePipe } from '@angular/common';
import { BehaviorSubject } from 'rxjs';
import { ConfigStorage } from 'src/app/@core/storage/config/config';
import { DateOperator } from 'src/app/@theme/components/miscellaneous/date-operator/date-operator';

export interface NivelAcessoValidade {
  id: number;
  validadeNivel: string;
  nome: string;
  tipo: number;
  status: boolean;
  observacao: string;
}

@Component({
  selector: 'nex-nivel-acesso',
  templateUrl: './nivel-acesso.component.html',
  styleUrls: ['./nivel-acesso.component.scss'],
  providers: [DatePipe]})
export class NivelAcessoConcessaoComponent implements OnDestroy{

  id: number = 0;
  nomeNivel_Text: InputLabel = new InputLabel();
  restricao_Option: OptionsGroup = new OptionsGroup();
  inicial_Mult_Validade: InputMultiLabel = new InputMultiLabel();
  final_Mult_Validade: InputMultiLabel = new InputMultiLabel();
  inicial_Mult_Hora: InputMultiLabel = new InputMultiLabel();
  final_Mult_Hora: InputMultiLabel = new InputMultiLabel();
  inicial_Mult_Data: InputMultiLabel = new InputMultiLabel();
  final_Mult_Data: InputMultiLabel = new InputMultiLabel();
  observacao_Text: InputLabel = new InputLabel();
  estado_Options: RadioOptions = new RadioOptions;
  
  listView_AreaNivel: ListViewGrid = new ListViewGrid();
  boxArea: BoxPanel = new BoxPanel(); 

  nivelAcessoValidade: NivelAcessoValidade
  nivelAcessoModalService: NivelAcessoModalService = new NivelAcessoModalService();
  nivelAcessoConcessao: NivelAcessoConcessao;

  areaNivelAcesso: any;

  showSpinner: boolean = false;

  tabNivel: TabsService = new TabsService();
  settings: BehaviorSubject<any>;

  listView_NivelAcesso: ListViewGrid = new ListViewGrid();
  alertService: AlertServiceComponent = new AlertServiceComponent();
  order_by: NivelAcessoSort = { nome: SortOperationKind.ASC };
  filter: NivelAcessoFilter;

  editable: boolean;

  constructor(public actionbuttomService: ActionButtomService,
              private nivelAcessoConcessaoService: NivelAcessoConcessaoData,
              private config: ConfigStorage,
              private datePipe: DatePipe){

    this.boxArea.add("btInsert", "insert", false);
    this.boxArea.add("btEdit", "edit", true);
    this.boxArea.add("btDelete", "delete", true);
    this.boxArea.add("btView", "view", true);

    this.settings = this.config.siteSubject();
    
    this.actionbuttomService.recurso = "27";
    this.actionbuttomService.top_action_buttons = [{"id": 0, "text": "forms.buttons.create",  "enabled": true,  "condition": "always", "openForm": true,  "editable": "new",},
                                                   {"id": 1, "text": "forms.buttons.update",  "enabled": false, "condition": "select", "openForm": true,  "editable": "yes",},
                                                   {"id": 2, "text": "forms.buttons.read",    "enabled": false, "condition": "select", "openForm": true,  "editable": "no",},
                                                   {"id": 3, "text": "forms.buttons.delete",  "enabled": false, "condition": "multi",  "openForm": false, "question": "forms.questions.delete"}]
        
    this.listView_NivelAcesso.name  = "lstNivelAcesso";
    this.listView_NivelAcesso.colorEnum = StatusColor;
    this.listView_NivelAcesso.colorField = "status";
    this.listView_NivelAcesso.title = "Lista de Níveis de Acesso ";
    this.listView_NivelAcesso.grid  = [{"header": "Nível de Acesso", "field": "nome", "width":  20, "align": "left", },
                                       {"header": "Restrito", "field": "tipo", "width":  10, "align": "left", "enum": YesNo},
                                       {"header": "Validade", "field": "validadeNivel", "width":  20, "align": "left"},
                                       {"header": "Status", "field": "status", "width": 15, "align":"left", "enum": DispositivoStatus},
                                       {"header": "Observação", "field": "observacao", "width": 35, "align":"left"}];

    this.listView_AreaNivel.name = "lstAreaNivel";
    this.listView_AreaNivel.gridOnly = true;
    this.listView_AreaNivel.noPaging = true;
    this.listView_AreaNivel.noBorder = true;

    this.listView_AreaNivel.grid = [{"header": "Area", "field": "area", "width": 50, "align": "left"},
                                    {"header": "Site", "field": "site", "width": 50, "align": "left"}];


    this.tabNivel.add("tabNivel", "Nível", true);
    this.tabNivel.add("tabArea", "Área", false);
    this.tabNivel.add("tabExpansao", "Expansão", false);
    
    this.nomeNivel_Text.name = "txtNomeNivel";
    this.nomeNivel_Text.rules = "uppercase";
    this.nomeNivel_Text.maxLength = 30;
    this.nomeNivel_Text.minLength = 1;

    this.restricao_Option.add(1,"Nível restrito aos INTERNOS ","restricao",false);

    this.inicial_Mult_Validade.name = "inicial_Mult";
    this.inicial_Mult_Validade.label = "Val. Inicial";
    this.inicial_Mult_Validade.rules = "date";
    this.inicial_Mult_Validade.regex = "date";
    this.inicial_Mult_Validade.textAlign = "center";
    this.inicial_Mult_Validade.maxLength = 10;
    this.inicial_Mult_Validade.minLength = 0;
    
    this.final_Mult_Validade.name = "final_Mult";
    this.final_Mult_Validade.label = "Val. Final";
    this.final_Mult_Validade.rules = "date";
    this.final_Mult_Validade.regex = "date";
    this.final_Mult_Validade.textAlign = "center";
    this.final_Mult_Validade.maxLength = 10;
    this.final_Mult_Validade.minLength = 0;
    
    this.inicial_Mult_Hora.name = "inicial_Mult_Hora";
    this.inicial_Mult_Hora.label = "Hora Inicial";
    this.inicial_Mult_Hora.rules = "time";
    this.inicial_Mult_Hora.regex = "time";
    this.inicial_Mult_Hora.textAlign = "center";      
    this.inicial_Mult_Hora.maxLength = 5;
    this.inicial_Mult_Hora.minLength = 0;

    this.final_Mult_Hora.name = "final_Mult_Hora";
    this.final_Mult_Hora.label = "Hora Final";
    this.final_Mult_Hora.rules = "time";
    this.final_Mult_Hora.regex = "time";
    this.final_Mult_Hora.textAlign = "center";    
    this.final_Mult_Hora.maxLength = 5;
    this.final_Mult_Hora.minLength = 0;
                             
    this.inicial_Mult_Data.name = "inicial_Mult_Data";
    this.inicial_Mult_Data.label = "Inicial";
    this.inicial_Mult_Data.rules = "date";
    this.inicial_Mult_Data.regex = "date";
    this.inicial_Mult_Data.textAlign = "center";
    this.inicial_Mult_Data.maxLength = 10;
    this.inicial_Mult_Data.minLength = 0;
    
    this.final_Mult_Data.name = "final_Mult_Data";
    this.final_Mult_Data.label = "Final";
    this.final_Mult_Data.rules = "date";
    this.final_Mult_Data.regex = "date";
    this.final_Mult_Data.textAlign = "center";
    this.final_Mult_Data.maxLength = 10;
    this.final_Mult_Data.minLength = 0;
    
    this.observacao_Text.maxLength = 100;
    this.observacao_Text.regex = "noFilter";

    this.estado_Options.add(1, "Habilitado", "habilitado", true);
    this.estado_Options.add(0, "Desabilitado", "desabilitado");

    const find = null;
    const filter = {select: "Nome", field: "nome", value: ""};
    this.update_Grid(find, filter);

  }

  onActionButtom_Click(actionButtomSelect: any) {
    switch(actionButtomSelect.text) {
      case "forms.buttons.create":
        this.id = undefined;
        this.editable = true;
        this.nomeNivel_Text.focus();
        this.btAreaEdit();
        break;

      case "forms.buttons.update":
        this.editable = true;
        this.updateDataLoad();
        this.nomeNivel_Text.focus(true);
        this.btAreaEdit();
        break;

      case "forms.buttons.read":
        this.editable = false;
        this.updateDataLoad();
        this.btAreaEdit();        
        break;

    }
  }

  updateDataLoad(){
    this.showSpinner = true;

    const filter: NivelAcessoFilter = {id: {eq: this.id}};
    this.nivelAcessoConcessaoService.readNivelAcessoConcessao(this.order_by, filter)
      .subscribe(({ concessaoNivelAcesso }: read_NivelAcessoConcessao) => {
        this.nivelAcessoConcessao = concessaoNivelAcesso.nodes[0];
        this.nomeNivel_Text.text = this.nivelAcessoConcessao.nome;
        if(this.nivelAcessoConcessao.tipo == 1) {
          this.restricao_Option.check(1)
        } else {
          this.restricao_Option.uncheck(1)
        }
        this.inicial_Mult_Validade.setTextWithMask(this.nivelAcessoConcessao.validadeInicial);
        this.final_Mult_Validade.setTextWithMask(this.nivelAcessoConcessao.validadeFinal);
        this.observacao_Text.text = this.nivelAcessoConcessao.observacao;
        this.estado_Options.select(this.nivelAcessoConcessao.status? 1: 0);
        this.inicial_Mult_Hora.setTextWithMask(this.nivelAcessoConcessao.expansaoHoraInicial);
        this.final_Mult_Hora.setTextWithMask(this.nivelAcessoConcessao.expansaoHoraFinal);
        this.inicial_Mult_Data.setTextWithMask(this.nivelAcessoConcessao.expansaoDataInicial);
        this.final_Mult_Data.setTextWithMask(this.nivelAcessoConcessao.expansaoDataFinal);

        const nivelAcessoAreas = this.nivelAcessoConcessao.areas?.map(areasNivel => {
          return {id: areasNivel.area.id,
                  area: areasNivel.area.nome,
                  siteId: areasNivel.area.setor.siteId,
                  site: areasNivel.area.setor.site.nome,
                  bloqueios: areasNivel.bloqueios,
                  elevadores: areasNivel.elevadores.map(item => {
                    return { elevadorId: item.elevadorId,
                             elevadorNome: item.elevador.nome,
                             elevadorAndar: item.elevadorAndar }
                  }) || [],
                  faixasHorarias: areasNivel.faixasHorarias
                }
        });
        this.listView_AreaNivel.gridUpdate(nivelAcessoAreas);
        this.showSpinner = false;
      })
  }

  onListView_Change(rowSelect?: rowSelect){
    if (rowSelect.registro) {
      this.id = rowSelect.id;
    } else {
      if (rowSelect.exclude == "yes") {
        this.nivelAcessoConcessaoService.deleteNivelAcessoConcessao(rowSelect.id)
          .subscribe(({ data }: delete_NivelAcessoConcessao) => {
            if (data.concessaoNivelAcesso_Excluir.sucesso == true) {
              const find = { field: "id", value: rowSelect.id, type: "DEL" }
              this.update_Grid(find)

            } else {
              const objeto = JSON.parse(data.concessaoNivelAcesso_Excluir.objeto);
              this.alertService.show(data.concessaoNivelAcesso_Excluir.mensagemTipo,
                data.concessaoNivelAcesso_Excluir.mensagem,
                objeto);
            }
          })
      }
    }
  }

  onListView_Change_Area(rowSelect?: rowSelect) {
    if (rowSelect.registro) {
      this.areaNivelAcesso = rowSelect.registro;
      this.btAreaEdit();
    }
  }

  onFilter_Change(filterSelect: Item){
    if (filterSelect.value.length > 0) {
      switch (filterSelect.text) {
        case "Nível de Acesso":
          this.filter = { nome: { contains: filterSelect.value } };
          break;

        case "Restrito":
          this.filter = { tipo: { eq: YesNo[filterSelect.value] } };
          break;

        case "Validade":
          this.filter = { validadeInicial: { eq: filterSelect.value } };
          break;

        case "Status":
          this.filter = { status: { eq: (DispositivoStatus[filterSelect.value] == 1? true: DispositivoStatus[filterSelect.value] == 0? false: null) } };
          break;

        case "Observação":
          this.filter = { observacao: { contains: filterSelect.value }};
          break;

      }
    } else {
      this.filter = undefined;
    }
    this.update_Grid();
  }

  onStatus_Change(optionSelect: any) {

  }

  onSave_Click() {
    const inicialFinalData: boolean = new DateOperator().compareDateGT(this.inicial_Mult_Data.textMasked, this.final_Mult_Data.textMasked);
    const inicialFinalValidated: boolean = new DateOperator().compareDateGT(this.inicial_Mult_Validade.textMasked, this.final_Mult_Validade.textMasked);
    const horaInicialFinal: boolean = new DateOperator().compareTimeGT(this.inicial_Mult_Hora.textMasked, this.final_Mult_Hora.textMasked);

    this.nomeNivel_Text.validated =  (this.nomeNivel_Text.text.length >= this.nomeNivel_Text.minLength);
    this.inicial_Mult_Data.validated = this.inicial_Mult_Data.condition() && inicialFinalData;
    this.final_Mult_Data.validated = this.final_Mult_Data.condition() && inicialFinalData;
    this.inicial_Mult_Validade.validated = this.inicial_Mult_Validade.condition() && inicialFinalValidated;
    this.final_Mult_Validade.validated = this.final_Mult_Validade.condition() && inicialFinalValidated;
    this.inicial_Mult_Hora.validated = this.inicial_Mult_Hora.condition() && horaInicialFinal;
    this.final_Mult_Hora.validated = this.final_Mult_Hora.condition() && horaInicialFinal;

    if (!this.nomeNivel_Text.validated) {
      this.alertService.show("ERRO",
        "Existem campos obrigatórios não preenchidos ou preenchidos de forma incorreta. Verifique!",
        null);
    } else if (!inicialFinalValidated) {
      this.alertService.show("ERRO",
        "Data de Validade Inicial, do Nível de Acesso, não pode ser maior que a data de Validade Final. Verifique!",
        null);
    } else if (!inicialFinalData) {
      this.alertService.show("ERRO",
        "Data de Validade Inicial, da Faixa Horária de Expansão, não pode ser maior que a data de Validade Final. Verifique!",
        null);
    } else if (!horaInicialFinal) {
      this.alertService.show("ERRO",
        "Hora Inicial, da Faixa Horária de Expansão, não pode ser maior que a Hora Final. Verifique!",
        null);
    } else if (!this.inicial_Mult_Data.validated || !this.final_Mult_Data.validated ||
               !this.inicial_Mult_Validade.validated || !this.final_Mult_Validade.validated ||
               !this.inicial_Mult_Hora.validated || !this.final_Mult_Hora.validated) {
      this.alertService.show("ERRO",
        "Existem campos preenchidos de forma incorreta. Verifique!",
        null);
    } else if(!this.listView_AreaNivel.dataGridBehavior?.value ||
              this.listView_AreaNivel.dataGridBehavior?.value?.length == 0) {
      this.alertService.show("ERRO",
        "Para inclusão de um Nível de Acesso é obrigatório selecionar ao menos uma Área. Verifique!",
        null);
    } else {

      this.showSpinner = true;
      const nivelAcessoConcessao: NivelAcessoConcessao = {
        id: this.id,
        nome: this.nomeNivel_Text.text,
        tipo: (this.restricao_Option.getItem('restricao').checked == true)? 1: 0,
        validadeInicial: this.inicial_Mult_Validade.formated,
        validadeFinal: this.final_Mult_Validade.formated,
        expansaoHoraInicial: this.inicial_Mult_Hora.textMasked,
        expansaoHoraFinal: this.final_Mult_Hora.textMasked,
        expansaoDataInicial: this.inicial_Mult_Data.formated,
        expansaoDataFinal: this.final_Mult_Data.formated,
        observacao: this.observacao_Text.text,
        status: this.estado_Options.itemSelected.id == 1,
        areas: this.listView_AreaNivel.dataGridBehavior.value?.map(area => {
          return {
            areaId: area.id,
            bloqueios: area.bloqueios?.map(item => {
              return {bloqueioId: item.bloqueioId}
            }),
            faixasHorarias: area.faixasHorarias?.map(item => {
              return {faixaHorariaId: item.faixaHorariaId,
                      faixaTipo: item.faixaTipo}
            }),
            elevadores: area.elevadores.map(elevador => {
              return {elevadorId: elevador.elevadorId,
                      elevadorAndar: elevador.elevadorAndar}
            })
          }
        })
      }
      
      if (nivelAcessoConcessao.id) {
        this.nivelAcessoConcessaoService.updateNivelAcessoConcessao(nivelAcessoConcessao)
          .subscribe(({ data }: update_NivelAcessoConcessao) => {
            const objeto: any = JSON.parse(data.concessaoNivelAcesso_Alterar.objeto);
            if (data.concessaoNivelAcesso_Alterar.sucesso == true) {
              const find = { field: "id", value: objeto.Id }
              this.update_Grid(find);
              this.onClose_Click();
            } else {
              this.alertService.show(data.concessaoNivelAcesso_Alterar.mensagemTipo,
                data.concessaoNivelAcesso_Alterar.mensagem,
                objeto);
            }
            this.showSpinner = false;
          })
      } else {
        this.nivelAcessoConcessaoService.createNivelAcessoConcessao(nivelAcessoConcessao)
          .subscribe(({ data }: create_NivelAcessoConcessao) => {
            const objeto: any = JSON.parse(data.concessaoNivelAcesso_Inserir.objeto);
            if (data.concessaoNivelAcesso_Inserir.sucesso == true) {
              const find = { field: "id", value: objeto.Id };
              this.onClose_Click(false);
              this.update_Grid(find);
            } else {
              this.alertService.show(data.concessaoNivelAcesso_Inserir.mensagemTipo,
                data.concessaoNivelAcesso_Inserir.mensagem,
                objeto);
            }
            this.showSpinner = false;
          })
      }
    }
  }

  onAreaNivel_Click(type: any) {
    switch (type) {
      case "insert":
        this.nivelAcessoModalService.show(null, true);
        break;

      case "view":
        this.nivelAcessoModalService.show(this.areaNivelAcesso, false);
        break;  
  
      case "edit":
        this.nivelAcessoModalService.show(this.areaNivelAcesso, true);
        break;  
    
      case "delete":
        const areaNivelAcesso = this.listView_AreaNivel.dataGridBehavior?.value;
        const indexId = areaNivelAcesso?.findIndex(item => item.id == this.areaNivelAcesso.id);
        if (indexId >= 0) {
          this.areaNivelAcesso = undefined;
          areaNivelAcesso.splice(indexId, 1);
          this.listView_AreaNivel.gridUpdate(areaNivelAcesso);
          this.btAreaEdit();
        }
        break;

      default:
        break;
     
    }
  }

  btAreaEdit() {
    if(!this.editable) {
      this.boxArea.disable('btInsert');
    } else {
      this.boxArea.enable('btInsert');
    }

    if(this.areaNivelAcesso) {
      if(this.editable) this.boxArea.enable('btEdit');
      if(this.editable) this.boxArea.enable('btDelete');
      this.boxArea.enable('btView');
    } else {      
      this.boxArea.disable('btEdit');
      this.boxArea.disable('btDelete');
      this.boxArea.disable('btView');
    }
  }

  update_Grid(find?: Find, filter?: Filter){
    const nivelAcessoValidade: NivelAcessoValidade[] = [];
    this.listView_NivelAcesso.processingShow();
    this.nivelAcessoConcessaoService.readNivelAcessoConcessao(this.order_by, this.filter)
      .subscribe(({ concessaoNivelAcesso}: read_NivelAcessoConcessao) =>{
          const nodes: NivelAcessoConcessao[] = concessaoNivelAcesso?.nodes;
          nodes?.forEach(validade => {
          nivelAcessoValidade.push({"id": validade.id,
                                    "nome": validade.nome,
                                    "tipo": validade.tipo,
                                    "validadeNivel": (this.datePipe.transform(validade.validadeInicial, "dd/MM/yyyy") || "") + " - " + 
                                                     (this.datePipe.transform(validade.validadeFinal, "dd/MM/yyyy") || ""),
                                    "status": validade.status,
                                    "observacao": validade.observacao})
            })
        this.actionbuttomService.enableButtons(0);
        this.listView_NivelAcesso.gridUpdate(nivelAcessoValidade, find);
        
      })
  }

  onNivelAcessoSelect(area: any) {
    const areasNivel = this.listView_AreaNivel?.dataGridBehavior.value || [];
    const index: number = areasNivel.findIndex(areaNivel => areaNivel.id == area.id);
    if(index >= 0) {
      areasNivel.splice(index, 1);
    }
    areasNivel.push(area);
    this.listView_AreaNivel.gridUpdate(areasNivel);
    this.areaNivelAcesso = undefined;
    this.btAreaEdit();
  }

  onClose_Click(hideForm: boolean = true) {
    this.nomeNivel_Text.clear();
    this.restricao_Option.uncheck(1);
    this.inicial_Mult_Validade.clear();
    this.final_Mult_Validade.clear();
    this.observacao_Text.clear();
    this.listView_AreaNivel.clear();
    this.estado_Options.select(1);
    this.inicial_Mult_Hora.clear();
    this.final_Mult_Hora.clear();
    this.inicial_Mult_Data.clear();
    this.final_Mult_Data.clear();

    this.tabNivel.select('tabNivel');

    this.areaNivelAcesso = undefined;
    this.btAreaEdit();

    if(hideForm == true) {
      this.actionbuttomService.hideForm()
    }
  }

  ngOnDestroy() {
    this.settings.unsubscribe();
  }

}