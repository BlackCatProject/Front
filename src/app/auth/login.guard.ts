import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { LoginService } from './login.service';

export const loginGuard: CanActivateFn = (route, state) => {
  const loginService = inject(LoginService);
  const router = inject(Router);

  // Verifica se a URL começa com "/blackcat/usuarios"
  const isUsuariosRoute = state.url.startsWith('/blackcat/usuarios');

  if (!loginService.hasPermission('GESTOR') && isUsuariosRoute) {
    router.navigate(['invalid-access']);
    return false;
  }

  return true;
};
