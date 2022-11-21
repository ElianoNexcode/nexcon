import { Injectable } from '@angular/core';
import { GenericGraphQL } from '../../../../../@core/api/generic-graphql';
import { ServidorSistemaSchema } from './servidor.schema';
import { ServidorSistema,ServidorData, Servidor, read_ServidorSistema, update_ServidorEmail} from '../../../../../@core/data/sistema-servidor';
import { of as ObservableOf } from 'rxjs'

interface checkStatus {
    utcDataAtual?: Number
     dtDataCkeck?: Date
     inativeTime?: Number
           status: any
}

@Injectable()
export class ServidorService extends ServidorData {

checkStatus: checkStatus = { 
    status: function() {
                let utcDataCheck = Date.parse(this.dtDataCkeck.toString());
                return ((this.utcDataAtual as number - utcDataCheck > 
                         this.inativeTime)? "inative": "ative");
                }
            }


    constructor(private graphQL: GenericGraphQL) {
        super();
    }

   getServidor(){
          const servidores: Servidor[] = [

            {
                "id": 0,
                "servidor": "E-MAIL",
                "alias": "Email",
                "descricao": "CONFIGURAÇÃO DE SERVIDOR DE E-MAIL"
            },

            {
                "id": 1,
                "servidor": "SMS",
                "alias": "Sms",
                "descricao": "CONFIGURAÇÃO DE SERVIDOR DE SMS"
            }]

            return ObservableOf(servidores);
    }

    readServidorSistema() {
        const variables = { ... this.graphQL.session };
        return this.graphQL.query<read_ServidorSistema>(ServidorSistemaSchema.read_Sistema_Servidor, variables);
    }

    updateServidorEmail(servidorEmail: ServidorSistema) {
        const variables = { servidorEmail: { ...servidorEmail}, ... this.graphQL.session }
        return this.graphQL.mutation<update_ServidorEmail>(ServidorSistemaSchema.update_Servidor_Email,variables);
    }

}

