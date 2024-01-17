import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddFundComponent } from './add-fund/add-fund.component';
import { CreateUserComponent } from './create-user/create-user.component';
import { ListUserComponent } from './list-user/list-user.component';
import { UserPaymentComponent } from './user-payment/user-payment.component';
import { UserWalletComponent } from './user-wallet/user-wallet.component';
import { WithdrawalApprovalComponent } from './withdrawal-approval/withdrawal-approval.component';
import { WithdrawalRequestComponent } from './withdrawal-request/withdrawal-request.component';

const routes: Routes = [
  {
    path: 'create',
    component: CreateUserComponent,
  },
  {
    path: 'list',
    component: ListUserComponent,
  },
  {
    path: 'user-payment/:userId',
    component: UserPaymentComponent,
  },
  {
    path: 'user-wallet/:userId/:paymentId/:transStatus',
    component: UserWalletComponent,
  },
  {
    path: 'withdrawal-request/:userId',
    component: WithdrawalRequestComponent,
  },
  {
    path: 'withdrawal-approval/:id/:wam/:uid',
    component: WithdrawalApprovalComponent,
  },
  {
    path: 'add-fund/:id',
    component: AddFundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
