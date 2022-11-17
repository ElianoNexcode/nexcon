import gql from 'graphql-tag';

export const ServidorSistemaSchema = {

    read_Sistema_Servidor: gql`
        query( $sessao: UsuarioSessaoInput! )
        {
            sistemaConfiguracao( sessao: $sessao )
            {
                nodes
                {
                    id
                    servidorEmail
                    servidorEmailSSL
                    servidorEmailPorta
                    servidorEmailSenha
                    servidorEmailOficial
                    servidorEmailUsuario
                    servidorEmailTentativas
                    servidorEmailCertificacao
                    servidorEmailAutenticacao
                }
            }
        }`,

    update_Servidor_Email: gql`
        mutation( $sessao: UsuarioSessaoInput!,
                  $servidorEmail: SistemaServidorEmailAlterarInput! )
        {
            sistemaServidorEmail_Alterar( sessao: $sessao,
                                          servidorEmail: $servidorEmail )                    
            {      
                mensagem
                mensagemTipo
                sucesso
                objeto
            }
        }`,
}