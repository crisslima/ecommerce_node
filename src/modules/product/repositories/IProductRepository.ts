import { DeleteResult } from "typeorm";
import IProductDTO from "../dtos/IProductDTO";
import Product from "../infra/typeorm/entities/Product";

/**
 * Interface que define quais serão os métodos do repositório de Produtos
 * Todos os métodos que o repositório terá devem ser primeiramente definidos aqui
 */
export default interface IProductRepository {
  /**
   * data são os dados do Produto, deve ter do tipo IProductDTO
   * Promise<Product> é o tipo do retorno do método
   */
  create(data: IProductDTO): Promise<Product>;
  list(): Promise<Product[]>;
  findById(id: number): Promise<Product | undefined>;
  update(data: IProductDTO): Promise<Product>;
  delete(id: number): Promise<DeleteResult>;

  // fazer outros médodos aqui
}
