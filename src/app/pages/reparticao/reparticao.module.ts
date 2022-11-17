import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ThemeModule } from 'src/app/@theme/theme.module';

import { ReparticaoComponent } from './reparticao.component';
import { ReparticaoRoutingModule } from './reparticao-routing.module';

import { SiteComponent } from './site/site.component';
import { SiteService } from './site/service/site.service';
import { SetorReparticaoComponent } from './setor/setor.component';
import { SetorReparticaoService } from './setor/service/setor.service';
import { AreaReparticaoComponent } from './area/area.component';
import { AreaReparticaoService } from './area/service/area.service';
import { EmpresaReparticaoComponent } from './empresa/empresa.component';
import { EmpresaReparticaoService } from './empresa/service/empresa.service';
import { EstacionamentoVagaComponent } from './estacionamento/estacionamento.component';
import { EstacionamentoVagaService } from './estacionamento/service/estacionamento.service';
import { RecepcaoComponent } from './recepcao/recepcao.component';
import { RecepcaoService } from './recepcao/service/recepcao.service';

import { NbSpinnerModule, NbSpinnerComponent } from '@nebular/theme';

@NgModule({

    imports: [ 
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        ReparticaoRoutingModule,
        ThemeModule,
        NbSpinnerModule
    ],

    declarations: [ 
        ReparticaoComponent,
        SiteComponent,
        SetorReparticaoComponent,
        AreaReparticaoComponent,
        EmpresaReparticaoComponent,
        EstacionamentoVagaComponent,
        RecepcaoComponent,
    ],

    providers: [
        SiteService,
        EmpresaReparticaoService,
        SetorReparticaoService,
        AreaReparticaoService,
        EstacionamentoVagaService,
        RecepcaoService,
        NbSpinnerComponent
    ],
})

export class ReparticaoModule {}