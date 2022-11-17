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
    organizacaoNome: string
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
    logo: string
}

export interface UserConfig {
    login: string,
    usuario: string,
    dataHora: string
}

export interface SistemaConfig {
    id: number;
    softwareLicenca: string
    softwareLicencaNumero: string
    softwareLicencaRegistro: string
    softwareLicencaVersao: number
    softwareLicencaEdicao: string
    softwareLicencaVolume: string
    softwareLicencaRelease: string
    solucaoEspecifica: string
    solucaoIntegrada: number
    loginDigitos: string
    loginSenhaDigitos: string
    loginSenhaCaracter: number
    loginSenhaRenovacao: number
    loginSenhaExpiracao: number
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
    tokenDecode: Token;
    siteIdFilter: any;

    constructor() {
        const config = JSON.parse(window.localStorage.getItem("nexcon"));
        if(config != null) {
            this.config = config;
        }
    }

    organizacaoBehavior: BehaviorSubject<OrganizacaoConfig> = new BehaviorSubject(null);
    siteBehavior: BehaviorSubject<SiteConfig> = new BehaviorSubject(null);
    plataformaBehavior: BehaviorSubject<PlataformaConfig> = new BehaviorSubject(null);
    sistemaBehavior: BehaviorSubject<SistemaConfig> = new BehaviorSubject(null);
    configuracaoBehavior: BehaviorSubject<ConfiguracaoConfig> = new BehaviorSubject(null);

    getConfig<T>(key: string): T {
        const config = JSON.parse(window.localStorage.getItem("nexcon"));
        if(config != null) {
            this.config = config;
        }
        return this.config[key] || {};
    }

    setSites(siteIdFilter: any) {
        this.siteIdFilter = siteIdFilter;
    }

    setConfig<T>(config: T, key?: string) {
        this.config[key] = { ... config };
        window.localStorage.setItem("nexcon", JSON.stringify(this.config));
        switch (key) {
            case "site":
                this.siteBehavior?.next(this.config[key]);
                break;

            case "organizacao":
                this.organizacaoBehavior?.next(this.config[key]);
                break;

            case "plataforma":
                this.plataformaBehavior?.next(this.config[key]);
                break;

            case "sistema":
                this.sistemaBehavior?.next(this.config[key]);
                break;

            case "configuracao":
                this.configuracaoBehavior?.next(this.config[key]);
                break;
        }
    }

    organizacaoSubject(): BehaviorSubject<OrganizacaoConfig> {
        if(!this.organizacaoBehavior || this.organizacaoBehavior.closed) {
            this.organizacaoBehavior = new BehaviorSubject(this.config["organizacao"]);
        }        
        return this.organizacaoBehavior;
    }

    siteSubject(): BehaviorSubject<SiteConfig> {
        if(!this.siteBehavior || this.sistemaBehavior.closed) {
            this.siteBehavior = new BehaviorSubject(this.config["site"]);
        }
        return this.siteBehavior;
    }

    plataformaSubject(): BehaviorSubject<PlataformaConfig> {
        if(!this.plataformaBehavior || this.plataformaBehavior.closed) {
            this.plataformaBehavior = new BehaviorSubject(this.config["plataforma"]);
        }
        return this.plataformaBehavior;
    }

    sistemaSubject(): BehaviorSubject<SistemaConfig> {
        if(!this.sistemaBehavior || this.sistemaBehavior.closed) {
            this.sistemaBehavior = new BehaviorSubject(this.config["sistema"]);
        } 
        return this.sistemaBehavior;
    }

    configuracaoSubject(): BehaviorSubject<ConfiguracaoConfig> {
        if(!this.configuracaoBehavior || this.configuracaoBehavior.closed) {
            this.configuracaoBehavior = new BehaviorSubject(this.config["configuracao"]);
        }        
        return this.configuracaoBehavior;
    }

    converteImagemArray(_buffer) {
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

    converteImagemBase64(imagem: Array<number>): string {
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