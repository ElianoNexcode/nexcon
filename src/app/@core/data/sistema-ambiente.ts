import { Observable } from 'rxjs';
import { SchemaInterface } from '../api/generic-graphql';

export interface Ambiente {
    id: number
    parte: string
    alias: string
    descricao: string
}

export interface AmbienteSistema {
    id: number
    interfaceConfiguracao?: number
    interfaceImagem?: number[]
    interfacePadrao?: number
    loginSenhaCaracter?: number
    loginSenhaDigitos?: string
    loginSenhaRenovacao?: number
    loginSenhaExpiracao?: number
    loginDigitos?: string
    pessoaComplemento1?: string
    pessoaComplemento2?: string
    pessoaComplemento3?: string
    pessoaComplemento4?: string
    softwareLicenca?: string
    softwareLicencaNumero?: string
    softwareLicencaRegistro?: string
    softwareLicencaVersao?: number
    softwareLicencaEdicao?: string
    softwareLicencaVolume?: string
    softwareLicencaRelease?: string
    solucaoEspecifica?: string
    solucaoIntegrada?: number
    imagemDiretorio?: string
    imagemDefinicao?: number
    biometriaFacial?: number
    biometriaDigital?: number
    qrcodeFormato?: number
    qrcodeDistincao?: number
    acessoSenhaControle?: number
    acessoSenhaFormato?: number
    acessoPanicoControle?: boolean
}

export interface AmbienteSistemaSchema extends SchemaInterface {
    nodes: AmbienteSistema
}

export interface read_AmbienteSistema { sistemaConfiguracao: AmbienteSistemaSchema }
export interface update_AmbienteInterface { data: { sistemaAmbienteInterface_Alterar: SchemaInterface }}
export interface update_AmbienteLogin { data: { sistemaAmbienteLogin_Alterar: SchemaInterface }}
export interface update_AmbienteImagem { data: { sistemaAmbienteImagem_Alterar: SchemaInterface }}
export interface update_AmbienteIdentificador { data: { sistemaAmbienteIdentificador_Alterar: SchemaInterface }}
export interface update_AmbienteComplemento { data: { sistemaAmbienteComplemento_Alterar: SchemaInterface }}
export interface update_AmbienteIntegracao { data: { sistemaAmbienteIntegracao_Alterar: SchemaInterface }}


export abstract class AmbienteData {
    abstract readAmbienteSistema(): Observable<read_AmbienteSistema>;
    abstract updateAmbienteInterface(data: AmbienteSistema): Observable<update_AmbienteInterface>;
    abstract updateAmbienteLogin(data: AmbienteSistema): Observable<update_AmbienteLogin>;
    abstract updateAmbienteIdentificador(data: AmbienteSistema): Observable<update_AmbienteIdentificador>;
    abstract updateAmbienteComplemento(data: AmbienteSistema): Observable<update_AmbienteComplemento>;
    abstract updateAmbienteIntegracao(data: AmbienteSistema): Observable<update_AmbienteIntegracao>;
    abstract updateAmbienteImagem(data: AmbienteSistema): Observable<update_AmbienteImagem>;
    abstract getAmbiente(): Observable<Ambiente[]>;
}
