import { Component, OnInit } from '@angular/core';
import { EventService } from 'src/app/services/event.service';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-create-game',
  templateUrl: './create-game.component.html',
  styleUrls: ['./create-game.component.css'],
})
export class CreateGameComponent implements OnInit {
  state: 'create' | 'edit' = 'create';
  constructor(
    public eventService: EventService,
    private route: ActivatedRoute
  ) {
    this.route.params.subscribe((param) => {
      const id = param.id;
      if (id) {
        this.state = 'edit';
        this.eventService.getKalyanById(id);
      } else {
      }
    });
  }

  ngOnInit(): void {}
  createForm(frm: NgForm) {
    let notify = {
      openResultTime: frm.value.openResultTime,
      closeTime: frm.value.openTime,
      alert: frm.value.alert,
    };
    const data = {
      eventTime: frm.value.eventTime,
      notification: [notify],
    };
    this.eventService.createEventStarline(data);
  }

  update() {
    const data = this.eventService.eventKalyan;
    this.eventService.updateKalyanStarlineDataById(data);
    this.eventService.eventKalyan = [];
  }
}
