import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EventService } from 'src/app/services/event.service';

@Component({
  selector: 'app-list-event',
  templateUrl: './list-event.component.html',
  styleUrls: ['./list-event.component.css'],
})
export class ListEventComponent implements OnInit {
  constructor(public eventService: EventService, private router: Router) {}

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.eventService.getEventsList();
  }

  editpage(id) {
    this.router.navigate([`/portal/event/create/${id}`]);
  }

  remove(data) {
    const query = { id: data};
    this.eventService.removeDataById(query);
  }
}
