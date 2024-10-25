import { booleanAttribute, Component, OnInit } from '@angular/core';
import { Usuario } from '../../../models/usuario';
import { UsuarioService } from '../../../services/usuario.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-usuario-list',
  standalone: true,
  imports: [],
  templateUrl: './usuario-list.component.html',
  styleUrls: ['./usuario-list.component.scss'],
})
export class UsuarioListComponent implements OnInit {
  listaAtiva: Usuario[] = [];
  isGestor: boolean = false; //vindo do login

  constructor(private usuarioService: UsuarioService) {}

  ngOnInit(): void {
    this.listarUsuarios();
    this.checkIsGestor();
  }

  checkIsGestor(): void {
    this.isGestor = this.usuarioService.isGestor(); //vindo do login;
  }

  listarUsuarios(): void {
    this.usuarioService.findAll(true).subscribe(
      (usuarios: Usuario[]) => {
        this.listaAtiva = usuarios; // Corrigido
      },
      (error) => {
        console.error('Erro ao listar usuários ativos:', error);
      }
    );
  }  

  findById(id: number): void {
    this.usuarioService.findById(id).subscribe({
      next: (mensagem) => {
        Swal.fire({
          title: mensagem,
          icon: 'success',
          timer: 1500,
          confirmButtonText: 'Ok',
        });
        this.usuarioService.findById(id);
      }, 
      error: (error) => {
        console.error('Erro ao buscar usuário:', error);
        if (error.status === 404) {
          Swal.fire({
            title: 'Usuário não encontrado',
        })
      }
    }
    });
  }

  desativarUsuario(id: number): void {
    this.usuarioService.desativarUsuario(id).subscribe({
      next: (mensagem) => {
        Swal.fire({
          title: mensagem,
          icon: 'success',
          timer: 1500,
          confirmButtonText: 'Ok',
        });
        this.listarUsuarios();
      },
      error: (error) => {
        console.error('Erro ao desativar usuário:', error);
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
}
