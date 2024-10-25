import { inject, Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Usuario } from '../models/usuario';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  http = inject(HttpClient);
  API = 'http://localhost:8080/api/usuario';

  //metodo login para armazenar o usuário logado
  private usuarioAtual: Usuario | null = null;
  login(usuario: Usuario): void {
    this.usuarioAtual = usuario;
  }
  logout(): void {
    this.usuarioAtual = null;
  }

  isGestor(): boolean {
    return this.usuarioAtual?.role === 'GESTOR';
  }

  private usuarios: Usuario[] = [];

  constructor() {}

  findAll(ativo: boolean): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(`${this.API}/findAll?ativo=${ativo}`);
  }

  findById(id: number): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.API}/findById/${id}`);
  }

  salvarUsuario(usuario: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(`${this.API}/save`, usuario);
  }

  atualizarUsuario(id: number, usuario: Usuario): Observable<Usuario> {
    return this.http.put<Usuario>(`${this.API}/update/${id}`, usuario);
  }

  deletarUsuario(id: number): Observable<string> {
    return this.http.delete<string>(`${this.API}/delete/${id}`, {
      responseType: 'text' as 'json',
    });
  }

  desativarUsuario(id: number): Observable<string> {
    return this.http.put<string>(
      `${this.API}/disable/${id}`,
      {},
      {
        responseType: 'text' as 'json',
      }
    );
  }

  ativarUsuario(id: number): Observable<string> {
    return this.http.put<string>(
      `${this.API}/enable/${id}`,
      {},
      {
        responseType: 'text' as 'json',
      }
    );
  }
}
