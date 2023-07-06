import { CreateUsersDto } from '../../../users/dto/create-users.dto';

export const registrationStub = (): CreateUsersDto => {
  return <CreateUsersDto>{
    email: 'test123@example.com',
    phone_number: '79829472886',
  };
};
