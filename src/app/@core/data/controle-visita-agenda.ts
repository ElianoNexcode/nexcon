import { Observable } from 'rxjs';
import { FilterInput, SchemaInterface, SortOperationKind } from '../api/generic-graphql';
import { PessoaExternaUsuario } from './usuario-pessoa-externa';

export interface ControleVisitaAgenda {
    id: number
    pessoaId: number
    pessoaDocTipo: string
    pessoaDocNumero: string
    pessoaNome: string
    pessoaCPF: string
    pessoaEmpresaNome: string
    pessoaEmpresaCNPJ: string
    pessoaTipo: string
    pessoaCargo: string
    pessoaGrupo: string
    pessoaGestor: string
    pessoaDivisao: string
    pessoaComplemento1: string
    visitadoId: number
    visitadoNome: string
    visitadoUnidadeId: number
    visitadoUnidadeNome: string
    visitadoLocalizacao: string
    visitadoComplemento: string
    visitadoEmail: string
    visitadoGrupo: string
    visitadoTelefone: string
    veiculoId: number
    veiculoTipo: string
    veiculoClasse: number
    veiculoModelo: string
    veiculoCor: string
    veiculoIdentificacao: string
    motivo: string
    observacao: string
    agendamentoDataHora: Date
    agendamentoValidadeFinal: Date
    pessoaExterna: PessoaExternaUsuario
}


export interface ControleVisitaAgendaSort {      // Order_By
    id?: SortOperationKind;
    pessoaNome?: SortOperationKind
    agendamentoValidadeInicial?: SortOperationKind;
}

export interface ControleVisitaAgendaFilter {    // Where
    siteId?: FilterInput
    pessoaDocTipo?: FilterInput
    pessoaDocNumero?: FilterInput
    pessoaNome?: FilterInput
    agendamentoDataHora?: FilterInput
    agendamentoValidadeInicial?: FilterInput
    agendamentoValidadeFinal?: FilterInput
    pessoaGrupo?: FilterInput
    pessoaCPF?: FilterInput
    veiculoModelo?: FilterInput
    veiculoIdentificacao?: FilterInput
    veiculoCor?: FilterInput
    motivo?: FilterInput
    visitadoNome?: FilterInput
    visitadoUnidadeNome?: FilterInput
    visitadoLocalizacao?: FilterInput
    visitadoComplemento?: FilterInput
    observacao?: FilterInput
}

export interface ControleVisitaAgendaSchema extends SchemaInterface {
    nodes: ControleVisitaAgenda[];
    totalCount: number
}

export interface read_ControleVisitaAgenda { controleVisitaAgenda: ControleVisitaAgendaSchema }

export abstract class ControleVisitaAgendaData {
    abstract readControleVisitaAgenda(order?: ControleVisitaAgendaSort, where?: ControleVisitaAgendaFilter, first?: number): Observable<read_ControleVisitaAgenda>;
}