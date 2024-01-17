import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';
import { TokenService } from './token.service';
import { AlertService } from './alert.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private http: HttpClient,
    private router: Router,
    private ts: TokenService,
    private as: AlertService
  ) {}

  register(url, data) {
    return this.http.post(`${url.baseUrl}/${url.registerUrl}`, data);
  }

  registerByAdmin(url, data) {
    return this.http.post(`${url.baseUrl}/${url.registerUrl}`, data);
  }

  login(data, base, url) {
    return this.http.post(`${base}/${url}`, data);
  }

  loginByPin(data, base, url) {
    return this.http.post(`${base}/${url}`, data);
  }

  updateById(data) {
    return this.http.post(`${environment.url}/auth/updateById`, data);
  }

  getUserDetailByID(url, data) {
    return this.http.post(`${url.baseUrl}/${url.userGetByIdUrl}`, data);
  }

  getUsersList(data) {
    return this.http.post(`${environment.url}/auth/getUsersList`, data);
  }

  getPublicList(data) {
    return this.http.post(`${environment.url}/auth/getPublicList`, data);
  }

  sendotp(data) {
    return this.http.post(`${environment.url}/auth/sendotp`, data);
  }

  getOtpVerification(data) {
    return this.http.post(`${environment.url}/auth/getOtpVerification`, data);
  }

  forgetPapersetterPaasword(data) {
    return this.http.post(
      `${environment.url}/auth/forgetPapersetterPaasword`,
      data
    );
  }

  deleteUserById(data) {
    return this.http.post(`${environment.url}/auth/deleteUserById`, data);
  }

  approveUserById(data) {
    return this.http.post(`${environment.url}/auth/approveUserById`, data);
  }

  unApproveUserById(data) {
    return this.http.post(`${environment.url}/auth/unApproveUserById`, data);
  }

  getApprovedUsersList(data) {
    return this.http.post(`${environment.url}/auth/getApprovedUsersList`, data);
  }

  resetPassword(data) {
    return this.http.post(`${environment.url}/auth/reset-password`, data);
  }

  getUnapprovedUsersList(data) {
    return this.http.post(
      `${environment.url}/auth/getUnapprovedUsersList`,
      data
    );
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

  validatePassword(url, data) {
    return this.http.post(`${url.baseUrl}/${url.validatePwdUrl}`, data);
  }

  generatePin(url, data) {
    return this.http.post(`${url.baseUrl}/${url.generatePinUrl}`, data);
  }

  spinAvail(url, data) {
    return this.http.post(`${url.baseUrl}/${url.spinAvailUrl}`, data);
  }
}
