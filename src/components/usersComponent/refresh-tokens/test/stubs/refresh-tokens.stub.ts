import { RefreshTokens } from '../../models/refresh-tokens.model'

export const refreshTokensStub = (): RefreshTokens => {
  return <RefreshTokens>{
    id: 1,
    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9',
    user_id: '4b6bea0b-62d4-40a9-a350-ae40632dc15f',
  }
}
