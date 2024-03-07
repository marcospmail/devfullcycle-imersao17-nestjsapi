import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { In, Repository } from 'typeorm'

import { CreateOrderDto } from './dto/create-order.dto'
import { Order } from './entities/order.entity'
import { Product } from 'src/products/entities/product.entity'

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Product) private productRepository: Repository<Product>,
    @InjectRepository(Order) private orderRepository: Repository<Order>,
  ) {}

  async create(createOrderDto: CreateOrderDto) {
    const productIds = createOrderDto.items.map((item) => item.product_id)
    const uniqueProductIds = [...new Set(productIds)]
    const products = await this.productRepository.findBy({
      id: In(uniqueProductIds),
    })

    if (products.length !== uniqueProductIds.length) {
      throw new Error('Invalid product ids')
    }

    const order = Order.create({
      client_id: 1,
      items: createOrderDto.items.map((item) => {
        const product = products.find((p) => p.id === item.product_id)
        return {
          product_id: product.id,
          quantity: item.quantity,
          price: product.price,
        }
      }),
    })

    return this.orderRepository.save(order)
  }

  findAll() {
    return this.orderRepository.find()
  }

  findOne(id: string) {
    return this.orderRepository.findOne({ where: { id } })
  }
}
