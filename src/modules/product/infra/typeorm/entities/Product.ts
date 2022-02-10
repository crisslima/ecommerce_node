import Category from "../../../../category/infra/typeorm/entities/Category";
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

import OrderProduct from "../../../../order/infra/typeorm/entities/OrderProduct";

@Entity("produtos")
export default class Product {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column()
  nome: string;

  @Column()
  preco: number;

  @Column({
    default: 0,
  })
  quantidade_estoque: number;

  @Column()
  categoria_id: number;

  @CreateDateColumn({ select: false })
  created_at: Date;

  @UpdateDateColumn({ select: false })
  updated_at: Date;

  /**
   * Muitos produtos podem ter a mesma categoria
   */
  @ManyToOne(() => Category, (category) => category.produtos)
  @JoinColumn({ name: "categoria_id" })
  categoria: Category; //Category é o relacionamento

  @OneToMany(() => OrderProduct, (order_product) => order_product.produto)
  pedido_produtos: OrderProduct[];
}
