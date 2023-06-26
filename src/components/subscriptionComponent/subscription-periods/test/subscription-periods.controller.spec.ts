import { Test } from '@nestjs/testing'
import { subscriptionPeriodsStub } from './stubs/subscription-periods.stub'
import { JwtService } from '@nestjs/jwt'
import { SubscriptionPeriodsController } from '../subscription-periods.controller'
import { SubscriptionPeriodsService } from '../subscription-periods.service'
import { SubscriptionPeriods } from '../models/subscription-periods.model'
import { subscriptionPeriodsCreateStub } from './stubs/subscription-periods-create.stub'
import { subscriptionPeriodsUpdateStub } from './stubs/subscription-periods-update.stub'
import { CacheModule } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { SequelizeModule } from '@nestjs/sequelize'
import { mockConfigService } from '../__mocks__/config.service';

jest.mock('../subscription-periods.service')

describe('SubscriptionPeriodsController', () => {
  let controller: SubscriptionPeriodsController
  let service: SubscriptionPeriodsService

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [CacheModule.register()],
      controllers: [SubscriptionPeriodsController],
      providers: [
        SubscriptionPeriodsService,
        {
          provide: JwtService,
          useValue: JwtService,
        },
        {
          provide: ConfigService,
          useValue: mockConfigService,
        },
        SequelizeModule,
      ],
    }).compile()

    controller = module.get<SubscriptionPeriodsController>(SubscriptionPeriodsController)
    service = module.get<SubscriptionPeriodsService>(SubscriptionPeriodsService)
  })

  describe('create', () => {
    it('should be defined', () => {
      expect(service.create).toBeDefined()
    })

    describe('when create is called', () => {
      let subscriptionPeriod: SubscriptionPeriods

      beforeEach(async () => {
        subscriptionPeriod = (await controller.create(subscriptionPeriodsCreateStub())).response
      })

      it('should call subscriptionPeriodsService', () => {
        expect(service.create).toBeCalledWith(subscriptionPeriodsCreateStub())
      })

      it('should return a subscriptionPeriod', () => {
        expect(subscriptionPeriod).toEqual(subscriptionPeriodsStub())
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
        subscriptionPeriods = (await controller.findAll()).response
      })

      it('should call subscriptionPeriodsService', () => {
        expect(service.findAll).toBeCalledWith()
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
        subscriptionPeriod = (await controller.findByPk(subscriptionPeriodsStub().id)).response
      })

      it('should call subscriptionPeriodsService', () => {
        expect(service.findByPk).toBeCalledWith(subscriptionPeriodsStub().id)
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
      let result

      beforeEach(async () => {
        result = (await controller.update(subscriptionPeriodsUpdateStub())).response
      })

      it('should call subscriptionPeriodsService', () => {
        expect(service.update).toBeCalledWith(subscriptionPeriodsUpdateStub())
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
        result = (await controller.destroy(subscriptionPeriodsStub().id)).response
      })

      it('should call subscriptionPeriodsService', () => {
        expect(service.destroy).toBeCalledWith(subscriptionPeriodsStub().id)
      })

      it('should return a affected count', () => {
        expect(result).toEqual(1)
      })
    })
  })
})
