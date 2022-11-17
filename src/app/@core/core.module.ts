import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { throwIfAlreadyLoaded } from './module-import-guard';

import { SiteData } from './data/reparticao-site';
import { SiteService } from '../pages/reparticao/site/service/site.service';

import { RecepcaoData } from './data/reparticao-recepcao';
import { RecepcaoService } from '../pages/reparticao/recepcao/service/recepcao.service';

import { PessoaGrupoData } from "./data/grupo-pessoa";
import { PessoaGrupoService } from '../pages/configuracao/grupo/pessoa/service/pessoa.service';

import { VeiculoGrupoData } from "./data/grupo-veiculo";
import { VeiculoGrupoService } from '../pages/configuracao/grupo/veiculo/service/veiculo.service';

import { DocumentoGrupoData } from "./data/grupo-documento";
import { DocumentoGrupoService } from '../pages/configuracao/grupo/documento/service/documento.service';

import { IdentificacaoGrupoData } from "./data/grupo-identificacao";
import { IdentificacaoGrupoService } from '../pages/configuracao/grupo/identificacao-motivo/service/identificacao-motivo.service';

import { EmpresaGrupoData } from "./data/grupo-empresa";
import { EmpresaGrupoService } from '../pages/configuracao/grupo/empresa/service/empresa.service';

import { EmergenciaGrupoData } from "./data/grupo-emergencia";
import { EmergenciaGrupoService } from '../pages/configuracao/grupo/emergencia/service/emergencia.service';

import { CentroCustoGrupoData } from "./data/grupo-centro-custo";
import { CentroCustoGrupoService } from '../pages/configuracao/grupo/centro-custo/service/centro-custo.service';

import { ContatoGrupoData } from './data/grupo-contato';
import { ContatoGrupoService } from '../pages/configuracao/grupo/contato/service/contato.service';

import { VeiculoModeloGrupoData } from "./data/grupo-veiculo-modelo";
import { VeiculoModeloGrupoService } from '../pages/configuracao/grupo/veiculo-modelo/service/veiculo-modelo.service';

import { AdministradorData } from "./data/sistema-administrador";
import { AdministradorService } from '../pages/configuracao/sistema/administrador/service/administrador.service';

import { LoginData } from './data/login';
import { LoginService } from '../login/service/login.service';

import { SoftwareData } from "./data/sistema-software";
import { SoftwareService } from '../pages/configuracao/sistema/software/service/software.service';

import { OrganizacaoData } from "./data/sistema-organizacao";
import { OrganizacaoService } from '../pages/configuracao/sistema/organizacao/service/organizacao.service';

import { AmbienteData } from './data/sistema-ambiente';
import { AmbienteService } from '../pages/configuracao/sistema/ambiente/service/ambiente.service';

import { ServidorData } from "./data/sistema-servidor";
import { ServidorService } from '../pages/configuracao/sistema/servidor/service/servidor.service';

import { CartaoRotativoData } from './data/concessao-cartaoRotativo';
import { CartaoRotativoService } from '../pages/concessao/cartao-rotativo/service/cartaoRotativo.service';

import { FeriadoConcessaoData } from "./data/concessao-feriado";
import { FeriadoConcessaoService } from '../pages/concessao/feriado/service/feriado.service';

import { FaixaHorariaConcessaoData } from "./data/concessao-faixa-horaria";
import { FaixaHorariaConcessaoService } from '../pages/concessao/faixa-horaria/service/faixa-horaria.service';

import { OperadorConfiguracaoData } from "./data/configuracao-operador-operador";
import { OperadorConfiguracaoService } from '../pages/configuracao/operador/operador-configuracao/service/operador-configuracao.service';

import { NivelOperacaoData } from "./data/operador-nivel-operacao";
import { NivelOperacaoService } from '../pages/configuracao/operador/nivel-operacao/service/nivel-operacao.service';

import { IdentificacaoControleData } from "./data/controle-identificacao";
import { IdentificacaoControleService } from '../pages/controle/identificacao/service/identificacao.service';

import { BloqueioDispositivoData } from "./data/dispositivo-bloqueio";
import { BloqueioDispositivoService } from '../pages/dispositivo/bloqueio/service/bloqueio.service';

import { ConcentradorDispositivoData } from "./data/dispositivo-concentrador";
import { ConcentradorDispositivoService } from '../pages/dispositivo/concentrador/service/concentrador.service';

import { ControladoraDispositivoData } from "./data/dispositivo-controladora";
import { ControladoraDispositivoService } from '../pages/dispositivo/controladora/service/controladora.service';


