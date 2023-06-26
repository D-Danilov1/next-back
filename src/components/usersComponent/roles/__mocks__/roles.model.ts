import { rolesStub } from '../test/stubs/roles.stub'

export const RolesModel = {
  create: jest.fn().mockImplementation(() => {
    return rolesStub()
  }),
  findAll: jest.fn().mockImplementation(() => {
    return [rolesStub()]
  }),
  findOne: jest.fn().mockImplementation(() => {
    return rolesStub()
  }),
  findByPk: jest.fn().mockImplementation(() => {
    return rolesStub()
  }),
  update: jest.fn().mockImplementation(() => {
    return 1
  }),
  destroy: jest.fn().mockImplementation(() => {
    return 1
  }),
}
