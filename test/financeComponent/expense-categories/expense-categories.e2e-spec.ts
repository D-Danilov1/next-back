import { HttpStatus, INestApplication } from '@nestjs/common'
import * as request from 'supertest'
import { expenseCategoriesCreateStub } from './stubs/expense-categories-create.stub'
import { expenseCategoriesStub } from './stubs/expense-categories.stub'
import { AppGenerator } from '../../classes/app-generator'
import { TokenGenerator } from '../../classes/token-generator'
import { AppInitializer } from '../../classes/app-initializer'
import { ExpenseCategories } from '../../../src/components/subscriptionComponent/expense-categories/models/expense-categories.model'

describe('ExpenseCategories (e2e)', () => {
  let app: INestApplication
  let tokenAdmin: string
  let tokenUser: string
  let expenseCategory: ExpenseCategories

  beforeAll(async () => {
    AppInitializer.jestSetTimeout()
    app = await AppGenerator.getApp()
    await AppInitializer.appInitialization()
    tokenAdmin = await TokenGenerator.getAdminToken()
    tokenUser = await TokenGenerator.getUserToken()
  })

  describe('/expense-categories (POST)', () => {
    it('should create a expenseCategory and return status HttpStatus.CREATED because it a Admin', async () => {
      await request(app.getHttpServer())
        .post('/expense-categories')
        .set('Authorization', 'Bearer ' + tokenAdmin)
        .send(expenseCategoriesCreateStub())
        .expect(HttpStatus.CREATED)
        .then((response) => {
          expenseCategory = response.body.response
        })
    })

    it('should return status HttpStatus.FORBIDDEN because it a User', async () => {
      await request(app.getHttpServer())
        .get('/expense-categories')
        .set('Authorization', 'Bearer ' + tokenUser)
        .send(expenseCategoriesCreateStub())
        .expect(HttpStatus.FORBIDDEN)
    })

    it('should return status HttpStatus.FORBIDDEN because it a Unknown', async () => {
      await request(app.getHttpServer())
        .get('/expense-categories')
        .send(expenseCategoriesCreateStub())
        .expect(HttpStatus.FORBIDDEN)
    })

    it('should return status HttpStatus.BAD_REQUEST because it empty request', async () => {
      await request(app.getHttpServer())
        .post('/expense-categories')
        .set('Authorization', 'Bearer ' + tokenAdmin)
        .expect(HttpStatus.BAD_REQUEST)
    })
  })

  describe('/expense-categories (PUT)', () => {
    it('should update a expenseCategory', async () => {
      expenseCategory.name = 'Test' + Date.now()
      await request(app.getHttpServer())
        .put('/expense-categories')
        .set('Authorization', 'Bearer ' + tokenAdmin)
        .send(expenseCategory)
        .then((response) => {
          expect(response.body.response).toEqual([1])
        })
    })

    it('should return status FORBIDDEN because it a User', async () => {
      await request(app.getHttpServer())
        .put('/expense-categories')
        .set('Authorization', 'Bearer ' + tokenUser)
        .send(expenseCategory)
        .expect(HttpStatus.FORBIDDEN)
    })

    it('should return status FORBIDDEN because it a Unknown', async () => {
      await request(app.getHttpServer())
        .put('/expense-categories')
        .send(expenseCategory)
        .expect(HttpStatus.FORBIDDEN)
    })

    it('should return status BAD_REQUEST because it empty request', async () => {
      await request(app.getHttpServer())
        .put('/expense-categories')
        .set('Authorization', 'Bearer ' + tokenAdmin)
        .expect(HttpStatus.BAD_REQUEST)
    })
  })

  describe('/expense-categories (GET)', () => {
    it('should return expense-categories and status OK because it a Admin', async () => {
      await request(app.getHttpServer())
        .get('/expense-categories')
        .set('Authorization', 'Bearer ' + tokenAdmin)
        .expect(HttpStatus.OK)
        .then((response) => {
          console.log(response.body.response[0])
          expect(response.body.response[0]).toEqual(expenseCategoriesStub())
        })
    })

    it('should return status FORBIDDEN because it a User', async () => {
      await request(app.getHttpServer())
        .get('/expense-categories')
        .set('Authorization', 'Bearer ' + tokenUser)
        .expect(HttpStatus.FORBIDDEN)
    })

    it('should return status FORBIDDEN because it a Unknown', async () => {
      await request(app.getHttpServer()).get('/expense-categories').expect(HttpStatus.FORBIDDEN)
    })
  })

  describe('/expense-categories/:id (GET)', () => {
    it('should return a expenseCategory and status OK because it a Admin', async () => {
      await request(app.getHttpServer())
        .get('/expense-categories/' + expenseCategory.id)
        .set('Authorization', 'Bearer ' + tokenAdmin)
        .expect(HttpStatus.OK)
        .then((response) => {
          expect(response.body.response).toEqual(expenseCategoriesStub())
        })
    })

    it('should return status FORBIDDEN because it a User', async () => {
      await request(app.getHttpServer())
        .get('/expense-categories/' + expenseCategory.id)
        .set('Authorization', 'Bearer ' + tokenUser)
        .expect(HttpStatus.FORBIDDEN)
    })

    it('should return status FORBIDDEN because it a Unknown', async () => {
      await request(app.getHttpServer())
        .get('/expense-categories/' + expenseCategory.id)
        .expect(HttpStatus.FORBIDDEN)
    })
  })

  describe('/expense-categories/:id (DELETE)', () => {
    it('should delete a expenseCategory', async () => {
      await request(app.getHttpServer())
        .delete('/expense-categories/' + expenseCategory.id)
        .set('Authorization', 'Bearer ' + tokenAdmin)
        .then((response) => {
          expect(response.body.response).toEqual(1)
        })
    })

    it('should return status FORBIDDEN because it a User', async () => {
      await request(app.getHttpServer())
        .delete('/expense-categories/' + expenseCategory.id)
        .set('Authorization', 'Bearer ' + tokenUser)
        .expect(HttpStatus.FORBIDDEN)
    })

    it('should return status FORBIDDEN because it a Unknown', async () => {
      await request(app.getHttpServer())
        .delete('/expense-categories/' + expenseCategory.id)
        .expect(HttpStatus.FORBIDDEN)
    })

    it('should return status NOT_FOUND because it empty request', async () => {
      await request(app.getHttpServer())
        .delete('/expense-categories/')
        .set('Authorization', 'Bearer ' + tokenAdmin)
        .expect(HttpStatus.NOT_FOUND)
    })
  })
})
