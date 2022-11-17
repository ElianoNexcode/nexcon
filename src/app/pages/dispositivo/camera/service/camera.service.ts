import { Injectable } from '@angular/core';
import { GenericGraphQL } from 'src/app/@core/api/generic-graphql';

import { CameraDispositivoSchema } from './camera.schema';
import { CameraDispositivoData, 
         CameraDispositivo,
         CameraDispositivoSort,
         CameraDispositivoFilter,
         create_CameraDispositivo, 
         read_CameraDispositivo, 
         update_CameraDispositivo, 
         delete_CameraDispositivo} from 'src/app/@core/data/dispositivo-camera';

@Injectable()
export class CameraDispositivoService extends CameraDispositivoData {

    constructor(private graphQL: GenericGraphQL) {
        super();
    }

    createCameraDispositivo(camera: CameraDispositivo) {
        const variables = { camera: { ... camera }, ... this.graphQL.session};
        return this.graphQL.mutation<create_CameraDispositivo>(CameraDispositivoSchema.create_CameraDispositivo, variables)
    }

    readCameraDispositivos(order_by?: CameraDispositivoSort, where?: CameraDispositivoFilter) {
        const variables = { ... this.graphQL.session, ... {order: order_by}, ... {where: where} }
        return this.graphQL.query<read_CameraDispositivo>(CameraDispositivoSchema.read_CameraDispositivo, variables);
    }

    updateCameraDispositivo(camera: CameraDispositivo) {
        const cameraDispositivoInput = { camera: { ... camera} , ...this.graphQL.session}
        return this.graphQL.mutation<update_CameraDispositivo>(CameraDispositivoSchema.update_CameraDispositivo, cameraDispositivoInput);
    }

    deleteCameraDispositivo(id: number) {
        return this.graphQL.mutation<delete_CameraDispositivo>(CameraDispositivoSchema.delete_CameraDispositivo, { id: id , ...this.graphQL.session} )
    }
}