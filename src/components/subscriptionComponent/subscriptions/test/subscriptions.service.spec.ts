import { Test } from '@nestjs/testing'
import { getModelToken } from '@nestjs/sequelize'
import { SubscriptionsModel } from '../__mocks__/subscriptions.model'
import { subscriptionsStub } from './stubs/subscriptions.stub'
import { SubscriptionsService } from '../subscriptions.service'
import { Subscriptions } from '../models/subscriptions.model'
import { subscriptionsCreateStub } from './stubs/subscriptions-create.stub'
import { subscriptionsUpdateStub } from './stubs/subscriptions-update.stub'
import { mockUsersService } from '../__mocks__/users.service'
import { UsersService } from '../../../usersComponent/users/users.service'
import { LoggerService } from '../../../loggerComponent/logger/logger.service';
import { mockLoggerService } from '../../../usersComponent/users/__mocks__/logger.service';

describe('SubscriptionsService', () => {
  let service: SubscriptionsService
  let model: typeof Subscriptions

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        SubscriptionsService,
        {
          provide: getModelToken(Subscriptions),
          useValue: SubscriptionsModel,
        },
        {
          provide: UsersService,
          useValue: mockUsersService,
        },
        {
          provide: LoggerService,
          useValue: mockLoggerService,
        },
      ],
    }).compile()

    service = module.get<SubscriptionsService>(SubscriptionsService)
    model = module.get<typeof Subscriptions>(getModelToken(Subscriptions))
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  describe('create', () => {
    it('should be defined', () => {
      expect(service.create).toBeDefined()
    })

    describe('when create is called', () => {
      let subscriptions: Subscriptions

      beforeEach(async () => {
        subscriptions = await service.create(subscriptionsCreateStub())
      })

      it('should call model create', () => {
        expect(model.create).toBeCalled()
      })

      it('should return a subscriptions', () => {
        expect(subscriptions).toBeDefined()
      })
    })
  })

  describe('findAll', () => {
    it('should be defined', () => {
      expect(service.findAll).toBeDefined()
    })

    describe('when findAll is called', () => {
      let subscriptions: Subscriptions[]

      beforeEach(async () => {
        subscriptions = await service.findAll()
      })

      it('should call model findAll', () => {
        expect(model.findAll).toBeCalled()
      })

      it('should return a subscriptions', () => {
        expect(subscriptions).toEqual([subscriptionsStub()])
      })
    })
  })

  describe('findByPk', () => {
    it('should be defined', () => {
      expect(service.findByPk).toBeDefined()
    })

    describe('when findByPk is called', () => {
      let subscriptions: Subscriptions

      beforeEach(async () => {
        subscriptions = await service.findByPk(subscriptionsStub().id)
      })

      it('should call model findByPk', () => {
        expect(model.findByPk).toBeCalled()
      })

      it('should return a subscriptions', () => {
        expect(subscriptions).toEqual(subscriptionsStub())
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
        result = await service.update(subscriptionsUpdateStub())
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
        result = await service.destroy(subscriptionsStub().id)
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
