import { IsString, IsUUID } from 'class-validator'

export class SaveRefreshTokensDto {
  @IsString({ message: 'The value must be a string' })
  readonly token: string

  @IsUUID('4', { message: 'The value must be a UUID v4' })
  user_id: string
}
