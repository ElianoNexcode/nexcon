import gql from 'graphql-tag';

export const VeiculoModeloGrupoSchema = {

    create_Grupo_ModeloVeiculo: gql`
        mutation( $sessao: UsuarioSessaoInput!,
                  $veiculoModelo: GrupoVeiculoModeloInserirInput! )
        {
            grupoVeiculoModelo_Inserir( sessao: $sessao,
                                        veiculoModelo: $veiculoModelo )
            {
                mensagem
                mensagemTipo
                sucesso
                objeto
            }
        }`,

    read_Grupo_ModeloVeiculo: gql`
        query( $sessao: UsuarioSessaoInput!,
               $order: [NcVeiculoModeloSortInput!],
               $where: NcVeiculoModeloFilterInput,
               $first: Int )
        {
            grupoVeiculoModelo( sessao: $sessao,
                                order: $order,
                                where: $where,
                                first: $first )
            {
                nodes 
                {
                    id
                    veiculoModelo
                }
            }
        }`,

    update_Grupo_ModeloVeiculo: gql`
        mutation( $sessao: UsuarioSessaoInput!,
                  $veiculoModelo: GrupoVeiculoModeloAlterarInput! )
        {
            grupoVeiculoModelo_Alterar( sessao: $sessao,
                                        veiculoModelo: $veiculoModelo )
            {
                mensagem
                mensagemTipo
                sucesso
                objeto
            }
        }`,

    delete_Grupo_ModeloVeiculo: gql`
        mutation( $id: Int!,
                  $sessao: UsuarioSessaoInput!)
        {
            grupoVeiculoModelo_Excluir( id: $id,
                                        sessao: $sessao )
            {
                mensagem
                mensagemTipo
                sucesso
            }
        }`

}
