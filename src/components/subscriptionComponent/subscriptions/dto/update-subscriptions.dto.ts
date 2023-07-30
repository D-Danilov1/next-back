import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Length } from 'class-validator';

export class UpdateSubscriptionsDto {
  @ApiProperty({ example: 'test@mail.ru' })
  @IsString({ message: 'The value must be a string' })
  @IsEmail({}, { message: 'Incorrect Email' })
  @Length(2, 128, {
    message: 'The userEmail must be at least 6 and no more than 128 characters',
  })
  readonly userEmail: string;

  @ApiProperty()
  @IsString({ message: 'The value must be a string' })
  readonly end_of: string;
}
