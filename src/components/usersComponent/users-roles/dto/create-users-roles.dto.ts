import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsUUID } from 'class-validator';

export class CreateUsersRolesDto {
  @ApiProperty({ example: 'ea856b84-54bb-4475-b868-730801065648' })
  @IsUUID('4', { message: 'The value must be a UUID v4' })
  readonly user_id: string;

  @ApiProperty({ example: 1 })
  @IsNumber({}, { message: 'The value must be a number' })
  role_id: number;
}
