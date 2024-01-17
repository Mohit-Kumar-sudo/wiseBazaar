import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateResultComponent } from './create-result/create-result.component';
import { ListResultComponent } from './list-result/list-result.component';
import { BidComponent } from './bid/bid.component';

const routes: Routes = [
  {
    path: 'list',
    component: ListResultComponent,
  },
  {
    path: 'create/:id/:title',
    component: CreateResultComponent,
  },
  {
    path: 'bid/:id/:title',
    component: BidComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ResultRoutingModule {}
