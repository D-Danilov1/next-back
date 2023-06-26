import { CreateUsersDto } from '../../../../src/components/usersComponent/users/dto/create-users.dto'

export const usersCreateStub = (): CreateUsersDto => {
  return <CreateUsersDto>{
    email: 'testUser' + Date.now() + '@gmail.com',
    password: 'testTest',
  }
}
