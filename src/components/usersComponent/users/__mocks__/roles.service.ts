import { ROLES } from '../../../../constants/roles.constants'

export const mockRolesService = {
  findByName: jest.fn(() => ({ id: 1, name: ROLES.USER })),
}
