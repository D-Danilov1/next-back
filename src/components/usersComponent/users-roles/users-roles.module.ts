import { Module } from '@nestjs/common'
import { UsersRolesService } from './users-roles.service'
import { SequelizeModule } from '@nestjs/sequelize'
import { UsersRoles } from './users-roles.model'
import { LoggerModule } from '../../loggerComponent/logger/logger.module';

@Module({
  providers: [UsersRolesService],
  imports: [SequelizeModule.forFeature([UsersRoles]), LoggerModule],
  exports: [SequelizeModule, UsersRolesService],
})
export class UsersRolesModule {}
