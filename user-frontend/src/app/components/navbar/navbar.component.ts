import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  user: any;
  constructor(private authService: AuthService, private router: Router) {
    if (!this.authService.isLoggedIn()) {
      this.router.navigate([`/`]);
    } else {
      this.user = JSON.parse(localStorage.getItem('user'));
      router.events
        .pipe(filter((event) => event instanceof NavigationEnd))
        .subscribe((event: NavigationEnd) => {
          if (this.user.is_password_reset == false) {
            this.router.navigate([`/reset-password`]);
          }
        });
    }
  }

  ngOnInit(): void {}

  logout() {
    this.authService.logout();
  }
  toggleMenu() {
    const body: any = document.getElementsByTagName('body');
    body[0].classList.toggle('sidebar-open');
  }

  forgotPass() {
    this.router.navigate([`/reset-password`]);
  }

  profile(id) {
    this.router.navigate([`/portal/dashboard/profile/${this.user.id}`]);
  }

  helpDesk() {
    this.router.navigate([`/portal/setting/help-desk`]);
  }
}
