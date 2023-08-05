import { Module } from '@nestjs/common';
import { RobokassaService } from './robokassa.service';
import { RobokassaController } from './robokassa.conroller';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersModule } from '../../usersComponent/users/users.module';
import { LoggerModule } from '../../loggerComponent/logger/logger.module';
import { InvCounterModule } from '../invCounter/invCounter.module';
import { SubscriptionPeriodsModule } from '../../../components/subscriptionComponent/subscription-periods/subscription-periods.module';
import { SubscriptionsModule } from '../../../components/subscriptionComponent/subscriptions/subscriptions.module';

@Module({
  providers: [RobokassaService],
  controllers: [RobokassaController],
  imports: [
    SequelizeModule.forFeature([]),
    UsersModule,
    LoggerModule,
    InvCounterModule,
    SubscriptionPeriodsModule,
    SubscriptionsModule,
  ],
  exports: [SequelizeModule, RobokassaService],
})
export class RobokassaModule {}
