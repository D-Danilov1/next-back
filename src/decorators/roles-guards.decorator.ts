import { SetMetadata, UseGuards } from '@nestjs/common'
import { RolesGuard } from '../components/usersComponent/authorization/guards/roles.guard'

export const ROLES_KEY = 'roles'

export const RolesGuards = (roles: string[]): MethodDecorator => {
  const setMetadata = SetMetadata(ROLES_KEY, roles)
  const useGuards = UseGuards(RolesGuard)

  return function (target: any, propertyKey: string | symbol, descriptor: PropertyDescriptor) {
    useGuards(target, propertyKey, descriptor)
    setMetadata(target, propertyKey, descriptor)
  }
}
