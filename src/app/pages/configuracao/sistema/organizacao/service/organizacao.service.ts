import { Injectable } from '@angular/core';
import { GenericGraphQL } from 'src/app/@core/api/generic-graphql';

import { OrganizacaoSchema } from './organizacao.schema';
import { OrganizacaoData, 
         Organizacao, 
         read_Organizacao, 
         update_Organizacao} from 'src/app/@core/data/sistema-organizacao';

@Injectable()

export class OrganizacaoService extends OrganizacaoData {

    constructor(private graphQL: GenericGraphQL) {
        super();
    }

    readOrganizacoes() {
        const variables = { ... this.graphQL.session }
        return this.graphQL.query<read_Organizacao>(OrganizacaoSchema.get_Organizacao, variables);
    }

    updateOrganizacao(organizacao: Organizacao) {
        const organizacaoInput = { organizacao: { ... organizacao}, ... this.graphQL.session  }
        return this.graphQL.mutation<update_Organizacao>(OrganizacaoSchema.update_Organizacao, organizacaoInput);
    }
}