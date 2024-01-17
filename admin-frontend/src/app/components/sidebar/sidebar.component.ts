import { AuthService } from 'src/app/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { adminNavItems, UserNavItems } from '../_nav';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {
  public navItems = [];
  constructor(private authService: AuthService) {
    if (!this.authService.isLoggedIn()) {
      this.navItems = UserNavItems;
    } else {
      const user = JSON.parse(localStorage.getItem('user'));
      if (user.role == 'admin') {
        this.navItems = adminNavItems;
      } else {
        this.navItems = UserNavItems;
      }
    }
  }

  ngOnInit(): void {}
  toggleMenu() {
    const body: any = document.getElementsByTagName('body');
    body[0].classList.toggle('sidebar-folded');
  }
  toggleSideMenu() {
    const body: any = document.getElementsByTagName('body');
    body[0].classList.toggle('sidebar-open');
  }
}
