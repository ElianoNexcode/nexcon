import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ControleComponent } from './controle.component';
import { IdentificacaoComponent } from './identificacao/identificacao.component';

const routes: Routes = [{
    path: '',
    component: ControleComponent,
    children: 
    [
        {
            path: 'identificacao',
            component: IdentificacaoComponent,
        },
    ],
}];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class ControleRoutingModule {}