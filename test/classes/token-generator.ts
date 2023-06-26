import { Token as TokenGeneratorReal } from '../../src/classes/authorization/jwt/token'
import * as request from 'supertest'
import { AppGenerator } from './app-generator'
import { usersStub } from '../../src/components/usersComponent/users/test/stubs/users.stub'
import { ConfigService } from '@nestjs/config'

export class TokenGenerator {
  static config: ConfigService

  static getSyntheticToken() {
    const tokenGenerator = new TokenGeneratorReal(TokenGenerator.config)
    return tokenGenerator.generateTokens(usersStub()).accessToken
  }

  static async getAdminToken() {
    const authorization = await request((await AppGenerator.getApp()).getHttpServer())
      .post('/login')
      .send({ email: 'admin@gmail.com', password: 'adminAdmin' })

    return authorization.body.response.accessToken
  }

  static async getUserToken() {
    const authorization = await request((await AppGenerator.getApp()).getHttpServer())
      .post('/login')
      .send({ email: 'user@gmail.com', password: 'userUser' })

    return authorization.body.response.accessToken
  }
}
