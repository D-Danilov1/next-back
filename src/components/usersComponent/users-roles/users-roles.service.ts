import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { EntityService } from '../../../classes/core/entity.service'
import { UsersRoles } from './users-roles.model';
import { LoggerService } from '../../loggerComponent/logger/logger.service';

@Injectable()
export class UsersRolesService extends EntityService<UsersRoles> {
  constructor(
    @InjectModel(UsersRoles) protected repository: typeof UsersRoles,
    protected loggerService: LoggerService,
  ) {
    super(repository, 'UsersRoles', loggerService)
  }
}
