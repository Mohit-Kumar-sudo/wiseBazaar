import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ConfigService } from 'src/app/services/config.service';
import { EventService } from 'src/app/services/event.service';

@Component({
  selector: 'app-create-result',
  templateUrl: './create-result.component.html',
  styleUrls: ['./create-result.component.css'],
})
export class CreateResultComponent implements OnInit {
  title: any;
  today = Date.now();
  admin: any;
  eventId: any;
  showUpdateBody: boolean = false;
  time: any;
  openResult: any;
  constructor(
    private route: ActivatedRoute,
    private configService: ConfigService,
    public EventService: EventService
  ) {
    this.route.params.subscribe((param) => {
      this.title = param.title;
      this.eventId = param.id;
    });
    this.admin = JSON.parse(localStorage.getItem('user')).id;
    setTimeout(() => {
      this.EventService.getTime(this.configService.config.apiUrls).subscribe(
        (resp: any) => {
          this.time = resp;
        }
      );
    }, 500);
  }

  ngOnInit(): void {
    this.getList();
  }

  getList() {
    setTimeout(() => {
      const data = {
        event_name: this.title,
        event_slot: this.time.timeString,
        event_date: this.time.data,
      };
      const url = {
        baseUrl: this.configService.config.apiUrls.baseUrl,
        resultGetUrl: this.configService.config.apiUrls.resultGetUrl,
      };
      this.EventService.resultGetUrl(url, data);
    }, 1000);
    setTimeout(() => {
      this.openResult = this.EventService.resultOfEvent
      .filter((o: any) => o.data_set == 'open')
      .map((obj: any) => {
        return {
          openDigit: obj.digit,
          openPatti: obj.patti,
        };
      });
    }, 2500);
  }

  deleteResult(id) {
    const url = {
      baseUrl: this.configService.config.apiUrls.baseUrl,
      resultDeleteByIdUrl:
        this.configService.config.apiUrls.resultDeleteByIdUrl,
    };
    this.EventService.eventResultDeleteById(url, id);
    this.getList();
  }

  result(frm: NgForm) {
    let data = {};
    data = {
      patti: frm.value.patti,
      digit: frm.value.digit,
      data_set: 'open',
      event_name: this.title,
      eventId: this.eventId,
      event_slot: this.time.timeString,
      event_date: this.time.data,
      baseUrl: this.configService.config.apiUrls.baseUrl,
      resultUrl: this.configService.config.apiUrls.resultUrl,
    };
    if (data) {
      this.EventService.result(data);
      frm.reset();
      this.getList();
    } else {
      alert('First fill the all details properly');
    }
  }
  updateResult(frm: NgForm) {
    const data = {
      patti: frm.value.patti,
      digit: frm.value.digit,
      open_digit: this.openResult[0].openDigit,
      open_patti: this.openResult[0].openPatti,
      data_set: 'close',
      event_name: this.title,
      eventId: this.eventId,
      event_slot: this.time.timeString,
      event_date: this.time.data,
      baseUrl: this.configService.config.apiUrls.baseUrl,
      resultUrl: this.configService.config.apiUrls.resultUrl,
    };
    console.log(data);
    
    if (data) {
      this.EventService.result(data);
      frm.reset();
      this.showUpdateBody = false;
      this.getList();
    } else {
      alert('First fill the all details properly');
    }
  }

  back() {
    history.back();
  }
}
