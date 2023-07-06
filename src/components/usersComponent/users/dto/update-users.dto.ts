import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator'

export class UpdateUsersDto {
  @ApiProperty()
  @IsString({ message: 'The value must be a string' })
  readonly id: string;

  @ApiProperty()
  @IsString({ message: 'The value must be a string' })
  readonly banned_at: string;

  @ApiProperty()
  @IsString({ message: 'The value must be a string' })
  readonly banned_by: string;
}
