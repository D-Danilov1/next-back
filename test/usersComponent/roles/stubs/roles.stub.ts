import { Roles } from '../../../../src/components/usersComponent/roles/models/roles.model'

export const rolesStub = (): Roles => {
  return <Roles>{
    id: expect.any(Number),
    name: expect.any(String),
    createdAt: expect.any(String),
    updatedAt: expect.any(String),
  }
}
