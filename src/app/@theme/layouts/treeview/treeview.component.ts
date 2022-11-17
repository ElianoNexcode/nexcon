import { Component, OnDestroy, OnInit } from '@angular/core';
import { delay } from 'rxjs/operators';

import { ComboOptions, Item } from 'src/app/@theme/components/form/combobox/service/combobox.service';
import { ConfigStorage, SiteConfig, OrganizacaoConfig } from 'src/app/@core/storage/config/config';
import { SiteData, Site } from 'src/app/@core/data/reparticao-site';
import { OrganizacaoData, Organizacao } from 'src/app/@core/data/sistema-organizacao';

import { TreeviewService } from './service/treeview.service';
import { Item as ItemTreeView } from './service/treeview';
import { SortOperationKind } from 'src/app/@core/api/generic-graphql';

@Component({
  selector: 'nex-treeview',
  templateUrl: './treeview.component.html',
  styleUrls: ['./treeview.component.scss']
})
export class TreeviewComponent implements OnInit, OnDestroy {

    cbSites: ComboOptions = new ComboOptions();
    cbOrganizacao: ComboOptions = new ComboOptions();

    constructor(public treeviewService: TreeviewService,
                private siteService: SiteData,
                private organizacaoService: OrganizacaoData,
                private configStorage: ConfigStorage) { 
     
        this.cbSites.name = "cbSites";
        this.cbOrganizacao.name = "cbOrganizacao";

    }

    ngOnInit() {
        this.treeviewService.siteSubject()
            .pipe(delay(0))
            .subscribe(data => {
                if(data != null) {
                    const sites: Site[] = data;
                    const siteSelected: Item = Object.assign(this.cbSites.itemSelected);
                    this.cbSites.clear();
                    sites.forEach((site: Site) => {
                        this.cbSites.add(site.nome, null, site.id, (siteSelected.id == site.id), false, "cloud");
                    })    
                }
            });

        this.treeviewService.organizacaoSubject()
            .pipe(delay(0))
            .subscribe(data => {
                if(data != null) {
                    const organizacao: Organizacao = data[0];
                    const organizacaoSelected: Item = Object.assign(this.cbOrganizacao.itemSelected);
                    const organizacaoLogo = this.configStorage.converteImagemBase64(organizacao.organizacaoImagem);

                    this.cbOrganizacao.clear();
                    this.cbOrganizacao.itemSelected.id = organizacaoSelected.id;
                    this.cbOrganizacao.itemSelected.text = organizacao.organizacaoNome;
                    this.cbOrganizacao.itemSelected.value = null;
                    this.cbOrganizacao.itemSelected.icon = "globe";

                    this.configStorage.setConfig<OrganizacaoConfig>({organizacaoNome: organizacao.organizacaoNome,
                                                                     organizacaoLogo: organizacaoLogo}, "organizacao");
                }
            });

        this.siteService.orderBy = {nome: SortOperationKind.ASC};
        this.siteService.where = null;
        
        this.siteService.read(true, false)
            .subscribe(({ reparticaoSite }) => {

                reparticaoSite.nodes.forEach(site => {
                    this.cbSites.add(site.nome, null, site.id, false, false, "cloud");
                });
                const config: SiteConfig = <SiteConfig>this.configStorage.getConfig<SiteConfig>("site");
                let siteConfig: SiteConfig;
                if(config.nome) {
                    this.cbSites.itemSelected = { id: config.id, 
                                                  text: config.nome, 
                                                  value: null, 
                                                  icon: "cloud" };
                    siteConfig = config;

                } else {
                    const siteId: number = reparticaoSite.nodes[0].id? reparticaoSite.nodes[0].id: 0;
                    const siteNome: string = reparticaoSite.nodes[0].nome? reparticaoSite.nodes[0].nome: "";
                    const siteIcon: string = reparticaoSite.nodes[0].id? "cloud": null;
                    this.cbSites.itemSelected = { id: siteId,
                                                  text: siteNome,
                                                  value: null,
                                                  icon: siteIcon };
                    siteConfig = {id: reparticaoSite.nodes[0]?.id, nome: reparticaoSite.nodes[0]?.nome}
                }
                this.configStorage.setConfig<SiteConfig>(siteConfig, "site");
            })

        this.organizacaoService.readOrganizacoes()
            .subscribe(({ sistemaOrganizacao }) => {
                sistemaOrganizacao.nodes.forEach(organizacao => {
                    this.cbOrganizacao.add(organizacao.organizacaoNome, null, organizacao.id, false, false, "globe");
                });
                const config: OrganizacaoConfig = <OrganizacaoConfig>this.configStorage.getConfig("organizacao");
                let organizacaoConfig: OrganizacaoConfig;
                if(config.organizacaoNome) {
                    this.cbOrganizacao.itemSelected = { id: 1, 
                                                        text: config.organizacaoNome, 
                                                        value: null, 
                                                        icon: "globe" };
                    organizacaoConfig = config;

                } else {
                    this.cbOrganizacao.itemSelected = { id: sistemaOrganizacao.nodes[0].id,
                                                        text: sistemaOrganizacao.nodes[0].organizacaoNome,
                                                        value: null,
                                                        icon: "globe" };
                    organizacaoConfig = {organizacaoNome: sistemaOrganizacao.nodes[0].organizacaoNome}
                }
                this.configStorage.setConfig<OrganizacaoConfig>(organizacaoConfig, "organizacao");
            }) 
    }

