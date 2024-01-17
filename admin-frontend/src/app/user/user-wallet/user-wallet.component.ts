import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfigService } from 'src/app/services/config.service';
import { EventService } from 'src/app/services/event.service';

@Component({
  selector: 'app-user-wallet',
  templateUrl: './user-wallet.component.html',
  styleUrls: ['./user-wallet.component.css'],
})
export class UserWalletComponent implements OnInit {
  status: any;
  params: any;
  paymentId: any;
  showWalletBody: boolean = false;
  amount: any;
  transactionStatus: any;
  constructor(
    public EventService: EventService,
    private ConfigService: ConfigService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.route.params.subscribe((param) => {
      this.params = param.userId;
      this.paymentId = param.paymentId;
      this.transactionStatus = param.transStatus;
    });
  }

  ngOnInit(): void {
    setTimeout(() => {
      const data = {
        baseUrl: this.ConfigService.config.apiUrls.baseUrl,
        ManualPaymentGetByIdListUrl:
          this.ConfigService.config.apiUrls.ManualPaymentGetByIdListUrl,
        id: this.paymentId,
      };
      this.EventService.manualPaymentGetById(data);
    }, 500);
  }

  StatusUpdate() {
    if (!confirm('Do you really want to submit?')) {
      return;
    }
    const data = {
      status: this.status,
      _id: this.paymentId,
      transactionStatus: this.status,
    };
    this.EventService.manualPaymentApproval(
      {
        baseUrl: this.ConfigService.config.apiUrls.baseUrl,
        userManualPaymentStatusUpdateUrl:
          this.ConfigService.config.apiUrls.userManualPaymentStatusUpdateUrl,
      },
      data
    );
    this.router.navigate([`/portal/user/list`]);
  }
}
