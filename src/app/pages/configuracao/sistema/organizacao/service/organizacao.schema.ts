import gql from 'graphql-tag';

export const OrganizacaoSchema = {
    get_Organizacao: gql`
        query( $sessao: UsuarioSessaoInput! )
        {
            sistemaOrganizacao( sessao: $sessao )
            {
                nodes {
                    id
                    organizacaoNome
                    organizacaoImagem
                    organizacaoEstrutura
                }
            }
        }`,
        
    update_Organizacao: gql`
        mutation( $sessao: UsuarioSessaoInput!,
                  $organizacao: SistemaOrganizacaoAlterarInput! )
        {
            sistemaOrganizacao_Alterar( sessao: $sessao,
                                        organizacao: $organizacao )
            {
                mensagem
                mensagemTipo
                sucesso
                objeto
            }
        }`,
}