import { Component, OnInit } from '@angular/core';
import { ConfigService } from 'src/app/services/config.service';
import { EventService } from 'src/app/services/event.service';

@Component({
  selector: 'app-list-result',
  templateUrl: './list-result.component.html',
  styleUrls: ['./list-result.component.css'],
})
export class ListResultComponent implements OnInit {
  constructor(
    public EventService: EventService,
    private configService: ConfigService
  ) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.EventService.getEventsList();
    }, 100);
  }

  getResult(i) {
    let open_patti = '***';
    let open_digit = '*';
    let close_patti = '***';
    let close_digit = '*';
    for (const r of i) {
      if (r.data_set == 'open') {
        open_patti = r.patti;
        open_digit = r.digit;
      }
      if (r.data_set == 'close') {
        close_patti = r.patti;
        close_digit = r.digit;
      }
    }
    return `${open_patti}-${open_digit}${close_digit}-${close_patti}`;
  }
}
