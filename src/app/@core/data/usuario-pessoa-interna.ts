import { Observable } from 'rxjs';
import { FilterInput, SchemaInterface, SortOperationKind } from '../api/generic-graphql';
import { OperadorConfiguracaoFilter } from './configuracao-operador-operador';
import { CentroCustoGrupoFilter, CentroCustoGrupoSort } from './grupo-centro-custo';
import { PessoaGrupo, PessoaGrupoSort } from './grupo-pessoa';
import { AreaReparticao, AreaReparticaoFilter, AreaReparticaoSort } from './reparticao-area';
import { EmpresaReparticao, EmpresaReparticaoFilter, EmpresaReparticaoSort } from './reparticao-empresa';
import { SetorReparticao, SetorReparticaoSort } from './reparticao-setor';
import { EstacionamentoVaga } from './reparticao-vaga-estacionamento';
import { VeiculoExternoUsuario } from './usuario-veiculo-externo';
import { VeiculoInternoUsuario } from './usuario-veiculo-interno';

export interface Abordagem {
    mensagemInformativa: string
    mensagemAdvertida: string
    mensagemRestritiva: string
}

export interface Areas {
    areaId: number
    area: AreaReparticao
}

export interface NivelAcesso {
    id?: number,
    nivelAcessoId?: number,
    nivelAcesso?: {
        id?: number,
        nome?: string,
        areas?: Areas[]
    }
}

export interface Veiculos {
    id: number
}

export interface Responsavel {
    responsavelId?: number
    responsavel?: PessoaInternaUsuario
}

export interface CentroCusto {
    id: number
    centroCusto: string
}

export interface PessoaInternaUsuario {
    id: number
    guid?: string
    nome: string

    imagem?: {
        imagem: Array<number>
    }

    nascimento?: string
    telefoneFixo?: string
    telefoneMovel?: string

    email?: string
    areaId?: number
    area?: AreaReparticao
    localizacao?: string

    acessoCartao?: string
    acessoSenha?: string
    acessoCredito?: string
    afastamentoFim?: string
    afastamentoInicio?: string
    autorizaVisita?: boolean
    cargo?: string
    centroCusto?: CentroCusto
    centroCustoId?: number
    cognome?: string
    contratacaoFim?: string
    contratacaoInicio?: string
    documentoNumero?: string
    documentoTipo?: string
    empresaCNPJ?: string
    empresa?: EmpresaReparticao
    empresaId?: number
    endereco?: Endereco
    enderecoId?: number
    exameMedicoFim?: string
    exameMedicoInicio?: string
    feriasFim?: string
    feriasInicio?: string
    garagens?: EstacionamentoVaga[]
    grupoId?: number
    grupo?: PessoaGrupo
    habilitacaoCategoria?: string
    habilitacaoRegistro?: string
    habilitacaoValidade?: string
    identificador?: string
    identificadorFim?: string
    identificadorInicio?: string
    ignorarBiometria?: boolean
    ignorarDirecao?: boolean
    ignorarTemporizacao?: boolean
    integracaoFim?: string
    integracaoInicio?: string
    liberarSaidaExpirada?: boolean
    presente?: boolean
    recebeVisita?: boolean
    segurancaFim?: string
    segurancaInicio?: string
    status?: boolean
    supervisorId?: number
    supervisor?: PessoaInternaUsuario
    veiculoInterno?: VeiculoInternoUsuario[]
    veiculos?: {veiculoId?: number, veiculoInterno: VeiculoInternoUsuario}[]

    niveisAcessoPermanente?: NivelAcesso[]
    niveisAcessoRotativo?: NivelAcesso[]

    complemento1?: string
    complemento2?: string
    complemento3?: string
    complemento4?: string

    abordagemAdvertida?: string
    abordagemInformativa?: string
    abordagemRestritiva?: string
    abordagem?: Abordagem

    responsaveis?: Responsavel[]
    observacao?: string
}
export interface PessoaInternaUsuarioMutation {
    id: number
    imagem?: {
        imagem: Array<number>
    }
    acessoCartao?: string
    acessoSenha?: string
    acessoCredito?: string
    afastamentoFim?: string
    afastamentoInicio?: string
    autorizaVisita?: boolean
    cargo?: string
    centroCusto?: CentroCusto
    centroCustoId?: number
    cognome?: string
    contratacaoFim?: string
    contratacaoInicio?: string
    documentoNumero?: string
    documentoTipo?: string
    email?: string
    empresa?: EmpresaReparticao
    empresaId?: number
    endereco?: Endereco
    enderecoId?: number
    exameMedicoFim?: string
    exameMedicoInicio?: string
    feriasFim?: string
    feriasInicio?: string
    garagens?: EstacionamentoVaga
    grupoId?: number
    grupo?: PessoaGrupo
    guid?: string
    habilitacaoCategoria?: string
    habilitacaoRegistro?: string
    habilitacaoValidade?: string
    identificador?: string
    identificadorFim?: string
    identificadorInicio?: string
    ignorarBiometria?: boolean
    ignorarDirecao?: boolean
    ignorarRota?: boolean
    ignorarCredito?: boolean
    ignorarTemporizacao?: boolean
    ignorarValidacaoExterna?: boolean
    integracaoFim?: string
    integracaoInicio?: string
    liberarSaidaExpirada?: boolean
    localizacao?: string
    nascimento?: string
    nome?: string
    observacao?: string
    presente?: boolean
    recebeVisita?: boolean
    segurancaFim?: string
    segurancaInicio?: string
    status?: boolean
    supervisorId?: number
    telefoneFixo?: string
    telefoneMovel?: string
    areaId?: number
    area?: AreaReparticao
    veiculosExternos?: VeiculoExternoUsuario
    enderecoLogradouro?: string
    enderecoNumero?: string
    enderecoBairro?: string
    enderecoCep?: string
    enderecoCidade?: string
    enderecoComplemento?: string
    enderecoEstado?: string
    enderecoPais?: string

