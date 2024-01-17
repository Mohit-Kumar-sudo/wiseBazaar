import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/services/alert.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css'],
})
export class ForgetPasswordComponent implements OnInit {
  otpsent = false;
  verifiedUser = [];
  otp: any;
  optVerified = false;
  typing: any;
  constructor(
    private alert: AlertService,
    private AuthService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  submit(frm: NgForm) {
    if (frm.valid) {
      this.AuthService.getPublicList(frm.value).subscribe((resp: any) => {
        if (resp.success) {
          this.otpsent = true;
          this.alert.successToast(resp.msg);
        } else {
          this.alert.errorToast(resp.msg);
        }
      });
    } else {
      this.alert.warningToast('Please fill form completly');
    }
  }

  sendotp(frm: NgForm) {
    this.AuthService.sendotp(frm.value).subscribe((resp: any) => {
      if (resp.success) {
        console.log(resp.msg);
        this.otpsent = true;
        this.alert.successToast(resp.msg);
        // this.router.navigate([resp.url]);
      } else {
        this.alert.errorToast(resp.msg);
      }
    });
  }

  verifyOtp(frm: NgForm) {
    const otpVerified = frm.value.otp;
    setTimeout(() => {
      if (otpVerified === frm.value.otp) {
        this.AuthService.getOtpVerification({ otp: frm.value.otp }).subscribe(
          (res: any) => {
            if (res.success) {
              this.alert.successToast('OTP Verified');
              this.verifiedUser = res.data;
              this.optVerified = true;
              console.log(this.optVerified);
            } else {
              this.alert.errorToast('OTP not found');
            }
          }
        );
      }
    }, 5000);
  }

  changePassword(frm: NgForm) {
    if (frm.valid) {
      if (frm.value.password.length < 10) {
        this.alert.infoToast(
          'Password length should be of minimum 10 characters'
        );
        return;
      }
      const data = {
        email: this.verifiedUser[0].email,
        _id: this.verifiedUser[0]._id,
        ...frm.value,
      };
      this.AuthService.forgetPapersetterPaasword(data).subscribe(
        (resp: any) => {
          if (resp.success) {
            this.alert.successToast('Password Change Successfully');
            this.router.navigate([`auth/login`]);
          } else {
            this.alert.errorToast(resp.msg);
          }
        }
      );
    } else {
      this.alert.errorToast('Fill details Properly');
    }
  }
}
