import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/services/alert.service';
import { ConfigService } from 'src/app/services/config.service';
import { EventService } from 'src/app/services/event.service';

@Component({
  selector: 'app-create-notofication',
  templateUrl: './create-notofication.component.html',
  styleUrls: ['./create-notofication.component.css'],
})
export class CreateNotoficationComponent implements OnInit {
  constructor(
    private alert: AlertService,
    private config: ConfigService,
    private event: EventService,
    private router: Router
  ) {}

  ngOnInit(): void {}
  submit(frm: NgForm) {
    const url = {
      baseUrl: this.config.config.apiUrls.baseUrl,
      notificationCreateUrl: this.config.config.apiUrls.notificationCreateUrl,
    };
    this.event.createNotification(url, frm.value);
    this.router.navigate([`/portal/notification/list`]);
  }
}
