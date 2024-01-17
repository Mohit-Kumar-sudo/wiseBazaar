import { HttpEventType } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { ConfigService } from 'src/app/services/config.service';

@Component({
  selector: 'app-payment-web',
  templateUrl: './payment-web.component.html',
  styleUrls: ['./payment-web.component.css'],
})
export class PaymentWebComponent implements OnInit {
  amount: any;
  selectedFile: File | null = null;
  uploadProgress = 0;
  transactionImage: any;
  userid: any;
  payAmount: any;
  paymentRequest: any = {
    apiVersion: 2,
    apiVersionMinor: 0,
    allowedPaymentMethods: [
      {
        type: 'CARD',
        parameters: {
          allowedAuthMethods: ['PAN_ONLY', 'CRYPTOGRAM_3DS'],
          allowedCardNetworks: ['AMEX', 'VISA', 'MASTERCARD'],
        },
        tokenizationSpecification: {
          type: 'PAYMENT_GATEWAY',
          parameters: {
            gateway: 'example',
            gatewayMerchantId: 'exampleGatewayMerchantId',
          },
        },
      },
    ],
    merchantInfo: {
      merchantId: 'BCR2DN6T3PCIDFSM',
      merchantName: 'SANATA THE TEA HOUSE',
    },
    transactionInfo: {
      totalPriceStatus: 'FINAL',
      totalPriceLabel: 'Total',
      totalPrice: '1.0',
      currencyCode: 'INR',
      countryCode: 'IN',
    },
    callbackIntents: ['PAYMENT_AUTHORIZATION'],
  };
  constructor(
    private route: ActivatedRoute,
    private ApiService: ApiService,
    private ConfigService: ConfigService
  ) {
    this.route.params.subscribe((param) => {
      this.paymentRequest.transactionInfo.totalPrice = param.amt;
    });
    this.userid = JSON.parse(localStorage.getItem('user')).id;
  }

  ngOnInit(): void {}

  onLoadPaymentdata = (event: Event): void => {
    const eventDetails = event as CustomEvent<google.payments.api.PaymentData>;
  };

  onPaymentDataAuthorized: google.payments.api.PaymentAuthorizedHandler = (
    paymentData
  ) => {
    console.log('payment authorized', paymentData);
    return {
      transactionState: 'SUCCESS',
    };
  };

  onError = (event: ErrorEvent): void => {
    console.error('error', event.error);
  };

  handleFileInput(event) {
    this.selectedFile = event.target.files[0];
    if (
      this.selectedFile.type == 'image/jpeg' ||
      this.selectedFile.type == 'image/png' ||
      this.selectedFile.type == 'application/pdf'
    ) {
      document.getElementById('img-button').innerText =
        'name : ' + this.selectedFile.name + 'type : ' + this.selectedFile.name;
    } else {
      alert('File Type Must be Image (JPEG,PNG) or PDF');
      document.getElementById('img-button').innerHTML = 'Choose a file';
    }
  }

  onUpload() {
    if (this.payAmount < 500) {
      alert('Please input minimum amount 500');
      return;
    } else {
      const data = {
        baseUrl: this.ConfigService.config.apiUrls.baseUrl,
        fileUploadUrl: this.ConfigService.config.apiUrls.fileUploadUrl,
        file: this.selectedFile,
      };
      this.ApiService.uploadFile(data).subscribe((event) => {
        if (event.type === HttpEventType.UploadProgress) {
          this.uploadProgress = Math.round((event.loaded / event.total) * 100);
          document.getElementById(
            'img-button'
          ).innerText = `uploaded : ${this.uploadProgress} % `;
        } else if (event.type === HttpEventType.Response) {
          let res: any = event;
          this.transactionImage = res.body.file.filename;
        }
      });
    }
  }

  paymentDetails(frm: NgForm) {
    this.onUpload();
    setTimeout(() => {
      const doc = {
        userId: this.userid,
        payDate: frm.value.paydate,
        payTime: frm.value.payTime,
        payAmount: frm.value.payAmount,
        transactionStatus: frm.value.transactionStatus,
        receiptPath: frm.value.transactionImage,
        fileName: this.transactionImage,
      };
      const url = {
        baseUrl: this.ConfigService.config.apiUrls.baseUrl,
        PaymentDataUrl: this.ConfigService.config.apiUrls.PaymentDataUrl,
      };
      this.ApiService.submitPayment(url, doc);
      document.getElementById('img-button').innerHTML = '❌';
      this.uploadProgress = 0;
      frm.reset();
    }, 1000);
  }

  back() {
    history.back();
  }
}
