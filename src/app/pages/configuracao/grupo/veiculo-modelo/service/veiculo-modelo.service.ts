import { Injectable } from '@angular/core';
import { GenericGraphQL } from 'src/app/@core/api/generic-graphql';

import { VeiculoModeloGrupoSchema } from './veiculo-modelo.schema';
import { VeiculoModeloGrupoData, 
         VeiculoModeloGrupo, 
         VeiculoModeloGrupoSort,
         VeiculoModeloGrupoFilter,
         create_VeiculoModeloGrupo, 
         read_VeiculoModeloGrupo, 
         update_VeiculoModeloGrupo, 
         delete_VeiculoModeloGrupo} from 'src/app/@core/data/grupo-veiculo-modelo';

@Injectable()
export class VeiculoModeloGrupoService extends VeiculoModeloGrupoData {

    constructor(private graphQL: GenericGraphQL) {
        super();
    }

    createVeiculoModeloGrupo(veiculoModelo: VeiculoModeloGrupo) {
        const variables = { veiculoModelo: { ... veiculoModelo }, ... this.graphQL.session};
        return this.graphQL.mutation<create_VeiculoModeloGrupo>(VeiculoModeloGrupoSchema.create_Grupo_ModeloVeiculo, variables)
    }

    readVeiculoModeloGrupos(order_by?: VeiculoModeloGrupoSort, where?: VeiculoModeloGrupoFilter) {
        const variables = { ... this.graphQL.session, ... {order: order_by}, ... {where: where} }
        return this.graphQL.query<read_VeiculoModeloGrupo>(VeiculoModeloGrupoSchema.read_Grupo_ModeloVeiculo, variables);
    }

    updateVeiculoModeloGrupo(veiculoModelo: VeiculoModeloGrupo) {
        const veiculoModeloGrupoInput = { veiculoModelo: { ... veiculoModelo} , ...this.graphQL.session}
        return this.graphQL.mutation<update_VeiculoModeloGrupo>(VeiculoModeloGrupoSchema.update_Grupo_ModeloVeiculo, veiculoModeloGrupoInput);
    }

    deleteVeiculoModeloGrupo(id: number) {
        return this.graphQL.mutation<delete_VeiculoModeloGrupo>(VeiculoModeloGrupoSchema.delete_Grupo_ModeloVeiculo, { id: id , ...this.graphQL.session})
    }
}