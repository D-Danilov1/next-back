import { AppGenerator } from './app-generator'
import * as request from 'supertest'
import { INestApplication } from '@nestjs/common'

export class AppInitializer {
  private static app: INestApplication

  static async appInitialization() {
    this.app = await AppGenerator.getApp()
    await this.initialization()
  }

  private static async initialization() {
    await request(this.app.getHttpServer()).get('/initializer')
  }

  static jestSetTimeout() {
    jest.setTimeout(120000)
  }
}
