import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//components
import { LoginComponent } from './modules/login/login.component';
import { TermsAndPolicyComponent } from './modules/core/components/terms-and-policy/terms-and-policy.component';

//guards
import { AuthGuard } from './modules/core/guards/auth.guard';
import { InnerPageGuard } from './modules/core/guards/inner-page.guard';


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
    canActivate: [InnerPageGuard],
    component: LoginComponent,
  },
  {
    path: 'signup',
    canActivate: [InnerPageGuard],
    component: LoginComponent,
  },
  {
    path: 'reset-password',
    canActivate: [InnerPageGuard],
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
