import { Response } from 'express'

export class Cookies {
  static setRefreshToken(response: Response, refreshToken: string) {
    response.cookie('refreshToken', refreshToken, {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    })
  }
}
