import gql from 'graphql-tag';

export const ControladoraDispositivoSchema = {

    create_ControladoraDispositivo: gql`
        mutation( $sessao: UsuarioSessaoInput!,
                  $controladora: DispositivoControladoraInserirInput! ) 
        {
            dispositivoControladora_Inserir( sessao: $sessao,
                                             controladora: $controladora )
            {
                mensagem
                mensagemTipo
                sucesso
                objeto
            }
        }`,

    read_ControladoraDispositivo: gql`
        query( $sessao: UsuarioSessaoInput!,
               $order: [NcControladoraSortInput!],
               $where: NcControladoraFilterInput
               $first:Int )
        {        
            dispositivoControladora( sessao: $sessao,
                                     order: $order,
                                     where: $where
                                     first: $first )
            {
                nodes
                {
                    id
                    nome
                    tipo
                    localizacao
                    redeIP
                    redeMascara
                    redeGateway
                    login
                    senha
                    observacao
                    status
                    bloqueioTipo
                    bloqueioOrientacao
                    validacao
                    biometria
                    autenticacao
                    displayIdioma
                    displayMsg
                    rele

                    controladorasLeitor {
                        botaoCr
                        evento
                        buzzer
                        cofre
                        rele
                        programacaoAtuacao
                        programacaoInicial
                        programacaoFinal
                        intertravamento
                        releitura
                        protocolo
                        controle
                        validacaoExtra
                        terminalId
                        dipositivoTipo
                        dipositivoId
                
                      }
                }            
            }
        }`,

    update_ControladoraDispositivo: gql`
        mutation( $sessao: UsuarioSessaoInput!,
                  $controladora: DispositivoControladoraAlterarInput! )
        {
            dispositivoControladora_Alterar( sessao: $sessao,
                                             controladora: $controladora )
            {
                mensagem
                mensagemTipo
                sucesso
                objeto
            }
        }`,

    delete_ControladoraDispositivo: gql`
        mutation( $id: Int!,
                  $sessao: UsuarioSessaoInput! )
        {
            dispositivoControladora_Excluir( id: $id,
                                             sessao: $sessao )
            {
                mensagem
                mensagemTipo
                sucesso
            }
        }`
}