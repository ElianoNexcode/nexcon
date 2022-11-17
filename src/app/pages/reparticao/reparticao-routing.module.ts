import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReparticaoComponent } from './reparticao.component';

import { SiteComponent } from './site/site.component';
import { SetorReparticaoComponent } from './setor/setor.component';
import { AreaReparticaoComponent } from './area/area.component';
import { EstacionamentoVagaComponent } from './estacionamento/estacionamento.component';
import { RecepcaoComponent } from './recepcao/recepcao.component';
import { EmpresaReparticaoComponent } from './empresa/empresa.component';

const routes: Routes = [{
    path: '',
    component: ReparticaoComponent,
    children: [
        {
            path: 'site',
            component: SiteComponent, 
        },
        {
            path: 'setor',
            component: SetorReparticaoComponent, 
        },
        {
            path: 'area',
            component: AreaReparticaoComponent, 
        },
        {
            path: 'vaga-estacionamento',
            component: EstacionamentoVagaComponent
        },
        {
            path: 'recepcao',
            component: RecepcaoComponent,
        },
        {
            path: 'empresa',
            component: EmpresaReparticaoComponent,
        },

        {
            path: 'setor',
            component: SetorReparticaoComponent,
        },
    ],
    runGuardsAndResolvers: 'always'
}];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class ReparticaoRoutingModule {}