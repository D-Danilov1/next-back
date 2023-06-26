import { subscriptionsStub } from '../test/stubs/subscriptions.stub'

export const SubscriptionsService = jest.fn().mockReturnValue({
  create: jest.fn().mockResolvedValue(subscriptionsStub()),
  findAll: jest.fn().mockResolvedValue([subscriptionsStub()]),
  findByPk: jest.fn().mockResolvedValue(subscriptionsStub()),
  update: jest.fn().mockResolvedValue({ affectedCount: 1 }),
  destroy: jest.fn().mockResolvedValue(1),
})
