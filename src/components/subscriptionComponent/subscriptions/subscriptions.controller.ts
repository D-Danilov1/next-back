import { Controller, Get, HttpStatus, Param } from '@nestjs/common';
import { SubscriptionsService } from './subscriptions.service';
import { Subscriptions } from './models/subscriptions.model';
import { CreateSubscriptionsDto } from './dto/create-subscriptions.dto';
import { UpdateSubscriptionsDto } from './dto/update-subscriptions.dto';
import { EntityController } from '../../../classes/core/entity.controller';
import { ApiCreatedResponse, ApiParam, ApiTags } from '@nestjs/swagger';

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
  @ApiParam({ name: 'userEmail', description: 'User email' })
  @Get('/subscriptionEnded/:userEmail')
  async hasSubscriptionEnded(
    @Param('userEmail') userEmail: string,
  ): Promise<boolean> {
    return await this.service.hasSubscriptionEnded(userEmail);
  }

  @ApiCreatedResponse({
    description: 'Find subscription is successfully',
  })
  @ApiParam({ name: 'id', description: 'Subscription ID' })
  @Get('/:id')
  async findByUserId(
    @Param('id') id: number | string,
  ): Promise<{ response: Subscriptions; statusCode: number }> {
    return {
      statusCode: HttpStatus.OK,
      response: await this.service.findByUserId(id),
    };
  }
}
