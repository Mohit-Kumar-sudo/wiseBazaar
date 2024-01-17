import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { ConfigService } from 'src/app/services/config.service';
import { AlertService } from '../../../services/alert.service';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-mpin-management',
  templateUrl: './mpin-management.component.html',
  styleUrls: ['./mpin-management.component.css'],
})
export class MpinManagementComponent implements OnInit {
  showQuestions: boolean = false;
  showPin: boolean = false;
  user: any;
  userDetails: any;
  openForgetBody: boolean = false;

  constructor(
    private AuthService: AuthService,
    private alert: AlertService,
    private router: Router,
    private configService: ConfigService,
    private api: ApiService
  ) {
    this.user = JSON.parse(localStorage.getItem('user'));
    setTimeout(() => {
      this.getUserDetails();
    }, 2000);
  }

  ngOnInit(): void {}

  getUserDetails() {
    const url = {
      baseUrl: this.configService.config.apiUrls.baseUrl,
      userGetByIdUrl: this.configService.config.apiUrls.userGetByIdUrl,
    };
    const data = { id: this.user.id };
    this.AuthService.getUserDetailByID(url, data).subscribe((res: any) => {
      if (res.success) {
        this.userDetails = res.data;
      } else {
        this.alert.errorToast(res.msg);
      }
    });
  }

  submit(frm: NgForm) {
    if (frm.valid) {
      const url = {
        baseUrl: this.configService.config.apiUrls.baseUrl,
        validatePwdUrl: this.configService.config.apiUrls.validatePwdUrl,
      };
      const data = { ...frm.value };
      this.AuthService.validatePassword(url, data).subscribe(
        (res: any) => {
          this.showPin = res.data;
          this.alert.successToast('Access Granted!');
        },
        (err) => {
          // this.authenticate.emit(false);
        }
      );
    } else {
      this.alert.errorToast('Fill details properly!');
    }
  }

  validate(frm: NgForm) {
    if (frm.valid) {
      const url = {
        baseUrl: this.configService.config.apiUrls.baseUrl,
        validatePwdUrl: this.configService.config.apiUrls.validatePwdUrl,
      };
      const data = { ...frm.value };
      this.AuthService.validatePassword(url, data).subscribe(
        (res: any) => {
          this.resetMpin(frm.value.password);
          // this.alert.successToast('Access Granted!');
        },
        (err) => {
          // this.authenticate.emit(false);
        }
      );
    } else {
      this.alert.errorToast('Fill details properly!');
    }
  }

  resetMpin(password) {
    const url = {
      baseUrl: this.configService.config.apiUrls.baseUrl,
      resetMpinUrl: this.configService.config.apiUrls.resetMpinUrl,
    };
    const data = { username: this.user.username, password: password };
    this.api.mpinReset(url, data);
    this.router.navigate([`/portal/dashboard`]);
  }

  generatePin(sfrm: NgForm) {
    sfrm.value._id = this.user.id;
    if (sfrm.value.spin === sfrm.value.respin) {
      const url = {
        baseUrl: this.configService.config.apiUrls.baseUrl,
        generatePinUrl: this.configService.config.apiUrls.generatePinUrl,
      };
      const data = { ...sfrm.value };
      this.AuthService.generatePin(url, data).subscribe((res: any) => {
        if (res.success) {
          sfrm.reset();
          this.router.navigate([`/portal/dashboard`]);
          this.alert.successToast('Security Pin Generated');
        } else {
          this.alert.errorToast(res.msg);
        }
      });
    } else {
      this.alert.errorToast('Pin Not Matched');
    }
  }
}
