import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { ConfigService } from 'src/app/services/config.service';

@Component({
  selector: 'app-new-payment-history',
  templateUrl: './new-payment-history.component.html',
  styleUrls: ['./new-payment-history.component.css'],
})
export class NewPaymentHistoryComponent implements OnInit {
  userId: any;
  tnxId: any;
  user: any;
  paymentUniqId: any;
  transactionStatus: any;
  constructor(
    public ApiService: ApiService,
    public ConfigService: ConfigService
  ) {
    this.userId = JSON.parse(localStorage.getItem('user')).id;
    this.user = JSON.parse(localStorage.getItem('user'));
    setTimeout(() => {
      this.paymentData();
    }, 2000);
  }

  ngOnInit(): void {}

  refreshStatus(id) {
    const data = {
      baseUrl: this.ConfigService.config.apiUrls.baseUrl,
      url: this.ConfigService.config.apiUrls.updatePaymentstatus,
      id: id,
    };
    this.ApiService.updatePaymentstatus(
      data.baseUrl,
      data.url,
      data.id
    ).subscribe((res: any) => {
      if (res.success) {
        this.paymentData();
      } else {
        alert(res.msg);
      }
    });
  }

  paymentData() {
    const data = {
      baseUrl: this.ConfigService.config.apiUrls.baseUrl,
      ManualPaymentgetListUrl:
        this.ConfigService.config.apiUrls.ManualPaymentgetListUrl,
      userId: this.userId,
    };
    this.ApiService.ManualPaymentgetList(data);
  }

  back() {
    history.back();
  }

  UpdateTnxId(tnxId, transactionStatus) {
    console.log(tnxId, transactionStatus);
    const data = {
      _id: this.paymentUniqId,
      userId: this.user.id,
      user_mobile: this.user.mobile,
      transactionId: this.tnxId,
      transactionStatus: this.transactionStatus,
      baseUrl: this.ConfigService.config.apiUrls.baseUrl,
      manualPaymentTnxUpdateByIdUrl:
        this.ConfigService.config.apiUrls.manualPaymentTnxUpdateByIdUrl,
    };
    this.ApiService.manualPaymentTnxUpdateById(data);
    this.paymentData();
  }
}