    flipIt() {
        this.treeviewService.flipped = !this.treeviewService.flipped;
    }

    selectTreeview(id: string, itens: ItemTreeView[], parentId: number, hasChild: boolean) {
        this.clearTView(itens);

        document.getElementById('tview-' + id).classList.add("actived");

        if(parentId > 0) {
            document.getElementById('tview-' + parentId).classList.remove("actived");
        }
        
        if(!hasChild) {
            this.treeviewService.itemBehavior?.next(id);
        }
       
    }

    clearTView(itens: any[]) {
        let itemLen = itens.length -1;
        for(let i = 0; i<= itemLen; i++) {
            document.getElementById('tview-' + itens[i].id).classList.remove("actived");

            if(itens[i].subitem != undefined) {
                for(let k = 0; k <= itens[i].subitem.length - 1; k++) {
                    document.getElementById('tview-' + itens[i].subitem[k].id)?.classList.remove("actived");
                    if(itens[i].subitem[k].modulos != undefined) {
                        for(let l = 0; l <= itens[i].subitem[k].modulos.length - 1; l++) {
                            document.getElementById('tview-' + itens[i].subitem[k].modulos[l].id)?.classList.remove("actived");
                        }    
                    }        
                }
            }

            if(itens[i].modulos != undefined) {
                for(let l = 0; l <= itens[i].modulos.length - 1; l++) {
                    document.getElementById('tview-' + itens[i].modulos[l].id)?.classList.remove("actived");
                }    
            }
        }
    }

    cbSites_Change(siteSelect: {id: number, text: string, value: string}) {
        try {
            const site: SiteConfig = {id: siteSelect.id, nome: siteSelect.text } ;
            this.configStorage.setConfig<SiteConfig>(site, "site")
        } catch(e) {
            // Tratar Try-Catch...
        }
    }

    cbOrganizacao_Change(organizacaoSelect: {id: number, text: string, value: string}) {
        try {
            const organizacao: OrganizacaoConfig = {organizacaoNome: organizacaoSelect.text};
            this.configStorage.setConfig<OrganizacaoConfig>(organizacao, "organizacao");
        } catch(e) {
            // Tratar Try-Catch...
        }
    }

    treeView_Change(){
        try {
            
        } catch {

        }
    }

    ngOnDestroy() {
        this.treeviewService.siteSubject().unsubscribe();
        this.treeviewService.organizacaoSubject().unsubscribe();
        this.treeviewService.itemSubject().unsubscribe();
    }
}