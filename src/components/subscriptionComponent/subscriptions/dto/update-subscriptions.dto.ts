import { IsNumber, IsPositive, IsString, IsUUID } from 'class-validator'

export class UpdateSubscriptionsDto {
  @IsNumber({}, { message: 'The value must be a number' })
  readonly id: number

  @IsUUID('4', { message: 'The value must be a UUID v4' })
  readonly user_id: string

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
