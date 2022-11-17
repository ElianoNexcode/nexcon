import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { ComunicacaoComponent } from './comunicacao.component';
import { TelefonesUteisComunicacaoComponent } from '../comunicacao/telefones-uteis/telefones-uteis.component';
import { ContatoComunicacaoComponent } from './contato-comunicacao/contato-comunicacao.component';

const routes: Routes = [{
  path: '',
  component: ComunicacaoComponent,
  children: [
    {
      path: 'contato',
      component: ContatoComunicacaoComponent, 
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})

export class ComunicacaoRoutingModule {}
