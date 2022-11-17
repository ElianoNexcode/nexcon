import { Observable } from 'rxjs';
import { Item } from 'src/app/@theme/components/form/combobox/service/combobox.service';
import { FilterInput, SchemaInterface, SortOperationKind } from '../api/generic-graphql';

export interface VeiculoGrupo {
    id?: number
    veiculoGrupo?: string
    veiculoInterno?: boolean
    veiculoExterno?: boolean
}

export interface VeiculoGrupoSort {
    id?: SortOperationKind
    veiculoGrupo?: SortOperationKind
    veiculoInterno?: SortOperationKind
    veiculoExterno?: SortOperationKind
}

export interface VeiculoGrupoFilter {
    id?: FilterInput
    veiculoGrupo?: FilterInput
    veiculoInterno?: FilterInput
    veiculoExterno?: FilterInput
}

export interface VeiculoGrupoSchema extends SchemaInterface {
    nodes: VeiculoGrupo[]
}

export interface create_VeiculoGrupo { data: { grupoVeiculo_Inserir: SchemaInterface }}
export interface read_VeiculoGrupo { grupoVeiculo: VeiculoGrupoSchema }
export interface update_VeiculoGrupo { data: { grupoVeiculo_Alterar: SchemaInterface }}
export interface delete_VeiculoGrupo { data: { grupoVeiculo_Excluir: SchemaInterface }}

export abstract class VeiculoGrupoData {

    public veiculoCombustivel: Item[] = [{id: 1, text: "GASOLINA", value: "gasolina"},
                                         {id: 2, text: "ETANOL", value: "etanol"},
                                         {id: 3, text: "DIESEL", value: "diesel"},
                                         {id: 4, text: "GNV", value: "gnv"},
                                         {id: 5, text: "FLEX", value: "flex"}];

    public veiculoTipo: Item[] = [{id: 1, text: "CARRO", value: "carro"},
                                  {id: 2, text: "MOTO", value: "moto"},
                                  {id: 3, text: "BIKE", value: "bike"},
                                  {id: 4, text: "PATINETE", value: "patinete"}];  
    
    public veiculoCor: Item[] = [{id: 1, text: "AMARELO", value: "AMARELO"},
                                 {id: 2, text: "AZUL", value: "AZUL"},
                                 {id: 3, text: "BEGE", value: "BEGE"},
                                 {id: 4, text: "BRANCO", value: "BRANCO"},
                                 {id: 5, text: "CINZA", value: "CINZA"},
                                 {id: 6, text: "DOURADO", value: "DOURADO"},
                                 {id: 7, text: "GRAFITE", value: "GRAFITE"},
                                 {id: 8, text: "LARANJA", value: "LARANJA"},
                                 {id: 9, text: "LILÁS", value: "LILÁS"},
                                 {id: 10, text: "MARROM", value: "MARROM"},
                                 {id: 11, text: "MOSTARDA", value: "MOSTARDA"},
                                 {id: 12, text: "PRETO", value: "PRETO"},
                                 {id: 13, text: "PRATA", value: "PRATA"},
                                 {id: 14, text: "ROSA", value: "ROSA"},
                                 {id: 15, text: "ROXO", value: "ROXO"},
                                 {id: 16, text: "VERDE", value: "VERDE"},
                                 {id: 17, text: "VERMELHO", value: "VERMELHO"},
                                 {id: 18, text: "VINHO", value: "VINHO"}];

    abstract createVeiculoGrupo(site: VeiculoGrupo): Observable<create_VeiculoGrupo>;
    abstract readVeiculoGrupos(order?: VeiculoGrupoSort, where?: VeiculoGrupoFilter): Observable<read_VeiculoGrupo>;
    abstract updateVeiculoGrupo(site: VeiculoGrupo): Observable<update_VeiculoGrupo>;
    abstract deleteVeiculoGrupo(id: number): Observable<delete_VeiculoGrupo>;
}