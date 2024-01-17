import { Component, OnInit } from '@angular/core';
import { EventService } from 'src/app/services/event.service';
import { ConfigService } from 'src/app/services/config.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-withdrawal-request',
  templateUrl: './withdrawal-request.component.html',
  styleUrls: ['./withdrawal-request.component.css'],
})
export class WithdrawalRequestComponent implements OnInit {
  userId: any;
  constructor(
    public EventService: EventService,
    public ConfigService: ConfigService,
    private route: ActivatedRoute,
  ) {
    this.route.params.subscribe((param) => {
      this.userId = param.userId;
    });
  }

  ngOnInit(): void {
    setTimeout(() => {
      const url = {
        baseUrl: this.ConfigService.config.apiUrls.baseUrl,
        withdrawalRequestGetListUrl:
          this.ConfigService.config.apiUrls.withdrawalRequestGetListUrl,
      };
      this.EventService.withdrawalRequestGetListUrl(url, {
        userId: this.userId,
      });
    }, 500);
  }

  back() {
    history.back();
  }
}
