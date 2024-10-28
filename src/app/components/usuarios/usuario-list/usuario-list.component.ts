import { booleanAttribute, Component, EventEmitter, inject, Input, OnInit, Output, TemplateRef, ViewChild, viewChild } from '@angular/core';
import { Usuario } from '../../../models/usuario';
import { UsuarioService } from '../../../services/usuario.service';
import Swal from 'sweetalert2';
import { Router, RouterLink } from '@angular/router';
import { MdbModalModule, MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { MdbModalService } from 'mdb-angular-ui-kit/modal';
import { UsuarioFormComponent } from '../usuario-form/usuario-form.component';

@Component({
  selector: 'app-usuario-list',
  standalone: true,
  imports: [RouterLink , MdbModalModule, UsuarioFormComponent],
  templateUrl: './usuario-list.component.html',
  styleUrls: ['./usuario-list.component.scss'],
})
export class UsuarioListComponent {

  @Input() modoAddUser: boolean = false;
  @Output() retorno = new EventEmitter<any>;

  lista: Usuario[] = [];
  usuarioEdit: Usuario = new Usuario();

  //SERVICES
  usuarioService = inject(UsuarioService);
  router = inject(Router);

  //ELEMENTOS DE MODAL
  modalService = inject(MdbModalService);
  @ViewChild("modalUsuarioForm") modalUsuarioForm!: TemplateRef<any>;
  modalRef!: MdbModalRef<any>;
  



  constructor( ) {
    this.findAll();
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


  new() {
    this.usuarioEdit = new Usuario();
    this.modalRef = this.modalService.open(this.modalUsuarioForm);
  } 
  
  edit( usuario: Usuario) {
    this.usuarioEdit = Object.assign ({}, usuario); //clonando pra evitar ref de obj
    this.modalRef = this.modalService.open(this.modalUsuarioForm);
  }

  retornoForm( usuario : Usuario) {
    this.modalRef.close();
    this.findAll();
  }

  retornarUsuario(user : Usuario){
    this.retorno.emit(user);
  }

}
