import { usersStub } from '../test/stubs/users.stub'

export const UsersModel = {
  create: jest.fn().mockImplementation(() => {
    return usersStub()
  }),
  findAll: jest.fn().mockImplementation(() => {
    return [usersStub()]
  }),
  findOne: jest.fn().mockImplementation(({ where }) => {
    if (where.email === 'testCreate@example.com') {
      return null
    }
    return usersStub()
  }),
  findByPk: jest.fn().mockImplementation(() => {
    return usersStub()
  }),
  findByEmail: jest.fn().mockImplementation(() => {
    return usersStub()
  }),
  update: jest.fn().mockImplementation(() => {
    return 1
  }),
  destroy: jest.fn().mockImplementation(() => {
    return 1
  }),
}
