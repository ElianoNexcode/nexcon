import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OperadorComponent } from './operador.component';

import { OperadorConfiguracaoComponent } from './operador-configuracao/operador-configuracao.component';
import { NivelOperacaoComponent } from './nivel-operacao/nivel-operacao.component';

const routes: Routes = [{
  path: '',
  component: OperadorComponent,
  children: [
    {
      path: 'operador-configuracao',
      component: OperadorConfiguracaoComponent,
    },
    {
      path: 'nivel-operacao',
      component: NivelOperacaoComponent,
    },
  ],
  runGuardsAndResolvers: 'always'
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})

export class OperadorRoutingModule {}