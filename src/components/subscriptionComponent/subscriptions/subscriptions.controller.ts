import { Body, Controller, Get, HttpStatus, Param, Post } from '@nestjs/common';
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
  @Get('/subscriptionActive/:userEmail')
  async hasSubscriptionActive(
    @Param('userEmail') userEmail: string,
  ): Promise<boolean> {
    return await this.service.hasSubscriptionActive(userEmail);
  }

  @ApiCreatedResponse({
    description: 'Boolean about whether the user paid with stripe',
  })
  @ApiParam({ name: 'userEmail', description: 'User email' })
  @Get('/paidWithStripe/:userEmail')
  async paidWithStripe(
    @Param('userEmail') userEmail: string,
  ): Promise<boolean> {
    return await this.service.paidWithStripe(userEmail);
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

  @Post('/create-subscription')
  async createSubscription(@Body() data: any) {
    try {
      const { email, period } = data;
      const response = await this.service.createSubscription(email, period);
      return response;
    } catch (err) {
      console.log(err);
    }
  }
}
