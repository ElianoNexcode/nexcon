import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { LoginComponent } from './login/login.component';
import { AuthGuardService as AuthGuard} from './auth/auth-guard.service';

export const routes: Routes = [

  {
    path: 'pages',
    canActivate: [AuthGuard],
    loadChildren: () => import('./pages/pages.module')
      .then(m => m.PagesModule),
  },

  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: 'pages', pathMatch: 'full' },
  { path: '**', redirectTo: 'pages' },

];

const config: ExtraOptions = {
  onSameUrlNavigation: "reload",
  useHash: false,
};

@NgModule({

  imports: [RouterModule.forRoot(routes, config)],
  exports: [RouterModule],
  
})

export class AppRoutingModule {}