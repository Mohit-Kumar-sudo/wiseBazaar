import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private endpoint: any;
  httpRequests: any = [];

  public httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };
  constructor(private http: HttpClient) {
    this.endpoint = environment.url + '/';
  }

  private extractData(res: Response) {
    let body = res;
    return body || {};
  }

  // Helper Functions
  startRequest(title: String) {
    this.httpRequests.push(title);
  }
  endRequest(title: String) {
    this.httpRequests = this.httpRequests.filter((o: String) => o != title);
  }
  isInRequest(title: String) {
    return this.httpRequests.filter((o: String) => o === title).length;
  }

  get(url: any): Promise<any> {
    return this.http.get(this.endpoint + url, this.getHeaders()).toPromise();
  }
  post(url: any, body: any): Promise<any> {
    return this.http
      .post<any>(this.endpoint + url, body, this.getHeaders())
      .pipe(map(this.extractData), catchError(this.handleError))
      .toPromise();
  }

  handleError(error: any) {
    //(error)
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(error.error);
  }
  delete(url: any): Observable<any> {
    return this.http
      .delete<any>(this.endpoint + url, this.getHeaders())
      .pipe(map(this.extractData));
  }
  getHeaders() {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    return this.httpOptions;
  }
}
