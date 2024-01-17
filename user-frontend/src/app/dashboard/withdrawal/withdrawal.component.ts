import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { ApiService } from 'src/app/services/api.service'
import { ConfigService } from 'src/app/services/config.service'

@Component({
  selector: 'app-withdrawal',
  templateUrl: './withdrawal.component.html',
  styleUrls: ['./withdrawal.component.css'],
})
export class WithdrawalComponent implements OnInit {
  amount: number
  walletAmount: number = 500
  userWallet: any
  userId: any
  mobileNumber: any
  constructor(
    private ConfigService: ConfigService,
    public apiService: ApiService,
    private router: Router,
  ) {
    setTimeout(() => {
      this.getUserWallet()
    }, 1000)
  }

  ngOnInit(): void {
    this.userId = JSON.parse(localStorage.getItem('user'))
    this.mobileNumber = this.userId.mobile
  }
  getUserWallet() {
    this.apiService.getUserById(
      {
        baseUrl: this.ConfigService.config.apiUrls.baseUrl,
        userGetByIdUrl: this.ConfigService.config.apiUrls.userGetByIdUrl,
      },
      this.userId.id,
    )
    setTimeout(() => {
      this.userWallet = this.apiService.user.wallet
    }, 2000)
  }

  withdrawalAmount(a) {
    console.log(a)
    const data = {
      upiNumber: this.mobileNumber,
      withdrawalAmount: this.amount,
      status: 'Pending',
      userId: this.userId.id,
    }
    if (a < 500) {
      alert('Please Enter Minimum Amount 500')
      return
    }
    if (a > this.userWallet) {
      alert('Please Enter Valid Amount')
      return
    }
    const url = {
      baseUrl: this.ConfigService.config.apiUrls.baseUrl,
      withdrawalRequestUrl: this.ConfigService.config.apiUrls
        .withdrawalRequestUrl,
    }
    this.apiService.withdrawalRequest(url, data)
    const link = `https://wa.me/7999547955?text=I%20want%20withdrawal%20${a}%20rs%20in%20my%20wallet`
    window.open(link, '_blank')
    this.router.navigate([`/portal/sidebale/withdrawal-list`])
  }

  back() {
    history.back()
  }
}
