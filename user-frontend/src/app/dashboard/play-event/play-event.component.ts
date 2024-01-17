import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { ConfigService } from 'src/app/services/config.service';

@Component({
  selector: 'app-play-event',
  templateUrl: './play-event.component.html',
  styleUrls: ['./play-event.component.css'],
})
export class PlayEventComponent implements OnInit {
  title: any;
  id: any;
  constructor(
    private route: ActivatedRoute,
    public apiService: ApiService,
    private configService: ConfigService
  ) {
    this.route.params.subscribe((param) => {
      this.title = param.title;
      this.id = param.id;
    });
    setTimeout(() => {
      this.getEventsList()
    }, 500);
  }

  ngOnInit(): void {}

  getEventsList() {
    const query = {
      eventId: this.id,
    };
    const url = {
      baseUrl: this.configService.config.apiUrls.baseUrl,
      getEventsListByIdUrl:
        this.configService.config.apiUrls.getEventsListByIdUrl,
    };
    this.apiService.getEventsListById(url, query);
  }

  back() {
    history.back();
  }
}
