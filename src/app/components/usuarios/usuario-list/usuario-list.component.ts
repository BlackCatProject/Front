import { booleanAttribute, Component, inject, OnInit } from '@angular/core';
import { Usuario } from '../../../models/usuario';
import { UsuarioService } from '../../../services/usuario.service';
import Swal from 'sweetalert2';
import { Router, RouterLink } from '@angular/router';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
@Component({
  selector: 'app-usuario-list',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './usuario-list.component.html',
  styleUrls: ['./usuario-list.component.scss'],
})
export class UsuarioListComponent {
  lista: Usuario[] = [];

  usuarioService = inject(UsuarioService);
  router = inject(Router);

  constructor() {
    this.findAll();
  }

  ngOnInit(): void {      //ao inicializar puxa o findall em ordem decrescente
    this.usuarioService.findAll().subscribe(
      data => {
        this.lista = data;
        this.ordenarUsuariosPorId();
      },
      error => console.error('Erro ao buscar usuários', error)
    );
  }
  ordenarUsuariosPorId() {       //logica da ordem descerescente
    this.lista.sort((a, b) => b.id - a.id);
  }



  findAll() {
    this.usuarioService.findAll().subscribe({
      next: (lista) => {
        this.lista = lista;
      },
      error: (error) => {
        Swal.fire({
          title: 'Erro ao buscar usuários',
          icon: 'error',
          confirmButtonText: 'Ok',
        });
      },
    });
  }

  findById(id: number) {
    this.usuarioService.findById(id).subscribe({
      next: (usuario) => {
        this.lista = [usuario];
      },
      error: (error) => {
        Swal.fire({
          title: 'Erro ao buscar usuário',
          icon: 'error',
          confirmButtonText: 'Ok',
        });
      },
    });
  }


  desativarUsuario(usuario: Usuario) {
    Swal.fire({
      title: 'Atenção',
      text: `Tem certeza que deseja desativar o usuário ${usuario.login}?`,
      icon: 'warning',
      showConfirmButton: true,
      showDenyButton: true,
      confirmButtonText: 'Sim',
      cancelButtonText: 'Não',
    }).then((result) => {
      if (result.isConfirmed) {


        this.usuarioService.desativarUsuario(usuario.id).subscribe({
          next: mensagem => {
            Swal.fire({
              title: mensagem,
              icon: 'success',
              confirmButtonText: 'Ok',
            });
            this.findAll();
          },
          error: erro => {
            Swal.fire({
              title: 'Erro ao buscar usuário',
              icon: 'error',
              confirmButtonText: 'Ok',
            });
          },
        });
         
      }
    });
  }
}