import { CameraDispositivoData } from "./data/dispositivo-camera";
import { CameraDispositivoService } from '../pages/dispositivo/camera/service/camera.service';

import { TerminalDispositivoData } from "./data/dispositivo-terminal";
import { TerminalDispositivoService } from '../pages/dispositivo/terminal/service/terminal.service';

import { TelefonesUteisComunicacaoData } from "./data/comunicacao-telefones-uteis";
import { TelefonesUteisComunicacaoService } from '../pages/comunicacao/telefones-uteis/service/telefones-uteis.service';

import { EmpresaReparticaoData } from "./data/reparticao-empresa";
import { EmpresaReparticaoService } from '../pages/reparticao/empresa/service/empresa.service';

import { EstacionamentoVagaData } from "./data/reparticao-vaga-estacionamento";
import { EstacionamentoVagaService } from '../pages/reparticao/estacionamento/service/estacionamento.service';

import { SetorReparticaoData } from "./data/reparticao-setor";
import { SetorReparticaoService } from '../pages/reparticao/setor/service/setor.service';

import { AreaReparticaoData } from "./data/reparticao-area";
import { AreaReparticaoService } from '../pages/reparticao/area/service/area.service';

import { PessoaExternaUsuarioData } from "./data/usuario-pessoa-externa";
import { PessoaExternaUsuarioService } from '../pages/usuario/pessoa-externa/service/pessoa-externa.service';

import { PessoaInternaUsuarioData } from "./data/usuario-pessoa-interna";
import { PessoaInternaUsuarioService } from '../pages/usuario/pessoa-interna/service/pessoa-interna.service';

import { ControleVisitaAgendaData } from './data/controle-visita-agenda';
import { ControleVisitaAgendaService } from '../pages/controle/visita-agenda/service/visita-agendada.service';

import { GestaoIdentificacaoData } from './data/gestao-identificacao';
import { GestaoIdentifiacaoService } from '../pages/gestao/identificacao/service/identificacao.service';

import { GestaoUsuarioData } from './data/gestao-usuario';
import { GestaoUsuarioService } from '../pages/gestao/usuario/service/usuario.service';

import { GestaoIdentificadorData } from './data/gestao-identificador';
import { GestaoIdentificadorService } from '../pages/gestao/identificador/service/identificador.service';

import { GestaoAreaData } from './data/gestao-area';
import { GestaoAreaService } from '../pages/gestao/area/service/area.service';

import { GestaoOperacaoData } from './data/gestao-operacao';
import { GestaoOperacaoService } from '../pages/gestao/operacao/service/operacao.service';

import { GestaoSistemaData } from './data/gestao-sistema';
import { GestaoSistemaService } from '../pages/gestao/sistema/service/sistema.service';

import { GestaoAcessoData } from './data/gestao-acesso';
import { GestaoAcessoService } from '../pages/gestao/acesso/service/acesso.service';

import { ElevadorDispositivoData } from './data/dispositivo-elevador';
import { ElevadorDispositivoService } from '../pages/dispositivo/elevador/service/elevador.service';

import { ConfiguracaoData } from './data/modulo-nexmove-configuracao';
import { ConfiguracaoService } from '../pages/configuracao/modulo/nexmove/configuracao/service/configuracao.service';

import { VeiculoInternoUsuarioData } from './data/usuario-veiculo-interno';
import { VeiculoInternoUsuarioService } from '../pages/usuario/veiculo-interno/service/veiculo-interno.service';

import { VeiculoExternoUsuarioData } from './data/usuario-veiculo-externo';
import { VeiculoExternoUsuarioService } from '../pages/usuario/veiculo-externo/service/veiculo-externo.service';

import { NivelAcessoConcessaoData } from './data/concessao-nivel-acesso';
import { NivelAcessoConcessaoService } from '../pages/concessao/nivel-acesso/service/nivel-acesso.service';

import { EstacaoDispositivoData } from './data/dispositivo-estacao';
import { EstacaoDispositivoService } from '../pages/dispositivo/estacao/service/estacao.service';
import { ContatoComunicacaoData } from './data/comunicacao-contato';
import { ContatoComunicacaoService } from '../pages/comunicacao/contato-comunicacao/service/contato-comunicacao.service';
import { InformativoSistemaLicencaData } from './data/informativo-sistema-licenca';
import { InformativoSistemaLicencaService } from '../pages/informativo/licenca/service/licenca.service';


