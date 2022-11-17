import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { GenericGraphQL } from "src/app/@core/api/generic-graphql";
import { ConfiguracaoData,
         ConfiguracaoNexmove, 
         read_ConfiguracaoNexmove, 
         update_ConfiguracaoNexmove } from "src/app/@core/data/modulo-nexmove-configuracao";
import { ConfiguracaoNexmoveSchema } from "./configuracao.schema";




@Injectable()
export class ConfiguracaoService extends ConfiguracaoData {

    constructor(private graphQL: GenericGraphQL) {
        super();
    }


    readConfiguracaoNexmove(){
        const variables = { ... this.graphQL.session };
        return this.graphQL.query<read_ConfiguracaoNexmove>(ConfiguracaoNexmoveSchema.read_ConfiguracaoNexmove, variables);
    }


    updateConfiguracaoNexmove(nexmove: ConfiguracaoNexmove){
        const variables = { nexmove: { ...nexmove}, ... this.graphQL.session };
        return this.graphQL.mutation<update_ConfiguracaoNexmove>(ConfiguracaoNexmoveSchema.update_ConfiguracaoNexmove, variables);
    }

}

