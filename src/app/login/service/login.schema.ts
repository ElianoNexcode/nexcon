import gql from 'graphql-tag';

export const LoginSchema = {

    login: gql`
        mutation ( $aplicativo: String!,
                $login: String!,
                $senha: String!) {
            login ( aplicativo: $aplicativo,
                    login: $login,
                    senha: $senha) 
            {
                mensagem
                mensagemTipo
                sucesso
                objeto
            }
            
        }`,
}