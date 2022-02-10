import Order from "../infra/typeorm/entities/Order";
import OrderRepository from "../infra/typeorm/repositories/OrderRepository";

export default class FindAllOrdersByClienteIdService {
  public async execute(id: number): Promise<Order[] | undefined> {
    const orderRepository = new OrderRepository();

    const orders = await orderRepository.listOrdersByClientId(id);

    return orders;
  }
}
