import { Injectable } from '@angular/core';
import { GenericGraphQL, SortOperationKind } from 'src/app/@core/api/generic-graphql';

import { AreaReparticaoSchema } from './area.schema';
import { AreaReparticaoData, 
         AreaReparticao, 
         AreaReparticaoSort,
         AreaReparticaoFilter,
         create_AreaReparticao, 
         read_AreaReparticao, 
         update_AreaReparticao, 
         delete_AreaReparticao} from 'src/app/@core/data/reparticao-area';
import { Item } from 'src/app/@theme/layouts/treeview/service/treeview';
         
@Injectable()
export class AreaReparticaoService extends AreaReparticaoData {

    constructor(private graphQL: GenericGraphQL) {
        super();
    }

    createAreaReparticao(area: AreaReparticao) {
        const variables = { area: { ... area }, ... this.graphQL.session};
        return this.graphQL.mutation<create_AreaReparticao>(AreaReparticaoSchema.create_Area, variables);
    }

    readAreaReparticao(order_by?: AreaReparticaoSort, where?: AreaReparticaoFilter) {
        const variables = { ... this.graphQL.session, ... {order: order_by}, ... {where: where} };
        return this.graphQL.query<read_AreaReparticao>(AreaReparticaoSchema.read_Area, variables);
    }

    readAreaReparticaoRelat(order_by?: AreaReparticaoSort, where?: AreaReparticaoFilter) {
        const variables = { ... this.graphQL.session, ... {order: order_by}, ... {where: where} };
        return this.graphQL.query<read_AreaReparticao>(AreaReparticaoSchema.read_AreaRelat, variables);
    }

    updateAreaReparticao(area: AreaReparticao) {
        const variables = { area: { ... area} , ...this.graphQL.session};
        return this.graphQL.mutation<update_AreaReparticao>(AreaReparticaoSchema.update_Area, variables);
    }

    deleteAreaReparticao(id: number) {
        return this.graphQL.mutation<delete_AreaReparticao>(AreaReparticaoSchema.delete_Area, { id: id , ...this.graphQL.session} );
    }

    getAreaReparticaoTreeView(filter: AreaReparticaoFilter): Item[] {
        let item: Item[] = [];
        const order_by: AreaReparticaoSort = { nome: SortOperationKind.ASC }
        const variables = { ... this.graphQL.session, ... {order: order_by}, ...{where: filter} }
        this.graphQL.query<read_AreaReparticao>(AreaReparticaoSchema.read_Area, variables)
            .subscribe(({ reparticaoArea }: read_AreaReparticao ) => {
                reparticaoArea.nodes.forEach((area: AreaReparticao) => {
                    item.push({
                        id: area.id.toString(),
                        text: area.nome,
                        icon: "grupo.png"
                    })
                })
            })
        return item;
    }

}