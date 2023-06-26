import { HttpStatus, INestApplication } from '@nestjs/common'
import * as request from 'supertest'
import { fundsCreateStub } from './stubs/funds-create.stub'
import { fundsStub } from './stubs/funds.stub'
import { AppGenerator } from '../../classes/app-generator'
import { TokenGenerator } from '../../classes/token-generator'
import { AppInitializer } from '../../classes/app-initializer'
import { Funds } from '../../../src/components/subscriptionComponent/funds/models/funds.model'

describe('Funds (e2e)', () => {
  let app: INestApplication
  let tokenAdmin: string
  let tokenUser: string
  let fund: Funds

  beforeAll(async () => {
    AppInitializer.jestSetTimeout()
    app = await AppGenerator.getApp()
    await AppInitializer.appInitialization()
    tokenAdmin = await TokenGenerator.getAdminToken()
    tokenUser = await TokenGenerator.getUserToken()
  })

  describe('/funds (POST)', () => {
    it('should create a fund and return status HttpStatus.CREATED because it a Admin', async () => {
      await request(app.getHttpServer())
        .post('/funds')
        .set('Authorization', 'Bearer ' + tokenAdmin)
        .send(fundsCreateStub())
        .expect(HttpStatus.CREATED)
        .then((response) => {
          fund = response.body.response
        })
    })

    it('should return status HttpStatus.FORBIDDEN because it a User', async () => {
      await request(app.getHttpServer())
        .get('/funds')
        .set('Authorization', 'Bearer ' + tokenUser)
        .send(fundsCreateStub())
        .expect(HttpStatus.FORBIDDEN)
    })

    it('should return status HttpStatus.FORBIDDEN because it a Unknown', async () => {
      await request(app.getHttpServer())
        .get('/funds')
        .send(fundsCreateStub())
        .expect(HttpStatus.FORBIDDEN)
    })

    it('should return status HttpStatus.BAD_REQUEST because it empty request', async () => {
      await request(app.getHttpServer())
        .post('/funds')
        .set('Authorization', 'Bearer ' + tokenAdmin)
        .expect(HttpStatus.BAD_REQUEST)
    })
  })

  describe('/funds (PUT)', () => {
    it('should update a fund', async () => {
      fund.name = 'Test' + Date.now()
      await request(app.getHttpServer())
        .put('/funds')
        .set('Authorization', 'Bearer ' + tokenAdmin)
        .send(fund)
        .then((response) => {
          expect(response.body.response).toEqual([1])
        })
    })

    it('should return status FORBIDDEN because it a User', async () => {
      await request(app.getHttpServer())
        .put('/funds')
        .set('Authorization', 'Bearer ' + tokenUser)
        .send(fund)
        .expect(HttpStatus.FORBIDDEN)
    })

    it('should return status FORBIDDEN because it a Unknown', async () => {
      await request(app.getHttpServer()).put('/funds').send(fund).expect(HttpStatus.FORBIDDEN)
    })

    it('should return status BAD_REQUEST because it empty request', async () => {
      await request(app.getHttpServer())
        .put('/funds')
        .set('Authorization', 'Bearer ' + tokenAdmin)
        .expect(HttpStatus.BAD_REQUEST)
    })
  })

  describe('/funds (GET)', () => {
    it('should return funds and status OK because it a Admin', async () => {
      await request(app.getHttpServer())
        .get('/funds')
        .set('Authorization', 'Bearer ' + tokenAdmin)
        .expect(HttpStatus.OK)
        .then((response) => {
          console.log(response.body.response[0])
          expect(response.body.response[0]).toEqual(fundsStub())
        })
    })

    it('should return status FORBIDDEN because it a User', async () => {
      await request(app.getHttpServer())
        .get('/funds')
        .set('Authorization', 'Bearer ' + tokenUser)
        .expect(HttpStatus.FORBIDDEN)
    })

    it('should return status FORBIDDEN because it a Unknown', async () => {
      await request(app.getHttpServer()).get('/funds').expect(HttpStatus.FORBIDDEN)
    })
  })

  describe('/funds/:id (GET)', () => {
    it('should return a fund and status OK because it a Admin', async () => {
      await request(app.getHttpServer())
        .get('/funds/' + fund.id)
        .set('Authorization', 'Bearer ' + tokenAdmin)
        .expect(HttpStatus.OK)
        .then((response) => {
          expect(response.body.response).toEqual(fundsStub())
        })
    })

    it('should return status FORBIDDEN because it a User', async () => {
      await request(app.getHttpServer())
        .get('/funds/' + fund.id)
        .set('Authorization', 'Bearer ' + tokenUser)
        .expect(HttpStatus.FORBIDDEN)
    })

    it('should return status FORBIDDEN because it a Unknown', async () => {
      await request(app.getHttpServer())
        .get('/funds/' + fund.id)
        .expect(HttpStatus.FORBIDDEN)
    })
  })

  describe('/funds/name/:name (GET)', () => {
    it('should return a fund and status OK because it a Admin', async () => {
      await request(app.getHttpServer())
        .get('/funds/name/' + fund.name)
        .set('Authorization', 'Bearer ' + tokenAdmin)
        .expect(HttpStatus.OK)
        .then((response) => {
          expect(response.body.response).toEqual(fundsStub())
        })
    })

    it('should return status FORBIDDEN because it a User', async () => {
      await request(app.getHttpServer())
        .get('/funds/name/' + fund.name)
        .set('Authorization', 'Bearer ' + tokenUser)
        .expect(HttpStatus.FORBIDDEN)
    })

    it('should return status FORBIDDEN because it a Unknown', async () => {
      await request(app.getHttpServer())
        .get('/funds/name/' + fund.name)
        .expect(HttpStatus.FORBIDDEN)
    })
  })

  describe('/funds/:id (DELETE)', () => {
    it('should delete a fund', async () => {
      await request(app.getHttpServer())
        .delete('/funds/' + fund.id)
        .set('Authorization', 'Bearer ' + tokenAdmin)
        .then((response) => {
          expect(response.body.response).toEqual(1)
        })
    })

    it('should return status FORBIDDEN because it a User', async () => {
      await request(app.getHttpServer())
        .delete('/funds/' + fund.id)
        .set('Authorization', 'Bearer ' + tokenUser)
        .expect(HttpStatus.FORBIDDEN)
    })

    it('should return status FORBIDDEN because it a Unknown', async () => {
      await request(app.getHttpServer())
        .delete('/funds/' + fund.id)
        .expect(HttpStatus.FORBIDDEN)
    })

    it('should return status NOT_FOUND because it empty request', async () => {
      await request(app.getHttpServer())
        .delete('/funds/')
        .set('Authorization', 'Bearer ' + tokenAdmin)
        .expect(HttpStatus.NOT_FOUND)
    })
  })
})
