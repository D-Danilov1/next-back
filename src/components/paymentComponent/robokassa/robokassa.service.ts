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
    if (period == 1) {
      // return 'https://auth.robokassa.ru/RecurringSubscriptionPage/Subscription/Subscribe?SubscriptionId=ffbed28d-3d31-445f-9b9d-3e3eec568bf5';
      return 'https://auth.robokassa.ru/RecurringSubscriptionPage/Subscription/Subscribe?SubscriptionId=8d1910f1-0ac6-4420-9797-7e9327b87db0'; // test
    } else if (period == 6) {
      return 'https://auth.robokassa.ru/RecurringSubscriptionPage/Subscription/Subscribe?SubscriptionId=275baeb1-3672-454a-a2c6-af94300e7893';
    } else if (period == 12) {
      return 'https://auth.robokassa.ru/RecurringSubscriptionPage/Subscription/Subscribe?SubscriptionId=61977ecc-b2b0-4d4e-b403-b5d31b8f77a7';
    }
    // const inv_id = await this.invCounterService.getNewInvId();
    // const out_sum = '0.10'
    // // Number(amount).toFixed(2);

    // const crc = this.generateCRC(out_sum, inv_id, this.mrh_pass1);
    // const url = `https://auth.robokassa.ru/Merchant/Index.aspx?MerchantLogin=${this.mrh_login}&OutSum=${out_sum}&InvId=${inv_id}&Description=Next&SignatureValue=${crc}`;

    // return url;
  }

  async cancelSubscription(subscriptionId: string): Promise<any> {
    const requestBody = {
      MerchantLogin: this.mrh_login,
      InvoiceID: subscriptionId,
      SignatureValue: await this.calculateSignature(subscriptionId),
    };

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
