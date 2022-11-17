import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Apollo } from 'apollo-angular';
import { SistemaConfig, Versao } from '../storage/config/config';

export interface Session {
    token: string,
    softwareLicenca: string,
    solucaoEspecifica: string,
    solucaoIntegrada: string,
    aplicativo: string,
    aplicativoVersao: string
}

export interface SchemaInterface {
    mensagem: string
    mensagemTipo: string
    sucesso: boolean
    objeto?: any
}

export interface QueryInterface<T> {
    nodes: T
    totalCount: number
    pageInfo: PageInfo
}

export enum SortOperationKind {
    ASC = 'ASC',
    DESC = 'DESC'
}

export interface PageInfo {
    hasNextPage: boolean
    hasPreviousPage: boolean
    startCursor: string
    endCursor: string
}

export interface FilterInput {
    eq?: string | number | boolean
    contains?: string
    in?: Array<string | number>    
    startsWith?: string
    endsWith?: string
    gt?: number | string
    lt?: number | string
    gte?: number | string
    lte?: number | string
    not?: number | string
}

@Injectable()
export class GenericGraphQL {

    session: {sessao: Session} = {sessao: null};

    first: BehaviorSubject<number> = new BehaviorSubject(0);

    constructor(private apollo: Apollo) {
        this.sessionUpdate();        
    }

    query<T>(schema: any, variables?: any): Observable<T> {
        if(this.first.value == 0) this.first.next(1000);
        variables = {...variables, first: this.first.value}
        this.sessionUpdate();
        const query_GraphQL: Observable<T> = this.apollo.watchQuery<T>(
            {                                
                query: schema,
                variables: variables,
                fetchPolicy: "no-cache",
                errorPolicy: 'all'         
            })
            .valueChanges.pipe(map(result => result.data));
        return query_GraphQL;
    }

    mutation<T>(schema: any, variables: any): Observable<T> {
        this.sessionUpdate();
        const mutate_GraphQL: Observable<T> = <Observable<T>>this.apollo.mutate<T>(
            {
                mutation: schema,
                variables: variables,
                fetchPolicy: "no-cache"
            });

        return mutate_GraphQL;
    }

    sessionUpdate() {
        const token: string = window.sessionStorage.getItem("token");        
        const nexconStorage = JSON.parse(localStorage.getItem("nexcon"));
        const sessionStorage: SistemaConfig = nexconStorage?.sistema;
        const session: Session = {token: "",
                                  softwareLicenca: "",
                                  solucaoEspecifica: "",
                                  solucaoIntegrada: "",
                                  aplicativo: "NEXCON",
                                  aplicativoVersao: Versao[0]};
        if(sessionStorage) {
            session.token = token? token: "";
            session.softwareLicenca = sessionStorage.softwareLicenca;
            session.solucaoEspecifica = sessionStorage.solucaoEspecifica;
            session.solucaoIntegrada = sessionStorage.solucaoIntegrada?.toString();
            session.aplicativo = "NEXCON";
            session.aplicativoVersao = Versao[sessionStorage.softwareLicencaVersao];
        }

        this.session.sessao = session;
    }

    token_update(token: string) {
        window.sessionStorage.setItem("token", token);
        this.session.sessao.token = token;
    }
    
}
