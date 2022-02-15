import { IsEmail, IsString, Matches } from 'class-validator'

export class CreateUserDTO {
  @IsEmail()
  email: string

  @IsString()
  // @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
  //   message: 'password is too weak'
  // })
  password: string
}
