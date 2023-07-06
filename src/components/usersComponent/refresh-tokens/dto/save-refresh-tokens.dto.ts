import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUUID } from 'class-validator'

export class SaveRefreshTokensDto {
  @ApiProperty()
  @IsString({ message: 'The value must be a string' })
  readonly token: string;

  @ApiProperty()
  @IsUUID('4', { message: 'The value must be a UUID v4' })
  user_id: string;
}
