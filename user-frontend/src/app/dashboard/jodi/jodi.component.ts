import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { ConfigService } from 'src/app/services/config.service';
import { query } from '@angular/animations';

@Component({
  selector: 'app-jodi',
  templateUrl: './jodi.component.html',
  styleUrls: ['./jodi.component.css'],
})
export class JodiComponent implements OnInit {
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
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((param) => {
      this.params = param;
    });
    this.userId = JSON.parse(localStorage.getItem('user'));
    setTimeout(() => {
      this.getUserWallet();
    }, 500);
  }

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
        betType: 'jodi',
        userInput: { userInputValue: frm.value.jodi, userInputCount: 1 },
        userInputType: 'jodi',
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
