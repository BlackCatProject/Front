import { ProdutoVenda } from "./produto-venda";
import { Usuario } from "./usuario";

export class Venda{

    id!: number;
    total!: number;
    data!: Date;
    desconto!: number;
    formaPagamento!: string;

    usuario!: Usuario;

	produtosVenda!: ProdutoVenda[];
 
}