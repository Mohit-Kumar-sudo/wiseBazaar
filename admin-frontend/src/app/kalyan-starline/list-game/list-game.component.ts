import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EventService } from 'src/app/services/event.service';

@Component({
  selector: 'app-list-game',
  templateUrl: './list-game.component.html',
  styleUrls: ['./list-game.component.css'],
})
export class ListGameComponent implements OnInit {
  constructor(public eventService: EventService, private router: Router) {}

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.eventService.getKalyanEventsList();
  }

  editpage(id) {
    this.router.navigate([`/portal/eventKalyan/create/${id}`]);
  }

  remove(data) {
    const query = { id: data._id, ...data };
    this.eventService.removeDataById(query);
  }
}
