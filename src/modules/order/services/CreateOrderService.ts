import IOrderDTO from "../dtos/IOrderDTO";
import Order from "../infra/typeorm/entities/Order";
import OrderRepository from "../infra/typeorm/repositories/OrderRepository";
import AppError from "../../../shared/errors/AppErrors";
import FindProductByIdService from "../../../modules/product/services/FindProductByIdService";
import UpdateProductService from "../../product/services/UpdateProductService";

export default class CreateOrderService {
  public async execute(data: IOrderDTO): Promise<Order> {
    const orderRepository = new OrderRepository();
    const UpdateProduct = new UpdateProductService();

    let valorTotalPedido = 0;
    //RF17 - Um pedido não pode ser finalizado se algum dos produtos estiver sem o estoque necessário;
    const findProductByIdService = new FindProductByIdService();

    if (data.cliente_id === null) {
      throw new AppError("Cliente não informado.");
    }

    if (data.pedido_produtos.length < 1) {
      throw new AppError(
        "Informe ao menos um produto para cadastrar o pedido."
      );
    } else {
      for (let i = 0; i < data.pedido_produtos.length; i++) {
        if (data.pedido_produtos[i].quantidade < 1)
          throw new AppError("A quantidade do produto não pode ser zero.");

        let product = await findProductByIdService.execute(
          data.pedido_produtos[i].produto_id
        );

        if (product.quantidade_estoque < data.pedido_produtos[i].quantidade) {
          throw new AppError(
            "Quantidade em estoque insuficiente para o produto " + product.id
          );
        } else {
          product.quantidade_estoque -= data.pedido_produtos[i].quantidade;
          await UpdateProduct.execute(product);
        }

        valorTotalPedido += data.pedido_produtos[i].quantidade * product.preco;
      }
    }

    const dataComValor = {
      ...data,
      valor: valorTotalPedido,
    };

    const order = await orderRepository.create(dataComValor);

    return order;
  }
}
