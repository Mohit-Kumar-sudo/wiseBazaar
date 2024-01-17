import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { TokenService } from './token.service';
import { AlertService } from './alert.service';
import { users } from '../Models/EventItems';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  users: Array<users> = [];
  usersCount: any;
  constructor(
    private http: HttpClient,
    private router: Router,
    private ts: TokenService,
    private as: AlertService
  ) {}

  getTime(data): Observable<any> {
    return this.http.get(`${data.baseUrl}/${data.getTimeUrl}`);
  }

  register(url, data) {
    this.http
      .post(`${url.baseUrl}/${url.createUserUrl}`, data)
      .subscribe((resp: any) => {
        if (resp.success) {
          this.as.successToast(resp.msg);
          this.router.navigate([`/portal/user/list`]);
        } else {
          this.as.errorToast(resp.msg);
        }
      });
  }

  deleteUser(data) {
    this.http
      .post(`${data.baseUrl}/${data.deleteUserUrl}`, data)
      .subscribe((resp: any) => {
        if (resp.success) {
          this.as.successToast(resp.msg);
        } else {
          this.as.errorToast(resp.msg);
        }
      });
  }

  login(data) {
    this.http
      .post(`${data.baseUrl}/${data.authUrl}`, data.loginCredentils)
      .subscribe((resp2) => {
        if ((resp2 as any).success) {
          this.ts.setToken(
            (resp2 as any).accessToken,
            (resp2 as any).refreshToken
          );
          localStorage.setItem('user', JSON.stringify((resp2 as any).user));
          this.router.navigate(['/portal']);
          this.as.successToast((resp2 as any).msg);
        } else {
          this.as.errorToast((resp2 as any).msg);
        }
      });
  }

  getUserList(baseUrl, userListUrl, query) {
    console.log(baseUrl, userListUrl);
    this.http
      .post(`${baseUrl}/${userListUrl}`, {
        query: { first_name: query.first_name },
        page: 1,
        limit: 1000,
      })
      .subscribe((resp) => {
        if ((resp as any).success) {
          this.users = (resp as any).data;
          this.usersCount = (resp as any).count;
        } else {
          this.as.errorToast((resp as any).msg);
        }
      });
  }

  isLoggedIn(): boolean {
    if (this.ts.getToken()) {
      return true;
    } else {
      return false;
    }
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/']);
    this.as.successToast('logout Successfully');
  }

  cleanUserData() {
    localStorage.removeItem('user');
    localStorage.removeItem('Token');
    localStorage.removeItem('refershToken');
    this.router.navigate(['/']);
  }
}
