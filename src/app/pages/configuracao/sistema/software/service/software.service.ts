import { Injectable } from '@angular/core';

import { GenericGraphQL } from 'src/app/@core/api/generic-graphql';
import { Software,
         SoftwareData, 
         SoftwareSistema,
         read_SoftwareSistema, 
         update_SoftwarePlataforma,
         update_SoftwareRegistry, 
         update_SoftwareNotification,
         update_SoftwareUtility,
         update_SoftwareMobile,
         update_SoftwareIntegration, 
         LogSistemaSort,
         LogSistemaFilter,
         read_LogSistema,
         LogOperacaoFilter,
         LogOperacaoSort,
         read_LogOperacao} from 'src/app/@core/data/sistema-software';

import { Modulos } from 'src/app/@core/enum';

import { LogSistemaSchema, SoftwareSistemaSchema, LogOperacaoSchema } from './software.schema';
import { of as ObservableOf } from 'rxjs';

interface checkStatus {
    utcDataAtual?: Number
    dtDataCkeck?: Date
    inativeTime?: Number
    failTime?: Number
    status: any
}

@Injectable()
export class SoftwareService extends SoftwareData {

    software: Software[];

    checkStatus: checkStatus = { 
        status: function(status: number, observacao?: string) {
            let utcDataCheck = Date.parse(this.dtDataCkeck?.toString());

            if(status == 0) {
                return "disable";        
            } else if ((observacao && observacao.length > 0)) {
                return "fail"
            } else if ((this.utcDataAtual || 0 - utcDataCheck) >  this.inativeTime) {
                return "inative";
            } else {
                return "active"
            }
        }
    }

    constructor( private graphQL: GenericGraphQL ) {
        super();

        this.getSoftware();
    }

    getSoftware() {
        this.software = [
            {
                "id": 1,
                "software": "NEXCODE CONTROLS",
                "alias": "Controls",
                "relevancia": "ESSENCIAL",
            },
            {
                "id": 2,
                "software": "NEXCODE REGISTRY",
                "alias": "Registry",
                "relevancia": "ESSENCIAL"
            },
            {
                "id": 3,
                "software": "NEXCODE NOTIFICATION",
                "alias": "Notification",
                "relevancia": "ESSENCIAL"
            },
            {
                "id": 4,
                "software": "NEXCODE UTILITY",
                "alias": "Utility",
                "relevancia": "ESSENCIAL"
            }, 
            {
                "id": 5,
                "software": "NEXCODE MOBILE",
                "alias": "Mobile",
                "relevancia": "COMPLEMENTAR"
            },                       
            {
                "id": 6,
                "software": "NEXCODE INTEGRATION",
                "alias": "Integration",
                "relevancia": "COMPLEMENTAR"
            }
        ]
    }

