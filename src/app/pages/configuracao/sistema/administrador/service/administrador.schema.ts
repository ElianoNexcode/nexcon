import gql from 'graphql-tag';

export const AdministradorSchema = {
    read_Administrador: gql`
        query( $sessao: UsuarioSessaoInput! )
        {
            sistemaAdministrador( sessao: $sessao )
            {
                nodes
                {
                    id
                    administradorLogin
                }
                totalCount
            }        
        }`,

    read_AdministradorLogin: gql`
        query( $sessao: UsuarioSessaoInput!,
               $where: NcConfiguracaoFilterInput )
        {      
            sistemaAdministrador( sessao: $sessao,
                                  where: $where )
            {
                totalCount
            }        
        }`,
        
    update_Administrador: gql`
        mutation( $sessao: UsuarioSessaoInput!,
                  $administrador: SistemaAdministradorAlterarInput! )
        {
            sistemaAdministrador_Alterar( sessao: $sessao,
                                          administrador: $administrador )
            {
                mensagem
                mensagemTipo
                sucesso
                objeto
            }
        }`,
}