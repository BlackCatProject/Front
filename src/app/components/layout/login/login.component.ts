import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { Login } from '../../../models/login';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';


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
      if (this.login.username === 'admin' && this.login.senha === 'admin') {
        // Login como admin
        Toast.fire({
          icon: "success",
          title: "Você logou como administrador com sucesso!"
        });
        this.router.navigate(['admin/Dashboard']);
      } else if (this.login.username === 'funcionario' && this.login.senha === 'funcionario') {
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
