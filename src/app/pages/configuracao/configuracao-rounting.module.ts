import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { ConfiguracaoComponent } from './configuracao.component';

const routes: Routes = [{
  path: '',
  component: ConfiguracaoComponent,
  children: [
    {
      path: 'sistema',
      loadChildren: () => import('./sistema/sistema.module')
        .then(m => m.SistemaModule),
    },
    {
      path: 'grupo',
      loadChildren: () => import('./grupo/grupo.module')
        .then(m => m.GrupoModule),
    },
    {
      path: 'operador',
      loadChildren: () => import('./operador/operador.module')
        .then(m => m.OperadorModule),
    },

    {
      path: 'modulo',
      loadChildren: () => import('./modulo/modulo.module')
        .then(m => m.ModuloModule),
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})

export class ConfiguracaoRoutingModule {}