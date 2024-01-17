import { Component, OnInit } from '@angular/core';
import { EventService } from 'src/app/services/event.service';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css'],
})
export class ResultComponent implements OnInit {
  constructor(public EventService: EventService) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.EventService.getKalyanEventsList();
    }, 100);
  }
  back() {
    history.back();
  }
}
