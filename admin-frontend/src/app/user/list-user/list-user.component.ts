import { query } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ConfigService } from 'src/app/services/config.service';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.css'],
})
export class ListUserComponent implements OnInit {
  first_name: any;
  constructor(
    private ConfigService: ConfigService,
    public authService: AuthService
  ) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.getList();
    }, 500);
  }

  getList() {
    const typing = this.first_name;
    setTimeout(() => {
      let query = {};
      if (typing === typing) {
        query = {
          first_name: this.first_name,
        };
      }
      this.authService.getUserList(
        this.ConfigService.config.apiUrls.baseUrl,
        this.ConfigService.config.apiUrls.userListUrl,
        query
      );
    }, 3000);
  }

  deleteUser(id) {
    const data = {
      id: id,
      baseUrl: this.ConfigService.config.apiUrls.baseUrl,
      deleteUserUrl: this.ConfigService.config.apiUrls.deleteUserUrl,
    };
    this.authService.deleteUser(data);
    this.getList();
  }
}
