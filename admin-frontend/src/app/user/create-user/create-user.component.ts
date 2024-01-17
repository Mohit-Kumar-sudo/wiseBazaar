import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AlertService } from 'src/app/services/alert.service';
import { AuthService } from 'src/app/services/auth.service';
import { ConfigService } from 'src/app/services/config.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css'],
})
export class CreateUserComponent implements OnInit {
  mobile: any;
  constructor(
    private alert: AlertService,
    private auth: AuthService,
    private ConfigService: ConfigService
  ) {}

  ngOnInit(): void {}

  submit(frm: NgForm) {
    const data = {
      first_name: frm.value.first_name,
      last_name: frm.value.last_name,
      mobile: frm.value.mobile,
      username: frm.value.username,
      password: frm.value.password
    };
    const url = {
      baseUrl: this.ConfigService.config.apiUrls.baseUrl,
      createUserUrl: this.ConfigService.config.apiUrls.createUserUrl,
    };
    console.log(url);

    if (frm.valid) {
      if (frm.value.password === frm.value.cnfpassword) {
        this.auth.register(url, data);
      } else {
        this.alert.errorToast('Password not match');
      }
      console.log(frm.value);
    }
  }
}
