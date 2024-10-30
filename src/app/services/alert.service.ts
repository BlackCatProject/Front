import { Injectable } from '@angular/core';
import Swal, { SweetAlertIcon } from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  showConfirmDialog(
    message: string,
    txt: string,
    confirmButtonText: string,
    icon: SweetAlertIcon
  ) {
    return Swal.fire({
      title: message,
      text: txt,
      showCancelButton: true,
      confirmButtonColor: '#84aadc',
      cancelButtonColor: '#d33',
      confirmButtonText: confirmButtonText,
      cancelButtonText: 'Cancelar',
      icon: icon,
    });
  }
  showConfirmDialogWithImg(
    message: string,
    txt: string,
    confirmButtonText: string,
    img : string
  ) {
    return Swal.fire({
      imageUrl: 'https://unsplash.it/400/200',
      imageWidth: 400,
      imageHeight: 200,
      title: message,
      text: txt,
      showCancelButton: true,
      confirmButtonColor: '#84aadc',
      cancelButtonColor: '#d33',
      confirmButtonText: confirmButtonText,
      cancelButtonText: 'Cancelar'
    });
  }

  showAlert(message: string, icon: SweetAlertIcon) {
    Swal.fire(message, '', icon);
  }

  showToast(message: string, icon: SweetAlertIcon) {
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
