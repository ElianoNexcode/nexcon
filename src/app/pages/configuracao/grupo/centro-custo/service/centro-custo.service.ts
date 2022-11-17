import { Injectable } from '@angular/core';
import { GenericGraphQL } from 'src/app/@core/api/generic-graphql';

import { CentroCustoGrupoSchema } from './centro-custo.schema';
import { CentroCustoGrupoData, 
         CentroCustoGrupo, 
         CentroCustoGrupoSort,
         CentroCustoGrupoFilter,
         create_CentroCustoGrupo, 
         read_CentroCustoGrupo, 
         update_CentroCustoGrupo, 
         delete_CentroCustoGrupo} from 'src/app/@core/data/grupo-centro-custo';

@Injectable()
export class CentroCustoGrupoService extends CentroCustoGrupoData {

    constructor(private graphQL: GenericGraphQL) {
        super();
    }

    createCentroCustoGrupo(centroCustoGrupo: CentroCustoGrupo) {
        const variables = { centroCusto: { ... centroCustoGrupo }, ... this.graphQL.session};
        return this.graphQL.mutation<create_CentroCustoGrupo>(CentroCustoGrupoSchema.create_Grupo_CentroCusto, variables)
    }

    readCentroCustoGrupos(order?: CentroCustoGrupoSort, where?: CentroCustoGrupoFilter) {
        const variables = { ... this.graphQL.session, ... {order: order}, ... {where: where} }
        return this.graphQL.query<read_CentroCustoGrupo>(CentroCustoGrupoSchema.read_Grupo_CentroCusto, variables);
    }

    updateCentroCustoGrupo(centroCustoGrupo: CentroCustoGrupo) {
        const variables = { centroCusto: { ... centroCustoGrupo} , ...this.graphQL.session}
        return this.graphQL.mutation<update_CentroCustoGrupo>(CentroCustoGrupoSchema.update_Grupo_CentroCusto, variables);
    }

    deleteCentroCustoGrupo(id: number) {
        return this.graphQL.mutation<delete_CentroCustoGrupo>(CentroCustoGrupoSchema.delete_Grupo_CentroCusto, { id: id , ...this.graphQL.session} )
    }
}