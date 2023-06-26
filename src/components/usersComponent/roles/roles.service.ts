import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { Roles } from './models/roles.model'
import { EntityService } from '../../../classes/core/entity.service'
import { findByName } from '../../../traits/find-by.trait'
import { LoggerService } from '../../loggerComponent/logger/logger.service';

@Injectable()
export class RolesService extends EntityService<Roles> {
  constructor(
    @InjectModel(Roles) protected repository: typeof Roles,
    protected loggerService: LoggerService
  ) {
    super(repository, 'Roles', loggerService)
  }

  findByName = findByName
}
