import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ThemeModule } from 'src/app/@theme/theme.module';

import { GestaoComponent } from './gestao.component';
import { GestaoRoutingModule } from './gestao-rounting.module';

import { GestaoIdentificacaoComponent } from './identificacao/identificacao.component';
import { GestaoUsuarioComponent } from './usuario/usuario.component';
import { GestaoIdentificadorComponent } from './identificador/identificador.component';
import { GestaoAreaComponent } from './area/area.component';
import { GestaoOperacaoComponent } from './operacao/operacao.component';
import { GestaoSistemaComponent } from './sistema/sistema.component';
import { GestaoAcessoComponent } from './acesso/acesso.component';

import { NbSpinnerModule, NbSpinnerComponent } from '@nebular/theme';


@NgModule({

  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule, 
    ThemeModule,
    GestaoRoutingModule,
    NbSpinnerModule,
  ],

  declarations: [
    GestaoComponent,
    GestaoIdentificacaoComponent,
    GestaoUsuarioComponent,
    GestaoIdentificadorComponent,
    GestaoAreaComponent,
    GestaoOperacaoComponent,
    GestaoSistemaComponent,
    GestaoAcessoComponent,
  ],

  providers: [
    NbSpinnerComponent
  ],

})

export class GestaoModule {}
