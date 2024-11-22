import { Component, inject, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { VendaService } from '../../../services/venda.service';
import { LoginService } from '../../../auth/login.service';
import { AlertService } from '../../../services/alert.service';
import { Venda } from '../../../models/venda';
import { Router } from '@angular/router';
import { MdbModalModule, MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';

@Component({
  selector: 'app-dashboard-funcionario',
  standalone: true,
  imports: [MdbModalModule],
  templateUrl: './dashboard-funcionario.component.html',
  styleUrls: ['./dashboard-funcionario.component.scss']
})
export class DashboardFuncionarioComponent implements OnInit {

  modalService = inject(MdbModalService);
  alertService = inject(AlertService);
  vendaService = inject(VendaService);
  loginService = inject(LoginService);
  router = inject(Router);

  vendasPorUsuario: Venda[] = [];
  usuarioId: number = 0;
  selectVenda: Venda | null = null;
  modalRef!: MdbModalRef<any>;

  @ViewChild('modalVenda') modalVendaTemplate!: TemplateRef<any>;

  constructor() {}

  ngOnInit(): void {
    const usuario = this.loginService.getUsuarioLogado();
    if (usuario) {
      this.usuarioId = usuario.id;
      this.getVendasPorUsuario(this.usuarioId);
    } else {
      this.alertService.showToast("Usuário não logado", "error");
    }
  }

  getVendasPorUsuario(usuarioId: number): void {
    this.vendaService.findByUsuario(usuarioId).subscribe({
      next: (vendas) => {
        this.vendasPorUsuario = vendas;
      },
      error: (erro) => {
        console.error('Erro ao buscar vendas do usuário', erro);
        this.alertService.showErrorToast(erro);
      },
    });
  }

  openModal(venda: Venda): void {
    this.selectVenda = venda;

    this.modalRef = this.modalService.open(this.modalVendaTemplate, {
      data: { venda: this.selectVenda }
    });
  }

  closeModal(): void {
    this.modalRef.close();
    this.getVendasPorUsuario(this.usuarioId);
  }
}
