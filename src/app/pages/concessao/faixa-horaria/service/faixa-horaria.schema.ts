import gql from 'graphql-tag';

export const FaixaHorariaConcessaoSchema = {

    create_FaixaHorariaConcessao: gql`
        mutation( $sessao: UsuarioSessaoInput!,
                  $faixaHoraria: ConcessaoFaixaHorariaInserirInput! )
        {
            concessaoFaixaHoraria_Inserir( sessao: $sessao,
                                           faixaHoraria: $faixaHoraria )
            {
                mensagem
                mensagemTipo
                sucesso
                objeto
            }
        }`,

    read_FaixaHorariaConcessao: gql`
        query( $sessao: UsuarioSessaoInput!,
               $order: [NcFaixaHorariaSortInput!],
               $where: NcFaixaHorariaFilterInput,
               $first: Int )
        {
            concessaoFaixaHoraria( sessao: $sessao,
                                   order: $order,
                                   where: $where,
                                   first: $first )
            {
                nodes
                {
                    id
                    nome
                    horaInicial
                    horaFinal
                    domingo
                    segunda
                    terca
                    quarta
                    quinta
                    sexta
                    sabado
                    feriado
                    ignorarValidacao
                    observacao
                }                
            }
        }`,

    update_FaixaHorariaConcessao: gql`
        mutation( $sessao: UsuarioSessaoInput!,
                  $faixaHoraria: ConcessaoFaixaHorariaAlterarInput! )
        {
            concessaoFaixaHoraria_Alterar( sessao: $sessao,
                                           faixaHoraria: $faixaHoraria )
            {
                mensagem
                mensagemTipo
                sucesso
                objeto
            }
        }`,

    delete_FaixaHorariaConcessao: gql`
        mutation( $id: Short!,
                  $sessao: UsuarioSessaoInput! )
        {
            concessaoFaixaHoraria_Excluir ( id: $id,
                                            sessao: $sessao) 
            {
                mensagem
                mensagemTipo
                sucesso
            }
        }`
}