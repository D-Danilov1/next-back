import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNumber,
  IsPositive,
  IsString,
  Length,
  IsOptional,
} from 'class-validator';

export class CreateSubscriptionsDto {
  @ApiProperty({ example: 'test@mail.ru' })
  @IsString({ message: 'The value must be a string' })
  @IsEmail({}, { message: 'Incorrect Email' })
  @Length(2, 128, {
    message: 'The userEmail must be at least 6 and no more than 128 characters',
  })
  readonly userEmail: string;

  @ApiProperty({ example: 1 })
  @IsNumber({}, { message: 'The value must be a number' })
  @IsPositive({ message: 'The value must be a positive number' })
  readonly subscriptions_period_id: number;

  @ApiProperty({ example: '2000' })
  @IsString({ message: 'The value must be a string' })
  readonly payment_amount: string;

  @ApiProperty({ example: '2023-04-05T11:35:08.104Z' })
  @IsString({ message: 'The value must be a string' })
  readonly start_of: string;

  @ApiProperty({ example: '2024-04-05T11:35:08.104Z' })
  @IsString({ message: 'The value must be a string' })
  readonly end_of: string;

  @ApiProperty({ example: 'sub_1NQUulHb8NpiNcYOlLPblq' })
  @IsOptional()
  @IsString({ message: 'The value must be a string' })
  readonly subscription_id?: string;
}
