import gql from 'graphql-tag';

export const ConcentradorDispositivoSchema = {

    create_ConcentradorDispositivo: gql`
        mutation( $sessao: UsuarioSessaoInput!,
                  $concentrador: DispositivoConcentradorInserirInput! ) 
        {
            dispositivoConcentrador_Inserir( sessao: $sessao,
                                             concentrador: $concentrador )
            {
                mensagem
                mensagemTipo
                sucesso
                objeto
            }
        }`,

    read_ConcentradorDispositivo: gql`
        query( $sessao: UsuarioSessaoInput!,
               $order: [NcConcentradorSortInput!],
               $where: NcConcentradorFilterInput
               $first: Int )
        {
            dispositivoConcentrador( sessao: $sessao,
                                     order: $order,
                                     where: $where
                                     first: $first )
            {
                nodes
                {
                    id
                    siteId
                    nome
                    localizacao
                    redeIP
                    versao
                    redePorta1
                    redePorta2
                    observacao
                    start
                    check
                    status
                    site
                    {
                        id
                        nome
                    }
                }                
            }
        }`,

    update_ConcentradorDispositivo: gql`
        mutation( $sessao: UsuarioSessaoInput!,
                  $concentrador: DispositivoConcentradorAlterarInput! )
        {
            dispositivoConcentrador_Alterar( sessao: $sessao,
                                             concentrador: $concentrador )
            {
                mensagem
                mensagemTipo
                sucesso
                objeto
            }
        }`,

    delete_ConcentradorDispositivo: gql`
        mutation( $id: Int!,
                  $sessao: UsuarioSessaoInput! ) {
            dispositivoConcentrador_Excluir( id: $id,
                                             sessao: $sessao) 
            {
                mensagem
                mensagemTipo
                sucesso
            }
        }`
}