import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingRoutingModule } from './setting-routing.module';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { HelpDeskComponent } from './help-desk/help-desk.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UnderMaintainComponent } from './under-maintain/under-maintain.component';
import { MpinManagementComponent } from './mpin-management/mpin-management.component';
import { ConfigurationComponent } from './configuration/configuration.component';

@NgModule({
  declarations: [
    ForgetPasswordComponent,
    HelpDeskComponent,
    UnderMaintainComponent,
    MpinManagementComponent,
    ConfigurationComponent,
  ],
  imports: [
    CommonModule,
    SettingRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class SettingModule {}
