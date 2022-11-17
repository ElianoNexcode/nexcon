import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ThemeModule } from 'src/app/@theme/theme.module';
import { InformativoRoutingModule } from './informativo-rounting.module';
import { InformativoComponent } from './informativo.component';
import { SistemaInformativoComponent } from './sistema/sistema-informativo.component';
import { InformativosComponent } from './informativos/informativos.component';
import { LicencaInformativoComponent } from './licenca/licenca.component';
import { ContratoInformativoComponent } from './contrato/contrato.component';
import { NexcodeInformativoComponent } from './nexcode/nexcode.component';
import { ManualInformativoComponent } from './manual/manual.component';


@NgModule({

  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ThemeModule,
    InformativoRoutingModule,
  ],

  declarations: [
    InformativoComponent,
    InformativosComponent,
    SistemaInformativoComponent,
    LicencaInformativoComponent,
    ContratoInformativoComponent,
    NexcodeInformativoComponent,
    ManualInformativoComponent
    
  ],

  providers: [
  ],
  
})

export class InformativoModule {}
