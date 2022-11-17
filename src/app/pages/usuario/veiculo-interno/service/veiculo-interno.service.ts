import { Injectable } from '@angular/core';
import { GenericGraphQL } from 'src/app/@core/api/generic-graphql';
import { create_VeiculoInternoUsuario, 
         delete_VeiculoInternoUsuario, 
         read_VeiculoInternoUsuario, 
         update_VeiculoInternoUsuario, 
         VeiculoInternoUsuario, 
         VeiculoInternoUsuarioData, 
         VeiculoInternoUsuarioFilter, 
         VeiculoInternoUsuarioSort } from 'src/app/@core/data/usuario-veiculo-interno';
import { VeiculoInternoUsuarioSchema } from './veiculo-interno.schema';

@Injectable()
export class VeiculoInternoUsuarioService extends VeiculoInternoUsuarioData {

    constructor(private graphQL: GenericGraphQL) {
        super();
    }

    createVeiculoInternoUsuario(veiculoInterno: VeiculoInternoUsuario){
        const variables = { veiculoInterno: { ...veiculoInterno}, ... this.graphQL.session};
        return this.graphQL.mutation<create_VeiculoInternoUsuario>(VeiculoInternoUsuarioSchema.create_VeiculoInternoUsuario,variables)  
    }


    readVeiculoInternoLocalizacoes() {
        const variables = { ... this.graphQL.session }
        return this.graphQL.query<string[]>(VeiculoInternoUsuarioSchema.read_VeiculoInternoLocalizacoes, variables);
    }

   readVeiculoInternoUsuario(order_by?: VeiculoInternoUsuarioSort,where?: VeiculoInternoUsuarioFilter) {
      const variables = { ... this.graphQL.session, ...{order: order_by}, ... {where: where} }   
      return this.graphQL.query<read_VeiculoInternoUsuario>(VeiculoInternoUsuarioSchema.read_VeiculoInternoUsuario, variables)
    }
    
   readVeiculoInternoUsuarioRelat(order_by?: VeiculoInternoUsuarioSort,where?: VeiculoInternoUsuarioFilter) {
      const variables = { ... this.graphQL.session, ...{order: order_by}, ... {where: where} }   
      return this.graphQL.query<read_VeiculoInternoUsuario>(VeiculoInternoUsuarioSchema.read_VeiculoInternoUsuarioRelat, variables)
    } 

   updateVeiculoInternoUsuario(veiculoInterno: VeiculoInternoUsuario){
    const veiculoDispositivoInput = { veiculoInterno: { ...veiculoInterno}, ...this.graphQL.session}
    return this.graphQL.mutation<update_VeiculoInternoUsuario>(VeiculoInternoUsuarioSchema.update_VeiculoInternoUsuario, veiculoDispositivoInput)
    }

   deleteVeiculoInternoUsuario(id: number) {
    return this.graphQL.mutation<delete_VeiculoInternoUsuario>(VeiculoInternoUsuarioSchema.delete_VeiculoInternoUsuario, { id: id , ...this.graphQL.session} )
    }


}