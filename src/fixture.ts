import { DataSource } from 'typeorm'
import { AppModule } from './app.module'
import { getDataSourceToken } from '@nestjs/typeorm'

import { NestFactory } from '@nestjs/core'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  await app.init()

  const dataSource = app.get<DataSource>(getDataSourceToken())
  await dataSource.synchronize(true)

  const productRepository = dataSource.getRepository('Product')
  productRepository.insert([
    {
      name: 'Product 1',
      description: 'Product 1 description',
      image_url: 'https://example.com/DsXgW.png',
      price: 268.34,
    },
    {
      name: 'Product 2',
      description: 'Product 2 description',
      image_url: 'https://example.com/ReYhk.png',
      price: 173.75,
    },
    {
      name: 'Product 3',
      description: 'Product 3 description',
      image_url: 'https://example.com/ZmfIb.png',
      price: 237.47,
    },
    {
      name: 'Product 4',
      description: 'Product 4 description',
      image_url: 'https://example.com/VLqKp.png',
      price: 694.16,
    },
    {
      name: 'Product 5',
      description: 'Product 5 description',
      image_url: 'https://example.com/AcvYd.png',
      price: 473.65,
    },
    {
      name: 'Product 6',
      description: 'Product 6 description',
      image_url: 'https://example.com/gTpLk.png',
      price: 981.09,
    },
    {
      name: 'Product 7',
      description: 'Product 7 description',
      image_url: 'https://example.com/fCmBi.png',
      price: 720.81,
    },
    {
      name: 'Product 8',
      description: 'Product 8 description',
      image_url: 'https://example.com/qZsJg.png',
      price: 405.23,
    },
    {
      name: 'Product 9',
      description: 'Product 9 description',
      image_url: 'https://example.com/oUkXp.png',
      price: 927.64,
    },
    {
      name: 'Product 10',
      description: 'Product 10 description',
      image_url: 'https://example.com/wJzRd.png',
      price: 109.27,
    },
  ])

  app.close()
}

bootstrap()
