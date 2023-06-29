import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Query,
  Res,
} from '@nestjs/common';
import { RobokassaService } from './robokassa.service';

@Controller('/robokassa')
export class RobokassaController {
  constructor(protected service: RobokassaService) {}

  @Post('/payment-url')
  async getPaymentUrl(
    @Body('amount') amount: number,
  ): Promise<{ response: string; statusCode: number }> {
    return {
      statusCode: HttpStatus.OK,
      response: await this.service.getPaymentLink(amount),
    };
  }

  @Get('/result-url')
  async verifyResultUrl(@Query() params: any, @Res() res) {
    const isVerified = await this.service.verifyResultURL(params);
    if (isVerified) {
      return res.send({ success: true });
    } else {
      return res.send({ success: false });
    }
  }

  @Get('/success-url')
  async verifySuccessUrl(@Query() params: any, @Res() res) {
    const isVerified = await this.service.verifySuccessURL(params);
    if (isVerified) {
      return res.send({ success: true });
    } else {
      return res.send({ success: false });
    }
  }
}
