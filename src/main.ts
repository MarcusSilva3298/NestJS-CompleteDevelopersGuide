import { Logger, ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'

const port = 3000
const logger = new Logger()

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true
    })
  )
  await app.listen(3000, () => {
    logger.verbose(`Server listenning at port ${port}! 🚀`)
  })
}
bootstrap()
