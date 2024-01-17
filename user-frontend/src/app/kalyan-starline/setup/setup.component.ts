import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { ConfigService } from 'src/app/services/config.service';

@Component({
  selector: 'app-setup',
  templateUrl: './setup.component.html',
  styleUrls: ['./setup.component.css'],
})
export class SetupComponent implements OnInit {
  time: any;
  constructor(
    public apiService: ApiService,
    private configService: ConfigService
  ) {}

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    setTimeout(() => {
      this.apiService
        .getTime(this.configService.config.apiUrls)
        .subscribe((resp: any) => {
          this.time = resp;
        });
      this.apiService.getKalyanResultList(
        this.configService.config.apiUrls.baseUrl,
        this.configService.config.apiUrls.getKalyanResultListUrl
      );
    }, 500);
  }
}
