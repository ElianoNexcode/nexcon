import { Injectable } from '@angular/core';
import { GenericGraphQL } from 'src/app/@core/api/generic-graphql';

import { EmergenciaGrupoSchema } from './emergencia.schema';
import { EmergenciaGrupoData, 
         EmergenciaGrupo, 
         EmergenciaGrupoSort,
         EmergenciaGrupoFilter,
         create_EmergenciaGrupo, 
         read_EmergenciaGrupo, 
         update_EmergenciaGrupo, 
         delete_EmergenciaGrupo} from 'src/app/@core/data/grupo-emergencia';
         
@Injectable()
export class EmergenciaGrupoService extends EmergenciaGrupoData {

    constructor(private graphQL: GenericGraphQL) {
        super();
    }

    createEmergenciaGrupo(emergenciaGrupo: EmergenciaGrupo) {
        const variables = { emergenciaGrupo: { ... emergenciaGrupo }, ... this.graphQL.session};
        return this.graphQL.mutation<create_EmergenciaGrupo>(EmergenciaGrupoSchema.create_Grupo_Emergencia, variables)
    }

    readEmergenciaGrupos(order_by?: EmergenciaGrupoSort, where?: EmergenciaGrupoFilter) {
        const variables = { ... this.graphQL.session, ... {order: order_by}, ... {where: where} }
        return this.graphQL.query<read_EmergenciaGrupo>(EmergenciaGrupoSchema.read_Grupo_Emergencia, variables);
    }

    updateEmergenciaGrupo(emergenciaGrupo: EmergenciaGrupo) {
        const emergenciaGrupoInput = { emergenciaGrupo: { ... emergenciaGrupo} , ...this.graphQL.session}
        return this.graphQL.mutation<update_EmergenciaGrupo>(EmergenciaGrupoSchema.update_Grupo_Emergencia, emergenciaGrupoInput);
    }

    deleteEmergenciaGrupo(id: number) {
        return this.graphQL.mutation<delete_EmergenciaGrupo>(EmergenciaGrupoSchema.delete_Grupo_Emergencia, { id: id , ...this.graphQL.session} )
    }
}