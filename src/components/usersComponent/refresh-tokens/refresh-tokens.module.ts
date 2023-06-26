import { Module } from '@nestjs/common'
import { RefreshTokensService } from './refresh-tokens.service'
import { SequelizeModule } from '@nestjs/sequelize'
import { RefreshTokens } from './models/refresh-tokens.model'

@Module({
  providers: [RefreshTokensService],
  imports: [SequelizeModule.forFeature([RefreshTokens])],
  exports: [SequelizeModule, RefreshTokensService],
})
export class RefreshTokensModule {}
