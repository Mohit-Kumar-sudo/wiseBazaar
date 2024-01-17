import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { ConfigService } from 'src/app/services/config.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css'],
})
export class NotificationComponent implements OnInit {
  constructor(public api: ApiService, private config: ConfigService) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.getList();
    }, 1000);
  }

  getList() {
    this.api.notificationList(
      this.config.config.apiUrls.baseUrl,
      this.config.config.apiUrls.notificationGetUrl
    );
  }
}
