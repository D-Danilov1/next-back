import { Injectable } from '@nestjs/common';
import { InvCounterService } from '../invCounter/invCounter.service';

@Injectable()
export class RobokassaService {
  private readonly mrh_login = 'NextSubscriptions';
  private readonly mrh_pass1 = 'WO1SZy3HThEPr1mM6U0K';
  private readonly mrh_pass2 = 'gCTKB4IR1jjJ5BU6d2CB';

  constructor(private invCounterService: InvCounterService) {}

  async getPaymentLink(amount): Promise<string> {
    const inv_id = await this.invCounterService.getNewInvId();
    const out_sum = '1.12'
    // Number(amount).toFixed(2);

    const crc = this.generateCRC(out_sum, inv_id, this.mrh_pass1);
    const url = `https://auth.robokassa.ru/Merchant/Index.aspx?MerchantLogin=${this.mrh_login}&OutSum=${out_sum}&InvId=${inv_id}&Description=Next@mail.ru&SignatureValue=${crc}`;

    return url;
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

  async verifyResultURL(params: Record<string, string>) {
    const { OutSum, InvId, SignatureValue } = params;
    if (!SignatureValue || !InvId || !OutSum)
      return console.log('error result', SignatureValue, InvId, OutSum);
    const my_crc = await this.generateCRC(OutSum, +InvId, this.mrh_pass2);
    return my_crc?.toUpperCase() === SignatureValue?.toUpperCase();
  }

  async verifySuccessURL(params: Record<string, string>) {
    const { OutSum, InvId, SignatureValue } = params;
    if (!SignatureValue || !InvId || !OutSum)
      return console.log('error successfully', SignatureValue, InvId, OutSum);
    const my_crc = await this.generateCRC(OutSum, +InvId, this.mrh_pass1);
    return my_crc?.toUpperCase() === SignatureValue?.toUpperCase();
  }
}
