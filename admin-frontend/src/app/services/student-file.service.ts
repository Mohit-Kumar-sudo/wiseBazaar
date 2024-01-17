import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StudentFileService {

  api = 'studentfile';

  constructor(
    private http: HttpClient
  ) { }

  create(data: any) {
    return this.http.post(`${environment.url}/${this.api}/create`, data);
  }

  updateById(data: any) {
    return this.http.post(`${environment.url}/${this.api}/updateById`, data);
  }

  getList(data: any) {
    return this.http.post(`${environment.url}/${this.api}/getList`, data);
  }

  getDeletedList(data: any) {
    return this.http.post(`${environment.url}/${this.api}/getDeletedList`, data);
  }

  getDataById(data: any) {
    return this.http.post(`${environment.url}/${this.api}/getDataById`, data);
  }

  deleteDataById(data: any) {
    return this.http.post(`${environment.url}/${this.api}/deleteDataById`, data);
  }

  restoreDataById(data: any) {
    return this.http.post(`${environment.url}/${this.api}/restoreDataById`, data);
  }

  processDataById(data: any) {
    return this.http.post(`${environment.url}/${this.api}/processDataById`, data);
  }

  processQuestionDataById(data: any) {
    return this.http.post(`${environment.url}/${this.api}/processQuestionDataById`, data);
  }
}
