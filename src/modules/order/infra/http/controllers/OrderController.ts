import { Request, Response } from "express";
import FindAllOrdersByClientIdService from "../../../services/FindAllOrdersByClienteIdService";
import FindAllOrdersService from "../../../services/FindAllOrdersService";
import CreateOrderService from "../../../services/CreateOrderService";
import FindOrderByIdService from "../../../services/FindOrderByIdService";
import UpdateOrderService from "../../../services/UpdateOrderService";
import DeleteOrderService from "../../../services/DeleteOrderService";

/**
 * O controller tem acesso as requisições e é o responsável por enviar uma
 * resposta
 *
 * Por padrão ele deve ter no máximo 5 métodos (index, create, show, update e delete)
 */
class OrderController {
  async create(request: Request, response: Response): Promise<Response> {
    const data = request.body;

    const createOrderService = new CreateOrderService();

    const order = await createOrderService.execute(data);

    return response.json(order);
  }

  async list(request: Request, response: Response): Promise<Response> {
    const listAllOrdersService = new FindAllOrdersService();

    const orders = await listAllOrdersService.execute();

    return response.json(orders);
  }

  async listOrdersByClientId(
    request: Request,
    response: Response
  ): Promise<Response> {
    const { id } = request.params;
    const listAllOrdersByClientIdService = new FindAllOrdersByClientIdService();

    const orders = await listAllOrdersByClientIdService.execute(Number(id));

    return response.json(orders);
  }

  async findById(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const findOrderById = new FindOrderByIdService();

    const order = await findOrderById.execute(Number(id));

    return response.json(order);
  }

  async update(request: Request, response: Response): Promise<Response> {
    const data = request.body;
    const { id } = request.params; // desestruturação

    const updateOrderService = new UpdateOrderService();

    const data_to_update = {
      ...data, // rest / spread operator
      id: Number(id),
    };

    const order = await updateOrderService.execute(data_to_update);

    return response.json(order);
  }
  async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteOrderService = new DeleteOrderService();

    const result = await deleteOrderService.execute(Number(id));

    return response.json(result);
  }
}

export default new OrderController();
