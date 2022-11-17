import { Observable } from 'rxjs';
import { SchemaInterface,FilterInput, SortOperationKind } from '../api/generic-graphql';
import { VeiculoGrupo, VeiculoGrupoSort } from './grupo-veiculo';
import { VeiculoModeloGrupo, VeiculoModeloGrupoFilter, VeiculoModeloGrupoSort } from './grupo-veiculo-modelo';
import { AreaReparticaoFilter } from './reparticao-area';
import { EmpresaReparticao, EmpresaReparticaoFilter } from './reparticao-empresa';
import { EstacionamentoVaga } from './reparticao-vaga-estacionamento';
import { PessoaExternaUsuario } from './usuario-pessoa-externa';
import { PessoaInternaUsuarioFilter } from './usuario-pessoa-interna';


export interface VeiculoExternoAbordagem {
    mensagemAdvertida: string
    mensagemInformativa: string
    mensagemRestritiva: string
}

export interface  VeiculoExternoCondutor {
    pessoaId: number
    pessoaExterna?: PessoaExternaUsuario
    veiculoId?: number
    veiculoExterno?: VeiculoExternoUsuario 
}

export interface VeiculoExternoImg {
    veiculoId: number
    imagem: number[]
    trataImagem: number
    veiculoExterno: VeiculoExternoUsuario
}


export interface VeiculoExternoUsuario {
    id: number
    imagem?: VeiculoExternoImg
    tipo?: number | string
    placa?: string
    modeloId?: number
    modelo?: VeiculoModeloGrupo | string
    cor?: string
    grupoId?: number
    grupo?: VeiculoGrupo
    caracteristica?: string
    observacao?: string
    peso?: number
    empresaId?: number
    empresa?: EmpresaReparticao
    entidadeNome?: string
    complemento1?: string
    complemento2?: string
    complemento3?: string
    complemento4?: string
    condutores?: VeiculoExternoCondutor[]
    garagens?: EstacionamentoVaga[]
    presente?: boolean
    abordagem?: VeiculoExternoAbordagem
    status?: boolean
}

export interface VeiculoExternoUsuarioSort {      // Order_By
    id?:SortOperationKind
    placa?:SortOperationKind
    tipo?:SortOperationKind
    cor?:SortOperationKind
    grupoId?:SortOperationKind
    grupo?: VeiculoGrupoSort
    status?:SortOperationKind
    complemento1?: SortOperationKind
    complemento2?: SortOperationKind
    complemento3?: SortOperationKind
    complemento4?: SortOperationKind
    modelo?: VeiculoModeloGrupoSort
    observacao?: SortOperationKind
    

}

export interface VeiculoExternoUsuarioFilter {    // Where
    id?:FilterInput
    placa?:FilterInput
    tipo?:FilterInput
    modelo?: VeiculoModeloGrupoFilter
    modeloId?: FilterInput
    caracteristica?: FilterInput
    acessoCartao?: FilterInput
    entidadeNome?: FilterInput
    area?: AreaReparticaoFilter
    localizacao?: FilterInput
    centroCustoId?: FilterInput
    complemento1?: FilterInput
    complemento2?: FilterInput
    complemento3?: FilterInput
    complemento4?: FilterInput
    observacao?: FilterInput
    supervisor?: PessoaInternaUsuarioFilter
    empresa?: EmpresaReparticaoFilter
    areaId?: FilterInput
    cor?:FilterInput
    grupoId?:FilterInput
    status?:FilterInput
    and?: [{cadastroData: FilterInput},
           {cadastroData: FilterInput}]
}

export interface VeiculoExternoUsuarioSchema extends SchemaInterface {
    nodes: VeiculoExternoUsuario[]
    totalCount: number
}

 export interface create_VeiculoExternoUsuario { data: { usuarioVeiculoExterno_Inserir: SchemaInterface }}
 export interface read_VeiculoExternoUsuario   { usuarioVeiculoExterno: VeiculoExternoUsuarioSchema }
 export interface update_VeiculoExternoUsuario { data: { usuarioVeiculoExterno_Alterar: SchemaInterface }}
 export interface delete_VeiculoExternoUsuario { data: { usuarioVeiculoExterno_Excluir: SchemaInterface }}

export abstract class VeiculoExternoUsuarioData {
     abstract createVeiculoExternoUsuario (site: VeiculoExternoUsuario): Observable<create_VeiculoExternoUsuario>;
     abstract readVeiculoExternoUsuario  (order?: VeiculoExternoUsuarioSort, where?: VeiculoExternoUsuarioFilter): Observable<read_VeiculoExternoUsuario>;
     abstract readVeiculoExternoUsuarioRelat(order?: VeiculoExternoUsuarioSort, where?: VeiculoExternoUsuarioFilter, first?: number):Observable<read_VeiculoExternoUsuario>;
     abstract updateVeiculoExternoUsuario (site: VeiculoExternoUsuario): Observable<update_VeiculoExternoUsuario>;
     abstract deleteVeiculoExternoUsuario (id: number): Observable<delete_VeiculoExternoUsuario>;
}