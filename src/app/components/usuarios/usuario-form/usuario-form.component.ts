import { Component, EventEmitter, inject, Input, input, Output } from '@angular/core';
import Swal from 'sweetalert2';
import { Usuario } from '../../../models/usuario';
import { UsuarioService } from '../../../services/usuario.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-usuario-form',
  standalone: true,
  imports: [],
  templateUrl: './usuario-form.component.html',
  styleUrls: ['./usuario-form.component.scss']
})

export class UsuarioFormComponent {

  routter = inject(ActivatedRoute);
  @Input("usuario") usuario: Usuario = new Usuario();
  @Output("retorno") retorno = new EventEmitter();


  constructor () { }

  save() {
    alert("usuario salvo com sucesso!" + this.usuario.nome);
    this.retorno.emit(this.usuario);
  }

  
  
  
}