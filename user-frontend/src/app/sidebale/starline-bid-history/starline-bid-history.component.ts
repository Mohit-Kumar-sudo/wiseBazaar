import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { ConfigService } from 'src/app/services/config.service';

@Component({
  selector: 'app-starline-bid-history',
  templateUrl: './starline-bid-history.component.html',
  styleUrls: ['./starline-bid-history.component.css'],
})
export class StarlineBidHistoryComponent implements OnInit {
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
      userId: this.userId,
      betType: this.type,
      'slot.bidDate': this.bidDate,
    };
    this.apiService.bidKalyanEventList(
      query,
      this.ConfigService.config.apiUrls.baseUrl,
      this.ConfigService.config.apiUrls.kalyanStarLineGetListUrl
    );
  }
}
