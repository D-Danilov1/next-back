import { Roles } from '../../models/roles.model'
import { ROLES } from '../../../../../constants/roles.constants'

export const rolesStub = (): Roles => {
  return <Roles>{
    id: 1,
    name: ROLES.USER,
  }
}
