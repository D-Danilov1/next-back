import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { Reflector } from '@nestjs/core'
import { Observable } from 'rxjs'
import { Token } from '../../../../classes/authorization/jwt/token'
import { ROLES_KEY } from '../../../../decorators/roles-guards.decorator'

@Injectable()
export class RolesGuard implements CanActivate {
  private token: Token

  constructor(private reflector: Reflector, private config: ConfigService) {
    this.token = new Token(config)
  }

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    try {
      const requireRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
        context.getHandler(),
        context.getClass(),
      ])

      if (!requireRoles) {
        return true
      }

      const request = context.switchToHttp().getRequest()

      const user = this.token.validateAccessToken(request.headers.authorization.split(' ')[1])
      request.user = user

      return user.roles.some((role) => requireRoles.includes(role))
    } catch (e) {
      throw new HttpException('No access', HttpStatus.FORBIDDEN)
    }
  }
}
