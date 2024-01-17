import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfigService } from 'src/app/services/config.service';
import { EventService } from 'src/app/services/event.service';

@Component({
  selector: 'app-add-fund',
  templateUrl: './add-fund.component.html',
  styleUrls: ['./add-fund.component.css'],
})
export class AddFundComponent implements OnInit {
  amount: number;
  userId: any;
  constructor(
    private config: ConfigService,
    private event: EventService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.route.params.subscribe((param) => {
      this.userId = param.id;
    });
  }

  ngOnInit(): void {}
  updateFund() {
    const url = {
      baseUrl: this.config.config.apiUrls.baseUrl,
      addFundByIdUrl: this.config.config.apiUrls.addFundByIdUrl,
    };
    const data = {
      id: this.userId,
      amount: this.amount,
    };
    this.event.addFundManuallyByAdmin(url, data);
    this.router.navigate(['/portal/user/list']);
  }
}
