import AppError from "../../../shared/errors/AppErrors";
import IProductDTO from "../dtos/IProductDTO";
import Product from "../infra/typeorm/entities/Product";
import ProductRepository from "../infra/typeorm/repositories/ProductRepository";

/**
 * O service terá toda a regra de negócio. Cada service é responsável por
 * uma única atividade.
 *
 * Por Exemplo: Esse service é o responsável por cadastrar um produto.
 * Todas as operações/regras/verificações que precisam ser feitas para que
 * o produto seja cadastrado devem ser feitas aqui
 *
 * Como um service só tem uma função ele deve ter apenas UM método público,
 * geralmente chamado de execute.
 */
export default class CreateProductService {
  public async execute(data: IProductDTO): Promise<Product> {
    const productRepository = new ProductRepository();

    if (data.id) {
      throw new AppError("O id do pedido não deve ser enviado no cadastro.");
    }
    
    const product = await productRepository.create(data);

    return product;
  }
}
