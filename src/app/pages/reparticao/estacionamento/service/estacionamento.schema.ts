import gql from 'graphql-tag';

export const EstacionamentoVagaSchema = {

    get_EstacionamentoVaga: gql`
        query( $sessao: UsuarioSessaoInput!,
               $order: [NcEstacionamentoVagaSortInput!],
               $where: NcEstacionamentoVagaFilterInput,
               $first: Int )
        { 
            reparticaoEstacionamentoVaga( sessao: $sessao,
                                          order: $order,
                                          where: $where,
                                          first: $first )
            {
                nodes 
                {
                    id
                    estacionamentoId
                    estacionamento {
                        id
                        nome
                    }
                    areaVinculadaId
                    areaVinculada
                    {
                        id
                        nome
                        setorId
                        setor
                        {
                            id
                            nome
                            siteId
                            site
                            {
                                id
                                nome
                            }
                        }
                    }
                    garagem
                    localizacao
                    observacao
                    tipoGaragem
                    ultimoAcesso
                    usuarioTipo
                    usuarioAssociadoId
                    usuarioVinculadoId
                    pessoaInterna {
                        nome
                        id
                      }
                
                       pessoaExterna {
                        nome
                      }
                
                      veiculoInterno {
                        placa
                      }
                
                       veiculoExterno {
                        placa
                      }
                
                    
                      ultimoAcesso
                      observacao 
                }
            } 
        }`,

        get_EstacionamentoVagaRelat: gql`
        query( $sessao: UsuarioSessaoInput!,
               $order: [NcEstacionamentoVagaSortInput!],
               $where: NcEstacionamentoVagaFilterInput,
               $first: Int )
        { 
            reparticaoEstacionamentoVaga( sessao: $sessao,
                                          order: $order,
                                          where: $where,
                                          first: $first )
            {
                totalCount
                nodes 
                {
                    id
                    localizacao
                    estacionamentoId
                    estacionamento {
                        id
                        nome
                    }
                    areaVinculadaId
                    areaVinculada
                    {
                        id
                        areaMaeId
                        nome
                        volumePermitido
                        garagens{
                            garagem 
                            estacionamentoId
                        }
                        bloqueios{
                            areaId
                            nome
                        }
                        setorId
                        setor
                        {
                            id
                            nome
                            siteId
                            site
                            {
                                id
                                nome
                            }
                        }
                    }
                    garagem
                    observacao
                    tipoGaragem
                    ultimoAcesso
                    usuarioTipo
                    usuarioAssociadoId
                    usuarioVinculadoId
                    veiculoInterno{
                        id
                        placa
                    }
                    pessoaInterna {
                        nome
                        id
                      }
                
                       pessoaExterna {
                        nome
                      }
                
                      veiculoInterno {
                        placa
                      }
                
                       veiculoExterno {
                        placa
                      }
                
                    
                      ultimoAcesso
                      observacao 
                }
            } 
        }`,

    create_EstacionamentoVaga: gql`
        mutation ( $sessao: UsuarioSessaoInput!,
                   $estacionamentoVaga: ReparticaoEstacionamentoInserirInput!) {
            
            reparticaoEstacionamentoVaga_Inserir ( sessao: $sessao,
                                                   estacionamentoVaga: $estacionamentoVaga ) 
            {
                mensagem
                mensagemTipo
                sucesso
                objeto
            } 
        }`,

    
    update_EstacionamentoVaga: gql`
        mutation ( $sessao: UsuarioSessaoInput!,
                   $estacionamentoVaga: ReparticaoEstacionamentoAlterarInput!) {
            
            reparticaoEstacionamentoVaga_Alterar ( sessao: $sessao,
                                                   estacionamentoVaga: $estacionamentoVaga) 
            {
                mensagem
                mensagemTipo
                sucesso
                objeto
            }
        }`,

    delete_EstacionamentoVaga: gql`
        mutation ( $id: Int!,
                $sessao: UsuarioSessaoInput!) {
            reparticaoEstacionamentoVaga_Excluir ( id: $id,
                                                sessao: $sessao) 
            {
                mensagem
                mensagemTipo
                sucesso
            } 
        }`
        
}