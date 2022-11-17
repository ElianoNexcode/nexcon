import { AfterViewInit, Component, EventEmitter, Input, Output } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { SortOperationKind } from "src/app/@core/api/generic-graphql";
import { BloqueioDispositivo, BloqueioDispositivoData, BloqueioDispositivoFilter, BloqueioDispositivoSort, read_BloqueioDispositivo } from "src/app/@core/data/dispositivo-bloqueio";
import { ControladoraDispositivoFilter } from "src/app/@core/data/dispositivo-controladora";
import { AreaReparticao, AreaReparticaoData, AreaReparticaoFilter, AreaReparticaoSort, read_AreaReparticao } from "src/app/@core/data/reparticao-area";
import { read_Site, Site, SiteData, SiteSort } from "src/app/@core/data/reparticao-site";
import { ConfigStorage, SiteConfig } from "src/app/@core/storage/config/config";
import { InputLabel } from "../../components";
import { ComboOptions, Item } from "../../components/form/combobox/service/combobox.service";
import { SelecaoBloqueioControladoraModalService } from "./service/selecao-bloqueio-controladora-modal.service";


@Component({
    selector: 'nex-selecao-bloqueio-controladora-modal',
    templateUrl: './selecao-bloqueio-controladora-modal.component.html',
    styleUrls: ['./selecao-bloqueio-controladora-modal.component.scss']
  })
  export class SelecaoBloqueioControladoraModalComponent  implements AfterViewInit{

    @Input() title: string;
    @Input() selecaoModal: SelecaoBloqueioControladoraModalService;
    @Output() eventSelect: EventEmitter<any> = new EventEmitter(null);


    id: number = 0;
    site: SiteConfig

    site_Text: InputLabel = new InputLabel();
    area_Options: ComboOptions = new ComboOptions();
    bloqueio_Options: ComboOptions = new ComboOptions();

    

    constructor(
                
                private areaReparticaoService: AreaReparticaoData,
                private dispositivoBloqueioService: BloqueioDispositivoData){

     

      this.site_Text.name = "txtSite";
      this.site_Text.disable();
    
    

      this.area_Options.name = "cbArea";



    }


    ngAfterViewInit(): void {
      this.selecaoModal?.siteSubject
      .subscribe((site: SiteConfig) => {
        this.site = site;
        this.siteNome();
      })
    }


    siteNome(){
      this.site_Text.text = this.site.nome;

      const sortAreaReparticao : AreaReparticaoSort = { nome: SortOperationKind.ASC};
      const filterSite: AreaReparticaoFilter = { setor: {siteId: {eq: this.site.id}} };
        this.areaReparticaoService.readAreaReparticao(sortAreaReparticao,filterSite)
            .subscribe(( { reparticaoArea}: read_AreaReparticao) => {   
                const nodes : AreaReparticao[] = reparticaoArea.nodes;  
                this.area_Options.clear();
                this.area_Options.add("","") 
                nodes.forEach((node:AreaReparticao) =>{       
                    this.area_Options.add(node.nome,node.nome,node.id);      
                }) 
            }) 
            
    }
  

    onAreaOptions_Change(){
      const sortBloqueioDispositivo : BloqueioDispositivoSort = { nome: SortOperationKind.ASC};
      const filterArea: BloqueioDispositivoFilter = { areaId: {eq: this.area_Options.itemSelected.id} };
      this.dispositivoBloqueioService.readBloqueioDispositivos(sortBloqueioDispositivo,filterArea)
        .subscribe(( {dispositivoBloqueio}: read_BloqueioDispositivo) => {
          const nodes : BloqueioDispositivo[] = dispositivoBloqueio.nodes;
          this.bloqueio_Options.clear();
          nodes.forEach((node:BloqueioDispositivo) => {
            this.bloqueio_Options.add(node.nome,node.nome,node.id)
          })
        })

    }


    onBloqueioSelect(itemSelect?: Item){
      this.eventSelect.emit(itemSelect);
  }

    onOK_Click() {
      this.onBloqueioSelect(this.bloqueio_Options.itemSelected);
      this.onClose_Click();
    }

    onClose_Click() {
      this.selecaoModal.hide();
      this.area_Options.clearSelect();
      this.bloqueio_Options.clear();
    }

}