import { Component, inject, OnInit } from '@angular/core';
import { Produto } from '../../../models/produto';
import { ProdutoService } from '../../../services/produto.service';
import Swal from 'sweetalert2';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-produtos-list',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './produtos-list.component.html',
  styleUrls: ['./produtos-list.component.scss'],
})
export class ProdutosListComponent implements OnInit {
  lista: Produto[] = [];

  produtoService = inject(ProdutoService);
  router = inject(Router);

  constructor() {}

  ngOnInit(): void {
    this.findAllAtivos();
  }

  findAllAtivos() {
    this.produtoService.findAll(true).subscribe({
      next: (lista) => {
        this.lista = lista;
        this.ordenarProdutosPorId();
      },
      error: () => {
        Swal.fire({
          title: 'Erro ao buscar produtos',
          icon: 'error',
          confirmButtonText: 'Ok',
        });
      },
    });
  }

  ordenarProdutosPorId() {
    this.lista.sort((a, b) => b.id - a.id);
  }

  novoProduto() {
    this.router.navigate(['/admin/produto/new']);
  }

  desativarProduto(produto: Produto) {
    Swal.fire({
      title: 'Atenção',
      text: `Tem certeza que deseja desativar o produto ${produto.nome}?`,
      icon: 'warning',
      showConfirmButton: true,
      showDenyButton: true,
      confirmButtonText: 'Sim',
      cancelButtonText: 'Não',
    }).then((result) => {
      if (result.isConfirmed) {
        this.produtoService.disableProduto(produto.id).subscribe({
          next: (mensagem) => {
            Swal.fire({
              title: mensagem,
              icon: 'success',
              confirmButtonText: 'Ok',
            });
            this.findAllAtivos();
          },
          error: () => {
            Swal.fire({
              title: 'Erro ao desativar produto',
              icon: 'error',
              confirmButtonText: 'Ok',
            });
          },
        });
      }
    });
  }
}
