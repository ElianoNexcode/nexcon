import { Injectable } from '@angular/core';
import { GenericGraphQL, SortOperationKind } from 'src/app/@core/api/generic-graphql';

import { SetorReparticaoSchema } from './setor.schema';
import {
    SetorReparticaoData,
    SetorReparticao,
    SetorReparticaoSort,
    SetorReparticaoFilter,
    create_SetorReparticao,
    read_SetorReparticao,
    update_SetorReparticao,
    delete_SetorReparticao
} from 'src/app/@core/data/reparticao-setor';
import { Item, SubItem } from 'src/app/@theme/layouts/treeview/service/treeview';

@Injectable()
export class SetorReparticaoService extends SetorReparticaoData {

    constructor(private graphQL: GenericGraphQL) {
        super();
    }

    createSetorReparticao(setor: SetorReparticao) {
        const variables = { setor: { ...setor }, ... this.graphQL.session };
        return this.graphQL.mutation<create_SetorReparticao>(SetorReparticaoSchema.create_SetorReparticao, variables)
    }

    readSetorReparticao(order_by?: SetorReparticaoSort, where?: SetorReparticaoFilter) {
        const variables = { ... this.graphQL.session, ... { order: order_by }, ... { where: where } }
        return this.graphQL.query<read_SetorReparticao>(SetorReparticaoSchema.read_SetorReparticao, variables);
    }

    updateSetorReparticao(setor: SetorReparticao) {
        const SetorReparticaoInput = { setor: { ...setor }, ...this.graphQL.session }
        return this.graphQL.mutation<update_SetorReparticao>(SetorReparticaoSchema.update_SetorReparticao, SetorReparticaoInput);
    }

    deleteSetorReparticao(id: number) {
        return this.graphQL.mutation<delete_SetorReparticao>(SetorReparticaoSchema.delete_SetorReparticao, { id: id, ...this.graphQL.session })
    }

    getSetorReparticaoTreeView(filter: SetorReparticaoFilter, showArea: boolean = false): Item[] {
        let item: Item[] = [];
        const order_by: SetorReparticaoSort = { nome: SortOperationKind.ASC }
        const variables = { ... this.graphQL.session, ... { order: order_by }, ...{ where: filter } }
        this.graphQL.query<read_SetorReparticao>(SetorReparticaoSchema.read_SetorReparticao, variables)
            .subscribe(({ reparticaoSetor }: read_SetorReparticao) => {
                reparticaoSetor.nodes.forEach((setor: SetorReparticao) => {
                    const setorArea: Item = { id: setor.id.toString(),
                                              text: setor.nome,
                                              icon: "setor.svg",
                                              subitem: [] }
                    if(showArea) {
                        setor.areas.forEach(area => {
                            const areaSetor: SubItem = {
                                "id": area.id.toString(),
                                "text": area.nome,
                                "icon": "area.svg",
                            };
                            setorArea.subitem.push(areaSetor);
                        });
                    }

                    item.push(setorArea);
                })
            })
        return item;
    }
}