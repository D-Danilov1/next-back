import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class GetPaymentUrlDto {
  @ApiProperty({ example: '10.00' })
  @IsString({ message: 'The value must be a string' })
  readonly amount: string;
}

export class CancelSubscriptionDto {
  @ApiProperty({ example: 'sub_1NOknXHb8NpiNcYOxGX6yf7c' })
  @IsString({ message: 'The value must be a string' })
  readonly subscriptionId: string;
}

export class VerifyResultUrlDto {
  @ApiProperty({ example: '10.00' })
  @IsString({ message: 'The value must be a string' })
  readonly OutSum: string;

  @ApiProperty({ example: '123456' })
  @IsString({ message: 'The value must be a string' })
  readonly InvId: string;

  @ApiProperty({ example: 'ABCD1234' })
  @IsString({ message: 'The value must be a string' })
  readonly SignatureValue: string;
}

export class VerifySuccessUrlDto {
  @ApiProperty({ example: '10.00' })
  @IsString({ message: 'The value must be a string' })
  readonly OutSum: string;

  @ApiProperty({ example: '123456' })
  @IsString({ message: 'The value must be a string' })
  readonly InvId: string;

  @ApiProperty({ example: 'ABCD1234' })
  @IsString({ message: 'The value must be a string' })
  readonly SignatureValue: string;
}
