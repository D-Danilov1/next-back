import { CreateRolesDto } from '../../dto/create-roles.dto'
import { ROLES } from '../../../../../constants/roles.constants'

export const rolesCreateStub = (): CreateRolesDto => {
  return <CreateRolesDto>{
    name: ROLES.USER,
  }
}
