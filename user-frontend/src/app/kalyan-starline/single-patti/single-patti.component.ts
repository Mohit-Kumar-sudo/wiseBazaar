import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { ConfigService } from 'src/app/services/config.service';

@Component({
  selector: 'app-single-patti',
  templateUrl: './single-patti.component.html',
  styleUrls: ['./single-patti.component.css'],
})
export class SinglePattiComponent implements OnInit {
  params: any;
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
      betType: this.params.title,
      'slot.bidDate': bidDate,
    };
    this.apiService.bidKalyanEventList(
      query,
      this.ConfigService.config.apiUrls.baseUrl,
      this.ConfigService.config.apiUrls.kalyanStarLineGetListUrl
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
    }, 1000);
  }

  bidCreate(frm: NgForm) {
    const currentWalletAmount =
      parseInt(this.userWallet) - parseInt(frm.value.points);
    if (currentWalletAmount >= 0) {
      const bidDate = this.time.DateString;
      const bidTime = this.time.timeString;
      let data = {};
      data = {
        userId: this.userId.id,
        eventTime: this.params.eventTime,
        eventId: this.params.id,
        betType: this.params.title,
        userInput: { singlePatti: frm.value.singlePatti, userInputCount: 1 },
        bidAmount: frm.value.points,
        slot: { bidDate: bidDate, bidTime: bidTime },
        baseUrl: this.ConfigService.config.apiUrls.baseUrl,
        kalyanStarLineCreateUrl:
          this.ConfigService.config.apiUrls.kalyanStarLineCreateUrl,
      };
      this.apiService.bidKalyanEventCreate(data);
      frm.reset();
      this.router.navigate([`/portal/kalyan-starline/setup`]);
    } else {
      alert('Insufficiet Balance');
    }
  }

  back() {
    history.back();
  }
}
