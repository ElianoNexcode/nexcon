import gql from 'graphql-tag';

export const ConcessaoCartaoRotativoSchema = {

    create_Concessao_CartaoRotativo: gql`
        mutation( $sessao: UsuarioSessaoInput!,
                  $cartaoRotativo: ConcessaoCartaoRotativoInserirInput! )
        {
            concessaoCartaoRotativo_Inserir( sessao: $sessao,
                                             cartaoRotativo: $cartaoRotativo ) 
            {
                mensagem
                mensagemTipo
                sucesso
                objeto
            }
        }`,

    read_Concessao_CartaoRotativo: gql`
        query( $sessao: UsuarioSessaoInput!,
               $order: [NcCartaoRotativoSortInput!],
               $where: NcCartaoRotativoFilterInput,
               $first: Int )
        {
            concessaoCartaoRotativo( sessao: $sessao,
                                     order: $order,
                                     where: $where,
                                     first: $first )
            {
                nodes
                {
                    identificador
                    cartao
                    siteId
                    status
                    identificacao {
                        pessoaNome
                        pessoaTipo
                    }
                }   
            }
        }`,

    update_Concessao_CartaoRotativo: gql`
        mutation( $sessao: UsuarioSessaoInput!,
                  $cartaoRotativo: ConcessaoCartaoRotativoAlterarInput! )
        {
            concessaoCartaoRotativo_Alterar( sessao: $sessao,
                                             cartaoRotativo: $cartaoRotativo )
            {
                mensagem
                mensagemTipo
                sucesso
                objeto
            }
        }`,

    delete_Concessao_CartaoRotativo: gql`
        mutation( $id: Long!,
                  $sessao: UsuarioSessaoInput! )
        {
            concessaoCartaoRotativo_Excluir( identificador: $id,
                                             sessao: $sessao )
            {
                mensagem
                mensagemTipo
                sucesso
            }
        }`

}

