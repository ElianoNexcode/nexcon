import gql from 'graphql-tag';

export const ElevadorDispositivoSchema = {

    create_ElevadorDispositivo: gql`
        mutation( $sessao: UsuarioSessaoInput!,
                  $elevador: DispositivoElevadorInserirInput! )
        {
            dispositivoElevador_Inserir( sessao: $sessao,
                                         elevador: $elevador )
            {
                mensagem
                mensagemTipo
                sucesso
                objeto
            }
        }`,

    read_ElevadorDispositivo: gql`
        query( $sessao: UsuarioSessaoInput!,
               $order: [NcElevadorSortInput!],
               $where: NcElevadorFilterInput,
               $first: Int )
        {        
            dispositivoElevador( sessao: $sessao,
                                 order: $order,
                                 where: $where,
                                 first: $first ) 
            {
                nodes
                {
                    id
                    nome
                    localizacao
                    observacao
                    andar01Nome
                    andar01Restrito  
                    andar02Nome
                    andar02Restrito
                    andar03Nome
                    andar03Restrito
                    andar04Nome
                    andar04Restrito
                    andar05Nome
                    andar05Restrito
                    andar06Nome
                    andar06Restrito
                    andar07Nome
                    andar07Restrito
                    andar08Nome
                    andar08Restrito
                    andar09Nome
                    andar09Restrito
                    andar10Nome
                    andar10Restrito
                    andar11Nome
                    andar11Restrito
                    andar12Nome
                    andar12Restrito
                    andar13Nome
                    andar13Restrito
                    andar14Nome
                    andar14Restrito
                    andar15Nome
                    andar15Restrito
                    andar16Nome
                    andar16Restrito
                    andar17Nome
                    andar17Restrito
                    andar18Nome
                    andar18Restrito
                    andar19Nome
                    andar19Restrito
                    andar20Nome
                    andar20Restrito
                    andar21Nome
                    andar21Restrito
                    andar22Nome
                    andar22Restrito
                    andar23Nome
                    andar23Restrito
                    andar24Nome
                    andar24Restrito
                    andar25Nome
                    andar25Restrito
                    andar26Nome
                    andar26Restrito
                    andar27Nome
                    andar27Restrito
                    andar28Nome
                    andar28Restrito
                    andar29Nome
                    andar29Restrito
                    andar30Nome
                    andar30Restrito
                    andar31Nome
                    andar31Restrito
                    andar32Nome
                    andar32Restrito
                    andar33Nome
                    andar33Restrito
                    andar34Nome
                    andar34Restrito
                    andar35Nome
                    andar35Restrito
                    andar36Nome
                    andar36Restrito
                    andar37Nome
                    andar37Restrito
                    andar38Nome
                    andar38Restrito
                    andar39Nome
                    andar39Restrito
                    andar40Nome
                    andar40Restrito
                    andar41Nome
                    andar41Restrito
                    andar42Nome
                    andar42Restrito
                    andar43Nome
                    andar43Restrito
                    andar44Nome
                    andar44Restrito
                    andar45Nome
                    andar45Restrito
                    andar46Nome
                    andar46Restrito
                    andar47Nome
                    andar47Restrito
                    andar48Nome
                    andar48Restrito
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

    update_ElevadorDispositivo: gql`
        mutation( $sessao: UsuarioSessaoInput!,
                  $elevador: DispositivoElevadorAlterarInput! )
        {
            dispositivoElevador_Alterar( sessao: $sessao,
                                         elevador: $elevador )
            {
                mensagem
                mensagemTipo
                sucesso
                objeto
            }
        }`,

    delete_ElevadorDispositivo: gql`
        mutation( $id: Int!,
                  $sessao: UsuarioSessaoInput! )
        {
            dispositivoElevador_Excluir( id: $id,
                                         sessao: $sessao )
            {
                mensagem
                mensagemTipo
                sucesso
            }
        }`
}