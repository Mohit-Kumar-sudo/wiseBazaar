import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-starline-game-type',
  templateUrl: './starline-game-type.component.html',
  styleUrls: ['./starline-game-type.component.css'],
})
export class StarlineGameTypeComponent implements OnInit {
  eventTime: any;
  gameId: any;
  constructor(private route: ActivatedRoute) {
    this.route.params.subscribe((param) => {
      (this.eventTime = param.eventTime), (this.gameId = param.id);
    });
  }

  ngOnInit(): void {}

  back() {
    history.back();
  }
}
