import { Injectable } from '@angular/core';
import { GenericGraphQL, SortOperationKind } from 'src/app/@core/api/generic-graphql';
import { ContatoComunicacaoData, 
         ContatoComunicacaoSort, 
         ContatoComunicacaoFilter, 
         create_ContatoComunicacao, 
         delete_ContatoComunicacao, 
         read_ContatoComunicacao, 
         update_ContatoComunicacao, 
         ContatoComunicacao} from 'src/app/@core/data/comunicacao-contato';
import { ContatoGrupo, ContatoGrupoFilter, ContatoGrupoSort, read_ContatoGrupo } from 'src/app/@core/data/grupo-contato';
import { Item } from 'src/app/@theme/layouts/treeview/service/treeview';
import { ContatoGrupoSchema } from 'src/app/pages/configuracao/grupo/contato/service/contato.schema';
import { ContatoComunicacaoSchema } from './contato-comunicacao.schema';


@Injectable()

export class ContatoComunicacaoService extends ContatoComunicacaoData {

    constructor(private graphQL: GenericGraphQL){
        super();
    }

    createContatoComunicacao(contatoComunicacao: ContatoComunicacao) {
        const variables = { contato: {... contatoComunicacao}, ... this.graphQL.session};
        return this.graphQL.mutation<create_ContatoComunicacao>(ContatoComunicacaoSchema.create_ContatoComunicacao,variables);
    }

    readContatoComunicacao(order?: ContatoComunicacaoSort, where?: ContatoComunicacaoFilter) {
        const variables = { ... this.graphQL.session, ... {order: order}, ... {where:where} }
        return this.graphQL.query<read_ContatoComunicacao>(ContatoComunicacaoSchema.read_ContatoComunicacao,variables);    
    }

    updateContatoComunicacao(contatoComunicacao: ContatoComunicacao){
        const variables = { contato: {... contatoComunicacao}, ... this.graphQL.session};
        return this.graphQL.mutation<update_ContatoComunicacao>(ContatoComunicacaoSchema.update_ContatoComunicacao,variables);
    }

    deleteContatoComunicacao(id: number) {
        return this.graphQL.mutation<delete_ContatoComunicacao>(ContatoComunicacaoSchema.delete_ContatoComunicacao,{ id: id , ... this.graphQL.session})
    }

    getContatoGrupoTreeView(filter?: ContatoGrupoFilter): Item[] {
        let item: Item[] = [];
        const order_by: ContatoGrupoSort = { contatoGrupo: SortOperationKind.ASC }
        const variables = { ... this.graphQL.session, ... {order: order_by}, ...{where: filter} }
        this.graphQL.query<read_ContatoGrupo>(ContatoGrupoSchema.read_Grupo_Contato, variables)
            .subscribe(({ grupoContato }: read_ContatoGrupo ) => {
                grupoContato.nodes.forEach((contato: ContatoGrupo) => {
                    item.push({
                        id: contato.id.toString(),
                        text: contato.contatoGrupo,
                        icon: "grupo.png"
                    })
                })
            })
        return item;
    }
}