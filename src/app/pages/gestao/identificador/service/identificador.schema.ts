import gql from 'graphql-tag'

export const GestaoIdentificadorSchema = {

    read_Gestao_Informacao: gql`
        query( $sessao: UsuarioSessaoInput! )
        {
            gestaoInformacao( sessao: $sessao )
            {
                nodes 
                {
                    id
                }
            }
        }`
    
}