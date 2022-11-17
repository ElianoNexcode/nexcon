import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';


import { SistemaComponent } from './sistema/sistema.component';


const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [
    {
      path: 'sistema',
      component: SistemaComponent,
    },
    {
      path: 'controle',
      loadChildren: () => import('./controle/controle.module')
      .then(m => m.ControleModule),
    },
    {
      path: 'comunicacao',
      loadChildren: () => import('./comunicacao/comunicacao.module')
      .then(m => m.ComunicacaoModule),
    },
    {
      path: 'gestao',
      loadChildren: () => import('./gestao/gestao.module')
      .then(m => m.GestaoModule),
    },
    {
      path: 'usuario',
      loadChildren: () => import('./usuario/usuario.module')
      .then(m => m.UsuarioModule),
    },
    {
      path: 'concessao',
      loadChildren: () => import('./concessao/concessao.module')
      .then(m => m.ConcessaoModule),
    },
    {
      path: 'dispositivo',
      loadChildren: () => import('./dispositivo/dispositivo.module')
      .then(m => m.DispositivoModule),
    },

    {
      path: 'reparticao',
      loadChildren: () => import('./reparticao/reparticao.module')
      .then(m => m.ReparticaoModule),
    },
    {
      path: 'configuracao',
      loadChildren: () => import('./configuracao/configuracao.module')
      .then(m => m.ConfiguracaoModule),
    },
    {
      path: 'informativo',
      loadChildren: () => import('./informativo/informativo.module')
      .then(m => m.InformativoModule),
    },
    {
      path: '',
      redirectTo: 'sistema',
      pathMatch: 'full',
    },
    {
      path: '**',
      component: PageNotFoundComponent,
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})

export class PagesRoutingModule {}