import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ConfigService } from 'src/app/services/config.service';
import { EventService } from 'src/app/services/event.service';

@Component({
  selector: 'app-result-publish',
  templateUrl: './result-publish.component.html',
  styleUrls: ['./result-publish.component.css'],
})
export class ResultPublishComponent implements OnInit {
  eventTime: any;
  admin: any;
  eventId: any;
  time: any;
  constructor(
    private route: ActivatedRoute,
    private configService: ConfigService,
    public EventService: EventService
  ) {
    this.route.params.subscribe((param) => {
      this.eventTime = param.eventTime;
      this.eventId = param.eventId;
    });
    this.admin = JSON.parse(localStorage.getItem('user')).id;
    setTimeout(() => {
      this.getList();
    }, 1000);
  }

  ngOnInit(): void {}

  getList() {
    this.EventService.getTime(this.configService.config.apiUrls).subscribe(
      (resp: any) => {
        this.time = resp;
      }
    );
    setTimeout(() => {
      const data = {
        id: this.eventId,
        'slot.resultDate': this.time.DateString,
        'slot.resultTime': this.time.timeString,
        baseUrl: this.configService.config.apiUrls.baseUrl,
        kalyanResultGetUrl:
          this.configService.config.apiUrls.kalyanResultGetUrl,
      };
      this.EventService.kalyanResultGetUrl(data);
    }, 1000);
  }

  result(frm: NgForm) {
    const resultDate = this.time.DateString;
    const resultTime = this.time.timeString;
    let data = {};
    data = {
      adminId: this.admin,
      eventTime: this.eventTime,
      eventId: this.eventId,
      result: {
        singleDigit: frm.value.singleDigit,
        patti: frm.value.patti,
      },
      slot: {
        resultDate: resultDate,
        resultTime: resultTime,
      },
      baseUrl: this.configService.config.apiUrls.baseUrl,
      kalyanResultCreateUrl:
        this.configService.config.apiUrls.kalyanResultCreateUrl,
    };
    if (data) {
      this.EventService.kalyanResultCreate(data);
      frm.reset();
      this.getList();
    } else {
      alert('First fill the all details properly');
    }
  }
  back() {
    history.back();
  }
}
