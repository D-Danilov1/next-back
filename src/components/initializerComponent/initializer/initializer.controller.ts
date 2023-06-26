import { Controller, Get, HttpStatus } from '@nestjs/common'
import { InitializerService } from './initializer.service'

@Controller('/initializer')
export class InitializerController {
  constructor(private service: InitializerService) {}

  @Get()
  async initialization(): Promise<{ statusCode: number }> {
    await this.service.initialization()
    return { statusCode: HttpStatus.OK }
  }
}
