import { RoleToUserDto } from '../../dto/role-to-user.dto'
import { ROLES } from '../../../../../constants/roles.constants'

export const roleToUserStub = (): RoleToUserDto => {
  return <RoleToUserDto>{
    userEmail: 'user@gmail.com',
    roleName: ROLES.USER,
  }
}
