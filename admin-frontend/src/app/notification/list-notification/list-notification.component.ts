import { analyzeAndValidateNgModules } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfigService } from 'src/app/services/config.service';
import { EventService } from 'src/app/services/event.service';

@Component({
  selector: 'app-list-notification',
  templateUrl: './list-notification.component.html',
  styleUrls: ['./list-notification.component.css'],
})
export class ListNotificationComponent implements OnInit {
  constructor(
    public eventService: EventService,
    private config: ConfigService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getList();
  }
  getList() {
    setTimeout(() => {
      const url = {
        baseUrl: this.config.config.apiUrls.baseUrl,
        notificationListUrl: this.config.config.apiUrls.notificationListUrl,
      };
      this.eventService.listNotification(url);
    }, 1000);
  }
  edit(id) {
    this.router.navigate([`/portal/notification/edit/${id}`]);
  }
  delete(id) {
    const url = {
      baseUrl: this.config.config.apiUrls.baseUrl,
      notificationDeleteUrl: this.config.config.apiUrls.notificationDeleteUrl,
    };
    this.eventService.DeleteNotification(url, id);
    this.getList();
  }
}
