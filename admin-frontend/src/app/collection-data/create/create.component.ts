import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CollectionServiceService } from 'src/app/services/collection-service.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
})
export class CreateComponent implements OnInit {
  collection_name: any;
  env:any
  constructor(public collectionService: CollectionServiceService) {
    this.env = environment
  }

  ngOnInit(): void {}

  submit(frm: NgForm) {
    const url = {
      baseUrl: 'http://35.154.176.14:3000/apiv1',
      createUrl: 'collection/',
    };
    const data = { ...frm.value };

    this.collectionService.create(url, data);
  }
  generateExcel() {
    if (this.collection_name) {
      const url = {
        baseUrl: 'http://35.154.176.14:3000/apiv1',
        generateExcelUrl: 'collection/export',
      };

      this.collectionService.generateExcel(url, this.collection_name);
    }
  }
}
