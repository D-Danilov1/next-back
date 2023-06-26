import { Test } from '@nestjs/testing'
import { getModelToken } from '@nestjs/sequelize'
import { SubscriptionPeriodsModel } from '../__mocks__/subscription-periods.model'
import { subscriptionPeriodsStub } from './stubs/subscription-periods.stub'
import { SubscriptionPeriodsService } from '../subscription-periods.service'
import { SubscriptionPeriods } from '../models/subscription-periods.model'
import { subscriptionPeriodsCreateStub } from './stubs/subscription-periods-create.stub'
import { subscriptionPeriodsUpdateStub } from './stubs/subscription-periods-update.stub'
import { LoggerService } from '../../../loggerComponent/logger/logger.service';
import { mockLoggerService } from '../../../usersComponent/users/__mocks__/logger.service';

describe('SubscriptionPeriodsService', () => {
  let service: SubscriptionPeriodsService
  let model: typeof SubscriptionPeriods

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        SubscriptionPeriodsService,
        {
          provide: getModelToken(SubscriptionPeriods),
          useValue: SubscriptionPeriodsModel,
        },
        {
          provide: LoggerService,
          useValue: mockLoggerService,
        },
      ],
    }).compile()

    service = module.get<SubscriptionPeriodsService>(SubscriptionPeriodsService)
    model = module.get<typeof SubscriptionPeriods>(getModelToken(SubscriptionPeriods))
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  describe('create', () => {
    it('should be defined', () => {
      expect(service.create).toBeDefined()
    })

    describe('when create is called', () => {
      let subscriptionPeriod: SubscriptionPeriods

      beforeEach(async () => {
        subscriptionPeriod = await service.create(subscriptionPeriodsCreateStub())
      })

      it('should call model create', () => {
        expect(model.create).toBeCalled()
      })

      it('should return a subscriptionPeriod', () => {
        expect(subscriptionPeriod).toBeDefined()
      })
    })
  })

  describe('findAll', () => {
    it('should be defined', () => {
      expect(service.findAll).toBeDefined()
    })

    describe('when findAll is called', () => {
      let subscriptionPeriods: SubscriptionPeriods[]

      beforeEach(async () => {
        subscriptionPeriods = await service.findAll()
      })

      it('should call model findAll', () => {
        expect(model.findAll).toBeCalled()
      })

      it('should return a subscriptionPeriods', () => {
        expect(subscriptionPeriods).toEqual([subscriptionPeriodsStub()])
      })
    })
  })

  describe('findByPk', () => {
    it('should be defined', () => {
      expect(service.findByPk).toBeDefined()
    })

    describe('when findByPk is called', () => {
      let subscriptionPeriod: SubscriptionPeriods

      beforeEach(async () => {
        subscriptionPeriod = await service.findByPk(subscriptionPeriodsStub().id)
      })

      it('should call model findByPk', () => {
        expect(model.findByPk).toBeCalled()
      })

      it('should return a subscriptionPeriod', () => {
        expect(subscriptionPeriod).toEqual(subscriptionPeriodsStub())
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
        result = await service.update(subscriptionPeriodsUpdateStub())
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
        result = await service.destroy(subscriptionPeriodsStub().id)
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
