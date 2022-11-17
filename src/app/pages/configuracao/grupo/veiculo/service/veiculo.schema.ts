import gql from 'graphql-tag';

export const VeiculoGrupoSchema = {

    create_Grupo_Veiculo: gql`
        mutation( $sessao: UsuarioSessaoInput!,
                  $veiculoGrupo: GrupoVeiculoInserirInput! )
        {
            grupoVeiculo_Inserir( sessao: $sessao,
                                  veiculoGrupo: $veiculoGrupo )
            {
                mensagem
                mensagemTipo
                sucesso
                objeto
            }  
        }`,

    read_VeiculoGrupo: gql`
        query( $sessao: UsuarioSessaoInput!,
               $order: [NcVeiculoGrupoSortInput!],
               $where: NcVeiculoGrupoFilterInput,
               $first: Int )
        {
            grupoVeiculo( sessao: $sessao,
                          order: $order,
                          where: $where,
                          first: $first )
            {
                nodes 
                {
                    id
                    veiculoGrupo
                    veiculoInterno
                    veiculoExterno
                }
            }
        }`,

    update_Grupo_Veiculo: gql`
        mutation( $sessao: UsuarioSessaoInput!,
                  $veiculoGrupo: GrupoVeiculoAlterarInput! )
        {
            grupoVeiculo_Alterar( sessao: $sessao,
                                  veiculoGrupo: $veiculoGrupo )
            {
                mensagem
                mensagemTipo
                sucesso
                objeto
            }
        }`,

    delete_Grupo_Veiculo: gql`
        mutation( $id: Int!,
                  $sessao: UsuarioSessaoInput! ) 
        {
            grupoVeiculo_Excluir( id: $id,
                                  sessao: $sessao )
            {
                mensagem
                mensagemTipo
                sucesso
            }
        }`
}