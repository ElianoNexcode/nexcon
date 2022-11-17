import { gql } from 'apollo-angular';

export const VeiculoExternoUsuarioSchema = {

  create_VeiculoExternoUsuario: gql`
  mutation( $sessao: UsuarioSessaoInput!,
            $veiculoExterno: UsuarioVeiculoExternoInserirInput!)
            
      {
        usuarioVeiculoExterno_Inserir( sessao: $sessao,
                                 veiculoExterno: $veiculoExterno)

          {
              mensagem
              mensagemTipo
              sucesso
              objeto
          }

      }`,



read_VeiculoExternoUsuario: gql`
    query( $sessao: UsuarioSessaoInput!,
           $order:  [NcVeiculoExternoSortInput!],
           $where:  NcVeiculoExternoFilterInput
           $first: Int) {
        usuarioVeiculoExterno( sessao: $sessao,
                                order: $order,
                                where: $where
                                first: $first)
        {

            nodes
            {
                id
                placa
                tipo
                modeloId
                modelo {
                  id
                  veiculoModelo
                }
                cor
                imagem {
                  imagem
                } 
                grupoId
                grupo {
                  id  
                  veiculoGrupo
                }
                peso
                caracteristica
                observacao
                complemento1
                complemento2
                complemento3
                complemento4
                empresaId
                empresa {
                  id
                  nome
                }
                entidadeNome
                condutores {
                  pessoaId
                  pessoaExterna {
                    id
                    nome
                    email
                    telefoneFixo
                    grupo {
                      pessoaGrupo
                    }
                  }
                }
                garagens {
                  id
                  garagem
                  estacionamento {
                    id
                    nome
                    setorId
                    setor {
                      id
                      nome
                      siteId
                      site {
                        id
                        nome
                      }
                    }
                  }
                }
                abordagem {
                  mensagemInformativa
                  mensagemAdvertida
                  mensagemRestritiva
                }
                cadastroData
                cadastroOrigem
                status 

            }
        }
    }`,

    read_VeiculoExternoUsuarioRelat: gql`
    query( $sessao: UsuarioSessaoInput!,
           $order:  [NcVeiculoExternoSortInput!],
           $where:  NcVeiculoExternoFilterInput
           $first: Int) {
        usuarioVeiculoExterno( sessao: $sessao,
                                order: $order,
                                where: $where
                                first: $first)
        {
          totalCount
            nodes
            {
                id
                placa
                tipo
                modeloId
                modelo {
                  id
                  veiculoModelo
                }
                cor
                imagem {
                  imagem
                } 
                grupoId
                grupo {
                  id  
                  veiculoGrupo
                }
                peso
                caracteristica
                observacao
                complemento1
                complemento2
                complemento3
                complemento4
                empresaId
                empresa {
                  id
                  nome
                }
                entidadeNome
                condutores {
                  pessoaId
                  veiculoId
                  pessoaExterna {
                    id
                    nome
                    email
                    telefoneFixo
                    grupo {
                      pessoaGrupo
                    }
                  }
                }
                garagens {
                  id
                  garagem
                  estacionamento {
                    id
                    nome
                    setorId
                    setor {
                      id
                      nome
                      siteId
                      site {
                        id
                        nome
                      }
                    }
                  }
                }
                abordagem {
                  mensagemInformativa
                  mensagemAdvertida
                  mensagemRestritiva
                }
                cadastroData
                cadastroOrigem
                status 

            }
        }
    }`,


    update_VeiculoExternoUsuario: gql`
    mutation( $sessao: UsuarioSessaoInput!,
      $veiculoExterno: UsuarioVeiculoExternoAlterarInput!)
              
    {
            usuarioVeiculoExterno_Alterar( sessao: $sessao,
                                   veiculoExterno: $veiculoExterno)

            {
                mensagem
                mensagemTipo
                sucesso
                objeto
            }

    }`,


    delete_VeiculoExternoUsuario: gql`
    mutation ($id: Int!,
              $sessao: UsuarioSessaoInput!) {

    usuarioVeiculoExterno_Excluir( id: $id,
                               sessao: $sessao)
        {
            mensagem
            mensagemTipo
            sucesso
            objeto
        }
    }`

}