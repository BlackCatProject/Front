import { Component, inject } from '@angular/core';
import { VendaService } from '../../../services/venda.service';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { CommonModule } from '@angular/common'; // Import CommonModule
import { Venda } from '../../../models/venda';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  vendasPorMes: number | null = null;
  vendasPorUsuario: Venda[] = [];
  historicoVendas: Venda[] = [];
  vendasAnuais: number | null = null;
  vendasSemanais: number | null = null;
  valorMedioVendas: number | null = null;
  
  mes: number = new Date().getMonth() + 1;
  ano: number = new Date().getFullYear();
  usuarioId: number = 0;

  vendaService = inject(VendaService);

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
        Swal.fire('Erro', 'Não foi possível buscar histórico de vendas', 'error');
      },
    });
  }

  getVendasMensais(): void {
    this.vendaService.getVendasMensais(this.ano, this.mes).subscribe({
      next: (total) => (this.vendasPorMes = total),
      error: (erro) => {
        console.error('Erro ao buscar vendas mensais', erro);
        Swal.fire('Erro', 'Não foi possível buscar vendas mensais', 'error');
      },
    });
  }

  getVendasSemanais(): void {
    this.vendaService.getVendasSemanais().subscribe({
      next: (total) => (this.vendasSemanais = total),
      error: (erro) => {
        console.error('Erro ao buscar vendas semanais', erro);
        Swal.fire('Erro', 'Não foi possível buscar vendas semanais', 'error');
      },
    });
  }

  getVendasAnuais(): void {
    this.vendaService.getVendasAnuais(this.ano).subscribe({
      next: (total) => (this.vendasAnuais = total),
      error: (erro) => {
        console.error('Erro ao buscar vendas anuais', erro);
        Swal.fire('Erro', 'Não foi possível buscar vendas anuais', 'error');
      },
    });
  }

openModal(venda:Venda){
  
}

}
