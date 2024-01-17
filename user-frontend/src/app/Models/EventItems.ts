export interface notificationOfEvent {
  openTime: String;
  closeTime: String;
  alert: String;
}
export interface events {
  _id: String;
  title: String;
  notification: Array<notificationOfEvent>;
}
export interface results {
  _id: String;
  eventId: String;
  result: Object;
  slot: Object;
}

export interface payment {
  _id: String;
  payDate: String;
  payTime: String;
  fileName: String;
  payAmount: String;
  transactionsStatus: String;
}
