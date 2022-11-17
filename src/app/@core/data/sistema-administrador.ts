import { FilterInput, SchemaInterface } from '../api/generic-graphql';
import { Observable } from 'rxjs';

export interface Administrador {
    id: number
    administradorLogin?: string
    administradorSenha?: string
    administradorSenhaAntiga?: string
}

export interface AdministradorFilter {
    administradorLogin?: FilterInput
    administradorSenha?: FilterInput
    AND: [{administradorLogin: FilterInput},
          {administradorSenha: FilterInput}]
}

export interface AdministradorSchema extends SchemaInterface {
    nodes: Administrador[]
    totalCount: number
}

export interface read_Administrador { sistemaAdministrador: AdministradorSchema }
export interface get_AdministradorLogin { sistemaAdministrador: AdministradorSchema }
export interface update_Administrador { data: { sistemaAdministrador_Alterar: SchemaInterface }}


export abstract class AdministradorData {
    abstract readAdministrador(): Observable<read_Administrador>;
    abstract getAdministrador_login(filter: AdministradorFilter): Observable<get_AdministradorLogin>;
    abstract updateAdministrador(data: Administrador): Observable<update_Administrador>;
}