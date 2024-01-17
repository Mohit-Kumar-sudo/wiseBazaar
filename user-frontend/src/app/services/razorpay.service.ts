import { HttpClient } from '@angular/common/http';
import { ApplicationRef, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RazorpayService {


  customerId: string | undefined;
  orderId: string | undefined;
  amount: number | undefined;
  customer: any;
  rzapi: any;
  newOrder: any;

  paymentId: string = "";
  paymentSuccess = false;
  paymentFailed = false;

  // config = {
  //   key: "rzp_live_3huqAncDuZX",
  //   url: `${environment.url}/razor/`,
  //   company: "Print Posters",
  //   logo: "assets/imgs/ppmainlogo.png"
  // }

  constructor(
    // private http: HttpClient, private ref: ApplicationRef, private authService: AuthService, private helper: HelperService
    ) {
  }

  // responseHandler = (response: any) => {
  //   console.log(JSON.stringify(response));
  //   this.paymentId = response.razorpay_payment_id;
  //   this.paymentFailed = false;
  //   this.paymentSuccess = true;
  //   localStorage.setItem("paymentStatus", "");
  //   this.newOrder.payment_mode = "Razorpay Success";
  //   // this.authService.placeOrder(this.newOrder);

  //   this.ref.tick();
  // };

  // failureHandler = (response: any) => {
  //   this.paymentSuccess = false;
  //   this.paymentFailed = true;
  //   this.ref.tick();
  // }

  // initiatePayment(newOrder: any) {
  //   this.newOrder = newOrder;
  //   var options = {
  //     "key": this.config.key,
  //     "amount": this.amount,
  //     "currency": "INR",
  //     "name": this.config.company,
  //     "description": "Order Booking",
  //     "image": this.config.logo,
  //     "order_id": this.orderId,
  //     "handler": this.responseHandler,
  //     "prefill": {
  //       "name": newOrder.name,
  //       "email": newOrder.email,
  //       "contact": newOrder.mobile
  //     },
  //     "notes": {
  //       "address": newOrder.delivery_address
  //     },
  //     "theme": {

  //       "color": "#673ab7"
  //     }
  //   };

  //   this.rzapi = new Razorpay(options);
  //   this.rzapi.on('payment.failed', this.failureHandler);
  //   this.rzapi.open();
  // }

  // createOrder(amount: any) {
  //   this.amount = Math.round(amount * 100);
  //   document.body.style.cursor = "wait";
  //   var request = {
  //     amount: amount,
  //   };
  //   return this.http.post(this.config.url + "createOrder", request).toPromise()
  //     .then((response: any) => {
  //       document.body.style.cursor = "default";
  //       // console.log(response);
  //       this.orderId = response["orderId"];
  //       return "proceed";
  //     }).catch(e => {
  //       document.body.style.cursor = "default";
  //       this.helper.showSnackbar("Error processing payment");
  //       console.log(e);
  //     });
  // }


  // makePayment() {


  //   // var x = localStorage.getItem("newOrders");
  //   // console.log(this.totalAmount);
  //   // console.log(this.discount);
  //   // console.log(this.addr);
  //   // console.log(this.billingaddr);



  //   if (
  //     this.totalAmount &&
  //     this.addr.name &&
  //     this.addr.email &&
  //     this.addr.mobile &&
  //     this.addr.pincode &&
  //     this.addr.state &&
  //     this.addr.city &&
  //     this.addr.street &&
  //     this.billingaddr.name &&
  //     this.billingaddr.email &&
  //     this.billingaddr.mobile &&
  //     this.billingaddr.pincode &&
  //     this.billingaddr.state &&
  //     this.billingaddr.city &&
  //     this.billingaddr.street
  //   ) {
  //     localStorage.setItem('tax', (this.amount * 0.12).toString());
  //     localStorage.setItem('shipping', this.shippingAmount.toString());
  //     localStorage.setItem('coupon', 'LOVE');
  //     localStorage.setItem('affiliation', 'Printposters - Online');
  //     let orderTitle = '';
  //     for (const oc of this.orderCategories) {
  //       if (oc.orders.length) {
  //         if (orderTitle) {
  //           orderTitle += ',';
  //         }
  //         orderTitle += oc.name;
  //       }
  //     }
  //     localStorage.setItem('orderTitle', orderTitle);
  //     // const uorder = {
  //     //   note: this.note,
  //     // };


  //     if (!this.shippingApplied) {


  //       this.orderSvc.payment(this.paymentRazor, this.note, 0, this.totalAmount, this.discount, [
  //         { shippingaddr: this.addr, billingaddr: this.billingaddr },
  //       ]);
  //     } else if (this.shippingType == 'Free') {
  //       this.orderSvc.payment(
  //         this.paymentRazor,
  //         this.note,
  //         this.shippingAmount,
  //         this.totalAmount,
  //         this.discount,
  //         [{ shippingaddr: this.addr, billingaddr: this.billingaddr }]
  //       );
  //     } else {
  //       this.orderSvc.payment(
  //         this.paymentRazor,
  //         this.note,
  //         this.getPaidShippingAmount(),
  //         this.totalAmount,
  //         this.discount,
  //         [{ shippingaddr: this.addr, billingaddr: this.billingaddr }]
  //       );
  //     }
  //   } else {
  //     this.helper.showSnackbar('Please Fill All The Neccesary Details Above.');
  //   }
  // }
}

