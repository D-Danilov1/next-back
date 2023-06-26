import { IsEmail, IsNumber, IsPositive, IsString, Length } from 'class-validator'

export class CreateSubscriptionsDto {
  @IsString({ message: 'The value must be a string' })
  @IsEmail({}, { message: 'Incorrect Email' })
  @Length(6, 128, { message: 'The userEmail must be at least 6 and no more than 128 characters' })
  readonly userEmail: string

  @IsNumber({}, { message: 'The value must be a number' })
  @IsPositive({ message: 'The value must be a positive number' })
  readonly subscriptions_period_id: number

  @IsString({ message: 'The value must be a string' })
  readonly payment_amount: string

  @IsString({ message: 'The value must be a string' })
  readonly start_of: string

  @IsString({ message: 'The value must be a string' })
  readonly end_of: string
}
