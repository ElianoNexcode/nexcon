import { NgModule } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NbCardModule, 
         NbThemeModule, 
         NbLayoutModule, 
         NbSpinnerModule,
         NbAccordionModule } from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';

import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader'

import { Ng9PasswordStrengthBarModule } from 'ng9-password-strength-bar';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GenericAPI } from './@core/api/generic-api';
import { GenericGraphQL } from './@core/api/generic-graphql';
import { ThemeModule } from './@theme/theme.module';
import { GraphQLModule } from './graphql.module';

import { CoreModule } from './@core/core.module';

import { AuthGuardService } from './auth/auth-guard.service';
import { AuthService } from './auth/auth.service';

import { LoginModule } from './login/login.module';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

export function getToken(): string {
  return sessionStorage.getItem('token');
}

@NgModule({
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    HttpClientModule,
    LoginModule,
    NbCardModule,
    NbEvaIconsModule,    
    NbLayoutModule,
    NbSpinnerModule,
    NbAccordionModule,
    CoreModule.forRoot(),

    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),

    NbThemeModule.forRoot({ name: 'dark' }),
    ThemeModule.forRoot(),
    GraphQLModule,
    Ng9PasswordStrengthBarModule,
  ],

  declarations: [AppComponent],  
  
  providers: [GenericAPI, 
              GenericGraphQL, 
              AuthService, 
              AuthGuardService],
  bootstrap: [AppComponent]

})

export class AppModule {}