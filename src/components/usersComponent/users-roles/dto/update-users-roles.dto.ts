import { IsString } from 'class-validator';

export class UpdateUsersRolesDto {
  @IsString({ message: 'The value must be a string' })
  readonly id: string
}
