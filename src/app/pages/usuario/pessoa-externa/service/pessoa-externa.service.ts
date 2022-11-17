import { Injectable } from '@angular/core';
import { GenericGraphQL } from 'src/app/@core/api/generic-graphql';

import { PessoaExternaSchema } from './pessoa-externa.schema';
import { PessoaExternaUsuarioData, 
         PessoaExternaUsuario, 
         PessoaExternaUsuarioSort,
         PessoaExternaUsuarioFilter,
         create_PessoaExternaUsuario, 
         read_PessoaExternaUsuario, 
         update_PessoaExternaUsuario, 
         delete_PessoaExternaUsuario} from 'src/app/@core/data/usuario-pessoa-externa';

@Injectable()
export class PessoaExternaUsuarioService extends PessoaExternaUsuarioData {

    constructor(private graphQL: GenericGraphQL) {
        super();
    }

    createPessoaExternaUsuario (pessoaExterna: PessoaExternaUsuario) {
        const variables = { pessoaExterna: { ... pessoaExterna }, ... this.graphQL.session};
        return this.graphQL.mutation<create_PessoaExternaUsuario>(PessoaExternaSchema.create_PessoaExterna, variables)
    }

    readPessoaExternaUsuarios(order_by?: PessoaExternaUsuarioSort, where?: PessoaExternaUsuarioFilter, first?: number) {
        const variables = { ... this.graphQL.session, ... {order: order_by}, ... {where: where}, ... {first: first} }
        return this.graphQL.query<read_PessoaExternaUsuario>(PessoaExternaSchema.read_PessoaExterna, variables);
    }

    readPessoaExternaRelat(order_by?: PessoaExternaUsuarioSort, where?: PessoaExternaUsuarioFilter, first?: number) {
        const variables = { ... this.graphQL.session, ... {order: order_by}, ... {where: where}, ... {first: first} }
        return this.graphQL.query<read_PessoaExternaUsuario>(PessoaExternaSchema.read_PessoaExternaRelat, variables);
    }

    readPessoaExternaCargo (){
        const variables = { ... this.graphQL.session }
        return this.graphQL.query<string[]>(PessoaExternaSchema.read_PessoaExternaCargo,variables);
    }

    updatePessoaExternaUsuario(pessoaExterna: PessoaExternaUsuario) {
        const pessoaExternaInput = { pessoaExterna: { ... pessoaExterna} , ...this.graphQL.session}
        return this.graphQL.mutation<update_PessoaExternaUsuario>(PessoaExternaSchema.update_PessoaExterna, pessoaExternaInput);
    }

    deletePessoaExternaUsuario(id: number) {
        return this.graphQL.mutation<delete_PessoaExternaUsuario>(PessoaExternaSchema.delete_PessoaExterna, { id: id , ...this.graphQL.session} )
    }
}