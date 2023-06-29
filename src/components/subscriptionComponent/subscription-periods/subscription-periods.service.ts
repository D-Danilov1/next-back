import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { EntityService } from '../../../classes/core/entity.service';
import { SubscriptionPeriods } from './models/subscription-periods.model';
import { LoggerService } from '../../loggerComponent/logger/logger.service';
import { CreateSubscriptionPeriodsDto } from './dto/create-subscription-periods.dto';

@Injectable()
export class SubscriptionPeriodsService extends EntityService<SubscriptionPeriods> {
  constructor(
    @InjectModel(SubscriptionPeriods)
    protected repository: typeof SubscriptionPeriods,
    protected loggerService: LoggerService,
  ) {
    super(repository, 'SubscriptionPeriods', loggerService);
  }

  async create(
    dto: CreateSubscriptionPeriodsDto,
  ): Promise<SubscriptionPeriods> {
    const candidate: SubscriptionPeriods = await this.repository.findOne({
      where: { name: dto.name },
    });
    if (candidate) {
      return candidate;
    }

    const period: SubscriptionPeriods = await this.repository.create(dto);

    return period;
  }
}
