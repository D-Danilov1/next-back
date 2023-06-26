import { HttpStatus, INestApplication } from '@nestjs/common'
import * as request from 'supertest'
import { subscriptionPeriodsCreateStub } from './stubs/subscription-periods-create.stub'
import { subscriptionPeriodsStub } from './stubs/subscription-periods.stub'
import { AppGenerator } from '../../classes/app-generator'
import { TokenGenerator } from '../../classes/token-generator'
import { AppInitializer } from '../../classes/app-initializer'
import { SubscriptionPeriods } from '../../../src/components/subscriptionComponent/subscription-periods/models/subscription-periods.model'

describe('SubscriptionPeriods (e2e)', () => {
  let app: INestApplication
  let tokenAdmin: string
  let tokenUser: string
  let subscriptionPeriod: SubscriptionPeriods

  beforeAll(async () => {
    AppInitializer.jestSetTimeout()
    app = await AppGenerator.getApp()
    await AppInitializer.appInitialization()
    tokenAdmin = await TokenGenerator.getAdminToken()
    tokenUser = await TokenGenerator.getUserToken()
  })

  describe('/subscription-periods (POST)', () => {
    it('should create a subscriptionPeriod and return status HttpStatus.CREATED because it a Admin', async () => {
      await request(app.getHttpServer())
        .post('/subscription-periods')
        .set('Authorization', 'Bearer ' + tokenAdmin)
        .send(subscriptionPeriodsCreateStub())
        .expect(HttpStatus.CREATED)
        .then((response) => {
          subscriptionPeriod = response.body.response
        })
    })

    it('should return status HttpStatus.FORBIDDEN because it a User', async () => {
      await request(app.getHttpServer())
        .get('/subscription-periods')
        .set('Authorization', 'Bearer ' + tokenUser)
        .send(subscriptionPeriodsCreateStub())
        .expect(HttpStatus.FORBIDDEN)
    })

    it('should return status HttpStatus.FORBIDDEN because it a Unknown', async () => {
      await request(app.getHttpServer())
        .get('/subscription-periods')
        .send(subscriptionPeriodsCreateStub())
        .expect(HttpStatus.FORBIDDEN)
    })

    it('should return status HttpStatus.BAD_REQUEST because it empty request', async () => {
      await request(app.getHttpServer())
        .post('/subscription-periods')
        .set('Authorization', 'Bearer ' + tokenAdmin)
        .expect(HttpStatus.BAD_REQUEST)
    })
  })

  describe('/subscription-periods (PUT)', () => {
    it('should update a subscriptionPeriod', async () => {
      subscriptionPeriod.name = 'Test' + Date.now()
      await request(app.getHttpServer())
        .put('/subscription-periods')
        .set('Authorization', 'Bearer ' + tokenAdmin)
        .send(subscriptionPeriod)
        .then((response) => {
          expect(response.body.response).toEqual([1])
        })
    })

    it('should return status FORBIDDEN because it a User', async () => {
      await request(app.getHttpServer())
        .put('/subscription-periods')
        .set('Authorization', 'Bearer ' + tokenUser)
        .send(subscriptionPeriod)
        .expect(HttpStatus.FORBIDDEN)
    })

    it('should return status FORBIDDEN because it a Unknown', async () => {
      await request(app.getHttpServer())
        .put('/subscription-periods')
        .send(subscriptionPeriod)
        .expect(HttpStatus.FORBIDDEN)
    })

    it('should return status BAD_REQUEST because it empty request', async () => {
      await request(app.getHttpServer())
        .put('/subscription-periods')
        .set('Authorization', 'Bearer ' + tokenAdmin)
        .expect(HttpStatus.BAD_REQUEST)
    })
  })

  describe('/subscription-periods (GET)', () => {
    it('should return subscription-periods and status OK because it a Admin', async () => {
      await request(app.getHttpServer())
        .get('/subscription-periods')
        .set('Authorization', 'Bearer ' + tokenAdmin)
        .expect(HttpStatus.OK)
        .then((response) => {
          console.log(response.body.response[0])
          expect(response.body.response[0]).toEqual(subscriptionPeriodsStub())
        })
    })

    it('should return status FORBIDDEN because it a User', async () => {
      await request(app.getHttpServer())
        .get('/subscription-periods')
        .set('Authorization', 'Bearer ' + tokenUser)
        .expect(HttpStatus.FORBIDDEN)
    })

    it('should return status FORBIDDEN because it a Unknown', async () => {
      await request(app.getHttpServer()).get('/subscription-periods').expect(HttpStatus.FORBIDDEN)
    })
  })

  describe('/subscription-periods/:id (GET)', () => {
    it('should return a subscriptionPeriod and status OK because it a Admin', async () => {
      await request(app.getHttpServer())
        .get('/subscription-periods/' + subscriptionPeriod.id)
        .set('Authorization', 'Bearer ' + tokenAdmin)
        .expect(HttpStatus.OK)
        .then((response) => {
          expect(response.body.response).toEqual(subscriptionPeriodsStub())
        })
    })

    it('should return status FORBIDDEN because it a User', async () => {
      await request(app.getHttpServer())
        .get('/subscription-periods/' + subscriptionPeriod.id)
        .set('Authorization', 'Bearer ' + tokenUser)
        .expect(HttpStatus.FORBIDDEN)
    })

    it('should return status FORBIDDEN because it a Unknown', async () => {
      await request(app.getHttpServer())
        .get('/subscription-periods/' + subscriptionPeriod.id)
        .expect(HttpStatus.FORBIDDEN)
    })
  })

  describe('/subscription-periods/:id (DELETE)', () => {
    it('should delete a subscriptionPeriod', async () => {
      await request(app.getHttpServer())
        .delete('/subscription-periods/' + subscriptionPeriod.id)
        .set('Authorization', 'Bearer ' + tokenAdmin)
        .then((response) => {
          expect(response.body.response).toEqual(1)
        })
    })

    it('should return status FORBIDDEN because it a User', async () => {
      await request(app.getHttpServer())
        .delete('/subscription-periods/' + subscriptionPeriod.id)
        .set('Authorization', 'Bearer ' + tokenUser)
        .expect(HttpStatus.FORBIDDEN)
    })

    it('should return status FORBIDDEN because it a Unknown', async () => {
      await request(app.getHttpServer())
        .delete('/subscription-periods/' + subscriptionPeriod.id)
        .expect(HttpStatus.FORBIDDEN)
    })

    it('should return status NOT_FOUND because it empty request', async () => {
      await request(app.getHttpServer())
        .delete('/subscription-periods/')
        .set('Authorization', 'Bearer ' + tokenAdmin)
        .expect(HttpStatus.NOT_FOUND)
    })
  })
})
