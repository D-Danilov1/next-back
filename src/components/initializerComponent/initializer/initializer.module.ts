import { Module } from '@nestjs/common'
import { SequelizeModule } from '@nestjs/sequelize'
import { InitializerService } from './initializer.service'
import { InitializerController } from './initializer.controller'
import { Roles } from '../../usersComponent/roles/models/roles.model'
import { Users } from '../../usersComponent/users/models/users.model'
import { RolesModule } from '../../usersComponent/roles/roles.module'
import { UsersModule } from '../../usersComponent/users/users.module'

@Module({
  providers: [InitializerService],
  controllers: [InitializerController],
  imports: [SequelizeModule.forFeature([Roles, Users]), RolesModule, UsersModule],
  exports: [SequelizeModule, InitializerService],
})
export class InitializerModule {}
