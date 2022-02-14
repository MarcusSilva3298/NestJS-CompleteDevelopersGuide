import { Logger } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { ComputerModule } from './computer/computer.module'

const port = 3000
const logger = new Logger()

async function bootstrap() {
  const app = await NestFactory.create(ComputerModule)
  await app.listen(3000, () => {
    logger.verbose(`Server listenning at port ${port}! 🚀`)
  })
}
bootstrap()
