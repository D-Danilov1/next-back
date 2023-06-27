import { Body, Injectable, Post, Res } from '@nestjs/common';

import { Stripe } from 'stripe';

@Injectable()
export class StripeService {
  private stripe: Stripe;

  constructor() {
    // @ts-ignore
    this.stripe = new Stripe(
      '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',
    );
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
  async updatePrice(id: string, metadata: { order_id: string }) {
    const price = await this.stripe.prices.update(id, { metadata });
    return price;
  }

  async createCustomer(
    email: string,
    name: string,
    address: any,
    shipping: any,
  ) {
    try {
      const customer = await this.stripe.customers.create({
        email,
        name,
        address,
        shipping,
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
}
