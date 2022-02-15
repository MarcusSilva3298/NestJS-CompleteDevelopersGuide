import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query
} from '@nestjs/common'
import { CreateUserDTO } from './dtos/create-user.dto'
import { UpdateUserDTO } from './dtos/update-user.dto'
import { UsersService } from './users.service'

@Controller('auth')
export class UsersController {
  constructor(private userServices: UsersService) {}

  @Post()
  createUser(@Body() data: CreateUserDTO) {
    return this.userServices.createUser(data)
  }

  @Get('/:id')
  findUser(@Param('id') id: string) {
    return this.userServices.findOne(id)
  }

  @Get()
  listUsers(@Query('email') email: string) {
    return this.userServices.find(email)
  }

  @Patch()
  updateUser(@Body() data: UpdateUserDTO) {
    return this.userServices.update(data)
  }

  @Delete('/:id')
  deleteUser(@Param('id') id: string) {
    return this.userServices.remove(id)
  }
}
