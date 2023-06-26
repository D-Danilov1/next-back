import { UserPayload } from './users.types'

export interface AuthorizationResponse {
  user: UserPayload
  accessToken: string
  refreshToken: string
}

export interface RefreshResponse {
  accessToken: string
  user: UserPayload
}
