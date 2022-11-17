import { Injectable } from '@angular/core';
import { GenericGraphQL } from 'src/app/@core/api/generic-graphql';

import { AdministradorSchema } from './administrador.schema';
import { AdministradorData, 
         Administrador, 
         read_Administrador, 
         update_Administrador,
         get_AdministradorLogin,
         AdministradorFilter} from 'src/app/@core/data/sistema-administrador';

@Injectable()
export class AdministradorService extends AdministradorData {

    constructor(private graphQL: GenericGraphQL) {
        super();
    }

    readAdministrador() {
        const variables = { ... this.graphQL.session }
        return this.graphQL.query<read_Administrador>(AdministradorSchema.read_Administrador, variables);
    }

    getAdministrador_login(filter: AdministradorFilter) {
        const variables = { where: { ... filter }, ... this.graphQL.session }
        return this.graphQL.query<get_AdministradorLogin>(AdministradorSchema.read_AdministradorLogin, variables);
    }

    updateAdministrador(administrador: Administrador) {
        const variables = { administrador: { ...administrador}, ... this.graphQL.session }
        return this.graphQL.mutation<update_Administrador>(AdministradorSchema.update_Administrador, variables);
    }

}