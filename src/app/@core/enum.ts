export enum YesNo {
    "SIM" = 1,
    "NÃO" = 0
}

export enum comboTypes {
    'combo' = 1,
    'input' = 2,
    'find' = 3
}

export enum Mounth {
    "JANEIRO" = 1,
    "FEVEREIRO" = 2,
    "MARÇO" = 3,
    "ABRIL" = 4,
    "MAIO" = 5,
    "JUNHO" = 6,
    "JULHO" = 7,
    "AGOSTO" = 8,
    "SETEMBRO" = 9,
    "OUTUBRO" = 10,
    "NOVEMBRO" = 11,
    "DEZEMBRO" = 12,
}

export enum DiaSemana {
    "domingo" = 1,
    "segunda" = 2,
    "terca" = 3,
    "quarta" = 4,
    "quinta" = 5,
    "sexta" = 6,
    "sabado" = 7,
}

export enum Status {
    "LIVRE"     = 1,
    "BLOQUEADO" = 0
}

export enum StatusColor {
    "#8C909A" = Status.LIVRE,
    "#575758" = Status.BLOQUEADO,
}

export enum ConnectionStatusColor {
    "active" = "#4caf50",
    "inative" = "#ff1100",
    "fail" = "#ff5722",
    "disable" = "#575758"
}

export enum Estrutura {
    "SITE - ÁREA" = 0,
    "SITE - SETOR - ÁREA" = 1
}

export enum State {
    "LIBERADO" = Status.LIVRE,
    "BLOQUEADO" = Status.BLOQUEADO
}

export enum StateColor {
    "green" = State.LIBERADO,
    "red"   = State.BLOQUEADO
}

export enum StateGrid {
    "LIVRE" = Status.LIVRE,
    "BLOQUEADA" = Status.BLOQUEADO
}

export enum PessoaTipo {
    "interna" = 1,
    "externa" = 2,
    "prestador" = 3
}

export enum PessoaTipoSigla {
    "PI" = 1,
    "PE" = 2
}

export enum PessoaTipoColor {
    "#ffa500" = PessoaTipoSigla.PI,
    "#ffa501" = PessoaTipoSigla.PE
}

export enum VeiculoTipo {
    "CARRO" = 1,
    "MOTO" = 2,
    "BIKE" = 3,
    "PATINETE" = 4
}

export enum Classificacao {
    "vazio" = 0,
    "pessimo" = 1,
    "ruim" = 2,
    "boa" = 3,
    "muitoBoa" = 4,
    "excelente" = 5
}

export enum AbordagemTipo {
    "nenhum" = 0,
    "informativa" = 1,
    "especial" = 2,
    "advertida" = 3,
    "restritiva" = 4
}

export enum Registro {
    "visita" = 1,
    "prestadorServico" = 2,
    "provisorio" = 3
}

export enum Identificacao {
    "recente"  = "001-01-1A",
    "vigente"  = "001-01-1B",
    "expirada" = "001-01-1C",
    "suspensa" = "001-01-1D",
    "provisoria" = "001-01-1E",
    "cancelada_dia" = "001-01-1F1",
    "cancelada_semana" = "001-01-1F2",
    "cancelada_mes" = "001-01-1F3",
    "cancelada_periodo" = "001-01-1F4",
    "encerrada_dia" = "001-01-1G1",
    "encerrada_semana" = "001-01-1G2",
    "encerrada_mes" = "001-01-1G3",
    "encerrada_periodo" = "001-01-1G4",
    "historico_dia" = "001-01-1H1",
    "historico_semana" = "001-01-1H2",
    "historico_mes" = "001-01-1H3",
    "historico_periodo" = "001-01-1H4"
}

export enum DispositivoStatus {
    "HABILITADO" = 1,
    "DESABILITADO" = 0
}

export enum StatusColorEnable {
    "#8C909A" = DispositivoStatus.HABILITADO,
    "#575758" = DispositivoStatus.DESABILITADO,
}

export enum IntegracaoCamera {
    "" = 0,
    "DIGIFORT" = 1,
    "SEVENTH" = 2
}

export enum transitoBloqueio {
    "PEDESTRE" = 1,
    "VEÍCULO" = 2
}

export enum TipoBloqueio{    
    "CONNEX" = 1,
    "CONNEX EXP 1" = 2,
    "CONNEX EXP 2" = 3,
    "CONNEX EXP 3" = 4,
    "CONNEX EXP 4" = 5,
    "CONNEX EXP 5" = 6,
    "CONNEX EXP 6" = 7,
    "CONNEX EXP 7" = 14,
    "CONNEX EXP 8" = 8,
    "IPLOCK P200" = 9,
    "IPLOCK P300" = 10,
}

export enum TipoTerminal {
    "FACIAL CONTROL ID" = 1,
    "FACIAL HIKVISION" = 2,
    "FACIAL ZKTECO" = 3
}

export enum Filtro {
    "Simples" = "uCEJ0FlNIk",
}

export enum FiltroAcesso {
    "Simples" = "6djB2mPVd0",
    "Agrupado" = "C8r6Dq28o0"
}

export enum FiltroIdentificador {
    "Simples" = "hlF3ip+/ik",
}

export enum FiltroOperacao {
    "Simples" = "qXbVCvsjZk",
}

