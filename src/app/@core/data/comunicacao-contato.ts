import { Observable } from "rxjs";
import { Item } from "src/app/@theme/layouts/treeview/service/treeview";
import { FilterInput, SchemaInterface, SortOperationKind } from "../api/generic-graphql";
import { ContatoGrupo, ContatoGrupoFilter } from "./grupo-contato";
import { Site } from "./reparticao-site";

export interface ContatoComunicacao {
    id?: number
    site?: Site
    siteId?: number
    nome?: string
    email?: string
    grupo?: ContatoGrupo
    grupoId?: number
    observacao?: string
    telefoneFixo?: string
    telefoneMovel?: string
    whatsApp?: boolean
}

export interface ContatoComunicacaoSort {
    id?: SortOperationKind
    siteId?: SortOperationKind
    nome?: SortOperationKind
    telefoneFixo?: SortOperationKind
    telefoneMovel?: SortOperationKind
    email?: SortOperationKind
    observacao?: SortOperationKind
}

export interface ContatoComunicacaoFilter {
    id?: FilterInput
    grupoId?: FilterInput
    siteId?: FilterInput
    nome?: FilterInput
    telefoneFixo?: FilterInput
    telefoneMovel?: FilterInput
    email?: FilterInput
    observacao?: FilterInput
}

export interface ContatoComunicacaoSchema extends SchemaInterface {
    nodes: ContatoComunicacao[]
}

export interface create_ContatoComunicacao { data: {comunicacaoContato_Inserir: SchemaInterface}}
export interface read_ContatoComunicacao { comunicacaoContato: ContatoComunicacaoSchema}
export interface update_ContatoComunicacao {data: { comunicacaoContato_Alterar: ContatoComunicacaoSchema}}
export interface delete_ContatoComunicacao { data: { comunicacaoContato_Excluir: ContatoComunicacaoSchema}}

export abstract class ContatoComunicacaoData {
    abstract createContatoComunicacao( contato: ContatoComunicacao): Observable<create_ContatoComunicacao>;
    abstract readContatoComunicacao( order?: ContatoComunicacaoSort, where?: ContatoComunicacaoFilter, first?: number): Observable<read_ContatoComunicacao>;
    abstract updateContatoComunicacao( contato: ContatoComunicacao): Observable<update_ContatoComunicacao>;
    abstract deleteContatoComunicacao( id: number): Observable<delete_ContatoComunicacao>;
    abstract getContatoGrupoTreeView(filter: ContatoGrupoFilter): Item[];
}


