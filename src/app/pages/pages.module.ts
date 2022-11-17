import { NgModule } from '@angular/core';
import { NbLayoutModule } from '@nebular/theme';
import { ThemeModule } from '../@theme/theme.module';
import { PagesComponent } from './pages.component';
import { PagesRoutingModule } from './page-routing.module';


import { SistemaComponent } from './sistema/sistema.component';

import { LoadingBarModule } from '@ngx-loading-bar/core';
import { LoadingBarRouterModule } from  '@ngx-loading-bar/router';

import { LibraryModule } from '../@lib/library.module';
@NgModule({

  imports: [
    NbLayoutModule,
    PagesRoutingModule,
    ThemeModule,
    LoadingBarModule,
    LoadingBarRouterModule,
    LibraryModule
  ],

  declarations: [
    PagesComponent,
    SistemaComponent,
  ],

})

export class PagesModule {}