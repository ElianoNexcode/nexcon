import { Injectable, OnInit } from '@angular/core';
import { GenericGraphQL } from 'src/app/@core/api/generic-graphql';

import { SiteSchema } from './site.schema';
import { SiteData, 
         Site, 
         SiteSort,
         SiteFilter,
         create_Site, 
         read_Site, 
         update_Site, 
         delete_Site} from 'src/app/@core/data/reparticao-site';
import { ConfigStorage } from 'src/app/@core/storage/config/config';

@Injectable()
export class SiteService extends SiteData {

    orderBy: SiteSort;
    where: SiteFilter;

    constructor(private graphQL: GenericGraphQL,
                private configStorage: ConfigStorage) {
        super();
    }

    createSite(site: Site) {
        const variables = { site: { ... site }, ... this.graphQL.session};
        return this.graphQL.mutation<create_Site>(SiteSchema.create_Site, variables);
    }

    read(isListView: boolean = false, isTreeView: boolean = true) {  
        if(this.configStorage.siteIdFilter)
            this.where = { ... this.where, ... this.configStorage.siteIdFilter };
        const variables = { ... this.graphQL.session, ... {order: this.orderBy}, ... { where: this.where }}
        if(isListView) {
            return this.graphQL.query<read_Site>(SiteSchema.read_Site_ListView, variables);        
        } else if(isTreeView) {
            return this.graphQL.query<read_Site>(SiteSchema.read_Site, variables);
        } else {
            return this.graphQL.query<read_Site>(SiteSchema.read_Site_CRUD, variables);
        }
    }

    updateSite(site: Site) {
        const siteInput = { site: { ... site}, ... this.graphQL.session }
        return this.graphQL.mutation<update_Site>(SiteSchema.update_Site, siteInput);
    }

    deleteSite(id: number) {
        return this.graphQL.mutation<delete_Site>(SiteSchema.delete_Site, { id: id, ... this.graphQL.session })
    }

}