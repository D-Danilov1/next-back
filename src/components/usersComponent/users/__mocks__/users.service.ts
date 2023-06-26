import { usersStub } from '../test/stubs/users.stub'
import { roleToUserStub } from '../test/stubs/role-to-user.stub'

export const UsersService = jest.fn().mockReturnValue({
  create: jest.fn().mockResolvedValue(usersStub()),
  findAll: jest.fn().mockResolvedValue([usersStub()]),
  findByPk: jest.fn().mockResolvedValue(usersStub()),
  findByEmail: jest.fn().mockResolvedValue(usersStub()),
  update: jest.fn().mockResolvedValue([1]),
  destroy: jest.fn().mockResolvedValue(1),
  addRoleToUser: jest.fn().mockResolvedValue({ id: 1, ...roleToUserStub() }),
  removeRoleToUser: jest.fn().mockResolvedValue(1),
})
