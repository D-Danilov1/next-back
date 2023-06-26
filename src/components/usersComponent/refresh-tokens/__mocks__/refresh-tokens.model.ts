import { refreshTokensStub } from '../test/stubs/refresh-tokens.stub'

export const RefreshTokensModel = {
  create: jest.fn().mockImplementation(() => {
    return refreshTokensStub()
  }),
  findOne: jest.fn().mockImplementation(() => {
    return refreshTokensStub()
  }),
  update: jest.fn().mockImplementation(() => {
    return 1
  }),
}
