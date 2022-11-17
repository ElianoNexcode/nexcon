import gql from 'graphql-tag'

export const SoftwareSistemaSchema = {

    read_Sistema_Software: gql`
        query( $sessao: UsuarioSessaoInput! )
        {
            sistemaSoftware( sessao: $sessao )
            {
                nodes 
                {
                    id
                    plataformaIP
                    plataformaPorta
                    plataformaExt
                    plataformaCheck
                    plataformaStart
                    plataformaVersao
                    plataformaObservacao

                    registryIP
                    registryPorta
                    registryCheck
                    registryStart
                    registryVersao
                    registryObservacao

                    notificationIP
                    notificationPorta1
                    notificationPorta2
                    notificationCheck
                    notificationStart
                    notificationVersao
                    notificationObservacao

                    utilityIP
                    utilityPorta
                    utilityCheck
                    utilityStart
                    utilityVersao
                    utilityObservacao
                    utilityStatus

                    utilBackupTipo
                    utilBackupDiretorio
                    utilBackupHora
                    utilBackupRetencao
                    utilBackupControle                    
                    

                    utilLimpezaTipo
                    utilLimpezaHora
                    utilLimpezaVisitaAgenda
                    utilLimpezaIdentificacao
                    utilLimpezaAlarme
                    utilLimpezaAcesso
                    utilLimpezaEmail
                    utilLimpezaLogOperador
                    utilLimpezaLogSistema

                    mobileIP
                    mobilePorta1
                    mobilePorta2
                    mobileStatus
                    mobileCheck
                    mobileStart
                    mobileVersao
                    mobileObservacao

                    integrationIP
                    integrationPorta
                    integrationLogin
                    integrationSenha
                    integrationStatus
                    integrationCheck
                    integrationStart
                    integrationVersao
                    integrationObservacao
                }
            }
        }`,

    update_Software_Plataforma: gql`
        mutation( $sessao: UsuarioSessaoInput!,
                  $plataforma: SistemaSoftwarePlataformaAlterarInput! )
        {
            sistemaSoftwarePlataforma_Alterar( sessao: $sessao,
                                               plataforma: $plataforma )
            {
                mensagem
                mensagemTipo
                objeto
                sucesso
            }
        }`,

    update_Software_Registry: gql`
        mutation( $sessao: UsuarioSessaoInput!,
                  $registry: SistemaSoftwareRegistryAlterarInput! )
        {
            sistemaSoftwareRegistry_Alterar( sessao: $sessao,
                                             registry: $registry )
            {
                mensagem
                mensagemTipo
                objeto
                sucesso
            }
        }`,

    update_Software_Notification: gql`
        mutation( $sessao: UsuarioSessaoInput!,
                  $notification: SistemaSoftwareNotificationAlterarInput! )                  
        {
            sistemaSoftwareNotification_Alterar( sessao: $sessao,
                                                 notification: $notification )
            {
                mensagem
                mensagemTipo
                objeto
                sucesso
            }
        }`,

    update_Software_Utility: gql`
        mutation( $sessao: UsuarioSessaoInput!,
                  $utility: SistemaSoftwareUtilityAlterarInput! )
        {
            sistemaSoftwareUtility_Alterar( sessao: $sessao,
                                            utility: $utility )
            {
                mensagem
                mensagemTipo
                objeto
                sucesso
            }
        }`,

    update_Software_Mobile: gql`
        mutation( $sessao: UsuarioSessaoInput!,
                  $mobile: SistemaSoftwareMobileAlterarInput! )
        {
            sistemaSoftwareMobile_Alterar( sessao: $sessao,
                                           mobile: $mobile )
            {
                mensagem
                mensagemTipo
                objeto
                sucesso
            }
        }`,

    update_Software_Backup: gql`
        mutation( $sessao: UsuarioSessaoInput!,
                  $backup: SistemaSoftwareBackupAlterarInput! )
        {
            sistemaSoftwareBackup_Alterar( sessao: $sessao,
                                           backup: $backup )
            {
                mensagem
                mensagemTipo
                objeto
                sucesso
            }
        }`,

    update_Software_Integration: gql`
        mutation( $sessao: UsuarioSessaoInput!,
                  $integration: SistemaSoftwareIntegrationAlterarInput! )
        {
            sistemaSoftwareIntegration_Alterar( sessao: $sessao,
                                                integration: $integration )
            {
                mensagem
                mensagemTipo
                objeto
                sucesso
            }
        }`,
}

export const LogSistemaSchema = {

    read_LogSistema: gql`
        query( $sessao: UsuarioSessaoInput!,
               $order: [NcLogSistemaSortInput!],
               $where: NcLogSistemaFilterInput )
        {
            logSistema( sessao: $sessao,
                        order: $order,
                        where: $where ) 
            {
                totalCount
                nodes 
                {
                    id
                    sistema
                    descricao
                    evento
                    dataHora
                },                
            }
        }`,
}

export const LogOperacaoSchema = {

    read_LogSistema: gql`
        query( $sessao: UsuarioSessaoInput!,
               $order: [NcLogOperacaoSortInput!],
               $where: NcLogOperacaoFilterInput )
        {
            logOperacao( sessao: $sessao,
                         order: $order,
                         where: $where )
            {
                totalCount
                nodes 
                {                
                    dataHora
                    descricao
                    id
                    evento
                    operacao
                    operadorNivelOperacao
                    operadorPessoaId
                    operadorPessoaNome
                    sistema
                },                
            }
        }`,
}


