import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { ConfigService } from 'src/app/services/config.service';

@Component({
  selector: 'app-bid-history',
  templateUrl: './bid-history.component.html',
  styleUrls: ['./bid-history.component.css'],
})
export class BidHistoryComponent implements OnInit {
  bidDate: any;
  type: any;
  userId: any;
  eventId: any;

  constructor(
    public apiService: ApiService,
    private ConfigService: ConfigService
  ) {
    this.userId = JSON.parse(localStorage.getItem('user')).id;
    setTimeout(() => {
      this.getList();
    }, 1000);
  }

  ngOnInit(): void {}
  back() {
    history.back();
  }

  getList() {
    const query = {
      userId: this.userId,
    };
    this.apiService.bidList(
      query,
      this.ConfigService.config.apiUrls.baseUrl,
      this.ConfigService.config.apiUrls.bidGetByEventIdUrl
    );
  }
}
