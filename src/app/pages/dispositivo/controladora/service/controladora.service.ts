import { Injectable } from '@angular/core';
import { GenericGraphQL } from 'src/app/@core/api/generic-graphql';

import { ControladoraDispositivoSchema } from './controladora.schema';
import { ControladoraDispositivoData, 
         ControladoraDispositivo,
         ControladoraDispositivoSort,
         ControladoraDispositivoFilter,
         create_ControladoraDispositivo, 
         read_ControladoraDispositivo, 
         update_ControladoraDispositivo, 
         delete_ControladoraDispositivo} from 'src/app/@core/data/dispositivo-controladora';

export interface Controladora {
    tipoId: number
    leitorId: number
    validacao: number
    protocolo: number
}
export interface Tipo {
    id: number
    tipo: string
}

@Injectable()
export class ControladoraDispositivoService extends ControladoraDispositivoData {

    constructor(private graphQL: GenericGraphQL) {
        super();

        const controladora: Controladora[] = [
            {tipoId: 1, leitorId: 1, validacao: 1638, protocolo: 1022},
            {tipoId: 1, leitorId: 2, validacao: 1638, protocolo: 1022},
            {tipoId: 1, leitorId: 5, validacao: 0, protocolo: 20479},
            {tipoId: 1, leitorId: 5, validacao: 1636, protocolo: 892927},
            {tipoId: 1, leitorId: 6, validacao: 0, protocolo: 20479},
            {tipoId: 1, leitorId: 6, validacao: 1634, protocolo: 892927},
            {tipoId: 1, leitorId: 9, validacao: 1637, protocolo: 15728639},
            {tipoId: 2, leitorId: 1, validacao: 7934, protocolo: 1022},
            {tipoId: 2, leitorId: 2, validacao: 7934, protocolo: 1022},
            {tipoId: 2, leitorId: 3, validacao: 7934, protocolo: 1022},
            {tipoId: 2, leitorId: 5, validacao: 0, protocolo: 20479},
            {tipoId: 2, leitorId: 5, validacao: 7932, protocolo: 892927},
            {tipoId: 2, leitorId: 6, validacao: 0, protocolo: 20479},
            {tipoId: 2, leitorId: 6, validacao: 7930, protocolo: 892927},
            {tipoId: 2, leitorId: 7, validacao: 0, protocolo: 20479},
            {tipoId: 2, leitorId: 7, validacao: 7926, protocolo: 892927},
            {tipoId: 2, leitorId: 8, validacao: 0, protocolo: 20479},
            {tipoId: 2, leitorId: 8, validacao: 7918, protocolo: 892927},
            {tipoId: 2, leitorId: 9, validacao: 7933, protocolo: 15728639},
            {tipoId: 3, leitorId: 1, validacao: 7934, protocolo: 1022},
            {tipoId: 3, leitorId: 2, validacao: 7934, protocolo: 1022},
            {tipoId: 3, leitorId: 3, validacao: 7934, protocolo: 1022},
            {tipoId: 3, leitorId: 5, validacao: 0, protocolo: 20479},
            {tipoId: 3, leitorId: 5, validacao: 7932, protocolo: 892927},
            {tipoId: 3, leitorId: 6, validacao: 0, protocolo: 20479},
            {tipoId: 3, leitorId: 6, validacao: 7930, protocolo: 892927},
            {tipoId: 3, leitorId: 7, validacao: 0, protocolo: 20479},
            {tipoId: 3, leitorId: 7, validacao: 7926, protocolo: 892927},
            {tipoId: 3, leitorId: 8, validacao: 0, protocolo: 20479},
            {tipoId: 3, leitorId: 8, validacao: 7918, protocolo: 892927},
            {tipoId: 3, leitorId: 9, validacao: 7933, protocolo: 15728639},
            {tipoId: 4, leitorId: 1, validacao: 8190, protocolo: 1022},
            {tipoId: 4, leitorId: 2, validacao: 8190, protocolo: 1022},
            {tipoId: 4, leitorId: 3, validacao: 8190, protocolo: 1022},
            {tipoId: 4, leitorId: 4, validacao: 8190, protocolo: 1022},
            {tipoId: 4, leitorId: 5, validacao: 0, protocolo: 20479},
            {tipoId: 4, leitorId: 5, validacao: 8188, protocolo: 892927},
            {tipoId: 4, leitorId: 6, validacao: 0, protocolo: 20479},
            {tipoId: 4, leitorId: 6, validacao: 8186, protocolo: 892927},
            {tipoId: 4, leitorId: 7, validacao: 0, protocolo: 20479},
            {tipoId: 4, leitorId: 7, validacao: 8182, protocolo: 892927},
            {tipoId: 4, leitorId: 8, validacao: 0, protocolo: 20479},
            {tipoId: 4, leitorId: 8, validacao: 8174, protocolo: 892927},
            {tipoId: 4, leitorId: 9, validacao: 8189, protocolo: 15728639},
            {tipoId: 5, leitorId: 1, validacao: 1638, protocolo: 1022},
            {tipoId: 5, leitorId: 2, validacao: 1638, protocolo: 1022},
            {tipoId: 5, leitorId: 3, validacao: 0, protocolo: 1022},
            {tipoId: 5, leitorId: 5, validacao: 0, protocolo: 20479},
            {tipoId: 5, leitorId: 5, validacao: 1636, protocolo: 892927},
            {tipoId: 5, leitorId: 6, validacao: 0, protocolo: 20479},
            {tipoId: 5, leitorId: 6, validacao: 1634, protocolo: 892927},
            {tipoId: 5, leitorId: 7, validacao: 0, protocolo: 913407},
            {tipoId: 5, leitorId: 9, validacao: 1637, protocolo: 15728639},
            {tipoId: 6, leitorId: 1, validacao: 1638, protocolo: 1022},
            {tipoId: 6, leitorId: 2, validacao: 1638, protocolo: 1022},
            {tipoId: 6, leitorId: 5, validacao: 0, protocolo: 20479},
            {tipoId: 6, leitorId: 5, validacao: 1636, protocolo: 892927},
            {tipoId: 6, leitorId: 6, validacao: 0, protocolo: 20479},
            {tipoId: 6, leitorId: 6, validacao: 1634, protocolo: 892927},
            {tipoId: 6, leitorId: 9, validacao: 1637, protocolo: 15728639},
            {tipoId: 7, leitorId: 1, validacao: 1638, protocolo: 1022},
            {tipoId: 7, leitorId: 2, validacao: 1638, protocolo: 1022},
            {tipoId: 7, leitorId: 5, validacao: 0, protocolo: 20479},
            {tipoId: 7, leitorId: 5, validacao: 1636, protocolo: 892927},
            {tipoId: 7, leitorId: 6, validacao: 0, protocolo: 20479},
            {tipoId: 7, leitorId: 6, validacao: 1634, protocolo: 892927},
            {tipoId: 7, leitorId: 9, validacao: 1637, protocolo: 15728639},
            {tipoId: 8, leitorId: 1, validacao: 0, protocolo: 0},
            {tipoId: 8, leitorId: 2, validacao: 0, protocolo: 0},
            {tipoId: 8, leitorId: 5, validacao: 0, protocolo: 0},
            {tipoId: 8, leitorId: 6, validacao: 0, protocolo: 0},
            {tipoId: 8, leitorId: 9, validacao: 0, protocolo: 0},
            {tipoId: 9, leitorId: 1, validacao: 9824, protocolo: 252478462},
            {tipoId: 9, leitorId: 1, validacao: 1632, protocolo: 34091311103},
            {tipoId: 9, leitorId: 1, validacao: 0, protocolo: 34359758847},
            {tipoId: 9, leitorId: 2, validacao: 9824, protocolo: 252478462},
            {tipoId: 9, leitorId: 2, validacao: 1632, protocolo: 34091311103},
            {tipoId: 9, leitorId: 2, validacao: 0, protocolo: 34359758847},
            {tipoId: 9, leitorId: 10, validacao: 0, protocolo: 1057792590},
            {tipoId: 9, leitorId: 9, validacao: 0, protocolo: 16485},
            {tipoId: 10, leitorId: 1, validacao: 229376, protocolo: 16223568894},
            {tipoId: 10, leitorId: 2, validacao: 229376, protocolo: 16223568894},
            {tipoId: 10, leitorId: 3, validacao: 229376, protocolo: 16223568894},
            {tipoId: 10, leitorId: 5, validacao: 65536, protocolo: 17985986559},
            {tipoId: 10, leitorId: 5, validacao: 0, protocolo: 4099},
            {tipoId: 10, leitorId: 6, validacao: 32768, protocolo: 17985986559},
            {tipoId: 10, leitorId: 6, validacao: 0, protocolo: 4099},
            {tipoId: 10, leitorId: 9, validacao: 229375, protocolo: 15728639}
        ]

        const validacao: Tipo[] = [
            {id: 1, tipo: "VALIDAR SENHA"},
            {id: 2, tipo: "VALIDAR BIOMETRIA NA SERIAL 1"},
            {id: 3, tipo: "VALIDAR BIOMETRIA NA SERIAL 2"},
            {id: 4, tipo: "VALIDAR BIOMETRIA NA SERIAL 3 (EXP)"},
            {id: 5, tipo: "VALIDAR BIOMETRIA NA SERIAL 4 (EXP)"},
            {id: 6, tipo: "CONFIRMAÇÃO NO LEITOR TTL 1"},
            {id: 7, tipo: "CONFIRMAÇÃO NO LEITOR TTL 2"},
            {id: 8, tipo: "CONFIRMAÇÃO NO LEITOR TTL 3 (EXP)"},
            {id: 9, tipo: "CONFIRMAÇÃO NO LEITOR TTL 4 (EXP)"},
            {id: 10, tipo: "CONFIRMAÇÃO NO LEITOR SERIAL 1"},
            {id: 11, tipo: "CONFIRMAÇÃO NO LEITOR SERIAL 2"},
            {id: 12, tipo: "CONFIRMAÇÃO NO LEITOR SERIAL 3 (EXP)"},
            {id: 13, tipo: "CONFIRMAÇÃO NO LEITOR SERIAL 4 (EXP)"},
            {id: 14, tipo: "IDENTIFICAÇÃO BIOMÉTRICA"},
            {id: 15, tipo: "VALIDAR BIOMETRIA NOS LEITORES 1 E 2"},
            {id: 16, tipo: "VALIDAR BIOMETRIA NO LEITOR 4"},
            {id: 17, tipo: "VALIDAR BIOMETRIA NO LEITOR 5"},
            {id: 18, tipo: "VALIDAR BIOMETRIA NOS LEITORES 4 E 5"},


        ]

        const protocolo: Tipo[] = [
            {id: 1, tipo: "ABA TRACK 2"},
            {id: 2, tipo: "WIEGAND 26"},
            {id: 3, tipo: "WIEGAND 32"},
            {id: 4, tipo: "WIEGAND 34"},
            {id: 5, tipo: "WIEGAND 34 KP-ID"},
            {id: 6, tipo: "WIEGAND 34 KP-PW"},
            {id: 7, tipo: "WIEGAND 34-26"},
            {id: 8, tipo: "WIEGAND 34-26 KP-ID"},
            {id: 9, tipo: "WIEGAND 34-26 KP-PW"},
            {id: 10, tipo: "WIEGAND 35"},
            {id: 11, tipo: "BIOMÉTRICO CONTROL ID (26)"},
            {id: 12, tipo: "BIOMÉTRICO CONTROL ID (32/34)"},
            {id: 13, tipo: "BIOMÉTRICO NITGEN FIM 5060/6060"},
            {id: 14, tipo: "CÓDIGO DE BARRAS"},
            {id: 15, tipo: "CONTROLE REMOTO NEXCODE"},
            {id: 16, tipo: "LPR PUMATRONIX"},
            {id: 17, tipo: "MIFARE ACURA AM10/AM11"},
            {id: 18, tipo: "QR CODE ACUSCAN-02"},
            {id: 19, tipo: "QR CODE NEXCODE (32 e 34)"},
            {id: 20, tipo: "QR CODE NEXCODE (34 e 26)"},
            {id: 21, tipo: "IDENTIFICADOR OCULTO"},
            {id: 22, tipo: "IDENTIFICADOR VISÍVEL"},
            {id: 23, tipo: "SENHA OCULTA"},
            {id: 24, tipo: "SENHA VISIVEL"},
            {id: 25, tipo: "WIEGAND 37"},
            {id: 26, tipo: "WIEGAND 44"},
            {id: 27, tipo: "WIEGAND 48"},
            {id: 28, tipo: "WIEGAND PUMATRONIX"},
            {id: 29, tipo: "ACURA AM10/AM11"},
            {id: 30, tipo: "ACURA AM10/AM11 NBS"},
            {id: 31, tipo: "ACURA EDGE 100 R1"},
            {id: 32, tipo: "ACURA EDGE 100 R2"},
            {id: 33, tipo: "ACURA EGDE 100 R3"},
            {id: 34, tipo: "ACURA EGDE 100 R4"},
            {id: 35, tipo: "GEMPLUS PROX-P2"},
            {id: 36, tipo: "BIOMÉTRICO NITGEN FIM2030"},

        ]
    
    }

    createControladoraDispositivo(controladora: ControladoraDispositivo) {
        const variables = { controladora: { ... controladora }, ... this.graphQL.session};
        return this.graphQL.mutation<create_ControladoraDispositivo>(ControladoraDispositivoSchema.create_ControladoraDispositivo, variables)
    }

    readControladoraDispositivos(order_by?: ControladoraDispositivoSort, where?: ControladoraDispositivoFilter) {
        const variables = { ... this.graphQL.session, ... {order: order_by}, ... {where: where} }
        return this.graphQL.query<read_ControladoraDispositivo>(ControladoraDispositivoSchema.read_ControladoraDispositivo, variables);
    }

    updateControladoraDispositivo(controladora: ControladoraDispositivo) {
        const controladoraDispositivoInput = { controladora: { ... controladora} , ...this.graphQL.session}
        return this.graphQL.mutation<update_ControladoraDispositivo>(ControladoraDispositivoSchema.update_ControladoraDispositivo, controladoraDispositivoInput);
    }

    deleteControladoraDispositivo(id: number) {
        return this.graphQL.mutation<delete_ControladoraDispositivo>(ControladoraDispositivoSchema.delete_ControladoraDispositivo, { id: id , ...this.graphQL.session} )
    }
}