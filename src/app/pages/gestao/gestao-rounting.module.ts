import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GestaoComponent } from './gestao.component';
import { GestaoIdentificacaoComponent } from './identificacao/identificacao.component';
import { GestaoUsuarioComponent } from './usuario/usuario.component';
import { GestaoIdentificadorComponent } from './identificador/identificador.component';
import { GestaoAreaComponent } from './area/area.component';
import { GestaoOperacaoComponent } from './operacao/operacao.component';
import { GestaoSistemaComponent } from './sistema/sistema.component';
import { GestaoAcessoComponent } from './acesso/acesso.component';

const routes: Routes = [{
    path: '',
    component: GestaoComponent,
    children: 
    [
        {
            path: 'identificacao',
            component: GestaoIdentificacaoComponent,
        },
        {
            path: 'usuario',
            component: GestaoUsuarioComponent,
        },
        {
            path: 'identificador',
            component: GestaoIdentificadorComponent,
        },
        {
            path: 'area',
            component: GestaoAreaComponent,
        },
        {
            path: 'operacao',
            component: GestaoOperacaoComponent,
        },
        {
            path: 'sistema',
            component: GestaoSistemaComponent,
        },
        {
            path: 'acesso',
            component: GestaoAcessoComponent,
        }
    ],
}];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class GestaoRoutingModule {}