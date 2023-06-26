import { Test } from '@nestjs/testing'
import { Users } from '../models/users.model'
import { UsersService } from '../users.service'
import { usersCreateStub } from './stubs/users-create.stub'
import { getModelToken } from '@nestjs/sequelize'
import { UsersModel } from '../__mocks__/users.model'
import { mockRolesService } from '../__mocks__/roles.service'
import { RolesService } from '../../roles/roles.service'
import { usersStub } from './stubs/users.stub'
import { usersUpdateStub } from './stubs/users-update.stub'
import { roleToUserStub } from './stubs/role-to-user.stub'
import { LoggerService } from '../../../loggerComponent/logger/logger.service';
import { mockLoggerService } from '../__mocks__/logger.service';

describe('UsersService', () => {
  let service: UsersService
  let model: typeof Users

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getModelToken(Users),
          useValue: UsersModel,
        },
        {
          provide: RolesService,
          useValue: mockRolesService,
        },
        {
          provide: LoggerService,
          useValue: mockLoggerService,
        },
      ],
    }).compile()

    service = module.get<UsersService>(UsersService)
    model = module.get<typeof Users>(getModelToken(Users))
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  describe('create', () => {
    it('should be defined', () => {
      expect(service.create).toBeDefined()
    })

    describe('when create is called', () => {
      let user: Users
      let createSpy

      beforeEach(async () => {
        createSpy = jest.spyOn(model, 'create').mockReturnValue({
          $set: jest.fn(),
        } as any)
        user = await service.create(usersCreateStub())
      })

      it('should call model create', () => {
        expect(model.create).toBeCalled()
      })

      it('should return a user', () => {
        expect(user).toBeDefined()
      })
    })
  })

  describe('findAll', () => {
    it('should be defined', () => {
      expect(service.findAll).toBeDefined()
    })

    describe('when findAll is called', () => {
      let users: Users[]

      beforeEach(async () => {
        users = await service.findAll()
      })

      it('should call model findAll', () => {
        expect(model.findAll).toBeCalled()
      })

      it('should return a users', () => {
        expect(users).toEqual([usersStub()])
      })
    })
  })

  describe('findByPk', () => {
    it('should be defined', () => {
      expect(service.findByPk).toBeDefined()
    })

    describe('when findByPk is called', () => {
      let user: Users

      beforeEach(async () => {
        user = await service.findByPk(usersStub().id)
      })

      it('should call model findByPk', () => {
        expect(model.findByPk).toBeCalled()
      })

      it('should return a user', () => {
        expect(user).toEqual(usersStub())
      })
    })
  })

  describe('findByEmail', () => {
    it('should be defined', () => {
      expect(service.findByEmail).toBeDefined()
    })

    describe('when findByEmail is called', () => {
      let user: Users

      beforeEach(async () => {
        user = await service.findByEmail(usersStub().email)
      })

      it('should call model findByEmail', () => {
        expect(model.findOne).toBeCalled()
      })

      it('should return a user', () => {
        expect(user).toEqual(usersStub())
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
        result = await service.update(usersUpdateStub())
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
        result = await service.destroy(usersStub().id)
      })

      it('should call model destroy', () => {
        expect(model.destroy).toBeCalled()
      })

      it('should return a number of deleted records', () => {
        expect(result).toEqual(1)
      })
    })
  })

  describe('addRoleToUser', () => {
    it('should be defined', () => {
      expect(service.addRoleToUser).toBeDefined()
    })

    describe('when addRoleToUser is called', () => {
      let result
      let findSpy

      beforeEach(async () => {
        findSpy = jest.spyOn(model, 'findOne').mockReturnValue({
          $add: jest.fn(),
        } as any)
        result = await service.addRoleToUser(roleToUserStub())
      })

      it('should call model findByPk', () => {
        expect(model.findByPk).toBeCalled()
      })

      it('should return a result', () => {
        expect(result).toBeUndefined()
      })
    })
  })

  describe('removeRoleToUser', () => {
    it('should be defined', () => {
      expect(service.removeRoleToUser).toBeDefined()
    })

    describe('when removeRoleToUser is called', () => {
      let result
      let findSpy

      beforeEach(async () => {
        findSpy = jest.spyOn(model, 'findOne').mockReturnValue({
          $remove: jest.fn(),
        } as any)
        result = await service.removeRoleToUser(roleToUserStub())
      })

      it('should call model findByPk', () => {
        expect(model.findByPk).toBeCalled()
      })

      it('should return a result', () => {
        expect(result).toBeUndefined()
      })
    })
  })
})
