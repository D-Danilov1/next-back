import { Injectable } from '@nestjs/common';
import * as md5 from 'md5';

@Injectable()
export class RobokassaService {
  private readonly mrhPass1: string;
  private readonly mrhPass2: string;

  constructor() {
    this.mrhPass1 = process.env.MERCHANT_PASS1;
    this.mrhPass2 = process.env.MERCHANT_PASS1; // TODO ADD PASSWORD
  }

  async getPaymentUrl(amount, description) {
    const merchantLogin = process.env.MERCHANT_LOGIN;
    const merchantPass1 = process.env.MERCHANT_PASS1;

    const invoiceId = 0;
    const culture = 'ru';
    const outSum = 2000;
    const isRecurring = true;

    const signatureValue = md5(
      `${merchantLogin}:${outSum}:${invoiceId}:${merchantPass1}`,
    );

    return `https://auth.robokassa.ru/Merchant/Index.aspx?MerchantLogin=${merchantLogin}&InvoiceID=${invoiceId}&Culture=${culture}&Encoding=utf-8&OutSum=${outSum}&shp_interface=field&SignatureValue=${signatureValue}&Description=${description}&Recurring=${isRecurring}`;
  }

  async verifyResultUrl(params: any) {
    const { OutSum, InvId, SignatureValue } = params;

    const myCrc = this.generateCRC(`${OutSum}:${InvId}:${this.mrhPass2}`);

    return myCrc === SignatureValue.toUpperCase();
  }

  async verifySuccessUrl(params: any) {
    const { OutSum, InvId, SignatureValue } = params;

    const myCrc = this.generateCRC(`${OutSum}:${InvId}:${this.mrhPass1}`);

    return myCrc === SignatureValue.toUpperCase();
  }

  private generateCRC(data: string): string {
    return md5(data).toUpperCase();
  }
}
