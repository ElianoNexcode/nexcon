import gql from 'graphql-tag'

export const AmbienteSistemaSchema = {

    read_Sistema_Ambiente: gql`
        query( $sessao: UsuarioSessaoInput! )
        {
            sistemaConfiguracao( sessao: $sessao )
            {
                nodes 
                {
                    id
                    interfacePadrao
                    interfaceConfiguracao
                    interfaceImagem
                    loginDigitos
                    loginSenhaDigitos
                    loginSenhaCaracter
                    loginSenhaRenovacao
                    loginSenhaExpiracao
                    pessoaComplemento1
                    pessoaComplemento2
                    pessoaComplemento3
                    pessoaComplemento4
                    softwareLicenca
                    softwareLicencaNumero
                    softwareLicencaRegistro
                    softwareLicencaVersao
                    softwareLicencaEdicao
                    softwareLicencaVolume
                    softwareLicencaRelease
                    solucaoEspecifica
                    solucaoIntegrada
                    imagemDiretorio
                    imagemDefinicao
                    biometriaDigital
                    biometriaFacial
                    qrcodeFormato
                    qrcodeDistincao
                    acessoSenhaControle
                    acessoSenhaFormato
                    acessoPanicoControle
                }
            }
        }`,

    update_Ambiente_Interface: gql`
        mutation( $sessao: UsuarioSessaoInput!,
                  $ambienteInterface: SistemaAmbienteInterfaceAlterarInput! )
        {            
            sistemaAmbienteInterface_Alterar( sessao: $sessao,
                                              ambienteInterface: $ambienteInterface )
            {
                mensagem
                mensagemTipo
                sucesso
                objeto
            } 
        }`,

    update_Ambiente_Login: gql`
        mutation( $sessao: UsuarioSessaoInput!,
                  $login: SistemaAmbienteLoginAlterarInput! )
        {            
            sistemaAmbienteLogin_Alterar( sessao: $sessao,
                                          login: $login )
            {
                mensagem
                mensagemTipo
                sucesso
                objeto
            } 
        }`,

    update_Ambiente_Complemento: gql`
        mutation( $sessao: UsuarioSessaoInput!,
                  $complemento: SistemaAmbienteComplementoAlterarInput! )
        {
            sistemaAmbienteComplemento_Alterar( sessao: $sessao,
                                                complemento: $complemento )
            {
                mensagem
                mensagemTipo
                sucesso
                objeto
            } 
        }`,

    update_Ambiente_Integracao: gql`
        mutation( $sessao: UsuarioSessaoInput!,
                  $integracao: SistemaAmbienteIntegracaoAlterarInput! )
        {            
            sistemaAmbienteIntegracao_Alterar( sessao: $sessao,
                                               integracao: $integracao )
            {
                mensagem
                mensagemTipo
                sucesso
                objeto
            }
        }`,

    update_Ambiente_Imagem: gql`
        mutation( $sessao: UsuarioSessaoInput!,
                  $imagem: SistemaAmbienteImagemAlterarInput! )
        {
            sistemaAmbienteImagem_Alterar( sessao: $sessao,
                                           imagem: $imagem )
            {
                mensagem
                mensagemTipo
                sucesso 
                objeto 
            }
        }`,
  
    update_Ambiente_Identificador: gql`
        mutation( $sessao: UsuarioSessaoInput!,
                  $identificador: SistemaAmbienteIdentificadorAlterarInput! )
        {
            sistemaAmbienteIdentificador_Alterar( sessao: $sessao,
                                                  identificador: $identificador )
            {   
                mensagem
                mensagemTipo
                sucesso 
                objeto       
            }
        }`,

}