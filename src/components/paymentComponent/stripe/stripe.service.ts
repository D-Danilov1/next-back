import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Token } from 'src/classes/authorization/jwt/token';
import { SubscriptionsService } from 'src/components/subscriptionComponent/subscriptions/subscriptions.service';
import { UsersService } from 'src/components/usersComponent/users/users.service';

import { Stripe } from 'stripe';

@Injectable()
export class StripeService {
  private stripe: Stripe;
  private token: Token;

  constructor(
    config: ConfigService,
    private usersService: UsersService,
    private subscriptionsService: SubscriptionsService,
  ) {
    // @ts-ignore
    this.stripe = new Stripe(
      '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',
      // 'sk_test_VePHdqKTYQjKNInc7u56JBrQ',
    );
    this.token = new Token(config);
  }

  async cancelSubscription(userEmail: string) {
    try {
      const user = await this.usersService.findByEmail(userEmail);

      if (!user) return;

      const subscription = await this.subscriptionsService.findByUserId(
        user.id,
      );

      if (!subscription) return;

      const deletedSubscription = await this.stripe.subscriptions.del(
        subscription.subscription_id,
      );
      return deletedSubscription;
    } catch (error) {
      throw new Error('Failed to cancel subscription.');
    }
  }

  async createSubscription(customerId: string, priceId: string) {
    try {
      const subscription = await this.stripe.subscriptions.create({
        customer: customerId,
        items: [{ price: priceId }],
        payment_behavior: 'default_incomplete',
        payment_settings: { save_default_payment_method: 'on_subscription' },
        expand: ['latest_invoice.payment_intent'],
      });

      return {
        subscriptionId: subscription.id,
        // @ts-ignore
        clientSecret: subscription.latest_invoice.payment_intent.client_secret,
      };
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async createCustomer(email: string, name: string) {
    try {
      const customer = await this.stripe.customers.create({
        email,
        name,
      });

      return customer;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async createProduct(name: string) {
    try {
      const product = await this.stripe.products.create({
        name,
      });

      return product;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async createPrice(
    unitAmount: number,
    currency: string,
    interval: string,
    productId: string,
  ) {
    try {
      const price = await this.stripe.prices.create({
        unit_amount: unitAmount,
        currency,
        // @ts-ignore
        recurring: { interval },
        product: productId,
      });

      return price;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  // async listPrices(lookupKey: string): Promise<Stripe.Price[]> {
  //   const prices = await this.stripe.prices.list({
  //     lookup_keys: [lookupKey],
  //     expand: ['data.product'],
  //   });
  //   return prices.data;
  // }

  // async createCheckoutSession(
  //   priceId: string,
  // ): Promise<Stripe.Checkout.Session> {
  //   const session = await this.stripe.checkout.sessions.create({
  //     billing_address_collection: 'auto',
  //     line_items: [
  //       {
  //         price: priceId,
  //         quantity: 1,
  //       },
  //     ],
  //     mode: 'subscription',
  //     success_url: `https://www.next-payment.site/stripe/success?success=true&session_id={CHECKOUT_SESSION_ID}`,
  //     cancel_url: `https://www.next-payment.site/robokassa/fail?canceled=true`,
  //   });
  //   return session;
  // }

  // async createPortalSession(
  //   sessionId: string,
  // ): Promise<Stripe.BillingPortal.Session> {
  //   const checkoutSession = await this.stripe.checkout.sessions.retrieve(
  //     sessionId,
  //   );
  //   const returnUrl = 'https://www.next-payment.site';
  //   const portalSession = await this.stripe.billingPortal.sessions.create({
  //     // @ts-ignore
  //     customer: checkoutSession.customer,
  //     return_url: returnUrl,
  //   });
  //   return portalSession;
  // }
}
