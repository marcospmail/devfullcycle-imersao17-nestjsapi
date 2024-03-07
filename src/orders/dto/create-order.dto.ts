import { Type } from 'class-transformer'
import {
  ArrayNotEmpty,
  IsInt,
  IsNotEmpty,
  IsPositive,
  IsString,
  IsUUID,
  MaxLength,
  ValidateNested,
  isUUID,
} from 'class-validator'

export class CreateOrderDto {
  @Type(() => OrderItemDto)
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  items: OrderItemDto[]

  @MaxLength(255)
  @IsString()
  @IsNotEmpty()
  card_hash: string
}

export class OrderItemDto {
  @IsInt()
  @IsPositive()
  @IsNotEmpty()
  quantity: number

  @IsUUID(4)
  @IsNotEmpty()
  product_id: string
}
