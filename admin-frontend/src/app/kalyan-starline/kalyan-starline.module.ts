import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { KalyanStarlineRoutingModule } from './kalyan-starline-routing.module';
import { CreateGameComponent } from './create-game/create-game.component';
import { ListGameComponent } from './list-game/list-game.component';
import { EditGameComponent } from './edit-game/edit-game.component';
import { FormsModule } from '@angular/forms';
import { ResultComponent } from './result/result.component';
import { ResultPublishComponent } from './result-publish/result-publish.component';

@NgModule({
  declarations: [CreateGameComponent, ListGameComponent, EditGameComponent, ResultComponent, ResultPublishComponent],
  imports: [CommonModule, KalyanStarlineRoutingModule, FormsModule],
})
export class KalyanStarlineModule {}
