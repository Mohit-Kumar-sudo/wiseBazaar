import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import { ConfigService } from 'src/app/services/config.service';

@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.css'],
})
export class ConfigurationComponent implements OnInit {
  user: any;
  showConfirm: false;
  userDetails: any;
  constructor(
    private apiServie: ApiService,
    private config: ConfigService,
    private AuthService: AuthService
  ) {
    this.user = JSON.parse(localStorage.getItem('user'));
    setTimeout(() => {
      this.getUserDetails();
    }, 1000);
  }

  ngOnInit(): void {}
  getUserDetails() {
    const url = {
      baseUrl: this.config.config.apiUrls.baseUrl,
      userGetByIdUrl: this.config.config.apiUrls.userGetByIdUrl,
    };
    const data = { id: this.user.id };
    this.AuthService.getUserDetailByID(url, data).subscribe((res: any) => {
      if (res.success) {
        this.userDetails = res.data;
        this.showConfirm = this.userDetails.spin_enable;
      }
    });
  }
  update() {
    console.log(this.showConfirm);
    const data = {
      spin_enable: this.showConfirm,
      id: this.user.id,
    };
    this.apiServie.mpinEnable(
      this.config.config.apiUrls.baseUrl,
      this.config.config.apiUrls.userUpdateByIdUrl,
      data
    );
    this.getUserDetails();
  }
}
