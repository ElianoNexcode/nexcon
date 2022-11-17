import gql from 'graphql-tag';

export const PessoaExternaSchema = {

    create_PessoaExterna: gql`
        mutation ($sessao: UsuarioSessaoInput!,
                $pessoaExterna: UsuarioPessoaExternaInserirInput!) { 
            usuarioPessoaExterna_Inserir (sessao: $sessao,
                                        pessoaExterna: $pessoaExterna)
            {
                mensagem
                mensagemTipo
                sucesso
                objeto        
            } 
        }`,


    read_PessoaExternaCargo: gql`
        query {
            usuarioPessoaExternaCargo
        }`,
    

    read_PessoaExterna: gql`
        query( $sessao: UsuarioSessaoInput!,
            $order: [NcPessoaExternaSortInput!],
            $where: NcPessoaExternaFilterInput,
            $first: Int) {

            usuarioPessoaExterna( sessao: $sessao,
                                order: $order,
                                where: $where,
                                first: $first ) {
                totalCount
                nodes {
                    id
                    guid
                    nome      
                    grupoId,
                    grupo {
                        pessoaGrupo
                    }
                    telefoneFixo
                    telefoneMovel
                    email     
                    documentoTipo
                    documentoNumero
                    nascimento  
                    cargo   
                    complemento1
                    complemento2
                    complemento3
                    complemento4
                    empresaId
                    entidadeNome
                    empresa{
                        id
                        nome
                    }    
                    integracaoInicio
                    integracaoFim
                    segurancaInicio
                    segurancaFim
                    exameMedicoInicio
                    exameMedicoFim    
                    ultimaVisitaDataHora
                    ultimoVisitadoId
                    ultimoVisitado {
                        id
                        nome
                    }   
                    ultimoMotivo     
                    exPessoaInterna
                    observacao
                    dataCadastro
                    origemCadastro
                    presente
                    status
                    cargo
                                    
                    endereco {
                        pessoaId
                        logradouro
                        numero
                        bairro
                        cep
                        complemento
                        cidade
                        estado
                        pais
                    }
                    
                    imagem {
                        imagem
                    }
                    
                    veiculos {
                        veiculoId
                        veiculoExterno {
                            id
                            placa
                            tipo
                            cor
                            modeloId
                            modelo {
                                id
                                veiculoModelo
                            }
                        }
                    }

                    garagens {
                        id
                        garagem
                        estacionamentoId
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
                        pessoaId
                        mensagemInformativa
                        mensagemAdvertida
                        mensagemRestritiva
                    }            
                }
            }
        }`,

    read_PessoaExternaRelat: gql`
        query( $sessao: UsuarioSessaoInput!,
            $order: [NcPessoaExternaSortInput!],
            $where: NcPessoaExternaFilterInput,
            $first: Int) {
            usuarioPessoaExterna( sessao: $sessao,
                                  order: $order,
                                  where: $where,
                                  first: $first )
            {
                totalCount
                nodes {
                        id
                        nome
                        grupoId
                        grupo
                        {
                            id
                            pessoaGrupo
                        }
                        telefoneFixo
                        telefoneMovel
                        email
                        observacao
                        documentoTipo
                        dataCadastro
                        documentoNumero
                        
                        nascimento
                        empresaId
                        empresa
                        {
                            id
                            nome
                        }
                        
                        entidadeNome
                        complemento1
                        complemento2
                        complemento3
                        complemento4
                        endereco
                        {
                            pessoaId
                            logradouro
                            numero
                            complemento
                            bairro
                            cep
                            cidade
                            estado
                            pais                    
                        }
                        integracaoInicio
                        integracaoFim
                        segurancaInicio
                        segurancaFim
                        exameMedicoInicio
                        exameMedicoFim
                        
                        
                        cargo
                        abordagem {
                            pessoaId
                            mensagemInformativa
                            mensagemAdvertida
                            mensagemRestritiva
                        }
                        veiculos {
                            veiculoId
                            pessoaId
                            veiculoExterno {
                                id
                                tipo
                                placa
                                modeloId
                                modelo {
                                    id
                                    veiculoModelo
                                }
                                cor
                            }
                        }
                        ultimoVisitadoId
                        status
                }
            
            }

        }`,
   
    update_PessoaExterna: gql`
        mutation ($sessao: UsuarioSessaoInput!,
                $pessoaExterna: UsuarioPessoaExternaAlterarInput!) { 
            usuarioPessoaExterna_Alterar (sessao: $sessao,
                                            pessoaExterna: $pessoaExterna)
            {
                mensagem
                mensagemTipo
                sucesso
                objeto        
            } 
        }`,

    delete_PessoaExterna: gql`
        mutation( $id: Int!,
                $sessao: UsuarioSessaoInput!) {

            usuarioPessoaExterna_Excluir (id: $id,
                                        sessao: $sessao)
            {
                mensagem
                mensagemTipo
                sucesso
            }
        }`
}
