import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EventRoutingModule } from './event-routing.module';
import { CreateEventComponent } from './create-event/create-event.component';
import { ListEventComponent } from './list-event/list-event.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [CreateEventComponent, ListEventComponent],
  imports: [CommonModule, EventRoutingModule, FormsModule, ReactiveFormsModule],
})
export class EventModule {}
