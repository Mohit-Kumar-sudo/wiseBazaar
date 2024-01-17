import { Injectable } from '@angular/core';
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  decodedToken: any;
  token: any;
  constructor() {}

  setToken(token, refreshToken) {
    localStorage.setItem('Token', token);
    localStorage.setItem('refershToken', refreshToken);
  }

  getToken() {
    const token = localStorage.getItem('Token');
    this.token = token;
    return token;
  }

  getRefreshToken() {
    const token = localStorage.getItem('refreshToken');
    return token;
  }

  deleteToken() {
    localStorage.removeItem('Token');
    localStorage.removeItem('refershToken');
  }

  setUser(user) {
    localStorage.setItem('user', JSON.stringify(user));
  }

  getUser() {
    const user = JSON.parse(localStorage.getItem('user'));
    return user;
  }

  decodeToken() {
    if (this.getToken()) {
      this.decodedToken = jwt_decode(this.token);
    }
  }

  getDecodeToken() {
    return jwt_decode(this.token);
  }

  getExpiryTime() {
    this.decodeToken();
    return this.decodedToken ? this.decodedToken.exp : null;
  }

  isTokenExpired(): boolean {
    const expiryTime: any = this.getExpiryTime();
    if (expiryTime) {
      return 1000 * expiryTime - new Date().getTime() < 5000;
    } else {
      return false;
    }
  }
}
