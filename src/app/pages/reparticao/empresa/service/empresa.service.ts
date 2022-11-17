import { Injectable } from '@angular/core';
import { GenericGraphQL } from 'src/app/@core/api/generic-graphql';

import { EmpresaReparticaoSchema } from './empresa.schema';
import { EmpresaReparticaoData, 
         EmpresaReparticao, 
         EmpresaReparticaoSort,
         EmpresaReparticaoFilter,
         create_EmpresaReparticao, 
         read_EmpresaReparticao, 
         update_EmpresaReparticao, 
         delete_EmpresaReparticao} from 'src/app/@core/data/reparticao-empresa';

@Injectable()
export class EmpresaReparticaoService extends EmpresaReparticaoData {

    constructor(private graphQL: GenericGraphQL) {
        super();
    }

    createEmpresaReparticao(empresa: EmpresaReparticao) {
        const variables = { empresa: { ... empresa }, ... this.graphQL.session};
        return this.graphQL.mutation<create_EmpresaReparticao>(EmpresaReparticaoSchema.create_Empresa, variables)
    }

    readEmpresaReparticaos(order_by?: EmpresaReparticaoSort, where?: EmpresaReparticaoFilter) {
        const variables = { ... this.graphQL.session, ... {order: order_by}, ... {where: where} }
        return this.graphQL.query<read_EmpresaReparticao>(EmpresaReparticaoSchema.get_Empresa, variables);
    }

    readEmpresaReparticaoRelat(order_by?: EmpresaReparticaoSort, where?: EmpresaReparticaoFilter) {
        const variables = { ... this.graphQL.session, ... {order: order_by}, ... {where: where} }
        return this.graphQL.query<read_EmpresaReparticao>(EmpresaReparticaoSchema.get_EmpresaRelat, variables);
    }

    updateEmpresaReparticao(empresa: EmpresaReparticao) {
        const EmpresaReparticaoInput = { empresa: { ... empresa}, ...this.graphQL.session }
        return this.graphQL.mutation<update_EmpresaReparticao>(EmpresaReparticaoSchema.update_Empresa, EmpresaReparticaoInput);
    }

    deleteEmpresaReparticao(id: number) {
        return this.graphQL.mutation<delete_EmpresaReparticao>(EmpresaReparticaoSchema.delete_Empresa, { id: id , ...this.graphQL.session})
    }
}