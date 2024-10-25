import { Component } from '@angular/core';
import Swal from 'sweetalert2';
import { Usuario } from '../../../models/usuario';
import { UsuarioService } from '../../../services/usuario.service';

@Component({
  selector: 'app-usuario-form',
  standalone: true,
  imports: [],
  templateUrl: './usuario-form.component.html',
  styleUrls: ['./usuario-form.component.scss']
})

export class UsuarioFormComponent {

  nome: string = '';
  login: string = '';
  senha: string = '';
  role: 'GESTOR' | 'FUNCIONARIO' = 'FUNCIONARIO';


  constructor(private usuarioService: UsuarioService) {}

  cadastrarUsuario(): void {
    const novoUsuario: Usuario = {
      id : 0,
      nome: this.nome,
      login: this.login,
      senha: this.senha,
      role: this.role,
      ativo: true};
    this.usuarioService.salvarUsuario(novoUsuario).subscribe({
      next: mensagem => {
        Swal.fire({
          title: mensagem,
          icon: 'success',
          timer: 1500,
          confirmButtonText: 'Ok',
        });
        this.limparCampos();
      },

      error: error => {
        Swal.fire({
          title: 'Erro ao cadastrar usuário',
          icon: 'error',
          timer: 1500,
          confirmButtonText: 'Ok',
        });
        console.error('Erro ao cadastrar usuário:', error);
      }
    });
    }

    atualizarUsuario(id: number): void {
      this.usuarioService.findById(id).subscribe({
        next: (usuario) => {
          this.preencherCampos(usuario);
          Swal.fire({
            title: 'Usuário carregado para edição.',
            icon: 'success',
            timer: 1500,
            confirmButtonText: 'Ok',
          })
        },
        error: (error) => {
          console.error('Erro ao atualizar usuário:', error);
          if (error.status === 404) {
            Swal.fire({
              title: 'Usuário não encontrado',
              icon: 'error',
              timer: 1500,
              confirmButtonText: 'Ok',
            });
          }
        },
      });
    }

    preencherCampos(usuario: Usuario): void {
      this.nome = usuario.nome;
      this.login = usuario.login;
      this.senha = usuario.senha;
      this.role = usuario.role;
      // Você pode querer lidar com outros campos conforme necessário
    }    

    limparCampos(): void {
      this.nome = '';
      this.login = '';
      this.senha = ''; 
      this.role = 'FUNCIONARIO'; 
    }
}
