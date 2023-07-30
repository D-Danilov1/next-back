// stripeWebhook.controller.ts
import { Controller, Post, Req, Res, HttpStatus } from '@nestjs/common';
import { ApiExcludeController, ApiOperation } from '@nestjs/swagger';
import { SubscriptionsService } from '../../subscriptionComponent/subscriptions/subscriptions.service';
import { Stripe } from 'stripe';

@ApiExcludeController()
@Controller('/stripe_webhooks')
export class StripeWebhookController {
  private stripe: Stripe;

  constructor(private subscriptionsService: SubscriptionsService) {
    // @ts-ignore
    this.stripe = new Stripe(
      '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',
    );
  }

  @ApiOperation({ summary: 'Handle Stripe Webhook' })
  @Post()
  async handleWebhook(@Req() req, @Res() res) {
    try {
      const secret =
        'whsec_c8e364312e26bb8b789af39c2936b0b7c1487da02f4bbd2108f80c3f683363fa';

      const payloadString = JSON.stringify(req.body);

      const header = this.stripe.webhooks.generateTestHeaderString({
        payload: payloadString,
        secret,
      });

      const event = this.stripe.webhooks.constructEvent(
        payloadString,
        header,
        secret,
      );

      const dataObject = event.data.object;

      const calculateEndDate = (startDate: any, period: any) => {
        const endDate = new Date(startDate);
        endDate.setMonth(endDate.getMonth() + Number(period));
        return endDate.toISOString();
      };

      switch (event.type) {
        case 'invoice.paid':
          // @ts-ignore
          const { customer_email, amount_paid } = dataObject;

          if (!customer_email || !amount_paid) return;

          if (Number(amount_paid) >= 4490) {
            await this.subscriptionsService.update({
              userEmail: customer_email,
              end_of: calculateEndDate(new Date(), 12),
            });
          } else if (Number(amount_paid) >= 3390) {
            await this.subscriptionsService.update({
              userEmail: customer_email,
              end_of: calculateEndDate(new Date(), 6),
            });
          } else {
            await this.subscriptionsService.update({
              userEmail: customer_email,
              end_of: calculateEndDate(new Date(), 1),
            });
          }

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
