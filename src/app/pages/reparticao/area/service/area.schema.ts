import gql from 'graphql-tag';

export const AreaReparticaoSchema = {
    create_Area: gql`
        mutation( $sessao: UsuarioSessaoInput!,
                  $area: ReparticaoAreaInserirInput! )
        {
            reparticaoArea_Inserir( sessao: $sessao,
                                    area: $area )
            {
                mensagem
                mensagemTipo
                sucesso
                objeto
            }
        }`,

    read_Area: gql`
        query( $sessao: UsuarioSessaoInput!,
               $order: [NcAreaSortInput!],
               $where: NcAreaFilterInput,
               $first: Int )
        {
            reparticaoArea( sessao: $sessao,
                            order: $order,
                            where: $where,
                            first: $first ) 
            {
                totalCount
                nodes 
                {
                    id
                    tipo
                    nome
                    areaMaeId
                    volumePermitido
                    temporizacaoAcesso
                    temporizarAcesso
                    idadeMinima
                    idadeMaxima
                    localizacao
                    observacao
                    controlarDirecao
                    controlarRota
                    recolherCartao
                    arquivarIdentificacao
                    validarIdentificador
                    validarContratacao
                    validarIntegracao
                    validarSeguranca
                    validarExameMedico
                    validarFerias
                    validarAfastamento
                    validarHabilitacao
                    validarLicenciamento
                    validarCredito
                    validarGaragem
                    validacaoExterna
                    niveisRotativos {
                        nivelAcessoId
                        nivelAcesso {
                            id
                            nome
                            }
                    }
                    setorId
                    setor {
                      nome
                    }
                    areasInterligadas {
                      interligacaoAreaId
                      interligacaoArea {
                        nome
                      }
                      interligacaoSetorId
                      interligacaoSetor {
                        nome
                      }
                    }
                    controleVisitas {
                      quantidade
                      pessoaGrupoId
                      pessoaGrupo {
                        id
                        pessoaGrupo                        
                      }
                    }
                    elevadores {
                        areaId
                    }
                    bloqueios {
                        areaId
                    }
                }
            }
        }`,

    read_AreaRelat: gql`
        query( $sessao: UsuarioSessaoInput!,
               $order: [NcAreaSortInput!],
               $where: NcAreaFilterInput,
               $first: Int )
        {
            reparticaoArea( sessao: $sessao,
                            order: $order,
                            where: $where,
                            first: $first ) 
            {
                totalCount
                nodes 
                {
                    id
                    tipo
                    nome
                    areaMaeId
                    volumePermitido
                    temporizacaoAcesso
                    temporizarAcesso
                    idadeMinima
                    idadeMaxima
                    localizacao
                    observacao
                    controlarDirecao
                    controlarRota
                    recolherCartao
                    arquivarIdentificacao
                    validarIdentificador
                    validarContratacao
                    validarIntegracao
                    validarSeguranca
                    validarExameMedico
                    validarFerias
                    validarAfastamento
                    validarHabilitacao
                    validarLicenciamento
                    validarCredito
                    validarGaragem
                    validacaoExterna
                    niveisRotativos {
                        nivelAcessoId
                        nivelAcesso {
                            id
                            nome
                            }
                    }
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
                    areasInterligadas {
                      interligacaoAreaId
                      interligacaoArea {
                        nome
                      }
                      interligacaoSetorId
                      interligacaoSetor {
                        nome
                      }
                    }
                    controleVisitas {
                      quantidade
                      pessoaGrupoId
                      pessoaGrupo {
                        id
                        pessoaGrupo                        
                      }
                    }
                    elevadores {
                        areaId
                    }
                    bloqueios {
                        nome
                        areaId
                    }
                    pessoas{
                        areaId
                        nome
                    }
                    veiculos{
                        areaId
                        placa
                    }
                }
            }
        }`,

    update_Area: gql`
        mutation( $sessao: UsuarioSessaoInput!,
                  $area: ReparticaoAreaAlterarInput! )
        {
            reparticaoArea_Alterar( sessao: $sessao,
                                    area: $area )
            {
                mensagem
                mensagemTipo
                sucesso
                objeto
            }
        }`,

    delete_Area: gql`
        mutation( $id: Int!,
                  $sessao: UsuarioSessaoInput! )
        {
            reparticaoArea_Excluir( id: $id,
                                    sessao: $sessao ) 
            {
                mensagem
                mensagemTipo
                sucesso
            }
        }`
};