    niveisAcessoPermanente: NivelAcesso[]
    niveisAcessoRotativo: NivelAcesso[]

    complemento1?: string
    complemento2?: string
    complemento3?: string
    complemento4?: string

    veiculos?: Veiculos[] 
    abordagem?: Abordagem

    responsaveis?: number[],
}

interface Veiculo {
    veiculoId?: number
    veiculoExterno?: VeiculoExternoUsuario
}

export interface Endereco {
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

export interface PessoaInternaUsuarioSort {
    id?: SortOperationKind
    nome?: SortOperationKind 
    status?: SortOperationKind
    area?: AreaReparticaoSort
    grupo?: PessoaGrupoSort
    supervisor?: PessoaInternaUsuarioSort
    documentoNumero?: SortOperationKind
    localizacao?: SortOperationKind
    telefoneFixo?: SortOperationKind
    email?: SortOperationKind
    cadastroData?: SortOperationKind
    cargo?: SortOperationKind
    centroCusto?: CentroCustoGrupoSort
    contratacaoInicio?: SortOperationKind
    contratacaoFim?: SortOperationKind
    integracaoInicio?: SortOperationKind
    integracaoFim?: SortOperationKind
    segurancaFim?: SortOperationKind
    segurancaInicio?: SortOperationKind
    exameMedicoInicio?: SortOperationKind
    exameMedicoFim?: SortOperationKind
    feriasFim?: SortOperationKind
    feriasInicio?: SortOperationKind
    afastamentoInicio?: SortOperationKind
    afastamentoFim?: SortOperationKind
    empresa?: EmpresaReparticaoSort
    identificador?: SortOperationKind
    complemento1?: SortOperationKind
    complemento2?: SortOperationKind
    complemento3?: SortOperationKind
    complemento4?: SortOperationKind
    acessoCartao?: SortOperationKind
}

export interface PessoaInternaUsuarioFilter {
    id?: FilterInput
    nome?: FilterInput
    grupoId?: FilterInput
    telefoneFixo?: FilterInput
    email?: FilterInput
    empresa?: EmpresaReparticaoFilter
    areaId?: FilterInput
    area?: AreaReparticaoFilter
    status?: FilterInput
    identificador?: FilterInput
    acessoCartao?: FilterInput
    grupo?: FilterInput
    documentoNumero?: FilterInput
    documentoTipo?: FilterInput
    matricula?: FilterInput
    cargo?: FilterInput
    complemento1?: FilterInput
    complemento2?: FilterInput
    complemento3?: FilterInput
    complemento4?: FilterInput
    cPF?: FilterInput
    supervisor?: PessoaInternaUsuarioFilter
    departamento?: FilterInput
    observacao?: FilterInput
    localizacao?: FilterInput
    siteCode?: FilterInput
    site?: FilterInput
    centroCustoId?: FilterInput
    operador?: OperadorConfiguracaoFilter
    and?: [{cadastroData: FilterInput},
           {cadastroData: FilterInput}]
}

export interface PessoaInternaUsuarioSchema extends SchemaInterface {
    nodes: PessoaInternaUsuario[]
    totalCount: number
}

export interface create_PessoaInternaUsuario { data: { usuarioPessoaInterna_Inserir: SchemaInterface }}
export interface read_PessoaInternaUsuario { usuarioPessoaInterna: PessoaInternaUsuarioSchema }
export interface update_PessoaInternaUsuario { data: { usuarioPessoaInterna_Alterar: SchemaInterface }}
export interface delete_PessoaInternaUsuario { data: { usuarioPessoaInterna_Excluir: SchemaInterface }}


export abstract class PessoaInternaUsuarioData {
    abstract createPessoaInternaUsuario(site: PessoaInternaUsuarioMutation): Observable<create_PessoaInternaUsuario>;
    abstract readPessoaInternaUsuarios(order?: PessoaInternaUsuarioSort, where?: PessoaInternaUsuarioFilter, first?: number): Observable<read_PessoaInternaUsuario>;
    abstract readPessoaInternaRelat(order?: PessoaInternaUsuarioSort, where?: PessoaInternaUsuarioFilter, first?: number): Observable<read_PessoaInternaUsuario>;
    abstract updatePessoaInternaUsuario(site: PessoaInternaUsuarioMutation): Observable<update_PessoaInternaUsuario>;
    abstract deletePessoaInternaUsuario(id: number): Observable<delete_PessoaInternaUsuario>;
    abstract readPessoaInternaCargos(): Observable<string[]>;
    abstract readPessoaInternaLocalizacoes(): Observable<string[]>;
    
}