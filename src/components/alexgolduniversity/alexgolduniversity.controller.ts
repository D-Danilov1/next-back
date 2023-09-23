import {
  Body,
  Controller, Post,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('alexgolduniversity')
@Controller('/alexgolduniversity')
export class AlexgolduniversityController {
  @Post()
  async create(@Body() dto) {
    console.log(dto)
    const LeadDyno = require('https://static.leaddyno.com/js')
    LeadDyno.key = "1b12ac3d67141a7e49e12ca7aa37a96c54158519";
    await LeadDyno.recordPurchase(dto.sender_email, {
      purchase_amount: '49'
    });
    return 201;
  }
}
