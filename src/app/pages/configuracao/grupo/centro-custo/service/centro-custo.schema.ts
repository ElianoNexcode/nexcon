import gql from 'graphql-tag';

export const CentroCustoGrupoSchema = {

    create_Grupo_CentroCusto: gql`
        mutation( $sessao: UsuarioSessaoInput!,
                  $centroCusto: GrupoCentroCustoInserirInput! )
        {
            grupoCentroCusto_Inserir( sessao: $sessao,
                                      centroCusto: $centroCusto )
            {
                mensagem
                mensagemTipo
                sucesso
                objeto
            }
        }`,

    read_Grupo_CentroCusto: gql`
        query( $sessao: UsuarioSessaoInput!,
               $order: [NcCentroCustoSortInput!],
               $where: NcCentroCustoFilterInput,
               $first: Int )
        {
            grupoCentroCusto( sessao: $sessao,
                              order: $order,
                              where: $where,
                              first: $first )
            {
                nodes 
                {
                    id
                    centroCusto
                }
            }
        }`,

    update_Grupo_CentroCusto: gql`
        mutation( $sessao: UsuarioSessaoInput!,
                  $centroCusto: GrupoCentroCustoAlterarInput! )                  
        {
            grupoCentroCusto_Alterar( sessao: $sessao,
                                      centroCusto: $centroCusto )
            {            
                mensagem
                mensagemTipo
                sucesso
                objeto
            }
        }`,

    delete_Grupo_CentroCusto: gql`
        mutation( $sessao: UsuarioSessaoInput!,
                  $id: Int! )
        {
            grupoCentroCusto_Excluir( sessao: $sessao,
                                      id: $id )
            {
                mensagem
                mensagemTipo
                sucesso
                objeto
            }
        }`

}

