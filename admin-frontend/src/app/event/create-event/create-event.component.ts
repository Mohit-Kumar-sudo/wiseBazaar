import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { EventService } from 'src/app/services/event.service';

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.css'],
})
export class CreateEventComponent implements OnInit {
  state: 'create' | 'edit' = 'create';
  constructor(
    public eventService: EventService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((param) => {
      const id = param.id;
      if (id) {
        this.state = 'edit';
        this.eventService.getDataById(id);
      } else {
      }
    });
  }
  createForm(frm: NgForm) {
    let notify = {
      openTime: frm.value.openTime,
      openResultTime: frm.value.openResultTime,
      closeTime: frm.value.openTime,
      closeResultTime: frm.value.closeResultTime,
      openResultDay: frm.value.openResultDay,
      closeResultDay: frm.value.closeResultDay,
      alert: frm.value.alert,
    };
    const data = {
      title: frm.value.title,
      notification: [notify],
    };
    this.eventService.create(data);
  }

  update() {
    const data = this.eventService.event;
    this.eventService.updateDataById(data);
  }
}
