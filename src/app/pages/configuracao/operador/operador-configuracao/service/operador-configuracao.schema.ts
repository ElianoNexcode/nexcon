import gql from 'graphql-tag';

export const OperadorConfiguracaoSchema = {
    create_OperadorConfiguracao: gql`
        mutation( $sessao: UsuarioSessaoInput!,
                  $operador: OperadorInserirInput! )
        {
            operador_Inserir( sessao: $sessao,
                              operador: $operador )
            {
                mensagem
                mensagemTipo
                sucesso
                objeto
            }
        }`,

    read_OperadorConfiguracao: gql`
        query( $sessao: UsuarioSessaoInput!,
               $order: [NcOperadorSortInput!],
               $where: NcOperadorFilterInput,
               $first: Int )
        {
            operador( sessao: $sessao,
                      order: $order,
                      where: $where,
                      first: $first ) 
            {
                nodes 
                {
                    operadorPessoaId
                    operadorPessoa {
                        id
                        nome
                        imagem {
                            imagem
                        }
                        area {
                          id
                          nome
                          setor {
                            id
                            nome
                            site {
                              id
                              nome
                            }
                          }
                        }
                        cargo
                    }
                    nivelOperacaoId
                    login
                    senha
                    interfaceDefinida
                    loginDataHora
                    logoutDataHora
                    cadastroData
                    status
                    observacao
                }
            }
        }`,

    update_OperadorConfiguracao: gql`
        mutation( $sessao: UsuarioSessaoInput!,
                  $operador: OperadorAlterarInput! )
        {
            operador_Alterar( sessao: $sessao,
                              operador: $operador )
            {
                mensagem
                mensagemTipo
                sucesso
                objeto
            }
        }`,

    delete_OperadorConfiguracao: gql`
        mutation( $id: Int!,
                  $sessao: UsuarioSessaoInput! )
        {
            operador_Excluir( id: $id,
                              sessao: $sessao )
            {
                mensagem
                mensagemTipo
                sucesso
            }
        }`
}