import { Injectable } from '@angular/core';

import { GenericGraphQL } from 'src/app/@core/api/generic-graphql';
import { AmbienteSistema,
         AmbienteData, 
         read_AmbienteSistema,
         Ambiente,
         update_AmbienteInterface,
         update_AmbienteLogin,
         update_AmbienteIntegracao,
         update_AmbienteComplemento,
         update_AmbienteImagem,
         update_AmbienteIdentificador} from 'src/app/@core/data/sistema-ambiente';
import { AmbienteSistemaSchema } from './ambiente.schema';
import { Observable, of as ObservableOf } from 'rxjs'

interface checkStatus {
    utcDataAtual?: Number
     dtDataCkeck?: Date
     inativeTime?: Number
           status: any
}

@Injectable()
export class AmbienteService extends AmbienteData {

    checkStatus: checkStatus = { 
        status: function() {
                    let utcDataCheck = Date.parse(this.dtDataCkeck.toString());
                    return ((this.utcDataAtual - utcDataCheck > 
                             this.inativeTime)? "inative": "ative");
                    }
                }

    constructor(private graphQL: GenericGraphQL) {
        super();
    }

    getAmbiente() {
        const ambiente: Ambiente[] = [
            {
                "id": 0,
                "parte": "INTERFACE",
                "alias": "Interface",
                "descricao": "CONFIGURAÇÃO DE ESTILO E LOGOTIPO"
            },
            {
                "id": 1,
                "parte": "LOGIN",
                "alias": "Login",
                "descricao": "CONFIGURAÇÃO DO CONTROLE DE ACESSO AO SISTEMA"
            },
            {
                "id": 2,
                "parte": "IMAGEM",
                "alias": "Imagem",
                "descricao": "CONFIGURAÇÃO DE ARMAZENAMENTO DE IMAGENS"
            },
            {
                "id": 3,
                "parte": "IDENTIFICADOR",
                "alias": "Identificador",
                "descricao": "CONFIGURAÇÃO DOS TIPOS DE IDENTIFICADORES"
            },
            {
                "id": 4,
                "parte": "CAMPOS COMPLEMENTARES",
                "alias": "Campos Complementares",
                "descricao": "CONFIGURAÇÃO DOS CAMPOS COMPLEMENTARES"
            },
            
            {
                "id": 5,
                "parte": "INTEGRAÇÃO E CUSTOMIZAÇÃO",
                "alias": "Integração e Customização",
                "descricao": "CONFIGURAÇÃO DE INTEGRAÇÃO E CUSTOMIZAÇÃO"
            }
        ]
        
        return ObservableOf(ambiente);
    }

    readAmbienteSistema() {
        const variables = { ... this.graphQL.session };
        return this.graphQL.query<read_AmbienteSistema>(AmbienteSistemaSchema.read_Sistema_Ambiente, variables);
    }
    
    updateAmbienteInterface(ambienteInterface: AmbienteSistema) {
        const variables = { ambienteInterface: { ... ambienteInterface}, ... this.graphQL.session };
        return this.graphQL.mutation<update_AmbienteInterface>(AmbienteSistemaSchema.update_Ambiente_Interface, variables);
    }

    updateAmbienteLogin(login: AmbienteSistema) {
        const variables = { login: { ... login}, ... this.graphQL.session };
        return this.graphQL.mutation<update_AmbienteLogin>(AmbienteSistemaSchema.update_Ambiente_Login, variables);
    }
    updateAmbienteImagem(imagem: AmbienteSistema) {
        const variables = { imagem: { ...imagem}, ... this.graphQL.session };
        return this.graphQL.mutation<update_AmbienteImagem>(AmbienteSistemaSchema.update_Ambiente_Imagem, variables);
    }    
    updateAmbienteIdentificador(identificador: AmbienteSistema) {
       const variables = { identificador: { ...identificador}, ... this.graphQL.session };
       return this.graphQL.mutation<update_AmbienteIdentificador>(AmbienteSistemaSchema.update_Ambiente_Identificador, variables);
    }

    updateAmbienteComplemento(complemento: AmbienteSistema) {
        const variables = { complemento: { ...complemento}, ... this.graphQL.session };
        return this.graphQL.mutation<update_AmbienteComplemento>(AmbienteSistemaSchema.update_Ambiente_Complemento, variables);
    }

    updateAmbienteIntegracao(integracao: AmbienteSistema) {
        const variables = { integracao: { ... integracao}, ... this.graphQL.session };
        return this.graphQL.mutation<update_AmbienteIntegracao>(AmbienteSistemaSchema.update_Ambiente_Integracao, variables);
    }


  
        
    

}