import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { ConfigService } from 'src/app/services/config.service';

@Component({
  selector: 'app-bid-game-history',
  templateUrl: './bid-game-history.component.html',
  styleUrls: ['./bid-game-history.component.css'],
})
export class BidGameHistoryComponent implements OnInit {
  bidDate: any;
  type: any;
  userId: any;
  eventId: any;
  
  constructor(
    public apiService: ApiService,
    private ConfigService: ConfigService,
    private route: ActivatedRoute
  ) {
    this.userId = JSON.parse(localStorage.getItem('user')).id;
    this.route.params.subscribe((param) => {
      this.eventId = param.eventId;
    });
  }

  ngOnInit(): void {}
  back() {
    history.back();
  }

  getList() {
    const query = {
      eventId: this.eventId,
      userId: this.userId,
      betType: this.type,
      'slot.bidDate': this.bidDate,
    };
    this.apiService.bidList(
      query,
      this.ConfigService.config.apiUrls.baseUrl,
      this.ConfigService.config.apiUrls.bidGetByEventIdUrl
    );
  }
}
