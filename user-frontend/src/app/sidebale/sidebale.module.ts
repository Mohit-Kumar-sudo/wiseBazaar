import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SidebaleRoutingModule } from './sidebale-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GamesRateComponent } from './games-rate/games-rate.component';
import { PaymentHistoryComponent } from './payment-history/payment-history.component';
import { WithdrawalListComponent } from './withdrawal-list/withdrawal-list.component';
import { NoticeRulesComponent } from './notice-rules/notice-rules.component';
import { HistoryComponent } from './history/history.component';
import { BidHistoryComponent } from './bid-history/bid-history.component';
import { StarlineBidHistoryComponent } from './starline-bid-history/starline-bid-history.component';
import { StarlineResultHistoryComponent } from './starline-result-history/starline-result-history.component';
import { BidGameHistoryComponent } from './bid-game-history/bid-game-history.component';
import { AccountStatementComponent } from './account-statement/account-statement.component';
import { NewPaymentHistoryComponent } from './new-payment-history/new-payment-history.component';
import { ProfileComponent } from './profile/profile.component';
import { NotificationComponent } from './notification/notification.component';

@NgModule({
  declarations: [GamesRateComponent, PaymentHistoryComponent, WithdrawalListComponent, NoticeRulesComponent, HistoryComponent, BidHistoryComponent, StarlineBidHistoryComponent, StarlineResultHistoryComponent, BidGameHistoryComponent, AccountStatementComponent, NewPaymentHistoryComponent, ProfileComponent, NotificationComponent],
  imports: [
    CommonModule,
    SidebaleRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class SidebaleModule {}
