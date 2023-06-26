import { CreateUsersDto } from '../../dto/create-users.dto'

export const usersCreateStub = (): CreateUsersDto => {
  return <CreateUsersDto>{
    email: 'testCreate@example.com',
    password: 'Qwerty12345!',
  }
}
