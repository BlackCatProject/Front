import { HttpErrorResponse } from '@angular/common/http';
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
    img: string
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
      cancelButtonText: 'Cancelar',
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

  showErrorToast(erro: HttpErrorResponse) {
    this.showToast(this.tratarErro(erro), 'error');
  }

  tratarErro(erro: HttpErrorResponse): string {
    let msg;

    try {
      const parsedError =
        typeof erro.error === 'string' ? JSON.parse(erro.error) : erro.error;
      if (typeof parsedError === 'object' && parsedError !== null) {
        msg = Object.values(parsedError).join(' | ');
      }
    } catch (e) {
      // Caso erro.error não seja válido
      msg = erro.error || 'Erro desconhecido';
    }

    return msg;
  }
}
