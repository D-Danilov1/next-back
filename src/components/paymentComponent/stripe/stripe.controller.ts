import { StripeService } from './stripe.service';
import { Body, Controller, Get, HttpStatus, Post, Res } from '@nestjs/common';

@Controller('/stripe')
export class StripeController {
  constructor(private readonly stripeService: StripeService) {}

  @Post('/create-subscription')
  async createSubscription(
    @Body('customerId') customerId: string,
    @Body('priceId') priceId: string,
    @Res() res,
  ) {
    try {
      const subscriptionDetails = await this.stripeService.createSubscription(
        customerId,
        priceId,
      );
      return res.send(subscriptionDetails);
    } catch (error) {
      return res.status(400).send({ error: { message: error.message } });
    }
  }

  @Post('/create-customer')
  async createCustomer(@Body() requestBody: any, @Res() res) {
    const { email, name, address, shipping } = requestBody;

    try {
      const customer = await this.stripeService.createCustomer(
        email,
        name,
        address,
        shipping,
      );
      return res.send(customer);
    } catch (error) {
      return res.status(400).send({ error: { message: error.message } });
    }
  }

  @Post('/create-product')
  async createProduct(@Body('name') name: string, @Res() res) {
    try {
      const product = await this.stripeService.createProduct(name);
      return res.send(product);
    } catch (error) {
      return res.status(400).send({ error: { message: error.message } });
    }
  }

  @Post('/create-price')
  async createPrice(
    @Body('unit_amount') unitAmount: number,
    @Body('currency') currency: string,
    @Body('interval') interval: string,
    @Body('productId') productId: string,
    @Res() res,
  ) {
    try {
      const price = await this.stripeService.createPrice(
        unitAmount,
        currency,
        interval,
        productId,
      );
      return res.send(price);
    } catch (error) {
      return res.status(400).send({ error: { message: error.message } });
    }
  }
}
