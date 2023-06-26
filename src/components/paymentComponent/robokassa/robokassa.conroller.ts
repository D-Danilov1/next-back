import { Body, Controller, Get, HttpStatus, Query, Res } from '@nestjs/common';
import { RobokassaService } from './robokassa.service';

@Controller('/robokassa')
export class RobokassaController {
  constructor(protected service: RobokassaService) {}

  @Get('/payment-url')
  async getPaymentUrl(
    @Body('amount') amount: number,
    @Body('description') description: string,
  ): Promise<{ response: string; statusCode: number }> {
    return {
      statusCode: HttpStatus.OK,
      response: await this.service.getPaymentUrl(amount, description),
    };
  }

  @Get('/result-url')
  verifyResultUrl(@Query() params: any, @Res() res) {
    const isVerified = this.service.verifyResultUrl(params);
    return res.send({ isVerified });
  }

  @Get('/success-url')
  verifySuccessUrl(@Query() params: any, @Res() res) {
    const isVerified = this.service.verifySuccessUrl(params);
    return res.send({ isVerified });
  }
}
