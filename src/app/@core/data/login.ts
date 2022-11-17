import { SchemaInterface } from '../api/generic-graphql';
import { Observable } from 'rxjs';

export interface Login {
    aplicativo: string
    login: string
    senha: string
}

export interface login { data: { login: SchemaInterface }}

export abstract class LoginData {
    abstract login(data: Login): Observable<login>;
    abstract setToken(token: string): any;
}