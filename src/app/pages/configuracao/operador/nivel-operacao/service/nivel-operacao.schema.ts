import gql from 'graphql-tag';

export const NivelOperacaoSchema = {
    create_NivelOperacao: gql`
        mutation( $sessao: UsuarioSessaoInput!,
                  $nivelOperacao: OperadorNivelOperacaoInserirInput!)
        {
            operadorNivelOperacao_Inserir ( sessao: $sessao
                                            nivelOperacao: $nivelOperacao)
            {
                mensagem
                mensagemTipo
                sucesso
                objeto
            }
        }`,

    read_NivelOperacao: gql`
        query( $sessao: UsuarioSessaoInput!,
               $order: [NcNivelOperacaoSortInput!],
               $where: NcNivelOperacaoFilterInput )
        {
            operadorNivelOperacao( sessao: $sessao,
                                   order: $order,
                                   where: $where ) 
            {
                totalCount
                nodes 
                {
                    id
                    nome
                    siteId
                    privilegios
                    site {
                        id
                        nome
                    }
                    nivelOperacaoEx {
                        siteId
                        site {
                            id
                            nome
                        }
                    }
                    observacao     
                } 
            }
        }`,

    update_NivelOperacao: gql`
        mutation( $sessao: UsuarioSessaoInput!,
                  $nivelOperacao: OperadorNivelOperacaoAlterarInput! )
        {
            operadorNivelOperacao_Alterar( sessao: $sessao
                                           nivelOperacao: $nivelOperacao )
            {
                mensagem
                mensagemTipo
                sucesso
                objeto
            }
        }`,

    delete_NivelOperacao: gql`
        mutation( $sessao: UsuarioSessaoInput!,
                  $id: Int! )
        {
            operadorNivelOperacao_Excluir( sessao: $sessao,
                                           id: $id )
            {
                mensagem
                mensagemTipo
                sucesso
                objeto
            }
        }`
}