import gql from 'graphql-tag';

export const DocumentoGrupoSchema = {

    create_DocumentoGrupo: gql`
        mutation( $sessao: UsuarioSessaoInput!,
                  $documentoGrupo: GrupoDocumentoInserirInput! )
        {
            grupoDocumento_Inserir( sessao: $sessao,
                                    documentoGrupo: $documentoGrupo )
            {
                mensagem
                mensagemTipo
                sucesso
                objeto  
            }            
        }`,

    read_DocumentoGrupo: gql`
        query( $sessao: UsuarioSessaoInput!,
               $order: [NcDocumentoGrupoSortInput!],
               $where: NcDocumentoGrupoFilterInput,
               $first: Int )
        {
            grupoDocumento( sessao: $sessao,
                            order: $order,
                            where: $where,
                            first: $first ) 
            {
                nodes 
                {
                    id
                    ordem
                    tipo
                    interno
                    prestador
                    visitante
                    nexiun
                    nexflow
                    nexmove
                    nextot
                }
            }
        }`,

    update_DocumentoGrupo: gql`
        mutation( $sessao: UsuarioSessaoInput!,
                  $documentoGrupo: GrupoDocumentoAlterarInput! )
        {
            grupoDocumento_Alterar( sessao: $sessao,
                                    documentoGrupo: $documentoGrupo )
            {
                mensagem
                mensagemTipo
                sucesso
                objeto
            }
        }`,

    delete_DocumentoGrupo: gql`
        mutation( $id: Int!,
                  $sessao: UsuarioSessaoInput! )
        {
            grupoDocumento_Excluir( id: $id,
                                    sessao: $sessao )
            {
                mensagem
                mensagemTipo
                sucesso
            } 
        }`,

    count_DocumentoGrupo: gql`
        query( $sessao: UsuarioSessaoInput!,
               $order: [NcDocumentoGrupoSortInput!],
               $where: NcDocumentoGrupoFilterInput )
        {
            grupoDocumento ( sessao: $sessao,
                             order: $order,
                             where: $where )
            {
                totalCount 
            }
        }`

}
