import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FooterComponent } from './footer.component';
import { LoginComponent } from './login/login.component';
import { NotificacaoComponent } from './notificacao/notificacao.component';
import { UtilitariosComponent } from './utilitarios/utilitarios.component';


@NgModule({
  imports: [CommonModule],
  declarations: [
    FooterComponent,
    LoginComponent,
    NotificacaoComponent,
    UtilitariosComponent,
  ],
  exports: [FooterComponent,
            LoginComponent,
            NotificacaoComponent,
            UtilitariosComponent]
})
export class FooterModule {}
