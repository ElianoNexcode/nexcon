import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

export interface Config {
    site?: SiteConfig
    organizacao?: OrganizacaoConfig
    plataforma?: PlataformaConfig
    user?: UserConfig
    sistema?: SistemaConfig
    configuracao?: ConfiguracaoConfig
}

export interface Token {
    licenca?: string
    operadorId?: string
    operadorNome?: string
    operadorNivel?: string
    operadorNivelPrivilegio?: string
    sistema?: string
    exp?: number
    iss?: string
    aud?: string
}

export interface SiteConfig {
    id: number
    nome: string
}

export interface SetorConfig {
    id: number
    nome: string
}

export interface OrganizacaoConfig {
    organizacaoNome?: string
    organizacaoLogo?: string
}

export interface ConfiguracaoConfig {
    loginDigitos: number
    loginSenhaDigitos: number
    loginSenhaCaracter: number
    loginSenhaRenovacao: number
    loginSenhaExpiracao: number
}

export interface PlataformaConfig {
    logo: string | null
}

export interface UserConfig {
    login: string,
    usuario: string,
    dataHora: string
}

export interface SistemaConfig {
    id: number;
    softwareLicenca?: string
    softwareLicencaNumero?: string
    softwareLicencaRegistro?: string
    softwareLicencaVersao?: number
    softwareLicencaEdicao?: string
    softwareLicencaVolume?: string
    softwareLicencaRelease?: string
    solucaoEspecifica?: string
    solucaoIntegrada?: number
    loginDigitos?: string
    loginSenhaDigitos?: string
    loginSenhaCaracter?: number
    loginSenhaRenovacao?: number
    loginSenhaExpiracao?: number
}

export enum Versao {
    "TRY" = 0,
    "ONE" = 1,
    "PRO" = 2,
    "PLUS" = 3,
}

@Injectable({
    providedIn: 'root'
})
export class ConfigStorage {

    config: Config = {};
    tokenDecode?: Token;
    siteIdFilter?: any;

    constructor() {
        const nexcon: string = window.localStorage.getItem("nexcon") || '';
        const config = JSON.parse(nexcon);
        if(config != null) {
            this.config = config;
        }
    }

    organizacaoBehavior?: BehaviorSubject<OrganizacaoConfig | undefined>;
    siteBehavior?: BehaviorSubject<SiteConfig | undefined>;
    plataformaBehavior?: BehaviorSubject<PlataformaConfig | undefined>;
    sistemaBehavior?: BehaviorSubject<SistemaConfig | undefined>;
    configuracaoBehavior?: BehaviorSubject<ConfiguracaoConfig | undefined>;

    getConfig<T>(key: string): T {
        type objectKey = keyof typeof this.config;
        const configKey: objectKey = key as objectKey;

        const nexcon: string = window.localStorage.getItem("nexcon") || '';
        const config = JSON.parse(nexcon);
        if(config != null) {
            this.config = config;
        }
        return this.config[configKey] as T;
    }

    setSites(siteIdFilter: any) {
        this.siteIdFilter = siteIdFilter;
    }

    setConfig<T>(config: T, key: string) {

        type objectKey = keyof typeof this.config;
        const configKey: objectKey = key as objectKey;
  
        this.config = {[key]: {... config}};
        window.localStorage.setItem("nexcon", JSON.stringify(this.config));

        switch (key) {
            case "site":
                this.siteBehavior?.next(this.config[configKey] as SiteConfig);
                break;

            case "organizacao":
                this.organizacaoBehavior?.next(this.config[configKey] as OrganizacaoConfig);
                break;

            case "plataforma":
                this.plataformaBehavior?.next(this.config[configKey] as PlataformaConfig);
                break;

            case "sistema":
                this.sistemaBehavior?.next(this.config[configKey] as SistemaConfig);
                break;

            case "configuracao":
                this.configuracaoBehavior?.next(this.config[configKey] as ConfiguracaoConfig);
                break;
        }
    }

    organizacaoSubject(): BehaviorSubject<OrganizacaoConfig | undefined> {
        if(!this.organizacaoBehavior || this.organizacaoBehavior.closed) {
            this.organizacaoBehavior = new BehaviorSubject(this.config["organizacao"]);
        }        
        return this.organizacaoBehavior;
    }

    siteSubject(): BehaviorSubject<SiteConfig | undefined> {
        if(!this.siteBehavior || this.siteBehavior.closed) {
            this.siteBehavior = new BehaviorSubject(this.config["site"]);
        }
        return this.siteBehavior;
    }

    plataformaSubject(): BehaviorSubject<PlataformaConfig | undefined> {
        if(!this.plataformaBehavior || this.plataformaBehavior.closed) {
            this.plataformaBehavior = new BehaviorSubject(this.config["plataforma"]);
        }
        return this.plataformaBehavior;
    }

    sistemaSubject(): BehaviorSubject<SistemaConfig | undefined> {
        if(!this.sistemaBehavior || this.sistemaBehavior.closed) {
            this.sistemaBehavior = new BehaviorSubject(this.config["sistema"]);
        } 
        return this.sistemaBehavior;
    }

    configuracaoSubject(): BehaviorSubject<ConfiguracaoConfig | undefined> {
        if(!this.configuracaoBehavior || this.configuracaoBehavior.closed) {
            this.configuracaoBehavior = new BehaviorSubject(this.config["configuracao"]);
        }        
        return this.configuracaoBehavior;
    }

    converteImagemArray(_buffer: any) {
        if (_buffer != null) {
            _buffer = _buffer.substr(_buffer.indexOf(",") + 1);
            if (_buffer && _buffer != null) {
                return atob(_buffer).split('').map(function (c) {
                    return (c.charCodeAt(0));
                });
            } else {
                return null;
            }
        } else {
            return null;
        }
    }

    converteImagemBase64(imagem: Array<number> | null): string | null {
        var i = 0;
        let byteNumbers = "";
        if (imagem != null) {
            for (i = 0; i < imagem.length; i++) {
                byteNumbers += String.fromCharCode(parseInt(imagem[i].toString(), 10));
            };
            return "data:image/png;base64," + btoa(byteNumbers);
        };
        return null;
    }

}