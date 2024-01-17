import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { ConfigService } from 'src/app/services/config.service';
@Component({
  selector: 'app-full-sangam',
  templateUrl: './full-sangam.component.html',
  styleUrls: ['./full-sangam.component.css'],
})
export class FullSangamComponent implements OnInit {
  params: any;
  today = Date.now();
  userInputType: any;
  userId: any;
  userWallet: any;
  time: any;
  constructor(
    private route: ActivatedRoute,
    private ConfigService: ConfigService,
    public apiService: ApiService,
    private router: Router
  ) {
    this.route.params.subscribe((param) => {
      this.params = param;
    });
    this.userId = JSON.parse(localStorage.getItem('user'));
    setTimeout(() => {
      this.getUserWallet();
    }, 500);
  }

  ngOnInit(): void {}

  getList() {
    const bidDate = this.time.DateString;
    const query = {
      eventId: this.params.id,
      userId: this.userId.id,
      betType: this.params.type,
      'slot.bidDate': bidDate,
    };
    this.apiService.bidList(
      query,
      this.ConfigService.config.apiUrls.baseUrl,
      this.ConfigService.config.apiUrls.bidGetByEventIdUrl
    );
  }

  getUserWallet() {
    this.apiService
      .getTime(this.ConfigService.config.apiUrls)
      .subscribe((resp: any) => {
        this.time = resp;
      });
    this.apiService.getUserById(
      {
        baseUrl: this.ConfigService.config.apiUrls.baseUrl,
        userGetByIdUrl: this.ConfigService.config.apiUrls.userGetByIdUrl,
      },
      this.userId.id
    );
    setTimeout(() => {
      this.userWallet = this.apiService.user.wallet;
      this.getList();
    }, 2000);
  }

  bidCreate(frm: NgForm) {
    if (frm.value.points < 9) {
      alert('Please add minimum amount 10');
      return;
    }
    const currentWalletAmount =
      parseInt(this.userWallet) - parseInt(frm.value.points);
    console.log(currentWalletAmount);
    if (currentWalletAmount >= 0) {
      const bidDate = this.time.DateString;
      const bidTime = this.time.timeString;
      let data = {};
      data = {
        userId: this.userId.id,
        eventId: this.params.id,
        bidType: 'close',
        betType: this.params.type,
        userInput: {
          openPanna: frm.value.openPanna,
          closePanna: frm.value.closePanna,
          userInputCount: 1,
        },
        userInputType: 'full sangam',
        bidAmount: frm.value.points,
        slot: { bidDate: bidDate, bidTime: bidTime },
        baseUrl: this.ConfigService.config.apiUrls.baseUrl,
        bidCreateUrl: this.ConfigService.config.apiUrls.bidCreateUrl,
      };

      this.apiService.bidCreate(data);
      frm.reset();
      setTimeout(() => {
        this.getUserWallet();
      }, 500);
    } else {
      this.getUserWallet();
      alert('Insufficiet Balance');
    }
  }

  back() {
    history.back();
  }
}
