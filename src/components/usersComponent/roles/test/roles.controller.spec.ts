import { Test } from '@nestjs/testing'
import { rolesStub } from './stubs/roles.stub'
import { JwtService } from '@nestjs/jwt'
import { RolesController } from '../roles.controller'
import { RolesService } from '../roles.service'
import { Roles } from '../models/roles.model'
import { rolesCreateStub } from './stubs/roles-create.stub'
import { rolesUpdateStub } from './stubs/roles-update.stub'
import { ConfigService } from '@nestjs/config';
import { mockConfigService } from '../__mocks__/config.service';

jest.mock('../roles.service')

describe('RolesController', () => {
  let controller: RolesController
  let service: RolesService

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      controllers: [RolesController],
      providers: [
        RolesService,
        {
          provide: JwtService,
          useValue: JwtService,
        },
        {
          provide: ConfigService,
          useValue: mockConfigService,
        },
      ],
    }).compile()

    controller = module.get<RolesController>(RolesController)
    service = module.get<RolesService>(RolesService)
  })

  describe('create', () => {
    it('should be defined', () => {
      expect(service.create).toBeDefined()
    })

    describe('when create is called', () => {
      let role: Roles

      beforeEach(async () => {
        role = (await controller.create(rolesCreateStub())).response
      })

      it('should call rolesService', () => {
        expect(service.create).toBeCalledWith(rolesCreateStub())
      })

      it('should return a role', () => {
        expect(role).toEqual(rolesStub())
      })
    })
  })

  describe('findAll', () => {
    it('should be defined', () => {
      expect(service.findAll).toBeDefined()
    })

    describe('when findAll is called', () => {
      let roles: Roles[]

      beforeEach(async () => {
        roles = (await controller.findAll()).response
      })

      it('should call rolesService', () => {
        expect(service.findAll).toBeCalledWith()
      })

      it('should return a roles', () => {
        expect(roles).toEqual([rolesStub()])
      })
    })
  })

  describe('findByPk', () => {
    it('should be defined', () => {
      expect(service.findByPk).toBeDefined()
    })

    describe('when findByPk is called', () => {
      let role: Roles

      beforeEach(async () => {
        role = (await controller.findByPk(rolesStub().id)).response
      })

      it('should call rolesService', () => {
        expect(service.findByPk).toBeCalledWith(rolesStub().id)
      })

      it('should return a role', () => {
        expect(role).toEqual(rolesStub())
      })
    })
  })

  describe('findByName', () => {
    it('should be defined', () => {
      expect(service.findByName).toBeDefined()
    })

    describe('when findByName is called', () => {
      let role: Roles

      beforeEach(async () => {
        role = (await controller.findByName(rolesStub().name)).response
      })

      it('should call rolesService', () => {
        expect(service.findByName).toBeCalledWith(rolesStub().name)
      })

      it('should return a role', () => {
        expect(role).toEqual(rolesStub())
      })
    })
  })

  describe('update', () => {
    it('should be defined', () => {
      expect(service.update).toBeDefined()
    })

    describe('when update is called', () => {
      let result

      beforeEach(async () => {
        result = (await controller.update(rolesUpdateStub())).response
      })

      it('should call rolesService', () => {
        expect(service.update).toBeCalledWith(rolesUpdateStub())
      })

      it('should return a affected count', () => {
        expect(result).toEqual({ affectedCount: 1 })
      })
    })
  })

  describe('destroy', () => {
    it('should be defined', () => {
      expect(service.destroy).toBeDefined()
    })

    describe('when destroy is called', () => {
      let result: number

      beforeEach(async () => {
        result = (await controller.destroy(rolesStub().id)).response
      })

      it('should call rolesService', () => {
        expect(service.destroy).toBeCalledWith(rolesStub().id)
      })

      it('should return a affected count', () => {
        expect(result).toEqual(1)
      })
    })
  })
})