    readSoftware(nodes: SoftwareSistema) {

        this.checkStatus.utcDataAtual = Date.now();
        this.checkStatus.inativeTime = 35000;     // Tempo de inatividade do serviço (ms) 
        this.checkStatus.failTime = 15000;

        this.software.forEach(soft => {
            soft.softwareId = nodes.id;
            switch (soft.id) {
                case Modulos.controls:
                    this.checkStatus.dtDataCkeck = nodes.plataformaCheck;
                
                    soft.plataformaIP = nodes.plataformaIP;
                    soft.plataformaExt = nodes.plataformaExt;
                    soft.plataformaPorta = nodes.plataformaPorta;

                    soft.versao = nodes.plataformaVersao;
                    soft.start = nodes.plataformaStart;
                    soft.estado = 1;
                    soft.observacao = nodes.plataformaObservacao;
                    soft.status = this.checkStatus.status(soft.estado, soft.observacao);
                    break;

                case Modulos.registry:
                    this.checkStatus.dtDataCkeck = nodes.registryCheck;

                    soft.registryIP = nodes.registryIP;
                    soft.registryPorta = nodes.registryPorta ; 

                    soft.versao = nodes.registryVersao;
                    soft.start = nodes.registryStart;
                    soft.estado = 1;
                    soft.observacao = nodes.registryObservacao;
                    soft.status = this.checkStatus.status(soft.estado, soft.observacao);
                    break;

                case Modulos.notification:
                    this.checkStatus.dtDataCkeck = nodes.notificationCheck;

                    soft.notificationIP = nodes.notificationIP;
                    soft.notificationPorta1 = nodes.notificationPorta1;
                    soft.notificationPorta2 = nodes.notificationPorta2;

                    soft.versao = nodes.notificationVersao;
                    soft.start = nodes.notificationStart;
                    soft.estado = 1;
                    soft.observacao = nodes.notificationObservacao;
                    soft.status = this.checkStatus.status(soft.estado, soft.observacao);
                    break;

                case Modulos.utility:
                    this.checkStatus.dtDataCkeck = nodes.utilityCheck;

                    soft.utilityIP = nodes.utilityIP;
                    soft.utilityPorta = nodes.utilityPorta;

                    soft.utilBackupTipo = nodes.utilBackupTipo;
                    soft.utilBackupHora = nodes.utilBackupHora;
                    soft.utilBackupRetencao = nodes.utilBackupRetencao;
                    soft.utilBackupDiretorio = nodes.utilBackupDiretorio;

                    soft.utilLimpezaTipo = nodes.utilLimpezaTipo;
                    soft.utilLimpezaHora = nodes.utilLimpezaHora;
                    soft.utilLimpezaVisitaAgenda = nodes.utilLimpezaVisitaAgenda;
                    soft.utilLimpezaIdentificacao = nodes.utilLimpezaIdentificacao;
                    soft.utilLimpezaAlarme = nodes.utilLimpezaAlarme;
                    soft.utilLimpezaAcesso = nodes.utilLimpezaAcesso;
                    soft.utilLimpezaEmail = nodes.utilLimpezaEmail;
                    soft.utilLimpezaLogOperador = nodes.utilLimpezaLogOperador;
                    soft.utilLimpezaLogSistema = nodes.utilLimpezaLogSistema;

                    soft.versao = nodes.utilityVersao;
                    soft.start = nodes.utilityStart;
                    soft.estado = (nodes.utilityStatus? 1: 0);
                    soft.observacao = nodes.utilityObservacao;
                    soft.status = this.checkStatus.status(soft.estado, soft.observacao);
                    break;

                case Modulos.mobile:
                    this.checkStatus.dtDataCkeck = nodes.mobileCheck;

                    soft.mobileIP = nodes.mobileIP;
                    soft.mobilePorta1 = nodes.mobilePorta1;
                    soft.mobilePorta2 = nodes.mobilePorta2;

                    soft.versao = nodes.mobileVersao;
                    soft.start = nodes.mobileStart;
                    soft.estado = (nodes.mobileStatus? 1: 0);
                    soft.observacao = nodes.mobileObservacao;
                    soft.status = this.checkStatus.status(soft.estado, soft.observacao);
                    break;

                case Modulos.integration:
                    this.checkStatus.dtDataCkeck = nodes.integrationCheck;

                    soft.integrationIP = nodes.integrationIP;
                    soft.integrationPorta = nodes.integrationPorta;
                    soft.integrationLogin = nodes.integrationLogin;
                    soft.integrationSenha = nodes.integrationSenha;

                    soft.versao = nodes.integrationVersao;
                    soft.start = nodes.integrationStart;
                    soft.estado = (nodes.integrationStatus? 1: 0);
                    soft.observacao = nodes.integrationObservacao;
                    soft.status = this.checkStatus.status(soft.estado, soft.observacao);
                    break;
            }
        });               

        return ObservableOf(this.software);
    }

    readSoftwareSistema() {
        const variables = { ... this.graphQL.session };
        return this.graphQL.query<read_SoftwareSistema>(SoftwareSistemaSchema.read_Sistema_Software, variables);
    }

    readLogSistema(order_by?: LogSistemaSort, where?: LogSistemaFilter) {
        const variables = { ... this.graphQL.session, ... {order: order_by}, ... {where: where} };
        return this.graphQL.query<read_LogSistema>(LogSistemaSchema.read_LogSistema, variables);
    }

    readLogOperacao(order_by?: LogOperacaoSort, where?: LogOperacaoFilter) {
        const variables = { ... this.graphQL.session, ... {order: order_by}, ... {where: where} };
        return this.graphQL.query<read_LogOperacao>(LogOperacaoSchema.read_LogSistema, variables);
    }

    updateSoftwarePlataforma(software: SoftwareSistema) {
        const variables = { plataforma: { ... software}, ... this.graphQL.session };
        return this.graphQL.mutation<update_SoftwarePlataforma>(SoftwareSistemaSchema.update_Software_Plataforma, variables);
    }

    updateSoftwareRegistry(software: SoftwareSistema) {
        const variables = { registry: { ... software}, ... this.graphQL.session };
        return this.graphQL.mutation<update_SoftwareRegistry>(SoftwareSistemaSchema.update_Software_Registry, variables);
    }

    updateSoftwareNotification(software: SoftwareSistema) {
        const variables = { notification: { ... software}, ... this.graphQL.session };
        return this.graphQL.mutation<update_SoftwareNotification>(SoftwareSistemaSchema.update_Software_Notification, variables);
    }

    updateSoftwareUtility(software: SoftwareSistema) {
        const variables = { utility: { ... software}, ... this.graphQL.session };
        return this.graphQL.mutation<update_SoftwareUtility>(SoftwareSistemaSchema.update_Software_Utility, variables);
    }

    updateSoftwareMobile(software: SoftwareSistema) {
        const variables = { mobile: { ... software}, ... this.graphQL.session };
        return this.graphQL.mutation<update_SoftwareMobile>(SoftwareSistemaSchema.update_Software_Mobile, variables);
    }

    updateSoftwareIntegration(software: SoftwareSistema) {
        const variables = { integration: { ... software}, ... this.graphQL.session };
        return this.graphQL.mutation<update_SoftwareIntegration>(SoftwareSistemaSchema.update_Software_Integration, variables);
    }

}