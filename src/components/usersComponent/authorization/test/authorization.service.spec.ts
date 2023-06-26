import { Test } from '@nestjs/testing'
import { authorizationStub } from './stubs/authorization.stub'
import { AuthorizationService } from '../authorization.service'
import { UsersService } from '../../users/users.service'
import { mockUsersService } from '../__mocks__/users.service'
import { Users } from '../../users/models/users.model'
import { usersStub } from '../../users/test/stubs/users.stub'
import { RefreshTokensService } from '../../refresh-tokens/refresh-tokens.service'
import { mockRefreshTokensService } from '../__mocks__/refresh-tokens.service'

describe('AuthorizationService', () => {
  let service: AuthorizationService

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        AuthorizationService,
        {
          provide: UsersService,
          useValue: mockUsersService,
        },
        {
          provide: RefreshTokensService,
          useValue: mockRefreshTokensService,
        },
      ],
    }).compile()

    service = module.get<AuthorizationService>(AuthorizationService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  describe('authorization', () => {
    it('should be defined', () => {
      expect(service.login).toBeDefined()
    })

    describe('when authorization is called', () => {
      let response

      beforeEach(async () => {
        response = await service.login(authorizationStub())
      })

      it('should return a user ID', () => {
        expect(response.user).toBeDefined()
      })

      it('should return a access token', () => {
        expect(response.accessToken).toBeDefined()
      })

      it('should return a refresh token', () => {
        expect(response.refreshToken).toBeDefined()
      })
    })
  })

  describe('registration', () => {
    it('should be defined', () => {
      expect(service.registration).toBeDefined()
    })

    describe('when registration is called', () => {
      let user: Users

      beforeEach(async () => {
        user = await service.registration({
          email: 'test123@example.com',
          password: 'Qwerty12345!',
        })
      })

      it('should call usersService create', () => {
        expect(mockUsersService.create).toBeCalled()
      })

      it('should return a user', () => {
        expect(user).toEqual(usersStub())
      })
    })
  })
})
