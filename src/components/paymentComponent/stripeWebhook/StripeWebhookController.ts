import { Controller, Post, Req, Res, HttpStatus } from '@nestjs/common';
import { Stripe } from 'stripe';

@Controller('webhook')
export class StripeWebhookController {
  private stripe: Stripe;

  constructor() {
    // @ts-ignore
    this.stripe = new Stripe(
      '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',
    );
  }

  @Post()
  async handleWebhook(@Req() req, @Res() res) {
    try {
      const event = this.stripe.webhooks.constructEvent(
        req.body,
        req.headers['stripe-signature'],
        process.env.STRIPE_WEBHOOK_SECRET,
      );

      // Extract the object from the event.
      const dataObject = event.data.object;

      // Handle the event
      // Review important events for Billing webhooks
      // https://stripe.com/docs/billing/webhooks
      // Remove comment to see the various objects sent for this sample
      console.log(event.type)
      switch (event.type) {
        case 'invoice.paid':
          // Used to provision services after the trial has ended.
          // The status of the invoice will show up as paid. Store the status in your
          // database to reference when a user accesses your service to avoid hitting rate limits.
          break;
        case 'invoice.payment_failed':
          // If the payment fails or the customer does not have a valid payment method,
          // an invoice.payment_failed event is sent, the subscription becomes past_due.
          // Use this webhook to notify your user that their payment has
          // failed and to retrieve new card details.
          break;
        case 'customer.subscription.deleted':
          if (event.request != null) {
            // handle a subscription canceled by your request
            // from above.
          } else {
            // handle subscription canceled automatically based
            // upon your subscription settings.
          }
          break;
        default:
        // Unexpected event type
      }

      res.sendStatus(HttpStatus.OK);
    } catch (error) {
      console.error('Error handling webhook:', error);
      res.sendStatus(HttpStatus.BAD_REQUEST);
    }
  }
}
