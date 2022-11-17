import { Observable } from 'rxjs';
import { SchemaInterface } from '../api/generic-graphql';

export interface Organizacao {
    id: number
    organizacaoNome: string
    organizacaoImagem: Array<number>
    organizacaoEstrutura: number
}

export interface OrganizacaoSchema extends SchemaInterface {
    nodes: Organizacao[]
}

export interface read_Organizacao { sistemaOrganizacao: OrganizacaoSchema }
export interface update_Organizacao { data: { sistemaOrganizacao_Alterar: SchemaInterface }}

export abstract class OrganizacaoData {
    abstract readOrganizacoes(): Observable<read_Organizacao>;
    abstract updateOrganizacao(data: Organizacao): Observable<update_Organizacao>;
}