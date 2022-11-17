import { Injectable } from '@angular/core';
import { of as ObservableOf } from 'rxjs';

import { GenericGraphQL } from 'src/app/@core/api/generic-graphql';
import {
    GestaoUsuarioData,
    GestaoUsuarioFilter,
    GestaoUsuarioSort,
    read_GestaoUsuario, Report
} from 'src/app/@core/data/gestao-usuario';

import { PessoaTipo, TipoVeiculo } from 'src/app/@core/enum';

import { GestaoUsuarioSchema } from './usuario.schema';

@Injectable({
    providedIn: 'root'
})
export class GestaoUsuarioService extends GestaoUsuarioData {

    constructor(private graphQL: GenericGraphQL) {
        super();
    }

    readGestaoUsuarios() {
        const variables = { ... this.graphQL.session };
        return this.graphQL.query<read_GestaoUsuario>(GestaoUsuarioSchema.read_Gestao_Informacao, variables);
    }

    getReports(relatorioTipo: number, estilo: string) {
        var report: Report[];

        if (relatorioTipo == PessoaTipo.interna) {

            report = [

                {
                    codigo: "R1PI-1001",
                    estilo: "Simples",
                    informacoes: "Nome - Grupo - Setor - Área - Site"
                },
                {
                    codigo: "R1PI-1002",
                    estilo: "Simples",
                    informacoes: "Nome - Grupo - Setor - Área - Site - Status"
                },
                {
                    codigo: "R1PI-1003",
                    estilo: "Simples",
                    informacoes: "Nome - Grupo - Setor - Área - Site - Data Cadastro"
                },
                {
                    codigo: "R1PI-1004",
                    estilo: "Simples",
                    informacoes: "Nome - Grupo - Setor - Área - Site - Supervisor"
                },
                {
                    codigo: "R1PI-1005",
                    estilo: "Simples",
                    informacoes: "Nome - Grupo - Área - Cargo - Telefone - E-mail"
                },
                {
                    codigo: "R1PI-1006",
                    estilo: "Simples",
                    informacoes: "Nome - ID - Cartão - Grupo - Área - Site"
                },
                {
                    codigo: "R1PI-1007",
                    estilo: "Simples",
                    informacoes: "Nome - ID - Grupo - Área - Localização - Site"
                },
                {
                    codigo: "R1PI-1008",
                    estilo: "Simples",
                    informacoes: "Nome - ID - Grupo - Área - Site - Centro de Custo"
                },
                {
                    codigo: "R1PI-1009",
                    estilo: "Simples",
                    informacoes: "Nome - ID - Grupo - Área - Validade Contratação"
                },
                {
                    codigo: "R1PI-1010",
                    estilo: "Simples",
                    informacoes: "Nome - ID - Grupo - Área - Validade Integração"
                },
                {
                    codigo: "R1PI-1011",
                    estilo: "Simples",
                    informacoes: "Nome - ID - Grupo - Área - Validade Segurança"
                },
                {
                    codigo: "R1PI-1012",
                    estilo: "Simples",
                    informacoes: "Nome - ID - Grupo - Área - Validade Exame Médico"
                },
                {
                    codigo: "R1PI-1013",
                    estilo: "Simples",
                    informacoes: "Nome - ID - Grupo - Área - Validade Férias"
                },
                {
                    codigo: "R1PI-1014",
                    estilo: "Simples",
                    informacoes: "Nome - ID - Grupo - Área - Validade Afastamento"
                },
                {
                    codigo: "R1PI-1015",
                    estilo: "Simples",
                    informacoes: "Nome - ID - Grupo - Área - Empresa"
                },
                {
                    codigo: "R1PI-1016",
                    estilo: "Simples",
                    informacoes: "Nome - ID - Grupo - Área - Complemento 1"
                },
                {
                    codigo: "R1PI-1017",
                    estilo: "Simples",
                    informacoes: "Nome - ID - Grupo - Área - Complemento 2"
                },
                {
                    codigo: "R1PI-1018",
                    estilo: "Simples",
                    informacoes: "Nome - ID - Grupo - Área - Complemento 3"
                },
                {
                    codigo: "R1PI-1019",
                    estilo: "Simples",
                    informacoes: "Nome - ID - Grupo - Área - Complemento 4"
                },
                {
                    codigo: "R1PI-1020",
                    estilo: "Simples",
                    informacoes: "Nome - ID - Grupo - Área - Lista de Veículo Vinculado"
                },
                {
                    codigo: "R1PI-1021",
                    estilo: "Simples",
                    informacoes: "Nome - ID - Grupo - Área - Lista de Nível de Acesso"
                },
                {
                    codigo: "R1PI-1022",
                    estilo: "Simples",
                    informacoes: "Nome - ID - Grupo - Área - Abordagem"
                }];
        } else if (relatorioTipo == PessoaTipo.externa) {

            report = [

                {
                    codigo: "R1PE-1001",
                    estilo: "Simples",
                    informacoes: "Nome - Grupo - Empresa"
                },
                {
                    codigo: "R1PE-1002",
                    estilo: "Simples",
                    informacoes: "Nome - Grupo - Empresa - Status"
                },
                {
                    codigo: "R1PE-1003",
                    estilo: "Simples",
                    informacoes: "Nome - Grupo - Empresa - Data Cadastro"
                },
                {
                    codigo: "R1PE-1004",
                    estilo: "Simples",
                    informacoes: "Nome - Grupo - Empresa - Telefone - Email"
                },
                {
                    codigo: "R1PE-1005",
                    estilo: "Simples",
                    informacoes: "Nome - Grupo - Empresa - Validade Integração"
                },
                {
                    codigo: "R1PE-1006",
                    estilo: "Simples",
                    informacoes: "Nome - Grupo - Empresa - Validade Segurança"
                },
                {
                    codigo: "R1PE-1007",
                    estilo: "Simples",
                    informacoes: "Nome - Grupo - Empresa - Validade Exame Médico"
                },
                {
                    codigo: "R1PE-1008",
                    estilo: "Simples",
                    informacoes: "Nome - Grupo - Empresa - Complemento 1"
                },
                {
                    codigo: "R1PE-1009",
                    estilo: "Simples",
                    informacoes: "Nome - Grupo - Empresa - Complemento 2"
                },
                {
                    codigo: "R1PE-1010",
                    estilo: "Simples",
                    informacoes: "Nome - Grupo - Empresa - Complemento 3"
                },
                {
                    codigo: "R1PE-1011",
                    estilo: "Simples",
                    informacoes: "Nome - Grupo - Empresa - Complemento 4"
                },
                {
                    codigo: "R1PE-1012",
                    estilo: "Simples",
                    informacoes: "Nome - Grupo - Empresa - Veículo Vinculado"
                },
                {
                    codigo: "R1PE-1013",
                    estilo: "Simples",
                    informacoes: "Nome - Grupo - Empresa - Abordagem"
                }];
        } else if (relatorioTipo == TipoVeiculo.interno) {

            report = [
                {
                    codigo: "R1VI-1001",
                    estilo: "Simples",
                    informacoes: "Veículo ID - Tipo - Modelo - Cor - Grupo - Área - Site"
                },
                {
                    codigo: "R1VI-1002",
                    estilo: "Simples",
                    informacoes: "Veículo ID - Tipo - Modelo - Cor - Área - Setor - Site - Status"
                },
                {
                    codigo: "R1VI-1003",
                    estilo: "Simples",
                    informacoes: "Veículo ID - Tipo - Modelo - Cor - Área - Setor - Site - Data Cadastro"
                },
                {
                    codigo: "R1VI-1004",
                    estilo: "Simples",
                    informacoes: "Veículo ID - Tipo - Modelo - Cor - Área - Site - Supervisor"
                },
                {
                    codigo: "R1VI-1005",
                    estilo: "Simples",
                    informacoes: "Veículo ID - Tipo - Modelo - Cor - Característica - Área - Site"
                },
                {
                    codigo: "R1VI-1006",
                    estilo: "Simples",
                    informacoes: "Veículo ID - Tipo - Modelo - Cor - Tag - Área - Setor - Site"
                },
                {
                    codigo: "R1VI-1007",
                    estilo: "Simples",
                    informacoes: "Veículo ID - Tipo - Modelo - Cor - Tag - Área - Localização - Site"
                },
                {
                    codigo: "R1VI-1008",
                    estilo: "Simples",
                    informacoes: "Veículo ID - Tipo - Modelo - Cor - Área - Site - Centro de Custo"
                },
                {
                    codigo: "R1VI-1009",
                    estilo: "Simples",
                    informacoes: "Veículo ID - Tipo - Modelo - Cor - Área - Site - Complemento 1"
                },
                {
                    codigo: "R1VI-1010",
                    estilo: "Simples",
                    informacoes: "Veículo ID - Tipo - Modelo - Cor - Área - Site - Complemento 2"
                },
                {
                    codigo: "R1VI-1011",
                    estilo: "Simples",
                    informacoes: "Veículo ID - Tipo - Modelo - Cor - Área - Site - Complemento 3"
                },
                {
                    codigo: "R1VI-1012",
                    estilo: "Simples",
                    informacoes: "Veículo ID - Tipo - Modelo - Cor - Área - Site - Complemento 4"
                },
                {
                    codigo: "R1VI-1013",
                    estilo: "Simples",
                    informacoes: "Veículo ID - Tipo - Modelo - Cor - Área - Site - Observação"
                },
                {
                    codigo: "R1VI-1014",
                    estilo: "Simples",
                    informacoes: "Veículo ID - Tipo - Modelo - Cor - Área - Site - Lista de Condutores"
                },
                {
                    codigo: "R1VI-1015",
                    estilo: "Simples",
                    informacoes: "Veículo ID - Tipo - Modelo - Cor - Área - Site - Lista de Nível de Acesso"
                },
                {
                    codigo: "R1VI-1016",
                    estilo: "Simples",
                    informacoes: "Veículo ID - Tipo - Modelo - Cor - Área - Site - Abordagem"
                }];
        } else if (relatorioTipo == TipoVeiculo.externo) {

            report = [
                {
                    codigo: "R1VE-1001",
                    estilo: "Simples",
                    informacoes: "Veículo ID - Tipo - Modelo - Cor - Grupo"
                },
                {
                    codigo: "R1VE-1002",
                    estilo: "Simples",
                    informacoes: "Veículo ID - Tipo - Modelo - Cor - Status"
                },
                {
                    codigo: "R1VE-1003",
                    estilo: "Simples",
                    informacoes: "Veículo ID - Tipo - Modelo - Cor - Data Cadastro"
                },
                {
                    codigo: "R1VE-1004",
                    estilo: "Simples",
                    informacoes: "Veículo ID - Tipo - Modelo - Cor - Característica"
                },
                {
                    codigo: "R1VE-1005",
                    estilo: "Simples",
                    informacoes: "Veículo ID - Tipo - Modelo - Cor - Empresa"
                },
                {
                    codigo: "R1VE-1006",
                    estilo: "Simples",
                    informacoes: "Veículo ID - Tipo - Modelo - Cor - Complemento 1"
                },
                {
                    codigo: "R1VE-1007",
                    estilo: "Simples",
                    informacoes: "Veículo ID - Tipo - Modelo - Cor - Complemento 2"
                },
                {
                    codigo: "R1VE-1008",
                    estilo: "Simples",
                    informacoes: "Veículo ID - Tipo - Modelo - Cor - Complemento 3"
                },
                {
                    codigo: "R1VE-1009",
                    estilo: "Simples",
                    informacoes: "Veículo ID - Tipo - Modelo - Cor - Complemento 4"
                },
                {
                    codigo: "R1VE-1010",
                    estilo: "Simples",
                    informacoes: "Veículo ID - Tipo - Modelo - Cor - Observação"
                },
                {
                    codigo: "R1VE-1011",
                    estilo: "Simples",
                    informacoes: "Veículo ID - Tipo - Modelo - Cor - Lista de Condutores"
                },
                {
                    codigo: "R1VE-1012",
                    estilo: "Simples",
                    informacoes: "Veículo ID - Tipo - Modelo - Cor - Abordagem"
                }];
        } else if (relatorioTipo == 6) {
            report = [
                {
                    codigo: "R1EP-1001",
                    estilo: "Simples",
                    informacoes: "Nome - Grupo - Data Cadastro"
                },
                {
                    codigo: "R1EP-1002",
                    estilo: "Simples",
                    informacoes: "Nome - Grupo - Gestor - Telefone - E-mail"
                },
                {
                    codigo: "R1EP-1003",
                    estilo: "Simples",
                    informacoes: "Nome - Grupo - Complemento 1 - Complemento 2"
                },
                {
                    codigo: "R1EP-1004",
                    estilo: "Simples",
                    informacoes: "Nome - Grupo - Pessoa Interna Vinculada"
                },
                {
                    codigo: "R1EP-1005",
                    estilo: "Simples",
                    informacoes: "Nome - Grupo - Pessoa Externa Vinculada"
                },];
        } else if (relatorioTipo == 7) {
            report = [
                {
                    codigo: "R1AR-1001",
                    estilo: "Simples",
                    informacoes: "Área - Tipo - Localização - Setor - Site"
                },
                {
                    codigo: "R1AR-1002",
                    estilo: "Simples",
                    informacoes: "Área - Tipo - Setor - Site - Área Mãe"
                },
                {
                    codigo: "R1AR-1003",
                    estilo: "Simples",
                    informacoes: "Área - Tipo - Setor - Site - Volume Permitido"
                },
                {
                    codigo: "R1AR-1004",
                    estilo: "Simples",
                    informacoes: "Área - Tipo - Setor - Site - Lista de Bloqueios"
                },
                {
                    codigo: "R1AR-1005",
                    estilo: "Simples",
                    informacoes: "Área - Tipo - Setor - Site - Lista de Pessoas"
                },
                {
                    codigo: "R1AR-1006",
                    estilo: "Simples",
                    informacoes: "Área - Tipo - Setor - Site - Lista de Veículos"
                },];
        } else if (relatorioTipo == 8) {
            report = [
                {
                    codigo: "R1ES-1001",
                    estilo: "Simples",
                    informacoes: "Estacionamento - Localização - Setor - Site"
                },
                {
                    codigo: "R1ES-1002",
                    estilo: "Simples",
                    informacoes: "Estacionamento - Setor - Site - Área Mãe"
                },
                {
                    codigo: "R1ES-1003",
                    estilo: "Simples",
                    informacoes: "Estacionamento - Setor - Site - Volume Permitido"
                },
                {
                    codigo: "R1ES-1004",
                    estilo: "Simples",
                    informacoes: "Estacionamento - Setor - Site - Lista de Bloqueios"
                },
                {
                    codigo: "R1ES-1005",
                    estilo: "Simples",
                    informacoes: "Estacionamento - Setor - Site - Lista de Garagens"
                },
                {
                    codigo: "R1ES-1006",
                    estilo: "Simples",
                    informacoes: "Estacionamento - Tipo de Garagem - Garagem - Localização - Site"
                },
                {
                    codigo: "R1ES-1007",
                    estilo: "Simples",
                    informacoes: "Estacionamento - Tipo de Garagem - Garagem - Área Vinculada"
                },
                {
                    codigo: "R1ES-1008",
                    estilo: "Simples",
                    informacoes: "Estacionamento - Tipo de Garagem - Garagem - Área Vinculada - Pessoa Vinculada"
                },
                {
                    codigo: "R1ES-1009",
                    estilo: "Simples",
                    informacoes: "Estacionamento - Tipo de Garagem - Garagem - Área Vinculada - Veículo Vinculado"
                }];
        } else if (relatorioTipo == 9) {
            report = [
                {
                    codigo: "R1NA-1001",
                    estilo: "Simples",
                    informacoes: "Nível Acesso - Restrito - Validade - Status"
                },
                {
                    codigo: "R1NA-1002",
                    estilo: "Simples",
                    informacoes: "Nível Acesso - Restrito - Status - Observação"
                },
                {
                    codigo: "R1NA-1003",
                    estilo: "Simples",
                    informacoes: "Nível Acesso - Restrito - Lista de Áreas"
                },
                {
                    codigo: "R1NA-1004",
                    estilo: "Simples",
                    informacoes: "Nível Acesso - Restrito - Lista de Áreas - Lista de Pessoas"
                },
                {
                    codigo: "R1NA-1005",
                    estilo: "Simples",
                    informacoes: "Nível Acesso - Restrito - Lista de Áreas - Lista de Veículos"
                }];
        }


        return ObservableOf(report.filter(rpt => rpt.estilo == estilo));
    }

}