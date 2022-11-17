import { Observable } from 'rxjs';
import { Item } from 'src/app/@theme/layouts/treeview/service/treeview';
import { FilterInput, SchemaInterface, SortOperationKind } from '../api/generic-graphql';

export interface EmpresaGrupo {
    id?: number
    empresaGrupo: string
}

export interface EmpresaGrupoSort {
    id?: SortOperationKind
    empresaGrupo?: SortOperationKind
}

export interface EmpresaGrupoFilter {
    id?: FilterInput
    empresaGrupo?: FilterInput
}

export interface EmpresaGrupoSchema extends SchemaInterface {
    nodes: EmpresaGrupo[]
}

export interface create_EmpresaGrupo { data: { grupoEmpresa_Inserir: SchemaInterface }}
export interface read_EmpresaGrupo { grupoEmpresa: EmpresaGrupoSchema }
export interface update_EmpresaGrupo { data: { grupoEmpresa_Alterar: SchemaInterface }}
export interface delete_EmpresaGrupo { data: { grupoEmpresa_Excluir: SchemaInterface }}

export abstract class EmpresaGrupoData {
    abstract createEmpresaGrupo(site: EmpresaGrupo): Observable<create_EmpresaGrupo>;
    abstract readEmpresaGrupos(order?: EmpresaGrupoSort, where?: EmpresaGrupoFilter): Observable<read_EmpresaGrupo>;
    abstract updateEmpresaGrupo(site: EmpresaGrupo): Observable<update_EmpresaGrupo>;
    abstract deleteEmpresaGrupo(id: number): Observable<delete_EmpresaGrupo>;
    abstract getEmpresaGrupoTreeView(filter: EmpresaGrupoFilter): Item[];
}