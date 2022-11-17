import gql from 'graphql-tag';

export const ControleVisitaAgendaSchema = {

    read_ControleVisitaAgenda: gql`
        query( $sessao: UsuarioSessaoInput!,
               $order: [NcVisitaAgendaSortInput!],
               $where: NcVisitaAgendaFilterInput,
               $first: PaginationAmount )
        {
            controleVisitaAgenda( sessao: $sessao,
                                  order: $order,
                                  where: $where,
                                  first: $first )
            {
                totalCount
                nodes
                {
                    id
                    pessoaId
                    pessoaDocTipo
                    pessoaDocNumero
                    pessoaNome
                    pessoaCPF
                    pessoaEmpresaCNPJ
                    pessoaEmpresaNome
                    pessoaTipo
                    pessoaCargo
                    pessoaGrupo
                    pessoaGestor
                    pessoaDivisao
                    pessoaComplemento1
                    visitadoId
                    visitadoNome
                    visitadoUnidadeId
                    visitadoUnidadeNome
                    visitadoLocalizacao
                    visitadoComplemento
                    veiculoId
                    veiculoIdentificacao
                    veiculoTipo
                    veiculoClasse
                    veiculoModelo
                    veiculoCor
                    motivo
                    autorizanteNome
                    agendamentoDataHora
                    agendamentoValidadeInicial
                    agendamentoValidadeFinal
                    pessoaExterna
                    {
                        telefoneFixo
                        telefoneMovel
                        email
                        pessoaExternaImg
                        {
                            imagem
                        }
                        abordagem
                        {
                            mensagemInformativa
                            mensagemAdvertida
                            mensagemRestritiva
                        }
                        status
                    }
                    observacao
                }
            
            }
        }`,

}
