import { IsEmail, IsString, Length } from 'class-validator';

export class CreateUsersDto {
  @IsString({ message: 'The value must be a string' })
  @IsEmail({}, { message: 'Incorrect Email' })
  @Length(6, 128, {
    message: 'The email must be at least 6 and no more than 128 characters',
  })
  readonly email: string;

  @IsString({ message: 'The value must be a string' })
  @Length(6, 128, {
    message: 'The email must be at least 6 and no more than 128 characters',
  })
  readonly phone_number: string;
}
