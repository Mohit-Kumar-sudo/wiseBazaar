import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { events, payment, result } from '../Models/EventItems';
import { AlertService } from './alert.service';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  eventslist: any = [];
  resultOfEvent: Array<result> = [];
  userPayments: Array<payment> = [];
  singlePayment: any;
  userWalletData: any;
  withdRequest: any = [];
  bids: any = [];
  event: any;
  eventKalyan: any;
  eventsKalyanlist: any = [];
  today = Date.now();
  resultOfkalyanStarline: any;
  eventslistwithresult: any;
  manualPaymentList: any;
  manualSinglePayment: any;
  notification: any;
  notificationOne: any;
  constructor(
    private alert: AlertService,
    private config: ConfigService,
    private http: HttpClient,
    private router: Router
  ) {}

  getTime(data): Observable<any> {
    return this.http.get(`${data.baseUrl}/${data.getTimeUrl}`);
  }

  getUpdateResult(data): Observable<any> {
    return this.http.post(`${data.baseUrl}/${data.getUpdateResultUrl}`, data);
  }

  create(data) {
    this.config.getConfig().subscribe((resp) => {
      const baseUrl = (resp as any).apiUrls.baseUrl;
      const eventCreateUrl = (resp as any).apiUrls.eventCreateUrl;
      if (baseUrl) {
        this.http
          .post(`${baseUrl}/${eventCreateUrl}`, data)
          .subscribe((resp2) => {
            if ((resp2 as any).success) {
              this.router.navigate(['/portal/event/list']);
              this.alert.successToast((resp2 as any).msg);
            } else {
              this.alert.errorToast((resp2 as any).msg);
            }
          });
      } else {
        this.alert.errorToast('Please fill all the details Properly!');
      }
    });
  }

  createEventStarline(data) {
    this.config.getConfig().subscribe((resp) => {
      const baseUrl = (resp as any).apiUrls.baseUrl;
      const kalyanEventCreateUrl = (resp as any).apiUrls.kalyanEventCreateUrl;
      if (baseUrl) {
        this.http
          .post(`${baseUrl}/${kalyanEventCreateUrl}`, data)
          .subscribe((resp2) => {
            if ((resp2 as any).success) {
              this.router.navigate(['/portal/kalyan-starline/list']);
              this.alert.successToast((resp2 as any).msg);
            } else {
              this.alert.errorToast((resp2 as any).msg);
            }
          });
      } else {
        this.alert.errorToast('Please fill all the details Properly!');
      }
    });
  }

  getEventsList() {
    this.config.getConfig().subscribe((resp) => {
      const baseUrl = (resp as any).apiUrls.baseUrl;
      const authUrl = (resp as any).apiUrls.getresultListUrl;
      if (baseUrl) {
        this.http
          .post(`${baseUrl}/${authUrl}`, { query: {}, page: 1, limit: 1000 })
          .subscribe((resp2) => {
            if ((resp2 as any).success) {
              this.eventslist = (resp2 as any).data;
            } else {
              this.alert.errorToast('Data not found...');
            }
          });
      } else {
        this.alert.errorToast('Data not found...');
      }
    });
  }

  getKalyanEventsList() {
    this.config.getConfig().subscribe((resp) => {
      const baseUrl = (resp as any).apiUrls.baseUrl;
      const eventKalyanListUrl = (resp as any).apiUrls.eventKalyanListUrl;
      if (baseUrl) {
        this.http
          .post(`${baseUrl}/${eventKalyanListUrl}`, {
            query: {},
            page: 1,
            limit: 1000,
          })
          .subscribe((resp2) => {
            if ((resp2 as any).success) {
              this.eventsKalyanlist = (resp2 as any).data;
            } else {
              this.alert.errorToast((resp2 as any).msg);
            }
          });
      } else {
        this.alert.errorToast('Data not found...');
      }
    });
  }

  getDataById(id) {
    this.config.getConfig().subscribe((resp) => {
      const baseUrl = (resp as any).apiUrls.baseUrl;
      const eventGetByIDUrl = (resp as any).apiUrls.eventGetByIDUrl;
      if (baseUrl) {
        this.http
          .post(`${baseUrl}/${eventGetByIDUrl}`, { id: id })
          .subscribe((resp2) => {
            if ((resp2 as any).success) {
              this.event = (resp2 as any).data;
            } else {
              this.alert.errorToast((resp2 as any).msg);
            }
          });
      } else {
        this.alert.errorToast('Data not found...');
      }
    });
  }

  getKalyanById(id) {
    this.eventKalyan = [];
    this.config.getConfig().subscribe((resp) => {
      const baseUrl = (resp as any).apiUrls.baseUrl;
      const eventKalyanGetIdUrl = (resp as any).apiUrls.eventKalyanGetIdUrl;
      if (baseUrl) {
        this.http
          .post(`${baseUrl}/${eventKalyanGetIdUrl}`, { id: id })
          .subscribe((resp2) => {
            if ((resp2 as any).success) {
              this.eventKalyan = (resp2 as any).data;
            } else {
              this.alert.errorToast((resp2 as any).msg);
            }
          });
      } else {
        this.alert.errorToast('Data not found...');
      }
    });
  }

  updateDataById(data) {
    this.config.getConfig().subscribe((resp) => {
      const baseUrl = (resp as any).apiUrls.baseUrl;
      const updateDataByIDUrl = (resp as any).apiUrls.eventUpdateByIdUrl;
      if (baseUrl) {
        this.http
          .post(`${baseUrl}/${updateDataByIDUrl}`, data)
          .subscribe((resp2) => {
            if ((resp2 as any).success) {
              this.router.navigate(['/portal/event/list']);
              this.alert.successToast((resp2 as any).msg);
            } else {
              this.alert.errorToast((resp2 as any).msg);
            }
          });
      } else {
        this.alert.errorToast('Data not found...');
      }
    });
  }
  updateKalyanStarlineDataById(data) {
    this.config.getConfig().subscribe((resp) => {
      const baseUrl = (resp as any).apiUrls.baseUrl;
      const eventKalyanUpdateByIdUrl = (resp as any).apiUrls
        .eventKalyanUpdateByIdUrl;
      if (baseUrl) {
        this.http
          .post(`${baseUrl}/${eventKalyanUpdateByIdUrl}`, data)
          .subscribe((resp2) => {
            if ((resp2 as any).success) {
              this.router.navigate(['/portal/kalyan-starline/list']);
              this.alert.successToast((resp2 as any).msg);
            } else {
              this.alert.errorToast((resp2 as any).msg);
            }
          });
      } else {
        this.alert.errorToast('Data not found...');
      }
    });
  }

  removeDataById(data) {
    this.config.getConfig().subscribe((resp) => {
      const baseUrl = (resp as any).apiUrls.baseUrl;
      const removeDataById = (resp as any).apiUrls.eventRemoveByIdUrl;
      if (baseUrl) {
        this.http
          .post(`${baseUrl}/${removeDataById}`, data)
          .subscribe((resp2) => {
            if ((resp2 as any).success) {
              this.getEventsList();
              this.alert.successToast((resp2 as any).msg);
            } else {
              this.alert.errorToast((resp2 as any).msg);
            }
          });
      } else {
        this.alert.errorToast('Data not found...');
      }
    });
  }

  result(data) {
    this.http
      .post(`${data.baseUrl}/${data.resultUrl}`, data)
      .subscribe((resp2) => {
        if ((resp2 as any).success) {
          this.alert.successToast((resp2 as any).msg);
        } else {
          this.alert.errorToast((resp2 as any).msg);
        }
      });
  }

  kalyanResultCreate(data) {
    this.http
      .post(`${data.baseUrl}/${data.kalyanResultCreateUrl}`, data)
      .subscribe((resp2) => {
        if ((resp2 as any).success) {
          this.alert.successToast((resp2 as any).msg);
        } else {
          this.alert.errorToast((resp2 as any).msg);
        }
      });
  }

  resultGetUrl(url, data) {
    this.http
      .post(`${url.baseUrl}/${url.resultGetUrl}`, {
        query: { data },
      })
      .subscribe((resp2) => {
        if ((resp2 as any).success) {
          this.resultOfEvent = (resp2 as any).data;
        } else {
          this.alert.errorToast((resp2 as any).msg);
        }
      });
  }

  kalyanResultGetUrl(data) {
    this.http
      .post(`${data.baseUrl}/${data.kalyanResultGetUrl}`, {
        query: {
          eventId: data.id,
          resultDate: data.resultDate,
          resultTime: data.resultTime,
        },
      })
      .subscribe((resp2) => {
        if ((resp2 as any).success) {
          this.resultOfkalyanStarline = (resp2 as any).data;
        } else {
          this.alert.errorToast((resp2 as any).msg);
        }
      });
  }

  resultUpdateUrl(data) {
    this.http
      .post(`${data.baseUrl}/${data.resultUpdateByIdUrl}`, data)
      .subscribe((resp2) => {
        if ((resp2 as any).success) {
          this.alert.successToast((resp2 as any).msg);
        } else {
          this.alert.errorToast((resp2 as any).msg);
        }
      });
  }

  PaymentDataGetListUrl(data) {
    this.http
      .post(`${data.baseUrl}/${data.userPaymentListUrl}`, {
        query: { userId: data.userId },
      })
      .subscribe((resp2) => {
        if ((resp2 as any).success) {
          this.userPayments = (resp2 as any).data;
        } else {
          this.alert.errorToast((resp2 as any).msg);
        }
      });
  }

  ManualPaymentGetList(data) {
    this.http
      .post(`${data.baseUrl}/${data.ManualPaymentGetListUrl}`, {
        query: { userId: data.userId },
      })
      .subscribe((resp2) => {
        if ((resp2 as any).success) {
          this.manualPaymentList = (resp2 as any).data;
        } else {
          this.alert.errorToast((resp2 as any).msg);
        }
      });
  }

  PaymentListByIdUrl(data) {
    this.http
      .post(`${data.baseUrl}/${data.userPaymentListByIdUrl}`, data)
      .subscribe((resp2) => {
        if ((resp2 as any).success) {
          this.singlePayment = (resp2 as any).data;
        } else {
          this.alert.errorToast((resp2 as any).msg);
        }
      });
  }

  manualPaymentGetById(data) {
    this.http
      .post(`${data.baseUrl}/${data.ManualPaymentGetByIdListUrl}`, data)
      .subscribe((resp2) => {
        if ((resp2 as any).success) {
          this.manualSinglePayment = (resp2 as any).data;
        } else {
          this.alert.errorToast((resp2 as any).msg);
        }
      });
  }
  paymentApproval(url, data) {
    this.http
      .post(`${url.baseUrl}/${url.userPaymentStatusUpdateUrl}`, data)
      .subscribe((resp2) => {
        if ((resp2 as any).success) {
          this.alert.successToast((resp2 as any).msg);
        } else {
          this.alert.errorToast((resp2 as any).msg);
        }
      });
  }

  manualPaymentApproval(url, data) {
    this.http
      .post(`${url.baseUrl}/${url.userManualPaymentStatusUpdateUrl}`, data)
      .subscribe((resp2) => {
        if ((resp2 as any).success) {
          this.alert.successToast((resp2 as any).msg);
        } else {
          this.alert.errorToast((resp2 as any).msg);
        }
      });
  }

  withdrawalRequestGetListUrl(url, data) {
    this.http
      .post(`${url.baseUrl}/${url.withdrawalRequestGetListUrl}`, {
        query: { userId: data.userId },
      })
      .subscribe((resp2) => {
        if ((resp2 as any).success) {
          this.withdRequest = (resp2 as any).data;
        } else {
          this.alert.errorToast((resp2 as any).msg);
        }
      });
  }
  withdrawalRequestApproval(url, data) {
    this.http
      .post(`${url.baseUrl}/${url.withdrawalRequestApprovalUrl}`, data)
      .subscribe((resp2) => {
        if ((resp2 as any).success) {
          this.alert.successToast((resp2 as any).msg);
        } else {
          this.alert.errorToast((resp2 as any).msg);
        }
      });
  }

  bidGetList(url, query) {
    this.http
      .post(`${url.baseUrl}/${url.bidListUrl}`, { query })
      .subscribe((resp2) => {
        if ((resp2 as any).success) {
          this.bids = (resp2 as any).data;
        } else {
          this.alert.errorToast((resp2 as any).msg);
        }
      });
  }

  eventResultDeleteById(url, data) {
    this.http
      .post(`${url.baseUrl}/${url.resultDeleteByIdUrl}`, { id: data })
      .subscribe((resp2) => {
        if ((resp2 as any).success) {
          this.alert.successToast((resp2 as any).msg);
        } else {
          this.alert.errorToast((resp2 as any).msg);
        }
      });
  }

  createNotification(url, data) {
    this.http
      .post(`${url.baseUrl}/${url.notificationCreateUrl}`, data)
      .subscribe((resp2) => {
        if ((resp2 as any).success) {
          this.alert.successToast((resp2 as any).msg);
        } else {
          this.alert.errorToast((resp2 as any).msg);
        }
      });
  }

  listNotification(url) {
    this.http
      .post(`${url.baseUrl}/${url.notificationListUrl}`, {})
      .subscribe((resp2) => {
        if ((resp2 as any).success) {
          this.notification = (resp2 as any).data;
          // this.alert.successToast((resp2 as any).msg);
        } else {
          this.alert.errorToast((resp2 as any).msg);
        }
      });
  }
  EditNotification(url, data) {
    this.http
      .post(`${url.baseUrl}/${url.notificationEditUrl}`, data)
      .subscribe((resp2) => {
        if ((resp2 as any).success) {
          this.alert.successToast((resp2 as any).msg);
        } else {
          this.alert.errorToast((resp2 as any).msg);
        }
      });
  }
  DeleteNotification(url, id) {
    this.http
      .post(`${url.baseUrl}/${url.notificationDeleteUrl}`, { id: id })
      .subscribe((resp2) => {
        if ((resp2 as any).success) {
          this.alert.successToast((resp2 as any).msg);
        } else {
          this.alert.errorToast((resp2 as any).msg);
        }
      });
  }
  getDataByIdNotification(url, id) {
    this.http
      .post(`${url.baseUrl}/${url.notificationGetByIdUrl}`, { id: id })
      .subscribe((resp2) => {
        if ((resp2 as any).success) {
          this.notificationOne = (resp2 as any).data;
          this.alert.successToast((resp2 as any).msg);
        } else {
          this.alert.errorToast((resp2 as any).msg);
        }
      });
  }
  addFundManuallyByAdmin(url, data) {
    this.http
      .post(`${url.baseUrl}/${url.addFundByIdUrl}`, data)
      .subscribe((resp2) => {
        if ((resp2 as any).success) {
          this.notificationOne = (resp2 as any).data;
          this.alert.successToast((resp2 as any).msg);
        } else {
          this.alert.errorToast((resp2 as any).msg);
        }
      });
  }
}
