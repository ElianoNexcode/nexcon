import { Observable } from 'rxjs';
import { Item } from 'src/app/@theme/layouts/treeview/service/treeview';
import { FilterInput, SchemaInterface, SortOperationKind } from '../api/generic-graphql';
import { ContatoComunicacao } from './comunicacao-contato';

export interface ContatoGrupo {
    id?: number
    contatoGrupo?: string
    contatos?: ContatoComunicacao[]
}


export interface ContatoGrupoSort {
    id?: SortOperationKind
    contatos?: SortOperationKind
    contatoGrupo?: SortOperationKind
}


export interface ContatoGrupoFilter {
    id?: FilterInput    
    contatos?: FilterInput
    contatoGrupo?: FilterInput
}

export interface ContatoGrupoSchema extends SchemaInterface {
    nodes: ContatoGrupo[]
}

export interface create_ContatoGrupo { data: { grupoContato_Inserir: SchemaInterface }}
export interface read_ContatoGrupo { grupoContato: ContatoGrupoSchema }
export interface update_ContatoGrupo { data: { grupoContato_Alterar: SchemaInterface }}
export interface delete_ContatoGrupo { data: { grupoContato_Excluir: SchemaInterface }}

export abstract class ContatoGrupoData {
    abstract createContatoGrupo(contatos: ContatoGrupo): Observable<create_ContatoGrupo>;
    abstract readContatoGrupos(order?: ContatoGrupoSort, where?: ContatoGrupoFilter): Observable<read_ContatoGrupo>;
    abstract updateContatoGrupo(contatos: ContatoGrupo): Observable<update_ContatoGrupo>;
    abstract deleteContatoGrupo(id: number): Observable<delete_ContatoGrupo>;
   
}