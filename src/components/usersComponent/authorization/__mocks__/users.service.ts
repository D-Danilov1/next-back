import { usersStub } from '../../users/test/stubs/users.stub'

export const mockUsersService = {
  create: jest.fn(() => usersStub()),
  findByEmail: jest.fn((email: string) => {
    const userStub = usersStub()
    userStub.email = email
    if (userStub.email != 'test@example.com') {
      return null
    }
    userStub.password = '$2y$06$ccOOIcDyNTRXxnnMZlV6tOshBCiuFZM6rTKHIur.tfiFUHl12tKhy'
    return userStub
  }),
}
