import { Injectable } from '@angular/core';
import { GenericGraphQL } from 'src/app/@core/api/generic-graphql';
import { NivelAcessoConcessao, 
         NivelAcessoConcessaoData, 
         NivelAcessoFilter, 
         NivelAcessoSort,
         create_NivelAcessoConcessao, 
         read_NivelAcessoConcessao, 
         update_NivelAcessoConcessao,
         delete_NivelAcessoConcessao} from 'src/app/@core/data/concessao-nivel-acesso';
import { NivelAcessoConcessaoSchema } from './nivel-acesso.schema';



@Injectable()
export class NivelAcessoConcessaoService extends NivelAcessoConcessaoData {

    constructor(private graphQL: GenericGraphQL) {
        super();
    }

    createNivelAcessoConcessao(nivelAcesso: NivelAcessoConcessao) {
        const variables = { nivelAcesso: { ...nivelAcesso}, ... this.graphQL.session};
        return this.graphQL.mutation<create_NivelAcessoConcessao>(NivelAcessoConcessaoSchema.create_NivelAcessoConcessao, variables)
    }

    readNivelAcessoConcessao(order_by?: NivelAcessoSort, where?: NivelAcessoFilter){
        const variables = { ... this.graphQL.session, ... {order: order_by}, ... {where: where} }
        return this.graphQL.query<read_NivelAcessoConcessao>(NivelAcessoConcessaoSchema.read_NivelAcessoConcessao, variables);
    }

    readNivelAcessoConcessaoRelat(order_by?: NivelAcessoSort, where?: NivelAcessoFilter){
        const variables = { ... this.graphQL.session, ... {order: order_by}, ... {where: where} }
        return this.graphQL.query<read_NivelAcessoConcessao>(NivelAcessoConcessaoSchema.read_NivelAcessoConcessaoRelat, variables);
    }

    updateNivelAcessoConcessao(nivelAcesso: NivelAcessoConcessao) {
        const nivelAcessoConcessaoInput = { nivelAcesso: { ...nivelAcesso}, ... this.graphQL.session};
        return this.graphQL.mutation<update_NivelAcessoConcessao>(NivelAcessoConcessaoSchema.update_NivelAcessoConcessao, nivelAcessoConcessaoInput)
    }

    deleteNivelAcessoConcessao(id: number) {
        return this.graphQL.mutation<delete_NivelAcessoConcessao>(NivelAcessoConcessaoSchema.delete_NivelAcessoConcessao, { id: id , ...this.graphQL.session} )
    }
}