import { Module } from '@nestjs/common'
import { RolesService } from './roles.service'
import { RolesController } from './roles.controller'
import { SequelizeModule } from '@nestjs/sequelize'
import { Roles } from './models/roles.model'
import { UsersRoles } from '../users-roles/users-roles.model'
import { LoggerModule } from '../../loggerComponent/logger/logger.module';

@Module({
  providers: [RolesService],
  controllers: [RolesController],
  imports: [SequelizeModule.forFeature([Roles, UsersRoles]), LoggerModule],
  exports: [SequelizeModule, RolesService],
})
export class RolesModule {}