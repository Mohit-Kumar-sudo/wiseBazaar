import { Injectable } from '@angular/core'
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse,
} from '@angular/common/http'
import { Observable } from 'rxjs'
import { tap } from 'rxjs/operators'
import { Router, RouterLink } from '@angular/router'
import { NgxSpinnerService } from 'ngx-spinner'
import { AlertService } from './alert.service'
import { TokenService } from './token.service'
import { AuthService } from './auth.service'

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(
    public tokenService: TokenService,
    public router: Router,
    private spinner: NgxSpinnerService,
    private as: AlertService,
    private auth: AuthService,
  ) {}
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpEvent<any>> {
    this.tokenService.token = localStorage.getItem('auth')
    if (this.tokenService.getToken()) {
      if (!this.tokenService.isTokenExpired()) {
        request = request.clone({
          setHeaders: {
            Authorization: `Bearer ${this.tokenService.getToken()}`,
          },
        })
      } else {
        // this.as.warningToast('Session Expired! Please Login');
        this.auth.logout()
      }
    }
    this.spinner.show()
    return next.handle(request).pipe(
      tap(
        (event: HttpEvent<any>) => {
          if (event instanceof HttpResponse) {
            // do stuff with response if you want
            return next.handle(request)
          }
        },
        (err: any) => {
          console.log('err')
          if (err instanceof HttpErrorResponse) {
            this.spinner.hide()
            if (err.error.error.status === 401) {
              // this.as.errorToast(err.error.error.message);
              const msg = 'You are not authorized to performed this action'
              this.router.navigate([`/401/${err.error.error.message}`])
            } else if (err.status === 500) {
              const msg = err.message
              this.router.navigate([`/500/${err.error.error.message}`])
            } else if (err.status === 0) {
              const msg = 'Under maintainance'
              this.router.navigate([`/500/${err.error.error.message}`])
            } else {
              this.as.errorToast(err.error.error.message)
            }
            // else {
            //   // this.as.errorToast(err.error.error.message);
            // }
          }
        },
        () => {
          this.spinner.hide()
        },
      ),
    )
  }
}
