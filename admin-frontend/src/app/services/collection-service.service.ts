import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { TokenService } from './token.service';
import { AlertService } from './alert.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CollectionServiceService {
  // users: Array<users> = [];
  usersCount: any;
  link: any;
  constructor(
    private http: HttpClient,
    private router: Router,
    private ts: TokenService,
    private as: AlertService
  ) {}

  create(url, data) {
    this.http
      .post(`${url.baseUrl}/${url.createUrl}`, data)
      .subscribe((resp: any) => {
        if (resp.success) {
          this.as.successToast(resp.msg);
        } else {
          this.as.errorToast(resp.msg);
        }
      });
  }
  processProduct(url, data) {
    this.http
      .post(`${url.baseUrl}/${url.processProductURL}`, data)
      .subscribe((resp: any) => {
        if (resp.success) {
          this.as.successToast(resp.msg);
        } else {
          this.as.errorToast(resp.msg);
        }
      });
  }
  generateExcel(url, p) {
    this.http
      .get(`${url.baseUrl}/${url.generateExcelUrl}/${p}`)
      .subscribe((resp: any) => {
        if (resp.success) {
          this.link = resp.data;
          console.log(this.link);
          
          this.as.successToast(resp.msg);
        } else {
          this.as.errorToast(resp.msg);
        }
      });
  }
}
