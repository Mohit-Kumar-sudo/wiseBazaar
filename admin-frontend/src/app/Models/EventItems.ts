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
export interface users {
  _id: String;
  first_name: String;
  last_name: String;
  mobile: String;
  username: String;
  count: Number;
}
export interface result {
  _id: String;
  eventId: String;
  result: String;
  slot: String;
  username: String;
}
export interface payment {
  _id: String;
  payDate: String;
  payTime: String;
  fileName: String;
  payAmount: String;
  status: String;
  transactionsStatus: String;
}

export interface userWallet {
  _id: String;
  userId: String;
  amount: String;
  slot: Object;
}
