import { rolesStub } from '../test/stubs/roles.stub'

export const RolesService = jest.fn().mockReturnValue({
  create: jest.fn().mockResolvedValue(rolesStub()),
  findAll: jest.fn().mockResolvedValue([rolesStub()]),
  findByPk: jest.fn().mockResolvedValue(rolesStub()),
  findByName: jest.fn().mockResolvedValue(rolesStub()),
  update: jest.fn().mockResolvedValue({ affectedCount: 1 }),
  destroy: jest.fn().mockResolvedValue(1),
})
