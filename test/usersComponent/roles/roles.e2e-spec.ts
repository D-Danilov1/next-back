import { HttpStatus, INestApplication } from '@nestjs/common'
import * as request from 'supertest'
import { rolesCreateStub } from './stubs/roles-create.stub'
import { rolesStub } from './stubs/roles.stub'
import { AppGenerator } from '../../classes/app-generator'
import { TokenGenerator } from '../../classes/token-generator'
import { AppInitializer } from '../../classes/app-initializer'
import { Roles } from '../../../src/components/usersComponent/roles/models/roles.model'

describe('Roles (e2e)', () => {
  let app: INestApplication
  let tokenAdmin: string
  let tokenUser: string
  let role: Roles

  beforeAll(async () => {
    AppInitializer.jestSetTimeout()
    app = await AppGenerator.getApp()
    await AppInitializer.appInitialization()
    tokenAdmin = await TokenGenerator.getAdminToken()
    tokenUser = await TokenGenerator.getUserToken()
  })

  describe('/roles (POST)', () => {
    it('should create a role and return status HttpStatus.CREATED because it a Admin', async () => {
      await request(app.getHttpServer())
        .post('/roles')
        .set('Authorization', 'Bearer ' + tokenAdmin)
        .send(rolesCreateStub())
        .expect(HttpStatus.CREATED)
        .then((response) => {
          role = response.body.response
        })
    })

    it('should return status HttpStatus.FORBIDDEN because it a User', async () => {
      await request(app.getHttpServer())
        .get('/roles')
        .set('Authorization', 'Bearer ' + tokenUser)
        .send(rolesCreateStub())
        .expect(HttpStatus.FORBIDDEN)
    })

    it('should return status HttpStatus.FORBIDDEN because it a Unknown', async () => {
      await request(app.getHttpServer())
        .get('/roles')
        .send(rolesCreateStub())
        .expect(HttpStatus.FORBIDDEN)
    })

    it('should return status HttpStatus.BAD_REQUEST because it empty request', async () => {
      await request(app.getHttpServer())
        .post('/roles')
        .set('Authorization', 'Bearer ' + tokenAdmin)
        .expect(HttpStatus.BAD_REQUEST)
    })
  })

  describe('/roles (PUT)', () => {
    it('should update a role', async () => {
      role.name = 'Test' + Date.now()
      await request(app.getHttpServer())
        .put('/roles')
        .set('Authorization', 'Bearer ' + tokenAdmin)
        .send(role)
        .then((response) => {
          expect(response.body.response).toEqual([1])
        })
    })

    it('should return status FORBIDDEN because it a User', async () => {
      await request(app.getHttpServer())
        .put('/roles')
        .set('Authorization', 'Bearer ' + tokenUser)
        .send(role)
        .expect(HttpStatus.FORBIDDEN)
    })

    it('should return status FORBIDDEN because it a Unknown', async () => {
      await request(app.getHttpServer()).put('/roles').send(role).expect(HttpStatus.FORBIDDEN)
    })

    it('should return status BAD_REQUEST because it empty request', async () => {
      await request(app.getHttpServer())
        .put('/roles')
        .set('Authorization', 'Bearer ' + tokenAdmin)
        .expect(HttpStatus.BAD_REQUEST)
    })
  })

  describe('/roles (GET)', () => {
    it('should return roles and status OK because it a Admin', async () => {
      await request(app.getHttpServer())
        .get('/roles')
        .set('Authorization', 'Bearer ' + tokenAdmin)
        .expect(HttpStatus.OK)
        .then((response) => {
          console.log(response.body.response[0])
          expect(response.body.response[0]).toEqual(rolesStub())
        })
    })

    it('should return status FORBIDDEN because it a User', async () => {
      await request(app.getHttpServer())
        .get('/roles')
        .set('Authorization', 'Bearer ' + tokenUser)
        .expect(HttpStatus.FORBIDDEN)
    })

    it('should return status FORBIDDEN because it a Unknown', async () => {
      await request(app.getHttpServer()).get('/roles').expect(HttpStatus.FORBIDDEN)
    })
  })

  describe('/roles/:id (GET)', () => {
    it('should return a role and status OK because it a Admin', async () => {
      await request(app.getHttpServer())
        .get('/roles/' + role.id)
        .set('Authorization', 'Bearer ' + tokenAdmin)
        .expect(HttpStatus.OK)
        .then((response) => {
          expect(response.body.response).toEqual(rolesStub())
        })
    })

    it('should return status FORBIDDEN because it a User', async () => {
      await request(app.getHttpServer())
        .get('/roles/' + role.id)
        .set('Authorization', 'Bearer ' + tokenUser)
        .expect(HttpStatus.FORBIDDEN)
    })

    it('should return status FORBIDDEN because it a Unknown', async () => {
      await request(app.getHttpServer())
        .get('/roles/' + role.id)
        .expect(HttpStatus.FORBIDDEN)
    })
  })

  describe('/roles/name/:name (GET)', () => {
    it('should return a role and status OK because it a Admin', async () => {
      await request(app.getHttpServer())
        .get('/roles/name/' + role.name)
        .set('Authorization', 'Bearer ' + tokenAdmin)
        .expect(HttpStatus.OK)
        .then((response) => {
          expect(response.body.response).toEqual(rolesStub())
        })
    })

    it('should return status FORBIDDEN because it a User', async () => {
      await request(app.getHttpServer())
        .get('/roles/name/' + role.name)
        .set('Authorization', 'Bearer ' + tokenUser)
        .expect(HttpStatus.FORBIDDEN)
    })

    it('should return status FORBIDDEN because it a Unknown', async () => {
      await request(app.getHttpServer())
        .get('/roles/name/' + role.name)
        .expect(HttpStatus.FORBIDDEN)
    })
  })

  describe('/roles/:id (DELETE)', () => {
    it('should delete a role', async () => {
      await request(app.getHttpServer())
        .delete('/roles/' + role.id)
        .set('Authorization', 'Bearer ' + tokenAdmin)
        .then((response) => {
          expect(response.body.response).toEqual(1)
        })
    })

    it('should return status FORBIDDEN because it a User', async () => {
      await request(app.getHttpServer())
        .delete('/roles/' + role.id)
        .set('Authorization', 'Bearer ' + tokenUser)
        .expect(HttpStatus.FORBIDDEN)
    })

    it('should return status FORBIDDEN because it a Unknown', async () => {
      await request(app.getHttpServer())
        .delete('/roles/' + role.id)
        .expect(HttpStatus.FORBIDDEN)
    })

    it('should return status NOT_FOUND because it empty request', async () => {
      await request(app.getHttpServer())
        .delete('/roles/')
        .set('Authorization', 'Bearer ' + tokenAdmin)
        .expect(HttpStatus.NOT_FOUND)
    })
  })
})
