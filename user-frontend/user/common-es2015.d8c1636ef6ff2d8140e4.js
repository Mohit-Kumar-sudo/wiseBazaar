(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{"H+bZ":function(t,s,e){"use strict";e.d(s,"a",(function(){return h}));var r=e("fXoL"),a=e("tk/3"),i=e("tyNb"),l=e("r4Kj"),o=e("3LUQ");let h=(()=>{class t{constructor(t,s,e,r){this.http=t,this.router=s,this.config=e,this.alert=r,this.eventslist=[],this.bidLists=[],this.results=[],this.userPayment=[]}getTime(t){return this.http.get(`${t.baseUrl}/${t.getTimeUrl}`)}getEventsList(t,s){this.http.post(`${t}/${s}`,{}).subscribe(t=>{t.success?this.eventslist=t.data:this.alert.errorToast(t.msg)})}getKalyanEventsList(){this.config.getConfig().subscribe(t=>{const s=t.apiUrls.baseUrl;s?this.http.post(`${s}/${t.apiUrls.getkalyanEventListUrl}`,{query:{},page:1,limit:1e3}).subscribe(t=>{t.success?this.eventsKalyanlist=t.data:this.alert.errorToast(t.msg)}):this.alert.errorToast("Data not found...")})}getEventsListById(t,s){this.http.post(`${t.baseUrl}/${t.getEventsListByIdUrl}`,{query:s}).subscribe(t=>{t.success?this.event=t.data:this.alert.errorToast(t.msg)})}validateBidStatusCheck(t,s){console.log(s),this.http.post(`${t.baseUrl}/${t.validateBidStatusUrl}`,{query:s}).subscribe(t=>{t.success?this.validateBidStatus=t.data:this.alert.errorToast(t.msg)})}getUserById(t,s){this.http.post(`${t.baseUrl}/${t.userGetByIdUrl}`,{id:s}).subscribe(t=>{t.success?this.user=t.data:this.alert.errorToast(t.msg)})}bidCreate(t){this.http.post(`${t.baseUrl}/${t.bidCreateUrl}`,t).subscribe(t=>{t.success?this.alert.successToast(t.msg):this.alert.errorToast(t.msg)})}ManualPaymentAdd(t){this.http.post(`${t.baseUrl}/${t.ManualPaymentAddUrl}`,t).subscribe(t=>{t.success?this.alert.successToast(t.msg):this.alert.errorToast(t.msg)})}bidKalyanEventCreate(t){this.http.post(`${t.baseUrl}/${t.kalyanStarLineCreateUrl}`,t).subscribe(t=>{t.success?this.alert.successToast(t.msg):this.alert.errorToast(t.msg)})}bidList(t,s,e){this.bidLists=[],this.http.post(`${s}/${e}`,{query:t}).subscribe(t=>{t.success?this.bidLists=t.data:this.alert.errorToast(t.msg)})}bidKalyanEventList(t,s,e){this.bidLists=[],this.http.post(`${s}/${e}`,{query:t}).subscribe(t=>{t.success?this.kalyaBidLists=t.data:this.alert.errorToast(t.msg)})}getresultList(t,s,e){this.http.post(`${t}/${s}`,{day:e}).subscribe(t=>{t.success?this.results=t.data:this.alert.errorToast(t.msg)})}getKalyanResultList(t,s){this.http.post(`${t}/${s}`,{}).subscribe(t=>{t.success?this.kalyanResults=t.data:this.alert.errorToast(t.msg)})}kalyanResultGetListUrl(t,s,e){this.http.post(`${t}/${s}`,{query:e}).subscribe(t=>{t.success?this.kalyanStarLineResults=t.data:this.alert.errorToast(t.msg)})}uploadFile(t){const s=new FormData;return s.append("file",t.file,t.file.name),this.http.post(`${t.baseUrl}/${t.fileUploadUrl}`,s,{reportProgress:!0,observe:"events"})}submitPayment(t,s){return this.http.post(`${t.baseUrl}/${t.PaymentDataUrl}`,s)}submitPaymentUpi(t,s){return this.http.post(`${t.baseUrl}/${t.PaymentDataUrlUpi}`,s)}paymentUpdateByIdUrl(t,s,e){return this.http.post(`${t}/${s}`,e)}updatePaymentstatus(t,s,e){return this.http.get(`${t}/${s}/${e}`)}paymentDeleteDataByIdUrl(t,s,e){return this.http.post(`${t}/${s}`,e)}PaymentDataGetListUrl(t){this.http.post(`${t.baseUrl}/${t.PaymentDataGetListUrl}`,{query:{userId:t.userId}}).subscribe(t=>{t.success?this.userPayment=t.data:this.alert.errorToast(t.msg)})}withdrawalRequest(t,s){this.http.post(`${t.baseUrl}/${t.withdrawalRequestUrl}`,s).subscribe(t=>{t.success?this.alert.successToast(t.msg):this.alert.errorToast(t.msg)})}withdrawalRequestGetListUrl(t,s){console.log(s),this.http.post(`${t.baseUrl}/${t.withdrawalRequestGetListUrl}`,{query:s}).subscribe(t=>{t.success?this.withdRequest=t.data:this.alert.errorToast(t.msg)})}ManualPaymentgetList(t){console.log(t),this.http.post(`${t.baseUrl}/${t.ManualPaymentgetListUrl}`,{query:{userId:t.userId}}).subscribe(t=>{t.success?this.manualPaymentList=t.data:this.alert.errorToast(t.msg)})}manualPaymentTnxUpdateById(t){this.http.post(`${t.baseUrl}/${t.manualPaymentTnxUpdateByIdUrl}`,t).subscribe(t=>{t.success?this.alert.successToast(t.msg):this.alert.errorToast(t.msg)})}notificationList(t,s){this.http.post(`${t}/${s}`,{}).subscribe(t=>{t.success?this.notificationData=t.data:this.alert.errorToast(t.msg)})}mpinEnable(t,s,e){this.http.post(`${t}/${s}`,e).subscribe(t=>{t.success||this.alert.errorToast(t.msg)})}mpinReset(t,s){this.http.post(`${t.baseUrl}/${t.resetMpinUrl}`,s).subscribe(t=>{t.success?this.alert.successToast(t.msg):this.alert.errorToast(t.msg)})}}return t.\u0275fac=function(s){return new(s||t)(r.Ub(a.b),r.Ub(i.c),r.Ub(l.a),r.Ub(o.a))},t.\u0275prov=r.Hb({token:t,factory:t.\u0275fac,providedIn:"root"}),t})()}}]);