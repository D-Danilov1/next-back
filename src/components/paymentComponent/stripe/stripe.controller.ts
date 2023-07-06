import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { StripeService } from './stripe.service';
import { Body, Controller, Post, Res } from '@nestjs/common';
import { RolesGuards } from 'src/decorators/roles-guards.decorator';
import { ROLES } from '../../../constants/roles.constants';
import {
  CreateSubscriptionDto,
  CreateCustomerDto,
  CreateProductDto,
  CreatePriceDto,
  CancelSubscriptionDto,
} from './dto/stipe.dto';

@ApiTags('Stripe')
@Controller('/stripe')
export class StripeController {
  constructor(private readonly stripeService: StripeService) {}

  @ApiCreatedResponse({ description: 'Subscription created successfully' })
  @Post('/create-subscription')
  async createSubscription(
    @Body() createSubscriptionDto: CreateSubscriptionDto,
    @Res() res,
  ) {
    try {
      const { customerId, priceId } = createSubscriptionDto;
      const subscriptionDetails = await this.stripeService.createSubscription(
        customerId,
        priceId,
      );
      return res.send(subscriptionDetails);
    } catch (error) {
      return res.status(400).send({ error: { message: error.message } });
    }
  }

  @ApiCreatedResponse({ description: 'Customer created successfully' })
  @Post('/create-customer')
  async createCustomer(
    @Body() createCustomerDto: CreateCustomerDto,
    @Res() res,
  ) {
    const { email, name } = createCustomerDto;

    try {
      const customer = await this.stripeService.createCustomer(email, name);
      return res.send(customer);
    } catch (error) {
      return res.status(400).send({ error: { message: error.message } });
    }
  }

  @ApiCreatedResponse({ description: 'Product created successfully' })
  @Post('/create-product')
  async createProduct(@Body() createProductDto: CreateProductDto, @Res() res) {
    try {
      const { name } = createProductDto;
      const product = await this.stripeService.createProduct(name);
      return res.send(product);
    } catch (error) {
      return res.status(400).send({ error: { message: error.message } });
    }
  }

  @ApiCreatedResponse({ description: 'Price created successfully' })
  @Post('/create-price')
  async createPrice(@Body() createPriceDto: CreatePriceDto, @Res() res) {
    try {
      const { unit_amount, currency, interval, productId } = createPriceDto;
      const price = await this.stripeService.createPrice(
        unit_amount,
        currency,
        interval,
        productId,
      );
      return res.send(price);
    } catch (error) {
      return res.status(400).send({ error: { message: error.message } });
    }
  }

  @RolesGuards([ROLES.USER])
  @ApiCreatedResponse({ description: 'Subscription canceled successfully' })
  @Post('/cancel')
  async cancelSubscription(
    @Body() cancelSubscriptionDto: CancelSubscriptionDto,
  ) {
    const { email } = cancelSubscriptionDto;
    return this.stripeService.cancelSubscription(email);
  }
}
