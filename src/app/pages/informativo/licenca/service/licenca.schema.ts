import gql from "graphql-tag";

export const InformativoSistemaLicencaSchema = {
    read_InformativoSistemaLicenca: gql`
    query($sessao: UsuarioSessaoInput!)
    {
        sistemaLicenca(sessao: $sessao)
        {
                plataforma
                licenca
                licenciado            
                programacao
                controle
                nexcon
                nexnote
                nexcess
                nexiun
                nexview
                nextot
                nexcodeAccess
                nexcodeSurveillance
                nexcodeIntegration
                nexcodeElevator
                versao
                registro
                virtualizacao
                atualizacao
                observacao            
        }
    }`
}