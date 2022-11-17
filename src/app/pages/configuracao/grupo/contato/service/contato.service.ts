import { Injectable } from "@angular/core";
import { GenericGraphQL, SortOperationKind } from "src/app/@core/api/generic-graphql";
import { ContatoGrupoSchema } from "./contato.schema";
import { ContatoGrupo, 
         ContatoGrupoData, 
         ContatoGrupoFilter, 
         ContatoGrupoSort, 
         create_ContatoGrupo, 
         delete_ContatoGrupo, 
         read_ContatoGrupo, 
         update_ContatoGrupo } from "src/app/@core/data/grupo-contato";


@Injectable()
export class ContatoGrupoService extends ContatoGrupoData {

    constructor(private graphQL: GenericGraphQL) {
        super();
    }


    createContatoGrupo(contatoGrupo: ContatoGrupo) {
        const variables = { contatoGrupo: { ... contatoGrupo }, ... this.graphQL.session};
        return this.graphQL.mutation<create_ContatoGrupo>(ContatoGrupoSchema.create_Grupo_Contato, variables)
    }

    readContatoGrupos(order?: ContatoGrupoSort, where?: ContatoGrupoFilter) {
        const variables = { ... this.graphQL.session, ... {order: order}, ... {where: where} }
        return this.graphQL.query<read_ContatoGrupo>(ContatoGrupoSchema.read_Grupo_Contato, variables);
    }

    updateContatoGrupo(contatoGrupo: ContatoGrupo) {
        const variables = { contatoGrupo: { ... contatoGrupo} , ...this.graphQL.session}
        return this.graphQL.mutation<update_ContatoGrupo>(ContatoGrupoSchema.update_Grupo_Contato, variables);
    }

    deleteContatoGrupo(id: number) {
        return this.graphQL.mutation<delete_ContatoGrupo>(ContatoGrupoSchema.delete_Grupo_Contato, { id: id , ...this.graphQL.session} )
    }



}