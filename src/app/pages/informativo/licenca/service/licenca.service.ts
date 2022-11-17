import { Injectable } from '@angular/core';
import { GenericGraphQL } from 'src/app/@core/api/generic-graphql';
import { InformativoSistemaLicencaData, read_InformativoSistemaLicenca } from 'src/app/@core/data/informativo-sistema-licenca';
import { InformativoSistemaLicencaSchema } from './licenca.schema';

@Injectable()
export class InformativoSistemaLicencaService extends InformativoSistemaLicencaData {
    constructor(private graphQL: GenericGraphQL){
        super()

    }

    readInformativoSistemaLicenca() {
        const variables = {... this.graphQL.session };
        return this.graphQL.query<read_InformativoSistemaLicenca>(InformativoSistemaLicencaSchema.read_InformativoSistemaLicenca, variables)
    }
}