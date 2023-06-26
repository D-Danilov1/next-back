import { HttpStatus, INestApplication } from '@nestjs/common'
import * as request from 'supertest'
import { subscriptionsCreateStub } from './stubs/subscriptions-create.stub'
import { subscriptionsStub } from './stubs/subscriptions.stub'
import { AppGenerator } from '../../classes/app-generator'
import { TokenGenerator } from '../../classes/token-generator'
import { AppInitializer } from '../../classes/app-initializer'
import { Subscriptions } from '../../../src/components/subscriptionComponent/subscriptions/models/subscriptions.model'
import { SubscriptionPeriods } from '../../../src/components/subscriptionComponent/subscription-periods/models/subscription-periods.model'
import { subscriptionPeriodsCreateStub } from '../subscription-periods/stubs/subscription-periods-create.stub'

describe('Subscriptions (e2e)', () => {
  let app: INestApplication
  let tokenAdmin: string
  let tokenUser: string
  let subscriptions: Subscriptions
  let subscriptionPeriod: SubscriptionPeriods

  beforeAll(async () => {
    AppInitializer.jestSetTimeout()
    app = await AppGenerator.getApp()
    await AppInitializer.appInitialization()
    tokenAdmin = await TokenGenerator.getAdminToken()
    tokenUser = await TokenGenerator.getUserToken()
  })

  describe('Create entities before test', () => {
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
  })

  describe('/subscriptions (POST)', () => {
    it('should create a subscriptions and return status HttpStatus.CREATED because it a Admin', async () => {
      let _subscriptionsCreateStub = subscriptionsCreateStub()
      _subscriptionsCreateStub.subscriptions_category_id = subscriptionPeriod.id
      await request(app.getHttpServer())
        .post('/subscriptions')
        .set('Authorization', 'Bearer ' + tokenAdmin)
        .send(_subscriptionsCreateStub)
        .expect(HttpStatus.CREATED)
        .then((response) => {
          subscriptions = response.body.response
        })
    })

    it('should return status HttpStatus.FORBIDDEN because it a User', async () => {
      await request(app.getHttpServer())
        .get('/subscriptions')
        .set('Authorization', 'Bearer ' + tokenUser)
        .send(subscriptionsCreateStub())
        .expect(HttpStatus.FORBIDDEN)
    })

    it('should return status HttpStatus.FORBIDDEN because it a Unknown', async () => {
      await request(app.getHttpServer())
        .get('/subscriptions')
        .send(subscriptionsCreateStub())
        .expect(HttpStatus.FORBIDDEN)
    })

    it('should return status HttpStatus.BAD_REQUEST because it empty request', async () => {
      await request(app.getHttpServer())
        .post('/subscriptions')
        .set('Authorization', 'Bearer ' + tokenAdmin)
        .expect(HttpStatus.BAD_REQUEST)
    })
  })

  describe('/subscriptions (PUT)', () => {
    it('should update a subscriptions', async () => {
      subscriptions.comment = 'Test' + Date.now()
      await request(app.getHttpServer())
        .put('/subscriptions')
        .set('Authorization', 'Bearer ' + tokenAdmin)
        .send(subscriptions)
        .then((response) => {
          expect(response.body.response).toEqual([1])
        })
    })

    it('should return status FORBIDDEN because it a User', async () => {
      await request(app.getHttpServer())
        .put('/subscriptions')
        .set('Authorization', 'Bearer ' + tokenUser)
        .send(subscriptions)
        .expect(HttpStatus.FORBIDDEN)
    })

    it('should return status FORBIDDEN because it a Unknown', async () => {
      await request(app.getHttpServer()).put('/subscriptions').send(subscriptions).expect(HttpStatus.FORBIDDEN)
    })

    it('should return status BAD_REQUEST because it empty request', async () => {
      await request(app.getHttpServer())
        .put('/subscriptions')
        .set('Authorization', 'Bearer ' + tokenAdmin)
        .expect(HttpStatus.BAD_REQUEST)
    })
  })

  describe('/subscriptions (GET)', () => {
    it('should return subscriptions and status OK because it a Admin', async () => {
      await request(app.getHttpServer())
        .get('/subscriptions')
        .set('Authorization', 'Bearer ' + tokenAdmin)
        .expect(HttpStatus.OK)
        .then((response) => {
          console.log(response.body.response[0])
          expect(response.body.response[0]).toEqual(subscriptionsStub())
        })
    })

    it('should return status FORBIDDEN because it a User', async () => {
      await request(app.getHttpServer())
        .get('/subscriptions')
        .set('Authorization', 'Bearer ' + tokenUser)
        .expect(HttpStatus.FORBIDDEN)
    })

    it('should return status FORBIDDEN because it a Unknown', async () => {
      await request(app.getHttpServer()).get('/subscriptions').expect(HttpStatus.FORBIDDEN)
    })
  })

  describe('/subscriptions/:id (GET)', () => {
    it('should return a subscriptions and status OK because it a Admin', async () => {
      await request(app.getHttpServer())
        .get('/subscriptions/' + subscriptions.id)
        .set('Authorization', 'Bearer ' + tokenAdmin)
        .expect(HttpStatus.OK)
        .then((response) => {
          expect(response.body.response).toEqual(subscriptionsStub())
        })
    })

    it('should return status FORBIDDEN because it a User', async () => {
      await request(app.getHttpServer())
        .get('/subscriptions/' + subscriptions.id)
        .set('Authorization', 'Bearer ' + tokenUser)
        .expect(HttpStatus.FORBIDDEN)
    })

    it('should return status FORBIDDEN because it a Unknown', async () => {
      await request(app.getHttpServer())
        .get('/subscriptions/' + subscriptions.id)
        .expect(HttpStatus.FORBIDDEN)
    })
  })

  describe('/subscriptions/:id (DELETE)', () => {
    it('should delete a subscriptions', async () => {
      await request(app.getHttpServer())
        .delete('/subscriptions/' + subscriptions.id)
        .set('Authorization', 'Bearer ' + tokenAdmin)
        .then((response) => {
          expect(response.body.response).toEqual(1)
        })
    })

    it('should return status FORBIDDEN because it a User', async () => {
      await request(app.getHttpServer())
        .delete('/subscriptions/' + subscriptions.id)
        .set('Authorization', 'Bearer ' + tokenUser)
        .expect(HttpStatus.FORBIDDEN)
    })

    it('should return status FORBIDDEN because it a Unknown', async () => {
      await request(app.getHttpServer())
        .delete('/subscriptions/' + subscriptions.id)
        .expect(HttpStatus.FORBIDDEN)
    })

    it('should return status NOT_FOUND because it empty request', async () => {
      await request(app.getHttpServer())
        .delete('/subscriptions/')
        .set('Authorization', 'Bearer ' + tokenAdmin)
        .expect(HttpStatus.NOT_FOUND)
    })
  })

  describe('Delete entities after test', () => {
    it('should delete a subscriptionPeriod', async () => {
      await request(app.getHttpServer())
        .delete('/subscription-periods/' + subscriptionPeriod.id)
        .set('Authorization', 'Bearer ' + tokenAdmin)
        .then((response) => {
          expect(response.body.response).toEqual(1)
        })
    })
  })
})
