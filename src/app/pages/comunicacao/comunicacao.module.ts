import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ComunicacaoComponent } from './comunicacao.component';
import { ComunicacaoRoutingModule } from './comunicacao-routing.module';

import { ThemeModule } from '../../@theme/theme.module';
import { TelefonesUteisComunicacaoComponent } from './telefones-uteis/telefones-uteis.component';
import { TelefonesUteisComunicacaoService } from './telefones-uteis/service/telefones-uteis.service';

import { NbSpinnerModule, NbSpinnerComponent } from '@nebular/theme';
import { ContatoComunicacaoComponent } from './contato-comunicacao/contato-comunicacao.component';

@NgModule({

    imports: [ 
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        ComunicacaoRoutingModule,
        ThemeModule,
        NbSpinnerModule
    ],

    declarations: [ 
        TelefonesUteisComunicacaoComponent,
        ContatoComunicacaoComponent,
        ComunicacaoComponent,
    ],

    providers: [
        TelefonesUteisComunicacaoService,
        NbSpinnerComponent
    ],

})

export class ComunicacaoModule {}