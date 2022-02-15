import { IsEmail, IsOptional, IsString } from 'class-validator'

export class UpdateUserDTO {
  @IsString()
  id: string

  @IsEmail()
  @IsOptional()
  email?: string

  @IsString()
  @IsOptional()
  // @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
  //   message: 'password is too weak'
  // })
  password?: string
}
