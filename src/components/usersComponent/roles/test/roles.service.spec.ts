import { Test } from '@nestjs/testing'
import { getModelToken } from '@nestjs/sequelize'
import { RolesModel } from '../__mocks__/roles.model'
import { rolesStub } from './stubs/roles.stub'
import { RolesService } from '../roles.service'
import { Roles } from '../models/roles.model'
import { rolesCreateStub } from './stubs/roles-create.stub'
import { rolesUpdateStub } from './stubs/roles-update.stub'
import { LoggerService } from '../../../loggerComponent/logger/logger.service';
import { mockLoggerService } from '../../users/__mocks__/logger.service';

describe('RolesService', () => {
  let service: RolesService
  let model: typeof Roles

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        RolesService,
        {
          provide: getModelToken(Roles),
          useValue: RolesModel,
        },
        {
          provide: LoggerService,
          useValue: mockLoggerService,
        },
      ],
    }).compile()

    service = module.get<RolesService>(RolesService)
    model = module.get<typeof Roles>(getModelToken(Roles))
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  describe('create', () => {
    it('should be defined', () => {
      expect(service.create).toBeDefined()
    })

    describe('when create is called', () => {
      let role: Roles

      beforeEach(async () => {
        role = await service.create(rolesCreateStub())
      })

      it('should call model create', () => {
        expect(model.create).toBeCalled()
      })

      it('should return a role', () => {
        expect(role).toBeDefined()
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
        roles = await service.findAll()
      })

      it('should call model findAll', () => {
        expect(model.findAll).toBeCalled()
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
        role = await service.findByPk(rolesStub().id)
      })

      it('should call model findByPk', () => {
        expect(model.findByPk).toBeCalled()
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
        role = await service.findByName(rolesStub().name)
      })

      it('should call model findByName', () => {
        expect(model.findOne).toBeCalled()
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
      let result: number[]

      beforeEach(async () => {
        result = await service.update(rolesUpdateStub())
      })

      it('should call model update', () => {
        expect(model.update).toBeCalled()
      })

      it('should return a number of updated records', () => {
        expect(result).toEqual(1)
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
        result = await service.destroy(rolesStub().id)
      })

      it('should call model destroy', () => {
        expect(model.destroy).toBeCalled()
      })

      it('should return a number of deleted records', () => {
        expect(result).toEqual(1)
      })
    })
  })
})
