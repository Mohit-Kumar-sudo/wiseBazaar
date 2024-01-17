import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Page401Component } from './auth/page401/page401.component';
import { Page404Component } from './auth/page404/page404.component';
import { Page500Component } from './auth/page500/page500.component';
import { NgSelect2Module } from 'ng-select2';
import { ForgetPasswordComponent } from './auth/forget-password/forget-password.component';
import { PlayEventComponent } from './play-event/play-event.component';
import { SingleAnkComponent } from './single-ank/single-ank.component';
import { JodiComponent } from './jodi/jodi.component';
import { SinglePattiComponent } from './single-patti/single-patti.component';
import { DoublePattiComponent } from './double-patti/double-patti.component';
import { TripplePattiComponent } from './tripple-patti/tripple-patti.component';
import { FullSangamComponent } from './full-sangam/full-sangam.component';
import { HalfSangamComponent } from './half-sangam/half-sangam.component';
import { AddFundsComponent } from './add-funds/add-funds.component';
import { PaymentWebComponent } from './payment-web/payment-web.component';
import { GooglePayButtonModule } from '@google-pay/button-angular';
import { NgxSpinnerModule } from 'ngx-spinner';
import { WithdrawalComponent } from './withdrawal/withdrawal.component';
import { GameInfoComponent } from './game-info/game-info.component';
import { PaymentSuccessComponent } from './payment-success/payment-success.component';
import { PaymentFailureComponent } from './payment-failure/payment-failure.component';
import { NewAddFundsComponent } from './new-add-funds/new-add-funds.component';
import { NewWithdrawalComponent } from './new-withdrawal/new-withdrawal.component';
import { ResultYesterdayComponent } from './result-yesterday/result-yesterday.component';
import { PaymentTestComponent } from './payment-test/payment-test.component';
import { HttpClientModule } from '@angular/common/http';
import { PaymentOnlineComponent } from './payment-online/payment-online.component';

@NgModule({
  declarations: [
    DashboardComponent,
    LoginComponent,
    SignupComponent,
    Page401Component,
    Page404Component,
    Page500Component,
    ForgetPasswordComponent,
    PlayEventComponent,
    SingleAnkComponent,
    JodiComponent,
    SinglePattiComponent,
    DoublePattiComponent,
    TripplePattiComponent,
    FullSangamComponent,
    HalfSangamComponent,
    AddFundsComponent,
    PaymentWebComponent,
    WithdrawalComponent,
    GameInfoComponent,
    PaymentSuccessComponent,
    PaymentFailureComponent,
    NewAddFundsComponent,
    NewWithdrawalComponent,
    ResultYesterdayComponent,
    PaymentTestComponent,
    PaymentOnlineComponent,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelect2Module,
    GooglePayButtonModule,
    NgxSpinnerModule,
    HttpClientModule
  ],
})
export class DashboardModule {}
