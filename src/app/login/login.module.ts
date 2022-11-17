import { NgModule } from '@angular/core';
import { NbLayoutModule } from '@nebular/theme';
import { ThemeModule } from '../@theme/theme.module';

import { LoginComponent } from './login.component';

@NgModule({

  imports: [
    NbLayoutModule,
    ThemeModule,
  ],

  declarations: [
      LoginComponent
  ],

})

export class LoginModule { }