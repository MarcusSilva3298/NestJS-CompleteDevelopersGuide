import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor
} from '@nestjs/common'
import { Observable } from 'rxjs'
import { UsersService } from '../users.service'

@Injectable()
export class CurrentUserInterceptor implements NestInterceptor {
  constructor(private userService: UsersService) {}

  async intercept(
    context: ExecutionContext,
    next: CallHandler<any>
  ): Promise<Observable<any>> {
    const request = context.switchToHttp().getRequest()

    const { user_id } = request.session || undefined

    if (user_id) {
      const user = await this.userService.findOne(user_id)

      request.currentUser = user
    }

    return next.handle()
  }
}
