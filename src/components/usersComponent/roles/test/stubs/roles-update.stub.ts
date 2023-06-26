import { UpdateRolesDto } from '../../dto/update-roles.dto'
import { ROLES } from '../../../../../constants/roles.constants'

export const rolesUpdateStub = (): UpdateRolesDto => {
  return <UpdateRolesDto>{
    id: 1,
    name: ROLES.USER,
  }
}
