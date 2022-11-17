import gql from 'graphql-tag';

export const PessoaInternaSchema = {

    create_PessoaInterna: gql`
      mutation ($sessao: UsuarioSessaoInput!,
                $pessoaInterna: UsuarioPessoaInternaInserirInput!) { 
          usuarioPessoaInterna_Inserir (sessao: $sessao,
                                        pessoaInterna: $pessoaInterna)
          {
              mensagem
              mensagemTipo
              sucesso
              objeto        
          } 
      }`,

    read_PessoaInternaCargos: gql`
      query {
          usuarioPessoaInternaCargo
      }`,

    read_PessoaInternaLocalizacoes: gql`
      query {
          usuarioPessoaInternaLocalizacao                                                        
      }`,

    read_PessoaInterna: gql`
      query( $sessao: UsuarioSessaoInput!,
            $order: [NcPessoaInternaSortInput!],
            $where: NcPessoaInternaFilterInput,
            $first: Int ) {
        usuarioPessoaInterna( sessao: $sessao,
                              order: $order,
                              where: $where,
                              first: $first ) {
            totalCount
            nodes{
              id
              guid
              nome      
              grupoId
              grupo {
                id
                pessoaGrupo
              }
              telefoneFixo
              telefoneMovel
              email
              identificador
              documentoTipo
              documentoNumero
              cognome
              nascimento
              habilitacaoRegistro
              habilitacaoCategoria
              habilitacaoValidade
              cargo     
              
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
              contratacaoInicio
              contratacaoFim
              integracaoInicio
              integracaoFim
              segurancaInicio
              segurancaFim
              exameMedicoInicio
              exameMedicoFim
              feriasInicio
              feriasFim
              afastamentoInicio
              afastamentoFim
              recebeVisita
              autorizaVisita
              acessoCartao
              acessoSenha
              acessoCredito
              ignorarDirecao
              ignorarRota
              ignorarTemporizacao
              ignorarBiometria
              ignorarCredito
              ignorarValidacaoExterna      
              liberarSaidaExpirada   
              observacao
              cadastroData
              cadastroOrigem
              presente
              status 

              endereco {
                logradouro
                numero
                complemento
                bairro
                cep 
                cidade
                estado
                pais
              }
        
              abordagem {
                mensagemInformativa
                mensagemAdvertida
                mensagemRestritiva                
              }
        
              supervisorId
              supervisor{
                id
                nome
              }
              responsaveis {
                responsavelId
                responsavel {
                  id
                  nome
                  area {
                    id
                    nome
                  }
                  grupo {
                    id
                    pessoaGrupo
                  }
                  telefoneFixo
                  telefoneMovel
                }
              }
             imagem {
                imagem
              }
              
              veiculos {
                veiculoId
                veiculoInterno {
                  id
                  placa
                  tipo
                  modelo {
                    id
                    veiculoModelo
                  }
                  cor
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
                    siteId
                    site {
                      id
                      nome
                    }
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
              niveisAcessoRotativo {
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
            }     
          }
      }`,


    read_PessoaInternaRelat: gql`
      query( $sessao: UsuarioSessaoInput!,
             $order: [NcPessoaInternaSortInput!],
             $where: NcPessoaInternaFilterInput,
             $first: Int ) {
        usuarioPessoaInterna( sessao: $sessao,
                              order: $order,
                              where: $where,
                              first: $first ) {
            totalCount
            nodes{
              id
              guid
              nome      
              grupoId
              grupo {
                id
                pessoaGrupo
              }
              telefoneFixo
              telefoneMovel
              email
              identificador
              documentoTipo
              documentoNumero
              cognome
              nascimento
              habilitacaoRegistro
              habilitacaoCategoria
              habilitacaoValidade     
              cargo     
              
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
              localizacao
              empresaId
              empresa {
                id
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
              contratacaoInicio
              contratacaoFim
              integracaoInicio
              integracaoFim
              segurancaInicio
              segurancaFim
              exameMedicoInicio
              exameMedicoFim
              feriasInicio
              feriasFim
              afastamentoInicio
              afastamentoFim
              recebeVisita
              autorizaVisita
              acessoCartao
              acessoSenha
              acessoCredito
              ignorarDirecao
              ignorarRota
              ignorarTemporizacao
              ignorarBiometria
              ignorarCredito
              ignorarValidacaoExterna      
              liberarSaidaExpirada   
              observacao
              cadastroData
              cadastroOrigem
              presente
              status 

              endereco {
                logradouro
                numero
                complemento
                bairro
                cep 
                cidade
                estado
                pais
              }
        
              abordagem {
                mensagemInformativa        
              }
        
              supervisorId
              supervisor{
                id
                nome
              }
              responsaveis{
                responsavel{
                  id
                  nome
                }
              }
             imagem {
                imagem
              }
              
              veiculos {
                pessoaId
                veiculoId
                veiculoInterno {
                  id
                  modeloId
                  modelo {
                    veiculoModelo
                  }
                  placa
                  cor
                }
              }
        
              garagens {
                garagem
              }
        
              niveisAcessoPermanente {
                pessoaId
                nivelAcessoId
                nivelAcesso {
                  id
                  nome
                }
              }
              niveisAcessoRotativo {
                nivelAcesso {
                  nome
                }
              }
              abordagem {
                pessoaId
                mensagemInformativa
                mensagemAdvertida
                mensagemRestritiva
              }


              }     
          }
      }`,



    update_PessoaInterna: gql`
      mutation ($sessao: UsuarioSessaoInput!,
                $pessoaInterna: UsuarioPessoaInternaAlterarInput!) { 
          usuarioPessoaInterna_Alterar ( sessao: $sessao,
                                        pessoaInterna: $pessoaInterna )
          {
              mensagem
              mensagemTipo
              sucesso
              objeto        
          } 
      }`,

    delete_PessoaInterna: gql`
      mutation ($id: Int!,
                $sessao: UsuarioSessaoInput!) {

      usuarioPessoaInterna_Excluir( id: $id,
                                    sessao: $sessao)
          {
              mensagem
              mensagemTipo
              sucesso
          }
      }`
}
