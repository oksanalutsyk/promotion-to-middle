import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//components
import { LoginComponent } from './modules/login/login.component';
import { TermsAndPolicyComponent } from './modules/core/components/terms-and-policy/terms-and-policy.component';


const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
    pathMatch: 'full',
  },
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./modules/dashboard/dashboard.module').then((m) => m.DashboardModule),
  },
  {
    path: 'signup',
    component: LoginComponent,
  },
  {
    path: 'reset-password',
    component: LoginComponent,
  },
  {
    path: 'terms-and-policy',
    component: TermsAndPolicyComponent,
  },
  { path: '**', redirectTo: '' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
