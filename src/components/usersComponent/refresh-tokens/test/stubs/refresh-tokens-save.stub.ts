import { SaveRefreshTokensDto } from '../../dto/save-refresh-tokens.dto'

export const refreshTokensSaveStub = (): SaveRefreshTokensDto => {
  return <SaveRefreshTokensDto>{
    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9',
    user_id: '4b6bea0b-62d4-40a9-a350-ae40632dc15f',
  }
}
