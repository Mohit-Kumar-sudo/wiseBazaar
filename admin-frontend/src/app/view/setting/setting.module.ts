import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingRoutingModule } from './setting-routing.module';
import { WorkingPageComponent } from './working-page/working-page.component';
import { HelpDeskComponent } from './help-desk/help-desk.component';

@NgModule({
  declarations: [WorkingPageComponent, HelpDeskComponent],
  imports: [CommonModule, SettingRoutingModule],
})
export class SettingModule {}
