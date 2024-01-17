import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Page401Component } from './auth/page401/page401.component';
import { Page404Component } from './auth/page404/page404.component';
import { Page500Component } from './auth/page500/page500.component';
import { NgSelect2Module } from 'ng-select2';
import { ForgetPasswordComponent } from './auth/forget-password/forget-password.component';
import { DashboardComponent } from './dashboard/dashboard.component';

@NgModule({
  declarations: [
    DashboardComponent,
    LoginComponent,
    SignupComponent,
    Page401Component,
    Page404Component,
    Page500Component,
    ForgetPasswordComponent,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelect2Module,
  ],
})
export class DashboardModule {}
