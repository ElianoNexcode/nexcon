import { Injectable } from '@angular/core';
import { GenericGraphQL, SortOperationKind } from 'src/app/@core/api/generic-graphql';

import { EmpresaGrupoSchema } from './empresa.schema';
import { EmpresaGrupoData, 
         EmpresaGrupo, 
         EmpresaGrupoSort,
         EmpresaGrupoFilter,
         create_EmpresaGrupo, 
         read_EmpresaGrupo, 
         update_EmpresaGrupo, 
         delete_EmpresaGrupo} from 'src/app/@core/data/grupo-empresa';
import { Item } from 'src/app/@theme/layouts/treeview/service/treeview';
         
@Injectable()
export class EmpresaGrupoService extends EmpresaGrupoData {

    constructor(private graphQL: GenericGraphQL) {
        super();
    }

    createEmpresaGrupo(empresaGrupo: EmpresaGrupo) {
        const variables = { empresaGrupo: { ... empresaGrupo }, ... this.graphQL.session};
        return this.graphQL.mutation<create_EmpresaGrupo>(EmpresaGrupoSchema.create_Grupo_Empresa, variables)
    }

    readEmpresaGrupos(order_by?: EmpresaGrupoSort, where?: EmpresaGrupoFilter) {
        const variables = { ... this.graphQL.session, ... {order: order_by}, ... {where: where} }
        return this.graphQL.query<read_EmpresaGrupo>(EmpresaGrupoSchema.read_Grupo_Empresa, variables);
    }

    updateEmpresaGrupo(empresaGrupo: EmpresaGrupo) {
        const empresaGrupoInput = { empresaGrupo: { ... empresaGrupo} , ...this.graphQL.session}
        return this.graphQL.mutation<update_EmpresaGrupo>(EmpresaGrupoSchema.update_Grupo_Empresa, empresaGrupoInput);
    }

    deleteEmpresaGrupo(id: number) {
        return this.graphQL.mutation<delete_EmpresaGrupo>(EmpresaGrupoSchema.delete_Grupo_Empresa, { id: id , ...this.graphQL.session} )
    }

    getEmpresaGrupoTreeView(filter: EmpresaGrupoFilter): Item[] {
        let item: Item[] = [];
        const order_by: EmpresaGrupoSort = { empresaGrupo: SortOperationKind.ASC }
        const variables = { ... this.graphQL.session, ... {order: order_by}, ...{where: filter} }
        this.graphQL.query<read_EmpresaGrupo>(EmpresaGrupoSchema.read_Grupo_Empresa, variables)
            .subscribe(({ grupoEmpresa }: read_EmpresaGrupo ) => {
                grupoEmpresa.nodes.forEach((grupo: EmpresaGrupo) => {
                    item.push({
                        id: grupo.id.toString(),
                        text: grupo.empresaGrupo,
                        icon: "grupo.png"
                    })
                })
            })
        return item;
    }
}