import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { Login } from '../../../auth/login';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { LoginService } from '../../../auth/login.service';
import { T } from '@angular/cdk/keycodes';
import { AlertService } from '../../../services/alert.service';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MdbFormsModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  login: Login = new Login();

  router = inject(Router); 

  loginService = inject(LoginService);

  alertService = inject(AlertService);


  logar(){
    this.loginService.logar(this.login).subscribe({
      next : token =>{
        if(token){
          this.loginService.addToken(token);
          this.router.navigate(['funcionario/dashboard']);
        }
      },
      error : erro =>{
        this.alertService.showErrorToast(erro);
      }
    });
  }


  autenticar() {
    const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      }
    });

      // Verifica as credenciais e o tipo de usuário
      if (this.login.username === 'admin' && this.login.password === 'admin') {
        // Login como admin
        Toast.fire({
          icon: "success",
          title: "Você logou como administrador com sucesso!"
        });
        this.router.navigate(['admin/dashboard']);
      } else if (this.login.username === 'funcionario' && this.login.password === 'funcionario') {
        // Login como funcionário
        Toast.fire({
          icon: "success",
          title: "Você logou como funcionário com sucesso!"
        });
        this.router.navigate(['funcionario/dashboard']);
      } else {
        // Login incorreto
        Toast.fire({
          icon: "error",
          title: "Usuário ou senha incorretos!"
        });
      }
    }
}
