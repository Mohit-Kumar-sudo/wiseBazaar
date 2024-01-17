import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ConfigService } from 'src/app/services/config.service';
import { EventService } from 'src/app/services/event.service';

@Component({
  selector: 'app-user-payment',
  templateUrl: './user-payment.component.html',
  styleUrls: ['./user-payment.component.css'],
})
export class UserPaymentComponent implements OnInit {
  params: any;
  constructor(
    public ConfigService: ConfigService,
    public EventService: EventService,
    private route: ActivatedRoute
  ) {
    this.route.params.subscribe((param) => {
      this.params = param.userId;
    });
  }
  
  ngOnInit(): void {
    setTimeout(() => {
      this.ManualPaymentGetList()
    }, 1000);

  }

  // getList() {
  //   const data = {
  //     baseUrl: this.ConfigService.config.apiUrls.baseUrl,
  //     userPaymentListUrl: this.ConfigService.config.apiUrls.userPaymentListUrl,
  //     userId: this.params,
  //   };
  //   this.EventService.PaymentDataGetListUrl(data);
  // }

  ManualPaymentGetList() {
    const data = {
      baseUrl: this.ConfigService.config.apiUrls.baseUrl,
      ManualPaymentGetListUrl: this.ConfigService.config.apiUrls.ManualPaymentGetListUrl,
      userId: this.params,
    };
    this.EventService.ManualPaymentGetList(data);
  }

  back() {
    history.back();
  }
}
