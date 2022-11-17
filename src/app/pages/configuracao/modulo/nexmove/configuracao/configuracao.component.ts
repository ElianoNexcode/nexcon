import { ActionButtomService } from 'src/app/@theme/components/grid/action-buttom/service/action-button.service';
import { AlertServiceComponent } from 'src/app/@theme/components/form/alert-card/service/alert-card.service';
import { OptionsGroup } from 'src/app/@theme/components/form/select-group/service/select-group.service';
import { ComboOptions } from 'src/app/@theme/components/form/combobox/service/combobox.service';
import { Filter, Find, InputLabel, ListViewGrid } from 'src/app/@theme/components';
import { NavigationEnd, Router, RouterEvent } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { filter } from 'rxjs/operators';
import { autorizacaoAcesso, 
         ConfiguracaoData, 
         ConfiguracaoNexmove, 
         identificacaoNexmove, 
         indeterminado, 
         read_ConfiguracaoNexmove, 
         saidaAcesso, 
         update_ConfiguracaoNexmove} from 'src/app/@core/data/modulo-nexmove-configuracao';

@Component({
  selector: 'nex-configuracao-nexmove',
  templateUrl: './configuracao.component.html',
  styleUrls: ['./configuracao.component.scss']
})
export class ConfiguracaoNexmoveClass implements OnInit {

id: number = 0;
identificacao_Options: ComboOptions = new ComboOptions();
acessoAutorizacao_Option: OptionsGroup = new OptionsGroup(); 
acessoIngresso_Text: InputLabel = new InputLabel(); 
acessoIngressoIndeterminado_Option: OptionsGroup = new OptionsGroup(); 
acessoSaida_Option: OptionsGroup = new OptionsGroup();
qrcodeValidacao_Options: ComboOptions = new ComboOptions();
funcoes_Option: OptionsGroup = new OptionsGroup();


showSpinner: boolean = false;
alertService: AlertServiceComponent = new AlertServiceComponent();
savedCondition: boolean = false ;                                   
listView_Nexmove: ListViewGrid = new ListViewGrid();
configuracaoNexmove: ConfiguracaoNexmove
                               
                                
                                               
  constructor(  public actionbuttomService: ActionButtomService,
                private configuracaoNexmoveService: ConfiguracaoData,
                private router: Router) {


    this.actionbuttomService.relationGrid = "lstNexmove";

    this.actionbuttomService.recurso = "";
    this.actionbuttomService.top_action_buttons = [{"id": 0, "text": "forms.buttons.update", "enabled": false, "condition": "select", "openForm": true,  "editable": "yes",},
                                                   {"id": 1, "text": "forms.buttons.read",   "enabled": false, "condition": "select", "openForm": true,  "editable": "no",}]


    this.listView_Nexmove.name = "lstNexmove";
    this.listView_Nexmove.title = "Configuração de Integração com o NEXMOVE";
    this.listView_Nexmove.grid = [{"header": "Identificação", field: "identificacao", "width": 15, "align": "left", "enum": identificacaoNexmove},
                                  {"header": "Acesso", field: "acessoAutorizacao", "width": 15, "align": "left", "enum": autorizacaoAcesso},
                                  {"header": "Ingresso", field: "acessoIngresso", "width": 15, "align": "left"},
                                  {"header": "Saída", field: "acessoSaida", "width": 15, "align": "left", "enum": saidaAcesso},
                                  {"header": "Validação QR CODE", field: "qrcodeValidacao", "width": 40, "align": "left"}];


    this.identificacao_Options.name = "cbidentificacao";
    this.identificacao_Options.add("RECEPÇÃO","recepcao", 1, true);
    this.identificacao_Options.add("TOTEM","totem", 2, false);
    this.identificacao_Options.add("AUTOMÁTICA","automatica", 3, false);

    this.acessoAutorizacao_Option.add(0, "Entrada","entrada",true);
    this.acessoAutorizacao_Option.add(1, "Saída","saida",true);

    this.acessoIngresso_Text.name = "txtIngresso"
    this.acessoIngresso_Text.rules = "onlynumbers";
    this.acessoIngresso_Text.maxLength = 3;
    this.acessoIngresso_Text.minLength = 1;
    this.acessoIngresso_Text.text ="1";

    this.acessoIngressoIndeterminado_Option.add(-1, "Indeterminado", "indeterminado");

    this.acessoSaida_Option.add(1, "Liberada independente da validade", "liberadaIndependente");

    this.qrcodeValidacao_Options.name = "cbtempoValidacao"
    
    for (let i:number = 5; i <= 300; i ++){

      const idTempo:string = i.toString();

      this.qrcodeValidacao_Options.add(idTempo,idTempo,i,i== 10?true:false);

    }
    
    this.funcoes_Option.add(0, "SE PRIMEIRA VISITA,COMPARECER A RECEPÇÃO","sePrimeiraVisita",true);
    this.funcoes_Option.add(1, "AGENDAMENTO DE VISITA","agendamentoDeVisita",true);

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
    this.savedCondition = false;
    switch(actionButtomSelect.text) {
      case "forms.buttons.update": 
            this.updateDataLoad();
            this.identificacao_Options.focus();
        break;   
      case "forms.buttons.read":
            this.updateDataLoad();
        break;
    }
  }

