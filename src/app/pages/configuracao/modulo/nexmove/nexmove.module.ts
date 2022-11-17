import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ThemeModule } from '../../../../@theme/theme.module';

import { NexmoveComponent } from './nexmove.component';
import { NexmoveRoutingModule } from './nexmove-routing.module';

import { NbSpinnerModule, NbSpinnerComponent } from '@nebular/theme';
import { ConfiguracaoNexmoveClass } from './configuracao/configuracao.component';
import { FormsModule } from '@angular/forms';
import { UsuarioNexmoveComponent } from './usuario/usuario-nexmove.component';

@NgModule({

    imports: [ 
        CommonModule, 
        NexmoveRoutingModule,
        ThemeModule,
        NbSpinnerModule,
        MatCheckboxModule,
        FormsModule
    ],

    declarations: [ 
        NexmoveComponent, 
        ConfiguracaoNexmoveClass,
        UsuarioNexmoveComponent

    ],

    providers: [
        NbSpinnerComponent,
       
    ],
    
})

export class NexmoveModule {}

