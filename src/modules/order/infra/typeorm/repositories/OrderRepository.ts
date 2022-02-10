import IOrderDTO from "modules/order/dtos/IOrderDTO";
import IOrderRepository from "modules/order/repositories/IOrderRepository";
import { DeleteResult, getRepository, Repository } from "typeorm";
import Order from "../entities/Order";

export default class OrderRepository implements IOrderRepository {
  private ormRepository: Repository<Order>;

  constructor() {
    this.ormRepository = getRepository(Order);
  }

  async delete(id: number): Promise<DeleteResult> {
    return this.ormRepository.delete(id);
  }

  async update(data: IOrderDTO): Promise<Order> {
    const order = await this.ormRepository.save(data);
    return order;
  }

  async findById(id: number): Promise<Order | undefined> {
    /*const order = await this.ormRepository.findOne(id);
    return order;*/

    return this.ormRepository
      .createQueryBuilder("order")
      .leftJoinAndSelect("order.pedido_produtos", "pp")
      .leftJoinAndSelect("pp.produto", "p")
      .where("order.id = :id", { id })
      .getOne();
  }

  async listOrdersByClientId(id: number): Promise<Order[] | undefined> {
    return (
      this.ormRepository
        .createQueryBuilder("order")
        // .leftJoinAndSelect("order.cliente", "c") // com esta linha dentro do json retorna os dados do cliente também
        .where("order.cliente_id = :id", { id })
        .getMany()
    );
  }

  async list(): Promise<Order[]> {
    /*const orders = await this.ormRepository.find();

    return orders;*/
    return this.ormRepository
      .createQueryBuilder("order")
      .leftJoinAndSelect("order.pedido_produtos", "pp")
      .leftJoinAndSelect("pp.produto", "p")
      .getMany();
  }

  async create(data: IOrderDTO): Promise<Order> {
    const order = this.ormRepository.create(data);

    return this.ormRepository.save(order);
  }
}
