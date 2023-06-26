import { HttpStatus, INestApplication } from '@nestjs/common'
import * as request from 'supertest'
import { expenseCreateStub } from './stubs/expense-create.stub'
import { expenseStub } from './stubs/expense.stub'
import { AppGenerator } from '../../classes/app-generator'
import { TokenGenerator } from '../../classes/token-generator'
import { AppInitializer } from '../../classes/app-initializer'
import { Expense } from '../../../src/components/subscriptionComponent/expense/models/expense.model'
import { ExpenseCategories } from '../../../src/components/subscriptionComponent/expense-categories/models/expense-categories.model'
import { expenseCategoriesCreateStub } from '../expense-categories/stubs/expense-categories-create.stub'
import { fundsCreateStub } from '../funds/stubs/funds-create.stub'
import { Funds } from '../../../src/components/subscriptionComponent/funds/models/funds.model'

describe('Expense (e2e)', () => {
  let app: INestApplication
  let tokenAdmin: string
  let tokenUser: string
  let expense: Expense
  let expenseCategory: ExpenseCategories
  let fund: Funds

  beforeAll(async () => {
    AppInitializer.jestSetTimeout()
    app = await AppGenerator.getApp()
    await AppInitializer.appInitialization()
    tokenAdmin = await TokenGenerator.getAdminToken()
    tokenUser = await TokenGenerator.getUserToken()
  })

  describe('Create entities before test', () => {
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
  })

  describe('/expense (POST)', () => {
    it('should create a expense and return status HttpStatus.CREATED because it a Admin', async () => {
      let _expenseCreateStub = expenseCreateStub()
      _expenseCreateStub.expense_category_id = expenseCategory.id
      _expenseCreateStub.fund_id = fund.id
      await request(app.getHttpServer())
        .post('/expense')
        .set('Authorization', 'Bearer ' + tokenAdmin)
        .send(_expenseCreateStub)
        .expect(HttpStatus.CREATED)
        .then((response) => {
          expense = response.body.response
        })
    })

    it('should return status HttpStatus.FORBIDDEN because it a User', async () => {
      await request(app.getHttpServer())
        .get('/expense')
        .set('Authorization', 'Bearer ' + tokenUser)
        .send(expenseCreateStub())
        .expect(HttpStatus.FORBIDDEN)
    })

    it('should return status HttpStatus.FORBIDDEN because it a Unknown', async () => {
      await request(app.getHttpServer())
        .get('/expense')
        .send(expenseCreateStub())
        .expect(HttpStatus.FORBIDDEN)
    })

    it('should return status HttpStatus.BAD_REQUEST because it empty request', async () => {
      await request(app.getHttpServer())
        .post('/expense')
        .set('Authorization', 'Bearer ' + tokenAdmin)
        .expect(HttpStatus.BAD_REQUEST)
    })
  })

  describe('/expense (PUT)', () => {
    it('should update a expense', async () => {
      expense.comment = 'Test' + Date.now()
      await request(app.getHttpServer())
        .put('/expense')
        .set('Authorization', 'Bearer ' + tokenAdmin)
        .send(expense)
        .then((response) => {
          expect(response.body.response).toEqual([1])
        })
    })

    it('should return status FORBIDDEN because it a User', async () => {
      await request(app.getHttpServer())
        .put('/expense')
        .set('Authorization', 'Bearer ' + tokenUser)
        .send(expense)
        .expect(HttpStatus.FORBIDDEN)
    })

    it('should return status FORBIDDEN because it a Unknown', async () => {
      await request(app.getHttpServer()).put('/expense').send(expense).expect(HttpStatus.FORBIDDEN)
    })

    it('should return status BAD_REQUEST because it empty request', async () => {
      await request(app.getHttpServer())
        .put('/expense')
        .set('Authorization', 'Bearer ' + tokenAdmin)
        .expect(HttpStatus.BAD_REQUEST)
    })
  })

  describe('/expense (GET)', () => {
    it('should return expense and status OK because it a Admin', async () => {
      await request(app.getHttpServer())
        .get('/expense')
        .set('Authorization', 'Bearer ' + tokenAdmin)
        .expect(HttpStatus.OK)
        .then((response) => {
          console.log(response.body.response[0])
          expect(response.body.response[0]).toEqual(expenseStub())
        })
    })

    it('should return status FORBIDDEN because it a User', async () => {
      await request(app.getHttpServer())
        .get('/expense')
        .set('Authorization', 'Bearer ' + tokenUser)
        .expect(HttpStatus.FORBIDDEN)
    })

    it('should return status FORBIDDEN because it a Unknown', async () => {
      await request(app.getHttpServer()).get('/expense').expect(HttpStatus.FORBIDDEN)
    })
  })

  describe('/expense/:id (GET)', () => {
    it('should return a expense and status OK because it a Admin', async () => {
      await request(app.getHttpServer())
        .get('/expense/' + expense.id)
        .set('Authorization', 'Bearer ' + tokenAdmin)
        .expect(HttpStatus.OK)
        .then((response) => {
          expect(response.body.response).toEqual(expenseStub())
        })
    })

    it('should return status FORBIDDEN because it a User', async () => {
      await request(app.getHttpServer())
        .get('/expense/' + expense.id)
        .set('Authorization', 'Bearer ' + tokenUser)
        .expect(HttpStatus.FORBIDDEN)
    })

    it('should return status FORBIDDEN because it a Unknown', async () => {
      await request(app.getHttpServer())
        .get('/expense/' + expense.id)
        .expect(HttpStatus.FORBIDDEN)
    })
  })

  describe('/expense/:id (DELETE)', () => {
    it('should delete a expense', async () => {
      await request(app.getHttpServer())
        .delete('/expense/' + expense.id)
        .set('Authorization', 'Bearer ' + tokenAdmin)
        .then((response) => {
          expect(response.body.response).toEqual(1)
        })
    })

    it('should return status FORBIDDEN because it a User', async () => {
      await request(app.getHttpServer())
        .delete('/expense/' + expense.id)
        .set('Authorization', 'Bearer ' + tokenUser)
        .expect(HttpStatus.FORBIDDEN)
    })

    it('should return status FORBIDDEN because it a Unknown', async () => {
      await request(app.getHttpServer())
        .delete('/expense/' + expense.id)
        .expect(HttpStatus.FORBIDDEN)
    })

    it('should return status NOT_FOUND because it empty request', async () => {
      await request(app.getHttpServer())
        .delete('/expense/')
        .set('Authorization', 'Bearer ' + tokenAdmin)
        .expect(HttpStatus.NOT_FOUND)
    })
  })

  describe('Delete entities after test', () => {
    it('should delete a expenseCategory', async () => {
      await request(app.getHttpServer())
        .delete('/expense-categories/' + expenseCategory.id)
        .set('Authorization', 'Bearer ' + tokenAdmin)
        .then((response) => {
          expect(response.body.response).toEqual(1)
        })
    })

    it('should delete a fund', async () => {
      await request(app.getHttpServer())
        .delete('/funds/' + fund.id)
        .set('Authorization', 'Bearer ' + tokenAdmin)
        .then((response) => {
          expect(response.body.response).toEqual(1)
        })
    })
  })
})
