import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { ConfigService } from 'src/app/services/config.service';

@Component({
  selector: 'app-result-yesterday',
  templateUrl: './result-yesterday.component.html',
  styleUrls: ['./result-yesterday.component.css'],
})
export class ResultYesterdayComponent implements OnInit {
  showInfo: boolean = false;
  modals = [];
  userId: any;
  userWallet: any;
  constructor(
    public apiService: ApiService,
    private configService: ConfigService
  ) {
    
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.apiService.getresultList(
        this.configService.config.apiUrls.baseUrl,
        this.configService.config.apiUrls.getresultListUrl,1
      );
    }, 1000);
  }

  getResult(i) {
    console.log(i);

    let open_patti = '***';
    let open_digit = '*';
    let close_patti = '***';
    let close_digit = '*';
    for (const r of i) {
      if (r.data_set == 'open') {
        open_patti = r.patti;
        open_digit = r.digit;
      }
      if (r.data_set == 'close') {
        close_patti = r.patti;
        close_digit = r.digit;
      }
    }
    return `${open_patti}-${open_digit}${close_digit}-${close_patti}`;
  }
}
