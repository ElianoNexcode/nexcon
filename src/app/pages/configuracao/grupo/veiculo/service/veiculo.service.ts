import { Injectable } from '@angular/core';
import { GenericGraphQL } from 'src/app/@core/api/generic-graphql';

import { of as ObservableOf } from 'rxjs';

import { VeiculoGrupoSchema } from './veiculo.schema';
import { VeiculoGrupoData, 
         VeiculoGrupo, 
         VeiculoGrupoSort,
         VeiculoGrupoFilter,
         create_VeiculoGrupo, 
         read_VeiculoGrupo, 
         update_VeiculoGrupo, 
         delete_VeiculoGrupo} from 'src/app/@core/data/grupo-veiculo';

@Injectable()
export class VeiculoGrupoService extends VeiculoGrupoData {

    constructor(private graphQL: GenericGraphQL) {
        super();
    }

    createVeiculoGrupo(veiculoGrupo: VeiculoGrupo) {
        const variables = { veiculoGrupo: { ... veiculoGrupo }, ... this.graphQL.session};
        return this.graphQL.mutation<create_VeiculoGrupo>(VeiculoGrupoSchema.create_Grupo_Veiculo, variables)
    }

    readVeiculoGrupos(order?: VeiculoGrupoSort, where?: VeiculoGrupoFilter) {
        const variables = { ... this.graphQL.session, ... {order: order}, ... {where: where} }
        return this.graphQL.query<read_VeiculoGrupo>(VeiculoGrupoSchema.read_VeiculoGrupo, variables);
    }

    updateVeiculoGrupo(veiculoGrupo: VeiculoGrupo) {
        const veiculoGrupoInput = { veiculoGrupo: { ... veiculoGrupo} , ...this.graphQL.session}
        return this.graphQL.mutation<update_VeiculoGrupo>(VeiculoGrupoSchema.update_Grupo_Veiculo, veiculoGrupoInput);
    }

    deleteVeiculoGrupo(id: number) {
        return this.graphQL.mutation<delete_VeiculoGrupo>(VeiculoGrupoSchema.delete_Grupo_Veiculo, { id: id , ...this.graphQL.session})
    }

}