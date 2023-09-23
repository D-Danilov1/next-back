import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersModule } from './components/usersComponent/users/users.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { RolesModule } from './components/usersComponent/roles/roles.module';
import { AuthorizationModule } from './components/usersComponent/authorization/authorization.module';
import { InitializerModule } from './components/initializerComponent/initializer/initializer.module';
import { RefreshTokensModule } from './components/usersComponent/refresh-tokens/refresh-tokens.module';
import { SubscriptionPeriodsModule } from './components/subscriptionComponent/subscription-periods/subscription-periods.module';
import { SubscriptionsModule } from './components/subscriptionComponent/subscriptions/subscriptions.module';
import { LoggerModule } from './components/loggerComponent/logger/logger.module';
import { RobokassaModule } from './components/paymentComponent/robokassa/robokassa.module';
import { StripeModule } from './components/paymentComponent/stripe/stripe.module';
import { StripeWebhookController } from './components/paymentComponent/stripeWebhook/StripeWebhookController';
import { InvCounterModule } from './components/paymentComponent/invCounter/invCounter.module';
import { AlexgolduniversityController } from './components/alexgolduniversity/alexgolduniversity.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        dialect: 'postgres',
        host: configService.get('DB_HOST'),
        port: +configService.get('DB_PORT'),
        username: configService.get('DB_USER'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_DATABASE'),
        autoLoadModels: true,
        synchronize: true,
        logging: false,
      }),
      inject: [ConfigService],
    }),
    AuthorizationModule,
    InitializerModule,
    RefreshTokensModule,
    RolesModule,
    UsersModule,
    SubscriptionsModule,
    SubscriptionPeriodsModule,
    LoggerModule,
    RobokassaModule,
    StripeModule,
    InvCounterModule,
  ],
  controllers: [StripeWebhookController, AlexgolduniversityController],
})
export class AppModule {}
