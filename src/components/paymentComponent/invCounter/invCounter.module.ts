import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { InvCounterController } from './invCounter.controller';
import { InvCounterService } from './invCounter.service';
import { InvCounter } from './models/invCounter.model';
import { LoggerModule } from '../../../components/loggerComponent/logger/logger.module';

@Module({
  controllers: [InvCounterController],
  exports: [SequelizeModule, InvCounterService],
  imports: [SequelizeModule.forFeature([InvCounter]), LoggerModule],
  providers: [InvCounterService],
})
export class InvCounterModule {}
