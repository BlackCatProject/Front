import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { MdbCollapseModule } from 'mdb-angular-ui-kit/collapse';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MdbCollapseModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})

export class HeaderComponent {
  router = inject(Router);

  // Método para verificar se o usuário é um admin
  isAdmin(): boolean {
    return localStorage.getItem('userRole') === 'admin';
  }

  // Método que retorna os itens do menu
  getMenuItems() {
    const menuItems = [
      { name: 'Home', link: 'admin/Dashboard' },
      { name: 'Produtos', link: 'admin/Produtos' },
      { name: 'Venda', link: 'admin/Venda' },
    ];

    // Adiciona o item "Usuários" se o usuário for admin
    if (this.isAdmin()) {
      menuItems.push({ name: 'Usuários', link: 'admin/Usuarios' });
    }

    return menuItems;
  }

  confirmLogout(event: Event) {
    event.preventDefault();

    Swal.fire({
      title: 'Tem certeza que deseja sair?',
      text: "Você será redirecionado para a página de login.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim, quero sair',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        // Remover o papel do usuário do localStorage antes de redirecionar
        localStorage.removeItem('userRole');
        // Redirecionar para a página de login quando confirmado
        this.router.navigate(['/login']);
      }
    });
  }
}