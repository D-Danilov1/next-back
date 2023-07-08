import { Injectable } from '@nestjs/common';
import { InvCounterService } from '../invCounter/invCounter.service';
import axios from 'axios';

@Injectable()
export class RobokassaService {
  private readonly mrh_login = 'NextSubscriptions';
  private readonly mrh_pass1 = 'WO1SZy3HThEPr1mM6U0K';
  private readonly mrh_pass2 = 'gCTKB4IR1jjJ5BU6d2CB';

  constructor(private invCounterService: InvCounterService) {}

  async getPaymentLink(amount, period): Promise<string> {
    const invId = await this.invCounterService.getNewInvId();
    const outSum = '0.10';
    const description = 'Оплата подписки';
    const recurring = 'true';

    const crc = this.generateCRC(outSum, invId, this.mrh_pass1);

    const url = `https://auth.robokassa.ru/Merchant/Index.aspx?MerchantLogin=${
      this.mrh_login
    }&OutSum=${outSum}&InvId=${invId}&Description=${encodeURIComponent(
      description,
    )}&SignatureValue=${crc}&Recurring=${recurring}&IsTest=1&ExpirationDate=${this.calculateExpirationDate(
      30,
    )}`;

    return url;
  }

  calculateExpirationDate(periodInDays: number): string {
    const currentDate = new Date();
    const expirationDate = new Date(
      currentDate.getTime() + periodInDays * 24 * 60 * 60 * 1000,
    );
    const formattedDate = expirationDate.toISOString().split('T')[0];
    return formattedDate;
  }

  async cancelSubscription(subscriptionId: string): Promise<any> {
    const requestBody = {
      MerchantLogin: this.mrh_login,
      InvoiceID: subscriptionId,
      SignatureValue: await this.calculateSignature(subscriptionId),
    };
    // https://auth.robokassa.ru/RecurringSubscriptionPage/Subscription/Unsubscribe?SubscriptionId=8d1910f1-0ac6-4420-9797-7e9327b87db0&SubscriberId=15a0f77d-375d-4868-9c46-41861dd336cc
    const response = await axios.post(
      'https://auth.robokassa.ru/Merchant/CancelPayment',
      requestBody,
    );
    return response.data;
  }

  private calculateSignature(subscriptionId: string): string {
    const crc = `${subscriptionId}:${this.mrh_pass1}`;
    const signature = require('crypto')
      .createHash('md5')
      .update(crc)
      .digest('hex');
    return signature;
  }

  private generateCRC(
    out_sum: string,
    inv_id: number,
    mrh_pass: string,
  ): string {
    const crc = require('crypto')
      .createHash('md5')
      .update(`${this.mrh_login}:${out_sum}:${inv_id}:${mrh_pass}`)
      .digest('hex');
    return crc;
  }

  async verifyResultURL(params) {
    const { OutSum, InvId, SignatureValue } = params;
    if (!SignatureValue || !InvId || !OutSum)
      return console.log('error result', SignatureValue, InvId, OutSum);
    const my_crc = await this.generateCRC(OutSum, +InvId, this.mrh_pass2);
    return my_crc?.toUpperCase() === SignatureValue?.toUpperCase();
  }

  async verifySuccessURL(params) {
    const { OutSum, InvId, SignatureValue } = params;
    if (!SignatureValue || !InvId || !OutSum)
      return console.log('error successfully', SignatureValue, InvId, OutSum);
    const my_crc = await this.generateCRC(OutSum, +InvId, this.mrh_pass1);
    return my_crc?.toUpperCase() === SignatureValue?.toUpperCase();
  }
}