const DATA_SERVICES = [
  { provide: TelefonesUteisComunicacaoData, useClass: TelefonesUteisComunicacaoService },
  { provide: SiteData, useClass: SiteService },
  { provide: RecepcaoData, useClass: RecepcaoService},
  { provide: PessoaGrupoData, useClass: PessoaGrupoService },
  { provide: VeiculoGrupoData, useClass: VeiculoGrupoService },
  { provide: DocumentoGrupoData, useClass: DocumentoGrupoService },
  { provide: IdentificacaoGrupoData, useClass: IdentificacaoGrupoService },
  { provide: EmpresaGrupoData, useClass: EmpresaGrupoService },
  { provide: EmergenciaGrupoData, useClass: EmergenciaGrupoService },
  { provide: CentroCustoGrupoData, useClass: CentroCustoGrupoService },
  { provide: VeiculoModeloGrupoData, useClass: VeiculoModeloGrupoService },
  { provide: AdministradorData, useClass: AdministradorService },
  { provide: LoginData, useClass: LoginService},
  { provide: SoftwareData, useClass: SoftwareService },
  { provide: OrganizacaoData, useClass: OrganizacaoService },
  { provide: AmbienteData, useClass: AmbienteService },
  { provide: ServidorData, useClass: ServidorService },
  { provide: CartaoRotativoData, useClass: CartaoRotativoService},
  { provide: FeriadoConcessaoData, useClass: FeriadoConcessaoService },
  { provide: FaixaHorariaConcessaoData, useClass: FaixaHorariaConcessaoService },
  { provide: NivelOperacaoData, useClass: NivelOperacaoService },
  { provide: BloqueioDispositivoData, useClass: BloqueioDispositivoService },
  { provide: ConcentradorDispositivoData, useClass: ConcentradorDispositivoService },
  { provide: ControladoraDispositivoData, useClass: ControladoraDispositivoService },
  { provide: CameraDispositivoData, useClass: CameraDispositivoService },
  { provide: TerminalDispositivoData, useClass: TerminalDispositivoService },
  { provide: EmpresaReparticaoData, useClass: EmpresaReparticaoService },
  { provide: EstacionamentoVagaData, useClass: EstacionamentoVagaService },
  { provide: SetorReparticaoData, useClass: SetorReparticaoService },
  { provide: AreaReparticaoData, useClass:  AreaReparticaoService },
  { provide: PessoaInternaUsuarioData, useClass:  PessoaInternaUsuarioService },
  { provide: PessoaExternaUsuarioData, useClass:  PessoaExternaUsuarioService },
  { provide: OperadorConfiguracaoData, useClass:  OperadorConfiguracaoService },
  { provide: IdentificacaoControleData, useClass:  IdentificacaoControleService },
  { provide: ControleVisitaAgendaData, useClass: ControleVisitaAgendaService },
  { provide: GestaoIdentificacaoData, useClass: GestaoIdentifiacaoService},
  { provide: GestaoUsuarioData, useClass: GestaoUsuarioService},
  { provide: GestaoIdentificadorData, useClass: GestaoIdentificadorService},
  { provide: GestaoAreaData, useClass: GestaoAreaService},
  { provide: GestaoOperacaoData, useClass: GestaoOperacaoService},
  { provide: GestaoSistemaData, useClass: GestaoSistemaService},
  { provide: GestaoAcessoData, useClass: GestaoAcessoService},
  { provide: ElevadorDispositivoData,useClass: ElevadorDispositivoService},
  { provide: ConfiguracaoData, useClass: ConfiguracaoService},
  { provide: VeiculoInternoUsuarioData, useClass: VeiculoInternoUsuarioService},
  { provide: VeiculoExternoUsuarioData, useClass: VeiculoExternoUsuarioService},
  { provide: NivelAcessoConcessaoData, useClass: NivelAcessoConcessaoService},
  { provide: EstacaoDispositivoData, useClass: EstacaoDispositivoService},
  { provide: SetorReparticaoData, useClass: SetorReparticaoService},
  { provide: ContatoGrupoData, useClass: ContatoGrupoService},
  { provide: ContatoComunicacaoData, useClass: ContatoComunicacaoService},
  { provide: InformativoSistemaLicencaData, useClass: InformativoSistemaLicencaService},
];

export const NB_CORE_PROVIDERS = [
  ...DATA_SERVICES,
];

@NgModule({
  imports: [
    CommonModule,
  ],
  exports: [],
  declarations: [],
})

export class CoreModule  {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }
  static forRoot(): ModuleWithProviders<CoreModule> {
    return {
      ngModule: CoreModule,
      providers: [
        ...NB_CORE_PROVIDERS,
      ],
    };
  }
}