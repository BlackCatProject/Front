import { Component, ElementRef, inject, TemplateRef, ViewChild } from '@angular/core';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { Venda } from '../../../models/venda';
import { ProdutosListComponent } from '../../produtos/produtos-list/produtos-list.component';
import { MdbModalModule, MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { VendaService } from '../../../services/venda.service';
import { FormsModule } from '@angular/forms';
import { UsuarioListComponent } from '../../usuarios/usuario-list/usuario-list.component';
import { Usuario } from '../../../models/usuario';
import Swal from 'sweetalert2';
import { Produto } from '../../../models/produto';
import { ProdutoVenda } from '../../../models/produto-venda';

@Component({
  selector: 'app-venda',
  standalone: true,
  imports: [MdbFormsModule, ProdutosListComponent, MdbModalModule, FormsModule, UsuarioListComponent] ,
  templateUrl: './venda.component.html',
  styleUrl: './venda.component.scss'
})
export class VendaComponent{

  formaPagamento = "formaPagamento";

  vendaValida: boolean = false;

  modalService = inject(MdbModalService);
  @ViewChild("userList") userList!: TemplateRef<any>;
  modalRef!: MdbModalRef<any>;

  venda: Venda = new Venda();

  vendaService = inject(VendaService);

  nomeSearch: string = "";

  showResult: boolean = false;

  totalVendaText = "R$ 0,00"

  userName = "Nenhum usuário"

  constructor(){
    this.venda.produtosVenda = [];
    this.venda.desconto = 0;
  }


  onSearch(){
    this.showResult = this.nomeSearch.length > 0;    
  }
  
  adicionarProduto(){
    this.showResult = true;
  }

  save(){
    this.vendaService.save(this.venda).subscribe({
        next: msg =>{
          alert(msg)
        }, 
        error : erro =>{
          alert(erro.error)
        }
    })
  }

  closeList(){
    this.showResult = false;
    this.nomeSearch = "";
  }

  adicionarUser(){
    this.modalRef = this.modalService.open(this.userList);
  }

  addUser(user : Usuario){
    if(user){
      console.log(user)
      this.venda.usuario = user;
      this.userName = user.nome;
    }else{
      Swal.fire({icon: "error",
        text: "Usuário Nulo"
      })
    }
    this.verificarVenda();
    this.modalRef.close();
  }

  addProduct(produto : Produto){
    if(produto){
      let index = this.venda.produtosVenda.findIndex((x)=> {return x.produto.id = produto.id});
      if(index < 0){
        let prodVenda = new ProdutoVenda();
        prodVenda.produto = produto;
        prodVenda.quantidade = 1;
        this.venda.produtosVenda.push(prodVenda);
        this.calcularTotal();
      }else{
        Swal.fire({icon: "error",
          text: `O produto ${produto.nome} já está presente na venda`
        })
      }
    }else{
      Swal.fire({icon: "error",
        text: "Produto Nulo"
      })
    }
    this.showResult = false;
    this.verificarVenda();
  }

  removerProdVenda(prodVenda : ProdutoVenda){
    let index = this.venda.produtosVenda.findIndex((x)=> { return x.id == prodVenda.id});
    this.venda.produtosVenda.splice(index, 1);
    this.verificarVenda();
  }

  calcularTotal(){
    let total = 0;
    let prodsVenda = this.venda.produtosVenda;
    if(prodsVenda.length > 0){
      for(let i = 0; i < prodsVenda.length; i++){
        total += prodsVenda[i].produto.preco * prodsVenda[i].quantidade;
      }
      if(this.venda.desconto> 0){
        total -= total * (this.venda.desconto / 100);
      }
      this.totalVendaText = `R$ ${total.toFixed(2)}`
    }
    this.verificarVenda();
  }

  verificarVenda() {
    this.vendaValida = Boolean(
      this.venda.usuario != null &&
      this.venda.produtosVenda && this.venda.produtosVenda.length > 0 &&
      this.venda.formaPagamento && this.venda.formaPagamento !== "Forma de pagamento"
    );
    console.log(this.venda, this.vendaValida);
}

setFormaPagamento(){
  this.venda.formaPagamento = this.formaPagamento;
  this.verificarVenda();
}

addDesconto(){
  if(this.venda.desconto < 100){
    this.venda.desconto++;
    this.calcularTotal();
  }
}

subtrairDesconto(){
  if(this.venda.desconto > 0){
    this.venda.desconto--;
    this.calcularTotal();
  }
}

addQuantidade(prodVenda : ProdutoVenda){
    prodVenda.quantidade++;
    this.calcularTotal();
    this.verificarVenda();
}

subtrairQuantidade(prodVenda : ProdutoVenda){
  if(prodVenda.quantidade > 0){
    prodVenda.quantidade--;
    this.calcularTotal();
    this.verificarVenda();
  }
}

  
}
