import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css'],
})
export class LayoutComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
  toggleSideMenu(e:any) {
    const body: any = document.getElementsByTagName('body');
    var y = [...body[0].classList]
    if(e.target.id !== 'sideMenuToggler') {
      body[0].classList.remove('sidebar-open');
    }
  }
}
