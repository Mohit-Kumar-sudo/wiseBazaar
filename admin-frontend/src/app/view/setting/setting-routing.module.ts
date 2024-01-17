import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HelpDeskComponent } from './help-desk/help-desk.component';
import { WorkingPageComponent } from './working-page/working-page.component';

const routes: Routes = [
  {
    path: 'working-page',
    component: WorkingPageComponent,
  },
  {
    path: 'help-desk',
    component: HelpDeskComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SettingRoutingModule {}
