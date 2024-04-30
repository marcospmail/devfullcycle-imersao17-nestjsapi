import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common'
import { AuthGuard } from '../auth/auth.guard'
import { CreateOrderDto } from './dto/create-order.dto'
import { OrdersService } from './orders.service'

@UseGuards(AuthGuard)
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  create(@Body() createOrderDto: CreateOrderDto, @Req() request) {
    const client_id = request.user.sub

    return this.ordersService.create({ ...createOrderDto, client_id })
  }

  @Get()
  findAll(@Req() request) {
    const client_id = request['user'].sub
    return this.ordersService.findAll(client_id)
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Req() request) {
    const client_id = request['user'].sub
    return this.ordersService.findOne(id, client_id)
  }
}
