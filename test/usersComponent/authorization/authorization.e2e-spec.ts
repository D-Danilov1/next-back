import { HttpStatus, INestApplication } from '@nestjs/common'
import * as request from 'supertest'
import { authorizationStub } from './stubs/authorization.stub'
import { registrationStub } from './stubs/registration.stub'
import { AppGenerator } from '../../classes/app-generator'
import { AppInitializer } from '../../classes/app-initializer'
import { TokenGenerator } from '../../classes/token-generator'

describe('Authorization (e2e)', () => {
  let app: INestApplication
  let userID

  beforeAll(async () => {
    AppInitializer.jestSetTimeout()
    app = await AppGenerator.getApp()
    await AppInitializer.appInitialization()
  })

  describe('/login (POST)', () => {
    it('should return a token', async () => {
      await request(app.getHttpServer())
        .post('/login')
        .send(authorizationStub())
        .expect(HttpStatus.CREATED)
    })
  })

  describe('/registration (POST)', () => {
    it('should create a user', async () => {
      await request(app.getHttpServer())
        .post('/registration')
        .send(registrationStub())
        .expect(HttpStatus.CREATED)
        .then((response) => {
          userID = response.body.response.id
        })
    })
  })

  it('should delete a user', async () => {
    await request(app.getHttpServer())
      .delete('/users/' + userID)
      .set('Authorization', 'Bearer ' + TokenGenerator.getSyntheticToken())
      .then((response) => {
        expect(response.body.response).toEqual(1)
      })
  })
})
