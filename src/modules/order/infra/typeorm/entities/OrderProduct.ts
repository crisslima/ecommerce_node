import Product from "../../../../../modules/product/infra/typeorm/entities/Product";

import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from "typeorm";
import Order from "./Order";

@Entity("pedido_produto")
export default class OrderProduct {
  @PrimaryColumn()
  pedido_id: number;

  @PrimaryColumn()
  produto_id: number;

  @Column()
  quantidade: number;

  @ManyToOne(() => Order, (order) => order.pedido_produtos, {
    orphanedRowAction: "delete",
  })
  @JoinColumn({ name: "pedido_id" })
  pedido: Order;

  @CreateDateColumn({ select: false })
  created_at: Date;

  @UpdateDateColumn({ select: false })
  updated_at: Date;

  @ManyToOne(() => Product, (Product) => Product.pedido_produtos, {
    orphanedRowAction: "delete", //usada se precisar deletar algo e evitar problemas caso o registro da tabela que faz referencia for excluida
  })
  @JoinColumn({ name: "produto_id" })
  produto: Product;
}
