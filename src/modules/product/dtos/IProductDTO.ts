/**
 * Interface que define a tipagem de um produto
 */
export default interface IProductDTO {
  id?: number; // id é opcional (no cadastro não precisa, mas na ediçao sim)
  nome: string;
  preco: number;
  quantidade_estoque: number;
  categoria_id: number;
}
