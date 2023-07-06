import { Controller, Get, Param } from '@nestjs/common';
import { SubscriptionsService } from './subscriptions.service';
import { Subscriptions } from './models/subscriptions.model';
import { CreateSubscriptionsDto } from './dto/create-subscriptions.dto';
import { UpdateSubscriptionsDto } from './dto/update-subscriptions.dto';
import { EntityController } from '../../../classes/core/entity.controller';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Subscriptions')
@Controller('/subscriptions')
export class SubscriptionsController extends EntityController<
  Subscriptions,
  CreateSubscriptionsDto,
  UpdateSubscriptionsDto
> {
  constructor(protected service: SubscriptionsService) {
    super(service);
  }

  @ApiCreatedResponse({
    description:
      'Boolean value about subscription expiration received successfully',
  })
  @Get('/subscriptionEnded/:userEmail')
  async hasSubscriptionEnded(
    @Param('userEmail') userEmail: string,
  ): Promise<boolean> {
    return await this.service.hasSubscriptionEnded(userEmail);
  }
}
