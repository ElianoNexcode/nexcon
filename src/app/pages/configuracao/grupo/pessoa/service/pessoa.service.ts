import { Injectable } from '@angular/core';
import { GenericGraphQL } from 'src/app/@core/api/generic-graphql';

import { PessoaGrupoSchema } from './pessoa.schema';
import { PessoaGrupoData, 
         PessoaGrupo, 
         PessoaGrupoSort,
         PessoaGrupoFilter,
         create_PessoaGrupo, 
         read_PessoaGrupo, 
         update_PessoaGrupo, 
         delete_PessoaGrupo} from 'src/app/@core/data/grupo-pessoa';

@Injectable()
export class PessoaGrupoService extends PessoaGrupoData {

    constructor(private graphQL: GenericGraphQL) {
        super();
    }

    createPessoaGrupo(pessoaGrupo: PessoaGrupo) {
        const variables = { pessoaGrupo: { ... pessoaGrupo }, ... this.graphQL.session};
        return this.graphQL.mutation<create_PessoaGrupo>(PessoaGrupoSchema.create_PessoaGrupo, variables)
    }

    readPessoaGrupos(order_by?: PessoaGrupoSort, where?: PessoaGrupoFilter) {
        const variables = { ... this.graphQL.session, ... {order: order_by}, ... {where: where} }
        return this.graphQL.query<read_PessoaGrupo>(PessoaGrupoSchema.read_PessoaGrupo, variables);
    }

    updatePessoaGrupo(pessoaGrupo: PessoaGrupo) {
        const pessoaGrupoInput = { pessoaGrupo: { ... pessoaGrupo} , ...this.graphQL.session}
        return this.graphQL.mutation<update_PessoaGrupo>(PessoaGrupoSchema.update_PessoaGrupo, pessoaGrupoInput);
    }

    deletePessoaGrupo(id: number) {
        return this.graphQL.mutation<delete_PessoaGrupo>(PessoaGrupoSchema.delete_PessoaGrupo, { id: id , ...this.graphQL.session} )
    }
}