import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { ConfigService } from 'src/app/services/config.service';
declare var Razorpay: any;
declare var apiS: any;
declare var urlConfig: any;
declare var redirect_url: any;
@Component({
  selector: 'app-add-funds',
  templateUrl: './add-funds.component.html',
  styleUrls: ['./add-funds.component.css'],
})
export class AddFundsComponent implements OnInit {
  amount: any;
  upiId:any;
  user: any;
  options: any;
  today = Date.now();

  rzp1: any;
  razorPayOptions = {
    key: '', // Enter the Key ID generated from the Dashboard
    amount: '', // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise or INR 500.
    currency: 'INR',
    name: 'Kalyan Satta Online',
    description: 'Trust Us',
    order_id: 'ORDERID_FROM_BACKEND',
    logo: 'https://sites.google.com/site/sattamatkasattamatka/_/rsrc/1421207387120/home/gold-pot.png?height=212&width=222',
    handler: function (response) {},
    prefill: {
      name: '',
      email: '',
      contact: '',
    },
    notes: {
      address: 'Thank you for saving people in need',
    },
    theme: {
      color: '#8bf7a8',
    },
  };
  payment_creation_id: any;
  frmt: any;
  bidDate: string;
  bidTime: any;
  url: any;
  paymentUpdateUrl = '';
  constructor(
    private api: ApiService,
    private ConfigService: ConfigService,
    private router: Router
  ) {
    this.user = JSON.parse(localStorage.getItem('user'));
    this.frmt = new Date(this.today);
    this.bidDate = this.frmt.toDateString();
    this.bidTime = this.frmt.toTimeString().slice(0, 8);
  }

  ngOnInit(): void {}

  back() {
    history.back();
  }

  checkOutOld(frm: NgForm) {
    this.url = {
      baseUrl: this.ConfigService.config.apiUrls.baseUrl,
      PaymentDataUrl: this.ConfigService.config.apiUrls.PaymentDataUrl,
      paymentUpdateByIdUrl:
        this.ConfigService.config.apiUrls.paymentUpdateByIdUrl,
      paymentDeleteDataByIdUrl:
        this.ConfigService.config.apiUrls.paymentDeleteDataByIdUrl,
    };
    if (frm.value.amount < 500) {
      alert('Please input minimum amount 500');
      frm.reset();
      return;
    } else {
      let finalObject = {
        userId: this.user.id,
        amount: this.amount,
        recipient_name: 'KalYan BetWise Bazaar',
        recipient_email: 'kalyansattaonline@gmail.com',
        user_mobile: this.user.mobile,
        user_name: this.user.first_name + ' ' + this.user.last_name,
        user_email: 'user@email.com',
        payDate: this.bidDate,
        payTime: this.bidTime,
      };
      this.api.submitPayment(this.url, finalObject).subscribe((resp: any) => {
        if (resp.success) {
          let payload = resp.payload;
          if (
            payload['key'] &&
            payload['dbRes']['order']['id'] &&
            payload['dbRes']['order']['amount']
          ) {
            this.razorPayOptions.key = payload['key'];
            this.razorPayOptions.order_id = payload['dbRes']['order']['id'];
            this.razorPayOptions.amount = payload['dbRes']['order']['amount'];
            this.razorPayOptions.prefill.name =
              this.user.first_name + ' ' + this.user.last_name;
            this.razorPayOptions.prefill.email = 'user@email.com';
            this.razorPayOptions.prefill.contact = this.user.mobile;
            this.razorPayOptions.amount = payload['dbRes']['order']['amount'];
            this.razorPayOptions.handler = this.razorPayResponseHandler;
            this.payment_creation_id = payload['dbRes']['_id'];
            finalObject['_id'] = payload['dbRes']['_id'];
            localStorage.setItem('temp', JSON.stringify(finalObject));
            apiS = this.api;
            urlConfig = this.url;
            var rzp1 = new Razorpay(this.razorPayOptions);
            rzp1.on('payment.failed', this.razorPayErrorHandler);
            rzp1.open();
          } else {
            // bro show error here
          }
        }
      });
    }
  }

  razorPayErrorHandler(response) {
    let storage_data = localStorage.getItem('temp');
    let sess = JSON.parse(storage_data);
    let paymentObject = {
      _id: sess._id,
      id: sess._id,
      error: response,
      user_name: sess.user_email,
      amount: sess.amount,
      recipient_email: sess.recipient_email,
      user_mobile: sess.user_mobile,
      transactionStatus: 'failure',
    };
    apiS
      .paymentUpdateByIdUrl(
        urlConfig.baseUrl,
        urlConfig.paymentUpdateByIdUrl,
        paymentObject
      )
      .subscribe(
        (resp: any) => {
          if (resp.success) {
            alert('Payment Failure');
            if (
              typeof response.razorpay_payment_id == 'undefined' ||
              response.razorpay_payment_id < 1
            ) {
              redirect_url = '#/portal/dashboard/failure';
            } else {
              redirect_url = '#/portal/dashboard/success';
            }
            location.href = redirect_url;
            localStorage.removeItem('temp');
          }
        },
        (error) => {}
      );
  }

  razorPayResponseHandler(response) {
    let storage_data = localStorage.getItem('temp');
    let sess = JSON.parse(storage_data);
    let paymentObject = {
      id: sess._id,
      payment: response,
      user_name: sess.user_email,
      amount: sess.amount,
      recipient_email: sess.recipient_email,
      user_mobile: sess.user_mobile,
      transactionStatus: 'success',
    };
    apiS
      .paymentUpdateByIdUrl(
        urlConfig.baseUrl,
        urlConfig.paymentUpdateByIdUrl,
        paymentObject
      )
      .subscribe(
        (resp: any) => {
          if (resp.success) {
            alert('Payment Successfull');
            if (
              typeof response.razorpay_payment_id == 'undefined' ||
              response.razorpay_payment_id < 1
            ) {
              redirect_url = '#/portal/dashboard/failure';
            } else {
              redirect_url = '#/portal/dashboard/success';
            }
            location.href = redirect_url;
            localStorage.removeItem('temp');
          }
        },
        (error) => {}
      );
  }

  checkOut(frm: NgForm) {
    this.url = {
      baseUrl: this.ConfigService.config.apiUrls.baseUrl,
      PaymentDataUrlUpi: this.ConfigService.config.apiUrls.PaymentDataUrlUpi,
      paymentUpdateByIdUrl:
        this.ConfigService.config.apiUrls.paymentUpdateByIdUrl,
      paymentDeleteDataByIdUrl:
        this.ConfigService.config.apiUrls.paymentDeleteDataByIdUrl,
    };
    if (frm.value.amount < 1) {
      alert('Please input minimum amount 500');
      frm.reset();
      return;
    } else {
      let finalObject = {
        userId: this.user.id,
        amount: this.amount,
        upiId:this.upiId,
        recipient_name: 'KalYan BetWise Bazaar',
        recipient_email: 'kalyansattaonline@gmail.com',
        user_mobile: this.user.mobile,
        user_name: this.user.first_name + ' ' + this.user.last_name,
        user_email: 'user@email.com',
        payDate: this.bidDate,
        payTime: this.bidTime,
      };
      this.api.submitPaymentUpi(this.url,finalObject).subscribe((res:any) => {
        if(res.success){         
          window.location.href = `http://35.154.176.14/pay.php?name=${res.data._id}&amount=${finalObject.amount}&email=${finalObject.user_email}&upi=${finalObject.upiId}&mobile=${finalObject.user_mobile}`
        } else{
          alert(res.msg)
        }
      })  
    }
    
  }
}
