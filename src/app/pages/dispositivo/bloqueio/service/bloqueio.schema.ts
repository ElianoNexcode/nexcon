import gql from 'graphql-tag';

export const BloqueioDispositivoSchema = {

    create_BloqueioDispositivo: gql`
        mutation( $sessao: UsuarioSessaoInput!,
                  $bloqueio: DispositivoBloqueioInserirInput! )
        {
            dispositivoBloqueio_Inserir( sessao: $sessao,
                                         bloqueio: $bloqueio )
            {
                mensagem
                mensagemTipo
                sucesso
                objeto
            }
        }`,

    read_BloqueioDispositivo: gql`
        query( $sessao: UsuarioSessaoInput!,
               $order: [NcBloqueioSortInput!],
               $where: NcBloqueioFilterInput
               $first: Int )
        {        
            dispositivoBloqueio( sessao: $sessao,
                                 order: $order,
                                 where: $where,
                                 first: $first ) 
            {            
                nodes
                {
                    id
                    localizacao
                    nome
                    transito
                    areaId
                    elevadorTerminalNumero
                    elevadorTerminalSigla
                    observacao
                    cameras {
                    cameraId  
                      camera {
                        nome
                        id
                      }
                    }
                }  
            }
        }`,

    update_BloqueioDispositivo: gql`
        mutation( $sessao: UsuarioSessaoInput!,
                  $bloqueio: DispositivoBloqueioAlterarInput! )
        {
            dispositivoBloqueio_Alterar( sessao: $sessao,
                                         bloqueio: $bloqueio )
            {
                mensagem
                mensagemTipo
                sucesso
                objeto
            }
        }`,

    delete_BloqueioDispositivo: gql`
        mutation( $id: Int!,
                  $sessao: UsuarioSessaoInput! )
        {
            dispositivoBloqueio_Excluir( id: $id,
                                         sessao: $sessao )
            {
                mensagem
                mensagemTipo
                sucesso
            }
        }`
};
