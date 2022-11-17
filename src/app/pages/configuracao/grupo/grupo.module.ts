import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from "@ngx-translate/core";
import { ThemeModule } from 'src/app/@theme/theme.module';

import { GrupoComponent } from './grupo.component';
import { GrupoRoutingModule } from './grupo-routing.module';

import { GruposComponent } from './grupos/grupos.component';

import { PessoaGrupoComponent } from './pessoa/pessoa.component';
import { PessoaGrupoService } from './pessoa/service/pessoa.service';

import { VeiculoGrupoComponent } from './veiculo/veiculo.component';
import { VeiculoGrupoService } from './veiculo/service/veiculo.service';

import { DocumentoGrupoComponent } from './documento/documento.component';
import { DocumentoGrupoService } from './documento/service/documento.service';

import { VeiculoModeloGrupoComponent } from './veiculo-modelo/veiculo-modelo.component';
import { VeiculoModeloGrupoService } from './veiculo-modelo/service/veiculo-modelo.service'

import { EmpresaComponent } from './empresa/empresa.component'
import { EmpresaGrupoService } from './empresa/service/empresa.service'

import { EmergenciaComponent} from './emergencia/emergencia.component'
import { EmergenciaGrupoService} from './emergencia/service/emergencia.service'

import { CentroCustoGrupoComponent } from './centro-custo/centro-custo.component';
import { CentroCustoGrupoService } from './centro-custo/service/centro-custo.service'

import { IdentificacaoComponent } from './identificacao-motivo/identificacao-motivo.component'
import { IdentificacaoGrupoService } from './identificacao-motivo/service/identificacao-motivo.service';

import { NbSpinnerModule, NbSpinnerComponent } from '@nebular/theme';
import { ContatoGrupoComponent } from './contato/contato.component';
import { ContatoGrupoService } from './contato/service/contato.service';

@NgModule({

  imports: [
    CommonModule,
    GrupoRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ThemeModule,
    TranslateModule,
    NbSpinnerModule
  ],

  declarations: [
    GrupoComponent,
    GruposComponent,
    PessoaGrupoComponent,
    VeiculoGrupoComponent,
    DocumentoGrupoComponent,
    IdentificacaoComponent,
    EmpresaComponent,
    CentroCustoGrupoComponent,
    VeiculoModeloGrupoComponent,
    EmergenciaComponent,
    ContatoGrupoComponent,
  ],

  providers: [
    PessoaGrupoService,
    VeiculoGrupoService,
    DocumentoGrupoService,
    IdentificacaoGrupoService,
    EmpresaGrupoService,
    CentroCustoGrupoService,
    VeiculoModeloGrupoService,
    EmergenciaGrupoService,
    ContatoGrupoService,
    NbSpinnerComponent
  ],
})

export class GrupoModule {}