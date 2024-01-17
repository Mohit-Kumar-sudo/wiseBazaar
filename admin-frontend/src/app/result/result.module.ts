import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ResultRoutingModule } from './result-routing.module';
import { CreateResultComponent } from './create-result/create-result.component';
import { ListResultComponent } from './list-result/list-result.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BidComponent } from './bid/bid.component';

@NgModule({
  declarations: [CreateResultComponent, ListResultComponent, BidComponent],
  imports: [
    CommonModule,
    ResultRoutingModule,
    ReactiveFormsModule,
    FormsModule,
  ],
})
export class ResultModule {}
