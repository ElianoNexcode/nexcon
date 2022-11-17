import gql from 'graphql-tag';

export const TerminalDispositivoSchema = {

    create_TerminalDispositivo: gql`
        mutation( $sessao: UsuarioSessaoInput!,
                  $terminal: DispositivoTerminalInserirInput! ) 
        {
            dispositivoTerminal_Inserir( sessao: $sessao,
                                         terminal: $terminal )
            {
                mensagem
                mensagemTipo
                sucesso
                objeto
            }
        }`,

    read_TerminalDispositivo: gql`
        query( $sessao: UsuarioSessaoInput!,
               $order: [NcTerminalSortInput!],
               $where: NcTerminalFilterInput,
               $first: Int )
        {        
            dispositivoTerminal( sessao: $sessao,
                                 order: $order,
                                 where: $where,
                                 first: $first )
            {
                nodes
                {
                    id
                    siteId
                    site
                    {
                        id
                        nome
                    }
                    nome
                    tipo
                    localizacao
                    redeIP
                    redePorta
                    login
                    senha
                    observacao
                    status
                }     
            }
        }`,

    update_TerminalDispositivo: gql`
        mutation( $sessao: UsuarioSessaoInput!,
                  $terminal: DispositivoTerminalAlterarInput! )
        {
            dispositivoTerminal_Alterar( sessao: $sessao,
                                         terminal: $terminal) 
            {
                mensagem
                mensagemTipo
                sucesso
                objeto
            }
        }`,

    delete_TerminalDispositivo: gql`
        mutation( $id: Int!,
                  $sessao: UsuarioSessaoInput! ) {
            dispositivoTerminal_Excluir( id: $id,
                                         sessao: $sessao)
            {
                mensagem
                mensagemTipo
                sucesso
            }
        }`
}