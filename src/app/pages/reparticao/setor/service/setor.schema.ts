import gql from 'graphql-tag';

export const SetorReparticaoSchema = {

    create_SetorReparticao: gql`
        mutation( $sessao: UsuarioSessaoInput!,
                  $setor: ReparticaoSetorInserirInput! )
        {
            reparticaoSetor_Inserir( sessao: $sessao,
                                     setor: $setor )
            {
                mensagem
                mensagemTipo
                sucesso
                objeto
            }
        }`,

    read_SetorReparticao: gql`
        query( $sessao: UsuarioSessaoInput!,
               $order: [NcSetorSortInput!],
               $where: NcSetorFilterInput,
               $first: Int )
        {
            reparticaoSetor( sessao: $sessao,
                             order: $order,
                             where: $where,
                             first: $first )
            {
                totalCount
                nodes 
                {
                    id
                    nome
                    observacao
                    siteId
                    areas
                    {
                        id
                        nome
                    }
                }
            } 
        }`,

    update_SetorReparticao: gql`
        mutation( $sessao: UsuarioSessaoInput!,
                  $setor: ReparticaoSetorAlterarInput! )
        {
            reparticaoSetor_Alterar( sessao: $sessao,
                                     setor: $setor )
            {
                mensagem
                mensagemTipo
                sucesso
                objeto
            }
        }`,

    delete_SetorReparticao: gql`
        mutation( $id: Int!,
                  $sessao: UsuarioSessaoInput! ) {
            reparticaoSetor_Excluir ( id: $id,
                                        sessao: $sessao) 
            {
                mensagem
                mensagemTipo
                sucesso
            }
        }`
            
}