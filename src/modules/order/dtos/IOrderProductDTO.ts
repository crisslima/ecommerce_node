export default interface IOrderProductDTO {
  pedido_id?: number; //O pedido ainda não tem id, não é possível passar no momento do cadastro. O typeORM vai cadastrar o id do pedido automaticamente
  produto_id: number;
  quantidade: number;
}
