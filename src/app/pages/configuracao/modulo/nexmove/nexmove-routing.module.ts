import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ConfiguracaoNexmoveClass } from './configuracao/configuracao.component';

import { NexmoveComponent } from './nexmove.component';
import { UsuarioNexmoveComponent } from './usuario/usuario-nexmove.component';

const routes: Routes = [{
    path: '',
    component: NexmoveComponent,
    children: 
    [
        {
            path: 'configuracao',
            component: ConfiguracaoNexmoveClass
        },
        {
            path: 'usuario',
            component: UsuarioNexmoveComponent
        },
    ],
}];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class NexmoveRoutingModule {}