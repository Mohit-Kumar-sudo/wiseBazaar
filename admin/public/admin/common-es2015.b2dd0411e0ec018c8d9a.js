(window.webpackJsonp=window.webpackJsonp||[]).push([[1],{fTLw:function(s,t,e){"use strict";e.d(t,"a",(function(){return h}));var r=e("fXoL"),a=e("3LUQ"),i=e("r4Kj"),o=e("tk/3"),l=e("tyNb");let h=(()=>{class s{constructor(s,t,e,r){this.alert=s,this.config=t,this.http=e,this.router=r,this.eventslist=[],this.resultOfEvent=[],this.userPayments=[],this.withdRequest=[],this.bids=[],this.today=Date.now()}create(s){this.config.getConfig().subscribe(t=>{const e=t.apiUrls.baseUrl;e?this.http.post(`${e}/${t.apiUrls.eventCreateUrl}`,s).subscribe(s=>{s.success?(this.router.navigate(["/portal/event/list"]),this.alert.successToast(s.msg)):this.alert.errorToast(s.msg)}):this.alert.errorToast("Please fill all the details Properly!")})}getEventsList(){this.config.getConfig().subscribe(s=>{const t=s.apiUrls.baseUrl;t?this.http.post(`${t}/${s.apiUrls.eventListUrl}`,{query:{},page:1,limit:100}).subscribe(s=>{s.success?this.eventslist=s.data:this.alert.errorToast(s.msg)}):this.alert.errorToast("Data not found...")})}getDataById(s){this.config.getConfig().subscribe(t=>{const e=t.apiUrls.baseUrl;e?this.http.post(`${e}/${t.apiUrls.eventGetByIDUrl}`,{id:s}).subscribe(s=>{s.success?this.event=s.data:this.alert.errorToast(s.msg)}):this.alert.errorToast("Data not found...")})}updateDataById(s){this.config.getConfig().subscribe(t=>{const e=t.apiUrls.baseUrl;e?this.http.post(`${e}/${t.apiUrls.eventUpdateByIdUrl}`,s).subscribe(s=>{s.success?(this.router.navigate(["/portal/event/list"]),this.alert.successToast(s.msg)):this.alert.errorToast(s.msg)}):this.alert.errorToast("Data not found...")})}removeDataById(s){this.config.getConfig().subscribe(t=>{const e=t.apiUrls.baseUrl;e?this.http.post(`${e}/${t.apiUrls.eventRemoveByIdUrl}`,s).subscribe(s=>{s.success?(this.getEventsList(),this.alert.successToast(s.msg)):this.alert.errorToast(s.msg)}):this.alert.errorToast("Data not found...")})}result(s){this.http.post(`${s.baseUrl}/${s.resultUrl}`,s).subscribe(s=>{s.success?this.alert.successToast(s.msg):this.alert.errorToast(s.msg)})}resultGetUrl(s){const t=new Date(this.today);t.getDate(),t.getMonth(),t.getFullYear(),this.http.post(`${s.baseUrl}/${s.resultGetUrl}`,{query:{eventId:s.id}}).subscribe(s=>{s.success?this.resultOfEvent=s.data:this.alert.errorToast(s.msg)})}resultUpdateUrl(s){this.http.post(`${s.baseUrl}/${s.resultUpdateByIdUrl}`,s).subscribe(s=>{s.success?this.alert.successToast(s.msg):this.alert.errorToast(s.msg)})}PaymentDataGetListUrl(s){this.http.post(`${s.baseUrl}/${s.userPaymentListUrl}`,{query:{userId:s.userId}}).subscribe(s=>{s.success?this.userPayments=s.data:this.alert.errorToast(s.msg)})}PaymentListByIdUrl(s){this.http.post(`${s.baseUrl}/${s.userPaymentListByIdUrl}`,s).subscribe(s=>{s.success?this.singlePayment=s.data:this.alert.errorToast(s.msg)})}paymentApproval(s,t){this.http.post(`${s.baseUrl}/${s.userPaymentStatusUpdateUrl}`,t).subscribe(s=>{s.success?this.alert.successToast(s.msg):this.alert.errorToast(s.msg)})}withdrawalRequestGetListUrl(s,t){this.http.post(`${s.baseUrl}/${s.withdrawalRequestGetListUrl}`,{query:{userId:t.userId}}).subscribe(s=>{s.success?this.withdRequest=s.data:this.alert.errorToast(s.msg)})}withdrawalRequestApproval(s,t){this.http.post(`${s.baseUrl}/${s.withdrawalRequestApprovalUrl}`,t).subscribe(s=>{s.success?this.alert.successToast(s.msg):this.alert.errorToast(s.msg)})}bidGetList(s,t){this.http.post(`${s.baseUrl}/${s.bidListUrl}`,{query:t}).subscribe(s=>{s.success?this.bids=s.data:this.alert.errorToast(s.msg)})}}return s.\u0275fac=function(t){return new(t||s)(r.Ub(a.a),r.Ub(i.a),r.Ub(o.b),r.Ub(l.c))},s.\u0275prov=r.Hb({token:s,factory:s.\u0275fac,providedIn:"root"}),s})()}}]);