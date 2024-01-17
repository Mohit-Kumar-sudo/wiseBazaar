import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { ConfigService } from 'src/app/services/config.service';

@Component({
  selector: 'app-payment-history',
  templateUrl: './payment-history.component.html',
  styleUrls: ['./payment-history.component.css'],
})
export class PaymentHistoryComponent implements OnInit {
  userId: any;
  constructor(
    public ApiService: ApiService,
    public ConfigService: ConfigService
  ) {
    this.userId = JSON.parse(localStorage.getItem('user')).id;
  }

  ngOnInit(): void {
   this.paymentData();
  }

  refreshStatus(id){
    const data = {
      baseUrl: this.ConfigService.config.apiUrls.baseUrl,
      url:
        this.ConfigService.config.apiUrls.updatePaymentstatus,
      id: id,
    };
    this.ApiService.updatePaymentstatus(data.baseUrl,data.url,data.id).subscribe((res:any)=> {
      if(res.success){
        this.paymentData();
      } else{
        alert(res.msg);
      }
    })
  }

  paymentData(){
    setTimeout(() => {
      const data = {
        baseUrl: this.ConfigService.config.apiUrls.baseUrl,
        PaymentDataGetListUrl:
          this.ConfigService.config.apiUrls.PaymentDataGetListUrl,
        userId: this.userId,
      };
      this.ApiService.PaymentDataGetListUrl(data);
    }, 1000);
  }

  back() {
    history.back();
  }
}
