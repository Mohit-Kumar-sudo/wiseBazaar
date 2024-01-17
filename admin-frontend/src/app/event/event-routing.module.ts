import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateEventComponent } from './create-event/create-event.component';
import { ListEventComponent } from './list-event/list-event.component';

const routes: Routes = [
  {
    path: 'list',
    component: ListEventComponent,
  },
  {
    path: 'create',
    component: CreateEventComponent,
  },
  {
    path: 'create/:id',
    component: CreateEventComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EventRoutingModule {}
