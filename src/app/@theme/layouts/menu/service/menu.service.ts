import { Injectable } from '@angular/core';
import { BehaviorSubject, of as observableOf } from 'rxjs';

import { TreeView } from '../../treeview/service/treeview';
import { TreeviewService } from '../../treeview/service/treeview.service';

export interface Menu {
    id: string;
    menu: string,
    alias?: string,
    submenu?: SubMenu[],
    enable?: boolean,
    visible?: boolean,
    icon?: {file: string, width: any},
    child?: string,
    solucaoIntegrada?: number
}
  
export interface SubMenu {
    id: string
    menuId?: string
    text: string
    link?: string
    treeview?: TreeView[]
    enable?: boolean
    visible?: boolean
    solucaoIntegrada?: number
    checked?: boolean
    indetermined?: boolean
    icon?: string
    child?: string
}

@Injectable({
    providedIn: 'root'
})
export class MenuService {

    menu: Menu[];

    menuSelectBehavior: BehaviorSubject<number>;

    constructor(private treeviewService: TreeviewService) { }

    getMenu() {
        const menu: Menu[] = [
            {
                "id": "000",
                "menu": "SISTEMA",
                "alias": "sistema",
                "submenu": [
                    {
                        "id": "000-01",
                        "text": "Sistema",
                        "link": "./sistema",
                        "treeview": [
                            {
                                "id": "000-01-1",
                                "text": "SISTEMA",
                                "alias": "sistema",
                                "child": "",
                            }
                        ]
                    }
                ],
                "enable": true,
                "visible": null,
                "icon": {"file": "ajuda.svg", "width": "15px"},
                "child": "organizacao"
            },
            {
                "id": "tkMxdf5jg3",
                "menu": "INFORMAÇÃO",
                "alias": "informacao",
                "submenu": [
                    {
                        "id": "000-01",
                        "text": "informativo",
                        "link": "./informativo/informativos",
                        "treeview": [
                            {
                                "id": "000-01-1",
                                "text": "INFORMATIVO",
                                "alias": "sistema",
                                "child": "organizacao",
                                "item": [
                                    {
                                        "id": "nJgDeN15g3tE",
                                        "text": "SISTEMA",
                                        "link": "./informativo/sistema",
                                        "operation": 
                                        [

                                        ],                        
                                        "icon": "sistema.svg",
                                        "isFunction": true
                                    },
                                    {
                                        "id": "a1Egd35fghj0o",
                                        "text": "LICENÇA",
                                        "link": "./informativo/licenca",
                                        "operation": 
                                        [

                                        ],                        
                                        "icon": "software.svg",
                                        "isFunction": true
                                    },
                                    {
                                        "id": "f124ER0Ooty45A",
                                        "text": "CONTRATO",
                                        "link": "./informativo/contrato",
                                        "operation": 
                                        [

                                        ],                        
                                        "icon": "contrato.svg",
                                        "isFunction": true
                                    },
                                    {
                                        "id": "d16XkeN157BqK",
                                        "text": "MANUAL",
                                        "link": "./informativo/manual",
                                        "operation": 
                                        [

                                        ],                        
                                        "icon": "manual.svg",
                                        "isFunction": true
                                    },
                                    {
                                        "id": "nJg6Xke5fghj0",
                                        "text": "NEXCODE",
                                        "link": "./informativo/nexcode",
                                        "operation": 
                                        [

                                        ],                        
                                        "icon": "nc.svg",
                                        "isFunction": true
                                    },
                                ]
                            }
                        ]
                    }
                ],
                "enable": true,
                "visible": null,
                "icon": {"file": "ajuda.svg", "width": "15px"},
                "child": "organizacao"
            },
            {
                "id": "mkVlm8ehGU",
                "menu": "CONTROLE",
                "alias": "controle",
                "submenu": [
                    {
                        "id": "5YGhEd16Xk",
                        "text": "Identificação",
                        "link": "./controle/identificacao",
                        "treeview": [
                            {
                                "id": "7BqKDeilxU",
                                "text": "IDENTIFICAÇÃO",
                                "alias": "identificacao",
                                "item": [        
                                    {
                                        "text": "RECENTE",
                                        "id": "001-01-1A",
                                        "icon": "identificacao.svg"
                                    },
                                    {
                                        "text": "VIGENTE",
                                        "id": "001-01-1B",
                                        "icon": "identificacao.svg"
                                    },
                                    {
                                        "text": "EXPIRADA",
                                        "id": "001-01-1C",
                                        "icon": "identificacao.svg"
                                    },
                                    {
                                        "text": "SUSPENSA",
                                        "id": "001-01-1D",
                                        "icon": "identificacao.svg"
                                    },
                                    {
                                        "text": "PROVISÓRIA",
                                        "id": "001-01-1E",
                                        "icon": "identificacao.svg"
                                    },
                                    {
                                        "text": "CANCELADA",
                                        "id": "001-01-1F",
                                        "alias": "cancelada",
                                        "icon": "identificacao.svg",
                                        "subitem": [
                                            {
                                                "text": "DIA",
                                                "id": "001-01-1F1",
                                                "icon": "dia.svg",
                                                "periodo": "dia"
                                            },
                                            {
                                                "text": "SEMANA",
                                                "id": "001-01-1F2",
                                                "icon": "semana.svg",
                                                "periodo": "semana"
                                            },
                                            {
                                                "text": "MÊS",
                                                "id": "001-01-1F3",
                                                "icon": "mes.svg",
                                                "periodo": "mes"
                                            },
                                            {
                                                "text": "PERÍODO",
                                                "id": "001-01-1F4",
                                                "icon": "periodo.svg",
                                                "periodo": "periodo"
                                            }
                                        ]                                
                                    },
                                    {
                                        "text": "ENCERRADA",
                                        "id": "001-01-1G",
                                        "alias": "encerrada",
                                        "icon": "identificacao.svg",
                                        "subitem": [
                                            {
                                                "text": "DIA",
                                                "id": "001-01-1G1",
                                                "icon": "dia.svg",
                                                "periodo": "dia"
                                            },
                                            {
                                                "text": "SEMANA",
                                                "id": "001-01-1G2",
                                                "icon": "semana.svg",
                                                "periodo": "mes"
                                            },
                                            {
                                                "text": "MÊS",
                                                "id": "001-01-1G3",
                                                "icon": "mes.svg", 
                                                "periodo": "mes"
                                            },
                                            {
                                                "text": "PERÍODO",
                                                "id": "001-01-1G4",
                                                "icon": "periodo.svg", 
                                                "periodo": "periodo"
                                            }
                                        ]                                
                                    },
                                    {
                                        "text": "HISTÓRICO",
                                        "id": "001-01-1H",
                                        "alias": "historico",
                                        "icon": "identificacao.svg",
                                        "subitem": [
                                            {
                                                "text": "DIA",
                                                "id": "001-01-1H1",
                                                "icon": "dia.svg",
                                                "periodo": "dia"
                                            },
                                            {
                                                "text": "SEMANA",
                                                "id": "001-01-1H2",
                                                "icon": "semana.svg", 
                                                "periodo": "semana"
                                            },
                                            {
                                                "text": "MÊS",
                                                "id": "001-01-1H3",
                                                "icon": "mes.svg",
                                                "periodo": "mes"
                                            },
                                            {
                                                "text": "PERÍODO",
                                                "id": "001-01-1H4",
                                                "icon": "periodo.svg",
                                                "periodo": "periodo"
                                            }
                                        ]
                                    }                            
                                ],
                                "operation": 
                                [
                                    {
                                        "id": 0,
                                        "text": "forms.buttons.create"
                                    },
                                    {
                                        "id": 1,
                                        "text": "forms.buttons.update"
                                    },
                                    {
                                        "id": 2,
                                        "text": "forms.buttons.read"
                                    },
                                    {
                                        "id": 3,
                                        "text": "forms.buttons.suspend"
                                    },
                                    {
                                        "id": 4,
                                        "text": "forms.buttons.cancel"
                                    },
                                    {
                                        "id": 5,
                                        "text": "forms.buttons.end"
                                    }
                                ],
                                "child": "site",
                                "dynamic": true
                            },
                            // {
                            //     "id": "66pZ04k",
                            //     "text": "AGENDA DE VISITA",
                            //     "alias": "identificacao",
                            //     "solucaoIntegrada": 0,
                            //     "item": [
                            //         {
                            //             "text": "SOLICITADA",
                            //             "id": "001-02-2A",
                            //             "icon": "identificacao.svg"
                            //         },
                            //         {
                            //             "text": "RECENTE",
                            //             "id": "001-02-2B",
                            //             "icon": "identificacao.svg"
                            //         },
                            //         {
                            //             "text": "VIGENTE",
                            //             "id": "001-02-2C",
                            //             "icon": "identificacao.svg"
                            //         },
                            //         {
                            //             "text": "PRESCRITA",
                            //             "id": "001-02-2D",
                            //             "icon": "identificacao.svg"
                            //         },
                            //         {
                            //             "text": "PROGRAMADA",
                            //             "id": "001-02-2E",
                            //             "icon": "identificacao.svg"
                            //         },
                            //         {
                            //             "text": "CANCELADA",
                            //             "id": "001-02-2F",
                            //             "alias": "cancelada",
                            //             "icon": "identificacao.svg",
                            //             "subitem": [
                            //                 {
                            //                     "text": "DIA",
                            //                     "id": "001-01-2F1",
                            //                     "icon": "dia.png"
                            //                 },
                            //                 {
                            //                     "text": "SEMANA",
                            //                     "id": "001-01-2F2",
                            //                     "icon": "semana.png"
                            //                 },
                            //                 {
                            //                     "text": "MÊS",
                            //                     "id": "001-01-2F3",
                            //                     "icon": "mes.png"
                            //                 },
                            //                 {
                            //                     "text": "PERÍODO",
                            //                     "id": "001-01-2F4",
                            //                     "icon": "periodo.png"
                            //                 }
                            //             ] 
                            //         },
                            //         {
                            //             "text": "CUMPRIDA",
                            //             "id": "001-01-2G",
                            //             "alias": "cumprida",
                            //             "icon": "identificacao.svg",
                            //             "subitem": [
                            //                 {
                            //                     "text": "DIA",
                            //                     "id": "001-01-2G1",
                            //                     "icon": "dia.svg"
                            //                 },
                            //                 {
                            //                     "text": "SEMANA",
                            //                     "id": "001-01-2G2",
                            //                     "icon": "semana.svg"
                            //                 },
                            //                 {
                            //                     "text": "MÊS",
                            //                     "id": "001-01-2G3",
                            //                     "icon": "mes.svg"
                            //                 },
                            //                 {
                            //                     "text": "PERÍODO",
                            //                     "id": "001-01-2G4",
                            //                     "icon": "periodo.svg"
                            //                 }
                            //             ] 
                            //         },
                            //         {
                            //             "text": "HISTÓRICO",
                            //             "id": "001-01-2H",
                            //             "alias": "historico",
                            //             "icon": "identificacao.svg",
                            //             "subitem": [
                            //                 {
                            //                     "text": "DIA",
                            //                     "id": "001-01-2H1",
                            //                     "icon": "dia.svg"
                            //                 },
                            //                 {
                            //                     "text": "SEMANA",
                            //                     "id": "001-01-2H2",
                            //                     "icon": "semana.svg"
                            //                 },
                            //                 {
                            //                     "text": "MÊS",
                            //                     "id": "001-01-2H3",
                            //                     "icon": "mes.svg"
                            //                 },
                            //                 {
                            //                     "text": "PERÍODO",
                            //                     "id": "001-01-2H4",
                            //                     "icon": "periodo.svg"
                            //                 }
                            //             ]
                            //         }                            
                            //     ],
                            //     "visible": false,
                            //     "child": "site"
                            // },
                            {
                                "id": 'b16b3az464',
                                "text": "ABORDAGEM INFORMATIVA",
                                "operation": 
                                [
                                    {
                                        "id": 0,
                                        "text": "forms.buttons.update"
                                    },
                                    {
                                        "id": 1,
                                        "text": "forms.buttons.read"
                                    }
                                ],                        
                                "onlyOperationNivel": true
                            },
                            {
                                "id": 'ba309b{66f',
                                "text": "ABORDAGEM ADVERTIDA",
                                "operation": 
                                [
                                    {
                                        "id": 0,
                                        "text": "forms.buttons.update"
                                    },
                                    {
                                        "id": 1,
                                        "text": "forms.buttons.read"
                                    }
                                ],                        
                                "onlyOperationNivel": true
                            },
                            {
                                "id": 'a8ea17|4ca',
                                "text": "ABORDAGEM RESTRITIVA",
                                "operation": 
                                [
                                    {
                                        "id": 0,
                                        "text": "forms.buttons.update"
                                    },
                                    {
                                        "id": 1,
                                        "text": "forms.buttons.read"
                                    }
                                ],                        
                                "onlyOperationNivel": true
                            },
         
                        ],
                        "enable": true,
                        "visible": true,
                        "child": "site"
                    }, 
                    {
                        "id": "001-02",
                        "text": "Expedição",
                        "link": "./controle/expedicao-controle",
                        "treeview": [
                            {
                                "id": "001-02-1",
                                "text": "EXPEDIÇÃO",
                                "alias": "expedicao",
                                "item": [
                                    {
                                        "text": "ENTRADA",
                                        "id": "001-02-1A",
                                        "icon": "expedicao.png"
                                    },
                                    {
                                        "text": "SAÍDA",
                                        "id": "001-02-1B",
                                        "alias": "saida",
                                        "icon": "expedicao.png",
                                        "subitem": [
                                            {
                                                "text": "DIA",
                                                "id": "001-02-1B1",
                                                "icon": "dia.png"
                                            },
                                            {
                                                "text": "SEMANA",
                                                "id": "001-02-1B2",
                                                "icon": "semana.png"
                                            },
                                            {
                                                "text": "MÊS",
                                                "id": "001-02-1B3",
                                                "icon": "mes.png"
                                            },
                                            {
                                                "text": "PERÍODO",
                                                "id": "001-02-1B4",
                                                "icon": "periodo.png"
                                            }
                                        ] 
                                    },
                                    {
                                        "text": "REJEIÇÃO",
                                        "id": "001-02-1C",
                                        "alias": "rejeicao",
                                        "icon": "expedicao.png",
                                        "subitem": [
                                            {
                                                "text": "DIA",
                                                "id": "001-02-1C1",
                                                "icon": "dia.png"
                                            },
                                            {
                                                "text": "SEMANA",
                                                "id": "001-02-1C2",
                                                "icon": "semana.png"
                                            },
                                            {
                                                "text": "MÊS",
                                                "id": "001-02-1C3",
                                                "icon": "mes.png"
                                            },
                                            {
                                                "text": "PERÍODO",
                                                "id": "001-02-1C4",
                                                "icon": "periodo.png"
                                            }
                                        ] 
                                    },
                                    {
                                        "text": "DEVOLUÇÃO",
                                        "id": "001-02-1D",
                                        "alias": "devolucao",
                                        "icon": "expedicao.png",
                                        "subitem": [
                                            {
                                                "text": "DIA",
                                                "id": "001-02-1D1",
                                                "icon": "dia.png"
                                            },
                                            {
                                                "text": "SEMANA",
                                                "id": "001-02-1D2",
                                                "icon": "semana.png"
                                            },
                                            {
                                                "text": "MÊS",
                                                "id": "001-02-1D3",
                                                "icon": "mes.png"
                                            },
                                            {
                                                "text": "PERÍODO",
                                                "id": "001-02-1D4",
                                                "icon": "periodo.png"
                                            }
                                        ] 
                                    },
                                    {
                                        "text": "HISTÓRICO",
                                        "id": "001-02-1E",
                                        "alias": "historico",
                                        "icon": "expedicao.png",
                                        "subitem": [
                                            {
                                                "text": "DIA",
                                                "id": "001-02-1E1",
                                                "icon": "dia.png"
                                            },
                                            {
                                                "text": "SEMANA",
                                                "id": "001-02-1E2",
                                                "icon": "semana.png"
                                            },
                                            {
                                                "text": "MÊS",
                                                "id": "001-02-1E3",
                                                "icon": "mes.png"
                                            },
                                            {
                                                "text": "PERÍODO",
                                                "id": "001-02-1E4",
                                                "icon": "periodo.png"
                                            }
                                        ] 
                                    }
                                ],
                                "child": "organizacao"
                            }
                        ],
                        "enable": false,
                        "visible": false,
                        "child": "site"
                    }, 
                    {
                        "id": "001-03",
                        "text": "Ocorrência",
                        "link": "./controle/ocorrencia-controle",
                        "treeview": [
                            {
                                "id": "001-03-1",
                                "text": "OCORRÊNCIA",
                                "alias": "ocorrencia",
                                "item": [
                                    {
                                        "text": "ABERTA",
                                        "id": "001-03-1A",
                                        "icon": "ocorrencia.png"
                                    },
                                    {
                                        "text": "CONFIRMADA",
                                        "id": "001-03-1B",
                                        "icon": "ocorrencia.png"
                                    },
                                    {
                                        "text": "CANCELADA",
                                        "id": "001-03-1C",
                                        "alias": "cancelada",
                                        "icon": "ocorrencia.png",
                                        "subitem": [
                                            {
                                                "text": "DIA",
                                                "id": "001-03-1C1",
                                                "icon": "dia.png"
                                            },
                                            {
                                                "text": "SEMANA",
                                                "id": "001-03-1C2",
                                                "icon": "semana.png"
                                            },
                                            {
                                                "text": "MÊS",
                                                "id": "001-03-1C3",
                                                "icon": "mes.png"
                                            },
                                            {
                                                "text": "PERÍODO",
                                                "id": "001-03-1C4",
                                                "icon": "periodo.png"
                                            }
                                        ] 
                                    },
                                    {
                                        "text": "FECHADA",
                                        "id": "001-03-1D",
                                        "alias": "fechada",
                                        "icon": "ocorrencia.png",
                                        "subitem": [
                                            {
                                                "text": "DIA",
                                                "id": "001-03-1D1",
                                                "icon": "dia.png"
                                            },
                                            {
                                                "text": "SEMANA",
                                                "id": "001-03-1D2",
                                                "icon": "semana.png"
                                            },
                                            {
                                                "text": "MÊS",
                                                "id": "001-03-1D3",
                                                "icon": "mes.png"
                                            },
                                            {
                                                "text": "PERÍODO",
                                                "id": "001-03-1D4",
                                                "icon": "periodo.png"
                                            }
                                        ] 
                                    },
                                    {
                                        "text": "HISTÓRICO",
                                        "id": "001-03-1E",
                                        "alias": "historico",
                                        "icon": "ocorrencia.png",
                                        "subitem": [
                                            {
                                                "text": "DIA",
                                                "id": "001-03-1E1",
                                                "icon": "dia.png"
                                            },
                                            {
                                                "text": "SEMANA",
                                                "id": "001-03-1E2",
                                                "icon": "semana.png"
                                            },
                                            {
                                                "text": "MÊS",
                                                "id": "001-03-1E3",
                                                "icon": "mes.png"
                                            },
                                            {
                                                "text": "PERÍODO",
                                                "id": "001-03-1E4",
                                                "icon": "periodo.png"
                                            }
                                        ] 
                                    }
                                ],
                                "child": "organizacao"
                            }
                        ],
                        "enable": false,
                        "visible": false
                    }, 
                    {
                        "id": "001-04",
                        "text": "Serviço",
                        "link": "./controle/servico-controle",
                        "treeview": [
                            {
                                "id": "001-04-1",
                                "text": "SERVIÇO",
                                "alias": "servico",
                                "item": [
                                    {
                                        "text": "SOLICITADO",
                                        "id": "001-04-1A",
                                        "icon": "servico.png"
                                    },
                                    {
                                        "text": "PROGRAMADO",
                                        "id": "001-04-1B",
                                        "icon": "servico.png"
                                    },
                                    {
                                        "text": "ANDAMENTO",
                                        "id": "001-04-1C",
                                        "icon": "servico.png"
                                    },
                                    {
                                        "text": "SUSPENSO",
                                        "id": "001-04-1D",
                                        "icon": "servico.png"
                                    },
                                    {
                                        "text": "CANCELADO",
                                        "id": "001-04-1C",
                                        "alias": "cancelado",
                                        "icon": "servico.png",
                                        "subitem": [
                                            {
                                                "text": "DIA",
                                                "id": "001-04-1B1",
                                                "icon": "dia.png"
                                            },
                                            {
                                                "text": "SEMANA",
                                                "id": "001-04-1B2",
                                                "icon": "semana.png"
                                            },
                                            {
                                                "text": "MÊS",
                                                "id": "001-04-1B3",
                                                "icon": "mes.png"
                                            },
                                            {
                                                "text": "PERÍODO",
                                                "id": "001-04-1B4",
                                                "icon": "periodo.png"
                                            }
                                        ]  
                                    },
                                    {
                                        "text": "CONCLUÍDO",
                                        "id": "001-04-1D",
                                        "alias": "concluido",
                                        "icon": "servico.png",
                                        "subitem": [
                                            {
                                                "text": "DIA",
                                                "id": "001-04-1D1",
                                                "icon": "dia.png"
                                            },
                                            {
                                                "text": "SEMANA",
                                                "id": "001-04-1D2",
                                                "icon": "semana.png"
                                            },
                                            {
                                                "text": "MÊS",
                                                "id": "001-04-1D3",
                                                "icon": "mes.png"
                                            },
                                            {
                                                "text": "PERÍODO",
                                                "id": "001-04-1D4",
                                                "icon": "periodo.png"
                                            }
                                        ]  
                                    },
                                    {
                                        "text": "HISTÓRICO",
                                        "id": "001-04-1E",
                                        "alias": "historico",
                                        "icon": "servico.png",
                                        "subitem": [
                                            {
                                                "text": "DIA",
                                                "id": "001-04-1E1",
                                                "icon": "dia.png"
                                            },
                                            {
                                                "text": "SEMANA",
                                                "id": "001-04-1E2",
                                                "icon": "semana.png"
                                            },
                                            {
                                                "text": "MÊS",
                                                "id": "001-04-1E3",
                                                "icon": "mes.png"
                                            },
                                            {
                                                "text": "PERÍODO",
                                                "id": "001-04-1E4",
                                                "icon": "periodo.png"
                                            }
                                        ]  
                                    }
                                ],
                                "child": "site"
                            }
                        ],
                        "enable": false,
                        "visible": false
                    }, 
                    {
                        "id": "001-05",
                        "text": "Reserva de Área",
                        "link": "./controle/reserva-area-controle",
                        "treeview": [
                            {
                                "id": "001-05-1",
                                "text": "RESERVA DE ÁREA",
                                "alias": "reserva-area",
                                "item": [
                                    {
                                        "text": "SOLICITADA",
                                        "id": "001-05-1A",
                                        "icon": "agenda.png"
                                    },
                                    {
                                        "text": "APROVADA",
                                        "id": "001-05-1B",
                                        "alias": "aprovada",
                                        "icon": "agenda.png",
                                        "subitem": [
                                            {
                                                "text": "DIA",
                                                "id": "001-05-1B1",
                                                "icon": "dia.png"
                                            },
                                            {
                                                "text": "SEMANA",
                                                "id": "001-05-1B2",
                                                "icon": "semana.png"
                                            },
                                            {
                                                "text": "MÊS",
                                                "id": "001-05-1B3",
                                                "icon": "mes.png"
                                            },
                                            {
                                                "text": "PERÍODO",
                                                "id": "001-05-1B4",
                                                "icon": "periodo.png"
                                            }
                                        ]  
                                    },
                                    {
                                        "text": "REPROVADA",
                                        "id": "001-05-1C",
                                        "alias": "reprovada",
                                        "icon": "agenda.png",
                                        "subitem": [
                                            {
                                                "text": "DIA",
                                                "id": "001-05-1C1",
                                                "icon": "dia.png"
                                            },
                                            {
                                                "text": "SEMANA",
                                                "id": "001-05-1C2",
                                                "icon": "semana.png"
                                            },
                                            {
                                                "text": "MÊS",
                                                "id": "001-05-1C3",
                                                "icon": "mes.png"
                                            },
                                            {
                                                "text": "PERÍODO",
                                                "id": "001-05-1C4",
                                                "icon": "periodo.png"
                                            }
                                        ]  
                                    },
                                    {
                                        "text": "CANCELADA",
                                        "id": "001-05-1D",
                                        "alias": "cancelada",
                                        "icon": "agenda.png",
                                        "subitem": [
                                            {
                                                "text": "DIA",
                                                "id": "001-05-1D1",
                                                "icon": "dia.png"
                                            },
                                            {
                                                "text": "SEMANA",
                                                "id": "001-05-1D2",
                                                "icon": "semana.png"
                                            },
                                            {
                                                "text": "MÊS",
                                                "id": "001-05-1D3",
                                                "icon": "mes.png"
                                            },
                                            {
                                                "text": "PERÍODO",
                                                "id": "001-05-1D4",
                                                "icon": "periodo.png"
                                            }
                                        ]  
                                    },
                                    {
                                        "text": "HISTÓRICO",
                                        "id": "001-05-1E",
                                        "alias": "historico",
                                        "icon": "agenda.png",
                                        "subitem": [
                                            {
                                                "text": "DIA",
                                                "id": "001-05-1E1",
                                                "icon": "dia.png"
                                            },
                                            {
                                                "text": "SEMANA",
                                                "id": "001-05-1E2",
                                                "icon": "semana.png"
                                            },
                                            {
                                                "text": "MÊS",
                                                "id": "001-05-1E3",
                                                "icon": "mes.png"
                                            },
                                            {
                                                "text": "PERÍODO",
                                                "id": "001-05-1E4",
                                                "icon": "periodo.png"
                                            }
                                        ]  
                                    }
                                ],
                                "child": "site"
                            }
                        ],
                        "enable": false,
                        "visible": false
                    }, 
                    {
                        "id": "001-06",
                        "text": "Movimentação de Ativo",
                        "link": "./controle/movimentacao-ativo-controle",
                        "treeview": [
                            {
                                "id": "001-06-1",
                                "text": "MOVIMENTAÇÃO DE ATIVO",
                                "alias": "movimentacao-ativo",
                                "item": [
                                    {
                                        "text": "SOLICITADO",
                                        "id": "001-06-1A",
                                        "icon": "ativo.png"
                                    },
                                    {
                                        "text": "EM USO",
                                        "id": "001-06-1B",
                                        "icon": "ativo.png"
                                    },
                                    {
                                        "text": "PENDENTE",
                                        "id": "001-06-1C",
                                        "icon": "ativo.png"
                                    },
                                    {
                                        "text": "RESERVADO",
                                        "id": "001-06-1D",
                                        "icon": "ativo.png"
                                    },
                                    {
                                        "text": "CANCELADO",
                                        "id": "001-06-1E",
                                        "alias": "cancelado",
                                        "icon": "ativo.png",
                                        "subitem": [
                                            {
                                                "text": "DIA",
                                                "id": "001-06-1E1",
                                                "icon": "dia.png"
                                            },
                                            {
                                                "text": "SEMANA",
                                                "id": "001-06-1E2",
                                                "icon": "semana.png"
                                            },
                                            {
                                                "text": "MÊS",
                                                "id": "001-06-1E3",
                                                "icon": "mes.png"
                                            },
                                            {
                                                "text": "PERÍODO",
                                                "id": "001-06-1E4",
                                                "icon": "periodo.png"
                                            }
                                        ]  
                                    },
                                    {
                                        "text": "DEVOLVIDO",
                                        "id": "001-06-1F",
                                        "alias": "devolvido",
                                        "icon": "ativo.png",
                                        "subitem": [
                                            {
                                                "text": "DIA",
                                                "id": "001-06-1F1",
                                                "icon": "dia.png"
                                            },
                                            {
                                                "text": "SEMANA",
                                                "id": "001-06-1F2",
                                                "icon": "semana.png"
                                            },
                                            {
                                                "text": "MÊS",
                                                "id": "001-06-1F3",
                                                "icon": "mes.png"
                                            },
                                            {
                                                "text": "PERÍODO",
                                                "id": "001-06-1F4",
                                                "icon": "periodo.png"
                                            }
                                        ]  
                                    },
                                    {
                                        "text": "EXTRAVIADO",
                                        "id": "001-06-1G",
                                        "alias": "extraviado",
                                        "icon": "ativo.png",
                                        "subitem": [
                                            {
                                                "text": "DIA",
                                                "id": "001-06-1G1",
                                                "icon": "dia.png"
                                            },
                                            {
                                                "text": "SEMANA",
                                                "id": "001-06-1G2",
                                                "icon": "semana.png"
                                            },
                                            {
                                                "text": "MÊS",
                                                "id": "001-06-1G3",
                                                "icon": "mes.png"
                                            },
                                            {
                                                "text": "PERÍODO",
                                                "id": "001-06-1G4",
                                                "icon": "periodo.png"
                                            }
                                        ]  
                                    },
                                    {
                                        "text": "HISTÓRICO",
                                        "id": "001-06-1H",
                                        "alias": "historico",
                                        "icon": "ativo.png",
                                        "subitem": [
                                            {
                                                "text": "DIA",
                                                "id": "001-06-1H1",
                                                "icon": "dia.png"
                                            },
                                            {
                                                "text": "SEMANA",
                                                "id": "001-06-1H2",
                                                "icon": "semana.png"
                                            },
                                            {
                                                "text": "MÊS",
                                                "id": "001-06-1H3",
                                                "icon": "mes.png"
                                            },
                                            {
                                                "text": "PERÍODO",
                                                "id": "001-06-1H4",
                                                "icon": "periodo.png"
                                            }
                                        ]  
                                    }
                                ],
                                "child": "site"
                            }
                        ],
                        "enable": false,
                        "visible": false
                    }, 
                    {
                        "id": "001-07",
                        "text": "Achados e Perdidos",
                        "link": "",
                        "treeview": [
                            {
                                "id": "001-07-1",
                                "text": "ACHADOS E PERDIDOS",
                                "alias": "achados-perdidos",
                                "item": [
                                    {
                                        "text": "ENTRADA",
                                        "id": "001-07-1A",
                                        "alias": "entrada",
                                        "icon": "achados-perdidos.png",
                                        "subitem": [
                                            {
                                                "text": "DIA",
                                                "id": "001-07-1A1",
                                                "icon": "dia.png"
                                            },
                                            {
                                                "text": "SEMANA",
                                                "id": "001-07-1A2",
                                                "icon": "semana.png"
                                            },
                                            {
                                                "text": "MÊS",
                                                "id": "001-07-1A3",
                                                "icon": "mes.png"
                                            },
                                            {
                                                "text": "PERÍODO",
                                                "id": "001-07-1A4",
                                                "icon": "periodo.png"
                                            }
                                        ]  
                                    },
                                    {
                                        "text": "SAÍDA",
                                        "id": "001-07-1B",
                                        "alias": "saida",
                                        "icon": "achados-perdidos.png",
                                        "subitem": [
                                            {
                                                "text": "DIA",
                                                "id": "001-07-1B1",
                                                "icon": "dia.png"
                                            },
                                            {
                                                "text": "SEMANA",
                                                "id": "001-07-1B2",
                                                "icon": "semana.png"
                                            },
                                            {
                                                "text": "MÊS",
                                                "id": "001-07-1B3",
                                                "icon": "mes.png"
                                            },
                                            {
                                                "text": "PERÍODO",
                                                "id": "001-07-1B4",
                                                "icon": "periodo.png"
                                            }
                                        ]  
                                    },
                                    {
                                        "text": "NOTIFICAÇÃO",
                                        "id": "001-07-1C",
                                        "alias": "notificacao",
                                        "icon": "achados-perdidos.png",
                                        "subitem": [
                                            {
                                                "text": "DIA",
                                                "id": "001-07-1C1",
                                                "icon": "dia.png"
                                            },
                                            {
                                                "text": "SEMANA",
                                                "id": "001-07-1C2",
                                                "icon": "semana.png"
                                            },
                                            {
                                                "text": "MÊS",
                                                "id": "001-07-1C3",
                                                "icon": "mes.png"
                                            },
                                            {
                                                "text": "PERÍODO",
                                                "id": "001-07-1C4",
                                                "icon": "periodo.png"
                                            }
                                        ]  
                                    },
                                    {
                                        "text": "HISTÓRICO",
                                        "id": "001-07-1D",
                                        "alias": "historico",
                                        "icon": "achados-perdidos.png",
                                        "subitem": [
                                            {
                                                "text": "DIA",
                                                "id": "001-07-1D1",
                                                "icon": "dia.png"
                                            },
                                            {
                                                "text": "SEMANA",
                                                "id": "001-07-1D2",
                                                "icon": "semana.png"
                                            },
                                            {
                                                "text": "MÊS",
                                                "id": "001-07-1D3",
                                                "icon": "mes.png"
                                            },
                                            {
                                                "text": "PERÍODO",
                                                "id": "001-07-1D4",
                                                "icon": "periodo.png"
                                            }
                                        ]  
                                    }
                                ],
                                "child": "site"
                            }
                        ],
                        "enable": false,
                        "visible": false
                    }
                ],
                "enable": true,
                "visible": true,
                "icon": {"file": "controle.svg", "width": "15px"},
                "child": "organizacao"
            },
            {
                "id": "3tYVar+PSk",
                "menu": "COMUNICAÇÃO",
                "alias": "comunicacao",
                "submenu": [
                    {
                        "id": "002-01",
                        "text": "Mensagem",
                        "link": "./comunicacao/mensagem",
                        "treeview":[
                            {
                                "text": "MENSAGEM",
                                "id": "002-01-1",
                                "alias": "mensagem",
                                "item": [
                                    {
                                        "text": "ABERTA",
                                        "id": "002-01-1A",
                                        "icon": "mensagem.png"
                                    },
                                    {
                                        "text": "ARQUIVADA",
                                        "id": "002-01-1B",
                                        "alias": "arquivada",
                                        "icon": "mensagem.png",
                                        "subitem": [
                                            {
                                                "id": "002-01-1B1",
                                                "text": "DIA",
                                                "icon": "dia.png"
                                            },
                                            {
                                                "id": "002-01-1B2",
                                                "text": "SEMANA",
                                                "icon": "semana.png"
                                            },
                                            {
                                                "id": "002-01-1B3",
                                                "text": "MÊS",
                                                "icon": "mes.png"
                                            },
                                            {
                                                "id": "002-01-1B4",
                                                "text": "PERÍODO",
                                                "icon": "periodo.png"
                                            }
                                        ]                                
                                    }
                                ],
                                "child": "site"
                            }
                        ],
                        "enable": false,
                        "visible": false
                    }, 
                    {
                        "id": "002-02",
                        "text": "Comunicado",
                        "link": "./comunicacao/comunicado",
                        "treeview":
                        [
                            {
                                "id": "002-02-1", 
                                "text": "COMUNICADO",
                                "alias": "comunicado",
                                "child": "site"
                            }
                        ],
                        "enable": false,
                        "visible": false
                    },
                    {
                        "id": "002-03",
                        "text": "Contato",
                        "link": "./comunicacao/contato",
                        "treeview":[
                            {
                                "id": "002-03-1",
                                "text": "CONTATO",
                                "alias": "contato",
                                "item": [
                                    {
                                        "id": "002-03-1A",
                                        "text": "EMERGÊNCIA",
                                        "icon": "emergencia.png"
                                    },
                                    {
                                        "id": "002-03-2B",
                                        "text": "LISTA",
                                        "icon": "lista.png"
                                    },
                                    {
                                        "id": "002-03-3C",
                                        "text": "ENTIDADE",
                                        "icon": "entidade.png"
                                    },
                                    {
                                        "id": "002-03-4D",
                                        "text": "PESQUISAR",
                                        "icon": "pesquisar.png"
                                    }
                                ],
                                "child": "site"
                            }
                        ],
                        "enable": false,
                        "visible": false
                    },

                    {
                        "id": "evx+DEwN15",
                        "text": "Contato",
                        "link": "./comunicacao/contato",
                        "treeview": [
                            {
                                "id": "kveP93gr5U",
                                "text": "CONTATO",
                                "alias": "contato",
                                "child": "site",
                                "operation": 
                                [
                                    {
                                        "id": 0,
                                        "text": "forms.buttons.create"
                                    },
                                    {
                                        "id": 1,
                                        "text": "forms.buttons.update"
                                    },
                                    {
                                        "id": 2,
                                        "text": "forms.buttons.delete"
                                    },
                                    {
                                        "id": 3,
                                        "text": "forms.buttons.read"
                                    }
                                ]
                            }
                        ],
                        "enable": true,
                        "visible": true
                    },
                ],
                "enable": true,
                "visible": true,
                "icon": {"file": "comunicacao.svg", "width": "20px"},
                "child": "organizacao"
            },
            {
                "id": "003",
                "menu": "SUPERVISÃO",
                "alias": "supervisao",
                "submenu": [
                    {
                        "id": "003-01",
                        "text": "Evento",
                        "link": "./supervisao/evento",
                        "treeview":[
                            {
                                "id": "003-01-1",
                                "text": "Evento",
                                "alias": "evento",
                                "item": [
                                    {
                                        "text": "ALARME",
                                        "id": "003-01-1A",
                                        "icon": "alarme.png",
                                        "link": "./supervisao/evento/alarme"
                                    },
                                    {
                                        "text": "ACESSO",
                                        "id": "003-01-1B",
                                        "icon": "acesso.png",
                                        "link": "./supervisao/evento/acesso"
                                    },
                                    {
                                        "text": "IDENTIFICAÇÃO",
                                        "id": "003-01-1C",
                                        "icon": "identificacao.png",
                                        "link": "./supervisao/evento/identificacao"
                                    },
                                    {
                                        "text": "EXPEDIÇÃO",
                                        "id": "003-01-1D",
                                        "icon": "expedicao.png",
                                        "link": "./supervisao/evento/expedicao"
                                    },
                                    {
                                        "text": "OCORRÊNCIA",
                                        "id": "003-01-1E",
                                        "icon": "ocorrencia.png",
                                        "link": "./supervisao/evento/ocorrencia"
                                    },
                                    {
                                        "text": "SERVIÇO",
                                        "id": "003-01-1F",
                                        "icon": "servico.png",
                                        "link": "./supervisao/evento/servico"
                                    },
                                    {
                                        "text": "RESERVA DE ÁREA",
                                        "id": "003-01-1G",
                                        "icon": "reserva.png",
                                        "link": "./supervisao/evento/reserva"
                                    },
                                    {
                                        "text": "MOVIMENTAÇÃO ATIVO",
                                        "id": "003-01-1H",
                                        "icon": "ativo.png",
                                        "link": "./supervisao/evento/movimentacao-ativo"
                                    },
                                    {
                                        "text": "ACHADOS E PERDIDOS",
                                        "id": "003-01-1I",
                                        "icon": "achados-perdidos.png",
                                        "link": "./supervisao/evento/achados-perdidos"
                                    }
                                ],
                                "child": "site"
                            }
                        ],
                        "enable": false,
                        "visible": false
                    },
                    {
                        "id": "003-02",
                        "text": "Dispositivo",
                        "treeview":[
                            {
                                "id": "003-02-1",
                                "text": "DISPOSITIVO",
                                "alias": "dispositivo",
                                "item": [
                                    {
                                        "text": "CONCENTRADOR",
                                        "id": "003-02-1A",
                                        "icon": "concentrador.png",
                                        "link": "./supervisao/dispositivo/concentrador"
                                    },
                                    {
                                        "text": "CONTROLADORA",
                                        "id": "003-02-1B",
                                        "icon": "controladora.png",
                                        "link": "./supervisao/dispositivo/controladora"
                                    }
                                ],
                                "child": "site"
                            }
                        ],
                        "enable": false,
                        "visible": false
                    }, 
                    {
                        "id": "003-04",
                        "text": "Operador",
                        "link": "./supervisao/operador",
                        "treeview":[
                            {
                                "id": "003-04-1",
                                "text": "OPERADOR",
                                "alias": "operador",
                                "child": "site"
                            }
                        ],
                        "enable": false,
                        "visible": false
                    }, 
                    {
                        "id": "003-05",
                        "text": "Sinótico",
                        "link": "./supervisao/sinotico",
                        "treeview":[
                            {
                                "text": "SINÓTICO",
                                "id": "003-05-1",
                                "alias": "sinotico",
                                "child": "site"
                            }
                        ],
                        "enable": false,
                        "visible": false
                    }, 
                    {
                        "id": "003-06",
                        "text": "Visão Geral",
                        "link": "./supervisao/visao-geral",
                        "treeview":[
                            {
                                "id": "003-06-1",
                                "text": "VISÃO GERAL",
                                "alias": "visao-geral",
                                "child": "site"
                            }
                        ],
                        "enable": false,
                        "visible": false
                    }
                ],
                "enable": false,
                "visible": false,
                "icon": {"file": "supervisao.svg", "width": "20px"},
                "child": "organizacao"
            },
            {
                "id": "MMIWt5X9BE",
                "menu": "GESTÃO",
                "alias": "gestao",
                "submenu": [
                    {
                        "id": "PpV5Cj+C00",
                        "text": "Identificação",
                        "link": "./gestao/identificacao",
                        "treeview":[
                            {
                                "id": "2tCZ15M35k",
                                "text": "IDENTIFICAÇÃO",
                                "alias": "identificacao",
                                "item": [
                                    // {
                                    //     "id": "tQ4JtewO_0",
                                    //     "text": "VISÃO GERAL",
                                    //     "alias": "visaoGeral",
                                    //     "icon": "visaoGeral.svg",
                                    //     "isFunction": false,
                                    // },
                                    {
                                        "id": "icLBcB_IKU",
                                        "text": "RELATÓRIO",
                                        "alias": "relatorio",
                                        "icon": "relatorio.svg",
                                        "subitem": [
                                            {
                                                "id": "jr4lCO2Oc0",
                                                "text": "VIGENTE",
                                                "icon": "identificacao.svg",
                                            },
                                            {
                                                "id": "Vz3eGqB+xk",
                                                "text": "EXPIRADA",
                                                "icon": "identificacao.svg",
                                            },
                                            {
                                                "id": "QRDlsnoUrk",
                                                "text": "SUSPENSA",
                                                "icon": "identificacao.svg",
                                            },
                                            {
                                                "id": "3IICDLaBZU",
                                                "text": "PROVISÓRIA",
                                                "icon": "identificacao.svg",
                                            },
                                            {
                                                "id": "Zl7IgvPOpk",
                                                "text": "CANCELADA",
                                                "icon": "identificacao.svg",
                                            },
                                            {
                                                "id": "qZTQiqA8/U",
                                                "text": "EXCERRADA",
                                                "icon": "identificacao.svg",
                                            },
                                            {
                                                "id": "Yw9zuvFZJU",
                                                "text": "HISTÓRICO",
                                                "icon": "identificacao.svg",
                                            },

                                            // {
                                            //     "id": "tdKEBbLdd0",
                                            //     "text": "CONSOLIDADO",
                                            //     "icon": "relatorioLista.svg"
                                            // },
                                            // {
                                            //     "id": "5mAnxkwkek",
                                            //     "text": "GRÁFICO",
                                            //     "icon": "relatorioLista.svg",
                                            // }
                                        ]
                                    },
                                ],
                                "operation":
                                [
                                    {
                                        "id": 0,
                                        "text": "forms.buttons.issue"
                                    }
                                ],
                                "child": "site"
                            }
                        ],
                        "enable": true,
                        "visible": true
                    }, 
                    {
                        "id": "ee952a2961",
                        "text": "Cadastro",
                        "link": "./gestao/usuario",
                        "treeview":[
                            {
                                "id": "b6754dX813",
                                "text": "CADASTRO",
                                "alias": "gestaoUsuario",
                                "item": [
                                    {
                                        "id": "94a6780ceb",
                                        "text": "PESSOA INTERNA",
                                        "alias": "usuarioPessoaInterna",
                                        "icon": "usuario.svg",
                                        "subitem": [
                                            {
                                                "id": "aTk7oF27Kk",
                                                "text": "RELATÓRIO",
                                                "icon": "relatorioLista.svg",
                                            },
                                        ]
                                    },
                                    {
                                        "id": "hDLL7Hf6GU",
                                        "text": "PESSOA EXTERNA",
                                        "alias": "usuarioPessoaExterna",
                                        "icon": "usuario.svg",
                                        "subitem": [
                                            {
                                                "id": "dhQ7RXRECE",
                                                "text": "RELATÓRIO",
                                                "icon": "relatorioLista.svg",
                                            },
                                        ]
                                    },
                                    {
                                        "id": "hDLDeN1s6GU",
                                        "text": "VEÍCULO INTERNO",
                                        "alias": "usuarioVeiculoInterno",
                                        "icon": "veiculo.svg",
                                        "subitem": [
                                            {
                                                "id": "dhdns1DF249",
                                                "text": "RELATÓRIO",
                                                "icon": "relatorioLista.svg",
                                            },
                                        ]
                                    },
                                    {
                                        "id": "dN1A8us6GU",
                                        "text": "VEÍCULO EXTERNO",
                                        "alias": "usuarioVeiculoExterno",
                                        "icon": "veiculo.svg",
                                        "subitem": [
                                            {
                                                "id": "qfOlj897JnmE",
                                                "text": "RELATÓRIO",
                                                "icon": "relatorioLista.svg",
                                            },
                                        ]
                                    },
                                    {
                                        "id": "ud1s61GUNA8",
                                        "text": "EMPRESA",
                                        "alias": "reparticaoEmpresa",
                                        "icon": "reparticao.svg",
                                        "subitem": [
                                            {
                                                "id": "JnmEqf97Olj8",
                                                "text": "RELATÓRIO",
                                                "icon": "relatorioLista.svg",
                                            },
                                        ]
                                    },
                                    {
                                        "id": "34Etg7mpER435",
                                        "text": "ÁREA",
                                        "alias": "reparticaoArea",
                                        "icon": "reparticao.svg",
                                        "subitem": [
                                            {
                                                "id": "UhKoPL67FvW3",
                                                "text": "RELATÓRIO",
                                                "icon": "relatorioLista.svg",
                                            },
                                        ]
                                    },
                                    {
                                        "id": "Au903MzwDFp23",
                                        "text": "ESTACIONAMENTO",
                                        "alias": "reparticaoEstacionamentoVaga",
                                        "icon": "reparticao.svg",
                                        "subitem": [
                                            {
                                                "id": "Q45wer2QnMnOP8",
                                                "text": "RELATÓRIO",
                                                "icon": "relatorioLista.svg",
                                            },
                                        ]
                                    },
                                    {
                                        "id": "De903N1sEpq45",
                                        "text": "NÍVEL DE ACESSO",
                                        "alias": "concessaoNivelAcesso",
                                        "icon": "concessao.svg",
                                        "subitem": [
                                            {
                                                "id": "dert123WPm12AA",
                                                "text": "RELATÓRIO",
                                                "icon": "relatorioLista.svg",
                                            },
                                        ]
                                    },
                                ],
                                "operation":
                                [
                                    {
                                        "id": 0,
                                        "text": "forms.buttons.issue"
                                    }
                                ],
                                "child": "site"
                            }
                        ],
                        "enable": true,
                        "visible": true
                    }, 
                    {
                        "id": "+UX84H4YLk",
                        "text": "Identificador",
                        "link": "./gestao/identificador",
                        "treeview":[
                            {
                                "id": "YlzE69Y9YE",
                                "text": "IDENTIFICADOR",
                                "alias": "identificador",
                                "item": [
                                    {
                                        "id": "ORAymobVn0",
                                        "text": "RELATÓRIO",
                                        "alias": "relatorio",
                                        "icon": "relatorio.svg",
                                        "subitem": [
                                            {
                                                "id": "hlF3ip+/ik",
                                                "text": "SIMPLES",
                                                "icon": "relatorioLista.svg",
                                            },
                                        ]
                                    },
                                ],
                                "operation":
                                [
                                    {
                                        "id": 0,
                                        "text": "forms.buttons.issue"
                                    }
                                ],
                                "child": "organizacao"
                            }
                        ],
                        "enable": true,
                        "visible": true
                    }, 
                    {
                        "id": "tIZh3Yk23U",
                        "text": "Área",
                        "link": "./gestao/area",
                        "treeview":[
                            {
                                "id": "dXQEhVZIv0",
                                "text": "ÁREA",
                                "alias": "area",
                                "item": [
                                    {
                                        "id": "P0RKNwbJAE",
                                        "text": "RELATÓRIO",
                                        "alias": "relatorio",
                                        "icon": "relatorio.svg",
                                        "subitem": [
                                            {
                                                "id": "uCEJ0FlNIk",
                                                "text": "SIMPLES",
                                                "icon": "relatorioLista.svg",
                                            },
                                        ]
                                    },
                                ],
                                "operation":
                                [
                                    {
                                        "id": 0,
                                        "text": "forms.buttons.issue"
                                    }
                                ],
                                "child": "organizacao"
                            }
                        ],
                        "enable": true,
                        "visible": true
                    }, 
                    {
                        "id": "8f4z//ddxk",
                        "text": "Acesso",
                        "link": "./gestao/acesso",
                        "treeview":[
                            {
                                "id": "8IVsyXLfck",
                                "text": "ACESSO",
                                "alias": "acesso",
                                "item": [
                                    {
                                        "id": "C0CAQPfESk",
                                        "text": "RELATÓRIO",
                                        "alias": "relatorio",
                                        "icon": "relatorio.svg",
                                        "subitem": [
                                            {
                                                "id": "6djB2mPVd0",
                                                "text": "SIMPLES",
                                                "icon": "relatorioLista.svg",
                                            },
                                            {
                                                "id": "C8r6Dq28o0",
                                                "text": "AGRUPADO",
                                                "icon": "relatorioLista.svg",
                                            },
                                        ]
                                    },
                                ],
                                "operation":
                                [
                                    {
                                        "id": 0,
                                        "text": "forms.buttons.issue"
                                    }
                                ],
                                "child": "organizacao"
                            }
                        ],
                        "enable": true,
                        "visible": true
                    }, 
                    {
                        "id": "y0RDFlyLLU",
                        "text": "Operação",
                        "link": "./gestao/operacao",
                        "treeview":[
                            {
                                "id": "9lg1QiVWZ0",
                                "text": "OPERAÇÃO",
                                "alias": "operacao",
                                "item": [
                                    {
                                        "id": "qXbVCvsjZk",
                                        "text": "RELATÓRIO",
                                        "alias": "relatorio",
                                        "icon": "relatorio.svg",
                                    },
                                ],
                                "operation":
                                [
                                    {
                                        "id": 0,
                                        "text": "forms.buttons.issue"
                                    }
                                ],
                                "child": "site"
                            }
                        ],
                        "enable": true,
                        "visible": true
                    }, 
                    {
                        "id": "5jzEiE5Vh0",
                        "text": "Sistema",
                        "link": "./gestao/sistema",
                        "treeview":[
                            {
                                "id": "tc+IK/WJjE",
                                "text": "SISTEMA",
                                "alias": "sistema",
                                "item": [
                                    {
                                        "id": "lweWZyiucE",
                                        "text": "RELATÓRIO",
                                        "alias": "relatorio",
                                        "icon": "relatorio.svg",
                                    },
                                ],
                                "operation":
                                [
                                    {
                                        "id": 0,
                                        "text": "forms.buttons.issue"
                                    }
                                ],
                                "child": "site"
                            }
                        ],
                        "enable": true,
                        "visible": true
                    }
                ],
                "enable": true,
                "visible": true,
                "icon": {"file": "gestao.svg", "width": "15px"},
                "child": "organizacao",
            },
            {
                "id": "005",
                "menu": "FERRAMENTA",
                "alias": "ferramenta",
                "submenu": [
                    {
                        "id": "005-01",
                        "text": "Importação",
                        "treeview":[
                            {
                                "id": "005-01-1",
                                "text": "IMPORTAÇÃO",
                                "alias": "importacao",
                                "item": [
                                    {
                                        "text": "PESSOA INTERNA",
                                        "id": "005-01-1A",
                                        "icon": "pessoa.png"
                                    },
                                    {
                                        "text": "VEÍCULO INTERNO",
                                        "id": "005-01-1B",
                                        "icon": "veiculo.png"
                                    },
                                    {
                                        "text": "AGENDA DE VISITA",
                                        "id": "005-01-1C",
                                        "icon": "agenda.png"
                                    }
                                ],
                                "child": "site"
                            }
                        ],
                        "enable": false,
                        "visible": false
                    }, 
                    {
                        "id": "005-02",
                        "text": "Editor de Crachá",
                        "treeview":[
                            {
                                "id": "005-02-1",
                                "text": "CRACHÁ",
                                "alias": "cracha",
                                "item": [
                                    {
                                        "text": "VISITANTE",
                                        "id": "005-02-1A",
                                        "alias": "visitante",
                                        "icon": "cracha.png",
                                        "link": "./ferramenta/editor-cracha/visitante",
                                        "subitem": [
                                            {
                                                "text": "TODOS OS DIAS",
                                                "id": "005-02-1A1",
                                                "icon": "agenda.png"
                                            },
                                            {
                                                "text": "SEGUNDA",
                                                "id": "005-02-1A2",
                                                "icon": "agenda.png"
                                            },
                                            {
                                                "text": "TERÇA",
                                                "id": "005-02-1A3",
                                                "icon": "agenda.png"
                                            },
                                            {
                                                "text": "QUARTA",
                                                "id": "005-02-1A4",
                                                "icon": "agenda.png"
                                            },
                                            {
                                                "text": "QUINTA",
                                                "id": "005-02-1A5",
                                                "icon": "agenda.png"
                                            },
                                            {
                                                "text": "SEXTA",
                                                "id": "005-02-1A6",
                                                "icon": "agenda.png"
                                            },
                                            {
                                                "text": "SÁBADO",
                                                "id": "005-02-1A7",
                                                "icon": "agenda.png"
                                            },
                                            {
                                                "text": "DOMINGO",
                                                "id": "005-02-1A8",
                                                "icon": "agenda.png"
                                            }                                                                                                                                                                                                                                                            
                                        ]
                                    },
                                    {
                                        "text": "PRESTADOR",
                                        "id": "005-02-1B",
                                        "alias": "prestador",
                                        "icon": "cracha.png",
                                        "link": "./ferramenta/editor-cracha/prestador",
                                        "subitem": [
                                            {
                                                "text": "TODOS OS DIAS",
                                                "id": "005-02-1B1",
                                                "icon": "agenda.png"
                                            },
                                            {
                                                "text": "SEGUNDA",
                                                "id": "005-02-1B2",
                                                "icon": "agenda.png"
                                            },
                                            {
                                                "text": "TERÇA",
                                                "id": "005-02-1B3",
                                                "icon": "agenda.png"
                                            },
                                            {
                                                "text": "QUARTA",
                                                "id": "005-02-1B4",
                                                "icon": "agenda.png"
                                            },
                                            {
                                                "text": "QUINTA",
                                                "id": "005-02-1B5",
                                                "icon": "agenda.png"
                                            },
                                            {
                                                "text": "SEXTA",
                                                "id": "005-02-1B6",
                                                "icon": "agenda.png"
                                            },
                                            {
                                                "text": "SÁBADO",
                                                "id": "005-02-1B7",
                                                "icon": "agenda.png"
                                            },
                                            {
                                                "text": "DOMINGO",
                                                "id": "005-02-1B8",
                                                "icon": "agenda.png"
                                            }                                                                                                                                                                                                                                                            
                                        ]
                                    },
                                    {
                                        "text": "PROVISÓSIO",
                                        "id": "005-02-1C",
                                        "alias": "provisorio",
                                        "icon": "cracha.png",
                                        "link": "./ferramenta/editor-cracha/provisorio",
                                        "subitem": [
                                            {
                                                "text": "TODOS OS DIAS",
                                                "id": "005-02-1C1",
                                                "icon": "agenda.png"
                                            },
                                            {
                                                "text": "SEGUNDA",
                                                "id": "005-02-1C2",
                                                "icon": "agenda.png"
                                            },
                                            {
                                                "text": "TERÇA",
                                                "id": "005-02-1C3",
                                                "icon": "agenda.png"
                                            },
                                            {
                                                "text": "QUARTA",
                                                "id": "005-02-1C4",
                                                "icon": "agenda.png"
                                            },
                                            {
                                                "text": "QUINTA",
                                                "id": "005-02-1C5",
                                                "icon": "agenda.png"
                                            },
                                            {
                                                "text": "SEXTA",
                                                "id": "005-02-1C6",
                                                "icon": "agenda.png"
                                            },
                                            {
                                                "text": "SÁBADO",
                                                "id": "005-02-1C7",
                                                "icon": "agenda.png"
                                            },
                                            {
                                                "text": "DOMINGO",
                                                "id": "005-02-1C8",
                                                "icon": "agenda.png"
                                            }                                                                                                                                                                                                                                                            
                                        ]
                                    },
                                    {
                                        "text": "INTERNO",
                                        "id": "005-02-1D",
                                        "link": "./ferramenta/editor-cracha/interno",
                                        "icon": "cracha.png"
                                    }                            
                                ],
                                "child": "site"
                            }                    
                        ],
                        "enable": false,
                        "visible": false
                    }, 
                    {
                        "id": "005-03",
                        "text": "Editor de Sinótico",
                        "link": "./ferramenta/editor-sinotico",
                        "treeview":[
                            {
                                "id": "005-03-1",
                                "text": "SINÓTICO",
                                "alias": "sinotico",
                                "child": "site"
                            }                    
                        ],
                        "enable": false,
                        "visible": false
                    }, 
                    {
                        "id": "005-04",
                        "text": "Manutenção",
                        "treeview":[
                            {
                                "id": "005-04-1",
                                "text": "MANUTENÇÃO",
                                "alias": "manutencao",
                                "item": [
                                    {
                                        "text": "SOFTWARE",
                                        "id": "005-04-1A",
                                        "icon": "software.png"
                                    },
                                    {
                                        "text": "BANCO DE DADOS",
                                        "id": "005-04-1B",
                                        "alias": "banco-dados",
                                        "icon": "banco-dados.png",
                                        "subitem": [
                                            {
                                                "text": "BACKUP",
                                                "id": "005-04-1B1",
                                                "icon": "backup.png"
                                            },
                                            {
                                                "text": "LIMPEZA",
                                                "id": "005-04-1B2",
                                                "icon": "limpeza.png"
                                            }
                                        ]
        
                                    }                            
                                ],
                                "child": "site"
                            }                    
                        ],
                        "enable": false,
                        "visible": false
                    }
                ],
                "enable": false,
                "visible": false,
                "icon": {"file": "ferramenta.svg", "width": "15px"},
                "child": "organizacao"
            },
            {
                "id": "TgY1p2jn9E",
                "menu": "USUÁRIO",
                "alias": "usuario",
                "submenu": [
                    {
                        "id": "006-01",
                        "text": "Averiguação",
                        "treeview":[
                            {
                                "id": "006-01-1",
                                "text": "UNIDADE",
                                "alias": "averiguacao",
                                "item": [
                                    {
                                        "text": "BLOCO 1",
                                        "id": "006-01-1A",
                                        "alias": "bloco-1",
                                        "icon": "bloco.png",
                                        "subitem": [
                                            {
                                                "text": "APTO 11",
                                                "id": "006-01-1A1",
                                                "icon": "apto.png"
                                            },
                                            {
                                                "text": "APTO 12",
                                                "id": "006-01-1A2",
                                                "icon": "apto.png"
                                            },
                                            {
                                                "text": "APTO 13",
                                                "id": "006-01-1A3",
                                                "icon": "apto.png"
                                            },
                                            {
                                                "text": "APTO 14",
                                                "id": "006-01-1A4",
                                                "icon": "apto.png"
                                            }
                                        ]
                                    },
                                    {
                                        "text": "BLOCO 2",
                                        "id": "006-01-1B",
                                        "alias": "bloco-2",
                                        "icon": "bloco.png",
                                        "subitem": [
                                            {
                                                "text": "APTO 11",
                                                "id": "006-01-1B1",
                                                "icon": "apto.png"
                                            },
                                            {
                                                "text": "APTO 12",
                                                "id": "006-01-1B2",
                                                "icon": "apto.png"
                                            },
                                            {
                                                "text": "APTO 13",
                                                "id": "006-01-1B3",
                                                "icon": "apto.png"
                                            },
                                            {
                                                "text": "APTO 14",
                                                "id": "006-01-1B4",
                                                "icon": "apto.png"
                                            }
                                        ]                                
                                    },
                                    {
                                        "text": "BLOCO 3",
                                        "id": "006-01-1C",
                                        "alias": "bloco-3",
                                        "icon": "bloco.png",
                                        "subitem": [
                                            {
                                                "text": "APTO 11",
                                                "id": "006-01-1C1",
                                                "icon": "apto.png"
                                            },
                                            {
                                                "text": "APTO 12",
                                                "id": "006-01-1C2",
                                                "icon": "apto.png"
                                            },
                                            {
                                                "text": "APTO 13",
                                                "id": "006-01-1C3",
                                                "icon": "apto.png"
                                            },
                                            {
                                                "text": "APTO 14",
                                                "id": "006-01-1C4",
                                                "icon": "apto.png"
                                            }
                                        ]                                
                                    },
                                    {
                                        "text": "BLOCO 4",
                                        "id": "006-01-1D",
                                        "alias": "bloco-4",
                                        "icon": "bloco.png",
                                        "subitem": [
                                            {
                                                "text": "APTO 11",
                                                "id": "006-01-1D1",
                                                "icon": "apto.png"
                                            },
                                            {
                                                "text": "APTO 12",
                                                "id": "006-01-1D2",
                                                "icon": "apto.png"
                                            },
                                            {
                                                "text": "APTO 13",
                                                "id": "006-01-1D3",
                                                "icon": "apto.png"
                                            },
                                            {
                                                "text": "APTO 14",
                                                "id": "006-01-1D4",
                                                "icon": "apto.png"
                                            }
                                        ]                                
                                    }
                                ],
                                "child": "site"
                            },
                            {
                                "id": "006-01-2",
                                "text": "ESTACIONAMENTO",
                                "alias": "averiguacao",
                                "item": [
                                    {
                                        "text": "EST. FUNCIONÁRIO",
                                        "id": "006-01-2A",
                                        "icon": "estacionamento.png"
                                    },
                                    {
                                        "text": "EST. VISITANTE",
                                        "id": "006-01-2B",
                                        "icon": "estacionamento.png"
                                    },
                                    {
                                        "text": "EST. VIP",
                                        "id": "006-01-2C",
                                        "icon": "estacionamento.png"
                                    }
                                ],
                                "child": "site"
                            }
                        ],
                        "enable": false,
                        "visible": false
                    }, 
                    {
                        "id": "9SgcWSw/4k",
                        "text": "Cadastro de Pessoa",
                        "link": "./usuario/pessoaInterna",
                        "treeview":[
                            {
                                "id": "18af4e@cb3",
                                "text": "PESSOA INTERNA",
                                "alias": "cadastro-pessoa",
                                "link": "./usuario/pessoaInterna",
                                "child": "site",
                                "operation": 
                                [
                                    {
                                        "id": 0,
                                        "text": "forms.buttons.create"
                                    },
                                    {
                                        "id": 1,
                                        "text": "forms.buttons.update"
                                    },
                                    {
                                        "id": 2,
                                        "text": "forms.buttons.delete"
                                    },
                                    {
                                        "id": 3,
                                        "text": "forms.buttons.read"
                                    }
                                ],
                                "dynamic": true,
                            },
                            {
                                "id": "ReHxovAsrk",
                                "text": "PESSOA EXTERNA",
                                "alias": "cadastro-pessoa",
                                "link": "./usuario/pessoaExterna",
                                "child": "organizacao",
                                "operation": 
                                [
                                    {
                                        "id": 0,
                                        "text": "forms.buttons.create"
                                    },
                                    {
                                        "id": 1,
                                        "text": "forms.buttons.update"
                                    },
                                    {
                                        "id": 2,
                                        "text": "forms.buttons.delete"
                                    },
                                    {
                                        "id": 3,
                                        "text": "forms.buttons.read"
                                    }
                                ]
                            }
                        ],
                        "enable": true,
                        "visible": true
                    }, 
                    {
                        "id": "006-03",
                        "text": "Cadastro de Veículo",
                        "link": "./usuario/veiculoInterno",
                        "treeview":[
                            {
                                "id": "006-03-1",
                                "text": "VEÍCULO INTERNO",
                                "alias": "cadastro-veiculo",
                                "link": "./usuario/veiculoInterno",
                                "child": "site",
                                "operation": 
                                [
                                    {
                                        "id": 0,
                                        "text": "forms.buttons.create"
                                    },
                                    {
                                        "id": 1,
                                        "text": "forms.buttons.update"
                                    },
                                    {
                                        "id": 2,
                                        "text": "forms.buttons.delete"
                                    },
                                    {
                                        "id": 3,
                                        "text": "forms.buttons.read"
                                    }
                                ],
                                "dynamic": true,
                            },
                            {
                                "id": "006-03-2",
                                "text": "VEÍCULO EXTERNO",
                                "alias": "cadastro-veiculo",
                                "link": "./usuario/veiculoExterno",
                                "child": "organizacao",
                                "operation": 
                                [
                                    {
                                        "id": 0,
                                        "text": "forms.buttons.create"
                                    },
                                    {
                                        "id": 1,
                                        "text": "forms.buttons.update"
                                    },
                                    {
                                        "id": 2,
                                        "text": "forms.buttons.delete"
                                    },
                                    {
                                        "id": 3,
                                        "text": "forms.buttons.read"
                                    }
                                ],
                                "dynamic": true,
                            }
                        ],
                        "enable": true,
                        "visible": true
                    }
                ],
                "enable": true,
                "visible": true,
                "icon": {"file": "usuario.svg", "width": "15px"},
                "child": "organizacao"
            },
            {
                "id": "FKUY9z6BA0",
                "menu": "CONCESSÃO",
                "alias": "concessao",
                "submenu": [
                    {
                        "id": "E8KRrIFdlk",
                        "text": "Cartão Rotativo",
                        "link": "./concessao/cartaoRotativo",
                        "treeview":[
                            {
                                "id": "YDBxnz9Wk",
                                "text": "CARTÃO ROTATIVO",
                                "alias": "cartaoRotativo",
                                "child": "site",
                                "operation": 
                                [
                                    {
                                        "id": 0,
                                        "text": "forms.buttons.create"
                                    },
                                    {
                                        "id": 1,
                                        "text": "forms.buttons.update"
                                    },
                                    {
                                        "id": 2,
                                        "text": "forms.buttons.delete"
                                    },
                                    {
                                        "id": 3,
                                        "text": "forms.buttons.read"
                                    }
                                ]
                            }
                        ],
                        "enable": true,
                        "visible": true,
                    }, 
                    {
                        "id": "FL3zpxGFXU",
                        "text": "Faixa Horária",
                        "link": "./concessao/faixa-horaria",
                        "treeview":[
                            {
                                "id": "pICmxG:nSE",
                                "text": "FAIXA HORÁRIA",
                                "alias": "faixa-horária",
                                "child": "organizacao",
                                "operation": 
                                [
                                    {
                                        "id": 0,
                                        "text": "forms.buttons.create"
                                    },
                                    {
                                        "id": 1,
                                        "text": "forms.buttons.update"
                                    },
                                    {
                                        "id": 2,
                                        "text": "forms.buttons.delete"
                                    },
                                    {
                                        "id": 3,
                                        "text": "forms.buttons.read"
                                    }
                                ],
                            }
                        ],
                        "enable": true,
                        "visible": true,
                    }, 
                    {
                        "id": "ba377cHd9a",
                        "text": "Feriado",
                        "link": "./concessao/feriado",
                        "treeview":[
                            {
                                "id": "XywM9H;9Tk",
                                "text": "FERIADO",
                                "alias": "feriado",
                                "child": "organizacao",
                                "operation": 
                                [
                                    {
                                        "id": 0,
                                        "text": "forms.buttons.create"
                                    },
                                    {
                                        "id": 1,
                                        "text": "forms.buttons.update"
                                    },
                                    {
                                        "id": 2,
                                        "text": "forms.buttons.delete"
                                    },
                                    {
                                        "id": 3,
                                        "text": "forms.buttons.read"
                                    }
                                ],
                            }
                        ],
                        "enable": true,
                        "visible": true,
                    },
                    {
                        "id": "ba377cHd9a",
                        "text": "Nível de Acesso",
                        "link": "./concessao/nivelAcesso",
                        "treeview":[
                            {
                                "id": "XywM9H;9Tk",
                                "text": "NÍVEL DE ACESSO",
                                "alias": "nivelAcesso",
                                "child": "organizacao",
                                "operation": 
                                [
                                    {
                                        "id": 0,
                                        "text": "forms.buttons.create"
                                    },
                                    {
                                        "id": 1,
                                        "text": "forms.buttons.update"
                                    },
                                    {
                                        "id": 2,
                                        "text": "forms.buttons.delete"
                                    },
                                    {
                                        "id": 3,
                                        "text": "forms.buttons.read"
                                    }
                                ],
                            }
                        ],
                        "enable": true,
                        "visible": true,
                    }, 
                ],
                "enable": true,
                "visible": true,
                "icon": {"file": "concessao.svg", "width": "15px"},
                "child": "organizacao",
            },
            {
                "id": "V7MRIzX8lE",
                "menu": "DISPOSITIVO",
                "alias": "dispositivo",
                "submenu": [
                    {
                        "id": "KQPNqZPnyU",
                        "text": "Ativo",
                        "treeview":[
                                {
                                    "id": "biWfzT3+Ck",
                                    "text": "ATIVO",
                                    "alias": "ativo",
                                    "item": [
                                        {
                                            "text": "EQUIPAMENTO",
                                            "id": "008-01-1A",
                                            "icon": "equipamento.png"
                                        },
                                        {
                                            "text": "INSTALAÇÃO",
                                            "id": "008-01-1B",
                                            "icon": "instalacao.png"
                                        }
                                    ],
                                    "child": "site"
                                }
                            ],
                            "enable": false,
                            "visible": false
                        }, 
                    {
                        "id": "Wc/mNK2UmU",
                        "text": "Bloqueio",
                        "link": "./dispositivo/bloqueio-dispositivo",
                        "treeview":[
                            {
                                "id": "DVODbg4djk",
                                "text": "BLOQUEIO",
                                "alias": "bloqueio",
                                "child": "site",
                                "operation": 
                                [
                                    {
                                        "id": 0,
                                        "text": "forms.buttons.create"
                                    },
                                    {
                                        "id": 1,
                                        "text": "forms.buttons.update"
                                    },
                                    {
                                        "id": 2,
                                        "text": "forms.buttons.delete"
                                    },
                                    {
                                        "id": 3,
                                        "text": "forms.buttons.read"
                                    }
                                ],
                            }
                        ],
                        "enable": true,
                        "visible": true,
                    }, 
                    {
                        "id": "b/yx7W3QfE",
                        "text": "Elevador",
                        "link": "./dispositivo/elevador-dispositivo",
                        "treeview":[
                            {
                                "id": "RVJ0+M9YNk",
                                "text": "ELEVADOR",
                                "alias": "elevador",
                                "child": "site",
                                "operation": 
                                [
                                    {
                                        "id": 0,
                                        "text": "forms.buttons.create"
                                    },
                                    {
                                        "id": 1,
                                        "text": "forms.buttons.update"
                                    },
                                    {
                                        "id": 2,
                                        "text": "forms.buttons.delete"
                                    },
                                    {
                                        "id": 3,
                                        "text": "forms.buttons.read"
                                    }
                                ],
                            }
                        ],
                        "enable": true,
                        "visible": true,
                    },
                    {
                        "id": "1JWmME0Jsk",
                        "text": "Concentrador",
                        "link": "./dispositivo/concentrador-dispositivo",
                        "treeview":[
                            {
                                "id": "Vpk59P5mZE",
                                "text": "CONCENTRADOR",
                                "alias": "concentrador",
                                "child": "site",
                                "operation": 
                                [
                                    {
                                        "id": 0,
                                        "text": "forms.buttons.create"
                                    },
                                    {
                                        "id": 1,
                                        "text": "forms.buttons.update"
                                    },
                                    {
                                        "id": 2,
                                        "text": "forms.buttons.delete"
                                    },
                                    {
                                        "id": 3,
                                        "text": "forms.buttons.read"
                                    }
                                ],
                            }
                        ],
                        "enable": true,
                        "visible": true,
                    },                     
                    {
                        "id": "SP3etW+aHU",
                        "text": "Controladora",
                        "link": "./dispositivo/controladora-dispositivo",
                        "treeview":[
                            {
                                "id": "RmfmET6sb0",
                                "text": "CONTROLADORA",
                                "alias": "controladora",
                                "child": "site",
                                "operation": 
                                [
                                    {
                                        "id": 0,
                                        "text": "forms.buttons.create"
                                    },
                                    {
                                        "id": 1,
                                        "text": "forms.buttons.update"
                                    },
                                    {
                                        "id": 2,
                                        "text": "forms.buttons.delete"
                                    },
                                    {
                                        "id": 3,
                                        "text": "forms.buttons.read"
                                    }
                                ],
                            }
                        ],
                        "enable": true,
                        "visible": true,
                    }, 
                    {
                        "id": "b/yx7WPQfE",
                        "text": "Câmera",
                        "link": "./dispositivo/camera-dispositivo",
                        "treeview":[
                            {
                                "id": "RVJ0+M7YNk",
                                "text": "CÂMERA",
                                "alias": "camera",
                                "child": "site",
                                "operation": 
                                [
                                    {
                                        "id": 0,
                                        "text": "forms.buttons.create"
                                    },
                                    {
                                        "id": 1,
                                        "text": "forms.buttons.update"
                                    },
                                    {
                                        "id": 2,
                                        "text": "forms.buttons.delete"
                                    },
                                    {
                                        "id": 3,
                                        "text": "forms.buttons.read"
                                    }
                                ],
                            }
                        ],
                        "enable": true,
                        "visible": true,
                    },
                    {
                        "id": "L0Lrgx7JjU",
                        "text": "Terminal",
                        "link": "./dispositivo/terminal-dispositivo",
                        "treeview":[
                            {
                                "id": "xq5EMo8a2k",
                                "text": "TERMINAL",
                                "alias": "terminal",
                                "child": "site",
                                "operation": 
                                [
                                    {
                                        "id": 0,
                                        "text": "forms.buttons.create"
                                    },
                                    {
                                        "id": 1,
                                        "text": "forms.buttons.update"
                                    },
                                    {
                                        "id": 2,
                                        "text": "forms.buttons.delete"
                                    },
                                    {
                                        "id": 3,
                                        "text": "forms.buttons.read"
                                    }
                                ],
                            }
                        ],
                        "enable": true,
                        "visible": true,
                    },
                    {
                        "id": "L0Lden7JjU",
                        "text": "Estaçao",
                        "link": "./dispositivo/estacao-dispositivo",
                        "treeview":[
                            {
                                "id": "xq5EDen8a2k",
                                "text": "ESTAÇÃO",
                                "alias": "estacao",
                                "child": "site",
                                "operation": 
                                [
                                    {
                                        "id": 0,
                                        "text": "forms.buttons.create"
                                    },
                                    {
                                        "id": 1,
                                        "text": "forms.buttons.update"
                                    },
                                    {
                                        "id": 2,
                                        "text": "forms.buttons.delete"
                                    },
                                    {
                                        "id": 3,
                                        "text": "forms.buttons.read"
                                    }
                                ],
                            }
                        ],
                        "enable": true,
                        "visible": true,
                    }
                ],
                "enable": true,
                "visible": true,
                "icon": {"file": "dispositivo.svg", "width": "15px"},
                "child": "organizacao",
            },
            {
                "id": "YRsBmnwrT0",
                "menu": "REPARTIÇÃO",
                "alias": "reparticao",
                "submenu": [
                    {
                        "id": "Eag4tOmb40",
                        "text": "Site",
                        "link": "./reparticao/site",
                        "treeview":[
                            {
                                "id": "tpciu8+mxU>",
                                "text": "SITE",
                                "alias": "site",
                                "child": "organizacao",
                                "operation": 
                                [
                                    {
                                        "id": 0,
                                        "text": "forms.buttons.create"
                                    },
                                    {
                                        "id": 1,
                                        "text": "forms.buttons.update"
                                    },
                                    {
                                        "id": 2,
                                        "text": "forms.buttons.delete"
                                    },
                                    {
                                        "id": 3,
                                        "text": "forms.buttons.read"
                                    }
                                ]
                            }
                        ],
                        "enable": true,
                        "visible": true
                    }, 
                    {
                        "id": "2cDENP315U",
                        "text": "Setor",
                        "link": "./reparticao/setor",
                        "treeview":[
                            {
                                "id": "3nz433,uYk",
                                "text": "SETOR",
                                "alias": "setor",
                                "child": "site",
                                "operation": 
                                [
                                    {
                                        "id": 0,
                                        "text": "forms.buttons.create"
                                    },
                                    {
                                        "id": 1,
                                        "text": "forms.buttons.update"
                                    },
                                    {
                                        "id": 2,
                                        "text": "forms.buttons.delete"
                                    },
                                    {
                                        "id": 3,
                                        "text": "forms.buttons.read"
                                    }
                                ]
                            }
                        ],
                        "enable": true,
                        "visible": true
                    }, 
                    {
                        "id": "lKT6ScxSWE",
                        "text": "Área",
                        "link": "./reparticao/area",
                        "treeview":[
                            {
                                "id": "uH7DNW.iEE",
                                "text": "ÁREA",
                                "alias": "area",
                                "child": "site",
                                "operation": 
                                [
                                    {
                                        "id": 0,
                                        "text": "forms.buttons.create"
                                    },
                                    {
                                        "id": 1,
                                        "text": "forms.buttons.update"
                                    },
                                    {
                                        "id": 2,
                                        "text": "forms.buttons.delete"
                                    },
                                    {
                                        "id": 3,
                                        "text": "forms.buttons.read"
                                    }
                                ]
                            }
                        ],
                        "enable": true,
                        "visible": true,
                    }, 
                    {
                        "id": "nLLcxBlIX0",
                        "text": "Estacionamento",
                        "link": "./reparticao/vaga-estacionamento",
                        "treeview":[
                            {
                                "id": "l/Vt+t/6YU",
                                "text": "ESTACIONAMENTO",
                                "alias": "estacionamento",
                                "child": "site",
                                "operation": 
                                [
                                    {
                                        "id": 0,
                                        "text": "forms.buttons.create"
                                    },
                                    {
                                        "id": 1,
                                        "text": "forms.buttons.update"
                                    },
                                    {
                                        "id": 2,
                                        "text": "forms.buttons.delete"
                                    },
                                    {
                                        "id": 3,
                                        "text": "forms.buttons.read"
                                    }
                                ]
                            }
                        ],
                        "enable": true,
                        "visible": true,
                    }, 
                    {
                        "id": "RKKTgts3H0",
                        "text": "Recepção",
                        "link": "./reparticao/recepcao",
                        "treeview":[
                            {
                                "id": "gkLHV90kf0",
                                "text": "RECEPÇÃO",
                                "alias": "recepcao",
                                "child": "site",
                                "operation": 
                                [
                                    {
                                        "id": 0,
                                        "text": "forms.buttons.create"
                                    },
                                    {
                                        "id": 1,
                                        "text": "forms.buttons.update"
                                    },
                                    {
                                        "id": 2,
                                        "text": "forms.buttons.delete"
                                    },
                                    {
                                        "id": 3,
                                        "text": "forms.buttons.read"
                                    }
                                ]
                            }
                        ],
                        "enable": true,
                        "visible": true
                    }, 
                    {
                        "id": "5+N5Q12KMU",
                        "text": "Empresa",
                        "link": "./reparticao/empresa",
                        "treeview":[
                            {
                                "id": "l0so4S13Ck",
                                "text": "EMPRESA",
                                "alias": "empresa",
                                "child": "organizacao",
                                "operation": 
                                [
                                    {
                                        "id": 0,
                                        "text": "forms.buttons.create"
                                    },
                                    {
                                        "id": 1,
                                        "text": "forms.buttons.update"
                                    },
                                    {
                                        "id": 2,
                                        "text": "forms.buttons.delete"
                                    },
                                    {
                                        "id": 3,
                                        "text": "forms.buttons.read"
                                    }
                                ],
                                "dynamic": true
                            }
                        ],
                        "enable": true,
                        "visible": true
                    }
                ],
                "enable": true,
                "visible": true,
                "icon": {"file": "reparticao.svg", "width": "15px"},
                "child": "organizacao"
            },
            {
                "id": "+6+HaUmvaE",
                "menu": "CONFIGURAÇÃO",
                "alias": "configuracao",
                "submenu": [
                    {
                        "id": "LH3C8YJ7u0",
                        "text": "Sistema",
                        "link": "./configuracao/sistema/sistemas",
                        "treeview": [{
                            "id": "NytNNd+GGE",
                            "text": "SISTEMA",
                            "alias": "sistema",
                            "item": [
                            {
                                "id": "+LfsJgX2JHk",
                                "text": "ADMINISTRADOR",
                                "link": "./configuracao/sistema/administrador",
                                "operation": 
                                [
                                    {
                                        "id": 0,
                                        "text": "forms.buttons.update"
                                    },
                                    {
                                        "id": 1,
                                        "text": "forms.buttons.read"
                                    }
                                ],
                                "icon": "administrador.png",
                                "isFunction": true,
                                "adminAccess": true 
                            },
                            {
                                "id": "nJg8w#g3tE",
                                "text": "ORGANIZAÇÃO",
                                "link": "./configuracao/sistema/organizacao",
                                "operation": 
                                [
                                    {
                                        "id": 0,
                                        "text": "forms.buttons.update"
                                    },
                                    {
                                        "id": 1,
                                        "text": "forms.buttons.read"
                                    }
                                ],                        
                                "icon": "organizacao.png",
                                "isFunction": true
                            },
                            {
                                "id": 'wriXV"DXzk',
                                "text": "AMBIENTE",
                                "link": "./configuracao/sistema/ambiente",
                                "operation": 
                                [
                                    {
                                        "id": 0,
                                        "text": "forms.buttons.update"
                                    },
                                    {
                                        "id": 1,
                                        "text": "forms.buttons.read"
                                    }
                                ],                        
                                "icon": "ambiente.png",
                                "isFunction": true
                            },
                            {
                                "id": "37xtv!GQkf",
                                "text": "SOFTWARE",
                                "link": "./configuracao/sistema/software",
                                "operation": 
                                [
                                    {
                                        "id": 0,
                                        "text": "forms.buttons.update"
                                    },
                                    {
                                        "id": 1,
                                        "text": "forms.buttons.read"
                                    }
                                ],
                                "icon": "software.svg",
                                "isFunction": true 
                            },                                                
                            {
                                "id": "nJgyu1#g3tE",
                                "text": "SERVIDOR",
                                "link": "./configuracao/sistema/servidor",
                                "operation": 
                                [
                                    {
                                        "id": 0,
                                        "text": "forms.buttons.update"
                                    },
                                    {
                                        "id": 1,
                                        "text": "forms.buttons.read"
                                    }
                                ],                        
                                "icon": "servidor.png",
                                "isFunction": true
                            }

                        ],
                            "child": "organizacao"
                        }],
                        "enable": true,
                        "visible": true
                    }, 
                    {    
                        "id": "nWWwXyvymU",
                        "text": "Operador",
                        "link": "./configuracao/operador/operador-configuracao",
                        "treeview": [{
                            "id": "EqCyL&ipek",
                            "text": "OPERADOR",
                            "alias": "operador",
                            "link": "./configuracao/operador/operador-configuracao",
                            "child": "organizacao",
                            "operation": 
                            [
                                {
                                    "id": 0,
                                    "text": "forms.buttons.create"
                                },
                                {
                                    "id": 1,
                                    "text": "forms.buttons.update"
                                },
                                {
                                    "id": 2,
                                    "text": "forms.buttons.delete"
                                },
                                {
                                    "id": 3,
                                    "text": "forms.buttons.read"
                                }
                            ],
                            "dynamic": true
                        }, 
                        {
                            "id": "YuZXq%FVbE",
                            "text": "NÍVEL DE OPERAÇÃO",
                            "alias": "nivelOperacao",
                            "link": "./configuracao/operador/nivel-operacao",
                            "child": "organizacao",
                            "operation": 
                            [
                                {
                                    "id": 0,
                                    "text": "forms.buttons.create"
                                },
                                {
                                    "id": 1,
                                    "text": "forms.buttons.update"
                                },
                                {
                                    "id": 2,
                                    "text": "forms.buttons.delete"
                                },
                                {
                                    "id": 3,
                                    "text": "forms.buttons.read"
                                }
                            ]
                        }],
                        "enable": true,
                        "visible": true,
                        "child": "organizacao"
                    },                    
                    {
                        "id": "P+v52M6En0",
                        "text": "Grupo",
                        "link": "./configuracao/grupo/grupos",
                        "treeview": [{
                            "id": "k1pVpI4WmU",
                            "text": "GRUPO",
                            "alias": "grupo",
                            "item": [
                                {
                                    "id": "73pJH'mfJ",
                                    "text": "PESSOA",
                                    "icon": "grupo.png",
                                    "link": "./configuracao/grupo/pessoa",
                                    "operation": 
                                    [
                                        {
                                            "id": 0,
                                            "text": "forms.buttons.create"
                                        },
                                        {
                                            "id": 1,
                                            "text": "forms.buttons.update"
                                        },
                                        {
                                            "id": 2,
                                            "text": "forms.buttons.delete"
                                        },
                                        {
                                            "id": 3,
                                            "text": "forms.buttons.read"
                                        }
                                    ],
                                    "isFunction": true
                                },
                                {
                                    "id": "d2f87(3c25",
                                    "text": "VEÍCULO",
                                    "icon": "grupo.png",
                                    "link": "./configuracao/grupo/veiculo",
                                    "operation": 
                                    [
                                        {
                                            "id": 0,
                                            "text": "forms.buttons.create"
                                        },
                                        {
                                            "id": 1,
                                            "text": "forms.buttons.update"
                                        },
                                        {
                                            "id": 2,
                                            "text": "forms.buttons.delete"
                                        },
                                        {
                                            "id": 3,
                                            "text": "forms.buttons.read"
                                        }
                                    ],
                                    "isFunction": true,
                                    "solucaoIntegrada": 0,
                                },                               
                                {
                                    "id": "+HMH5C%UjE",
                                    "text": "EMPRESA",
                                    "icon": "grupo.png",
                                    "link": "./configuracao/grupo/empresa",
                                    "operation": 
                                    [
                                        {
                                            "id": 0,
                                            "text": "forms.buttons.create"
                                        },
                                        {
                                            "id": 1,
                                            "text": "forms.buttons.update"
                                        },
                                        {
                                            "id": 2,
                                            "text": "forms.buttons.delete"
                                        },
                                        {
                                            "id": 3,
                                            "text": "forms.buttons.read"
                                        }
                                    ],
                                    "isFunction": true
                                },
                                {
                                    "id": "+Den15A%UjE",
                                    "text": "CONTATO",
                                    "icon": "grupo.png",
                                    "link": "./configuracao/grupo/contato",
                                    "operation": 
                                    [
                                        {
                                            "id": 0,
                                            "text": "forms.buttons.create"
                                        },
                                        {
                                            "id": 1,
                                            "text": "forms.buttons.update"
                                        },
                                        {
                                            "id": 2,
                                            "text": "forms.buttons.delete"
                                        },
                                        {
                                            "id": 3,
                                            "text": "forms.buttons.read"
                                        }
                                    ],
                                    "isFunction": true
                                },
                                {
                                    "id": "EqQu3)pA20",
                                    "text": "DOCUMENTO",
                                    "icon": "grupo.png",
                                    "link": "./configuracao/grupo/documento",
                                    "operation": 
                                    [
                                        {
                                            "id": 0,
                                            "text": "forms.buttons.create"
                                        },
                                        {
                                            "id": 1,
                                            "text": "forms.buttons.update"
                                        },
                                        {
                                            "id": 2,
                                            "text": "forms.buttons.delete"
                                        },
                                        {
                                            "id": 3,
                                            "text": "forms.buttons.read"
                                        }
                                    ],
                                    "isFunction": true,
                                }, 
                                {
                                    "id": "ZFPaJ*5DaU",
                                    "text": "IDENTIFICAÇÃO",
                                    "icon": "grupo.png",
                                    "link": "./configuracao/grupo/identificacao-motivo",
                                    "operation": 
                                    [
                                        {
                                            "id": 0,
                                            "text": "forms.buttons.create"
                                        },
                                        {
                                            "id": 1,
                                            "text": "forms.buttons.update"
                                        },
                                        {
                                            "id": 2,
                                            "text": "forms.buttons.delete"
                                        },
                                        {
                                            "id": 3,
                                            "text": "forms.buttons.read"
                                        }
                                    ],
                                    "isFunction": true
                                }, 
                                {
                                    "id": "XJz7VI'6Z3",
                                    "text": "MODELO DE VEÍCULO",
                                    "icon": "grupo.png",
                                    "link": "./configuracao/grupo/modelo-veiculo",
                                    "operation": 
                                    [
                                        {
                                            "id": 0,
                                            "text": "forms.buttons.create"
                                        },
                                        {
                                            "id": 1,
                                            "text": "forms.buttons.update"
                                        },
                                        {
                                            "id": 2,
                                            "text": "forms.buttons.delete"
                                        },
                                        {
                                            "id": 3,
                                            "text": "forms.buttons.read"
                                        }
                                    ],
                                    "isFunction": true
                                },
                                {
                                    "id": "V6xlod&hKg",
                                    "text": "CENTRO DE CUSTO",
                                    "icon": "grupo.png",
                                    "link": "./configuracao/grupo/centro-custo",
                                    "operation": 
                                    [
                                        {
                                            "id": 0,
                                            "text": "forms.buttons.create"
                                        },
                                        {
                                            "id": 1,
                                            "text": "forms.buttons.update"
                                        },
                                        {
                                            "id": 2,
                                            "text": "forms.buttons.delete"
                                        },
                                        {
                                            "id": 3,
                                            "text": "forms.buttons.read"
                                        }
                                    ],
                                    "isFunction": true,
                                    "solucaoIntegrada": 0,
                                },
                                {
                                    "id": "QVEmgw(Wak",
                                    "text": "EMERGÊNCIA",
                                    "icon": "grupo.png",
                                    "link": "./configuracao/grupo/emergencia",
                                    "operation": 
                                    [
                                        {
                                            "id": 0,
                                            "text": "forms.buttons.create"
                                        },
                                        {
                                            "id": 1,
                                            "text": "forms.buttons.update"
                                        },
                                        {
                                            "id": 2,
                                            "text": "forms.buttons.delete"
                                        },
                                        {
                                            "id": 3,
                                            "text": "forms.buttons.read"
                                        }
                                    ],
                                    "isFunction": true,
                                    "solucaoIntegrada": 0,
                                },
                            ],
                            "child": "organizacao"
                        }],
                        "enable": true,
                        "visible": true
                    }, 
                    {
                        "id": "010-04",
                        "text": "Serviço",
                        "link": "./configuracao/servico-configuracao",
                        "treeview": [{
                            "id": "010-04-1",
                            "text": "SERVIÇO",
                            "child": "site"
                        }],
                        "enable": false,
                        "visible": false
                    }, 
                    {
                        "id": "yKneo2(ije",
                        "text": "Módulo",
                        "link": "./configuracao/modulo/modulos",
                        "treeview": [{
                            "id": "7mbp0+qn2:",
                            "text": "MÓDULO",
                            "alias": "modulo",
                            "item": [
                            {
                                "text": "NEXMOVE",
                                "id": "010-05-1A",
                                "alias": "nexmove",                                 
                                "icon": "sistema.svg",
                                "subitem": [
                                    {
                                        "id": "010-05-1A1",
                                        "text": "CONFIGURAÇÃO",
                                        "icon": "configuracao.svg",
                                        "link": "./configuracao/modulo/nexmove/configuracao",
                                    },
                                    {
                                        "id": "010-05-1A2",
                                        "text": "USUÁRIO",                                        
                                        "icon": "usuario.svg",
                                        "link": "./configuracao/modulo/nexmove/usuario",
                                    }
                                ]
                            },],
                            "child": "site"
                        }],
                        "enable": true,
                        "visible": true
                    },
                    {
                        "id": "010-06",
                        "text": "Supervisão",
                        "link": "./configuracao/supervisao-configuracao",
                        "enable": true,
                        "visible": true,
                        "treeview": [{
                            "text": "SUPERVISÃO",
                            "id": "010-06-1",
                            "child": "Organizacao"
                        }]
                    }
                ],
                "enable": true,
                "visible": true,
                "icon": {"file": "configuracao.svg", "width": "15px"},
                "child": "Organizacao"
            }    
        ]
        
        return observableOf(menu);
    }

