import gql from 'graphql-tag';

export const EmpresaGrupoSchema = {

    create_Grupo_Empresa: gql`
        mutation( $sessao: UsuarioSessaoInput!,
                  $empresaGrupo: GrupoEmpresaInserirInput! )
        {
            grupoEmpresa_Inserir( sessao: $sessao,
                                  empresaGrupo: $empresaGrupo )
            {
                mensagem
                mensagemTipo
                sucesso
                objeto
            }
        }`,

    read_Grupo_Empresa: gql`
        query( $sessao: UsuarioSessaoInput!,
               $order: [NcEmpresaGrupoSortInput!],
               $where: NcEmpresaGrupoFilterInput,
               $first: Int )
        {
            grupoEmpresa( sessao: $sessao,
                          order: $order,
                          where: $where,
                          first: $first )
            {
                nodes 
                {
                    id
                    empresaGrupo
                }
            }
        }`,

    update_Grupo_Empresa: gql`
        mutation( $sessao: UsuarioSessaoInput!,
                  $empresaGrupo: GrupoEmpresaAlterarInput! )
        {
            grupoEmpresa_Alterar( sessao: $sessao,
                                  empresaGrupo: $empresaGrupo )
            {
                mensagem
                mensagemTipo
                sucesso
                objeto
            }
        }`,

    delete_Grupo_Empresa: gql`
        mutation( $sessao: UsuarioSessaoInput!,
                  $id: Int! )
        {
            grupoEmpresa_Excluir( sessao: $sessao,
                                  id: $id )
            {
                mensagem
                mensagemTipo
                sucesso
                objeto
            }
        }`
}