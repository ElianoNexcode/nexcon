import { AfterViewInit, Component, EventEmitter, Input, Output } from "@angular/core";
import { SortOperationKind } from "src/app/@core/api/generic-graphql";
import { ElevadorDispositivo, ElevadorDispositivoData, ElevadorDispositivoFilter, ElevadorDispositivoSort, read_ElevadorDispositivo } from "src/app/@core/data/dispositivo-elevador";
import { AreaReparticao, AreaReparticaoData, AreaReparticaoFilter, AreaReparticaoSort, read_AreaReparticao } from "src/app/@core/data/reparticao-area";
import { SiteConfig } from "src/app/@core/storage/config/config";
import { InputLabel } from "../../components";
import { ComboOptions, Item } from "../../components/form/combobox/service/combobox.service";
import { SelecaoElevadorControladoraModalService } from "./service/selecao-elevador-controladora-modal.service";


@Component({
    selector: 'nex-selecao-elevador-controladora-modal',
    templateUrl: './selecao-elevador-controladora-modal.component.html',
    styleUrls: ['./selecao-elevador-controladora-modal.component.scss']
  })
  export class SelecaoElevadorControladoraModalComponent  implements AfterViewInit{

    @Input() title: string;
    @Input() selecaoElevadorModal: SelecaoElevadorControladoraModalService;
    @Output() eventSelect: EventEmitter<any> = new EventEmitter(null);


    id: number = 0;
    site: SiteConfig

    site_Text: InputLabel = new InputLabel();
    area_Options: ComboOptions = new ComboOptions();
    elevador_Options: ComboOptions = new ComboOptions();

    

    constructor(
                
                private areaReparticaoService: AreaReparticaoData,
                private dispositivoElevadorService: ElevadorDispositivoData){

     

      this.site_Text.name = "txtSite";
      this.site_Text.disable();
    
    

      this.area_Options.name = "cbArea";



    }


    ngAfterViewInit(): void {
      this.selecaoElevadorModal?.siteSubject
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
      const sortElevadorDispositivo : ElevadorDispositivoSort = { nome: SortOperationKind.ASC};
      const filterArea: ElevadorDispositivoFilter = { areaId: {eq: this.area_Options.itemSelected.id} };
      this.dispositivoElevadorService.readElevadorDispositivos(sortElevadorDispositivo,filterArea)
        .subscribe(( {dispositivoElevador}: read_ElevadorDispositivo) => {
          const nodes : ElevadorDispositivo[] = dispositivoElevador.nodes;
          this.elevador_Options.clear();
          nodes.forEach((node:ElevadorDispositivo) => {
            this.elevador_Options.add(node.nome,node.nome,node.id)
          })
        })

    }


    onElevadorSelect(itemSelect?: Item){
        this.eventSelect.emit(itemSelect);
    }



    onOK_Click() {
        this.onElevadorSelect(this.elevador_Options.itemSelected);
        this.onClose_Click();
    }


    onClose_Click() {
      this.selecaoElevadorModal.hide();
      this.area_Options.clearSelect();;
      this.elevador_Options.clear();
    }

}