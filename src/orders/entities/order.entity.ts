import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { OrderItem } from './order-item.entity'

export enum OrderStatus {
  PENDING = 'pending',
  PAID = 'paid',
  FAILED = 'failed',
}

export type CreateOrderCommand = {
  client_id: number
  items: {
    product_id: string
    quantity: number
    price: number
  }[]
}

@Entity()
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  total: number

  @Column()
  client_id: number

  @Column()
  status: OrderStatus = OrderStatus.PENDING

  @CreateDateColumn()
  created_at: Date

  @OneToMany(() => OrderItem, (item) => item.order)
  orderItems: OrderItem[]

  static create(createOrderCommand: CreateOrderCommand) {
    const order = new Order()

    order.client_id = createOrderCommand.client_id

    order.orderItems = createOrderCommand.items.map((item) => {
      const orderItem = new OrderItem()
      orderItem.product_id = item.product_id
      orderItem.quantity = item.quantity
      orderItem.price = item.price
      return orderItem
    })

    order.total = createOrderCommand.items
      .map((item) => item.price * item.quantity)
      .reduce((a, b) => a + b, 0)

    return order
  }
}
