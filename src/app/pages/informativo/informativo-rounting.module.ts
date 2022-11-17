import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InformativosComponent } from './informativos/informativos.component';
import { ContratoInformativoComponent } from './contrato/contrato.component';
import { LicencaInformativoComponent } from './licenca/licenca.component';
import { NexcodeInformativoComponent } from './nexcode/nexcode.component';
import { SistemaInformativoComponent } from './sistema/sistema-informativo.component';
import { ManualInformativoComponent } from './manual/manual.component';



const routes: Routes = [
  {
    path: 'informativos',
    component: InformativosComponent,
  },
  {
    path: 'sistema',
    component: SistemaInformativoComponent,
  },
  {
    path: 'licenca',
    component: LicencaInformativoComponent,
  },
  {
    path: 'contrato',
    component: ContratoInformativoComponent,
  },
  {
    path: 'nexcode',
    component: NexcodeInformativoComponent,
  },

  {
    path: 'manual',
    component: ManualInformativoComponent,
  },

  {
    path:'',
    redirectTo: 'sistema',
    pathMatch: 'full'
  }
  
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})

export class InformativoRoutingModule {}
