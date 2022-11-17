import gql from 'graphql-tag';

export const ContatoComunicacaoSchema = {

    create_ContatoComunicacao: gql`
        mutation( $sessao: UsuarioSessaoInput!,
                  $contato: ComunicacaoContatoInserirInput! ) 
        {
            comunicacaoContato_Inserir( sessao: $sessao,
                                       contato: $contato )
            {
                mensagem
                mensagemTipo
                sucesso
                objeto
            }
        }`,

    read_ContatoComunicacao: gql`
        query( $sessao: UsuarioSessaoInput!,
               $order: [NcContatoSortInput!],
               $where: NcContatoFilterInput,
               $first: Int )
        {        
            comunicacaoContato( sessao: $sessao,
                                       order: $order,
                                       where: $where,
                                       first: $first )
            {
                nodes 
                {
                    id
                    siteId
                    grupoId
                    nome
                    email
                    telefoneFixo
                    telefoneMovel
                    whatsApp
                    observacao
                }
            }
        }`,

    update_ContatoComunicacao: gql`
        mutation( $sessao: UsuarioSessaoInput!,
                  $contato: ComunicacaoContatoAlterarInput! )
        {
            comunicacaoContato_Alterar( sessao: $sessao,
                                       contato: $contato )
            {
                mensagem
                mensagemTipo
                sucesso
                objeto
            }
        }`,

    delete_ContatoComunicacao: gql`
        mutation( $id: Int!,
                  $sessao: UsuarioSessaoInput! )
        {
            comunicacaoContato_Excluir( id: $id,
                                    sessao: $sessao )
            {
                mensagem
                mensagemTipo
                sucesso
            }
        }`
}