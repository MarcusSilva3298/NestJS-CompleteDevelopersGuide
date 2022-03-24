import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Session,
  UseGuards
} from '@nestjs/common'
import { AuthGuard } from '../guards/auth.guard'
import { Serialize } from '../interceptors/serialize.interceptor'
import { AuthService } from './auth.service'
import { CurrentUser } from './decorators/current-user.decorator'
import { CreateUserDTO } from './dtos/create-user.dto'
import { UpdateUserDTO } from './dtos/update-user.dto'
import { UserDTO } from './dtos/user.dto'
import { User } from './entities/user.entity'
import { UsersService } from './users.service'

@Controller('auth')
@Serialize(UserDTO)
export class UsersController {
  constructor(
    private userServices: UsersService,
    private authService: AuthService
  ) {}

  @Get('/me')
  @UseGuards(AuthGuard)
  me(@CurrentUser() user: User) {
    return user
  }

  @Post('/singout')
  singOut(@Session() session: any) {
    session.user_id = null

    return 'Sing Out'
  }

  @Post('/singup')
  async createUser(@Body() data: CreateUserDTO, @Session() session: any) {
    const user = await this.authService.signup(data)

    session.user_id = user.id

    return user
  }

  @Post('/singin')
  async singin(@Body() data: CreateUserDTO, @Session() session: any) {
    const user = await this.authService.signin(data)

    session.user_id = user.id

    return user
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
