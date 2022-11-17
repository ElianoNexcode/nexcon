import { Injectable } from '@angular/core';
import { GenericGraphQL } from 'src/app/@core/api/generic-graphql';
import { BehaviorSubject, of as ObservableOf, Subscription, Unsubscribable } from 'rxjs';

import { FaixaHorariaConcessaoSchema } from './faixa-horaria.schema';
import { FaixaHorariaConcessaoData, 
         FaixaHorariaConcessao,
         FaixaHorariaSort,
         FaixaHorariaFilter,
         create_FaixaHorariaConcessao, 
         read_FaixaHorariaConcessao, 
         update_FaixaHorariaConcessao, 
         delete_FaixaHorariaConcessao} from 'src/app/@core/data/concessao-faixa-horaria';

export interface FaixaHorariaModal {
    id: number
    nome: string
    faixaHoraria: string
    diasSemana: Array<{text: string, value: boolean}>
};

@Injectable()
export class FaixaHorariaConcessaoService extends FaixaHorariaConcessaoData {


    faixaHorarioSubscription: BehaviorSubject<FaixaHorariaModal[]> = new BehaviorSubject([]) ;

    constructor(private graphQL: GenericGraphQL) {
        super();
    }

    createFaixaHorariaConcessao(faixaHoraria: FaixaHorariaConcessao) {
        const variables = { faixaHoraria: { ... faixaHoraria }, ... this.graphQL.session};
        return this.graphQL.mutation<create_FaixaHorariaConcessao>(FaixaHorariaConcessaoSchema.create_FaixaHorariaConcessao, variables)
    }

    read_FaixaHorariaModal(): void{
        const faixaHorariaModal: FaixaHorariaModal[] = []

        this.readFaixaHorariaConcessaos()
            .subscribe(( { concessaoFaixaHoraria }: read_FaixaHorariaConcessao) =>{
              const nodes: FaixaHorariaConcessao[] = concessaoFaixaHoraria.nodes;
       
                nodes.forEach(faixa => {
                    faixaHorariaModal.push({"id": faixa.id,
                                            "nome": faixa.nome,
                                            "faixaHoraria": faixa.horaInicial + " - " + faixa.horaFinal,
                                            "diasSemana": [{text: 'S', value: faixa.segunda},
                                                           {text: 'T', value: faixa.terca},
                                                           {text: 'Q', value: faixa.quarta},
                                                           {text: 'Q', value: faixa.quinta},
                                                           {text: 'S', value: faixa.sexta},
                                                           {text: 'S', value: faixa.sabado},
                                                           {text: 'D', value: faixa.domingo},
                                                           {text: 'F', value: faixa.feriado},]});
                });
                this.faixaHorarioSubscription.next(faixaHorariaModal);
            })
    }

    readFaixaHorariaConcessaos(order_by?: FaixaHorariaSort, where?: FaixaHorariaFilter) {
        const variables = { ... this.graphQL.session, ... {order: order_by}, ... {where: where} }
        return this.graphQL.query<read_FaixaHorariaConcessao>(FaixaHorariaConcessaoSchema.read_FaixaHorariaConcessao, variables);
    }

    updateFaixaHorariaConcessao(faixaHoraria: FaixaHorariaConcessao) {
        const faixaHorariaConcessaoInput = { faixaHoraria: { ... faixaHoraria} , ...this.graphQL.session}
        return this.graphQL.mutation<update_FaixaHorariaConcessao>(FaixaHorariaConcessaoSchema.update_FaixaHorariaConcessao, faixaHorariaConcessaoInput);
    }

    deleteFaixaHorariaConcessao(id: number) {
        return this.graphQL.mutation<delete_FaixaHorariaConcessao>(FaixaHorariaConcessaoSchema.delete_FaixaHorariaConcessao, { id: id , ...this.graphQL.session} )
    }
}