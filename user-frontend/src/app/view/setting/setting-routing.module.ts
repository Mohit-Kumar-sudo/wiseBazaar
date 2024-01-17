import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ConfigurationComponent } from './configuration/configuration.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { HelpDeskComponent } from './help-desk/help-desk.component';
import { MpinManagementComponent } from './mpin-management/mpin-management.component';
import { UnderMaintainComponent } from './under-maintain/under-maintain.component';

const routes: Routes = [
  {
    path: 'forget-password',
    component: ForgetPasswordComponent,
  },
  {
    path: 'help-desk',
    component: HelpDeskComponent,
  },
  {
    path: 'under-maintain',
    component: UnderMaintainComponent,
  },
  {
    path: 'mpin',
    component: MpinManagementComponent,
  },
  {
    path: 'configuration',
    component: ConfigurationComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SettingRoutingModule {}
