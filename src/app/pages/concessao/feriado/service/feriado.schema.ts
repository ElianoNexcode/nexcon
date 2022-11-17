import gql from 'graphql-tag';

export const FeriadoConcessaoSchema = {

    create_FeriadoConcessao: gql`
        mutation( $sessao: UsuarioSessaoInput!,
                  $feriado: ConcessaoFeriadoInserirInput! )
        {
            concessaoFeriado_Inserir( sessao: $sessao,
                                      feriado: $feriado )
            {
                mensagem
                mensagemTipo
                sucesso
                objeto
            }
        }`,

    read_FeriadoConcessao: gql`
        query( $sessao: UsuarioSessaoInput!,
               $order: [NcFeriadoSortInput!],
               $where: NcFeriadoFilterInput,
               $first: Int )
        {        
            concessaoFeriado( sessao: $sessao,
                              order: $order,
                              where: $where,
                              first: $first )
            {
                nodes
                {
                    id
                    nome
                    dia
                    mes
                    observacao
                }    
                
            }
        }`,

    update_FeriadoConcessao: gql`
        mutation( $sessao: UsuarioSessaoInput!,
                  $feriado: ConcessaoFeriadoAlterarInput! )                  
        {
            concessaoFeriado_Alterar( sessao: $sessao,
                                      feriado: $feriado )
            {
                mensagem
                mensagemTipo
                sucesso
                objeto
            }
        }`,

    delete_FeriadoConcessao: gql`
        mutation( $id: Byte!,
                  $sessao: UsuarioSessaoInput! )
        {
            concessaoFeriado_Excluir( id: $id,
                                      sessao: $sessao )
            {
                mensagem
                mensagemTipo
                sucesso
            }
        }`
}