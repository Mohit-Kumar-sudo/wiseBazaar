import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddFundsComponent } from './add-funds/add-funds.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DoublePattiComponent } from './double-patti/double-patti.component';
import { FullSangamComponent } from './full-sangam/full-sangam.component';
import { GameInfoComponent } from './game-info/game-info.component';
import { HalfSangamComponent } from './half-sangam/half-sangam.component';
import { JodiComponent } from './jodi/jodi.component';
import { NewAddFundsComponent } from './new-add-funds/new-add-funds.component';
import { NewWithdrawalComponent } from './new-withdrawal/new-withdrawal.component';
import { PaymentFailureComponent } from './payment-failure/payment-failure.component';
import { PaymentSuccessComponent } from './payment-success/payment-success.component';
import { PaymentWebComponent } from './payment-web/payment-web.component';
import { PlayEventComponent } from './play-event/play-event.component';
import { ResultYesterdayComponent } from './result-yesterday/result-yesterday.component';
import { SingleAnkComponent } from './single-ank/single-ank.component';
import { SinglePattiComponent } from './single-patti/single-patti.component';
import { TripplePattiComponent } from './tripple-patti/tripple-patti.component';
import { WithdrawalComponent } from './withdrawal/withdrawal.component';
import { PaymentTestComponent } from './payment-test/payment-test.component';
import { PaymentOnlineComponent } from './payment-online/payment-online.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
  },
  {
    path: 'play-event/:id/:title',
    component: PlayEventComponent,
  },
  {
    path: 'single-ank/:type/:id/:title',
    component: SingleAnkComponent,
  },
  {
    path: 'jodi/:type/:id/:title',
    component: JodiComponent,
  },
  {
    path: 'single-patti/:type/:id/:title',
    component: SinglePattiComponent,
  },
  {
    path: 'double-patti/:type/:id/:title',
    component: DoublePattiComponent,
  },
  {
    path: 'tripple-patti/:type/:id/:title',
    component: TripplePattiComponent,
  },
  {
    path: 'half-sangam/:type/:id/:title',
    component: HalfSangamComponent,
  },
  {
    path: 'full-sangam/:type/:id/:title',
    component: FullSangamComponent,
  },
  {
    path: 'add-funds',
    component: AddFundsComponent,
  },
  {
    path: 'new-add-funds',
    component: NewAddFundsComponent,
  },
  {
    path: 'withdrawal',
    component: WithdrawalComponent,
  },
  {
    path: 'new-withdrawal',
    component: NewWithdrawalComponent,
  },
  {
    path: 'payment-web',
    component: PaymentWebComponent,
  },
  {
    path: 'payment-test',
    component: PaymentTestComponent,
  },
  {
    path: 'payment-online',
    component: PaymentOnlineComponent,
  },
  {
    path: 'success',
    component: PaymentSuccessComponent,
  },
  {
    path: 'failure',
    component: PaymentFailureComponent,
  },
  {
    path: 'game-info/:id',
    component: GameInfoComponent,
  },
  {
    path: 'yesterday-result',
    component: ResultYesterdayComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
