import { Component, EventEmitter, Input, OnInit, Output} from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { SortOperationKind } from "src/app/@core/api/generic-graphql";
import { AreaReparticao, AreaReparticaoData, AreaReparticaoFilter, AreaReparticaoSort, read_AreaReparticao } from "src/app/@core/data/reparticao-area";
import { AlertServiceComponent } from 'src/app/@theme/components/form/alert-card/service/alert-card.service';
import { read_Site, Site, SiteData } from "src/app/@core/data/reparticao-site";
import { ConfigStorage } from "src/app/@core/storage/config/config";
import { ComboOptions } from "../../components/form/combobox/service/combobox.service";
import { BoxPanel } from "../../layouts/box/service/box.service";
import { TabsService } from "../../layouts/tabs/service/tabs.service";
import { SelecaoBloqueioModalService } from "../selecao-bloqueio/service/selecao-bloqueio-modal.service";
import { SelecaoElevadorModalService } from "../selecao-elevador/service/selecao-elevador-modal.service";
import { SelecaoFaixaHorariaModalService } from "../selecao-faixa-horaria/service/selecao-faixa-horaria-modal.service";
import { NivelAcessoModalService } from "./service/nivel-acesso-modal.service";
import { NivelAcessoConcessao } from "src/app/@core/data/concessao-nivel-acesso";

@Component({
    selector: 'nex-nivel-acesso-modal',
    templateUrl: './nivel-acesso-modal.component.html',
    styleUrls: ['./nivel-acesso-modal.component.scss']
})

export class NivelAcessoModalComponent implements OnInit {

    @Input() nivelAcessoModal: NivelAcessoModalService;
    @Input() title: string;

    @Output() eventNivelAcessoSelect: EventEmitter<any> = new EventEmitter(null);

    areaId: number = 0
    bloqueioSelectGroup: any[] = [];
    elevadorSelectGroup: any[] = [];
    faixaHorariaEntradaSelectGroup: any[] = [];
    faixaHorariaSaidaSelectGroup: any[] = [];

    tabsNivelAcessoModal_Option: TabsService = new TabsService();
    tabsSelecaoModal_Option: TabsService = new TabsService();
    tabsSelecaoFaixaHorariaModal_Option: TabsService = new TabsService();

    alertService: AlertServiceComponent = new AlertServiceComponent();
    alertServiceElevador: AlertServiceComponent = new AlertServiceComponent();
    alertServiceBloqueio: AlertServiceComponent = new AlertServiceComponent();

    settings: BehaviorSubject<any>;

    nivelAcessoConcessao: NivelAcessoConcessao;

    elevadorCount: number = 0;
    bloqueioCount: number = 0;

    site_Option: ComboOptions = new ComboOptions();
    area_Option: ComboOptions = new ComboOptions();
    boxArea_Bloqueio: BoxPanel = new BoxPanel(); 
    boxArea_Elevador: BoxPanel = new BoxPanel();
    boxFaixaHorariaEntrada: BoxPanel = new BoxPanel();
    boxFaixaHorariaSaida: BoxPanel = new BoxPanel();

    selecaoBloqueioModalService: SelecaoBloqueioModalService = new SelecaoBloqueioModalService();
    selecaoElevadorModalService: SelecaoElevadorModalService = new SelecaoElevadorModalService();
    selecaoFaixaHorariaModalService: SelecaoFaixaHorariaModalService = new SelecaoFaixaHorariaModalService();

    constructor( private siteService: SiteData,
                 private areaReparticaoService: AreaReparticaoData,
                 private config: ConfigStorage ){

        this.settings = this.config.siteSubject();

        this.tabsNivelAcessoModal_Option.add("tabAreaModal", "Área", true);
        this.tabsNivelAcessoModal_Option.add("FaixaHorariaModal", "Faixa Horária", false, "block");
        
        this.site_Option.name = "cbSite";
        this.area_Option.name = "cbArea";

        this.tabsSelecaoModal_Option.add("tabBloqueioModal", "Bloqueio", true);
        this.tabsSelecaoModal_Option.add("tabElevadorModal", "Elevador", false, "block");

        this.tabsSelecaoFaixaHorariaModal_Option.add("tabEntradaModal", "Entrada", true);
        this.tabsSelecaoFaixaHorariaModal_Option.add("tabSaidaModal", "Saída", false, "block");

        this.boxArea_Bloqueio.add("btCheckBloqueio", "check", false);
        this.boxArea_Elevador.add("btCheckElevador", "check", false);
        this.boxFaixaHorariaEntrada.add("btCheckFaixaEntrada", "check", false);
        this.boxFaixaHorariaSaida.add("btCheckFaixaSaida", "check", false);

        this.siteService.orderBy = { nome: SortOperationKind.ASC};
        this.siteService.where = null; 
        this.siteService.read()
            .subscribe(( { reparticaoSite }: read_Site ) =>{
                const nodes: Site[] = reparticaoSite.nodes;
                nodes.forEach((node: Site) => {
                    this.site_Option.add(node.nome, node.nome, node.id);
                });
                this.onSiteOption_Change(); 
            });
    }

