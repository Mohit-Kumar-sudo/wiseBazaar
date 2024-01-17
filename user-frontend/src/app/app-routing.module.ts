import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './components/layout/layout.component';
import { ForgetPasswordComponent } from './dashboard/auth/forget-password/forget-password.component';
import { LoginComponent } from './dashboard/auth/login/login.component';
import { Page401Component } from './dashboard/auth/page401/page401.component';
import { Page404Component } from './dashboard/auth/page404/page404.component';
import { Page500Component } from './dashboard/auth/page500/page500.component';
import { SignupComponent } from './dashboard/auth/signup/signup.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/auth/login',
    pathMatch: 'full',
  },
  {
    path: 'auth',
    children: [
      {
        path: 'login',
        component: LoginComponent,
      },
      {
        path: 'signup',
        component: SignupComponent,
      },
      {
        path: 'forget-password',
        component: ForgetPasswordComponent,
      },
    ],
  },
  {
    path: 'reset-password',
    loadChildren: () =>
      import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
  },
  {
    path: 'portal',
    component: LayoutComponent,
    children: [
      {
        path: '',
        redirectTo: '/portal/dashboard',
        pathMatch: 'full',
      },
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
      },
      {
        path: 'kalyan-starline',
        loadChildren: () =>
          import('./kalyan-starline/kalyan-starline.module').then(
            (m) => m.KalyanStarlineModule
          ),
      },
      {
        path: 'setting',
        loadChildren: () =>
          import('./view/setting/setting.module').then((m) => m.SettingModule),
      },
      {
        path: 'sidebale',
        loadChildren: () =>
          import('./sidebale/sidebale.module').then((m) => m.SidebaleModule),
      },
    ],
  },
  {
    path: '401/:msg',
    component: Page401Component,
  },
  {
    path: '500/:msg',
    component: Page500Component,
  },
  {
    path: '**',
    component: Page404Component,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
