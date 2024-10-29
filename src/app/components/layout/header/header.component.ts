import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { MdbCollapseModule } from 'mdb-angular-ui-kit/collapse';
import Swal from 'sweetalert2';
import { AlertService } from '../../../services/alert.service';


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MdbCollapseModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})

export class HeaderComponent {
  router = inject(Router);
alertService = inject(AlertService)

  // Método para verificar se o usuário é um admin
  isAdmin(): boolean {
    return localStorage.getItem('userRole') === 'admin';
  }

  // Método que retorna os itens do menu
  getMenuItems() {
    const menuItems = [
      { name: 'Home', link: 'admin/dashboard' },
      { name: 'Produtos', link: 'admin/produtos' },
      { name: 'Venda', link: 'admin/venda' },
    ];

    // Adiciona o item "Usuários" se o usuário for admin
    if (this.isAdmin()) {
      menuItems.push({ name: 'Usuários', link: 'admin/usuarios' });
    }

    return menuItems;
  }

  confirmLogout(event: Event) {
    event.preventDefault();

    this.alertService.showConfirmDialog("Tem certeza que deseja sair?", "Voce ser redirecionando para tela de login","Sim, quero sair", "warning").then((result) => {
      if (result.isConfirmed) {
        // Remover o papel do usuário do localStorage antes de redirecionar
        localStorage.removeItem('userRole');
        // Redirecionar para a página de login quando confirmado
        this.router.navigate(['/login']);
      }
    });
  }
}