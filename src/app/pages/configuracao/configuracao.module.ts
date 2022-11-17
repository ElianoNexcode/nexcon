import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ThemeModule } from 'src/app/@theme/theme.module';

import { ConfiguracaoComponent } from './configuracao.component';
import { ConfiguracaoRoutingModule } from './configuracao-rounting.module';

@NgModule({

  imports: [
    CommonModule,
    ConfiguracaoRoutingModule,
    FormsModule,
    ReactiveFormsModule, 
    ThemeModule,
  ],

  declarations: [
    ConfiguracaoComponent,
  ],

  providers: [],

})

export class ConfiguracaoModule {}
