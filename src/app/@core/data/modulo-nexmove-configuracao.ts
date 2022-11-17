import { Observable } from 'rxjs';
import { SchemaInterface } from '../api/generic-graphql';

export enum identificacaoNexmove{
    "RECEPÇÃO" = 1,
    "TOTEM" = 2,
    "AUTOMÁTICA" = 3
}

export enum autorizacaoAcesso{
    "ENTRADA" = 1,
    "SAÍDA" = 2,
    "ENTRADA E SAÍDA" = 3
}

export enum saidaAcesso {
    "NÃO" = 0,
    "SIM" = 1
}

export enum indeterminado {
    "INDETERMINADO" = -1
}

export interface ConfiguracaoNexmove{
    id: number;
    identificacao?: number;
    acessoAutorizacao?: number;
    acessoIngresso?: number;
    acessoSaida?: boolean;
    funcaoAgendamento?: boolean;
    funcaoIdentificacao?: boolean;
    qrcodeValidacao?: number;
}

export interface ConfiguracaoNexmoveSchema extends SchemaInterface {
    nodes: ConfiguracaoNexmove[];
}

export interface read_ConfiguracaoNexmove   { integracaoNexmove: ConfiguracaoNexmoveSchema};
export interface update_ConfiguracaoNexmove { data:  { integracaoNexmove_Alterar: SchemaInterface}};

export abstract class ConfiguracaoData {
    abstract readConfiguracaoNexmove(): Observable<read_ConfiguracaoNexmove>;
    abstract updateConfiguracaoNexmove(data: ConfiguracaoNexmove): Observable<update_ConfiguracaoNexmove>;
}