    menuPopulate(orientacao: string) {
        if(!this.menu) {
            this.getMenu()
            .subscribe(result => {
                this.menu = result.filter(mnu => (mnu.visible == true  || mnu.visible == null) && 
                                                ((mnu.solucaoIntegrada == undefined)));
                    if(orientacao == "vertical") {
                        const treeview: TreeView[] = this.menu[0].submenu[0].treeview.filter(tview => tview.solucaoIntegrada == undefined);
                        this.treeviewService.setTreeview(treeview);
                    }
            });
        }
    }

    clearMenu(cleanTreeview?: boolean) {
        document.getElementById("inf_1599").classList.remove("active");
        for(let i = 0; i<= (this.menu.length - 1); i++) {
          document.getElementById(this.menu[i].id).classList.remove("active");
          if(cleanTreeview == true) {
            const treeview: TreeView[] = this.menu[1].submenu[0].treeview;
            this.treeviewService.setTreeview(treeview);
          }
        }
    }

    getSubMenuByIndex(index: number): SubMenu[] {
        return this.menu[index].submenu;
    }
 
    getSubMenu(alias: string): SubMenu[] {
        this.getMenu()
            .subscribe((result: Menu[]) => {
                const menu: Menu[] = result;
                const index: number = menu.findIndex(mn => mn.alias == alias);
                return menu[index].submenu;
            })
        return undefined;
    }

    menuSelectSubject() {
        if(!this.menuSelectBehavior || this.menuSelectBehavior.closed == true) this.menuSelectBehavior = new BehaviorSubject(null);
        return this.menuSelectBehavior;
    }

    menuSelect(index: number) {
        this.menuSelectBehavior.next(index);
    }

}