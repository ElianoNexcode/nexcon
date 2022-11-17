import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModuloComponent } from './modulo.component';
import { ModulosComponent } from './modulos/modulos.component';

const routes: Routes = [{
    path: '',
    component: ModuloComponent,
    children: 
    [
        { 
            path: 'modulos',
            component: ModulosComponent
        },
        {
            path: 'nexmove',
            loadChildren: () => import('./nexmove/nexmove.module')
            .then(m => m.NexmoveModule),
        },

    ],
}];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class ModuloRoutingModule {}