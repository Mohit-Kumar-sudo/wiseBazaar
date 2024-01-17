import { DOCUMENT } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { AlertService } from '../../services/alert.service';
import { ConfigService } from '../../services/config.service';
import { Router } from '@angular/router';

declare var bolt: any;

@Component({
  selector: 'app-payment-test',
  templateUrl: './payment-test.component.html',
  styleUrls: ['./payment-test.component.css'],
})
export class PaymentTestComponent implements OnInit {
  key = 'WJZbDt';
  salt = 'zppxe17MRlBwzLZ2nxDLnLy2Mn95TD0R';
  salt2 =
    'MIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDRDdLQQsBHEU+t1CUUH2s5offU9TDGhrlEjWtPL0/SQyw1Coqq77TaTvkLbWE8ArhYnyFTTLYGaVhWxheQVrvU1dxxL63BkenrHKSXCfMhlNMI7vayeNq4RStuZ1QaxlH6Bsr9afA4KChPs81c4CrcF9EN57a3JdLQVm+p8la1FeWmjNLiENH+DzeXo4AFhKWSPfDkbO2Hi8pnaQy0Hy8pJtsiSL9Xt0rNLcmFpiukKl9feSkL+T/BvdgzYJ9jlp/wDUNng6qLKFqo1ghaXlxq8RBOGoT8L8UBMrNDerTT9CdW8G8fwaIXs1uNBghR/iIwsINfN6sNO8pJZM6AG0IPAgMBAAECggEAOcPlFbDsKncJGlI9cKMB4On1bj3WHXVKqjudhELhfosbIwjnqjYUNiKORG8T6B4kTDCkZ70RqxHe3BNenX6p5jS19fyjuZIVHedLP4T7TrMt4REOz9//J93NE3Ov1LoqGrlXy9BDFXFbOjLHszsp/KkEFiCJ52+nIfRQZJhXBzAmVvDhAztCNzLV4K0f6Wrl3/7N0z+0iTf7QseT14eMFfCyG1Hvcvp8tefziKlc+W0+++1Fwlj4Z9wExIxLnyeQPT0UooQpNy63nF880ACgFpco9dhbcnX0ayF5BdGWB7XKLoQavxomglJG7SHh/JR0cN06uinVhROzVjRHPgjMIQKBgQD+kSVxf+xi7TthOP9oAVaymCDdy+0+Hae+ueRcxMcMTHVvc/GivD5EjFVnKI1upmdLOroB/bNfinjQtDZDl0TSQsE1144/TOJzpzpK98rmi6hqoN6ZogisZOuFFQlf/EjZZTx5imVMVJMKrok1IdqZN7v3dli1LXJ1r3jFcUQasQKBgQDSOxbGKWiCbSrKZyMWwCDlmvNNrVXxXK4NFKlOcoMwB9AVENRZ7uTSDiuWDXduMlx7wzNNrq9aRhtqlh9YAM5iRQyU08LBz6BvqegsgnZH+1AsmLQFGPaNfaVB5dtQ1m18j/j02G0e5C5AR/MP2xnPCw4Gx5I+2UCRJlUUCabYvwKBgQDLKmwHuWCfU1YgsaylBOx8fI0+dpJRELnfrdxjbWiumBbhbFdc2X+YladTPTojJQsrLyNkk2Wkyo7BghIMv51dcYlhvzb3rhTM2JndWwXEGZHAB8OgOYFSlPiirbdds6swVWt+VMWjtZvk2ocGsI4V2jVZuknxzuOaqQBqE4uXAQKBgQCItfg3YRIfTtJ20N8WmlZKOZtitgefb3+X7gmzg/AfudTs/ga5fQq8No7Ng3BY7tMJgITKTYCmmdSWWY2EcvHDIdfuqE6MLnLMapca6rP0V09p0NuwPO2IUV64HbujM+37BL0Gq/86CXSyRJehhf+gjjXO3tURncHJIj5NS4F+jQKBgDd+8mPHQ9YWui939eGZhFGtjM/pKbdCJTONdgV+9jayp84fVTtdZEwNDBPsI1o2xc5Szr2fuJdW6Qx4Ur0p97386UvysGaMjG9XGAT1co0oP6mpin2LN9giQBx9h4B5+FrbYK3cn5vqjYja+MO8L37YsKgtTfsxBX1aC+lAFFce';
  user: any;
  amount = 0;
  hash: any;

  constructor(
    @Inject(DOCUMENT) private doc: Document,
    private http: HttpClient,
    private alert: AlertService,
    private config: ConfigService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user'));
    this.setBoltScript();
  }

  payWithPayu(frm: NgForm) {
    console.log(frm.value);
    this.post('https://secure.payu.in', frm.value);
  }

