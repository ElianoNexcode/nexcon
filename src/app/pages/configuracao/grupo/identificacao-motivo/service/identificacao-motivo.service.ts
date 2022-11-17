import { Injectable } from '@angular/core';
import { GenericGraphQL } from 'src/app/@core/api/generic-graphql';

import { IdentificacaoGrupoSchema } from './identificacacao-motivo.schema';
import { IdentificacaoGrupoData, 
         IdentificacaoGrupo, 
         IdentificacaoGrupoSort,
         IdentificacaoGrupoFilter,
         create_IdentificacaoGrupo, 
         read_IdentificacaoGrupo, 
         update_IdentificacaoGrupo, 
         delete_IdentificacaoGrupo} from 'src/app/@core/data/grupo-identificacao';

@Injectable()
export class IdentificacaoGrupoService extends IdentificacaoGrupoData {

    constructor(private graphQL: GenericGraphQL) {
        super();
    }

    createIdentificacaoGrupo(identificacaoGrupo: IdentificacaoGrupo) {
        const variables = { identificacaoMotivo: { ... identificacaoGrupo }, ... this.graphQL.session};
        return this.graphQL.mutation<create_IdentificacaoGrupo>(IdentificacaoGrupoSchema.create_Grupo_Identificacao, variables)
    }

    readIdentificacaoGrupos(order_by?: IdentificacaoGrupoSort, where?: IdentificacaoGrupoFilter) {
        const variables = { ... this.graphQL.session, ... {order: order_by}, ... {where: where} }
        return this.graphQL.query<read_IdentificacaoGrupo>(IdentificacaoGrupoSchema.read_Grupo_Identificacao, variables);
    }

    updateIdentificacaoGrupo(identificacaoGrupo: IdentificacaoGrupo) {
        const identificacaoGrupoInput = { identificacaoMotivo: { ... identificacaoGrupo} , ...this.graphQL.session}
        return this.graphQL.mutation<update_IdentificacaoGrupo>(IdentificacaoGrupoSchema.update_Grupo_Identificacao, identificacaoGrupoInput);
    }

    deleteIdentificacaoGrupo(id: number) {
        return this.graphQL.mutation<delete_IdentificacaoGrupo>(IdentificacaoGrupoSchema.delete_Grupo_Identificacao, { id: id , ...this.graphQL.session} )
    }
}