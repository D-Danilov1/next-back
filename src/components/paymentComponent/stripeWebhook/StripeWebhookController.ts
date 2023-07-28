// stripeWebhook.controller.ts
import { Controller, Post, Req, Res, HttpStatus } from '@nestjs/common';
import { ApiExcludeController, ApiOperation } from '@nestjs/swagger';
import { Stripe } from 'stripe';

@ApiExcludeController()
@Controller('/stripe_webhooks')
export class StripeWebhookController {
  private stripe: Stripe;

  constructor() {
    // @ts-ignore
    this.stripe = new Stripe('sk_test_VePHdqKTYQjKNInc7u56JBrQ');
  }

  @ApiOperation({ summary: 'Handle Stripe Webhook' })
  @Post()
  async handleWebhook(@Req() req, @Res() res) {
    try {
      const rawBody = Buffer.concat([] as Uint8Array[], (req as any).rawBody);

      const event = this.stripe.webhooks.constructEvent(
        rawBody,
        req.headers['stripe-signature'],
        'whsec_c8e364312e26bb8b789af39c2936b0b7c1487da02f4bbd2108f80c3f683363fa',
      );

      const dataObject = event.data.object;

      switch (event.type) {
        case 'invoice.paid':
          break;
        case 'invoice.payment_failed':
          break;
        case 'customer.subscription.deleted':
          if (event.request != null) {
          } else {
          }
          break;
        default:
      }

      res.sendStatus(HttpStatus.OK);
    } catch (error) {
      console.error('Error handling webhook:', error);
      res.sendStatus(HttpStatus.BAD_REQUEST);
    }
  }
}
