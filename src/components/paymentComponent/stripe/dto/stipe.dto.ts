import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNumber, IsString, Length } from 'class-validator';

export class CreateSubscriptionDto {
  @ApiProperty({ example: 'cus_1NOknXHb8NpiNcYOxGX6yf7c' })
  @IsString({ message: 'The value must be a string' })
  @Length(2, 128, {
    message:
      'The customerId must be at least 6 and no more than 128 characters',
  })
  readonly customerId: string;

  @ApiProperty({ example: 'price_1NOknXHb8NpiNcYOxGX6yf7c' })
  @IsString({ message: 'The value must be a string' })
  @Length(2, 128, {
    message: 'The priceId must be at least 6 and no more than 128 characters',
  })
  readonly priceId: string;
}

export class CreateCustomerDto {
  @ApiProperty({ example: 'test@mail.ru' })
  @IsString({ message: 'The value must be a string' })
  @Length(2, 128, {
    message: 'The email must be at least 6 and no more than 128 characters',
  })
  readonly email: string;

  @ApiProperty({ example: 'Ivan' })
  @IsString({ message: 'The value must be a string' })
  @Length(2, 128, {
    message: 'The name must be at least 6 and no more than 128 characters',
  })
  readonly name: string;
}

export class CreateProductDto {
  @ApiProperty({ example: 'NEXT' })
  @IsString({ message: 'The value must be a string' })
  @Length(2, 128, {
    message: 'The name must be at least 6 and no more than 128 characters',
  })
  readonly name: string;
}

export class CreatePriceDto {
  @ApiProperty({ example: 200 })
  @IsNumber({}, { message: 'The value must be a number' })
  readonly unit_amount: number;

  @ApiProperty({ example: 'usd' })
  @IsString({ message: 'The value must be a string' })
  @Length(2, 128, {
    message: 'The currency must be at least 6 and no more than 128 characters',
  })
  readonly currency: string;

  @ApiProperty({ example: 3 })
  @IsNumber({}, { message: 'The value must be a number' })
  readonly interval: number;

  @ApiProperty({ example: 'prod_1NOknXHb8NpiNcYOxGX6yf7c' })
  @IsString({ message: 'The value must be a string' })
  @Length(2, 128, {
    message: 'The productId must be at least 6 and no more than 128 characters',
  })
  readonly productId: string;
}

export class CancelSubscriptionDto {
  @ApiProperty({ example: 'test@mail.ru' })
  @IsEmail()
  @IsString({ message: 'The value must be a string' })
  @Length(2, 128, {
    message: 'The email must be at least 6 and no more than 128 characters',
  })
  readonly email: string;
}
