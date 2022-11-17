import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DispositivoComponent } from './dispositivo.component';
import { BloqueioDispositivoComponent } from './bloqueio/bloqueio.component';
import { ConcentradorDispositivoComponent } from './concentrador/concentrador.component';
import { CameraDispositivoComponent } from './camera/camera.component';
import { TerminalDispositivoComponent } from './terminal/terminal.component';
import { ControladoraDispositivoComponent } from './controladora/controladora.component';
import { ElevadorDispositvoComponent } from './elevador/elevador.component';
import { EstacaoDispositivoComponent } from './estacao/estacao.component';

const routes: Routes = [{
    path: '',
    component: DispositivoComponent,
    children: [
        {
          path: 'bloqueio-dispositivo',
          component: BloqueioDispositivoComponent,
        },
        {
          path: 'elevador-dispositivo',
          component: ElevadorDispositvoComponent,
        },
        {
          path: 'concentrador-dispositivo',
          component: ConcentradorDispositivoComponent,
        },
        {
          path: 'camera-dispositivo',
          component: CameraDispositivoComponent,
        },
        {
          path: 'terminal-dispositivo',
          component: TerminalDispositivoComponent,
        },
        {
          path: 'controladora-dispositivo',
          component: ControladoraDispositivoComponent,
        },
        {
          path: 'estacao-dispositivo',
          component: EstacaoDispositivoComponent,
        },

     ],
    runGuardsAndResolvers: 'always'
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class DispositivoRoutingModule {}