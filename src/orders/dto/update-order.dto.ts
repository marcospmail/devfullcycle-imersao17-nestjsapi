import { PartialType } from '@nestjs/mapped-types'
import { CreateOrderDto } from './create-order.dto'

// TODO can likely remove
export class UpdateOrderDto extends PartialType(CreateOrderDto) {}
