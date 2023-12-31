import { Module } from '@nestjs/common'
import { SubscriptionsService } from './subscriptions.service'
import { SubscriptionsController } from './subscriptions.controller'
import { SequelizeModule } from '@nestjs/sequelize'
import { Subscriptions } from './models/subscriptions.model'
import { UsersModule } from '../../usersComponent/users/users.module'
import { LoggerModule } from '../../loggerComponent/logger/logger.module'
import { SubscriptionPeriodsModule } from '../subscription-periods/subscription-periods.module'

@Module({
  providers: [SubscriptionsService],
  controllers: [SubscriptionsController],
  imports: [
    SequelizeModule.forFeature([Subscriptions]),
    UsersModule,
    LoggerModule,
    SubscriptionPeriodsModule,
  ],
  exports: [SequelizeModule, SubscriptionsService],
})
export class SubscriptionsModule {}
