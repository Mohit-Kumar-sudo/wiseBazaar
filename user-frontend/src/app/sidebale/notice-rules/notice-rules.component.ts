import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-notice-rules',
  templateUrl: './notice-rules.component.html',
  styleUrls: ['./notice-rules.component.css']
})
export class NoticeRulesComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  back(){
    history.back()
  }
}
