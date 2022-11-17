import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GrupoComponent } from './grupo.component';

import { GruposComponent } from './grupos/grupos.component';
import { PessoaGrupoComponent } from './pessoa/pessoa.component';
import { VeiculoGrupoComponent } from './veiculo/veiculo.component';
import { DocumentoGrupoComponent } from './documento/documento.component';
import { VeiculoModeloGrupoComponent } from './veiculo-modelo/veiculo-modelo.component';
import { EmpresaComponent } from './empresa/empresa.component';
import { EmergenciaComponent } from './emergencia/emergencia.component';
import { CentroCustoGrupoComponent } from './centro-custo/centro-custo.component';
import { IdentificacaoComponent } from './identificacao-motivo/identificacao-motivo.component';
import { ContatoGrupoComponent } from './contato/contato.component';

const routes: Routes = [{
  path: '',
  component: GrupoComponent,
  children: [
    {
      path: 'grupos',
      component: GruposComponent,
    },
    {
      path: 'pessoa',
      component: PessoaGrupoComponent,
    },
    {
      path: 'veiculo',
      component: VeiculoGrupoComponent,
    },
    {
      path: 'empresa',
      component: EmpresaComponent,
    },
    {
      path: 'contato',
      component: ContatoGrupoComponent,
    },
    {
      path: 'documento',
      component: DocumentoGrupoComponent,
    },
    {
      path: 'identificacao-motivo',
      component: IdentificacaoComponent,
    },
    {
      path: 'modelo-veiculo',
      component: VeiculoModeloGrupoComponent,
    },
    {
      path: 'centro-custo',
      component: CentroCustoGrupoComponent,
    },
    {
      path: 'emergencia',
      component: EmergenciaComponent,
    },

  ],
  runGuardsAndResolvers: 'always'
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})

export class GrupoRoutingModule {}