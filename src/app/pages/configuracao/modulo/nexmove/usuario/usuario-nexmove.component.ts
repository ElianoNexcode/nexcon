import { Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { SortOperationKind } from 'src/app/@core/api/generic-graphql';
import { PessoaGrupo, PessoaGrupoData, PessoaGrupoFilter, PessoaGrupoSort, read_PessoaGrupo } from 'src/app/@core/data/grupo-pessoa';
import { AreaReparticao, AreaReparticaoData, AreaReparticaoSort, read_AreaReparticao } from 'src/app/@core/data/reparticao-area';
import { PessoaInternaUsuario, PessoaInternaUsuarioData, PessoaInternaUsuarioFilter, PessoaInternaUsuarioSort, read_PessoaInternaUsuario } from 'src/app/@core/data/usuario-pessoa-interna';
import { ConfigStorage, SiteConfig } from 'src/app/@core/storage/config/config';
import { InputLabel } from 'src/app/@theme/components';
import { ComboOptions } from 'src/app/@theme/components/form/combobox/service/combobox.service';
import { ActionButtomService } from 'src/app/@theme/components/grid/action-buttom/service/action-button.service';
import { ListViewGrid } from 'src/app/@theme/components/grid/list-view/service/list-view.service';



@Component({
    selector: 'nex-usuario-nexmove',
    templateUrl: './usuario-nexmove.component.html',
    styleUrls: ['./usuario-nexmove.component.scss']
})

export class UsuarioNexmoveComponent {


  site_Text: InputLabel = new InputLabel();
  grupo_Options: ComboOptions = new ComboOptions();
  area_Options: ComboOptions = new ComboOptions();
  listView_UsuarioNexmove: ListViewGrid = new ListViewGrid();
  savedCondition: boolean = false;
  filterPessoa: PessoaInternaUsuarioFilter;
  usuarioInterno: {}[]=[];

  settings: BehaviorSubject<any>;
 
  constructor(public actionbuttomService: ActionButtomService,
              private pessoaInternaService: PessoaInternaUsuarioData,
              private areaReparticaoService: AreaReparticaoData,
              private pessoaGrupoService: PessoaGrupoData,
              private config: ConfigStorage,) {
  
  this.settings = this.config.siteSubject();


// trocar ActionButtom após término !!!!
    this.actionbuttomService.relationGrid = "lstVeiculoInterno";
    this.actionbuttomService.recurso = "2E";
    this.actionbuttomService.top_action_buttons = [{ "id": 0, "text": "forms.buttons.create", "enabled": true, "condition": "always", "maximized": true, "openForm": true, "editable": "new", },
                                                   { "id": 1, "text": "forms.buttons.update", "enabled": false, "condition": "select", "maximized": true, "openForm": true, "editable": "yes", },
                                                   { "id": 2, "text": "forms.buttons.read", "enabled": false, "condition": "select", "maximized": true, "openForm": true, "editable": "no", },
                                                   { "id": 3, "text": "forms.buttons.delete", "enabled": false, "condition": "multi", "openForm": false, "question": "forms.questions.delete" }]

    this.listView_UsuarioNexmove.name = "lstUsuarioNexmove";
    this.listView_UsuarioNexmove.title = "Lista de Configuração de Usuários do NEXMOVE";
    this.listView_UsuarioNexmove.grid = [{"header": "Site", field: "site", "width": 25, "align": "left"},
                                         {"header": "Observação", field: "observacao", "width": 75, "align": "left"}];


    this.settings
      .subscribe((site: SiteConfig)=> {
        this.site_Text.text = site.nome
      })
    
    this.site_Text.name = 'txtUsuarioSite';
    this.site_Text.disable();


    this.onGrupo_Change();
    this.onArea_Change();



 


  }

  onActionButtom_Click(actionButtomSelect: any) {
    this.savedCondition = false;
    
    switch (actionButtomSelect.text) {
      case "forms.buttons.create": {

        break;
      }
      case "forms.buttons.update": {

        break;
      }
      case "forms.buttons.read": {

        break;
      }
    }
  }

  onGrupo_Change(){
    this.grupo_Options.name = 'cbUsuarioGrupo';
    this.grupo_Options.add('','',0);
    const sortGrupo: PessoaGrupoSort = {pessoaGrupo: SortOperationKind.ASC}
    this.pessoaGrupoService.readPessoaGrupos(sortGrupo)
      .subscribe(({ grupoPessoa }: read_PessoaGrupo) => {
        const nodes: PessoaGrupo[] = grupoPessoa.nodes;
        nodes.forEach((node: PessoaGrupo)=>{
          this.grupo_Options.add(node.pessoaGrupo,node.pessoaGrupo,node.id);
        })
      });
  }


  onArea_Change(){
    this.area_Options.add('','',0);
    const sortArea: AreaReparticaoSort = { nome: SortOperationKind.ASC };
    this.areaReparticaoService.readAreaReparticao(sortArea, null)
      .subscribe(({ reparticaoArea }: read_AreaReparticao) => {
        const nodes: AreaReparticao[] = reparticaoArea.nodes;
        nodes.forEach((node: AreaReparticao) => {
          this.area_Options.add(node.nome, node.nome, node.id)
        })  
      });
  }



  onUsuarioSearch_Click(){

  if(this.area_Options.itemSelected.id == 0 && this.grupo_Options.itemSelected.id == 0 ){
    this.filterPessoa = null
  } else{
    // this.filterPessoa = { and: [{ areaId: {eq: this.area_Options.itemSelected.id}}, 
    //                             {grupoId: {eq: this.grupo_Options.itemSelected.id}}]}  bloco de código para ser revisado !!!
  }
    const sortPessoa: PessoaInternaUsuarioSort = {nome: SortOperationKind.ASC};
    this.pessoaInternaService.readPessoaInternaUsuarios(sortPessoa,this.filterPessoa)
      .subscribe(({ usuarioPessoaInterna }: read_PessoaInternaUsuario) => {
        this.usuarioInterno = usuarioPessoaInterna.nodes
        .map(pessoa => {return {nome:pessoa.nome,
                                grupo: pessoa.grupo.pessoaGrupo,
                                area: pessoa.area.nome}})                            
      })
  }

  onClose_Click(hideForm: boolean = true) {
    this.grupo_Options.clearSelect();
    this.area_Options.clearSelect();
    this.usuarioInterno = undefined;
    this.actionbuttomService.hideForm(true);
  }

}