import { Test } from '@nestjs/testing'
import { getModelToken } from '@nestjs/sequelize'
import { RefreshTokensModel } from '../__mocks__/refresh-tokens.model'
import { RefreshTokensService } from '../refresh-tokens.service'
import { RefreshTokens } from '../models/refresh-tokens.model'
import { refreshTokensSaveStub } from './stubs/refresh-tokens-save.stub'

describe('UsersService', () => {
  let service: RefreshTokensService

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        RefreshTokensService,
        {
          provide: getModelToken(RefreshTokens),
          useValue: RefreshTokensModel,
        },
      ],
    }).compile()

    service = module.get<RefreshTokensService>(RefreshTokensService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  describe('saveRefreshToken', () => {
    it('should be defined', () => {
      expect(service.saveRefreshToken).toBeDefined()
    })

    describe('when saveRefreshToken is called', () => {
      let refreshToken

      beforeEach(async () => {
        refreshToken = await service.saveRefreshToken(refreshTokensSaveStub())
      })

      it('should return a refreshToken', () => {
        expect(refreshToken).toBeDefined()
      })
    })
  })
})
