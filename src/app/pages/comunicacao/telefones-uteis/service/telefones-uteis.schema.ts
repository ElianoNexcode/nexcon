import gql from 'graphql-tag';

export const TelefonesUteisComunicacaoSchema = {

    create_TelefonesUteisComunicacao: gql`
        mutation( $sessao: UsuarioSessaoInput!,
                  $telefonesUteis: ComunicacaoTelefonesUteisInserirInput! ) 
        {
            comunicacaoTelefonesUteis_Inserir( sessao: $sessao,
                                               telefonesUteis: $telefonesUteis )
            {
                mensagem
                mensagemTipo
                sucesso
                objeto
            }
        }`,

    read_TelefonesUteisComunicacao: gql`
        query( $sessao: UsuarioSessaoInput!,
               $order: [NcTelefonesUteisSortInput!],
               $where: NcTelefonesUteisFilterInput,
               $first: Int )
        {        
            comunicacaoTelefonesUteis( sessao: $sessao,
                                       order: $order,
                                       where: $where,
                                       first: $first )
            {
                nodes 
                {
                    id
                    siteId
                    nome
                    email
                    telefone1
                    telefone2
                    observacao
                }
            }
        }`,

    update_TelefonesUteisComunicacao: gql`
        mutation( $sessao: UsuarioSessaoInput!,
                  $telefonesUteis: ComunicacaoTelefonesUteisAlterarInput! )
        {
            comunicacaoTelefonesUteis_Alterar( sessao: $sessao,
                                               telefonesUteis: $telefonesUteis )
            {
                mensagem
                mensagemTipo
                sucesso
                objeto
            }
        }`,

    delete_TelefonesUteisComunicacao: gql`
        mutation( $id: Int!,
                  $sessao: UsuarioSessaoInput! )
        {
            comunicacaoTelefonesUteis_Excluir( id: $id,
                                               sessao: $sessao )
            {
                mensagem
                mensagemTipo
                sucesso
            }
        }`
}