import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { Usuario } from '../../../models/usuario';
import { UsuarioService } from '../../../services/usuario.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-usuario-form',
  standalone: true,
  imports: [MdbFormsModule, FormsModule],
  templateUrl: './usuario-form.component.html',
  styleUrls: ['./usuario-form.component.scss']
})

export class UsuarioFormComponent {

  @Input("usuario") usuario: Usuario = new Usuario();
  @Output("retorno") retorno = new EventEmitter<any>();
  router = inject(ActivatedRoute);
  router2 = inject(Router);
  usuarioService = inject(UsuarioService);

  constructor () { 
   let id = this.router.snapshot.params['id'];
    if (id) {
      this.findById(id);
    }
  }

  findById(id: number) {
    this.usuarioService.findById(id).subscribe({
      next: retorno => {
        this.usuario = retorno;
      },
      error: error => {
        Swal.fire({
          title: 'Erro ao buscar usuário',
          icon: 'error',
          confirmButtonText: 'Ok',
        });
      },
    });
  }

  save() {
    // Verificar se o formulário é válido antes de enviar
    if (!this.isFormValid()) {
      this.showValidationAlerts();
      return;
    }

    if (this.usuario.id > 0) {
      this.usuarioService.updateUsuario(this.usuario, this.usuario.id).subscribe({
        next: mensagem => {
          Swal.fire({
            title: mensagem,
            icon: 'success',
            confirmButtonText: 'Ok',
          });
          this.router2.navigate(['/usuarios'], {state: {usuarioEditado: this.usuario}});
          this.retorno.emit(this.usuario);
        },
        error: error => {
          Swal.fire({
            title: 'Erro ao buscar usuário',
            icon: 'error',
            confirmButtonText: 'Ok',
          });
        },
      });
    } else {
      this.usuarioService.saveUsuario(this.usuario).subscribe({
        next: mensagem => {
          Swal.fire({
            title: mensagem,
            icon: 'success',
            confirmButtonText: 'Ok',
          });
          this.router2.navigate(['/usuarios'], {state: {usuarioNovo: this.usuario}});
          this.retorno.emit(this.usuario);
        },
        error: error => {
          Swal.fire({
            title: 'Erro ao buscar usuário',
            icon: 'error',
            confirmButtonText: 'Ok',
          });
        },
      });
    }
  }

  isFormValid() {
    return this.usuario.nome 
      && this.usuario.login && this.usuario.login.length >= 3 && this.usuario.login.length <= 20
      && this.usuario.senha && this.usuario.senha.length >= 8
      && this.usuario.role;
  }

  showValidationAlerts() {
    if (!this.usuario.nome) {
      Swal.fire({
        title: 'Nome é obrigatório',
        icon: 'warning',
        confirmButtonText: 'Ok',
      });
    }
    if (!this.usuario.login) {
      Swal.fire({
        title: 'Login é obrigatório',
        icon: 'warning',
        confirmButtonText: 'Ok',
      });
    } else if (this.usuario.login.length < 3) {
      Swal.fire({
        title: 'Login deve ter no mínimo 3 caracteres',
        icon: 'warning',
        confirmButtonText: 'Ok',
      });
    } else if (this.usuario.login.length > 20) {
      Swal.fire({
        title: 'Login deve ter no máximo 20 caracteres',
        icon: 'warning',
        confirmButtonText: 'Ok',
      });
    }
    if (!this.usuario.senha) {
      Swal.fire({
        title: 'Senha é obrigatória',
        icon: 'warning',
        confirmButtonText: 'Ok',
      });
    } else if (this.usuario.senha.length < 8) {
      Swal.fire({
        title: 'Senha deve ter no mínimo 8 caracteres',
        icon: 'warning',
        confirmButtonText: 'Ok',
      });
    }
    if (!this.usuario.role) {
      Swal.fire({
        title: 'Role é obrigatória',
        icon: 'warning',
        confirmButtonText: 'Ok',
      });
    }
  }
}
