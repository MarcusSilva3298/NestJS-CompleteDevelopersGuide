import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Like, Repository } from 'typeorm'
import { CreateUserDTO } from './dtos/create-user.dto'
import { UpdateUserDTO } from './dtos/update-user.dto'
import { User } from './entities/user.entity'

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>
  ) {}

  createUser({ email, password }: CreateUserDTO) {
    const user = this.userRepository.create({ email, password })

    return this.userRepository.save(user)
  }

  findOne(id: string) {
    return this.userRepository.findOne(id)
  }

  find(email?: string) {
    if (email) {
      return this.userRepository.find({
        where: { email: Like(`%${email}%`) }
      })
    }

    return this.userRepository.find()
  }

  async update({ id, email, password }: UpdateUserDTO) {
    const user = await this.findOne(id)

    if (!user) {
      throw new NotFoundException()
    }

    return this.userRepository.save({ id, email, password })
  }

  async remove(id: string) {
    const user = await this.findOne(id)

    if (!user) {
      throw new NotFoundException()
    }

    return this.userRepository.remove(user)
  }
}
