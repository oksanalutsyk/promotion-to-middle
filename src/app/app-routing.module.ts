import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//components
import { LoginComponent } from './modules/login/login.component';
import { TermsAndPolicyComponent } from './modules/core/components/terms-and-policy/terms-and-policy.component';

//guards
import { AuthGuard } from './modules/core/guards/auth.guard';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./modules/dashboard/dashboard.module').then((m) => m.DashboardModule),
  },
  {
    path: 'login',
    component: LoginComponent,
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