    ngOnInit(): void {
        this.nivelAcessoModal?.showSubject
            .subscribe(() => {
                const nivelAcesso = this.nivelAcessoModal?.nivelAcesso;
                this.areaId = nivelAcesso?.id;

                if(nivelAcesso?.siteId) {
                    this.site_Option.select(nivelAcesso?.siteId);
                } else {
                    const siteId: number = this.site_Option.itens[0]?.id;
                    this.site_Option.select(siteId);
                }
                
                this.onSiteOption_Change(false);
                this.bloqueioSelectGroup = nivelAcesso?.bloqueios?.map(item => {
                    return {id: item.bloqueioId,
                            nome: item.bloqueio.nome}
                    }) || [];
                this.elevadorSelectGroup = nivelAcesso?.elevadores || [];
                this.faixaHorariaEntradaSelectGroup = nivelAcesso?.faixasHorarias?.filter(faixaHoraria => faixaHoraria.faixaTipo == 1)
                    .map(item => {
                        return {id: item.faixaHorariaId,
                                nome: item.faixaHoraria?.nome,
                                tipo: item.faixaTipo}
                    }) || [];
                this.faixaHorariaSaidaSelectGroup = nivelAcesso?.faixasHorarias?.filter(faixaHoraria => faixaHoraria.faixaTipo == 2)
                    .map(item => {
                        return {id: item.faixaHorariaId,
                                nome: item.faixaHoraria?.nome,
                                tipo: item.faixaTipo}
                    }) || [];
            });
    }

    updateDataLoad(){            
        const filterNivel: AreaReparticaoFilter = {id: {eq: this.areaId}};
        const sortNivel: AreaReparticaoSort = {nome: SortOperationKind.ASC};
        this.areaReparticaoService.readAreaReparticao(sortNivel, filterNivel)
            .subscribe(({ reparticaoArea }:read_AreaReparticao ) => {
                const node = reparticaoArea.nodes[0]; 
                this.site_Option.select(node.setor.siteId);
                this.onSiteOption_Change();                
            });
    }

    onSiteOption_Change(areaChange: boolean = true){
        // this.nivelAcessoModal.areas[this.nivelAcessoModal.areaIndex].area = {setorId: this.site_Option.itemSelected.id}; bloco de codigo para ser analisado !
        const sortAreaReparticao : AreaReparticaoSort = { nome: SortOperationKind.ASC};
        const filterSite: AreaReparticaoFilter = { setor: {siteId: {eq: this.site_Option.itemSelected?.id}}};
        this.areaReparticaoService.readAreaReparticao(sortAreaReparticao,filterSite)
            .subscribe(( { reparticaoArea}: read_AreaReparticao) => {   
                const nodes : AreaReparticao[] = reparticaoArea?.nodes;                  
                this.area_Option.clear(); 

                if(nodes?.length > 0) {
                    this.area_Option.enable();
                    nodes.forEach((node: AreaReparticao) =>{       
                        this.area_Option.add(node.nome, node.nome, node.id, (node.id == this.areaId));
                    });                    
                } else {
                    this.area_Option.disable();
                }
                this.onAreaOption_Change(areaChange);
            });  
    }

    onAreaOption_Change(areaChange: boolean = true){
        const sortAreaReparticao : AreaReparticaoSort = { nome: SortOperationKind.ASC};
        const filterArea: AreaReparticaoFilter = { id: {eq: this.area_Option.itemSelected.id} };
        this.areaReparticaoService.readAreaReparticao(sortAreaReparticao,filterArea)
            .subscribe(({reparticaoArea}: read_AreaReparticao) => {   
                const node : AreaReparticao = reparticaoArea.nodes[0];   
                this.bloqueioCount = node?.bloqueios.length;
                this.elevadorCount = node?.elevadores.length;

                if(areaChange) {
                    this.bloqueioSelectGroup = [];
                    this.elevadorSelectGroup = [];    
                }        
            });
    }
    
