import { Module } from '@nestjs/common'
import { SequelizeModule } from '@nestjs/sequelize'
import { LoggerService } from './logger.service'
import { Logger } from './models/logger.model'

@Module({
  providers: [LoggerService],
  imports: [SequelizeModule.forFeature([Logger])],
  exports: [SequelizeModule, LoggerService],
})
export class LoggerModule {}
