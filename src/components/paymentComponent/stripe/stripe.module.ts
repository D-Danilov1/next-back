import { Module } from '@nestjs/common';
import { StripeService } from './stripe.service';
import { StripeController } from './stripe.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersModule } from '../../usersComponent/users/users.module';
import { LoggerModule } from '../../loggerComponent/logger/logger.module';

@Module({
  providers: [StripeService],
  controllers: [StripeController],
  imports: [SequelizeModule.forFeature([]), UsersModule, LoggerModule],
  exports: [SequelizeModule, StripeService],
})
export class StripeModule {}
