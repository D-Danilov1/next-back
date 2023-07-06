import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class UpdateUsersRolesDto {
  @ApiProperty()
  @IsString({ message: 'The value must be a string' })
  readonly id: string;
}
