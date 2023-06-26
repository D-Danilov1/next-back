import { CreateRolesDto } from '../../../../src/components/usersComponent/roles/dto/create-roles.dto'

export const rolesCreateStub = (): CreateRolesDto => {
  return <CreateRolesDto>{
    name: 'Test' + Date.now(),
  }
}
