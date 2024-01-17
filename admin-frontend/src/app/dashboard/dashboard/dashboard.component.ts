import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AlertService } from 'src/app/services/alert.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  user: any;
  showInfo: boolean = false;
  constructor(private authService: AuthService, private alert: AlertService) {}

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user'));
  }
}
