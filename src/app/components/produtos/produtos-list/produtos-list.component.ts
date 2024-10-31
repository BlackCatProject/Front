import { Component, ViewChild, TemplateRef, OnInit, NgModule, Input, inject, Output, EventEmitter, input, SimpleChanges } from '@angular/core';
import { Produto } from '../../../models/produto';
import { ProdutoService } from '../../../services/produto.service';
import Swal from 'sweetalert2';
import { Router, RouterLink } from '@angular/router';
import { MdbModalModule, MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { ProdutosFormComponent } from '../produtos-form/produtos-form.component';
import { ProdutoVenda } from '../../../models/produto-venda';
import { AlertService } from '../../../services/alert.service';
import { M } from '@angular/cdk/keycodes';

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

  alertService = inject(AlertService);

  lista: Produto[] = [];
  produtoEdit: Produto = new Produto(); 
  ativo: boolean = true;
  @ViewChild("modalProdutoDetalhe") modalProdutoDetalhe!: TemplateRef<any>;
  modalRef!: MdbModalRef<any>;
  produtoService = inject(ProdutoService);
  modalService = inject(MdbModalService);
  router = inject(Router);
  constructor() {
      this.findAllAtivos();
      this.findAll();
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
      error: (erro) => {
        this.alertService.showToast(erro.error, "error");
      },
    });
  }
  findAll(ativo: boolean = true) {
    this.produtoService.findAll(ativo).subscribe({
      next: (lista) => {
        this.lista = lista;
      },
      error: (erro) => {
        this.alertService.showToast(erro.error, "error");
      },
    });
  }
  findAllAtivos() {
    this.produtoService.findAll(true).subscribe({
      next: (lista) => {
        this.lista = lista;
        this.ordenarProdutosPorId();
      },
      error: (erro) => {
        this.alertService.showToast(erro.error, "error");
      },
    });
  }
  ativarProduto(produto: Produto) {
    this.alertService.showConfirmDialog ("Atenção", `Tem certeza que deseja ativar o produto ${produto.nome}?`,"Sim", "warning").then((result) => {
      if (result.isConfirmed) {
        this.produtoService.enableProduto(produto.id).subscribe({
          next: (mensagem) => {
            this.alertService.showToast(mensagem, "success");
            this.findAll(false);
          },
          error: (erro) => {
            this.alertService.showToast(erro.error, "error");
          },
        });
      }
    });
  }
  ordenarProdutosPorId() {
    this.lista.sort((a, b) => b.id - a.id);
  }

  new() {
    this.produtoEdit = new Produto(); 
    this.modalRef = this.modalService.open(this.modalProdutoDetalhe);
  }
  edit(produto: Produto) {
    this.produtoEdit = Object.assign({}, produto); 
    this.modalRef = this.modalService.open(this.modalProdutoDetalhe);
  }
  retornoDetalhe(produto: Produto) {
    this.findAllAtivos();
    this.modalRef.close();
  }
  desativarProduto(produto: Produto) {
    this.alertService.showConfirmDialog("Atenção!", `Tem certeza que deseja desativar o produto ${produto.nome}?`, "Sim", "warning").then((result) => {
      if (result.isConfirmed) {
        this.produtoService.disableProduto(produto.id).subscribe({
          next: (mensagem) => {
            this.alertService.showToast(mensagem, "success");
            this.findAllAtivos();
          },
          error: (erro) => {
            this.alertService.showToast(erro.error, "error");
          },
        });
      }
    });
  }
  retornarProduto(produto : Produto){
    this.retorno.emit(produto);
  }
}


