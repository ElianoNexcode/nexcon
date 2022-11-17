import { Observable } from 'rxjs';
import { SchemaInterface } from '../api/generic-graphql';

export interface Servidor {
    id?: number
    servidor: string
    alias: string
    descricao: string
}

export interface ServidorSistema{
    id: number
    servidorEmail?: string
    servidorEmailSSL?: boolean
    servidorEmailPorta?: number
    servidorEmailSenha?: string
    servidorEmailOficial?: string
    servidorEmailUsuario?: string
    servidorEmailEnviados?: number
    servidorEmailRecusados?: number
    servidorEmailTentativas?: number
    servidorEmailAutenticacao?: boolean
    servidorEmailCertificacao?: boolean
    servidorSms?: number
    servidorSmsporta?: number
    servidorSmssenha?: string
    servidorSmsusuario?: string
    servidorSmsenviados?: number
    servidorSmsrecusados?: number
    servidorSmstentativas?: number
}

export interface ServidorSistemaSchema extends SchemaInterface {
    nodes: ServidorSistema
}

export interface read_ServidorSistema { sistemaConfiguracao: ServidorSistemaSchema }
export interface update_ServidorEmail { data: { sistemaServidorEmail_Alterar: ServidorSistemaSchema }}

export abstract class ServidorData {    
    abstract readServidorSistema(): Observable<read_ServidorSistema>;
    abstract updateServidorEmail(data: ServidorSistema): Observable<update_ServidorEmail>;
    abstract getServidor(): Observable<Servidor[]>;
}

