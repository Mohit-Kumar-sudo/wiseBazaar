import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { ConfigService } from 'src/app/services/config.service';

@Component({
  selector: 'app-starline-result-history',
  templateUrl: './starline-result-history.component.html',
  styleUrls: ['./starline-result-history.component.css'],
})
export class StarlineResultHistoryComponent implements OnInit {
  bidDate: any;
  type: any;
  userId: any;
  time: any;
  constructor(
    public apiService: ApiService,
    private ConfigService: ConfigService
  ) {
    this.userId = JSON.parse(localStorage.getItem('user')).id;
  }

  ngOnInit(): void {}
  back() {
    history.back();
  }

  getList() {
    const query = {
      eventTime: this.time,
      'slot.resultDate': this.bidDate,
    };
    this.apiService.kalyanResultGetListUrl(
      this.ConfigService.config.apiUrls.baseUrl,
      this.ConfigService.config.apiUrls.kalyanResultGetListUrl,
      query
    );
  }
}
