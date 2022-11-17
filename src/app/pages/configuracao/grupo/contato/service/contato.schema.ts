import gql from 'graphql-tag';

export const ContatoGrupoSchema = {

    create_Grupo_Contato: gql`
        mutation( $sessao: UsuarioSessaoInput!,
                  $contatoGrupo: GrupoContatoInserirInput! )
        {
            grupoContato_Inserir( sessao: $sessao,
                            contatoGrupo: $contatoGrupo )
            {
                mensagem
                mensagemTipo
                sucesso
                objeto
            }
        }`,

    read_Grupo_Contato: gql`
        query( $sessao: UsuarioSessaoInput!,
               $order: [NcContatoGrupoSortInput!],
               $where: NcContatoGrupoFilterInput,
               $first: Int )
        {
            grupoContato( sessao: $sessao,
                           order: $order,
                           where: $where,
                           first: $first )
            {
                nodes 
                {
                    id
                    contatoGrupo
                    contatos {
                        nome
                    }
                }
            }
        }`,

    update_Grupo_Contato: gql`
        mutation( $sessao: UsuarioSessaoInput!,
                  $contatoGrupo: GrupoContatoAlterarInput! )                  
        {
            grupoContato_Alterar( sessao: $sessao,
                            contatoGrupo: $contatoGrupo )
            {            
                mensagem
                mensagemTipo
                sucesso
                objeto
            }
        }`,

    delete_Grupo_Contato: gql`
        mutation( $sessao: UsuarioSessaoInput!,
                  $id: Int! )
        {
            grupoContato_Excluir( sessao: $sessao,
                                      id: $id )
            {
                mensagem
                mensagemTipo
                sucesso
                objeto
            }
        }`

}

