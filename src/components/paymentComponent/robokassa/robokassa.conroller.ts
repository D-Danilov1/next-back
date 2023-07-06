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
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Robokassa')
@Controller('/robokassa')
export class RobokassaController {
  constructor(protected service: RobokassaService) {}

  @ApiCreatedResponse({ description: 'Payment link successfully received' })
  @Post('/payment-url')
  async getPaymentUrl(
    @Body('amount') amount: number,
  ): Promise<{ response: string; statusCode: number }> {
    return {
      statusCode: HttpStatus.OK,
      response: await this.service.getPaymentLink(amount),
    };
  }

  @ApiCreatedResponse({ description: 'Subscription canceled successfully' })
  @Post('/cancel')
  async cancelSubscription(
    @Body('subscriptionId') subscriptionId: string,
  ): Promise<any> {
    try {
      const response = await this.service.cancelSubscription(subscriptionId);
      return response;
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  @ApiCreatedResponse({ description: 'Payment completed successfully' })
  @Get('/result-url')
  async verifyResultUrl(@Query() params: any, @Res() res) {
    const isVerified = await this.service.verifyResultURL(params);
    if (isVerified) {
      return res.send({ success: true });
    } else {
      return res.send({ success: false });
    }
  }

  @ApiCreatedResponse({ description: 'Payment completed successfully' })
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
