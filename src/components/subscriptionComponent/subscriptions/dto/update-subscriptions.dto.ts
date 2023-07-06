import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsPositive, IsString, IsUUID } from 'class-validator'

export class UpdateSubscriptionsDto {
  @ApiProperty()
  @IsNumber({}, { message: 'The value must be a number' })
  readonly id: number;

  @ApiProperty()
  @IsUUID('4', { message: 'The value must be a UUID v4' })
  readonly user_id: string;

  @ApiProperty()
  @IsNumber({}, { message: 'The value must be a number' })
  @IsPositive({ message: 'The value must be a positive number' })
  readonly subscriptions_period_id: number;

  @ApiProperty()
  @IsString({ message: 'The value must be a string' })
  readonly payment_amount: string;

  @ApiProperty()
  @IsString({ message: 'The value must be a string' })
  readonly start_of: string;

  @ApiProperty()
  @IsString({ message: 'The value must be a string' })
  readonly end_of: string;
}
