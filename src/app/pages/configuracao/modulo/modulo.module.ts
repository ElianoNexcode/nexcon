import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ThemeModule } from '../../../@theme/theme.module';

import { ModuloComponent } from './modulo.component';
import { ModuloRoutingModule } from './modulo-routing.module';

import { ModulosComponent } from './modulos/modulos.component';

import { NbSpinnerModule, NbSpinnerComponent } from '@nebular/theme';

@NgModule({

    imports: [ 
        CommonModule, 
        ModuloRoutingModule,
        ThemeModule,
        NbSpinnerModule
    ],

    declarations: [ 
        ModuloComponent, 
        ModulosComponent,
    ],

    providers: [
        NbSpinnerComponent,
    ],
    
})

export class ModuloModule {}

