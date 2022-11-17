import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from "@ngx-translate/core";
import { ThemeModule } from 'src/app/@theme/theme.module';

import { OperadorComponent } from './operador.component';
import { OperadorRoutingModule } from './operador-routing.module';

import { OperadorConfiguracaoComponent } from './operador-configuracao/operador-configuracao.component';
import { OperadorConfiguracaoService } from './operador-configuracao/service/operador-configuracao.service';
import { NivelOperacaoComponent } from './nivel-operacao/nivel-operacao.component';
import { NivelOperacaoService } from './nivel-operacao/service/nivel-operacao.service';

import { NbSpinnerModule, NbSpinnerComponent } from '@nebular/theme';

@NgModule({

  imports: [
    CommonModule,
    OperadorRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ThemeModule,
    TranslateModule,
    NbSpinnerModule
  ],

  declarations: [
    OperadorComponent,
    OperadorConfiguracaoComponent,
    NivelOperacaoComponent,
  ],

  providers: [
    OperadorConfiguracaoService,
    NivelOperacaoService,
    NbSpinnerComponent
  ],
  
})

export class OperadorModule {}