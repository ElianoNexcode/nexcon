import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SistemaComponent } from './sistema.component';

import { SistemasComponent } from './sistemas/sistemas.component';
import { AdministradorComponent } from './administrador/administrador.component';
import { OrganizacaoComponent } from './organizacao/organizacao.component';
import { AmbienteComponent } from './ambiente/ambiente.component';
import { SoftwareComponent } from './software/software.component';
import { ServidorComponent } from './servidor/servidor.component';

const routes: Routes = [{
  path: '',
  component: SistemaComponent,
  children: [
    {
      path: 'sistemas',
      component: SistemasComponent,
    },
    {
      path: 'administrador',
      component: AdministradorComponent,
    },
    {
      path: 'organizacao',
      component: OrganizacaoComponent,
    },
    {
      path: 'ambiente',
      component: AmbienteComponent,
    },
    {
      path: 'software',
      component: SoftwareComponent,
    },
    {
      path:'servidor',
      component: ServidorComponent,
    }
  ],
  runGuardsAndResolvers: 'always'
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})

export class SistemaRoutingModule {}
