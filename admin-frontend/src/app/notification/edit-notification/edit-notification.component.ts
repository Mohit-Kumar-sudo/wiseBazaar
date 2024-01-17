import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from 'src/app/services/alert.service';
import { ConfigService } from 'src/app/services/config.service';
import { EventService } from 'src/app/services/event.service';
@Component({
  selector: 'app-edit-notification',
  templateUrl: './edit-notification.component.html',
  styleUrls: ['./edit-notification.component.css'],
})
export class EditNotificationComponent implements OnInit {
  notifyId: any;
  constructor(
    private alert: AlertService,
    private config: ConfigService,
    public event: EventService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.route.params.subscribe((param) => {
      this.notifyId = param.id;
      if (this.notifyId) {
        setTimeout(() => {
          const url = {
            baseUrl: this.config.config.apiUrls.baseUrl,
            notificationGetByIdUrl:
              this.config.config.apiUrls.notificationGetByIdUrl,
          };
          this.event.getDataByIdNotification(url, this.notifyId);
        }, 1000);
      }
    });
  }

  ngOnInit(): void {}

  submit(frm: NgForm) {
    const url = {
      baseUrl: this.config.config.apiUrls.baseUrl,
      notificationEditUrl: this.config.config.apiUrls.notificationEditUrl,
    };
    const data = this.event.notificationOne;
    this.event.EditNotification(url,data);
    this.router.navigate([`/portal/notification/list`]);
  }
}
