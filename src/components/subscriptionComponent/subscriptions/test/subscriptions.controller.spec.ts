import { Test } from '@nestjs/testing'
import { subscriptionsStub } from './stubs/subscriptions.stub'
import { JwtService } from '@nestjs/jwt'
import { SubscriptionsController } from '../subscriptions.controller'
import { SubscriptionsService } from '../subscriptions.service'
import { Subscriptions } from '../models/subscriptions.model'
import { subscriptionsCreateStub } from './stubs/subscriptions-create.stub'
import { subscriptionsUpdateStub } from './stubs/subscriptions-update.stub'
import { CacheModule } from '@nestjs/common'
import { ConfigService } from '@nestjs/config';
import { mockConfigService } from '../__mocks__/config.service';

jest.mock('../subscriptions.service')

describe('SubscriptionsController', () => {
  let controller: SubscriptionsController
  let service: SubscriptionsService

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [CacheModule.register()],
      controllers: [SubscriptionsController],
      providers: [
        SubscriptionsService,
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

    controller = module.get<SubscriptionsController>(SubscriptionsController)
    service = module.get<SubscriptionsService>(SubscriptionsService)
  })

  describe('create', () => {
    it('should be defined', () => {
      expect(service.create).toBeDefined()
    })

    describe('when create is called', () => {
      let fund: Subscriptions

      beforeEach(async () => {
        fund = (await controller.create(subscriptionsCreateStub())).response
      })

      it('should call subscriptionsService', () => {
        expect(service.create).toBeCalledWith(subscriptionsCreateStub())
      })

      it('should return a fund', () => {
        expect(fund).toEqual(subscriptionsStub())
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
        subscriptions = (await controller.findAll()).response
      })

      it('should call subscriptionsService', () => {
        expect(service.findAll).toBeCalledWith()
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
      let fund: Subscriptions

      beforeEach(async () => {
        fund = (await controller.findByPk(subscriptionsStub().id)).response
      })

      it('should call subscriptionsService', () => {
        expect(service.findByPk).toBeCalledWith(subscriptionsStub().id)
      })

      it('should return a fund', () => {
        expect(fund).toEqual(subscriptionsStub())
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
        result = (await controller.update(subscriptionsUpdateStub())).response
      })

      it('should call subscriptionsService', () => {
        expect(service.update).toBeCalledWith(subscriptionsUpdateStub())
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
        result = (await controller.destroy(subscriptionsStub().id)).response
      })

      it('should call subscriptionsService', () => {
        expect(service.destroy).toBeCalledWith(subscriptionsStub().id)
      })

      it('should return a affected count', () => {
        expect(result).toEqual(1)
      })
    })
  })
})
