import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { Login } from '../../../auth/login';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { LoginService } from '../../../auth/login.service';
import { AlertService } from '../../../services/alert.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MdbFormsModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
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
          // Armazena o token no localStorage
          this.loginService.addToken(token);
          this.alertService.showToast('Login realizado com sucesso!', 'success');

          // Recupera o usuário logado para verificar o papel (role)
          const usuario = this.loginService.getUsuarioLogado();
          
          // Redireciona conforme o papel do usuário
          if (usuario.role === 'GESTOR') {
            this.router.navigate(['blackcat/dashboard']);
          } else if (usuario.role === 'FUNCIONARIO') {
            this.router.navigate(['blackcat/funcionario']);

          } else {
            this.alertService.showAlert('Acesso não autorizado', 'error');
            this.router.navigate(['invalid-access']);
          }
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
