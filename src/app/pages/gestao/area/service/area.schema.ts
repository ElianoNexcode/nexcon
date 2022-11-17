import gql from 'graphql-tag'

export const GestaoAreaSchema = {

    read_Gestao_Informacao: gql`
        query ( $sessao: UsuarioSessaoInput! )
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