import { Logger, ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { MessagesModule } from './messages/messages.module'

const logger = new Logger()
const port = 3000

async function bootstrap() {
  const app = await NestFactory.create(MessagesModule)

  app.useGlobalPipes(new ValidationPipe())

  await app.listen(port, () => {
    logger.verbose(`Server listenning at port ${port}! 🚀`)
  })
}
bootstrap()
