import { Injectable } from "@angular/core";
import { ToastrService } from "ngx-toastr";

@Injectable({
  providedIn: "root",
})
export class AlertService {
  constructor(private toastr: ToastrService) {}

  toastOptions = {
    timeOut: 3000,
    positionClass: "toast-bottom-right",
    preventDuplicates: true,
  };

  successToast(msg) {
    this.toastr.success(msg, "Success", this.toastOptions);
  }
  errorToast(msg) {
    this.toastr.error(msg, "Error", this.toastOptions);
  }
  warningToast(msg) {
    this.toastr.warning(msg, "Warning", this.toastOptions);
  }
  infoToast(msg) {
    this.toastr.info(msg, "Info", this.toastOptions);
  }
}
