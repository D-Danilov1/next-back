import { CreateUsersDto } from '../../dto/create-users.dto'

export const usersCreateStub = (): CreateUsersDto => {
  return <CreateUsersDto>{
    email: 'testCreate@example.com',
    phone_number: '79829472886',
  };
}
