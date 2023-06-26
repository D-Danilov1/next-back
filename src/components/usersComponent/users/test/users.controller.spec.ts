import { Test } from '@nestjs/testing'
import { UsersController } from '../users.controller'
import { UsersService } from '../users.service'
import { Users } from '../models/users.model'
import { usersStub } from './stubs/users.stub'
import { JwtService } from '@nestjs/jwt'
import { usersUpdateStub } from './stubs/users-update.stub'
import { usersCreateStub } from './stubs/users-create.stub'
import { roleToUserStub } from './stubs/role-to-user.stub'
import { ConfigService } from '@nestjs/config';
import { mockConfigService } from '../__mocks__/config.service';

jest.mock('../users.service')

describe('UsersController', () => {
  let controller: UsersController
  let service: UsersService

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        UsersService,
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

    controller = module.get<UsersController>(UsersController)
    service = module.get<UsersService>(UsersService)
  })

  describe('create', () => {
    it('should be defined', () => {
      expect(service.create).toBeDefined()
    })

    describe('when create is called', () => {
      let user: Users

      beforeEach(async () => {
        user = (await controller.create(usersCreateStub())).response
      })

      it('should call usersService', () => {
        expect(service.create).toBeCalledWith(usersCreateStub())
      })

      it('should return a user', () => {
        expect(user).toEqual(usersStub())
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
        users = (await controller.findAll()).response
      })

      it('should call usersService', () => {
        expect(service.findAll).toBeCalledWith()
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
        user = (await controller.findByPk(usersStub().id)).response
      })

      it('should call usersService', () => {
        expect(service.findByPk).toBeCalledWith(usersStub().id)
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
        user = (await controller.findByEmail(usersStub().email)).response
      })

      it('should call usersService', () => {
        expect(service.findByEmail).toBeCalledWith(usersStub().email)
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
      let result

      beforeEach(async () => {
        result = (await controller.update(usersUpdateStub())).response
      })

      it('should call usersService', () => {
        expect(service.update).toBeCalledWith(usersUpdateStub())
      })

      it('should return a affected count', () => {
        expect(result).toEqual([1])
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
        result = (await controller.destroy(usersStub().id)).response
      })

      it('should call usersService', () => {
        expect(service.destroy).toBeCalledWith(usersStub().id)
      })

      it('should return a affected count', () => {
        expect(result).toEqual(1)
      })
    })
  })

  describe('addRoleToUser', () => {
    it('should be defined', () => {
      expect(service.addRoleToUser).toBeDefined()
    })

    describe('when addRoleToUser is called', () => {
      let result: unknown

      beforeEach(async () => {
        result = (await controller.addRoleToUser(roleToUserStub())).response
      })

      it('should call usersService', () => {
        expect(service.addRoleToUser).toBeCalledWith(roleToUserStub())
      })

      it('should return a affected count', () => {
        expect(result).toEqual({ id: 1, ...roleToUserStub() })
      })
    })
  })

  describe('removeRoleToUser', () => {
    it('should be defined', () => {
      expect(service.removeRoleToUser).toBeDefined()
    })

    describe('when removeRoleToUser is called', () => {
      let result: unknown

      beforeEach(async () => {
        result = (await controller.removeRoleToUser(roleToUserStub())).response
      })

      it('should call usersService', () => {
        expect(service.removeRoleToUser).toBeCalledWith(roleToUserStub())
      })

      it('should return a affected count', () => {
        expect(result).toEqual(1)
      })
    })
  })
})
