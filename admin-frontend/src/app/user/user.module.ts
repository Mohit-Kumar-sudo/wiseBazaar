import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { CreateUserComponent } from './create-user/create-user.component';
import { ListUserComponent } from './list-user/list-user.component';
import { UserPaymentComponent } from './user-payment/user-payment.component';
import { UserWalletComponent } from './user-wallet/user-wallet.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { WithdrawalRequestComponent } from './withdrawal-request/withdrawal-request.component';
import { WithdrawalApprovalComponent } from './withdrawal-approval/withdrawal-approval.component';
import { AddFundComponent } from './add-fund/add-fund.component';

@NgModule({
  declarations: [
    CreateUserComponent,
    ListUserComponent,
    UserPaymentComponent,
    UserWalletComponent,
    WithdrawalRequestComponent,
    WithdrawalApprovalComponent,
    AddFundComponent,
  ],
  imports: [CommonModule, UserRoutingModule, FormsModule, ReactiveFormsModule],
})
export class UserModule {}