    onSelecaoBloqueio_Click(type: any){
        if(this.bloqueioCount > 0 && this.area_Option.itemSelected.id != 0){
            this.selecaoBloqueioModalService.show(this.area_Option.itemSelected?.id,
                                                  this.bloqueioSelectGroup?.map(item => {
                                                    return item.id
                                                  }));
        } else{
            this.alertServiceBloqueio.show("ERRO",
                                           "Não existe bloqueio configurado para a Área selecionada. Verifique!",
                                           null);  
        }
    }
 
    onSelecaoElevador_Click(type: any){
        if(this.elevadorCount > 0 && this.area_Option.itemSelected.id !=0){
            this.selecaoElevadorModalService.show(this.area_Option.itemSelected?.id,
                                                  this.elevadorSelectGroup);
        } else{
            this.alertServiceElevador.show("ERRO",
                                           "Não existe elevador configurado para a Área selecionada. Verifique!",
                                           null);  
        }
    }

    onSelecaoFaixaHoraria_Click(type: any){
        const paramList = [... this.faixaHorariaEntradaSelectGroup,
                           ... this.faixaHorariaSaidaSelectGroup]  
        this.selecaoFaixaHorariaModalService.show(paramList);
    }

    onBloqueioSelectGroup(itensSelected: any[]){
        this.bloqueioSelectGroup = itensSelected.filter(item => item.checked[0] == true);
    }

    onElevadorSelectGroup(itemSelected: any){
        const index: number = this.elevadorSelectGroup.findIndex(elevador => elevador.elevadorId == itemSelected.elevadorId);
        if(index >= 0) {
            this.elevadorSelectGroup.splice(index, 1);
        }
        this.elevadorSelectGroup.push(itemSelected);
    }

    onFaixaHorariaSelectGroup(itemSelected: any[]){ 
        this.faixaHorariaEntradaSelectGroup = itemSelected.filter(item => item.tipo == 1 || item.tipo == 3);
        this.faixaHorariaSaidaSelectGroup = itemSelected.filter(item => item.tipo == 2 || item.tipo == 3) 
    }

    onSave_Click(){
        if(this.bloqueioSelectGroup.length == 0 && this.elevadorSelectGroup.length == 0) {
            this.alertService.show("ERRO",
                "Ao menos um Bloqueio ou Elevador deve ser selecionado. Verifique!",
                null);  
        } else if(this.faixaHorariaEntradaSelectGroup?.length == 0 && this.faixaHorariaSaidaSelectGroup?.length == 0) {
            this.alertService.show("ERRO",
                "Ao menos uma Faixa Horária deve ser selecionada. Verifique!",
                null);  
        } else {
            const faixasHorarias = [ ...this.faixaHorariaEntradaSelectGroup.map(faixa => {
                                            return {faixaHorariaId: faixa.id,
                                                    faixaTipo: 1,
                                                    faixaHoraria: {nome: faixa.nome}}}),
                                     ...this.faixaHorariaSaidaSelectGroup.map(faixa => {
                                            return {faixaHorariaId: faixa.id,
                                                    faixaTipo: 2,
                                                    faixaHoraria: {nome: faixa.nome}}})];
            this.eventNivelAcessoSelect.emit({id: this.area_Option.itemSelected.id,
                                              area: this.area_Option.itemSelected.text,
                                              siteId: this.site_Option.itemSelected.id,
                                              site: this.site_Option.itemSelected.text,                                              
                                              bloqueios: this.bloqueioSelectGroup.map(bloqueio => {return {bloqueioId: bloqueio.id,
                                                                                                           bloqueio: {id: bloqueio.id,
                                                                                                                      nome: bloqueio.nome}}}),
                                              elevadores: this.elevadorSelectGroup,
                                              faixasHorarias: faixasHorarias});
            this.onClose_Click();            
        }
    }

    onClose_Click() {
        this.site_Option.clearSelect();
        this.area_Option.clearSelect();
        this.bloqueioSelectGroup = [];
        this.elevadorSelectGroup = [];
        this.faixaHorariaEntradaSelectGroup = [];
        this.faixaHorariaSaidaSelectGroup = [];

        this.tabsNivelAcessoModal_Option.select('tabAreaModal');
        this.tabsSelecaoModal_Option.select('tabBloqueioModal');
        this.tabsSelecaoFaixaHorariaModal_Option.select('tabEntradaModal');

        this.nivelAcessoModal.hide();
    }
 
}