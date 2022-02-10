import { DeleteResult } from "typeorm";
import AppError from "../../../shared/errors/AppErrors";
import Order from "../infra/typeorm/entities/Order";
import OrderRepository from "../infra/typeorm/repositories/OrderRepository";
import FindOrderByIdService from "./FindOrderByIdService";

export default class DeleteOrderService {
  public async execute(id: number): Promise<DeleteResult> {
    const orderRepository = new OrderRepository();

    const findOrderByIDService = new FindOrderByIdService();

    await findOrderByIDService.execute(id);

    const result = await orderRepository.delete(id);

    return result;
  }
}
