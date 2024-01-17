import { Component, OnInit, Inject } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ConfigService } from '../../services/config.service';
import { AlertService } from '../../services/alert.service';
import { HttpClient } from '@angular/common/http';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-payment-online',
  templateUrl: './payment-online.component.html',
  styleUrls: ['./payment-online.component.css']
})
export class PaymentOnlineComponent implements OnInit {

  user: any;
  min = 100;

  constructor(
    @Inject(DOCUMENT) private doc: Document,
    private http: HttpClient,
    private config: ConfigService,
    private alert: AlertService,
  ) { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user'));
  }

  pay(paymentForm: NgForm) {
    if (paymentForm.form.value.amount >= this.min) {
      const order: any = {
        key: 'WJZbDt',
        txnid: 'A' + Date.now(),
        amount: paymentForm.form.value.amount,
        firstname: this.user.first_name + ' ' + this.user.last_name,
        email: 'abc@xyz.com',
        phone: this.user.mobile,
        productinfo: 'wallet update',
        udf1: this.user.username,
        udf2: this.user.wallet,
        udf5: this.user.username + ' ' + this.user.wallet,
      };
      const url = {
        baseUrl: this.config.config.apiUrls.baseUrl,
        genHashUrl: this.config.config.apiUrls.genHash,
      };
      this.http
        .post(url.baseUrl + '/' + url.genHashUrl, order, {
          responseType: 'text',
        })
        .subscribe((res: any) => {
          console.log(res);
          order.surl='http://107.22.8.54/apiv2/payu/success';
          order.furl='http://107.22.8.54/apiv2/payu/failure';
          order.hash=res;
          order.service_provider='payu_paisa';
          this.post(order);
        })
      }
  }

  post(params,path='https://secure.payu.in/_payment', method = 'post') {
    // The rest of this code assumes you are not using a library.
    // It can be made less verbose if you use one.
    const form = document.createElement('form');
    form.method = method;
    form.action = path;
    // form.setAttribute('target', '_blank');

    for (const key in params) {
      if (params.hasOwnProperty(key)) {
        const hiddenField = document.createElement('input');
        hiddenField.type = 'hidden';
        hiddenField.name = key;
        hiddenField.value = params[key];

        form.appendChild(hiddenField);
      }
    }

    document.body.appendChild(form);
    form.submit();
  }

}
