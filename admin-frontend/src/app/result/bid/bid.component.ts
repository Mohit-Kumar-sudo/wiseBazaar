import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ConfigService } from 'src/app/services/config.service';
import { EventService } from 'src/app/services/event.service';

@Component({
  selector: 'app-bid',
  templateUrl: './bid.component.html',
  styleUrls: ['./bid.component.css'],
})
export class BidComponent implements OnInit {
  eventId: any;
  eventTitle: any;
  bidDate: any;
  type: any;
  constructor(
    public EventService: EventService,
    private ConfigService: ConfigService,
    private route: ActivatedRoute
  ) {
    this.route.params.subscribe((param) => {
      (this.eventId = param.id), (this.eventTitle = param.title);
    });
  }

  ngOnInit(): void {}
  back() {
    history.back();
  }

  print() {
    window.print();
  }

  getList() {
    const url = {
      baseUrl: this.ConfigService.config.apiUrls.baseUrl,
      bidListUrl: this.ConfigService.config.apiUrls.bidListUrl,
    };
    let query = {
      eventId: this.eventId,
      betType: this.type,
      'slot.bidDate': this.bidDate,
    };
    this.EventService.bidGetList(url, query);
  }
}
