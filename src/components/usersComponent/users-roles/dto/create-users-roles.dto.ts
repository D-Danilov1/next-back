import { IsNumber, IsUUID } from 'class-validator';

export class CreateUsersRolesDto {
  @IsUUID('4', { message: 'The value must be a UUID v4' })
  readonly user_id: string

  @IsNumber({}, { message: 'The value must be a number' })
  role_id: number
}
