import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { Login } from '../../../auth/login';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { LoginService } from '../../../auth/login.service';
import { T } from '@angular/cdk/keycodes';
import { AlertService } from '../../../services/alert.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MdbFormsModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  login: Login = new Login();

  router = inject(Router);

  loginService = inject(LoginService);

  alertService = inject(AlertService);

  logar() {
    if (!this.login.username || !this.login.password) {
      this.alertService.showAlert(
        'Por favor, preencha todos os campos.',
        'error'
      );
      return;
    }

    this.loginService.logar(this.login).subscribe({
      next: (token) => {
        if (token) {
          this.loginService.addToken(token);
          this.alertService.showToast(
            'Login realizado com sucesso!',
            'success'
          );
          this.router.navigate(['blackcat/dashboard']);
        }
      },
      error: (erro) => {
        if (erro.status === 401) {
          this.alertService.showAlert('Usuário ou senha incorretos.', 'error');
        } else {
          this.alertService.showErrorAlert(erro);
        }
      },
    });
  }

  autenticar() {
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
  }
}
