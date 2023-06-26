import { usersStub } from '../../../usersComponent/users/test/stubs/users.stub'

export const mockUsersService = {
  findByEmail: jest.fn(() => usersStub()),
}
