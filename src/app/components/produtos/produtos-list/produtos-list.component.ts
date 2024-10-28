import { Component, ViewChild, TemplateRef, OnInit, NgModule, Input, inject, Output, EventEmitter, input, SimpleChanges } from '@angular/core';
import { Produto } from '../../../models/produto';
import { ProdutoService } from '../../../services/produto.service';
import Swal from 'sweetalert2';
import { Router, RouterLink } from '@angular/router';
import { MdbModalModule, MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { ProdutosFormComponent } from '../produtos-form/produtos-form.component';
import { ProdutoVenda } from '../../../models/produto-venda';

@Component({
  selector: 'app-produtos-list',
  standalone: true,
  imports:[MdbModalModule, ProdutosFormComponent],
  templateUrl: './produtos-list.component.html',
  styleUrls: ['./produtos-list.component.scss'],
})
export class ProdutosListComponent {

  @Input() nomePesquisa: string = '';
  @Input() modoAddProduct : boolean = false;
  @Output() retorno = new EventEmitter();

  lista: Produto[] = [];
  produtoEdit: Produto = new Produto(); // Inicialize o produto com valores padrão

  @ViewChild("modalProdutoDetalhe") modalProdutoDetalhe!: TemplateRef<any>;
  modalRef!: MdbModalRef<any>;

  produtoService = inject(ProdutoService);
  modalService = inject(MdbModalService);
  router = inject(Router);

  constructor() {
      this.findAllAtivos();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['nomePesquisa']) {
      if (this.nomePesquisa) {
        this.findByNome();
      } else {
        this.findAllAtivos();
      }
    }
  }

  findByNome() {
    console.log(this.nomePesquisa)
    this.produtoService.findByNome(this.nomePesquisa).subscribe({
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

  new() {
    this.produtoEdit = new Produto(); // Crie um novo produto
    this.modalRef = this.modalService.open(this.modalProdutoDetalhe);
  }

  edit(produto: Produto) {
    this.produtoEdit = Object.assign({}, produto); // Clonando para evitar referência de objeto
    this.modalRef = this.modalService.open(this.modalProdutoDetalhe);
  }

  retornoDetalhe(produto: Produto) {
    this.findAllAtivos();
    this.modalRef.close();
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


  retornarProduto(produto : Produto){
    this.retorno.emit(produto);
  }
}


