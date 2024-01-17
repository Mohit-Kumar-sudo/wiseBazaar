import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { KalyanStarlineRoutingModule } from './kalyan-starline-routing.module';
import { SetupComponent } from './setup/setup.component';
import { StarlineGameTypeComponent } from './starline-game-type/starline-game-type.component';
import { SingleAnkComponent } from './single-ank/single-ank.component';
import { SinglePattiComponent } from './single-patti/single-patti.component';
import { DoublePattiComponent } from './double-patti/double-patti.component';
import { TripplePattiComponent } from './tripple-patti/tripple-patti.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    SetupComponent,
    StarlineGameTypeComponent,
    SingleAnkComponent,
    SinglePattiComponent,
    DoublePattiComponent,
    TripplePattiComponent,
  ],
  imports: [CommonModule, KalyanStarlineRoutingModule, FormsModule],
})
export class KalyanStarlineModule {}
