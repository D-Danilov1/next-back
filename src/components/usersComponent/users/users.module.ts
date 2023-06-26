import { Module } from '@nestjs/common'
import { UsersService } from './users.service'
import { UsersController } from './users.controller'
import { SequelizeModule } from '@nestjs/sequelize'
import { Users } from './models/users.model'
import { RolesModule } from '../roles/roles.module'
import { LoggerModule } from '../../loggerComponent/logger/logger.module';

@Module({
  controllers: [UsersController],
  exports: [SequelizeModule, UsersService],
  imports: [SequelizeModule.forFeature([Users]), RolesModule, LoggerModule],
  providers: [UsersService],
})
export class UsersModule {}
