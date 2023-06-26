import { INestApplication } from '@nestjs/common'
import { Test, TestingModule } from '@nestjs/testing'
import { AppModule } from '../../src/app.module'

export class AppGenerator {
  static async getApp(): Promise<INestApplication> {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()

    const app = module.createNestApplication()
    await app.init()

    return app
  }
}
