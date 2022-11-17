import { gql } from 'apollo-angular';


export const IdentificacaoControleSchema = {

    read_IdentificacaoControle: gql`
        query( $sessao: UsuarioSessaoInput!,
               $order: [NcIdentificacaoSortInput!],               
               $where: NcIdentificacaoFilterInput,
               $first: Int )
        {
            controleIdentificacao( sessao: $sessao,
                                   order: $order,
                                   first: $first,
                                   where: $where )
            {
                totalCount
                nodes 
                {
                    id
                    identificacaoRegistro
                    identificacaoProcesso
                    identificacaoRecepcao
                    identificacaoEstacao

                    agendamentoId
                    identificacaoOrigem
                    identificacaoDataHora
                    identificacaoOperadorId
                    identificacaoOperadorNome
                    identificacaoValidadeInicial
                    identificacaoValidadeFinal
                    siteId
                    siteNome

                    motivo                    
                    identificadorTipo
                    identificador
                    observacao

                    acessoCartao
                    acessoEntradaAutorizada
                    acessoEntradaPessoaId
                    acessoEntradaPessoaNome
                    acessoSaidaAutorizada
                    acessoSaidaPessoaId
                    acessoSaidaPessoaNome                    
                    acessoSaidaForaValidade
                    acessoIngressoAtribuido
                    acessoIngressoCorrente
                    acessoIngressoIgnorar
                    acessoCreditoAtribuido
                    acessoCreditoCorrente
                    acessoCreditoIgnorar
                    acessoSenha
                    acessoSenhaIgnorar
                    acessoBiometriaIgnorar
                    acessoNivel1
                    acessoNivel2
                    acessoNivel3
                    acessoNivel4
                    acessoNivel5
                    acessoNivel6
                    acessoNivel7
                    acessoNivel8
                    acessoNivel9
                    acessoNivel10
                    acessoIngressoAtribuido
                    acessoIngressoCorrente
                    acessoCreditoAtribuido
                    acessoCreditoCorrente

                    motivo
                    estacionamentoId
                    estacionamentoNome
                    garagemTipo
                    garagemVaga
                    areaReservadaId
                    areaReservadaNome
                    integracao
                    
                    pessoaTipo
                    pessoaId
                    pessoaDocTipo
                    pessoaDocNumero
                    pessoaNome
                    pessoaGrupo
                    pessoaComplemento1
                    pessoaEmpresaId
                    pessoaReparticao

                    pessoaExterna {
                        id
                        imagem {
                            imagem
                        }
                        nome
                        telefoneFixo
                        telefoneMovel
                        email
                        empresaId
                        entidadeNome
                    }

                    pessoaCargo
                    pessoaComplemento2
                    pessoaComplemento3
                    pessoaComplemento4
                    
                    visitadoId
                    visitadoNome
                    visitadoAreaId
                    visitadoAreaNome
                    visitadoCentroCusto

                    visitado {
                        id
                        nome
                        grupo {
                            id
                            pessoaGrupo
                        }
                        localizacao
                        telefoneFixo
                        area {
                            id
                            nome
                            setorId
                            setor {
                                id
                                nome
                            }
                        }
                    }

                    autorizanteId
                    autorizanteNome

                    veiculoTipo
                    veiculoId
                    veiculoClasse
                    veiculoPlaca
                    veiculoModelo
                    veiculoCor
                    veiculoGrupo
                    veiculoPeso
                    veiculoComplemento1
                    veiculoComplemento2
                    veiculoComplemento3
                    veiculoComplemento4    
                    
                    identificacaoMateriais {
                        material
                        quantidade
                        notaFiscal
                        observacao
                    }                    
                }
            }
        }`,

    read_IdentificacaoControleRelat: gql`
        query( $sessao: UsuarioSessaoInput!,
               $order: [NcIdentificacaoSortInput!],
               $where: NcIdentificacaoFilterInput,
               $first: Int )
        {
            controleIdentificacao ( sessao: $sessao,
                                    order: $order,                                    
                                    where: $where,
                                    first: $first )
            {
                totalCount
                nodes 
                {
                    id
                    identificador
                    agendamentoId
                    visitaCorrente
                    visitaDataHora
                    siteId
                    siteNome
                    pessoaTipo
                    pessoaId
                    pessoaExterna
                    {
                        email
                        telefoneFixo
                        telefoneMovel
                        abordagem
                        {
                            mensagemInformativa
                            mensagemAdvertida
                            mensagemRestritiva
                        }
                    }
                    pessoaNome
                    pessoaDocTipo
                    pessoaDocNumero
                    pessoaGrupo
                    pessoaEmpresaId
                    pessoaReparticao
                    pessoaCargo
                    pessoaComplemento1
                    pessoaComplemento2
                    pessoaComplemento3
                    pessoaComplemento4
                    veiculoId
                    veiculoClasse
                    veiculoTipo
                    veiculoPlaca
                    veiculoModelo
                    veiculoCor
                    veiculoGrupo
                    veiculoPeso
                    veiculoComplemento1
                    veiculoComplemento2
                    veiculoComplemento3
                    veiculoComplemento4
                    visitadoId
                    visitadoNome
                    identificacaoEstacao
                    visitadoCentroCusto
                    motivo
                    observacao
                    autorizanteId
                    autorizanteNome
                    estacionamentoId
                    estacionamentoNome
                    garagemTipo
                    garagemVaga
                    areaReservadaId
                    areaReservadaNome
                    acessoCartao
                    acessoSenha
                    acessoNivel1
                    acessoNivel2
                    acessoNivel3
                    acessoNivel4
                    acessoNivel5
                    acessoNivel6
                    acessoNivel7
                    acessoNivel8
                    acessoNivel9
                    acessoNivel10
                    acessoIngressoAtribuido
                    acessoIngressoCorrente
                    acessoCreditoAtribuido
                    acessoCreditoCorrente
                    motivo
                    identificacaoRecepcao
                    integracao
                    suspensoDataHora
                    suspensoOperadorId
                    suspensoOperadorNome
                    suspensoObservacao
                    identificacaoValidadeInicial
                    identificacaoValidadeFinal
                    identificacaoDataHora
                    visitadoAreaNome
                    visitadoAreaId
                    identificacaoOperadorId
                    identificacaoOperadorNome
                }
            }
        }`,

    read_IdentificacaoControleArq: gql`
        query( $sessao: UsuarioSessaoInput!,
               $order: [NcIdentificacaoArqSortInput!],
               $where: NcIdentificacaoArqFilterInput,
               $first: Int )
        {
            controleIdentificacaoArq( sessao: $sessao,
                                      order: $order,
                                      where: $where,
                                      first: $first )
            {
                totalCount
                nodes 
                {
                    id
                    agendamentoId
                    identificacaoDataHora
                    identificacaoOperadorId
                    identificacaoOperadorNome
                    siteId
                    siteNome        
                    pessoaTipo
                    pessoaId
                    pessoaNome
                    pessoaExterna
                    {
                        email
                        telefoneFixo
                        telefoneMovel
                        imagem
                        {
                            imagem
                        }
                        abordagem
                        {
                            mensagemInformativa
                            mensagemAdvertida
                            mensagemRestritiva
                        }
                    }
                    pessoaDocTipo
                    pessoaDocNumero
                    pessoaGrupo
                    pessoaEmpresaId
                    pessoaReparticao
                    pessoaComplemento1
                    pessoaComplemento2
                    pessoaComplemento3
                    pessoaComplemento4
                    veiculoId
                    veiculoTipo
                    veiculoPlaca
                    veiculoModelo
                    veiculoCor
                    veiculoGrupo
                    veiculoPeso
                    veiculoComplemento1
                    veiculoComplemento2
                    veiculoComplemento3
                    veiculoComplemento4
                    visitadoId
                    visitadoNome
                    visitadoCentroCusto
                    autorizanteId
                    autorizanteNome
                    estacionamentoId
                    estacionamentoNome
                    garagemTipo
                    garagemVaga
                    areaReservadaId
                    areaReservadaNome
                    motivo
                    identificador
                    identificadorTipo
                    acessoCartao
                    acessoSenha
                    identificacaoValidadeInicial
                    identificacaoValidadeFinal
                    acessoNivel1
                    acessoNivel2
                    acessoNivel3
                    acessoNivel4
                    acessoNivel5
                    acessoNivel6
                    acessoNivel7
                    acessoNivel8
                    acessoNivel9
                    acessoNivel10
                    acessoIngressoAtribuido
                    acessoIngressoCorrente
                    acessoCreditoAtribuido
                    acessoCreditoCorrente
                    integracao
                    observacao
                    statusFinal
                    statusFinalDataHora
                    statusFinalLocal
                    statusFinalPessoaId
                    statusFinalPessoaNome
                    statusFinalObservacao
                }
            }
        }`,

    read_IdentificacaoControleArqRelat: gql`
        query( $sessao: UsuarioSessaoInput!,
               $order: [NcIdentificacaoArqSortInput!],
               $where: NcIdentificacaoArqFilterInput,
               $first: PaginationAmount )
        {
            controleIdentificacaoArq( sessao: $sessao,
                                            order: $order,
                                            where: $where,
                                            first: $first )
            {
                totalCount
                nodes 
                {
                    id
                    agendamentoId
                    identificacaoDataHora
                    identificacaoLocalTipo
                    identificacaoLocalNome
                    identificacaoOperadorId
                    identificacaoOperadorNome
                    siteId
                    siteNome        
                    pessoaTipo
                    pessoaId
                    pessoaNome
                    pessoaExterna
                    {
                        email
                        telefoneFixo
                        telefoneMovel
                        abordagem
                        {
                            mensagemInformativa
                            mensagemAdvertida
                            mensagemRestritiva
                        }
                    }
                    pessoaDocTipo
                    pessoaDocNumero
                    pessoaCPF
                    pessoaGrupo
                    pessoaEmpresaId
                    pessoaReparticao
                    pessoaComplemento1
                    pessoaComplemento2
                    pessoaComplemento3
                    pessoaComplemento4
                    veiculoId
                    veiculoTipo
                    veiculoPlaca
                    veiculoModelo
                    veiculoCor
                    veiculoGrupo
                    veiculoPeso
                    veiculoComplemento1
                    veiculoComplemento2
                    veiculoComplemento3
                    veiculoComplemento4
                    visitadoId
                    visitadoNome
                    visitadoUnidadeId
                    visitadoUnidadeNome
                    visitadoCentroCusto
                    autorizanteId
                    autorizanteNome
                    estacionamentoId
                    estacionamentoNome
                    garagemTipo
                    garagemVaga
                    areaReservadaId
                    areaReservadaNome
                    motivo
                    identificador
                    identificadorTipo
                    acessoCartao
                    acessoSenha
                    identificacaoValidadeInicial
                    identificacaoValidadeFinal
                    acessoNivel1
                    acessoNivel2
                    acessoNivel3
                    acessoNivel4
                    acessoNivel5
                    acessoNivel6
                    acessoNivel7
                    acessoNivel8
                    acessoNivel9
                    acessoNivel10
                    acessoLocalEntrada
                    acessoDataHoraEntrada 
                    acessoIngressoAtribuido
                    acessoIngressoCorrente
                    acessoCreditoAtribuido
                    acessoCreditoCorrente
                    acessoBiometria
                    integracao
                    observacao
                    statusFinal
                    statusFinalDataHora
                    statusFinalLocal
                    statusFinalPessoaId
                    statusFinalPessoaNome
                    statusFinalObservacao
                }
            }
        }`,

    create_IdentificacaoControle: gql`
        mutation( $sessao: UsuarioSessaoInput!,
                  $identificacao: ControleIdentificacaoInserirInput! )
        {
            controleIdentificacao_Inserir( sessao: $sessao,
                                           identificacao: $identificacao )
            {
                mensagem
                mensagemTipo
                sucesso
                objeto
            }
            
        }`,

    update_IdentificacaoControle: gql`
        mutation( $sessao: UsuarioSessaoInput!,
                  $identificacao: ControleIdentificacaoAlterarInput! )
        {
            controleIdentificacao_Alterar( sessao: $sessao,
                                           identificacao: $identificacao )
            {
                mensagem
                mensagemTipo
                sucesso
                objeto
            }
            
        }`,

    suspend_IdentificacaoControle: gql`
        mutation( $sessao: UsuarioSessaoInput!,
                  $identificacao: ControleIdentificacaoSuspenderInput! )
        {
            controleIdentificacao_Suspender( sessao: $sessao,
                                             identificacao: $identificacao )
            {
                mensagem
                mensagemTipo
                sucesso
                objeto
            }
        }`,


    end_IdentificacaoControle: gql`
        mutation( $sessao: UsuarioSessaoInput!,
                  $identificacao: ControleIdentificacaoEncerrarInput! )
        {
            controleIdentificacao_Encerrar( sessao: $sessao,
                                            identificacao: $identificacao )
            {
                mensagem
                mensagemTipo
                sucesso
                objeto
            }
        }`,

    cancel_IdentificacaoControle: gql`
        mutation( $sessao: UsuarioSessaoInput!,
                  $identificacao: ControleIdentificacaoCancelarInput! )
        {
            controleIdentificacao_Cancelar( sessao: $sessao,
                                            identificacao: $identificacao)
            {
                mensagem
                mensagemTipo
                sucesso
                objeto
            }
        }`,

}
