import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { ConfigService } from 'src/app/services/config.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  showInfo: boolean = false;
  modals = [];
  userId: any;
  userWallet: any;
  constructor(
    public apiService: ApiService,
    private router: Router,
    private configService: ConfigService
  ) {
    this.userId = JSON.parse(localStorage.getItem('user'));
    setTimeout(() => {
      this.getUserWallet();
    }, 1000);
    console.log(this.userId);
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.apiService.getresultList(
        this.configService.config.apiUrls.baseUrl,
        this.configService.config.apiUrls.getresultListUrl,
        0
      );
    }, 1000);
  }

  getUserWallet() {
    this.apiService.getUserById(
      {
        baseUrl: this.configService.config.apiUrls.baseUrl,
        userGetByIdUrl: this.configService.config.apiUrls.userGetByIdUrl,
      },
      this.userId.id
    );
    setTimeout(() => {
      this.userWallet = this.apiService.user.wallet;
      localStorage.setItem('user', JSON.stringify(this.apiService.user));
    }, 2000);
  }

  playGame(i) {
    this.router.navigate([`portal/dashboard/play-event/${i._id}/${i.title}`]);
  }

  getResult(i) {
    let open_patti = '***';
    let open_digit = '*';
    let close_patti = '***';
    let close_digit = '*';
    for (const r of i) {
      if (r.data_set == 'open') {
        open_patti = r.patti;
        open_digit = r.digit;
      }
      if (r.data_set == 'close') {
        close_patti = r.patti;
        close_digit = r.digit;
      }
    }
    return `${open_patti}-${open_digit}${close_digit}-${close_patti}`;
  }
}
