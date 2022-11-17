import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Ng9PasswordStrengthBarModule } from 'ng9-password-strength-bar';
import { TranslateModule } from "@ngx-translate/core";

import { ThemeModule } from 'src/app/@theme/theme.module';

import { SistemaComponent } from './sistema.component';
import { SistemaRoutingModule } from './sistema-routing.module';
import { SistemasComponent } from './sistemas/sistemas.component';
import { AdministradorComponent } from './administrador/administrador.component';
import { AdministradorService } from './administrador/service/administrador.service';
import { OrganizacaoComponent } from './organizacao/organizacao.component';
import { OrganizacaoService } from './organizacao/service/organizacao.service'; 
import { AmbienteComponent } from './ambiente/ambiente.component';
import { AmbienteService } from './ambiente/service/ambiente.service';
import { SoftwareComponent } from './software/software.component';
import { SoftwareService } from './software/service/software.service';

import { NbSpinnerModule, NbSpinnerComponent } from '@nebular/theme'
import { ServidorComponent } from './servidor/servidor.component';
import { ServidorService } from './servidor/service/servidor.service';

@NgModule({

  imports: [
    CommonModule,
    Ng9PasswordStrengthBarModule,
    SistemaRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ThemeModule,
    TranslateModule,
    NbSpinnerModule
  ],

  declarations: [
    SistemaComponent,
    SistemasComponent,
    AdministradorComponent,
    OrganizacaoComponent,
    AmbienteComponent,
    SoftwareComponent,
    ServidorComponent,
  ],

  providers: [
    AdministradorService, 
    OrganizacaoService,
    AmbienteService,
    SoftwareService,
    ServidorService,
    NbSpinnerComponent
  ],
  
})

export class SistemaModule {}
