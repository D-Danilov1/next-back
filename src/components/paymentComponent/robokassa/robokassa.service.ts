import { Injectable } from '@nestjs/common';
import { InvCounterService } from '../invCounter/invCounter.service';
import axios from 'axios';
import { UsersService } from '../../../components/usersComponent/users/users.service';
import { SubscriptionPeriodsService } from '../../../components/subscriptionComponent/subscription-periods/subscription-periods.service';
import { SubscriptionsService } from 'src/components/subscriptionComponent/subscriptions/subscriptions.service';

@Injectable()
export class RobokassaService {
  private readonly mrh_login = 'NextSubscriptions';
  private readonly mrh_pass1 = 'WO1SZy3HThEPr1mM6U0K';
  private readonly mrh_pass2 = 'gCTKB4IR1jjJ5BU6d2CB';

  constructor(
    private invCounterService: InvCounterService,
    private usersService: UsersService,
    private subscriptionPeriodsService: SubscriptionPeriodsService,
    private subscriptionsService: SubscriptionsService,
  ) {}

  async getPaymentLink(amount, period): Promise<string> {
    if (period == 1) {
      return 'https://auth.robokassa.ru/RecurringSubscriptionPage/Subscription/Subscribe?SubscriptionId=21706b18-664e-4576-a337-9b98d98e3c38';
      // return 'https://auth.robokassa.ru/RecurringSubscriptionPage/Subscription/Subscribe?SubscriptionId=abde0173-f4fc-42a0-8c19-c4346735d597'; // test
    } else if (period == 3) {
      return 'https://auth.robokassa.ru/RecurringSubscriptionPage/Subscription/Subscribe?SubscriptionId=13ac3a4e-787c-4a2a-bf56-308370b58cf5';
    } else if (period == 12) {
      return 'https://auth.robokassa.ru/RecurringSubscriptionPage/Subscription/Subscribe?SubscriptionId=78206374-1361-464e-9c55-4bf3b518d688';
    }
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

  async getData(EMail: string, OutSum: string) {
    const userObj = {
      email: EMail,
      phone_number: '',
    };

    const user = await this.usersService.create(userObj);

    const calculateEndDate = (startDate: any, period: any) => {
      const endDate = new Date(startDate);
      endDate.setMonth(endDate.getMonth() + Number(period));
      return endDate.toISOString();
    };

    const getPeriod = () => {
      if (Number(OutSum) <= 600) {
        return 1;
      } else if (Number(OutSum) <= 3000) {
        return 6;
      } else if (Number(OutSum) <= 4000) {
        return 12;
      }
    };

    const subscriptionPeriodObj = {
      name: `${getPeriod()}_MONTH${Number(getPeriod()) > 1 ? 'S' : ''}`,
      period: Number(getPeriod()),
    };

    const subscriptionPeriod = await this.subscriptionPeriodsService.create(
      subscriptionPeriodObj,
    );

    const subscriptionObj = {
      userEmail: user.email,
      subscription_period_id: subscriptionPeriod.id,
      payment_amount: Number(OutSum).toString(),
      start_of: new Date().toISOString(),
      end_of: calculateEndDate(new Date(), getPeriod()),
    };

    const subscription = await this.subscriptionsService.create(subscriptionObj);
    return subscription
  }
}
