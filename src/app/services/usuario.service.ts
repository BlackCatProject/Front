import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  userType: 'admin' | 'funcionario' | null = null;

  setUserType(type: 'admin' | 'funcionario') {
    this.userType = type;
  }

  getUserType() {
    return this.userType;
  }
}