import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/services/alert.service';
import { AuthService } from 'src/app/services/auth.service';
import { ConfigService } from 'src/app/services/config.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private config: ConfigService,
    private router: Router
  ) {
    if (this.authService.isLoggedIn()) {
      this.router.navigate([`/portal`]);
    }
  }

  ngOnInit(): void {}

  submit(frm: NgForm) {
    const data = {
      baseUrl: this.config.config.apiUrls.baseUrl,
      authUrl: this.config.config.apiUrls.authUrl,
      loginCredentils: frm.value,
    };
    this.authService.login(data);
  }
}
