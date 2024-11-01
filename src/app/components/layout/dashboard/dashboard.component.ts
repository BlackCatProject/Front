import { Component, inject, TemplateRef, ViewChild } from '@angular/core';
import { VendaService } from '../../../services/venda.service';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { CommonModule } from '@angular/common'; // Import CommonModule
import { Venda } from '../../../models/venda';
import Swal from 'sweetalert2';
import { Router, RouterLink } from '@angular/router';
import {
  MdbModalModule,
  MdbModalRef,
  MdbModalService,
} from 'mdb-angular-ui-kit/modal';
import { VendaComponent } from '../../vendas/venda/venda.component';
import { AlertService } from '../../../services/alert.service'; // Import AlertService

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [FormsModule, CommonModule, MdbModalModule, VendaComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

  modalService = inject(MdbModalService);
  @ViewChild('modalVenda') modalvendatemplate!: TemplateRef<any>;
  modalRef!: MdbModalRef<any>;


  alertService = inject(AlertService)
  vendaService = inject(VendaService);
  router = inject(Router);

  vendasPorMes: number | null = null;
  vendasPorUsuario: Venda[] = [];
  historicoVendas: Venda[] = [];
  vendasAnuais: number | null = null;
  vendasSemanais: number | null = null;
  valorMedioVendas: number | null = null;
  selectVenda: Venda | null = null;
  mes: number = new Date().getMonth() + 1;
  anoMensal: number = new Date().getFullYear();
  anoAnual: number= new Date().getFullYear();
  usuarioId: number = 0;


  constructor() {}

  ngOnInit(): void {
    this.getHistoricoVendas(); 
    this.getVendasMensais(); 
    this.getVendasSemanais();
    this.getVendasAnuais();
  }

  getHistoricoVendas(): void {
    this.vendaService.findAll().subscribe({
      next: (vendas) => (this.historicoVendas = vendas),
      error: (erro) => {
        console.error('Erro ao buscar histórico de vendas', erro);
        this.alertService.showAlert('Não foi possível buscar histórico de vendas', 'error');
      },
    });
  }

  getVendasMensais(): void {
    this.vendaService.getVendasMensais(this.anoMensal, this.mes).subscribe({
      next: (total) => (this.vendasPorMes = total),
      error: (erro) => {
        console.error('Erro ao buscar vendas mensais', erro);
        this.alertService.showAlert('Não foi possível buscar vendas mensais', 'error');
      },
    });
  }

  getVendasSemanais(): void {
    this.vendaService.getVendasSemanais().subscribe({
      next: (total) => (this.vendasSemanais = total),
      error: (erro) => {
        console.error('Erro ao buscar vendas semanais', erro);
        this.alertService.showAlert('Não foi possível buscar vendas semanais', 'error');
      },
    });
  }

  getVendasAnuais(): void {
    this.vendaService.getVendasAnuais(this.anoAnual).subscribe({
      next: (total) => (this.vendasAnuais = total),
      error: (erro) => {
        console.error('Erro ao buscar vendas anuais', erro);
        this.alertService.showAlert('Não foi possível buscar vendas anuais', 'error');
      },
    });
  }

  openModal(venda: Venda): void {
    this.selectVenda = Object.assign({}, venda); 

    if (this.modalvendatemplate) {
      this.modalRef = this.modalService.open(this.modalvendatemplate);
    } else {
      console.error('Modal não encontrado!');
      this.alertService.showAlert('Erro ao abrir o modal', 'error');
    }
  }

  closeModal(): void {
    this.modalRef.close();
    this.getHistoricoVendas();
  }

}
