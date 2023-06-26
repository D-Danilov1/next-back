import { IsString } from 'class-validator'

export class UpdateUsersDto {
  @IsString({ message: 'The value must be a string' })
  readonly id: string

  @IsString({ message: 'The value must be a string' })
  readonly banned_at: string

  @IsString({ message: 'The value must be a string' })
  readonly banned_by: string
}
