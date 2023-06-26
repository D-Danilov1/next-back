import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { EntityService } from '../../../classes/core/entity.service'
import { SubscriptionPeriods } from './models/subscription-periods.model'
import { LoggerService } from '../../loggerComponent/logger/logger.service'

@Injectable()
export class SubscriptionPeriodsService extends EntityService<SubscriptionPeriods> {
  constructor(
    @InjectModel(SubscriptionPeriods)
    protected repository: typeof SubscriptionPeriods,
    protected loggerService: LoggerService,
  ) {
    super(repository, 'SubscriptionPeriods', loggerService)
  }
}
