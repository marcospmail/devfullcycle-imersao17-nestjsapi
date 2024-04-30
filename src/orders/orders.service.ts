import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { In, Repository } from 'typeorm'

import { CreateOrderDto } from './dto/create-order.dto'
import { Order } from './entities/order.entity'
import { Product } from 'src/products/entities/product.entity'
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq'

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Product) private productRepository: Repository<Product>,
    @InjectRepository(Order) private orderRepository: Repository<Order>,
    private amqpConnection: AmqpConnection,
  ) {}

  async create(createOrderDto: CreateOrderDto & { client_id: number }) {
    const { client_id } = createOrderDto

    const productIds = createOrderDto.items.map((item) => item.product_id)
    const uniqueProductIds = [...new Set(productIds)]
    const products = await this.productRepository.findBy({
      id: In(uniqueProductIds),
    })

    if (products.length !== uniqueProductIds.length) {
      throw new Error('Invalid product ids')
    }

    const order = Order.create({
      client_id,
      items: createOrderDto.items.map((item) => {
        const product = products.find((p) => p.id === item.product_id)
        return {
          product_id: product.id,
          quantity: item.quantity,
          price: product.price,
        }
      }),
    })

    await this.orderRepository.save(order)

    await this.amqpConnection.publish('amq.direct', 'OrderCreated', {
      id: order.id,
      card_hash: createOrderDto.card_hash,
      total: order.total,
    })

    return order
  }

  findAll(client_id: number) {
    return this.orderRepository.find({
      where: {
        client_id,
      },
      order: {
        created_at: 'DESC',
      },
    })
  }

  findOne(id: string, client_id: number) {
    return this.orderRepository.findOneOrFail({
      where: {
        id,
        client_id,
      },
    })
  }
}
