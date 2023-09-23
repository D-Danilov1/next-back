import {
  Body,
  Controller, Post, Redirect,
} from '@nestjs/common';

@Controller('/alexgolduniversity')
export class AlexgolduniversityController {
  @Post()
  @Redirect('https://alexgolduniversity.com/success-page', 302)
  async create(@Body() dto) {
    console.log(dto)
    return { url: `https://alexgolduniversity.com/success-page?email=${dto.sender_email}` };
  }
}
