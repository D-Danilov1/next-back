import { Module } from '@nestjs/common';
import { RobokassaService } from './robokassa.service';
import { RobokassaController } from './robokassa.conroller';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersModule } from '../../usersComponent/users/users.module';
import { LoggerModule } from '../../loggerComponent/logger/logger.module';
import { InvCounterModule } from '../invCounter/invCounter.module';

@Module({
  providers: [RobokassaService],
  controllers: [RobokassaController],
  imports: [SequelizeModule.forFeature([]), UsersModule, LoggerModule, InvCounterModule],
  exports: [SequelizeModule, RobokassaService],
})
export class RobokassaModule {}
