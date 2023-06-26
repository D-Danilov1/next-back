import { CacheModule, Module } from '@nestjs/common'
import { SubscriptionPeriodsService } from './subscription-periods.service'
import { SubscriptionPeriodsController } from './subscription-periods.controller'
import { SequelizeModule } from '@nestjs/sequelize'
import { SubscriptionPeriods } from './models/subscription-periods.model'
import { LoggerModule } from '../../loggerComponent/logger/logger.module'
import { ConfigModule } from '@nestjs/config'

@Module({
  providers: [SubscriptionPeriodsService],
  controllers: [SubscriptionPeriodsController],
  imports: [
    SequelizeModule.forFeature([SubscriptionPeriods]),
    LoggerModule,
    ConfigModule,
    CacheModule.register(),
  ],
  exports: [SequelizeModule, SubscriptionPeriodsService],
})
export class SubscriptionPeriodsModule {}
