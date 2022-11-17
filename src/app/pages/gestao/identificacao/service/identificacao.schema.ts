import gql from 'graphql-tag'

export const GestaoIdentificacaoSchema = {

    read_Gestao_Informacao: gql`
        query( $sessao: UsuarioSessaoInput! )
        {
            gestaoInformacao( sessao: $sessao )
            {
                nodes 
                {
                    id
                }
            }
        }`,

    getRelatorioGrafico: gql`
        query( $sessao: UsuarioSessaoInput!,
               $modeloRelatorio: String!,
               $filtros: FiltrosIdentificacaoInput! )
        {
            gestaoRelatorioGrafico( sessao: $sessao,
                                    modeloRelatorio: $modeloRelatorio,
                                    filtros: $filtros )
            {
                totalCount
                nodes
                {
                    campo
                    diaHora
                    valor
                }
            }
        }`,

    getRelatorioConsolidado: gql`
        query ( $sessao: UsuarioSessaoInput!,
                $modeloRelatorio: String!,
                $filtros: FiltrosIdentificacaoInput! )
        {
            gestaoRelatorioConsolidado( sessao: $sessao,
                                        modeloRelatorio: $modeloRelatorio,
                                        filtros: $filtros )
            {
                totalCount
                nodes
                {
                    campo
                    campo1
                    campo2
                    campo3
                    campo4
                    campo5
                    campo6
                    campo7
                    campo8
                    campo9
                    campo10
                    campo11
                    campo12
                    campo13
                    campo14
                    campo15
                    campo16
                    campo17
                    campo18
                    campo19
                    campo20
                    campo21
                    campo22
                    campo23
                    campo24
                    campo25
                    campo26
                    campo27
                    campo28
                    campo29
                    campo30
                    campo31
                }
            }
        }`
    
}