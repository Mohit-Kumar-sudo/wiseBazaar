import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateComponent } from './create/create.component';
import { UploadFileComponent } from './upload-file/upload-file.component';


const routes: Routes = [
  {
    path:'create',
    component:CreateComponent
  },
  {
    path:'upload',
    component:UploadFileComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CollectionDataRoutingModule { }
