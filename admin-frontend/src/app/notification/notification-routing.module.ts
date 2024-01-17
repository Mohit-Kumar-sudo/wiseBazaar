import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateNotoficationComponent } from './create-notofication/create-notofication.component';
import { EditNotificationComponent } from './edit-notification/edit-notification.component';
import { ListNotificationComponent } from './list-notification/list-notification.component';


const routes: Routes = [
  {
    path:'list',
    component:ListNotificationComponent
  },
  {
    path:'create',
    component:CreateNotoficationComponent
  },
  {
    path:'edit/:id',
    component:EditNotificationComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NotificationRoutingModule { }
