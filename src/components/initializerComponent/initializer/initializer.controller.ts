import { Controller, Get, HttpStatus } from '@nestjs/common';
import { InitializerService } from './initializer.service';
import { ApiCreatedResponse } from '@nestjs/swagger';

@Controller('/initializer')
export class InitializerController {
  constructor(private service: InitializerService) {}

  @ApiCreatedResponse({
    description: 'Project initialization completed successfully',
  })
  @Get()
  async initialization(): Promise<{ statusCode: number }> {
    await this.service.initialization();
    return { statusCode: HttpStatus.OK };
  }
}
