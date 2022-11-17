import gql from 'graphql-tag';

export const EstacaoDispositivoSchema = {

    create_EstacaoDispositivo: gql`
    mutation( $sessao: UsuarioSessaoInput!,
              $estacao: DispositivoEstacaoInserirInput!)
              
        {
            dispositivoEstacao_Inserir( sessao: $sessao,
                                       estacao: $estacao)

            {
                mensagem
                mensagemTipo
                sucesso
                objeto
            }

        }`,

    read_EstacaoDispositivo: gql`
    query( $sessao: UsuarioSessaoInput!,
            $order: [NcEstacaoSortInput!],
            $where: NcEstacaoFilterInput
            $first: Int)
    {
             dispositivoEstacao( sessao: $sessao,
                                 order: $order,
                                 where: $where
                                 first: $first)
            {
                nodes{

                    id
                    siteId 
                    nome
                    tipo
                    recepcaoId
                    recepcao {
                        id
                        nome
                    }
                    redeIP                    
                    cameraPessoaId    
                    cameraVeiculoId  
                    impressora
                    observacao
                    status
                    cameraPessoa {
                        nome
                        id
                      }
                      cameraVeiculo {
                        nome
                        id
                      }
                }
                
            }

    }`,

    update_EstacaoDispositivo: gql`
    mutation( $sessao: UsuarioSessaoInput!,
              $estacao: DispositivoEstacaoAlterarInput!)
              
    {
            dispositivoEstacao_Alterar( sessao: $sessao,
                                       estacao: $estacao)

            {
                mensagem
                mensagemTipo
                sucesso
                objeto
            }

    }`,

    delete_EstacaoDispositivo: gql`
    mutation( $id: Int!,
              $sessao: UsuarioSessaoInput! )
    {
        dispositivoEstacao_Excluir( id: $id,
                                     sessao: $sessao )
        {
            mensagem
            mensagemTipo
            sucesso
        }
    }`

}