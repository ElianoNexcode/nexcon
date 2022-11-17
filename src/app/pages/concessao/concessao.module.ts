import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ConcessaoComponent } from './concessao.component';
import { ConcessaoRoutingModule } from './concessao-routing.module';

import { ThemeModule } from '../../@theme/theme.module';

import { CartaoRotativoComponent } from './cartao-rotativo/cartaoRotativo.component';
import { CartaoRotativoService } from './cartao-rotativo/service/cartaoRotativo.service'

import { FeriadoConcessaoComponent } from './feriado/feriado.component';
import { FeriadoConcessaoService } from './feriado/service/feriado.service'

import { FaixaHorariaConcessaoComponent } from './faixa-horaria/faixa-horaria.component';
import { FaixaHorariaConcessaoService } from './faixa-horaria/service/faixa-horaria.service'

import { NivelAcessoConcessaoComponent } from './nivel-acesso/nivel-acesso.component';
import { NivelAcessoConcessaoService } from './nivel-acesso/service/nivel-acesso.service';

import { NbSpinnerModule, NbSpinnerComponent } from '@nebular/theme';

@NgModule({

    imports: [ 
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        ConcessaoRoutingModule,
        ThemeModule,
        NbSpinnerModule
    ],

    declarations: [ 
        ConcessaoComponent,
        CartaoRotativoComponent,
        FeriadoConcessaoComponent,
        FaixaHorariaConcessaoComponent,
        NivelAcessoConcessaoComponent
    ],

    providers: [
        CartaoRotativoService,
        FeriadoConcessaoService,
        FaixaHorariaConcessaoService,
        NivelAcessoConcessaoService,
        NbSpinnerComponent
    ],
})

export class ConcessaoModule {}