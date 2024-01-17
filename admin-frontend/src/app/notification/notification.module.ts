import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NotificationRoutingModule } from './notification-routing.module';
import { ListNotificationComponent } from './list-notification/list-notification.component';
import { CreateNotoficationComponent } from './create-notofication/create-notofication.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditNotificationComponent } from './edit-notification/edit-notification.component';


@NgModule({
  declarations: [ListNotificationComponent, CreateNotoficationComponent, EditNotificationComponent],
  imports: [
    CommonModule,
    NotificationRoutingModule,
    FormsModule,
  ]
})
export class NotificationModule { }
