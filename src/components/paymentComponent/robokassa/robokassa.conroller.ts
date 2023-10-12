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
import {
  GetPaymentUrlDto,
  CancelSubscriptionDto,
  VerifyResultUrlDto,
  VerifySuccessUrlDto,
} from './dto/robokassa.dto';
import { Helper } from 'src/classes/helper';

@ApiTags('Robokassa')
@Controller('/robokassa')
export class RobokassaController {
  constructor(protected service: RobokassaService) {}

  @ApiCreatedResponse({ description: 'Payment link successfully received' })
  @Post('/payment-url')
  async getPaymentUrl(
    @Body() getPaymentUrlDto: GetPaymentUrlDto,
  ): Promise<{ response: string; statusCode: number }> {
    const { amount, period } = getPaymentUrlDto;
    return {
      statusCode: HttpStatus.OK,
      response: await this.service.getPaymentLink(amount, period),
    };
  }

  @ApiCreatedResponse({ description: 'Subscription canceled successfully' })
  @Post('/cancel')
  async cancelSubscription(
    @Body() cancelSubscriptionDto: CancelSubscriptionDto,
  ): Promise<any> {
    try {
      const { subscriptionId } = cancelSubscriptionDto;
      const response = await this.service.cancelSubscription(subscriptionId);
      return response;
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  @ApiCreatedResponse({ description: 'Payment completed successfully' })
  @Get('/result-url')
  async verifyResultUrl(
    @Query() verifyResultUrlDto: VerifyResultUrlDto,
    @Res() res,
  ) {
    const isVerified = await this.service.verifyResultURL(verifyResultUrlDto);
    if (isVerified) {
      return res.send({ success: true });
    } else {
      return res.send({ success: false });
    }
  }

  @ApiCreatedResponse({ description: 'Payment completed successfully' })
  @Get('/success-url')
  async verifySuccessUrl(
    @Query() verifySuccessUrlDto: VerifySuccessUrlDto,
    @Res() res,
  ) {
    const isVerified = await this.service.verifySuccessURL(verifySuccessUrlDto);
    if (isVerified) {
      return res.send({ success: true });
    } else {
      return res.send({ success: false });
    }
  }

  // @Post('/create-data')
  // async getDataAll(@Body() data: any) {
  //   try {
  //     const { EMails, OutSum } = data;
  //     for (let key of EMails) {
  //       await this.service.getData(key, OutSum);
  //     }

  //     return true;
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }

  @Post('/get-data')
  async getData(@Body() data: any) {
    try {
      Helper.log(data, 'robokassa get-data: ')
      const { EMail, OutSum } = data;
      console.log(EMail, OutSum);
      const response = await this.service.getData(EMail, OutSum);
      return response;
    } catch (err) {
      Helper.log(err, 'robokassa err: ')
      console.log(err);
    }
  }
}
