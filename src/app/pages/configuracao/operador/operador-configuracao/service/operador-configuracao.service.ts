import { Injectable } from '@angular/core';
import { GenericGraphQL } from 'src/app/@core/api/generic-graphql';

import { OperadorConfiguracaoSchema } from './operador-configuracao.schema';
import { OperadorConfiguracaoData, 
         OperadorConfiguracao, 
         OperadorConfiguracaoSort,
         OperadorConfiguracaoFilter,
         create_OperadorConfiguracao, 
         read_OperadorConfiguracao, 
         update_OperadorConfiguracao, 
         delete_OperadorConfiguracao } from 'src/app/@core/data/configuracao-operador-operador';

@Injectable()
export class OperadorConfiguracaoService extends OperadorConfiguracaoData {

    constructor(private graphQL: GenericGraphQL) {
        super();
    }

    createOperadorConfiguracao(operador: OperadorConfiguracao) {
        const variables = { operador: { ... operador }, ... this.graphQL.session};
        return this.graphQL.mutation<create_OperadorConfiguracao>(OperadorConfiguracaoSchema.create_OperadorConfiguracao, variables)
    }

    readOperadorConfiguracaos(order?: OperadorConfiguracaoSort, where?: OperadorConfiguracaoFilter) {
        const variables = { ... this.graphQL.session, ... {order: order}, ... {where: where} }
        return this.graphQL.query<read_OperadorConfiguracao>(OperadorConfiguracaoSchema.read_OperadorConfiguracao, variables);
    }

    updateOperadorConfiguracao(operador: OperadorConfiguracao) {
        const OperadorConfiguracaoInput = { operador: { ... operador} , ...this.graphQL.session}
        return this.graphQL.mutation<update_OperadorConfiguracao>(OperadorConfiguracaoSchema.update_OperadorConfiguracao, OperadorConfiguracaoInput);
    }

    deleteOperadorConfiguracao(id: number) {
        const variables = { ... this.graphQL.session, id: id }
        return this.graphQL.mutation<delete_OperadorConfiguracao>(OperadorConfiguracaoSchema.delete_OperadorConfiguracao, variables )
    }
}