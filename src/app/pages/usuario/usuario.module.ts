import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ThemeModule } from 'src/app/@theme/theme.module';
import { NbSpinnerModule, NbSpinnerComponent } from '@nebular/theme';
import { UsuarioComponent } from './usuario.component';
import { UsuarioRoutingModule } from './usuario-rounting.module';

import { PessoaInternaComponent } from './pessoa-interna/pessoa-interna.component';
import { PessoaInternaUsuarioService } from './pessoa-interna/service/pessoa-interna.service';
import { PessoaExternaComponent } from './pessoa-externa/pessoa-externa.component';
import { PessoaExternaUsuarioService } from './pessoa-externa/service/pessoa-externa.service';

import { VeiculoInternoComponent } from './veiculo-interno/veiculo-interno.component';
import { VeiculoInternoUsuarioService } from './veiculo-interno/service/veiculo-interno.service';
import { VeiculoExternoComponent } from './veiculo-externo/veiculo-externo.component';
import { VeiculoExternoUsuarioService } from './veiculo-externo/service/veiculo-externo.service';

@NgModule({
  imports: [
    CommonModule,
    UsuarioRoutingModule,
    FormsModule,
    ReactiveFormsModule, 
    ThemeModule,
    NbSpinnerModule
  ],

  declarations: [
    UsuarioComponent,
    PessoaExternaComponent,
    PessoaInternaComponent,
    VeiculoInternoComponent,
    VeiculoExternoComponent
  ],

  providers: [
    PessoaExternaUsuarioService,
    PessoaInternaUsuarioService, 
    VeiculoInternoUsuarioService,
    VeiculoExternoUsuarioService,
    NbSpinnerComponent
  ],

})

export class UsuarioModule {}