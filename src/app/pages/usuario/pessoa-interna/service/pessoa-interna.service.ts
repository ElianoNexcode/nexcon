import { Injectable } from '@angular/core';
import { GenericGraphQL } from 'src/app/@core/api/generic-graphql';

import { PessoaInternaSchema } from './pessoa-interna.schema';
import { PessoaInternaUsuarioData, 
         PessoaInternaUsuario, 
         PessoaInternaUsuarioSort,
         PessoaInternaUsuarioFilter,
         create_PessoaInternaUsuario, 
         read_PessoaInternaUsuario, 
         update_PessoaInternaUsuario, 
         delete_PessoaInternaUsuario,
         PessoaInternaUsuarioMutation } from 'src/app/@core/data/usuario-pessoa-interna';

@Injectable()
export class PessoaInternaUsuarioService extends PessoaInternaUsuarioData {

    constructor(private graphQL: GenericGraphQL) {
        super();
    }

    createPessoaInternaUsuario (pessoaInterna: PessoaInternaUsuarioMutation) {
        const variables = { pessoaInterna: { ... pessoaInterna }, ... this.graphQL.session};
        return this.graphQL.mutation<create_PessoaInternaUsuario>(PessoaInternaSchema.create_PessoaInterna, variables)
    }

    readPessoaInternaCargos() {
        const variables = { ... this.graphQL.session }
        return this.graphQL.query<string[]>(PessoaInternaSchema.read_PessoaInternaCargos, variables);
    }
    
    readPessoaInternaLocalizacoes() {
        const variables = { ... this.graphQL.session }
        return this.graphQL.query<string[]>(PessoaInternaSchema.read_PessoaInternaLocalizacoes, variables);
    }

    readPessoaInternaRelat(order_by?: PessoaInternaUsuarioSort, where?: PessoaInternaUsuarioFilter, first?: number) {
        const variables = { ... this.graphQL.session, ... {order: order_by}, ... {where: where}, ... {first: first} };
        return this.graphQL.query<read_PessoaInternaUsuario>(PessoaInternaSchema.read_PessoaInternaRelat, variables);
    }

    readPessoaInternaUsuarios(order_by?: PessoaInternaUsuarioSort, where?: PessoaInternaUsuarioFilter, first?: number) {
        const variables = { ... this.graphQL.session, ... {order: order_by}, ... {where: where}, ... {first: first} }
        return this.graphQL.query<read_PessoaInternaUsuario>(PessoaInternaSchema.read_PessoaInterna, variables);
    }

    updatePessoaInternaUsuario(pessoaInterna: PessoaInternaUsuarioMutation) {
        const pessoaInternaInput = { pessoaInterna: { ... pessoaInterna} , ...this.graphQL.session}
        return this.graphQL.mutation<update_PessoaInternaUsuario>(PessoaInternaSchema.update_PessoaInterna, pessoaInternaInput);
    }

    deletePessoaInternaUsuario(id: number) {
        return this.graphQL.mutation<delete_PessoaInternaUsuario>(PessoaInternaSchema.delete_PessoaInterna, { id: id , ...this.graphQL.session} )
    }
}