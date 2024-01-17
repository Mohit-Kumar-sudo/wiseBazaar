import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateGameComponent } from './create-game/create-game.component';
import { ListGameComponent } from './list-game/list-game.component';
import { ResultPublishComponent } from './result-publish/result-publish.component';
import { ResultComponent } from './result/result.component';

const routes: Routes = [
  {
    path: 'create',
    component: CreateGameComponent,
  },
  {
    path: 'list',
    component: ListGameComponent,
  },
  {
    path: 'create/:id',
    component: CreateGameComponent,
  },
  {
    path: 'result',
    component: ResultComponent,
  },
  {
    path: 'result-publish/:eventId/:eventTime',
    component: ResultPublishComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class KalyanStarlineRoutingModule {}
