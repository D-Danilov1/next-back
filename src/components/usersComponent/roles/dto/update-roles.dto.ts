import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, Length } from 'class-validator'

export class UpdateRolesDto {
  @ApiProperty()
  @IsNumber({}, { message: 'The value must be a number' })
  readonly id: number;

  @ApiProperty()
  @IsString({ message: 'The value must be a string' })
  @Length(2, 128, {
    message: 'The name must be at least 2 and no more than 128 characters',
  })
  readonly name: string;
}
