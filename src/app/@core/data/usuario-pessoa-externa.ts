import { Observable } from 'rxjs';
import { FilterInput, SchemaInterface, SortOperationKind } from '../api/generic-graphql';
import { PessoaGrupo, PessoaGrupoSort } from './grupo-pessoa';
import { EmpresaReparticao, EmpresaReparticaoFilter, EmpresaReparticaoSort } from './reparticao-empresa';
import { EstacionamentoVaga } from './reparticao-vaga-estacionamento';
import { VeiculoExternoUsuario } from './usuario-veiculo-externo';

export interface PessoaExternaUsuario {

    id: number 
    imagem?: {
        imagem: Array<number>
    }
    nome: string
    grupoId?: number
    grupo?: PessoaGrupo
    grupoPessoa?: PessoaGrupo
    telefoneFixo?: string
    telefoneMovel?: string
    email?: string
    observacao?: string
    documentoTipo: string
    documentoNumero: string
    nascimento?: string
    empresaId?: number
    entidadeNome?: string
    empresa?: EmpresaReparticao
    complemento1?: string
    complemento2?: string
    complemento3?: string
    complemento4?: string
    endereco?: Endereco
    garagens?: EstacionamentoVaga
    cargo?: string
    integracaoInicio?: string
    integracaoFim?: string
    segurancaInicio?: string
    segurancaFim?: string
    exameMedicoInicio?: string
    exameMedicoFim?: string
    abordagem?: Abordagem

    ultimoVisitadoId?: number

    veiculos?: Veiculo[] 
    status?: boolean
}

export interface Veiculo {
    veiculoId?: number
    veiculoExterno?: VeiculoExternoUsuario
}

interface Endereco {
    pessoaId?: number
    logradouro: string
    numero: string
    complemento: string
    bairro: string
    cep: string
    cidade: string
    estado: string
    pais: string
}

interface Abordagem {
    mensagemInformativa: string
    mensagemAdvertida: string
    mensagemRestritiva: string
}

export interface PessoaExternaUsuarioSort {
    id?: SortOperationKind    
    nome?: SortOperationKind 
    grupo?: PessoaGrupoSort
    entidadeNome?: SortOperationKind
    observacao?: SortOperationKind
    complemento1?: SortOperationKind
    complemento2?: SortOperationKind
    complemento3?: SortOperationKind
    complemento4?: SortOperationKind
    integracaoInicio?: SortOperationKind
    exameMedicoInicio?: SortOperationKind
    segurancaInicio?: SortOperationKind
    integracaoFim?: SortOperationKind
    exameMedicoFim?: SortOperationKind
    segurancaFim?: SortOperationKind
    documentoNumero?: SortOperationKind
    status?: SortOperationKind
    email?: SortOperationKind
    telefoneFixo?: SortOperationKind
    dataCadastro?: SortOperationKind
}

export interface PessoaExternaUsuarioFilter {
    id?: FilterInput
    nome?: FilterInput
    entidadeNome?: FilterInput
    grupoId?: FilterInput
    telefoneFixo?: FilterInput
    unidade?: FilterInput
    localizacao?: FilterInput
    email?: FilterInput
    status?: FilterInput
    documentoTipo?: FilterInput
    documentoNumero?: FilterInput
    empresa?: EmpresaReparticaoFilter
    cPF?: FilterInput
    exInterno?: FilterInput
    complemento1?: FilterInput
    complemento2?: FilterInput
    complemento3?: FilterInput
    complemento4?: FilterInput

    observacao?: FilterInput

    and?: [{dataCadastro: FilterInput},
           {dataCadastro: FilterInput}]
}

export interface PessoaExternaUsuarioSchema extends SchemaInterface {
    nodes: PessoaExternaUsuario[]
    totalCount: number
}

export interface create_PessoaExternaUsuario { data: { usuarioPessoaExterna_Inserir: SchemaInterface }}
export interface read_PessoaExternaUsuario { usuarioPessoaExterna: PessoaExternaUsuarioSchema }
export interface update_PessoaExternaUsuario { data: { usuarioPessoaExterna_Alterar: SchemaInterface }}
export interface delete_PessoaExternaUsuario { data: { usuarioPessoaExterna_Excluir: SchemaInterface }}

export abstract class PessoaExternaUsuarioData {
    abstract createPessoaExternaUsuario(site: PessoaExternaUsuario): Observable<create_PessoaExternaUsuario>;
    abstract readPessoaExternaUsuarios(order?: PessoaExternaUsuarioSort, where?: PessoaExternaUsuarioFilter, first?: number): Observable<read_PessoaExternaUsuario>;
    abstract readPessoaExternaRelat(order?: PessoaExternaUsuarioSort, where?: PessoaExternaUsuarioFilter, first?: number): Observable<read_PessoaExternaUsuario>;
    abstract updatePessoaExternaUsuario(site: PessoaExternaUsuario): Observable<update_PessoaExternaUsuario>;
    abstract deletePessoaExternaUsuario(id: number): Observable<delete_PessoaExternaUsuario>;
    abstract readPessoaExternaCargo(): Observable<string[]>;
}