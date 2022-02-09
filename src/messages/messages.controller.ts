import { Body, Controller, Get, Param, Post } from '@nestjs/common'
import { CreateMessageDTO } from './dtos/create-message.dto'

@Controller('messages')
export class MessagesController {
  @Get()
  listMessages() {}

  @Post()
  createMessage(@Body() body: CreateMessageDTO) {}

  @Get('/:id')
  getMessage(@Param() param: any) {}
}
