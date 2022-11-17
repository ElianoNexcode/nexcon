import gql from 'graphql-tag';

export const IdentificacaoGrupoSchema = {
        
    create_Grupo_Identificacao: gql`
        mutation( $sessao: UsuarioSessaoInput!,
                  $identificacaoMotivo: GrupoIdentificacaoMotivoInserirInput! )
        {            
            grupoIdentificacao_Inserir( sessao: $sessao,
                                        identificacaoMotivo: $identificacaoMotivo )
            {
                mensagem
                mensagemTipo
                sucesso
                objeto
            }
        }`,

    read_Grupo_Identificacao: gql`
        query( $sessao: UsuarioSessaoInput!,
               $order: [NcIdentificacaoMotivoSortInput!],
               $where: NcIdentificacaoMotivoFilterInput,
               $first: Int )
        {            
            grupoIdentificacaoMotivo( sessao: $sessao,
                                      order: $order,
                                      where: $where,
                                      first: $first ) 
            {
                nodes 
                {
                    id
                    motivo
                    tempoPrimeiroAcesso
                    tempoPermanencia
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

    update_Grupo_Identificacao: gql`
        mutation( $sessao: UsuarioSessaoInput!,
                  $identificacaoMotivo: GrupoIdentificacaoMotivoAlterarInput! )
        {            
            grupoIdentificacao_Alterar( sessao: $sessao,
                                        identificacaoMotivo: $identificacaoMotivo )
            {
                mensagem
                mensagemTipo
                sucesso
                objeto
            }
        }`,

    delete_Grupo_Identificacao: gql`
        mutation( $id: Int!,
                  $sessao: UsuarioSessaoInput! )
        {            
            grupoIdentificacao_Excluir( id: $id,
                                        sessao: $sessao )
            {
                mensagem
                mensagemTipo
                sucesso
            }  
        }`

}
