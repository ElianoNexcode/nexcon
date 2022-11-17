import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { SortOperationKind } from 'src/app/@core/api/generic-graphql';
import { NivelAcessoConcessao, NivelAcessoConcessaoData, NivelAcessoFilter, NivelAcessoSort, read_NivelAcessoConcessao } from 'src/app/@core/data/concessao-nivel-acesso';
import { read_Site, Site, SiteData } from 'src/app/@core/data/reparticao-site';
import { Filter, Find, ListViewGrid, rowSelect } from '../../components';
import { AlertServiceComponent } from '../../components/form/alert-card/service/alert-card.service';
import { ComboOptions, Item } from '../../components/form/combobox/service/combobox.service';
import { UsuarioNivelAcessoModalService } from './service/usuario-nivel-acesso-modal.service';

@Component({
    selector: 'nex-usuario-nivel-acesso-modal',
    templateUrl: './usuario-nivel-acesso-modal.component.html',
    styleUrls: ['./usuario-nivel-acesso-modal.component.scss']
  })
  export class UsuarioNivelAcessoModalComponent implements OnInit {

    @ViewChild('btModalOk') btModal: ElementRef<HTMLButtonElement>;

    @Input() title: string;
    @Input() nivelAcessoModal: UsuarioNivelAcessoModalService;
    @Output() eventSelect: EventEmitter<any> = new EventEmitter(null);

    alertService: AlertServiceComponent = new AlertServiceComponent();

    listView_NivelAcesso: ListViewGrid = new ListViewGrid();
    nivelAcessoSelect: NivelAcessoConcessao;

    site_Option: ComboOptions = new ComboOptions();
    siteId: number;
 
    constructor(private siteService: SiteData,
                private nivelAcessoService: NivelAcessoConcessaoData) {
   
      this.listView_NivelAcesso.name = "lstRecepcaoNivelAcesso";
      this.listView_NivelAcesso.gridOnly = true;
      this.listView_NivelAcesso.noPaging = true;
      this.listView_NivelAcesso.noBorder = true;
      this.listView_NivelAcesso.maxHeight = 203;
      this.listView_NivelAcesso.grid = [{"header":"Nível de Acesso", "field":"nome", "width": 100, "align": "left"}];

      this.update_Grid();

    }

    ngOnInit(): void {
      this.nivelAcessoModal.showSubject
        .subscribe(() => {
          this.siteService.orderBy = { nome: SortOperationKind.ASC};
          this.siteService.where = null; 
          this.siteService.read(true)
              .subscribe(( { reparticaoSite }: read_Site ) =>{
                  const nodes: Site[] = reparticaoSite.nodes;
                  this.site_Option.addRange(nodes?.map((site, index) => {
                    return {id: site.id, text: site.nome, value: site.nome, select: index == 0}
                  }));
                  this.onSiteOption_Change({id: this.site_Option.itemSelected?.id}); 
              });          
        });
        
    }

    onListViewNivelSelect(rowSelect?: any) {
      if(rowSelect.registro) {
        this.btModal?.nativeElement.removeAttribute('disabled');
        this.nivelAcessoSelect = rowSelect.registro;
        this.btModal?.nativeElement.focus();
      }
    }
  
    onSiteOption_Change(siteSelect: Item) {
      console.log(siteSelect);
      if(siteSelect) {
        this.siteId = siteSelect.id;
        this.update_Grid();
      }
    }

    update_Grid(find?: Find, filter?: Filter){
      this.listView_NivelAcesso.processingShow();
      console.log(this.nivelAcessoModal?.tipo);
      const sortNivelAcesso: NivelAcessoSort = { nome: SortOperationKind.ASC};
      const filterNivelAcesso: NivelAcessoFilter = { areas: {all: {area: {setor: {siteId: {eq: this.siteId}}}}},
                                                     tipo: (this.nivelAcessoModal?.tipo > 1)? undefined: {eq: this.nivelAcessoModal?.tipo} };
        this.nivelAcessoService.readNivelAcessoConcessao(sortNivelAcesso, filterNivelAcesso)
          .subscribe(({ concessaoNivelAcesso}: read_NivelAcessoConcessao) => {
            this.listView_NivelAcesso.gridUpdate(concessaoNivelAcesso?.nodes,find,filter);
          });
    }

    onAplicar_Click() {
      const index: number = this.nivelAcessoModal
        .nivelAcessoList?.findIndex(nivel => nivel == this.nivelAcessoSelect.id);
      if(index >= 0) {
        this.alertService.show('ERRO',
                               'O Nível de Acesso selecionado já faz parte do quadro Nível de Acesso desta Recepção. Verifique!',
                               null);
      } else {
        this.eventSelect.emit({site: {id: this.site_Option.itemSelected.id,
                                      nome: this.site_Option.itemSelected.text},
                               nivelAcesso: this.nivelAcessoSelect});
        this.onClose_Click();
      }
    }
  
    onClose_Click() {
      this.btModal?.nativeElement.setAttribute('disabled', 'true');
      this.site_Option.clear();
      this.nivelAcessoSelect = undefined;
      this.listView_NivelAcesso.clear();
      this.nivelAcessoModal.hide();
    }

}
