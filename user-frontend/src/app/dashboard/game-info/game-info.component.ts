import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { ConfigService } from 'src/app/services/config.service';

@Component({
  selector: 'app-game-info',
  templateUrl: './game-info.component.html',
  styleUrls: ['./game-info.component.css'],
})
export class GameInfoComponent implements OnInit {
  eventId: any;
  constructor(
    private route: ActivatedRoute,
    public ApiService: ApiService,
    private config: ConfigService
  ) {
    this.route.params.subscribe((param) => {
      this.eventId = param.id;
    });
  }

  ngOnInit(): void {
    setTimeout(() => {
      const url = {
        baseUrl: this.config.config.apiUrls.baseUrl,
        getEventsListByIdUrl: this.config.config.apiUrls.getEventsListByIdUrl,
      };
      this.ApiService.getEventsListById(url, { eventId: this.eventId });
    }, 500);
  }
  back() {
    history.back();
  }
}
