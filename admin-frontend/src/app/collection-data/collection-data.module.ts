import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CollectionDataRoutingModule } from './collection-data-routing.module';
import { CreateComponent } from './create/create.component';
import { FormsModule } from '@angular/forms';
import { UploadFileComponent } from './upload-file/upload-file.component';

@NgModule({
  declarations: [CreateComponent, UploadFileComponent],
  imports: [CommonModule, CollectionDataRoutingModule, FormsModule],
})
export class CollectionDataModule {}
