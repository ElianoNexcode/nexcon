import gql from 'graphql-tag';

export const CameraDispositivoSchema = {

    create_CameraDispositivo: gql`
        mutation( $sessao: UsuarioSessaoInput!,
                  $camera: DispositivoCameraInserirInput! )
        {
            dispositivoCamera_Inserir( sessao: $sessao,
                                       camera: $camera )
            {
                mensagem
                mensagemTipo
                sucesso
                objeto
            }
        }`,

    read_CameraDispositivo: gql`
        query( $sessao: UsuarioSessaoInput!,
               $order: [NcCameraSortInput!],
               $where: NcCameraFilterInput
               $first: Int )
        {
            dispositivoCamera ( sessao: $sessao,
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
                    redePorta
                    login
                    senha
                    integracao
                    url
                    fps
                    observacao
                    status
                }      
            }
        }`,

    update_CameraDispositivo: gql`
        mutation( $sessao: UsuarioSessaoInput!,
                  $camera: DispositivoCameraAlterarInput! )
        {
            dispositivoCamera_Alterar ( sessao: $sessao,
                                        camera: $camera )
            {
                mensagem
                mensagemTipo
                sucesso
                objeto
            }
        }`,

    delete_CameraDispositivo: gql`
        mutation( $id: Int!,
                  $sessao: UsuarioSessaoInput! )
        {
            dispositivoCamera_Excluir( id: $id,
                                       sessao: $sessao )
            {
                mensagem
                mensagemTipo
                sucesso
            }
        }`
}
