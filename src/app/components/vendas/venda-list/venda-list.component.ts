import { Component, inject, TemplateRef, ViewChild } from '@angular/core';
import { VendaService } from '../../../services/venda.service';
import { FormsModule } from '@angular/forms'; 
import { CommonModule } from '@angular/common'; 
import { Venda } from '../../../models/venda';
import Swal from 'sweetalert2';
import {
  MdbModalModule,
  MdbModalRef,
  MdbModalService,
} from 'mdb-angular-ui-kit/modal';
import { VendaComponent } from '../venda/venda.component';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-venda-list',
  standalone: true,
  imports: [FormsModule, CommonModule, MdbModalModule, VendaComponent],
  templateUrl: './venda-list.component.html',
  styleUrl: './venda-list.component.scss',
})
export class VendaListComponent {
  modalService = inject(MdbModalService);
  @ViewChild('modalVenda') modalvendatemplate!: TemplateRef<any>;
  modalRef!: MdbModalRef<any>;

  historicoVendas: Venda[] = [];
  lista: Venda[] = [];
  selectVenda: Venda | null = null;

  vendaService = inject(VendaService);
  router = inject(Router);

  constructor() {}

  ngOnInit(): void {
    this.getHistoricoVendas();
  }

  getHistoricoVendas(): void {
    this.vendaService.findAll().subscribe({
      next: (vendas) => (this.historicoVendas = vendas),
      error: (erro) => {
        console.error('Erro ao buscar histórico de vendas', erro);
        Swal.fire(
          'Erro',
          'Não foi possível buscar histórico de vendas',
          'error'
        );
      },
    });
  }

  findById(id: number) {
    this.vendaService.findById(id).subscribe({
      next: (vendas) => {
        this.lista = [vendas];
      },
      error: (error) => {
        Swal.fire({
          title: 'Erro ao buscar usuário',
          icon: 'error',
          confirmButtonText: 'Ok',
        });
      },
    });
  }

  openModal(venda: Venda): void {
    this.selectVenda = Object.assign({}, venda); // Seleciona a venda

    if (this.modalvendatemplate) {
      this.modalRef = this.modalService.open(this.modalvendatemplate);
    } else {
      console.error('Template de modal não encontrado!');
    }
  }

  closeModal(): void {
    this.modalRef.close();
    this.getHistoricoVendas();
  }
}
