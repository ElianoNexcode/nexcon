import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { UsuarioComponent } from './usuario.component';
import { PessoaExternaComponent } from './pessoa-externa/pessoa-externa.component';
import { PessoaInternaComponent } from './pessoa-interna/pessoa-interna.component';
import { VeiculoInternoComponent } from './veiculo-interno/veiculo-interno.component';
import { VeiculoExternoComponent } from './veiculo-externo/veiculo-externo.component';

const routes: Routes = [{
  path: '',
  component: UsuarioComponent,
  children: [
    {
      path: 'pessoaInterna',
      component:  PessoaInternaComponent, 
    },
    {
      path: 'pessoaExterna',
      component:  PessoaExternaComponent, 
    },
    {
     path: 'veiculoInterno',
     component: VeiculoInternoComponent,
    },
    {
      path: 'veiculoExterno',
      component: VeiculoExternoComponent,
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})

export class UsuarioRoutingModule {}