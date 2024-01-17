import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { retry } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { events, payment, results } from '../Models/EventItems';
import { AlertService } from './alert.service';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  eventslist: Array<events> = [];
  bidLists: Array<any> = [];
  results: any = [];
  userPayment: Array<payment> = [];
  user: any;
  withdRequest: any;
  event: any;
  eventsKalyanlist: any;
  kalyanResults: any;
  kalyanStarLineResults: any;
  manualPaymentList: any;
  validateBidStatus: any;
  kalyaBidLists: any;
  notificationData: any;

  constructor(
    private http: HttpClient,
    private router: Router,
    private config: ConfigService,
    private alert: AlertService
  ) {}

  getTime(data): Observable<any> {
    return this.http.get(`${data.baseUrl}/${data.getTimeUrl}`);
  }

  getEventsList(baseUrl, eventListUrl) {
    this.http.post(`${baseUrl}/${eventListUrl}`, {}).subscribe((resp2) => {
      if ((resp2 as any).success) {
        this.eventslist = (resp2 as any).data;
      } else {
        this.alert.errorToast((resp2 as any).msg);
      }
    });
  }

  getKalyanEventsList() {
    this.config.getConfig().subscribe((resp) => {
      const baseUrl = (resp as any).apiUrls.baseUrl;
      const getkalyanEventListUrl = (resp as any).apiUrls.getkalyanEventListUrl;
      if (baseUrl) {
        this.http
          .post(`${baseUrl}/${getkalyanEventListUrl}`, {
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

  getEventsListById(url, query) {
    this.http
      .post(`${url.baseUrl}/${url.getEventsListByIdUrl}`, { query })
      .subscribe((resp2) => {
        if ((resp2 as any).success) {
          this.event = (resp2 as any).data;
        } else {
          this.alert.errorToast((resp2 as any).msg);
        }
      });
  }

  validateBidStatusCheck(url, query) {
    console.log(query);
    this.http
      .post(`${url.baseUrl}/${url.validateBidStatusUrl}`, { query })
      .subscribe((resp2) => {
        if ((resp2 as any).success) {
          this.validateBidStatus = (resp2 as any).data;
        } else {
          this.alert.errorToast((resp2 as any).msg);
        }
      });
  }

  getUserById(url, id) {
    this.http
      .post(`${url.baseUrl}/${url.userGetByIdUrl}`, { id: id })
      .subscribe((resp2) => {
        if ((resp2 as any).success) {
          this.user = (resp2 as any).data;
        } else {
          this.alert.errorToast((resp2 as any).msg);
        }
      });
  }

  bidCreate(data) {
    this.http
      .post(`${data.baseUrl}/${data.bidCreateUrl}`, data)
      .subscribe((resp2) => {
        if ((resp2 as any).success) {
          this.alert.successToast((resp2 as any).msg);
        } else {
          this.alert.errorToast((resp2 as any).msg);
        }
      });
  }

  ManualPaymentAdd(data) {
    this.http
      .post(`${data.baseUrl}/${data.ManualPaymentAddUrl}`, data)
      .subscribe((resp2) => {
        if ((resp2 as any).success) {
          this.alert.successToast((resp2 as any).msg);
        } else {
          this.alert.errorToast((resp2 as any).msg);
        }
      });
  }

  bidKalyanEventCreate(data) {
    this.http
      .post(`${data.baseUrl}/${data.kalyanStarLineCreateUrl}`, data)
      .subscribe((resp2) => {
        if ((resp2 as any).success) {
          this.alert.successToast((resp2 as any).msg);
        } else {
          this.alert.errorToast((resp2 as any).msg);
        }
      });
  }

  bidList(query, baseUrl, bidGetByEventIdUrl) {
    this.bidLists = [];
    this.http
      .post(`${baseUrl}/${bidGetByEventIdUrl}`, { query: query })
      .subscribe((resp2) => {
        if ((resp2 as any).success) {
          this.bidLists = (resp2 as any).data;
        } else {
          this.alert.errorToast((resp2 as any).msg);
        }
      });
  }

  bidKalyanEventList(query, baseUrl, kalyanStarLineGetListUrl) {
    this.bidLists = [];
    this.http
      .post(`${baseUrl}/${kalyanStarLineGetListUrl}`, { query: query })
      .subscribe((resp2) => {
        if ((resp2 as any).success) {
          this.kalyaBidLists = (resp2 as any).data;
        } else {
          this.alert.errorToast((resp2 as any).msg);
        }
      });
  }

  getresultList(baseUrl, getresultListUrl, day) {
    this.http
      .post(`${baseUrl}/${getresultListUrl}`, { day: day })
      .subscribe((resp2) => {
        if ((resp2 as any).success) {
          this.results = (resp2 as any).data;
        } else {
          this.alert.errorToast((resp2 as any).msg);
        }
      });
  }
  // with event
  getKalyanResultList(baseUrl, getKalyanResultListUrl) {
    this.http
      .post(`${baseUrl}/${getKalyanResultListUrl}`, {})
      .subscribe((resp2) => {
        if ((resp2 as any).success) {
          this.kalyanResults = (resp2 as any).data;
        } else {
          this.alert.errorToast((resp2 as any).msg);
        }
      });
  }
  // without event
  kalyanResultGetListUrl(baseUrl, kalyanResultGetListUrl, query) {
    this.http
      .post(`${baseUrl}/${kalyanResultGetListUrl}`, { query })
      .subscribe((resp2) => {
        if ((resp2 as any).success) {
          this.kalyanStarLineResults = (resp2 as any).data;
        } else {
          this.alert.errorToast((resp2 as any).msg);
        }
      });
  }

  uploadFile(data) {
    const fd = new FormData();
    fd.append('file', data.file, data.file.name);
    return this.http.post(`${data.baseUrl}/${data.fileUploadUrl}`, fd, {
      reportProgress: true,
      observe: 'events',
    });
  }

  submitPayment(url, data) {
    return this.http.post(`${url.baseUrl}/${url.PaymentDataUrl}`, data);
  }

  submitPaymentUpi(url, data) {
    return this.http.post(`${url.baseUrl}/${url.PaymentDataUrlUpi}`, data);
  }
  // submitPaymentUpi(url, data) {
  //   return this.http.post(`${environment.url}/${url.PaymentDataUrlUpi}`, data);
  // }

  paymentUpdateByIdUrl(baseUrl, url, data) {
    return this.http.post(`${baseUrl}/${url}`, data);
  }

  updatePaymentstatus(baseUrl, url, id) {
    return this.http.get(`${baseUrl}/${url}/${id}`);
  }

  paymentDeleteDataByIdUrl(baseUrl, url, data) {
    return this.http.post(`${baseUrl}/${url}`, data);
  }

  PaymentDataGetListUrl(data) {
    this.http
      .post(`${data.baseUrl}/${data.PaymentDataGetListUrl}`, {
        query: { userId: data.userId },
      })
      .subscribe((resp2) => {
        if ((resp2 as any).success) {
          this.userPayment = (resp2 as any).data;
        } else {
          this.alert.errorToast((resp2 as any).msg);
        }
      });
  }

  withdrawalRequest(url, data) {
    this.http
      .post(`${url.baseUrl}/${url.withdrawalRequestUrl}`, data)
      .subscribe((resp2) => {
        if ((resp2 as any).success) {
          this.alert.successToast((resp2 as any).msg);
        } else {
          this.alert.errorToast((resp2 as any).msg);
        }
      });
  }

  withdrawalRequestGetListUrl(url, query) {
    console.log(query);
    this.http
      .post(`${url.baseUrl}/${url.withdrawalRequestGetListUrl}`, { query })
      .subscribe((resp2) => {
        if ((resp2 as any).success) {
          this.withdRequest = (resp2 as any).data;
        } else {
          this.alert.errorToast((resp2 as any).msg);
        }
      });
  }

  ManualPaymentgetList(data) {
    console.log(data);
    this.http
      .post(`${data.baseUrl}/${data.ManualPaymentgetListUrl}`, {
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

  manualPaymentTnxUpdateById(data) {
    this.http
      .post(`${data.baseUrl}/${data.manualPaymentTnxUpdateByIdUrl}`, data)
      .subscribe((resp2) => {
        if ((resp2 as any).success) {
          this.alert.successToast((resp2 as any).msg);
        } else {
          this.alert.errorToast((resp2 as any).msg);
        }
      });
  }
  notificationList(baseUrl, notificationGetUrl) {
    this.http
      .post(`${baseUrl}/${notificationGetUrl}`, {})
      .subscribe((resp2) => {
        if ((resp2 as any).success) {
          this.notificationData = (resp2 as any).data;
          // this.alert.successToast((resp2 as any).msg);
        } else {
          this.alert.errorToast((resp2 as any).msg);
        }
      });
  }

  mpinEnable(baseUrl, userUpdateByIdUrl, data) {
    this.http
      .post(`${baseUrl}/${userUpdateByIdUrl}`, data)
      .subscribe((resp2) => {
        if ((resp2 as any).success) {
          // this.alert.successToast((resp2 as any).msg);
        } else {
          this.alert.errorToast((resp2 as any).msg);
        }
      });
  }

  mpinReset(url, data) {
    this.http
      .post(`${url.baseUrl}/${url.resetMpinUrl}`, data)
      .subscribe((resp2) => {
        if ((resp2 as any).success) {
          this.alert.successToast((resp2 as any).msg);
        } else {
          this.alert.errorToast((resp2 as any).msg);
        }
      });
  }
}
