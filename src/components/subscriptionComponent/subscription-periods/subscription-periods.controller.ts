import { Controller } from '@nestjs/common';
import { SubscriptionPeriodsService } from './subscription-periods.service';
import { SubscriptionPeriods } from './models/subscription-periods.model';
import { CreateSubscriptionPeriodsDto } from './dto/create-subscription-periods.dto';
import { UpdateSubscriptionPeriodsDto } from './dto/update-subscription-periods.dto';
import { EntityController } from '../../../classes/core/entity.controller';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Subscription Periods')
@Controller('/subscription-periods')
export class SubscriptionPeriodsController extends EntityController<
  SubscriptionPeriods,
  CreateSubscriptionPeriodsDto,
  UpdateSubscriptionPeriodsDto
> {
  constructor(protected service: SubscriptionPeriodsService) {
    super(service);
  }
}
