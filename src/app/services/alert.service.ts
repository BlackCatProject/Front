import { Injectable } from '@angular/core';
import Swal, { SweetAlertIcon } from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class AlertService {

  showConfirmDialog(message: string, confirmButtonText: string, icon : SweetAlertIcon) {
    return Swal.fire({
      title: message,
      showCancelButton: true,
      confirmButtonColor: "#40a55e",
      cancelButtonColor: "#d33",
      confirmButtonText: confirmButtonText,
      cancelButtonText: "Cancelar",
      icon: icon
    })
  }

  showAlert(message: string, icon : SweetAlertIcon){
    Swal.fire(message, "", icon);
  }

  showToast(message: string, icon : SweetAlertIcon) {
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      },
    });

    Toast.fire({
      icon: icon,
      title: message,
    });
  }
}
