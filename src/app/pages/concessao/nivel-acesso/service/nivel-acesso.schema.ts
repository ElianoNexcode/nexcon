import gql from "graphql-tag";

export const NivelAcessoConcessaoSchema = {

    create_NivelAcessoConcessao: gql`
        mutation( $sessao: UsuarioSessaoInput!,
                  $nivelAcesso: ConcessaoNivelAcessoInserirInput!)
        {
            concessaoNivelAcesso_Inserir( sessao: $sessao,
                                     nivelAcesso: $nivelAcesso)
            {
            mensagem
            mensagemTipo
            sucesso
            objeto
            }         
        }`,

    read_NivelAcessoConcessao: gql`
        query( $sessao: UsuarioSessaoInput!,
               $order: [NcNivelAcessoSortInput!],
               $where: NcNivelAcessoFilterInput,
               $first: Int )
        {
            concessaoNivelAcesso( sessao: $sessao,
                                   order: $order,
                                   where: $where,
                                   first: $first )
            {
                nodes
                {
                    id
                    nome 
                    tipo
                    validadeInicial
                    validadeFinal 
                    expansaoHoraInicial
                    expansaoHoraFinal 
                    expansaoDataInicial
                    expansaoDataFinal 
                    observacao 
                    status
                    recepcoes {
                      nivelAcesso {
                        nome
                        id
                      }
                       nivelAcessoPadrao
                    } 
                     areas {              
                      areaId 
                      area {
                        id
                        nome
                        setorId
                        setor {
                          siteId
                          site {
                            nome
                          }
                        }
                      }    
                      bloqueios {
                        bloqueioId
                        bloqueio {
                          id
                          nome
                        }
                      }
                      faixasHorarias {
                        faixaHorariaId
                        faixaTipo
                        faixaHoraria {
                          nome
                        }
                      }
                      elevadores {
                        elevadorId
                        elevadorAndar
                        elevador {
                          id
                          nome
                        }
                      }
                    }
                }
            }
        }`,

    read_NivelAcessoConcessaoRelat: gql`
        query( $sessao: UsuarioSessaoInput!,
               $order: [NcNivelAcessoSortInput!],
               $where: NcNivelAcessoFilterInput,
               $first: Int )
        {
            concessaoNivelAcesso( sessao: $sessao,
                                   order: $order,
                                   where: $where,
                                   first: $first )
            {
                totalCount
                nodes
                {
                    id
                    nome 
                    tipo
                    validadeInicial
                    validadeFinal 
                    expansaoHoraInicial
                    expansaoHoraFinal 
                    expansaoDataInicial
                    expansaoDataFinal 
                    observacao 
                    status
                    recepcoes {
                      nivelAcesso {
                        nome
                        id
                      }
                       nivelAcessoPadrao
                    } 
                     areas {              
                      areaId 
                      area {
                        id
                        nome
                        setorId
                        setor {
                          siteId
                          site {
                            nome
                          }
                        }
                      }    
                      bloqueios {
                        bloqueioId
                        bloqueio {
                          id
                          nome
                        }
                      }
                      faixasHorarias {
                        faixaHorariaId
                        faixaTipo
                        faixaHoraria {
                          nome
                        }
                      }
                      elevadores {
                        elevadorId
                        elevadorAndar
                        elevador {
                          id
                          nome
                        }
                      }
                    }
                }
            }
        }`,

    update_NivelAcessoConcessao: gql`
        mutation( $sessao: UsuarioSessaoInput!,
                  $nivelAcesso: ConcessaoNivelAcessoAlterarInput!)
        {
            concessaoNivelAcesso_Alterar( sessao: $sessao,
                                     nivelAcesso: $nivelAcesso)
            {
            mensagem
            mensagemTipo
            sucesso
            objeto
            }         
        }`, 
        
    delete_NivelAcessoConcessao: gql`
        mutation( $id: Short!,
                  $sessao: UsuarioSessaoInput!)
        {
            concessaoNivelAcesso_Excluir( id: $id,
                                      sessao: $sessao)
            {
            mensagem
            mensagemTipo
            sucesso
            objeto
            }         
        }`,    

}