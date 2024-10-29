import { inject, Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Usuario } from '../models/usuario';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  API = 'http://localhost:8080/api/usuario';

  constructor(private http: HttpClient) {}

  //CRUD - Create - save
  saveUsuario(usuario: Usuario): Observable<string> {
    return this.http.post<string>(`${this.API}/save`, usuario, {
      responseType: 'text' as 'json'
    });
  }

  //CRUD - Read - findAll
  findAll(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.API + `/findAll?ativo=true`); //API + /metodo + parametro Boolean
  }

  //CRUD - Read - findById
  findById(id: number): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.API}/findById/${id}`); //API dentro do metodo
  }

  //CRUD - Update - update
  updateUsuario( usuario: Usuario, id: number): Observable<string> {
    return this.http.put<string>(`${this.API}/update/${id}`, usuario, {
      responseType: 'text' as 'json'
    });
  }

  //CRUD - Delete - delete
  deleteUsuario(id: number): Observable<string> {
    return this.http.delete<string>(`${this.API}/delete/${id}`, {
      responseType: 'text' as 'json',
    });
  }

  //CRUD - Desativar - disable
  desativarUsuario(id: number): Observable<string> {
    return this.http.put<string>(
      `${this.API}/disable/${id}`,
      {},
      {
        responseType: 'text' as 'json',
      }
    );
  }

  //CRUD - Ativar - enable
  ativarUsuario(id: number): Observable<string> {
    return this.http.put<string>(
      `${this.API}/enable/${id}`,
      {},
      {
        responseType: 'text' as 'json',
      }
    );
  }

  verificarUsuarioExistente(usuario: Usuario): Observable<boolean> {
    return this.http.post<boolean>(`${this.API}/verificar`, usuario);
  }
}
