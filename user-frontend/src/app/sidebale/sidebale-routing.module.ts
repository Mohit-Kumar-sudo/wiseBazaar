import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccountStatementComponent } from './account-statement/account-statement.component';
import { BidGameHistoryComponent } from './bid-game-history/bid-game-history.component';
import { BidHistoryComponent } from './bid-history/bid-history.component';
import { GamesRateComponent } from './games-rate/games-rate.component';
import { HistoryComponent } from './history/history.component';
import { NewPaymentHistoryComponent } from './new-payment-history/new-payment-history.component';
import { NoticeRulesComponent } from './notice-rules/notice-rules.component';
import { NotificationComponent } from './notification/notification.component';
import { PaymentHistoryComponent } from './payment-history/payment-history.component';
import { ProfileComponent } from './profile/profile.component';
import { StarlineBidHistoryComponent } from './starline-bid-history/starline-bid-history.component';
import { StarlineResultHistoryComponent } from './starline-result-history/starline-result-history.component';
import { WithdrawalListComponent } from './withdrawal-list/withdrawal-list.component';

const routes: Routes = [
  {
    path: 'games-rate',
    component: GamesRateComponent,
  },
  {
    path: 'payment-history',
    component: PaymentHistoryComponent,
  },
  {
    path: 'new-payment-history',
    component: NewPaymentHistoryComponent,
  },
  {
    path: 'withdrawal-list',
    component: WithdrawalListComponent,
  },
  {
    path: 'notice-rule',
    component: NoticeRulesComponent,
  },
  {
    path: 'history',
    component: HistoryComponent,
  },
  {
    path: 'bid-history',
    component: BidHistoryComponent,
  },
  {
    path: 'starline-bid-history',
    component: StarlineBidHistoryComponent,
  },
  {
    path: 'starline-result-history',
    component: StarlineResultHistoryComponent,
  },
  {
    path: 'bid-game-history/:eventId',
    component: BidGameHistoryComponent,
  },
  {
    path: 'account-statement',
    component: AccountStatementComponent,
  },
  {
    path: 'profile',
    component: ProfileComponent,
  },
  {
    path: 'notification',
    component: NotificationComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SidebaleRoutingModule {}
