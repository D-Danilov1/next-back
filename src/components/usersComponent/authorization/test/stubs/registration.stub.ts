import { CreateUsersDto } from '../../../users/dto/create-users.dto'

export const registrationStub = (): CreateUsersDto => {
  return <CreateUsersDto>{
    email: 'test123@example.com',
    password: 'Qwerty12345!',
    name: 'Ivan',
    surname: 'Ivanov',
  }
}
