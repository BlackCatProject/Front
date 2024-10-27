import { Component, EventEmitter, Input, NgModule, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { ProdutoService } from '../../../services/produto.service';
import { Produto } from '../../../models/produto';
import { MdbFormControlComponent, MdbFormsModule } from 'mdb-angular-ui-kit/forms';

@Component({
  selector: 'app-produto-form',
  standalone: true,
  imports:[ReactiveFormsModule, MdbFormsModule, FormsModule],
  templateUrl: './produtos-form.component.html',
  styleUrls: ['./produtos-form.component.scss'],
})
export class ProdutosFormComponent {
  @Input() produto!: Produto;
  @Output() retorno = new EventEmitter<Produto>();

  produtoForm!: FormGroup;

  constructor(private fb: FormBuilder, private produtoService: ProdutoService) {
    this.createForm();
  }

  private createForm() {
    this.produtoForm = this.fb.group({
      id: [0],
      ativo: [true],
      nome: ['', [Validators.required, Validators.minLength(3)]],
      descricao: [''],
      preco: 0,
    });
  }

  ngOnChanges() {
    if (this.produto) {
      this.produtoForm.patchValue(this.produto);
    }
  }

  onSubmit() {
    if (this.produtoForm.valid) {
      if (this.produtoForm.value.id) {
        this.updateProduto();
      } else {
        this.saveProduto();
      }
    } else {
      Swal.fire({
        title: 'Erro!',
        text: 'Por favor, preencha todos os campos obrigatórios.',
        icon: 'error',
        confirmButtonText: 'Ok',
      });
    }
  }

  private saveProduto() {
    this.produtoService.saveProduto(this.produtoForm.value).subscribe({
      next: (mensagem) => {
        Swal.fire({
          title: 'Sucesso!',
          text: mensagem,
          icon: 'success',
          confirmButtonText: 'Ok',
        });
        this.retorno.emit(this.produtoForm.value);
        this.produtoForm.reset();
      },
      error: () => {
        Swal.fire({
          title: 'Erro!',
          text: 'Não foi possível salvar o produto.',
          icon: 'error',
          confirmButtonText: 'Ok',
        });
      },
    });
  }

  private updateProduto() {
    const id = this.produtoForm.value.id;
    this.produtoService.updateProduto(id, this.produtoForm.value).subscribe({
      next: (mensagem) => {
        Swal.fire({
          title: 'Sucesso!',
          text: mensagem,
          icon: 'success',
          confirmButtonText: 'Ok',
        });
        this.retorno.emit(this.produtoForm.value);
      },
      error: () => {
        Swal.fire({
          title: 'Erro!',
          text: 'Não foi possível atualizar o produto.',
          icon: 'error',
          confirmButtonText: 'Ok',
        });
      },
    });
  }
}
