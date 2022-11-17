import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GenericGraphQL } from 'src/app/@core/api/generic-graphql';
import { create_VeiculoExternoUsuario, delete_VeiculoExternoUsuario, 
         read_VeiculoExternoUsuario, 
         update_VeiculoExternoUsuario, 
         VeiculoExternoUsuario, 
         VeiculoExternoUsuarioData, 
         VeiculoExternoUsuarioFilter, 
         VeiculoExternoUsuarioSort } from 'src/app/@core/data/usuario-veiculo-externo';
import { VeiculoExternoUsuarioSchema } from './veiculo-externo.schema';





@Injectable()
export class VeiculoExternoUsuarioService extends VeiculoExternoUsuarioData {

    constructor(private graphQL: GenericGraphQL) {
        super();
    }

    createVeiculoExternoUsuario(veiculoExterno: VeiculoExternoUsuario){
        const variables = { veiculoExterno: { ...veiculoExterno}, ... this.graphQL.session};
        return this.graphQL.mutation<create_VeiculoExternoUsuario>(VeiculoExternoUsuarioSchema.create_VeiculoExternoUsuario,variables)  
    }


   readVeiculoExternoUsuario(order_by?: VeiculoExternoUsuarioSort,where?: VeiculoExternoUsuarioFilter) {
      const variables = { ... this.graphQL.session, ...{order: order_by}, ... {where: where} } 
      return this.graphQL.query<read_VeiculoExternoUsuario>(VeiculoExternoUsuarioSchema.read_VeiculoExternoUsuario, variables)
   } 

   readVeiculoExternoUsuarioRelat(order_by?: VeiculoExternoUsuarioSort,where?: VeiculoExternoUsuarioFilter) {
    const variables = { ... this.graphQL.session, ...{order: order_by}, ... {where: where} } 
    return this.graphQL.query<read_VeiculoExternoUsuario>(VeiculoExternoUsuarioSchema.read_VeiculoExternoUsuarioRelat, variables)
 }

   updateVeiculoExternoUsuario(veiculoExterno: VeiculoExternoUsuario){
    const veiculoDispositivoInput = { veiculoExterno: { ...veiculoExterno}, ...this.graphQL.session}
    return this.graphQL.mutation<update_VeiculoExternoUsuario>(VeiculoExternoUsuarioSchema.update_VeiculoExternoUsuario, veiculoDispositivoInput)
}

   deleteVeiculoExternoUsuario(id: number) {
    return this.graphQL.mutation<delete_VeiculoExternoUsuario>(VeiculoExternoUsuarioSchema.delete_VeiculoExternoUsuario, { id: id , ...this.graphQL.session} )
    }
}