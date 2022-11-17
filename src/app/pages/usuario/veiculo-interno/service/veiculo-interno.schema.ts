import { gql } from 'apollo-angular';

export const VeiculoInternoUsuarioSchema = {

  create_VeiculoInternoUsuario: gql`
  mutation( $sessao: UsuarioSessaoInput!,
            $veiculoInterno: UsuarioVeiculoInternoInserirInput!)
            
      {
        usuarioVeiculoInterno_Inserir( sessao: $sessao,
                               veiculoInterno: $veiculoInterno)

          {
              mensagem
              mensagemTipo
              sucesso
              objeto
          }

      }`,

  read_VeiculoInternoLocalizacoes: gql`
    query {
          usuarioVeiculoInternoLocalizacao                                                        
      }`,

  read_VeiculoInternoUsuario: gql`
    query( $sessao: UsuarioSessaoInput!,
           $order:  [NcVeiculoInternoSortInput!],
           $where:  NcVeiculoInternoFilterInput
           $first:  Int) {
        usuarioVeiculoInterno( sessao: $sessao,
                                order: $order,
                                where: $where
                                first: $first)
        {

            nodes
            {
              id
              guid
              tipo
              placa
              imagem {
                imagem
              }
              modeloId
              modelo {
                id
                veiculoModelo
              }
              cor
              grupoId
              grupo {
                id
                veiculoGrupo
              }
              caracteristica
              peso
              licenciamento
              combustivel
              supervisorId
              supervisor {
                nome
              }  
              localizacao
              empresaId
              empresa {
                nome
              }
              complemento1
              complemento2
              complemento3
              complemento4
              centroCusto {
                id
                centroCusto
              }
              abordagem {
                mensagemInformativa
                mensagemAdvertida
                mensagemRestritiva
              }          
              condutores {
                pessoaId
                pessoaInterna {
                  id
                  nome
                  telefoneFixo
                  email
                  grupo {
                    pessoaGrupo
                  }
                  area {
                    id
                    nome
                  }
                }
              }          
              niveisAcessoPermanente {
                id
                nivelAcessoId
                nivelAcesso {
                  id
                  nome
                  areas {
                    areaId
                    area {
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
                }
              }
              acessoCartao
              acessoCredito
              ignorarDirecao
              ignorarRota
              ignorarTemporizacao
              ignorarCredito
              ignorarValidacaoExterna
              liberarSaidaExpirada
              validadeCadastroInicio
              validadeCadastroFim
              observacao
              cadastroData
              cadastroOrigem
              status              
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
              areaId
              area {
                nome
                id
                setorId
                setor {
                  id
                  nome
                  siteId
                }
              }
            }
        }
    }`,

  read_VeiculoInternoUsuarioRelat: gql`
    query( $sessao: UsuarioSessaoInput!,
           $order:  [NcVeiculoInternoSortInput!],
           $where:  NcVeiculoInternoFilterInput
           $first:  Int) {
        usuarioVeiculoInterno( sessao: $sessao,
                                order: $order,
                                where: $where
                                first: $first)
        {
          totalCount
            nodes
            {
                id
                guid
                tipo
                placa
                imagem {
                  imagem
                }
                modeloId
                modelo {
                  id
                  veiculoModelo
                }
                cor
                grupoId
                grupo {
                  id
                  veiculoGrupo
                }
                caracteristica
                peso
                licenciamento
                combustivel
                supervisorId
                supervisor {
                  id
                  nome
                }  
                localizacao
                empresaId
                empresa {
                  nome
                }
                complemento1
                complemento2
                complemento3
                complemento4
                centroCustoId
                centroCusto {
                  id
                  centroCusto
                }
                abordagem {
                  mensagemInformativa
                  mensagemAdvertida
                  mensagemRestritiva
                }
          
              condutores {
                pessoaId
                veiculoId
                pessoaInterna {
                  id
                  nome
                  telefoneFixo
                  email
                  grupo {
                    pessoaGrupo
                  }
                }
              }
          
                niveisAcessoPermanente {
                  nivelAcessoId
                  nivelAcesso {
                     nome
                    
                  }
                }
          
                acessoCartao
                acessoCredito
                ignorarDirecao
                ignorarRota
                ignorarTemporizacao
                ignorarCredito
                ignorarValidacaoExterna
                liberarSaidaExpirada
                validadeCadastroInicio
                validadeCadastroFim
                observacao
                cadastroData
                cadastroOrigem
                status
                
                garagens {
                  garagem
                  estacionamento {
                    nome
                    setor {
                      nome
                    }
                  }
                } 
                areaId
                area {
                  nome
                  id
                  setorId
                  setor {
                    id
                    nome
                    siteId
                    site{
                      id
                      nome
                    }
                  }
                }

            }
        }
    }`,


  update_VeiculoInternoUsuario: gql`
    mutation( $sessao: UsuarioSessaoInput!,
      $veiculoInterno: UsuarioVeiculoInternoAlterarInput!)
              
    {
            usuarioVeiculoInterno_Alterar( sessao: $sessao,
                                   veiculoInterno: $veiculoInterno)

            {
                mensagem
                mensagemTipo
                sucesso
                objeto
            }

    }`,


  delete_VeiculoInternoUsuario: gql`
    mutation ($id: Int!,
              $sessao: UsuarioSessaoInput!) {

    usuarioVeiculoInterno_Excluir( id: $id,
                               sessao: $sessao)
        {
            mensagem
            mensagemTipo
            sucesso
            objeto
        }
    }`

}