import { CreateUsersDto } from '../../../../src/components/usersComponent/users/dto/create-users.dto'

export const registrationStub = (): CreateUsersDto => {
  return <CreateUsersDto>{
    email: 'test' + Date.now() + '@example.com',
    password: 'testTest',
  }
}
