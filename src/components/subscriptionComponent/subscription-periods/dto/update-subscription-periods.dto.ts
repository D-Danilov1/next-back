import { IsNumber, IsPositive, IsString, Length } from 'class-validator'

export class UpdateSubscriptionPeriodsDto {
  @IsString({ message: 'The value must be a string' })
  @Length(2, 128, { message: 'The name must be at least 2 and no more than 128 characters' })
  readonly name: string

  @IsNumber({}, { message: 'The value must be a number' })
  @IsPositive({ message: 'The value must be a positive number' })
  readonly period: number
}
