import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ConcessaoComponent } from './concessao.component';
import { CartaoRotativoComponent } from './cartao-rotativo/cartaoRotativo.component';
import { FeriadoConcessaoComponent } from './feriado/feriado.component';
import { FaixaHorariaConcessaoComponent } from './faixa-horaria/faixa-horaria.component';
import { NivelAcessoConcessaoComponent } from './nivel-acesso/nivel-acesso.component';

const routes: Routes = [{
    path: '',
    component: ConcessaoComponent,
    children: [
        {
            path: 'cartaoRotativo',
            component: CartaoRotativoComponent, 
        },
        {
            path: 'feriado',
            component: FeriadoConcessaoComponent, 
        },
        {
            path: 'faixa-horaria',
            component: FaixaHorariaConcessaoComponent, 
        },

        {
            path: 'nivelAcesso',
            component: NivelAcessoConcessaoComponent, 
        },

    ],
    runGuardsAndResolvers: 'always'
}];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class ConcessaoRoutingModule {}