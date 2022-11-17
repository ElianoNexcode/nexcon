import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ThemeModule } from '../../@theme/theme.module';

import { ControleComponent } from './controle.component';
import { ControleRoutingModule } from './controle-routing.module';

import { IdentificacaoComponent } from './identificacao/identificacao.component';
import { IdentificacaoControleService } from './identificacao/service/identificacao.service';
import { ControleVisitaAgendaService } from './visita-agenda/service/visita-agendada.service';

import { NbSpinnerModule, NbSpinnerComponent } from '@nebular/theme';

@NgModule({

    imports: [ 
        CommonModule, 
        ControleRoutingModule,
        ThemeModule,
        NbSpinnerModule
    ],

    declarations: [ 
        ControleComponent, 
        IdentificacaoComponent,
    ],

    providers: [
        IdentificacaoControleService,
        ControleVisitaAgendaService,
        NbSpinnerComponent,
    ],
    
})

export class ControleModule {}