  post(path, params, method = 'post') {
    // The rest of this code assumes you are not using a library.
    // It can be made less verbose if you use one.
    const form = document.createElement('form');
    form.method = method;
    form.action = path;
    form.setAttribute('target', '_blank');

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

  setBoltScript() {
    var Scripts: any = this.doc.getElementsByTagName('script');
    var Script_Remove = false;
    for (var i = 0; i < Scripts.length; i++) {
      if (Scripts[i].attributes.id) {
        if (Scripts[i].attributes.id.value == 'bolt') {
          Scripts[i].remove();
          Script_Remove = true;
        }
      }
    }

    if (!Script_Remove) {
      let script: HTMLScriptElement = this.doc.createElement('script');
      script.setAttribute('id', 'bolt');
      // script.setAttribute(
      //   'src',
      //   'https://checkout-static.citruspay.com/bolt/run/bolt.min.js'
      // );
      script.setAttribute(
        'src',
        'https://sboxcheckout-static.citruspay.com/bolt/run/bolt.min.js'
      );
      script.setAttribute('bolt-color', 'e34524');
      script.setAttribute(
        'bolt-logo',
        'http://boltiswatching.com/wp-content/uploads/2015/09/Bolt-Logo-e14421724859591.png'
      );
      this.doc.head.appendChild(script);
    } else {
      let script: HTMLScriptElement = this.doc.createElement('script');
      script.setAttribute('id', 'bolt');
      // script.setAttribute(
      //   'src',
      //   'https://checkout-static.citruspay.com/bolt/run/bolt.min.js'
      // );
      script.setAttribute(
        'src',
        'https://sboxcheckout-static.citruspay.com/bolt/run/bolt.min.js'
      );
      script.setAttribute('bolt-color', 'e34524');
      script.setAttribute(
        'bolt-logo',
        'http://boltiswatching.com/wp-content/uploads/2015/09/Bolt-Logo-e14421724859591.png'
      );
      this.doc.head.appendChild(script);
    }
  }

  addFund() {
    if (this.amount >= 100) {
      const order = {
        txnid: 'A' + Date.now(),
        amount: this.amount,
        firstname: this.user.first_name + ' ' + this.user.last_name,
        phone: this.user.mobile,
        email: 'abc@xyz.com',
        productinfo: 'wallet update',
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
          // console.log(res);
          // this.hash = res._body;
          this.hash = res;
          this.payment(order, this.hash, (err: any, res: any) => {
            if (err) {
              this.alert.warningToast(err.message);
              console.log(err);
            } else {
              this.alert.successToast(res.response.txnStatus);
              const transResponse = res.response;

              // if (res.response.txnStatus != `CANCEL`) {
              if (res.response.txnStatus == `SUCCESS`) {
                const p_res = res.response;
                const p_res_hash = res.response.hash;

                const data2 = JSON.stringify({
                  txnid: res.response.txnid,
                  amount: res.response.amount,
                  pinfo: res.response.productinfo,
                  fname: res.response.firstname,
                  email: res.response.email,
                  mobile: res.response.phone,
                  udf5: res.response.udf5,
                  status: res.response.status,
                });

                const url = {
                  baseUrl: this.config.config.apiUrls.baseUrl,
                  rescheckUrl: this.config.config.apiUrls.rescheck,
                };

                this.http
                  .post(url.baseUrl + '/' + url.rescheckUrl, data2, {
                    responseType: 'text',
                  })
                  .subscribe((res: any) => {
                    // const res_hash = res._body;
                    const res_hash = res;
                    if (p_res_hash === res_hash) {
                      this.updateFund();
                    }
                  });
              } else {
              }
            }
          });
        });
    }
  }

  payment(order, hash, resp) {
    console.log(order, hash, resp);
    bolt.launch(
      {
        key: 'WJZbDt',
        txnid: order.txnid,
        hash: hash,
        amount: order.amount,
        firstname: order.firstname,
        phone: order.phone,
        email: order.email,
        productinfo: order.productinfo,
        udf5: order.udf5,
        surl: 'https://satkamatka.com/',
        furl: 'https://satkamatka.com/',
        service_provider: 'payu_paisa',
      },
      {
        responseHandler: (BOLT) => {
          console.log(BOLT);
          resp(false, BOLT);
        },
        catchException: (BOLT) => {
          resp(BOLT, 'err');
        },
      }
    );
  }

  updateFund() {
    const url = {
      baseUrl: this.config.config.apiUrls.baseUrl,
      addFundByIdUrl: this.config.config.apiUrls.addFundByIdUrl,
    };
    const data = {
      id: this.user._id,
      amount: this.amount,
    };
    this.router.navigate(['/portal/user/list']);
  }
}