export enum FiltroSistema {
    "Simples" = "lweWZyiucE",
}

export enum FiltroUsuario {
    "PessoaInterna" = "aTk7oF27Kk",
    "PessoaExterna" = "dhQ7RXRECE",
    "VeiculoInterno" = "dhdns1DF249",
    "VeiculoExterno" =  "qfOlj897JnmE",
    "Empresa" = "JnmEqf97Olj8",
    "Area" = "UhKoPL67FvW3",
    "Estacionamento" = "Q45wer2QnMnOP8",
    "NivelAcesso" = "dert123WPm12AA"
}

export enum FiltroIdentificacao {
    "vigenteSimples"    = "jr4lCO2Oc0",
    "expiradaSimples"   = "Vz3eGqB+xk",
    "suspensaSimples"   = "QRDlsnoUrk",
    "provisoriaSimples" = "3IICDLaBZU",
    "canceladaSimples"  = "Zl7IgvPOpk",
    "encerradaSimples"  = "qZTQiqA8/U",
    "historicoSimples"  = "Yw9zuvFZJU",

    "vigenteAgrupado"    = "lDtU+HgMM0",
    "expiradaAgrupado"   = "9LWbTA3ggU",
    "suspensaAgrupado"   = "/oclrir1iE",
    "provisoriaAgrupado" = "VlEXLiR1oE",
    "canceladaAgrupado"  = "YGXtc3pX2U",
    "encerradaAgrupado"  = "hV6tUiuCcU",
    "historicoAgrupado"  = "8xZ4FK9mf0",

    "vigenteConsolidado"    = "iMaAh32joU",
    "expiradaConsolidado"   = "H64QITbLZk",
    "suspensaConsolidado"   = "x6E91fLl80",
    "provisoriaConsolidado" = "FCS7bAY9BE",
    "canceladaConsolidado"  = "jeAyn11fV0",
    "encerradaConsolidado"  = "MEJJHpM7GE",
    "historicoConsolidado"  = "x6H0bRqB9E",

    "vigenteGrafico"    = "IBlf4kxSzk",
    "expiradaGrafico"   = "+fhEHtK350",
    "suspensaGrafico"   = "qI+FFZ0Q7U",
    "provisoriaGrafico" = "43D+c85lBk",
    "canceladaGrafico"  = "jE5pUX+myU",
    "encerradaGrafico"  = "kRwRj6AqEk",
    "historicoSGrafico" = "8Ski/nipj0",
}

export enum IniciaCadastro {
    "documento" = 0,
    "nomePessoa" = 1,
    "placaVeiculo" = 2,
    "identificador" = 3,
    "biometria" = 4
}

export enum ControleVisita {
    "SEM CONTROLE" = 0,
    "AVISAR NA IDENTIFICAÇÃO" = 1,
    "RESTRINGIR NA IDENTIFICAÇÃO" = 2,
    "RESTRINGIR NO ACESSO" = 3
}

export enum TipoArea {
    "ÁREA RESTRITA" = 1,
    "ÁREA COMUM" = 2,
    "ÁREA ESTACIONAMENTO" = 3,
    "ÁREA EMERGÊNCIA" = 4,
}

export enum TipoAreaSigla {
    "COMUM" = 1,
    "RESERVADA" = 2,
    "ESTACIONAMENTO" = 3,
    "EMERGÊNCIA" = 4,
}

export enum TipoVagaEstacionamento {
    "INDEFINIDA" = 0,
    "PERMANENTE" = 1,
    "COMPARTILHADA" = 2,
    "ROTATIVA VINCULADA" = 3,
    "ROTATIVA NÃO VINCULADA" = 4,
}

export enum Modulos {
    "controls" = 1,
    "registry" = 2,
    "notification" = 3,
    "utility" = 4,
    "mobile" = 5,
    "integration" = 6
}

export enum Programacao {
    "manual" = 0,
    "automatica" = 1
}

export enum TipoRecepcao {
    "FÍSICA" = 0,
    "VIRTUAL" = 1
}

export enum TipoUsuario {
    "PESSOA INTERNA" = 1,
    "PESSOA EXTERNA" = 2,
    "VEÍCULO INTERNO" = 3,
    "VEÍCULO EXTERNO" = 4
}

export enum TipoVeiculo {
    "interno" = 4,
    "externo" = 5,
}

export enum Periodo {
    "indeterminado" = 0,
    "dia" = 1,
    "mes" = 2,
    "ano" = 3,
    "periodo" = 4,
}

export enum Rules {
    telFixo = "telfixo",
    telMovel = "telmovel",
    CEP = "cep",
    CNPJ = "cnpj",
    upperCase = "uppercase",
    lowerCase = "lowercase",
    email = "email",
    lettersNumbers = "lettersNumbers",
    CPF_CNPJ = "CPF_CNPJ",
    CPF = "CPF",
    time = "time",
    timeFull = "timefull",
    date = "date",
    dateTime = "dateTime",
    onlyNumbers = "onlynumbers",
    onlyLetters = "onlyletters",
    ip = "ip"
}

export enum Regex {
    noFilter = "noFilter",
    email = "email",
    numeric = "numeric",
    date = "date",
    time = "time",
    path = "path"
}


