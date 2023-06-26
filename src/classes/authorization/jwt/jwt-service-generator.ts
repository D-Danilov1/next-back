import { JwtService } from '@nestjs/jwt'

export class JwtServiceGenerator {
  getJwtService(tokenLifeTime = '24h', secretKey = 'gKiKSOLSOslXX22C') {
    return new JwtService({
      secret: secretKey,
      signOptions: {
        expiresIn: tokenLifeTime,
      },
    })
  }
}
