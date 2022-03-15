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
import { Serialize } from '../interceptors/serialize.interceptor'
import { AuthService } from './auth.service'
import { CreateUserDTO } from './dtos/create-user.dto'
import { UpdateUserDTO } from './dtos/update-user.dto'
import { UserDTO } from './dtos/user.dto'
import { UsersService } from './users.service'

@Controller('auth')
@Serialize(UserDTO)
export class UsersController {
  constructor(
    private userServices: UsersService,
    private authService: AuthService
  ) {}

  @Post()
  createUser(@Body() data: CreateUserDTO) {
    return this.authService.signup(data)
  }

  @Post()
  singin(@Body() data: CreateUserDTO) {
    return this.authService.signin(data)
  }

  @Get('/:id')
  findUser(@Param('id') id: string) {
    return this.userServices.findOne(id)
  }

  @Get()
  async listUsers(@Query('email') email?: string) {
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
