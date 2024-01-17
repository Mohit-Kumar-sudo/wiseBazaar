import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/services/alert.service';
import { AuthService } from 'src/app/services/auth.service';
import { ConfigService } from 'src/app/services/config.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  mobile: any;
  constructor(
    private alert: AlertService,
    private auth: AuthService,
    private router: Router,
    private config: ConfigService
  ) {}

  ngOnInit(): void {}

  submit(frm: NgForm) {
    const data = {
      first_name: frm.value.first_name,
      last_name: frm.value.last_name,
      mobile: frm.value.mobile,
      username: frm.value.username,
      password: frm.value.password,
    };
    const url = {
      baseUrl: this.config.config.apiUrls.baseUrl,
      registerUrl: this.config.config.apiUrls.registerUrl,
    };
    if (frm.valid) {
      if (frm.value.password === frm.value.cnfpassword) {
        this.auth.register(url, data).subscribe((res: any) => {
          this.alert.successToast(res.msg);
          this.router.navigate([`/auth/login`]);
        });
      } else {
        this.alert.errorToast('Password not match');
      }
    } else {
      this.alert.errorToast('Password not match');
    }
    console.log(frm.value);
  }
}
