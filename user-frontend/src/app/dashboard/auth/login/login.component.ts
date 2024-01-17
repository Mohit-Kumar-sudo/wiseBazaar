import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/services/alert.service';
import { AuthService } from 'src/app/services/auth.service';
import { ConfigService } from 'src/app/services/config.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  viaPin = false;
  usernameAvail = false;
  mobile: any;
  spin: false;

  constructor(
    private authService: AuthService,
    private alertServices: AlertService,
    private configService: ConfigService,
    private router: Router,
    private token: TokenService
  ) {
    if (this.authService.isLoggedIn()) {
      this.router.navigate([`/portal`]);
    }
  }

  ngOnInit(): void {}

  checkUsername(m) {
    const url = {
      baseUrl: this.configService.config.apiUrls.baseUrl,
      spinAvailUrl: this.configService.config.apiUrls.spinAvailUrl,
    };
    const data = { mobile: m };
    this.authService.spinAvail(url, data).subscribe((res: any) => {
      if (res.success) {
        this.usernameAvail = true;
        if (res.data) {
          this.spin = res.data;
        }
        this.alertServices.successToast(res.msg);
      } else {
        this.usernameAvail = false;
        this.alertServices.errorToast(res.msg);
      }
    });
  }

  submit(frm: NgForm) {
    if (frm.valid) {
      if (!this.spin) {
        this.authService
          .login(
            frm.value,
            this.configService.config.apiUrls.baseUrl,
            this.configService.config.apiUrls.authUrl
          )
          .subscribe((res: any) => {
            if (res.success) {
              this.alertServices.successToast(res.msg);
              this.token.setToken(res.accessToken, res.refreshToken);
              localStorage.setItem('user', JSON.stringify(res.user));
              this.router.navigate(['/portal']);
            } else {
              this.alertServices.errorToast('Enter valid details');
            }
          });
      } else {
        this.authService
          .login(
            frm.value,
            this.configService.config.apiUrls.baseUrl,
            this.configService.config.apiUrls.authPinUrl
          )
          .subscribe((res: any) => {
            if (res.success) {
              this.alertServices.successToast(res.msg);
              this.token.setToken(res.accessToken, res.refreshToken);
              localStorage.setItem('user', JSON.stringify(res.user));
              this.router.navigate(['/portal']);
            } else {
              this.alertServices.errorToast('Enter valid details');
            }
          });
      }
    } else {
      this.alertServices.errorToast('Please fill all the details Properly!');
    }
  }
}
