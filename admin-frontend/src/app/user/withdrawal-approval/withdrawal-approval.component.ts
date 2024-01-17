import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfigService } from 'src/app/services/config.service';
import { EventService } from 'src/app/services/event.service';

@Component({
  selector: 'app-withdrawal-approval',
  templateUrl: './withdrawal-approval.component.html',
  styleUrls: ['./withdrawal-approval.component.css'],
})
export class WithdrawalApprovalComponent implements OnInit {
  requestId: any;
  withAmount: any;
  status: any;
  uid: any;
  constructor(
    private EventService: EventService,
    private ConfigService: ConfigService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.route.params.subscribe((param) => {
      this.requestId = param.id;
      this.withAmount = param.wam;
      this.uid = param.uid;
    });
  }

  ngOnInit(): void {}
  withdrawalApproval(frm: NgForm) {
    if (this.withAmount < frm.value.payAmount) {
      alert('Please Check Enter Amount Before Payment');
    } else if (this.withAmount > frm.value.payAmount) {
      alert('Please Check Withdrawal Amount Before Payment');
    } else {
      const url = {
        baseUrl: this.ConfigService.config.apiUrls.baseUrl,
        withdrawalRequestApprovalUrl:
          this.ConfigService.config.apiUrls.withdrawalRequestApprovalUrl,
      };
      const data = {
        _id: this.requestId,
        uid: this.uid,
        payAmount: this.withAmount,
        ...frm.value,
      };
      this.EventService.withdrawalRequestApproval(url, data);
      this.router.navigate([`/portal/user/list`]);
    }
  }
}
