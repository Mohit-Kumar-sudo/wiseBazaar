import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DoublePattiComponent } from './double-patti/double-patti.component';
import { SetupComponent } from './setup/setup.component';
import { SingleAnkComponent } from './single-ank/single-ank.component';
import { SinglePattiComponent } from './single-patti/single-patti.component';
import { StarlineGameTypeComponent } from './starline-game-type/starline-game-type.component';
import { TripplePattiComponent } from './tripple-patti/tripple-patti.component';

const routes: Routes = [
  {
    path: 'setup',
    component: SetupComponent,
  },
  {
    path: 'starline-game-type/:eventTime/:id',
    component: StarlineGameTypeComponent,
  },
  {
    path: 'single-ank/:title/:eventTime/:id',
    component: SingleAnkComponent,
  },
  {
    path: 'single-patti/:title/:eventTime/:id',
    component: SinglePattiComponent,
  },
  {
    path: 'double-patti/:title/:eventTime/:id',
    component: DoublePattiComponent,
  },
  {
    path: 'tripple-patti/:title/:eventTime/:id',
    component: TripplePattiComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class KalyanStarlineRoutingModule {}
