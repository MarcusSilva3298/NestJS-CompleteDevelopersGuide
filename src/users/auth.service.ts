import {
  BadRequestException,
  Injectable,
  UnauthorizedException
} from '@nestjs/common'
import { compare, hash } from 'bcryptjs'
import { CreateUserDTO } from './dtos/create-user.dto'
import { UsersService } from './users.service'

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async signup({ email, password }: CreateUserDTO) {
    const emailInUse = await this.usersService.find(email)

    if (emailInUse.length) {
      throw new BadRequestException('Email already in use')
    }

    const hashPassword = await hash(password, 6)

    return this.usersService.createUser({
      email,
      password: hashPassword
    })
  }

  async signin({ email, password }: CreateUserDTO) {
    const [userExists] = await this.usersService.find(email)

    if (!userExists) {
      throw new UnauthorizedException()
    }

    if (!(await compare(password, userExists.password))) {
      throw new UnauthorizedException()
    }

    return userExists
  }
}