  updateDataLoad(){
  this.showSpinner = true;
  this.configuracaoNexmoveService.readConfiguracaoNexmove()
    .subscribe(({ integracaoNexmove}:read_ConfiguracaoNexmove) => {
        this.showSpinner = false;
        this.configuracaoNexmove = integracaoNexmove.nodes[0];
        this.id = this.configuracaoNexmove.id;
        this.identificacao_Options.select(this.configuracaoNexmove.identificacao);
        this.acessoAutorizacao_Option.populateBy_DEC(this.configuracaoNexmove.acessoAutorizacao);
        this.acessoIngresso_Text.text = this.configuracaoNexmove.acessoIngresso.toString(); 
        this.acessoSaida_Option.check(1,(this.configuracaoNexmove.acessoSaida));
        this.qrcodeValidacao_Options.select(this.configuracaoNexmove.qrcodeValidacao);
        this.funcoes_Option.check(0,(this.configuracaoNexmove.funcaoIdentificacao));
        this.funcoes_Option.check(1,(this.configuracaoNexmove.funcaoAgendamento));     
        this.onIndeterminado_Change();
        this.onAcesso_Change()
    })
  }
  
  onSaved_Condition() {
    this.savedCondition = true;
  
  } 

  onSave_Click(){
      const nexmove: ConfiguracaoNexmove = { id: this.id,
                                  identificacao: this.identificacao_Options.itemSelected.id ,
                              acessoAutorizacao: this.acessoAutorizacao_Option.valueOf_All(),
                                 acessoIngresso: this.acessoIngressoIndeterminado_Option.valueOf_All() == 0? parseInt (this.acessoIngresso_Text.text): -1,
                                    acessoSaida: this.acessoSaida_Option.valueOf("liberadaIndependente"),
                                qrcodeValidacao: this.qrcodeValidacao_Options.itemSelected.id,
                              funcaoAgendamento: this.funcoes_Option.valueOf("sePrimeiraVisita"),
                            funcaoIdentificacao: this.funcoes_Option.valueOf("agendamentoDeVisita")} 
                                
      this.configuracaoNexmoveService.updateConfiguracaoNexmove(nexmove)
        .subscribe(({ data }: update_ConfiguracaoNexmove) => {
          const objeto: any = JSON.parse(data.integracaoNexmove_Alterar.objeto);
          if(data.integracaoNexmove_Alterar.sucesso == true){
            const find = {field: "id", value:objeto.Id};
            this.onClose_Click();
            this.update_Grid(find);
            this.onIndeterminado_Change();
          } else {
            this.alertService.show(data.integracaoNexmove_Alterar.mensagemTipo,
                                   data.integracaoNexmove_Alterar.mensagem,
                                   objeto);
            }
        })                                  
  }

  onClose_Click(hideForm: boolean = true){
    this.actionbuttomService.hideForm();
    this.identificacao_Options.clearSelect();
    this.acessoAutorizacao_Option.reset();
    this.acessoIngresso_Text.clear();
    this.acessoIngressoIndeterminado_Option.reset();
    this.acessoSaida_Option.reset();
    this.qrcodeValidacao_Options.clearSelect();
    this.funcoes_Option.reset();
    
  }

  update_Grid(find?: Find, filter?: Filter){
  this.listView_Nexmove.processingShow();
  this.configuracaoNexmoveService.readConfiguracaoNexmove()
    .subscribe(({ integracaoNexmove}:read_ConfiguracaoNexmove) => {
      this.actionbuttomService.enableButtons(0);
      this.listView_Nexmove.gridUpdate(integracaoNexmove.nodes, find, filter)
    }) 
  }

  onIndeterminado_Change(){
    if(this.acessoIngresso_Text.text == "-1"  ){
      this.acessoIngressoIndeterminado_Option.check(-1);
      this.acessoIngresso_Text.clear();
      this.acessoIngresso_Text.disabled = true;
    }else if (this.acessoIngressoIndeterminado_Option.valueOf("indeterminado") == true){
      this.acessoIngressoIndeterminado_Option.check(-1);
      this.acessoIngresso_Text.clear();
      this.acessoIngresso_Text.disabled = true;
    }else{
     this.acessoIngresso_Text.disabled = false;
     this.acessoIngressoIndeterminado_Option.uncheck(-1);
     this.acessoIngresso_Text.text = this.acessoIngresso_Text.text == ""? "1":this.acessoIngresso_Text.text;
    }
  }

  onAcesso_Change(){
    if(this.acessoAutorizacao_Option.valueOf("saida") == false ){
      this.acessoSaida_Option.uncheck(1);
      
    } 
    
  }

}

