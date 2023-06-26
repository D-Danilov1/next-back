import { IsString } from 'class-validator'

export class CreateLoggerDto {
  @IsString({ message: 'The value must be a string' })
  readonly user_id: string

  @IsString({ message: 'The value must be a string' })
  readonly method_name: string

  @IsString({ message: 'The value must be a string' })
  readonly model_name: string

  @IsString({ message: 'The value must be a string' })
  readonly props: string
}
