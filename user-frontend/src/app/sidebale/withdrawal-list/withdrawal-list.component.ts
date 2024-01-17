import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { ConfigService } from 'src/app/services/config.service';

@Component({
  selector: 'app-withdrawal-list',
  templateUrl: './withdrawal-list.component.html',
  styleUrls: ['./withdrawal-list.component.css'],
})
export class WithdrawalListComponent implements OnInit {
  userId: any;
  constructor(
    public ApiService: ApiService,
    public ConfigService: ConfigService
  ) {
    this.userId = JSON.parse(localStorage.getItem('user')).id;
  }

  ngOnInit(): void {
    setTimeout(() => {
      const url = {
        baseUrl: this.ConfigService.config.apiUrls.baseUrl,
        withdrawalRequestGetListUrl:
          this.ConfigService.config.apiUrls.withdrawalRequestGetListUrl,
      };
      this.ApiService.withdrawalRequestGetListUrl(url, {
        userId: this.userId,
      });
    }, 500);
  }

  back() {
    history.back();
  }
}
