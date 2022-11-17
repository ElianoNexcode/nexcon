import { Injectable } from '@angular/core';
import { GenericGraphQL } from 'src/app/@core/api/generic-graphql';

import { DocumentoGrupoSchema } from './documento.schema';
import { DocumentoGrupoData, 
         DocumentoGrupo, 
         DocumentoGrupoSort,
         DocumentoGrupoFilter,
         create_DocumentoGrupo, 
         read_DocumentoGrupo, 
         update_DocumentoGrupo, 
         delete_DocumentoGrupo} from 'src/app/@core/data/grupo-documento';

@Injectable()
export class DocumentoGrupoService extends DocumentoGrupoData {

    constructor(private graphQL: GenericGraphQL) {
        super();
    }

    createDocumentoGrupo(documentoGrupo: DocumentoGrupo) {
        const variables = { documentoGrupo: { ... documentoGrupo }, ... this.graphQL.session};
        return this.graphQL.mutation<create_DocumentoGrupo>(DocumentoGrupoSchema.create_DocumentoGrupo, variables)
    }

    readDocumentoGrupos(order_by?: DocumentoGrupoSort, where?: DocumentoGrupoFilter) {
        const variables = { ... this.graphQL.session, ... {order: order_by}, ... {where: where} }
        return this.graphQL.query<read_DocumentoGrupo>(DocumentoGrupoSchema.read_DocumentoGrupo, variables);
    }

    updateDocumentoGrupo(documentoGrupo: DocumentoGrupo) {
        const documentoGrupoInput = { documentoGrupo: { ... documentoGrupo}, ...this.graphQL.session }
        return this.graphQL.mutation<update_DocumentoGrupo>(DocumentoGrupoSchema.update_DocumentoGrupo, documentoGrupoInput);
    }

    deleteDocumentoGrupo(id: number) {
        return this.graphQL.mutation<delete_DocumentoGrupo>(DocumentoGrupoSchema.delete_DocumentoGrupo, { id: id , ...this.graphQL.session})
    }

    countDocumentoGrupos(where?: DocumentoGrupoFilter) {
        const variables = { ... this.graphQL.session, ... {where: where} }
        return this.graphQL.query<read_DocumentoGrupo>(DocumentoGrupoSchema.count_DocumentoGrupo, variables)
    }
}