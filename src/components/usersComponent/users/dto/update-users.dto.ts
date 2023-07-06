import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator'

export class UpdateUsersDto {
  @ApiProperty({ example: 'ea856b84-54bb-4475-b868-730801065648' })
  @IsString({ message: 'The value must be a string' })
  readonly id: string;

  @ApiProperty({ example: null })
  @IsString({ message: 'The value must be a string' })
  readonly banned_at: string;

  @ApiProperty({ example: null })
  @IsString({ message: 'The value must be a string' })
  readonly banned_by: string;
}
