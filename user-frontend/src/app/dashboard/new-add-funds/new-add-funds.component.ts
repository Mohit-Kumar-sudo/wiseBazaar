import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { ConfigService } from 'src/app/services/config.service';

@Component({
  selector: 'app-new-add-funds',
  templateUrl: './new-add-funds.component.html',
  styleUrls: ['./new-add-funds.component.css'],
})
export class NewAddFundsComponent implements OnInit {
  amount: any = 0;
  user: any;
  time: any;
  transactionsBody: boolean = false;
  tnxId: any;
  constructor(private config: ConfigService, private apiService: ApiService) {
    this.user = JSON.parse(localStorage.getItem('user'));
    setTimeout(() => {
      this.getTime();
    }, 500);
  }

  ngOnInit(): void {}
  back() {
    history.back();
  }

  getTime() {
    this.apiService
      .getTime(this.config.config.apiUrls)
      .subscribe((resp: any) => {
        this.time = resp;
      });
  }

  whatsappLink(frm: NgForm) {
    const data = {
      amount: this.amount,
      userId: this.user.id,
      recipient_name: 'BetWise Bazaar',
      recipient_email: '',
      payDate: this.time.DateString,
      payTime: this.time.timeString,
      user_mobile: this.user.mobile,
      user_name: this.user.first_name + ' ' + this.user.last_name,
      baseUrl: this.config.config.apiUrls.baseUrl,
      ManualPaymentAddUrl: this.config.config.apiUrls.ManualPaymentAddUrl,
    };
    this.apiService.ManualPaymentAdd(data);
    this.transactionsBody = true;
  }

 
}
