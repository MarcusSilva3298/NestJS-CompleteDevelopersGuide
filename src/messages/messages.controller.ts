import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post
} from '@nestjs/common'
import { CreateMessageDTO } from './dtos/create-message.dto'
import { MessagesService } from './messages.service'

@Controller('messages')
export class MessagesController {
  constructor(private messagesService: MessagesService) {}

  @Get()
  listMessages() {
    return this.messagesService.findAll()
  }

  @Post()
  createMessage(@Body() { content }: CreateMessageDTO) {
    return this.messagesService.create(content)
  }

  @Get('/:id')
  async getMessage(@Param('id') id: string) {
    const message = await this.messagesService.findOne(id)

    if (!message) {
      throw new NotFoundException('Message not found')
    }

    return message
  }
}
