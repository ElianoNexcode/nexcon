import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NbSpinnerModule, NbSpinnerComponent } from '@nebular/theme';

import { ThemeModule } from '../../@theme/theme.module';

import { DispositivoComponent } from './dispositivo.component';
import { DispositivoRoutingModule } from './dispositivo-routing.module';

import { BloqueioDispositivoComponent } from './bloqueio/bloqueio.component';
import { BloqueioDispositivoService } from './bloqueio/service/bloqueio.service'

import { ConcentradorDispositivoComponent } from './concentrador/concentrador.component';
import { ConcentradorDispositivoService } from './concentrador/service/concentrador.service'

import { CameraDispositivoComponent } from './camera/camera.component';
import { CameraDispositivoService } from './camera/service/camera.service'

import { TerminalDispositivoComponent } from './terminal/terminal.component';
import { TerminalDispositivoService } from './terminal/service/terminal.service'

import { ControladoraDispositivoComponent } from './controladora/controladora.component';
import { ControladoraDispositivoService } from './controladora/service/controladora.service'

import { ElevadorDispositvoComponent } from './elevador/elevador.component';
import { ElevadorDispositivoService } from './elevador/service/elevador.service';

import { EstacaoDispositivoComponent } from './estacao/estacao.component';
import { EstacaoDispositivoService } from './estacao/service/estacao.service';

@NgModule({

    imports: [ 
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        DispositivoRoutingModule,
        NbSpinnerModule,
        ThemeModule,
    ],

    declarations: [ 
        DispositivoComponent,
        BloqueioDispositivoComponent,
        ConcentradorDispositivoComponent,
        CameraDispositivoComponent,
        TerminalDispositivoComponent,
        ControladoraDispositivoComponent,
        ElevadorDispositvoComponent,
        EstacaoDispositivoComponent
    ],

    providers: [
        BloqueioDispositivoService,
        ConcentradorDispositivoService,
        CameraDispositivoService,
        TerminalDispositivoService,
        ControladoraDispositivoService,
        ElevadorDispositivoService,
        EstacaoDispositivoService,
        NbSpinnerComponent,
    ],
    
})

export class DispositivoModule {}